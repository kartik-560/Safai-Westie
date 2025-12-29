// components/FacilityManagementSection.jsx
import React from 'react';

const FacilityManagementSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-cyan-50 via-blue-50 to-purple-50 py-20 px-5 lg:py-24">
      <div className="max-w-6xl mx-auto">
        {/* Container Card */}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center p-8 lg:p-12 xl:p-16">
            {/* Left Content - Feature Cards Grid */}
            <div className="grid grid-cols-2 gap-4">
              {/* Quality Proof Card */}
              <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:border-indigo-300 hover:shadow-md transition-all">
                <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mb-3">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-indigo-600">
                    <path d="M9 11l3 3L22 4"/>
                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
                  </svg>
                </div>
                <span className="text-sm font-semibold text-gray-800">Quality Proof</span>
              </div>

              {/* Efficiency Card */}
              <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-3">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
                    <line x1="12" y1="5" x2="12" y2="19"/>
                    <polyline points="19 12 12 19 5 12"/>
                    <line x1="5" y1="5" x2="19" y2="5"/>
                  </svg>
                </div>
                <span className="text-sm font-semibold text-white">Efficiency</span>
              </div>

              {/* Client Trust Card */}
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-3">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                </div>
                <span className="text-sm font-semibold text-white">Client Trust</span>
              </div>

              {/* Response Card */}
              <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:border-indigo-300 hover:shadow-md transition-all">
                <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mb-3">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-indigo-600">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                </div>
                <span className="text-sm font-semibold text-gray-800">Response</span>
              </div>
            </div>
            
            {/* Right Content */}
            <div className="space-y-6">
              {/* Label */}
              <p className="text-xs font-semibold text-indigo-600 tracking-widest uppercase">
                Facility Management
              </p>
              
              {/* Main Heading */}
              <h2 className="text-3xl lg:text-4xl xl:text-[42px] font-bold text-gray-900 leading-tight">
                Consistent hygiene monitoring across managed facilities
              </h2>
              
              {/* Description */}
              <div className="space-y-4 text-sm lg:text-base text-gray-600 leading-relaxed">
                <p>
                  SaafAI gives facility managers a practical way to track cleanliness 
                  across multiple locations using standardized hygiene scores backed by 
                  verification and feedback.
                </p>
                <p>
                  Spot underperforming sites, improve service quality, and demonstrate 
                  compliance with confidence.
                </p>
              </div>
              
              {/* CTA Button */}
              <div className="pt-2">
                <button className="bg-black text-white font-semibold text-sm lg:text-base px-8 py-3.5 rounded-xl hover:bg-gray-800 transition-colors duration-200">
                  Get Partner Access
                </button>
              </div>
            </div>
          </div>
     
      </div>
    </section>
  );
};

export default FacilityManagementSection;
