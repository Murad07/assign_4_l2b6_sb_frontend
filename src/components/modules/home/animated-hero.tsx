"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AnimatedBackground } from "@/components/ui/animated-background";

export const AnimatedHero = () => {
    return (
        <section className="relative py-24 md:py-32 flex flex-col items-center text-center space-y-8 overflow-hidden">
            <AnimatedBackground />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-4"
            >
                <div className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-semibold tracking-wide uppercase">
                    Revolutionizing Learning
                </div>
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight max-w-4xl mx-auto leading-[1.1]">
                    Master New Skills with <br />
                    <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                        Expert Tutors
                    </span>
                </h1>
            </motion.div>

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            >
                Connect with world-class tutors for personalized one-on-one sessions.
                Whether it's Programming, Languages, or Music, we bridge the gap to your success.
            </motion.p>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
            >
                <Link href="/tutors">
                    <Button size="lg" className="rounded-full px-10 py-7 text-lg shadow-xl shadow-primary/20 hover:scale-105 transition-transform">
                        Find a Tutor
                    </Button>
                </Link>
                <Link href="/become-tutor">
                    <Button size="lg" variant="outline" className="rounded-full px-10 py-7 text-lg hover:bg-primary/5">
                        Become a Tutor
                    </Button>
                </Link>
            </motion.div>

            {/* Floating Elements for "Wow" factor */}
            <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/4 left-10 md:left-20 p-4 bg-background border rounded-2xl shadow-2xl hidden md:block"
            >
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold">A</div>
                    <div className="text-left">
                        <p className="text-xs font-bold">Active Sessions</p>
                        <p className="text-[10px] text-muted-foreground line-clamp-1">1,240 lessons ongoing</p>
                    </div>
                </div>
            </motion.div>

            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-1/4 right-10 md:right-20 p-4 bg-background border rounded-2xl shadow-2xl hidden md:block"
            >
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600 font-bold">★</div>
                    <div className="text-left">
                        <p className="text-xs font-bold">Top Rated</p>
                        <p className="text-[10px] text-muted-foreground">4.9 Average rating</p>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};
