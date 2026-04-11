import { Gavel, Users, CreditCard, ShieldAlert, Scale } from "lucide-react";

export default function TermsPage() {
    const sections = [
        {
            icon: <Scale className="w-5 h-5 text-primary" />,
            title: "1. Acceptance of Terms",
            content: "By accessing and using SkillBridge, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site."
        },
        {
            icon: <Users className="w-5 h-5 text-primary" />,
            title: "2. Tutor-Student Relationship",
            content: "SkillBridge is a platform for connecting students and tutors. We do not employ tutors and are not responsible for the actual tutoring sessions. Tutors are independent contractors who provide services directly to students."
        },
        {
            icon: <CreditCard className="w-5 h-5 text-primary" />,
            title: "3. Payments and Fees",
            content: "All payments are processed securely through our platform. Tutors set their own rates as outlined in their profile. SkillBridge may charge a service fee for facilitating connections and secure payments."
        },
        {
            icon: <ShieldAlert className="w-5 h-5 text-primary" />,
            title: "4. User Conduct",
            content: "Users agree to maintain professional conduct at all times. Harassment, abuse, or any illegal activity will result in immediate termination of account access and may be reported to relevant authorities."
        },
        {
            icon: <Gavel className="w-5 h-5 text-primary" />,
            title: "5. Intellectual Property",
            content: "The content on SkillBridge, including text, graphics, logos, and software, is the property of SkillBridge and protected by international copyright laws. Any unauthorized use is strictly prohibited."
        }
    ];

    return (
        <div className="container mx-auto px-4 py-16 max-w-4xl space-y-12">
            <div className="space-y-4 text-center">
                <h1 className="text-4xl md:text-5xl font-black tracking-tighter">
                    Terms of <span className="text-primary italic">Service</span>
                </h1>
                <p className="text-muted-foreground font-medium italic">
                    Last updated: April 11, 2026
                </p>
                <div className="h-1 w-20 bg-primary mx-auto rounded-full" />
            </div>

            <div className="prose prose-sm max-w-none text-muted-foreground leading-relaxed">
                <p className="text-lg text-foreground font-medium">
                    Welcome to SkillBridge. These terms govern your use of our platform and services. Please read them carefully before proceeding.
                </p>
            </div>

            <div className="grid gap-8">
                {sections.map((section, i) => (
                    <div key={i} className="p-8 rounded-3xl border border-primary/5 bg-background/50 backdrop-blur-sm space-y-4 hover:border-primary/20 transition-all group">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-primary/10 rounded-xl group-hover:bg-primary group-hover:text-white transition-colors">
                                {section.icon}
                            </div>
                            <h2 className="text-xl font-bold text-foreground">{section.title}</h2>
                        </div>
                        <p className="text-muted-foreground leading-relaxed font-medium">
                            {section.content}
                        </p>
                    </div>
                ))}
            </div>

            <div className="p-8 rounded-[2rem] bg-secondary/30 border border-primary/5 space-y-4 text-center">
                <h3 className="text-xl font-bold">Need legal clarification?</h3>
                <p className="text-muted-foreground font-medium">
                    Our legal team is available to answer any questions you may have regarding our terms and user agreements.
                </p>
                <p className="text-primary font-black uppercase tracking-tighter hover:underline cursor-pointer">
                    legal@skillbridge.com
                </p>
            </div>
        </div>
    );
}
