import '../../atoms/ColorTile/ColorTile';
import '../../atoms/ColorContainer/ColorContainer';
import {LitElement, html} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import style from './style.css';
import {ColorModel} from '../../atoms/ColorTile/ColorTile';
import {transformData, transformSingleEntry} from './lib/transform';

/**
 * ColorPicker Component
 *
 */
@customElement('colorify-color-picker')
export class ColorPicker extends LitElement {
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
   * preview Color from ColorPicker
   */
  @state()
  private previewColor?: string;

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
      ${this.renderColorPicker()}

      <colorify-color-container class="color-container">
        ${this.renderColorTiles()}
      </colorify-color-container>
    `;
  }

  private renderColorPicker() {
    return html`
      <input
        type="color"
        id="head"
        name="ColorPicker"
        value="#e66465"
        @input=${(e: any) => (this.previewColor = e.target.value)}
      />
      <label for="head">ColorPicker</label>
      <div
        style="display: inline-block; width: 50px; height: 50px; background-color: ${this
          .previewColor}"
        @click="${() => this.saveNewColor()}"
      >
        add color
      </div>
    `;
  }

  private async saveNewColor() {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name: 'name', hex: this.previewColor})
    };
    const url = `http://localhost:3000/color/add`;

    const response = await (await fetch(url, options)).json();

    if (!response.error) {
      console.log(response);
      this.colorTiles = [
        transformSingleEntry(response.response),
        ...this.colorTiles
      ];
    }
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
    'colorify-color-picker': ColorPicker;
  }
}
