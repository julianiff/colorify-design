import {fixture, expect, html} from '@open-wc/testing';

/**
 * Import compiled index.js file to render WC
 */
import '../../../lib/index.js';

describe('ColorPicker', () => {
  it('Check Accessibilitiy', async () => {
    const el = await fixture(
      html`<colorify-color-picker></colorify-color-picker>`
    );

    expect(el).shadowDom.to.be.accessible();
  });
});
