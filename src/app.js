import React from 'react';
import FocusComponents from 'focus-components';
import FocusCore  from 'focus-core';
import jQuery from 'jquery';
import moment from 'moment/min/moment-with-locales.min';
import './style';
import resStore from './resources';
import './service/create-index';
import history from 'focus-core/history';
import {init} from 'focus-core/translation';
import user from 'focus-core/user';
import "babel-polyfill";

jQuery.getScript('https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.4.4/babel.min.js', () => {

});

// Neeeded for the live examples
window.React = React;
window.FocusComponents = FocusComponents;
window.Focus = FocusCore;
window.FocusCore = FocusCore;
window.moment = moment;

document.addEventListener('DOMContentLoaded', ()=> {
    jQuery(document).on('click', 'a:not([data-bypass])', function touchHandler(evt) {
        const href = { prop: jQuery(this).prop('href'), attr: jQuery(this).attr('href') };
        const root = location.protocol + '//' + location.host + '/';
        if (href.prop && href.prop.slice(0, root.length) === root) {
            evt.preventDefault();
            history.navigate(href.attr, true);
        }
    });

    //Init index
    init({resStore, lng: 'dev'}, () => {
        history.start();
    });
});

// Init the user
user.setRoles(['DEFAULT_ROLE']);

//Import the router
import './router';
