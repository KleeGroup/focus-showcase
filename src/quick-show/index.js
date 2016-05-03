//dependencies
import React , {Component} from 'react';
import history from 'focus-core/history';
import ReactDOM from 'react-dom';
import hjs from 'highlight.js';
import './style/style.scss';
import 'highlight.js/styles/atelier-cave.light.css';
import H_js from './highlight-js';
import types from 'focus-core/component/types';
import capitalize from 'lodash/string/capitalize';
const LivePreview = require('../live-component/live-preview');
const LiveEditor = require('../live-component/live-editor');
import getComponentFromName  from '../service/get-component-from-name';
const {debounce} = require('lodash/function');

/**
* Component describing a component.
*/
class QuickShow extends Component{
    constructor(props){
        super(props);
    }

    state = {
        codeText: this.props.code
    };

    componentDidMount(){
        hjs.registerLanguage('js', H_js);
        hjs.highlightBlock(ReactDOM.findDOMNode(this.refs.code));
    }
    /**
    * Code change handler.
    * @param  {string} codeText the new code text
    */
    _handleCodeChange (codeText) {
        this.setState({codeText: codeText});
    };

    /** @inheriteDoc */
    render() {
        const {name, capture, description, example, photo, keywords, version, code} = this.props;
        const {_handleCodeChange} = this;
        const {codeText} = this.state;
        const style = {
            name: {
                fontSize: '3em',
                marginLeft: '-5px',
                marginBottom: '0'
            },
            version: {
                fontSize: '1em',
                marginTop: '-18px',
                marginBottom: '0',
                color: 'grey'
            },
            keyword: {
                margin: '5px'
            },
            description: {
                fontSize: '1.2em',
                marginTop: '20px',
                marginBottom: '20px'
            },
            previewZone: {
                display: 'flex',
                width: '100%'
            },
            editor: {
                width: '50%',
                position: 'fixed',
                bottom: '0px',
                right: '0px',
                zIndex: '10000',
                minHeight: '0'
            },
            showcase: {
                height: '100%',
                //backgroundColor: 'blue'
            },
            preview: {
                flex: '1'
            }
        };
        const component = getComponentFromName(name);
        return (
            <div data-focus='component-detail'>
                <div className='mdl-shadow--2dp' data-focus='detail-header'>
                    <div data-focus='back'>
                        <button className='mdl-button mdl-js-button' onClick={()=>{history.navigate('', true)}}>
                            <i className="material-icons">navigate_before</i>
                            <i className="material-icons">view_comfy</i>
                        </button>
                    </div>
                    <div data-focus='title'>
                        <h2>{`${capitalize(name)} - v${version}`}</h2>
                    </div>
                    <button className='mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--accent' onClick={()=>{history.navigate(`component/${name}/detail`, true)}} data-focus='demo-button'>
                        <i className="material-icons">code</i>
                    </button>
                </div>

                <article>
                    <section className="section--center mdl-grid mdl-grid--no-spacing mdl-shadow--2dp">
                        <div className="mdl-card mdl-cell mdl-cell--12-col" data-focus='sample-code'>
                            <LivePreview component={component} code={codeText}/>
                        </div>
                    </section>
                </article>

                <aside>
                    <div style={{display: 'flex'}}>
                        <section className="section--center mdl-grid mdl-grid--no-spacing mdl-shadow--2dp" data-focus='capture'>
                            <img src={capture}/>
                        </section>
                        <section className="section--center mdl-grid mdl-grid--no-spacing mdl-shadow--2dp" data-focus='meta'>
                            <div data-focus='tags'>
                                {keywords.map((tag, idx) => <span key={idx} style={{margin: '10px'}}>{tag.toUpperCase()}</span>)}
                            </div>
                            <div data-focus='description'>{description}</div>
                        </section>
                    </div>
                    <div>
                        <section className="section--center mdl-grid mdl-grid--no-spacing mdl-shadow--2dp">
                            <div className="mdl-card mdl-cell mdl-cell--12-col" data-focus='sample-code'>
                                <h4>Sample code</h4>
                                <pre className='js' ref='code'>
                                    <code>{code}</code>
                                </pre>
                            </div>
                        </section>
                    </div>
                </aside>
            </div>
        );
    }
}

//Static props.
QuickShow.displayName = 'QuickShow';
QuickShow.propTypes = {
    description: types('string'),
    example: types('string'),
    url: types('string'),
    keywords: types('array'),
    photo: types('string'),
    name: types('string')
};

module.exports = QuickShow;
