
import React, { useState, useEffect, useCallback } from 'react';
import { Play, Pause, RotateCcw, Coffee, Target } from 'lucide-react';

const FocusTimer: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<'work' | 'break'>('work');

  useEffect(() => {
    let interval: any = null;
    if (isActive) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        }
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(interval);
            setIsActive(false);
            alert(mode === 'work' ? 'Time to take a break!' : 'Break over! Back to work.');
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds, minutes, mode]);

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = () => {
    setIsActive(false);
    setMinutes(mode === 'work' ? 25 : 5);
    setSeconds(0);
  };

  const switchMode = (newMode: 'work' | 'break') => {
    setMode(newMode);
    setIsActive(false);
    setMinutes(newMode === 'work' ? 25 : 5);
    setSeconds(0);
  };

  const progress = ((mode === 'work' ? 25 * 60 : 5 * 60) - (minutes * 60 + seconds)) / (mode === 'work' ? 25 * 60 : 5 * 60) * 100;

  return (
    <div className="max-w-2xl mx-auto flex flex-col items-center py-12">
      <div className={`flex p-1 rounded-2xl mb-12 ${isDarkMode ? 'bg-slate-900 border border-slate-800' : 'bg-slate-100'}`}>
        <button
          onClick={() => switchMode('work')}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            mode === 'work' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          <Target className="w-4 h-4" /> Focus Session
        </button>
        <button
          onClick={() => switchMode('break')}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            mode === 'break' ? 'bg-green-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          <Coffee className="w-4 h-4" /> Short Break
        </button>
      </div>

      <div className="relative w-72 h-72 mb-12">
        <svg className="w-full h-full -rotate-90">
          <circle
            cx="144"
            cy="144"
            r="135"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className={isDarkMode ? 'text-slate-900' : 'text-slate-100'}
          />
          <circle
            cx="144"
            cy="144"
            r="135"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={848}
            strokeDashoffset={848 - (848 * progress) / 100}
            strokeLinecap="round"
            className={`transition-all duration-1000 ${mode === 'work' ? 'text-indigo-500' : 'text-green-500'}`}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-7xl font-bold tracking-tighter">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </span>
          <span className={`text-xs font-bold uppercase tracking-widest mt-2 ${mode === 'work' ? 'text-indigo-400' : 'text-green-400'}`}>
            {isActive ? 'Quantum Focus' : 'Standby'}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button
          onClick={resetTimer}
          className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-slate-900 border-slate-800 hover:bg-slate-800' : 'bg-white border-slate-200 hover:bg-slate-50'} transition-all text-slate-400`}
        >
          <RotateCcw className="w-6 h-6" />
        </button>
        <button
          onClick={toggleTimer}
          className={`w-20 h-20 rounded-full flex items-center justify-center text-white shadow-xl transition-transform active:scale-95 ${
            mode === 'work' ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {isActive ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
        </button>
        <div className="w-14"></div>
      </div>

      <div className={`mt-16 p-4 rounded-2xl border max-w-sm text-center ${isDarkMode ? 'bg-indigo-900/10 border-indigo-900/30 text-indigo-400' : 'bg-indigo-50 border-indigo-100 text-indigo-600'}`}>
        <p className="text-xs font-medium">Zenith Tip: High-contrast themes reduce eye strain during long-haul browsing.</p>
      </div>
    </div>
  );
};

export default FocusTimer;
