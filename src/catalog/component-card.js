//dependencies
const React = require('react');
const {Component} = React;
const {types} = require('focus-core').component;
const liStyle = { flex: 1, minWidth: '300px', maxWidth: '300px', marginTop: '7px', marginRight: '7px'};
import {capitalize} from 'lodash/string';

/**
* Component describing a component.
*/
class ComponentCard extends Component{
    constructor(props){
        super(props);
    }
    /** @inheriteDoc */
    render() {
        const {name, description, example, capture, keywords} = this.props;
        const titleStyle = {color: 'white'};
        return (
            <li className='demo-card-wide mdl-card mdl-shadow--2dp' style={liStyle}>
                <div data-focus='card-head'>
                    <img data-focus='capture' src={capture}/>
                    <div className='mdl-card__title'>
                        <h2 className='mdl-card__title-text'>{capitalize(name)}</h2>
                    </div>
                </div>
                <div className='mdl-card__supporting-text'>
                    <div data-focus='description'>
                        {description}
                    </div>
                    <div data-focus='tags'>
                        {keywords.map((tag, idx) => <div data-focus='tag' key={idx}>{tag.toUpperCase()}</div>)}
                    </div>
                </div>
                <div className='mdl-card__actions mdl-card--border'>
                    <a className='mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect' href={example} onClick={this.props.showLiveComponent}>
                        Show me more
                    </a>
                </div>
                <div className='mdl-card__menu'>
                    <button className='mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect'>
                        <a href={`mailto:?subject=Check the ${name} out !&body=${window.location.host}/#component/${name}`}><i className='material-icons'>share</i></a>
                    </button>
                </div>
            </li>
        );
    }
}

//Static props.
ComponentCard.displayName = 'ComponentCard';
ComponentCard.defaultProps = {};
ComponentCard.propTypes = {
    description: types('string'),
    example: types('string'),
    url: types('string'),
    keywords: types('array'),
    photo: types('string'),
    name: types('string')
};

module.exports = ComponentCard;
