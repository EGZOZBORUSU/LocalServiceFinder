import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole, WorkerProfile, JobPost, Booking, ServiceCategory, JobProposal, WorkerReview } from '../types';
import { INITIAL_WORKERS, INITIAL_JOB_POSTS, INITIAL_BOOKINGS, INITIAL_CATEGORIES, CURRENT_USER_PROFILES } from '../data/mockData';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message: string;
}

interface AppContextType {
  currentUser: User;
  switchRole: (role: UserRole) => void;
  workers: WorkerProfile[];
  jobPosts: JobPost[];
  bookings: Booking[];
  categories: ServiceCategory[];
  currentView: string;
  selectedWorkerId: string | null;
  navigateTo: (view: string, workerId?: string) => void;
  toasts: ToastMessage[];
  addToast: (title: string, message: string, type?: ToastMessage['type']) => void;
  removeToast: (id: string) => void;
  
  // Modals
  isBookingModalOpen: boolean;
  bookingTargetWorker: WorkerProfile | null;
  openBookingModal: (worker: WorkerProfile) => void;
  closeBookingModal: () => void;
  
  isPostJobModalOpen: boolean;
  openPostJobModal: () => void;
  closePostJobModal: () => void;

  isReviewModalOpen: boolean;
  reviewTargetBooking: Booking | null;
  openReviewModal: (booking: Booking) => void;
  closeReviewModal: () => void;

  isAuthModalOpen: boolean;
  authModalTab: 'signin' | 'register';
  authModalRole: UserRole;
  openAuthModal: (tab?: 'signin' | 'register', role?: UserRole) => void;
  closeAuthModal: () => void;

