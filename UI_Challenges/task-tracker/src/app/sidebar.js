export default class Sidebar {
  constructor() {
    this.sidebar = document.querySelector('#sidebar');
  }

  initSideBar(sidebarContent = {}, enableSave = false) {
    return new Promise((resolve, reject) => {
      const node = this.sidebar.content.cloneNode(true);
      node.querySelector('.close').addEventListener('click', (e) => {
        this.destroySidebar();
        resolve();
      });
      if (enableSave) {
        node.querySelector('.save-btn').addEventListener('click', () => {
          const sidebarWrp = document.querySelector('#sidebar-wrp');
          const title = sidebarWrp.querySelector('#title').value;
          const category = sidebarWrp.querySelector('#category').value;
          const description = sidebarWrp.querySelector('#description').value;
          resolve({ title, category, description, status: 0 });
          this.destroySidebar();
        });
      } else {
        const titleDiv = node.querySelector('#title');
        const categoryDiv = node.querySelector('#category');
        const descriptionDiv = node.querySelector('#description');
        const saveBtn = node.querySelector('.save-btn');
        const { title, category, description } = sidebarContent;
        titleDiv.value = title;
        titleDiv.classList.remove('cursor-pointer');
        categoryDiv.classList.remove('cursor-pointer');
        descriptionDiv.classList.remove('cursor-pointer');
        categoryDiv.value = category;
        descriptionDiv.value = description;
        titleDiv.disabled = true;
        categoryDiv.disabled = true;
        descriptionDiv.disabled = true;
        saveBtn.disabled = true;
        saveBtn.classList.remove('bg-blue-200');
        saveBtn.classList.add('bg-gray-300', 'cursor-not-allowed');
      }
      document.body.appendChild(node);
    });
  }

  destroySidebar() {
    document.body.removeChild(document.querySelector('#sidebar-wrp'));
  }
}
