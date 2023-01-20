import { Component, h, Prop, State, Event, EventEmitter, Listen } from '@stencil/core';

export interface AcknowledgeEvent {
  when: Date;
}

@Component({
  tag: 'my-alert',
  styleUrl: 'my-alert.scss',
  scoped: true,
})
export class Alert {
  @Prop() text: string = 'This is an important alert!';
  @Prop() kind: 'info' | 'success' | 'error' = 'info';
  @State() acknowledged: boolean = false;
  @Event() acknowledge: EventEmitter<AcknowledgeEvent>;

  @Listen('click')
  handleClick() {
    this.acknowledged = true;
    this.acknowledge.emit({ when: new Date() });
  }

  componentDidLoad() {
    console.log('Fully loaded');
  }

  componentDidUpdate() {
    console.log('Component updated');
  }

  render() {
    return (
      <p class={`${this.kind} ${this.acknowledged ? 'acknowledged' : ''}`}>
        {this.text}
        <span>Acknowledge</span>
      </p>
    );
  }
}
