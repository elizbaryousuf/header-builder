import React, { Component } from 'react';

// eslint-disable-next-line
class Radio extends Component {
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
        <input type="radio" name={this.props.name} value={this.state.value} onChange={this.handleChange} />
      </div>
    );
  }
}

export default Radio;