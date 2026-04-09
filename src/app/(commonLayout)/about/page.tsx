import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Users, ShieldCheck, Globe } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="container mx-auto px-4 py-16 space-y-24">
            {/* Hero Section */}
            <section className="text-center space-y-6 max-w-3xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                    Empowering Learners Through <span className="text-primary">Expert Mentorship</span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                    SkillBridge is more than just a platform; it's a global community where curiosity meets expertise. We believe that everyone has something to teach and everyone has something to learn.
                </p>
            </section>

            {/* Stats Section */}
            <section className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                    { label: "Active Tutors", value: "500+" },
                    { label: "Students", value: "10k+" },
                    { label: "Lessons Taught", value: "50k+" },
                    { label: "Subjects", value: "100+" },
                ].map((stat, i) => (
                    <div key={i} className="text-center space-y-2">
                        <p className="text-3xl font-bold text-primary">{stat.value}</p>
                        <p className="text-sm text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                    </div>
                ))}
            </section>

            {/* Mission Section */}
            <section className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                    <h2 className="text-3xl font-bold">Our Mission</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        Our mission is to democratize education by providing a seamless, secure, and accessible platform for one-on-one learning. We strive to break down geographical and financial barriers, allowing students to connect with their ideal tutors regardless of location.
                    </p>
                    <ul className="space-y-4">
                        {[
                            { icon: <ShieldCheck className="text-primary" />, text: "Strict tutor verification process" },
                            { icon: <Globe className="text-primary" />, text: "Accessibility from anywhere in the world" },
                            { icon: <Users className="text-primary" />, text: "Community-driven learning environment" },
                        ].map((item, i) => (
                            <li key={i} className="flex items-center gap-3">
                                {item.icon}
                                <span className="font-medium">{item.text}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="bg-primary/5 rounded-3xl p-8 aspect-square flex items-center justify-center">
                    <GraduationCap className="w-1/2 h-1/2 text-primary/20" />
                </div>
            </section>

            {/* Values Section */}
            <section className="space-y-12">
                <h2 className="text-3xl font-bold text-center">Our Core Values</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        { title: "Quality", desc: "We prioritize excellence in teaching and student satisfaction." },
                        { title: "Trust", desc: "Building a secure and reliable platform for our community." },
                        { title: "Innovation", desc: "Constantly improving our technology to enhance learning." },
                    ].map((value, i) => (
                        <Card key={i} className="border-none bg-secondary/50">
                            <CardContent className="pt-6 text-center space-y-4">
                                <h3 className="text-xl font-bold">{value.title}</h3>
                                <p className="text-muted-foreground">{value.desc}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>
        </div>
    );
}
