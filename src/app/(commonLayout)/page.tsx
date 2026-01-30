import { Button } from "@/components/ui/button";
import Link from "next/link";
import { TutorService } from "@/services/tutor.service";
import { CategoryService } from "@/services/category.service";
import { TutorCard } from "@/components/modules/tutor/tutor-card";
import { Tutor, Category } from "@/types";

export default async function Home() {
  let featuredTutors: Tutor[] = [];
  let categories: Category[] = [];

  try {
    const res = await TutorService.getFeaturedTutors();
    featuredTutors = res.data || [];
  } catch (error) {
    console.error("Failed to fetch featured tutors", error);
  }

  try {
    const res = await CategoryService.getAllCategories();
    categories = res.data || [];
  } catch (error) {
    console.error("Failed to fetch categories", error);
  }

  return (
    <div className="flex flex-col gap-16 pb-10">
      {/* 1. Hero Section */}
      <section className="py-20 text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          Master New Skills with <span className="text-primary">Expert Tutors</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Connect with simplified expert tutors for personalized one-on-one learning sessions.
          Programming, Languages, Music, and more.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/tutors">
            <Button size="lg" className="rounded-full px-8"> Find a Tutor </Button>
          </Link>
          <Button size="lg" variant="outline" className="rounded-full px-8"> Become a Tutor </Button>
        </div>
      </section>

      {/* 2. Categories Section */}
      <section>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Explore Categories</h2>
          <Link href="/tutors" className="text-primary hover:underline">View All</Link>
        </div>
        {categories.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/tutors?category=${category.id}`}
                className="p-6 border rounded-xl hover:shadow-md transition-shadow cursor-pointer bg-card text-center space-y-2"
              >
                <div className="text-4xl">{category.icon}</div>
                <span className="font-semibold text-lg block">{category.name}</span>
                {category.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2">{category.description}</p>
                )}
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            No categories available at the moment.
          </div>
        )}
      </section>

      {/* 3. Featured Tutors Section */}
      <section>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Featured Tutors</h2>
          <Link href="/tutors" className="text-primary hover:underline">View All</Link>
        </div>
        {featuredTutors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredTutors.map((tutor) => (
              <TutorCard key={tutor.id} tutor={tutor} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            No featured tutors available at the moment.
          </div>
        )}
      </section>

      {/* 4. Testimonials/Trust Section */}
      <section className="bg-muted/50 rounded-2xl p-10">
        <h2 className="text-3xl font-bold text-center mb-10">Trusted by Students</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-background p-6 rounded-xl shadow-sm">
            <p className="italic text-muted-foreground mb-4">"SkillBridge helped me ace my final exams. The tutors are incredibly knowledgeable and patient."</p>
            <p className="font-semibold">- Alex M.</p>
          </div>
          <div className="bg-background p-6 rounded-xl shadow-sm">
            <p className="italic text-muted-foreground mb-4">"I learned React in just 2 weeks! The booking process is so smooth."</p>
            <p className="font-semibold">- Sarah K.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
