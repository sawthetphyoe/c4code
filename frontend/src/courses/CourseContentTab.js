import { Container, Grid } from '@mui/material';
import CourseSummaryCard from './CourseSummaryCard';
import CourseContent from './CourseContent';

export default function CourseContentTab() {
	// const {
	// 	data: sectionData,
	// 	error: sectionError,
	// 	isLoading: sectionLoading,
	// 	isFetching: sectionFetching,
	// } = useGetAllSectionsQuery({ filter: 'course', value: id });

	return (
		<Container maxWidth="lg" sx={{ pl: 3, pr: 3 }}>
			<Grid container spacing={4}>
				<Grid item sm={4}>
					<CourseSummaryCard />
				</Grid>
				<Grid item sm={8}>
					<CourseContent />
				</Grid>
			</Grid>
		</Container>
	);
}
