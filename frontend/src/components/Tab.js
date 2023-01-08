import { useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import { Tab as MuiTab } from '@mui/material';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import FolderRoundedIcon from '@mui/icons-material/FolderRounded';
import Box from '@mui/material/Box';

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && <Box sx={{ p: 3 }}>{children}</Box>}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired,
};

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
}

export default function Tab({ tabs }) {
	const [value, setValue] = useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<Box sx={{ width: '100%' }}>
			<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
				<Tabs value={value} onChange={handleChange}>
					<MuiTab
						icon={<InfoRoundedIcon />}
						iconPosition="start"
						label="Info"
						{...a11yProps(0)}
					/>
					<MuiTab
						icon={<SchoolRoundedIcon />}
						iconPosition="start"
						label="Courses"
						{...a11yProps(1)}
					/>
					<MuiTab
						icon={<FolderRoundedIcon />}
						iconPosition="start"
						label="Files"
						{...a11yProps(2)}
					/>
				</Tabs>
			</Box>
			{tabs.map((tab, i) => (
				<TabPanel key={i} index={i} value={value}>
					{tab}
				</TabPanel>
			))}
		</Box>
	);
}
