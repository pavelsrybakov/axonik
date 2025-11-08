# Axonic.ai - Medical AI Application

A modern, beautiful React TypeScript application for medical AI assistance.

## Features

- 🧠 AI-Powered Medical Analysis
- 🔒 HIPAA Compliant & Secure
- 🛡️ Personal Information Detection & Masking
- ⚡ Instant Results
- 🎨 Modern, Beautiful UI
- 💬 Interactive Chat Interface
- 📱 Fully Responsive Design
- 📝 OCR Text Extraction with Multi-language Support

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Lucide React** - Icon library
- **Tesseract.js** - OCR text extraction
- **Hugging Face Inference** - Personal information detection
- **CSS3** - Styling with modern features

## Getting Started

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

## Project Structure

```
src/
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
```

## Development

The app uses Vite for fast development with HMR (Hot Module Replacement). Any changes you make will be instantly reflected in the browser.

## License

MIT

