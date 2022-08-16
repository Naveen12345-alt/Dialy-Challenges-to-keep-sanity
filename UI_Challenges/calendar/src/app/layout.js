import { dayNames } from './dates';
import OverlayService from './overlay';

export default class Layout {
  constructor() {
    this.dateNode = document.getElementById('date-tile');
    this.monthPicker = document.getElementById('month-picker');
    this.dayNode = document.getElementById('day-tile');
    this.monthWrapper = document.getElementById('month-view');
    this.eventSummary = document.getElementById('event-summary');
    this.overlayService = new OverlayService();
  }

  initMonthLayout(days, month, year, eventCallback, events) {
    const documentFragment = new DocumentFragment();
    for (let i = 1; i <= days; i++) {
      const date = new Date(year, month, i, 5, 30);
      if (i === 1) {
        this.setDayHeader(date.getDay());
      }
      const node = this.setDateHeader(i);
      this.setEventsOnDate(events, node, eventCallback, date);
      this.setDateListener(node, date, eventCallback);
      documentFragment.appendChild(node);
      this.monthWrapper.appendChild(documentFragment);
    }
  }

  setEventsOnDate(events, node, eventCallback, date) {
    const eventDocumentFragment = new DocumentFragment();
    events.forEach((event) => {
      if (new Date(event.timestamp).getDate() === date.getDate()) {
        const node = this.eventSummary.content.cloneNode(true);
        node.querySelector('#event-summary').textContent = event.title;
        node.querySelector('#event-summary').addEventListener('click', async (e) => {
          const res = await this.overlayService.initOverlay(date, event.title, event.description);
          if (res) {
            eventCallback(res.eventDetail, res.eventDescription, date.getTime());
          }
          console.log(res, 'Response for Event Sumary Card');
        });
        eventDocumentFragment.appendChild(node);
      }
    });
    node.querySelector('#date-tile').appendChild(eventDocumentFragment);
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

  disposeMonthLayout() {
    this.monthWrapper.textContent = '';
  }

  selectMonth(month) {
    this.monthPicker.value = month;
  }

  setMonthListener(callback) {
    this.monthPicker.addEventListener('change', (e) => callback(e));
  }

  setDateListener(node, date, eventCallback, eventDetail, eventDescription) {
    node.querySelector('#date-tile #date-label').addEventListener('click', async (e) => {
      const res = await this.overlayService.initOverlay(date, eventDetail, eventDescription);
      eventCallback(res.eventDetail, res.eventDescription, date.getTime());
      console.log(res, 'Response from Overlay');
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
