import {LitElement, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import style from './style.css';
import '../../atoms/ColorTile/ColorTile';

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
        <colorify-color-tile hex=${this.hex}></colorify-color-tile>
        <colorify-color-tile hex=${this.hex}></colorify-color-tile>
        <colorify-color-tile hex=${this.hex}></colorify-color-tile>
      </div>
    `;
  }

  // private doGradientShade(offset: number) {
  //   const decimal = parseInt(this.previewColor?.replace('#', '')!, 16) + offset;

  //   let hex = Number(decimal).toString(16);
  //   return html`
  //     <div
  //       style="display: inline-block; width: 50px; height: 50px; background-color: #${hex}"
  //     >
  //       gradient shade
  //     </div>
  //   `;
  // }
}

declare global {
  interface HTMLElementTagNameMap {
    'colorify-color-gradient': ColorGradient;
  }
}
