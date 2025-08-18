import React from 'react';
import { BCGFormData } from '../../types/bcgForm';

const RECIPIENTS = [
  { id: 'director', label: 'Kórház Főigazgatója' },
  { id: 'headOfObstetrics', label: 'Szülészeti Osztály Osztályvezető Főorvosa' },
  { id: 'headOfNeonatology', label: 'Újszülött Osztály Osztályvezető Főorvosa' },
];

interface BasicDataStepProps {
  data: BCGFormData;
  onChange: (field: keyof BCGFormData, value: any) => void;
  errors: Record<string, string>;
}

export const BasicDataStep: React.FC<BasicDataStepProps> = ({
  data,
  onChange,
  errors,
}) => {
  const handleRecipientChange = (recipientId: string) => {
    const currentRecipients = data.recipients || [];
    const newRecipients = currentRecipients.includes(recipientId)
      ? currentRecipients.filter((id) => id !== recipientId)
      : [...currentRecipients, recipientId];
    onChange('recipients', newRecipients);
  };

  return (
    <div className="space-y-6">
      <p className="text-sm text-gray-600">
        Kérjük, adja meg a címzéshez és a levél fejlécéhez szükséges alapvető információkat.
      </p>

      <div>
        <label
          htmlFor="hospitalName"
          className="block text-sm font-medium text-gray-700"
        >
          Kórház Hivatalos Neve *
        </label>
        <input
          type="text"
          id="hospitalName"
          value={data.hospitalName}
          onChange={(e) => onChange('hospitalName', e.target.value)}
          placeholder="Példa: Szent János Kórház"
          className={`mt-1 block w-full rounded-md border ${
            errors.hospitalName ? 'border-red-300' : 'border-gray-300'
          } px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
        />
        {errors.hospitalName && (
          <p className="mt-1 text-sm text-red-600">{errors.hospitalName}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Címzettek (többet is választhat) *
        </label>
        <div className="space-y-3">
          {RECIPIENTS.map((recipient) => (
            <div key={recipient.id} className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  type="checkbox"
                  id={recipient.id}
                  checked={data.recipients?.includes(recipient.id)}
                  onChange={() => handleRecipientChange(recipient.id)}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
              </div>
              <label
                htmlFor={recipient.id}
                className="ml-3 text-sm font-medium text-gray-700"
              >
                {recipient.label}
              </label>
            </div>
          ))}
        </div>
        {errors.recipients && (
          <p className="mt-1 text-sm text-red-600">{errors.recipients}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="parentNames"
          className="block text-sm font-medium text-gray-700"
        >
          Szülő(k) Neve *
        </label>
        <input
          type="text"
          id="parentNames"
          value={data.parentNames}
          onChange={(e) => onChange('parentNames', e.target.value)}
          placeholder="Példa: Minta Anna és Minta Béla"
          className={`mt-1 block w-full rounded-md border ${
            errors.parentNames ? 'border-red-300' : 'border-gray-300'
          } px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
        />
        {errors.parentNames && (
          <p className="mt-1 text-sm text-red-600">{errors.parentNames}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="childName"
          className="block text-sm font-medium text-gray-700"
        >
          Gyermek Neve (ha már megszületett)
        </label>
        <input
          type="text"
          id="childName"
          value={data.childName}
          onChange={(e) => onChange('childName', e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div>
        <label
          htmlFor="birthDate"
          className="block text-sm font-medium text-gray-700"
        >
          Születési Dátum / Várható Születési Dátum *
        </label>
        <input
          type="date"
          id="birthDate"
          value={data.birthDate}
          onChange={(e) => onChange('birthDate', e.target.value)}
          className={`mt-1 block w-full rounded-md border ${
            errors.birthDate ? 'border-red-300' : 'border-gray-300'
          } px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
        />
        {errors.birthDate && (
          <p className="mt-1 text-sm text-red-600">{errors.birthDate}</p>
        )}
      </div>
    </div>
  );
};