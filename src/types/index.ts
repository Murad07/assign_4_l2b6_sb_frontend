export interface Category {
    id: string;
    name: string;
    description?: string;
    icon: string;
}

export interface AvailabilitySlot {
    day: string;
    slots: string[];
}

export interface User {
    id: string;
    name: string;
    email: string;
    image: string | null;
    phone: string | null;
    createdAt?: string;
}

export interface Tutor {
    id: string;
    userId: string;
    bio: string;
    expertise: string[];
    hourlyRate: number;
    experience: string;
    education: string;
    rating: number;
    totalReviews: number;
    totalSessions: number;
    availability: AvailabilitySlot[];
    isApproved: boolean;
    createdAt: string;
    updatedAt: string;
    user: User;
    categories: Category[];
    _count?: {
        categories: number;
    };
}

export interface Pagination {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export interface ApiResponse<T> {
    data: T;
    pagination?: Pagination;
    success?: boolean;
    message?: string;
    error?: any;
}
