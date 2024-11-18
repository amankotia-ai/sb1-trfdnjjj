import React from 'react';
import { format, eachDayOfInterval, startOfWeek, endOfWeek } from 'date-fns';

interface CalendarProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
}

export function Calendar({ selectedDate, onDateSelect }: CalendarProps) {
  const weekStart = startOfWeek(selectedDate);
  const weekEnd = endOfWeek(selectedDate);
  const days = eachDayOfInterval({ start: weekStart, end: weekEnd });

  return (
    <div className="flex items-center gap-4 py-4 overflow-x-auto scrollbar-hide">
      {days.map((day) => {
        const isSelected = format(day, 'dd') === format(selectedDate, 'dd');
        return (
          <button
            key={day.toString()}
            onClick={() => onDateSelect(day)}
            className={`flex flex-col items-center min-w-[48px] p-2 rounded-full transition-colors
              ${isSelected ? 'bg-black text-white' : 'hover:bg-gray-100'}`}
          >
            <span className="text-xs font-medium">
              {format(day, 'EEE')}
            </span>
            <span className="text-lg font-semibold">
              {format(day, 'd')}
            </span>
          </button>
        );
      })}
    </div>
  );
}