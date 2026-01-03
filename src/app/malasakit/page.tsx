"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import {
    Building2,
    Stethoscope,
    FileText,
    HeartHandshake,
    UploadCloud,
    CheckCircle2,
    QrCode,
    ArrowRight,
    ShieldCheck
} from "lucide-react";

// Mock Data for Documents
interface DocumentType {
    id: string;
    name: string;
    icon: React.ElementType;
    description: string;
    isUploaded: boolean;
}

const INITIAL_DOCS: DocumentType[] = [
    { id: "abstract", name: "Medical Abstract", icon: Stethoscope, description: "Signed by attending physician", isUploaded: false },
    { id: "bill", name: "Final Hospital Bill", icon: FileText, description: "Certified true copy", isUploaded: false },
    { id: "indigency", name: "Brgy. Indigency", icon: Building2, description: "With dry seal from Brgy. Hall", isUploaded: false },
    { id: "id", name: "Patient/Rep Valid ID", icon: ShieldCheck, description: "Gov't issued ID", isUploaded: false },
];

export default function MalasakitPage() {
    const [docs, setDocs] = useState<DocumentType[]>(INITIAL_DOCS);
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    const uploadedCount = docs.filter(d => d.isUploaded).length;
    const progress = (uploadedCount / docs.length) * 100;
    const isComplete = uploadedCount === docs.length;

    const handleUpload = (id: string, name: string) => {
        // Simulate upload delay
        setTimeout(() => {
            setDocs(prev => prev.map(doc =>
                doc.id === id ? { ...doc, isUploaded: true } : doc
            ));
            showToast(`${name} Saved Encrypted`);
        }, 600);
    };

    const showToast = (msg: string) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 3000);
    };

    return (
        <div className="min-h-screen bg-blue-50/50 pb-32">
            <Navbar />

            {/* Toast Notification */}
            <div className={cn(
                "fixed top-20 right-4 z-50 bg-slate-900/90 text-white px-4 py-3 rounded-lg shadow-xl transition-all duration-300 transform flex items-center gap-3 backdrop-blur-sm",
                toastMessage ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0 pointer-events-none"
            )}>
                <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse"></div>
                {toastMessage}
            </div>

            <main className="container mx-auto px-4 pt-32 pb-32 max-w-lg md:max-w-4xl">
                {/* Header Section */}
                <div className="mb-8 text-center md:text-left">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-800 mb-2">Malasakit & DSWD Prep</h1>
                            <p className="text-slate-500">Organize your documents before you queue. Don't get rejected.</p>
                        </div>
                        {/* Progress Widget */}
                        <div className="bg-white p-4 rounded-2xl shadow-sm border border-blue-100 min-w-[200px]">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-xs font-bold uppercase text-blue-500">Readiness</span>
                                <span className="text-sm font-bold text-slate-700">{uploadedCount} of {docs.length}</span>
                            </div>
                            <div className="h-2 w-full bg-blue-100 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-blue-500 transition-all duration-500 ease-out"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Document Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {docs.map((doc) => (
                        <div
                            key={doc.id}
                            onClick={() => !doc.isUploaded && handleUpload(doc.id, doc.name)}
                            className={cn(
                                "relative overflow-hidden rounded-2xl p-6 transition-all duration-300 cursor-pointer group glass-panel",
                                doc.isUploaded
                                    ? "bg-white/90 border-2 border-emerald-400 shadow-lg"
                                    : "bg-white/40 border-2 border-dashed border-blue-200 hover:border-blue-400 hover:bg-blue-50/50"
                            )}
                        >
                            <div className="flex items-start gap-4">
                                <div className={cn(
                                    "h-12 w-12 rounded-xl flex items-center justify-center transition-colors",
                                    doc.isUploaded ? "bg-emerald-100 text-emerald-600" : "bg-blue-100 text-blue-600"
                                )}>
                                    <doc.icon size={24} />
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <h3 className={cn("font-bold text-lg", doc.isUploaded ? "text-emerald-900" : "text-slate-700")}>
                                            {doc.name}
                                        </h3>
                                        {doc.isUploaded && (
                                            <div className="bg-emerald-100 text-emerald-700 p-1 rounded-full">
                                                <CheckCircle2 size={16} />
                                            </div>
                                        )}
                                    </div>
                                    <p className="text-sm text-slate-500 mt-1">{doc.description}</p>
                                </div>
                            </div>

                            {/* Status Label */}
                            <div className="mt-4 pt-4 border-t border-slate-50 flex justify-between items-center">
                                {doc.isUploaded ? (
                                    <span className="text-xs font-bold text-emerald-600 uppercase tracking-wide flex items-center gap-1">
                                        Verified & Encrypted
                                    </span>
                                ) : (
                                    <span className="text-xs font-bold text-blue-400 uppercase tracking-wide flex items-center gap-1 group-hover:text-blue-500">
                                        <UploadCloud size={14} /> Tap to Upload
                                    </span>
                                )}
                            </div>

                            {/* Fake Upload Progress Overlay */}
                            <div className="absolute inset-x-0 bottom-0 h-1 bg-emerald-500 transform scale-x-0 transition-transform origin-left"
                                style={{ transform: doc.isUploaded ? 'scaleX(1)' : 'scaleX(0)' }}
                            />
                        </div>
                    ))}
                </div>

                {/* Empty State / Encouragement */}
                {!isComplete && (
                    <div className="mt-8 text-center p-6 bg-white/50 rounded-2xl border border-blue-100/50 lg:hidden">
                        <p className="text-sm text-slate-400">Complete all requirements to generate your Express Pass.</p>
                    </div>
                )}
            </main>

            {/* Express Pass Bottom Sheet / Footer */}
            <div className={cn(
                "fixed bottom-0 left-0 right-0 bg-white shadow-[0_-5px_20px_-5px_rgba(0,0,0,0.1)] rounded-t-[2rem] transition-transform duration-500 ease-in-out border-t border-blue-100 z-40",
                isComplete ? "translate-y-0" : "translate-y-full"
            )}>
                <div className="max-w-4xl mx-auto px-6 py-6 sm:py-8 flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <div className="h-16 w-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
                            <QrCode size={32} />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg text-slate-800">Express Pass Ready</h3>
                            <p className="text-slate-500 text-sm">Ospital ng Angeles / Malasakit Center Compatible</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 w-full sm:w-auto">
                        <div className="hidden sm:block text-right">
                            <p className="text-xs text-slate-400 font-mono">ID: REF-MLA-2024</p>
                            <p className="text-xs font-bold text-emerald-600">ALL DOCUMENTS VERIFIED</p>
                        </div>
                        <Button className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200" size="lg">
                            Show to Social Worker <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                </div>
                {/* Decorative colored bar */}
                <div className="h-2 w-full bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500" />
            </div>
        </div>
    );
}
