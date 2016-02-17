// Dependencies

import types from 'focus-core/component/types';
import React from 'react';

// Mixins

import i18nBehaviour from 'focus-components/common/i18n/mixin';

const Layout = React.createClass({
    displayName: 'ShowcaseLayout',
    mixins: [i18nBehaviour],

    /**
    * Properties validation.
    * @type {Object}
    */
    propTypes: {
        title: types('string').isRequired
    },

    /**
    * Render the layout HTML of focus components showcase.
    * @return {VirtualDOM} - The virtual DOM of the layout.
    */
    render() {
        const {links} = this.props;
        return (
            <div className='demo-layout mdl-layout mdl-layout--fixed-drawer mdl-layout--fixed-header' data-focus='template'>
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
                        <h3>Tags</h3>
                        {links.map((link, idx)=>{
                            return <a className='mdl-navigation__link' key={idx} href={link.url || '/'}><i className='fa fa-puzzle-piece' role='presentation'></i>{link.content}</a>
                        })}
                    </div>
                    <div className='brand-powered'><a href="http://www.kleegroup.com">Propulsé par</a></div>
                </nav>
              </div>
              <main className='mdl-layout__content' style={{zIndex: '100'}}>
                <div className='demo-content'>
                    {this.props.children}
                </div>
              </main>
            </div>
        );
    }
});

module.exports = Layout;
