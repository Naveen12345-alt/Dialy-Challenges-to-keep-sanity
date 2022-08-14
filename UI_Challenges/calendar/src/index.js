import './styles.scss';
import Layout from './app/layout';
import DateService, { monthNames } from './app/dates';

const loadApp = () => {
  const layout = new Layout();
  const dateService = new DateService();

  let date = new Date();

  const changeMonth = () => {
    console.log('Month Changed');
  };

  layout.initMonthLayout(
    dateService.getDaysInMonth(date.getMonth() + 1, date.getFullYear()),
    date.getMonth(),
    date.getFullYear()
  );

  layout.initMonthDropdown(monthNames, date.getFullYear(), changeMonth);

  layout.selectMonth(date.getMonth() + 1);
};

loadApp();
