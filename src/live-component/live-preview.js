/* globals babel */

// Dependencies
import {PropTypes, Component} from 'react';
import babel from 'babel-core/browser';
import capitalize from 'lodash/string/capitalize';
import './style/style.scss';

const propTypes = {
    code: PropTypes.string,
    fullscreen: PropTypes.bool,
    title: PropTypes.string,
    version: PropTypes.string
}

class LivePreview extends Component {
    _renderFullScreen(content) {
        return (
            <div data-focus='showcase-live-preview' data-screen='full'>
                {content}
            </div>
        );
    }

    _renderTiled = (content) => {
        const {name, version} = this.props;
        return (
            <div data-focus='showcase-live-preview' data-screen='tiled'>
                <div className='mdl-shadow--2dp' data-focus='header'>
                    <div data-focus='back'>
                        <button className='mdl-button mdl-js-button' onClick={()=>{Backbone.history.navigate(`component/${name}`, true);}}>
                            <i className="material-icons">navigate_before</i>
                            <i className="material-icons">extension</i>
                        </button>
                    </div>
                    <div data-focus='title'>
                        <h2>{`${capitalize(name)} - v${version}`}</h2>
                    </div>
                </div>

                <div data-focus='background'>
                    <div className='mdl-shadow--2dp' data-focus='component'>
                        {content}
                    </div>
                </div>
            </div>
        );
    }

    render() {
        const {code, fullscreen} = this.props;
        let content;
        try {
            /* eslint-disable */
            content = eval(babel.transform(`
                (function(module){
                    ${code}
                    return <module.exports/>;
                })({});
                `, {stage: 0}
            ).code);
            /* eslint-enable */
        } catch (e) {
            content = e.toString();
        }
        return fullscreen ? this._renderFullScreen(content) : this._renderTiled(content);
    }
}

LivePreview.propTypes = propTypes;

export default LivePreview;
