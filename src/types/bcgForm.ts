export interface BCGFormStep {
  id: number;
  title: string;
  isCompleted?: boolean;
}

export interface BCGFormData {
  // Step 1: Basic Information
  hospitalName: string;
  recipients: string[];
  parentNames: string;
  childName: string;
  birthDate: string;

  // Step 2: Decision Type and Tone
  refusalType: 'deferral' | 'permanent' | '';
  letterTone: 'cooperative' | 'formal' | 'confrontational' | '';

  // Step 3: Reasoning
  reasons: string[];
  customReason: string;

  // Step 4: Final Declarations
  declarations: string[];
}

export type BCGFormErrors = Partial<Record<keyof BCGFormData, string>>;