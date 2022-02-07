import { execSync } from 'child_process';
import fs from 'fs';
import babel from '@rollup/plugin-babel';
import typescript from '@rollup/plugin-typescript';
import del from 'rollup-plugin-delete';
import styles from 'rollup-plugin-styles';

const yalcPublisher = () =>
    // eslint-disable-next-line no-undef
    process.argv.includes( '--yalc' )
        ? {
            writeBundle: () =>
            {
                execSync( 'yalc publish --push', {
                    stdio: 'inherit'
                } );
            }
        }
        : {};

export default {
    input: 'src/index.ts',
    external: id => !( id.startsWith( '.' ) || id.startsWith( '/' ) ),
    output: [
        {
            dir: './dist',
            format: 'es',
            preserveModules: true,
            entryFileNames: '[name].js',
            assetFileNames: '[name]-[hash][extname]'
        }
    ],
    plugins: [
        del( { runOnce: true, targets: [ './dist/**/*' ] } ),
        typescript(),
        babel( {
            exclude: 'node_modules/**',
            extensions: [ '.ts', '.tsx' ],
            babelHelpers: 'bundled',
            presets: [ 'solid' ]
            // presets: [ '@babel/env', 'solid' ]
        } ),
        styles(),
        {
            modules: true,
            writeBundle ()
            {
                fs.writeFileSync( './dist/src/package.json', JSON.stringify( { type: 'module' }, null, '  ' ) );
            }
        },
        // postcssM( {
        //     // extract: true,  // extracts to `${basename(dest)}.css`
        //     extract: 'src/index.css'
        //     // plugins: [ autoprefixer() ],
        //     // writeDefinitions: true,
        //     // modules: true
        // } ),
        // postcss( {
        //     modules: true,
        //     // extract: true,
        //     // extract: 'src/index.css',
        //     namedExports: true,
        //     plugins: [
        //         // cssurl( {
        //         //     url: 'inline'
        //         // } ),
        //         env(),
        //         autoprefixer()
        //     ]
        // } ),
        // scss(),
        /*         resolve( {

            // the fields to scan in a package.json to determine the entry point
            // if this list contains "browser", overrides specified in "pkg.browser"
            // will be used

            // DEPRECATED: use "mainFields" instead
            // use "module" field for ES6 module if possible
            module: true, // Default: true

            // DEPRECATED: use "mainFields" instead
            // use "jsnext:main" if possible
            // legacy field pointing to ES6 module in third-party libraries,
            // deprecated in favor of "pkg.module":
            // - see: https://github.com/rollup/rollup/wiki/pkg.module
            jsnext: true,  // Default: false

            // DEPRECATED: use "mainFields" instead
            // use "main" field or index.js, even if it's not an ES6 module
            // (needs to be converted from CommonJS to ES6)
            // – see https://github.com/rollup/rollup-plugin-commonjs
            main: true,  // Default: true

            // some package.json files have a "browser" field which specifies
            // alternative files to load for people bundling for the browser. If
            // that's you, either use this option or add "browser" to the
            // "mainfields" option, otherwise pkg.browser will be ignored
            browser: true,  // Default: false

            // not all files you want to resolve are .js files
            extensions: [ '.mjs', '.js', '.jsx', '.json' ],  // Default: [ '.mjs', '.js', '.json', '.node' ]

            // whether to prefer built-in modules (e.g. `fs`, `path`) or
            // local ones with the same names
            preferBuiltins: false,  // Default: true

            // Lock the module search in this path (like a chroot). Module defined
            // outside this path will be marked as external
            jail: '/my/jail/path', // Default: '/'

            // Set to an array of strings and/or regexps to lock the module search
            // to modules that match at least one entry. Modules not matching any
            // entry will be marked as external
            only: [ 'some_module', /^@some_scope\/.*$/ ], // Default: null

            // If true, inspect resolved files to check that they are
            // ES2015 modules
            modulesOnly: true, // Default: false

            // Force resolving for these modules to root's node_modules that helps
            // to prevent bundling the same package multiple times if package is
            // imported from dependencies.
            dedupe: [ 'react', 'react-dom' ], // Default: []

            // Any additional options that should be passed through
            // to node-resolve
            customResolveOptions: {
                moduleDirectory: 'js_modules'
            }
        } ), */
        yalcPublisher()
    ]
};
