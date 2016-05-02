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
        const headerStyle = {
            height: '40px',
            display: 'flex',
            zIndex: '2',
            paddingTop: '13px'
        };
        return (
            <div data-focus='catalog'>
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
