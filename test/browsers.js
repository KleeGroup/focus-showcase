'use strict';

const BROWSERS = [
  {name: 'chrome', versions: [45, 46, 47]},
  {name: 'firefox', versions: [43, 44]},
  {name: 'internet explorer', versions: [10, 11]}
//  {name: 'iPhone', versions: [9]},
//  {name: 'iPad', versions: [9]}
];

//module.exports = BROWSERS.reduce((res, current) => [...res, ...current.versions.reduce((r, c) => [...r, {name: current.name, version: c}], [])], []);
module.exports = BROWSERS.reduce(function (res, current) {
  return [].concat(res, current.versions.reduce(function (r, c) {
    return [].concat(r, [{ name: current.name, version: c }]);
  }, []));
}, []);
