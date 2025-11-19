export enum CharacterId {
  SHINJI = 'shinji',
  ASUKA = 'asuka',
  REI = 'rei',
  KAWORU = 'kaworu',
  TOJI = 'toji',
  KENSUKE = 'kensuke',
  NARRATOR = 'narrator',
  UNKNOWN = 'unknown'
}

export interface Character {
  id: CharacterId;
  name: string;
  visualPrompt: string; // For Gemini Image Gen
  avatarStatic: string; // Fallback or generated avatar URL
  voicePitch: number;
  voiceRate: number;
  themeColor: string; // For UI accents
}

export interface StoryNode {
  id: number;
  speakerId: CharacterId;
  text: string;
  locationPrompt: string; // Background description
  characterVisible?: CharacterId; // Who is on screen (tachie)
  characterEmotion?: string; // e.g., "blushing", "angry"
}

export interface GameState {
  currentNodeIndex: number;
  bgUrl: string | null;
  charUrl: string | null;
  isLoadingBg: boolean;
  isLoadingChar: boolean;
  insightText: string | null;
  isInsightLoading: boolean;
}
