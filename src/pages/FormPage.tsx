import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { FormStep, FormData, FormErrors } from '../types/form';
import { StepIndicator } from '../components/StepIndicator';
import { NavigationFooter } from '../components/NavigationFooter';
import { BasicInformation } from '../components/FormSteps/BasicInformation';
import { CurrentVaccination } from '../components/FormSteps/CurrentVaccination';
import { PreviousReactions } from '../components/FormSteps/PreviousReactions';
import { CurrentHealth } from '../components/FormSteps/CurrentHealth';
import { FamilyHistory } from '../components/FormSteps/FamilyHistory';
import { SpecificConcerns } from '../components/FormSteps/SpecificConcerns';
import { Attachments } from '../components/FormSteps/Attachments';
import { ResultPage } from '../components/ResultPage';
import { ClipboardList } from 'lucide-react';
import { supabase } from '../lib/supabase';

const STEPS: FormStep[] = [
  { id: 1, title: 'I. Alapvető Információk' },
  { id: 2, title: 'II. Jelenlegi Oltások' },
  { id: 3, title: 'III. Korábbi Oltási Reakciók' },
  { id: 4, title: 'IV. Jelenlegi Egészségi Állapot' },
  { id: 5, title: 'V. Családi Kórtörténet' },
  { id: 6, title: 'VI. Egyedi Aggályok és Meggyőződések' },
  { id: 7, title: 'VII. Mellékletek' },
];

const initialFormData: FormData = {
  childName: '',
  dateOfBirth: '',
  parentName: '',
  address: '',
  phone: '',
  email: '',
  currentVaccines: [],
  lastVaccinationDate: '',
  hadPreviousReactions: false,
  reactionDetails: '',
  reactionDate: '',
  medicalAttention: false,
  currentHealth: '',
  medications: '',
  allergies: '',
  chronicConditions: '',
  familyHistory: [],
  additionalFamilyDetails: '',
  ingredientConcerns: [],
  otherIngredientConcern: '',
  exemptionReasons: [],
  otherExemptionReason: '',
  religiousBeliefs: '',
  hasSupportingDocuments: false,
  documentDescriptions: '',
};

export function FormPage() {
  const [currentStep, setCurrentStep] = React.useState(1);
  const [formData, setFormData] = React.useState<FormData>(initialFormData);
  const [errors, setErrors] = React.useState<FormErrors>({});
  const [completedSteps, setCompletedSteps] = React.useState<number[]>([]);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [analysisResult, setAnalysisResult] = React.useState<string | null>(null);
  const [submitError, setSubmitError] = React.useState<string | null>(null);
  const navigate = useNavigate();

  const validateStep = (step: number): boolean => {
    const newErrors: FormErrors = {};

    switch (step) {
      case 1:
        if (!formData.childName) newErrors.childName = 'Kötelező mező';
        if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Kötelező mező';
        if (!formData.parentName) newErrors.parentName = 'Kötelező mező';
        if (!formData.address) newErrors.address = 'Kötelező mező';
        if (!formData.phone) newErrors.phone = 'Kötelező mező';
        if (!formData.email) newErrors.email = 'Kötelező mező';
        break;
      case 2:
        if (!formData.currentVaccines.length) newErrors.currentVaccines = 'Válasszon egy oltást';
        break;
      // Add validation for other steps as needed
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: any) => {
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

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) {
      return;
    }

    try {
      setIsSubmitting(true);
      setSubmitError(null);

      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          basicInfo: {
            childName: formData.childName,
            dateOfBirth: formData.dateOfBirth,
            parentName: formData.parentName,
            contactInfo: {
              address: formData.address,
              phone: formData.phone,
              email: formData.email,
            },
          },
          vaccination: {
            currentVaccines: formData.currentVaccines,
            details: formData.otherVaccineDetails || '',
          },
          previousReactions: {
            hadReactions: formData.hadPreviousReactions,
            types: formData.reactionTypes || [],
            details: formData.reactionDetails,
            vaccines: formData.reactionVaccines || '',
            documented: formData.hasDocumentation || false,
          },
          healthStatus: {
            conditions: formData.diagnosedConditions || [],
            otherConditions: formData.otherConditions || '',
            allergies: formData.knownAllergies || [],
            otherAllergies: formData.otherAllergies || '',
            medications: formData.medications,
          },
          familyHistory: {
            conditions: formData.familyHistory,
            details: formData.additionalFamilyDetails,
            extendedFamily: formData.extendedFamilyHistory || false,
          },
          concerns: {
            ingredients: formData.ingredientConcerns,
            otherIngredients: formData.otherIngredientConcern,
            reasons: formData.exemptionReasons,
            otherReasons: formData.otherExemptionReason,
            religiousBeliefs: formData.religiousBeliefs,
          },
          documentation: {
            hasDocuments: formData.hasSupportingDocuments,
            descriptions: formData.documentDescriptions,
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error submitting form: ${errorData.error || response.statusText}`);
      }

      const result = await response.json();
      setAnalysisResult(result.candidates[0].content.parts[0].text);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'An unknown error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/dashboard');
  };

  if (analysisResult) {
    return (
      <ResultPage
        content={analysisResult}
        onBack={() => setAnalysisResult(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <ClipboardList className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">
              Oltási Mentesség Kérelem
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
              <BasicInformation
                data={formData}
                onChange={handleInputChange}
                errors={errors}
              />
            )}
            {currentStep === 2 && (
              <CurrentVaccination
                data={formData}
                onChange={handleInputChange}
                errors={errors}
              />
            )}
            {currentStep === 3 && (
              <PreviousReactions
                data={formData}
                onChange={handleInputChange}
                errors={errors}
              />
            )}
            {currentStep === 4 && (
              <CurrentHealth
                data={formData}
                onChange={handleInputChange}
                errors={errors}
              />
            )}
            {currentStep === 5 && (
              <FamilyHistory
                data={formData}
                onChange={handleInputChange}
                errors={errors}
              />
            )}
            {currentStep === 6 && (
              <SpecificConcerns
                data={formData}
                onChange={handleInputChange}
                errors={errors}
              />
            )}
            {currentStep === 7 && (
              <Attachments
                data={formData}
                onChange={handleInputChange}
                errors={errors}
                isSubmitting={isSubmitting}
              />
            )}
            
            {submitError && (
              <div className="mt-4 rounded-md bg-red-50 p-4">
                <p className="text-sm text-red-700">{submitError}</p>
              </div>
            )}
          </div>

          <NavigationFooter
            currentStep={currentStep}
            totalSteps={STEPS.length}
            onPrevious={handlePrevious}
            onNext={currentStep === STEPS.length ? handleSubmit : handleNext}
            onSave={() => {}}
            isValid={Object.keys(errors).length === 0}
            isSubmitting={isSubmitting}
          />
        </div>
      </div>
    </div>
  );
}