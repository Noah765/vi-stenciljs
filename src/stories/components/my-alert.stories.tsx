import notes from '../../components/my-alert/readme.md';
import storyGenerator from 'story-wc-generator';

const { args, argTypes, Template } = storyGenerator('my-alert', {
  text: { value: 'Click me!', description: 'The alert text', type: 'string' },
  kind: {
    value: 'info',
    description: 'The kind of the alert',
    control: 'select',
    options: ['info', 'success', 'error'],
    type: 'info | success | error',
  },
});

export default {
  title: 'Alert',
  args,
  argTypes,
  parameters: {
    notes,
  },
};

export const Info = Template.bind({});

export const Success = Template.bind({});
Success.args = {
  kind: 'success',
};

export const Error = Template.bind({});
Error.args = {
  kind: 'error',
};
