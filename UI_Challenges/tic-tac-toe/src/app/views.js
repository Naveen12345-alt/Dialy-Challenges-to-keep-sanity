export default class Views {
  constructor() {
    this.gridWrapper = document.getElementById('maze');
    this.cellTemplate = document.getElementById('cell');
    this.turnHeading = document.getElementById('turn');
  }

  constructGrid() {
    const tempDoc = new DocumentFragment();
    for (let i = 0; i < 9; i++) {
      const node = this.cellTemplate.content.cloneNode(true);
      node.querySelector('.content').id = `content-${i + 1}`;
      tempDoc.appendChild(node);
    }
    this.gridWrapper.appendChild(tempDoc);
  }

  initGridListener(callback) {
    this.gridWrapper.addEventListener('click', (e) => {
      callback(parseInt(e.target.id.split('-').pop(), 10));
    });
  }

  setCellValue(cell, value) {
    const node = this.gridWrapper.querySelector(`#content-${cell}`);
    node.textContent = value;
    node.classList.remove('cursor-pointer');
  }

  setTurn(content) {
    this.turnHeading.textContent = content;
  }

  alertWinner(content) {
    setTimeout(() => {
      alert(content);
    }, 100);
  }

  resetGrid() {
    Array.from(this.gridWrapper.children).forEach((node) => this.gridWrapper.removeChild(node));
    this.constructGrid();
  }
}
