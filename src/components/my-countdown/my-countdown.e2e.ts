import { newE2EPage } from '@stencil/core/testing';

describe('my-countdown', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<my-countdown></my-countdown>');
    const element = await page.find('my-countdown');
    expect(element).toHaveClass('hydrated');
  });

  it('renders changes to the name data', async () => {
    const page = await newE2EPage();

    await page.setContent('<my-countdown></my-countdown>');
    const component = await page.find('my-countdown');
    const element = await page.find('my-countdown figure h2');
    expect(element.textContent).toEqual('Countdown Title');

    component.setProperty('name', 'Test Countdown Title');
    await page.waitForChanges();
    expect(element.textContent).toEqual('Test Countdown Title');
  });

  it('updates over time', async () => {
    const page = await newE2EPage();

    await page.setContent('<my-countdown></my-countdown>');
    const elements = await page.findAll('my-countdown figure div time');
    expect(elements[0].textContent).toEqual('23Hours');
    expect(elements[1].textContent).toEqual('59Minutes');
    expect(elements[2].textContent).toEqual('59Seconds');

    await new Promise(r => setTimeout(r, 2000));
    await page.waitForChanges();
    expect(elements[0].textContent).toEqual('23Hours');
    expect(elements[1].textContent).toEqual('59Minutes');
    expect(elements[2].textContent).toEqual('57Seconds');
  });

  it('finishes', async () => {
    const page = await newE2EPage();

    await page.setContent(`<my-countdown end-date="${new Date().valueOf() + 2000}"></my-countdown>`);
    let element = await page.find('my-countdown figure h3');
    expect(element).toEqual(null);

    await new Promise(r => setTimeout(r, 1500));
    await page.waitForChanges();
    expect(element).toEqual(null);

    await new Promise(r => setTimeout(r, 500));
    await page.waitForChanges();
    element = await page.find('my-countdown figure h3');
    expect(element.textContent).toEqual('Countdown finished');
  });
});
