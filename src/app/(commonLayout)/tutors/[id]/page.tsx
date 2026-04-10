import { TutorService } from "@/services/tutor.service";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Clock, Share2, Heart, ShieldCheck, PlayCircle } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Tutor } from "@/types";
import BookingModal from "@/components/modules/booking/booking-modal";
import { TutorCard } from "@/components/modules/tutor/tutor-card";

interface TutorDetailsPageProps {
    params: Promise<{ id: string }>;
}

export default async function TutorDetailsPage({ params }: TutorDetailsPageProps) {
    const { id } = await params;
    let tutor: Tutor | null = null;
    let relatedTutors: Tutor[] = [];

    try {
        tutor = await TutorService.getTutorById(id);
        const relatedRes = await TutorService.getFeaturedTutors();
        // Filter out current tutor from related
        relatedTutors = relatedRes.data?.filter(t => t.id !== id).slice(0, 3) || [];
    } catch (error) {
        console.error("Failed to fetch tutor details", error);
        return notFound();
    }

    if (!tutor) {
        return notFound();
    }

    const userName = tutor.user?.name || "Unknown";

    return (
        <div className="bg-background min-h-screen pb-20">
            {/* Cover Image / Media Section */}
            <div className="h-64 md:h-80 w-full bg-gradient-to-r from-primary/80 to-primary/40 relative overflow-hidden group">
                {/* Simulated background pattern */}
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
                <div className="absolute right-10 bottom-10 bg-black/40 backdrop-blur-md text-white px-4 py-2 rounded-full hidden md:flex items-center gap-2 text-sm font-semibold cursor-pointer hover:bg-black/60 transition-colors">
                    <PlayCircle className="w-4 h-4" /> Watch Intro Video
                </div>
            </div>

            <div className="container mx-auto max-w-6xl px-4 md:px-8 -mt-24 relative z-10 space-y-12">
                {/* Header / Profile Info */}
                <div className="flex flex-col md:flex-row gap-8 bg-card border shadow-xl rounded-2xl p-6 md:p-10">
                    <div className="flex-shrink-0 -mt-16 md:-mt-24 flex flex-col items-center gap-4">
                        <Avatar className="h-40 w-40 border-8 border-card shadow-2xl">
                            <AvatarImage src={tutor.user?.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`} />
                            <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100 border-none px-3 py-1 flex items-center gap-1.5">
                            <ShieldCheck className="w-4 h-4" /> Identity Verified
                        </Badge>
                    </div>

                    <div className="flex-1 space-y-6">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                            <div>
                                <h1 className="text-4xl font-black">{userName}</h1>
                                <p className="text-xl text-muted-foreground mt-2 italic">"{tutor.bio}"</p>
                            </div>
                            {/* Action Functionality (Share / Save) */}
                            <div className="flex gap-2 shrink-0">
                                <Button variant="outline" size="icon" className="rounded-full shadow-sm">
                                    <Share2 className="w-4 h-4" />
                                </Button>
                                <Button variant="outline" size="icon" className="rounded-full shadow-sm text-rose-500 hover:text-rose-600 hover:bg-rose-50">
                                    <Heart className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1.5">
                                <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                                <span className="font-bold text-lg text-foreground">{tutor.rating ? Number(tutor.rating).toFixed(1) : "4.8"}</span>
                                <span>({tutor.totalReviews || 12} reviews)</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <MapPin className="w-4 h-4" /> Remote Only
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {tutor.expertise?.map((skill) => (
                                <Badge key={skill} variant="secondary" className="px-3 py-1 text-sm bg-primary/10 text-primary border-none">{skill}</Badge>
                            ))}
                        </div>

                        {tutor.categories && tutor.categories.length > 0 && (
                            <div className="flex flex-wrap gap-2 pt-2 border-t">
                                {tutor.categories.map((category) => (
                                    <Badge key={category.id} variant="outline" className="px-3 py-1.5 text-sm font-semibold rounded-lg">
                                        {category.icon} {category.name}
                                    </Badge>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="md:w-80 bg-zinc-50 dark:bg-zinc-900 border rounded-2xl p-6 shadow-inner h-fit space-y-6">
                        <div className="flex justify-between items-end border-b border-border/50 pb-4">
                            <span className="text-muted-foreground font-semibold">Session Rate</span>
                            <span className="text-4xl font-black text-primary">${tutor.hourlyRate}<span className="text-sm text-muted-foreground font-normal">/hr</span></span>
                        </div>
                        <div className="space-y-4">
                            <div className="flex flex-col gap-2 text-sm text-muted-foreground bg-background border p-3 rounded-xl shadow-sm">
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-blue-500" />
                                    <span>Usually responds within 1 hour</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <ShieldCheck className="w-4 h-4 text-green-500" />
                                    <span>Money-back guarantee</span>
                                </div>
                            </div>

                            {/* Primary Action Button */}
                            <BookingModal
                                tutorId={tutor.id}
                                hourlyRate={tutor.hourlyRate}
                                availability={tutor.availability || []}
                            />
                            <p className="text-xs text-center text-muted-foreground">You won't be charged yet.</p>
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-12">
                    <div className="md:col-span-2 space-y-12">
                        {/* Key Information / Specs */}
                        <div className="space-y-6 bg-card border rounded-2xl p-8 shadow-sm">
                            <h2 className="text-2xl font-black border-b pb-4">Tutor Overview & Specs</h2>
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <h3 className="font-bold text-lg text-primary flex items-center gap-2">Education Background</h3>
                                    <p className="text-muted-foreground leading-relaxed bg-muted/30 p-4 rounded-xl border">{tutor.education || "Bachelor's Degree in related field."}</p>
                                </div>
                                <div className="space-y-3">
                                    <h3 className="font-bold text-lg text-primary flex items-center gap-2">Teaching Experience</h3>
                                    <p className="text-muted-foreground leading-relaxed bg-muted/30 p-4 rounded-xl border">{tutor.experience || "5+ years of professional tutoring."}</p>
                                </div>
                            </div>
                        </div>

                        {/* Reviews / Feedback */}
                        <div className="space-y-6">
                            <h2 className="text-2xl font-black">Student Feedback</h2>
                            <ReviewList tutorId={tutor.userId} />
                        </div>
                    </div>
                </div>

                {/* Related / Suggested Items */}
                {relatedTutors.length > 0 && (
                    <div className="space-y-6 pt-12 border-t">
                        <h2 className="text-2xl font-black">Related Tutors You Might Like</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {relatedTutors.map(related => (
                                <TutorCard key={related.id} tutor={related} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}


async function ReviewList({ tutorId }: { tutorId: string }) {
    const { ReviewService } = await import("@/services/review.service");
    let reviews: any[] = [];
    try {
        const res = await ReviewService.getTutorReviews(tutorId);
        reviews = res.data || [];
    } catch (e) {
        console.error("Failed to fetch reviews");
    }

    if (reviews.length === 0) {
        return (
            <div className="bg-muted/30 p-8 rounded-lg text-center text-muted-foreground">
                No reviews yet. Be the first to review!
            </div>
        );
    }

    return (
        <div className="grid gap-4">
            {reviews.map((review: any) => (
                <div key={review.id} className="border rounded-lg p-4 space-y-2">
                    <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src={review.student?.image} />
                            <AvatarFallback>{review.student?.name?.charAt(0) || "S"}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-semibold text-sm">{review.student?.name || "Student"}</p>
                            <div className="flex gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`h-3 w-3 ${i < review.rating ? "fill-yellow-500 text-yellow-500" : "text-gray-300"}`}
                                    />
                                ))}
                            </div>
                        </div>
                        <span className="ml-auto text-xs text-muted-foreground">
                            {new Date(review.createdAt).toLocaleDateString()}
                        </span>
                    </div>
                    <p className="text-muted-foreground text-sm">{review.comment}</p>
                </div>
            ))}
        </div>
    );
}
