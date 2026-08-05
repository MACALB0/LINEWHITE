const AxeBuilder = require('@axe-core/playwright');

class AccessibilityPage {
  constructor(page) {
    this.page = page;
  }

  async analizarPagina() {
    return new AxeBuilder({
      page: this.page
    })
      .withTags([
        'wcag2a',
        'wcag2aa',
        'wcag21a',
        'wcag21aa'
      ])
      .analyze();
  }

  obtenerViolacionesCriticas(resultados) {
    return resultados.violations.filter(
      violacion =>
        violacion.impact === 'critical' ||
        violacion.impact === 'serious'
    );
  }
}

module.exports = {
  AccessibilityPage
};