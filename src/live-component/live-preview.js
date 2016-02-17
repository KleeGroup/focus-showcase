/* globals babel */

// Dependencies
import {PropTypes, Component} from 'react';
import history from 'focus-core/history';
import capitalize from 'lodash/string/capitalize';
import './style/style.scss';

const propTypes = {
    code: PropTypes.string,
    fullscreen: PropTypes.bool,
    title: PropTypes.string,
    version: PropTypes.string
}

class LivePreview extends Component {
    componentWillMount() {
        
    }

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
                        <button className='mdl-button mdl-js-button' onClick={()=>{history.navigate(`component/${name}`, true);}}>
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
            content = eval(Babel.transform(`
                (function(module){
                    ${code}
                    return <module.exports/>;
                })({});
                `, {
                    presets: [
                        "stage-0",
                        "react",
                        "es2015"
                    ],
                    plugins: [
                        "transform-class-properties"
                    ]
                }
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
