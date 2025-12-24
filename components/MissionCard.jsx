export default function MissionCard({ icon, title, description }) {
  return (
    <div className="p-10 rounded-3xl bg-[#F9F9FB] 
                    transition-all duration-300 border border-black/5
                    hover:-translate-y-2.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.05)]
                    hover:bg-white">
      {icon}
      
      <h3 className="mt-5 text-xl font-bold text-[#2D3436]">
        {title}
      </h3>
      
      <p className="mt-4 text-[#636e72] leading-relaxed">
        {description}
      </p>
    </div>
  )
}
