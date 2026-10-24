import React, { useState, useRef, useEffect } from 'react';
import { Shield, Cpu, BookOpen, GitCompare, FileSearch, Globe, ChevronDown, Check } from 'lucide-react';
import { ModelInfo, SupportedLanguage, SUPPORTED_LANGUAGES } from '../types/analyzer';
import { TRANSLATIONS } from '../i18n/translations';

interface NavbarProps {
  modelInfo: ModelInfo | null;
  onOpenGuide: () => void;
  onReset: () => void;
  activeMode: 'single' | 'compare';
  onModeChange: (mode: 'single' | 'compare') => void;
  language: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  modelInfo, 
  onOpenGuide, 
  onReset,
  activeMode,
  onModeChange,
  language,
  onLanguageChange
}) => {
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  const currentLang = SUPPORTED_LANGUAGES.find(l => l.code === language) || SUPPORTED_LANGUAGES[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setLangDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#070b14]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div 
          onClick={onReset}
          className="flex items-center gap-3 cursor-pointer group shrink-0"
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500/20 to-cyan-500/10 border border-teal-500/30 group-hover:border-teal-400/60 transition-colors">
            <Shield className="w-5 h-5 text-teal-400 group-hover:scale-105 transition-transform" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-teal-500"></span>
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-tight text-white group-hover:text-teal-300 transition-colors">
                Intern<span className="text-teal-400">Shield</span>
              </span>
              <span className="text-[10px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded bg-teal-950/80 text-teal-300 border border-teal-800/60 font-semibold">
                {t.brandTag}
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">{t.brandSubtitle}</p>
          </div>
        </div>

        {/* Center Mode Switcher */}
        <div className="hidden md:flex items-center p-1 rounded-xl bg-slate-900 border border-slate-800">
          <button
            onClick={() => onModeChange('single')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeMode === 'single'
                ? 'bg-teal-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <FileSearch className="w-3.5 h-3.5" />
            <span>{t.singleOfferMode}</span>
          </button>
          <button
            onClick={() => onModeChange('compare')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeMode === 'compare'
                ? 'bg-teal-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <GitCompare className="w-3.5 h-3.5" />
            <span>{t.compareMode}</span>
          </button>
        </div>

        {/* Right Tools: 8-Language Selector, Model Status, Threat Guide */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* 8-Language Selector Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 text-slate-200 text-xs font-medium transition-colors cursor-pointer shadow-sm"
              title="Select language / भाषा निवडा / भाषा चुनें"
              aria-label="Select language"
            >
              <Globe className="w-3.5 h-3.5 text-teal-400" />
              <span className="font-bold text-teal-300 text-xs">{currentLang.name}</span>
              <span className="text-[10px] text-slate-400 hidden sm:inline">({currentLang.code.toUpperCase()})</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {langDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-xl bg-slate-900 border border-slate-700 shadow-2xl py-1.5 z-50 animate-fade-in backdrop-blur-md">
                <div className="px-3 py-1.5 text-[11px] font-mono font-semibold uppercase text-slate-400 border-b border-slate-800 flex items-center justify-between">
                  <span>8 Supported Languages</span>
                  <span className="text-teal-400">Gemma 4</span>
                </div>
                <div className="max-h-72 overflow-y-auto py-1">
                  {SUPPORTED_LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        onLanguageChange(lang.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left transition-colors cursor-pointer ${
                        language === lang.code
                          ? 'bg-teal-500/20 text-teal-300 font-bold'
                          : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold">{lang.name}</span>
                        <span className="text-[11px] text-slate-400 font-mono">({lang.labelEn})</span>
                      </div>
                      {language === lang.code && (
                        <Check className="w-3.5 h-3.5 text-teal-400" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Active AI Model Pill */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 text-xs font-mono">
            <Cpu className="w-3.5 h-3.5 text-teal-400" />
            <span className="text-slate-400 text-[11px]">{t.modelLabel}:</span>
            <span className="text-teal-300 font-semibold text-[11px]">
              gemma-4-26b-a4b-it
            </span>
            <span 
              className={`w-2 h-2 rounded-full ${
                modelInfo?.status === 'ready' 
                  ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]' 
                  : modelInfo?.status === 'error'
                  ? 'bg-red-400 shadow-[0_0_8px_#f87171]'
                  : 'bg-amber-400 shadow-[0_0_8px_#fbbf24]'
              }`}
              title={modelInfo?.message || 'Model Status'}
            />
          </div>

          {/* Threat Guide Button */}
          <button
            onClick={onOpenGuide}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700/80 hover:border-teal-500/40 text-slate-300 hover:text-white text-xs font-medium transition-all cursor-pointer"
            title={t.threatGuideBtn}
          >
            <BookOpen className="w-3.5 h-3.5 text-teal-400" />
            <span className="hidden sm:inline">{t.threatGuideBtn}</span>
          </button>

        </div>

      </div>

      {/* Mobile Mode Switcher Bar */}
      <div className="md:hidden flex items-center justify-center p-2 bg-slate-950/70 border-t border-slate-800/60">
        <div className="flex items-center w-full max-w-xs p-1 rounded-xl bg-slate-900 border border-slate-800">
          <button
            onClick={() => onModeChange('single')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeMode === 'single'
                ? 'bg-teal-500 text-slate-950 shadow-sm'
                : 'text-slate-400'
            }`}
          >
            <FileSearch className="w-3.5 h-3.5" />
            <span>{t.singleOfferMode}</span>
          </button>
          <button
            onClick={() => onModeChange('compare')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeMode === 'compare'
                ? 'bg-teal-500 text-slate-950 shadow-sm'
                : 'text-slate-400'
            }`}
          >
            <GitCompare className="w-3.5 h-3.5" />
            <span>{t.compareMode}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
