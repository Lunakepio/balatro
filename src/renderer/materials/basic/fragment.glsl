// fragment.glsl
precision mediump float;
uniform sampler2D uTexture;
uniform float uTime;
uniform vec2 uRotation;

varying vec2 vUv;

void main() {

    vec4 texture = texture2D(uTexture, vUv);
  gl_FragColor = vec4(texture.rgb, texture.a);
}
