const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

interface BCGFormData {
  hospitalName: string;
  recipients: string[];
  parentNames: string;
  childName: string;
  birthDate: string;
  refusalType: 'deferral' | 'permanent';
  letterTone: 'cooperative' | 'formal' | 'confrontational';
  reasons: string[];
  customReason: string;
  declarations: string[];
}

async function callGeminiAPI(data: any, retryCount = 0): Promise<Response> {
  const apiKey = 'AIzaSyDRzl44b5hNYOqyF16x3JoOHjNKRJkA-RU';
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent`;
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Gemini API hiba (${response.status}):`, errorText);

      if (response.status === 502 && retryCount < 3) {
        const delay = Math.pow(2, retryCount) * 1000;
        await new Promise(resolve => setTimeout(resolve, delay));
        return callGeminiAPI(data, retryCount + 1);
      }

      throw new Error(`API hiba: ${response.status} - ${errorText}`);
    }

    return response;
  } catch (error) {
    console.error('Hiba a Gemini API hívásakor:', error);
    throw error;
  }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  try {
    if (req.method !== 'POST') {
      throw new Error('Nem megengedett HTTP metódus');
    }

    const formData: BCGFormData = await req.json();
    
    if (!formData || typeof formData !== 'object') {
      throw new Error('Érvénytelen bemeneti adatok');
    }

    // Build the user prompt with all form data
    const userPrompt = `
Kérjük, generáljon egy hivatalos, magyar nyelvű levelet a BCG oltás ${formData.refusalType === 'deferral' ? 'elhalasztásához' : 'visszautasításához'} az alábbi adatok alapján:

ALAPVETŐ ADATOK:
- Kórház neve: ${formData.hospitalName}
- Címzettek: ${formData.recipients.map(r => {
  switch(r) {
    case 'director': return 'Kórház Főigazgatója';
    case 'headOfObstetrics': return 'Szülészeti Osztály Osztályvezető Főorvosa';
    case 'headOfNeonatology': return 'Újszülött Osztály Osztályvezető Főorvosa';
    default: return r;
  }
}).join(', ')}
- Szülő(k) neve: ${formData.parentNames}
- Gyermek neve: ${formData.childName || 'Még nem született meg'}
- Születési/várható születési dátum: ${formData.birthDate}

DÖNTÉS TÍPUSA:
- ${formData.refusalType === 'deferral' ? 'Halasztást kérek (később, máshol beadatnám)' : 'Véglegesen elutasítom (sem most, sem később nem kérem)'}

LEVÉL HANGVÉTELE:
- ${formData.letterTone === 'cooperative' ? 'Partnerségre törekvő, tisztelettudó' : 
     formData.letterTone === 'formal' ? 'Hivatalos és határozott' : 
     'Konfrontatív és felszólító (jogi lépések kilátásba helyezésével)'}

INDOKOK:
${formData.reasons.map(reason => {
  switch(reason) {
    case 'immuneSystem': return '- Az újszülött éretlen immunrendszerének kímélete';
    case 'conscience': return '- Lelkiismereti és világnézeti meggyőződés';
    case 'selfDetermination': return '- A tájékozott beleegyezésen alapuló önrendelkezési jog';
    case 'familyHistory': return '- Családi kórtörténet (pl. autoimmun betegségek) miatti óvatosság';
    case 'unlawfulDetention': return '- A gyermek és az anya visszatartásának jogellenessége';
    default: return `- ${reason}`;
  }
}).join('\n')}
${formData.customReason ? `\nEgyéni indoklás: ${formData.customReason}` : ''}

ZÁRÓ NYILATKOZATOK:
${formData.declarations.map(declaration => {
  switch(declaration) {
    case 'responsibilityForDeferral': return '- Nyilatkozat a későbbi oltás felelősségteljes pótlásáról';
    case 'awarenessOfConsequences': return '- A lehetséges hatósági következmények tudomásulvétele';
    case 'requestForDocumentation': return '- Kérés a döntés hivatalos kórházi dokumentációjára';
    default: return `- ${declaration}`;
  }
}).join('\n')}

FONTOS: Ne használj markdown formázást vagy egyéb speciális karaktereket! Csak sima szöveget generálj! A levél legyen hivatalos, szakmai és a megadott hangvételnek megfelelő.
    `;

    const systemPrompt = "Generálj egy hivatalos, magyar nyelvű BCG oltás visszautasító levelet.";

    const data = {
      contents: [
        {
          parts: [
            { text: systemPrompt + "\n\n" + userPrompt }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.7,
        topP: 0.8,
        topK: 40,
        maxOutputTokens: 2048,
      }
    };

    const response = await callGeminiAPI(data);
    const result = await response.json();

    console.log('Gemini API response:', JSON.stringify(result, null, 2));

    if (!result || !result.candidates || !Array.isArray(result.candidates) || 
        result.candidates.length === 0 || 
        !result.candidates[0].content || 
        !result.candidates[0].content.parts || 
        !Array.isArray(result.candidates[0].content.parts) ||
        result.candidates[0].content.parts.length === 0 ||
        !result.candidates[0].content.parts[0].text) {
      throw new Error('Érvénytelen válasz formátum');
    }

    return new Response(
      JSON.stringify(result),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Hiba történt:', error);
    
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : 'Ismeretlen hiba történt',
      }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
        status: error instanceof Error && error.message.includes('API kulcs') ? 500 : 400,
      }
    );
  }
});