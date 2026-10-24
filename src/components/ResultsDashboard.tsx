import React, { useState } from 'react';
import { 
  AlertTriangle, 
  ShieldAlert, 
  ShieldCheck, 
  Copy, 
  Check, 
  Download, 
  Quote, 
  HelpCircle, 
  CheckCircle2, 
  Info, 
  CreditCard, 
  KeyRound, 
  IdCard, 
  Laptop, 
  RefreshCw,
  Lightbulb,
  ShieldQuestion
} from 'lucide-react';
import { AnalysisResult, RiskLevel, SupportedLanguage, SUPPORTED_LANGUAGES } from '../types/analyzer';
import { TRANSLATIONS } from '../i18n/translations';

interface ResultsDashboardProps {
  result: AnalysisResult;
  onReset: () => void;
  language: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
}

export const ResultsDashboard: React.FC<ResultsDashboardProps> = ({ 
  result, 
  onReset,
  language,
  onLanguageChange
}) => {
  const [copied, setCopied] = useState(false);
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  // Format full evidence-first report text in current language
  const generateReportText = (): string => {
    const divider = '==================================================';
    const subDivider = '--------------------------------------------------';
    
    let text = `INTERNSHIELD — EVIDENCE-FIRST RECRUITMENT RISK REPORT\n`;
    text += `${divider}\n`;
    text += `Analysis Date: ${new Date(result.analyzedAt).toLocaleString()}\n`;
    text += `AI Model: ${result.modelUsed} (Google Gen AI SDK)\n`;
    text += `Language Mode: ${language.toUpperCase()} (${SUPPORTED_LANGUAGES.find(l => l.code === language)?.name || 'English'})\n`;
    text += `Preliminary Risk Level: ${(result.riskLevelLabel || result.riskLevel).toUpperCase()}\n`;
    if (result.confidenceScore) {
      text += `Assessment Confidence: ${result.confidenceScore}%\n`;
    }
    text += `${divider}\n\n`;

    text += `EXECUTIVE SUMMARY:\n`;
    text += `${result.conciseExplanation}\n\n`;

    text += `SECTION 1: OBSERVED WARNING SIGNS (EVIDENCE-FIRST QUOTES)\n`;
    text += `${subDivider}\n`;
    if (result.suspiciousStatements.length === 0) {
      text += `No overt scam signatures or advance-fee patterns were detected in the submitted text.\n\n`;
    } else {
      result.suspiciousStatements.forEach((item, idx) => {
        text += `[FINDING ${idx + 1}]\n`;
        text += `  • EXACT QUOTATION: "${item.statement}"\n`;
        text += `  • EVIDENCE INTEGRITY: ${item.verifiedInText ? 'VERIFIED IN SUBMITTED TEXT' : 'NOT VERIFIED — REQUIRES REVIEW'}\n`;
        text += `  • CATEGORY: ${item.categoryLabel || item.category || 'Recruitment Risk'}\n`;
        text += `  • SEVERITY: ${(item.severityLabel || item.severity || 'medium').toUpperCase()}\n`;
        text += `  • CONCERN EXPLANATION: ${item.whyItDeservesAttention || t.fallbackConcern}\n`;
        text += `  • CONFIDENCE / CERTAINTY: ${item.confidenceExplanation || t.fallbackConfidence}\n`;
        text += `  • ONE PRACTICAL ACTION: ${item.practicalAction || t.fallbackAction}\n\n`;
      });
    }

    text += `SECTION 2: CLAIMS THAT REMAIN UNVERIFIED\n`;
    text += `${subDivider}\n`;
    if (result.unverifiedClaims.length === 0) {
      text += `No unverified superlative claims detected.\n\n`;
    } else {
      result.unverifiedClaims.forEach((claim) => {
        text += `• ${claim}\n`;
      });
      text += `\n`;
    }

    text += `SECTION 3: RECOMMENDED INDEPENDENT VERIFICATION STEPS\n`;
    text += `${subDivider}\n`;
    result.recommendedVerificationSteps.forEach((step, idx) => {
      text += `[${idx + 1}] ${step.step} (${(step.priorityLabel || step.priority || 'recommended').toUpperCase()}):\n`;
      text += `    ${step.description}\n`;
    });
    text += `\n`;

    text += `CRITICAL VERIFICATION PRINCIPLE:\n`;
    text += `A low-risk indicator does NOT prove an employer is legitimate. Absence of red flags in a text snippet only means this specific text lacked obvious scam signatures. Never treat unverified claims as proven facts.\n\n`;

    text += `SAFETY ADVICE (STUDENT DEFENSE MATRIX):\n`;
    text += `${subDivider}\n`;
    text += `• Upfront Fees & UPI: ${result.safetyAdvice.upfrontFees}\n`;
    text += `• OTPs & Passwords: ${result.safetyAdvice.otpsAndPasswords}\n`;
    text += `• Identity Documents (Aadhaar/PAN/SSN): ${result.safetyAdvice.identityDocuments}\n`;
    text += `• Equipment & Courier Deposits: ${result.safetyAdvice.equipmentScams}\n\n`;

    text += `${divider}\n`;
    text += `LEGAL NOTICE: InternShield is an educational advisory tool powered by Gemma 4 (gemma-4-26b-a4b-it). Always cross-verify opportunities with your college placement cell or official corporate registry.\n`;

    return text;
  };

  const handleCopyReport = async () => {
    try {
      await navigator.clipboard.writeText(generateReportText());
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Clipboard copy failed:', err);
    }
  };

  const handleDownloadReport = () => {
    const reportText = generateReportText();
    const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `InternShield-Report-${language}-${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Color config based on preliminary risk level
  const getRiskStyles = (level: RiskLevel) => {
    switch (level) {
      case 'High Concern':
        return {
          badgeBg: 'bg-rose-500/15 border-rose-500/40 text-rose-300',
          containerBorder: 'border-rose-500/30',
          glowClass: 'glow-red',
          accentText: 'text-rose-400',
          icon: <ShieldAlert className="w-8 h-8 text-rose-400" />,
          title: result.riskLevelLabel ? `${result.riskLevelLabel}: ${t.riskHighDesc.slice(0, 40)}...` : t.riskHigh,
          displayLabel: result.riskLevelLabel || t.riskHigh,
          description: t.riskHighDesc,
        };
      case 'Caution':
        return {
          badgeBg: 'bg-amber-500/15 border-amber-500/40 text-amber-300',
          containerBorder: 'border-amber-500/30',
          glowClass: 'glow-amber',
          accentText: 'text-amber-400',
          icon: <AlertTriangle className="w-8 h-8 text-amber-400" />,
          title: result.riskLevelLabel ? `${result.riskLevelLabel}: ${t.riskCautionDesc.slice(0, 40)}...` : t.riskCaution,
          displayLabel: result.riskLevelLabel || t.riskCaution,
          description: t.riskCautionDesc,
        };
      case 'Low Indicators':
      default:
        return {
          badgeBg: 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300',
          containerBorder: 'border-emerald-500/30',
          glowClass: 'glow-teal',
          accentText: 'text-emerald-400',
          icon: <ShieldCheck className="w-8 h-8 text-emerald-400" />,
          title: result.riskLevelLabel ? `${result.riskLevelLabel}: ${t.riskLowDesc.slice(0, 40)}...` : t.riskLow,
          displayLabel: result.riskLevelLabel || t.riskLow,
          description: t.riskLowDesc,
        };
    }
  };

  const riskConfig = getRiskStyles(result.riskLevel);

  return (
    <div className="w-full space-y-6">

      {/* Top Risk Level Banner */}
      <div className={`relative overflow-hidden rounded-2xl bg-slate-900/90 border ${riskConfig.containerBorder} ${riskConfig.glowClass} p-5 sm:p-7 backdrop-blur-md transition-all`}>
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          
          <div className="flex items-start sm:items-center gap-4">
            <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 shadow-inner shrink-0">
              {riskConfig.icon}
            </div>
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider border ${riskConfig.badgeBg}`}>
                  {riskConfig.displayLabel}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  Model: <span className="text-teal-300 font-semibold">{result.modelUsed}</span>
                </span>
                <span className="text-slate-600 hidden sm:inline">•</span>
                <span className="text-xs text-slate-400 hidden sm:inline font-mono">
                  {new Date(result.analyzedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-1.5 tracking-tight">
                {riskConfig.displayLabel}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
                {riskConfig.description}
              </p>
            </div>
          </div>

          {/* Action buttons (Copy, Download, Reset) */}
          <div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap shrink-0 border-t lg:border-t-0 pt-4 lg:pt-0 border-slate-800">
            <button
              onClick={handleCopyReport}
              type="button"
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-semibold text-xs transition-all border shadow-sm cursor-pointer ${
                copied
                  ? 'bg-emerald-500/20 border-emerald-500/60 text-emerald-300'
                  : 'bg-teal-500 hover:bg-teal-400 text-slate-950 border-teal-400 shadow-teal-500/20'
              }`}
              title="Copy formatted text report to clipboard"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>{t.toastCopied}</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>{t.copyReportBtn}</span>
                </>
              )}
            </button>

            <button
              onClick={handleDownloadReport}
              type="button"
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700/80 border border-slate-700 text-slate-200 text-xs font-semibold transition-colors cursor-pointer"
              title="Download analysis report as a text file"
            >
              <Download className="w-4 h-4 text-teal-400" />
              <span className="hidden sm:inline">{t.downloadBtn}</span>
            </button>

            <button
              onClick={onReset}
              type="button"
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition-colors cursor-pointer"
              title="Analyze another offer text"
            >
              <RefreshCw className="w-4 h-4 text-slate-400" />
              <span>{t.newAnalysisBtn}</span>
            </button>
          </div>

        </div>

      </div>

      {/* CRITICAL VERIFICATION PRINCIPLE BANNER */}
      <div className="rounded-2xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-900 border border-amber-500/30 p-4 sm:p-5 flex items-start gap-3.5 shadow-md">
        <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 shrink-0 mt-0.5">
          <ShieldQuestion className="w-5 h-5" />
        </div>
        <div className="text-xs space-y-1">
          <h4 className="font-bold text-amber-300 uppercase tracking-wider font-mono">
            {t.criticalPrincipleTitle}
          </h4>
          <p className="text-slate-300 leading-relaxed">
            {t.criticalPrincipleDesc}
          </p>
        </div>
      </div>

      {/* Executive Concise Explanation */}
      <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-5 sm:p-6 backdrop-blur-sm shadow-md">
        <div className="flex items-center gap-2.5 mb-2.5">
          <Info className="w-4 h-4 text-teal-400" />
          <h3 className="text-sm font-bold text-white tracking-wide uppercase font-mono">
            {t.executiveSummaryTitle}
          </h3>
        </div>
        <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-sans bg-[#080d1a] p-4 rounded-xl border border-slate-800/80">
          {result.conciseExplanation}
        </p>
      </div>

      {/* SECTION 1: Observed Warning Signs (Evidence-First Analysis) */}
      <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-5 sm:p-6 backdrop-blur-sm shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5 flex-wrap">
            <Quote className="w-4 h-4 text-teal-400" />
            <h3 className="text-base font-bold text-white tracking-wide">
              {t.section1Title}
            </h3>
            <span className="px-2 py-0.5 rounded-full bg-slate-800 text-[11px] font-mono text-slate-300 font-semibold border border-slate-700">
              {result.suspiciousStatements.length} {t.findingsCountLabel}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-teal-300 font-mono bg-teal-950/70 px-2.5 py-1 rounded-lg border border-teal-800/60 shadow-sm">
            <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
            <span>{t.evidenceIntegrityHeader}</span>
          </div>
        </div>

        {result.suspiciousStatements.length === 0 ? (
          <div className="p-6 rounded-xl bg-slate-950/60 border border-slate-800/80 text-center">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2 opacity-80" />
            <p className="text-sm font-medium text-slate-200">
              {t.noFindingsTitle}
            </p>
            <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
              {t.noFindingsSubtitle}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {result.suspiciousStatements.map((item, index) => {
              const isVerified = Boolean(item.verifiedInText && item.verificationStatus !== 'unverified');
              const severityBadge = item.severity === 'high'
                ? 'bg-rose-950/80 border-rose-600 text-rose-300'
                : item.severity === 'medium'
                ? 'bg-amber-950/80 border-amber-600 text-amber-300'
                : 'bg-blue-950/80 border-blue-600 text-blue-300';

              const concernExplanation = item.whyItDeservesAttention?.trim() || t.fallbackConcern;
              const actionStep = item.practicalAction?.trim() || t.fallbackAction;
              const confidence = item.confidenceExplanation?.trim() || t.fallbackConfidence;
              const categoryName = item.categoryLabel?.trim() || item.category || t.fallbackCategory;

              return (
                <div 
                  key={index}
                  className={`rounded-xl bg-[#080d1c] border p-4.5 transition-all space-y-3 ${
                    isVerified ? 'border-slate-800/90 hover:border-slate-700' : 'border-amber-500/40 bg-amber-950/10'
                  }`}
                >
                  {/* Top Bar: Finding index, Severity, Category, and Evidence Integrity Status */}
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-mono font-bold text-teal-400">
                        {t.findingLabel} #{index + 1}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-bold border ${severityBadge}`}>
                        {item.severityLabel || item.severity || 'Medium'}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-slate-800 text-slate-300 border border-slate-700">
                        {categoryName}
                      </span>
                    </div>

                    {/* Clear Verification Status Badge */}
                    {isVerified ? (
                      <span className="flex items-center gap-1.5 text-[11px] font-mono font-semibold text-emerald-300 bg-emerald-950/70 px-2.5 py-1 rounded-lg border border-emerald-500/50 shadow-[0_0_8px_rgba(16,185,129,0.15)]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{t.verifiedInTextBadge}</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 text-[11px] font-mono font-semibold text-amber-300 bg-amber-950/80 px-2.5 py-1 rounded-lg border border-amber-500/50 shadow-[0_0_8px_rgba(245,158,11,0.2)]">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                        <span>{t.notVerifiedBadge}</span>
                      </span>
                    )}
                  </div>

                  {/* Flagged unverified notice if citation was not found verbatim */}
                  {!isVerified && (
                    <div className="flex items-start gap-2 p-2.5 rounded-lg bg-amber-950/30 border border-amber-500/40 text-amber-200 text-xs">
                      <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-amber-300 font-semibold">{t.notVerifiedBadge}:</strong>{' '}
                        <span>{t.unverifiedQuoteNotice}</span>
                      </div>
                    </div>
                  )}

                  {/* 1. Exact Quotation (Never translated, strictly verbatim text) */}
                  <div className={`relative pl-3.5 border-l-2 ${isVerified ? 'border-teal-500/50' : 'border-amber-500/50'}`}>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1 flex items-center justify-between">
                      <span>{t.exactQuoteLabel}</span>
                      {isVerified && item.matchType && (
                        <span className="text-[10px] font-mono text-teal-400/80">
                          Match: {item.matchType}
                        </span>
                      )}
                    </div>
                    <p className="text-sm font-mono text-slate-100 bg-slate-950/80 p-3 rounded-lg border border-slate-800/90 select-all leading-relaxed">
                      "{item.statement || '(No quote extracted)'}"
                    </p>
                  </div>

                  {/* 2. Concern Explanation */}
                  <div className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-lg border border-slate-800/60">
                    <span className="font-bold text-teal-400 mr-1.5">
                      {t.whyConcernLabel}
                    </span>
                    <span>{concernExplanation}</span>
                  </div>

                  {/* 3. Plain Language Confidence & Uncertainty */}
                  <div className="text-xs text-slate-300 leading-relaxed bg-slate-900/40 p-2.5 rounded-lg border border-slate-800/50 flex items-start gap-2">
                    <Info className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-cyan-300 mr-1">
                        {t.confidenceLabel}
                      </span>
                      <span>{confidence}</span>
                    </div>
                  </div>

                  {/* 4. One Practical Action the Student Can Take */}
                  <div className="text-xs text-amber-200 leading-relaxed bg-amber-950/30 p-3 rounded-lg border border-amber-600/30 flex items-start gap-2">
                    <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-amber-300 mr-1">
                        {t.practicalActionLabel}
                      </span>
                      <span>{actionStep}</span>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* SECTION 2: Claims That Remain Unverified */}
      <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-5 sm:p-6 backdrop-blur-sm shadow-md">
        <div className="flex items-center gap-2 mb-3 pb-2.5 border-b border-slate-800">
          <HelpCircle className="w-4 h-4 text-cyan-400" />
          <h3 className="text-base font-bold text-white tracking-wide">
            {t.section2Title}
          </h3>
        </div>
        <p className="text-xs text-slate-400 mb-3">
          {t.section2Subtitle}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {result.unverifiedClaims.length > 0 ? (
            result.unverifiedClaims.map((claim, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-200 bg-[#080d1c] p-3 rounded-xl border border-slate-800/80">
                <span className="text-cyan-400 font-mono font-bold mt-0.5">•</span>
                <span>{claim}</span>
              </div>
            ))
          ) : (
            <div className="text-xs text-slate-400 italic p-3 bg-slate-950/40 rounded-xl">
              {t.noUnverifiedClaims}
            </div>
          )}
        </div>
      </div>

      {/* SECTION 3: Recommended Independent Verification Steps */}
      <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-5 sm:p-6 backdrop-blur-sm shadow-md">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-teal-400" />
            <h3 className="text-base font-bold text-white tracking-wide">
              {t.section3Title}
            </h3>
          </div>
          <span className="text-xs font-mono text-teal-400">{t.playbookTag}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {result.recommendedVerificationSteps.map((step, idx) => {
            const priorityBadge = step.priority === 'immediate'
              ? 'bg-rose-950/80 text-rose-300 border-rose-700'
              : step.priority === 'recommended'
              ? 'bg-teal-950/80 text-teal-300 border-teal-700'
              : 'bg-slate-800 text-slate-300 border-slate-700';

            return (
              <div 
                key={idx}
                className="rounded-xl bg-[#080d1c] border border-slate-800 p-4 flex flex-col justify-between hover:border-slate-700 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-mono font-bold text-slate-400">
                      {t.stepLabel} {idx + 1}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-bold border ${priorityBadge}`}>
                      {step.priorityLabel || step.priority || 'Recommended'}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1.5">
                    {step.step}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* STUDENT SAFETY DEFENSE MATRIX */}
      <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-5 sm:p-6 backdrop-blur-sm shadow-md">
        <div className="mb-4 pb-3 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-bold text-white tracking-wide flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-teal-400" />
              <span>{t.safetyMatrixTitle}</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              {t.safetyMatrixSubtitle}
            </p>
          </div>
          <span className="text-xs font-mono text-teal-400 px-2.5 py-1 rounded-md bg-teal-950/60 border border-teal-800/80 self-start sm:self-auto">
            {t.zeroToleranceBadge}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Upfront Fees & UPI Scams */}
          <div className="rounded-xl bg-[#080d1c] border border-slate-800/90 p-4">
            <div className="flex items-center gap-2 text-rose-400 mb-2">
              <CreditCard className="w-4 h-4" />
              <h4 className="text-xs font-bold uppercase tracking-wider font-mono">
                {t.safetyUpfrontTitle}
              </h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {result.safetyAdvice.upfrontFees}
            </p>
          </div>

          {/* OTPs & Passwords */}
          <div className="rounded-xl bg-[#080d1c] border border-slate-800/90 p-4">
            <div className="flex items-center gap-2 text-amber-400 mb-2">
              <KeyRound className="w-4 h-4" />
              <h4 className="text-xs font-bold uppercase tracking-wider font-mono">
                {t.safetyOtpsTitle}
              </h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {result.safetyAdvice.otpsAndPasswords}
            </p>
          </div>

          {/* Identity Documents (Aadhaar/PAN/SSN) */}
          <div className="rounded-xl bg-[#080d1c] border border-slate-800/90 p-4">
            <div className="flex items-center gap-2 text-cyan-400 mb-2">
              <IdCard className="w-4 h-4" />
              <h4 className="text-xs font-bold uppercase tracking-wider font-mono">
                {t.safetyIdTitle}
              </h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {result.safetyAdvice.identityDocuments}
            </p>
          </div>

          {/* Equipment & Courier Scams */}
          <div className="rounded-xl bg-[#080d1c] border border-slate-800/90 p-4">
            <div className="flex items-center gap-2 text-teal-400 mb-2">
              <Laptop className="w-4 h-4" />
              <h4 className="text-xs font-bold uppercase tracking-wider font-mono">
                {t.safetyEquipmentTitle}
              </h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {result.safetyAdvice.equipmentScams}
            </p>
          </div>

        </div>
      </div>

      {/* Analytical Limitations Notice */}
      <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-[11px] text-slate-400 leading-relaxed flex items-start gap-2.5">
        <Info className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
        <div>
          {t.disclaimerNotice}
        </div>
      </div>

    </div>
  );
};
