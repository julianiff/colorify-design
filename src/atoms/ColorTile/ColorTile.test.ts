import {fixture, expect, html} from '@open-wc/testing';

/**
 * Import compiled index.js file to render WC
 */
import '../../../lib/index.js';

describe('ColorTile', () => {
  it('Check name and hex code set correctly', async () => {
    const el: any = await fixture(
      html`<colorify-color-tile
        name="best Color"
        hex="#hex"
      ></colorify-color-tile>`
    );

    const {hex, name} = el;
    expect(hex).to.equal('#hex');
    expect(el.renderName().values[0]).to.equal(`${name} / `);
    expect(name).to.equal('best Color');
  });

  it('Check name rendering to be correct', async () => {
    const el: any = await fixture(
      html`<colorify-color-tile
        name="best Color"
        hex="#hex"
      ></colorify-color-tile>`
    );

    const {name} = el;
    expect(el.renderName().values[0]).to.equal(`${name} / `);
  });
});
