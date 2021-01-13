const authentication = require('./authentication');
const setAwayCreate = require('./creates/set_away.js');
const getAwaySearch = require('./searches/get_away.js');

module.exports = {
  platformVersion: require('zapier-platform-core').version,
  searches: { [getAwaySearch.key]: getAwaySearch },
  authentication: authentication,
  version: require('./package.json').version,
  creates: { [setAwayCreate.key]: setAwayCreate },
};
