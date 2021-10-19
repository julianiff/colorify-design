import '../../molecules/ColorPicker/ColorPicker';
import '../../atoms/ColorGradient/ColorGradient';
import '../../atoms/ColorContainer/ColorContainer';
import {LitElement, html} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import {animate, flyAbove, fadeOut} from '@lit-labs/motion';
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
      <colorify-color-picker
        @set-new-color=${(e: any) => this.addNewColor(e)}
      ></colorify-color-picker>

      <colorify-color-container
        class="color-container"
        @tile-click-event=${(e: any) => this.removeColor(e)}
      >
        ${this.renderColorTiles()}
      </colorify-color-container>
    `;
  }

  private renderColorTiles() {
    return this.colorTiles.map(
      (item) => html`<colorify-color-tile
        ${animate({
          in: flyAbove,
          out: fadeOut
        })}
        name=${item.name}
        hex=${item.hex}
        colorId=${item.id}
      ></colorify-color-tile>`
    );
  }

  private addNewColor({detail: {entry}}: any) {
    this.colorTiles = [...this.colorTiles, transformSingleEntry(entry)];
  }

  private async removeColor({detail: {entry}}: any) {
    const url = `http://localhost:3000/color/${entry.id}/remove`;

    const server = await (await fetch(url)).json();
    if (!server.error) {
      this.colorTiles = this.colorTiles.filter((item) => item.id !== entry.id);
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'colorify-app': Colorify;
  }
}
