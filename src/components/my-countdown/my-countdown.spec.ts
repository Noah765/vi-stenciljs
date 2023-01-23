import { newSpecPage } from '@stencil/core/testing';
import { MyCountdown } from './my-countdown';

describe('my-countdown', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [MyCountdown],
      html: '<my-countdown></my-countdown>',
    });
    expect(root).toEqualHtml(`
        <my-countdown>
            <figure class="countdown">
                <h2 class="countdown__title">
                    Countdown Title
                </h2>
                <div class="countdown__body">
                    <time class="countdown__body__section">
                        <span class="countdown__body__section__time">23</span>
                        Hours
                    </time>
                    <time class="countdown__body__section">
                        <span class="countdown__body__section__time">59</span>
                        Minutes
                    </time>
                    <time class="countdown__body__section">
                        <span class="countdown__body__section__time">59</span>
                        Seconds
                    </time>
                </div>
            </figure>
        </my-countdown>
    `);
  });

  it('renders with values', async () => {
    const timeValue = new Date().valueOf() + 186143000;

    const { root } = await newSpecPage({
      components: [MyCountdown],
      html: `<my-countdown end-date="${timeValue}" name="Test Title"></my-countdown>`,
    });
    expect(root).toEqualHtml(`
        <my-countdown end-date="${timeValue}" name="Test Title">
            <figure class="countdown">
                <h2 class="countdown__title">
                    Test Title
                </h2>
                <div class="countdown__body">
                    <time class="countdown__body__section">
                        <span class="countdown__body__section__time">2</span>
                        Days
                    </time>
                    <time class="countdown__body__section">
                        <span class="countdown__body__section__time">3</span>
                        Hours
                    </time>
                    <time class="countdown__body__section">
                        <span class="countdown__body__section__time">42</span>
                        Minutes
                    </time>
                    <time class="countdown__body__section">
                        <span class="countdown__body__section__time">22</span>
                        Seconds
                    </time>
                </div>
            </figure>
        </my-countdown>
    `);
  });

  it('renders with malicious values', async () => {
    const { root } = await newSpecPage({
      components: [MyCountdown],
      html: `<my-countdown end-date="0"></my-countdown>`,
    });
    expect(root).toEqualHtml(`
        <my-countdown end-date="0">
            <figure class="countdown">
                <h2 class="countdown__title">
                    Countdown Title
                </h2>
                <div class="countdown__body"></div>
                <h3 class="countdown__finished">
                    Countdown finished
                </h3>
            </figure>
        </my-countdown>
    `);
  });
});
