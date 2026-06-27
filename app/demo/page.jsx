'use client';
import { useState, useEffect } from 'react';
import DashboardDemo from '@/components/DashboardDemo';
import ApplicationDemo from '@/components/ApplicationDemo';

export default function SafaiPlatform() {
  const [currentView, setCurrentView] = useState('ADMIN'); // 'ADMIN' | 'CLEANER'
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const saved = localStorage.getItem('safai_current_view');
    if (saved) setCurrentView(saved);
  }, []);

  const handleSetCurrentView = (view) => {
    setCurrentView(view);
    localStorage.setItem('safai_current_view', view);
  };
  
  // Shared state between the app and the dashboard
  const [appState, setAppState] = useState({
    ongoingCount: 2,
    completedTasks: [
      {
        id: 1198,
        title: "Block B Washroom Cleaning",
        score: "9.2",
        time: "07:24 am",
        date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }),
        timestamp: Date.now() - 3600000 * 2,
        photos: { before: {}, after: {} }
      },
      {
        id: 1199,
        title: "PM Washroom Cleaning",
        score: "7.5",
        time: "08:31 am",
        date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }),
        timestamp: Date.now() - 3600000 * 1,
        photos: { before: {}, after: {} }
      },
      {
        id: 1200,
        title: "Block C Washroom Cleaning",
        score: "9.5",
        time: "09:15 am",
        date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }),
        timestamp: Date.now() - 1800000,
        photos: { before: {}, after: {} }
      }
    ],
    logs: [
      {
        color: 'bg-emerald-500',
        text: 'Joti madavi completed cleaning at Sleeper class waiting room washroom (Score: 9.2)',
        time: '02:17 pm'
      }
    ]
  });

  return (
    <div className="w-full h-screen overflow-hidden bg-slate-100 font-sans relative text-slate-800 selection:bg-blue-200">
      {isMounted && (
        <>
          <div className={currentView === 'ADMIN' ? 'block w-full h-full' : 'hidden'}>
            <DashboardDemo 
              appState={appState} 
              toggleView={() => handleSetCurrentView('CLEANER')} 
            />
          </div>
          <div className={currentView === 'CLEANER' ? 'block w-full h-full' : 'hidden'}>
            <ApplicationDemo 
              appState={appState} 
              setAppState={setAppState} 
              toggleView={() => handleSetCurrentView('ADMIN')} 
            />
          </div>
        </>
      )}

      {/* Floating Button for Admin View */}
      {isMounted && currentView === 'ADMIN' && (
        <button 
          onClick={() => handleSetCurrentView('CLEANER')} 
          className="fixed bottom-6 right-6 bg-slate-900 hover:bg-slate-800 transition-colors text-white px-4 py-2.5 rounded-full shadow-2xl font-bold text-sm flex items-center z-[100] border border-slate-700"
        >
          <span className="flex items-center gap-2.5">
            Want to try cleaning? Open Cleaner App
          </span>
        </button>
      )}
    </div>
  );
}