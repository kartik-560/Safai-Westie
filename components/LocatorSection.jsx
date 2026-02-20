  'use client'

  import { useState, useEffect, useRef, useCallback } from 'react'
  import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api'
  import { Loader2, Search, X, Navigation, Map as MapIcon, Satellite } from 'lucide-react'

  const libraries = ['places']

  const mapContainerStyle = {
    width: '100%',
    height: '100%'
  }

  const defaultCenter = {
    lat: 18.5204,
    lng: 73.8567
  }

  function MapTypeToggle({ mapType, onChange }) {
    return (
      <div className="absolute top-4 left-4 z-10 flex flex-row gap-2">
        <button
          onClick={() => onChange('roadmap')}
          className={`px-3 py-2 text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 rounded-lg backdrop-blur-sm shadow-lg ${mapType === 'roadmap'
            ? 'bg-gradient-to-r from-[#6C5CE7] to-[#00D2D3] text-white'
            : 'bg-white/80 text-gray-700 hover:bg-white/90'
            }`}
          title="Map View"
        >
          <MapIcon className="w-4 h-4" />
          <span className="hidden sm:inline">Map</span>
        </button>

        <button
          onClick={() => onChange('hybrid')}
          className={`px-3 py-2 text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 rounded-lg backdrop-blur-sm shadow-lg ${mapType === 'hybrid'
            ? 'bg-gradient-to-r from-[#6C5CE7] to-[#00D2D3] text-white'
            : 'bg-white/80 text-gray-700 hover:bg-white/90'
            }`}
          title="Hybrid View"
        >
          <Satellite className="w-4 h-4" />
          <span className="hidden sm:inline">Hybrid</span>
        </button>
      </div>
    )
  }

  function SearchBar({ onSearch, search, onClear, searchRef }) {
    return (
      <div className="relative" ref={searchRef}>
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
        <input
          type="text"
          placeholder="🔍 Search toilets by name..."
          value={search}
          onChange={onSearch}
          className="w-full pl-12 pr-10 py-3.5 rounded-full shadow-md 
                    bg-slate-800/70 backdrop-blur-sm border border-slate-700
                    focus:outline-none focus:ring-2 focus:ring-cyan-500 
                    text-white placeholder-slate-400 text-sm font-medium"
        />
        {search && (
          <button
            onClick={onClear}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
    )
  }

  function MyLocationButton({ onClick, isLoading }) {
    return (
      <button
        onClick={onClick}
        disabled={isLoading}
        className="absolute bottom-4 left-4 z-10 bg-slate-800 rounded-full p-3 
                  shadow-lg hover:shadow-xl transition-all duration-200 
                  hover:scale-110 active:scale-95 disabled:opacity-50
                  border border-slate-700"
        title="Go to my location"
      >
        {isLoading ? (
          <Loader2 className="w-6 h-6 animate-spin text-cyan-400" />
        ) : (
          <Navigation className="w-6 h-6 text-cyan-400" />
        )}
      </button>
    )
  }

  const getAvailabilityStatus = (schedule) => {
    if (!schedule) return { label: 'Unknown', color: 'text-gray-400' }

    const now = new Date()
    const currentDay = now.toLocaleString('en-US', { weekday: 'long' }).toLowerCase()
    const currentTime = now.getHours() * 60 + now.getMinutes()

    // 24 HOURS MODE
    if (schedule.mode === 'TWENTY_FOUR_HOURS') {
      return { label: 'Open 24 Hours', color: 'text-green-400' }
    }

    // WEEKLY MODE
    const today = schedule.days?.[currentDay]
    if (!today || !today.open) {
      return { label: 'Closed Today', color: 'text-red-400' }
    }

    const parseTime = (timeStr) => {
      const [h, m] = timeStr.split(':').map(Number)
      return h * 60 + m
    }

    const openTime = parseTime(today.opens_at)
    const closeTime = parseTime(today.closes_at)

    // Overnight logic
    if (today.overnight) {
      if (currentTime >= openTime || currentTime <= closeTime) {
        return { label: 'Open Now', color: 'text-green-400' }
      }
    } else {
      if (currentTime >= openTime && currentTime <= closeTime) {
        return { label: 'Open Now', color: 'text-green-400' }
      }
    }

    return { label: 'Closed Now', color: 'text-red-400' }
  }


  function NearbyToiletCard({ toilet, onDirections, onFeedback }) {
    const handleFeedbackClick = () => {
      // Navigate to your form with location ID - opens in new tab
      window.open(`https://review-form1.vercel.app/?locationId=${toilet.id}`, '_blank')
    }
    const availability = getAvailabilityStatus(toilet.schedule)

    return (
      <div className="bg-gradient-to-br from-slate-800/70 to-slate-900/70 
        backdrop-blur-sm rounded-2xl p-4 shadow-md border border-slate-700/50 
        hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/20 transition-all">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h4 className="font-bold text-white text-sm line-clamp-1">{toilet.name}</h4>
            <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
              <span>📍</span>
              <span>{toilet.distance.toFixed(1)} km away</span>
            </p>
            <p className={`text-xs font-semibold mt-1 ${availability.color}`}>
              🕒 {availability.label}
            </p>
          </div>
          {toilet.averageRating && (
            <div className="flex items-center gap-1 bg-yellow-500/20 px-2 py-1 rounded-full border border-yellow-500/30">
              <span className="text-yellow-400 text-sm">⭐</span>
              <span className="text-sm font-bold text-yellow-400">
                {toilet.averageRating.toFixed(1)}
              </span>
            </div>
          )}


        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onDirections(toilet)}
            className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-500 text-white 
                      px-3 py-2 rounded-lg text-xs font-semibold hover:shadow-md 
                      hover:shadow-blue-500/30 transition-all flex items-center justify-center gap-1.5"
          >
            <Navigation className="w-3.5 h-3.5" />
            Directions
          </button>
          <button
            onClick={handleFeedbackClick}
            className="flex-1 bg-slate-800 border-2 border-cyan-500 text-cyan-400 
                      px-3 py-2 rounded-lg text-xs font-semibold hover:bg-cyan-500/10 
                      transition-all"
          >
            📝 Feedback
          </button>
        </div>
      </div>
    )
  }
  export default function LocatorSection() {
    const { isLoaded, loadError } = useLoadScript({
      googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
      libraries
    })
    const [nearbyToilets, setNearbyToilets] = useState([])
    const [locations, setLocations] = useState([])
    const [filtered, setFiltered] = useState([])
    const [selected, setSelected] = useState(null)
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')
    const [center, setCenter] = useState(defaultCenter)
    const [showDropdown, setShowDropdown] = useState(false)
    const [userLocation, setUserLocation] = useState(null)
    const [isRequestingLocation, setIsRequestingLocation] = useState(false)
    const [mapType, setMapType] = useState('roadmap')
    const [userCity, setUserCity] = useState(null)
    const [serviceStatus, setServiceStatus] = useState(null)
    const [isSubmittingRequest, setIsSubmittingRequest] = useState(false)
    const [requestSubmitted, setRequestSubmitted] = useState(false)
    const mapRef = useRef(null)
    const searchRef = useRef(null)
    const watchIdRef = useRef(null)
    const companyId = 24

    const SERVICE_CITY = 'nagpur'
    const SERVICE_RADIUS_KM = 3

    // Fetch locations from API
    const fetchToiletLocations = useCallback(async () => {
      setLoading(true)
      try {
        const response = await fetch(
          `https://dash-backend-five.vercel.app/api/locations/saafai_locations?company_id=${companyId}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        console.log('✅ Fetched locations:', data)
        setLocations(data)
        setFiltered(data)
      } catch (error) {
        console.error('❌ Error fetching locations:', error)
        setLocations([])
        setFiltered([])
      } finally {
        setLoading(false)
      }
    }, [companyId])

    useEffect(() => {
      if (isLoaded) {
        fetchToiletLocations()
      }
    }, [isLoaded, fetchToiletLocations])

    const calculateDistance = (lat1, lon1, lat2, lon2) => {
      const R = 6371 // Earth's radius in km
      const dLat = (lat2 - lat1) * Math.PI / 180
      const dLon = (lon2 - lon1) * Math.PI / 180
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
      return R * c // Distance in km
    }

    // Request user location
    const requestUserLocation = useCallback(() => {
      if (!navigator.geolocation) {
        console.error('Geolocation is not supported by your browser')
        alert('Geolocation is not supported by your browser')
        return
      }

      setIsRequestingLocation(true)

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userPos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
          setUserLocation(userPos)
          setCenter(userPos)
          fetchUserCity(userPos.lat, userPos.lng)
          setIsRequestingLocation(false)

          if (locations.length > 0) {
            const toiletsWithDistance = locations.map(loc => ({
              ...loc,
              distance: calculateDistance(
                userPos.lat,
                userPos.lng,
                parseFloat(loc.latitude),
                parseFloat(loc.longitude)
              )
            }))

            const nearest = toiletsWithDistance
              .filter(loc => !isNaN(loc.distance) && loc.distance <= SERVICE_RADIUS_KM)
              .sort((a, b) => a.distance - b.distance)
              .slice(0, 5)

            setNearbyToilets(nearest)
          }

          if (mapRef.current) {
            mapRef.current.panTo(userPos)
            mapRef.current.setZoom(13)
          }

          if (watchIdRef.current) {
            navigator.geolocation.clearWatch(watchIdRef.current)
          }

          watchIdRef.current = navigator.geolocation.watchPosition(
            (position) => {
              const userPos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              }

              setUserLocation(userPos)

              if (locations.length > 0) {
                const toiletsWithDistance = locations.map(loc => ({
                  ...loc,
                  distance: calculateDistance(
                    userPos.lat,
                    userPos.lng,
                    parseFloat(loc.latitude),
                    parseFloat(loc.longitude)
                  )
                }))

                const nearest = toiletsWithDistance
                  .filter(loc => !isNaN(loc.distance))
                  .sort((a, b) => a.distance - b.distance)
                  .slice(0, 5)

                setNearbyToilets(nearest)
              }

              // if (mapRef.current) {
              //   mapRef.current.panTo(userPos)
              // }
            },
            (error) => {
              console.log('Watch position update failed:', error.code, error.message)
            },
            {
              enableHighAccuracy: true,
              timeout: 15000,
              maximumAge: 5000
            }
          )
        },
        (error) => {
          console.error('Geolocation error:', {
            code: error.code,
            message: error.message
          })
          setIsRequestingLocation(false)

          let errorMessage = 'Unable to get your location.'
          switch (error.code) {
            case 1:
              errorMessage = 'Location access denied. You can still browse all toilets on the map.'
              break
            case 2:
              errorMessage = 'Location information unavailable. You can still browse all toilets on the map.'
              break
            case 3:
              errorMessage = 'Location request timed out. You can still browse all toilets on the map.'
              break
          }
          alert(errorMessage)
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      )
    }, [locations])


    useEffect(() => {
      if (!userLocation || !userCity) return

      if (userCity !== SERVICE_CITY) {
        setServiceStatus('not_available')
        return
      }

      if (nearbyToilets.length === 0) {
        setServiceStatus('out_of_radius')
      } else {
        setServiceStatus('available')
      }
    }, [userCity, userLocation, nearbyToilets])


    const handleRequestService = async () => {
      if (!userLocation || !serviceStatus || isSubmittingRequest || requestSubmitted) return

      setIsSubmittingRequest(true)

      try {
        await fetch('https://dash-backend-five.vercel.app/api/service-req', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            latitude: userLocation.lat,
            longitude: userLocation.lng,
            city: userCity,
            requestType:
              serviceStatus === 'not_available'
                ? 'CITY_NOT_AVAILABLE'
                : 'NO_TOILET_WITHIN_RADIUS',
          }),
        })

        setRequestSubmitted(true) // ✅ UI trigger
      } catch (err) {
        console.error(err)
        alert('❌ Failed to submit request')
      } finally {
        setIsSubmittingRequest(false)
      }
    }


    useEffect(() => {
      return () => {
        if (watchIdRef.current) {
          navigator.geolocation.clearWatch(watchIdRef.current)
        }
      }
    }, [])

    useEffect(() => {
      if (!userLocation || locations.length === 0) return

      const toiletsWithDistance = locations.map(loc => ({
        ...loc,
        distance: calculateDistance(
          userLocation.lat,
          userLocation.lng,
          parseFloat(loc.latitude),
          parseFloat(loc.longitude)
        ),
      }))

      const withinRadius = toiletsWithDistance
        .filter(
          loc =>
            !isNaN(loc.distance) &&
            loc.distance <= SERVICE_RADIUS_KM // ✅ HARD RULE
        )
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 5)

      setNearbyToilets(withinRadius)
    }, [userLocation, locations])



    const fetchUserCity = async (lat, lng) => {
      try {
        const res = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
        )
        const data = await res.json()

        const cityComponent = data.results?.[0]?.address_components?.find(c =>
          c.types.includes('locality')
        )

        setUserCity(cityComponent?.long_name?.toLowerCase() || 'unknown')
      } catch (err) {
        console.error('Failed to fetch city', err)
        setUserCity('unknown')
      }
    }

    // Handle search input changes
    const handleInputChange = (e) => {
      const value = e.target.value
      setSearch(value)

      if (value.trim() === '') {
        setFiltered(locations)
        setShowDropdown(false)
      } else {
        const matches = locations.filter((loc) =>
          loc.name.toLowerCase().includes(value.toLowerCase()) ||
          loc.address?.toLowerCase().includes(value.toLowerCase()) ||
          loc.city?.toLowerCase().includes(value.toLowerCase())
        )
        setFiltered(matches)
        setShowDropdown(matches.length > 0)
      }
    }

    // Handle location selection from dropdown
    const handleLocationSelect = (loc) => {
      const lat = parseFloat(loc.latitude)
      const lng = parseFloat(loc.longitude)

      setCenter({ lat, lng })
      setSelected(loc)
      setSearch(loc.name)
      setShowDropdown(false)

      if (mapRef.current) {
        mapRef.current.panTo({ lat, lng })
        mapRef.current.setZoom(16)
      }
    }

    // Clear search
    const handleClearSearch = () => {
      setSearch('')
      setFiltered(locations)
      setShowDropdown(false)
      setSelected(null)
    }

    // Handle map type change
    const handleMapTypeChange = (type) => {
      setMapType(type)
      if (mapRef.current) {
        mapRef.current.setMapTypeId(type)
      }
    }

    // Close dropdown when clicking outside
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (searchRef.current && !searchRef.current.contains(event.target)) {
          setShowDropdown(false)
        }
      }

      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }, [])

    if (loadError) {
      return <div className="text-center py-8 text-red-400">Error loading maps</div>
    }

    if (!isLoaded) {
      return (
        <div className="flex justify-center items-center h-96">
          <Loader2 className="w-8 h-8 animate-spin text-cyan-400" />
        </div>
      )
    }

    // Get valid locations with coordinates
    const validLocations = filtered.filter(loc => {
      const lat = parseFloat(loc.latitude)
      const lng = parseFloat(loc.longitude)
      return !isNaN(lat) && !isNaN(lng) && lat !== 0 && lng !== 0
    })

    const sidebarToilets =
      search.trim().length > 0
        ? filtered.map(loc => ({
          ...loc,
          distance: userLocation
            ? calculateDistance(
              userLocation.lat,
              userLocation.lng,
              parseFloat(loc.latitude),
              parseFloat(loc.longitude)
            )
            : null,
        }))
        : nearbyToilets


    return (
      <section id="locator" className="px-[5%] py-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] h-auto lg:h-[650px] 
                        bg-gradient-to-br from-slate-800/70 to-slate-900/70 backdrop-blur-sm
                        rounded-[50px] overflow-hidden shadow-2xl border border-slate-700/50">

          {/* Map Section */}
          <div className="bg-[#e1e8ed] h-[400px] lg:h-full flex flex-col">
            <div className="px-4 pt-4 pb-2">
              <SearchBar
                onSearch={handleInputChange}
                search={search}
                onClear={handleClearSearch}
                searchRef={searchRef}
              />

              {/* Search Results Dropdown */}
              {showDropdown && filtered.length > 0 && (
                <div className="absolute z-20 w-[calc(100%-2rem)] mt-1 
                  bg-slate-800 border border-slate-700 rounded-2xl shadow-xl 
                  max-h-60 overflow-y-auto backdrop-blur-sm">
                  {filtered.map((loc) => (
                    <div
                      key={loc.id}
                      onClick={() => handleLocationSelect(loc)}
                      className="px-4 py-3 hover:bg-slate-700/50 cursor-pointer 
                        border-b border-slate-700/50 last:border-b-0 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="font-medium text-white">{loc.name}</p>
                          <p className="text-xs text-slate-400 mt-1">
                            📍 {loc.address || `${loc.city}, ${loc.state}`}
                          </p>
                        </div>
                        {loc.averageRating && loc.averageRating > 0 && (
                          <div className="flex items-center gap-1 ml-2">
                            <span className="text-yellow-400">⭐</span>
                            <span className="text-sm font-medium text-white">{loc.averageRating.toFixed(1)}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {showDropdown && filtered.length === 0 && search && (
                <div className="absolute z-20 w-[calc(100%-2rem)] mt-1 
                  bg-slate-800 border border-slate-700 rounded-2xl shadow-xl 
                  p-4 text-center text-slate-400 backdrop-blur-sm">
                  No toilets found matching &quot;{search}&quot;
                </div>
              )}
            </div>

            <div className="relative flex-1">
              <MyLocationButton
                onClick={requestUserLocation}
                isLoading={isRequestingLocation}
              />

              <MapTypeToggle
                mapType={mapType}
                onChange={handleMapTypeChange}
              />

              {isRequestingLocation && (
                <div className="absolute top-4 left-1/2 -translate-x-1/2 
                                bg-cyan-500/20 border-2 border-cyan-400 text-cyan-400 
                                px-4 py-3 rounded-lg text-sm z-10 shadow-lg backdrop-blur-sm">
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Getting your location...</span>
                  </div>
                </div>
              )}

              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={center}
                zoom={13}
                onLoad={(map) => {
                  mapRef.current = map
                  map.setMapTypeId(mapType)
                }}
                options={{
                  gestureHandling: 'cooperative',
                  disableDefaultUI: false,
                  streetViewControl: false,
                  zoomControl: true,
                  mapTypeControl: false,
                  fullscreenControl: false,
                  mapTypeId: mapType
                }}
              >
                {/* User Location Marker */}
                {userLocation && (
                  <Marker
                    position={userLocation}
                    icon={{
                      path: window.google.maps.SymbolPath.CIRCLE,
                      scale: 14,
                      fillColor: '#4285F4',
                      fillOpacity: 1,
                      strokeColor: '#FFFFFF',
                      strokeWeight: 4
                    }}
                    title="You are here"
                  />
                )}

                {/* Toilet Markers */}
                {validLocations.map((loc) => {
                  const lat = parseFloat(loc.latitude)
                  const lng = parseFloat(loc.longitude)

                  return (
                    <Marker
                      key={loc.id}
                      position={{ lat, lng }}
                      onClick={() => {
                        setSelected(loc)
                        setCenter({ lat, lng })
                      }}
                      title={loc.name}
                      icon={{
                        url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
                        scaledSize: new window.google.maps.Size(40, 40)
                      }}
                    />
                  )
                })}

                {/* Info Window */}
                {selected && (
                  <InfoWindow
                    position={{
                      lat: parseFloat(selected.latitude),
                      lng: parseFloat(selected.longitude)
                    }}
                    onCloseClick={() => setSelected(null)}
                    options={{
                      pixelOffset: new window.google.maps.Size(0, -10),
                      maxWidth: 320
                    }}
                  >
                    <div style={{ width: '100%', maxWidth: '280px' }}>
                      {/* Image */}
                      <div style={{ position: 'relative' }}>
                        <img
                          src={
                            selected.images && selected.images.length > 0
                              ? selected.images[0]
                              : 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=500'
                          }
                          alt={selected.name}
                          style={{ width: '100%', height: '144px', objectFit: 'cover', borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }}
                          onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=500'
                          }}
                        />
                        {selected.images && selected.images.length > 1 && (
                          <div style={{
                            position: 'absolute',
                            top: '8px',
                            right: '8px',
                            backgroundColor: 'rgba(0,0,0,0.7)',
                            color: 'white',
                            padding: '4px 8px',
                            borderRadius: '9999px',
                            fontSize: '12px',
                            fontWeight: '500'
                          }}>
                            {selected.no_of_photos || selected.images.length} photos
                          </div>
                        )}
                        {selected.averageRating && (
                          <div style={{
                            position: 'absolute',
                            bottom: '8px',
                            left: '8px',
                            backgroundColor: 'rgba(255,255,255,0.95)',
                            padding: '4px 8px',
                            borderRadius: '9999px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                          }}>
                            <span style={{ fontSize: '14px' }}>⭐</span>
                            <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#111' }}>{selected.averageRating.toFixed(1)}</span>
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div style={{ padding: '16px' }}>
                        <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#111', marginBottom: '8px', lineHeight: '1.4' }}>
                          {selected.name}
                        </h3>

                        <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '12px', display: 'flex', alignItems: 'flex-start', gap: '4px' }}>
                          <span style={{ flexShrink: 0, marginTop: '2px' }}>📍</span>
                          <span>{selected.address || `${selected.city}, ${selected.state} ${selected.pincode}`}</span>
                        </p>

                        {/* Get Directions Button */}
                        <button
                          onClick={() => {
                            const url = `https://www.google.com/maps/dir/?api=1&destination=${selected.latitude},${selected.longitude}`
                            window.open(url, '_blank')
                          }}
                          style={{
                            width: '100%',
                            marginTop: '8px',
                            padding: '10px 16px',
                            backgroundColor: '#6C5CE7',
                            color: 'white',
                            borderRadius: '8px',
                            fontSize: '14px',
                            fontWeight: '600',
                            border: 'none',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                          }}
                        >
                          <Navigation style={{ width: '16px', height: '16px' }} />
                          Get Directions
                        </button>
                      </div>
                    </div>
                  </InfoWindow>
                )}
              </GoogleMap>
            </div>
          </div>

          {/* Sidebar - DARK THEME */}
          <div className="p-6 bg-slate-900/50 backdrop-blur-sm overflow-y-auto max-h-[650px]">
            <h2 className="text-2xl font-bold mb-2 text-white">Nearby Toilets</h2>
            <div className="mb-6 text-sm text-slate-400">
              {!userLocation
                ? 'Getting your location...'
                : search.trim()
                  ? `Showing ${sidebarToilets.length} search results`
                  : `Showing ${nearbyToilets.length} closest locations`}
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-8">
                <Loader2 className="w-8 h-8 animate-spin text-cyan-400 mb-2" />
                <span className="text-slate-300">Loading toilets...</span>
              </div>
            ) : !userLocation ? (
              <div className="text-center py-8">
                <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-2xl p-6 backdrop-blur-sm">
                  <Navigation className="w-12 h-12 mx-auto text-cyan-400 mb-3" />
                  <p className="text-white font-medium mb-2">Location Required</p>
                  <p className="text-sm text-slate-300 mb-4">
                    Allow location access to see nearby toilets
                  </p>
                  <button
                    onClick={requestUserLocation}
                    className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white 
                      px-6 py-2 rounded-full font-semibold hover:shadow-lg 
                      hover:shadow-cyan-500/30 transition-all"
                  >
                    Enable Location
                  </button>
                </div>
              </div>
            ) : search.trim() ? (
              // 🔍 SEARCH MODE — IGNORE RADIUS & SERVICE STATUS
              sidebarToilets.length === 0 ? (
                <p className="text-center text-slate-400">
                  No toilets found for "{search}"
                </p>
              ) : (
                <div className="space-y-3">
                  {sidebarToilets.map((toilet) => (
                    <NearbyToiletCard
                      key={toilet.id}
                      toilet={toilet}
                      onDirections={(toilet) => {
                        const url = `https://www.google.com/maps/dir/?api=1&destination=${toilet.latitude},${toilet.longitude}`
                        window.open(url, '_blank')
                      }}
                    />
                  ))}
                </div>
              )
            ) : serviceStatus === 'not_available' ? (
              <div className="text-center py-8">
                <p className="text-white font-semibold mb-2">
                  🚫 SaafAI is not available in your area yet
                </p>
                {requestSubmitted ? (
                  <p className="text-green-400 font-semibold">
                    ✅ Your request has been submitted
                  </p>
                ) : (
                  <button
                    onClick={handleRequestService}
                    disabled={isSubmittingRequest}
                    className={`bg-gradient-to-r from-red-600 to-orange-500 
      text-white px-6 py-2 rounded-full font-semibold
      ${isSubmittingRequest ? 'opacity-60 cursor-not-allowed' : ''}`}
                  >
                    {isSubmittingRequest ? (
                      <span className="flex items-center gap-2 justify-center">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Submitting...
                      </span>
                    ) : (
                      'Raise a Request'
                    )}
                  </button>)}

              </div>
            ) : serviceStatus === 'out_of_radius' ? (
              <div className="text-center py-8">
                <p className="text-white font-semibold mb-2">
                  ⚠️ No SaafAI toilet within 3 km
                </p>
                {requestSubmitted ? (
                  <p className="text-green-400 font-semibold">
                    ✅ Your request has been submitted
                  </p>
                ) : (
                  <button
                    onClick={handleRequestService}
                    disabled={isSubmittingRequest}
                    className={`bg-gradient-to-r from-yellow-500 to-orange-500 
      text-white px-6 py-2 rounded-full font-semibold
      ${isSubmittingRequest ? 'opacity-60 cursor-not-allowed' : ''}`}
                  >
                    {isSubmittingRequest ? (
                      <span className="flex items-center gap-2 justify-center">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Submitting...
                      </span>
                    ) : (
                      'Request a Toilet Here'
                    )}
                  </button>
                )}

              </div>
            )
              : (
                <div className="space-y-3">
                  {sidebarToilets.map((toilet) => (
                    <NearbyToiletCard
                      key={toilet.id}
                      toilet={toilet}
                      onDirections={(toilet) => {
                        const url = `https://www.google.com/maps/dir/?api=1&destination=${toilet.latitude},${toilet.longitude}`
                        window.open(url, '_blank')
                      }}
                      onFeedback={(toilet) => {
                        alert(`Feedback form for ${toilet.name}`)
                        console.log('Open feedback form for:', toilet)
                      }}
                    />
                  ))}
                </div>
              )}
          </div>
        </div>
      </section>
    )
  }
