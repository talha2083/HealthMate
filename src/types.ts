/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  reminderTimes: string[]; // HH:mm
  takenToday: boolean;
  history: MedicationHistory[];
  userId: string;
}

export interface MedicationHistory {
  date: string; // ISO string
  taken: boolean;
}

export interface UserProfile {
  uid: string;
  name: string;
  age: number;
  emergencyContact: string;
  medicalNotes: string;
  allergies: string[];
}

export interface HealthTip {
  id: string;
  title: string;
  content: string;
  category: 'first-aid' | 'daily' | 'medicine' | 'hydration' | 'exercise';
}

export interface InjuryAnalysis {
  type: string;
  severity: 'low' | 'medium' | 'high';
  guidance: string;
  warning?: string;
}
