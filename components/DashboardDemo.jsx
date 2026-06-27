'use client';
import { useState } from 'react';
import { 
  LayoutDashboard, Menu, MapPin, CheckCircle, Search, Bell, Settings, 
  Activity, Wrench, UserCog, TrendingUp, Info, Layers, Droplets, ShieldCheck, LogOut, X, ArrowUp, Star
} from 'lucide-react';

export default function DashboardDemo({ appState, toggleView }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Derived Metrics
  const ongoingCount = appState?.ongoingCount || 0;
  const completedTasks = appState?.completedTasks || [];
  const completedCount = completedTasks.length; 
  
  let totalScore = 0;
  completedTasks.forEach(t => totalScore += parseFloat(t.score));
  const avgScore = completedTasks.length > 0 
    ? (totalScore / completedTasks.length).toFixed(1) 
    : '8.7'; // baseline dummy from image
  
  const dashOffset = (parseFloat(avgScore) / 10) * 100;

  // Location Bars
  let uniqueLocs = {};
  completedTasks.forEach(t => { 
      if(!uniqueLocs[t.title]) {
          uniqueLocs[t.title] = { score: t.score, isNew: t.isNew };
      }
  });
  const locationBars = Object.entries(uniqueLocs);

  // Spline Data
  const dayToChartIndex = { 2: 0, 3: 1, 4: 2, 5: 3, 6: 4, 0: 5, 1: 6 };
  let weeklyData = [2, 1, 3, 0, 1, 1, 0]; 
  completedTasks.forEach(task => {
      if (task.timestamp) {
          let taskDate = new Date(task.timestamp);
          let dayIdx = dayToChartIndex[taskDate.getDay()];
          if (dayIdx !== undefined) weeklyData[dayIdx]++;
      }
  });

  const svgWidth = 600;
  const maxData = Math.max(...weeklyData);
  const yMax = maxData > 8 ? maxData + 2 : 8; 
  const xStep = svgWidth / (weeklyData.length - 1);
  const points = weeklyData.map((val, i) => {
      return {x: i * xStep, y: 100 - ((val / yMax) * 80), val};
  });
  let pathD = `M 0,${points[0].y} `;
  points.forEach(p => { pathD += `L ${p.x},${p.y} `; });
  let fillD = pathD + `L ${svgWidth},120 L 0,120 Z`;

  // Heatmap Data
  let last31Days = [];
  let today = new Date();
  for(let i=30; i>=0; i--) {
      let d = new Date(today);
      d.setDate(today.getDate() - i);
      last31Days.push(d.getDate());
  }

  const washroomsList = [
      "Khamla washroom 1",
      "Sleeper class waiting room washroom", 
      "Bombay Side Platform-1 End Washroom", 
      "Office Floor-2 Washroom 1",
      "Office Floor-1 Washroom 1", 
      "Office Ground Floor Washroom 1", 
      "Platform 1 near office"
  ];
  
  const basePatterns = [
      [7.8, 8.1, 7.5, 8.2, 8.0, 8.5, 8.7, 8.1, 7.9, 8.4, 8.6, 7.8, 8.1, 8.5, 8.3, 8.8, 8.2, 8.0, 7.6, 8.1, 8.4, 8.6, 8.1, 7.9, 8.2, 8.5, 8.7, 8.3, 8.1, 8.0, 8.2],
      [8.1, 8.8, 8.8, 7.3, 8.8, 8.8, 9.0, 8.9, 9.2, 8.5, 8.7, 8.4, 8.8, 9.1, 8.6, 8.9, 9.3, 8.7, 8.5, 8.8, 9.0, 8.6, 8.9, 8.7, 9.2, 8.8, 9.1, 8.9, 8.6, 8.8, 9.0],
      [8.5, 8.2, 8.0, 8.9, 8.3, 8.6, 8.3, 8.5, 8.1, 8.4, 8.7, 8.2, 8.5, 8.6, 8.3, 8.1, 8.8, 8.4, 8.0, 8.2, 8.6, 8.5, 8.1, 8.3, 8.7, 8.4, 8.2, 8.5, 8.6, 8.3, 8.4],
      [9.1, 8.9, 8.5, 9.2, 9.0, 8.8, 8.7, 9.3, 8.6, 8.9, 9.1, 8.8, 9.2, 9.0, 8.7, 8.5, 9.4, 8.9, 9.1, 8.8, 9.2, 8.7, 9.0, 8.6, 8.9, 9.3, 9.1, 8.8, 9.2, 8.9, 9.0],
      [8.1, 8.2, 7.9, 8.6, 9.2, 9.5, 9.4, 8.8, 8.3, 8.5, 9.1, 8.7, 8.4, 8.9, 9.3, 9.6, 9.2, 8.8, 8.5, 8.1, 8.6, 9.0, 9.4, 9.1, 8.7, 8.3, 8.8, 9.2, 9.5, 9.3, 9.0],
      [8.1, 5.3, 7.3, 8.8, 8.3, 8.9, 9.0, 8.5, 8.1, 7.6, 6.8, 7.5, 8.4, 8.9, 8.6, 8.2, 7.9, 8.5, 8.8, 8.3, 8.7, 8.1, 7.4, 6.9, 7.8, 8.5, 8.9, 8.4, 8.7, 8.2, 8.6],
      [6.9, 6.8, 6.6, 8.8, 8.3, 8.8, 7.4, 6.5, 7.1, 6.7, 6.9, 7.5, 8.2, 8.6, 8.1, 7.7, 6.8, 6.4, 6.9, 7.3, 8.0, 8.5, 8.2, 7.6, 6.9, 6.5, 7.2, 7.8, 8.4, 8.1, 7.5]
  ];

  let heatmapData = {};
  washroomsList.forEach((w, i) => {
      heatmapData[w] = { dates: {} };
      last31Days.forEach((day, j) => {
          heatmapData[w].dates[day] = { scores: [basePatterns[i][j]], isDummy: true };
      });
  });

  completedTasks.forEach((t) => {
      if(!heatmapData[t.title]) heatmapData[t.title] = { dates: {} };
      let tDate = new Date(t.timestamp);
      let day = tDate.getDate();
      if (last31Days.includes(day)) {
          if(!heatmapData[t.title].dates[day] || heatmapData[t.title].dates[day].isDummy) {
              heatmapData[t.title].dates[day] = { scores: [], isDummy: false };
          }
          heatmapData[t.title].dates[day].scores.push(parseFloat(t.score));
      }
  });

  // Top Rated Data
  let topLocs = {};
  completedTasks.forEach(t => { 
      if(!topLocs[t.title] || parseFloat(t.score) > parseFloat(topLocs[t.title])) topLocs[t.title] = t.score; 
  });
  let sortedLocs = Object.entries(topLocs).sort((a,b) => b[1] - a[1]).slice(0,4);
  const colors = ['bg-orange-400', 'bg-blue-500', 'bg-purple-500', 'bg-cyan-500'];

  // If no live top locs, use dummy to match image
  if (sortedLocs.length === 0) {
      sortedLocs = [
          ["Sleeper class waiting roo...", "9.2"],
          ["Office Floor-2 Washroom 1", "8.7"],
          ["Bombay Side Platform-1 ...", "8.3"]
      ];
  }
  
  const defaultLocationBars = [
     { title: "Sleeper class waiting room ...", score: "9.2", pct: 92 },
     { title: "Bombay Side Platform 1 En...", score: "8.3", pct: 83 },
     { title: "Office Floor-2 Washroom 1", score: "8.7", pct: 87 }
  ];

  return (
    <div className="flex flex-row w-full h-full bg-[#f4f7fe] relative text-slate-800">
      {sidebarOpen && (
        <div 
          onClick={() => setSidebarOpen(false)} 
          className="md:hidden absolute inset-0 bg-black/50 z-40" 
        />
      )}

      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-[260px] translate-x-0' : 'w-[80px] -translate-x-full md:translate-x-0'} bg-[#0c1222] text-white flex flex-col h-full shrink-0 transition-all duration-300 absolute md:relative z-50`}>
        <div className="p-6 flex items-center justify-between whitespace-nowrap overflow-hidden">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shrink-0">
              <LayoutDashboard className="w-5 h-5 text-white" />
            </div>
            {sidebarOpen && (
              <div className="transition-opacity">
                <div className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Admin Console</div>
                <div className="text-2xl font-bold tracking-tight">Safai</div>
              </div>
            )}
          </div>
          <button className="md:hidden text-slate-400 hover:text-white" onClick={() => setSidebarOpen(false)}>
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="mt-2 flex-1 overflow-y-auto custom-scrollbar overflow-x-hidden">
          <div className="px-6 py-3.5 flex items-center cursor-pointer bg-gradient-to-r from-blue-600/20 to-transparent border-l-4 border-blue-500 text-white">
            <LayoutDashboard className="w-5 h-5 shrink-0" />
            {sidebarOpen && <span className="ml-3 text-sm font-semibold">Main Dashboard</span>}
          </div>
          <div className="px-6 py-3.5 flex items-center cursor-pointer text-slate-400 hover:text-white border-l-4 border-transparent">
            <Layers className="w-5 h-5 shrink-0" />
            {sidebarOpen && <span className="ml-3 text-sm font-semibold">Location Hierarchy</span>}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden w-full">
        <div className="h-[76px] bg-white border-b border-slate-200 flex justify-between items-center px-4 md:px-8 shrink-0 shadow-sm">
          <div className="flex items-center gap-3 md:gap-5">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="w-8 h-8 rounded hover:bg-slate-100 flex items-center justify-center text-slate-500">
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex w-8 h-8 rounded-full bg-blue-50 items-center justify-center text-blue-600">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm md:text-lg font-bold text-slate-800 leading-tight flex items-center gap-2">
                  Nagpur Station <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                </h2>
                <p className="hidden sm:block text-[11px] font-bold text-slate-500">Clean. Safe. Compliant.</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3 md:gap-6">
            <div className="relative hidden lg:block">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <input type="text" placeholder="Search anything..." className="pl-10 pr-4 py-2 bg-slate-100 rounded-full text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
            </div>
            <div className="flex items-center gap-2 md:gap-3 bg-slate-50 px-1 md:px-2 py-1.5 rounded-full md:pr-4 border border-slate-100 cursor-pointer">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xs">OP</div>
              <div className="hidden md:block">
                <div className="text-xs font-bold text-slate-700 leading-none">Omkar Porlikar</div>
                <div className="text-[8px] font-bold text-blue-600 uppercase tracking-widest mt-1">Super Admin</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable Dashboard Body */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
          
          {/* KPI Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-6">
              <div className="bg-white rounded-2xl p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-slate-100 flex items-center gap-4 hover:-translate-y-1 hover:shadow-lg transition-all cursor-pointer">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-md bg-blue-500 shrink-0"><LayoutDashboard className="w-6 h-6" /></div>
                  <div>
                      <div className="text-2xl font-black text-slate-800 leading-none">13</div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase mt-1 mb-1">Total Toilets</div>
                      <div className="text-[10px] font-bold flex items-center gap-0.5 text-emerald-500"><ArrowUp className="w-2.5 h-2.5" /> + 8% <span className="text-slate-400 font-medium ml-0.5">vs last week</span></div>
                  </div>
              </div>
              <div className="bg-white rounded-2xl p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-slate-100 flex items-center gap-4 hover:-translate-y-1 hover:shadow-lg transition-all cursor-pointer">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-md bg-emerald-500 shrink-0"><Activity className="w-6 h-6" /></div>
                  <div>
                      <div className="text-2xl font-black text-slate-800 leading-none">{ongoingCount}</div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase mt-1 mb-1">Ongoing Tasks</div>
                      <div className="text-[10px] font-bold flex items-center gap-0.5 text-slate-400">— Live Sync </div>
                  </div>
              </div>
              <div className="bg-white rounded-2xl p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-slate-100 flex items-center gap-4 hover:-translate-y-1 hover:shadow-lg transition-all cursor-pointer">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-md bg-cyan-500 shrink-0"><CheckCircle className="w-6 h-6" /></div>
                  <div>
                      <div className="text-2xl font-black text-slate-800 leading-none">{completedCount}</div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase mt-1 mb-1">Completed Tasks</div>
                      <div className="text-[10px] font-bold flex items-center gap-0.5 text-emerald-500"><ArrowUp className="w-2.5 h-2.5" /> + 25% <span className="text-slate-400 font-medium ml-0.5">vs last week</span></div>
                  </div>
              </div>
              <div className="bg-white rounded-2xl p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-slate-100 flex items-center gap-4 hover:-translate-y-1 hover:shadow-lg transition-all cursor-pointer">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-md bg-orange-500 shrink-0"><Wrench className="w-6 h-6" /></div>
                  <div>
                      <div className="text-2xl font-black text-slate-800 leading-none">0</div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase mt-1 mb-1">Total Repairs</div>
                      <div className="text-[10px] font-bold flex items-center gap-0.5 text-slate-400">— No change </div>
                  </div>
              </div>
              <div className="bg-white rounded-2xl p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-slate-100 flex items-center gap-4 hover:-translate-y-1 hover:shadow-lg transition-all cursor-pointer">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-md bg-purple-500 shrink-0"><UserCog className="w-6 h-6" /></div>
                  <div>
                      <div className="text-2xl font-black text-slate-800 leading-none">12</div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase mt-1 mb-1">Total Cleaners</div>
                      <div className="text-[10px] font-bold flex items-center gap-0.5 text-emerald-500"><ArrowUp className="w-2.5 h-2.5" /> + 9% <span className="text-slate-400 font-medium ml-0.5">vs last week</span></div>
                  </div>
              </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 mb-6">
              {/* Cleanliness Overview */}
              <div className="xl:col-span-5 bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                  <div className="flex justify-between items-center mb-6">
                      <div className="flex items-center gap-2 text-slate-800 font-bold text-sm">
                          <TrendingUp className="w-4 h-4 text-blue-500" /> CLEANLINESS OVERVIEW
                      </div>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center gap-8 mb-4">
                      <div className="relative w-40 h-40 shrink-0">
                          <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90 filter drop-shadow-sm">
                              <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#f1f5f9" strokeWidth="3" />
                              <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="url(#donut-grad)" strokeWidth="4" strokeDasharray={`${dashOffset}, 100`} strokeLinecap="round" className="transition-all duration-1000" />
                              <defs>
                                  <linearGradient id="donut-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                                      <stop offset="0%" stopColor="#3b82f6" />
                                      <stop offset="100%" stopColor="#10b981" />
                                  </linearGradient>
                              </defs>
                          </svg>
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                              <span className="text-4xl font-black text-slate-800">{avgScore}</span>
                              <span className="text-[10px] font-bold text-slate-500 mb-1">Overall Score</span>
                          </div>
                      </div>
                      <div className="flex-1 w-full space-y-3">
                          {locationBars.length > 0 ? (
                              locationBars.slice(0, 3).map(([title, data], i) => {
                                 const pct = (parseFloat(data.score) / 10) * 100;
                                 return (
                                    <div key={i} className={`flex items-center text-xs mt-3 rounded-lg ${data.isNew ? 'bg-blue-50 p-2' : ''}`}>
                                        <div className="w-40 font-semibold text-slate-600 truncate">{title}</div>
                                        <div className="flex-1 mx-2 relative h-1.5 bg-slate-100 rounded-full">
                                            <div className="absolute top-0 left-0 h-1.5 rounded-full bg-emerald-500 transition-all duration-1000" style={{ width: `${pct}%` }}></div>
                                        </div>
                                        <div className="w-6 text-right text-slate-800 font-bold">{data.score}</div>
                                    </div>
                                 )
                              })
                          ) : (
                              defaultLocationBars.map((item, i) => (
                                <div key={i} className="flex items-center text-xs mt-3 rounded-lg">
                                    <div className="w-40 font-semibold text-slate-600 truncate">{item.title}</div>
                                    <div className="flex-1 mx-2 relative h-1.5 bg-slate-100 rounded-full">
                                        <div className="absolute top-0 left-0 h-1.5 rounded-full bg-emerald-500" style={{ width: `${item.pct}%` }}></div>
                                    </div>
                                    <div className="w-6 text-right text-slate-800 font-bold">{item.score}</div>
                                </div>
                              ))
                          )}
                      </div>
                  </div>
              </div>

              {/* Spline Graph */}
              <div className="xl:col-span-7 bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col">
                  <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-2 text-slate-800 font-bold text-sm">
                          <Activity className="w-4 h-4 text-indigo-500" /> WEEKLY CLEANER PERFORMANCE
                      </div>
                  </div>
                  <div className="flex-1 relative mt-4 h-[160px] min-h-[160px] overflow-hidden">
                      <div className="absolute inset-0 flex flex-col justify-between pb-6 text-[10px] text-slate-400 font-medium">
                          <div className="border-b border-slate-100 border-dashed w-full h-0 flex items-center"><span>{yMax}</span></div>
                          <div className="border-b border-slate-100 border-dashed w-full h-0 flex items-center"><span>{Math.round(yMax * 0.75)}</span></div>
                          <div className="border-b border-slate-100 border-dashed w-full h-0 flex items-center"><span>{Math.round(yMax * 0.5)}</span></div>
                          <div className="border-b border-slate-100 border-dashed w-full h-0 flex items-center"><span>{Math.round(yMax * 0.25)}</span></div>
                          <div className="border-b border-slate-100 border-dashed w-full h-0 flex items-center"><span>0</span></div>
                      </div>
                      <div className="absolute left-6 right-0 top-0 bottom-6">
                          <svg width="100%" height="100%" viewBox={`0 0 ${svgWidth} 120`} preserveAspectRatio="none">
                              <defs>
                                  <linearGradient id="purple-fade" x1="0" x2="0" y1="0" y2="1">
                                      <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.3" />
                                      <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                                  </linearGradient>
                              </defs>
                              <path d={fillD} fill="url(#purple-fade)" />
                              <path d={pathD} fill="none" stroke="#8b5cf6" strokeWidth="3" />
                              {points.map((p, i) => (
                                <circle key={i} cx={p.x} cy={p.y} r="5" fill="white" stroke="#8b5cf6" strokeWidth="2" />
                              ))}
                          </svg>
                          {points.map((p, i) => (
                            <div key={i} className="absolute flex flex-col items-center transform -translate-x-1/2" style={{left: `${(p.x/svgWidth)*100}%`, top: p.y - 25}}>
                                <div className="bg-blue-50 border border-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded-md shadow-sm">{p.val}</div>
                            </div>
                          ))}
                      </div>
                      <div className="absolute left-6 right-0 bottom-0 flex justify-between text-[10px] sm:text-[11px] font-bold text-slate-500">
                          <span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span><span>Mon</span>
                      </div>
                  </div>
              </div>
          </div>

          {/* Heatmap */}
          <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-slate-100 mb-6 overflow-hidden">
              <h3 className="font-bold text-sm text-slate-800 mb-4 flex items-center gap-2"><LayoutDashboard className="w-4 h-4 text-blue-500" /> HYGIENE PERFORMANCE HEATMAP</h3>
              <div className="overflow-x-auto pb-4 custom-scrollbar">
                  <table className="w-full text-[10px] text-center border-collapse min-w-[800px] md:min-w-[1000px]">
                      <thead>
                          <tr className="text-slate-500 font-bold border-b border-slate-100">
                              <th className="text-left py-2 min-w-[150px] sticky left-0 bg-white z-10">Washroom</th>
                              {last31Days.map((day, i) => (
                                  <th key={i} className="py-2 px-1 w-6 sm:w-8">{day}</th>
                              ))}
                              <th className="py-2 px-2 font-black text-slate-700 sticky right-0 bg-white z-10">Avg</th>
                          </tr>
                      </thead>
                      <tbody>
                          {Object.entries(heatmapData).map(([title, data], index) => {
                              let rowSum = 0;
                              let rowCount = 0;
                              
                              const cols = last31Days.map(day => {
                                  let dayData = data.dates[day];
                                  let scoresForDay = dayData ? dayData.scores : [];
                                  if (scoresForDay.length > 0) {
                                      let avgForDay = (scoresForDay.reduce((a,b)=>a+b, 0) / scoresForDay.length).toFixed(1);
                                      rowSum += parseFloat(avgForDay);
                                      rowCount++;
                                      
                                      let bgClass = 'bg-slate-100 text-slate-400';
                                      let v = parseFloat(avgForDay);
                                      if(v >= 9) bgClass = 'bg-emerald-100 text-emerald-800';
                                      else if(v >= 7) bgClass = 'bg-blue-100 text-blue-800';
                                      else if(v >= 5) bgClass = 'bg-orange-100 text-orange-800';
                                      else bgClass = 'bg-red-100 text-red-800';
                                      
                                      return (
                                          <td key={day} className="py-1 px-0.5">
                                            <div className={`w-full min-w-[24px] py-1.5 rounded-sm font-bold ${bgClass}`}>{avgForDay}</div>
                                          </td>
                                      );
                                  } else {
                                      return (
                                          <td key={day} className="py-1 px-0.5">
                                            <div className="w-full min-w-[24px] py-1.5 rounded-sm font-bold bg-slate-100 text-slate-400">-</div>
                                          </td>
                                      );
                                  }
                              });
                              
                              let hAvg = rowCount > 0 ? (rowSum / rowCount).toFixed(1) : '-';

                              return (
                                  <tr key={index} className="border-b border-slate-50 hover:bg-slate-50 transition-colors group">
                                      <td className="text-left py-2 px-2 text-[10px] font-bold text-slate-700 truncate max-w-[160px] sticky left-0 bg-white group-hover:bg-slate-50">{title}</td>
                                      {cols}
                                      <td className="py-2 px-2 font-black text-slate-800 sticky right-0 bg-white group-hover:bg-slate-50">{hAvg}</td>
                                  </tr>
                              );
                          })}
                      </tbody>
                  </table>
              </div>
          </div>

          {/* Bottom Insights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                  <div className="flex items-center gap-2 text-slate-800 font-bold text-xs uppercase mb-4"><span className="text-orange-500 text-sm">🏆</span> TOP RATED WASHROOMS</div>
                  <div className="space-y-4">
                      {sortedLocs.map(([title, score], index) => {
                          let color = colors[index] || 'bg-slate-400';
                          return (
                            <div key={index} className="flex items-center justify-between mt-3">
                                <div className="flex items-center gap-3">
                                    <div className={`w-6 h-6 rounded-full text-white text-[10px] font-bold flex items-center justify-center ${color}`}>{index + 1}</div>
                                    <div>
                                        <div className="text-[11px] font-bold text-slate-700 leading-tight truncate max-w-[140px]">{title}</div>
                                        <div className="flex gap-0.5 mt-0.5">
                                            <Star className="w-2.5 h-2.5 fill-current text-orange-400 border-0" />
                                            <Star className="w-2.5 h-2.5 fill-current text-orange-400 border-0" />
                                            <Star className="w-2.5 h-2.5 fill-current text-orange-400 border-0" />
                                            <Star className="w-2.5 h-2.5 fill-current text-orange-400 border-0" />
                                            <Star className="w-2.5 h-2.5 fill-current text-slate-200 border-0" />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="font-bold text-sm text-slate-800">{score}</span>
                                </div>
                            </div>
                          )
                      })}
                  </div>
              </div>
              
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                  <div className="flex items-center gap-2 text-slate-800 font-bold text-xs uppercase mb-4"><Info className="w-3.5 h-3.5 text-orange-500" /> INSIGHTS AT A GLANCE</div>
                  <div className="grid grid-cols-2 gap-4">
                      <div className="border border-slate-100 rounded-xl p-3 bg-slate-50/50">
                          <div className="text-[10px] font-bold text-slate-500 mb-1">Avg. Cleanliness</div>
                          <div className="text-2xl font-bold text-slate-800">{avgScore}</div>
                      </div>
                      <div className="border border-slate-100 rounded-xl p-3 bg-slate-50/50">
                          <div className="text-[10px] font-bold text-slate-500 mb-1">Total Inspections</div>
                          <div className="text-2xl font-bold text-blue-600">{completedCount}</div>
                      </div>
                  </div>
                  
                  <div className="mt-6 border-t border-slate-100 pt-4">
                      <div className="flex items-center gap-2 text-slate-800 font-bold text-xs uppercase mb-4"><Activity className="w-3.5 h-3.5 text-blue-500" /> LIVE ACTIVITY FEED</div>
                      <div className="relative border-l-2 border-slate-100 ml-2 space-y-4">
                          {(appState?.logs || []).slice(0, 3).map((log, index) => (
                            <div key={index} className="relative pl-6 pb-2">
                                <div className={`absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full ${log.color} border-2 border-white shadow-sm`}></div>
                                <div className="text-[11px] font-medium text-slate-600 leading-snug" dangerouslySetInnerHTML={{ __html: log.text }}></div>
                                <div className="absolute right-0 top-0"><span className="text-[9px] font-bold text-slate-400">{log.time}</span></div>
                            </div>
                          ))}
                          {(!appState?.logs || appState.logs.length === 0) && (
                              <div className="text-xs text-slate-400 font-medium ml-4">No recent activity.</div>
                          )}
                      </div>
                  </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}