const perform = (z, bundle) => {
  const options = {
    url: 'https://developer-api.nest.com',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${bundle.authData.access_token}`,
      Accept: 'application/json',
    },
    params: {},
  };

  return z.request(options).then((response) => {
    response.throwForStatus();
    const results = z.JSON.parse(response.content);

    const structure_names = bundle.inputData.structure_names;

    var output = [];

    for (let [index, structure] of Object.entries(results['structures'])) {
      // output structure home/away status if either this structure's name
      // was selected, or if no (all) structures were selected.
      if (
        typeof structure_names == 'undefined' ||
        structure_names === null ||
        structure_names.length === 0 ||
        structure_names.indexOf(structure['name']) > -1
      ) {
        output.push({ away: structure.away, structure: structure });
      }
    }

    return output;
  });
};

module.exports = {
  operation: {
    perform: perform,
    inputFields: [
      {
        required: false,
        list: true,
        label: 'Building Name(s)',
        helpText:
          'Specify the name(s) of the building to get the home/away status of (optional, will get all buildings in an array by default.)',
        key: 'structure_names',
        type: 'string',
        altersDynamicFields: false,
      },
    ],
    sample: {
      away: 'home',
      structure: {
        name: 'Chimera',
        away: 'home',
        cameras: [
          '1HKk6ITtFbUo9p6OrqwmvUrSOm7pZTUBRBdUZtfhWJC_y3Rur2cPRw',
          'pBhFV0rqaXovwZBYq31wjPt6yD2i8bGiH6RwH8S6BK6_y3Rur2cPRw',
          'KTT1e94Ntnai4BKgmJmsqdtBZh4iOvSivbTXVoxRose_y3Rur2cPRw',
        ],
        time_zone: 'America/Los_Angeles',
        country_code: 'US',
        structure_id: 'B5BMAiA8IOmVVvSbrzccuRbeNvaDUsUpFU1cbqWIMljkVRTq0XlXRA',
      },
    },
    outputFields: [
      { key: 'away', label: 'Home/Away' },
      { key: 'structure__name', label: 'Structure Name' },
      { key: 'structure__structure_id', label: 'Structure ID' },
    ],
  },
  noun: 'Home/Away Status',
  display: {
    hidden: false,
    important: true,
    description:
      'Determine whether your Nest building is in Home or Away mode.',
    label: 'Get Home/Away Status',
  },
  key: 'get_away',
};
