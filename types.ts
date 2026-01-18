export interface CalculationData {
  monthlyAmount: number;
  years: number;
  totalProtectionNeeded: number;
}

export interface LeadFormData {
  name: string;
  birthday: string;
  isSmoker: string; // 'yes' | 'no'
  gender: string; // 'male' | 'female'
  phone: string;
  email: string;
}

export interface QuotePayload extends LeadFormData {
  calculation: CalculationData;
}