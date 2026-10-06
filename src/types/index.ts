// Core TypeScript type definitions for Local Service Finder (Front-End)

export type UserRole = 'guest' | 'customer' | 'worker' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  phone?: string;
  address?: string;
}

export interface ServiceItem {
  id: string;
  name: string;
  description: string;
  price: number; // in USD / EUR
  priceType: 'fixed' | 'hourly';
  estimatedDuration: string;
}

export interface WorkerReview {
  id: string;
  customerId: string;
  customerName: string;
  customerAvatar: string;
  rating: number; // 1 to 5
  qualityRating: number;
  punctualityRating: number;
  communicationRating: number;
  comment: string;
  serviceName: string;
  date: string;
}

export interface WorkerProfile {
  id: string;
  userId: string;
  fullName: string;
  headline: string;
  category: string;
  specialties: string[];
  hourlyRate: number;
  rating: number;
  reviewCount: number;
  completedJobsCount: number;
  experienceYears: number;
  location: string;
  district: string;
  avatarUrl: string;
  coverUrl: string;
  bio: string;
  isVerified: boolean;
  verificationStatus: 'verified' | 'pending' | 'rejected';
  availableToday: boolean;
  workingHours: string;
  services: ServiceItem[];
  portfolioImages: string[];
  reviews: WorkerReview[];
}

export interface JobProposal {
  id: string;
  jobId: string;
  workerId: string;
  workerName: string;
  workerAvatar: string;
  workerCategory: string;
  workerRating: number;
  workerCompletedJobs: number;
  proposedPrice: number;
  estimatedTime: string;
  message: string;
  createdAt: string;
  status: 'pending' | 'accepted' | 'declined';
}

export interface JobPost {
  id: string;
  customerId: string;
  customerName: string;
  customerAvatar: string;
  title: string;
  category: string;
  district: string;
  budgetMin: number;
  budgetMax: number;
  urgency: 'urgent' | 'this_week' | 'flexible';
  description: string;
  images: string[];
  createdAt: string;
  status: 'open' | 'assigned' | 'completed';
  proposals: JobProposal[];
}

export interface Booking {
  id: string;
  workerId: string;
  workerName: string;
  workerAvatar: string;
  workerCategory: string;
  customerId: string;
  customerName: string;
  serviceId?: string;
  serviceName: string;
  date: string;
  timeSlot: string;
  address: string;
  notes: string;
  estimatedPrice: number;
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  createdAt: string;
  hasReview: boolean;
}

export interface ServiceCategory {
  id: string;
  slug: string;
  name: string;
  description: string;
  iconName: string;
  workerCount: number;
  image: string;
}
