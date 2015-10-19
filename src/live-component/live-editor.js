// Dependencies
const React = require('react');
const {types} = require('focus-core').component;
require('brace');
require('brace/mode/jsx');
require('brace/theme/github');

// Components

const CodeEditor = require('react-ace');

const LiveEditor = React.createClass({
    displayName: 'LiveEditor',
    getInitialState(){
        return {isVisible: false};
    },
    style: {
        title: {
            color: '#fff',
            height: 70,
            backgroundColor:'rgb(33, 150, 243)'
        }
    },
    propTypes: {
        code: types('string'),
        onChange: types('func'),
        style: types('object')
    },
    _toggleVisible(){
        this.setState({isVisible: !this.state.isVisible});
    },
    /**
    * Render the component.
    * @return {HTML} the rendered component
    */
    render() {
        const {code, name, onChange, style: mainStyle, version} = this.props;
        const {isVisible} = this.state;
        const {style} = this;
        return (
            <div className='demo-card-wide mdl-card mdl-shadow--2dp' data-focus='showcase-live-editor' data-expanded={isVisible}>
                <div className='mdl-card__title' onClick={this._toggleVisible}>
                    <h2 className='mdl-card__title-text'>Live editor</h2>
                </div>
                {isVisible &&
                    <div>
                        <CodeEditor editorProps={{$blockScrolling: 'Infinity'}} height='80vh' mode='jsx' name='codeEditor' onChange={onChange} theme='solarized light' value={code} width='100%'/>
                        <button className='mdl-button mdl-js-button mdl-button--fab mdl-button--colored' onClick={() => {window.location.reload()}} style={{position: 'fixed', right: '80px', bottom: '10px', backgroundColor: 'red', zIndex: 2}}>
                            <i className='material-icons' style={{color: 'white'}}>cached</i>
                        </button>
                    </div>
                }
                <div className='mdl-card__menu'>
                    <button className='mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect' onClick={this._toggleVisible}>
                        <i className='material-icons' style={{color: 'white'}}>{`expand_${isVisible ? 'more' : 'less'}`}</i>
                    </button>
                </div>
            </div>
        );
    }
});

module.exports = LiveEditor;
