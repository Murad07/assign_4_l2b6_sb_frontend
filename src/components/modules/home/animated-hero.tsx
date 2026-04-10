"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { useState, useEffect } from "react";
import { ChevronRight, ChevronLeft, MousePointer2 } from "lucide-react";

const slides = [
    {
        title: "Programming",
        desc: "Master coding with expert developers in React, Python, and more.",
        color: "from-blue-500 to-cyan-400"
    },
    {
        title: "Design",
        desc: "Learn UI/UX, Graphic Design, and Motion from industry pros.",
        color: "from-purple-500 to-pink-500"
    },
    {
        title: "Languages",
        desc: "Speak like a native with personalized language coaching.",
        color: "from-orange-500 to-yellow-500"
    }
];

export const AnimatedHero = () => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative min-h-[75vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden pt-16">
            <AnimatedBackground />

            <div className="relative z-10 space-y-8 max-w-5xl mx-auto">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={current}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-6"
                    >
                        <div className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-semibold tracking-wide uppercase">
                            SkillBridge Academy
                        </div>
                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1]">
                            Unlock Your Potential in <br />
                            <span className={`bg-gradient-to-r ${slides[current].color} bg-clip-text text-transparent`}>
                                {slides[current].title}
                            </span>
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                            {slides[current].desc}
                        </p>
                    </motion.div>
                </AnimatePresence>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                >
                    <Link href="/tutors">
                        <Button size="lg" className="rounded-full px-10 py-7 text-lg shadow-xl shadow-primary/20 hover:scale-105 transition-transform">
                            Start Learning Now
                        </Button>
                    </Link>
                    <Link href="/become-tutor">
                        <Button size="lg" variant="outline" className="rounded-full px-10 py-7 text-lg hover:bg-primary/5">
                            Join as a Tutor
                        </Button>
                    </Link>
                </motion.div>

                {/* Manual Controls */}
                <div className="flex items-center justify-center gap-4 mt-8">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setCurrent((prev) => (prev - 1 + slides.length) % slides.length)}
                        className="rounded-full hover:bg-primary/10"
                    >
                        <ChevronLeft />
                    </Button>
                    <div className="flex gap-2">
                        {slides.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrent(i)}
                                className={`w-2.5 h-2.5 rounded-full transition-all ${current === i ? "bg-primary w-8" : "bg-primary/20"
                                    }`}
                            />
                        ))}
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setCurrent((prev) => (prev + 1) % slides.length)}
                        className="rounded-full hover:bg-primary/10"
                    >
                        <ChevronRight />
                    </Button>
                </div>
            </div>

            {/* Scroll Hint */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground"
            >
                <p className="text-[10px] uppercase tracking-[0.2em] font-bold">Discover More</p>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-5 h-8 border-2 border-muted-foreground/30 rounded-full flex justify-center pt-2"
                >
                    <div className="w-1 h-2 bg-primary rounded-full" />
                </motion.div>
            </motion.div>

            {/* Floating Elements */}
            <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/4 left-10 md:left-[10%] p-4 bg-background/80 backdrop-blur border rounded-2xl shadow-2xl hidden lg:block"
            >
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-500/10 rounded-xl flex items-center justify-center text-green-600">
                        <MousePointer2 className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                        <p className="text-xs font-bold">Interactive Learning</p>
                        <p className="text-[10px] text-muted-foreground">One-on-one sessions</p>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};
