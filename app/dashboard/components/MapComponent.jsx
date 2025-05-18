"use client";

import { useState, useEffect } from "react";

const MapComponent = () => {
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    // Check if we're in the browser since Leaflet requires DOM
    if (typeof window !== "undefined") {
      // Dynamically import Leaflet CSS and initialize the map
      const linkElement = document.createElement("link");

      linkElement.rel = "stylesheet";
      linkElement.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(linkElement);

      // Dynamic import of Leaflet
      import("leaflet").then((L) => {
        // Wait for the div to be available
        setTimeout(() => {
          // Initialize map if the element exists and map isn't already initialized
          const mapContainer = document.getElementById("map-container");

          if (mapContainer && !mapContainer._leaflet_id) {
            // Create map centered on US
            const map = L.map("map-container").setView([37.8, -96], 4);

            // Add OpenStreetMap tiles
            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
              maxZoom: 19,
              attribution: "© OpenStreetMap contributors",
            }).addTo(map);

            // Sample city data (normally would come from cityData array)
            const cities = [
              {
                name: "New York",
                lat: 40.7128,
                lng: -74.006,
                value: 256,
                color: "#4f46e5",
              },
              {
                name: "Los Angeles",
                lat: 34.0522,
                lng: -118.2437,
                value: 189,
                color: "#6366f1",
              },
              {
                name: "Chicago",
                lat: 41.8781,
                lng: -87.6298,
                value: 145,
                color: "#8b5cf6",
              },
              {
                name: "Houston",
                lat: 29.7604,
                lng: -95.3698,
                value: 120,
                color: "#a855f7",
              },
              {
                name: "Phoenix",
                lat: 33.4484,
                lng: -112.074,
                value: 105,
                color: "#d946ef",
              },
              {
                name: "Philadelphia",
                lat: 39.9526,
                lng: -75.1652,
                value: 95,
                color: "#ec4899",
              },
              {
                name: "San Antonio",
                lat: 29.4241,
                lng: -98.4936,
                value: 87,
                color: "#f43f5e",
              },
              {
                name: "San Diego",
                lat: 32.7157,
                lng: -117.1611,
                value: 82,
                color: "#ef4444",
              },
              {
                name: "Dallas",
                lat: 32.7767,
                lng: -96.797,
                value: 78,
                color: "#f97316",
              },
              {
                name: "San Jose",
                lat: 37.3382,
                lng: -121.8863,
                value: 74,
                color: "#eab308",
              },
            ];

            // Add markers for each city
            cities.forEach((city) => {
              // Create a circle marker with size based on submission count
              const radius = Math.max(5, Math.min(15, city.value / 20));

              const marker = L.circleMarker([city.lat, city.lng], {
                radius: radius,
                fillColor: city.color,
                color: "white",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8,
              }).addTo(map);

              // Add popup with city info
              marker.bindPopup(`
                <div class="font-medium">${city.name}</div>
                <div class="text-sm">${city.value} submissions</div>
              `);

              // Show popup on hover, hide on mouseout
              marker.on("mouseover", function (e) {
                this.openPopup();
              });
              marker.on("mouseout", function (e) {
                this.closePopup();
              });

              // Add a pulsing effect using CSS
              const pulseIcon = L.divIcon({
                className: "pulse-icon",
                html: `<div class="pulse-marker" style="background-color: ${city.color}"></div>`,
                iconSize: [10, 10],
                iconAnchor: [5, 5],
              });

              const pulseMarker = L.marker([city.lat, city.lng], {
                icon: pulseIcon,
              }).addTo(map);

              // Show popup on hover for the pulse marker as well
              pulseMarker.on("mouseover", function () {
                marker.openPopup();
              });
              pulseMarker.on("mouseout", function () {
                marker.closePopup();
              });

              // After adding the pulsing marker, add a label for the city name
              L.marker([city.lat, city.lng], {
                icon: L.divIcon({
                  className: "city-label",
                  html: `<span class="city-label-text">${city.name}</span>`,
                  iconSize: [80, 16],
                  iconAnchor: [40, -10],
                }),
                interactive: false,
              }).addTo(map);
            });

            // Update state to track that map is loaded
            setMapLoaded(true);

            // Make sure the map container resizes properly
            setTimeout(() => {
              map.invalidateSize();
            }, 100);
          }
        }, 500);
      });
    }

    // Cleanup
    return () => {
      // We would clean up the map here if needed
    };
  }, []);

  return (
    <div className="relative w-full h-[500px] bg-indigo-50/10">
      {/* Add a loading state */}
      {!mapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100/50 backdrop-blur-sm z-10">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-gray-600 font-medium">Loading map data...</p>
          </div>
        </div>
      )}

      {/* Map container */}
      <div className="w-full h-full rounded-br-xl" id="map-container" />

      {/* Add custom CSS for the pulsing effect */}
      <style>{`
        .pulse-marker {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          box-shadow: 0 0 0 rgba(255, 255, 255, 0.4);
          animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(255, 255, 255, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
          }
        }
      `}</style>

      {/* After the map container div, add a legend overlay */}
      <div className="absolute bottom-4 left-4 bg-white/90 rounded-lg shadow px-4 py-2 text-xs flex flex-col gap-1 z-20 border border-gray-200">
        <div className="flex items-center gap-2">
          <span
            className="inline-block w-3 h-3 rounded-full"
            style={{ background: "#4f46e5" }}
          />{" "}
          New York
        </div>
        <div className="flex items-center gap-2">
          <span
            className="inline-block w-3 h-3 rounded-full"
            style={{ background: "#6366f1" }}
          />{" "}
          Los Angeles
        </div>
        <div className="flex items-center gap-2">
          <span
            className="inline-block w-3 h-3 rounded-full"
            style={{ background: "#8b5cf6" }}
          />{" "}
          Chicago
        </div>
        <div className="flex items-center gap-2">
          <span
            className="inline-block w-3 h-3 rounded-full"
            style={{ background: "#a855f7" }}
          />{" "}
          Houston
        </div>
        <div className="flex items-center gap-2">
          <span
            className="inline-block w-3 h-3 rounded-full"
            style={{ background: "#d946ef" }}
          />{" "}
          Phoenix
        </div>
        <div className="flex items-center gap-2">
          <span
            className="inline-block w-3 h-3 rounded-full"
            style={{ background: "#ec4899" }}
          />{" "}
          Philadelphia
        </div>
        <div className="flex items-center gap-2">
          <span
            className="inline-block w-3 h-3 rounded-full"
            style={{ background: "#f43f5e" }}
          />{" "}
          San Antonio
        </div>
        <div className="flex items-center gap-2">
          <span
            className="inline-block w-3 h-3 rounded-full"
            style={{ background: "#ef4444" }}
          />{" "}
          San Diego
        </div>
        <div className="flex items-center gap-2">
          <span
            className="inline-block w-3 h-3 rounded-full"
            style={{ background: "#f97316" }}
          />{" "}
          Dallas
        </div>
        <div className="flex items-center gap-2">
          <span
            className="inline-block w-3 h-3 rounded-full"
            style={{ background: "#eab308" }}
          />{" "}
          San Jose
        </div>
        <div className="mt-1 text-gray-500">
          Larger marker = more submissions
        </div>
      </div>

      {/* Add CSS for city labels */}
      <style>{`
        .city-label-text {
          background: rgba(255,255,255,0.85);
          color: #334155;
          font-size: 12px;
          padding: 1px 6px;
          border-radius: 6px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.04);
          font-weight: 500;
          pointer-events: none;
          margin-left: 8px;
        }
      `}</style>
    </div>
  );
};

export default MapComponent;
