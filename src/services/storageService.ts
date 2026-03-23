import { Medication, InjuryRecord, UserProfile } from "../types";

const KEYS = {
  MEDICATIONS: 'hg_medications',
  INJURIES: 'hg_injuries',
  PROFILE: 'hg_profile',
};

export const storage = {
  getMedications: (): Medication[] => {
    const data = localStorage.getItem(KEYS.MEDICATIONS);
    return data ? JSON.parse(data) : [];
  },
  saveMedications: (meds: Medication[]) => {
    localStorage.setItem(KEYS.MEDICATIONS, JSON.stringify(meds));
  },
  getInjuries: (): InjuryRecord[] => {
    const data = localStorage.getItem(KEYS.INJURIES);
    return data ? JSON.parse(data) : [];
  },
  saveInjury: (injury: InjuryRecord) => {
    const injuries = storage.getInjuries();
    localStorage.setItem(KEYS.INJURIES, JSON.stringify([injury, ...injuries]));
  },
  getProfile: (): UserProfile => {
    const data = localStorage.getItem(KEYS.PROFILE);
    return data ? JSON.parse(data) : {
      name: '',
      age: '',
      emergencyContact: { name: '', phone: '' },
      medicalNotes: '',
      allergies: '',
    };
  },
  saveProfile: (profile: UserProfile) => {
    localStorage.setItem(KEYS.PROFILE, JSON.stringify(profile));
  },
};
