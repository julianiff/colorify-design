import '../../molecules/ColorPicker/ColorPicker';
import '../../atoms/ColorGradient/ColorGradient';
import '../../atoms/ColorContainer/ColorContainer';
import {LitElement, html} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import style from './style.css';
import {
  transformData,
  transformSingleEntry
} from '../../molecules/ColorPicker/lib/transform';

export interface ColorModel {
  id: string;
  name: string;
  hex: string;
}

/**
 * ColorTile Component
 *
 * @slot - Slot of the element for the text
 */
@customElement('colorify-app')
export class Colorify extends LitElement {
  static styles = [style];

  /**
   * Url to fetch Content
   */
  @property()
  public colorifyBackendUrl: string = 'http://localhost:3000/colors';

  /**
   * Internal state to display the colors
   */
  @state()
  private colorTiles: ColorModel[] = [];

  /**
   * Get the inital dataset of colorTiles
   */
  firstUpdated() {
    fetch(this.colorifyBackendUrl)
      .then((item) => item.json())
      .then((jsonReponse) => (this.colorTiles = transformData(jsonReponse)));
  }

  render() {
    return html`
      <colorify-color-picker></colorify-color-picker>

      <colorify-color-container class="color-container">
        ${this.renderColorTiles()}
      </colorify-color-container>
    `;
  }

  private renderColorTiles() {
    return this.colorTiles.map(
      (item) => html`<colorify-color-tile
        name=${item.name}
        hex=${item.hex}
      ></colorify-color-tile>`
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'colorify-app': Colorify;
  }
}
