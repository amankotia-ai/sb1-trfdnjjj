import React from 'react';
import { format } from 'date-fns';
import { Search } from 'lucide-react';
import type { DayEntries } from '../types';

interface JournalEntryProps {
  date: Date;
  entries?: DayEntries;
}

export function JournalEntry({ date, entries }: JournalEntryProps) {
  const formattedDate = format(date, 'EEEE, d MMMM yyyy');

  return (
    <div className="space-y-6 pb-24">
      <div className="text-sm text-gray-500 sticky top-0 bg-white py-4">
        New Journal - {formattedDate}
      </div>

      <div className="relative sticky top-12 bg-white pb-4">
        <input
          type="text"
          placeholder="Search"
          className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      </div>

      {(!entries || entries.notes.length === 0) ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No entries for this date.</p>
          <p className="text-sm text-gray-400">Click the + button to add one!</p>
        </div>
      ) : (
        <div className="space-y-8">
          {entries.notes.map((note) => (
            <div key={note.id} className="space-y-4">
              <h1 className="text-3xl font-bold whitespace-pre-line">
                {note.title}
              </h1>
              <div className="space-y-4 text-gray-700">
                {note.content.map((line, index) => (
                  <div key={index}>
                    {line.startsWith('–') ? (
                      <ul className="space-y-2">
                        <li>{line}</li>
                      </ul>
                    ) : (
                      <p>{line}</p>
                    )}
                  </div>
                ))}
              </div>
              <div className="text-sm text-gray-400">
                {format(note.timestamp, 'h:mm a')}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}