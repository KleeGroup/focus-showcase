//dependencies
import React , {Component} from 'react';
import history from 'focus-core/history';
import ReactDOM from 'react-dom';
import hjs from 'highlight.js';
import './style/style.scss';
import './style/example.css';
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

    isChecked() {
        if(!document.getElementById('nav-trigger').checked) {
            document.getElementById('nav-trigger').checked = true;
        }
        else {
            document.getElementById('nav-trigger').checked = false;
        }
    }

    toggleOpen() {
        if(document.getElementById("mySidenav").style.width !== "250px" && document.getElementById("main").style.marginRight !== "250px") {
            document.getElementById("mySidenav").style.width = "250px";
            document.getElementById("main").style.marginRight = "250px";
        }
        else {
            document.getElementById("mySidenav").style.width = "0";
            document.getElementById("main").style.marginRight = "0";
        }
    }

    openNav() {
        document.getElementById("mySidenav").style.width = "250px";
        document.getElementById("main").style.marginRight = "250px";
    }

    closeNav() {
        document.getElementById("mySidenav").style.width = "0";
        document.getElementById("main").style.marginRight = "0";
    }

    /** @inheriteDoc */
    render() {
        const {name, capture, description, example, photo, keywords, version, code} = this.props;
        return (
            <div>
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
                        <button className='mdl-button mdl-js-button mdl-button--fab mdl-button--accent mdl-js-ripple-effect' onClick={() => { this.toggleOpen() } } data-focus='demo-button'>
                            <i className="material-icons">code</i>
                        </button>
                    </div>

                    <div style={{display: 'none'}}>
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
                    </div>
                </div>

                <div id="mySidenav" className="sidenav">
                    <a href="#">About</a>
                    <a href="#">Services</a>
                    <a href="#">Clients</a>
                    <a href="#">Contact</a>
                </div>

                <div id="main">
                    <h2>Sidenav Push Example</h2>
                    <p>Click on the element below to open the side navigation menu, and push this content to the right.</p>
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
