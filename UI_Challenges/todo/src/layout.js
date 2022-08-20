export default class layout {
  constructor(stateService) {
    this.baseNode = document.getElementById('task');
    this.wrapperRef = document.getElementById('task-wrapper');

    this.stateService = stateService;
    this.initLayout();
  }

  initLayout() {
    const data = this.stateService.getAllTodos();
    if (data.length) {
      data.forEach((el) => {
        this.addToLayout(el);
      });
    }
  }

  addToLayout(data) {
    const node = this.baseNode.content.cloneNode(true);
    const taskContainer = node.querySelector('.task-container');
    const input = node.querySelector('.task-input');
    const deleteTask = node.querySelector('.task-delete');
    const checkboxWrapper = node.querySelector('.task-check');
    const checkboxInput = checkboxWrapper.querySelector('input');
    const checkImg = checkboxWrapper.querySelector('img');
    input.value = data.title;
    taskContainer.id = `task-${data.id}`;
    checkboxInput.checked = data.done;

    if (data.done) {
      this.markAsDone(input, checkImg, taskContainer);
    }

    const patchInput = this.debounceInput(this.stateService.patchTodo.bind(this.stateService), 500);

    input.addEventListener('keyup', (e) => patchInput(data.id, e.target.value));

    deleteTask.addEventListener('click', () => this.removeTask(data.id));

    checkboxInput.addEventListener('change', (e) => {
      e.preventDefault();
      checkboxInput.done = !data.done;

      if (checkboxInput.done) {
        this.markAsDone(input, checkImg, taskContainer);
      } else {
        this.unmarkAsDone(input, checkImg, taskContainer);
      }

      this.stateService.changeStatus(data.id, checkboxInput.checked);
    });

    this.wrapperRef.insertBefore(node, this.wrapperRef.querySelector('.task-container'));
  }

  removeTask(id) {
    const nodeId = `task-${id}`;
    const node = this.wrapperRef.querySelector(`#${nodeId}`);
    this.stateService.deleteTodo(id);
    this.wrapperRef.removeChild(node);
  }

  markAsDone(input, checkImg, taskContainer) {
    taskContainer.classList.add('border-green-400');
    input.classList.add('line-through', 'opacity-50');
    checkImg.classList.remove('hidden');
  }
  unmarkAsDone(input, checkImg, taskContainer) {
    taskContainer.classList.remove('border-green-400');
    input.classList.remove('line-through', 'opacity-50');
    checkImg.classList.add('hidden');
  }

  debounceInput(func, delay) {
    let timer = null;
    return (...args) => {
      if (timer) {
        clearTimeout(timer);
      }
      setTimeout(() => func(...args), delay);
    };
  }
}
