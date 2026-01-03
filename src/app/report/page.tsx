"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button"; // If needed
import { AlertCircle, CheckCircle, Info, ChevronRight, PieChart, ShieldCheck, Wallet } from "lucide-react";
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
                        <p className="text-secondary-light">Analysis ID: #FE-2026-8821 • Generated Just Now</p>
                    </div>

                    <Link href="/scan">
                        <Button variant="outline" className="flex items-center gap-2">
                            <PieChart size={16} /> Start New Analysis
                        </Button>
                    </Link>
                </div>

                <div className="grid lg:grid-cols-12 gap-8">
                    {/* Left Column: Visuals & High-Level Stats (4 cols) */}
                    <div className="lg:col-span-4 flex flex-col gap-6">
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
                                        <p className="font-mono text-[10px] text-slate-400">#FE-2026-8821</p>
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
                    <div className="lg:col-span-8 flex flex-col gap-6">
                        {/* Benefit Stacker / Coverage Analyzer */}
                        <Card className="glass-panel p-6 shadow-2xl shadow-slate-200/50 border-slate-200/60 w-full mb-8">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6 gap-4">
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                                        <Wallet className="text-teal-600" size={24} /> Projected Savings & Coverage
                                    </h3>
                                    <p className="text-sm text-slate-500 mt-1">Based on DOH Case Rates & HMO Limits</p>
                                </div>
                                <div className="text-right p-3 bg-slate-50 rounded-xl border border-slate-100">
                                    <span className="text-xs text-slate-500 uppercase font-bold block mb-1">Total Savings Found</span>
                                    <div className="text-2xl font-bold text-emerald-600">₱{(BENEFIT_DATA.philhealth + BENEFIT_DATA.hmo).toLocaleString()}</div>
                                </div>
                            </div>

                            {/* Stacked Bar */}
                            <div className="relative pt-6 pb-2">
                                <div className="h-4 w-full rounded-full overflow-hidden flex bg-slate-100 ring-1 ring-slate-200">
                                    <div className="h-full bg-blue-500 transition-all duration-1000 ease-out" style={{ width: `${(BENEFIT_DATA.philhealth / BENEFIT_DATA.total) * 100}%` }}></div>
                                    <div className="h-full bg-purple-500 transition-all duration-1000 ease-out delay-100" style={{ width: `${(BENEFIT_DATA.hmo / BENEFIT_DATA.total) * 100}%` }}></div>
                                    <div className="h-full bg-slate-300 transition-all duration-1000 ease-out delay-200" style={{ width: `${(BENEFIT_DATA.cash / BENEFIT_DATA.total) * 100}%` }}></div>
                                </div>
                            </div>

                            {/* Detailed Legend */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                                <div className="flex flex-col gap-1 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                                    <div className="flex items-center gap-2 mb-1">
                                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                                        <span className="text-xs font-semibold text-slate-600 uppercase">PhilHealth</span>
                                    </div>
                                    <span className="text-xl font-bold text-slate-900">₱{BENEFIT_DATA.philhealth.toLocaleString()}</span>
                                    <span className="text-xs text-slate-400">Automatic Deduction</span>
                                </div>

                                <div className="flex flex-col gap-1 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                                    <div className="flex items-center gap-2 mb-1">
                                        <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                                        <span className="text-xs font-semibold text-slate-600 uppercase">HMO / Insurance</span>
                                    </div>
                                    <span className="text-xl font-bold text-slate-900">₱{BENEFIT_DATA.hmo.toLocaleString()}</span>
                                    <span className="text-xs text-slate-400">Maxicare Health</span>
                                </div>

                                <div className="flex flex-col gap-1 p-3 rounded-lg bg-orange-50 border border-orange-100/50">
                                    <div className="flex items-center gap-2 mb-1">
                                        <div className="w-3 h-3 rounded-full bg-slate-400"></div>
                                        <span className="text-xs font-semibold text-orange-800 uppercase">Excess / Cash</span>
                                    </div>
                                    <span className="text-xl font-bold text-orange-700">₱{BENEFIT_DATA.cash.toLocaleString()}</span>
                                    <span className="text-xs text-orange-600/70">Patient Payable</span>
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
                                            <React.Fragment key={item.id}>
                                                <tr
                                                    onClick={() => setSelectedItem(selectedItem === item.id ? null : item.id)}
                                                    className={cn(
                                                        "hover:bg-teal-50/30 transition-colors cursor-pointer group border-l-4",
                                                        selectedItem === item.id
                                                            ? "bg-teal-50/50 border-l-teal-500"
                                                            : "border-l-transparent"
                                                    )}
                                                >
                                                    <td className="px-6 py-4 font-medium text-slate-900 align-top">
                                                        {item.name}
                                                    </td>
                                                    <td className="px-6 py-4 text-slate-500 align-top">{item.category}</td>
                                                    <td className="px-6 py-4 text-right font-mono font-medium align-top">₱{item.price.toLocaleString()}</td>
                                                    <td className="px-6 py-4 text-right font-mono text-slate-400 align-top">₱{item.referencePrice.toLocaleString()}</td>
                                                    <td className="px-6 py-4 align-top">
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
                                                {/* Expanded Detail Row */}
                                                {selectedItem === item.id && (
                                                    <tr className="bg-teal-50/30 animate-fade-in">
                                                        <td colSpan={5} className="px-6 pb-6 pt-0 border-b border-teal-100/50">
                                                            <div className="bg-white/80 rounded-xl p-4 border border-teal-100 shadow-sm ml-4 mt-2">
                                                                <h4 className="text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                                                                    <ShieldCheck size={16} className="text-teal-600" /> AI Verification Analysis
                                                                </h4>
                                                                {item.status !== 'ok' ? (
                                                                    <div className="space-y-2">
                                                                        <p className="text-sm text-slate-600">
                                                                            This item is flagged as <span className="font-bold text-red-600">{item.status === 'danger' ? 'High Risk' : 'Medium Risk'}</span>.
                                                                            The billed amount of <span className="font-mono font-bold">₱{item.price}</span> is
                                                                            <span className="font-bold text-red-500 mx-1">
                                                                                {Math.round(((item.price - item.referencePrice) / item.referencePrice) * 100)}% higher
                                                                            </span>
                                                                            than the DOH Reference Price of ₱{item.referencePrice}.
                                                                        </p>
                                                                        <div className="flex gap-3 mt-3">
                                                                            <div className="text-xs bg-slate-100 px-3 py-1.5 rounded-md text-slate-500">
                                                                                Ref Code: DOH-2024-L882
                                                                            </div>
                                                                            <div className="text-xs bg-slate-100 px-3 py-1.5 rounded-md text-slate-500">
                                                                                Circular: 2024-0012
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                ) : (
                                                                    <p className="text-sm text-slate-600">
                                                                        <span className="text-emerald-600 font-bold">Verification Passed.</span> The billed price is within the acceptable range of the DOH Price Reference Index (2024). No discrepancies found.
                                                                    </p>
                                                                )}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )}
                                            </React.Fragment>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </Card>

                        <div className="flex flex-col sm:flex-row items-center justify-end gap-6 mt-4 p-4 rounded-2xl bg-slate-50 border border-slate-100/50">
                            <div className="text-center sm:text-right">
                                <p className="text-sm font-bold text-slate-700">Ready to contest these charges?</p>
                                <p className="text-xs text-slate-500">Create a formal dispute letter in seconds.</p>
                            </div>
                            <Link href="/dispute" className="w-full sm:w-auto">
                                <Button variant="primary" size="xl" className="w-full sm:w-auto px-8 py-6 text-lg font-bold shadow-xl shadow-teal-500/20 group hover:-translate-y-0.5">
                                    Generate Dispute Letter
                                    <ChevronRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
