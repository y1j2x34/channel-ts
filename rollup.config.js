const plugins = require('./build/rollup.plugins');
const pkg = require('./package.json');

function createOutputConfig(file, format, cfg = {}) {
    return Object.assign(
        {
            file,
            format,
            sourcemap: true,
            name: pkg.library,
            exports: 'named'
        },
        cfg || {}
    );
}

module.exports = [
    {
        input: 'src/index.ts',
        output: [
            [pkg.browser, 'umd'],
            [pkg.module, 'es'],
            [pkg.main, 'cjs']
        ].map(confs => createOutputConfig(...confs)),
        plugins: [
            plugins.typescript(),
            plugins.nodeResolve({
                mainFields: ['main', 'browser', 'module']
            }),
            plugins.commonjs({
                include: 'node_modules/**',
                ignore: ['js-base64'],
                sourceMap: false
            })
        ],
        external: ['txon']
    }
];
