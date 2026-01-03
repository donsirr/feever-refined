"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { UploadCloud, FileText, CheckCircle2, Loader2, Image as ImageIcon, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

export default function ScanPage() {
    const router = useRouter();
    const [isDragging, setIsDragging] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [statusMessage, setStatusMessage] = useState("Initializing analysis...");

    // Mock Analysis Process
    useEffect(() => {
        if (isAnalyzing) {
            const interval = setInterval(() => {
                setProgress((prev) => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        return 100;
                    }
                    return prev + 1;
                });
            }, 50); // Total 5 seconds

            return () => clearInterval(interval);
        }
    }, [isAnalyzing]);

    useEffect(() => {
        if (progress < 30) setStatusMessage("Scanning document layout...");
        else if (progress < 60) setStatusMessage("Extracting line items and prices...");
        else if (progress < 85) setStatusMessage("Checking DOH Price Index Reference...");
        else if (progress < 100) setStatusMessage("Verifying PhilHealth Benefit Eligibility...");
        else if (progress === 100) {
            setStatusMessage("Analysis Complete!");
            setTimeout(() => router.push("/report"), 800);
        }
    }, [progress, router]);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFile(e.dataTransfer.files[0]);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const startAnalysis = () => {
        setIsAnalyzing(true);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <main className="container mx-auto px-4 pt-32 pb-12 max-w-4xl">
                <div className="mb-8 text-center relative z-10">
                    <Badge variant="neutral" className="mb-4 bg-white/50 backdrop-blur border-teal-200 text-teal-700 mx-auto w-fit px-4 py-1.5 flex items-center gap-2 shadow-sm">
                        <ShieldCheck size={14} className="animate-pulse" /> Secure Analysis
                    </Badge>
                    <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl mb-4 text-shadow-sm font-display">
                        Scan Your Bill
                    </h1>
                    <p className="text-slate-500 text-lg max-w-2xl mx-auto">
                        Upload a clear photo or PDF. We'll verify every line item instantly.
                    </p>
                </div>

                <Card className="glass-panel p-10 min-h-[450px] flex flex-col items-center justify-center border-white/60 relative overflow-hidden group">
                    {/* Background glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-teal-50/30 via-transparent to-blue-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                    {!file ? (
                        <div
                            className={cn(
                                "relative z-10 flex flex-col items-center justify-center p-12 text-center border-2 border-dashed rounded-3xl transition-all duration-300 w-full max-w-md bg-white/40",
                                isDragging
                                    ? "border-teal-500 bg-teal-50/50 scale-105"
                                    : "border-slate-300 hover:border-teal-400 hover:bg-white/60 hover:shadow-lg"
                            )}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                        >
                            <div className={cn(
                                "mb-6 h-20 w-20 rounded-full bg-white shadow-xl flex items-center justify-center text-teal-600 transition-transform duration-500",
                                isDragging ? "scale-110 rotate-12" : "group-hover:scale-110"
                            )}>
                                <UploadCloud size={36} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-2">
                                Drop your hospital bill here
                            </h3>
                            <p className="text-slate-500 mb-6 max-w-xs mx-auto text-sm">
                                Supports PDF, JPG, or PNG. We'll encrypt it instantly.
                            </p>

                            <Button
                                variant="primary"
                                size="lg"
                                className="cursor-pointer shadow-xl shadow-teal-500/20 active:scale-95 transition-all"
                                pulsing={true}
                                onClick={() => document.getElementById('file-upload')?.click()}
                            >
                                Select File
                            </Button>
                            <input
                                id="file-upload"
                                type="file"
                                className="hidden"
                                accept="image/*,.pdf"
                                onChange={handleFileChange}
                            />
                        </div>
                    ) : !isAnalyzing ? (
                        <div className="w-full flex flex-col items-center animate-fade-in">
                            <div className="w-full max-w-md bg-gray-50 rounded-xl p-6 border border-gray-100 flex items-center gap-4 mb-8">
                                <div className="h-12 w-12 rounded-lg bg-teal-100 text-primary flex items-center justify-center">
                                    <FileText size={24} />
                                </div>
                                <div className="flex-1 overflow-hidden">
                                    <p className="font-medium text-secondary truncate">{file.name}</p>
                                    <p className="text-sm text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                </div>
                                <button
                                    onClick={() => setFile(null)}
                                    className="text-gray-400 hover:text-red-500 transition-colors"
                                >
                                    Change
                                </button>
                            </div>
                            <Button onClick={startAnalysis} size="lg" pulsing>
                                Start Analysis
                            </Button>
                        </div>
                    ) : (
                        <div className="w-full max-w-lg flex flex-col items-center animate-fade-in">
                            <div className="relative h-32 w-32 mb-8">
                                <svg className="h-full w-full transform -rotate-90" viewBox="0 0 100 100">
                                    <circle
                                        className="text-gray-200"
                                        strokeWidth="8"
                                        stroke="currentColor"
                                        fill="transparent"
                                        r="42"
                                        cx="50"
                                        cy="50"
                                    />
                                    <circle
                                        className="text-primary transition-all duration-300 ease-out"
                                        strokeWidth="8"
                                        strokeDasharray={264}
                                        strokeDashoffset={264 - (264 * progress) / 100}
                                        strokeLinecap="round"
                                        stroke="currentColor"
                                        fill="transparent"
                                        r="42"
                                        cx="50"
                                        cy="50"
                                    />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center flex-col">
                                    <span className="text-2xl font-bold text-secondary">{progress}%</span>
                                </div>
                            </div>

                            <h3 className="text-xl font-bold text-secondary mb-2 animate-pulse">
                                {statusMessage}
                            </h3>

                            <div className="flex flex-col gap-3 w-full mt-6 max-w-xs">
                                {/* Steps visualization */}
                                <StepItem label="Analyzing format" completed={progress > 20} active={progress <= 20} />
                                <StepItem label="Extracting data" completed={progress > 50} active={progress > 20 && progress <= 50} />
                                <StepItem label="Checking Price Index" completed={progress > 80} active={progress > 50 && progress <= 80} />
                                <StepItem label="Calculating Coverage" completed={progress === 100} active={progress > 80} />
                            </div>
                        </div>
                    )}
                </Card>
            </main>
        </div>
    );
}

function StepItem({ label, completed, active }: { label: string; completed: boolean; active: boolean }) {
    return (
        <div className={cn("flex items-center gap-3 text-sm transition-colors",
            completed ? "text-primary font-medium" : active ? "text-secondary font-medium" : "text-gray-300"
        )}>
            <div className={cn("h-5 w-5 rounded-full flex items-center justify-center border",
                completed ? "bg-primary border-primary text-white" : active ? "border-primary border-2" : "border-gray-200"
            )}>
                {completed ? <CheckCircle2 size={12} /> : active && <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />}
            </div>
            {label}
        </div>
    );
}
