import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  CalendarBlank,
  Clock,
  MapPin,
  CheckCircle,
  CurrencyDollar,
  ShieldCheck,
  Star
} from '@phosphor-icons/react';

export const BookingModal: React.FC = () => {
  const { isBookingModalOpen, closeBookingModal, bookingTargetWorker, createBooking } = useApp();

  const [selectedServiceId, setSelectedServiceId] = useState<string>('');
  const [date, setDate] = useState('Tomorrow, Oct 7');
  const [timeSlot, setTimeSlot] = useState('10:00 - 12:00');
  const [address, setAddress] = useState('Dzirnavu iela 67, Apt 3B, Centrs, Rīga');
  const [notes, setNotes] = useState('');

  if (!isBookingModalOpen || !bookingTargetWorker) return null;

  const currentService = bookingTargetWorker.services.find((s) => s.id === selectedServiceId) || bookingTargetWorker.services[0];
  const price = currentService ? currentService.price : bookingTargetWorker.hourlyRate * 2;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createBooking(
      bookingTargetWorker.id,
      currentService ? currentService.name : 'General Home Service',
      date,
      timeSlot,
      address,
      notes,
      price
    );
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={bookingTargetWorker.avatarUrl}
              alt={bookingTargetWorker.fullName}
              className="w-12 h-12 rounded-xl object-cover border border-slate-200"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-slate-900 text-base">
                  Book {bookingTargetWorker.fullName}
                </h3>
                {bookingTargetWorker.isVerified && (
                  <ShieldCheck size={18} weight="fill" className="text-sky-600" />
                )}
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="flex items-center gap-0.5 text-amber-500 font-semibold">
                  <Star size={12} weight="fill" />
                  {bookingTargetWorker.rating}
                </span>
                <span>•</span>
                <span>€{bookingTargetWorker.hourlyRate}/hr base</span>
              </div>
            </div>
          </div>

          <button
            onClick={closeBookingModal}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Service Selection */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              1. Select Service Package
            </label>
            <div className="space-y-2">
              {bookingTargetWorker.services.map((svc) => (
                <label
                  key={svc.id}
                  className={`flex items-start justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                    (selectedServiceId || bookingTargetWorker.services[0]?.id) === svc.id
                      ? 'border-slate-900 bg-slate-50 ring-1 ring-slate-900'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <input
                      type="radio"
                      name="serviceOption"
                      checked={(selectedServiceId || bookingTargetWorker.services[0]?.id) === svc.id}
                      onChange={() => setSelectedServiceId(svc.id)}
                      className="mt-1 text-slate-900 focus:ring-slate-900"
                    />
                    <div>
                      <div className="text-sm font-bold text-slate-900">{svc.name}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{svc.description}</div>
                      <div className="text-[11px] text-slate-400 mt-1">Est. {svc.estimatedDuration}</div>
                    </div>
                  </div>
                  <div className="text-sm font-extrabold text-slate-900">€{svc.price}</div>
                </label>
              ))}
            </div>
          </div>

          {/* Date & Time Slot */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
                <CalendarBlank size={14} />
                <span>Preferred Date</span>
              </label>
              <select
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-slate-900"
              >
                <option value="Today (Urgent Request)">Today (Urgent Request)</option>
                <option value="Tomorrow, Oct 7">Tomorrow, Oct 7</option>
                <option value="Thursday, Oct 8">Thursday, Oct 8</option>
                <option value="Friday, Oct 9">Friday, Oct 9</option>
                <option value="Saturday, Oct 10">Saturday, Oct 10</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
                <Clock size={14} />
                <span>Arrival Window</span>
              </label>
              <select
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-slate-900"
              >
                <option value="09:00 - 11:00 (Morning)">09:00 - 11:00 (Morning)</option>
                <option value="11:00 - 13:00 (Midday)">11:00 - 13:00 (Midday)</option>
                <option value="14:00 - 16:00 (Afternoon)">14:00 - 16:00 (Afternoon)</option>
                <option value="17:00 - 19:00 (Evening)">17:00 - 19:00 (Evening)</option>
              </select>
            </div>
          </div>

          {/* Service Address */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
              <MapPin size={14} />
              <span>Service Location</span>
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white"
              placeholder="Apartment, Street address and door code..."
            />
          </div>

          {/* Notes / Special Instructions */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Issue Details or Access Instructions
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white"
              placeholder="e.g. Please bring extra PEX pipe clamps, elevator is out of order..."
            />
          </div>

          {/* Booking Summary Box */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex justify-between items-center text-xs text-slate-600">
              <span>Service Fee Estimate:</span>
              <span className="font-extrabold text-slate-900 text-sm">€{price}</span>
            </div>
            <div className="flex justify-between items-center text-[11px] text-slate-500">
              <span>Payment:</span>
              <span>Paid directly upon job completion</span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-emerald-700 pt-1">
              <CheckCircle size={14} weight="fill" />
              <span>Free cancellation up to 4 hours prior</span>
            </div>
          </div>

          {/* Modal Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={closeBookingModal}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 text-xs font-bold rounded-xl bg-slate-900 hover:bg-slate-800 text-white transition-all shadow-sm active:scale-[0.98]"
            >
              Confirm Booking Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
