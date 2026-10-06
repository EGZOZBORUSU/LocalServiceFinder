import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Star, ThumbsUp } from '@phosphor-icons/react';

export const ReviewModal: React.FC = () => {
  const { isReviewModalOpen, closeReviewModal, reviewTargetBooking, addReviewToWorker } = useApp();

  const [rating, setRating] = useState<number>(5);
  const [quality, setQuality] = useState<number>(5);
  const [punctuality, setPunctuality] = useState<number>(5);
  const [communication, setCommunication] = useState<number>(5);
  const [comment, setComment] = useState('');

  if (!isReviewModalOpen || !reviewTargetBooking) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    addReviewToWorker(
      reviewTargetBooking.id,
      reviewTargetBooking.workerId,
      rating,
      comment.trim(),
      quality,
      punctuality,
      communication
    );

    setComment('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-900 text-base">
              Review {reviewTargetBooking.workerName}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Service: {reviewTargetBooking.serviceName}
            </p>
          </div>
          <button
            onClick={closeReviewModal}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Overall Rating Stars */}
          <div className="text-center py-2 bg-slate-50 rounded-2xl border border-slate-100">
            <span className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Overall Experience
            </span>
            <div className="flex justify-center gap-1.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  className="p-1 hover:scale-110 transition-transform"
                >
                  <Star
                    size={30}
                    weight={star <= rating ? 'fill' : 'regular'}
                    className={star <= rating ? 'text-amber-400' : 'text-slate-300'}
                  />
                </button>
              ))}
            </div>
            <span className="text-xs font-bold text-slate-800 mt-1 block">
              {rating === 5
                ? 'Excellent (5 / 5)'
                : rating === 4
                ? 'Very Good (4 / 5)'
                : rating === 3
                ? 'Average (3 / 5)'
                : 'Needs Improvement'}
            </span>
          </div>

          {/* Sub-ratings */}
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-600 font-medium">Workmanship & Quality</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button
                    type="button"
                    key={s}
                    onClick={() => setQuality(s)}
                    className={`w-6 h-6 rounded flex items-center justify-center font-bold ${
                      s <= quality ? 'bg-amber-400 text-slate-950' : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-600 font-medium">Punctuality & Speed</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button
                    type="button"
                    key={s}
                    onClick={() => setPunctuality(s)}
                    className={`w-6 h-6 rounded flex items-center justify-center font-bold ${
                      s <= punctuality ? 'bg-amber-400 text-slate-950' : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-600 font-medium">Communication & Polite</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button
                    type="button"
                    key={s}
                    onClick={() => setCommunication(s)}
                    className={`w-6 h-6 rounded flex items-center justify-center font-bold ${
                      s <= communication ? 'bg-amber-400 text-slate-950' : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Comment */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Your Written Review
            </label>
            <textarea
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
              className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white"
              placeholder="Tell other neighbors how the job went, punctuality, fair pricing..."
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={closeReviewModal}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold rounded-xl bg-slate-900 hover:bg-slate-800 text-white transition-all shadow-sm active:scale-[0.98]"
            >
              Post Verified Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
