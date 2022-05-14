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
			});
		} else {
			console.log("Not Available");
		}
	};

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

	return (
		<Layout>
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
								startIcon={<MyLocationIcon />}
							>
								Use My Location
							</Button>
						</CardActions>
						<Stack spacing={2} sx={{ mx: 2 }}>
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
										<Typography
											key={idx}
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
											<Avatar sx={{ ml: 0.8, backgroundColor: "#267eca" }}>
												{grp}
											</Avatar>
										</Typography>
									);
								})}
						</Stack>
					</Card>
				</Grid>
				<Grid item xs={0} md={9}>
					<MapLayer latitude={latitude} longitude={longitude} />
				</Grid>
			</Grid>
		</Layout>
	);
}
