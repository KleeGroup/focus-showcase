const buildComponentData = path => {
    const example = require('raw!../../focus-components/src/' + path + '/example/index.jsx');
    const pack = require('../../focus-components/src/' + path + '/package.json');
    pack.code = example;
    return pack;
}
const exposedComponents = require('../package.json').components;
export default exposedComponents.map(buildComponentData);
