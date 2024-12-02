import { WebGLCanvas } from "./renderer/WebGLCanvas";
import { Balatro } from "./renderer/Balatro";
import { Game } from "./Game";
// import { Card } from "./renderer/Card";
import { Slot } from "./renderer/Slot";

function App() {
  return (
    <div className="App" style={{ width: "100vw", height: "100dvh" }}>
      <WebGLCanvas>
        <Balatro />
        <group position={[0, 0, 0]}>
          <Slot />

          {/* <Card /> */}
        </group>
        {/* <directionalLight
        intensity={0.25}
        position={[0, 1, 3]}
        castShadow
        shadow-mapSize-height={2048}
        shadow-mapSize-width={2048}
        shadow-camera-far={10}
        shadow-camera-near={0}
        shadow-camera-bottom={-5}
        shadow-camera-top={5}
        shadow-camera-right={5}
        shadow-camera-left={-5}
      /> */}
      </WebGLCanvas>

      {/* <Game /> */}
    </div>
  );
}

export default App;
