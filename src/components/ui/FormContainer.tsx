import React from 'react';

interface FormContainerProps {
  children: React.ReactNode;
  stepTitle: string;
  stepDescription?: string;
}

export const FormContainer: React.FC<FormContainerProps> = ({
  children,
  stepTitle,
  stepDescription,
}) => {
  return (
    <div className="rounded-xl bg-white shadow-lg border border-gray-200 overflow-hidden">
      <div className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white px-6 py-5">
        <h2 className="text-xl font-semibold text-gray-900">{stepTitle}</h2>
        {stepDescription && (
          <p className="mt-1 text-sm text-gray-600">{stepDescription}</p>
        )}
      </div>

      <div className="px-6 py-8">
        <div className="space-y-6">{children}</div>
      </div>
    </div>
  );
};
