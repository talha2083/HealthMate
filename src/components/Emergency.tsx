/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AlertCircle, Phone, MapPin, Send, Loader2, CheckCircle } from 'lucide-react';

export default function Emergency() {
  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleEmergency = () => {
    setIsSending(true);
    // Simulate sending location and alert
    setTimeout(() => {
      setIsSending(false);
      setSent(true);
    }, 2000);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col items-center text-center space-y-2">
        <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center text-red-600 border-4 border-white shadow-lg animate-pulse">
          <AlertCircle size={40} />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Emergency Support</h2>
        <p className="text-sm text-slate-500">One tap to get immediate help</p>
      </div>

      <div className="space-y-6">
        <button
          onClick={handleEmergency}
          disabled={isSending || sent}
          className={`w-full aspect-square rounded-full flex flex-col items-center justify-center gap-4 transition-all duration-500 shadow-2xl ${
            sent 
              ? 'bg-emerald-500 text-white scale-95' 
              : 'bg-red-600 text-white hover:bg-red-700 active:scale-95 shadow-red-200'
          }`}
        >
          {isSending ? (
            <Loader2 size={64} className="animate-spin" />
          ) : sent ? (
            <CheckCircle size={64} />
          ) : (
            <AlertCircle size={80} />
          )}
          <span className="text-2xl font-black uppercase tracking-widest">
            {isSending ? 'Sending...' : sent ? 'Alert Sent' : 'SOS'}
          </span>
        </button>

        <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm space-y-4">
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
              <MapPin size={20} />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-slate-800 text-sm">Your Location</h4>
              <p className="text-[10px] text-slate-400 font-medium">123 Health St, Wellness City</p>
            </div>
            <button className="text-xs font-bold text-blue-600">Refresh</button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <a
              href="tel:911"
              className="flex flex-col items-center justify-center gap-2 p-5 rounded-2xl bg-red-50 text-red-600 border border-red-100"
            >
              <Phone size={24} />
              <span className="text-xs font-bold uppercase tracking-wider">Call 911</span>
            </a>
            <button
              className="flex flex-col items-center justify-center gap-2 p-5 rounded-2xl bg-slate-50 text-slate-600 border border-slate-100"
            >
              <Send size={24} />
              <span className="text-xs font-bold uppercase tracking-wider">Notify Contact</span>
            </button>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-orange-50 text-orange-700 flex items-start gap-3">
          <AlertCircle size={20} className="shrink-0" />
          <p className="text-xs font-medium leading-relaxed">
            Emergency contacts will receive your current GPS location and a distress message.
          </p>
        </div>
      </div>
    </div>
  );
}
