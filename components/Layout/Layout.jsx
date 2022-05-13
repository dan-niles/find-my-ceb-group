import Head from "next/head";

import { ThemeProvider, createTheme } from "@mui/material/styles";

// import BottomNavBar from "../bottomNavBar/BottomNavBar";

const Layout = (props) => {
	const theme = createTheme({
		typography: {
			fontFamily: [
				"Inter",
				"-apple-system",
				"BlinkMacSystemFont",
				'"Segoe UI"',
				"Roboto",
				'"Helvetica Neue"',
				"Arial",
				"sans-serif",
				'"Apple Color Emoji"',
				'"Segoe UI Emoji"',
				'"Segoe UI Symbol"',
			].join(","),
		},
	});

	return (
		<ThemeProvider theme={theme}>
			<Head>
				<title>Find My CEB Group</title>
				<meta name="description" content="Find Your CEB Group Easily" />
				<link rel="icon" href="/favicon.ico" />
				<link
					rel="stylesheet"
					href="https://unpkg.com/leaflet@1.8.0/dist/leaflet.css"
					integrity="sha512-hoalWLoI8r4UszCkZ5kL8vayOGVae1oxXe/2A4AO6J9+580uKHDO3JdHb7NzwwzK5xr/Fs0W40kiNHxM9vyTtQ=="
					crossOrigin=""
				/>
			</Head>
			{props.children}
		</ThemeProvider>
	);
};

export default Layout;
