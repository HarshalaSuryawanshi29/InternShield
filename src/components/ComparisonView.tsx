import React, { useState } from 'react';
import { 
  GitCompare, 
  Loader2, 
  Copy, 
  Check, 
  Trash2, 
  Info,
  ShieldQuestion,
  Quote
} from 'lucide-react';
import { ComparisonResult, AnalysisResult, SupportedLanguage } from '../types/analyzer';
import { SAMPLES } from '../data/samples';
import { TRANSLATIONS } from '../i18n/translations';

interface ComparisonViewProps {
  language: SupportedLanguage;
}

export const ComparisonView: React.FC<ComparisonViewProps> = ({ language }) => {
  const [textA, setTextA] = useState<string>('');
  const [textB, setTextB] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingStep, setLoadingStep] = useState<string>('');
  const [comparisonResult, setComparisonResult] = useState<ComparisonResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  const canCompare = textA.trim().length >= 15 && textB.trim().length >= 15 && !isLoading;

  const handleLoadPreset = (preset: 'global' | 'indian') => {
    if (preset === 'global') {
      setTextA(SAMPLES.suspicious.text);
      setTextB(SAMPLES.credible.text);
    } else {
      setTextA(SAMPLES.indianSuspicious.text);
      setTextB(SAMPLES.indianCredible.text);
    }
    setError(null);
    setComparisonResult(null);
  };

  const handleClear = () => {
    setTextA('');
    setTextB('');
    setError(null);
    setComparisonResult(null);
  };

  const handleCompare = async () => {
    if (!canCompare) return;

    setIsLoading(true);
    setError(null);
    setLoadingStep(t.loadingStepSanitize);

    const timer = setTimeout(() => {
      setLoadingStep(t.comparingBtn);
    }, 1200);

    try {
      const response = await fetch('/api/compare', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messageA: textA, messageB: textB, language }),
      });

      clearTimeout(timer);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to complete comparative analysis.');
      }

      setComparisonResult(data);
    } catch (err: any) {
      console.error('Comparative analysis error:', err);
      setError(err.message || 'An error occurred during comparison.');
    } finally {
      setIsLoading(false);
      setLoadingStep('');
    }
  };

  const handleCopyComparison = async () => {
    if (!comparisonResult) return;
    const divider = '==================================================';
    let text = `INTERNSHIELD — DUAL OFFER COMPARATIVE AUDIT\n`;
    text += `${divider}\n`;
    text += `Comparison Date: ${new Date(comparisonResult.analyzedAt).toLocaleString()}\n`;
    text += `AI Model: gemma-4-26b-a4b-it\n`;
    text += `Language: ${language.toUpperCase()}\n\n`;

    text += `COMPARATIVE SUMMARY:\n`;
    text += `${comparisonResult.comparativeSummary}\n\n`;

    text += `OFFER A SUMMARY:\n`;
    text += `• Risk Level: ${comparisonResult.offerA.riskLevelLabel || comparisonResult.offerA.riskLevel}\n`;
    text += `• Warning Signs: ${comparisonResult.offerA.suspiciousStatements.length} identified\n`;
    text += `• Explanation: ${comparisonResult.offerA.conciseExplanation}\n\n`;

    text += `OFFER B SUMMARY:\n`;
    text += `• Risk Level: ${comparisonResult.offerB.riskLevelLabel || comparisonResult.offerB.riskLevel}\n`;
    text += `• Warning Signs: ${comparisonResult.offerB.suspiciousStatements.length} identified\n`;
    text += `• Explanation: ${comparisonResult.offerB.conciseExplanation}\n\n`;

    text += `${divider}\n`;
    text += `VERIFICATION NOTICE: ${t.comparisonWarningNote}\n`;

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (e) {
      console.error('Copy failed', e);
    }
  };

  const renderOfferColumn = (offer: AnalysisResult, label: string) => {
    const isHigh = offer.riskLevel === 'High Concern';
    const isCaution = offer.riskLevel === 'Caution';
    const badgeColor = isHigh 
      ? 'bg-rose-950/80 border-rose-500 text-rose-300' 
      : isCaution 
      ? 'bg-amber-950/80 border-amber-500 text-amber-300' 
      : 'bg-emerald-950/80 border-emerald-500 text-emerald-300';

    return (
      <div className="flex-1 rounded-2xl bg-slate-900/80 border border-slate-800 p-5 space-y-4">
        
        {/* Column Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
              {label}
            </span>
            <h4 className="text-base font-bold text-white mt-0.5">
              {offer.riskLevelLabel || offer.riskLevel}
            </h4>
          </div>
          <span className={`px-2.5 py-1 rounded-full text-xs font-mono font-bold border ${badgeColor}`}>
            {offer.suspiciousStatements.length} {t.warningSignsCount}
          </span>
        </div>

        {/* Concise Explanation */}
        <div className="bg-[#080d1a] p-3.5 rounded-xl border border-slate-800/80 text-xs text-slate-200 leading-relaxed">
          <span className="font-semibold text-teal-400 block mb-1">
            {t.executiveSummaryTitle}:
          </span>
          {offer.conciseExplanation}
        </div>

        {/* Observed Warning Signs */}
        <div>
          <h5 className="text-xs font-mono font-bold uppercase text-slate-300 mb-2 flex items-center gap-1.5">
            <Quote className="w-3.5 h-3.5 text-teal-400" />
            <span>{t.section1Title}</span>
          </h5>

          {offer.suspiciousStatements.length === 0 ? (
            <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/60 text-xs text-slate-400 italic">
              {t.noWarningsInOffer}
            </div>
          ) : (
            <div className="space-y-2.5">
              {offer.suspiciousStatements.map((item, idx) => {
                const isVerified = Boolean(item.verifiedInText && item.verificationStatus !== 'unverified');
                return (
                  <div 
                    key={idx} 
                    className={`bg-[#080d1c] p-3 rounded-xl border space-y-2 text-xs transition-all ${
                      isVerified ? 'border-slate-800/80' : 'border-amber-500/40 bg-amber-950/15'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <span className="font-mono text-[10px] text-teal-400 font-bold uppercase">
                        {item.categoryLabel || item.category || t.fallbackCategory}
                      </span>
                      {isVerified ? (
                        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-800/60 flex items-center gap-1">
                          <Check className="w-2.5 h-2.5" />
                          <span>{t.verifiedInTextBadge}</span>
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono text-amber-300 bg-amber-950/80 px-1.5 py-0.5 rounded border border-amber-600/60 flex items-center gap-1">
                          <span>{t.notVerifiedBadge}</span>
                        </span>
                      )}
                    </div>
                    <p className="font-mono text-slate-200 bg-slate-950/80 p-2 rounded border border-slate-800 leading-relaxed">
                      "{item.statement}"
                    </p>
                    <p className="text-slate-300 leading-relaxed">
                      <strong className="text-teal-400">{t.whyConcernLabel}</strong>{' '}
                      {item.whyItDeservesAttention || t.fallbackConcern}
                    </p>
                    <div className="p-2 bg-amber-950/20 rounded border border-amber-600/30 text-amber-200 text-[11px]">
                      <strong className="text-amber-300">{t.practicalActionLabel}</strong>{' '}
                      {item.practicalAction || t.fallbackAction}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Unverified Claims */}
        <div>
          <h5 className="text-xs font-mono font-bold uppercase text-slate-300 mb-1.5">
            {t.section2Title}
          </h5>
          <ul className="space-y-1.5 text-xs text-slate-300">
            {offer.unverifiedClaims.length > 0 ? (
              offer.unverifiedClaims.map((c, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-cyan-400 font-mono">•</span>
                  <span>{c}</span>
                </li>
              ))
            ) : (
              <li className="text-slate-400 italic text-[11px]">{t.noUnverifiedClaims}</li>
            )}
          </ul>
        </div>

        {/* Top Verification Step */}
        {offer.recommendedVerificationSteps.length > 0 && (
          <div className="pt-2 border-t border-slate-800">
            <span className="text-[11px] font-mono font-semibold text-teal-400 block mb-1">
              {t.topActionLabel}
            </span>
            <div className="text-xs text-slate-300 bg-slate-950/70 p-2.5 rounded-lg border border-slate-800">
              <strong className="text-white block">
                {offer.recommendedVerificationSteps[0].step}
              </strong>
              <span className="mt-0.5 block text-slate-400">
                {offer.recommendedVerificationSteps[0].description}
              </span>
            </div>
          </div>
        )}

      </div>
    );
  };

  return (
    <div className="w-full space-y-6">

      {/* Comparison Intro Header */}
      <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-5 sm:p-6 shadow-xl backdrop-blur-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <GitCompare className="w-5 h-5 text-teal-400" />
              <h2 className="text-lg font-bold text-white tracking-wide">
                {t.compareTitle}
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              {t.compareSubtitle}
            </p>
          </div>

          {/* Quick Presets */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-mono text-slate-400 mr-1">
              {t.presetsLabel}
            </span>
            <button
              onClick={() => handleLoadPreset('global')}
              disabled={isLoading}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-colors cursor-pointer"
            >
              {t.presetGlobal}
            </button>
            <button
              onClick={() => handleLoadPreset('indian')}
              disabled={isLoading}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-600/40 text-xs font-semibold transition-colors cursor-pointer"
            >
              {t.presetIndian}
            </button>
            {(textA || textB) && (
              <button
                onClick={handleClear}
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-300 transition-colors cursor-pointer"
                title="Clear both inputs"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Dual Textareas Input Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
          
          {/* Message A */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-teal-400 font-bold">
                {t.offerALabel}
              </span>
              <span className="text-slate-400">{textA.length.toLocaleString()} {t.charCountLabel}</span>
            </div>
            <textarea
              value={textA}
              onChange={(e) => setTextA(e.target.value)}
              disabled={isLoading}
              rows={8}
              placeholder={t.offerAPlaceholder}
              className="w-full bg-[#070c18] border border-slate-800 rounded-xl p-3 text-xs text-slate-100 placeholder:text-slate-500 font-sans focus:outline-none focus:border-teal-500/80 transition-all resize-y min-h-[180px]"
            />
          </div>

          {/* Message B */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-cyan-400 font-bold">
                {t.offerBLabel}
              </span>
              <span className="text-slate-400">{textB.length.toLocaleString()} {t.charCountLabel}</span>
            </div>
            <textarea
              value={textB}
              onChange={(e) => setTextB(e.target.value)}
              disabled={isLoading}
              rows={8}
              placeholder={t.offerBPlaceholder}
              className="w-full bg-[#070c18] border border-slate-800 rounded-xl p-3 text-xs text-slate-100 placeholder:text-slate-500 font-sans focus:outline-none focus:border-cyan-500/80 transition-all resize-y min-h-[180px]"
            />
          </div>

        </div>

        {/* Action Button */}
        <div className="mt-5 pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-400 font-mono">
            Model: <span className="text-teal-300 font-semibold">gemma-4-26b-a4b-it</span> • Language: <span className="text-teal-300 font-semibold">{language.toUpperCase()}</span>
          </div>

          <button
            onClick={handleCompare}
            disabled={!canCompare}
            className={`w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs tracking-wide transition-all cursor-pointer ${
              canCompare
                ? 'bg-gradient-to-r from-teal-500 to-cyan-400 text-slate-950 hover:brightness-110 shadow-lg shadow-teal-500/20 active:scale-[0.98]'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-800'
            }`}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                <span>{loadingStep || t.comparingBtn}</span>
              </>
            ) : (
              <>
                <GitCompare className="w-4 h-4" />
                <span>{t.compareBtn}</span>
              </>
            )}
          </button>
        </div>

        {error && (
          <div className="mt-4 p-4 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-200 text-xs">
            {error}
          </div>
        )}
      </div>

      {/* Comparison Results Dashboard */}
      {comparisonResult && (
        <div className="space-y-6 animate-fade-in">
          
          {/* Comparative Summary Card */}
          <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-[#0a1226] to-slate-900 border border-teal-500/30 p-5 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-teal-400" />
                <h3 className="text-sm font-bold text-white tracking-wide font-mono uppercase">
                  {t.comparativeSummaryTitle}
                </h3>
              </div>

              <button
                onClick={handleCopyComparison}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-500/10 hover:bg-teal-500/20 border border-teal-500/40 text-teal-300 text-xs font-semibold self-start sm:self-auto transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? t.toastCopied : t.copyComparisonBtn}</span>
              </button>
            </div>

            <p className="text-sm text-slate-200 leading-relaxed bg-[#080d1a] p-4 rounded-xl border border-slate-800/80">
              {comparisonResult.comparativeSummary}
            </p>

            <div className="mt-3 p-3 rounded-xl bg-amber-950/30 border border-amber-600/30 flex items-start gap-2.5 text-xs text-amber-200 leading-relaxed">
              <ShieldQuestion className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>
                {t.comparisonWarningNote}
              </span>
            </div>
          </div>

          {/* Side by Side Columns */}
          <div className="flex flex-col md:flex-row gap-6">
            {renderOfferColumn(comparisonResult.offerA, t.offerALabel)}
            {renderOfferColumn(comparisonResult.offerB, t.offerBLabel)}
          </div>

        </div>
      )}

    </div>
  );
};
