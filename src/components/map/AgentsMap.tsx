import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';

// Fix for default marker icon
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete (Icon.Default.prototype as any)._getIconUrl;
Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

interface Agent {
  id: string;
  name: string;
  address: string;
  phone: string;
  lat: number;
  lng: number;
}

const agents: Agent[] = [
  {
    id: '1',
    name: 'IMEI Center Algiers',
    address: '123 Rue Didouche Mourad, Algiers',
    phone: '+213 555 123 456',
    lat: 36.7538,
    lng: 3.0588
  },
  {
    id: '2',
    name: 'Mobile Verification Oran',
    address: '45 Boulevard Millinium, Oran',
    phone: '+213 555 789 012',
    lat: 35.6987,
    lng: -0.6349
  },
  {
    id: '3',
    name: 'Device Check Constantine',
    address: '78 Avenue Ben Badis, Constantine',
    phone: '+213 555 345 678',
    lat: 36.3650,
    lng: 6.6147
  }
];

const AgentsMap = () => {
  return (
    <div className="h-[400px] w-full rounded-lg overflow-hidden shadow-md">
      <MapContainer
        center={[36.7538, 3.0588]}
        zoom={6}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {agents.map((agent) => (
          <Marker key={agent.id} position={[agent.lat, agent.lng]}>
            <Popup>
              <div className="p-2">
                <h3 className="font-semibold text-lg">{agent.name}</h3>
                <p className="text-gray-600 text-sm mt-1">{agent.address}</p>
                <p className="text-gray-600 text-sm mt-1">
                  <a 
                    href={`tel:${agent.phone}`}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    {agent.phone}
                  </a>
                </p>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${agent.lat},${agent.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 text-sm text-blue-600 hover:text-blue-800"
                >
                  Get Directions
                </a>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default AgentsMap;