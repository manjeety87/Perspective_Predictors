// import {
//   AdvancedMarker,
//   InfoWindow,
//   Map,
//   Pin,
// } from "@vis.gl/react-google-maps";
// import { useCallback, useState } from "react";
// import { useWeatherStore } from "@/store/useWeatherStore";

// interface LocationCoords {
//   lat: number;
//   lng: number;
//   address?: string;
// }

// interface MapsProps {
//   onLocationSelect?: (coords: LocationCoords) => void;
// }

// const Maps = ({ onLocationSelect }: MapsProps) => {
//   const [position, setPosition] = useState({ lat: 43.6563, lng: -79.7387 });
//   const [open, setOpen] = useState(false);
//   const [address, setAddress] = useState<string>("");

//   const fetchLocationName = async (lat: number, lng: number) => {
//     try {
//       const res = await fetch(
//         `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${
//           import.meta.env.VITE_GOOGLE_MAPS_API_KEY
//         }`
//       );
//       const data = await res.json();
//       const name = data.results?.[0]?.formatted_address || "Unknown location";
//       setAddress(name);
//       console.log("📍 Location Name:", name);
//       return name;
//     } catch (error) {
//       console.error("❌ Failed to get address:", error);
//       return "Unknown location";
//     }
//   };

//   // const handleMapClick = useCallback(
//   //   (event: google.maps.MapMouseEvent) => {
//   //     if (event.latLng) {
//   //       const newPos = {
//   //         lat: event.latLng.lat(),
//   //         lng: event.latLng.lng(),
//   //       };
//   //       setPosition(newPos);
//   //       setOpen(false);
//   //       console.log("📍 Map clicked:", newPos);
//   //       onLocationSelect?.(newPos);
//   //     }
//   //   },
//   //   [onLocationSelect]
//   // );

//   //   const handleDragEnd = useCallback(
//   //   (event: google.maps.MapMouseEvent) => {
//   //     if (event.latLng) {
//   //       const newPos = {
//   //         lat: event.latLng.lat(),
//   //         lng: event.latLng.lng(),
//   //       };
//   //       setPosition(newPos);
//   //       console.log("📦 Drag end:", newPos);
//   //       onLocationSelect?.(newPos);
//   //     }
//   //   },
//   //   [onLocationSelect]
//   // );

//   const handleMapClick = useCallback(
//     async (event: google.maps.MapMouseEvent) => {
//       if (event.latLng) {
//         const newPos = {
//           lat: event.latLng.lat(),
//           lng: event.latLng.lng(),
//         };
//         setPosition(newPos);
//         setOpen(false);
//         console.log("📍 Map clicked:", newPos);

//         const locationName = await fetchLocationName(newPos.lat, newPos.lng);
//         onLocationSelect?.({ ...newPos, address: locationName });
//       }
//     },
//     [onLocationSelect]
//   );

//   const handleDragEnd = useCallback(
//     async (event: google.maps.MapMouseEvent) => {
//       if (event.latLng) {
//         const newPos = {
//           lat: event.latLng.lat(),
//           lng: event.latLng.lng(),
//         };
//         setPosition(newPos);
//         console.log("📦 Drag end:", newPos);

//         const locationName = await fetchLocationName(newPos.lat, newPos.lng);
//         onLocationSelect?.({ ...newPos, address: locationName });
//       }
//     },
//     [onLocationSelect]
//   );

//   return (
//     <div className="w-full max-w-3xl flex flex-col h-[60vh] items-center justify-center">
//       <div className="flex w-full">Select Location</div>
//       <Map
//         defaultZoom={6}
//         defaultCenter={position}
//         // style={{ width: "60%", height: "60vh" }}
//         mapId={import.meta.env.VITE_GOOGLE_MAP_ID}
//         onClick={() => handleMapClick}
//       >
//         <AdvancedMarker
//           position={position}
//           draggable
//           onClick={() => setOpen(true)}
//           onDragEnd={handleDragEnd}
//         >
//           <Pin />
//         </AdvancedMarker>

