import {LitElement, html, nothing} from 'lit';
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

  /**
   * Id of the Color
   */
  @property()
  public colorId?: string;

  render() {
    const backgroundColor = {
      '--colorify__color-tile--background': this.hex
    };

    return html`<div
      style=${styleMap(backgroundColor)}
      @click=${() => this.dispatchClickEvent()}
    >
      ${this.renderName()}${this.hex}
    </div>`;
  }

  private dispatchClickEvent() {
    const eventOptions = {
      detail: {entry: {id: this.colorId}},
      bubbles: true,
      composed: true
    };

    this.dispatchEvent(new CustomEvent('tile-click-event', eventOptions));
  }

  private renderName() {
    return html` ${!!this.name ? `${this.name} - ` : nothing} `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'colorify-color-tile': ColorTile;
  }
}
