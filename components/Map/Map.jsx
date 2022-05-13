import { useState } from "react";
import {
	MapContainer,
	TileLayer,
	useMapEvents,
	Marker,
	Popup,
} from "react-leaflet";

const Map = () => {
	function LocationMarker() {
		const [position, setPosition] = useState(null);
		const map = useMapEvents({
			click() {
				map.locate();
			},
			locationfound(e) {
				setPosition(e.latlng);
				map.flyTo(e.latlng, 13);
			},
		});

		return position === null ? null : (
			<Marker position={position}>
				<Popup>You are here</Popup>
			</Marker>
		);
	}

	return (
		<div style={{ width: "100%", height: "100vh" }}>
			<MapContainer
				center={[7.835406, 80.702906]}
				zoom={7.5}
				scrollWheelZoom={true}
				style={{ height: "100%", width: "100%" }}
			>
				<TileLayer
					attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<LocationMarker />
			</MapContainer>
		</div>
	);
};

export default Map;
