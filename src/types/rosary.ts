export type MysteryType = 'gozosos' | 'dolorosos' | 'gloriosos' | 'luminosos';

export interface MysteryDetail {
  number: number;
  title: string;
  biblicalReference: string;
  fruitOfTheMystery: string; // Ex: Humildade, Contrição, Amor a Deus
  meditation: string;
}

export interface MysteryGroup {
  id: MysteryType;
  name: string;
  subtitle: string;
  daysOfWeek: string;
  daysOfWeekNumbers: number[]; // 0=Domingo, 1=Segunda, etc.
  mysteries: MysteryDetail[];
}

export type BeadType = 
  | 'crucifix' 
  | 'creed'
  | 'our_father' 
  | 'hail_mary' 
  | 'glory' 
  | 'fatima' 
  | 'medal' 
  | 'salve_regina'
  | 'sign_of_cross';

export interface RosaryStep {
  id: string;
  index: number;
  decadeIndex?: number; // 1 to 5 for decades
  subIndex?: number;    // 1 to 10 for Ave Marias in decade
  beadType: BeadType;
  title: string;
  subtitle: string;
  prayerTitle: string;
  prayerText: string;
  prayerLatinText?: string;
  fruitOrIntention?: string;
  beadVisualId: string; // ID mapping to the SVG bead
}

export interface PrayerDefinition {
  title: string;
  text: string;
  latin?: string;
}
