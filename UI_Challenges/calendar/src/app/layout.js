import { dayNames } from './dates';
import OverlayService from './overlay';

export default class Layout {
  constructor() {
    this.dateNode = document.getElementById('date-tile');
    this.monthPicker = document.getElementById('month-picker');
    this.dayNode = document.getElementById('day-tile');
    this.monthWrapper = document.getElementById('month-view');
    this.overlayService = new OverlayService();
  }

  initMonthLayout(days, month, year) {
    for (let i = 1; i <= days; i++) {
      const date = new Date(year, month, i, 5, 30);
      if (i === 1) {
        this.setDayHeader(date.getDay());
      }
      const node = this.setDateHeader(i);
      this.setListenerOnDate(node, date);
      this.monthWrapper.appendChild(node);
    }
  }

  initMonthDropdown(monthNames, year, listenerCb) {
    const documentFragment = new DocumentFragment();

    monthNames.forEach((monthName, i) => {
      const node = document.createElement('option');
      node.value = i + 1;
      node.textContent = `${monthName} ${year}`;
      documentFragment.appendChild(node);
    });

    this.monthPicker.appendChild(documentFragment);
    this.setMonthListener(listenerCb);
  }

  selectMonth(month) {
    this.monthPicker.value = month;
  }

  setMonthListener(callback) {
    this.monthPicker.addEventListener('change', (e) => callback(e));
  }

  setListenerOnDate(node, date) {
    node.getElementById('date-tile').addEventListener('click', async (e) => {
      const res = await this.overlayService.initOverlay(date);
      console.log(res, 'Response from Overlay');
      console.log('click date: ' + e.target.children[0].textContent);
    });
  }

  setDateHeader(date) {
    const node = this.dateNode.content.cloneNode(true);
    node.querySelector('#date-tile #date-label').textContent = date;
    return node;
  }

  setDayHeader(currentDay) {
    dayNames.forEach((day, i) => {
      const node = this.dayNode.content.cloneNode(true);
      node.getElementById('day-label').textContent = dayNames[(i + currentDay) % 7];
      this.monthWrapper.appendChild(node);
    });
  }
}
