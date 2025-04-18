precision mediump float;
uniform sampler2D uTexture;
uniform float uTime;
uniform vec2 uRotation;

varying vec2 vUv;
varying vec3 vPosition;

vec2 rand2(vec2 p) {
    p = fract(p * vec2(5.3983, 5.4427));
    p += dot(p, p + 3.5453123);
    return fract(vec2(p.x * p.y, p.x + p.y));
}

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

vec3 applyContrast(vec3 color, float contrast) {
  return (color - 0.5) * contrast + 0.5;
}
vec2 twirlUV(vec2 uv, vec2 center, float strength, float branches) {
    vec2 offset = uv - center;
    float dist = length(offset);
    float baseAngle = atan(offset.y, offset.x);
    
    float twirlAngle = strength * (1.0 - dist) * branches;
    float angle = baseAngle + twirlAngle;

    vec2 result;
    result.x = cos(angle) * dist;
    result.y = sin(angle) * dist;

    return center + result;
}
vec2 tileAndOffset(vec2 uv, vec2 tiling, vec2 offset) {
    return uv * tiling + offset;
}

float voronoi(vec2 uv) {
    vec2 g = floor(uv);
    vec2 f = fract(uv);
    float res = 1.0;
    for (int y = -1; y <= 1; y++) {
        for (int x = -1; x <= 1; x++) {
            vec2 b = vec2(x, y);
            vec2 r = vec2(b) - f + rand2(g + b);
            res = min(res, length(r));
        }
    }
    return res;
}

float shapedVoronoi(vec2 uv) {
    float v = voronoi(uv);
    v = pow(v, 10.0);
    return v;
}

void main() {
    vec4 texture = texture2D(uTexture, vUv);
    vec3 negativeTexture = vec3(1. - texture.rgb);
    
    vec2 center = vec2(0.45 + uRotation.x, 0.5);
    float twirlStrength = 2.0;
    float branches = 2.0;
    vec2 uvTwirled = twirlUV(vUv * .2, center, twirlStrength, branches);

    vec2 uvTiled = tileAndOffset(uvTwirled, vec2(2.10), vec2(0.95));

    float pattern = shapedVoronoi(uvTiled);
    pattern = pow(pattern, 1.3); 

    bool shouldBeTransparent = negativeTexture.b < 0.001 || negativeTexture.g < 0.001;
    vec3 textureColor = applyContrast(negativeTexture.rgb, 0.6);
    vec3 voronoiColor = vec3(pattern);

    if(!shouldBeTransparent){
        voronoiColor *= 40.;
    } else {
        voronoiColor *= 3.;
    }
    textureColor *= 1. + voronoiColor;

    gl_FragColor = vec4(textureColor, texture.a);
}
