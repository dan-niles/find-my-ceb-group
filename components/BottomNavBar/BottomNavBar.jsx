import { useState } from "react";

import Paper from "@mui/material/Paper";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

import LocationOnIcon from "@mui/icons-material/LocationOn";
import FlagIcon from "@mui/icons-material/Flag";

const BottomNavBar = () => {
	const [value, setValue] = useState(0);

	return (
		<Paper
			sx={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 9999 }}
			elevation={3}
		>
			<BottomNavigation
				showLabels
				value={value}
				onChange={(event, newValue) => {
					setValue(newValue);
				}}
			>
				<BottomNavigationAction label="Locate" icon={<LocationOnIcon />} />
				<BottomNavigationAction label="Report" icon={<FlagIcon />} />
			</BottomNavigation>
		</Paper>
	);
};

export default BottomNavBar;
