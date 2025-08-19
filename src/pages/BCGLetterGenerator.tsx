import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BCGFormStep, BCGFormData, BCGFormErrors } from '../types/bcgForm';
import { StepIndicator } from '../components/StepIndicator';
import { NavigationFooter } from '../components/NavigationFooter';
import { BasicDataStep } from '../components/BCGSteps/BasicDataStep';
import { DecisionTypeStep } from '../components/BCGSteps/DecisionTypeStep';
import { ReasoningStep } from '../components/BCGSteps/ReasoningStep';
import { FinalDeclarationsStep } from '../components/BCGSteps/FinalDeclarationsStep';
import { BCGResultPage } from '../components/BCGResultPage';
import { FileText } from 'lucide-react';
import { supabase } from '../lib/supabase';

const STEPS: BCGFormStep[] = [
  { id: 1, title: 'I. Alapvető Adatok' },
  { id: 2, title: 'II. A Döntés Jellege és Hangvétele' },
  { id: 3, title: 'III. Indoklás Kiválasztása' },
  { id: 4, title: 'IV. Záró Rendelkezések és Generálás' },
];

const initialFormData: BCGFormData = {
  hospitalName: '',
  recipients: [],
  parentNames: '',
  childName: '',
  birthDate: '',
  refusalType: '',
  letterTone: '',
  reasons: [],
  customReason: '',
  declarations: [],
};

