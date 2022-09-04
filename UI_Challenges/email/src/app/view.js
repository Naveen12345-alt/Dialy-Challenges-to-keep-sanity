export default class View {
  constructor() {
    this.baseWrapper = document.getElementById('email-wrapper');
    this.bodyTemplate = document.getElementById('email-body');
    this.listTemplate = document.getElementById('email-list-item');
  }

  setListItemListener(cb) {
    document.body.addEventListener('click', (e) => {
      if (e.target.classList.contains('email-list-item')) {
        cb(e.target.parentNode.id);
      }
    });
  }

  renderEmailBody(email) {
    const node = this.bodyTemplate.content.cloneNode(true);

    node.querySelector('.title').textContent = email.title;
    node.querySelector('.body').textContent = email.body;

    this.baseWrapper.querySelector('.email-body').innerHTML = '';
    this.baseWrapper.querySelector('.email-body').appendChild(node);
  }

  renderEmailItem(emailList, activeIdx = 1) {
    const docFrag = new DocumentFragment();
    emailList.forEach((email) => {
      const { id, title } = email;
      const node = this.listTemplate.content.cloneNode(true);
      node.querySelector('.title').textContent = title;
      node.querySelector('.list-item').id = `list-item-${id}`;

      if (activeIdx === id) {
        node.querySelector('.title').classList.remove('text-gray-500', 'bg-gray-200');
        node.querySelector('.title').classList.add('bg-white');
        this.renderEmailBody(email);
      }

      docFrag.appendChild(node);
    });
    this.baseWrapper.querySelector('.email-list').innerHTML = '';
    this.baseWrapper.querySelector('.email-list').appendChild(docFrag);
  }

  debounceRenderView(wait) {
    let timer;

    return (...args) => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        this.renderEmailItem(...args);
      }, wait);
    };
  }
}
