import { ShieldCheck, Lock, Eye, FileText } from "lucide-react";

export default function PrivacyPage() {
    const sections = [
        {
            icon: <Eye className="w-5 h-5 text-primary" />,
            title: "1. Information We Collect",
            content: "We collect information you provide directly to us when you create an account, update your profile, book a session, or communicate with us. This include your name, email address, phone number, and any other information you choose to provide."
        },
        {
            icon: <Lock className="w-5 h-5 text-primary" />,
            title: "2. How We Use Information",
            content: "We use the information we collect to provide, maintain, and improve our services, including to facilitate connections between students and tutors, process payments, and send technical notices and support messages."
        },
        {
            icon: <ShieldCheck className="w-5 h-5 text-primary" />,
            title: "3. Data Security",
            content: "We implement a variety of security measures to maintain the safety of your personal information. Your personal information is contained behind secured networks and is only accessible by a limited number of persons who have special access rights."
        },
        {
            icon: <FileText className="w-5 h-5 text-primary" />,
            title: "4. Third-Party Disclosure",
            content: "We do not sell, trade, or otherwise transfer to outside parties your Personally Identifiable Information unless we provide users with advance notice. This does not include website hosting partners and other parties who assist us in operating our website."
        }
    ];

    return (
        <div className="container mx-auto px-4 py-16 max-w-4xl space-y-12">
            <div className="space-y-4 text-center">
                <h1 className="text-4xl md:text-5xl font-black tracking-tighter">
                    Privacy <span className="text-primary italic">Policy</span>
                </h1>
                <p className="text-muted-foreground font-medium italic">
                    Last updated: April 11, 2026
                </p>
                <div className="h-1 w-20 bg-primary mx-auto rounded-full" />
            </div>

            <div className="prose prose-sm max-w-none text-muted-foreground leading-relaxed">
                <p className="text-lg text-foreground font-medium">
                    At SkillBridge, we take your privacy seriously. This Policy explains how we collect, use, and protect your personal information when you use our platform.
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

            <div className="p-8 rounded-[2rem] bg-primary/5 border border-primary/10 space-y-4 text-center">
                <h3 className="text-xl font-bold">Have questions about your data?</h3>
                <p className="text-muted-foreground font-medium">
                    Our data protection team is here to help you understand your rights and how we handle your information.
                </p>
                <p className="text-primary font-black uppercase tracking-tighter hover:underline cursor-pointer">
                    privacy@skillbridge.com
                </p>
            </div>
        </div>
    );
}
