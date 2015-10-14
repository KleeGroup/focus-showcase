//dependencies
const React = require('react');
const {Component} = React;
//Other component
const ComponentCard = require('./component-card');


class CatalogListComponent extends Component{
    constructor(props){
        super(props);
    }

    _showLiveComponentHandler(comp) {
        return () => {
            this.props.showLiveComponent(comp);
        };
    }

    render(){
        const {data} = this.props;
        const style = {
            display: 'flex', flexWrap: 'wrap', listStyleType: 'none'
        };
        return (
            <ul data-focus='catalog-list' style={style}>
                {data.map((comp, idx) => <ComponentCard key={idx} {...comp} showLiveComponent={this._showLiveComponentHandler(comp)}/> )}
            </ul>
        );
    }
}
//Static props.
CatalogListComponent.displayName = 'Catalog';
module.exports = CatalogListComponent;
