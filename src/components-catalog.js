const buildComponentData = path => {
    const example = require('raw!' + FOCUS_COMPONENTS_FROM_SRC + path + '/example/index.jsx');
    const pack = require(FOCUS_COMPONENTS_FROM_SRC + path + '/package.json');
    pack.capture = require(FOCUS_COMPONENTS_FROM_SRC + path + '/example/capture.png');
    pack.code = example;
    return pack;
}
const exposedComponents = require('../package.json').components;
export default exposedComponents.map(buildComponentData);
