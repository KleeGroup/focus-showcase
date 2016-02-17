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

/**
* Component describing a component.
*/
class ComponentDetail extends Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        hjs.registerLanguage('js', H_js);
        hjs.highlightBlock(ReactDOM.findDOMNode(this.refs.code));
    }
    /** @inheriteDoc */
    render() {
        const {name, capture, description, example, photo, keywords, version, code} = this.props;
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
                </div>
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
                <section className="section--center mdl-grid mdl-grid--no-spacing mdl-shadow--2dp">
                    <div className="mdl-card mdl-cell mdl-cell--12-col" data-focus='sample-code'>
                        <h4>Sample code</h4>
                        <pre className='js' ref='code'>
                            <code>{code}</code>
                        </pre>
                    </div>
                </section>
                <div data-focus='demo-button'>
                    <button className='mdl-button mdl-js-button mdl-button--raised mdl-button--accent' onClick={()=>{history.navigate(`component/${name}/detail`, true)}}>
                        Live preview <i className="material-icons">code</i>
                </button>
            </div>
        </div>
    );
}
}

//Static props.
ComponentDetail.displayName = 'ComponentDetail';
ComponentDetail.defaultProps = {};
ComponentDetail.propTypes = {
    description: types('string'),
    example: types('string'),
    url: types('string'),
    keywords: types('array'),
    photo: types('string'),
    name: types('string')
};

module.exports = ComponentDetail;
