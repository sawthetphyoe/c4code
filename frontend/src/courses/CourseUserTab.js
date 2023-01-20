import {
	Box,
	Container,
	Table,
	TableBody,
	TableContainer,
	TableHead,
	Typography,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import TableRow from '../components/TableRow';
import {
	useDeleteEnrollmentMutation,
	useGetAllEnrollmentsQuery,
} from '../store';
import Error from '../ultis/Error';
import LoadingBar from '../ultis/LoadingBar';
import SkeletonList from '../ultis/SkeletonList';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';

const tableHeads = ['NAME', 'START DATE', 'END DATE', ''];

export default function CourseUserTab() {
	const { id } = useParams();
	const { data, error, isLoading, isFetching } = useGetAllEnrollmentsQuery([
		{
			key: 'course',
			value: id,
		},
	]);
	const [deleteEnrollment, deleteResults] = useDeleteEnrollmentMutation();

	const handleEnrollmentDelete = (id) => {
		deleteEnrollment(id);
	};

	if (isLoading)
		return (
			<Container maxWidth="sm">
				<LoadingBar />
				<SkeletonList spacing={4} times={4} />
			</Container>
		);

	if (error) return <Error message={error.data.message} />;

	if (data.results === 0)
		return (
			<Container
				maxWidth="lg"
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'flex-start',
					gap: 4,
					pb: 4,
				}}
			>
				<Typography variant="h4" sx={{ alignSelf: 'center', p: 4 }}>
					No Users
				</Typography>
			</Container>
		);

	const enrollments = data.data.data.map((enrol) => {
		return {
			id: enrol._id,
			raw: enrol,
			info: [
				enrol.student?.firstName + ' ' + enrol.student?.lastName,
				new Date(enrol.startDate).toLocaleDateString('en-UK'),
				enrol.endDate
					? new Date(enrol.endDate).toLocaleDateString('en-UK')
					: '-',
			],
		};
	});

	const renderedTableHeads = <TableRow data={tableHeads} />;

	const renderedInstructorRows = enrollments
		.filter((enrol) => enrol.raw.student.role === 'instructor')
		.map((enrol) => (
			<TableRow
				key={enrol.id}
				rawData={enrol.raw}
				id={enrol.id}
				data={enrol.info}
				onDelete={handleEnrollmentDelete}
			/>
		));

	const renderedStudentRows = enrollments
		.filter((enrol) => enrol.raw.student.role === 'student')
		.map((enrol) => (
			<TableRow
				key={enrol.id}
				rawData={enrol.raw}
				id={enrol.id}
				data={enrol.info}
				onDelete={handleEnrollmentDelete}
			/>
		));

	return (
		<Container
			maxWidth="lg"
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'flex-start',
				gap: 4,
				pb: 4,
			}}
		>
			{(isFetching || deleteResults.isLoading) && <LoadingBar />}

			{deleteResults.isError && (
				<Error message={deleteResults.error.data.message} />
			)}

			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'flex-start',
					width: '100%',
				}}
			>
				<Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
					<PlayArrowRoundedIcon
						sx={{ fontSize: 36, color: '#574F7D', padding: 0 }}
					/>
					<Typography variant="h6">
						Instructors ({renderedInstructorRows.length})
					</Typography>
				</Box>
				<TableContainer sx={{ maxHeight: 800, p: 2 }}>
					<Table stickyHeader>
						<TableHead>{renderedTableHeads}</TableHead>
						<TableBody>{renderedInstructorRows}</TableBody>
					</Table>
				</TableContainer>
			</Box>

			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'flex-start',
					width: '100%',
				}}
			>
				<Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
					<PlayArrowRoundedIcon
						sx={{ fontSize: 36, color: '#574F7D', padding: 0 }}
					/>
					<Typography variant="h6">
						Students ({renderedStudentRows.length})
					</Typography>
				</Box>
				<TableContainer sx={{ maxHeight: 800, p: 2 }}>
					<Table stickyHeader>
						<TableHead>{renderedTableHeads}</TableHead>
						<TableBody>{renderedStudentRows}</TableBody>
					</Table>
				</TableContainer>
			</Box>
		</Container>
	);
}
