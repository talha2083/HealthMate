/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Plus, Check, Clock, Trash2, History } from 'lucide-react';
import { Medication } from '../types';
import { format } from 'date-fns';

interface MedicationListProps {
  medications: Medication[];
  onAdd: (med: Partial<Medication>) => void;
  onToggleTaken: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function MedicationList({ medications, onAdd, onToggleTaken, onDelete }: MedicationListProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [newMed, setNewMed] = useState({ name: '', dosage: '', frequency: '', reminderTime: '08:00' });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMed.name) {
      onAdd({
        ...newMed,
        reminderTimes: [newMed.reminderTime],
        takenToday: false,
        history: []
      });
      setIsAdding(false);
      setNewMed({ name: '', dosage: '', frequency: '', reminderTime: '08:00' });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-slate-900">Medications</h2>
        <button
          onClick={() => setIsAdding(true)}
          className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-colors"
        >
          <Plus size={24} />
        </button>
      </div>

      {isAdding && (
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
          <h3 className="font-bold text-slate-800">Add New Medicine</h3>
          <form onSubmit={handleAdd} className="space-y-3">
            <input
              type="text"
              placeholder="Medicine Name"
              className="w-full px-4 py-3 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-emerald-500"
              value={newMed.name}
              onChange={(e) => setNewMed({ ...newMed, name: e.target.value })}
              required
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Dosage (e.g. 500mg)"
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-emerald-500"
                value={newMed.dosage}
                onChange={(e) => setNewMed({ ...newMed, dosage: e.target.value })}
              />
              <input
                type="time"
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-emerald-500"
                value={newMed.reminderTime}
                onChange={(e) => setNewMed({ ...newMed, reminderTime: e.target.value })}
              />
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="flex-1 py-3 rounded-2xl bg-slate-100 text-slate-600 font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-3 rounded-2xl bg-emerald-600 text-white font-bold"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {medications.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-3xl border border-dashed border-slate-200">
            <Pill className="mx-auto text-slate-300 mb-2" size={48} />
            <p className="text-slate-400 font-medium">No medications added yet</p>
          </div>
        ) : (
          medications.map((med) => (
            <div key={med.id} className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between group">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => onToggleTaken(med.id)}
                  className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300",
                    med.takenToday 
                      ? "bg-emerald-100 text-emerald-600" 
                      : "bg-slate-50 text-slate-300 border border-slate-100"
                  )}
                >
                  <Check size={24} className={cn(med.takenToday ? "scale-110" : "scale-90 opacity-50")} />
                </button>
                <div>
                  <h4 className={cn("font-bold text-slate-800", med.takenToday && "line-through text-slate-400")}>
                    {med.name}
                  </h4>
                  <div className="flex items-center gap-3 text-xs font-medium text-slate-400 mt-0.5">
                    <span className="flex items-center gap-1">
                      <Clock size={12} /> {med.reminderTimes[0]}
                    </span>
                    <span>•</span>
                    <span>{med.dosage}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => onDelete(med.id)}
                className="w-8 h-8 rounded-xl text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

import { Pill } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
