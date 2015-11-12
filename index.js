var createBuffer = require('gl-buffer')
var createVAO = require('gl-vao')

module.exports = GLBigTriangle

function GLBigTriangle (gl) {
  if (!(this instanceof GLBigTriangle)) {
    return new GLBigTriangle(gl)
  }

  this.gl = gl
  this.vao = createVAO(gl, [{
    size: 2,
    type: gl.FLOAT,
    buffer: createBuffer(gl, new Float32Array([
      -1, -1, -1,
      +4, +4, -1
    ]))
  }])
}

GLBigTriangle.prototype.bind = function () {
  this.vao.bind()
}

GLBigTriangle.prototype.draw = function () {
  this.gl.drawArrays(this.gl.TRIANGLES, 0, 3)
}

GLBigTriangle.prototype.unbind = function () {
  this.vao.unbind()
}
