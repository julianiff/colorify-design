import {fixture, expect, html} from '@open-wc/testing';

/**
 * Import compiled index.js file
 */
import '../../../lib/index.js';

describe('Stack', () => {
  it('Compare Shadowroot innerHTML to be stable', async () => {
    const el = await fixture(html`<colorify-stack></colorify-stack>`);

    const shadowroot = el.shadowRoot!.innerHTML;
    expect(shadowroot).to.equal('<!----><slot></slot>');
  });

  it('Check input and output of element', async () => {
    const el: any = await fixture(
      html`<colorify-stack direction="row"></colorify-stack>`
    );

    expect(el.direction).to.equal('row');
  });
});
