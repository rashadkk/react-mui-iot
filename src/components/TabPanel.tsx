import { Box } from '@mui/system';
import React from 'react'

const TabPanel = (props: any) => {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
            <>{children}</>
        )}
      </div>
    );
}

export default TabPanel;

