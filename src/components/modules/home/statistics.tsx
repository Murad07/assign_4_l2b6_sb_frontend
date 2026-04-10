import { AnimatedSection } from "@/components/ui/animated-section";

const stats = [
    { value: "500+", label: "Expert Tutors" },
    { value: "10,000+", label: "Happy Students" },
    { value: "50,000+", label: "Sessions Completed" },
    { value: "100+", label: "Subjects Covered" }
];

export const Statistics = () => {
    return (
        <section className="bg-secondary/30 py-20 overflow-hidden">
            <AnimatedSection className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                    {stats.map((stat, i) => (
                        <div key={i} className="text-center space-y-2">
                            <p className="text-4xl md:text-5xl font-black text-primary tracking-tighter italic">
                                {stat.value}
                            </p>
                            <p className="text-xs md:text-sm font-bold uppercase tracking-widest text-muted-foreground">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </AnimatedSection>
        </section>
    );
};
