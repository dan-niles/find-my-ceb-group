import dynamic from "next/dynamic";
import Layout from "../components/Layout/Layout";

import { Grid, Container, Paper } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const Map = dynamic(() => import("../components/Map/Map"), { ssr: false });

export default function Home() {
	return (
		<Layout>
			<Grid container spacing={0}>
				<Grid item xs={3} justifyContent="center" alignItems="center">
					<Card sx={{ minHeight: "100vh" }}>
						<CardContent>
							<Typography
								variant="h4"
								component="div"
								className="font-semibold"
							>
								Find My Group
							</Typography>
						</CardContent>
						{/* <CardActions>
							<Button size="small">Learn More</Button>
						</CardActions> */}
					</Card>
				</Grid>
				<Grid item xs={9}>
					<Map />
				</Grid>
			</Grid>
		</Layout>
	);
}
