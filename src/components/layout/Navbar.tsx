"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ShieldCheck, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/mode-toggle";

export const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 flex justify-center py-4 px-4 h-24 pointer-events-none">
            <nav className="pointer-events-auto relative flex items-center justify-between w-full max-w-5xl px-6 py-3 glass-panel rounded-full z-50">
                <Link href="/" className="flex items-center gap-2.5 group">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 text-white shadow-lg shadow-teal-500/20 group-hover:scale-105 transition-transform duration-300">
                        <ShieldCheck size={20} className="text-white" />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                        Fee-Ver
                    </span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8">
                    <Link href="/#features" className="text-sm font-medium text-secondary hover:text-foreground transition-colors">Features</Link>
                    <Link href="/#how-it-works" className="text-sm font-medium text-secondary hover:text-foreground transition-colors">How it Works</Link>
                    <Link href="/malasakit" className="text-sm font-medium text-secondary hover:text-foreground transition-colors">Malasakit Aid</Link>
                </div>

                <div className="flex items-center gap-2">
                    <ModeToggle />
                    <Link href="/scan">
                        <Button variant="primary" size="sm" className="rounded-full px-5 text-sm hidden sm:flex">
                            Launch App
                        </Button>
                    </Link>
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2 text-secondary hover:bg-secondary/10 rounded-full transition-colors active:scale-95"
                    >
                        <Menu size={20} />
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Dropdown */}
            {isMenuOpen && (
                <div className="pointer-events-auto absolute top-full left-4 right-4 mt-2 p-2 glass-panel rounded-3xl flex flex-col gap-1 animate-slide-up origin-top transform transition-all duration-200">
                    <Link
                        href="/#features"
                        onClick={() => setIsMenuOpen(false)}
                        className="p-4 text-center font-medium text-secondary hover:bg-secondary/10 rounded-2xl transition-colors"
                    >
                        Features
                    </Link>
                    <Link
                        href="/#how-it-works"
                        onClick={() => setIsMenuOpen(false)}
                        className="p-4 text-center font-medium text-secondary hover:bg-secondary/10 rounded-2xl transition-colors"
                    >
                        How it Works
                    </Link>
                    <Link
                        href="/malasakit"
                        onClick={() => setIsMenuOpen(false)}
                        className="p-4 text-center font-medium text-secondary hover:bg-secondary/10 rounded-2xl transition-colors"
                    >
                        Malasakit Aid
                    </Link>
                </div>
            )}
        </header>
    );
};
