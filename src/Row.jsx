import React, { Component } from 'react';
import Column from './Column.jsx';
import { connect } from 'react-redux';
import { updateRow, deleteRow } from './actions/elements';
import './styles/Rows.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faTimes } from '@fortawesome/free-solid-svg-icons';

class Row extends Component {
    state = {
        isDisabledRender: false,
        width: '33%',
    };

    componentDidMount() {
        const $sortable = this.refs.sortable; 
        const className = $sortable.className;

        this.$node = $( $sortable );
        /*
        this.$node.sortable({
            items: '.App-component-column',
            cursor: 'move',
            placeholder: 'column-sortable-placeholder',
            opacity: this.props.opacity,
            update: ( event, ui ) => this.onUpdate( event, ui )
        });

        */
    }

    shouldComponentUpdate() {
        if ( this.state.isDisabledRender ) {
            return false;
        }

        return true;
    }

    onUpdate( event, ui ) {
        let columnsOrder = $( this.refs.sortable ).sortable( 'toArray', { attribute: 'data-id' } );

        const row = {
            ...this.props.row,
            columns: columnsOrder
        }

        // disabled render
        this.setState({
            isDisabledRender: true
        });
        
        // update row in store
        this.props.updateRow( this.props.row.id, row );
    }

    componentWillUnmount() {
        //this.$node.sortable('destroy');
    }

    handleClick = () => {
        const row = this.props.row;
        // delete row in store
        this.props.deleteRow( this.props.row.id, row );
    }

    render() {
        const columnsOrder = this.props.row.columns;
        const columns      = this.props.elements.columns;

        const columnList = columnsOrder.map( ( columnID ) => {
            let column = _.find( columns, { 'id': columnID } );
            return ( <Column key={ columnID } id={ column.id } column={ column } openPanel={ this.props.openPanel } /> );
        } );
        
        return (
            <div className="App-component-row" data-id={ this.props.id } ref="sortable">
                <div className="row-btns">
                    <span onClick={ this.handleClick }><FontAwesomeIcon icon={ faTimes } /></span>
                    <span><FontAwesomeIcon icon={ faCog } /></span>
                </div>
                <div className="row-columns">
                    { columnList }
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ elements }) => {
    return {
        elements
    }
};

const mapDispatchToProps = {
    updateRow,
    deleteRow,
};

export default connect(mapStateToProps,mapDispatchToProps)(Row);