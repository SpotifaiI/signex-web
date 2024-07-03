export class Result {
  private response;

  constructor(responseObject) {
    this.response = responseObject;
  }

  private getItem(key) {
    if (!(this.response && this.response[key])) {
      return null;
    }

    return this.response[key];
  }

  isOk() {
    return this.getItem('ok') === true;
  }

  getMessage() {
    return this.getItem('message');
  }

  getData() {
    return this.getItem('data');
  }
}
