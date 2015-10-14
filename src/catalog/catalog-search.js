//dependencies
const React = require('react');
const ReactDOM = require('react-dom');
const {Component} = React;
const types = require('focus-core').component.types;
const {dispatcher} = require('focus-core');
/**
* Component describing a component.
*/
class ComponentSearch extends Component{
    constructor(props){
        super(props);
        this.componentWillMount = this.componentWillMount.bind(this);
        this.getStateFromStore = this.getStateFromStore.bind(this);
        this._handleOnChange = this._handleOnChange.bind(this);
        this._onStoreChange = this._onStoreChange.bind(this);
        console.log('COMPONENT SEARCH', props);
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
        this.setState(storeValue, ()=>{
            Backbone.history.navigate(`#query/${storeValue.criteria.query}`);
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
        return (
            <form action="#">
                <div className='mdl-textfield mdl-js-textfield mdl-textfield--expandable'>
                    <label className='mdl-button mdl-js-button mdl-button--icon' htmlFor='search-catalog'>
                        <i className='material-icons'>search</i>
                    </label>
                    <div className='mdl-textfield__expandable-holder'>
                        <input className='mdl-textfield__input' id='search-catalog' onChange={this._handleOnChange} ref='input' type='text' value={query} autoFocus={true}/>
                        <label className='mdl-textfield__label' htmlFor='search-expandable'>Expandable search</label>
                    </div>
                </div>
            </form>
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
