import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  CalendarCheck,
  Clock,
  MapPin,
  Star,
  CheckCircle,
  XCircle,
  PlusCircle,
  ChatCircleText,
  ShieldCheck,
  Receipt
} from '@phosphor-icons/react';

export const CustomerDashboardView: React.FC = () => {
  const {
    currentUser,
    bookings,
    jobPosts,
    updateBookingStatus,
    openReviewModal,
    openPostJobModal,
    acceptProposal
  } = useApp();

  const [activeTab, setActiveTab] = useState<'bookings' | 'my-jobs' | 'history'>('bookings');

  // Active bookings (pending, confirmed, in_progress)
  const activeBookings = bookings.filter(
    (b) => b.status === 'pending' || b.status === 'confirmed' || b.status === 'in_progress'
  );

  // Past / completed bookings
  const completedBookings = bookings.filter(
    (b) => b.status === 'completed' || b.status === 'cancelled'
  );

  // Jobs posted by this customer
  const myJobs = jobPosts.filter(
    (j) => j.customerId === currentUser.id || currentUser.role === 'customer'
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Dashboard Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div className="flex items-center gap-4">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-slate-200 shadow-sm"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
                {currentUser.name}
              </h1>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-sky-100 text-sky-800">
                Homeowner
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Manage your direct appointments, open job requests, and service receipts.
            </p>
          </div>
        </div>

        <button
          onClick={openPostJobModal}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm transition-all shadow-sm active:scale-[0.98] shrink-0"
        >
          <PlusCircle size={18} weight="bold" />
          <span>New Repair Request</span>
        </button>
      </div>

      {/* Overview Stat Widgets */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Active Appointments
          </span>
          <span className="text-2xl font-extrabold text-slate-950">
            {activeBookings.length}
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
            My Open Job Posts
          </span>
          <span className="text-2xl font-extrabold text-slate-950">
            {myJobs.filter((j) => j.status === 'open').length}
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Completed Projects
          </span>
          <span className="text-2xl font-extrabold text-slate-950">
            {completedBookings.filter((b) => b.status === 'completed').length}
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Satisfaction Rate
          </span>
          <span className="text-2xl font-extrabold text-emerald-600">
            100%
          </span>
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="border-b border-slate-200 flex gap-6">
        <button
          onClick={() => setActiveTab('bookings')}
          className={`pb-3 text-xs sm:text-sm font-bold border-b-2 transition-colors ${
            activeTab === 'bookings'
              ? 'border-slate-900 text-slate-900'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          Active Appointments ({activeBookings.length})
        </button>

        <button
          onClick={() => setActiveTab('my-jobs')}
          className={`pb-3 text-xs sm:text-sm font-bold border-b-2 transition-colors ${
            activeTab === 'my-jobs'
              ? 'border-slate-900 text-slate-900'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          My Posted Requests & Quotes ({myJobs.length})
        </button>

        <button
          onClick={() => setActiveTab('history')}
          className={`pb-3 text-xs sm:text-sm font-bold border-b-2 transition-colors ${
            activeTab === 'history'
              ? 'border-slate-900 text-slate-900'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          History & Receipts ({completedBookings.length})
        </button>
      </div>

      {/* Tab 1: Active Bookings */}
      {activeTab === 'bookings' && (
        <div className="space-y-4">
          {activeBookings.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-3">
              <CalendarCheck size={36} className="mx-auto text-slate-400" />
              <h3 className="font-bold text-slate-900 text-base">
                No active bookings right now
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Need help fixing a faucet, light fixture, or wall repair? Explore verified workers or post an open request.
              </p>
            </div>
          ) : (
            activeBookings.map((booking) => (
              <div
                key={booking.id}
                className="p-5 sm:p-6 bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="flex items-start sm:items-center gap-4">
                  <img
                    src={booking.workerAvatar}
                    alt={booking.workerName}
                    className="w-14 h-14 rounded-2xl object-cover border border-slate-200 shrink-0"
                  />
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-bold text-slate-900 text-base">
                        {booking.serviceName}
                      </h4>
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                          booking.status === 'confirmed'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {booking.status}
                      </span>
                    </div>

                    <p className="text-xs font-semibold text-slate-700">
                      With Pro: {booking.workerName} ({booking.workerCategory})
                    </p>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 pt-0.5">
                      <span className="flex items-center gap-1">
                        <Clock size={13} className="text-slate-400" />
                        <span>{booking.date} at {booking.timeSlot}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <MapPin size={13} className="text-slate-400" />
                        <span>{booking.address}</span>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between md:flex-col md:items-end gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100 shrink-0">
                  <div className="text-right">
                    <span className="text-xs text-slate-400 block">Est. Cost</span>
                    <span className="text-lg font-extrabold text-slate-950">
                      €{booking.estimatedPrice}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateBookingStatus(booking.id, 'completed')}
                      className="px-3.5 py-1.5 text-xs font-bold rounded-xl bg-slate-900 hover:bg-slate-800 text-white transition-all shadow-2xs"
                    >
                      Mark as Done
                    </button>
                    <button
                      onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                      className="px-3 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 2: My Posted Jobs & Quotes Received */}
      {activeTab === 'my-jobs' && (
        <div className="space-y-6">
          {myJobs.map((job) => (
            <div
              key={job.id}
              className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 mr-2">
                    {job.category}
                  </span>
                  <span className="text-xs text-slate-400">{job.district} • Posted {job.createdAt}</span>
                  <h3 className="font-bold text-slate-900 text-base mt-1">
                    {job.title}
                  </h3>
                </div>
                <div className="text-sm font-extrabold text-emerald-700">
                  Budget: €{job.budgetMin} - €{job.budgetMax}
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {job.description}
              </p>

              {/* Proposals Received */}
              <div className="pt-2 space-y-3">
                <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Proposals Received ({job.proposals.length})
                </h5>

                {job.proposals.length === 0 ? (
                  <p className="text-xs text-slate-400 italic">
                    Waiting for nearby pros to send quotes. You will be notified here.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {job.proposals.map((prop) => (
                      <div
                        key={prop.id}
                        className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <img
                              src={prop.workerAvatar}
                              alt={prop.workerName}
                              className="w-8 h-8 rounded-full object-cover"
                            />
                            <div>
                              <div className="text-xs font-bold text-slate-900">
                                {prop.workerName}
                              </div>
                              <span className="text-[10px] text-slate-400">
                                {prop.estimatedTime}
                              </span>
                            </div>
                          </div>
                          <span className="text-base font-extrabold text-slate-900">
                            €{prop.proposedPrice}
                          </span>
                        </div>

                        <p className="text-xs text-slate-700 bg-white p-2.5 rounded-xl border border-slate-200/60 leading-relaxed">
                          "{prop.message}"
                        </p>

                        {prop.status === 'accepted' ? (
                          <span className="block text-center text-xs font-bold text-emerald-800 bg-emerald-100 py-1 rounded-lg">
                            Accepted Offer
                          </span>
                        ) : job.status === 'open' ? (
                          <button
                            onClick={() => acceptProposal(job.id, prop.id)}
                            className="w-full py-2 text-xs font-bold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white transition-all shadow-2xs"
                          >
                            Accept Offer & Confirm Booking
                          </button>
                        ) : null}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: History & Receipts */}
      {activeTab === 'history' && (
        <div className="space-y-4">
          {completedBookings.map((booking) => (
            <div
              key={booking.id}
              className="p-5 sm:p-6 bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="flex items-center gap-4">
                <img
                  src={booking.workerAvatar}
                  alt={booking.workerName}
                  className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0"
                />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">
                    {booking.serviceName}
                  </h4>
                  <p className="text-xs text-slate-500">
                    Pro: {booking.workerName} • Completed on {booking.date}
                  </p>
                  <span className="text-xs font-bold text-slate-900 mt-1 block">
                    Paid: €{booking.estimatedPrice}
                  </span>
                </div>
              </div>

              <div>
                {booking.hasReview ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                    <CheckCircle size={16} weight="fill" />
                    <span>Review Submitted</span>
                  </span>
                ) : (
                  <button
                    onClick={() => openReviewModal(booking)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-all shadow-2xs"
                  >
                    <Star size={14} weight="fill" />
                    <span>Leave Rating & Review</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
