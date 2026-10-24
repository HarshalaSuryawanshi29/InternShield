/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Shield, 
  AlertCircle, 
  CheckCircle2, 
  ChevronRight, 
  BookOpen, 
  Globe 
} from 'lucide-react';
import { Navbar } from './components/Navbar';
import { PrivacyNotice } from './components/PrivacyNotice';
import { InputSection } from './components/InputSection';
import { ResultsDashboard } from './components/ResultsDashboard';
import { ComparisonView } from './components/ComparisonView';
import { ScamGuide } from './components/ScamGuide';
import { Footer } from './components/Footer';
import { AnalysisResult, ModelInfo, SupportedLanguage, SUPPORTED_LANGUAGES } from './types/analyzer';
import { SAMPLES } from './data/samples';
import { TRANSLATIONS } from './i18n/translations';

export default function App() {
  const [activeMode, setActiveMode] = useState<'single' | 'compare'>('single');
  const [language, setLanguage] = useState<SupportedLanguage>('en');

  // Single analysis state
  const [text, setText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingStep, setLoadingStep] = useState<string>('');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [modelInfo, setModelInfo] = useState<ModelInfo | null>(null);
  const [activeSampleKey, setActiveSampleKey] = useState<string | null>(null);
  const [isGuideOpen, setIsGuideOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const resultsRef = useRef<HTMLDivElement>(null);
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  // Fetch model info on mount
  useEffect(() => {
    fetch('/api/model-info')
      .then((res) => res.json())
      .then((data) => setModelInfo(data))
      .catch((err) => {
        console.warn('Could not retrieve model info:', err);
        setModelInfo({
          model: 'gemma-4-26b-a4b-it',
          apiKeyConfigured: false,
          status: 'error',
          message: 'Unable to reach backend model info endpoint.',
        });
      });
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const handleLoadSample = (key: string) => {
    if (SAMPLES[key]) {
      setText(SAMPLES[key].text);
      setActiveSampleKey(key);
      setError(null);
      setResult(null);
      showToast(`${t.viewingSampleLabel}: ${SAMPLES[key].title} (${t.fictionalTag})`);
    }
  };

  const handleClear = () => {
    setText('');
    setActiveSampleKey(null);
    setError(null);
    setResult(null);
  };

  // Helper to scrub phone numbers, emails, Aadhaar, and SSN patterns
  const handleAutoRedact = () => {
    if (!text.trim()) {
      showToast(t.toastPasteFirst);
      return;
    }

    let scrubbed = text;
    // Replace typical phone patterns (India +91 and international formats)
    scrubbed = scrubbed.replace(/(\+?91[\s-]?)?[6789]\d{9}/g, '[REDACTED_PHONE]');
    scrubbed = scrubbed.replace(/(\+?\d{1,2}\s?)?(\(?\d{3}\)?[\s.-]?)?\d{3}[\s.-]?\d{4}/g, '[REDACTED_PHONE]');
    // Replace Aadhaar 12-digit pattern
    scrubbed = scrubbed.replace(/\b\d{4}\s\d{4}\s\d{4}\b/g, '[REDACTED_AADHAAR]');
    // Replace SSN patterns
    scrubbed = scrubbed.replace(/\b\d{3}-\d{2}-\d{4}\b/g, '[REDACTED_SSN]');
    // Replace personal emails except test sample addresses
    scrubbed = scrubbed.replace(/\b[A-Za-z0-9._%+-]+@(gmail|yahoo|hotmail|outlook|icloud|aol)\.com\b/gi, (match) => {
      if (match.toLowerCase().includes('apex.hr.onboarding2026') || match.toLowerCase().includes('it-setup-dispatch') || match.toLowerCase().includes('infotech.virtual.careers2026')) {
        return match;
      }
      return '[REDACTED_PERSONAL_EMAIL]';
    });

    setText(scrubbed);
    showToast(t.toastScrubbed);
  };

  const handleAnalyze = async () => {
    if (!text.trim() || text.trim().length < 15) {
      setError(t.minCharsWarning);
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);
    setLoadingStep(t.loadingStepSanitize);

    const timer1 = setTimeout(() => {
      setLoadingStep(t.loadingStepConnecting);
    }, 900);

    const timer2 = setTimeout(() => {
      setLoadingStep(t.loadingStepScanning);
    }, 2400);

    const timer3 = setTimeout(() => {
      setLoadingStep(t.loadingStepSynthesizing);
    }, 4500);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, language }),
      });

      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `Server responded with status ${response.status}`);
      }

      setResult(data);
      showToast(t.toastAnalysisComplete);

      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150);

    } catch (err: any) {
      console.error('Analysis failed:', err);
      setError(err.message || 'An unexpected error occurred while analyzing the offer.');
    } finally {
      setIsLoading(false);
      setLoadingStep('');
    }
  };

  const handleReset = () => {
    setResult(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#060911] text-slate-100 flex flex-col font-sans selection:bg-teal-500/30 selection:text-teal-200">
      
      {/* Navbar with 8-language selector and mode switcher */}
      <Navbar 
        modelInfo={modelInfo} 
        onOpenGuide={() => setIsGuideOpen(true)}
        onReset={handleReset}
        activeMode={activeMode}
        onModeChange={(mode) => setActiveMode(mode)}
        language={language}
        onLanguageChange={(lang) => setLanguage(lang)}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-slate-900 border border-teal-500/50 text-teal-300 text-xs font-mono shadow-2xl animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-900/90 via-[#0a1124]/70 to-slate-950/80 border border-slate-800/80 p-6 sm:p-10 shadow-2xl">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-950/80 border border-teal-800/80 text-teal-300 text-xs font-mono font-medium mb-4">
              <Shield className="w-3.5 h-3.5 text-teal-400" />
              <span>{t.heroBadge}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
              {t.heroHeading}
            </h1>

            <p className="mt-3.5 text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
              {t.heroSubheading}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-teal-400" />
                <span>{t.chipVerbatim}</span>
              </span>
              <span className="flex items-center gap-1.5 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-teal-400" />
                <span>{t.chipNoStorage}</span>
              </span>
              <span className="flex items-center gap-1.5 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-teal-400" />
                <span>{t.chipZeroFee}</span>
              </span>
              <span className="flex items-center gap-1.5 text-amber-300">
                <Globe className="w-4 h-4 text-amber-400" />
                <span>{t.chipLanguages}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Privacy Notice Banner (Fixes Marathi & Multilingual Bug) */}
        <PrivacyNotice 
          onAutoRedact={handleAutoRedact} 
          hasRedactableContent={text.length > 0}
          language={language}
        />

        {/* MODE SWITCH: Single Offer Analysis vs Dual Offer Comparison */}
        {activeMode === 'single' ? (
          <>
            {/* Input Section */}
            <InputSection 
              text={text}
              onChange={(val) => {
                setText(val);
                if (activeSampleKey) setActiveSampleKey(null);
              }}
              onAnalyze={handleAnalyze}
              isLoading={isLoading}
              onLoadSample={handleLoadSample}
              onClear={handleClear}
              activeSampleKey={activeSampleKey}
              loadingStep={loadingStep}
              language={language}
            />

            {/* Friendly Error Display */}
            {error && (
              <div className="rounded-2xl bg-rose-950/40 border border-rose-500/40 p-5 text-rose-200 flex items-start gap-3.5 shadow-lg">
                <div className="p-2 rounded-xl bg-rose-500/20 text-rose-400 shrink-0">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-white mb-1">
                    Analysis Notice
                  </h4>
                  <p className="text-xs text-rose-200/90 leading-relaxed font-sans">
                    {error}
                  </p>
                  <div className="mt-2 text-[11px] font-mono text-rose-300/80">
                    Target Model: <span className="font-bold">gemma-4-26b-a4b-it</span> • Language: <span className="font-bold">{language.toUpperCase()}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Results Dashboard Section */}
            {result && (
              <div ref={resultsRef} className="pt-4 animate-fade-in">
                <ResultsDashboard 
                  result={result} 
                  onReset={handleReset} 
                  language={language}
                  onLanguageChange={setLanguage}
                />
              </div>
            )}

            {/* Educational Callout Section */}
            {!result && (
              <div className="rounded-2xl bg-slate-900/40 border border-slate-800/80 p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-teal-500/10 border border-teal-500/20 text-teal-400 shrink-0">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">
                      {t.guideModalTitle}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 max-w-xl leading-relaxed">
                      {t.guideModalSubtitle}
                    </p>
                  </div>
                </div>
                
                <button
                  onClick={() => setIsGuideOpen(true)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700/80 border border-slate-700 text-teal-300 hover:text-teal-200 text-xs font-semibold shrink-0 transition-colors cursor-pointer"
                >
                  <span>{t.threatGuideBtn}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </>
        ) : (
          /* COMPARISON MODE */
          <ComparisonView 
            language={language}
          />
        )}

      </main>

      {/* Scam Archetypes Modal */}
      <ScamGuide 
        isOpen={isGuideOpen} 
        onClose={() => setIsGuideOpen(false)}
        onLoadExample={(key) => {
          setActiveMode('single');
          handleLoadSample(key);
          setTimeout(() => {
            window.scrollTo({ top: 300, behavior: 'smooth' });
          }, 100);
        }}
        language={language}
      />

      {/* Footer */}
      <Footer 
        onOpenGuide={() => setIsGuideOpen(true)}
        language={language}
      />

    </div>
  );
}
