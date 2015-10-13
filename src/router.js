import jQuery from 'jquery';
import _ from 'lodash';
import Backbone from 'backbone';
import React from 'react';
import ReactDOM from 'react-dom';
import Catalog from './catalog';
import Layout from './layout';
import Sandbox from './live-component';
import componentsStore from './store/components';
import getComponentFromName  from './service/get-component-from-name';
import Detail from './component-detail';
import tags from './service/get-tags';
const links = tags.map(tag => ({url: `#query/${tag}`, content: tag}));
const ShowCaseRouter =  Backbone.Router.extend({
    routes: {
        '': 'showcase',
        'component/:name': 'component',
        'component/:name/detail': 'componentDetail',
        'query': 'showcase',
        'query/:query': 'query',
        '*notFound': 'showcase'
    },
    showcase(){
        console.log('showcase');
        // render the showcase into the document
        return ReactDOM.render(
            <Layout title='Component catalog' links={links}><Catalog store={componentsStore} query=''/></Layout>,
            document.querySelector('#showcase')
        );
    },
    component(name){
        console.log('component', name);
        const component = getComponentFromName(name);
        return ReactDOM.render(
            <Layout title={`component ${name}`} links={links} ><Detail {...component} /></Layout>,
            document.querySelector('#showcase')
        );
    },
    componentDetail(name){
            console.log('component detail', name);
            const component = getComponentFromName(name);
            return ReactDOM.render(
                <Sandbox component={component} />,
                document.querySelector('#showcase')
            );
    },
    query(query){
        console.log('query route', query);
        return ReactDOM.render(
            <Layout title={`query ${query}`} links={links}><Catalog store={componentsStore} query={query}/></Layout>,
            document.querySelector('#showcase')
        );
    }
});
export default new ShowCaseRouter();
