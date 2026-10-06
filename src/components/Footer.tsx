import React from 'react';
import { useApp } from '../context/AppContext';
import { Wrench, ShieldCheck, Heart } from '@phosphor-icons/react';

export const Footer: React.FC = () => {
  const { navigateTo, categories } = useApp();

  return (
    <footer className="bg-slate-900 text-slate-400 text-sm mt-24 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand & Purpose */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5 text-white">
              <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 text-white flex items-center justify-center font-bold">
                <Wrench size={18} weight="bold" />
              </div>
              <span className="font-extrabold text-base tracking-tight">
                Local Service Finder
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Bridging homeowners and reliable certified service professionals for plumbing, electrical, cleaning, and home improvements.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Platform Active & Operational
            </div>
          </div>

          {/* Service Categories */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Popular Services
            </h4>
            <ul className="space-y-2.5 text-xs">
              {categories.slice(0, 5).map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => navigateTo('workers')}
                    className="hover:text-white transition-colors text-left"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Platform Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => navigateTo('workers')}
                  className="hover:text-white transition-colors"
                >
                  Browse Verified Workers
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('community')}
                  className="hover:text-white transition-colors"
                >
                  Live Community Job Board
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('home')}
                  className="hover:text-white transition-colors"
                >
                  How Verification Works
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('admin')}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <ShieldCheck size={14} />
                  <span>Admin Moderation</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Academic Team Credits */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Project Specification
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Developed by <strong className="text-slate-200">Team MORPH</strong> as part of the Riga Technical University (RTU) software engineering curriculum.
            </p>
            <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60 text-[11px] text-slate-300">
              <span className="font-semibold text-slate-200 block mb-1">
                7-Member Agile Project
              </span>
              Front-End interface ready for C# ASP.NET Core REST API connection.
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 Local Service Finder. Team MORPH. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart size={14} className="text-rose-500" weight="fill" />
            <span>for community homeowners and trade workers</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
