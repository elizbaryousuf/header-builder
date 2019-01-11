import React, { Component } from 'react';
import { elementID, setOpen} from './actions/panels';
import { connect } from 'react-redux';

class AddElementButton extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.elementID();
    this.props.setOpen({ 
      isOpenPanel: true,
      isOpenList: true,
    });
  }

  render() {
    return (
      <div className="App-add-component" onClick={this.handleClick}>
        <span>Add Element</span>
      </div>
    );
  }
}

const mapDispatchToProps = {
  elementID,
  setOpen,
};

export default connect( null, mapDispatchToProps )( AddElementButton );