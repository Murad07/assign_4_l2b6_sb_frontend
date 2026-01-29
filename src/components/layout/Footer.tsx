export default function Footer() {
    return (
        <footer className="bg-muted py-8 mt-auto">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="font-bold text-lg mb-4">SkillBridge</h3>
                        <p className="text-sm text-muted-foreground">
                            Connecting learners with expert tutors worldwide.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Learn</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>Find Tutors</li>
                            <li>By Category</li>
                            <li>Online Sessions</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Support</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>Help Center</li>
                            <li>For Tutors</li>
                            <li>Contact Us</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Legal</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>Privacy Policy</li>
                            <li>Terms of Service</li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
                    © {new Date().getFullYear()} SkillBridge. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
