/* globals babel */

// Dependencies
const React = require('react');
const {types} = require('focus-core').component;
import babel from 'babel-core/browser';

const LivePreview = React.createClass({
    displayName: 'LivePreview',
    propTypes: {
        code: types('string'),
        style: types('object')
    },
    style: {
        livePreview: {
            height: '100%',
        }
    },
    /**
    * Render the component.
    * @return {HTML} the rendered component
    */
    render() {
        const {code, style: mainStyle} = this.props;
        const {style} = this;
        let content;
        try {
            /* eslint-disable */
            content = eval(babel.transform(`
                (function(module){
                    ${code}
                    return <module.exports/>;
                })({});
                `, {stage: 0}).code);
                /* eslint-enable */
            } catch (e) {
                content = e.toString();
            }

            return <div data-focus="showcase-live-preview" style={style.livePreview}>{content}</div>;
            }
        });

        module.exports = LivePreview;
