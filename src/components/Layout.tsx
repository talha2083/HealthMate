/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Home, Pill, Camera, Heart, User, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function Layout({ children, activeTab, onTabChange }: LayoutProps) {
  const tabs = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'meds', icon: Pill, label: 'Meds' },
    { id: 'scan', icon: Camera, label: 'Scan' },
    { id: 'tips', icon: Heart, label: 'Tips' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col max-w-md mx-auto shadow-2xl relative">
      {/* Header */}
      <header className="bg-white px-6 pt-8 pb-4 border-b border-slate-100 flex justify-between items-center sticky top-0 z-10">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">HealthMate</h1>
          <p className="text-xs text-slate-500 font-medium uppercase tracking-widest">Your Health Companion</p>
        </div>
        <button 
          onClick={() => onTabChange('emergency')}
          className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center text-red-600 hover:bg-red-100 transition-colors shadow-sm"
        >
          <AlertCircle size={24} />
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-24 px-6 pt-6">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {children}
        </motion.div>
      </main>

      {/* Bottom Navigation */}
      <nav className="bg-white border-t border-slate-100 px-4 py-3 flex justify-around items-center fixed bottom-0 left-0 right-0 max-w-md mx-auto z-20">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-200",
                isActive ? "text-emerald-600 bg-emerald-50" : "text-slate-400 hover:text-slate-600"
              )}
            >
              <Icon size={20} className={cn(isActive && "scale-110")} />
              <span className="text-[10px] font-semibold uppercase tracking-wider">{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
