import { Card, CardContent } from "@/components/ui/card";
import { HelpCircle } from "lucide-react";

export default function HelpPage() {
    const faqs = [
        { q: "How do I book a tutor?", a: "Browse our tutor list, choose a tutor that fits your needs, and click the 'Book Session' button on their profile." },
        { q: "How are payments handled?", a: "We use a secure payment gateway. You pay for the session at the time of booking, and the funds are released to the tutor after the session is completed." },
        { q: "What if I need to cancel?", a: "You can cancel a session through your student dashboard up to 24 hours before the scheduled time for a full refund." }
    ];

    return (
        <div className="container mx-auto px-4 py-16 max-w-3xl space-y-12">
            <h1 className="text-4xl font-bold text-center">Help Center</h1>
            <p className="text-xl text-muted-foreground text-center">Frequently Asked Questions</p>

            <div className="space-y-6">
                {faqs.map((faq, i) => (
                    <Card key={i} className="border-none bg-secondary/30">
                        <CardContent className="pt-6 space-y-4">
                            <div className="flex items-start gap-4">
                                <HelpCircle className="w-6 h-6 text-primary shrink-0" />
                                <div className="space-y-2">
                                    <h3 className="text-lg font-semibold">{faq.q}</h3>
                                    <p className="text-muted-foreground leading-relaxed">{faq.a}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
