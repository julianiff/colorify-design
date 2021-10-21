import {fixture, expect, html} from '@open-wc/testing';

/**
 * Import compiled index.js file to render WC
 */
import '../../../lib/index.js';

describe('Colorify', () => {
  it('Check Accessibilitiy', async () => {
    const el: any = await fixture(
      html`<colorify-color-picker></colorify-color-picker>`
    );

    expect(el).shadowDom.to.be.accessible();
  });
});
