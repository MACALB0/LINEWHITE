const {
  test,
  expect
} = require('@playwright/test');

const {
  LoginPage
} = require('./pages/LoginPage');

const {
  AccessibilityPage
} = require('./pages/AccessibilityPage');

test.describe('Accesibilidad con Axe', () => {
  test('La página de login no debe tener violaciones críticas o serias', async ({
    page
  }) => {
    const loginPage = new LoginPage(page);
    const accessibilityPage =
      new AccessibilityPage(page);

    await loginPage.visitar();

    const resultados =
      await accessibilityPage.analizarPagina();

    const violacionesCriticas =
      accessibilityPage.obtenerViolacionesCriticas(
        resultados
      );

    console.log(
      `Violaciones encontradas: ${resultados.violations.length}`
    );

    for (const violacion of resultados.violations) {
      console.log(
        `${violacion.id} - ${violacion.impact} - ${violacion.help}`
      );
    }

    expect(violacionesCriticas).toHaveLength(0);
  });
});