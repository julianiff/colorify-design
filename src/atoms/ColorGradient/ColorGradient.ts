import '../../atoms/ColorTile/ColorTile';
import {LitElement, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import style from './style.css';

/**
 * ColorTile Component
 *
 * @slot - Slot of the element for the text
 */
@customElement('colorify-color-gradient')
export class ColorGradient extends LitElement {
  static styles = [style];

  /**
   * Hex Colorcode
   */
  @property()
  public hex: string = '#F5DF4D';

  render() {
    return html`
      <div class="gradient-container">
        <colorify-color-tile hex=${this.gradiating(+25)}></colorify-color-tile>
        <colorify-color-tile hex=${this.gradiating(0)}></colorify-color-tile>
        <colorify-color-tile hex=${this.gradiating(-25)}></colorify-color-tile>
      </div>
    `;
  }

  private gradiating(offset: number) {
    const decimal = parseInt(this.hex?.replace('#', '')!, 16) + offset;
    const shading = `#${Number(decimal).toString(16)}`;
    return shading;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'colorify-color-gradient': ColorGradient;
  }
}
