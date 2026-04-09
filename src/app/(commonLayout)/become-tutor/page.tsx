import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, DollarSign, Clock, Layout, ArrowRight } from "lucide-react";

export default function BecomeTutorPage() {
    return (
        <div className="container mx-auto px-4 py-16 space-y-24">
            {/* Hero Section */}
            <section className="text-center space-y-8 max-w-4xl mx-auto">
                <div className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-semibold tracking-wide uppercase">
                    Join Our Faculty
                </div>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                    Share Your Knowledge and <span className="text-primary text-gradient">Inspire Success</span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                    SkillBridge provides the tools you need to build a successful tutoring career, reach thousands of students, and manage your teaching schedule with ease.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link href="/register">
                        <Button size="lg" className="px-10 py-7 text-lg gap-2 shadow-xl shadow-primary/20">
                            Apply Now <ArrowRight className="w-5 h-5" />
                        </Button>
                    </Link>
                    <Link href="/about">
                        <Button variant="outline" size="lg" className="px-10 py-7 text-lg">
                            How it Works
                        </Button>
                    </Link>
                </div>
            </section>

            {/* Why Join Section */}
            <section className="space-y-12">
                <h2 className="text-3xl font-bold text-center">Why Teach on SkillBridge?</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                        {
                            icon: <DollarSign className="w-10 h-10 text-primary" />,
                            title: "Earn Extra Income",
                            desc: "Set your own hourly rates and get paid directly for every session you complete."
                        },
                        {
                            icon: <Clock className="w-10 h-10 text-primary" />,
                            title: "Flexible Schedule",
                            desc: "Decide when you want to teach. Our availability tools let you manage your own time."
                        },
                        {
                            icon: <Layout className="w-10 h-10 text-primary" />,
                            title: "Professional Tools",
                            desc: "Access a dedicated dashboard to track sessions, student reviews, and your earnings."
                        }
                    ].map((feature, i) => (
                        <Card key={i} className="group hover:shadow-2xl transition-all duration-300 border-none bg-secondary/30">
                            <CardContent className="pt-8 space-y-4">
                                <div className="p-4 bg-background rounded-2xl w-fit group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold">{feature.title}</h3>
                                <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Steps Section */}
            <section className="bg-primary/5 rounded-[3rem] p-12 md:p-20 space-y-12">
                <h2 className="text-3xl font-bold text-center">Three Simple Steps to Get Started</h2>
                <div className="grid md:grid-cols-3 gap-12">
                    {[
                        { step: "01", title: "Create Your Profile", desc: "Craft a compelling profile highlighting your expertise and experience." },
                        { step: "02", title: "Verify Your Skills", desc: "Our team will review your application to maintain high quality standards." },
                        { step: "03", title: "Start Teaching", desc: "Set your availability and start connecting with students worldwide." }
                    ].map((step, i) => (
                        <div key={i} className="relative space-y-4">
                            <div className="text-6xl font-black text-primary/10 absolute -top-10 -left-4">{step.step}</div>
                            <h3 className="text-xl font-bold relative z-10">{step.title}</h3>
                            <p className="text-muted-foreground relative z-10 leading-relaxed">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Testimonial Section */}
            <section className="text-center space-y-8 max-w-3xl mx-auto">
                <blockquote className="text-2xl font-serif italic text-foreground">
                    "Teaching on SkillBridge has allowed me to share my passion for computer science with students from all over the world. The platform is intuitive and handled all the administrative hurdles for me."
                </blockquote>
                <div className="flex items-center justify-center gap-4">
                    <div className="w-12 h-12 bg-muted rounded-full" />
                    <div className="text-left">
                        <p className="font-bold">Sarah Jenkins</p>
                        <p className="text-sm text-muted-foreground">Expert Mathematics Tutor</p>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="bg-primary text-primary-foreground rounded-[3rem] p-12 md:p-20 text-center space-y-6">
                <h2 className="text-4xl font-bold">Ready to make a difference?</h2>
                <p className="text-primary-foreground/80 text-lg max-w-xl mx-auto">
                    Join thousands of expert tutors and start your journey towards educational excellence today.
                </p>
                <Link href="/register">
                    <Button variant="secondary" size="lg" className="px-10 py-7 text-lg font-bold">
                        Apply Today
                    </Button>
                </Link>
            </section>
        </div>
    );
}
