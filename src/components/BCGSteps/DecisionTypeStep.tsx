import React from 'react';
import { BCGFormData } from '../../types/bcgForm';

interface DecisionTypeStepProps {
  data: BCGFormData;
  onChange: (field: keyof BCGFormData, value: any) => void;
  errors: Record<string, string>;
}

export const DecisionTypeStep: React.FC<DecisionTypeStepProps> = ({
  data,
  onChange,
  errors,
}) => {
  return (
    <div className="space-y-8">
      <p className="text-sm text-gray-600">
        Válassza ki a levél fő célját és stílusát. Ez határozza meg a levél teljes kommunikációját.
      </p>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          A visszautasítás típusa *
        </h3>
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                type="radio"
                id="deferral"
                checked={data.refusalType === 'deferral'}
                onChange={() => onChange('refusalType', 'deferral')}
                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
            </div>
            <label htmlFor="deferral" className="ml-3 text-sm font-medium text-gray-700">
              Halasztást kérek (később, máshol beadatnám)
            </label>
          </div>

          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                type="radio"
                id="permanent"
                checked={data.refusalType === 'permanent'}
                onChange={() => onChange('refusalType', 'permanent')}
                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
            </div>
            <label htmlFor="permanent" className="ml-3 text-sm font-medium text-gray-700">
              Véglegesen elutasítom (sem most, sem később nem kérem)
            </label>
          </div>
        </div>
        {errors.refusalType && (
          <p className="mt-2 text-sm text-red-600">{errors.refusalType}</p>
        )}
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          A levél hangvétele *
        </h3>
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                type="radio"
                id="cooperative"
                checked={data.letterTone === 'cooperative'}
                onChange={() => onChange('letterTone', 'cooperative')}
                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
            </div>
            <label htmlFor="cooperative" className="ml-3 text-sm font-medium text-gray-700">
              Partnerségre törekvő, tisztelettudó
            </label>
          </div>

          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                type="radio"
                id="formal"
                checked={data.letterTone === 'formal'}
                onChange={() => onChange('letterTone', 'formal')}
                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
            </div>
            <label htmlFor="formal" className="ml-3 text-sm font-medium text-gray-700">
              Hivatalos és határozott
            </label>
          </div>

          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                type="radio"
                id="confrontational"
                checked={data.letterTone === 'confrontational'}
                onChange={() => onChange('letterTone', 'confrontational')}
                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
            </div>
            <label htmlFor="confrontational" className="ml-3 text-sm font-medium text-gray-700">
              Konfrontatív és felszólító (jogi lépések kilátásba helyezésével)
            </label>
          </div>
        </div>
        {errors.letterTone && (
          <p className="mt-2 text-sm text-red-600">{errors.letterTone}</p>
        )}
      </div>
    </div>
  );
};