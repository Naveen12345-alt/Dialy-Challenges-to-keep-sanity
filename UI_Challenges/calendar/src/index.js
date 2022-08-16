import './styles.scss';
import Layout from './app/layout';
import DateService, { monthNames } from './app/dates';
import Store from './app/store';

const loadApp = () => {
  const layout = new Layout();
  const dateService = new DateService();
  const storeService = new Store();

  let date = new Date();

  const changeMonth = (e) => {
    layout.selectMonth(e.target.value);
    layout.disposeMonthLayout();
    changeMonthLayout(e.target.value - 1);
  };

  const eventCallback = (title, desc, timestamp) => {
    storeService.saveEventCb(title, desc, timestamp);
  };

  const events = storeService.getStore();

  const changeMonthLayout = (month) =>
    layout.initMonthLayout(
      dateService.getDaysInMonth((month ?? date.getMonth()) + 1, date.getFullYear()),
      month ?? date.getMonth(),
      date.getFullYear(),
      eventCallback,
      events
    );

  changeMonthLayout();

  layout.initMonthDropdown(monthNames, date.getFullYear(), changeMonth);

  layout.selectMonth(date.getMonth() + 1);
};

loadApp();
