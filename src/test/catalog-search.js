//dependencies
import React, {Component} from 'react';
import history from 'focus-core/history';
import ReactDOM from 'react-dom';
import types from 'focus-core/component/types';
import {dispatcher} from 'focus-core';
import mdlBehaviour from 'focus-components/behaviours/material';
const style = {
    input: {
        width: '150px'
    }
};

/**
* Component describing a component.
*/
@mdlBehaviour('search-input')
class ComponentSearch extends Component{
    constructor(props){
        super(props);
        this.componentWillMount = this.componentWillMount.bind(this);
        this.getStateFromStore = this.getStateFromStore.bind(this);
        this._handleOnChange = this._handleOnChange.bind(this);
        this._onStoreChange = this._onStoreChange.bind(this);
        this.state = {criteria: {query: props.query}};
        dispatcher.handleViewAction({
            data: {criteria: {query: props.query}},
            type: 'update',
            identifier: props.store.identifier
        });
    }
    getStateFromStore(){
        const {store} = this.props;
        return store.getValue();
    }
    _onStoreChange(){
        const storeValue = this.getStateFromStore();
        const {criteria: {query}} = storeValue;
        this.setState(storeValue, ()=>{
            if (!query || query === '') {
                history.navigate(``);
            } else {
                history.navigate(`#query/${query}`);
            }
        }, () => {
            if (this.refs['search-input']) {
                componentHandler.upgradeElement(this.refs['search-input']);
            }
        });
    }
    componentWillMount(){
        const {store} = this.props;
        store.addCriteriaChangeListener(this._onStoreChange);
    }
    componentWillUnMount(){
        const {store} = this.props;
        store.removeCriteriaChangeListener(this._onStoreChange);
    }
    _handleOnChange(){
        const {store} = this.props;
        const query = ReactDOM.findDOMNode(this.refs.input).value;
        //Dispatch the new criteria value..
        dispatcher.handleViewAction({
            data: {criteria: {query}},
            type: 'update',
            identifier: store.identifier
        });
    }
    /** @inheriteDoc */
    render(){
        const {criteria} = this.state;
        const {query} = criteria;
        const {input} = style;
        const searchComponentStyle = {
            display: 'flex',
            marginLeft: '20px'
        };
        const headerStyle = {
            height: '40px',
            display: 'flex',
            zIndex: '2',
            paddingTop: '13px'
        };
        return (
            <div className="mdl-textfield mdl-js-textfield mdl-textfield--expandable mdl-textfield--align-left" style={searchComponentStyle}>
                <i className='material-icons mdl-color-text--black'>search</i>
                <form onSubmit={e => {e.preventDefault();}}>
                    <div className="mdl-textfield mdl-js-textfield mdl-color-text--black" ref='search-input'>
                        <input className="mdl-textfield__input" type="text" id='search-catalog' onChange={this._handleOnChange} ref='input' value={query}/>
                        <label className="mdl-textfield__label" htmlFor='search-catalog'>Component search</label>
                    </div>
                </form>
            </div>
        );
    }
}

//Static props.
ComponentSearch.displayName = 'ComponentSearch';
ComponentSearch.defaultProps = {};
ComponentSearch.propTypes = {
    store: types('object').isRequired
};

module.exports = ComponentSearch;
