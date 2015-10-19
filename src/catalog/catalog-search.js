//dependencies
const React = require('react');
const ReactDOM = require('react-dom');
const {Component} = React;
const types = require('focus-core').component.types;
const {dispatcher} = require('focus-core');
const mdlBehaviour = require('focus-components').behaviours.material;
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
                Backbone.history.navigate(``);
            } else {
                Backbone.history.navigate(`#query/${query}`);
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
        return (
            <div data-focus='component-search'>
                <i className='material-icons'>search</i>
                <form onSubmit={e => {e.preventDefault();}}>
                    <div className="mdl-textfield mdl-js-textfield" ref='search-input'>
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
