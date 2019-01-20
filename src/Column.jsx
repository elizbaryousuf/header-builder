import React, { Component } from 'react';
import Element from './Element.jsx';
import { connect } from 'react-redux';
import { updateColumn } from './actions/elements';
import { elementID, setOpen } from './actions/panels';
import './styles/Columns.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faTimes } from '@fortawesome/free-solid-svg-icons';

class Column extends Component {
    state = {
        isDisabledRender: false
    };

    componentDidMount() {
        const $sortable = this.refs.sortable; 
        const className = $sortable.className;

        // eslint-disable-next-line no-undef
        this.$node = $($sortable);
        this.$node.sortable({
            items: '.App-component-element',
            connectWith: '.App-component-column > .column-elements',
            cursor: 'move',
            placeholder: 'sortable-placeholder',
            opacity: this.props.opacity,
            update: ( event, ui ) => this.onUpdate( event, ui )
        });

        this.currentSize = this.$node.outerWidth();
        this.nextCurrentSize = this.$node.next().outerWidth();

        /*
        this.$node.resizable({
            containment: ".App-component-row",
            handles: 'e',
            minHeight: 50,
            resize: ( event, ui ) => this.onResize( event, ui ),
            start: ( event, ui ) => this.onStart( event, ui ),
        });
        */

        
    }

    onStart = ( event, ui ) => {
      
    }

    onResize = ( event, ui ) => {

        var parent = ui.element.parent();
        var width = ui.element.innerWidth();
        var s = ( ui.element.next().innerWidth() - width );
        var nextSize = this.currentSize + this.nextCurrentSize - width;

        //currentSize + nextElementCurrentSize - newSize
        //console.log(ui.element.innerWidth(),ui.element.next().innerWidth())

        /*
        ui.element.css({
            width: (width/parent.width()*100 ).toFixed(3) +"%",
        });

        */

        ui.element.next().css({
          width: (nextSize/parent.width()*100 ).toFixed(3) +"%",
      });
    }

    shouldComponentUpdate() {
        if ( this.state.isDisabledRender ) {
            return false;
        }

        return true;
    }

    componentWillUnmount() {
        this.$node.sortable('destroy');
    }

    onUpdate = ( event, ui ) => {
        let elementsOrder = $( this.refs.sortable ).sortable( 'toArray', { attribute: 'data-id' } );

        const column = {
            ...this.props.column,
            elements: elementsOrder
        }

        // disabled render
        this.setState({
            isDisabledRender: true
        });
        
        // update column in store
        this.props.updateColumn( this.props.column.id, column );
    }

    addElement = () => {
      this.props.elementID(this.props.id);

      this.props.setOpen({ 
        isOpenPanel: true,
        isOpenList: true,
      });
    }

    handleMouseDown = (e) => {
        e.preventDefault(); 
        console.log('mouse-down')
        window.addEventListener('mousemove', this.resize, false);
    }

    resize = (e) => {
        e.preventDefault(); 
        console.log(e.clientX)
    }

    handleMouseUp = (e) => {
        e.preventDefault(); 
        console.log('mouse-up')
        window.removeEventListener('mousemove', this.resize, false);
    }

    render() {
        const elementsOrder = this.props.column.elements;
        const elements      = this.props.elements.elements;

        const elementList = elementsOrder.map( ( elementID ) => {
            let element = _.find( elements, { 'id': elementID } );
            return (
                <Element clickEl={ this.clickEl } key={ elementID } id={ elementID } element={ element } title={ element.title } openPanel={ this.props.openPanel } />
            );
        } );
        
        return (
            <div className="App-component-column" data-id={ this.props.id } ref="sortable">
                <div className="column-btns">
                    <span><FontAwesomeIcon icon={ faTimes } /></span>
                    <span><FontAwesomeIcon icon={ faCog } /></span>
                </div>
                <div className="column-elements">
                    { elementList }
                    <span className="add-elemenet" onClick={this.addElement}>Add Element</span>
                </div>
                <div className="column-resize" onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUp}></div>
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
    updateColumn,
    elementID,
    setOpen,
};

export default connect( mapStateToProps, mapDispatchToProps )( Column );