//         {open && (
//           <InfoWindow position={position} onCloseClick={() => setOpen(false)}>
//             <div style={{ color: "black" }}>
//               <b>Coordinates</b>
//               <p>Lat: {position.lat.toFixed(5)}</p>
//               <p>Lng: {position.lng.toFixed(5)}</p>
//             </div>
//           </InfoWindow>
//         )}
//       </Map>
//     </div>
//   );
// };

// export default Maps;

import { useWeatherStore } from "@/store/useWeatherStore";
import {
  AdvancedMarker,
  InfoWindow,
  Map,
  Pin,
} from "@vis.gl/react-google-maps";
import { useCallback, useState } from "react";

interface MapsProps {
  onLocationSelect?: (coords: {
    lat: number;
    lng: number;
    address?: string;
  }) => void;
}

const Maps = ({ onLocationSelect }: MapsProps) => {
  const [position, setPosition] = useState({ lat: 43.6563, lng: -79.7387 });
  const [open, setOpen] = useState(false);
  const [address, setAddress] = useState<string>("");
  const { coordinates, locationName } = useWeatherStore();

  // ✅ Function to get human-readable location name
  const fetchLocationName = async (lat: number, lng: number) => {
    try {
      const res = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${
          import.meta.env.VITE_GOOGLE_MAPS_API_KEY
        }`
      );
      const data = await res.json();
      const name = data.results?.[0]?.formatted_address || "Unknown location";
      setAddress(name);
      console.log("📍 Location Name:", name);
      return name;
    } catch (error) {
      console.error("❌ Failed to get address:", error);
      return "Unknown location";
    }
  };

  // ✅ Map click → update marker + fetch address
  const handleMapClick = useCallback(
    async (event: google.maps.MapMouseEvent) => {
      if (event.latLng) {
        const newPos = {
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
        };
        setPosition(newPos);
        setOpen(false);
        console.log("📍 Map clicked:", newPos);

        const locationName = await fetchLocationName(newPos.lat, newPos.lng);
        onLocationSelect?.({ ...newPos, address: locationName });
      }
    },
    [onLocationSelect]
  );

  // ✅ Marker drag end → update marker + fetch address
  const handleDragEnd = useCallback(
    async (event: google.maps.MapMouseEvent) => {
      if (event.latLng) {
        const newPos = {
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
        };
        setPosition(newPos);
        console.log("📦 Drag end:", newPos);

        const locationName = await fetchLocationName(newPos.lat, newPos.lng);
        onLocationSelect?.({ ...newPos, address: locationName });
      }
    },
    [onLocationSelect]
  );

  return (
    <div className="w-full max-w-3xl flex flex-col ">
      <div className="mb-2">Select Location</div>
      <Map
        defaultZoom={6}
        defaultCenter={position}
        style={{ width: "100%", height: "50vh" }}
        mapId={import.meta.env.VITE_GOOGLE_MAP_ID}
        onClick={(e) => handleMapClick(e)}
      >
        <AdvancedMarker
          position={position}
          draggable
          onClick={() => setOpen(true)}
          onDragEnd={handleDragEnd}
        >
          <Pin />
        </AdvancedMarker>

        {open && (
          <InfoWindow position={position} onCloseClick={() => setOpen(false)}>
            <div style={{ color: "black" }}>
              {/* <b>Coordinates</b>
            <p>Lat: {position.lat.toFixed(5)}</p>
            <p>Lng: {position.lng.toFixed(5)}</p>
            {address && (
              <p style={{ marginTop: "6px", fontSize: "13px" }}>
                <b>Address:</b> {address}
              </p>
            )} */}
              {coordinates && (
                <div>
                  <h3>Location: {locationName}</h3>
                  <p>Lat: {coordinates.lat}</p>
                  <p>Lng: {coordinates.lng}</p>
                </div>
              )}
            </div>
          </InfoWindow>
        )}
      </Map>
    </div>
  );
};

export default Maps;
