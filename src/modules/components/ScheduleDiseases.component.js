import { getCountrySchedule, getGlobalSchedule } from '../utils/server';
import { storage } from '../utils/helpers';

export default class ScheduleDiseases {
  drowSchedule(dates, cases, status) {
    this.bar = 'Hello World';
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
    const chart = new Chart(ctx, {
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
      options: {},
    });
  }

  async createSchedule(country = null, status = 'confirmed') {
    this.bar = 'Hello World';
    const currentDay = storage('Current Day');

    if (country) {
      const title = document.querySelector('.schedule-btn__info');
      const titleSchedule = document.querySelector('.schedule-btn__info');
      title.textContent = country;
      titleSchedule.textContent = country;
      console.log('country await', country);
      const { dates, cases } = await getCountrySchedule(country, status, '2020-03-01T00:00:00Z', currentDay);
      this.drowSchedule(dates, cases, status);
    } else {
      const { dates, cases } = await getGlobalSchedule(status);
      this.drowSchedule(dates, cases, status);
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
