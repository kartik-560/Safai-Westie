'use client'

export default function ToiletCard({
  score,
  name,
  description,
  meta,
  borderColor = 'border-primary-purple',
  badgeColor = 'bg-gradient-primary'
}) {
  return (
    <div className={`toilet-card border-l-8 ${borderColor}`}>
      <span className={`${badgeColor} text-white px-3.5 py-1.5 rounded-[20px] 
                        text-xs font-extrabold mb-3 inline-block`}>
        ✨ AI SCORE: {score}
      </span>
      <h3 className="text-lg font-bold mb-2">{name}</h3>
      <p className="text-[#636e72] my-2.5">{description}</p>
      <p className="font-semibold text-sm">{meta}</p>
    </div>
  )
}
