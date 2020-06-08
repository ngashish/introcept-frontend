import React from 'react';
import './Toolbar.css';
import DrawerToggleButton from '../SideDrawer/DrawerToggleButton';

class Toolbar extends React.Component {
    render() {
        return (
            <header className="toolbar">
                <nav className='toolbar_nav'>
                    <div>
                        <DrawerToggleButton click={this.props.drawerClickHandler}></DrawerToggleButton>
                    </div>
                    <div className="toolbar_logo">
                        <a href='/'>  </a>
                    </div>
                </nav>
            </header>
        );
    }
}

export default Toolbar;
