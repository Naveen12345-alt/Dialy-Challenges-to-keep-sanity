import HttpClient from './app/http-client';
import Store from './app/store';
import View from './app/view';
import './styles.scss';

const loadApp = async () => {
  const httpClient = new HttpClient();
  const storeService = new Store();
  const viewService = new View();

  let emailList = await httpClient.getEmails();

  emailList = storeService.setStore(emailList);

  const renderView = viewService.debounceRenderView(1000);
  renderView(emailList);

  viewService.setListItemListener((id) => {
    id = id.split('-').at(-1);
    renderView(emailList, Number(id));
  });
};

loadApp();
