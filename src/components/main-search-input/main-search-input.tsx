import { Component, h, Element, Prop, State, Event, EventEmitter } from '@stencil/core';
import jQuery from 'jquery';
import 'typeahead.js';
import 'st-lucide';

export interface SearchEvent {
  query: string;
  category: string;
  categoryValue: string;
}

@Component({
  tag: 'main-search-input',
  styleUrl: 'main-search-input.scss',
  scoped: true,
})
export class MainSearchInput {
  @Element() host: HTMLElement;

  @Prop() categories: { text: string; value: string; icon?: string }[] = [];
  @Prop() suggestionsUrl: string = '';

  @State() activeCategory: string = this.categories[0].text;
  @State() activeCategoryValue: string = this.categories[0].value;
  @State() searchInputPlaceholder: string = 'Search';

  @Event() searchEvent: EventEmitter<SearchEvent>;

  private mainSearchInputElement: HTMLInputElement;

  componentDidLoad() {
    this.initTypeahead();
  }

  initTypeahead() {
    let suggestionCounter = 0;
    let suggestionAmount = 0;

    const suggestionsUrl = this.suggestionsUrl;
    const lang = this.host.getAttribute('lang');
    const category = this.activeCategoryValue;

    jQuery(this.mainSearchInputElement).typeahead(
      {},
      {
        source: function (query, syncResults, asyncResults) {
          suggestionCounter = 0;

          syncResults; // For the quickly lines to go away

          jQuery.ajax(`${suggestionsUrl}?term=${query}&lang=${lang}&category=${category}`, {
            dataType: 'json',
            success: data => {
              asyncResults(data.data);
              suggestionAmount = data.data.length;
            },
          });
        },
        display: 'suggestion',
        templates: {
          suggestion: function (data: { category: string; categoryValue: string; suggestion: string }) {
            suggestionCounter++;

            // To change the color on a currently selected suggestion
            const currentSuggestionCounter = suggestionCounter; // So that the right value is present in the timeout (executes after the suggestionCounter finished going up)
            setTimeout(() => {
              const mutationObserver = new MutationObserver(mutationsList => {
                mutationsList.forEach(mutation => {
                  if (mutation.attributeName === 'class') {
                    const element = mutation.target as HTMLDivElement;

                    if (element.classList.contains('tt-cursor') && !element.hasAttribute('background-type')) {
                      element.setAttribute('background-type', 'keyboard');
                      element.style.backgroundColor = '#c2c2c2cb';
                    } else if (element.getAttribute('background-type') === 'keyboard') {
                      element.removeAttribute('background-type');
                      element.style.backgroundColor = '#d3d3d3cb';
                    }
                  }
                });
              });

              mutationObserver.observe(document.getElementById(`typeahead-suggestion-${currentSuggestionCounter}`), { attributes: true });
            });

            let result = `<div id="typeahead-suggestion-${suggestionCounter}"`;
            result += 'style="background-color: #d3d3d3cb; cursor: pointer; ';

            if (suggestionCounter === 1) result += 'border-radius: 6px 6px 0 0;';
            else if (suggestionCounter === suggestionAmount) result += 'border-radius: 0 0 6px 6px;';

            result +=
              "\" onMouseOver=\"this.hasAttribute('background-type') ? undefined : (() => {this.style.backgroundColor = '#c2c2c2cb'; this.setAttribute('background-type', 'mouse');})()\"";
            result +=
              " onMouseOut=\"this.getAttribute('background-type') === 'mouse' ? (() => {this.style.backgroundColor = '#d3d3d3cb'; this.removeAttribute('background-type');})() : undefined\"";
            result += `>${data.suggestion}${data.categoryValue ? ` - ${data.category}` : ''}</div>`;

            return result;
          },
        },
      },
    );

    (document.getElementsByClassName('twitter-typeahead')[0] as HTMLSpanElement).style.flex = '1';
    (document.getElementsByClassName('tt-menu')[0] as HTMLDivElement).style.right = '0';
  }

  handleDropdownElementClick(category: { text: string; value: string }) {
    this.activeCategoryValue = category.value;
    this.activeCategory = category.text;
  }

  handleSearch() {
    this.searchEvent.emit({ query: this.mainSearchInputElement.value, category: this.activeCategory, categoryValue: this.activeCategoryValue });
  }

  render() {
    return (
      <form method="get">
        <div class="dropdown">
          <div class="dropdown__selected">
            {this.activeCategory}
            <icon-chevron-up class="dropdown__selected__icon" />
          </div>
          <ul role="menu" class="dropdown__options">
            {this.categories.map(item => (
              <li onClick={() => this.handleDropdownElementClick(item)}>
                <icon-check
                  width="18"
                  height="18"
                  class={`dropdown__options__selected_icon ${this.activeCategoryValue === item.value ? 'dropdown__options__selected_icon--selected' : ''}`}
                />
                {item.text}
                {item.icon
                  ? (() => {
                      const CustomTag = `icon-${item.icon}`;
                      return <CustomTag class="dropdown__options__option_icon" />;
                    })()
                  : undefined}
              </li>
            ))}
          </ul>
        </div>
        <div class="input">
          <input
            type="search"
            onKeyPress={e => (e.key === 'Enter' ? this.handleSearch() : undefined)}
            placeholder={this.searchInputPlaceholder}
            ref={el => (this.mainSearchInputElement = el)}
          />
          <icon-search class="input__search_icon" onClick={this.handleSearch} />
        </div>
      </form>
    );
  }
}
