import React from 'react';
import { Check } from 'lucide-react';

interface Step {
  id: number;
  title: string;
  isCompleted?: boolean;
}

interface EnhancedStepIndicatorProps {
  steps: Step[];
  currentStep: number;
  onStepClick: (step: number) => void;
}

export const EnhancedStepIndicator: React.FC<EnhancedStepIndicatorProps> = ({
  steps,
  currentStep,
  onStepClick,
}) => {
  const progressPercentage = ((currentStep - 1) / (steps.length - 1)) * 100;

  return (
    <div className="w-full">
      <div className="relative">
        <div className="absolute left-0 top-5 h-0.5 w-full bg-gray-200" />
        <div
          className="absolute left-0 top-5 h-0.5 bg-blue-600 transition-all duration-500 ease-out"
          style={{ width: `${progressPercentage}%` }}
        />

        <div className="relative flex justify-between">
          {steps.map((step) => {
            const isActive = currentStep === step.id;
            const isCompleted = step.isCompleted || step.id < currentStep;
            const canClick = isCompleted || step.id <= currentStep;
            const isPast = step.id < currentStep;

            return (
              <div
                key={step.id}
                className="flex flex-col items-center"
                style={{ width: `${100 / steps.length}%` }}
              >
                <button
                  onClick={() => canClick && onStepClick(step.id)}
                  disabled={!canClick}
                  className={`
                    relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2
                    transition-all duration-300 ease-out
                    ${
                      isActive
                        ? 'border-blue-600 bg-blue-600 text-white shadow-lg shadow-blue-200 scale-110'
                        : isCompleted
                        ? 'border-green-500 bg-green-500 text-white shadow-md hover:shadow-lg'
                        : 'border-gray-300 bg-white text-gray-400'
                    }
                    ${canClick ? 'cursor-pointer hover:scale-105' : 'cursor-not-allowed'}
                    ${isActive ? 'ring-4 ring-blue-100' : ''}
                  `}
                  aria-label={`Step ${step.id}: ${step.title}`}
                  aria-current={isActive ? 'step' : undefined}
                >
                  {isCompleted && !isActive ? (
                    <Check className="h-5 w-5" strokeWidth={3} />
                  ) : (
                    <span className={`text-sm font-bold ${isActive ? 'text-white' : ''}`}>
                      {step.id}
                    </span>
                  )}
                </button>

                <div className="mt-3 text-center">
                  <p
                    className={`
                      text-xs font-medium transition-colors duration-300
                      ${isActive ? 'text-blue-600' : isPast ? 'text-gray-600' : 'text-gray-400'}
                    `}
                  >
                    {step.title}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center">
        <div className="text-center">
          <p className="text-sm text-gray-500">
            Lépés <span className="font-semibold text-gray-900">{currentStep}</span> /{' '}
            {steps.length}
          </p>
          <div className="mt-2">
            <div className="h-1.5 w-48 overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500 ease-out"
                style={{ width: `${(currentStep / steps.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
