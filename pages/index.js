import { useState } from "react";
import dynamic from "next/dynamic";
import Layout from "../components/Layout/Layout";
import FormWindow from "./../components/FormWindow/FormWindow";

import { Grid } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import coordinates from "../public/coordinates.json";

const MapLayer = dynamic(() => import("../components/Map/MapLayer"), {
	ssr: false,
});

export default function Home() {
	const classifyPoint = require("robust-point-in-polygon");

	const [latitude, setLattitude] = useState("");
	const [longitude, setLongitude] = useState("");
	const [groupList, setGroupList] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const getLocation = () => {
		setIsLoading(true);
		if ("geolocation" in navigator) {
			navigator.geolocation.getCurrentPosition(function (position) {
				setLattitude(parseFloat(position.coords.latitude));
				setLongitude(parseFloat(position.coords.longitude));
				locateGroup(position.coords.latitude, position.coords.longitude);
				setIsLoading(false);
			}, showError);
		} else {
			setAlertMessage("Geolocation is not supported by this browser.");
			setOpenAlert(true);
		}
	};

	function showError(error) {
		switch (error.code) {
			case error.PERMISSION_DENIED:
				setAlertMessage("User denied the request for Geolocation.");
				setOpenAlert(true);
				break;
			case error.POSITION_UNAVAILABLE:
				setAlertMessage("Location information is unavailable.");
				setOpenAlert(true);
				break;
			case error.TIMEOUT:
				setAlertMessage("The request to get user location timed out.");
				setOpenAlert(true);
				break;
			case error.UNKNOWN_ERROR:
				setAlertMessage("An unknown error occurred.");
				setOpenAlert(true);
				break;
		}
	}

	const locateGroup = (lat, lon) => {
		setGroupList([]);
		coordinates.forEach((group) => {
			let group_name = group.group_name;
			group.zones.forEach((zone) => {
				let result = classifyPoint(zone, [lat, lon]);
				if (result == -1) {
					setGroupList((prev) => [...prev, group_name]);
					return;
				}
			});
		});
	};

	const [openAlert, setOpenAlert] = useState(false);
	const [alertMessage, setAlertMessage] = useState("");

	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		setOpenAlert(false);
	};

	return (
		<Layout>
			<Snackbar
				anchorOrigin={{ vertical: "top", horizontal: "right" }}
				open={openAlert}
				onClose={handleClose}
				autoHideDuration={6000}
			>
				<Alert
					elevation={6}
					onClose={handleClose}
					severity="error"
					sx={{ width: "100%" }}
				>
					{alertMessage}
				</Alert>
			</Snackbar>
			<Grid container spacing={0}>
				<Grid item xs={12} md={3} justifyContent="center" alignItems="center">
					<FormWindow
						getLocation={getLocation}
						latitude={latitude}
						longitude={longitude}
						isLoading={isLoading}
						groupList={groupList}
					/>
				</Grid>
				<Grid item xs={0} md={9}>
					<MapLayer
						latitude={latitude}
						longitude={longitude}
						locateGroup={locateGroup}
						setLattitude={setLattitude}
						setLongitude={setLongitude}
					/>
				</Grid>
			</Grid>
		</Layout>
	);
}
