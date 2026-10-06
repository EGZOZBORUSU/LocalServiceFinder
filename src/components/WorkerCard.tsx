import React from 'react';
import { WorkerProfile } from '../types';
import { useApp } from '../context/AppContext';
import {
  Star,
  ShieldCheck,
  MapPin,
  Clock,
  CheckCircle,
  Briefcase
} from '@phosphor-icons/react';

interface WorkerCardProps {
  worker: WorkerProfile;
}

export const WorkerCard: React.FC<WorkerCardProps> = ({ worker }) => {
  const { navigateTo, openBookingModal } = useApp();

  return (
    <div className="group bg-white rounded-2xl border border-slate-200/90 hover:border-slate-300 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden">
      {/* Top Banner / Card Body */}
      <div className="p-5 sm:p-6 space-y-4">
        {/* Profile Header */}
        <div className="flex items-start gap-4">
          <div className="relative shrink-0">
            <img
              src={worker.avatarUrl}
              alt={worker.fullName}
              className="w-16 h-16 rounded-xl object-cover border border-slate-100 shadow-2xs"
            />
            {worker.availableToday && (
              <span
                className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"
                title="Available today for immediate bookings"
              />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <h3
                onClick={() => navigateTo('worker-detail', worker.id)}
                className="font-bold text-slate-900 hover:text-indigo-600 transition-colors cursor-pointer text-base leading-snug truncate"
              >
                {worker.fullName}
              </h3>
              {worker.isVerified && (
                <span
                  className="inline-flex items-center text-sky-600"
                  title="Identity and skill verified by Admin"
                >
                  <ShieldCheck size={18} weight="fill" />
                </span>
              )}
            </div>

            <p className="text-xs text-slate-500 font-medium truncate mt-0.5">
              {worker.headline}
            </p>

            {/* Location & Experience Row */}
            <div className="flex items-center gap-3 text-xs text-slate-500 mt-2">
              <span className="inline-flex items-center gap-1">
                <MapPin size={13} className="text-slate-400" />
                <span>{worker.district}</span>
              </span>
              <span>•</span>
              <span className="inline-flex items-center gap-1">
                <Briefcase size={13} className="text-slate-400" />
                <span>{worker.experienceYears} yrs exp</span>
              </span>
            </div>
          </div>
        </div>

        {/* Bio Excerpt */}
        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
          {worker.bio}
        </p>

        {/* Specialties Tags */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {worker.specialties.slice(0, 3).map((spec, idx) => (
            <span
              key={idx}
              className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-700"
            >
              {spec}
            </span>
          ))}
          {worker.specialties.length > 3 && (
            <span className="text-[11px] font-medium px-1.5 py-0.5 rounded-md text-slate-400">
              +{worker.specialties.length - 3} more
            </span>
          )}
        </div>
      </div>

      {/* Card Footer: Rating, Pricing & Actions */}
      <div className="px-5 sm:px-6 py-4 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-1 text-slate-900">
            <Star size={15} weight="fill" className="text-amber-400" />
            <span className="font-bold text-sm">{worker.rating.toFixed(2)}</span>
            <span className="text-xs text-slate-400">({worker.reviewCount})</span>
          </div>
          <div className="text-xs text-slate-500 mt-0.5">
            <strong className="text-slate-900 text-sm font-extrabold">€{worker.hourlyRate}</strong>
            <span className="text-[11px]">/hr base</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigateTo('worker-detail', worker.id)}
            className="px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-200/60 rounded-lg transition-colors"
          >
            Profile
          </button>
          <button
            onClick={() => openBookingModal(worker)}
            className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-slate-900 hover:bg-slate-800 text-white transition-all shadow-2xs active:scale-[0.98]"
          >
            Book Pro
          </button>
        </div>
      </div>
    </div>
  );
};
