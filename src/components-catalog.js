const buildComponentData = path => {
    const example = require(`raw!${__FOCUS_COMPONENTS_RELATIVE_PATH__}src/${path}/example/index.jsx`);
    const pack = require(`${__FOCUS_COMPONENTS_RELATIVE_PATH__}src/${path}/package.json`);
    pack.capture = require(`${__FOCUS_COMPONENTS_RELATIVE_PATH__}src/${path}/example/capture.png`);
    pack.code = example;
    return pack;
}

const exposedComponents = require('../package.json').components;
export default exposedComponents.map(buildComponentData);
