var tchPlanet_frag = `
precision mediump float;

in vec2 fTexCoords;
in float fLight;

out vec4 fragColor;

void main(){
     fragColor = vec4(fTexCoords, fLight, 1.0);
}
`