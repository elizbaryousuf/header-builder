import React, { Component } from 'react';
import { connect } from 'react-redux';
import { insertElements, insertElement } from './actions/elements';
import { elementID } from './actions/panels';
import guid from './helpers/general';

class ListElements extends Component {

   handleClick = ( element, e ) => {
       let defaultAttrs = {};
       
       // set default attrs
       element.attrs.map( attr => {
        let attrs = {};
        
        attr.elements.map( element => {
          attrs = {
            ...attrs,
            [element.name]: element.value
          }
        });

        defaultAttrs = {
          ...defaultAttrs,
          ...attrs,
        }
      });

      const newElement = { 'id': guid(), 'name': element.name, 'title': element.title, 'attrs': defaultAttrs }
      const newColumn = { 'id': guid(), 'elements': [ newElement.id ] }
      const newRow = { 'id': guid(), 'device': this.props.rowDevice, 'columns': [ newColumn.id ] }

      if ( ! this.props.columnID ) {
        this.props.insertElements({
          'rows': newRow,
          'columns': newColumn,
          'elements': newElement
        });
      } else {
        this.props.insertElement(this.props.columnID,newElement);
      }

      this.props.elementID(newElement.id);
      this.props.openEdit(element);
   }

   render() {
    return (
  	    	<div className="App-elements-panel-elements">
                <div className="elements-panel-header"><h3>Add Element</h3></div>
                <div className="elements-panel-list-elements">
                    { this.props.elements.map( ( element, index ) =>
                        <div key={index} className="App-elements-panel-element" data-name={element.name} onClick={this.handleClick.bind( this, element )}>
                            <img src={element.icon} height="20" />
                            <span className="element-title">{element.title}</span>
                            <span className="element-description">{element.description}</span>
                        </div>
                    ) }
                </div>
  	        </div>
  	   );
    }
}

const mapDispatchToProps = {
    insertElements,
    insertElement,
    elementID,
};

export default connect( null, mapDispatchToProps )( ListElements );