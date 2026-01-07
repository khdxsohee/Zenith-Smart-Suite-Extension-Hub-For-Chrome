
import React, { useState, useEffect } from 'react';
/* Added StickyNote to the imports to resolve the reference error on line 102 */
import { Plus, Trash2, Search, Edit3, StickyNote } from 'lucide-react';
import { Note } from '../types';

const Notes: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [activeNote, setActiveNote] = useState<Note | null>(null);

  // Load notes from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('nexus_notes');
    if (saved) {
      setNotes(JSON.parse(saved));
    }
  }, []);

  // Save notes to localStorage
  useEffect(() => {
    localStorage.setItem('nexus_notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: 'New Note',
      content: '',
      updatedAt: Date.now()
    };
    setNotes([newNote, ...notes]);
    setActiveNote(newNote);
  };

  const deleteNote = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setNotes(notes.filter(n => n.id !== id));
    if (activeNote?.id === id) setActiveNote(null);
  };

  const updateNote = (content: string) => {
    if (!activeNote) return;
    const updated = { ...activeNote, content, updatedAt: Date.now(), title: content.split('\n')[0].substring(0, 30) || 'Untitled Note' };
    setActiveNote(updated);
    setNotes(notes.map(n => n.id === activeNote.id ? updated : n));
  };

  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-16rem)]`}>
      {/* Sidebar List */}
      <div className={`md:col-span-1 flex flex-col rounded-2xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
        <div className="p-4 border-b border-slate-800/50 flex items-center justify-between">
          <h2 className="font-bold">My Notes</h2>
          <button onClick={addNote} className="p-1.5 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="w-4 h-4 text-white" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {notes.length === 0 && (
            <div className="text-center py-8 text-slate-500 text-sm">No notes yet.</div>
          )}
          {notes.map(note => (
            <div
              key={note.id}
              onClick={() => setActiveNote(note)}
              className={`p-4 rounded-xl cursor-pointer group transition-all ${
                activeNote?.id === note.id 
                  ? 'bg-blue-600/10 border-blue-600/50 border' 
                  : 'hover:bg-slate-800/50 border border-transparent'
              }`}
            >
              <div className="flex justify-between items-start mb-1">
                <h4 className="font-semibold text-sm truncate">{note.title || 'Untitled'}</h4>
                <button onClick={(e) => deleteNote(note.id, e)} className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-500">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-xs text-slate-500 truncate">
                {new Date(note.updatedAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Editor */}
      <div className={`md:col-span-2 rounded-2xl border flex flex-col ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
        {activeNote ? (
          <>
            <div className="p-4 border-b border-slate-800/50 flex items-center gap-2 text-slate-500">
              <Edit3 className="w-4 h-4" />
              <span className="text-xs font-medium uppercase tracking-widest">Editing Note</span>
            </div>
            <textarea
              value={activeNote.content}
              onChange={(e) => updateNote(e.target.value)}
              placeholder="Start typing..."
              className="flex-1 bg-transparent border-none focus:ring-0 p-6 resize-none font-mono text-sm leading-relaxed"
            />
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-500">
            <StickyNote className="w-12 h-12 mb-4 opacity-20" />
            <p>Select a note to view or create a new one.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notes;
