import Link from "next/link";
import { TutorService } from "@/services/tutor.service";
import { CategoryService } from "@/services/category.service";
import { TutorCard } from "@/components/modules/tutor/tutor-card";
import { Tutor, Category } from "@/types";
import { AnimatedHero } from "@/components/modules/home/animated-hero";
import { CategoryGrid } from "@/components/modules/home/category-grid";
import { AnimatedSection } from "@/components/ui/animated-section";
import { HowItWorks } from "@/components/modules/home/how-it-works";
import { Statistics } from "@/components/modules/home/statistics";
import { HomeFAQ } from "@/components/modules/home/home-faq"; // TS Server cache bust
import { Newsletter } from "@/components/modules/home/newsletter";
import { BlogHighlights } from "@/components/modules/home/blog-highlights";

export default async function Home() {
  let featuredTutors: Tutor[] = [];
  let categories: Category[] = [];

  try {
    const [tutorRes, categoryRes] = await Promise.all([
      TutorService.getFeaturedTutors(),
      CategoryService.getAllCategories()
    ]);
    featuredTutors = tutorRes.data || [];
    categories = categoryRes.data || [];
  } catch (error) {
    console.error("Failed to fetch initial data", error);
  }

  return (
    <div className="flex flex-col gap-10">
      {/* 1. Navbar (Implicit via layout) */}

      {/* 2. Animated Hero Section (75vh, Interactive, Slides, Hint) */}
      <AnimatedHero />

      {/* 3. Categories Section */}
      <AnimatedSection className="container mx-auto px-4 py-10">
        <div className="flex justify-between items-end mb-10">
          <div className="space-y-2">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Explore Categories</h2>
            <p className="text-muted-foreground">Find the perfect tutor based on your interest.</p>
          </div>
          <Link href="/tutors" className="text-primary font-semibold hover:underline flex items-center gap-1">
            Browse All Categories
          </Link>
        </div>
        {categories.length > 0 ? (
          <CategoryGrid categories={categories} />
        ) : (
          <div className="text-center py-20 bg-secondary/20 rounded-[2rem] text-muted-foreground border-2 border-dashed">
            No categories available at the moment.
          </div>
        )}
      </AnimatedSection>

      {/* 4. How It Works Section */}
      <HowItWorks />

      {/* 5. Statistics Section (Visual Impact) */}
      <Statistics />

      {/* 6. Featured Tutors Section */}
      <AnimatedSection className="container mx-auto px-4 py-10">
        <div className="flex justify-between items-end mb-10">
          <div className="space-y-2">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Featured Tutors</h2>
            <p className="text-muted-foreground leading-relaxed">Learn from the highest-rated experts on our platform.</p>
          </div>
          <Link href="/tutors" className="text-primary font-bold hover:underline">View All Tutors</Link>
        </div>

        {featuredTutors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredTutors.map((tutor) => (
              <TutorCard key={tutor.id} tutor={tutor} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-secondary/20 rounded-[2rem] text-muted-foreground border-2 border-dashed">
            No featured tutors available at the moment.
          </div>
        )}
      </AnimatedSection>

      {/* 7. Testimonials/Trust Section */}
      <AnimatedSection className="container mx-auto px-4 py-20">
        <div className="bg-primary text-primary-foreground rounded-[3rem] p-12 md:p-24 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 blur-3xl -translate-y-1/2 translate-x-1/2 rounded-full" />
          <div className="relative z-10 grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">Join Thousands of <br />Happy Students</h2>
              <p className="text-primary-foreground/80 text-lg leading-relaxed">
                SkillBridge is more than just a tutoring site. It's a platform designed to foster growth,
                confidence, and real-world skills through direct mentorship.
              </p>
              <Link href="/register" className="inline-block">
                <button className="bg-white text-primary px-10 py-5 rounded-full font-bold hover:bg-gray-100 transition-all hover:scale-105">
                  Start Your Journey
                </button>
              </Link>
            </div>
            <div className="grid gap-6">
              {[
                { name: "Alex M.", text: "SkillBridge helped me ace my final exams. The tutors are incredibly knowledgeable." },
                { name: "Sarah K.", text: "I learned React in just 2 weeks! The booking process is so smooth and transparent." }
              ].map((testimonial, i) => (
                <div key={i} className="bg-white/10 backdrop-blur-md p-8 rounded-[2rem] border border-white/10 hover:bg-white/20 transition-colors">
                  <p className="italic text-lg mb-4 leading-relaxed">"{testimonial.text}"</p>
                  <p className="font-bold text-white tracking-widest">— {testimonial.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* 8. Blogs Highlights */}
      <BlogHighlights />

      {/* 9. FAQ Section */}
      <HomeFAQ />

      {/* 10. Newsletter Section */}
      <Newsletter />

      {/* 11. Footer Section (Implicit via layout) */}
    </div>
  );
}
