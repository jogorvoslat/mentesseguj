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
  const [generateError, setGenerateError] = useState<string | null>(null);
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

  const generateLetter = async () => {
    if (!validateStep(currentStep)) {
      return;
    }

    try {
      setIsGenerating(true);
      setGenerateError(null);

      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-bcg-letter`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Hiba a levél generálásakor: ${errorData.error || response.statusText}`);
      }

      const result = await response.json();
      setGeneratedLetter(result.candidates[0].content.parts[0].text);
    } catch (error) {
      setGenerateError(error instanceof Error ? error.message : 'Ismeretlen hiba történt');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = () => {
    // Placeholder for save functionality
    console.log('Mentés funkció még nem implementált');
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

          {generateError && (
            <div className="px-6 pb-4">
              <div className="rounded-md bg-red-50 p-4">
                <p className="text-sm text-red-700">{generateError}</p>
              </div>
            </div>
          )}

          <NavigationFooter
            currentStep={currentStep}
            totalSteps={STEPS.length}
            onPrevious={handlePrevious}
            onNext={currentStep === STEPS.length ? generateLetter : handleNext}
            onSave={handleSave}
            isValid={Object.keys(errors).length === 0}
            isSubmitting={isGenerating}
          />
        </div>
      </div>
    </div>
  );
}