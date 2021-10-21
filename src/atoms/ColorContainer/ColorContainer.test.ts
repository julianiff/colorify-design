import {fixture, expect, html} from '@open-wc/testing';

/**
 * Import compiled index.js file to render WC
 */
import '../../../lib/index.js';

describe('ColorContainer', () => {
  it('Compare Shadowroot innerHTML to be stable', async () => {
    const el = await fixture(
      html`<colorify-color-container></colorify-color-container>`
    );

    const gradientContainer = el.shadowRoot!.innerHTML;

    expect(gradientContainer).to.equal('<!----><slot></slot>');
  });
});
