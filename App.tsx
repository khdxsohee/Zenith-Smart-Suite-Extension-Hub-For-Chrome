
import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  MessageSquare, 
  StickyNote, 
  Timer, 
  Settings,
  Zap,
  Github,
  Moon,
  Sun
} from 'lucide-react';
import { View } from './types';
import Dashboard from './components/Dashboard';
import Assistant from './components/Assistant';
import Notes from './components/Notes';
import FocusTimer from './components/FocusTimer';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.DASHBOARD);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const navigation = [
    { name: 'Analytics', icon: LayoutDashboard, view: View.DASHBOARD },
    { name: 'Zenith AI', icon: MessageSquare, view: View.ASSISTANT },
    { name: 'Smart Notes', icon: StickyNote, view: View.NOTES },
    { name: 'Focus Engine', icon: Timer, view: View.TIMER },
    { name: 'Settings', icon: Settings, view: View.SETTINGS },
  ];

  return (
    <div className={`min-h-screen flex transition-colors duration-300 ${isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      {/* Sidebar */}
      <aside className={`w-20 md:w-64 border-r transition-colors duration-300 ${isDarkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-200'} flex flex-col sticky top-0 h-screen`}>
        <div className="p-6 flex items-center gap-3">
          <div className="bg-indigo-600 p-2 rounded-xl shadow-lg shadow-indigo-500/20">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <span className="hidden md:block font-bold text-xl tracking-tight">Zenith</span>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          {navigation.map((item) => (
            <button
              key={item.name}
              onClick={() => setCurrentView(item.view)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                currentView === item.view 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' 
                  : isDarkMode 
                    ? 'text-slate-400 hover:bg-slate-800 hover:text-slate-100' 
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="hidden md:block font-medium">{item.name}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800/50 space-y-2">
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-800 transition-colors"
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            <span className="hidden md:block font-medium">{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
          <div className="px-4 py-2 hidden md:block">
            <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">v1.0.0 PRO</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full overflow-y-auto">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold capitalize">{currentView.replace('-', ' ')}</h1>
            <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              The ultimate browsing companion by khdxsohee.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className={`hidden sm:flex px-3 py-1.5 rounded-full border text-xs font-medium items-center gap-2 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-200'}`}>
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
              Zenith Core Online
            </div>
            <a href="https://github.com/khdxsohee" target="_blank" className="p-2 rounded-full hover:bg-slate-800 transition-colors">
              <Github className="w-6 h-6" />
            </a>
          </div>
        </header>

        <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          {currentView === View.DASHBOARD && <Dashboard isDarkMode={isDarkMode} />}
          {currentView === View.ASSISTANT && <Assistant isDarkMode={isDarkMode} />}
          {currentView === View.NOTES && <Notes isDarkMode={isDarkMode} />}
          {currentView === View.TIMER && <FocusTimer isDarkMode={isDarkMode} />}
          {currentView === View.SETTINGS && (
            <div className={`p-8 rounded-2xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
              <h2 className="text-xl font-bold mb-4">Zenith Config</h2>
              <p className="text-slate-400 mb-6">Manage your pro-level extension features.</p>
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 rounded-xl bg-slate-800/30">
                  <div>
                    <h3 className="font-medium">AI Neural Pre-processing</h3>
                    <p className="text-sm text-slate-500">Enable advanced context awareness for smoother AI interactions.</p>
                  </div>
                  <div className="w-12 h-6 bg-indigo-600 rounded-full flex items-center px-1">
                    <div className="w-4 h-4 bg-white rounded-full translate-x-6"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-slate-800/30">
                  <div>
                    <h3 className="font-medium">Zenith Privacy Shield</h3>
                    <p className="text-sm text-slate-500">Advanced tracker blocking and fingerprinting protection.</p>
                  </div>
                  <div className="w-12 h-6 bg-slate-700 rounded-full flex items-center px-1">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default App;
