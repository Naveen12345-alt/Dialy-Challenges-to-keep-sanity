export default class httpService {
  constructor() {
    this.searchEndpoint = 'https://api.giphy.com/v1/gifs/search';
  }

  async getSearchResults(query, offset = 0, limit = 20) {
    const response = await fetch(
      `${this.searchEndpoint}?q=${query}&offset=${offset}&limit=${limit}&api_key=${API_KEY}`
    );
    const data = await response.json();
    return data;
  }
}

const API_KEY = '3RxA3kiBwdUQ5S2X6IzXpLJoLACjzhr1';
