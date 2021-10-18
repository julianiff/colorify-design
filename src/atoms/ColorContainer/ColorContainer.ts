import {LitElement, html} from 'lit';
import {customElement} from 'lit/decorators.js';
import style from './style.css';

/**
 * ColorTile Container
 *
 * @slot - Place ColorTiles that
 */
@customElement('colorify-color-container')
export class ColorContainer extends LitElement {
  static styles = [style];

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'colorify-color-container': ColorContainer;
  }
}
