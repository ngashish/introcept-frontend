import React from 'react';
import './DrawerToggleButton.css';

const drawerToggleButton = props =>(
    <button className="togglebtn" onClick={props.click}>
        <div className='togglebtnline' ></div>
        <div className='togglebtnline'></div>
        <div className='togglebtnline'></div>
    </button>
);

export default drawerToggleButton;