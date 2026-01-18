import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { difficultyLevels } from '../data/trails';

// Fix for default Leaflet icon not finding images in Vite
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Custom colored icons could be implemented here using DivIcon for per-marker color

const MapComponent = ({ trails, onTrailSelect }) => {
    const center = [-38.07, 145.12]; // Centered between Mordialloc and Frankston

    // Custom marker function to create colored markers
    const createCustomIcon = (level) => {
        const color = difficultyLevels[level].hex;
        return L.divIcon({
            className: 'custom-icon',
            html: `<div style="background-color: ${color}; width: 24px; height: 24px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
            iconSize: [24, 24],
            iconAnchor: [12, 12],
            popupAnchor: [0, -12]
        });
    };

    return (
        <MapContainer center={center} zoom={11} style={{ height: '100%', width: '100%' }} zoomControl={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            />
            {trails.map(trail => (
                <Marker
                    key={trail.id}
                    position={[trail.lat, trail.lng]}
                    icon={createCustomIcon(trail.level)}
                    eventHandlers={{
                        click: () => onTrailSelect(trail),
                    }}
                >
                    <Popup>
                        <div className="font-sans">
                            <h3 className="font-bold text-lg">{trail.name}</h3>
                            <div
                                className={`text-xs px-2 py-0.5 rounded-full inline-block text-white mb-2 font-medium`}
                                style={{ backgroundColor: difficultyLevels[trail.level].hex }}
                            >
                                {difficultyLevels[trail.level].label}
                            </div>
                            <p className="text-sm text-gray-600 m-0">{trail.description}</p>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default MapComponent;
