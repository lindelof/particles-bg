import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import copy from 'rollup-plugin-copy'
import external from 'rollup-plugin-peer-deps-external'
import postcss from 'rollup-plugin-postcss'
import resolve from 'rollup-plugin-node-resolve'
import url from 'rollup-plugin-url'
import svgr from '@svgr/rollup'

import pkg from './package.json'

export default {
  input: 'src/index.js',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true
    }
  ],
  external: ['react', 'proton-engine','raf-manager'],
  plugins: [
    copy({
      targets: [{ src: 'src/index.d.ts', dest: 'dist' }]
    }),
    external(),
    postcss({
      modules: true
    }),
    url(),
    //svgr(),
    babel({
      exclude: 'node_modules/**',
      plugins: [ 'external-helpers' ]
    }),
    resolve(),
    commonjs()
  ]
}
