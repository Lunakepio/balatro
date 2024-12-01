import { useState } from "react";
import { WebGLCanvas } from "./renderer/WebGLCanvas";
import { Balatro } from "./renderer/Balatro";
import { Game } from "./Game";
import { Card } from "./renderer/Card";

function App() {

  return (
    <div className="App" style={{ width: "100vw", height: "100dvh" }}>
      <WebGLCanvas>
        <Balatro />
        <Card />
      </WebGLCanvas>

      {/* <Game /> */}
    </div>
  );
}

export default App;
