import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';
import {
  Wrench,
  MagnifyingGlass,
  ChatsCircle,
  PlusCircle,
  User,
  ShieldCheck,
  List,
  X,
  CaretDown,
  Briefcase
} from '@phosphor-icons/react';

export const Navbar: React.FC = () => {
  const {
    currentUser,
    switchRole,
    currentView,
    navigateTo,
    jobPosts,
    openPostJobModal,
    openAuthModal
  } = useApp();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);

  const openJobsCount = jobPosts.filter((j) => j.status === 'open').length;

  const roleLabels: Record<UserRole, { label: string; badge: string; color: string }> = {
    guest: { label: 'Guest', badge: 'Visitor', color: 'bg-slate-100 text-slate-700' },
    customer: { label: 'Customer', badge: 'Homeowner', color: 'bg-sky-100 text-sky-800' },
    worker: { label: 'Service Pro', badge: 'Technician', color: 'bg-emerald-100 text-emerald-800' },
    admin: { label: 'Admin', badge: 'Moderator', color: 'bg-purple-100 text-purple-800' }
  };

  const handleRoleChange = (role: UserRole) => {
    switchRole(role);
    setIsRoleDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Brand Logo */}
          <div
            className="flex items-center gap-3 cursor-pointer select-none"
            onClick={() => navigateTo('home')}
          >
            <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-sm">
              <Wrench size={22} weight="bold" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-slate-900 tracking-tight text-lg">
                  Local Service Finder
                </span>
                <span className="hidden sm:inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                  MORPH
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium hidden sm:block">
                Trusted Local Pros & Community Board
              </p>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <button
              onClick={() => navigateTo('home')}
              className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${
                currentView === 'home'
                  ? 'text-slate-950 bg-slate-100'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => navigateTo('workers')}
              className={`flex items-center gap-1.5 px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${
                currentView === 'workers' || currentView === 'worker-detail'
                  ? 'text-slate-950 bg-slate-100'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <MagnifyingGlass size={16} weight="bold" />
              <span>Find Workers</span>
            </button>

            <button
              onClick={() => navigateTo('community')}
              className={`flex items-center gap-2 px-3 py-2 text-sm font-semibold rounded-lg transition-colors relative ${
                currentView === 'community'
                  ? 'text-slate-950 bg-slate-100'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <ChatsCircle size={16} weight="bold" />
              <span>Job Feed</span>
              {openJobsCount > 0 && (
                <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-slate-800 text-white leading-none">
                  {openJobsCount}
                </span>
              )}
            </button>

            {currentUser.role === 'customer' && (
              <button
                onClick={() => navigateTo('customer-dashboard')}
                className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${
                  currentView === 'customer-dashboard'
                    ? 'text-slate-950 bg-slate-100'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                My Bookings
              </button>
            )}

            {currentUser.role === 'worker' && (
              <button
                onClick={() => navigateTo('worker-dashboard')}
                className={`flex items-center gap-1.5 px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${
                  currentView === 'worker-dashboard'
                    ? 'text-emerald-900 bg-emerald-50'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Briefcase size={16} weight="bold" />
                <span>Pro Workspace</span>
              </button>
            )}

            {currentUser.role === 'admin' && (
              <button
                onClick={() => navigateTo('admin')}
                className={`flex items-center gap-1.5 px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${
                  currentView === 'admin'
                    ? 'text-purple-900 bg-purple-50'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <ShieldCheck size={16} weight="bold" />
                <span>Admin Panel</span>
              </button>
            )}
          </nav>

          {/* Right Header Actions */}
          <div className="hidden md:flex items-center gap-3">
            {currentUser.role === 'guest' && (
              <div className="flex items-center gap-1.5 border-r border-slate-200 pr-3 mr-1">
                <button
                  onClick={() => openAuthModal('signin')}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-950 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  Sign In
                </button>
                <button
                  onClick={() => openAuthModal('register', 'customer')}
                  className="px-3 py-1.5 text-xs font-bold text-slate-900 border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors"
                >
                  Register
                </button>
              </div>
            )}

            {/* Primary Action Button: Post a Job */}
            <button
              onClick={openPostJobModal}
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition-all shadow-sm active:scale-[0.98]"
            >
              <PlusCircle size={18} weight="bold" />
              <span>Post a Job</span>
            </button>

            {/* Presentation Role Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                className="flex items-center gap-2 p-1.5 pr-2.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-white transition-all text-left shadow-2xs"
                title="Switch role for demo presentation"
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-7 h-7 rounded-lg object-cover"
                />
                <div className="hidden lg:block">
                  <div className="text-xs font-bold text-slate-900 truncate max-w-[100px]">
                    {currentUser.name}
                  </div>
                  <span
                    className={`inline-block text-[10px] font-semibold px-1.5 py-0.2 rounded ${
                      roleLabels[currentUser.role].color
                    }`}
                  >
                    {roleLabels[currentUser.role].label}
                  </span>
                </div>
                <CaretDown size={14} className="text-slate-400" />
              </button>

              {/* Role Switcher Menu */}
              {isRoleDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                  <div className="px-3 py-1.5 border-b border-slate-100">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                      Live Demo Role Switcher
                    </p>
                    <p className="text-xs text-slate-500">
                      Change perspective with 1 click
                    </p>
                  </div>

                  <div className="py-1">
                    <button
                      onClick={() => handleRoleChange('customer')}
                      className={`w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-left transition-colors ${
                        currentUser.role === 'customer'
                          ? 'bg-sky-50 text-sky-900'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span>Customer (Alex Carter)</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-sky-100 text-sky-800">
                        Client
                      </span>
                    </button>

                    <button
                      onClick={() => handleRoleChange('worker')}
                      className={`w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-left transition-colors ${
                        currentUser.role === 'worker'
                          ? 'bg-emerald-50 text-emerald-900'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span>Worker Pro (Marcus Vance)</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                        Plumber
                      </span>
                    </button>

                    <button
                      onClick={() => handleRoleChange('admin')}
                      className={`w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-left transition-colors ${
                        currentUser.role === 'admin'
                          ? 'bg-purple-50 text-purple-900'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span>System Admin (Eren - MORPH)</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-100 text-purple-800">
                        Admin
                      </span>
                    </button>

                    <button
                      onClick={() => handleRoleChange('guest')}
                      className={`w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-left transition-colors ${
                        currentUser.role === 'guest'
                          ? 'bg-slate-100 text-slate-900'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span>Unauthenticated Guest</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">
                        Public
                      </span>
                    </button>
                  </div>

                  <div className="pt-1 border-t border-slate-100">
                    <button
                      onClick={() => {
                        setIsRoleDropdownOpen(false);
                        openAuthModal();
                      }}
                      className="w-full text-left px-3 py-1.5 text-xs text-slate-500 hover:text-slate-900"
                    >
                      Authentication Dialog
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <List size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200 space-y-3">
            {currentUser.role === 'guest' && (
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2 mb-2">
                <p className="text-xs font-bold text-slate-900">
                  Guest Visitor
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      openAuthModal('signin');
                    }}
                    className="flex-1 py-1.5 px-3 bg-white border border-slate-200 text-slate-800 text-xs font-semibold rounded-lg text-center"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      openAuthModal('register', 'customer');
                    }}
                    className="flex-1 py-1.5 px-3 bg-slate-900 text-white text-xs font-bold rounded-lg text-center"
                  >
                    Register
                  </button>
                </div>
              </div>
            )}
            <button
              onClick={() => {
                navigateTo('home');
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 rounded-lg"
            >
              Home
            </button>
            <button
              onClick={() => {
                navigateTo('workers');
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 rounded-lg"
            >
              Find Workers
            </button>
            <button
              onClick={() => {
                navigateTo('community');
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 rounded-lg flex items-center justify-between"
            >
              <span>Community Job Feed</span>
              {openJobsCount > 0 && (
                <span className="px-2 py-0.5 text-xs rounded-full bg-slate-800 text-white">
                  {openJobsCount}
                </span>
              )}
            </button>

            {currentUser.role === 'customer' && (
              <button
                onClick={() => {
                  navigateTo('customer-dashboard');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 rounded-lg"
              >
                My Bookings & Requests
              </button>
            )}

            {currentUser.role === 'worker' && (
              <button
                onClick={() => {
                  navigateTo('worker-dashboard');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-sm font-semibold text-emerald-800 bg-emerald-50 rounded-lg"
              >
                Worker Pro Workspace
              </button>
            )}

            {currentUser.role === 'admin' && (
              <button
                onClick={() => {
                  navigateTo('admin');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-sm font-semibold text-purple-800 bg-purple-50 rounded-lg"
              >
                Admin Panel
              </button>
            )}

            <div className="pt-2 border-t border-slate-100">
              <button
                onClick={() => {
                  openPostJobModal();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-900 text-white rounded-xl font-semibold text-sm"
              >
                <PlusCircle size={18} weight="bold" />
                <span>Post a Job Request</span>
              </button>
            </div>

            <div className="pt-2 border-t border-slate-100">
              <p className="text-xs font-semibold text-slate-400 px-3 uppercase tracking-wider mb-2">
                Simulate Demo Role
              </p>
              <div className="grid grid-cols-2 gap-2 px-1">
                {(['customer', 'worker', 'admin', 'guest'] as UserRole[]).map((r) => (
                  <button
                    key={r}
                    onClick={() => handleRoleChange(r)}
                    className={`py-1.5 px-2.5 text-xs font-semibold rounded-lg border text-center capitalize ${
                      currentUser.role === r
                        ? 'border-slate-900 bg-slate-900 text-white'
                        : 'border-slate-200 text-slate-700'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
