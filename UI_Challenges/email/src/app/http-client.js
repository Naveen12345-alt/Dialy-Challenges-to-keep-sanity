export default class HttpClient {
  BASE_URL = 'https://jsonplaceholder.typicode.com';

  constructor() {}

  async getEmails() {
    try {
      const resp = await fetch(`${this.BASE_URL}/posts`);
      return await resp.json();
    } catch (error) {
      console.log('Cannot fetch emails!');
    }
  }
}
