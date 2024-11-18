import React, { useState } from 'react';
import { X } from 'lucide-react';

interface EntryFormProps {
  onSave: (title: string, content: string[]) => void;
  onClose: () => void;
}

export function EntryForm({ onSave, onClose }: EntryFormProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState(['']);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && content[0].trim()) {
      onSave(title, content.filter(item => item.trim()));
      onClose();
    }
  };

  const addContentLine = () => {
    setContent([...content, '']);
  };

  const updateContent = (index: number, value: string) => {
    const newContent = [...content];
    newContent[index] = value;
    setContent(newContent);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">New Entry</h2>
          <button onClick={onClose} className="p-1">
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Entry Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
          </div>
          
          <div className="space-y-2">
            {content.map((line, index) => (
              <input
                key={index}
                type="text"
                placeholder="Entry content"
                value={line}
                onChange={(e) => updateContent(index, e.target.value)}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
              />
            ))}
          </div>
          
          <button
            type="button"
            onClick={addContentLine}
            className="text-sm text-gray-600 hover:text-gray-800"
          >
            + Add another line
          </button>
          
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
            >
              Save Entry
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}