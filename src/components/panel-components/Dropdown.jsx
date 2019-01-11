import React, { Component } from 'react';

// eslint-disable-next-line
class Dropdown extends Component {
  state = {
    value: this.props.value
  }

  handleChange = (e) => {
    this.setState({value: e.target.value});
    this.props.addAttr({
      [e.target.name]: e.target.value 
    });
  }

  render() {
    return (
      <div className="form-item">
        <label className="form-label">{this.props.label}</label>
        <select name={this.props.name} value={this.state.value} onChange={this.handleChange}>
          {this.props.options.map( option => <option value={option.value}>{option.title}</option>)}
        </select>
      </div>
    );
  }
}

export default Dropdown;
