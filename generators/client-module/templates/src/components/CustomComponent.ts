import { store } from '@m2fw/redux-manager'
import {
  customElement,
  LitElement,
  property,
  html,
  TemplateResult
} from 'lit-element'
import { connect } from 'pwa-helpers/connect-mixin'

@customElement('<%= moduleName %>')
export class <%= uccModuleName %> extends connect(store)(LitElement) {
  @property({ type: Array }) pages: []

  render(): TemplateResult {
    return html`
      <h2><%= uccModuleName %></h2>
    `
  }

  stateChanged(state: any) {
    console.log('<%= uccModuleName %> State Changed', state)
  }
}
