"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button"; // If needed
import { AlertCircle, CheckCircle, Info, ChevronRight, PieChart, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

// Dummy Data
const BILL_ITEMS = [
    { id: 1, name: "Complete Blood Count (CBC)", price: 450, referencePrice: 450, status: "ok", category: "Laboratory" },
    { id: 2, name: "Chest X-Ray (PA View)", price: 850, referencePrice: 600, status: "warning", statusMsg: "41% above Ref", category: "Radiology" },
    { id: 3, name: "Paracetamol 500mg (IV)", price: 150, referencePrice: 35, status: "danger", statusMsg: "300% Overcharge", category: "Pharmacy" },
    { id: 4, name: "Daily Room Charge (Private)", price: 4500, referencePrice: 4000, status: "ok", category: "Accommodation" },
    { id: 5, name: "Professional Fee (Dr. Cruz)", price: 15000, referencePrice: 15000, status: "ok", category: "Services" },
    { id: 6, name: "Oxygen Therapy (per hour)", price: 600, referencePrice: 200, status: "danger", statusMsg: "200% Overcharge", category: "Supplies" },
    { id: 7, name: "Syringe 5cc", price: 120, referencePrice: 15, status: "danger", statusMsg: "700% Overcharge", category: "Supplies" },
];

const BENEFIT_DATA = {
    total: 21670,
    philhealth: 8400,
    hmo: 10000,
    cash: 3270,
};

export default function ReportPage() {
    const [selectedItem, setSelectedItem] = useState<number | null>(null);

    const trustScore = 65; // High Risk

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />

            <main className="flex-1 container mx-auto px-4 pt-32 pb-8 max-w-7xl">
                {/* Header Summary */}
                <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-bold text-secondary mb-1">Bill Health Report</h1>
                        <p className="text-secondary-light">Analysis ID: #FE-2024-8821 • Generated Just Now</p>
                    </div>

                    <Card className="flex items-center gap-6 px-6 py-4 bg-white shadow-md border-l-4 border-l-amber-500">
                        <div className="relative h-16 w-16 flex items-center justify-center">
                            <svg className="h-full w-full transform -rotate-90">
                                <circle className="text-gray-100" strokeWidth="6" stroke="currentColor" fill="transparent" r="28" cx="32" cy="32" />
                                <circle className="text-amber-500" strokeWidth="6" strokeDasharray={175} strokeDashoffset={175 - (175 * trustScore) / 100} strokeLinecap="round" stroke="currentColor" fill="transparent" r="28" cx="32" cy="32" />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-lg font-bold text-secondary">{trustScore}</span>
                            </div>
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Trust Score</p>
                            <h3 className="text-xl font-bold text-amber-600">High Risk</h3>
                            <p className="text-xs text-secondary-light">Multiple overcharges detected</p>
                        </div>
                    </Card>
                </div>

                <div className="grid lg:grid-cols-12 gap-8 h-[calc(100vh-200px)] min-h-[800px]">
                    {/* Left Column: Visuals & High-Level Stats (4 cols) */}
                    <div className="lg:col-span-4 flex flex-col gap-6 h-full overflow-y-auto pr-2 custom-scrollbar">
                        {/* Trust Score Card */}
                        <Card className="glass-panel p-6 border-l-4 border-l-amber-500 bg-amber-50/50">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-bold text-slate-700">Audit Score</h3>
                                <Badge variant="warning">High Risk</Badge>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="relative h-20 w-20 flex items-center justify-center">
                                    <svg className="h-full w-full transform -rotate-90">
                                        <circle className="text-slate-200" strokeWidth="8" stroke="currentColor" fill="transparent" r="32" cx="40" cy="40" />
                                        <circle className="text-amber-500 transition-all duration-1000 ease-out" strokeWidth="8" strokeDasharray={200} strokeDashoffset={200 - (200 * trustScore) / 100} strokeLinecap="round" stroke="currentColor" fill="transparent" r="32" cx="40" cy="40" />
                                    </svg>
                                    <span className="absolute text-xl font-bold text-slate-700">{trustScore}</span>
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm text-slate-500 leading-tight">
                                        We found significant anomalies in your billing statement compared to DOH standards.
                                    </p>
                                </div>
                            </div>
                        </Card>

                        {/* Receipt Visualization */}
                        <div className="h-[500px] relative group perspective-[1000px]">
                            <div className="relative w-full h-full bg-slate-200/50 rounded-2xl p-2 overflow-hidden flex flex-col items-center">
                                <div className="w-full bg-white shadow-2xl relative flex flex-col receipt-zigzag transform transition-transform duration-500 group-hover:rotate-0 rotate-1 origin-top-center h-full">
                                    <div className="p-6 text-center border-b-2 border-dashed border-gray-300">
                                        <div className="mx-auto w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center text-white mb-2">
                                            <ShieldCheck size={20} />
                                        </div>
                                        <h2 className="font-mono font-bold text-xl text-slate-900 uppercase tracking-widest">RECEIPT</h2>
                                        <p className="font-mono text-[10px] text-slate-400">#FE-2024-8821</p>
                                    </div>
                                    <div className="p-6 flex-1 font-mono text-xs overflow-y-auto custom-scrollbar">
                                        <div className="flex justify-between text-[10px] text-gray-400 uppercase tracking-wider mb-2">
                                            <span>Item</span>
                                            <span>PHP</span>
                                        </div>
                                        {BILL_ITEMS.map((item) => (
                                            <div key={item.id} className="flex justify-between py-1 border-b border-dashed border-gray-100 last:border-0">
                                                <span className="truncate pr-2">{item.name}</span>
                                                <span className={item.status === 'danger' ? "text-red-500 font-bold" : ""}>{item.price.toLocaleString()}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Detailed Breakdown & Benefit Stacker (8 cols) */}
                    <div className="lg:col-span-8 flex flex-col gap-6 h-full overflow-y-auto pr-2 custom-scrollbar pb-20">
                        {/* Benefit Stacker */}
                        <Card className="glass-panel p-6 border-teal-100/50">
                            <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
                                <div>
                                    <h3 className="font-bold text-slate-800 flex items-center gap-2 text-lg">
                                        <ShieldCheck className="text-teal-600" size={24} /> Coverage Analyzer
                                    </h3>
                                    <p className="text-sm text-slate-500">Your potential savings breakdown</p>
                                </div>
                                <div className="text-right mt-4 sm:mt-0">
                                    <span className="text-xs text-slate-400 uppercase font-bold">You Pay Only</span>
                                    <div className="text-3xl font-bold text-slate-900">₱{BENEFIT_DATA.cash.toLocaleString()}</div>
                                </div>
                            </div>

                            {/* Stacked Bar */}
                            <div className="h-16 w-full rounded-2xl overflow-hidden flex mb-4 ring-1 ring-slate-200 shadow-inner bg-slate-50">
                                <div className="h-full bg-blue-500 relative group flex items-center justify-center text-white font-bold text-sm" style={{ width: `${(BENEFIT_DATA.philhealth / BENEFIT_DATA.total) * 100}%` }}>
                                    PhilHealth
                                    <div className="absolute top-full mt-2 bg-slate-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 z-10 transition-opacity">₱{BENEFIT_DATA.philhealth.toLocaleString()}</div>
                                </div>
                                <div className="h-full bg-purple-500 relative group flex items-center justify-center text-white font-bold text-sm" style={{ width: `${(BENEFIT_DATA.hmo / BENEFIT_DATA.total) * 100}%` }}>
                                    HMO
                                    <div className="absolute top-full mt-2 bg-slate-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 z-10 transition-opacity">₱{BENEFIT_DATA.hmo.toLocaleString()}</div>
                                </div>
                                <div className="h-full bg-slate-200 relative group flex items-center justify-center text-slate-600 font-bold text-sm" style={{ width: `${(BENEFIT_DATA.cash / BENEFIT_DATA.total) * 100}%` }}>
                                    Cash
                                    <div className="absolute top-full mt-2 bg-slate-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 z-10 transition-opacity">₱{BENEFIT_DATA.cash.toLocaleString()}</div>
                                </div>
                            </div>
                        </Card>

                        {/* Detailed Item Breakdown Table */}
                        <Card className="glass-panel p-0 overflow-hidden flex-1 shadow-2xl shadow-slate-200/50 border-slate-200/60">
                            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white/50 backdrop-blur-sm">
                                <div>
                                    <h3 className="font-bold text-slate-800 text-lg">Detailed Item Analysis</h3>
                                    <p className="text-sm text-slate-500">7 Line Items Processed</p>
                                </div>
                                <div className="flex gap-2">
                                    <Badge variant="danger">{BILL_ITEMS.filter(i => i.status === 'danger').length} Overcharges</Badge>
                                    <Badge variant="warning">{BILL_ITEMS.filter(i => i.status === 'warning').length} Warnings</Badge>
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-100">
                                        <tr>
                                            <th className="px-6 py-4">Description</th>
                                            <th className="px-6 py-4">Category</th>
                                            <th className="px-6 py-4 text-right">Billed Price</th>
                                            <th className="px-6 py-4 text-right">DOH Ref</th>
                                            <th className="px-6 py-4">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 bg-white/40">
                                        {BILL_ITEMS.map((item) => (
                                            <tr
                                                key={item.id}
                                                onClick={() => setSelectedItem(item.id)}
                                                className={cn(
                                                    "hover:bg-teal-50/30 transition-colors cursor-pointer group",
                                                    selectedItem === item.id ? "bg-teal-50/50" : ""
                                                )}
                                            >
                                                <td className="px-6 py-4 font-medium text-slate-900">
                                                    {item.name}
                                                    {selectedItem === item.id && item.status !== 'ok' && (
                                                        <div className="text-xs text-slate-500 mt-1 font-normal animate-slide-up">
                                                            Analysis: Price exceeds DOH Index by {Math.round(((item.price - item.referencePrice) / item.referencePrice) * 100)}%.
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 text-slate-500">{item.category}</td>
                                                <td className="px-6 py-4 text-right font-mono font-medium">₱{item.price.toLocaleString()}</td>
                                                <td className="px-6 py-4 text-right font-mono text-slate-400">₱{item.referencePrice.toLocaleString()}</td>
                                                <td className="px-6 py-4">
                                                    {item.status === 'danger' ? (
                                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-red-100 text-red-600">
                                                            <AlertCircle size={14} /> Overcharge
                                                        </span>
                                                    ) : item.status === 'warning' ? (
                                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-600">
                                                            <Info size={14} /> Warning
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-600">
                                                            <CheckCircle size={14} /> Verified
                                                        </span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </Card>

                        <div className="flex justify-end gap-4">
                            <Link href="/dispute">
                                <Button variant="danger" size="xl" pulsing className="px-8 shadow-xl shadow-red-500/20">
                                    Generate Dispute Letter <ChevronRight size={20} className="ml-2" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
