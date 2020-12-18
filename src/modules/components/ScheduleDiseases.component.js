import { getCountrySchedule } from '../utils/server';
import { storage } from '../utils/helpers';

export default class ScheduleDiseases {
  async createSchedule(country = 'Belarus') {
    this.bar = 'Hello World';
    const currentDay = storage('Current Day');
    const { dates, cases } = await getCountrySchedule(country, '2020-08-01T00:00:00Z', currentDay);

    const ctx = document.getElementById('myChart').getContext('2d');
    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: dates,
        datasets: [{
          label: 'cases',
          backgroundColor: 'pink',
          borderColor: 'deeppink',
          data: cases,
          borderWidth: 0.5,
        }],
      },
      options: {},
    });
  }
}
