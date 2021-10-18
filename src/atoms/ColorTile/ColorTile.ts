import {LitElement, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import style from './style.css';
import {styleMap} from 'lit-html/directives/style-map.js';

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
@customElement('colorify-color-tile')
export class ColorTile extends LitElement {
  static styles = [style];

  /**
   * Name of the Color
   */
  @property()
  public name: string = '';

  /**
   * Hex Colorcode
   */
  @property()
  public hex: string = '#966A60';

  render() {
    return html`<div
      style=${styleMap({
        '--colorify__color-tile--background': `${this.hex}`
      })}
    >
      ${this.name}${this.hex}
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'colorify-color-tile': ColorTile;
  }
}
