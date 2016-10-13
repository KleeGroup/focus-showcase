//dependencies
import React from 'react';
import history from 'focus-core/history';
const {Component} = React;
import types from 'focus-core/component/types';
const liStyle = { flex: 1, minWidth: '300px', maxWidth: '300px', marginTop: '7px', marginRight: '20px', marginBottom: '20px'};
import {capitalize} from 'lodash/string';
import Backbone from 'backbone';

/**
* Component describing a component.
*/
class ComponentCard extends Component{
    constructor(props) {
        super(props);
    }

    _showLiveExample = () => {
        Backbone.history.navigate(`component/${this.props.name}/detail`, true);
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
                    </div>
                    <h2 className='mdl-card__title-text'>{capitalize(name)}</h2>
                </div>
                <div className='mdl-card__supporting-text' data-focus='card-content'>
                    <div data-focus='description'>
                        {description}
                    </div>
                    <div data-focus='tags'>
                        {keywords.map((tag, idx) => <div data-focus='tag' key={idx}>{tag.toUpperCase()}</div>)}
                    </div>
                </div>
                <div className='mdl-card__actions mdl-card--border'>
                    <a className='mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect' href={example} onClick={this.props.showLiveComponent}>
                        Code sample
                    </a>
                    <a className='mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect' href={example} onClick={this._showLiveExample}>
                        Live component
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
