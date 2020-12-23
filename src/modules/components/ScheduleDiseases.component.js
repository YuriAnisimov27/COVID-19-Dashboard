/* eslint-disable import/no-duplicates */
import create from '../utils/helpers';
import { getCountrySchedule, getGlobalSchedule } from '../utils/server';

export default class ScheduleDiseases {
  constructor() {
    this.chart = null;
  }

  drowSchedule(dates, cases, status) {
    let bcgColor;
    let borderClr;
    if (status === 'recovered') {
      bcgColor = 'rgb(32, 199, 157)';
      borderClr = 'rgb(14, 139, 108)';
    } else if (status === 'deaths') {
      bcgColor = 'rgb(199, 38, 78)';
      borderClr = 'rgb(182, 10, 53)';
    } else {
      bcgColor = 'rgb(44, 106, 240)';
      borderClr = 'rgb(16, 60, 143)';
    }

    const ctx = document.getElementById('myChart').getContext('2d');
    // eslint-disable-next-line no-undef
    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: dates,
        datasets: [{
          label: status,
          backgroundColor: bcgColor,
          borderColor: borderClr,
          data: cases,
          borderWidth: 0.2,
        }],
      },
      options: {
        tooltips: {
          mode: 'index',
          intersect: false,
        },
      },
    });
    const schedule = document.querySelector('.schedule');
    const fullScreenBtn = create('span', 'fullscreenbtn material-icons screen__manager__icon');
    fullScreenBtn.textContent = 'open_in_full';
    schedule.appendChild(fullScreenBtn);
    fullScreenBtn.addEventListener('click', () => {
      schedule.classList.toggle('fullscreen');
      document.body.classList.toggle('noScroll');
    });
  }

  updateChart(dates, cases, status) {
    this.chart.data.datasets[0].label = status;
    this.chart.data.datasets[0].data = cases;
    this.chart.data.labels = dates;
    this.chart.update();
  }

  async createSchedule(country = null, status = 'confirmed') {
    const currentDay = new Date().toDateString();

    if (country) {
      const title = document.querySelector('.schedule-btn__info');
      const titleSchedule = document.querySelector('.schedule-btn__info');
      title.textContent = country;
      titleSchedule.textContent = country;
      const { dates, cases } = await getCountrySchedule(country, status, '2020-03-01T00:00:00Z', currentDay);
      this.drowSchedule(dates, cases, status);
      // this.updateChart(dates, cases, status);
    } else {
      const { dates, cases } = await getGlobalSchedule(status);
      this.drowSchedule(dates, cases, status);
      // this.updateChart(dates, cases, status);
    }
  }

  changeData() {
    this.bar = 'Hello World';
    const leftArr = document.querySelector('.schedule-btn__left');
    const leftRight = document.querySelector('.schedule-btn__right');
    const titleSchedule = document.querySelector('.schedule-btn__info');
    const titleTable = document.querySelector('.table-nav__title');
    let counter = 0;
    let title;

    function updateSchedulerData(index, country) {
      switch (index) {
        case 1:
          new ScheduleDiseases().createSchedule(country, 'recovered');
          return;
        case 2:
          new ScheduleDiseases().createSchedule(country, 'deaths');
          return;
        default:
          new ScheduleDiseases().createSchedule(country, 'confirmed');
      }
    }

    leftArr.addEventListener('click', () => {
      title = (titleTable.textContent === 'World Data') ? null : titleSchedule.textContent;
      counter = (counter) ? counter - 1 : 2;
      updateSchedulerData(counter, title);
    });
    leftRight.addEventListener('click', () => {
      title = (titleTable.textContent === 'World Data') ? null : titleSchedule.textContent;
      counter = Math.abs(counter + 1) % 3;
      updateSchedulerData(counter, title);
    });
  }
}
