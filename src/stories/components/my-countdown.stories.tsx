import notes from '../../components/my-countdown/readme.md';
import storyGenerator from 'story-wc-generator';

const { args, argTypes, Template } = storyGenerator('my-countdown', {
  'name': { value: 'Countdown Title', description: 'The alert text', type: 'string' },
  'end-date': {
    value: new Date().valueOf(),
    description: 'The End Date of the Countdown in a Unix Timestamp type',
    control: 'date',
    type: 'num',
  },
});

export default {
  title: 'Countdown',
  args,
  argTypes,
  parameters: {
    notes,
  },
};

export const Countdown = Template.bind({});
