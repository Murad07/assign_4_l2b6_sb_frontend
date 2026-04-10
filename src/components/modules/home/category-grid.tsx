"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Category } from "@/types";

export const CategoryGrid = ({ categories }: { categories: Category[] }) => {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
            {categories.map((category) => (
                <motion.div key={category.id} variants={item}>
                    <Link
                        href={`/tutors?categoryId=${category.id}`}
                        className="group p-8 border rounded-2xl hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/5 transition-all cursor-pointer bg-card text-center space-y-4 relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="text-5xl group-hover:scale-110 transition-transform duration-300 relative z-10">{category.icon}</div>
                        <div className="relative z-10">
                            <span className="font-bold text-lg block group-hover:text-primary transition-colors">{category.name}</span>
                            {category.description && (
                                <p className="text-xs text-muted-foreground line-clamp-2 mt-2 group-hover:text-primary/70 transition-colors">{category.description}</p>
                            )}
                        </div>
                    </Link>
                </motion.div>
            ))}
        </motion.div>
    );
};
