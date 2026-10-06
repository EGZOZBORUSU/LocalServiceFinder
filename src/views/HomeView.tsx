import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { WorkerCard } from '../components/WorkerCard';
import {
  MagnifyingGlass,
  MapPin,
  ShieldCheck,
  Star,
  CheckCircle,
  ArrowRight,
  ChatsCircle,
  PlusCircle,
  Lightning,
  Sparkle,
  Wrench,
  PaintBrush,
  Hammer,
  Gear,
  User,
  Briefcase
} from '@phosphor-icons/react';

export const HomeView: React.FC = () => {
  const { workers, jobPosts, categories, navigateTo, openPostJobModal, currentUser, openAuthModal } = useApp();

  const [searchCategory, setSearchCategory] = useState('');
  const [searchDistrict, setSearchDistrict] = useState('');

  const featuredWorkers = workers.filter((w) => w.isVerified).slice(0, 3);
  const recentJobs = jobPosts.slice(0, 2);

  const iconMap: Record<string, React.ReactNode> = {
    Wrench: <Wrench size={24} weight="regular" className="text-slate-700" />,
    Lightning: <Lightning size={24} weight="regular" className="text-slate-700" />,
    Sparkle: <Sparkle size={24} weight="regular" className="text-slate-700" />,
    PaintBrush: <PaintBrush size={24} weight="regular" className="text-slate-700" />,
    Hammer: <Hammer size={24} weight="regular" className="text-slate-700" />,
    Gear: <Gear size={24} weight="regular" className="text-slate-700" />
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigateTo('workers');
  };

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-12 sm:pt-16 sm:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Value Prop */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-800 text-xs font-bold tracking-wide">
                <ShieldCheck size={16} weight="fill" className="text-slate-700" />
                <span>Verified Independent Service Professionals</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-950 tracking-tight leading-[1.08]">
                Find trusted local workers near you.
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                Compare verified ratings, transparent upfront rates, and book certified plumbers, electricians, and cleaners in minutes.
              </p>

              {/* Integrated Search Bar */}
              <form
                onSubmit={handleSearchSubmit}
                className="p-2 sm:p-2.5 rounded-2xl bg-white border border-slate-300/80 shadow-lg shadow-slate-200/50 flex flex-col sm:flex-row gap-2 max-w-2xl"
              >
                <div className="flex-1 flex items-center gap-2.5 px-3 py-2 border-b sm:border-b-0 sm:border-r border-slate-200">
                  <MagnifyingGlass size={18} className="text-slate-400 shrink-0" />
                  <input
                    type="text"
                    value={searchCategory}
                    onChange={(e) => setSearchCategory(e.target.value)}
                    placeholder="Service needed (e.g. Plumber, Painter)..."
                    className="w-full text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none bg-transparent"
                  />
                </div>

                <div className="flex-1 flex items-center gap-2.5 px-3 py-2 border-b sm:border-b-0 border-slate-200">
                  <MapPin size={18} className="text-slate-400 shrink-0" />
                  <select
                    value={searchDistrict}
                    onChange={(e) => setSearchDistrict(e.target.value)}
                    className="w-full text-xs sm:text-sm text-slate-700 focus:outline-none bg-transparent"
                  >
                    <option value="">All Riga Districts</option>
                    <option value="Centrs">Centrs (City Centre)</option>
                    <option value="Vecrīga">Vecrīga (Old Town)</option>
                    <option value="Teika">Teika</option>
                    <option value="Āgenskalns">Āgenskalns</option>
                    <option value="Purvciems">Purvciems</option>
                    <option value="Imanta">Imanta</option>
                    <option value="Pļavnieki">Pļavnieki</option>
                    <option value="Mežaparks">Mežaparks</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm transition-all shadow-sm active:scale-[0.98] shrink-0"
                >
                  Search Pros
                </button>
              </form>

              {/* Guest Quick Auth Banner */}
              {currentUser.role === 'guest' && (
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm max-w-2xl">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800 shrink-0">
                      <User size={18} weight="bold" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 leading-tight">
                        Browsing as Guest Visitor
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Sign in or register an account to book verified pros and post repair requests in Riga.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={() => openAuthModal('signin')}
                      className="flex-1 sm:flex-initial px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-950 hover:bg-slate-100 rounded-xl transition-colors text-center"
                    >
                      Sign In
                    </button>
                    <button
                      type="button"
                      onClick={() => openAuthModal('register', 'customer')}
                      className="flex-1 sm:flex-initial px-4 py-1.5 text-xs font-bold rounded-xl bg-slate-900 hover:bg-slate-800 text-white transition-all shadow-2xs text-center"
                    >
                      Create Account
                    </button>
                  </div>
                </div>
              )}

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-slate-500 font-medium">
                <span className="flex items-center gap-1.5">
                  <CheckCircle size={15} weight="fill" className="text-slate-700" />
                  Background & Skill Verified
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle size={15} weight="fill" className="text-slate-700" />
                  Direct Transparent Pricing
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle size={15} weight="fill" className="text-slate-700" />
                  Verified Customer Reviews
                </span>
              </div>
            </div>

            {/* Right Column: Hero Visual Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200 bg-slate-900">
                <img
                  src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80"
                  alt="Professional tradesperson at work"
                  className="w-full h-80 sm:h-96 object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>

                {/* Floating Social Proof Card */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/80 shadow-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
                      Top Rated Professional
                    </span>
                    <span className="flex items-center gap-1 text-xs font-bold text-slate-900">
                      <Star size={13} weight="fill" className="text-amber-500" />
                      4.96 Rating
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-slate-800">
                    "Marcus repaired our main bathroom pipe in 45 minutes with transparent flat pricing."
                  </p>
                  <div className="text-[11px] text-slate-500">
                    Verified Homeowner Review, Centrs, Rīga
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Grid Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
              Popular Service Categories
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Select an area of expertise to connect with local certified workers.
            </p>
          </div>
          <button
            onClick={() => navigateTo('workers')}
            className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-slate-900 hover:text-slate-700 transition-colors"
          >
            <span>View All Categories</span>
            <ArrowRight size={14} weight="bold" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => navigateTo('workers')}
              className="group p-5 rounded-2xl bg-white border border-slate-200/80 hover:border-slate-300 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between text-center"
            >
              <div className="w-12 h-12 mx-auto rounded-xl bg-slate-50 group-hover:bg-slate-100 flex items-center justify-center transition-colors mb-3">
                {iconMap[cat.iconName] || <Wrench size={24} className="text-slate-700" />}
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-slate-700 transition-colors">
                  {cat.name}
                </h3>
                <span className="text-[11px] text-slate-400 mt-0.5 block">
                  {cat.workerCount} verified pros
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Community Job Board Section (Refined Dark Architecture, Zero Neon) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-10 rounded-3xl bg-slate-900 border border-slate-800 text-white shadow-xl relative overflow-hidden">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-8">
            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-300 bg-slate-800/90 px-3 py-1 rounded-full border border-slate-700">
                Community Reverse Marketplace
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                Can't find an exact match? Post your job request.
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
                Describe the household issue, state your budget, and let nearby certified plumbers and electricians submit competitive bids.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={openPostJobModal}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-sm active:scale-[0.98]"
              >
                <PlusCircle size={18} weight="bold" />
                <span>Post Job Request</span>
              </button>
              <button
                onClick={() => navigateTo('community')}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 font-semibold text-xs sm:text-sm border border-slate-700 transition-all"
              >
                <ChatsCircle size={18} />
                <span>Explore Board</span>
              </button>
            </div>
          </div>

          {/* Sample Community Posts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recentJobs.map((job) => (
              <div
                key={job.id}
                className="p-5 rounded-2xl bg-slate-800/60 border border-slate-700/80 text-left space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-slate-700/70 text-slate-200 border border-slate-600/60">
                    {job.category}
                  </span>
                  <span className="text-xs text-slate-400">{job.district}</span>
                </div>
                <h4 className="font-bold text-white text-sm line-clamp-1">
                  {job.title}
                </h4>
                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                  {job.description}
                </p>
                <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-700/60">
                  <span className="font-extrabold text-white">
                    Budget: €{job.budgetMin} - €{job.budgetMax}
                  </span>
                  <span className="text-slate-400">
                    {job.proposals.length} bids submitted
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Verified Workers Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
              Top Rated Verified Workers
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Experienced tradespeople with proven track records and customer satisfaction.
            </p>
          </div>
          <button
            onClick={() => navigateTo('workers')}
            className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-slate-900 hover:text-slate-700 transition-colors"
          >
            <span>See All Workers</span>
            <ArrowRight size={14} weight="bold" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredWorkers.map((worker) => (
            <WorkerCard key={worker.id} worker={worker} />
          ))}
        </div>
      </section>

      {/* How Platform Works Infographic */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-100/70 border border-slate-200/80">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Simple 3-Step Process
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight mt-1">
              How Local Service Finder Works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center sm:text-left">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-slate-900 text-white font-extrabold flex items-center justify-center text-sm shadow-sm mx-auto sm:mx-0">
                1
              </div>
              <h3 className="font-bold text-slate-900 text-base">
                Search or Post a Request
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Filter workers by skill, district, and verified rating, or publish an open request to the community job feed.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-slate-900 text-white font-extrabold flex items-center justify-center text-sm shadow-sm mx-auto sm:mx-0">
                2
              </div>
              <h3 className="font-bold text-slate-900 text-base">
                Compare Prices & Book
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Review transparent hourly rates or fixed quotes. Check real customer feedback and book an arrival window.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-slate-900 text-white font-extrabold flex items-center justify-center text-sm shadow-sm mx-auto sm:mx-0">
                3
              </div>
              <h3 className="font-bold text-slate-900 text-base">
                Job Done & Rate Experience
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Work is carried out safely. Rate punctuality, craftsmanship, and communication to help the neighborhood.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Join Platform / Auth Section for Riga */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-b from-slate-50 to-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-sm space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
              Get Started in Riga
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
              Ready to fix your home or grow your client base?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Join homeowners and verified independent specialists across Riga. Create a free account or sign in to get started.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1: For Homeowners */}
            <div className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex flex-col justify-between space-y-5">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center font-bold">
                  <User size={24} weight="bold" />
                </div>
                <h3 className="text-lg font-bold text-slate-950">
                  For Homeowners & Residents
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Have a leak, broken circuit, or need furniture assembly? Post a free repair request and receive transparent price bids from certified pros in your district.
                </p>
                <ul className="text-xs text-slate-600 space-y-2 pt-1 font-medium">
                  <li className="flex items-center gap-2">
                    <CheckCircle size={15} weight="fill" className="text-emerald-600 shrink-0" />
                    <span>Free community job posting with upfront budget control</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={15} weight="fill" className="text-emerald-600 shrink-0" />
                    <span>Direct booking with vetted electricians, plumbers, and handymen</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={15} weight="fill" className="text-emerald-600 shrink-0" />
                    <span>Verified customer reviews and transparent Euro pricing</span>
                  </li>
                </ul>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => openAuthModal('register', 'customer')}
                  className="flex-1 py-2.5 px-4 text-xs font-bold rounded-xl bg-slate-900 hover:bg-slate-800 text-white transition-all shadow-sm text-center"
                >
                  Create Homeowner Account
                </button>
                <button
                  type="button"
                  onClick={() => openAuthModal('signin')}
                  className="py-2.5 px-4 text-xs font-semibold text-slate-700 hover:text-slate-950 hover:bg-slate-100 rounded-xl transition-colors text-center"
                >
                  Sign In
                </button>
              </div>
            </div>

            {/* Card 2: For Service Pros */}
            <div className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex flex-col justify-between space-y-5">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                  <Briefcase size={24} weight="bold" />
                </div>
                <h3 className="text-lg font-bold text-slate-950">
                  For Service Professionals
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Are you an independent tradesperson in Riga? List your services, showcase your verified certifications, and get immediate access to homeowner repair leads.
                </p>
                <ul className="text-xs text-slate-600 space-y-2 pt-1 font-medium">
                  <li className="flex items-center gap-2">
                    <CheckCircle size={15} weight="fill" className="text-emerald-600 shrink-0" />
                    <span>Receive live repair leads filtered by your Riga district</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={15} weight="fill" className="text-emerald-600 shrink-0" />
                    <span>Zero lead fee commission: keep 100% of your labor earnings</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={15} weight="fill" className="text-emerald-600 shrink-0" />
                    <span>Admin verification badge to build neighborhood trust</span>
                  </li>
                </ul>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => openAuthModal('register', 'worker')}
                  className="flex-1 py-2.5 px-4 text-xs font-bold rounded-xl bg-slate-900 hover:bg-slate-800 text-white transition-all shadow-sm text-center"
                >
                  Register as a Service Pro
                </button>
                <button
                  type="button"
                  onClick={() => openAuthModal('signin')}
                  className="py-2.5 px-4 text-xs font-semibold text-slate-700 hover:text-slate-950 hover:bg-slate-100 rounded-xl transition-colors text-center"
                >
                  Pro Sign In
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
