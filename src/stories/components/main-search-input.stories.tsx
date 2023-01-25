import notes from '../../components/main-search-input/readme.md';
import storyGenerator from 'story-wc-generator';

const { args, argTypes, Template } = storyGenerator('main-search-input', {
  'categories': {
    value: [
      { text: 'All', value: 'all' },
      { text: 'Category 1', value: 'cat1', icon: 'album' },
      { text: 'Category 2', value: 'cat2' },
      { text: 'Category 3', value: 'cat3' },
    ],
    description:
      "The Categories for the search (may be left empty). Needs to be set via `script` tags in a project's HTML:\n`document.querySelector('main-search-input').categories = [{text: 'Category', value: 'cat1'}];`\nLucide Icon name is optional (https://lucide.dev)",
    control: 'object',
    type: '{ text: string; value: string, icon?: string }[]',
  },
  'suggestions-url': {
    value: '',
    description: 'The URL of the typeahead suggestion generation server',
    type: 'string',
  },
  'lang': {
    value: '',
    description: 'The language code to be sent to the suggestion generation server (if necessary)',
    type: 'string',
  },
});

const FinalTemplate = args =>
  `${Template(args)}
    <script>
      ${(() => {
        let out = '';
        for (const arg in args) {
          if (typeof args[arg] !== 'object') continue;

          out += `document.querySelector("main-search-input").${arg} = ${JSON.stringify(args[arg])};`;
        }
        return out;
      })()}
    </script>`;

export default {
  title: 'Main Search Input',
  args,
  argTypes,
  parameters: {
    notes,
  },
};

export const MainSearchInput = FinalTemplate.bind({});
