'use client'

import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { APIProvider, Map, useMap, useMapsLibrary } from '@vis.gl/react-google-maps'
import ToiletCard from './ToiletCard'
import ToiletPopup from './ToiletPopup'
function MapWithDirections({ origin, destination, toiletLocations, onRecenter, onRouteInfo, searchedLocation }) {
  const [directionsResponse, setDirectionsResponse] = useState(null)
  const [directionsRenderer, setDirectionsRenderer] = useState(null)
  const [markers, setMarkers] = useState([])
  const [userMarker, setUserMarker] = useState(null)
  const [searchMarker, setSearchMarker] = useState(null) // NEW: Search marker
  const map = useMap()
  const routesLibrary = useMapsLibrary('routes')

  // Show user location marker (blue)
  useEffect(() => {
    if (!map || !origin || !window.google) return

    if (userMarker) {
      userMarker.setMap(null)
    }

    const marker = new window.google.maps.Marker({
      position: origin,
      map: map,
      title: 'You are here',
      icon: {
        path: window.google.maps.SymbolPath.CIRCLE,
        scale: 14,
        fillColor: '#4285F4',
        fillOpacity: 1,
        strokeColor: '#FFFFFF',
        strokeWeight: 4
      },
      animation: window.google.maps.Animation.DROP
    })

    setUserMarker(marker)
    map.panTo(origin)

    return () => {
      if (marker) marker.setMap(null)
    }
  }, [map, origin])

  // NEW: Show search location marker (red)
  useEffect(() => {
    if (!map || !searchedLocation || !window.google) return

    // Remove old search marker
    if (searchMarker) {
      searchMarker.setMap(null)
    }

    // Create red marker for searched location
    const marker = new window.google.maps.Marker({
      position: searchedLocation,
      map: map,
      title: searchedLocation.name || 'Search Result',
      icon: {
        path: window.google.maps.SymbolPath.CIRCLE,
        scale: 12,
        fillColor: '#EA4335', // Google red
        fillOpacity: 1,
        strokeColor: '#FFFFFF',
        strokeWeight: 3
      },
      animation: window.google.maps.Animation.BOUNCE
    })

    // Stop bouncing after 2 seconds
    setTimeout(() => {
      marker.setAnimation(null)
    }, 2000)

    setSearchMarker(marker)

    // Center on searched location
    map.panTo(searchedLocation)
    map.setZoom(15)

    return () => {
      if (marker) marker.setMap(null)
    }
  }, [map, searchedLocation])

  // Expose recenter function to parent
  useEffect(() => {
    if (onRecenter && map && origin) {
      onRecenter(() => {
        map.panTo(origin)
        map.setZoom(15)
      })
    }
  }, [map, origin, onRecenter])

  // Create toilet markers (purple)
  useEffect(() => {
    if (!map || !window.google || !window.google.maps) return

    markers.forEach(marker => marker.setMap(null))

    if (!directionsResponse) {
      const newMarkers = toiletLocations.map(location => {
        return new window.google.maps.Marker({
          position: { lat: location.lat, lng: location.lng },
          map: map,
          title: location.name,
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 10,
            fillColor: '#8B5CF6',
            fillOpacity: 1,
            strokeColor: '#6D28D9',
            strokeWeight: 2
          }
        })
      })

      setMarkers(newMarkers)
    }

    return () => {
      markers.forEach(marker => marker.setMap(null))
    }
  }, [map, toiletLocations, directionsResponse])

  // Initialize DirectionsRenderer
  useEffect(() => {
    if (!routesLibrary || !map) return
    const renderer = new routesLibrary.DirectionsRenderer()
    renderer.setMap(map)
    setDirectionsRenderer(renderer)
  }, [routesLibrary, map])

  // Calculate directions
  useEffect(() => {
    if (!routesLibrary || !directionsRenderer) return

    if (!destination) {
      directionsRenderer.setDirections({ routes: [] })
      setDirectionsResponse(null)
      if (onRouteInfo) onRouteInfo(null)
      return
    }

    if (!origin || !destination) return

    const directionsService = new routesLibrary.DirectionsService()

    directionsService.route(
      {
        origin,
        destination,
        travelMode: routesLibrary.TravelMode.DRIVING
      },
      (result, status) => {
        if (status === 'OK') {
          setDirectionsResponse(result)
          directionsRenderer.setDirections(result)

          const leg = result.routes?.[0]?.legs?.[0]
          if (leg && onRouteInfo) {
            onRouteInfo({
              distanceText: leg.distance?.text,
              durationText: leg.duration?.text,
              startAddress: leg.start_address,
              endAddress: leg.end_address
            })
          }
        } else {
          console.error('Directions request failed:', status)
          if (onRouteInfo) onRouteInfo(null)
        }
      }
    )
  }, [routesLibrary, origin, destination, directionsRenderer])

  return (
    <Map
      defaultCenter={{ lat: 21.1458, lng: 79.0882 }}
      defaultZoom={12}
      gestureHandling="greedy"
      disableDefaultUI={false}
      streetViewControl={false}
      className="w-full h-full"
    />
  )
}

