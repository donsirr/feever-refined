# Fee-Ver 2.0 🏥

**AI-Powered Protection Against Hospital Billing Errors & Overcharges**

Fee-Ver is a modern web application designed to help Filipino patients verify their hospital bills against Department of Health (DOH) standards. It utilizes AI to enforce transparency, identify overcharges, and calculate coverage benefits.

![Status](https://img.shields.io/badge/Status-Beta-teal)
![Tech](https://img.shields.io/badge/Stack-Next.js_16_|_TypeScript_|_Tailwind-black)

## ✨ Key Features

### 1. 🛡️ Intelligent Bill Audit
- **Drag & Drop Scanning**: Instantly process hospital bills (`.pdf`, `.jpg`, `.png`).
- **Trust Score**: Simple 0-100 score indicating the fairness of the bill.
- **DOH Verification**: Automatically compares billed prices against the latest DOH Price Reference Index.

### 2. 📊 Detailed Reporting
- **Line-Item Analysis**: Breakdown of every charge with status indicators:
  - ✅ **Verified**: Within acceptable price range.
  - ⚠️ **Warning**: Slightly above average.
  - 🚨 **Overcharge**: Significantly exceeds DOH limits.
- **Coverage Analyzer**: Visual breakdown of **PhilHealth**, **HMO (e.g., Maxicare)**, and **Cash** out-of-pocket expenses.

### 3. ✍️ Automated Dispute Center
- **One-Click Dispute Letter**: Generates a formal, professionally formatted dispute letter citing specific DOH circulars.
- **Customizable Tone**: Choose between "Polite Inquiry" or "Firm Formal".
- **Export Options**: Download as PDF or Copy to Clipboard.

### 4. 🇵🇭 Localized Context
- **Malasakit Center Integration**: Guidance on accessing government financial aid.
- **PhilHealth Logic**: Built-in calculation for standard PhilHealth case rates.

---

## 📂 Project Structure

```
src/
├── app/
│   ├── layout.tsx       # Root layout with ThemeProvider & Fonts
│   ├── page.tsx         # Landing Page (Hero, Features, How-to)
│   ├── scan/            # Upload & Scan Interface
│   ├── report/          # Bill Health Report & Analysis
│   ├── dispute/         # Dispute Letter Generator
│   └── malasakit/       # Financial Aid Information
├── components/
│   ├── layout/          # Navbar, Footer
│   ├── ui/              # Reusable UI (Button, Card, Badge)
│   └── theme-provider.tsx
└── lib/                 # Utilities & Constants
```

## 🗺️ Roadmap

- [ ] **Phase 1: Enhanced Intelligence** (Q1 2026)
    - [ ] Advanced OCR for handwritten doctors' notes.
    - [ ] Real-time integration with PhilHealth Case Rate API.
    - [ ] Multi-page receipt stitching.

- [ ] **Phase 2: Platform Expansion** (Q2 2026)
    - [ ] Native Mobile App (iOS & Android).
    - [ ] User Accounts for audit history tracking.
    - [ ] "Report to DOH" one-click submission.

- [ ] **Phase 3: Ecosystem** (Q3 2026)
    - [ ] Partner Network: Connect with pro-bono healthcare lawyers.
    - [ ] HMO Direct Connect: Login to Maxicare/Intellicare to see real-time balance.
    - [ ] Community Watch: Crowdsourced pricing database for private clinics.
