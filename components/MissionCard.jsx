export default function MissionCard({ icon, title, description, className = '' }) {
  return (
    <div className={`group p-6 rounded-3xl bg-emerald-100/50 
                    transition-all duration-300 
                    hover:-translate-y-2.5 hover:shadow-[0_20px_40px_rgba(16,185,129,0.15)] ${className}`}>

      <div className="p-5 rounded-3xl bg-white group-hover:bg-gradient-to-br group-hover:from-[#10b981] group-hover:to-[#06b6d4] transition-all duration-300">

        <div className="group-hover:[&>svg]:text-white transition-colors duration-300">
          {icon}
        </div>

        <h3 className="mt-5 text-xl font-bold text-[#2D3436] group-hover:text-white transition-colors duration-300">
          {title}
        </h3>

        <p className="mt-4 text-[#636e72] leading-relaxed group-hover:text-white transition-colors duration-300">
          {description}
        </p>

      </div>
    </div>
  )
}
