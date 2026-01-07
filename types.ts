
export enum View {
  DASHBOARD = 'dashboard',
  ASSISTANT = 'assistant',
  NOTES = 'notes',
  TIMER = 'timer',
  SETTINGS = 'settings'
}

export interface Note {
  id: string;
  title: string;
  content: string;
  updatedAt: number;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  text: string;
  timestamp: number;
}
