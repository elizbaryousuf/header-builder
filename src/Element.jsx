import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateElement } from './actions/elements';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { fetchPanelElements } from './actions/panelElements';
import { editElement, elementID, setOpen } from './actions/panels';

class Element extends Component {
	handleClick = () => {
    const elementList = this.props.panelElements.elementList;
    const selfElement = this.props.element;
    const editElement =  _.find( elementList, { 'name': selfElement.name } );
    let attrs = [];
    let a = {};

    //console.log(this.props.element)

    if ( selfElement.attrs ) {
      attrs = editElement.attrs.map( attr => {
        const elements = attr.elements.map( element => {
          return {
              ...element,
              value: selfElement.attrs[element.name] || ''
          }
        })

        return {
          ...attr,
          elements: [
            ...elements,
          ]
        }
      });

      attrs = {
        attrs: attrs
      }
    }

    a = {
      ...editElement,
      ...attrs,
    };

    //console.log(a)

    this.props.editElement(a);

    this.props.elementID(this.props.id);

    this.props.setOpen({ 
      isOpenPanel: true,
      isOpenList: false,
      isOpenEdit: true,
    });
	}

  render() {
	    return (
	    	<div className="App-component-element" data-id={ this.props.id } onClick={ this.handleClick }>
	    		<h4 className="element-title">{ this.props.title }</h4>
				<span><FontAwesomeIcon icon={ faTimes } /></span>
	    	</div>
	    );
  }
}

const mapStateToProps = ({ panelElements }) => {
  return {
    panelElements
  }
};

const mapDispatchToProps = {
  fetchPanelElements,
  editElement,
  elementID,
  setOpen,
};

export default connect( mapStateToProps, mapDispatchToProps )( Element );