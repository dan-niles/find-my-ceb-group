import Head from "next/head";

import { ThemeProvider, createTheme } from "@mui/material/styles";

import BottomNavBar from "../bottomNavBar/BottomNavBar";

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
			</Head>
			{props.children}
		</ThemeProvider>
	);
};

export default Layout;
