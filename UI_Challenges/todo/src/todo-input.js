export default class TodoInput {
  constructor(stateService, layoutService) {
    this.inputNode = document.querySelector('#task-todo');
    this.stateService = stateService;
    this.layoutService = layoutService;
    this.bindInputListener();
  }

  bindInputListener() {
    this.inputNode.addEventListener('keydown', (e) => {
      if (e.code === 'Enter') {
        this.addTodo(e.target.value);
      }
    });
  }

  addTodo(value) {
    if (value.trim()) {
      const valueToAddToLayout = this.stateService.addTodo(value);
      console.log(valueToAddToLayout);
      this.layoutService.addToLayout(valueToAddToLayout);
      this.inputNode.value = '';
    } else {
      alert('Please enter valid todo.');
    }
  }
}
