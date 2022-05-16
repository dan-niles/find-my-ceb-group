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

const FormWindow = (props) => {
	return (
		<Card
			sx={{
				minHeight: "100vh",
			}}
		>
			<Stack
				sx={{
					minHeight: "100vh%",
				}}
				direction="column"
				justifyContent="center"
				alignItems="center"
			>
				<CardContent>
					<Typography
						variant="h4"
						component="div"
						className="font-semibold text-center"
					>
						Find My Group
					</Typography>
				</CardContent>
				<CardActions
					sx={{
						justifyContent: "center",
						my: 3,
					}}
				>
					<Button
						onClick={props.getLocation}
						variant="outlined"
						color="info"
						startIcon={<MyLocationIcon />}
						size="large"
					>
						Use My Location
					</Button>
				</CardActions>
				<Stack
					spacing={2}
					sx={{
						mx: 2,
						my: 5,
					}}
				>
					<TextField
						label="Latitude"
						variant="outlined"
						value={props.latitude}
						InputProps={{
							readOnly: true,
						}}
					/>
					<TextField
						label="Longitude"
						variant="outlined"
						value={props.longitude}
						InputProps={{
							readOnly: true,
						}}
					/>
				</Stack>
				<Stack
					spacing={1}
					sx={{
						mx: 2,
						my: 3,
						px: 6,
						overflowY: "auto",
						height: "15em",
					}}
				>
					{props.isLoading && <CircularProgress />}
					{!props.isLoading && props.groupList.length > 1 && (
						<p className="font-light">Possible Groups:</p>
					)}
					{!props.isLoading &&
						props.groupList?.map((grp, idx) => {
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
										<Avatar
											sx={{
												ml: 0.8,
												backgroundColor: "#2ab5f6",
											}}
										>
											{grp}
										</Avatar>
									</Typography>
								</a>
							);
						})}
				</Stack>
			</Stack>
		</Card>
	);
};

export default FormWindow;
