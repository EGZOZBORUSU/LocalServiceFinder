import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Star,
  ShieldCheck,
  MapPin,
  Clock,
  Briefcase,
  CheckCircle,
  CalendarCheck,
  ArrowLeft,
  ChatCircleDots
} from '@phosphor-icons/react';

export const WorkerDetailView: React.FC = () => {
  const { workers, selectedWorkerId, navigateTo, openBookingModal } = useApp();

  const worker = workers.find((w) => w.id === selectedWorkerId) || workers[0];

  if (!worker) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <p className="text-slate-500">Worker profile not found.</p>
        <button
          onClick={() => navigateTo('workers')}
          className="mt-4 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold"
        >
          Back to Workers
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Back Button */}
      <button
        onClick={() => navigateTo('workers')}
        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors"
      >
        <ArrowLeft size={16} />
        <span>Back to All Workers</span>
      </button>

      {/* Profile Header Banner */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        {/* Cover Photo */}
        <div className="h-44 sm:h-56 w-full relative bg-slate-900 overflow-hidden">
          <img
            src={worker.coverUrl}
            alt="Cover background"
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>
        </div>

        {/* Profile Info Row */}
        <div className="px-6 pb-6 pt-0 relative flex flex-col sm:flex-row sm:items-end justify-between gap-6 -mt-16 sm:-mt-20">
          <div className="flex flex-col sm:flex-row sm:items-end gap-5">
            <div className="relative">
              <img
                src={worker.avatarUrl}
                alt={worker.fullName}
                className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl object-cover border-4 border-white shadow-lg bg-white"
              />
              {worker.availableToday && (
                <span
                  className="absolute bottom-1 right-1 w-5 h-5 bg-emerald-500 border-2 border-white rounded-full"
                  title="Available today"
                />
              )}
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
                  {worker.fullName}
                </h1>
                {worker.isVerified && (
                  <span
                    className="inline-flex items-center text-sky-600"
                    title="Verified Professional"
                  >
                    <ShieldCheck size={24} weight="fill" />
                  </span>
                )}
              </div>
              <p className="text-sm font-semibold text-slate-600">
                {worker.headline}
              </p>
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 pt-1">
                <span className="flex items-center gap-1 font-bold text-slate-900">
                  <Star size={14} weight="fill" className="text-amber-400" />
                  {worker.rating.toFixed(2)} ({worker.reviewCount} reviews)
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin size={13} className="text-slate-400" />
                  {worker.district}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Briefcase size={13} className="text-slate-400" />
                  {worker.experienceYears} Years Experience
                </span>
              </div>
            </div>
          </div>

          {/* Direct CTA */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => openBookingModal(worker)}
              className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-[0.98]"
            >
              Book Service Now
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Details & Sticky Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left 2 Cols: About, Services, Portfolio, Reviews */}
        <div className="lg:col-span-2 space-y-8">
          {/* About & Bio */}
          <section className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
            <h2 className="text-base font-bold uppercase tracking-wider text-slate-900">
              About the Professional
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {worker.bio}
            </p>

            <div>
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                Verified Skill Specialties
              </h3>
              <div className="flex flex-wrap gap-2">
                {worker.specialties.map((spec, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-semibold px-3 py-1 rounded-lg bg-slate-100 text-slate-700 border border-slate-200"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* Services & Pricing Catalog */}
          <section className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold uppercase tracking-wider text-slate-900">
                Service Packages & Tariffs
              </h2>
              <span className="text-xs text-slate-500 font-medium">
                Upfront transparent pricing
              </span>
            </div>

            <div className="divide-y divide-slate-100">
              {worker.services.map((svc) => (
                <div
                  key={svc.id}
                  className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-slate-900">
                      {svc.name}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed max-w-md">
                      {svc.description}
                    </p>
                    <span className="inline-block text-[11px] font-medium text-slate-400">
                      Est. Duration: {svc.estimatedDuration}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 shrink-0 sm:text-right">
                    <div>
                      <div className="text-base font-extrabold text-slate-900">
                        €{svc.price}
                      </div>
                      <span className="text-[10px] text-slate-400 capitalize block">
                        {svc.priceType} fee
                      </span>
                    </div>
                    <button
                      onClick={() => openBookingModal(worker)}
                      className="px-3.5 py-1.5 text-xs font-bold rounded-lg bg-slate-100 hover:bg-slate-900 hover:text-white text-slate-800 transition-colors"
                    >
                      Book This
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Portfolio Images */}
          {worker.portfolioImages && worker.portfolioImages.length > 0 && (
            <section className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
              <h2 className="text-base font-bold uppercase tracking-wider text-slate-900">
                Recent Completed Projects (Photos)
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {worker.portfolioImages.map((img, idx) => (
                  <div
                    key={idx}
                    className="group relative h-40 rounded-2xl overflow-hidden border border-slate-200 shadow-2xs"
                  >
                    <img
                      src={img}
                      alt="Past job sample"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Customer Reviews & Detailed Ratings */}
          <section className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-base font-bold uppercase tracking-wider text-slate-900">
                  Customer Ratings & Verified Feedback
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Based on {worker.reviews.length} authentic service experiences
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-slate-900 font-extrabold text-lg">
                <Star size={20} weight="fill" className="text-amber-400" />
                <span>{worker.rating.toFixed(2)}</span>
              </div>
            </div>

            {/* Sub-ratings Overview Bar */}
            <div className="grid grid-cols-3 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center">
              <div>
                <span className="text-[11px] font-bold uppercase text-slate-400 block mb-1">
                  Craftsmanship
                </span>
                <span className="text-sm font-extrabold text-slate-900">
                  5.0 / 5
                </span>
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase text-slate-400 block mb-1">
                  Punctuality
                </span>
                <span className="text-sm font-extrabold text-slate-900">
                  4.9 / 5
                </span>
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase text-slate-400 block mb-1">
                  Communication
                </span>
                <span className="text-sm font-extrabold text-slate-900">
                  5.0 / 5
                </span>
              </div>
            </div>

            {/* Individual Reviews */}
            <div className="space-y-4">
              {worker.reviews.length === 0 ? (
                <p className="text-xs text-slate-400 italic py-4">
                  No public reviews recorded yet for this profile.
                </p>
              ) : (
                worker.reviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={rev.customerAvatar}
                          alt={rev.customerName}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div>
                          <div className="text-xs font-bold text-slate-900">
                            {rev.customerName}
                          </div>
                          <span className="text-[10px] text-slate-400">
                            {rev.serviceName} • {rev.date}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-0.5 text-amber-400">
                        {Array.from({ length: rev.rating }).map((_, i) => (
                          <Star key={i} size={12} weight="fill" />
                        ))}
                      </div>
                    </div>

                    <p className="text-xs text-slate-700 leading-relaxed">
                      "{rev.comment}"
                    </p>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>

        {/* Right 1 Col: Sticky Booking Action Card */}
        <div className="lg:col-span-1 lg:sticky lg:top-24 space-y-4">
          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-lg space-y-5">
            <div className="flex items-baseline justify-between border-b border-slate-100 pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Standard Rate
              </span>
              <div>
                <span className="text-2xl font-extrabold text-slate-950">
                  €{worker.hourlyRate}
                </span>
                <span className="text-xs text-slate-500"> / hour</span>
              </div>
            </div>

            <div className="space-y-3 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-slate-400" />
                <span>Working: {worker.workingHours}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-slate-400" />
                <span>Service Radius: {worker.district}</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-700 font-semibold">
                <CalendarCheck size={16} />
                <span>
                  {worker.availableToday
                    ? 'Available for bookings today'
                    : 'Next available: Tomorrow'}
                </span>
              </div>
            </div>

            <button
              onClick={() => openBookingModal(worker)}
              className="w-full py-3.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-[0.98]"
            >
              Request Booking With {worker.fullName.split(' ')[0]}
            </button>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-2 text-[11px] text-slate-500">
              <div className="flex items-center gap-1.5 font-semibold text-slate-700">
                <ShieldCheck size={16} className="text-sky-600" />
                <span>Guaranteed Service Quality</span>
              </div>
              <p>
                All bookings through Local Service Finder include customer protection and verified dispute support.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
