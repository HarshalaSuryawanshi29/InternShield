# InternShield — AI Recruitment Risk Analyzer

InternShield is a cybersecurity intelligence dashboard designed to protect students and early-career job seekers from internship fraud, fake check schemes, phishing, and deceptive employment solicitations.

Powered by Google's **Gemma 4** (`gemma-4-26b-a4b-it`) model via the `@google/genai` TypeScript SDK, InternShield performs objective, evidence-based text analysis of job offers, unsolicited recruiter messages, and employment contracts.

---

## Key Features

- **Gemma 4 Powered Analysis**: Integrates directly with `gemma-4-26b-a4b-it` to analyze recruitment communications as untrusted input.
- **Strict Verbatim Quoting**: Identifies and extracts only statements that actually occur in the submitted text, guarding against fabricated accusations.
- **Evidence vs. Assumption Separation**: Distinguishes verifiable indicators (e.g. personal email domains, upfront fee demands, Telegram interview requests) from unverified claims.
- **Preliminary Risk Triage**: Categorizes submissions into **Low Indicators**, **Caution**, or **High Concern** without issuing defamatory or unverified corporate declarations.
- **Actionable Verification Playbook**: Provides students with concrete next steps (ICANN WHOIS lookup, corporate email verification, official career portal cross-reference, and strict zero-upfront-fee rules).
- **Core Safety Advice**: Clear education regarding upfront training fees, OTP/2FA codes, identity documents (SSN/driver's license), and fake check equipment scams.
- **Fictional Sample Library**: Built-in, clearly labeled fictional sample messages (suspicious vs. credible offers) for rapid testing and student awareness training.
- **Privacy First**: Zero persistence. Submitted text is analyzed in-memory and never written to database or disk. Clear privacy guidance instructs users to redact personal identifiers.
- **One-Click Shareable Report**: Copy formatted executive summary and full risk audit directly to the clipboard.

---

## Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Lucide React icons, Motion animations.
- **Backend**: Node.js, Express, Vite middleware mode.
- **AI Engine**: Google `@google/genai` SDK with `gemma-4-26b-a4b-it`.

---

## Getting Started

### 1. Prerequisites
- Node.js (v18+)
- A Google Gemini / Gemma API key with access to `gemma-4-26b-a4b-it`.

### 2. Configuration
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Ensure `GEMINI_API_KEY` is set:
```env
GEMINI_API_KEY="your-api-key-here"
```

### 3. Installation & Development
```bash
npm install
npm run dev
```
The server will start at `http://localhost:3000`.

### 4. Production Build
```bash
npm run build
npm start
```

---

## Disclaimer
InternShield provides automated risk indicator assessments based on observable patterns in submitted text. It does not provide legal advice or definitive investigative verification of company legitimacy. Always verify employers through university career centers and official corporate registries.

---

## License
MIT License. See [LICENSE](LICENSE) for details.