export function BCGLetterGenerator() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<BCGFormData>(initialFormData);
  const [errors, setErrors] = useState<BCGFormErrors>({});
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedLetter, setGeneratedLetter] = useState<string | null>(null);
  const navigate = useNavigate();

  const validateStep = (step: number): boolean => {
    const newErrors: BCGFormErrors = {};

    switch (step) {
      case 1:
        if (!formData.hospitalName.trim()) newErrors.hospitalName = 'Kötelező mező';
        if (!formData.recipients.length) newErrors.recipients = 'Válasszon legalább egy címzettet';
        if (!formData.parentNames.trim()) newErrors.parentNames = 'Kötelező mező';
        if (!formData.birthDate) newErrors.birthDate = 'Kötelező mező';
        break;
      case 2:
        if (!formData.refusalType) newErrors.refusalType = 'Válasszon egy opciót';
        if (!formData.letterTone) newErrors.letterTone = 'Válasszon egy hangvételt';
        break;
      case 3:
        if (!formData.reasons.length) newErrors.reasons = 'Válasszon legalább egy indokot';
        break;
      // Step 4 has no required fields
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof BCGFormData, value: any) => {
    setFormData({ ...formData, [field]: value });
    // Clear error for the field if it exists
    if (errors[field]) {
      setErrors(prevErrors => {
        const newErrors = { ...prevErrors };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      // Mark current step as completed
      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps([...completedSteps, currentStep]);
      }

      // Move to next step if not at the end
      if (currentStep < STEPS.length) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const generateLetter = () => {
    if (!validateStep(currentStep)) {
      return;
    }

    setIsGenerating(true);

    // Generate the letter based on the form data
    const letter = generateLetterContent(formData);
    setGeneratedLetter(letter);
    setIsGenerating(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/dashboard');
  };

  if (generatedLetter) {
    return (
      <BCGResultPage
        content={generatedLetter}
        onBack={() => setGeneratedLetter(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <FileText className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">
              BCG Oltás Visszautasító Levél Generátor
            </h1>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Kijelentkezés
          </button>
        </div>

        <div className="mb-8">
          <StepIndicator
            steps={STEPS.map((step) => ({
              ...step,
              isCompleted: completedSteps.includes(step.id),
            }))}
            currentStep={currentStep}
            onStepClick={setCurrentStep}
          />
        </div>

        <div className="rounded-lg bg-white shadow">
          <div className="border-b border-gray-200 px-6 py-4">
            <h2 className="text-lg font-medium text-gray-900">
              {STEPS[currentStep - 1].title}
            </h2>
          </div>

          <div className="px-6 py-6">
            {currentStep === 1 && (
              <BasicDataStep
                data={formData}
                onChange={handleInputChange}
                errors={errors}
              />
            )}
            {currentStep === 2 && (
              <DecisionTypeStep
                data={formData}
                onChange={handleInputChange}
                errors={errors}
              />
            )}
            {currentStep === 3 && (
              <ReasoningStep
                data={formData}
                onChange={handleInputChange}
                errors={errors}
              />
            )}
            {currentStep === 4 && (
              <FinalDeclarationsStep
                data={formData}
                onChange={handleInputChange}
                errors={errors}
                isGenerating={isGenerating}
              />
            )}
          </div>

          <NavigationFooter
            currentStep={currentStep}
            totalSteps={STEPS.length}
            onPrevious={handlePrevious}
            onNext={currentStep === STEPS.length ? generateLetter : handleNext}
            onSave={() => {}}
            isValid={Object.keys(errors).length === 0}
            isSubmitting={isGenerating}
          />
        </div>
      </div>
    </div>
  );
}

function generateLetterContent(data: BCGFormData): string {
  const currentDate = new Date().toLocaleDateString('hu-HU');
  
  // Header with recipients
  let header = `${data.hospitalName}\n`;
  if (data.recipients.includes('director')) {
    header += `Főigazgató Úr/Asszony részére\n`;
  }
  if (data.recipients.includes('headOfObstetrics')) {
    header += `Szülészeti Osztály Osztályvezető Főorvosa részére\n`;
  }
  if (data.recipients.includes('headOfNeonatology')) {
    header += `Újszülött Osztály Osztályvezető Főorvosa részére\n`;
  }
  
  header += `\n${currentDate}\n\n`;
  
  // Subject
  const childInfo = data.childName ? data.childName : `${data.birthDate}-án/én született gyermek`;
  const subject = `Tárgy: BCG oltás ${data.refusalType === 'deferral' ? 'elhalasztása' : 'visszautasítása'} - ${childInfo}\n\n`;
  
  // Opening
  let opening = `Tisztelt Főigazgató Úr/Asszony!\nTisztelt Osztályvezető Főorvos Úr/Asszony!\n\n`;
  opening += `Alulírott ${data.parentNames}, mint ${data.childName || 'a fent említett gyermek'} szülője/szülői, `;
  
  // Core statement based on refusal type
  if (data.refusalType === 'deferral') {
    opening += `ezúton kérem/kérjük az újszülött BCG oltásának elhalasztását.\n\n`;
  } else {
    opening += `ezúton visszavonhatatlanul visszautasítjuk az újszülött BCG oltását.\n\n`;
  }
  
  // Reasoning section
  let reasoning = `Döntésünk indokai:\n\n`;
  
  if (data.reasons.includes('immuneSystem')) {
    reasoning += `• Az újszülött éretlen immunrendszerének kímélete: Az újszülött immunrendszere még nem teljesen kifejlett, ezért különös óvatossággal kell eljárni minden beavatkozás esetén.\n\n`;
  }
  
  if (data.reasons.includes('conscience')) {
    reasoning += `• Lelkiismereti és világnézeti meggyőződés: Mélyen átgondolt világnézeti és lelkiismereti okokból hozzuk meg ezt a döntést.\n\n`;
  }
  
  if (data.reasons.includes('selfDetermination')) {
    reasoning += `• Tájékozott beleegyezésen alapuló önrendelkezési jog: Az Alaptörvény és az egészségügyi törvény értelmében jogunk van a tájékozott döntéshozatalhoz és az orvosi beavatkozások visszautasításához.\n\n`;
  }
  
  if (data.reasons.includes('familyHistory')) {
    reasoning += `• Családi kórtörténet miatti óvatosság: A családi kórtörténetben előforduló autoimmun betegségek és egyéb egészségügyi problémák miatt fokozott óvatossággal járunk el.\n\n`;
  }
  
  if (data.reasons.includes('unlawfulDetention')) {
    reasoning += `• Jogellenes visszatartás elkerülése: Felhívjuk figyelmüket, hogy a gyermek és az anya oltás miatti visszatartása jogellenes és jogi következményekkel járhat.\n\n`;
  }
  
  if (data.customReason.trim()) {
    reasoning += `• ${data.customReason.trim()}\n\n`;
  }
  
  // Tone-specific content
  let toneContent = '';
  if (data.letterTone === 'cooperative') {
    toneContent = `Bízva az Önök megértésében és partnerségében, kérjük döntésünk tiszteletben tartását. Együttműködésre törekszünk minden további kérdésben.\n\n`;
  } else if (data.letterTone === 'formal') {
    toneContent = `Hivatkozva az egészségügyi törvény vonatkozó rendelkezéseire, kérjük döntésünk hivatalos tudomásul vételét és dokumentálását.\n\n`;
  } else if (data.letterTone === 'confrontational') {
    toneContent = `Felszólítjuk Önöket döntésünk azonnali tiszteletben tartására. Figyelmeztetjük, hogy jogellenes fogvatartás vagy kényszerítés esetén jogi lépéseket teszünk.\n\n`;
  }
  
  // Declarations
  let declarations = '';
  if (data.declarations.includes('responsibilityForDeferral') || data.refusalType === 'deferral') {
    declarations += `Nyilatkozom/Nyilatkozunk, hogy a későbbi oltás felelősségteljes pótlásáról gondoskodni fogunk.\n\n`;
  }
  
  if (data.declarations.includes('awarenessOfConsequences')) {
    declarations += `Tudomásul vesszük a döntésünkből eredő lehetséges hatósági következményeket.\n\n`;
  }
  
  if (data.declarations.includes('requestForDocumentation')) {
    declarations += `Kérjük döntésünk hivatalos dokumentálását a kórházi nyilvántartásban.\n\n`;
  }
  
  // Closing
  const closing = `Tisztelettel:\n\n${data.parentNames}\n(szülő/szülők aláírása)`;
  
  return header + subject + opening + reasoning + toneContent + declarations + closing;
}