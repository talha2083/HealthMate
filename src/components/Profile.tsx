/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { User, Phone, FileText, AlertCircle, Save, LogOut } from 'lucide-react';
import { UserProfile } from '../types';

interface ProfileProps {
  profile: UserProfile | null;
  onSave: (profile: UserProfile) => void;
}

export default function Profile({ profile, onSave }: ProfileProps) {
  const [formData, setFormData] = useState<UserProfile>(profile || {
    uid: '',
    name: '',
    age: 0,
    emergencyContact: '',
    medicalNotes: '',
    allergies: []
  });

  const [allergyInput, setAllergyInput] = useState('');

  const handleAddAllergy = () => {
    if (allergyInput && !formData.allergies.includes(allergyInput)) {
      setFormData({ ...formData, allergies: [...formData.allergies, allergyInput] });
      setAllergyInput('');
    }
  };

  const handleRemoveAllergy = (allergy: string) => {
    setFormData({ ...formData, allergies: formData.allergies.filter(a => a !== allergy) });
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col items-center text-center space-y-2">
        <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 border-4 border-white shadow-lg">
          <User size={40} />
        </div>
        <h2 className="text-xl font-bold text-slate-900">User Profile</h2>
        <p className="text-sm text-slate-500">Manage your medical information</p>
      </div>

      <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm space-y-6">
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
              <input
                type="text"
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-emerald-500 font-medium text-slate-800"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter your name"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Age</label>
              <input
                type="number"
                className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-emerald-500 font-medium text-slate-800"
                value={formData.age || ''}
                onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) || 0 })}
                placeholder="Age"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Emergency Contact</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <input
                  type="tel"
                  className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-emerald-500 font-medium text-slate-800"
                  value={formData.emergencyContact}
                  onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                  placeholder="Phone number"
                />
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Allergies</label>
            <div className="flex gap-2">
              <input
                type="text"
                className="flex-1 px-4 py-3.5 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-emerald-500 font-medium text-slate-800"
                value={allergyInput}
                onChange={(e) => setAllergyInput(e.target.value)}
                placeholder="Add allergy"
                onKeyPress={(e) => e.key === 'Enter' && handleAddAllergy()}
              />
              <button
                onClick={handleAddAllergy}
                className="px-4 rounded-2xl bg-emerald-100 text-emerald-600 font-bold"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.allergies.map((allergy) => (
                <span 
                  key={allergy}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-600 text-xs font-bold flex items-center gap-2"
                >
                  {allergy}
                  <button onClick={() => handleRemoveAllergy(allergy)} className="text-slate-400 hover:text-red-500">×</button>
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Medical Notes</label>
            <div className="relative">
              <FileText className="absolute left-4 top-4 text-slate-300" size={18} />
              <textarea
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-emerald-500 font-medium text-slate-800 min-h-[100px]"
                value={formData.medicalNotes}
                onChange={(e) => setFormData({ ...formData, medicalNotes: e.target.value })}
                placeholder="Any other medical information..."
              />
            </div>
          </div>
        </div>

        <button
          onClick={() => onSave(formData)}
          className="w-full py-4 rounded-2xl bg-emerald-600 text-white font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-100"
        >
          <Save size={20} />
          Save Profile
        </button>
      </div>

      <button className="w-full py-4 rounded-2xl bg-white text-red-500 font-bold flex items-center justify-center gap-2 border border-red-50 shadow-sm">
        <LogOut size={20} />
        Sign Out
      </button>
    </div>
  );
}
