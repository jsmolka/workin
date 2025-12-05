import { date, defineSchema, nullable, primitive, schema } from '@/utils/persist';
import axios from 'axios';

export class Token {
  constructor(accessToken = '', refreshToken = '', expiresAt = new Date()) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    this.expiresAt = expiresAt;
  }

  static from(data) {
    return new Token(data.access_token, data.refresh_token, new Date(1000 * data.expires_at));
  }
}

defineSchema(Token, {
  accessToken: primitive(),
  refreshToken: primitive(),
  expiresAt: date(),
});

export class Strava {
  constructor() {
    this.clientId = '';
    this.clientSecret = '';
    this.token = null;
  }

  get isAuthorizeEnabled() {
    return this.clientId.length > 0 && this.clientSecret.length === 40;
  }

  get authorizeUrl() {
    return `https://www.strava.com/oauth/authorize?${new URLSearchParams({
      client_id: this.clientId,
      redirect_uri: 'http://localhost',
      response_type: 'code',
      approval_prompt: 'force',
      scope: 'activity:write',
    })}`;
  }

  async authenticate(code) {
    const data = {
      client_id: this.clientId,
      client_secret: this.clientSecret,
      grant_type: 'authorization_code',
      code,
    };

    this.token = null;
    const response = await axios.post('https://www.strava.com/oauth/token', data);
    this.token = Token.from(response.data);
  }

  async refresh() {
    const data = {
      client_id: this.clientId,
      client_secret: this.clientSecret,
      grant_type: 'refresh_token',
      refresh_token: this.token.refreshToken,
    };

    this.token = null;
    const response = await axios.post('https://www.strava.com/oauth/token', data);
    this.token = Token.from(response.data);
  }

  async accessToken() {
    if (this.token == null) {
      return null;
    }
    if (new Date() > this.token.expiresAt) {
      await this.refresh();
    }
    return this.token.accessToken;
  }
}

defineSchema(Strava, {
  clientId: primitive(),
  clientSecret: primitive(),
  token: nullable(schema(Token)),
});
