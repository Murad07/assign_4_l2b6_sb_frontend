import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Calendar, User, ArrowRight } from "lucide-react";

export const dynamic = "force-dynamic";

const blogPosts = [
    {
        id: 1,
        title: "Mastering Mathematics: A Guide for High Schoolers",
        excerpt: "Success in calculus isn't about memorizing formulas; it's about understanding the underlying logic. Here's how to master it.",
        author: "Dr. Sarah Chen",
        date: "Apr 10, 2026",
        category: "Mathematics",
        image: "https://images.unsplash.com/photo-1509228468518-180dd48222d1?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: 2,
        title: "Top 5 Programming Languages to Learn in 2026",
        excerpt: "From AI-first languages to the rise of WebAssembly, stay ahead of the curve by learning these future-proof programming languages.",
        author: "John Matrix",
        date: "Apr 08, 2026",
        category: "Programming",
        image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: 3,
        title: "The Science of Learning: How to Retain Information Faster",
        excerpt: "Cognitive science has revealed specific techniques like spaced repetition that can triple your learning speed.",
        author: "Prof. Alan Smith",
        date: "Apr 05, 2026",
        category: "Study Tips",
        image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=800&auto=format&fit=crop"
    }
];

export default function BlogPage() {
    return (
        <div className="container mx-auto px-4 py-16 space-y-12">
            <div className="text-center space-y-4 max-w-2xl mx-auto">
                <Badge className="bg-primary/10 text-primary border-none font-black uppercase tracking-tighter px-4 py-1.5 rounded-full ring-1 ring-primary/20">
                    Industry Insights
                </Badge>
                <h1 className="text-4xl md:text-5xl font-black tracking-tighter">
                    SkillBridge <span className="text-primary italic">Journal</span>
                </h1>
                <p className="text-muted-foreground text-lg font-medium leading-relaxed">
                    Expert perspectives on education, technology, and the future of mentorship.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogPosts.map((post) => (
                    <Card key={post.id} className="group overflow-hidden border-primary/5 hover:border-primary/20 transition-all duration-500 rounded-3xl bg-background/50 backdrop-blur-sm">
                        <div className="relative h-56 overflow-hidden">
                            <img
                                src={post.image}
                                alt={post.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <Badge className="absolute top-4 left-4 bg-primary text-white border-none font-bold uppercase text-[10px]">
                                {post.category}
                            </Badge>
                        </div>
                        <CardContent className="p-8 space-y-4">
                            <div className="flex items-center gap-4 text-xs font-bold text-muted-foreground uppercase tracking-widest">
                                <div className="flex items-center gap-1.5">
                                    <Calendar className="w-3.5 h-3.5 text-primary" />
                                    {post.date}
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <User className="w-3.5 h-3.5 text-primary" />
                                    {post.author}
                                </div>
                            </div>
                            <h2 className="text-xl font-black leading-tight group-hover:text-primary transition-colors">
                                {post.title}
                            </h2>
                            <p className="text-muted-foreground text-sm line-clamp-3 font-medium leading-relaxed">
                                {post.excerpt}
                            </p>
                            <Link
                                href="#"
                                className="inline-flex items-center gap-2 text-primary text-sm font-black uppercase tracking-tighter hover:gap-3 transition-all pt-4"
                            >
                                Read Article
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="bg-primary/5 rounded-[3rem] p-12 text-center space-y-6">
                <h2 className="text-2xl font-black tracking-tighter">Stay updated with the latest in education</h2>
                <p className="text-muted-foreground max-w-lg mx-auto font-medium">
                    Subscribe to our newsletter to receive expert learning tips and community updates directly in your inbox.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
                    <input
                        type="email"
                        placeholder="your@email.com"
                        className="w-full px-6 py-3 rounded-2xl bg-background border focus:ring-2 focus:ring-primary outline-none font-medium"
                    />
                    <button className="whitespace-nowrap px-8 py-3 bg-primary text-white rounded-2xl font-bold hover:shadow-lg transition-all active:scale-95">
                        Subscribe
                    </button>
                </div>
            </div>
        </div>
    );
}
