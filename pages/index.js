import { useState } from "react";
import dynamic from "next/dynamic";
import Layout from "../components/Layout/Layout";

import { Grid, Container, Paper } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import Avatar from "@mui/material/Avatar";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import MyLocationIcon from "@mui/icons-material/MyLocation";

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
					<Card sx={{ minHeight: "100vh" }}>
						<CardContent>
							<Typography
								variant="h4"
								component="div"
								className="font-semibold text-center"
							>
								Find My Group
							</Typography>
						</CardContent>
						<CardActions sx={{ justifyContent: "center", my: 3 }}>
							<Button
								onClick={getLocation}
								variant="outlined"
								color="info"
								startIcon={<MyLocationIcon />}
							>
								Use My Location
							</Button>
						</CardActions>
						<Stack spacing={2} sx={{ mx: 2, my: 5 }}>
							<TextField
								label="Lattitude"
								variant="outlined"
								value={latitude}
								InputProps={{
									readOnly: true,
								}}
							/>
							<TextField
								label="Longitude"
								variant="outlined"
								value={longitude}
								InputProps={{
									readOnly: true,
								}}
							/>
						</Stack>
						<Stack
							spacing={1}
							sx={{
								mx: 2,
								my: 5,
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							{isLoading && <CircularProgress />}
							{!isLoading &&
								groupList?.map((grp, idx) => {
									return (
										<a
											href={`https://www.ekata.lk/schedule?group=${grp}`}
											target="_blank"
											key={idx}
											rel="noreferrer"
										>
											<Typography
												variant="h6"
												component="div"
												className="font-medium"
												sx={{
													display: "flex",
													flexDirection: "row",
													alignItems: "center",
													my: 1,
												}}
											>
												Group
												<Avatar sx={{ ml: 0.8, backgroundColor: "#2ab5f6" }}>
													{grp}
												</Avatar>
											</Typography>
										</a>
									);
								})}
						</Stack>
					</Card>
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
