import { useState } from 'react';
import { useGetAllCoursesQuery, useDeleteCourseMutation } from '../store';
import {
	Box,
	Container,
	TableContainer,
	Table,
	TableHead,
	TableBody,
	TableRow,
	TableCell,
	IconButton,
	Alert,
	CircularProgress,
} from '@mui/material';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import SkeletonList from '../ultis/SkeletonList';

const tableHeads = ['NAME', 'CATEGORY', 'STUDENTS', 'LAST UPDATED', '', ''];

function CourseList({ searchTerm }) {
	const { data, error, isFetching } = useGetAllCoursesQuery();
	const [deleteCourse, courseDeleteResults] = useDeleteCourseMutation();
	const [deletedId, setDeletedId] = useState('');

	const handleUserDeleteSubmit = (e, id) => {
		e.preventDefault();
		deleteCourse(id);
		setDeletedId(id);
	};

	const deleteButton = (id, deleting) => {
		return (
			<form onSubmit={(e) => handleUserDeleteSubmit(e, id)}>
				<IconButton aria-label="delete" type="submit">
					{deleting && deletedId === id ? (
						<CircularProgress size={18} />
					) : (
						<DeleteIcon />
					)}
				</IconButton>
			</form>
		);
	};

	let content;
	if (isFetching) {
		content = <SkeletonList times={6} spacing={2} />;
	} else if (error) {
		content = <h1>Error</h1>;
	} else {
		const rows = data.data.data.map((course) => {
			return [
				{
					name: course.name,
					pathName: `${course._id}`,
				},
				course.category.name,
				0,
				course.updatedAt
					? new Date(course.updatedAt).toLocaleDateString('en-UK')
					: 'never',
			];
		});

		const renderedtableHeads = tableHeads.map((title, index) =>
			index === 0 || index === 1 ? (
				<TableCell sx={{ fontSize: 16 }} key={index + title}>
					{title}
				</TableCell>
			) : (
				<TableCell align="right" sx={{ fontSize: 16 }} key={index + title}>
					{title}
				</TableCell>
			)
		);

		const renderedtableRows = rows
			.filter((row) =>
				row[0].name.toLowerCase().includes(searchTerm.toLowerCase())
			)
			.map((row, index) => (
				<TableRow
					key={index}
					sx={{
						'&:last-child td, &:last-child th': { border: 0 },
					}}
					hover={true}
				>
					{row.map((item, index) =>
						index === 0 || index === 1 ? (
							<TableCell
								component="th"
								scope="row"
								key={index}
								sx={{ fontSize: 16 }}
							>
								{index === 0 ? (
									<Link
										to={item.pathName}
										style={{
											color: 'inherit',
											textDecoration: 'none',
											textTransform: 'capitalize',
										}}
										className="hover-underlined"
									>
										{item.name}
									</Link>
								) : (
									item
								)}
							</TableCell>
						) : (
							<TableCell align="right" key={index} sx={{ fontSize: 16 }}>
								{item}
							</TableCell>
						)
					)}

					<TableCell align="right" key={index} sx={{ fontSize: 16 }}>
						{deleteButton(row[0].pathName, courseDeleteResults.isLoading)}
					</TableCell>
				</TableRow>
			));

		content = (
			<TableContainer component={Box} sx={{ maxHeight: 800 }}>
				{courseDeleteResults.isError && (
					<Alert severity="error">
						{courseDeleteResults.error.data.message}
					</Alert>
				)}
				<Table stickyHeader sx={{ minWidth: 650 }}>
					<TableHead>
						<TableRow>{renderedtableHeads}</TableRow>
					</TableHead>
					<TableBody>{renderedtableRows}</TableBody>
				</Table>
			</TableContainer>
		);
	}

	return <Container maxWidth="xl">{content}</Container>;
}

export default CourseList;
