// fragment.glsl
precision mediump float;
uniform sampler2D uTexture;
uniform float uTime;
uniform vec2 uRotation;

varying vec2 vUv;

vec3 rgb2hsv(vec3 c) {
  vec4 K = vec4(0., -1./3., 2./3., -1.);
  vec4 p = mix(vec4(c.bg, K.wz),
               vec4(c.gb, K.xy),
               step(c.b, c.g));
  vec4 q = mix(vec4(p.xyw, c.r),
               vec4(c.r, p.yzx),
               step(p.x, c.r));

  float d = q.x - min(q.w, q.y);
  float e = 1.0e-10;
  return vec3(abs(q.z + (q.w - q.y)/(6. * d + e)), d/(q.x + e), q.x);
}

vec3 hsv2rgb(vec3 c) {
  vec3 p = abs(fract(c.xxx + vec3(0., 1./3., 2./3.)) * 6. - 3.);
  return c.z * mix(vec3(1.), clamp(p - 1., 0., 1.), c.y);
}

void main() {
  vec2 rot = uRotation;
  vec2 baseCenter = vec2(0.8, 0.2);
  vec2 twirlCenter = baseCenter + rot;
  vec2 offset = vUv - twirlCenter;
  float radius = length(offset);
  float angle = atan(offset.y, offset.x);

  float twist = 10. * radius;
  float twistAngle = angle + uTime + twist;

  vec2 twistedUV = vec2(cos(twistAngle), sin(twistAngle)) * radius + twirlCenter;

  vec4 texture = texture2D(uTexture, vUv );
  vec3 invertedTexture = vec3(1.0 - texture.r, 1.0 - texture.g, 1.0 - texture.b);

  float hue = fract(twistAngle / (2.0 * 3.141592));
  float saturation = 0.8;
  float brightness = 1.0;

  vec3 color = hsv2rgb(vec3(hue, saturation, brightness));
  color.r *= 1.81;
  color.g *= 0.85;
  color.b *= 1.27;
  
  float texBrightness = dot(texture.rgb, vec3(0.299, 0.587, 0.114));
  float blendStrength = smoothstep(0., 1.0, texBrightness);

  float brightnessBoost = invertedTexture.b > 0.1 ? 6. : 1.0;

  bool shouldBeTransparent = invertedTexture.b < 0.01 || invertedTexture.r < 0.01 || invertedTexture.g < 0.01;
  vec3 finalColor = texture.rgb * 1. + color;

if(shouldBeTransparent) {
   finalColor = mix(texture.rgb, color, blendStrength * 0.05);
}

  gl_FragColor = vec4(finalColor, texture.a);
}