  // Actions
  createJobPost: (data: Omit<JobPost, 'id' | 'customerId' | 'customerName' | 'customerAvatar' | 'createdAt' | 'status' | 'proposals'>) => void;
  submitProposal: (jobId: string, price: number, estimatedTime: string, message: string) => void;
  acceptProposal: (jobId: string, proposalId: string) => void;
  createBooking: (workerId: string, serviceName: string, date: string, timeSlot: string, address: string, notes: string, price: number) => void;
  updateBookingStatus: (bookingId: string, status: Booking['status']) => void;
  addReviewToWorker: (bookingId: string, workerId: string, rating: number, comment: string, qualityRating: number, punctualityRating: number, communicationRating: number) => void;
  verifyWorker: (workerId: string, approved: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Current user / role
  const [currentRole, setCurrentRole] = useState<UserRole>(() => {
    return (localStorage.getItem('lsf_riga_v1_role') as UserRole) || 'customer';
  });
  const currentUser = CURRENT_USER_PROFILES[currentRole] || CURRENT_USER_PROFILES.customer;

  // Navigation
  const [currentView, setCurrentView] = useState<string>('home');
  const [selectedWorkerId, setSelectedWorkerId] = useState<string | null>(null);

  // Data states with localStorage fallback
  const [workers, setWorkers] = useState<WorkerProfile[]>(() => {
    const saved = localStorage.getItem('lsf_riga_v1_workers');
    return saved ? JSON.parse(saved) : INITIAL_WORKERS;
  });

  const [jobPosts, setJobPosts] = useState<JobPost[]>(() => {
    const saved = localStorage.getItem('lsf_riga_v1_jobs');
    return saved ? JSON.parse(saved) : INITIAL_JOB_POSTS;
  });

  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem('lsf_riga_v1_bookings');
    return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
  });

  const [categories] = useState<ServiceCategory[]>(INITIAL_CATEGORIES);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Modals
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingTargetWorker, setBookingTargetWorker] = useState<WorkerProfile | null>(null);

  const [isPostJobModalOpen, setIsPostJobModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewTargetBooking, setReviewTargetBooking] = useState<Booking | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'signin' | 'register'>('signin');
  const [authModalRole, setAuthModalRole] = useState<UserRole>('customer');

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('lsf_riga_v1_role', currentRole);
  }, [currentRole]);

  useEffect(() => {
    localStorage.setItem('lsf_riga_v1_workers', JSON.stringify(workers));
  }, [workers]);

  useEffect(() => {
    localStorage.setItem('lsf_riga_v1_jobs', JSON.stringify(jobPosts));
  }, [jobPosts]);

  useEffect(() => {
    localStorage.setItem('lsf_riga_v1_bookings', JSON.stringify(bookings));
  }, [bookings]);

  const addToast = (title: string, message: string, type: ToastMessage['type'] = 'success') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const switchRole = (role: UserRole) => {
    setCurrentRole(role);
    addToast('Role Switched', `Now browsing platform as ${role.toUpperCase()}`, 'info');
    
    // Smart redirect based on role
    if (role === 'worker') {
      setCurrentView('worker-dashboard');
    } else if (role === 'admin') {
      setCurrentView('admin');
    } else if (role === 'customer') {
      setCurrentView('home');
    }
  };

  const navigateTo = (view: string, workerId?: string) => {
    setCurrentView(view);
    if (workerId) {
      setSelectedWorkerId(workerId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openBookingModal = (worker: WorkerProfile) => {
    if (currentRole === 'guest') {
      setIsAuthModalOpen(true);
      addToast('Sign In Required', 'Please sign in or continue as Customer to book a pro', 'info');
      return;
    }
    setBookingTargetWorker(worker);
    setIsBookingModalOpen(true);
  };

  const closeBookingModal = () => {
    setIsBookingModalOpen(false);
    setBookingTargetWorker(null);
  };

  const openPostJobModal = () => {
    if (currentRole === 'guest') {
      setIsAuthModalOpen(true);
      addToast('Sign In Required', 'Please sign in or continue as Customer to post a job', 'info');
      return;
    }
    setIsPostJobModalOpen(true);
  };

  const closePostJobModal = () => {
    setIsPostJobModalOpen(false);
  };

  const openReviewModal = (booking: Booking) => {
    setReviewTargetBooking(booking);
    setIsReviewModalOpen(true);
  };

  const closeReviewModal = () => {
    setIsReviewModalOpen(false);
    setReviewTargetBooking(null);
  };

  const openAuthModal = (tab: 'signin' | 'register' = 'signin', role: UserRole = 'customer') => {
    setAuthModalTab(tab);
    setAuthModalRole(role);
    setIsAuthModalOpen(true);
  };
  const closeAuthModal = () => setIsAuthModalOpen(false);

  // Business Actions
  const createJobPost = (data: Omit<JobPost, 'id' | 'customerId' | 'customerName' | 'customerAvatar' | 'createdAt' | 'status' | 'proposals'>) => {
    const newJob: JobPost = {
      ...data,
      id: `job-${Date.now()}`,
      customerId: currentUser.id,
      customerName: currentUser.name,
      customerAvatar: currentUser.avatar,
      createdAt: 'Just now',
      status: 'open',
      proposals: []
    };

    setJobPosts(prev => [newJob, ...prev]);
    addToast('Job Request Published', 'Your request is live on the community board for local pros to review.', 'success');
    closePostJobModal();
    navigateTo('community');
  };

  const submitProposal = (jobId: string, price: number, estimatedTime: string, message: string) => {
    const currentWorker = workers.find(w => w.id === currentUser.id) || workers[0];
    const newProposal: JobProposal = {
      id: `prop-${Date.now()}`,
      jobId,
      workerId: currentWorker.id,
      workerName: currentWorker.fullName,
      workerAvatar: currentWorker.avatarUrl,
      workerCategory: currentWorker.category,
      workerRating: currentWorker.rating,
      workerCompletedJobs: currentWorker.completedJobsCount,
      proposedPrice: price,
      estimatedTime,
      message,
      createdAt: 'Just now',
      status: 'pending'
    };

    setJobPosts(prev => prev.map(job => {
      if (job.id === jobId) {
        return {
          ...job,
          proposals: [newProposal, ...job.proposals]
        };
      }
      return job;
    }));

    addToast('Proposal Submitted', `Your offer of €${price} was sent to the client.`, 'success');
  };

  const acceptProposal = (jobId: string, proposalId: string) => {
    const targetJob = jobPosts.find(j => j.id === jobId);
    const targetProp = targetJob?.proposals.find(p => p.id === proposalId);

    if (!targetJob || !targetProp) return;

    // Update job status
    setJobPosts(prev => prev.map(job => {
      if (job.id === jobId) {
        return {
          ...job,
          status: 'assigned',
          proposals: job.proposals.map(p => ({
            ...p,
            status: p.id === proposalId ? 'accepted' : 'declined'
          }))
        };
      }
      return job;
    }));

    // Auto-create a confirmed booking from this accepted proposal
    const newBooking: Booking = {
      id: `b-${Date.now()}`,
      workerId: targetProp.workerId,
      workerName: targetProp.workerName,
      workerAvatar: targetProp.workerAvatar,
      workerCategory: targetProp.workerCategory,
      customerId: currentUser.id,
      customerName: currentUser.name,
      serviceName: targetJob.title,
      date: 'Scheduled via Job Board',
      timeSlot: targetProp.estimatedTime,
      address: `${targetJob.district} area`,
      notes: targetProp.message,
      estimatedPrice: targetProp.proposedPrice,
      status: 'confirmed',
      createdAt: 'Just now',
      hasReview: false
    };

    setBookings(prev => [newBooking, ...prev]);
    addToast('Proposal Accepted', `You accepted ${targetProp.workerName}'s bid. Booking confirmed!`, 'success');
  };

  const createBooking = (
    workerId: string,
    serviceName: string,
    date: string,
    timeSlot: string,
    address: string,
    notes: string,
    price: number
  ) => {
    const worker = workers.find(w => w.id === workerId);
    if (!worker) return;

    const newBooking: Booking = {
      id: `b-${Date.now()}`,
      workerId,
      workerName: worker.fullName,
      workerAvatar: worker.avatarUrl,
      workerCategory: worker.category,
      customerId: currentUser.id,
      customerName: currentUser.name,
      serviceName,
      date,
      timeSlot,
      address,
      notes,
      estimatedPrice: price,
      status: 'pending',
      createdAt: 'Just now',
      hasReview: false
    };

    setBookings(prev => [newBooking, ...prev]);
    closeBookingModal();
    addToast('Booking Request Sent', `Request submitted to ${worker.fullName}. You can track it in your dashboard.`, 'success');
    navigateTo('customer-dashboard');
  };

  const updateBookingStatus = (bookingId: string, status: Booking['status']) => {
    setBookings(prev => prev.map(b => {
      if (b.id === bookingId) {
        return { ...b, status };
      }
      return b;
    }));

    const statusLabels: Record<string, string> = {
      confirmed: 'Booking Confirmed',
      completed: 'Job Marked Completed',
      cancelled: 'Booking Cancelled',
      in_progress: 'Job Started'
    };

    addToast('Status Updated', statusLabels[status] || 'Booking status changed', 'info');
  };

  const addReviewToWorker = (
    bookingId: string,
    workerId: string,
    rating: number,
    comment: string,
    qualityRating: number,
    punctualityRating: number,
    communicationRating: number
  ) => {
    const newReview: WorkerReview = {
      id: `rev-${Date.now()}`,
      customerId: currentUser.id,
      customerName: currentUser.name,
      customerAvatar: currentUser.avatar,
      rating,
      qualityRating,
      punctualityRating,
      communicationRating,
      comment,
      serviceName: reviewTargetBooking?.serviceName || 'Home Service',
      date: 'Just now'
    };

    // Update worker reviews & rating
    setWorkers(prev => prev.map(w => {
      if (w.id === workerId) {
        const updatedReviews = [newReview, ...w.reviews];
        const avg = updatedReviews.reduce((acc, r) => acc + r.rating, 0) / updatedReviews.length;
        return {
          ...w,
          reviews: updatedReviews,
          reviewCount: updatedReviews.length,
          rating: Number(avg.toFixed(2)),
          completedJobsCount: w.completedJobsCount + 1
        };
      }
      return w;
    }));

    // Mark booking as reviewed
    setBookings(prev => prev.map(b => {
      if (b.id === bookingId) {
        return { ...b, hasReview: true };
      }
      return b;
    }));

    closeReviewModal();
    addToast('Review Submitted', 'Thank you for your rating and honest feedback!', 'success');
  };

  const verifyWorker = (workerId: string, approved: boolean) => {
    setWorkers(prev => prev.map(w => {
      if (w.id === workerId) {
        return {
          ...w,
          isVerified: approved,
          verificationStatus: approved ? 'verified' : 'rejected'
        };
      }
      return w;
    }));

    addToast(
      approved ? 'Worker Verified' : 'Application Rejected',
      `Worker profile verification ${approved ? 'approved with trust badge' : 'declined'}.`,
      approved ? 'success' : 'warning'
    );
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        switchRole,
        workers,
        jobPosts,
        bookings,
        categories,
        currentView,
        selectedWorkerId,
        navigateTo,
        toasts,
        addToast,
        removeToast,
        isBookingModalOpen,
        bookingTargetWorker,
        openBookingModal,
        closeBookingModal,
        isPostJobModalOpen,
        openPostJobModal,
        closePostJobModal,
        isReviewModalOpen,
        reviewTargetBooking,
        openReviewModal,
        closeReviewModal,
        isAuthModalOpen,
        authModalTab,
        authModalRole,
        openAuthModal,
        closeAuthModal,
        createJobPost,
        submitProposal,
        acceptProposal,
        createBooking,
        updateBookingStatus,
        addReviewToWorker,
        verifyWorker
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
