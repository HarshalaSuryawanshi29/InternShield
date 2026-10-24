import React, { useState } from 'react';
import { Lock, EyeOff } from 'lucide-react';
import { SupportedLanguage } from '../types/analyzer';
import { TRANSLATIONS } from '../i18n/translations';

interface PrivacyNoticeProps {
  onAutoRedact?: () => void;
  hasRedactableContent?: boolean;
  language: SupportedLanguage;
}

export const PrivacyNotice: React.FC<PrivacyNoticeProps> = ({ 
  onAutoRedact, 
  hasRedactableContent,
  language 
}) => {
  const [minimized, setMinimized] = useState(false);
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  if (minimized) {
    return (
      <div className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <Lock className="w-3.5 h-3.5 text-teal-400 shrink-0" />
          <span>{t.privacyMinimizedMsg}</span>
        </div>
        <button 
          onClick={() => setMinimized(false)}
          className="text-teal-400 hover:text-teal-300 font-medium underline ml-2 shrink-0 cursor-pointer"
        >
          {t.privacyViewBtn}
        </button>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900/95 via-[#0b1329]/90 to-slate-900/95 border border-teal-500/25 p-4 sm:p-5 shadow-lg">
      <div className="absolute top-0 right-0 w-48 h-48 bg-teal-500/5 rounded-full blur-2xl pointer-events-none" />
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        
        {/* Left icon and message */}
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400 shrink-0 mt-0.5">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="text-sm font-bold text-white tracking-wide">
                {t.privacyHeading}
              </h4>
              <span className="px-2 py-0.5 rounded-full bg-teal-950/80 border border-teal-800/80 text-[11px] font-mono text-teal-300 font-medium">
                {t.privacyBadge}
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-300 leading-relaxed max-w-2xl">
              {t.privacyDescription}
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end shrink-0">
          {onAutoRedact && (
            <button
              onClick={onAutoRedact}
              type="button"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-500/10 hover:bg-teal-500/20 border border-teal-500/30 text-teal-300 hover:text-teal-200 text-xs font-semibold transition-colors cursor-pointer"
              title={t.privacyScrubTooltip}
            >
              <EyeOff className="w-3.5 h-3.5" />
              <span>{t.privacyScrubBtn}</span>
            </button>
          )}

          <button
            onClick={() => setMinimized(true)}
            type="button"
            className="text-xs text-slate-400 hover:text-slate-200 px-2.5 py-1.5 rounded-lg hover:bg-slate-800/60 transition-colors cursor-pointer"
          >
            {t.privacyDismissBtn}
          </button>
        </div>

      </div>
    </div>
  );
};
