# Axonik.ai

**Your health data. Connected and protected. Worldwide.**


- 🧠 AI-Powered Medical Analysis
- 🔒 HIPAA Compliant & Secure
- 🛡️ Personal Information Detection & Masking
- ⚡ Instant Results
- 🎨 Modern, Beautiful UI
- 💬 Interactive Chat Interface
- 📱 Fully Responsive Design
- 📝 OCR Text Extraction with Multi-language Support
=======
**Axonik.ai** is an intelligent platform that solves the problem of fragmentation and insecure data sharing in global healthcare. Our solution is an "intelligent bridge" built on a foundation of "Trust & Safety".

This repository contains the prototype code developed during the **AngelHack** hackathon, demonstrating our core technology: **on-device processing and depersonalization of medical records.**

---

## 1. The Problem

Global healthcare is in chaos:

* **👤 Patients:** Face fragmented records, leading to repeated tests, misdiagnoses, and stress.

* **🏥 Clinics:** Waste time, use insecure data sharing methods, and are at high risk of errors.

* **🔬 Researchers:** Lack secure access to fragmented data for scientific breakthroughs.

## 2. The Solution

**Axonik.ai — an intelligent bridge for your data**.

We are creating an ecosystem that connects patients, clinics, and researchers:

* **📱 Mobile Application (for patients):** A unified, complete medical history with secure sharing capabilities.

* **🖥 Dashboard (for clinics):** Structured and translated patient reports.

* **🔗 API (for research):** Access to anonymized datasets for innovation.

## 3. Core Technology

The prototype in this repository demonstrates our **"On-Device Depersonalization Engine"**. This is a web application that runs in the browser, validating our unique security architecture.

**How it works:**

1. **Upload:** Users upload any medical file (PDF, image, report).

2. **Local Processing (in browser):** A chain of ML models runs:

   * **OCR (Recognition):** Text extraction using Tesseract.js with multi-language support (English, French, German, Spanish, Russian, Korean).

   * **Spell Checking:** Quality assurance with multi-language spell correction using SymSpell dictionaries.

   * **NER (Depersonalization):** Detection and **removal of all personally identifiable information (PII)**.

   * **Translation:** Automatic translation of medical records (e.g., Russian to English) using translation APIs.

3. **Secure Transmission:** Only **fully anonymized** text is sent to cloud LLMs (GPT-4/Gemini) for translation, structuring, and analysis.

This approach ensures that confidential identifiers never leave the user's device, ensuring compliance with PIPA and GDPR.

## 4. Unique Security Architecture

Our security model is our main competitive advantage:

* **🔒 Separation** of identifiers and anonymous health data.

* **🌍 Local servers** in each country for compliance with local laws.

* **☁️ Central storage** only for depersonalized records.

* **📜 Full compliance** with PIPA and GDPR worldwide.

## 5. Current Project Status

* Company registered in Incheon.

* Patent application preparation in progress.

* MVP development started (React Native, processing with on-device LLM).

## 6. Features

- 🧠 **AI-Powered Medical Analysis** - Advanced machine learning algorithms provide accurate medical insights
- 🔒 **PIPA & GDPR Compliant** - Enterprise-grade security and compliance standards
- ⚡ **Instant Results** - Fast, reliable processing with on-device computation
- 🎨 **Modern, Beautiful UI** - Responsive design with intuitive user experience
- 💬 **Interactive Chat Interface** - Medical AI assistant for healthcare information
- 📱 **Fully Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- 🔍 **OCR Text Extraction** - Multi-language OCR with spell checking
- 🌐 **Translation Support** - Automatic translation of medical records
- 🔐 **On-Device Processing** - Privacy-first architecture with local data processing
- 📄 **PWA Support** - Progressive Web App with offline capabilities

## 7. Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tesseract.js** - OCR engine for text extraction
- **SymSpell** - Multi-language spell checking
- **@xenova/transformers** - On-device ML models (optional fallback)
- **Lucide React** - Icon library
<<<<<<< HEAD
- **Tesseract.js** - OCR text extraction
- **Hugging Face Inference** - Personal information detection
- **CSS3** - Styling with modern features
=======
- **Tailwind CSS** - Styling framework
- **PWA Plugin** - Progressive Web App support
>>>>>>> ed940aa (new README.md)

## 8. Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

1. Install dependencies:
```bash
npm install
```

2. (Optional) Set up environment variables:
   - For better rate limits, create a `.env` file in the root directory
   - Add your Hugging Face API token (optional for hackathon/demo):
   ```
   VITE_HF_TOKEN=your_huggingface_token_here
   ```
   - Get your token from: https://huggingface.co/settings/tokens
   - Note: PII detection works without a token but with rate limits

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## 9. Project Structure

```
src/
<<<<<<< HEAD
├── components/          # React components
│   ├── Header.tsx      # Navigation header
│   ├── Hero.tsx        # Landing page hero section
│   ├── Features.tsx    # Features showcase
│   ├── ChatInterface.tsx # AI chat interface
│   └── OCRTest.tsx     # OCR text extraction component
├── utils/              # Utility functions
│   ├── piiDetector.ts  # Personal information detection
│   ├── spellChecker.ts # Multi-language spell checking
│   └── translator.ts   # Translation utilities
├── App.tsx             # Main app component
├── main.tsx            # Application entry point
└── index.css           # Global styles
=======
├── components/              # React components
│   ├── Header.tsx          # Navigation header
│   ├── Hero.tsx            # Landing page hero section
│   ├── Features.tsx        # Features showcase
│   ├── ChatInterface.tsx   # AI chat interface
│   └── OCRTest.tsx         # OCR and translation testing component
├── utils/                  # Utility functions
│   ├── spellChecker.ts     # Multi-language spell checking
│   ├── translator.ts       # Translation utilities
│   └── dictionaries/       # Language dictionaries
│       ├── en.ts           # English dictionary
│       ├── ru.ts           # Russian dictionary
│       ├── fr.ts           # French dictionary
│       ├── de.ts           # German dictionary
│       ├── es.ts           # Spanish dictionary
│       ├── ko.ts           # Korean dictionary
│       └── index.ts        # Dictionary exports
├── types/                  # TypeScript type definitions
│   └── node-symspell-new.d.ts
├── App.tsx                 # Main app component
├── main.tsx                # Application entry point
└── index.css               # Global styles
>>>>>>> ed940aa (new README.md)
```

## 10. Development

The app uses Vite for fast development with HMR (Hot Module Replacement). Any changes you make will be instantly reflected in the browser.

### Key Components

- **OCRTest Component**: Demonstrates the on-device depersonalization engine with OCR, spell checking, and translation capabilities.
- **ChatInterface Component**: Interactive medical AI assistant interface.
- **Spell Checker**: Multi-language spell correction using SymSpell with support for English, Russian, French, German, Spanish, and Korean.
- **Translator**: Russian to English translation with automatic detection and API-based translation.

## 11. PWA Support

This application includes Progressive Web App (PWA) support with:
- Service worker for offline functionality
- App manifest for installation
- App shortcuts for quick access
- Standalone mode support

See [PWA.md](./PWA.md) for detailed PWA testing instructions.

## 12. License

MIT

---

**Note:** This is a prototype demonstration. Always consult with healthcare professionals for medical advice.
