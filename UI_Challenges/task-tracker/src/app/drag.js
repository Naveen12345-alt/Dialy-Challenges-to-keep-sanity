const dropClasses = {
  backlog: 0,
  progress: 1,
  review: 2,
  done: 3,
};

export default class Drag {
  constructor() {
    this.dragged = null;
  }

  initDragListener(onDragCb) {
    document.body.addEventListener('dragstart', (e) => (this.dragged = e.target));
    document.body.addEventListener('dragover', (e) => e.preventDefault());
    document.body.addEventListener('dragenter', (e) => {
      if (e.target.classList.contains('dropbox')) {
        e.target.classList.add('opacity-50');
      }
    });
    document.body.addEventListener('dragleave', (e) => {
      if (e.target.classList.contains('dropbox')) {
        e.target.classList.remove('opacity-50');
      }
    });
    document.body.addEventListener('drop', (e) => {
      if (e.target.classList.contains('dropbox')) {
        this.dragged.parentNode.removeChild(this.dragged);
        e.target.classList.remove('opacity-50');
        console.log(e.target);
        e.target.appendChild(this.dragged);
        const status = dropClasses[e.target.id];
        onDragCb(status, parseInt(this.dragged.id, 10));
      }
    });
  }
}

export { dropClasses };
