import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
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

function CustomTab({ tabs }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab
            icon={<InfoRoundedIcon />}
            iconPosition="start"
            label="Info"
            {...a11yProps(0)}
          />
          <Tab
            icon={<SchoolRoundedIcon />}
            iconPosition="start"
            label="Courses"
            {...a11yProps(1)}
          />
          <Tab
            icon={<FolderRoundedIcon />}
            iconPosition="start"
            label="Files"
            {...a11yProps(2)}
          />
        </Tabs>
      </Box>
      {tabs.map((tab, i) => (
        <TabPanel
          value={value}
          index={i}
          key={i * parseInt(Math.random() * 10000)}
        >
          {tab}
        </TabPanel>
      ))}
    </Box>
  );
}

export default CustomTab;
