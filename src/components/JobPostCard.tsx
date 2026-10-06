import React, { useState } from 'react';
import { JobPost } from '../types';
import { useApp } from '../context/AppContext';
import {
  MapPin,
  Clock,
  CurrencyDollar,
  PaperPlaneTilt,
  CheckCircle,
  ChatCircleText,
  Star,
  ShieldCheck,
  Tag
} from '@phosphor-icons/react';

interface JobPostCardProps {
  job: JobPost;
}

export const JobPostCard: React.FC<JobPostCardProps> = ({ job }) => {
  const { currentUser, submitProposal, acceptProposal, switchRole } = useApp();
  const [showProposalForm, setShowProposalForm] = useState(false);
  const [showProposalsList, setShowProposalsList] = useState(false);

  // Proposal form state
  const [price, setPrice] = useState<number>(job.budgetMin);
  const [time, setTime] = useState('');
  const [message, setMessage] = useState('');

  const urgencyConfig = {
    urgent: {
      label: 'Emergency / Today',
      style: 'bg-rose-50 text-rose-800 border-rose-200'
    },
    this_week: {
      label: 'Within 48h',
      style: 'bg-slate-100 text-slate-800 border-slate-200'
    },
    flexible: {
      label: 'Flexible Schedule',
      style: 'bg-slate-50 text-slate-600 border-slate-200'
    }
  };

  const handleProposalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!price || !time || !message.trim()) return;

    submitProposal(job.id, price, time, message.trim());
    setShowProposalForm(false);
    setMessage('');
    setTime('');
  };

  const hasWorkerAlreadyBid = job.proposals.some((p) => p.workerId === currentUser.id);

  return (
    <article className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all p-5 sm:p-6 space-y-4">
      {/* Post Header: Client Profile & Urgency */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <img
            src={job.customerAvatar}
            alt={job.customerName}
            className="w-11 h-11 rounded-full object-cover border border-slate-100 shadow-2xs"
          />
          <div>
            <h4 className="font-bold text-slate-900 text-sm leading-tight">
              {job.customerName}
            </h4>
            <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
              <span className="flex items-center gap-1">
                <MapPin size={12} className="text-slate-400" />
                <span>{job.district}</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock size={12} className="text-slate-400" />
                <span>{job.createdAt}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Urgency Badge */}
        <span
          className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${
            urgencyConfig[job.urgency].style
          }`}
        >
          {urgencyConfig[job.urgency].label}
        </span>
      </div>

      {/* Title & Description */}
      <div>
        <h3 className="font-bold text-slate-900 text-base sm:text-lg mb-1.5 leading-snug">
          {job.title}
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line">
          {job.description}
        </p>
      </div>

      {/* Attached Images */}
      {job.images && job.images.length > 0 && (
        <div className="flex gap-2 overflow-x-auto py-1">
          {job.images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt="Issue photo"
              className="h-32 sm:h-40 w-auto rounded-xl object-cover border border-slate-200 shadow-2xs"
            />
          ))}
        </div>
      )}

      {/* Meta: Category & Estimated Budget */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700">
            <Tag size={13} />
            <span>{job.category}</span>
          </span>

          <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200/80">
            <CurrencyDollar size={14} weight="bold" />
            <span>€{job.budgetMin} - €{job.budgetMax} Client Budget</span>
          </span>
        </div>

        {/* Status indicator */}
        <span
          className={`text-xs font-semibold px-2 py-0.5 rounded border ${
            job.status === 'open'
              ? 'bg-slate-100 text-slate-700 border-slate-200'
              : 'bg-emerald-50 text-emerald-800 border-emerald-200'
          }`}
        >
          {job.status === 'open' ? 'Open for Bids' : 'Assigned / In Progress'}
        </span>
      </div>

      {/* Proposals Bar & Actions */}
      <div className="pt-2 flex items-center justify-between gap-3">
        <button
          onClick={() => setShowProposalsList(!showProposalsList)}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ChatCircleText size={16} />
          <span>
            {job.proposals.length} {job.proposals.length === 1 ? 'Proposal' : 'Proposals'} Received
          </span>
        </button>

        {job.status === 'open' && (
          <div>
            {currentUser.role === 'worker' ? (
              hasWorkerAlreadyBid ? (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
                  <CheckCircle size={14} weight="fill" />
                  <span>Proposal Submitted</span>
                </span>
              ) : (
                <button
                  onClick={() => setShowProposalForm(!showProposalForm)}
                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl bg-slate-900 hover:bg-slate-800 text-white transition-all shadow-2xs active:scale-[0.98]"
                >
                  <PaperPlaneTilt size={14} weight="bold" />
                  <span>{showProposalForm ? 'Cancel Bid' : 'Send Quote & Proposal'}</span>
                </button>
              )
            ) : currentUser.role === 'guest' ? (
              <button
                onClick={() => switchRole('worker')}
                className="text-xs font-semibold text-slate-600 hover:text-slate-900 underline"
              >
                Switch to Pro to quote
              </button>
            ) : null}
          </div>
        )}
      </div>

      {/* Worker Proposal Submission Form (Accordion) */}
      {showProposalForm && (
        <form
          onSubmit={handleProposalSubmit}
          className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3 animate-in fade-in duration-150"
        >
          <div className="flex items-center justify-between">
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Submit Your Proposal to Client
            </h5>
            <span className="text-[11px] text-slate-400">
              Logged in as Pro: {currentUser.name}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Your Quoted Price (€ EUR)
              </label>
              <input
                type="number"
                min="10"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                required
                className="w-full text-xs p-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white"
                placeholder="e.g. 95"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Availability & Timeframe
              </label>
              <input
                type="text"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
                className="w-full text-xs p-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white"
                placeholder="e.g. Tomorrow at 14:00"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Short Pitch / Work Plan
            </label>
            <textarea
              rows={2}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="w-full text-xs p-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white"
              placeholder="Describe your relevant experience, replacement parts available, and warranty..."
            />
          </div>

          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={() => setShowProposalForm(false)}
              className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 text-xs font-bold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-all shadow-2xs"
            >
              Send Quote to Homeowner
            </button>
          </div>
        </form>
      )}

      {/* Proposals List (Visible to all or when expanded) */}
      {showProposalsList && (
        <div className="pt-3 border-t border-slate-100 space-y-3">
          <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Received Worker Proposals ({job.proposals.length})
          </h5>

          {job.proposals.length === 0 ? (
            <p className="text-xs text-slate-400 italic">
              No quotes submitted yet. Be the first certified pro to bid!
            </p>
          ) : (
            <div className="space-y-2">
              {job.proposals.map((prop) => (
                <div
                  key={prop.id}
                  className={`p-3.5 rounded-xl border transition-all ${
                    prop.status === 'accepted'
                      ? 'bg-emerald-50/60 border-emerald-300'
                      : 'bg-slate-50/70 border-slate-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={prop.workerAvatar}
                        alt={prop.workerName}
                        className="w-8 h-8 rounded-full object-cover border border-slate-200"
                      />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-slate-900">
                            {prop.workerName}
                          </span>
                          <span className="flex items-center text-[10px] text-amber-500 font-bold">
                            <Star size={11} weight="fill" />
                            {prop.workerRating}
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-500 block">
                          {prop.estimatedTime} • {prop.createdAt}
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-sm font-extrabold text-slate-900">
                        €{prop.proposedPrice}
                      </span>
                      {prop.status === 'accepted' ? (
                        <span className="block text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full mt-0.5">
                          Bid Accepted
                        </span>
                      ) : null}
                    </div>
                  </div>

                  <p className="text-xs text-slate-700 mt-2 leading-relaxed bg-white/80 p-2 rounded-lg border border-slate-200/60">
                    "{prop.message}"
                  </p>

                  {/* Accept Bid Button for Customer */}
                  {job.status === 'open' && (currentUser.id === job.customerId || currentUser.role === 'customer') && (
                    <div className="mt-2.5 flex justify-end">
                      <button
                        onClick={() => acceptProposal(job.id, prop.id)}
                        className="px-3 py-1 text-xs font-bold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-all shadow-2xs"
                      >
                        Accept Proposal & Book
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </article>
  );
};
