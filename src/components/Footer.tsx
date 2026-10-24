import React from 'react';
import { Shield, Lock, Terminal, BookOpen } from 'lucide-react';
import { SupportedLanguage } from '../types/analyzer';
import { TRANSLATIONS } from '../i18n/translations';

interface FooterProps {
  onOpenGuide: () => void;
  language: SupportedLanguage;
}

export const Footer: React.FC<FooterProps> = ({ onOpenGuide, language }) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  return (
    <footer className="w-full border-t border-slate-800/80 bg-[#060a14] mt-16 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 pb-8 border-b border-slate-800/80">
          
          {/* Col 1: Mission */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1.5 rounded-lg bg-teal-500/20 text-teal-400">
                <Shield className="w-4 h-4" />
              </div>
              <span className="font-bold text-white tracking-tight">{t.brandTitle}</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              {t.footerMission}
            </p>
          </div>

          {/* Col 2: Architecture & Transparency */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-teal-400" />
              <span>{t.footerArchTitle}</span>
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400 font-mono">
              <li>• {t.footerEngineLabel}</li>
              <li>• {t.footerSdkLabel}</li>
              <li>• {t.footerVerificationLabel}</li>
              <li>• {t.footerStorageLabel}</li>
            </ul>
          </div>

          {/* Col 3: Student Safety Protocols */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-teal-400" />
              <span>{t.footerGoldenRuleTitle}</span>
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              {t.footerGoldenRuleText}
            </p>
            <button
              onClick={onOpenGuide}
              className="mt-2.5 text-xs text-teal-400 hover:text-teal-300 font-medium flex items-center gap-1 cursor-pointer"
            >
              <BookOpen className="w-3 h-3" />
              <span>{t.footerExploreGuide}</span>
            </button>
          </div>

        </div>

        {/* Bottom copyright & disclaimer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            <span>{t.footerCopyright} • </span>
            <span className="text-slate-400">{t.footerLicense}</span>
            <span> • {t.footerBuiltForStudents}</span>
          </div>

          <div className="text-[11px] text-slate-500 text-center sm:text-right max-w-md">
            {t.footerEducationalNotice}
          </div>
        </div>

      </div>
    </footer>
  );
};
