/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import MedicationList from './components/MedicationList';
import InjuryScanner from './components/InjuryScanner';
import HealthTips from './components/HealthTips';
import Profile from './components/Profile';
import Emergency from './components/Emergency';
import { Medication, UserProfile } from './types';
import { getDailyHealthTip } from './services/geminiService';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [medications, setMedications] = useState<Medication[]>([]);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [dailyTip, setDailyTip] = useState<{ title: string; content: string } | null>(null);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedMeds = localStorage.getItem('medications');
    const savedProfile = localStorage.getItem('profile');
    if (savedMeds) setMedications(JSON.parse(savedMeds));
    if (savedProfile) setProfile(JSON.parse(savedProfile));

    // Fetch daily tip
    getDailyHealthTip().then(setDailyTip);
  }, []);

  // Save data to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('medications', JSON.stringify(medications));
  }, [medications]);

  useEffect(() => {
    if (profile) localStorage.setItem('profile', JSON.stringify(profile));
  }, [profile]);

  const handleAddMedication = (med: Partial<Medication>) => {
    const newMed: Medication = {
      id: Math.random().toString(36).substr(2, 9),
      name: med.name || '',
      dosage: med.dosage || '',
      frequency: med.frequency || '',
      reminderTimes: med.reminderTimes || ['08:00'],
      takenToday: false,
      history: [],
      userId: profile?.uid || 'local'
    };
    setMedications([...medications, newMed]);
  };

  const handleToggleTaken = (id: string) => {
    setMedications(meds => meds.map(m => 
      m.id === id ? { ...m, takenToday: !m.takenToday } : m
    ));
  };

  const handleDeleteMedication = (id: string) => {
    setMedications(meds => meds.filter(m => m.id !== id));
  };

  const handleSaveProfile = (newProfile: UserProfile) => {
    setProfile(newProfile);
    setActiveTab('home');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <Dashboard 
            medications={medications} 
            profile={profile} 
            onNavigate={setActiveTab} 
            dailyTip={dailyTip}
          />
        );
      case 'meds':
        return (
          <MedicationList 
            medications={medications} 
            onAdd={handleAddMedication} 
            onToggleTaken={handleToggleTaken}
            onDelete={handleDeleteMedication}
          />
        );
      case 'scan':
        return <InjuryScanner />;
      case 'tips':
        return <HealthTips />;
      case 'profile':
        return <Profile profile={profile} onSave={handleSaveProfile} />;
      case 'emergency':
        return <Emergency />;
      default:
        return <Dashboard medications={medications} profile={profile} onNavigate={setActiveTab} dailyTip={dailyTip} />;
    }
  };

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderContent()}
    </Layout>
  );
}
