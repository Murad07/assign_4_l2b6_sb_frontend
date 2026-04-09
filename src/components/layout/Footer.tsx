import Link from "next/link";
import { Github, Linkedin, Facebook, Twitter, Mail, Phone, MapPin, GraduationCap } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-secondary/30 pt-16 pb-8 border-t mt-auto">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-primary">
                            <GraduationCap className="w-8 h-8" />
                            SkillBridge
                        </Link>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Connecting learners with expert tutors worldwide. Our platform makes it easy to find, book, and learn from the best in every field.
                        </p>
                        <div className="flex items-center gap-4 pt-2">
                            <a href="https://github.com/Murad07" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                                <Github className="w-5 h-5" />
                                <span className="sr-only">GitHub</span>
                            </a>
                            <a href="https://www.linkedin.com/in/murad-pi22/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                                <Linkedin className="w-5 h-5" />
                                <span className="sr-only">LinkedIn</span>
                            </a>
                            <a href="https://www.facebook.com/murad.hossain.9615" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                                <Facebook className="w-5 h-5" />
                                <span className="sr-only">Facebook</span>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-bold text-foreground mb-6">Quick Links</h4>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <Link href="/tutors" className="text-muted-foreground hover:text-primary transition-all hover:translate-x-1 inline-block">Find Tutors</Link>
                            </li>
                            <li>
                                <Link href="/become-tutor" className="text-muted-foreground hover:text-primary transition-all hover:translate-x-1 inline-block">Become a Tutor</Link>
                            </li>
                            <li>
                                <Link href="/about" className="text-muted-foreground hover:text-primary transition-all hover:translate-x-1 inline-block">About Us</Link>
                            </li>
                            <li>
                                <Link href="/reviews" className="text-muted-foreground hover:text-primary transition-all hover:translate-x-1 inline-block">Recent Reviews</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="font-bold text-foreground mb-6">Support</h4>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <Link href="/help" className="text-muted-foreground hover:text-primary transition-all hover:translate-x-1 inline-block">Help Center</Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-all hover:translate-x-1 inline-block">Contact Support</Link>
                            </li>
                            <li>
                                <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-all hover:translate-x-1 inline-block">Privacy Policy</Link>
                            </li>
                            <li>
                                <Link href="/terms" className="text-muted-foreground hover:text-primary transition-all hover:translate-x-1 inline-block">Terms of Service</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-4">
                        <h4 className="font-bold text-foreground mb-6">Contact Us</h4>
                        <div className="space-y-4 text-sm text-muted-foreground">
                            <div className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-primary shrink-0" />
                                <span>Dhaka, Bangladesh.</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-primary shrink-0" />
                                <a href="tel:+8801927574610" className="hover:text-primary transition-colors">+8801927574610</a>
                            </div>
                            <div className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-primary shrink-0" />
                                <a href="mailto:murad.pi22@gmail.com" className="hover:text-primary transition-colors">murad.pi22@gmail.com</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-16 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
                    <p>© {new Date().getFullYear()} SkillBridge. All rights reserved.</p>
                    <p>Designed and Developed by <span className="text-primary font-medium">Murad</span></p>
                </div>
            </div>
        </footer>
    );
}
