const perform = (z, bundle) => {
  const options = {
    url: `https://developer-api.nest.com/structures/${bundle.inputData.structure_id}`,
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${bundle.authData.access_token}`,
      Accept: 'application/json',
    },
    params: {},
    body: { away: bundle.inputData.away },
  };

  return z.request(options).then((response) => {
    response.throwForStatus();
    const results = z.JSON.parse(response.content);
    // expect "home" or "away" as per input
    return results;
  });
};

module.exports = {
  operation: {
    perform: perform,
    inputFields: [
      {
        required: true,
        list: false,
        label: 'Home/Away Status',
        key: 'away',
        choices: ['home', 'away'],
        type: 'string',
        altersDynamicFields: false,
      },
      {
        required: true,
        list: false,
        label: 'Structure ID',
        helpText:
          "The Nest Structure ID to set the home/away status of. (Get this from a previous step's response.)",
        key: 'structure_id',
        type: 'string',
        altersDynamicFields: false,
      },
    ],
    sample: { away: 'home' },
    outputFields: [{ key: 'away', label: 'Home/Away Status' }],
  },
  noun: 'Home/Away Status',
  display: {
    hidden: false,
    important: true,
    description: 'Lets you change the home/away status of a building',
    label: 'Set Home/Away Status',
  },
  key: 'set_away',
};
