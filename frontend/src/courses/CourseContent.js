import { Box, Button, IconButton } from '@mui/material';
import { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetAllSectionsQuery } from '../store';
import Error from '../ultis/Error';
import LoadingBar from '../ultis/LoadingBar';
import AddSectionOverlay from './AddSectionOverlay';
import SectionAccordion from './SectionAccordion';
import EditRoundedIcon from '@mui/icons-material/EditRounded';

export default function CourseContent() {
	const { id } = useParams();
	const { data, error, isLoading, isFetching } = useGetAllSectionsQuery([
		{
			key: 'course',
			value: id,
		},
		{
			key: 'sort',
			value: 'index',
		},
	]);
	const [modalOpen, setModalOpen] = useState(false);
	const [expanded, setExpanded] = useState('');
	const onModalClose = useCallback(() => {
		setModalOpen(false);
	}, []);
	const handleChange = (panel) => (event, newExpanded) => {
		setExpanded(newExpanded ? panel : undefined);
	};
	if (isLoading) return <LoadingBar />;

	if (error) return <Error message={error.data.message} />;

	const sections = data.data.data.map((section, index) => (
		<Box key={section._id}>
			<SectionAccordion
				sectionId={section._id}
				handleChange={handleChange}
				expanded={expanded}
			/>
		</Box>
	));

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				gap: 2,
				alignItems: 'flex-start',
			}}
		>
			<Button variant="contained" onClick={() => setModalOpen(true)}>
				add section
			</Button>
			<Box
				sx={{
					pt: 1,
					pb: 1,
					pl: 2,
					pr: 2,
					backgroundColor: 'rgba(170, 170, 170, .15)',
					borderRadius: '.3rem',
				}}
			>
				{sections}
			</Box>
			<AddSectionOverlay open={modalOpen} onClose={onModalClose} />
		</Box>
	);
}
