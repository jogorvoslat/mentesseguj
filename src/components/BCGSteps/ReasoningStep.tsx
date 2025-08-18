import React from 'react';
import { BCGFormData } from '../../types/bcgForm';

const REASONS = [
  { id: 'immuneSystem', label: 'Az újszülött éretlen immunrendszerének kímélete.' },
  { id: 'conscience', label: 'Lelkiismereti és világnézeti meggyőződés.' },
  { id: 'selfDetermination', label: 'A tájékozott beleegyezésen alapuló önrendelkezési jog.' },
  { id: 'familyHistory', label: 'Családi kórtörténet (pl. autoimmun betegségek) miatti óvatosság.' },
  { id: 'unlawfulDetention', label: 'A gyermek és az anya visszatartásának jogellenessége.' },
];

interface ReasoningStepProps {
  data: BCGFormData;
  onChange: (field: keyof BCGFormData, value: any) => void;
  errors: Record<string, string>;
}

export const ReasoningStep: React.FC<ReasoningStepProps> = ({
  data,
  onChange,
  errors,
}) => {
  const handleReasonChange = (reasonId: string) => {
    const currentReasons = data.reasons || [];
    const newReasons = currentReasons.includes(reasonId)
      ? currentReasons.filter((id) => id !== reasonId)
      : [...currentReasons, reasonId];
    onChange('reasons', newReasons);
  };

  // Automatically include unlawfulDetention if tone is confrontational
  React.useEffect(() => {
    if (data.letterTone === 'confrontational' && !data.reasons.includes('unlawfulDetention')) {
      onChange('reasons', [...data.reasons, 'unlawfulDetention']);
    }
  }, [data.letterTone, data.reasons, onChange]);

  return (
    <div className="space-y-6">
      <p className="text-sm text-gray-600">
        Válassza ki azokat az érveket, amelyeket a levélben szerepeltetni szeretne. Többet is megjelölhet.
      </p>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Indokok *
        </h3>
        <div className="space-y-4">
          {REASONS.map((reason) => (
            <div key={reason.id} className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  type="checkbox"
                  id={reason.id}
                  checked={data.reasons?.includes(reason.id)}
                  onChange={() => handleReasonChange(reason.id)}
                  disabled={reason.id === 'unlawfulDetention' && data.letterTone === 'confrontational'}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
              </div>
              <label
                htmlFor={reason.id}
                className={`ml-3 text-sm font-medium ${
                  reason.id === 'unlawfulDetention' && data.letterTone === 'confrontational'
                    ? 'text-gray-500'
                    : 'text-gray-700'
                }`}
              >
                {reason.label}
                {reason.id === 'unlawfulDetention' && data.letterTone === 'confrontational' && (
                  <span className="text-xs text-gray-500 ml-2">(Automatikus, ha a hangvétel konfrontatív)</span>
                )}
              </label>
            </div>
          ))}
        </div>
        {errors.reasons && (
          <p className="mt-2 text-sm text-red-600">{errors.reasons}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="customReason"
          className="block text-sm font-medium text-gray-700"
        >
          Egyéb, egyéni indoklás (opcionális)
        </label>
        <textarea
          id="customReason"
          value={data.customReason}
          onChange={(e) => onChange('customReason', e.target.value)}
          rows={4}
          placeholder="Fogalmazza meg itt, ha a fentieken kívül más indoka is van."
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>
    </div>
  );
};