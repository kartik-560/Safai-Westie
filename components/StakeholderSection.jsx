// components/StakeholderSection.jsx
import React from 'react';

const StakeholderSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-cyan-50 via-blue-50 to-purple-50 py-20 px-5 lg:py-24">
      <div className="max-w-6xl mx-auto">
        {/* Container Card */}
      <div className="bg-white rounded-[32px] shadow-xl overflow-hidden border border-gray-100">
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
    {/* Left Content */}
    <div className="p-8 lg:p-12 xl:p-16 space-y-6">
      {/* Label */}
      <p className="text-[11px] font-semibold text-indigo-600 tracking-widest uppercase">
        Built for Every Sanitation Stakeholder
      </p>
      
      {/* Main Heading */}
      <h2 className="text-3xl lg:text-4xl xl:text-[42px] font-bold text-gray-900 leading-tight">
        Urban Local Bodies (ULBs)
      </h2>
      
      {/* Subtitle */}
      <p className="text-base lg:text-lg text-gray-700 font-medium">
        Clear visibility across public toilet infrastructure.
      </p>
      
      {/* Description */}
      <div className="space-y-4 text-sm lg:text-[15px] text-gray-600 leading-relaxed">
        <p>
          SaafAI helps urban local bodies understand the on-ground hygiene 
          condition of public toilets using simple, verified hygiene scores — 
          without relying only on periodic inspections or manual reports.
        </p>
        <p>
          Identify problem areas early, track improvements over time, and 
          strengthen accountability where it matters most.
        </p>
      </div>
      
      {/* Features */}
      <div className="space-y-3 pt-2">
        {/* Feature 1 */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-indigo-100 flex items-center justify-center flex-shrink-0">
            <svg 
              width="18" 
              height="18" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
              className="text-indigo-600"
            >
              <circle cx="12" cy="12" r="10"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
          </div>
          <span className="text-gray-800 text-sm lg:text-[15px] font-medium">
            Real-time hygiene monitoring
          </span>
        </div>
        
        {/* Feature 2 */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-indigo-100 flex items-center justify-center flex-shrink-0">
            <svg 
              width="18" 
              height="18" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
              className="text-indigo-600"
            >
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
              <line x1="12" y1="9" x2="12" y2="13"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
          </div>
          <span className="text-gray-800 text-sm lg:text-[15px] font-medium">
            Early detection of service gaps
          </span>
        </div>
        
        {/* Feature 3 */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-indigo-100 flex items-center justify-center flex-shrink-0">
            <svg 
              width="18" 
              height="18" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
              className="text-indigo-600"
            >
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <line x1="9" y1="9" x2="15" y2="9"/>
              <line x1="9" y1="13" x2="15" y2="13"/>
              <line x1="9" y1="17" x2="13" y2="17"/>
            </svg>
          </div>
          <span className="text-gray-800 text-sm lg:text-[15px] font-medium">
            Verified hygiene scores
          </span>
        </div>
      </div>
      
      {/* CTA Button */}
      <div className="pt-4">
        <button className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 text-white font-semibold text-sm lg:text-[15px] px-7 py-3 rounded-full hover:shadow-lg hover:shadow-cyan-500/30 hover:-translate-y-0.5 transition-all duration-200">
          Request a Demo
        </button>
      </div>
    </div>
    
    {/* Right Content - Dashboard Mockup */}
    <div className="flex justify-center items-center p-8 lg:p-12 bg-gradient-to-br from-cyan-50/50 to-blue-50/50">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 shadow-lg">
        {/* Mockup Header */}
        <div className="w-3/5 h-2.5 bg-gradient-to-r from-indigo-200 to-cyan-200 rounded-full mb-8"></div>
        
        {/* Mockup Content */}
        <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-20 flex items-center justify-center min-h-[240px]">
          <svg 
            width="70" 
            height="70" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.5"
            strokeLinecap="round"
            className="text-indigo-400"
          >
            <line x1="18" y1="20" x2="18" y2="10"/>
            <line x1="12" y1="20" x2="12" y2="4"/>
            <line x1="6" y1="20" x2="6" y2="14"/>
          </svg>
        </div>
      </div>
    </div>
  </div>
</div>

      </div>
    </section>
  );
};

export default StakeholderSection;
