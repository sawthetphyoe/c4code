import React from 'react';
import { useParams } from 'react-router-dom';
import {
	Button,
	Avatar,
	Box,
	CircularProgress,
	Paper,
	Typography,
	TextField,
} from '@mui/material';
import Modal from '@mui/material/Modal';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { useGetCourseQuery, useUpdateCourseMutation } from '../store';
import { useEffect, useState } from 'react';

const AddLectureForm = React.lazy(() => import('./AddLectureForm'));

function CourseContentPage() {
	const { id } = useParams();
	const {
		data: courseData,
		error: courseError,
		isLoading: courseLoading,
	} = useGetCourseQuery(id);
	const [updateCourse, results] = useUpdateCourseMutation();
	const [image, setImage] = useState('');

	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const handleUploadChange = (e) => {
		const formData = new FormData();
		formData.append('image', e.target.files[0]);
		updateCourse({
			id,
			body: formData,
		});
	};

	useEffect(() => {
		if (courseData) setImage(courseData.data.data.image);
	}, [courseData, results]);

	let content;
	if (courseLoading) {
		content = <h1>Course is loading...</h1>;
	} else if (courseError) {
		content = <h1>{courseError.data.message}</h1>;
	} else {
		const course = courseData.data.data;
		content = (
			<>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						gap: 3,
					}}
				>
					{results.isLoading ? (
						<Paper
							sx={{
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								height: 120,
								width: 200,
							}}
						>
							<CircularProgress />
						</Paper>
					) : (
						<Avatar
							variant="square"
							src={image && `http://localhost:3005/img/courses/${image}`}
							alt={course.name}
							sx={{ height: 120, width: 200 }}
						/>
					)}

					<Button component="label" variant="outlined">
						<PhotoCamera sx={{ fontSize: 18, mr: 1 }} />
						upload new photo
						<input
							hidden
							accept="image/*"
							multiple
							type="file"
							onChange={handleUploadChange}
						/>
					</Button>
				</Box>
				<h1>{course.name}</h1>
				<br />
				<h1>{course.category.name}</h1>
				<p>{course.description}</p>
				<div>
					<Button
						variant="outlined"
						sx={{
							marginLeft: 3,
							marginTop: 3,
							marginBottom: 2,
							pr: 3,
						}}
						onClick={handleOpen}
					>
						<AddRoundedIcon sx={{ fontSize: 22, mr: 1 }} /> Add content
					</Button>
					<Modal open={open} onClose={handleClose}>
						<React.Suspense fallback={<h1>Loading...</h1>}>
							<div>
								<AddLectureForm />
							</div>
						</React.Suspense>
					</Modal>
				</div>
			</>
		);
	}

	return content;
}

export default CourseContentPage;
