var tchPlanet_vert = `
uniform vec3 uSunPosition;
uniform mat4 uMatrix;

in vec3 vPosition;
in vec2 vTexCoords;
in vec3 vNormal;

out float fLight;
out vec2 fTexCoords;

void main() {
    fLight = dot(vNormal, normalize(uSunPosition - vPosition));
    fTexCoords = vTexCoords;
    gl_Position = uMatrix * vec4(vPosition, 1.0);
}
`