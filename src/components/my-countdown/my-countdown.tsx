import { Component, h, Prop, State } from '@stencil/core';

@Component({
  tag: 'my-countdown',
  styleUrl: 'my-countdown.scss',
  scoped: true,
})
export class MyCountdown {
  @Prop() name: string = 'Countdown Title';
  @Prop() endDate: number = new Date().valueOf() + 86400000;
  @State() currentTime: any[] = [];
  @State() finished: boolean = false;

  componentWillLoad() {
    if (this.checkFinished()) return;

    this.currentTime = this.getCountdownTime();

    setInterval(() => {
      if (this.checkFinished()) return;
      this.currentTime = this.getCountdownTime();
    }, 1000);
  }

  checkFinished = () => {
    if (this.endDate <= new Date().valueOf()) {
      this.finished = true;
      return true;
    }
  };

  getCountdownTime = () => {
    const timeBetween = this.endDate - new Date().valueOf();

    let seconds = Math.floor(timeBetween / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);
    let years = Math.floor(days / 365);

    seconds = seconds % 60;
    minutes = minutes % 60;
    hours = hours % 24;
    days = days % 365;

    const output: Object[] = [];
    if (years != 0) output.push({ time: years, unit: 'Year' });
    if (years + days != 0) output.push({ time: days, unit: 'Day' });
    if (years + days + hours != 0) output.push({ time: hours, unit: 'Hour' });
    if (years + days + hours + minutes != 0) output.push({ time: minutes, unit: 'Minute' });
    if (years + days + hours + minutes + seconds != 0) output.push({ time: seconds, unit: 'Second' });

    return output;
  };

  render() {
    return (
      <figure class="countdown">
        <h2 class="countdown__title">{this.name}</h2>
        <div class="countdown__body">
          {this.currentTime.map(item => (
            <time class="countdown__body__section">
              <span class="countdown__body__section__time">{item.time}</span>
              {item.time == 1 ? item.unit : `${item.unit}s`}
            </time>
          ))}
        </div>
        {this.finished ? <h3 class="countdown__finished">Countdown finished</h3> : ''}
      </figure>
    );
  }
}
