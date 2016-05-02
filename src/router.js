import router from 'focus-core/router';
import ReactDOM from 'react-dom';
import React from 'react';
import Catalog from './catalog';
import Layout from './layout';
import NewLayout from './new-layout';
import Test from './test';
import SearchCartridgeContent from './SearchCartridgeContent';
import SearchCartridgeSummary from './SearchCartridgeSummary';
import Sandbox from './live-component';
import componentsStore from './store/components';
import getComponentFromName  from './service/get-component-from-name';
import Detail from './component-detail';
// import tags from './service/get-tags';
import catalog from './components-catalog';
import {dispatcher} from 'focus-core';

const links = catalog.map((component, idx) => ({url: `#query/${component.name}`, content: component.name}));

const ShowCaseRouter = router.extend({
    routes: {
        '': 'showcase',
        'test': 'GoToText',
        'new-layout': 'GoToLayout',
        'component/:name': 'component',
        'component/:name/detail': 'componentDetail',
        'query': 'showcase',
        'query/:query': 'query',
        '*notFound': 'showcase'
    },
    GoToText() {
        console.log('test page');
        // render the showcase into the document
        return ReactDOM.render(
            <Test searchCartridgeContent={SearchCartridgeContent} searchCartridgeSummary={SearchCartridgeSummary} links={links}><Catalog store={componentsStore} query=''/></Test>,
            document.querySelector(`.${__ANCHOR_CLASS__}`)
        );
    },
    GoToLayout() {
        console.log('NewLayout');
        // render the showcase into the document
        return ReactDOM.render(
            <NewLayout title='Component catalog' links={links}><Test/></NewLayout>,
            document.querySelector(`.${__ANCHOR_CLASS__}`)
        );
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
