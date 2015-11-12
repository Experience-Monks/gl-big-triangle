var WebGLRenderingContext = require('gl')
var Shader = require('gl-shader')
var Triangle = require('../')
var test = require('tape')
var path = require('path')
var fs = require('fs')

test('gl-big-triangle', function (t) {
  var gl = bootstrap()
  var pixels = new Uint8Array(512 * 512 * 4)
  var triangle = Triangle(gl)
  var shader = Shader(gl
    , fs.readFileSync(path.join(__dirname, 'test.vert'), 'utf8')
    , fs.readFileSync(path.join(__dirname, 'test.frag'), 'utf8')
  )

  gl.readPixels(0, 0, 512, 512, gl.RGBA, gl.UNSIGNED_BYTE, pixels)
  t.doesNotThrow(function () {
    for (var i = 0; i < pixels.length;) {
      if (pixels[i++] !== 0) throw new Error('Incorrect pixel')
      if (pixels[i++] !== 0) throw new Error('Incorrect pixel')
      if (pixels[i++] !== 0) throw new Error('Incorrect pixel')
      if (pixels[i++] !== 255) throw new Error('Incorrect pixel')
    }
  }, 'all pixels match!')

  shader.bind()
  triangle.bind()
  triangle.draw()

  gl.readPixels(0, 0, 512, 512, gl.RGBA, gl.UNSIGNED_BYTE, pixels)
  t.doesNotThrow(function () {
    for (var i = 0; i < pixels.length;) {
      if (pixels[i++] !== 0) throw new Error('Incorrect pixel')
      if (pixels[i++] !== 255) throw new Error('Incorrect pixel')
      if (pixels[i++] !== 0) throw new Error('Incorrect pixel')
      if (pixels[i++] !== 255) throw new Error('Incorrect pixel')
    }
  }, 'all pixels match!')

  gl.destroy()
  t.end()
})

function bootstrap () {
  var gl = WebGLRenderingContext(512, 512, {
    preserveDrawingBuffer: true
  })

  gl.clearColor(0, 0, 0, 1)
  gl.clear(gl.COLOR_BUFFER_BIT)

  gl.disable(gl.DEPTH_TEST)
  gl.disable(gl.CULL_FACE)

  return gl
}
