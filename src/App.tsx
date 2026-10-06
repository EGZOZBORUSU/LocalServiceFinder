import React from 'react';
import { useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/Toast';
import { BookingModal } from './components/BookingModal';
import { PostJobModal } from './components/PostJobModal';
import { ReviewModal } from './components/ReviewModal';
import { AuthModal } from './components/AuthModal';

import { HomeView } from './views/HomeView';
import { ExploreWorkersView } from './views/ExploreWorkersView';
import { WorkerDetailView } from './views/WorkerDetailView';
import { CommunityFeedView } from './views/CommunityFeedView';
import { CustomerDashboardView } from './views/CustomerDashboardView';
import { WorkerDashboardView } from './views/WorkerDashboardView';
import { AdminView } from './views/AdminView';

export const MainContent: React.FC = () => {
  const { currentView } = useApp();

  return (
    <div className="min-h-[100dvh] flex flex-col bg-slate-50 text-slate-900">
      <Navbar />

      <main className="flex-1">
        {currentView === 'home' && <HomeView />}
        {currentView === 'workers' && <ExploreWorkersView />}
        {currentView === 'worker-detail' && <WorkerDetailView />}
        {currentView === 'community' && <CommunityFeedView />}
        {currentView === 'customer-dashboard' && <CustomerDashboardView />}
        {currentView === 'worker-dashboard' && <WorkerDashboardView />}
        {currentView === 'admin' && <AdminView />}
      </main>

      <Footer />

      {/* Global Modals & Notifications */}
      <BookingModal />
      <PostJobModal />
      <ReviewModal />
      <AuthModal />
      <ToastContainer />
    </div>
  );
};
