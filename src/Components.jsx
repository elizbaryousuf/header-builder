import React, { Component } from 'react';
import { connect } from 'react-redux';
import Row from './Row';

class Components extends Component {
  componentDidMount() {
    const $sortable = this.refs.sortable;

    // eslint-disable-next-line no-undef
    this.$node = $($sortable);
    this.$node.sortable({
      opacity: this.props.opacity,
      axis: 'y',
      update: () => this.onUpdate(),
    });
  }

  componentWillUnmount() {
    this.$node.sortable('destroy');
  }

  onUpdate() {
    let components = this.props.elements.rows;
    // eslint-disable-next-line no-undef
    const rowsOrder = $(this.refs.sortable).sortable('toArray', { attribute: 'data-id' }); 

    components = rowsOrder.map((id) => {
      return _.find(components, { id });
    });

    this.props.elements.rows = components;
  }

  render() {
    const rows = this.props.elements.rows || [];
    const rowList = rows.length ? (
      rows.map(row => (row.device === this.props.rowDevice ? (
        <Row key={row.id} id={row.id} row={row} openPanel={this.props.openPanel} />
      ) : ('')))
    ) : (
      <p>Not found Component</p>
    );

    return (
      <div className="App-components" ref="sortable">
        <div className="header-mode-list">
          <span>Normal Header</span>
          <span>Sticky Header</span>
        </div>
        {rowList}
      </div>
    );
  }
}

const mapStateToProps = ({ elements }) => ({
  elements,
});

export default connect(mapStateToProps)(Components);
