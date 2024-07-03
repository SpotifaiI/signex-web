import { Config } from './Config.ts';
import { Result } from './Result.ts';

export class Http {
  private response;
  private content;
  private uri;
  private path;
  private method;
  private headers;

  constructor() {
    this.headers = {};
  }

  to(path) {
    this.setPath(path);

    return this;
  }

  with(headers) {
    this.headers = headers;

    return this;
  }

  async get() {
    this.method = 'GET';

    await this.requestUrl();
    await this.buildContent();

    return new Result(this.content);
  }

  async post(body, isUpload: boolean = false) {
    this.method = 'POST';

    if (!isUpload) {
      await this.sendJson(body);
    } else {
      await this.postContent(body);
    }
    await this.buildContent();

    return new Result(this.content);
  }

  async put(body) {
    this.method = 'PUT';

    await this.sendJson(body);
    await this.buildContent();

    return new Result(this.content);
  }

  async delete() {
    this.method = 'DELETE';

    await this.requestUrl();
    await this.buildContent();

    return new Result(this.content);
  }

  private async buildContent() {
    this.content = await this.response.json();
  }

  private async requestUrl() {
    this.response = await fetch(this.uri, {
      method: this.method,
      mode: 'cors',
      headers: this.headers
    });

    return this;
  }

  private async sendJson(data) {
    this.response = await fetch(this.uri, {
      method: this.method,
      headers: {
        ...Config.getDefaultHeaders(),
        ...this.headers
      },
      mode: 'cors',
      body: JSON.stringify(data)
    });

    return this;
  }

  private async postContent(data) {
    this.response = await fetch(this.uri, {
      method: this.method,
      mode: 'cors',
      body: data
    });

    return this;
  }

  private setPath(path) {
    if (!path) {
      path = '/';
    }

    this.path = path;

    return this.serializePath().setUri();
  }

  private setUri() {
    this.uri = `${Config.getBaseUrl()}${this.path}`;

    return this;
  }

  private serializePath() {
    if (this.path[0] !== '/') {
      this.path = `/${this.path}`;
    }

    return this;
  }
}
