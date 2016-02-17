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
        return (
            <div data-focus='catalog'>
                <div className='mdl-shadow--2dp' data-focus='detail-header'>
                    <CatalogSearch store={store} query={query}/>
                </div>
                <ListPage {...props}/>
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
