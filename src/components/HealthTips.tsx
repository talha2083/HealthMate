/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Heart, Activity, Droplets, Zap, ShieldCheck, Info } from 'lucide-react';

export default function HealthTips() {
  const tips = [
    {
      id: '1',
      title: 'Stay Hydrated',
      content: 'Drink at least 8 glasses of water a day to keep your body functioning optimally and your skin glowing.',
      icon: Droplets,
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    {
      id: '2',
      title: 'First Aid: Minor Cuts',
      content: 'Clean the wound with mild soap and water. Apply an antibiotic ointment and cover with a clean bandage.',
      icon: ShieldCheck,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50'
    },
    {
      id: '3',
      title: 'Daily Exercise',
      content: 'Just 30 minutes of brisk walking can significantly improve your cardiovascular health and mood.',
      icon: Activity,
      color: 'text-orange-600',
      bg: 'bg-orange-50'
    },
    {
      id: '4',
      title: 'Sleep Hygiene',
      content: 'Maintain a consistent sleep schedule. Aim for 7-9 hours of quality sleep to boost immunity and mental clarity.',
      icon: Zap,
      color: 'text-purple-600',
      bg: 'bg-purple-50'
    },
    {
      id: '5',
      title: 'Medicine Safety',
      content: 'Always check the expiration date on your medications. Store them in a cool, dry place away from sunlight.',
      icon: Info,
      color: 'text-slate-600',
      bg: 'bg-slate-50'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center text-center space-y-2">
        <div className="w-16 h-16 rounded-3xl bg-purple-100 flex items-center justify-center text-purple-600 mb-2">
          <Heart size={32} />
        </div>
        <h2 className="text-xl font-bold text-slate-900">Health Tips</h2>
        <p className="text-sm text-slate-500">Daily wellness and first aid guidance</p>
      </div>

      <div className="space-y-4">
        {tips.map((tip) => {
          const Icon = tip.icon;
          return (
            <div key={tip.id} className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm space-y-3">
              <div className={`w-10 h-10 rounded-2xl ${tip.bg} ${tip.color} flex items-center justify-center`}>
                <Icon size={20} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 leading-tight">{tip.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{tip.content}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
