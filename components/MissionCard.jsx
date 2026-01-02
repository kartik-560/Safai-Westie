// export default function MissionCard({ icon, title, description, className = '' }) {
//   return (
//     <div className={`group relative p-8 rounded-3xl bg-[#1e293b]
//                     border border-gray-200/50
//                     shadow-[0_4px_20px_rgba(99,102,241,0.08)]
//                     transition-all duration-500 ease-out
//                     hover:-translate-y-3 hover:shadow-[0_24px_48px_rgba(99,102,241,0.2)]
//                     hover:border-transparent
//                     overflow-hidden ${className}`}>

//       {/* Gradient overlay on hover */}
//       <div className="absolute inset-0 bg-gradient-to-br from-[#6C5CE7] to-[#00D2D3] 
//                       opacity-0 group-hover:opacity-100 
//                       transition-opacity duration-500 rounded-3xl"></div>

//       {/* Subtle pattern overlay */}
//       <div className="absolute inset-0 opacity-0 group-hover:opacity-10 
//                       bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.3),transparent)] 
//                       transition-opacity duration-500"></div>

//       {/* Content */}
//       <div className="relative z-10">

//         {/* Icon Container */}
//         <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-indigo-50 to-cyan-50
//                         group-hover:bg-white/20 group-hover:backdrop-blur-sm
//                         transition-all duration-300
//                         group-hover:scale-110 group-hover:rotate-3">
//           <div className="text-[#6C5CE7] group-hover:text-white transition-colors duration-300
//                           [&>svg]:w-8 [&>svg]:h-8 [&>svg]:stroke-[2]">
//             {icon}
//           </div>
//         </div>

//         {/* Title */}
//         <h3 className="mt-6 text-2xl font-bold text-[#2D3436] 
//                        group-hover:text-white 
//                        transition-colors duration-300">
//           {title}
//         </h3>

//         {/* Description */}
//         <p className="mt-4 text-[#636e72] text-base leading-relaxed 
//                       group-hover:text-white/95 
//                       transition-colors duration-300">
//           {description}
//         </p>

//         {/* Bottom accent line */}
//         <div className="mt-6 h-1 w-0 bg-white rounded-full 
//                         group-hover:w-full transition-all duration-500 ease-out"></div>

//       </div>

//       {/* Glow effect */}
//       <div className="absolute -inset-0.5 bg-gradient-to-br from-[#6C5CE7] to-[#00D2D3] 
//                       rounded-3xl opacity-0 group-hover:opacity-20 blur-xl -z-10
//                       transition-opacity duration-500"></div>
//     </div>
//   )
// }


export default function MissionCard({ icon, title, description, className = '' }) {
  return (
    <div className={`group relative p-8 rounded-3xl 
                    bg-slate-800/90
                    backdrop-blur-sm
                    border border-slate-700/50
                    shadow-[0_4px_20px_rgba(0,0,0,0.3)]
                    transition-all duration-500 ease-out
                    hover:-translate-y-3 
                    hover:shadow-[0_24px_48px_rgba(108,92,231,0.4)]
                    hover:border-transparent
                    overflow-hidden ${className}`}>

      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#6C5CE7] to-[#00D2D3] 
                  opacity-0 group-hover:opacity-100 
                  transition-opacity duration-500 rounded-3xl"></div>

      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-10 
                  bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.3),transparent)] 
                  transition-opacity duration-500"></div>

      {/* Content */}
      <div className="relative z-10">

        {/* Icon Container */}
        <div className="inline-flex p-4 rounded-2xl 
                    bg-gradient-to-br from-purple-950/50 to-cyan-950/40
                    group-hover:bg-white/20 group-hover:backdrop-blur-sm
                    transition-all duration-300
                    group-hover:scale-110 group-hover:rotate-3
                    border border-purple-700/30">
          <div className="text-purple-400 
                      group-hover:text-white 
                      transition-colors duration-300
                      [&>svg]:w-8 [&>svg]:h-8 [&>svg]:stroke-[2]">
            {icon}
          </div>
        </div>

        {/* Title */}
        <h3 className="mt-6 text-2xl font-bold 
                   text-white
                   group-hover:text-white 
                   transition-colors duration-300">
          {title}
        </h3>

        {/* Description */}
        <p className="mt-4 text-base leading-relaxed 
                  text-slate-300
                  group-hover:text-white/95 
                  transition-colors duration-300">
          {description}
        </p>

        {/* Bottom accent line */}
        <div className="mt-6 h-1 w-0 bg-gradient-to-r from-[#6C5CE7] to-[#00D2D3]
                    group-hover:w-full transition-all duration-500 ease-out
                    rounded-full"></div>

      </div>

      {/* Glow effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-br from-[#6C5CE7] to-[#00D2D3] 
                  rounded-3xl opacity-0 
                  group-hover:opacity-30
                  blur-xl -z-10
                  transition-opacity duration-500"></div>
    </div>

  )
}