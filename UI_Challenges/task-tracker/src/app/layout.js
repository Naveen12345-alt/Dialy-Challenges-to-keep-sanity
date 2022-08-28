import Sidebar from './sidebar';
import { dropClasses } from './drag';

export default class Layout {
  constructor(storeService) {
    this.createBtn = document.querySelector('.create-btn');
    this.dropTaskWrapper = document.querySelector('.dropzone');
    this.taskNode = document.querySelector('#task');
    this.storeService = storeService;
  }

  addTaskToLayout(taskContent) {
    const backlogWrapper = this.dropTaskWrapper.querySelector(
      `#${Object.keys(dropClasses).find((key) => dropClasses[key] === taskContent.status)}`
    );
    const node = this.taskNode.content.cloneNode(true);
    const { category, title, description, id } = taskContent;
    node.querySelector('.task').id = id;
    node.querySelector('.category').textContent = category;
    node.querySelector('.title').textContent = title;
    node.querySelector('.description').textContent = description;

    node.querySelector('.task').addEventListener('click', async () => {
      const sideBar = new Sidebar();
      await sideBar.initSideBar(taskContent);
    });

    backlogWrapper.appendChild(node);
  }

  createBtnListener() {
    this.createBtn.addEventListener('click', async (e) => {
      const sideBar = new Sidebar();
      const res = await sideBar.initSideBar({}, true);
      if (res) {
        const data = this.storeService.setItemToStore(res);
        this.addTaskToLayout(data);
      }
    });
  }
}
