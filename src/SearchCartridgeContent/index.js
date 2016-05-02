import React from 'react';
import CatalogSearch from '../catalog/catalog-search';
import componentsStore from '../store/components';

const SearchCartridgeContent = React.createClass({
    render() {
        return (
            <div>
                <CatalogSearch store={componentsStore} query=''/>
            </div>
        );
    }
});

module.exports = SearchCartridgeContent;
