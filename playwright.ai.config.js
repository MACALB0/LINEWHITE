const {
    defineConfig,
    devices
} = require('@playwright/test');

module.exports = defineConfig({

    /*
     * Solo ejecuta los E2E generados mediante IA.
     */
    testDir: './tests/ai-generated/e2e',

    /*
     * Evita que Playwright intente interpretar
     * los archivos Gherkin o sus steps como tests.
     */
    testIgnore: [
        '**/*.feature',
        '**/steps/**',
        '**/pages/**'
    ],

    fullyParallel: false,

    workers: 1,

    forbidOnly: Boolean(process.env.CI),

    retries: 0,

    timeout: 60_000,

    expect: {
        timeout: 10_000
    },

    reporter: [
        ['list'],
        [
            'html',
            {
                outputFolder: 'reports/playwright-ai-html',
                open: 'never'
            }
        ]
    ],

    use: {

        baseURL:
            process.env.BASE_URL ||
            'http://127.0.0.1:7055',

        headless: true,

        screenshot: 'only-on-failure',

        trace: 'retain-on-failure',

        video: 'retain-on-failure',

        actionTimeout: 15_000,

        navigationTimeout: 30_000
    },

    outputDir:
        'reports/test-results-ai',

    projects: [
        {
            name: 'chromium',
            use: {
                ...devices['Desktop Chrome']
            }
        }
    ],

    /*
     * Igual que tu configuración E2E principal:
     * Playwright inicia Express automáticamente.
     */
    webServer: {

        command: 'node ./bin/www',

        url: 'http://127.0.0.1:7055',

        reuseExistingServer: false,

        timeout: 120_000,

        env: {
            ...process.env,

            NODE_ENV: 'test',

            PORT: '7055',

            SESSION_SECRET:
                process.env.SESSION_SECRET ||
                'qa-ai-playwright-secret'
        }
    }
});