import React from 'react';
import { PlusCircle } from 'lucide-react';

interface NewEntryButtonProps {
  onClick: () => void;
}

export function NewEntryButton({ onClick }: NewEntryButtonProps) {
  return (
    <button
      onClick={onClick}
      className="absolute bottom-28 right-6 bg-black text-white rounded-full p-3 shadow-lg hover:bg-gray-800 transition-colors"
      aria-label="Add new entry"
    >
      <PlusCircle size={24} />
    </button>
  );
}