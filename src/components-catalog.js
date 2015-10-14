const buildComponentData = path => {
    console.log('Lol', FOCUS_COMPONENTS_FROM_SRC);
    const example = require('raw!' + FOCUS_COMPONENTS_FROM_SRC + path + '/example/index.jsx');
    const pack = require(FOCUS_COMPONENTS_FROM_SRC + path + '/package.json');
    pack.code = example;
    return pack;
}
const exposedComponents = require('../package.json').components;
export default exposedComponents.map(buildComponentData);
