import {
	Box,
	Button,
	Container,
	Dialog,
	DialogActions,
	DialogTitle,
	IconButton,
	Typography,
} from '@mui/material';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import {
	useGetAllSectionsQuery,
	useGetCourseQuery,
	useGetEnrollmentQuery,
	useUpdateCompletedLectureMutation,
	useUpdateEnrollmentMutation,
} from '../store';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingBar from '../ultis/LoadingBar';
import Error from '../ultis/Error';
import StudentSectionAccordion from '../students/StudentSectionAccordion';
import { useCallback, useEffect, useState } from 'react';
import YouTube from 'react-youtube';

const videoOptions = {
	height: 585,
	width: 1040,
	playerVars: {
		enablejsapi: 1,
		color: '#574F7D',
		rel: 0,
		origin: 'http://localhost:3000',
	},
};

export default function CoursePlayPage() {
	const { courseId, enrollmentId } = useParams();
	const navigate = useNavigate();
	const [updateEnrollment] = useUpdateEnrollmentMutation();
	const [updateCompletedLecture] = useUpdateCompletedLectureMutation();
	const [currentLecture, setCurrentLecture] = useState('');
	const [expanded, setExpanded] = useState('');
	const [videoId, setVideoId] = useState(undefined);

	const {
		data: courseData,
		error: courseError,
		isLoading: courseLoading,
	} = useGetCourseQuery(courseId);

	const {
		data: enrolData,
		error: enrolError,
		isLoading: enrolLoading,
	} = useGetEnrollmentQuery({ id: enrollmentId });

	const {
		data: sectionData,
		error: sectionError,
		isLoading: sectionLoading,
	} = useGetAllSectionsQuery([
		{
			key: 'course',
			value: courseId,
		},
	]);

	useEffect(() => {
		if (enrolData && !enrolError) {
			if (enrolData.data.data.currentLecture) {
				setCurrentLecture(enrolData.data.data.currentLecture);
				// console.log(enrolData.data.data.currentLecture);
				setVideoId(enrolData.data.data.currentLecture.url.split('/')[3]);
			}
		}
	}, [enrolData, enrolError]);

	const handleChange = (panel) => (event, newExpanded) => {
		setExpanded(newExpanded ? panel : undefined);
	};

	const handleLectureChange = useCallback(
		(lecture) => {
			const id = lecture.url.split('/')[3];
			setCurrentLecture(lecture);
			setVideoId(id);
			if (id !== videoId) {
				updateEnrollment({
					_id: enrolData.data.data._id,
					currentLecture: lecture._id,
				});
			}
		},
		[enrolData, videoId, updateEnrollment]
	);

	const onEnd = (e) => {
		updateCompletedLecture({
			enrollmentId,
			body: { lectureId: currentLecture._id, action: 'add' },
		});
	};

	if (courseLoading || enrolLoading || sectionLoading) return <LoadingBar />;

	if (courseError) return <Error message={courseError.data.message} />;

	if (enrolError) return <Error message={enrolError.data.message} />;

	if (sectionError) return <Error message={sectionError.data.message} />;

	if (sectionData.results === 0 || courseData.data.data.duration === 0)
		return (
			<Dialog open onClose={() => navigate('/', { replace: true })}>
				<DialogTitle sx={{ width: 450, pl: 4, pr: 4, pt: 4 }}>
					<Typography variant="h5" component="span">
						No lectures yet!
					</Typography>
				</DialogTitle>
				<DialogActions sx={{ mb: 2 }}>
					<Button onClick={() => navigate('/', { replace: true })} autoFocus>
						Go to home page
						<ArrowForwardRoundedIcon sx={{ ml: 2 }} />
					</Button>
				</DialogActions>
			</Dialog>
		);

	const course = courseData.data.data;

	const enrollment = enrolData.data.data;

	const courseSections = sectionData.data.data;

	const renderedSections = courseSections.map((sec) => (
		<StudentSectionAccordion
			key={sec._id}
			section={sec}
			handleChange={handleChange}
			expanded={expanded}
			onLectureChange={handleLectureChange}
			videoId={videoId}
			enrollment={enrollment}
		/>
	));

	return (
		<Container maxWidth="xl" sx={{ mt: 4, minHeight: 750 }}>
			<Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 4 }}>
				<IconButton onClick={() => navigate('/')}>
					<ArrowBackIosNewRoundedIcon />
				</IconButton>
				<Typography variant="h6" sx={{ fontSize: 28 }}>
					{course.name}
				</Typography>
			</Box>
			<Box
				sx={{
					width: '100%',
					display: 'flex',
				}}
			>
				<Box
					sx={{
						width: '1040px',
						display: 'flex',
						flexDirection: 'column',
						gap: 4,
						alignItems: 'center',
					}}
				>
					{videoId && (
						<YouTube videoId={videoId} opts={videoOptions} onEnd={onEnd} />
					)}
				</Box>
				<Box
					sx={{
						width: '490px',
						height: 585,
						overflowY: 'scroll',
						backgroundColor: 'rgba(170, 170, 170, .15)',
					}}
				>
					<Typography variant="h6" sx={{ p: 2, pl: 4 }}>
						Course Content
					</Typography>
					{renderedSections}
				</Box>
			</Box>
		</Container>
	);
}