function SearchBar({ onLocationSelect }) {
  const inputRef = useRef(null)
  const placesLibrary = useMapsLibrary('places')

  useEffect(() => {
    if (!placesLibrary || !inputRef.current) return

    const autoCompleteInstance = new placesLibrary.Autocomplete(inputRef.current, {
      fields: ['geometry', 'name', 'formatted_address']
    })

    autoCompleteInstance.addListener('place_changed', () => {
      const place = autoCompleteInstance.getPlace()

      if (place.geometry && place.geometry.location) {
        const locationData = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
          name: place.name || place.formatted_address
        }

        onLocationSelect(locationData)
      }
    })
  }, [placesLibrary, onLocationSelect])

  const handleKeyPress = async (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()

      const searchQuery = inputRef.current.value.trim()
      if (!searchQuery) return

      if (window.google && window.google.maps) {
        const geocoder = new window.google.maps.Geocoder()

        geocoder.geocode({ address: searchQuery }, (results, status) => {
          if (status === 'OK' && results[0]) {
            const location = results[0].geometry.location
            const locationData = {
              lat: location.lat(),
              lng: location.lng(),
              name: results[0].formatted_address
            }

            onLocationSelect(locationData)
          } else {
            alert('Location not found. Please try selecting from dropdown.')
          }
        })
      }
    }
  }

  return (
    <input
      ref={inputRef}
      type="text"
      placeholder="🔍 Search for a location..."
      onKeyPress={handleKeyPress}
      className="w-full px-5 py-3.5 rounded-full shadow-md border border-gray-200
                 bg-white focus:outline-none focus:ring-2 focus:ring-primary-purple 
                 text-gray-700 text-sm font-medium"
    />
  )
}

function MyLocationButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="absolute bottom-4 left-4 z-10 bg-white rounded-full p-3 
                 shadow-lg hover:shadow-xl transition-all duration-200 
                 hover:scale-110 active:scale-95"
      title="Go to my location"
      aria-label="Center map on my location"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        className="text-gray-700"
      >
        <path
          d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3A8.994 8.994 0 0013 3.06V1h-2v2.06A8.994 8.994 0 003.06 11H1v2h2.06A8.994 8.994 0 0011 20.94V23h2v-2.06A8.994 8.994 0 0020.94 13H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"
          fill="currentColor"
        />
      </svg>
    </button>
  )
}

