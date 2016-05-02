import React from 'react';
import Layout from 'focus-components/components/layout';
import 'focus-components/style';
import {cartridgeBehaviour} from 'focus-components/page/mixin';
const CatalogSearch = require('./catalog-search');

const CartridgeContent = React.createClass({
    style : {
        marginLeft: '80px',
        fontSize: '35',
        color: 'indigo'
    },
    render() {
        return (
            <div className="mdl-textfield mdl-js-textfield mdl-textfield--expandable
                mdl-textfield--floating-label mdl-textfield--align-right">
                <label className="mdl-button mdl-js-button mdl-button--icon"
                    htmlFor="one">
                    <i className="material-icons">search</i>
                </label>
                <div className="mdl-textfield__expandable-holder">
                    <input className="mdl-textfield__input" type="text" name="sample"
                        id="one"/>
                </div>
            </div>
        );
    }
});

const Summary = React.createClass({
    render() {
        return (
            <div className="mdl-textfield mdl-js-textfield mdl-textfield--expandable
                mdl-textfield--floating-label mdl-textfield--align-right">
                <label className="mdl-button mdl-js-button mdl-button--icon"
                    htmlFor="waterfall-exp">
                    <i className="material-icons">search</i>
                </label>
                <div className="mdl-textfield__expandable-holder">
                    <input className="mdl-textfield__input" type="text" name="sample"
                        id="waterfall-exp"/>
                </div>
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
    render() {
        return (<div>SHOWCASE</div>);
    }
});

const Test = React.createClass({
    mixins: [cartridgeBehaviour],
    cartridgeConfiguration() {
        return {
            summary: {
                component: this.props.searchCartridgeSummary
            },
            barLeft: {
                component: BarContentLeft
            },
            cartridge: {
                component: this.props.searchCartridgeContent
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
            <div>
                <div className='demo-drawer mdl-layout__drawer'>
                    <header className='demo-drawer-header'>
                        <a href="/">
                            <h1>
                                <strong>FOCUS</strong>
                                <span>components</span>
                            </h1>
                            <h2>Showcase</h2>
                        </a>
                        <div className="links">
                            <a alt="focus-docs" href="http://kleegroup.github.io/focus-docs/" target="_blank" title="Documentation focus-components"><i className="fa fa-book" role='presentation'></i></a>
                            <a alt="focus-components sur Github" href="https://github.com/KleeGroup/focus-components" target="_blank" title="focus-components sur Github"><i className="fa fa-github" role="presentation"></i></a>
                        </div>
                    </header>
                    <nav className='demo-navigation mdl-navigation'>
                        <div className='tags-list'>
                            <h3>Components</h3>
                            {links.map((link, idx) => {
                                return <a className='mdl-navigation__link' key={idx} href={link.url || '/'}><i className='fa fa-puzzle-piece' role='presentation'></i>{link.content}</a>
                            })}
                        </div>
                        <div className='brand-powered'><a href="http://www.kleegroup.com">Propulsé par</a></div>
                    </nav>
                </div>
                <Layout>
                    {this.props.children}
                </Layout>
            </div>
        );
    }
});

module.exports = Test;
