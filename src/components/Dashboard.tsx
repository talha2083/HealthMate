/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Pill, Camera, Heart, AlertCircle, ChevronRight, Droplets, Activity } from 'lucide-react';
import { Medication, UserProfile } from '../types';

interface DashboardProps {
  medications: Medication[];
  profile: UserProfile | null;
  onNavigate: (tab: string) => void;
  dailyTip: { title: string; content: string } | null;
}

export default function Dashboard({ medications, profile, onNavigate, dailyTip }: DashboardProps) {
  const medsTaken = medications.filter(m => m.takenToday).length;
  const totalMeds = medications.length;
  const progress = totalMeds > 0 ? (medsTaken / totalMeds) * 100 : 0;

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <section className="space-y-1">
        <h2 className="text-2xl font-bold text-slate-900">Hello, {profile?.name || 'User'}!</h2>
        <p className="text-slate-500 font-medium">How are you feeling today?</p>
      </section>

      {/* Medication Progress Card */}
      <section 
        onClick={() => onNavigate('meds')}
        className="bg-emerald-600 p-6 rounded-[32px] text-white shadow-xl shadow-emerald-100 relative overflow-hidden cursor-pointer group"
      >
        <div className="relative z-10 space-y-4">
          <div className="flex justify-between items-start">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
              <Pill size={24} />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full">
              Today's Meds
            </span>
          </div>
          <div>
            <h3 className="text-3xl font-bold">{medsTaken}/{totalMeds}</h3>
            <p className="text-emerald-100 text-sm font-medium">Medications taken today</p>
          </div>
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white transition-all duration-500" 
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-110 transition-transform" />
      </section>

      {/* Quick Actions Grid */}
      <section className="grid grid-cols-2 gap-4">
        <button 
          onClick={() => onNavigate('scan')}
          className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-start gap-3 hover:border-emerald-200 transition-colors text-left"
        >
          <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Camera size={20} />
          </div>
          <div>
            <h4 className="font-bold text-slate-800 text-sm">Injury Scan</h4>
            <p className="text-[10px] text-slate-400 font-medium">AI First Aid Guide</p>
          </div>
        </button>
        <button 
          onClick={() => onNavigate('tips')}
          className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-start gap-3 hover:border-emerald-200 transition-colors text-left"
        >
          <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <Heart size={20} />
          </div>
          <div>
            <h4 className="font-bold text-slate-800 text-sm">Health Tips</h4>
            <p className="text-[10px] text-slate-400 font-medium">Daily Wellness</p>
          </div>
        </button>
      </section>

      {/* Daily Tip Section */}
      {dailyTip && (
        <section className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-emerald-600">
            <Activity size={18} />
            <h4 className="text-xs font-bold uppercase tracking-widest">Daily Health Tip</h4>
          </div>
          <h3 className="text-lg font-bold text-slate-900 leading-tight">{dailyTip.title}</h3>
          <p className="text-sm text-slate-500 leading-relaxed">{dailyTip.content}</p>
        </section>
      )}

      {/* Reminders Section */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-slate-900">Upcoming</h3>
          <button onClick={() => onNavigate('meds')} className="text-xs font-bold text-emerald-600 flex items-center gap-1">
            View All <ChevronRight size={14} />
          </button>
        </div>
        <div className="space-y-3">
          <div className="bg-white p-4 rounded-2xl border border-slate-100 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Droplets size={20} />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-slate-800 text-sm">Hydration Goal</h4>
              <p className="text-[10px] text-slate-400 font-medium">Drink 2L of water today</p>
            </div>
            <div className="text-xs font-bold text-slate-400">800ml left</div>
          </div>
        </div>
      </section>
    </div>
  );
}
