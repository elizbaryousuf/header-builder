import React, { Component } from 'react';

// eslint-disable-next-line
class Text extends Component {
  state = {
    value: this.props.formData[this.props.name] || this.props.value
  }
  handleChange = (e) => {
    this.props.addAttr({
      [e.target.name]: e.target.value 
    });

    this.setState({
      value: e.target.value
    })
  }

  render() {
    const value = this.props.formData[this.props.name] === 'undefined' ? this.props.formData[this.props.name] : this.props.value;
    return (
      <div className="form-item">
        <label className="form-label">{this.props.label}</label>
        <input type="text" name={this.props.name} value={this.state.value} onChange={this.handleChange} />
      </div>
    );
  }
}

export default Text;