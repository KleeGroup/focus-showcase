// Dependencies

const {reduce, sortByOrder, find} = require('lodash/collection');
import React from 'react';
import history from 'focus-core/history';
const {Component} = React;
import searchService from '../service/search';
import './style/style.scss';

//Components

import {component as ListPage} from 'focus-components/page/list';
const CatalogSearch = require('./catalog-search');
const CatalogList = require('./catalog-list');
import {component as Popin} from 'focus-components/application/popin';

/**
* Component describing a component.
*/
class ComponentCatalog extends Component{
    constructor(props){
        super(props);
    }

    _showLiveComponent(component = {}) {
        history.navigate(`component/${component.name}`, true);
    }

    /** @inheriteDoc */
    render(){
        const {store, query} = this.props;
        const props = {...this.props, showLiveComponent: this._showLiveComponent.bind(this)};
        const searchIconStyle = {
            marginRight: '5px',
            paddingTop: '4px'
        };
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
            <div className='demo-layout-waterfall mdl-layout mdl-js-layout'>
                <header className='mdl-layout__header mdl-layout__header--waterfall mdl-color--white mdl-shadow--3dp' style={headerStyle}>
                    <div className="mdl-textfield mdl-js-textfield mdl-textfield--expandable mdl-textfield--align-left" style={searchComponentStyle}>
                        <i className='material-icons mdl-color-text--black'>search</i>
                        <form>
                            <div className="mdl-textfield mdl-js-textfield" ref='search-input'>
                                <input className="mdl-textfield__input" type="text" id='search-catalog' ref='input' value={query}/>
                                <label className="mdl-textfield__label" htmlFor='search-catalog'>Component search</label>
                            </div>
                        </form>
                    </div>
                </header>

                <div data-focus='catalog'>
                    <ListPage {...props}/>
                </div>
            </div>
        );
    }
}

// Static props

ComponentCatalog.displayName = 'ComponentCatalog';
ComponentCatalog.defaultProps = {
    query: '',
    service: searchService,
    ListComponent: CatalogList
};

module.exports = ComponentCatalog;
