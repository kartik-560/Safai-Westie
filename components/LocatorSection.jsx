'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api'
import { Loader2, Search, X, Navigation, Map as MapIcon, Satellite } from 'lucide-react'
import ToiletCard from './ToiletCard'

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
          ? 'bg-gradient-to-r from-[#6C5CE7] to-[#00D2D3] text-white  '
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
          ? 'bg-gradient-to-r from-[#6C5CE7] to-[#00D2D3] text-white  '
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
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      <input
        type="text"
        placeholder="🔍 Search toilets by name..."
        value={search}
        onChange={onSearch}
        className="w-full pl-12 pr-10 py-3.5 rounded-full shadow-md border border-gray-200
                   bg-white focus:outline-none focus:ring-2 focus:ring-[#6C5CE7] 
                   text-gray-700 text-sm font-medium"
      />
      {search && (
        <button
          onClick={onClear}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
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
      className="absolute bottom-4 left-4 z-10 bg-white rounded-full p-3 
                 shadow-lg hover:shadow-xl transition-all duration-200 
                 hover:scale-110 active:scale-95 disabled:opacity-50"
      title="Go to my location"
    >
      {isLoading ? (
        <Loader2 className="w-6 h-6 animate-spin text-gray-700" />
      ) : (
        <Navigation className="w-6 h-6 text-gray-700" />
      )}
    </button>
  )
}

function NearbyToiletCard({ toilet, onDirections, onFeedback }) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-md border border-gray-200 hover:shadow-lg transition-all">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h4 className="font-bold text-gray-900 text-sm line-clamp-1">{toilet.name}</h4>
          <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
            <span>📍</span>
            <span>{toilet.distance.toFixed(1)} km away</span>
          </p>
        </div>
        {toilet.averageRating && (
          <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-full">
            <span className="text-yellow-500 text-sm">⭐</span>
            <span className="text-sm font-bold text-gray-900">
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
                     transition-all flex items-center justify-center gap-1.5"
        >
          <Navigation className="w-3.5 h-3.5" />
          Directions
        </button>
        <button
          onClick={() => onFeedback(toilet)}
          className="flex-1 bg-white border-2 border-blue-500 text-blue-600 
                     px-3 py-2 rounded-lg text-xs font-semibold hover:bg-blue-50 
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
  const [mapType, setMapType] = useState('roadmap') // NEW: Map type state

  const mapRef = useRef(null)
  const searchRef = useRef(null)
  const watchIdRef = useRef(null)
  const companyId = 24

  // Fetch locations from API
  const fetchToiletLocations = useCallback(async () => {
    setLoading(true)
    try {
      const response = await fetch(
        `https://saaf-ai-backend.vercel.app/api/locations/saafai_locations?company_id=${companyId}`
      )

      if (!response.ok) throw new Error('Failed to fetch locations')

      const data = await response.json()
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
            .filter(loc => !isNaN(loc.distance))
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

            if (mapRef.current) {
              mapRef.current.panTo(userPos)
            }
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
    if (locations.length > 0 && !userLocation && !isRequestingLocation) {
      // Optionally auto-request location
      // requestUserLocation()
    }

    return () => {
      if (watchIdRef.current) {
        navigator.geolocation.clearWatch(watchIdRef.current)
      }
    }
  }, [locations, userLocation, isRequestingLocation, requestUserLocation])


  useEffect(() => {
    if (userLocation && locations.length > 0) {
      const toiletsWithDistance = locations.map(loc => ({
        ...loc,
        distance: calculateDistance(
          userLocation.lat,
          userLocation.lng,
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
  }, [userLocation, locations])

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

  // Handle toilet card click
  const handleToiletCardClick = (loc) => {
    const lat = parseFloat(loc.latitude)
    const lng = parseFloat(loc.longitude)

    setCenter({ lat, lng })
    setSelected(loc)

    if (mapRef.current) {
      mapRef.current.panTo({ lat, lng })
      mapRef.current.setZoom(16)
    }
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
    return <div className="text-center py-8 text-red-600">Error loading maps</div>
  }

  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader2 className="w-8 h-8 animate-spin text-[#6C5CE7]" />
      </div>
    )
  }

  // Get valid locations with coordinates
  const validLocations = filtered.filter(loc => {
    const lat = parseFloat(loc.latitude)
    const lng = parseFloat(loc.longitude)
    return !isNaN(lat) && !isNaN(lng) && lat !== 0 && lng !== 0
  })

  return (
    <section id="locator" className="px-[5%] py-24">
      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] h-auto lg:h-[650px] 
                      bg-white rounded-[50px] overflow-hidden shadow-3d">

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
              <div className="absolute z-20 w-[calc(100%-2rem)] mt-1 bg-white border border-gray-300 rounded-2xl shadow-xl max-h-60 overflow-y-auto">
                {filtered.map((loc) => (
                  <div
                    key={loc.id}
                    onClick={() => handleLocationSelect(loc)}
                    className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{loc.name}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          📍 {loc.address || `${loc.city}, ${loc.state}`}
                        </p>
                      </div>
                      {loc.averageRating && loc.averageRating > 0 && (
                        <div className="flex items-center gap-1 ml-2">
                          <span className="text-yellow-500">⭐</span>
                          <span className="text-sm font-medium">{loc.averageRating.toFixed(1)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {showDropdown && filtered.length === 0 && search && (
              <div className="absolute z-20 w-[calc(100%-2rem)] mt-1 bg-white border border-gray-300 rounded-2xl shadow-xl p-4 text-center text-gray-500">
                No toilets found matching &quot;{search}&quot;
              </div>
            )}
          </div>

          <div className="relative flex-1">
            <MyLocationButton
              onClick={requestUserLocation}
              isLoading={isRequestingLocation}
            />

            {/* NEW: Map Type Toggle */}
            <MapTypeToggle
              mapType={mapType}
              onChange={handleMapTypeChange}
            />

            {isRequestingLocation && (
              <div className="absolute top-4 left-1/2 -translate-x-1/2 
                              bg-blue-50 border-2 border-blue-400 text-blue-900 
                              px-4 py-3 rounded-lg text-sm z-10 shadow-lg">
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
                map.setMapTypeId(mapType) // Set initial map type
              }}
              className=""
              options={{
                gestureHandling: 'greedy',
                disableDefaultUI: false,
                streetViewControl: false,
                zoomControl: true,
                mapTypeControl: false, // We're using custom control
                fullscreenControl: false,
                mapTypeId: mapType // Set map type
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
                  <div className="w-full max-w-[280px] sm:max-w-sm">
                    {/* Image */}
                    <div className="relative">
                      <img
                        src={
                          selected.images && selected.images.length > 0
                            ? selected.images[0]
                            : 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=500'
                        }
                        alt={selected.name}
                        className="w-full h-28 sm:h-36 object-cover rounded-t-lg"
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=500'
                        }}
                      />
                      {selected.images && selected.images.length > 1 && (
                        <div className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 bg-black bg-opacity-70 text-white px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium">
                          {selected.no_of_photos || selected.images.length} photos
                        </div>
                      )}
                      {selected.averageRating && (
                        <div className="absolute bottom-1.5 left-1.5 sm:bottom-2 sm:left-2 bg-white bg-opacity-95 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full flex items-center gap-0.5 sm:gap-1 shadow-sm">
                          <span className="text-yellow-500 text-xs sm:text-sm">⭐</span>
                          <span className="text-xs sm:text-sm font-bold text-gray-900">{selected.averageRating.toFixed(1)}</span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-3 sm:p-4">
                      <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-1 leading-tight line-clamp-2">
                        {selected.name}
                      </h3>

                      <p className="text-[10px] sm:text-xs text-gray-500 mb-2 sm:mb-3 flex items-start gap-1 line-clamp-2">
                        <span className="flex-shrink-0 mt-0.5">📍</span>
                        <span className="flex-1">{selected.address || `${selected.city}, ${selected.state} ${selected.pincode}`}</span>
                      </p>

                      {/* Rating */}
                      {selected.averageRating && (
                        <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                          <div className="flex items-center gap-0.5 sm:gap-1">
                            <span className="text-yellow-500 text-xs sm:text-sm">⭐</span>
                            <span className="font-semibold text-xs sm:text-sm text-gray-900">{selected.averageRating.toFixed(1)}</span>
                          </div>
                          <span className="text-gray-500 text-[10px] sm:text-xs">
                            ({selected.ratingCount} {selected.ratingCount === 1 ? 'review' : 'reviews'})
                          </span>
                        </div>
                      )}

                      {/* Amenities */}
                      {selected.options && Object.keys(selected.options).length > 0 && (
                        <div className="mb-2 sm:mb-3">
                          <h4 className="text-[11px] sm:text-xs font-semibold mb-1.5 sm:mb-2 text-gray-800">Amenities</h4>
                          <div className="flex flex-wrap gap-1">
                            {selected.options.genderAccess?.map((gender) => (
                              <span key={gender} className="px-1.5 py-0.5 sm:px-2 sm:py-1 bg-blue-100 text-blue-800 text-[10px] sm:text-xs rounded-full font-medium">
                                {gender.charAt(0).toUpperCase() + gender.slice(1)}
                              </span>
                            ))}
                            {selected.options.isPaid !== undefined && (
                              <span className={`px-1.5 py-0.5 sm:px-2 sm:py-1 text-[10px] sm:text-xs rounded-full font-medium ${selected.options.isPaid
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-green-100 text-green-800'
                                }`}>
                                {selected.options.isPaid ? '💰 Paid' : '🆓 Free'}
                              </span>
                            )}
                            {selected.options.is24Hours && (
                              <span className="px-1.5 py-0.5 sm:px-2 sm:py-1 bg-green-100 text-green-800 text-[10px] sm:text-xs rounded-full font-medium">
                                🕐 24/7
                              </span>
                            )}
                            {selected.options.isHandicapAccessible && (
                              <span className="px-1.5 py-0.5 sm:px-2 sm:py-1 bg-purple-100 text-purple-800 text-[10px] sm:text-xs rounded-full font-medium">
                                ♿ Accessible
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Get Directions Button */}
                      <button
                        onClick={() => {
                          const url = `https://www.google.com/maps/dir/?api=1&destination=${selected.latitude},${selected.longitude}`
                          window.open(url, '_blank')
                        }}
                        className="w-full mt-2 px-3 py-2 sm:px-4 sm:py-2.5 bg-[#6C5CE7] text-white rounded-lg text-xs sm:text-sm font-semibold hover:bg-[#5b4bc4] active:bg-[#4a3ba3] transition-colors flex items-center justify-center gap-1.5 sm:gap-2 shadow-md active:scale-95 touch-manipulation"
                      >
                        <Navigation className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        Get Directions
                      </button>
                    </div>
                  </div>
                </InfoWindow>
              )}
            </GoogleMap>
          </div>
        </div>


        {/* Sidebar */}
        <div className="p-6 bg-[#fdfdfd] overflow-y-auto max-h-[650px]">
          <h2 className="text-2xl font-bold mb-2">Nearby Toilets</h2>
          <div className="mb-6 text-sm text-gray-600">
            {userLocation
              ? `Showing ${nearbyToilets.length} closest locations`
              : 'Getting your location...'}
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-8">
              <Loader2 className="w-8 h-8 animate-spin text-[#6C5CE7] mb-2" />
              <span className="text-gray-600">Loading toilets...</span>
            </div>
          ) : !userLocation ? (
            <div className="text-center py-8">
              <div className="bg-blue-50 rounded-2xl p-6">
                <Navigation className="w-12 h-12 mx-auto text-blue-500 mb-3" />
                <p className="text-gray-700 font-medium mb-2">Location Required</p>
                <p className="text-sm text-gray-600 mb-4">
                  Allow location access to see nearby toilets
                </p>
                <button
                  onClick={requestUserLocation}
                  className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white 
                     px-6 py-2 rounded-full font-semibold hover:shadow-lg transition-all"
                >
                  Enable Location
                </button>
              </div>
            </div>
          ) : nearbyToilets.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No toilets found nearby
            </div>
          ) : (
            <div className="space-y-3">
              {nearbyToilets.map((toilet, index) => (
                <NearbyToiletCard
                  key={toilet.id}
                  toilet={toilet}
                  onDirections={(toilet) => {
                    const url = `https://www.google.com/maps/dir/?api=1&destination=${toilet.latitude},${toilet.longitude}`
                    window.open(url, '_blank')
                  }}
                  onFeedback={(toilet) => {
                    // TODO: Open feedback form modal
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
