import React from 'react';
import { 
  AlertTriangle, 
  ShieldCheck, 
  Trash2, 
  ShieldAlert,
  Loader2,
  CheckCircle2,
  Terminal
} from 'lucide-react';
import { SupportedLanguage } from '../types/analyzer';
import { SAMPLES } from '../data/samples';
import { TRANSLATIONS } from '../i18n/translations';

interface InputSectionProps {
  text: string;
  onChange: (value: string) => void;
  onAnalyze: () => void;
  isLoading: boolean;
  onLoadSample: (key: string) => void;
  onClear: () => void;
  activeSampleKey: string | null;
  loadingStep: string;
  language: SupportedLanguage;
}

export const InputSection: React.FC<InputSectionProps> = ({
  text,
  onChange,
  onAnalyze,
  isLoading,
  onLoadSample,
  onClear,
  activeSampleKey,
  loadingStep,
  language
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  const charCount = text.length;
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const canAnalyze = text.trim().length >= 15 && !isLoading;

  return (
    <div className="w-full rounded-2xl bg-slate-900/80 border border-slate-800 p-4 sm:p-6 shadow-xl relative overflow-hidden backdrop-blur-sm">
      
      {/* Background cyber accent grid */}
      <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header bar with sample toggles */}
      <div className="flex flex-col gap-3 mb-4 pb-4 border-b border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-teal-400" />
              <h2 className="text-base font-bold text-white tracking-wide">
                {t.inputHeading}
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              {t.inputSubheading}
            </p>
          </div>

          <div className="flex items-center gap-1.5 self-start sm:self-auto">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
              {t.fictionalSamplesLabel}
            </span>
          </div>
        </div>

        {/* Fictional Sample Buttons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">
          <button
            type="button"
            onClick={() => onLoadSample('suspicious')}
            disabled={isLoading}
            className={`flex items-center justify-between gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all border text-left cursor-pointer ${
              activeSampleKey === 'suspicious'
                ? 'bg-rose-950/70 border-rose-500 text-rose-300 shadow-[0_0_12px_rgba(244,63,94,0.3)]'
                : 'bg-slate-800/80 hover:bg-rose-950/40 border-slate-700 hover:border-rose-500/50 text-slate-300 hover:text-rose-200'
            }`}
          >
            <div className="flex items-center gap-1.5 truncate">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
              <span className="truncate">{t.sampleSuspiciousGlobal}</span>
            </div>
            <span className="text-[10px] font-mono px-1 py-0.2 rounded bg-rose-900/60 text-rose-300 shrink-0">
              {t.fictionalTag}
            </span>
          </button>

          <button
            type="button"
            onClick={() => onLoadSample('credible')}
            disabled={isLoading}
            className={`flex items-center justify-between gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all border text-left cursor-pointer ${
              activeSampleKey === 'credible'
                ? 'bg-emerald-950/70 border-emerald-500 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.3)]'
                : 'bg-slate-800/80 hover:bg-emerald-950/40 border-slate-700 hover:border-emerald-500/50 text-slate-300 hover:text-emerald-200'
            }`}
          >
            <div className="flex items-center gap-1.5 truncate">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="truncate">{t.sampleCredibleGlobal}</span>
            </div>
            <span className="text-[10px] font-mono px-1 py-0.2 rounded bg-emerald-900/60 text-emerald-300 shrink-0">
              {t.fictionalTag}
            </span>
          </button>

          <button
            type="button"
            onClick={() => onLoadSample('indianSuspicious')}
            disabled={isLoading}
            className={`flex items-center justify-between gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all border text-left cursor-pointer ${
              activeSampleKey === 'indianSuspicious'
                ? 'bg-amber-950/70 border-amber-500 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.3)]'
                : 'bg-slate-800/80 hover:bg-amber-950/40 border-slate-700 hover:border-amber-500/50 text-slate-300 hover:text-amber-200'
            }`}
          >
            <div className="flex items-center gap-1.5 truncate">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="truncate">{t.sampleSuspiciousIndian}</span>
            </div>
            <span className="text-[10px] font-mono px-1 py-0.2 rounded bg-amber-900/60 text-amber-300 shrink-0">
              {t.fictionalTag}
            </span>
          </button>

          <button
            type="button"
            onClick={() => onLoadSample('indianCredible')}
            disabled={isLoading}
            className={`flex items-center justify-between gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all border text-left cursor-pointer ${
              activeSampleKey === 'indianCredible'
                ? 'bg-cyan-950/70 border-cyan-500 text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                : 'bg-slate-800/80 hover:bg-cyan-950/40 border-slate-700 hover:border-cyan-500/50 text-slate-300 hover:text-cyan-200'
            }`}
          >
            <div className="flex items-center gap-1.5 truncate">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span className="truncate">{t.sampleCredibleIndian}</span>
            </div>
            <span className="text-[10px] font-mono px-1 py-0.2 rounded bg-cyan-900/60 text-cyan-300 shrink-0">
              {t.fictionalTag}
            </span>
          </button>

          <button
            type="button"
            onClick={() => onLoadSample('ambiguous')}
            disabled={isLoading}
            className={`flex items-center justify-between gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all border text-left cursor-pointer ${
              activeSampleKey === 'ambiguous'
                ? 'bg-purple-950/70 border-purple-500 text-purple-300 shadow-[0_0_12px_rgba(168,85,247,0.3)]'
                : 'bg-slate-800/80 hover:bg-purple-950/40 border-slate-700 hover:border-purple-500/50 text-slate-300 hover:text-purple-200'
            }`}
          >
            <div className="flex items-center gap-1.5 truncate">
              <AlertTriangle className="w-3.5 h-3.5 text-purple-400 shrink-0" />
              <span className="truncate">{t.sampleAmbiguous}</span>
            </div>
            <span className="text-[10px] font-mono px-1 py-0.2 rounded bg-purple-900/60 text-purple-300 shrink-0">
              {t.fictionalTag}
            </span>
          </button>
        </div>
      </div>

      {/* Main Textarea */}
      <div className="relative group">
        <textarea
          value={text}
          onChange={(e) => onChange(e.target.value)}
          disabled={isLoading}
          rows={10}
          placeholder={t.textareaPlaceholder}
          className="w-full bg-[#070c18] border border-slate-800 rounded-xl p-4 text-sm text-slate-100 placeholder:text-slate-500 font-sans focus:outline-none focus:border-teal-500/80 focus:ring-2 focus:ring-teal-500/20 transition-all resize-y min-h-[220px]"
        />

        {/* Clear button */}
        {text && !isLoading && (
          <button
            onClick={onClear}
            type="button"
            className="absolute top-3 right-3 p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-rose-300 transition-colors border border-slate-700/60 cursor-pointer"
            title={t.clearTooltip}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Footer bar with stats and Submit button */}
      <div className="mt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3 border-t border-slate-800/80">
        
        {/* Character & Word counter */}
        <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
          <span>{charCount.toLocaleString()} {t.charCountLabel}</span>
          <span>•</span>
          <span>{wordCount.toLocaleString()} {t.wordCountLabel}</span>
          {charCount > 0 && charCount < 15 && (
            <span className="text-amber-400 font-sans text-xs">
              {t.minCharsWarning}
            </span>
          )}
          {activeSampleKey && SAMPLES[activeSampleKey] && (
            <span className="text-teal-400 font-sans text-xs flex items-center gap-1 truncate max-w-xs">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{t.viewingSampleLabel}: {SAMPLES[activeSampleKey].title}</span>
            </span>
          )}
        </div>

        {/* Analyze button */}
        <div className="flex items-center gap-3">
          <button
            onClick={onAnalyze}
            disabled={!canAnalyze}
            className={`w-full sm:w-auto flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl font-bold text-sm tracking-wide transition-all duration-200 cursor-pointer ${
              canAnalyze
                ? 'bg-gradient-to-r from-teal-500 via-teal-400 to-cyan-400 text-slate-950 hover:brightness-110 shadow-lg shadow-teal-500/20 active:scale-[0.98]'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-800'
            }`}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                <span>{t.analyzingBtn}</span>
              </>
            ) : (
              <>
                <ShieldAlert className="w-4 h-4" />
                <span>{t.analyzeBtn}</span>
              </>
            )}
          </button>
        </div>

      </div>

      {/* Animated Loading Status Overlay */}
      {isLoading && (
        <div className="mt-4 p-4 rounded-xl bg-slate-950/90 border border-teal-500/40 flex items-center gap-3 animate-pulse">
          <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 shrink-0">
            <Loader2 className="w-5 h-5 animate-spin" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-mono text-teal-300 font-medium">
                {loadingStep || t.loadingStepConnecting}
              </span>
              <span className="text-[11px] font-mono text-slate-400">Gemma 4 Multilingual Shield</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-teal-500 to-cyan-400 h-full w-2/3 animate-[shimmer_2s_infinite]" />
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
