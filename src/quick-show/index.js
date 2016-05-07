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
class QuickShow extends Component{
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
                        <button className='mdl-button mdl-js-button mdl-button--fab mdl-button--accent mdl-js-ripple-effect' onClick={() => { this.isChecked() } } data-focus='demo-button'>
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

                <div className='myCustomBody'>
                    <div className="navigation">
                        <textarea></textarea>
                    </div>

                    <input type="checkbox" id="nav-trigger" className="nav-trigger" />

                    <div className="site-wrap">
                        <h1>Pure CSS Off-Screen Menu</h1>
                        <h3>Finally, an off-screen menu that doesn't require a bunch of Javascript to work. </h3>

                        <p>This concept relies on the <code>:checked</code> pseudo-selector as well as the general sibling <code>~</code> selector, so it has decent browser support.</p>
                        <p><strong>Browsers supported:</strong> IE9+, Firefox 3.5+, Chrome any, Safari 3.2+, Opera 9.5+</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi vero nisi eos sed qui natus, ut eius reprehenderit error nesciunt veniam aliquam nulla itaque labore obcaecati molestiae eveniet, perferendis provident amet perspiciatis expedita accusantium! Eveniet, quos voluptas et, labore natus, saepe unde est nulla sit eaque tempore debitis accusantium. Recusandae.</p>
                        <p>Dolorem aliquam a libero reiciendis obcaecati doloribus ipsa eos laudantium, dicta in! Odit iure ut ratione, dolorum cupiditate perferendis voluptatum sapiente, dignissimos sunt necessitatibus, reprehenderit consequatur dolorem. Aliquam veniam quaerat, pariatur deserunt reiciendis vero vitae, repellat omnis sequi dolor nesciunt. Nihil similique alias impedit, obcaecati eligendi delectus voluptatum! Ipsum, vel.</p>
                        <p>Sint, perspiciatis nemo aut, rerum excepturi deleniti modi quos nihil corporis eum, maiores soluta labore, consectetur eligendi nesciunt. Placeat, incidunt! Illum placeat eligendi, veritatis consectetur eum! Dolor obcaecati minima ab placeat voluptatem neque modi doloribus, magnam qui voluptate eaque in. Nulla expedita hic porro architecto facere officiis vitae numquam, dolor!</p>
                        <p>Perferendis quis ea incidunt ducimus nisi voluptate natus. Repellat asperiores quod rerum rem quos blanditiis enim modi, veniam voluptas a facilis! Velit cum omnis, voluptatum eum inventore! Corrupti, suscipit, neque distinctio expedita est laboriosam cum aliquid minus tempora quaerat officia possimus unde vel deleniti eaque fugit accusamus iusto dolorum natus.</p>

                        <p>Demo by Austin Wulf. <a href="http://www.sitepoint.com/pure-css-off-screen-navigation-menu">See article</a>.</p>
                    </div>
                </div>
            </div>
        );
    }
}

//Static props.
QuickShow.displayName = 'ComponentDetail';
QuickShow.defaultProps = {};
QuickShow.propTypes = {
    description: types('string'),
    example: types('string'),
    url: types('string'),
    keywords: types('array'),
    photo: types('string'),
    name: types('string')
};

module.exports = QuickShow;
