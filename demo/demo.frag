precision mediump float;

varying vec2 uv;

void main() {
  gl_FragColor = vec4(abs(uv), 0.5, 1);
}
