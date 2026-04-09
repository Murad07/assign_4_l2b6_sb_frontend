export default function TermsPage() {
    return (
        <div className="container mx-auto px-4 py-16 max-w-4xl space-y-8">
            <h1 className="text-4xl font-bold">Terms of Service</h1>
            <p className="text-muted-foreground italic">Last updated: April 2026</p>

            <section className="space-y-4">
                <h2 className="text-2xl font-bold">1. Acceptance of Terms</h2>
                <p>By accessing and using SkillBridge, you agree to bound by these Terms of Service and all applicable laws and regulations.</p>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-bold">2. Tutor-Student Relationship</h2>
                <p>SkillBridge is a platform for connecting students and tutors. We do not employ tutors and are not responsible for the actual tutoring sessions.</p>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-bold">3. Payments and Fees</h2>
                <p>All payments are processed securely through our platform. Tutors set their own rates as outlined in their profile.</p>
            </section>
        </div>
    );
}
