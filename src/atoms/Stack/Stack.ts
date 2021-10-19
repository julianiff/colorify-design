import {LitElement, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import style from './style.css';

/**
 * Stack Component to align items
 *
 * @slot - Slot for the Content
 */
@customElement('colorify-stack')
export class Stack extends LitElement {
  static styles = [style];

  @property({reflect: true})
  public direction?: string;

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'colorify-stack': Stack;
  }
}
