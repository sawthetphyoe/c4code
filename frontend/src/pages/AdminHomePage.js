import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded';
import AssessmentRoundedIcon from '@mui/icons-material/AssessmentRounded';
import { Container, Grid, Paper } from '@mui/material';
import IconCard from '../components/IconCard';
import BreadcrumbsBar from '../components/BreadcrumbsBar';

const iconStyle = {
	fontSize: 56,
	color: 'primary',
};

export default function HomePage() {
	return (
		<Container maxWidth="md">
			<Paper
				elevation={3}
				sx={{
					mt: 8,
				}}
			>
				<BreadcrumbsBar currentPage="Home" />
				<Container maxWidth="sm">
					<Grid
						container
						spacing={4}
						maxWidth="md"
						sx={{
							alignItems: 'center',
							p: 6,
						}}
					>
						<Grid item xs={6}>
							<IconCard
								icon={<SchoolRoundedIcon sx={iconStyle} />}
								buttonText="courses"
								link="/courses"
							/>
						</Grid>

						<Grid item xs={6}>
							<IconCard
								icon={<PeopleAltRoundedIcon sx={iconStyle} />}
								buttonText="users"
								link="/users"
							/>
						</Grid>

						<Grid item xs={6}>
							<IconCard
								icon={<CategoryRoundedIcon sx={iconStyle} />}
								buttonText="categories"
								link="/categories"
							/>
						</Grid>

						<Grid item xs={6}>
							<IconCard
								icon={<AssessmentRoundedIcon sx={iconStyle} />}
								buttonText="reports"
								link="/reports"
							/>
						</Grid>
					</Grid>
				</Container>
			</Paper>
		</Container>
	);
}
