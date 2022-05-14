import { map } from "leaflet";
import { useEffect, useState, useRef } from "react";
import {
	MapContainer,
	TileLayer,
	useMap,
	useMapEvents,
	Marker,
	Popup,
} from "react-leaflet";
import Button from "@mui/material/Button";

const MapLayer = (props) => {
	const defaultPosition = [7.835406, 80.702906];
	const defaultZoom = 7.5;

	const [map, setMap] = useState(null);
	const [position, setPosition] = useState(defaultPosition);

	const MapComponent = () => {
		const map = useMap();
		setMap(map);
	};

	useEffect(() => {
		setPosition([props.latitude, props.longitude]);
		map?.flyTo([props.latitude, props.longitude], 13);
	}, [props.latitude, props.longitude]);

	return (
		<div style={{ width: "100%", height: "100vh" }}>
			<MapContainer
				center={defaultPosition}
				zoom={defaultZoom}
				scrollWheelZoom={true}
				style={{ height: "100%", width: "100%" }}
			>
				<TileLayer
					attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<MapComponent />
				<Marker position={position}>
					<Popup>
						A pretty CSS3 popup. <br /> Easily customizable.
					</Popup>
				</Marker>
			</MapContainer>
		</div>
	);
};

export default MapLayer;
