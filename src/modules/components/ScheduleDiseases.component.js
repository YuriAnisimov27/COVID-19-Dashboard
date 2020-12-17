import { getCountrySchedule } from '../utils/server';

export default class ScheduleDiseases {
  async createSchedule() {
    this.bar = 'Hello World';
    const { dates, cases } = await getCountrySchedule('Egypt', '2020-08-01T00:00:00Z', '2020-12-17T02:32:20Z');

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
