import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';
import { X, LockKey, User, Briefcase, ShieldCheck } from '@phosphor-icons/react';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, switchRole, authModalTab, authModalRole } = useApp();
  const [tab, setTab] = useState<'signin' | 'register'>('signin');
  const [selectedRole, setSelectedRole] = useState<UserRole>('customer');

  useEffect(() => {
    if (isAuthModalOpen) {
      setTab(authModalTab || 'signin');
      setSelectedRole(authModalRole || 'customer');
    }
  }, [isAuthModalOpen, authModalTab, authModalRole]);

  if (!isAuthModalOpen) return null;

  const handleSimulateLogin = (role: UserRole) => {
    switchRole(role);
    closeAuthModal();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-900 text-lg">
              {tab === 'signin' ? 'Sign In to Account' : 'Join Local Service Finder'}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Secure local service marketplace for homes and trades
            </p>
          </div>
          <button
            onClick={closeAuthModal}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-slate-100">
          <button
            onClick={() => setTab('signin')}
            className={`flex-1 py-3 text-xs font-bold text-center border-b-2 transition-colors ${
              tab === 'signin'
                ? 'border-slate-900 text-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setTab('register')}
            className={`flex-1 py-3 text-xs font-bold text-center border-b-2 transition-colors ${
              tab === 'register'
                ? 'border-slate-900 text-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            Create Account
          </button>
        </div>

        <div className="p-6 space-y-4">
          {/* Quick Demo Role Shortcuts */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 block">
              1-Click Demo Profiles (For Jury & Testing)
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => handleSimulateLogin('customer')}
                className="p-2 rounded-xl bg-white border border-slate-200 text-slate-800 hover:bg-slate-100 transition-all text-center text-xs font-semibold shadow-2xs"
              >
                <User size={16} className="mx-auto text-slate-700 mb-0.5" />
                <span>Customer</span>
              </button>
              <button
                onClick={() => handleSimulateLogin('worker')}
                className="p-2 rounded-xl bg-white border border-slate-200 text-slate-800 hover:bg-slate-100 transition-all text-center text-xs font-semibold shadow-2xs"
              >
                <Briefcase size={16} className="mx-auto text-slate-700 mb-0.5" />
                <span>Worker Pro</span>
              </button>
              <button
                onClick={() => handleSimulateLogin('admin')}
                className="p-2 rounded-xl bg-white border border-slate-200 text-slate-800 hover:bg-slate-100 transition-all text-center text-xs font-semibold shadow-2xs"
              >
                <ShieldCheck size={16} className="mx-auto text-purple-600 mb-0.5" />
                <span>Admin</span>
              </button>
            </div>
          </div>

          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-slate-200"></div>
            <span className="flex-shrink mx-3 text-[11px] uppercase font-bold text-slate-400">
              or standard credentials
            </span>
            <div className="flex-grow border-t border-slate-200"></div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSimulateLogin(selectedRole);
            }}
            className="space-y-3"
          >
            {tab === 'register' && (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  I want to:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedRole('customer')}
                    className={`p-2.5 rounded-xl border text-xs font-bold text-center transition-all ${
                      selectedRole === 'customer'
                        ? 'border-slate-900 bg-slate-900 text-white'
                        : 'border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    Hire a Pro
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedRole('worker')}
                    className={`p-2.5 rounded-xl border text-xs font-bold text-center transition-all ${
                      selectedRole === 'worker'
                        ? 'border-slate-900 bg-slate-900 text-white'
                        : 'border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    Work as a Pro
                  </button>
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                defaultValue={selectedRole === 'worker' ? 'marcus.vance@proplumber.com' : 'alex.carter@home.com'}
                required
                className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Password
              </label>
              <input
                type="password"
                defaultValue="••••••••••••"
                required
                className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 text-xs font-bold rounded-xl bg-slate-900 hover:bg-slate-800 text-white transition-all shadow-sm active:scale-[0.98] mt-2"
            >
              {tab === 'signin' ? 'Sign In' : 'Complete Registration'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
