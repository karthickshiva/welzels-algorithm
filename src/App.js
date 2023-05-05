import { useEffect, useRef, useState } from "react";
import {
  parsePoints,
  drawAxis,
  clearCanvas,
  plotPoints,
  canvasHeight,
  canvasWidth,
  plotEnclosingCircle,
  randomInt
} from "./Util";
import "./styles.css";

function Canvas(props) {
  const canvasRef = useRef(null);
  const style = {
    border: "2px solid"
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    clearCanvas(canvas);
    drawAxis(canvas);
    plotPoints(canvas, props.points);
    plotEnclosingCircle(canvas, props.points);
  }, [props.points]);

  return (
    <canvas
      height={canvasHeight}
      width={canvasWidth}
      ref={canvasRef}
      style={style}
    ></canvas>
  );
}
export default function App() {
  const [points, setPoints] = useState([]);
  const [generatorSize, setGeneratorSize] = useState(10);
  const textareaRef = useRef(null);

  const handlePointsUpdate = (event) => {
    const input = event.target.value;
    const newPoints = parsePoints(input);
    setPoints(newPoints);
  };

  const handleGeneratorSizeUpdate = (event) => {
    const newSize = event.target.value;
    setGeneratorSize(newSize);
  };

  const generateRandomPoints = () => {
    let value = "";
    for (let i = 0; i < generatorSize; i++) {
      const x = randomInt(0, 150);
      const y = randomInt(0, 150);
      value += x + "," + y + "\n";
    }
    const newPoints = parsePoints(value);
    setPoints(newPoints);
    textareaRef.current.value = value;
  };

  return (
    <div className="App">
      <div className="row">Points</div>
      <div className="row">
        <textarea
          rows="10"
          onChange={handlePointsUpdate}
          ref={textareaRef}
        ></textarea>
      </div>
      <div className="row">
        <input
          type="number"
          value={generatorSize}
          size={3}
          onChange={handleGeneratorSizeUpdate}
        />
        <button onClick={generateRandomPoints}>Randomize</button>
      </div>
      <Canvas points={points} className="row" />
    </div>
  );
}
