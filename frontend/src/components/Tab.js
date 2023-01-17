import { useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import { Tab as MuiTab } from '@mui/material';
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

export default function Tab({ heads, tabs }) {
	const [value, setValue] = useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const renderedHeads = heads.map((head, index) => {
		return (
			<MuiTab
				key={head.title}
				icon={head.icon}
				iconPosition="start"
				label={head.title}
				{...a11yProps(index)}
			/>
		);
	});

	const renderedContents = tabs.map((tab, i) => (
		<TabPanel key={i} index={i} value={value}>
			{tab}
		</TabPanel>
	));

	return (
		<Box sx={{ width: '100%' }}>
			<Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
				<Tabs value={value} onChange={handleChange}>
					{renderedHeads}
				</Tabs>
			</Box>
			{renderedContents}
		</Box>
	);
}
