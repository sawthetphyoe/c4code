import { Container, Paper } from '@mui/material';
import BreadcrumbsBar from '../components/BreadcrumbsBar';

import Tab from '../components/Tab';
import { useGetCourseQuery } from '../store';
import { useParams } from 'react-router-dom';
import Error from '../ultis/Error';
import LoadingBar from '../ultis/LoadingBar';
import CourseInfoTab from '../courses/CourseInfoTab';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import LocalLibraryRoundedIcon from '@mui/icons-material/LocalLibraryRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import FolderRoundedIcon from '@mui/icons-material/FolderRounded';
import CourseContentTab from '../courses/CourseContentTab';
import CourseUserTab from '../courses/CourseUserTab';
import CourseFileTab from '../courses/CourseFileTab';

const tabHeadings = [
	{
		title: 'Info',
		icon: <InfoRoundedIcon />,
	},
	{
		title: 'Content',
		icon: <LocalLibraryRoundedIcon />,
	},
	{
		title: 'Users',
		icon: <PeopleAltRoundedIcon />,
	},
	{
		title: 'Files',
		icon: <FolderRoundedIcon />,
	},
];

export default function CourseInfoPage() {
	const { id } = useParams();
	const { data, error, isLoading, isFetching } = useGetCourseQuery(id);

	if (error) return <Error message={error.data.message} />;

	if (isLoading) return <LoadingBar />;

	const course = data.data.data;

	return (
		<Container maxWidth="xl">
			<Paper sx={{ height: '100%', overflow: 'hidden' }}>
				<BreadcrumbsBar
					paths={[
						{
							pathName: 'Home',
							path: '/',
						},
						{
							pathName: 'Courses',
							path: '/courses',
						},
					]}
					currentPage={isFetching ? '-' : course.name}
				/>
				<Tab
					heads={tabHeadings}
					tabs={[
						<CourseInfoTab />,
						<CourseContentTab />,
						<CourseUserTab />,
						<CourseFileTab />,
					]}
				/>
			</Paper>
		</Container>
	);
}
