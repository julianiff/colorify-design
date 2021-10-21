import {fixture, expect, html} from '@open-wc/testing';

/**
 * Import compiled index.js file to render WC
 */
import '../../../lib/index.js';

describe('ColorContainer', () => {
  it('Compare Shadowroot innerHTML to be stable', async () => {
    const el = await fixture(
      html`<colorify-color-gradient></colorify-color-gradient>`
    );

    const shadowroot = el.shadowRoot!.innerHTML;
    expect(shadowroot).to.equal(
      '<!----><div class="gradient-container"><colorify-color-tile hex="#f5df66"></colorify-color-tile><colorify-color-tile hex="#f5df5c"></colorify-color-tile><colorify-color-tile hex="#f5df4d"></colorify-color-tile><colorify-color-tile hex="#f5df3e"></colorify-color-tile><colorify-color-tile hex="#f5df34"></colorify-color-tile></div>'
    );
  });
});
