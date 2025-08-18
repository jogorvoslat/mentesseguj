import React from 'react';
import { BCGFormData } from '../../types/bcgForm';
import { Loader2 } from 'lucide-react';

const DECLARATIONS = [
  { id: 'responsibilityForDeferral', label: 'Nyilatkozat a későbbi oltás felelősségteljes pótlásáról.' },
  { id: 'awarenessOfConsequences', label: 'A lehetséges hatósági következmények tudomásulvétele.' },
  { id: 'requestForDocumentation', label: 'Kérés a döntés hivatalos kórházi dokumentációjára.' },
];

interface FinalDeclarationsStepProps {
  data: BCGFormData;
  onChange: (field: keyof BCGFormData, value: any) => void;
  errors: Record<string, string>;
  isGenerating?: boolean;
}

export const FinalDeclarationsStep: React.FC<FinalDeclarationsStepProps> = ({
  data,
  onChange,
  errors,
  isGenerating = false,
}) => {
  const handleDeclarationChange = (declarationId: string) => {
    const currentDeclarations = data.declarations || [];
    const newDeclarations = currentDeclarations.includes(declarationId)
      ? currentDeclarations.filter((id) => id !== declarationId)
      : [...currentDeclarations, declarationId];
    onChange('declarations', newDeclarations);
  };

  // Automatically include responsibilityForDeferral if refusal type is deferral
  React.useEffect(() => {
    if (data.refusalType === 'deferral' && !data.declarations.includes('responsibilityForDeferral')) {
      onChange('declarations', [...data.declarations, 'responsibilityForDeferral']);
    }
  }, [data.refusalType, data.declarations, onChange]);

  return (
    <div className="space-y-6">
      <p className="text-sm text-gray-600">
        Adja meg, milyen záró nyilatkozatokat tartalmazzon a levél, majd generálja a dokumentumot.
      </p>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Záró Nyilatkozatok
        </h3>
        <div className="space-y-4">
          {DECLARATIONS.map((declaration) => (
            <div key={declaration.id} className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  type="checkbox"
                  id={declaration.id}
                  checked={data.declarations?.includes(declaration.id)}
                  onChange={() => handleDeclarationChange(declaration.id)}
                  disabled={
                    (declaration.id === 'responsibilityForDeferral' && data.refusalType === 'deferral') ||
                    isGenerating
                  }
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
              </div>
              <label
                htmlFor={declaration.id}
                className={`ml-3 text-sm font-medium ${
                  declaration.id === 'responsibilityForDeferral' && data.refusalType === 'deferral'
                    ? 'text-gray-500'
                    : 'text-gray-700'
                }`}
              >
                {declaration.label}
                {declaration.id === 'responsibilityForDeferral' && data.refusalType === 'deferral' && (
                  <span className="text-xs text-gray-500 ml-2">(Automatikus, ha halasztást kér)</span>
                )}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
        <h4 className="text-sm font-medium text-blue-900 mb-2">
          Levél Generálása
        </h4>
        <p className="text-sm text-blue-700">
          A "Levél Generálása" gombra kattintva a megadott adatok alapján automatikusan elkészül a hivatalos levél.
        </p>
      </div>

      {isGenerating && (
        <div className="fixed inset-0 bg-white/80 flex items-center justify-center z-50">
          <div className="flex flex-col items-center gap-4 p-4 rounded-lg bg-white shadow-lg">
            <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
            <p className="text-gray-700 font-medium">Levél generálása folyamatban...</p>
          </div>
        </div>
      )}
    </div>
  );
};