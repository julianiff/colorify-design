import '../../molecules/ColorPicker/ColorPicker';
import '../../atoms/ColorGradient/ColorGradient';
import '../../atoms/ColorContainer/ColorContainer';
import {LitElement, html} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import {animate, flyAbove, fadeOut} from '@lit-labs/motion';
import style from './style.css';
import {transformData, transformSingleEntry} from './lib/transform';

export interface ColorModel {
  id: string;
  name: string;
  hex: string;
}
/**
 * Colorify Base App
 * Manages internal state and fetches data
 *
 */
@customElement('colorify-app')
export class Colorify extends LitElement {
  static styles = [style];

  /**
   * Base Url to backend API
   */
  @property()
  public colorifyBackendUrl: string = 'http://localhost:3000';

  /**
   * Internal state to display the colors
   */
  @state()
  private colorTiles: ColorModel[] = [];

  /**
   * Get the inital dataset of colorTiles
   */
  firstUpdated() {
    fetch(`${this.colorifyBackendUrl}/colors`)
      .then((item) => item.json())
      .then((jsonReponse) => (this.colorTiles = transformData(jsonReponse)));
  }

  render() {
    return html`
      <div class="head-space"></div>
      <colorify-color-picker
        @set-new-color=${(e: CustomEvent) => this.addNewColor(e)}
      ></colorify-color-picker>

      <colorify-color-container
        class="color-container"
        @tile-click-event=${(e: CustomEvent) => this.removeColor(e)}
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

  private async addNewColor({
    detail: {
      entry: {name, hex}
    }
  }: CustomEvent) {
    const url = `${this.colorifyBackendUrl}/color/add`;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name, hex})
    };

    const server = await (await fetch(url, options)).json();

    if (!server.error) {
      this.colorTiles = [
        ...this.colorTiles,
        transformSingleEntry(server.response)
      ];
    } else {
      console.error('Error:', server.message);
    }
  }

  private async removeColor({detail: {entry}}: CustomEvent) {
    const url = `${this.colorifyBackendUrl}/color/${entry.id}/remove`;

    const server = await (await fetch(url)).json();
    if (!server.error) {
      this.colorTiles = this.colorTiles.filter((item) => item.id !== entry.id);
    } else {
      console.error('Error:', server.message);
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'colorify-app': Colorify;
  }
}
