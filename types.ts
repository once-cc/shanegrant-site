import type { LucideIcon } from 'lucide-react';

export interface Competency {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface ServiceRole {
  id: string;
  years: string;
  role: string;
  location: string;
  translation: string;
  description: string;
  tags: string[];
}

export interface Award {
  id: string;
  title: string;
  year: string;
  description: string;
  icon: LucideIcon;
}

export interface ProfileStat {
  label: string;
  value: string;
  highlight?: boolean;
}

export interface Reference {
  name: string;
  role: string;
  contact: string;
}

export interface PersonalAttribute {
  title: string;
  subtitle: string;
}

export interface Accolade {
  id: string;
  title: string;
  src: string;
}