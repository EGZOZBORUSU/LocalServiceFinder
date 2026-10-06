import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldCheck,
  CheckCircle,
  XCircle,
  WarningOctagon,
  Users,
  FolderSimple,
  Star,
  Check
} from '@phosphor-icons/react';

export const AdminView: React.FC = () => {
  const { workers, verifyWorker, categories } = useApp();

  const [adminTab, setAdminTab] = useState<'verifications' | 'categories' | 'reports'>('verifications');

  const pendingWorkers = workers.filter((w) => !w.isVerified || w.verificationStatus === 'pending');
  const verifiedWorkers = workers.filter((w) => w.isVerified);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="border-b border-slate-200 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-200 mb-2">
            <ShieldCheck size={14} weight="fill" />
            <span>Platform Governance</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-950 tracking-tight">
            Admin Moderation Portal
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Enforce trust, approve worker identity credentials, and eliminate spam or fake profiles.
          </p>
        </div>

        <div className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-purple-100 text-purple-900 border border-purple-200">
          Admin: Eren Ozkan (MORPH)
        </div>
      </div>

      {/* Admin Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Verification Queue
          </span>
          <span className="text-2xl font-extrabold text-amber-600">
            {pendingWorkers.length} Pending
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Active Verified Pros
          </span>
          <span className="text-2xl font-extrabold text-slate-950">
            {verifiedWorkers.length} Active
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Service Categories
          </span>
          <span className="text-2xl font-extrabold text-slate-950">
            {categories.length} Categories
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200 flex gap-6">
        <button
          onClick={() => setAdminTab('verifications')}
          className={`pb-3 text-xs sm:text-sm font-bold border-b-2 transition-colors ${
            adminTab === 'verifications'
              ? 'border-slate-900 text-slate-900'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          Worker Verification Queue ({pendingWorkers.length})
        </button>

        <button
          onClick={() => setAdminTab('categories')}
          className={`pb-3 text-xs sm:text-sm font-bold border-b-2 transition-colors ${
            adminTab === 'categories'
              ? 'border-slate-900 text-slate-900'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          Category Management
        </button>

        <button
          onClick={() => setAdminTab('reports')}
          className={`pb-3 text-xs sm:text-sm font-bold border-b-2 transition-colors ${
            adminTab === 'reports'
              ? 'border-slate-900 text-slate-900'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          Safety & Spam Reports
        </button>
      </div>

      {/* Tab 1: Verification Queue */}
      {adminTab === 'verifications' && (
        <div className="space-y-4">
          {pendingWorkers.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-2">
              <CheckCircle size={36} className="mx-auto text-emerald-500" weight="fill" />
              <h3 className="font-bold text-slate-900 text-base">
                All verification requests resolved
              </h3>
              <p className="text-xs text-slate-500">
                No new trade licenses or certifications currently awaiting inspection.
              </p>
            </div>
          ) : (
            pendingWorkers.map((w) => (
              <div
                key={w.id}
                className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="flex items-start gap-4">
                  <img
                    src={w.avatarUrl}
                    alt={w.fullName}
                    className="w-14 h-14 rounded-2xl object-cover border border-slate-200 shrink-0"
                  />
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-slate-900 text-base">
                        {w.fullName}
                      </h4>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                        Pending ID Check
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 font-medium">
                      Category: {w.category} • Location: {w.district}
                    </p>

                    <p className="text-xs text-slate-500 max-w-xl">
                      Bio: "{w.bio}"
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => verifyWorker(w.id, true)}
                    className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-2xs transition-all"
                  >
                    <Check size={14} weight="bold" />
                    <span>Approve & Grant Badge</span>
                  </button>
                  <button
                    onClick={() => verifyWorker(w.id, false)}
                    className="px-3.5 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                  >
                    Decline
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 2: Category Management */}
      {adminTab === 'categories' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900">
            Active System Taxonomies
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((c) => (
              <div
                key={c.id}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between"
              >
                <div>
                  <h4 className="font-bold text-sm text-slate-900">{c.name}</h4>
                  <p className="text-xs text-slate-500">{c.workerCount} Registered Pros</p>
                </div>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                  Active
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Safety & Reports */}
      {adminTab === 'reports' && (
        <div className="p-8 text-center bg-white rounded-3xl border border-slate-200 space-y-3">
          <ShieldCheck size={36} className="mx-auto text-emerald-500" />
          <h3 className="font-bold text-slate-900 text-base">
            No Flagged Incidents
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            All reviews and community job requests are within acceptable neighborhood community guidelines.
          </p>
        </div>
      )}
    </div>
  );
};
