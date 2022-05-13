import dynamic from "next/dynamic";
import Layout from "../components/Layout/Layout";

import Container from "@mui/material/Container";

const Map = dynamic(() => import("../components/Map/Map"), { ssr: false });

export default function Home() {
	return (
		<Layout>
			<Map />
		</Layout>
	);
}
