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
   * preview Color from ColorPicker
   */
  @state()
  private previewColor?: string;

  /**
   * name from Color Element
   */
  @state()
  private name?: string;

  /**
   * Label Colorname
   * @returns
   */
  @property()
  public colorPickerLabel: string = 'Color & Name';

  /**
   * Label Colorname
   * @returns
   */
  @property()
  public colorNameLabel: string = 'Mood up';

  render() {
    return html` ${this.renderColorPicker()} `;
  }

  private renderColorPicker() {
    return html`
      <colorify-stack
        class="container"
        @tile-click-event=${(e: CustomEvent) => this.saveNewColor(e)}
      >
        <colorify-stack direction="row" mobileGap="slim">
          <div><p>${this.colorPickerLabel}</p></div>
          <div>
            <input
              type="color"
              class="search-color"
              name="ColorPicker"
              value="#000000"
              @input=${(e: any) => (this.previewColor = e.target.value)}
            />
          </div>
          <div>
            <input
              type="search"
              class="search-input"
              value=${ifDefined(this.name)}
              @input=${(e: any) => (this.name = e.target.value)}
            />
          </div>
        </colorify-stack>

        <colorify-stack direction="row" mobileGap="slim">
          <div><p>${this.colorNameLabel}</p></div>
          <div>
            <colorify-color-gradient
              hex=${ifDefined(this.previewColor)}
            ></colorify-color-gradient>
          </div>
        </colorify-stack>
      </colorify-stack>
    `;
  }

  /**
   * Send Event to set new color
   */
  private async saveNewColor({detail: {entry}}: CustomEvent) {
    const {hex} = entry;
    const eventOptions = {
      detail: {entry: {name: this.name, hex: hex}},
      bubbles: true,
      composed: true
    };

    this.dispatchEvent(new CustomEvent('set-new-color', eventOptions));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'colorify-color-picker': ColorPicker;
  }
}
