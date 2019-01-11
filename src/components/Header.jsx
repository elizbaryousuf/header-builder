import React, { Component } from 'react';
import './../styles/Header.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

class Header extends Component {
    state = {
        deviceMenuIsActive: 'desktop'
    }

	handleClick = ( e ) => {
        e.preventDefault();
        this.props.saveElements();
    }

    setActiveItem = ( e ) => {
        e.preventDefault();
        const id = e.target.id;

        this.setState({
            deviceMenuIsActive: id
        });

        // chnage row device
        this.props.changeRowDevice( id );
    }

  	render() {
	    return (
	    	<header className="App-header">
	    		<div className="header-left">
                	<h2 className="App-logo">Header Builder <span className="header-layout-title" contentEditable={ true }>main-header <FontAwesomeIcon icon={ faPen } /></span></h2>

                    <div className="header-device-list">
                        <ul className="header-device-menu">
                            <li>
                                <a href="#" className={ this.state.deviceMenuIsActive === 'desktop' ? 'is-active' : '' } id="desktop" onClick={ this.setActiveItem }>Desktop</a>
                            </li>
                            <li>
                                <a href="#" className={ this.state.deviceMenuIsActive === 'tablet' ? 'is-active' : '' } id="tablet" onClick={ this.setActiveItem }>Tablet</a>
                            </li>
                            <li>
                                <a href="#" className={ this.state.deviceMenuIsActive === 'mobile' ? 'is-active' : '' } id="mobile" onClick={ this.setActiveItem }>Mobile</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="header-right">
                	<a href="#" className="preview-site btn">Preview</a>
                	<a href="#" className="save-elements btn" onClick={ this.handleClick }>Save</a>
                </div>
            </header>
	    );
  	}
}

export default Header;