'use client'

import StarRating from './StarRating'

export default function ReviewSection() {
  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Review submitted! You earned 100 points.')
  }

  return (
    <section className="px-[5%] py-28 text-center bg-white">
      <span className="section-tag">Be a Hygiene Hero</span>
      
      <h2 className="text-5xl font-extrabold mb-4">
        Review to Earn Ninja Stars
      </h2>
      
      <p className="text-[#636e72] mt-4 text-lg">
        Your feedback trains our AI. Help the community and climb the leaderboard.
      </p>

      <StarRating />

      {/* Review Form */}
      <div className="max-w-[650px] mx-auto bg-light p-12 rounded-[40px] mt-8">
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            placeholder="Restroom Name or Location"
            required
            className="w-full p-5 rounded-2xl border-2 border-gray-200 
                       font-inherit focus:outline-none focus:border-primary-purple 
                       transition-colors"
          />
          
          <textarea
            rows={4}
            placeholder="Describe the experience... (Our AI scans your text for detailed insights)"
            className="w-full p-5 rounded-2xl border-2 border-gray-200 
                       font-inherit resize-none focus:outline-none 
                       focus:border-primary-purple transition-colors"
          />
          
          <button type="submit" className="btn w-full">
            Upload Review & Earn 100 Pts
          </button>
        </form>
      </div>
    </section>
  )
}
