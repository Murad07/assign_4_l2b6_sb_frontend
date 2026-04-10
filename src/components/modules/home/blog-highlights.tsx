import { AnimatedSection } from "@/components/ui/animated-section";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, User } from "lucide-react";
import Link from "next/link";

const blogs = [
    {
        title: "How to Choose the Right Tutor for Your Learning Style",
        date: "April 5, 2026",
        author: "Sarah Jenkins",
        category: "Learning Tips"
    },
    {
        title: "Top 10 Programming Languages to Learn in 2026",
        date: "March 28, 2026",
        author: "David Chen",
        category: "Career"
    },
    {
        title: "The Benefits of One-on-One Mentorship",
        date: "March 15, 2026",
        author: "Dr. Emily Smith",
        category: "Education"
    }
];

export const BlogHighlights = () => {
    return (
        <AnimatedSection className="container mx-auto px-4 py-20">
            <div className="flex justify-between items-end mb-12">
                <div className="space-y-4">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Learning Hub</h2>
                    <p className="text-muted-foreground">Expert advice and insights to help you grow.</p>
                </div>
                <Link href="/about" className="text-primary font-bold hover:underline">Read All Articles →</Link>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {blogs.map((blog, i) => (
                    <Card key={i} className="group overflow-hidden border-none bg-secondary/20 hover:bg-secondary/40 transition-colors cursor-pointer">
                        <CardContent className="p-0">
                            <div className="h-48 bg-primary/10 group-hover:bg-primary/20 transition-colors relative">
                                <span className="absolute top-4 left-4 bg-background px-3 py-1 rounded-full text-xs font-bold text-primary italic uppercase tracking-widest">
                                    {blog.category}
                                </span>
                            </div>
                            <div className="p-8 space-y-4">
                                <div className="flex gap-4 text-xs text-muted-foreground">
                                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {blog.date}</span>
                                    <span className="flex items-center gap-1"><User className="w-3 h-3" /> {blog.author}</span>
                                </div>
                                <h3 className="text-xl font-bold group-hover:text-primary transition-colors leading-tight">
                                    {blog.title}
                                </h3>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </AnimatedSection>
    );
};
