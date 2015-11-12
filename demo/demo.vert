precision mediump float;

attribute vec2 position;
varying vec2 uv;

void main() {
  gl_Position = vec4(uv = position, 1, 1);
}
