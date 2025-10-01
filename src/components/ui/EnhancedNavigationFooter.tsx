import React from 'react';
import { Save, ChevronLeft, ChevronRight, Send } from 'lucide-react';

interface EnhancedNavigationFooterProps {
  currentStep: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => void;
  onSave: () => void;
  isValid: boolean;
  isSubmitting: boolean;
}

export const EnhancedNavigationFooter: React.FC<EnhancedNavigationFooterProps> = ({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
  onSave,
  isValid,
  isSubmitting,
}) => {
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === totalSteps;

  return (
    <div className="sticky bottom-0 z-20 border-t border-gray-200 bg-white shadow-lg">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={onPrevious}
            disabled={isFirstStep || isSubmitting}
            className={`
              inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5
              text-sm font-medium transition-all duration-200
              ${
                isFirstStep || isSubmitting
                  ? 'cursor-not-allowed bg-gray-100 text-gray-400'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300 shadow-sm hover:shadow'
              }
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
            `}
            aria-label="Előző lépés"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Előző</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={onSave}
              disabled={isSubmitting}
              className={`
                inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5
                text-sm font-medium transition-all duration-200
                ${
                  isSubmitting
                    ? 'cursor-not-allowed bg-gray-100 text-gray-400'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300 shadow-sm hover:shadow'
                }
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
              `}
              aria-label="Haladás mentése"
            >
              <Save className="h-4 w-4" />
              <span className="hidden sm:inline">Mentés</span>
            </button>

            <button
              onClick={onNext}
              disabled={!isValid || isSubmitting}
              className={`
                inline-flex items-center justify-center gap-2 rounded-lg px-6 py-2.5
                text-sm font-medium transition-all duration-200
                ${
                  !isValid || isSubmitting
                    ? 'cursor-not-allowed bg-gray-300 text-gray-500'
                    : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md hover:shadow-lg hover:from-blue-700 hover:to-blue-800 transform hover:scale-105'
                }
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
              `}
              aria-label={isLastStep ? 'Űrlap beküldése' : 'Következő lépés'}
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="h-4 w-4 animate-spin text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span>Feldolgozás...</span>
                </>
              ) : isLastStep ? (
                <>
                  <span>Beküldés</span>
                  <Send className="h-4 w-4" />
                </>
              ) : (
                <>
                  <span>Következő</span>
                  <ChevronRight className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-center">
          <p className="text-xs text-gray-500">
            {isValid ? (
              <span className="text-green-600 font-medium">Kész a továbblépésre</span>
            ) : (
              <span>Töltse ki az összes kötelező mezőt</span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};
