import React, { useState } from 'react';
import { Calendar } from './components/Calendar';
import { JournalEntry } from './components/JournalEntry';
import { NewEntryButton } from './components/NewEntryButton';
import { EntryForm } from './components/EntryForm';
import type { EntryStore } from './types';
import { format } from 'date-fns';

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showEntryForm, setShowEntryForm] = useState(false);
  const [entries, setEntries] = useState<EntryStore>({
    [format(new Date(), 'yyyy-MM-dd')]: {
      date: format(new Date(), 'yyyy-MM-dd'),
      notes: [{
        id: '1',
        title: 'My 🎨 Design\nRoadmap for the\nNext 📅 Two Weeks',
        content: [
          'November 11th is the big date. I\'ve finally committed to posting two times a day until I reach 30k followers on twitter.',
          'So far, the results have been amazing:',
          '– Met with more designers in real life',
          '– Launched two client\'s websites',
          '– Reached new audiences on X',
          '– Made a concept for this app',
          '– Saw the most beautiful sunsets'
        ],
        timestamp: Date.now()
      }]
    }
  });

  const handleSaveEntry = (title: string, content: string[]) => {
    const dateKey = format(selectedDate, 'yyyy-MM-dd');
    const newNote = {
      id: Date.now().toString(),
      title,
      content,
      timestamp: Date.now()
    };

    setEntries(prev => {
      const existingEntries = prev[dateKey]?.notes || [];
      return {
        ...prev,
        [dateKey]: {
          date: dateKey,
          notes: [newNote, ...existingEntries]
        }
      };
    });
  };

  const selectedDateKey = format(selectedDate, 'yyyy-MM-dd');
  const currentEntries = entries[selectedDateKey];

  return (
    <div className="w-screen h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full h-full max-w-[428px] bg-white shadow-xl relative flex flex-col">
        {/* Main Content */}
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          <div className="flex-1 overflow-y-auto px-6">
            <JournalEntry 
              date={selectedDate}
              entries={currentEntries}
            />
          </div>
          
          {/* Calendar - Fixed to bottom */}
          <div className="sticky bottom-0 left-0 right-0 px-6 py-4 bg-white border-t border-gray-100">
            <Calendar
              selectedDate={selectedDate}
              onDateSelect={setSelectedDate}
            />
            {/* Home Indicator */}
            <div className="pt-2">
              <div className="mx-auto w-32 h-1 bg-gray-200 rounded-full" />
            </div>
          </div>

          {/* New Entry Button - Positioned above calendar */}
          <NewEntryButton onClick={() => setShowEntryForm(true)} />
        </div>

        {/* Entry Form Modal */}
        {showEntryForm && (
          <EntryForm
            onSave={handleSaveEntry}
            onClose={() => setShowEntryForm(false)}
          />
        )}
      </div>
    </div>
  );
}

export default App;