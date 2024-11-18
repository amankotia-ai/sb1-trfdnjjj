export interface JournalNote {
  id: string;
  title: string;
  content: string[];
  timestamp: number;
}

export interface DayEntries {
  date: string;
  notes: JournalNote[];
}

export interface EntryStore {
  [date: string]: DayEntries;
}