export default function LocatorSection() {
  const [selectedDestination, setSelectedDestination] = useState(null)
  const [userLocation, setUserLocation] = useState(null)
  const [searchedLocation, setSearchedLocation] = useState(null)
  const [recenterFunction, setRecenterFunction] = useState(null)
  const [isRequestingLocation, setIsRequestingLocation] = useState(false)
  const [routeInfo, setRouteInfo] = useState(null)
  const [toiletLocations, setToiletLocations] = useState([])
  const [isLoadingToilets, setIsLoadingToilets] = useState(false)

  // NEW: Popup state
  const [selectedToilet, setSelectedToilet] = useState(null)
  const [showPopup, setShowPopup] = useState(false)

  const fetchNearbyToilets = async (lat, lng, radius = 5000) => {
    setIsLoadingToilets(true)
    try {
      const response = await fetch(`/api/toilets/nearby?lat=${lat}&lng=${lng}&radius=${radius}`)

      if (!response.ok) {
        throw new Error('Failed to fetch toilets')
      }

      const data = await response.json()
      setToiletLocations(data)
    } catch (error) {
      console.error('Error fetching toilets:', error)
      setToiletLocations([])
    } finally {
      setIsLoadingToilets(false)
    }
  }

  const requestUserLocation = () => {
    if (!navigator.geolocation) {
      const defaultLocation = { lat: 21.1458, lng: 79.0882 }
      setUserLocation(defaultLocation)
      fetchNearbyToilets(defaultLocation.lat, defaultLocation.lng)
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
        setIsRequestingLocation(false)
        fetchNearbyToilets(userPos.lat, userPos.lng)
      },
      (error) => {
        setIsRequestingLocation(false)
        const defaultLocation = { lat: 21.1458, lng: 79.0882 }
        setUserLocation(defaultLocation)
        fetchNearbyToilets(defaultLocation.lat, defaultLocation.lng)
      },
      {
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: 60000
      }
    )
  }

  useEffect(() => {
    requestUserLocation()
  }, [])

  // NEW: Handle toilet card click - show popup
  const handleToiletClick = (location) => {
    setSelectedToilet(location)
    setShowPopup(true)
  }

  // NEW: Handle locate button in popup
  const handleLocate = () => {
    setSelectedDestination(selectedToilet)
    setShowPopup(false)
  }

  // NEW: Handle start ride button
  const handleStartRide = () => {
    // You can add navigation app integration here
    const destination = selectedToilet

    // Open in Google Maps app
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${destination.lat},${destination.lng}`
    window.open(googleMapsUrl, '_blank')

    // Or use other navigation apps
    // Apple Maps: `maps://maps.apple.com/?daddr=${destination.lat},${destination.lng}`
    // Waze: `https://waze.com/ul?ll=${destination.lat},${destination.lng}&navigate=yes`
  }

  const handleSearchLocation = (location) => {
    setSearchedLocation(location)
    fetchNearbyToilets(location.lat, location.lng)
  }

  const handleMyLocationClick = () => {
    if (recenterFunction) {
      recenterFunction()
    }
    requestUserLocation()
  }

  const handleClearRoute = () => {
    setSelectedDestination(null)
    setRouteInfo(null)
  }

  return (
    <section id="locator" className="px-[5%] py-24">
      {/* NEW: Popup Modal */}
      {showPopup && selectedToilet && (
        <ToiletPopup
          toilet={selectedToilet}
          onClose={() => setShowPopup(false)}
          onLocate={handleLocate}
          onStartRide={handleStartRide}
        />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] h-auto lg:h-[650px] 
                      bg-white rounded-[50px] overflow-hidden shadow-3d">

        <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
          <div className="bg-[#e1e8ed] h-[400px] lg:h-full flex flex-col">

            <div className="px-4 pt-4 pb-2">
              <SearchBar onLocationSelect={handleSearchLocation} />
            </div>

            <div className="relative flex-1">
              <MyLocationButton onClick={handleMyLocationClick} />

              {isRequestingLocation && (
                <div className="absolute top-4 left-1/2 -translate-x-1/2 
                                bg-blue-50 border-2 border-blue-400 text-blue-900 
                                px-4 py-3 rounded-lg text-sm z-10 shadow-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent 
                                    rounded-full animate-spin"></div>
                    <span>Getting your location...</span>
                  </div>
                </div>
              )}

              <MapWithDirections
                origin={userLocation}
                destination={selectedDestination}
                toiletLocations={toiletLocations}
                searchedLocation={searchedLocation}
                onRecenter={setRecenterFunction}
                onRouteInfo={setRouteInfo}
              />
            </div>
          </div>
        </APIProvider>

        <div className="p-10 bg-[#fdfdfd] overflow-y-auto max-h-[650px]">
          <h2 className="text-2xl font-bold mb-4">Live AI Rankings</h2>

          {routeInfo && (
            <div className="mb-6 p-4 rounded-2xl bg-primary-purple/5 border border-primary-purple/40 relative">
              <button
                onClick={handleClearRoute}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
                title="Clear route"
              >
                ✕
              </button>
              <p className="text-sm font-semibold text-primary-purple mb-1">
                📍 Route to {selectedDestination?.name}
              </p>
              <div className="flex items-center gap-3 text-sm text-gray-700 mb-3">
                <span>🚗 {routeInfo.distanceText}</span>
                <span>⏱️ {routeInfo.durationText}</span>
              </div>

              {/* NEW: Start Ride Button */}
              <button
                onClick={handleStartRide}
                className="w-full px-6 py-3 bg-green-500 text-white rounded-full
                           font-semibold hover:bg-green-600 transition-colors
                           shadow-lg flex items-center justify-center gap-2"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M13 3L4 14h7l-1 7 9-11h-7l1-7z" fill="currentColor" />
                </svg>
                Start Ride
              </button>
            </div>
          )}

          {isLoadingToilets ? (
            <div className="flex items-center justify-center py-8">
              <div className="w-8 h-8 border-4 border-primary-purple border-t-transparent 
                            rounded-full animate-spin"></div>
              <span className="ml-3 text-gray-600">Loading nearby toilets...</span>
            </div>
          ) : toiletLocations.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No toilets found in this area
            </div>
          ) : (
            <div id="cards-container" className="space-y-4">
              {toiletLocations.map((location, index) => (
                <div
                  key={location.id || index}
                  onClick={() => handleToiletClick(location)}
                  className="cursor-pointer transform hover:scale-[1.02] transition-transform"
                >
                  <ToiletCard
                    score={location.score || 0}
                    name={location.name}
                    description={location.description || 'No description available'}
                    meta={location.meta || location.lastCleaned || ''}
                    borderColor={location.borderColor || "border-primary-purple"}
                    badgeColor={location.badgeColor}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}