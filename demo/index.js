const Context = require('gl-context')
const Shader = require('gl-shader')
const glslify = require('glslify')
const fit = require('canvas-fit')
const Triangle = require('../')

const canvas = document.body.appendChild(document.createElement('canvas'))
const gl = Context(canvas, render)

const triangle = Triangle(gl)
const shader = Shader(gl
  , glslify('./demo.vert')
  , glslify('./demo.frag')
)

function render () {
  const width = gl.drawingBufferWidth
  const height = gl.drawingBufferHeight

  gl.viewport(0, 0, width, height)

  shader.bind()
  triangle.bind()
  triangle.draw()
}

window.addEventListener('resize'
  , fit(canvas)
  , false
)
