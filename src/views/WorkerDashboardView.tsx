import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Briefcase,
  CheckCircle,
  XCircle,
  Clock,
  MapPin,
  CurrencyDollar,
  Star,
  ShieldCheck,
  Lightning,
  PaperPlaneTilt
} from '@phosphor-icons/react';

export const WorkerDashboardView: React.FC = () => {
  const { currentUser, bookings, jobPosts, updateBookingStatus, submitProposal, navigateTo } = useApp();

  const [activeTab, setActiveTab] = useState<'incoming' | 'leads' | 'schedule'>('incoming');
  const [isAvailableToday, setIsAvailableToday] = useState(true);

  // Incoming bookings for this worker
  const incomingBookings = bookings.filter((b) => b.workerId === currentUser.id);

  // Community jobs available for bidding
  const openLeads = jobPosts.filter((j) => j.status === 'open');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Worker Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div className="flex items-center gap-4">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-500 shadow-sm"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
                {currentUser.name}
              </h1>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1">
                <ShieldCheck size={14} weight="fill" />
                <span>Verified Master Pro</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Service Pro Workspace • Manage incoming dispatches and community leads
            </p>
          </div>
        </div>

        {/* Availability Toggle */}
        <div className="flex items-center gap-3 bg-white p-2.5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="text-right">
            <span className="text-xs font-bold text-slate-900 block leading-tight">
              Emergency Availability
            </span>
            <span className="text-[11px] text-slate-500">
              {isAvailableToday ? 'Available for calls today' : 'Offline / Busy'}
            </span>
          </div>
          <button
            onClick={() => setIsAvailableToday(!isAvailableToday)}
            className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
              isAvailableToday ? 'bg-emerald-500 justify-end' : 'bg-slate-300 justify-start'
            }`}
          >
            <div className="bg-white w-4 h-4 rounded-full shadow-md"></div>
          </button>
        </div>
      </div>

      {/* Pro Metrics Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Incoming Requests
          </span>
          <span className="text-2xl font-extrabold text-slate-950">
            {incomingBookings.filter((b) => b.status === 'pending').length}
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Jobs Completed
          </span>
          <span className="text-2xl font-extrabold text-slate-950">
            128
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Customer Rating
          </span>
          <div className="flex items-center gap-1.5">
            <Star size={20} weight="fill" className="text-amber-400" />
            <span className="text-2xl font-extrabold text-slate-950">
              4.92
            </span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Weekly Revenue Est.
          </span>
          <span className="text-2xl font-extrabold text-emerald-600">
            €1,240
          </span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-slate-200 flex gap-6">
        <button
          onClick={() => setActiveTab('incoming')}
          className={`pb-3 text-xs sm:text-sm font-bold border-b-2 transition-colors ${
            activeTab === 'incoming'
              ? 'border-slate-900 text-slate-900'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          Customer Appointments ({incomingBookings.length})
        </button>

        <button
          onClick={() => setActiveTab('leads')}
          className={`pb-3 text-xs sm:text-sm font-bold border-b-2 transition-colors ${
            activeTab === 'leads'
              ? 'border-slate-900 text-slate-900'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          Nearby Job Leads ({openLeads.length})
        </button>

        <button
          onClick={() => setActiveTab('schedule')}
          className={`pb-3 text-xs sm:text-sm font-bold border-b-2 transition-colors ${
            activeTab === 'schedule'
              ? 'border-slate-900 text-slate-900'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          My Profile & Services
        </button>
      </div>

      {/* Tab 1: Incoming Bookings */}
      {activeTab === 'incoming' && (
        <div className="space-y-4">
          {incomingBookings.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-2">
              <p className="text-sm font-bold text-slate-900">
                No active appointments currently assigned.
              </p>
              <p className="text-xs text-slate-500">
                Browse open neighborhood leads on the Community Board to send quotes!
              </p>
            </div>
          ) : (
            incomingBookings.map((b) => (
              <div
                key={b.id}
                className="p-5 sm:p-6 bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        b.status === 'confirmed'
                          ? 'bg-emerald-100 text-emerald-800'
                          : b.status === 'completed'
                          ? 'bg-slate-100 text-slate-700'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {b.status}
                    </span>
                    <span className="text-xs text-slate-400">Created: {b.createdAt}</span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900">
                    {b.serviceName}
                  </h3>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600">
                    <span>
                      Client: <strong>{b.customerName}</strong>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock size={13} className="text-slate-400" />
                      <span>{b.date} ({b.timeSlot})</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin size={13} className="text-slate-400" />
                      <span>{b.address}</span>
                    </span>
                  </div>

                  {b.notes && (
                    <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      Client Note: "{b.notes}"
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between md:flex-col md:items-end gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
                  <div className="text-right">
                    <span className="text-xs text-slate-400 block">Payment Due</span>
                    <span className="text-lg font-extrabold text-slate-900">
                      €{b.estimatedPrice}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {b.status === 'pending' && (
                      <button
                        onClick={() => updateBookingStatus(b.id, 'confirmed')}
                        className="px-4 py-2 text-xs font-bold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-2xs"
                      >
                        Accept Appointment
                      </button>
                    )}
                    {b.status === 'confirmed' && (
                      <button
                        onClick={() => updateBookingStatus(b.id, 'completed')}
                        className="px-4 py-2 text-xs font-bold rounded-xl bg-slate-900 hover:bg-slate-800 text-white shadow-2xs"
                      >
                        Mark Job Complete
                      </button>
                    )}
                    {b.status !== 'completed' && (
                      <button
                        onClick={() => updateBookingStatus(b.id, 'cancelled')}
                        className="px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl"
                      >
                        Decline
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 2: Nearby Job Leads to Bid On */}
      {activeTab === 'leads' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 flex items-center justify-between">
            <span className="font-semibold">
              These are live repair jobs published by local homeowners looking for bids.
            </span>
            <button
              onClick={() => navigateTo('community')}
              className="text-xs font-bold underline hover:text-slate-900"
            >
              Open Full Community Board
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {openLeads.map((job) => (
              <div
                key={job.id}
                className="p-5 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                    {job.category}
                  </span>
                  <span className="text-xs font-extrabold text-emerald-700">
                    Client Budget: €{job.budgetMin} - €{job.budgetMax}
                  </span>
                </div>

                <h4 className="font-bold text-slate-900 text-sm">
                  {job.title}
                </h4>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {job.description}
                </p>

                <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-100">
                  <span>Location: {job.district}</span>
                  <button
                    onClick={() => {
                      submitProposal(
                        job.id,
                        job.budgetMin + 15,
                        'Available tomorrow 10:00',
                        'Certified master plumber. Carrying all fittings and replacement pipe.'
                      );
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-2xs"
                  >
                    <PaperPlaneTilt size={13} weight="bold" />
                    <span>Quick Quote (€{job.budgetMin + 15})</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: My Profile & Services */}
      {activeTab === 'schedule' && (
        <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Public Profile Preview & Services
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                This is what homeowners see when they look up your profile.
              </p>
            </div>
            <button
              onClick={() => navigateTo('worker-detail', currentUser.id)}
              className="px-4 py-2 text-xs font-bold rounded-xl bg-slate-900 text-white"
            >
              View Full Public Profile
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-2">
            <div>
              <strong>Current Hourly Tariff:</strong> €48 / hour
            </div>
            <div>
              <strong>Service Coverage Area:</strong> Centrs, Vecrīga & Āgenskalns (Rīga)
            </div>
            <div>
              <strong>Active Services:</strong> Pipe leak repairs, faucet replacements, drain clearing.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
