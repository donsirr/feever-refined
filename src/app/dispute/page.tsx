"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { FileText, Copy, Download, AlertTriangle, CheckSquare, Square } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock Data (Shared with report page effectively)
const FLAGGED_ITEMS = [
    { id: 2, name: "Chest X-Ray (PA View)", price: 850, refPrice: 600, overcharge: 41, status: "warning" },
    { id: 3, name: "Paracetamol 500mg (IV)", price: 150, refPrice: 35, overcharge: 328, status: "danger" },
    { id: 6, name: "Oxygen Therapy (per hour)", price: 600, refPrice: 200, overcharge: 200, status: "danger" },
    { id: 7, name: "Syringe 5cc", price: 120, refPrice: 15, overcharge: 700, status: "danger" },
];

export default function DisputePage() {
    const [selectedItems, setSelectedItems] = useState<number[]>(FLAGGED_ITEMS.map(i => i.id));
    const [tone, setTone] = useState<"polite" | "firm">("polite");
    const [patientName, setPatientName] = useState("Juan dela Cruz");
    const [hospitalName, setHospitalName] = useState("St. Lukes Medical Center");
    const [referenceNo, setReferenceNo] = useState("FE-2024-8821");

    const toggleItem = (id: number) => {
        setSelectedItems(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const selectedTotal = FLAGGED_ITEMS
        .filter(i => selectedItems.includes(i.id))
        .reduce((acc, curr) => acc + curr.price, 0);

    const totalOverchargeAmount = FLAGGED_ITEMS
        .filter(i => selectedItems.includes(i.id))
        .reduce((acc, curr) => acc + (curr.price - curr.refPrice), 0);

    const getLetterContent = () => {
        const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        const selectedList = FLAGGED_ITEMS.filter(i => selectedItems.includes(i.id));

        if (tone === "polite") {
            return (
                <>
                    <p className="mb-4">To the Billing Department,</p>
                    <p className="mb-4">
                        I am writing to respectfully request a review of the charges in the billing statement for patient <strong>{patientName}</strong> (Ref: {referenceNo}), dated {today}.
                    </p>
                    <p className="mb-4">
                        Upon reviewing the itemized breakdown against the Department of Health (DOH) Reference Drug Price Index and standard procedure costs, I noticed several discrepancies that appear to be significantly higher than the mandated price caps. Specifically, I would like to clarify the following charges:
                    </p>
                    <ul className="list-disc pl-5 mb-4 space-y-1">
                        {selectedList.map(item => (
                            <li key={item.id}>
                                <strong>{item.name}</strong>: Billed at ₱{item.price}, which is {item.overcharge}% higher than the reference price of ₱{item.refPrice}.
                            </li>
                        ))}
                    </ul>
                    <p className="mb-4">
                        I understand that administrative costs may apply, but these specific variances seem outside the reasonable range. I kindly ask for a detailed justification for these pricing tiers or a readjustment of the final bill to align with DOH guidelines.
                    </p>
                    <p className="mb-8">
                        Thank you for your time and assistance in resolving this matter.
                    </p>
                    <p>Sincerely,</p>
                    <p className="mt-8 border-t border-black w-48 pt-2">[Signature]</p>
                </>
            );
        } else {
            return (
                <>
                    <p className="mb-4">To the Head of Billing / Finance Dept,</p>
                    <p className="mb-4">
                        This letter serves as a formal dispute regarding the billing statement issued to <strong>{patientName}</strong> (Ref: {referenceNo}).
                    </p>
                    <p className="mb-4">
                        An independent analysis of your billing statement indicates clear violations of the Department of Health (DOH) Price Freeze and Reference Index guidelines. The following items are billed at excessive rates:
                    </p>
                    <ul className="list-disc pl-5 mb-4 space-y-1">
                        {selectedList.map(item => (
                            <li key={item.id}>
                                <strong>{item.name}</strong>: Billed at ₱{item.price} (Excess of ₱{item.price - item.refPrice} per unit vs. DOH Cap).
                            </li>
                        ))}
                    </ul>
                    <p className="mb-4">
                        Please be advised that under Republic Act 9502 (Cheaper Medicines Act) and current DOH circulars, excessive markups on essential medicines are prohibited.
                    </p>
                    <p className="mb-4">
                        I demand an immediate recalculation of the total bill to reflect fair regulatory pricing. Failure to address this dispute may result in a formal complaint lodged with the DOH Health Facilities and Services Regulatory Bureau (HFSRB).
                    </p>
                    <p className="mb-8">
                        I expect a written response within 3 business days.
                    </p>
                    <p>Regards,</p>
                    <p className="mt-8 border-t border-black w-48 pt-2">[Signature]</p>
                </>
            );
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-24 sm:pb-8">
            <Navbar />

            <main className="container mx-auto px-4 pt-32 pb-32 max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <h1 className="text-3xl font-bold text-secondary mb-2">Generate Dispute Letter</h1>
                    <p className="text-secondary-light">Select the charges you wish to contest and customize your formal letter.</p>
                </div>

                <div className="grid lg:grid-cols-12 gap-8">
                    {/* Column 1: The 'Cart' of Errors (4 columns) */}
                    <div className="lg:col-span-4 flex flex-col gap-6">
                        <Card className="flex flex-col h-full bg-white shadow-sm border-gray-200">
                            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50 rounded-t-2xl">
                                <h3 className="font-bold text-secondary flex items-center gap-2">
                                    <AlertTriangle className="text-amber-500" size={18} /> Discrepancies
                                </h3>
                                <span className="text-xs font-medium text-gray-500">{selectedItems.length} selected</span>
                            </div>

                            <div className="flex-1 overflow-y-auto p-2 space-y-2">
                                {FLAGGED_ITEMS.map((item) => {
                                    const isSelected = selectedItems.includes(item.id);
                                    return (
                                        <div
                                            key={item.id}
                                            onClick={() => toggleItem(item.id)}
                                            className={cn(
                                                "p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-3 hover:shadow-md select-none",
                                                isSelected
                                                    ? "bg-teal-50 border-primary/50 shadow-sm"
                                                    : "bg-white border-transparent hover:border-gray-200"
                                            )}
                                        >
                                            <div className={cn("mt-1", isSelected ? "text-primary" : "text-gray-300")}>
                                                {isSelected ? <CheckSquare size={20} /> : <Square size={20} />}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex justify-between items-start">
                                                    <h4 className={cn("font-medium text-sm", isSelected ? "text-secondary" : "text-gray-400")}>{item.name}</h4>
                                                    <span className={cn("font-bold text-sm", isSelected ? "text-secondary" : "text-gray-400")}>₱{item.price}</span>
                                                </div>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <Badge variant="danger" size="sm" className={isSelected ? "" : "opacity-50 grayscale"}>
                                                        +{item.overcharge}%
                                                    </Badge>
                                                    <span className="text-xs text-secondary-light">vs ₱{item.refPrice}</span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="p-6 border-t border-gray-100 bg-gray-50 rounded-b-2xl mt-auto">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm text-secondary-light">Total Disputed Value</span>
                                    <span className="text-xl font-bold text-secondary">₱{selectedTotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-secondary-light">Potential Savings</span>
                                    <span className="text-lg font-bold text-emerald-600">₱{totalOverchargeAmount.toLocaleString()}</span>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Column 2: Letter Preview (8 columns) */}
                    <div className="lg:col-span-8 flex flex-col gap-6">
                        <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end gap-4">
                            <div className="flex items-center gap-4 bg-white p-1 rounded-lg border border-gray-200">
                                <button
                                    onClick={() => setTone("polite")}
                                    className={cn(
                                        "px-4 py-2 rounded-md text-sm font-medium transition-all",
                                        tone === "polite" ? "bg-primary text-white shadow-sm" : "text-gray-500 hover:bg-gray-50"
                                    )}
                                >
                                    Polite & Professional
                                </button>
                                <button
                                    onClick={() => setTone("firm")}
                                    className={cn(
                                        "px-4 py-2 rounded-md text-sm font-medium transition-all",
                                        tone === "firm" ? "bg-secondary text-white shadow-sm" : "text-gray-500 hover:bg-gray-50"
                                    )}
                                >
                                    Firm & Legal
                                </button>
                            </div>
                            <span className="text-xs text-gray-400">
                                Previewing A4 Document
                            </span>
                        </div>

                        {/* A4 Paper Effect */}
                        <div className="w-full bg-white shadow-xl min-h-[800px] p-8 sm:p-12 md:p-16 rounded-sm border border-gray-200 relative mx-auto max-w-[210mm] font-serif text-gray-800 leading-relaxed text-base sm:text-lg">
                            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-teal-500 via-primary to-teal-700 opacity-20"></div>

                            {/* Letter Header */}
                            <div className="mb-12 flex justify-between items-start border-b border-gray-100 pb-8">
                                <div>
                                    <h2 className="font-bold text-xl mb-1">{hospitalName}</h2>
                                    <p className="text-sm text-gray-500">Billing & Finance Dept.</p>
                                    <p className="text-sm text-gray-500">Metro Manila, Philippines</p>
                                </div>
                                <div className="text-right flex flex-col items-end gap-2">
                                    <div className="flex gap-2 mb-2">
                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Copy to Clipboard">
                                            <Copy size={14} />
                                        </Button>
                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Download PDF">
                                            <Download size={14} />
                                        </Button>
                                    </div>
                                    <p className="font-bold">{new Date().toLocaleDateString()}</p>
                                    <p className="text-sm text-gray-500">Ref: {referenceNo}</p>
                                </div>
                            </div>

                            {/* Letter Body */}
                            <div className="min-h-[400px]">
                                {getLetterContent()}
                            </div>

                            {/* Footer or Watermark */}
                            <div className="mt-16 pt-8 border-t border-gray-100 text-center text-xs text-gray-400">
                                <p>Generated via Fee-Ver 2.0 • AI-Verified Healthcare Pricing</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Floating Action Bar (Mobile Only) */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 md:hidden z-10 transition-transform duration-300">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="hidden sm:block">
                        <span className="text-sm text-gray-500">Ready to send?</span>
                    </div>
                    <div className="flex w-full sm:w-auto gap-3">
                        <Button variant="secondary" className="flex-1 sm:flex-none">
                            <Copy className="mr-2 h-4 w-4" /> Copy Text
                        </Button>
                        <Button variant="primary" className="flex-1 sm:flex-none shadow-lg shadow-teal-200">
                            <Download className="mr-2 h-4 w-4" /> Download PDF
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
