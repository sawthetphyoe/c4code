import * as React from 'react';
import { styled } from '@mui/material/styles';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { Box, Button } from '@mui/material';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import { useGetSectionQuery } from '../store';
import LoadingBar from '../ultis/LoadingBar';
import Error from '../ultis/Error';

const Accordion = styled((props) => (
	<MuiAccordion disableGutters elevation={0} {...props} />
))(({ theme }) => ({
	'&:not(:last-child)': {
		borderBottom: 0,
	},
	'&:before': {
		display: 'none',
	},
}));

const AccordionSummary = styled((props) => (
	<MuiAccordionSummary
		expandIcon={
			<PlayArrowRoundedIcon sx={{ fontSize: 22, color: '#574F7D' }} />
		}
		{...props}
	/>
))(({ theme }) => ({
	backgroundColor: 'rgba(170, 170, 170, .15)',
	flexDirection: 'row-reverse',
	'& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
		transform: 'rotate(90deg)',
	},
	'& .MuiAccordionSummary-content': {
		marginLeft: theme.spacing(1),
	},
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
	padding: theme.spacing(2),
	borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export default function SectionAccordion({
	sectionId,
	expanded,
	handleChange,
}) {
	const { data, error, isLoading, isFetching } = useGetSectionQuery(sectionId);

	if (isLoading) return <LoadingBar />;

	if (error) return <Error message={error.data.message} />;

	const section = data.data.data;

	return (
		<Accordion
			expanded={expanded === section._id}
			onChange={handleChange(section._id)}
		>
			<AccordionSummary
				aria-controls="panel1d-content"
				id="panel1d-header"
				expanded={expanded}
			>
				<Typography variant="h6" sx={{ fontSize: 18 }}>
					{section.name}
				</Typography>
			</AccordionSummary>
			<Box sx={{ display: 'flex', gap: 2, alignItems: 'center', p: 1, pl: 2 }}>
				<Button size="small">
					<EditRoundedIcon fontSize="small" sx={{ mr: 1 }} />
					Edit
				</Button>
				<Button size="small">
					<DeleteRoundedIcon fontSize="small" sx={{ mr: 1 }} />
					Delete
				</Button>
			</Box>
			<AccordionDetails>
				<Typography>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
					malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum
					dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada
					lacus ex, sit amet blandit leo lobortis eget.
				</Typography>
			</AccordionDetails>
		</Accordion>
	);
}
