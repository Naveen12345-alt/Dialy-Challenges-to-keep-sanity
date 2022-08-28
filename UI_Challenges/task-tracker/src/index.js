import Drag from './app/drag';
import Layout from './app/layout';
import Store from './app/store';
import './styles.scss';

function loadApp() {
  const storeService = new Store();
  const layoutService = new Layout(storeService);
  const dragService = new Drag();

  const taskList = storeService.getAllTask(storeService);

  taskList.forEach((task) => {
    layoutService.addTaskToLayout(task);
  });

  layoutService.createBtnListener();

  dragService.initDragListener((dropzone, id) => {
    storeService.patchStatus(id, dropzone);
  });
}

loadApp();
