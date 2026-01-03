import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ScanLine, ShieldAlert, BadgeCheck, FileSearch, ArrowRight, Building2, ShieldCheck } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="flex flex-col items-center">
        {/* Hero Section with Bento Grid */}
        <section className="relative w-full overflow-hidden px-4 pt-32 pb-16 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-700 text-xs font-bold uppercase tracking-wider mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
              </span>
              Fee-Ver 2.0 Live
            </div>
            <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight text-slate-900 mb-6 font-display">
              Medical Bills, <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-emerald-500">Verified.</span>
            </h1>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto">
              Stop overpaying. Upload your hospital bill and let our AI audit every line item against DOH standards.
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[180px] w-full max-w-5xl mx-auto">

            {/* Tile 1: New Scan (Large) */}
            <Link href="/scan" className="md:col-span-2 md:row-span-2 group">
              <div className="h-full glass-panel rounded-3xl p-8 relative overflow-hidden transition-all duration-500 group-hover:shadow-[0_20px_40px_-12px_rgba(15,118,110,0.1)] group-hover:-translate-y-1">
                <div className="absolute top-0 right-0 p-12 bg-gradient-to-br from-teal-50 to-emerald-50 rounded-full blur-3xl opacity-60 -translate-y-1/2 translate-x-1/4 group-hover:scale-110 transition-transform duration-700"></div>

                <div className="relative z-10 flex flex-col justify-between h-full">
                  <div>
                    <div className="mb-4 inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-teal-600 text-white shadow-lg shadow-teal-500/30 group-hover:scale-110 transition-transform duration-300">
                      <ScanLine size={28} />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900 mb-2">New Audit</h2>
                    <p className="text-slate-500 text-lg">Start a new analysis by uploading your bill.</p>
                  </div>
                  <div className="flex items-center gap-2 text-teal-600 font-bold group-hover:gap-4 transition-all">
                    Launch Scanner <ArrowRight size={20} />
                  </div>
                </div>
              </div>
            </Link>

            {/* Tile 2: Malasakit (Tall or Wide depending on stacking, here top right) */}
            <Link href="/malasakit" className="md:col-span-1 md:row-span-1 group">
              <div className="h-full glass-panel rounded-3xl p-6 relative overflow-hidden transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-slate-900 font-bold text-lg">Social Aid</div>
                  <Building2 className="text-blue-500" size={24} />
                </div>
                <div className="mt-4">
                  <div className="flex justify-between text-xs font-semibold text-slate-400 mb-1">
                    <span>DOCUMENTS</span>
                    <span>0/4</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full w-[10%] bg-blue-500"></div>
                  </div>
                </div>
              </div>
            </Link>

            {/* Tile 3: Recent Disputes (Bottom Right) */}
            <Link href="/report" className="md:col-span-1 md:row-span-1 group">
              <div className="h-full glass-panel rounded-3xl p-6 relative overflow-hidden transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg flex flex-col justify-center items-center text-center">
                <div className="text-4xl font-mono font-bold text-slate-900 mb-1 group-hover:scale-110 transition-transform">₱0.00</div>
                <div className="text-xs font-bold text-emerald-500 uppercase tracking-widest">Saved this month</div>
              </div>
            </Link>

          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group relative p-8 glass-panel rounded-3xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl border border-white/60">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-50/50 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10">
                <div className="h-14 w-14 rounded-2xl bg-red-100/80 flex items-center justify-center text-red-600 mb-6 group-hover:scale-110 transition-transform shadow-sm">
                  <ShieldAlert size={28} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Smart Error Detection</h3>
                <p className="text-slate-500 leading-relaxed">
                  Instantly flags overcharges, double-billing, and items priced above the DOH reference index.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="group relative p-8 glass-panel rounded-3xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl border border-white/60">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10">
                <div className="h-14 w-14 rounded-2xl bg-emerald-100/80 flex items-center justify-center text-emerald-600 mb-6 group-hover:scale-110 transition-transform shadow-sm">
                  <BadgeCheck size={28} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Benefit Stacker</h3>
                <p className="text-slate-500 leading-relaxed">
                  Automatically calculates PhilHealth and HMO coverage to show you exactly what you <span className="italic font-medium text-emerald-600">should</span> pay.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="group relative p-8 glass-panel rounded-3xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl border border-white/60">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10">
                <div className="h-14 w-14 rounded-2xl bg-blue-100/80 flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform shadow-sm">
                  <FileSearch size={28} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Privacy First</h3>
                <p className="text-slate-500 leading-relaxed">
                  We respectfully handle your data. Analysis is done locally or in ephemeral sessions. No medical records are ever stored.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section: Visual Walkthrough */}
        <section id="how-it-works" className="w-full py-24 sm:py-32 relative overflow-hidden">
          {/* Decorative connectors */}
          <div className="absolute top-0 left-1/2 -z-10 h-full w-px bg-gradient-to-b from-transparent via-slate-200 to-transparent hidden md:block"></div>

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center mb-20">
              <span className="text-teal-600 font-bold tracking-wider uppercase text-xs mb-2 block">Workflow</span>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl font-display">
                Protection in 3 Steps
              </h2>
              <p className="mt-4 text-lg text-slate-500">
                From a messy paper bill to a legal dispute letter in under 2 minutes.
              </p>
            </div>

            <div className="flex flex-col gap-24">
              {/* Step 1: Upload */}
              <div className="flex flex-col md:flex-row items-center gap-12 group">
                <div className="flex-1 text-right md:pr-12 order-2 md:order-1">
                  <div className="inline-flex items-center justify-center p-3 bg-teal-50 rounded-2xl mb-6 text-teal-600">
                    <ScanLine size={32} />
                  </div>
                  <h3 className="text-3xl font-bold text-slate-900 mb-4">1. Snap & Scan</h3>
                  <p className="text-lg text-slate-500 leading-relaxed">
                    Don't stress about codes. Just upload a photo of your preliminary bill.
                    Our OCR engine instantly digitizes every line item—medicines, lab tests, and room charges.
                  </p>
                </div>

                {/* Visual 1 */}
                <div className="flex-1 order-1 md:order-2">
                  <div className="relative h-64 w-full max-w-md mx-auto glass-panel rounded-3xl p-6 border-2 border-white/50 shadow-2xl shadow-teal-900/10 transform transition-transform group-hover:scale-105 group-hover:-rotate-2">
                    {/* Mock Scanner UI */}
                    <div className="absolute inset-0 bg-slate-100/50 m-2 rounded-2xl overflow-hidden flex items-center justify-center">
                      <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-40 blur-[2px]"></div>
                      <div className="absolute inset-0 border-2 border-teal-500 w-3/4 h-3/4 m-auto rounded-lg">
                        <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-teal-500 -mt-1 -ml-1"></div>
                        <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-teal-500 -mt-1 -mr-1"></div>
                        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-teal-500 -mb-1 -ml-1"></div>
                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-teal-500 -mb-1 -mr-1"></div>
                        <div className="w-full h-1 bg-teal-500 shadow-[0_0_15px_rgba(20,184,166,0.8)] absolute top-1/2 -translate-y-1/2 animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2: Verify */}
              <div className="flex flex-col md:flex-row items-center gap-12 group">
                {/* Visual 2 */}
                <div className="flex-1">
                  <div className="relative h-64 w-full max-w-md mx-auto glass-panel rounded-3xl p-6 border-2 border-white/50 shadow-2xl shadow-red-900/10 transform transition-transform group-hover:scale-105 group-hover:rotate-2">
                    <div className="space-y-3 pt-2">
                      {/* Mock Flagged Items */}
                      <div className="flex items-center justify-between p-3 bg-red-50 rounded-xl border border-red-100">
                        <div className="flex items-center gap-3">
                          <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse"></div>
                          <div className="h-2 w-24 bg-red-200 rounded"></div>
                        </div>
                        <div className="h-4 w-12 bg-red-200 rounded"></div>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-slate-100 opacity-60">
                        <div className="flex items-center gap-3">
                          <div className="h-2 w-2 rounded-full bg-slate-300"></div>
                          <div className="h-2 w-32 bg-slate-200 rounded"></div>
                        </div>
                        <div className="h-4 w-12 bg-slate-200 rounded"></div>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-amber-50 rounded-xl border border-amber-100">
                        <div className="flex items-center gap-3">
                          <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                          <div className="h-2 w-20 bg-amber-200 rounded"></div>
                        </div>
                        <div className="h-4 w-12 bg-amber-200 rounded"></div>
                      </div>
                    </div>

                    {/* Floating Badge */}
                    <div className="absolute -right-4 -top-4 bg-white shadow-xl px-4 py-2 rounded-xl text-xs font-bold text-red-500 border border-red-100 rotate-12">
                      Overcharge Detected!
                    </div>
                  </div>
                </div>

                <div className="flex-1 text-left md:pl-12">
                  <div className="inline-flex items-center justify-center p-3 bg-teal-50 rounded-2xl mb-6 text-teal-600">
                    <ShieldCheck size={32} />
                  </div>
                  <h3 className="text-3xl font-bold text-slate-900 mb-4">2. AI Verification</h3>
                  <p className="text-lg text-slate-500 leading-relaxed">
                    We cross-reference every price against the DOH Price Freeze Index and PhilHealth Case Rates.
                    Hidden fees and "padding" are flagged instantly.
                  </p>
                </div>
              </div>

              {/* Step 3: Dispute */}
              <div className="flex flex-col md:flex-row items-center gap-12 group">
                <div className="flex-1 text-right md:pr-12 order-2 md:order-1">
                  <div className="inline-flex items-center justify-center p-3 bg-teal-50 rounded-2xl mb-6 text-teal-600">
                    <FileSearch size={32} />
                  </div>
                  <h3 className="text-3xl font-bold text-slate-900 mb-4">3. Auto-Dispute</h3>
                  <p className="text-lg text-slate-500 leading-relaxed">
                    Found an error? Don't argue at the counter.
                    Generate a formal, legally-cited dispute letter with one tap and save thousands.
                  </p>
                </div>

                {/* Visual 3 */}
                <div className="flex-1 order-1 md:order-2">
                  <div className="relative h-64 w-full max-w-md mx-auto glass-panel rounded-3xl p-8 border-2 border-white/50 shadow-2xl shadow-indigo-900/10 transform transition-transform group-hover:scale-105 group-hover:-rotate-2">
                    <div className="w-full h-full bg-white shadow-sm border border-slate-200 p-6 flex flex-col gap-3 relative overflow-hidden">
                      <div className="w-1/3 h-2 bg-slate-800 rounded"></div>
                      <div className="w-full h-px bg-slate-200 my-1"></div>
                      <div className="w-full h-2 bg-slate-200 rounded"></div>
                      <div className="w-5/6 h-2 bg-slate-200 rounded"></div>
                      <div className="w-4/5 h-2 bg-slate-200 rounded"></div>

                      <div className="mt-auto flex justify-end">
                        <div className="font-serif text-slate-800 italic text-xl pr-4">Juan dela Cruz</div>
                      </div>

                      <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
                      <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
                        <Button size="sm" className="shadow-xl">Download PDF</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
