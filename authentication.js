module.exports = {
  test: {
    body: {},
    url: 'https://developer-api.nest.com',
    removeMissingValuesFrom: {},
    headers: {
      'X-AUTHORIZATION-URL-BASE': '{{bundle.authData.authorization_url_base}}',
      'X-CLIENT-SECRET': '{{bundle.authData.client_secret}}',
      'X-CLIENT-ID': '{{bundle.authData.client_id}}',
      Authorization: 'Bearer {{bundle.authData.access_token}}',
    },
    params: {
      client_secret: '{{bundle.authData.client_secret}}',
      authorization_url_base: '{{bundle.authData.authorization_url_base}}',
      client_id: '{{bundle.authData.client_id}}',
    },
    method: 'GET',
  },
  fields: [],
  oauth2Config: {
    authorizeUrl: {
      url: 'https://home.nest.com/login/oauth2',
      params: {
        state: '{{bundle.inputData.state}}',
        redirect_uri: '{{bundle.inputData.redirect_uri}}',
        response_type: 'code',
        client_id: '{{process.env.CLIENT_ID}}',
      },
      method: 'GET',
    },
    refreshAccessToken: {
      body: {
        grant_type: 'refresh_token',
        refresh_token: '{{bundle.authData.refresh_token}}',
      },
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        accept: 'application/json',
      },
      method: 'POST',
    },
    autoRefresh: false,
    getAccessToken: {
      body: {
        client_secret: '{{process.env.CLIENT_SECRET}}',
        code: '{{bundle.inputData.code}}',
        grant_type: 'authorization_code',
        client_id: '{{process.env.CLIENT_ID}}',
        redirect_uri: '{{bundle.inputData.redirect_uri}}',
      },
      url: 'https://api.home.nest.com/oauth2/access_token',
      removeMissingValuesFrom: {},
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        accept: 'application/json',
      },
      params: {},
      method: 'POST',
    },
  },
  type: 'oauth2',
};
