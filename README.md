# gl-big-triangle

[![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)

Draws a big triangle that fills your entire viewport. Intended as a more explicit version of [a-big-triangle](https://github.com/mikolalysenko/a-big-triangle), trading convenience for potential performance improvements when drawing many big triangles per frame.

If you're wondering *why* a big triangle and not a big square made from two smaller triangles, there are potentially significant [performance advantages](http://michaldrobot.com/2014/04/01/gcn-execution-patterns-in-full-screen-passes/) in taking the former approach. There are other cases where [a big square](https://github.com/Jam3/gl-big-quad) is preferable however.

## Usage

[![NPM](https://nodei.co/npm/gl-big-triangle.png)](https://www.npmjs.com/package/gl-big-triangle)

### `triangle = Triangle(gl)`

Takes a `WebGLRenderingContext` and creates a new instance of `gl-big-triangle`.

``` javascript
const Triangle = require('gl-big-triangle')

const canvas = document.createElement('canvas')
const gl = canvas.getContext('webgl')
const triangle = Triangle(gl)
```

### `triangle.bind()`

Binds the triangle's VAO. Must be called at least once before `triangle.draw`.

### `triangle.draw()`

Draws the big triangle to the screen using the currently bound shader.

``` javascript
const Shader = require('gl-shader')
const raf = require('raf')

const vert = `
precision mediump float;

attribute vec2 position;
varying vec2 uv;

void main() {
  uv = position;
  gl_Position = vec4(position, 1, 1);
}
`

const frag = `
precision mediump float;

varying vec2 uv;

void main() {
  gl_FragColor = vec4(uv * 0.5 + 0.5, 1, 1);
}
`

const shader = Shader(gl, vert, frag)

render()
function render () {
  shader.bind()
  triangle.bind()
  triangle.draw()

  // Render again in the next frame
  raf(render)
}
```

### `triangle.unbind()`

Unbinds the triangle's VAO. You should call this when you're finished drawing big triangles, however it's not necessary if you're using [gl-vao](https://github.com/stackgl/gl-vao) or [gl-geometry](https://github.com/stackgl/gl-geometry) for binding your attribute data or *only* drawing big triangles.

## See Also

* [a-big-triangle](https://github.com/mikolalysenko/a-big-triangle)
* [gl-big-quad](https://github.com/Jam3/gl-big-quad)

## License

MIT, see [LICENSE.md](http://github.com/Jam3/gl-big-triangle/blob/master/LICENSE.md) for details.
