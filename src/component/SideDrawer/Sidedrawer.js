import React from 'react';
import './Sidedrawer.css';
import { ListGroup } from 'react-bootstrap';

const sideDrawer = props => {
    let drawerClasses = ['side-drawer'];
    if (props.show) {
        drawerClasses = ['side-drawer', 'open'];
    }
    return (<nav className={drawerClasses.join(' ')} >        
        <ListGroup variant="flush">
            <ListGroup.Item style={{ fontWeight: 'bold' }}>User.org</ListGroup.Item>
            <ListGroup.Item>User</ListGroup.Item>
            <ListGroup.Item>About</ListGroup.Item>
        </ListGroup>
    </nav>)
};

export default sideDrawer;