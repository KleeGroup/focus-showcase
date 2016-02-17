import router from 'focus-core/router';
import ReactDOM from 'react-dom';
import React from 'react';
import Catalog from './catalog';
import Layout from './layout';
import Sandbox from './live-component';
import componentsStore from './store/components';
import getComponentFromName  from './service/get-component-from-name';
import Detail from './component-detail';
import tags from './service/get-tags';
import {dispatcher} from 'focus-core';

const links = tags.map(tag => ({url: `#query/${tag}`, content: tag}));

const ShowCaseRouter = router.extend({
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
            document.querySelector(`.${__ANCHOR_CLASS__}`)
        );
    },
    component(name){
        console.log('component', name);
        const component = getComponentFromName(name);
        return ReactDOM.render(
            <Layout title={`component ${name}`} links={links} ><Detail {...component} /></Layout>,
            document.querySelector(`.${__ANCHOR_CLASS__}`)
        );
    },
    componentDetail(name){
            console.log('component detail', name);
            const component = getComponentFromName(name);
            return ReactDOM.render(
                <Sandbox component={component} />,
            document.querySelector(`.${__ANCHOR_CLASS__}`)
            );
    },
    query(query){
        dispatcher.handleViewAction({
            data: {criteria: {query}},
            type: 'update',
            identifier: componentsStore.identifier
        });
        return ReactDOM.render(
            <Layout title={`query ${query}`} links={links}><Catalog store={componentsStore} query={query}/></Layout>,
            document.querySelector(`.${__ANCHOR_CLASS__}`)
        );
    }
});
export default new ShowCaseRouter();
