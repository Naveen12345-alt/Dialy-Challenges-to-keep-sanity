import './styles.scss';
import Store from './store';
import HttpClient from './http-client';
import Layout from './layout';
import TodoInput from './todo-input';

async function loadApp() {
  // alert("heelo")
  const stateService = new Store();
  const httpClient = new HttpClient();

  if (window.localStorage['task-list']) {
    stateService.getStore();
  } else {
    const data = await httpClient.getAllTodos();
    stateService.setStore(data);
  }
  const layoutService = new Layout(stateService);

  new TodoInput(stateService, layoutService);
}

loadApp();
