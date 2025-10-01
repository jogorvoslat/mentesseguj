import React from 'react';
import { FileText, ClipboardList } from 'lucide-react';

interface FormHeaderProps {
  title: string;
  description: string;
  icon?: 'file' | 'clipboard';
  currentStep: number;
  totalSteps: number;
}

export const FormHeader: React.FC<FormHeaderProps> = ({
  title,
  description,
  icon = 'clipboard',
  currentStep,
  totalSteps,
}) => {
  const progressPercentage = (currentStep / totalSteps) * 100;
  const IconComponent = icon === 'file' ? FileText : ClipboardList;

  return (
    <div className="mb-8 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100 p-6 shadow-sm border border-blue-200">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="rounded-lg bg-white p-3 shadow-sm">
              <IconComponent className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            <p className="mt-1 text-sm text-gray-600">{description}</p>
          </div>
        </div>
        <div className="hidden md:block text-right">
          <p className="text-sm font-medium text-gray-600">Kitöltés folyamata</p>
          <p className="text-2xl font-bold text-blue-600">{Math.round(progressPercentage)}%</p>
        </div>
      </div>

      <div className="mt-4">
        <div className="h-2 w-full overflow-hidden rounded-full bg-white shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
    </div>
  );
};
