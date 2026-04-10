"use client";

import { AnimatedSection } from "@/components/ui/animated-section";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
    {
        q: "Is my payment secure on SkillBridge?",
        a: "Yes, we use industry-standard encrypted payment gateways. Your funds are held securely and only released to the tutor after a successful session."
    },
    {
        q: "What happens if a tutor cancels?",
        a: "If a tutor cancels, you will receive a 100% refund immediately or have the option to reschedule with the same or a different tutor."
    },
    {
        q: "Are the tutors verified?",
        a: "Absolutely. Every tutor goes through a strict vetting process, including identity verification and background checks on their expertise."
    }
];

export const HomeFAQ = () => {
    const [open, setOpen] = useState<number | null>(0);

    return (
        <AnimatedSection className="container mx-auto px-4 py-20">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
                <div className="space-y-6">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Everything you <br />need to know</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        Find answers to common questions about our platform, payments, and safety.
                        Still have questions? Our support team is here to help.
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, i) => (
                        <div key={i} className="border-b">
                            <button
                                onClick={() => setOpen(open === i ? null : i)}
                                className="w-full py-6 flex justify-between items-center text-left transition-all group"
                            >
                                <span className={`text-lg font-bold ${open === i ? "text-primary" : "text-foreground group-hover:text-primary"}`}>{faq.q}</span>
                                {open === i ? <Minus className="w-5 h-5 text-primary" /> : <Plus className="w-5 h-5 text-muted-foreground" />}
                            </button>
                            <AnimatePresence>
                                {open === i && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <p className="pb-6 text-muted-foreground leading-relaxed">
                                            {faq.a}
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </AnimatedSection>
    );
};
