import React, { Component } from 'react';
import { Dropdown, Text, Checkbox, Radio } from './components/PanelComponents.jsx'

import { updateElementAttrs } from './actions/elements';
import { connect } from 'react-redux';

// eslint-disable-next-line
class EditElement extends Component {
  state = {
    formData: {},
    tabControlIsActive: 'general'
  }

  getFormComponent = (component) => {
    switch (component.element) {
      case 'dropdown':
        return <Dropdown key={component.name} addAttr={this.addAttr} label={component.label} name={component.name} value={component.value} options={component.options} />;

      case 'text':
        return <Text key={component.name} addAttr={this.addAttr} label={component.label} name={component.name} value={component.value} formData={this.state.formData} />;
      
      case 'checkbox':
        return <Checkbox key={component.name} addAttr={this.addAttr} label={component.label} name={component.name} value={component.value} />;
      
      case 'radio':
        return <Radio key={component.name} addAttr={this.addAttr} label={component.label} name={component.name} value={component.value} />;

      default:
        return '';
    }
  }

  addAttr = (attr) => {
    this.setState({
      formData: {
        ...this.state.formData,
        ...attr
      }
    });
  }

  closePanel = () => {
    // close panels
    this.props.closePanel();
  }

  saveChanges = () => {
    const elementID = this.props.elementID;

    this.props.updateElementAttrs(
      elementID,
      this.state.formData
    );
    
    // close panels
    this.props.closePanel();
  }

  setActiveItem = (e) => {
    e.preventDefault();
    const id = e.target.id;

    this.setState({
      tabControlIsActive: id
    });
  }

  render() {
    const element = this.props.element || {};

    return (
      <div className="App-elements-panel-element-edit-element">
        <div className="elements-panel-header">
          <h3>{ element.title } <span>Settings</span></h3>
          <ul className="tab-controls">
          { element.attrs ? element.attrs.map( ( attr ) => {
            return <li><a href="#" id={attr.name} className={ this.state.tabControlIsActive === attr.name ? 'is-active' : '' } onClick={this.setActiveItem}>{attr.title}</a></li>
          } ) : ''}
          </ul>
        </div>
        <div className="elements-form">
          <form>
            { element.attrs ? element.attrs.map( attr => 
              (attr.name === this.state.tabControlIsActive ? (
                attr.elements.map( element => this.getFormComponent(element) )
              ) : ('') )
            ) : ''}
          </form>
        </div>
        <div className="elements-panel-footer">
          <button className="close-panels panel-btn" onClick={this.closePanel}>Close</button>
          <button className="save-attrs panel-btn" onClick={this.saveChanges}>Save Changes</button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  updateElementAttrs,
};

export default connect( null, mapDispatchToProps )( EditElement );
