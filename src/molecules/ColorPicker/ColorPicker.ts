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

  /**
   * name from Color Element
   */
  @state()
  private name?: string;

  render() {
    return html` ${this.renderColorPicker()} `;
  }

  private renderColorPicker() {
    return html`
      <colorify-stack>
        <colorify-stack direction="row">
          <colorify-color-gradient
            hex=${ifDefined(this.previewColor)}
          ></colorify-color-gradient>
          <input
            type="color"
            class="search-color"
            name="ColorPicker"
            value="#000000"
            @input=${(e: any) => (this.previewColor = e.target.value)}
          />
          <input
            type="search"
            class="search-input"
            value=${ifDefined(this.name)}
            @input=${(e: any) => (this.name = e.target.value)}
          />
          <input
            type="submit"
            value="save"
            @click="${() => this.saveNewColor()}"
          />
        </colorify-stack>
      </colorify-stack>
    `;
  }

  private async saveNewColor() {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name: this.name, hex: this.previewColor})
    };
    const url = `http://localhost:3000/color/add`;

    const server = await (await fetch(url, options)).json();
    if (!server.error) {
      const eventOptions = {
        detail: {entry: server.response},
        bubbles: true,
        composed: true
      };

      this.dispatchEvent(new CustomEvent('set-new-color', eventOptions));
    } else {
      console.error('err');
    }

    // add custom event to propage up
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'colorify-color-picker': ColorPicker;
  }
}
