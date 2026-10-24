export type RiskLevel = 'Low Indicators' | 'Caution' | 'High Concern';

export type SupportedLanguage = 'en' | 'mr' | 'hi' | 'gu' | 'ta' | 'te' | 'kn' | 'bn';

export interface LanguageOption {
  code: SupportedLanguage;
  name: string; // Native script
  labelEn: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', labelEn: 'English' },
  { code: 'mr', name: 'मराठी', labelEn: 'Marathi' },
  { code: 'hi', name: 'हिन्दी', labelEn: 'Hindi' },
  { code: 'gu', name: 'ગુજરાતી', labelEn: 'Gujarati' },
  { code: 'ta', name: 'தமிழ்', labelEn: 'Tamil' },
  { code: 'te', name: 'తెలుగు', labelEn: 'Telugu' },
  { code: 'kn', name: 'ಕನ್ನಡ', labelEn: 'Kannada' },
  { code: 'bn', name: 'বাংলা', labelEn: 'Bengali' },
];

export type VerificationStatus = 'verified' | 'unverified';
export type MatchType = 'exact' | 'normalized' | 'unverified';

export interface SuspiciousStatement {
  statement: string; // Exact verbatim quote from the original message (never translated)
  whyItDeservesAttention: string; // In selected language
  severity: 'high' | 'medium' | 'low';
  severityLabel?: string; // In selected language
  confidenceExplanation: string; // Plain-language explanation of confidence or uncertainty
  practicalAction: string; // One concrete practical action the student can take
  category?: string;
  categoryLabel?: string;
  verifiedInText?: boolean;
  verificationStatus: VerificationStatus;
  matchType?: MatchType;
}

export interface VerificationStep {
  step: string;
  priority: 'immediate' | 'recommended' | 'optional';
  priorityLabel?: string;
  description: string;
}

export interface SafetyAdvice {
  upfrontFees: string;
  otpsAndPasswords: string;
  identityDocuments: string;
  equipmentScams: string;
}

export interface AnalysisResult {
  riskLevel: RiskLevel;
  riskLevelLabel?: string; // In selected language
  confidenceScore?: number;
  conciseExplanation: string; // In selected language
  suspiciousStatements: SuspiciousStatement[];
  missingInformation: string[];
  unverifiedClaims: string[];
  recommendedVerificationSteps: VerificationStep[];
  safetyAdvice: SafetyAdvice;
  modelUsed: string;
  analyzedAt: string;
  messageLength?: number;
  language: SupportedLanguage;
}

export interface ComparisonResult {
  offerA: AnalysisResult;
  offerB: AnalysisResult;
  comparativeSummary: string; // In selected language
  analyzedAt: string;
  language: SupportedLanguage;
}

export interface ModelInfo {
  model: string;
  apiKeyConfigured: boolean;
  status: 'ready' | 'missing_api_key' | 'error';
  message: string;
}
