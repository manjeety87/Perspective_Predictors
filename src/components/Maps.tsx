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

interface MapsProps {
  onLocationSelect?: (coords: { lat: number; lng: number }) => void;
}

const Maps = ({ onLocationSelect }: MapsProps) => {
  const [position, setPosition] = useState({ lat: 53.54, lng: 10 });
  const [open, setOpen] = useState(false);

  const handleMapClick = useCallback(
    (event: google.maps.MapMouseEvent) => {
      if (event.latLng) {
        const newPos = {
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
        };
        setPosition(newPos);
        setOpen(false);
        console.log("📍 Map clicked:", newPos);
        onLocationSelect?.(newPos);
      }
    },
    [onLocationSelect]
  );

  const handleDragEnd = useCallback(
    (event: google.maps.MapMouseEvent) => {
      if (event.latLng) {
        const newPos = {
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
        };
        setPosition(newPos);
        console.log("📦 Drag end:", newPos);
        onLocationSelect?.(newPos);
      }
    },
    [onLocationSelect]
  );

  return (
    <Map
      defaultZoom={6}
      defaultCenter={position}
      style={{ width: "40%", height: "40vh" }}
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
  );
};

export default Maps;
