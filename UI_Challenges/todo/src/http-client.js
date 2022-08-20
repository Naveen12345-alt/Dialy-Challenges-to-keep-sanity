export default class HttpClient {
  getUrl = 'https://jsonplaceholder.typicode.com/todos';
  constructor() {}

  async getAllTodos() {
    try {
      const response = await fetch(this.getUrl);
      const data = await response.json();
      return data.map(({ id, title, completed }) => {
        return { id, title, completed };
      });
    } catch (e) {
      console.log('Error Occured While fetching Todos', e);
    }
  }
}
