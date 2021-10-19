import '../../atoms/Stack/Stack';
import '../../atoms/ColorGradient/ColorGradient';
import '../../atoms/ColorTile/ColorTile';
import '../../atoms/ColorContainer/ColorContainer';
import {LitElement, html} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import style from './style.css';
import {ifDefined} from 'lit/directives/if-defined.js';

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
   * preview Color from ColorPicker
   */
  @state()
  private previewColor?: string;

  render() {
    return html` ${this.renderColorPicker()} `;
  }

  private renderColorPicker() {
    return html`
      <colorify-stack>
        <colorify-color-gradient
          hex=${ifDefined(this.previewColor)}
        ></colorify-color-gradient>

        <input
          type="color"
          id="head"
          name="ColorPicker"
          value="#e66465"
          @input=${(e: any) => (this.previewColor = e.target.value)}
        />
        <label for="head">ColorPicker</label>
        <!-- <div
        style="display: inline-block; width: 50px; height: 50px; background-color: ${this
          .previewColor}"
        @click="${() => this.saveNewColor()}"
      >
        add color
      </div> -->
      </colorify-stack>
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

    // add custom event to propage up
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'colorify-color-picker': ColorPicker;
  }
}
