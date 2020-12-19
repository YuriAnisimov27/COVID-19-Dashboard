import { getCountrySchedule } from '../utils/server';
import { storage } from '../utils/helpers';

export default class ScheduleDiseases {
  async createSchedule(country, status = 'confirmed') {
    if (country) {
      const title = document.querySelector('.schedule-btn__info');
      const titleSchedule = document.querySelector('.schedule-btn__info');
      title.textContent = country;
      titleSchedule.textContent = country;
    } else {
      // eslint-disable-next-line no-param-reassign
      country = 'Belarus';
    }

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
    this.bar = 'Hello World';
    const currentDay = storage('Current Day');
    const { dates, cases } = await getCountrySchedule(country, status, '2020-03-01T00:00:00Z', currentDay);

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

  changeData() {
    this.bar = 'Hello World';
    const leftArr = document.querySelector('.schedule-btn__left');
    const leftRight = document.querySelector('.schedule-btn__right');
    const titleSchedule = document.querySelector('.schedule-btn__info');
    let counter = 0;

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
      counter = (counter) ? counter - 1 : 2;
      updateSchedulerData(counter, titleSchedule.textContent);
    });
    leftRight.addEventListener('click', () => {
      counter = Math.abs(counter + 1) % 3;
      updateSchedulerData(counter, titleSchedule.textContent);
    });
  }
}
