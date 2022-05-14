import { map } from "leaflet";
import { useEffect, useState, useRef } from "react";
import {
	MapContainer,
	TileLayer,
	useMapEvents,
	Marker,
	Popup,
} from "react-leaflet";
import Button from "@mui/material/Button";

const MapLayer = (props) => {
	const mapRef = useRef();
	const defaultPosition = [7.835406, 80.702906];
	const defaultZoom = 7.5;

	const [position, setPosition] = useState([7.835406, 80.702906]);

	// useEffect(() => {
	// 	setPosition([props.latitude, props.longitude]);
	// 	handleSetView();
	// }, [props.latitude, props.longitude]);

	const handleSetView = () => {
		const { current = {} } = mapRef;
		const { leafletElement: map } = current;
		console.log(current);
		map.setView([7.835406, 80.702906]);
	};

	return (
		<div style={{ width: "100%", height: "100vh" }}>
			{/* <Button onClick={handleSetView}>Use My Location</Button> */}
			<MapContainer
				ref={mapRef}
				center={defaultPosition}
				zoom={defaultZoom}
				scrollWheelZoom={true}
				style={{ height: "100%", width: "100%" }}
			>
				<TileLayer
					attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
			</MapContainer>
		</div>
	);
};

export default MapLayer;
