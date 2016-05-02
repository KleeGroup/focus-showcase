import React from 'react';
import Layout from 'focus-components/components/layout';
import 'focus-components/style';
import {cartridgeBehaviour} from 'focus-components/page/mixin';
import CatalogSearch from './catalog-search';
import componentsStore from '../store/components';

const CartridgeContent = React.createClass({
    render() {
        return (
            <div>
                <CatalogSearch store={componentsStore} query=''/>
            </div>
        );
    }
});

const Summary = React.createClass({
    render() {
        return (
            <div>
                <CatalogSearch store={componentsStore} query=''/>
            </div>
        );
    }
});

const BarContentRight = React.createClass({
    render() {
        return (<div>BAR RIGHT</div>);
    }
});
const BarContentLeft = React.createClass({
    style : {
        color: 'indigo'
    },
    render() {
        return (<div style={this.style}><b>SHOWCASE</b></div>);
    }
});

const Test = React.createClass({
    mixins: [cartridgeBehaviour],
    cartridgeConfiguration() {
        return {
            summary: {
                component: Summary
            },
            barLeft: {
                component: BarContentLeft
            },
            cartridge: {
                component: CartridgeContent
            },
            actions: {
                primary: [
                    {
                        label: 'ShowCode', icon: 'code', action: () => {prompt('Send me a mail')}
                    }
                ]
            }
        };
    },
    render() {
        const {links} = this.props;
        return(
            <Layout>
                {this.props.children}
            </Layout>
        );
    }
});

module.exports = Test;
