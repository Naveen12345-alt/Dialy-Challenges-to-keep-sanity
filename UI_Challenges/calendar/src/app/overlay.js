export default class OverlayService {
  current;
  constructor() {
    this.dialogNode = document.getElementById('dialog-modal');
  }

  initOverlay(date, eventName, eventDescription) {
    return new Promise((resolve, reject) => {
      const node = this.dialogNode.content.cloneNode(true);
      this.current = node.getElementById('dialog-modal');
      node.getElementById(
        'event-details'
      ).textContent = `${date.getDay()} ${date.getMonth()} ${date.getFullYear()}`;
      console.log(eventName, eventDescription);
      if (eventName && eventDescription) {
        node.querySelector('#event-name').disabled = true;
        node.querySelector('#event-description').disabled = true;
        node.querySelector('#event-name').value = eventName ?? '';
        node.querySelector('#event-description').value = eventDescription ?? '';
      }
      this.setOverlayListener(node, resolve);
      document.body.appendChild(node);
    });
  }

  setOverlayListener(node, resolve) {
    node.getElementById('close-btn').addEventListener('click', (e) => {
      this.destroyDialog();
      resolve(false);
    });
    node.getElementById('save-btn').addEventListener('click', (e) => {
      const eventDetail = e.target.parentNode.parentNode.querySelector('#event-name').value;
      const eventDescription =
        e.target.parentNode.parentNode.querySelector('#event-description').value;
      if (eventDetail.trim() && eventDescription.trim()) {
        this.destroyDialog();
        resolve({ eventDetail: eventDetail, eventDescription: eventDescription });
      } else {
        alert('Enter Event Name and Description.');
      }
    });
  }

  destroyDialog() {
    document.body.removeChild(this.current);
    this.current = null;
  }
}
