// import {
//   AdvancedMarker,
//   InfoWindow,
//   Map,
//   Pin,
// } from "@vis.gl/react-google-maps";
// import { useCallback, useState } from "react";

// const Maps = () => {
//   const [position, setPosition] = useState({ lat: 53.54, lng: 10 });
//   const [open, setOpen] = useState(false);

//   const handleMapClick = useCallback((event: google.maps.MapMouseEvent) => {
//     if (event.latLng) {
//       const newPos = {
//         lat: event.latLng.lat(),
//         lng: event.latLng.lng(),
//       };
//       setPosition(newPos);
//       setOpen(false);
//       console.log("📍 Map clicked:", newPos);
//     }
//   }, []);

//   const handleDragEnd = useCallback((event: google.maps.MapMouseEvent) => {
//     if (event.latLng) {
//       const newPos = {
//         lat: event.latLng.lat(),
//         lng: event.latLng.lng(),
//       };
//       setPosition(newPos);
//       console.log("📦 Drag end:", newPos);
//     }
//   }, []);

//   return (
//     <Map
//       defaultZoom={9}
//       defaultCenter={position}
//       style={{ width: "50%", height: "50vh" }}
//       mapId={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
//       onClick={() => handleMapClick}
//     >
//       <AdvancedMarker
//         position={position}
//         draggable
//         onClick={() => setOpen(true)}
//         onDragEnd={handleDragEnd}
//       >
//         <Pin background="grey" borderColor="green" glyphColor="purple" />
//       </AdvancedMarker>

//       {open && (
//         <InfoWindow position={position} onCloseClick={() => setOpen(false)}>
//           <div style={{ color: "black" }}>
//             <b>Coordinates</b>
//             <p>Lat: {position.lat.toFixed(5)}</p>
//             <p>Lng: {position.lng.toFixed(5)}</p>
//           </div>
//         </InfoWindow>
//       )}
//     </Map>
//   );
// };

// export default Maps;

import {
  AdvancedMarker,
  InfoWindow,
  Map,
  Pin,
} from "@vis.gl/react-google-maps";
import { useCallback, useState } from "react";
import { useWeatherStore } from "@/store/useWeatherStore";

interface LocationCoords {
  lat: number;
  lng: number;
  address?: string;
}

interface MapsProps {
  onLocationSelect?: (coords: LocationCoords) => void;
}

const Maps = ({ onLocationSelect }: MapsProps) => {
  const [position, setPosition] = useState({ lat: 53.54, lng: 10 });
  const [open, setOpen] = useState(false);
  const [address, setAddress] = useState<string>("");

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

  // const handleMapClick = useCallback(
  //   (event: google.maps.MapMouseEvent) => {
  //     if (event.latLng) {
  //       const newPos = {
  //         lat: event.latLng.lat(),
  //         lng: event.latLng.lng(),
  //       };
  //       setPosition(newPos);
  //       setOpen(false);
  //       console.log("📍 Map clicked:", newPos);
  //       onLocationSelect?.(newPos);
  //     }
  //   },
  //   [onLocationSelect]
  // );

  //   const handleDragEnd = useCallback(
  //   (event: google.maps.MapMouseEvent) => {
  //     if (event.latLng) {
  //       const newPos = {
  //         lat: event.latLng.lat(),
  //         lng: event.latLng.lng(),
  //       };
  //       setPosition(newPos);
  //       console.log("📦 Drag end:", newPos);
  //       onLocationSelect?.(newPos);
  //     }
  //   },
  //   [onLocationSelect]
  // );

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
    <div className="w-full max-w-3xl flex flex-col h-[60vh] items-center justify-center">
      <div className="flex w-full">Select Location</div>
      <Map
        defaultZoom={6}
        defaultCenter={position}
        // style={{ width: "60%", height: "60vh" }}
        mapId={import.meta.env.VITE_GOOGLE_MAP_ID}
        onClick={() => handleMapClick}
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
              <b>Coordinates</b>
              <p>Lat: {position.lat.toFixed(5)}</p>
              <p>Lng: {position.lng.toFixed(5)}</p>
            </div>
          </InfoWindow>
        )}
      </Map>
    </div>
  );
};

export default Maps;
