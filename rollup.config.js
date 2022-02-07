import babel from '@rollup/plugin-babel';
import resolve from "@rollup/plugin-node-resolve";
import typescript from '@rollup/plugin-typescript';
import { execSync } from 'child_process';
import fs from 'fs';
import del from 'rollup-plugin-delete';
import styles from 'rollup-plugin-styles';

const extensions = [".ts", ".mjs", ".js", ".json"];
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
            dir: 'dist',
            format: 'es',
            preserveModules: true,
            entryFileNames: '[name].js',
            assetFileNames: '[name]-[hash][extname]'
        }
    ],
    plugins: [
        del( { runOnce: true, targets: [ './dist/**/*' ] } ),
        typescript(),
        resolve({ preferBuiltins: true, extensions }),
        babel( {
            exclude: 'node_modules/**',
            extensions: [ '.ts', '.tsx' ],
            babelHelpers: 'bundled',
            presets: [ 'solid' ]
        } ),
        styles(),
        {
            modules: true,
            autoModules: true,
            writeBundle ()
            {
                fs.writeFileSync( './dist/src/package.json', JSON.stringify( { type: 'module' }, null, '  ' ) );
            }
        },
        // rename({
        //     include: ['**/*.js', '**/*.mjs'],
        //     map: (name) => name.replace('node_modules/', 'external/'),
        // }),
        // replace({
        //     preventAssignment: true,
        //     values: {
        //         'node_modules/': 'external/'
        //     },
        //     delimiters: ['', '']
        // }),
        yalcPublisher()
    ]
};
