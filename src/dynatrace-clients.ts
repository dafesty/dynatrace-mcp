import { _OAuthHttpClient } from '@dynatrace-sdk/http-client';
import { getSSOUrl } from 'dt-app';

/** Uses the provided oauth Client ID and Secret and requests a token */
const requestToken = async (clientId: string, clientSecret: string, authUrl: string): Promise<any> => {
  const res = await fetch(authUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: clientId,
      client_secret: clientSecret,
      scope: '', // Scope vacío
    }),
  });
  if (!res.ok) {
    console.error(`Failed to fetch token: ${res.status} ${res.statusText}`);
  }
  return await res.json();
}

/** Create an Oauth Client based on clientId, clientSecret, environmentUrl */
export const createOAuthClient = async (clientId: string, clientSecret: string, environmentUrl: string): Promise<_OAuthHttpClient> => {
  if (!clientId) {
    throw new Error('Failed to retrieve OAuth client id from env "DT_APP_OAUTH_CLIENT_ID"');
  }
  if (!clientSecret) {
    throw new Error('Failed to retrieve OAuth client secret from env "DT_APP_OAUTH_CLIENT_SECRET"');
  }
  if (!environmentUrl) {
    throw new Error('Failed to retrieve environment URL from env "DT_ENVIRONMENT"');
  }

  console.error(`Trying to authenticate API Calls to ${environmentUrl} via OAuthClientId ${clientId}`);

  const ssoBaseUrl = await getSSOUrl(environmentUrl);
  const ssoAuthUrl = new URL('/sso/oauth2/token', ssoBaseUrl).toString();
  console.error(`Using SSO auth URL: ${ssoAuthUrl}`);

  // try to request a token, just to verify that everything is set up correctly
  const tokenResponse = await requestToken(clientId, clientSecret, ssoAuthUrl);
  console.log('Token obtenido:', tokenResponse);
  if (tokenResponse.error && tokenResponse.error_description) {
    throw new Error(`Failed to retrieve OAuth token: ${tokenResponse.error} - ${tokenResponse.error_description}`);
  }
  console.error(`Successfully retrieved token from SSO!`);

  const oauthClient = new _OAuthHttpClient({
    scopes: [], // Scopes vacío
    clientId,
    secret: clientSecret,
    environmentUrl,
    authUrl: ssoAuthUrl,
  });
  // Log para depuración: mostrar el objeto oauthClient y sus métodos
  console.error('OAuthHttpClient creado:', JSON.stringify({
    clientId,
    environmentUrl,
    authUrl: ssoAuthUrl
  }));
  // Log para verificar si tiene método send
  console.error('Métodos de OAuthHttpClient:', Object.getOwnPropertyNames(Object.getPrototypeOf(oauthClient)));
  return oauthClient;
};

/** Helper function to call an app-function via platform-api */
export const callAppFunction = async (dtClient: _OAuthHttpClient, appId: string, functionName: string, payload: any) => {
  console.error(`Sending payload ${JSON.stringify(payload)}`);

  const response = await dtClient.send({
    url: `/platform/app-engine/app-functions/v1/apps/${appId}/api/${functionName}`,
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: payload,
    statusValidator: (status: number) => {
      return [200].includes(status);
    },
  });

  return await response.body('json');
}

export const listProblemsManual = async (environmentUrl: string, token: string) => {
  const url = `${environmentUrl}/platform/classic/environment-api/v2/problems?&pageSize=100`;
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
    },
  });
  if (!res.ok) {
    throw new Error(`Error al consultar problemas: ${res.status} ${res.statusText}`);
  }
  const data = await res.json();
  return data.problems?.map((problem: any) => {
    return `${problem.displayId} (problemId ${problem.problemId}): ${problem.title}`;
  }) || [];
}
