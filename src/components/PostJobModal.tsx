import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, PlusCircle, Warning, Tag, MapPin, CurrencyDollar, Camera } from '@phosphor-icons/react';

export const PostJobModal: React.FC = () => {
  const { isPostJobModalOpen, closePostJobModal, createJobPost, categories } = useApp();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(categories[0]?.name || 'Plumbing');
  const [district, setDistrict] = useState('Centrs');
  const [urgency, setUrgency] = useState<'urgent' | 'this_week' | 'flexible'>('urgent');
  const [budgetMin, setBudgetMin] = useState(60);
  const [budgetMax, setBudgetMax] = useState(120);
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  if (!isPostJobModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    createJobPost({
      title: title.trim(),
      category,
      district,
      urgency,
      budgetMin: Number(budgetMin),
      budgetMax: Number(budgetMax),
      description: description.trim(),
      images: imageUrl.trim() ? [imageUrl.trim()] : []
    });

    setTitle('');
    setDescription('');
    setImageUrl('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-900 text-lg leading-tight">
              Post a Job to Community Feed
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Describe your need. Certified local pros will review and submit competitive price quotes.
            </p>
          </div>
          <button
            onClick={closePostJobModal}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Job Headline / Summary
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white"
              placeholder="e.g. Bathroom sink water leak or 3 IKEA chairs assembly"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-slate-900"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                District / Location
              </label>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-slate-900"
              >
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
          </div>

          {/* Urgency Radio Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Urgency Level
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { value: 'urgent', label: 'Emergency', sub: 'Today' },
                { value: 'this_week', label: 'Soon', sub: 'Within 48h' },
                { value: 'flexible', label: 'Flexible', sub: 'Next 7 days' }
              ].map((opt) => (
                <button
                  type="button"
                  key={opt.value}
                  onClick={() => setUrgency(opt.value as any)}
                  className={`p-2 rounded-xl border text-center transition-all ${
                    urgency === opt.value
                      ? 'border-slate-900 bg-slate-900 text-white shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                  }`}
                >
                  <div className="text-xs font-bold leading-tight">{opt.label}</div>
                  <div className="text-[10px] opacity-75">{opt.sub}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Budget Range */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Estimated Budget (€ EUR)
            </label>
            <div className="flex items-center gap-3">
              <div className="flex-1 relative">
                <span className="absolute left-3 top-2.5 text-xs text-slate-400">€</span>
                <input
                  type="number"
                  min="20"
                  value={budgetMin}
                  onChange={(e) => setBudgetMin(Number(e.target.value))}
                  className="w-full text-xs p-2.5 pl-6 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white"
                  placeholder="Min"
                />
              </div>
              <span className="text-xs text-slate-400 font-bold">to</span>
              <div className="flex-1 relative">
                <span className="absolute left-3 top-2.5 text-xs text-slate-400">€</span>
                <input
                  type="number"
                  min="30"
                  value={budgetMax}
                  onChange={(e) => setBudgetMax(Number(e.target.value))}
                  className="w-full text-xs p-2.5 pl-6 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white"
                  placeholder="Max"
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Problem Description & Details
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white"
              placeholder="What seems to be broken? Is water/power shut off? Any special tools required?..."
            />
          </div>

          {/* Optional Image */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1 flex items-center gap-1">
              <Camera size={13} />
              <span>Issue Photo URL (Optional)</span>
            </label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white"
              placeholder="https://images.unsplash.com/..."
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={closePostJobModal}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 text-xs font-bold rounded-xl bg-slate-900 hover:bg-slate-800 text-white transition-all shadow-sm active:scale-[0.98]"
            >
              Publish Job Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
