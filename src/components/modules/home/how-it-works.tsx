import { AnimatedSection } from "@/components/ui/animated-section";
import { Search, Calendar, Video, Star } from "lucide-react";

const steps = [
    {
        icon: <Search className="w-6 h-6" />,
        title: "Find Your Tutor",
        desc: "Browse our curated list of expert tutors by subject, rating, or price."
    },
    {
        icon: <Calendar className="w-6 h-6" />,
        title: "Schedule a Session",
        desc: "Choose a time that works for you and book instantly via our platform."
    },
    {
        icon: <Video className="w-6 h-6" />,
        title: "Start Learning",
        desc: "Join high-quality video sessions with interactive tools and messaging."
    },
    {
        icon: <Star className="w-6 h-6" />,
        title: "Rate & Review",
        desc: "Share your experience to help the community and track your progress."
    }
];

export const HowItWorks = () => {
    return (
        <AnimatedSection className="container mx-auto px-4 py-20">
            <div className="text-center space-y-4 mb-16">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight">How SkillBridge Works</h2>
                <p className="text-muted-foreground max-w-xl mx-auto">
                    A simple 4-step process to connect with your ideal tutor and accelerate your learning.
                </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8 relative">
                {/* Connecting Line (Desktop) */}
                <div className="hidden md:block absolute top-[2.5rem] left-[10%] right-[10%] h-0.5 bg-dashed bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

                {steps.map((step, i) => (
                    <div key={i} className="text-center space-y-6 relative z-10">
                        <div className="w-20 h-20 bg-primary/10 rounded-[2rem] flex items-center justify-center mx-auto text-primary shadow-xl shadow-primary/5 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                            {step.icon}
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-xl font-bold">{step.title}</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </AnimatedSection>
    );
};
