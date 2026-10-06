import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { JobPostCard } from '../components/JobPostCard';
import {
  PlusCircle,
  Funnel,
  Lightning,
  Sparkle,
  Wrench,
  Clock,
  ShieldCheck,
  Tag
} from '@phosphor-icons/react';

export const CommunityFeedView: React.FC = () => {
  const { jobPosts, currentUser, openPostJobModal, categories, switchRole } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedUrgency, setSelectedUrgency] = useState<string>('all');

  const filteredJobs = jobPosts.filter((job) => {
    if (selectedCategory !== 'all' && job.category !== selectedCategory) {
      return false;
    }
    if (selectedUrgency !== 'all' && job.urgency !== selectedUrgency) {
      return false;
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner / Feed Headline */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-700 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200 mb-2">
            <Lightning size={14} weight="fill" />
            <span>Live Community Marketplace</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-950 tracking-tight">
            Community Job Feed
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Homeowners publish repair requests. Local certified pros review details and send transparent bids.
          </p>
        </div>

        <button
          onClick={openPostJobModal}
          className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm transition-all shadow-md active:scale-[0.98] shrink-0"
        >
          <PlusCircle size={18} weight="bold" />
          <span>Post a Repair Request</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Feed Column (8 cols) */}
        <main className="lg:col-span-8 space-y-6">
          {/* Post Creation Prompt Box (LinkedIn Style) */}
          <div className="p-4 sm:p-5 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-10 h-10 rounded-full object-cover border border-slate-200"
            />
            <button
              onClick={openPostJobModal}
              className="flex-1 text-left px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-xs sm:text-sm text-slate-500 transition-colors font-medium cursor-pointer"
            >
              Have a pipe leak, wiring issue, or room to paint? Post your request here...
            </button>
            <button
              onClick={openPostJobModal}
              className="p-2.5 rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition-colors"
              title="Post a job"
            >
              <PlusCircle size={20} weight="bold" />
            </button>
          </div>

          {/* Filter Pills Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-white rounded-2xl border border-slate-200/90 shadow-2xs">
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                All Jobs
              </button>

              {categories.slice(0, 4).map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCategory(c.name)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                    selectedCategory === c.name
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold text-slate-400">Urgency:</span>
              <select
                value={selectedUrgency}
                onChange={(e) => setSelectedUrgency(e.target.value)}
                className="text-xs p-1 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 focus:outline-none font-semibold"
              >
                <option value="all">All Urgency</option>
                <option value="urgent">Emergency / Today</option>
                <option value="this_week">Within 48h</option>
                <option value="flexible">Flexible</option>
              </select>
            </div>
          </div>

          {/* Feed List */}
          <div className="space-y-5">
            {filteredJobs.length === 0 ? (
              <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 space-y-3">
                <p className="text-sm font-bold text-slate-900">
                  No open job requests in this category right now.
                </p>
                <p className="text-xs text-slate-500">
                  Be the first neighbor to post a request or switch your filter!
                </p>
                <button
                  onClick={openPostJobModal}
                  className="px-4 py-2 text-xs font-bold rounded-xl bg-slate-900 text-white"
                >
                  Post a Job Now
                </button>
              </div>
            ) : (
              filteredJobs.map((job) => <JobPostCard key={job.id} job={job} />)
            )}
          </div>
        </main>

        {/* Right Sidebar Widgets (4 cols) */}
        <aside className="lg:col-span-4 space-y-6">
          {/* Role Status Reminder */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Your Current Perspective
            </h4>
            <div className="flex items-center gap-3">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-10 h-10 rounded-xl object-cover border border-slate-200"
              />
              <div>
                <div className="text-sm font-bold text-slate-900 leading-tight">
                  {currentUser.name}
                </div>
                <div className="text-xs text-slate-500 capitalize">
                  Browsing as: <strong>{currentUser.role}</strong>
                </div>
              </div>
            </div>

            {currentUser.role !== 'worker' ? (
              <div className="pt-2 border-t border-slate-100">
                <p className="text-xs text-slate-600 mb-2">
                  Want to submit quotes and bids on open customer repair jobs?
                </p>
                <button
                  onClick={() => switchRole('worker')}
                  className="w-full py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-2xs"
                >
                  Switch to Worker Pro (Marcus Vance)
                </button>
              </div>
            ) : (
              <div className="pt-2 border-t border-slate-100">
                <p className="text-xs text-emerald-700 font-semibold mb-2">
                  You are active as a Certified Pro. You can quote on any job above!
                </p>
                <button
                  onClick={() => switchRole('customer')}
                  className="w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors"
                >
                  Switch Back to Customer View
                </button>
              </div>
            )}
          </div>

          {/* How It Works Sidebar */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Community Bidding Rules
            </h4>
            <ul className="space-y-3 text-xs text-slate-600">
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-slate-900 text-white font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                  1
                </span>
                <span>
                  <strong>Post with clarity:</strong> Specify the exact issue, attach photos if possible, and set a realistic budget.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-slate-900 text-white font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                  2
                </span>
                <span>
                  <strong>Only verified pros can quote:</strong> To protect homeowners from scams, only accounts with background checks can bid.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-slate-900 text-white font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                  3
                </span>
                <span>
                  <strong>Instant confirmation:</strong> When you accept a proposal, your booking is scheduled directly into your dashboard.
                </span>
              </li>
            </ul>
          </div>

          {/* Quick Stats */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Avg. Response Time</span>
              <strong className="text-slate-900 font-bold">24 Minutes</strong>
            </div>
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Job Fulfillment Rate</span>
              <strong className="text-emerald-700 font-bold">98.4%</strong>
            </div>
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Verified Local Pros</span>
              <strong className="text-slate-900 font-bold">120+ Active</strong>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
