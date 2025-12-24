'use client'

export default function ToiletPopup({ toilet, onClose, onLocate, onStartRide }) {
  if (!toilet) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
         onClick={onClose}>
      <div className="bg-white rounded-3xl p-6 max-w-md w-full mx-4 shadow-2xl transform transition-all"
           onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-1">{toilet.name}</h3>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-primary-purple">{toilet.score}</span>
              <span className="text-sm text-gray-500">AI Score</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-2">{toilet.description}</p>
        
        {/* Meta Info */}
        {toilet.meta && (
          <p className="text-xs text-gray-500 mb-4">
            {toilet.meta}
          </p>
        )}

        {/* Additional Info (if available) */}
        {toilet.address && (
          <div className="flex items-start gap-2 mb-4 p-3 bg-gray-50 rounded-xl">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-primary-purple flex-shrink-0 mt-0.5">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="currentColor"/>
            </svg>
            <span className="text-sm text-gray-700">{toilet.address}</span>
          </div>
        )}

        {/* Features/Amenities (if available) */}
        {toilet.features && toilet.features.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {toilet.features.map((feature, index) => (
              <span key={index} className="px-3 py-1 bg-purple-50 text-primary-purple text-xs rounded-full">
                {feature}
              </span>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 
                       rounded-full font-semibold hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onLocate}
            className="flex-1 px-6 py-3 bg-primary-purple text-white 
                       rounded-full font-semibold hover:bg-primary-purple/90 
                       transition-colors shadow-lg"
          >
            📍 Locate
          </button>
        </div>
      </div>
    </div>
  )
}
