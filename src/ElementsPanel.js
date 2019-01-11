import React, { Component } from 'react';
import ListElements from './ListElements.jsx';
import EditElement from './EditElement.jsx';
import './styles/Panel.scss';
import { connect } from 'react-redux';
import { fetchPanelElements } from './actions/panelElements';
import { editElement, setOpen } from './actions/panels';
import PropTypes from 'prop-types';

class ElementsPanel extends Component {
	constructor(props) {
    super(props);
	}

	static propTypes =  {
		panelElements: PropTypes.object.isRequired,
		panels: PropTypes.object.isRequired,
	}
	
	componentDidMount() {
  	this.props.fetchPanelElements();
	}

	closePanel = () => {
		this.props.setOpen({ 
				isOpenPanel: false,
				isOpenList: false,
				isOpenEdit: false,
		});
	}
	
	handleClick = (e) => {
		if ( e.target.className == 'App-elements-panel' ) {
			// close panels
			this.closePanel();
		}
	}

	openEdit = (element) => {
		this.props.editElement(element);

		this.props.setOpen({ 
			isOpenList: false, 
			isOpenEdit: true,
		});
	}

  render() {
		const panels = this.props.panels.panels;
	  return ( panels.isOpenPanel ? (
	        <div className="App-elements-panel" onClick={this.handleClick}>
	        	{ panels.isOpenList ? ( <ListElements rowDevice={this.props.rowDevice} columnID={this.props.panels.elementID} elements={this.props.panelElements.elementList} openEdit={this.openEdit} /> ) : '' }
	        	{ panels.isOpenEdit ? ( <EditElement element={this.props.panels.editElement} elementID={this.props.panels.elementID} closePanel={this.closePanel} /> ) : '' }
	        </div>
			 ) : ( '' )
	    );
  	}
}

const mapStateToProps = ({ panelElements, panels }) => {
    return {
			panelElements,
			panels
    }
};

const mapDispatchToProps = {
	fetchPanelElements,
	editElement,
	setOpen,
};

export default connect( mapStateToProps, mapDispatchToProps )( ElementsPanel );
