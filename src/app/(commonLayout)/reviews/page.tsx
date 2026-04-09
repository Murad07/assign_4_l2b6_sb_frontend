import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote, Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ReviewsPage() {
    const reviews = [
        {
            name: "Alex Thompson",
            role: "Computer Science Student",
            rating: 5,
            comment: "My tutor helped me understand complex data structures in just a few sessions. The learning environment is incredible!",
            image: "https://i.pravatar.cc/150?u=alex"
        },
        {
            name: "Emily Chen",
            role: "Language Learner",
            rating: 5,
            comment: "Learning Mandarin was intimidating until I found my tutor here. The personalized approach made all the difference.",
            image: "https://i.pravatar.cc/150?u=emily"
        },
        {
            name: "David Miller",
            role: "High School Student",
            rating: 4,
            comment: "Excellent platform for finding quality mathematics tutors. My grades have improved significantly since I started.",
            image: "https://i.pravatar.cc/150?u=david"
        },
        {
            name: "Sofia Rodriguez",
            role: "Graphic Design Student",
            rating: 5,
            comment: "The feedback sessions are very constructive. I've learned more here than in months of self-study.",
            image: "https://i.pravatar.cc/150?u=sofia"
        },
        {
            name: "James Wilson",
            role: "Physics Enthusiast",
            rating: 5,
            comment: "The booking process is seamless and the tutors are top-tier experts in their fields.",
            image: "https://i.pravatar.cc/150?u=james"
        },
        {
            name: "Maria Garcia",
            role: "Business Major",
            rating: 4,
            comment: "Great experience overall. Highly recommend for anyone looking to supplement their university learning.",
            image: "https://i.pravatar.cc/150?u=maria"
        }
    ];

    return (
        <div className="container mx-auto px-4 py-16 space-y-24">
            <div className="text-center space-y-4 max-w-2xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Student <span className="text-primary">Success Stories</span></h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                    Hear from thousands of students who have accelerated their learning journey with SkillBridge.
                </p>
            </div>

            {/* Testimonials Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {reviews.map((review, i) => (
                    <Card key={i} className="group hover:scale-[1.02] transition-all duration-300 border-none bg-secondary/30 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                            <Quote className="w-16 h-16" />
                        </div>
                        <CardContent className="pt-10 space-y-6">
                            <div className="flex gap-1 text-yellow-500">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className={`w-4 h-4 ${i < review.rating ? "fill-current" : "text-muted"}`} />
                                ))}
                            </div>
                            <p className="text-lg leading-relaxed relative z-10 italic">"{review.comment}"</p>
                            <div className="flex items-center gap-4 pt-4 border-t border-primary/5">
                                <Avatar className="h-12 w-12 ring-2 ring-primary/10">
                                    <AvatarImage src={review.image} />
                                    <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-bold">{review.name}</p>
                                    <p className="text-xs text-muted-foreground">{review.role}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Platform Stats */}
            <div className="bg-primary text-primary-foreground rounded-[3rem] p-12 md:p-16 flex flex-col md:flex-row justify-around items-center gap-12 text-center">
                <div className="space-y-2">
                    <p className="text-4xl font-black">4.9/5</p>
                    <p className="text-sm font-medium uppercase tracking-widest text-primary-foreground/70">Average Rating</p>
                </div>
                <div className="h-px w-24 md:h-12 md:w-px bg-primary-foreground/20" />
                <div className="space-y-2">
                    <p className="text-4xl font-black">98%</p>
                    <p className="text-sm font-medium uppercase tracking-widest text-primary-foreground/70">Student Satisfaction</p>
                </div>
                <div className="h-px w-24 md:h-12 md:w-px bg-primary-foreground/20" />
                <div className="space-y-2">
                    <p className="text-4xl font-black">15,000+</p>
                    <p className="text-sm font-medium uppercase tracking-widest text-primary-foreground/70">Positive Reviews</p>
                </div>
            </div>
        </div>
    );
}
