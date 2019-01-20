import React, { Component } from 'react';
import Header from './components/Header.jsx';
import Components from './Components.jsx';
import AddElementButton from './AddElementButton.jsx';
import ElementsPanel from './ElementsPanel.jsx';
import './App.css';

import { fetchElements, saveElements, updateElement } from './actions/elements';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rowDevice: 'desktop',
        };
    }

    static propTypes =  {
        elements: PropTypes.object.isRequired
    };

    componentDidMount() {
        this.props.fetchElements();
    }

    togglePanel = (par) => {
        this.setState({
            isOpenPanel: par
        });
    }

    saveElements = () => {
        const elements = {
            rows: this.props.elements.rows,
            columns: this.props.elements.columns,
            elements: this.props.elements.elements,
        }
        this.props.saveElements( elements );
    }

    changeRowDevice = ( device ) => {
        this.setState({
            rowDevice: device
        });
    }

    render() {

        return (
          <div className="App">
            <Header changeRowDevice={this.changeRowDevice} saveElements={this.saveElements} />

            <div className="App-content">
                <Components rowDevice={this.state.rowDevice} isOpenPanel={this.isOpenPanel} />

                <AddElementButton togglePanel={ this.togglePanel } />
            </div>

            <ElementsPanel rowDevice={this.state.rowDevice} />
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
    fetchElements,
    saveElements,
    updateElement,
};

export default connect(mapStateToProps,mapDispatchToProps)(App);
