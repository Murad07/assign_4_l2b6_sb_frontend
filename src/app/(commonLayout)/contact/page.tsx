import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function ContactPage() {
    return (
        <div className="container mx-auto px-4 py-16 space-y-16">
            <div className="text-center space-y-4 max-w-2xl mx-auto">
                <h1 className="text-4xl font-bold">Get in Touch</h1>
                <p className="text-muted-foreground">
                    Have questions or need support? Reach out to us and we'll get back to you as soon as possible.
                </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {/* Contact Cards */}
                <Card className="text-center py-8 border-none bg-secondary/30">
                    <CardContent className="space-y-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                            <Phone className="text-primary w-6 h-6" />
                        </div>
                        <h3 className="font-bold">Call Us</h3>
                        <p className="text-sm text-muted-foreground">+8801927574610</p>
                    </CardContent>
                </Card>

                <Card className="text-center py-8 border-none bg-secondary/30">
                    <CardContent className="space-y-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                            <Mail className="text-primary w-6 h-6" />
                        </div>
                        <h3 className="font-bold">Email Us</h3>
                        <p className="text-sm text-muted-foreground">murad.pi22@gmail.com</p>
                    </CardContent>
                </Card>

                <Card className="text-center py-8 border-none bg-secondary/30">
                    <CardContent className="space-y-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                            <MapPin className="text-primary w-6 h-6" />
                        </div>
                        <h3 className="font-bold">Our Office</h3>
                        <p className="text-sm text-muted-foreground">Dhaka, Bangladesh.</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto bg-card rounded-3xl border p-8 md:p-12">
                <div className="space-y-6">
                    <h2 className="text-3xl font-bold">Send us a Message</h2>
                    <p className="text-muted-foregroundLeading">
                        Fill out the form below and our team will get back to you within 24 hours.
                    </p>
                    <div className="space-y-4 pt-4">
                        <div className="p-4 bg-primary/5 rounded-2xl">
                            <h4 className="font-semibold text-primary">Support Hours</h4>
                            <p className="text-sm text-muted-foreground">Monday - Friday: 9am - 8pm</p>
                        </div>
                    </div>
                </div>

                <form className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Your Name</label>
                            <Input placeholder="John Doe" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Email Address</label>
                            <Input type="email" placeholder="john@example.com" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Subject</label>
                        <Input placeholder="How can we help?" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Message</label>
                        <Textarea placeholder="Type your message here..." className="min-h-[150px]" />
                    </div>
                    <Button className="w-full gap-2 py-6 text-lg">
                        <Send className="w-5 h-5" />
                        Send Message
                    </Button>
                </form>
            </div>
        </div>
    );
}
