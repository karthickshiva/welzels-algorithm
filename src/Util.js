import { Point2D } from "./Circle";
import { createWelZelCircle } from "./Welzel";

export const canvasWidth = 400;
export const canvasHeight = 400;

const originX = canvasWidth / 2;
const originY = canvasHeight / 2;

export const parsePoints = (input) => {
  const lines = input.split(/\r?\n/);
  const newPoints = [];
  for (let i = 0; i < lines.length; i++) {
    let [x, y] = lines[i].split(",");
    if (x && y && !isNaN(x) && !isNaN(y)) {
      [x, y] = [parseFloat(x), parseFloat(y)];
      [x, y] = [originX + x, originY - y];
      newPoints.push(new Point2D(x, y));
    }
  }
  return newPoints;
};

export const drawAxis = (canvas) => {
  const ctx = canvas.getContext("2d");
  ctx.imageSmoothingEnabled = true;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, canvas.height / 2);
  ctx.lineTo(canvas.width, canvas.height / 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(canvas.width / 2, 0);
  ctx.lineTo(canvas.width / 2, canvas.height);
  ctx.stroke();
};

export const clearCanvas = (canvas) => {
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};

export const plotCircle = (canvas, center, radius) => {
  const ctx = canvas.getContext("2d");
  const { x, y } = center;
  const startAngle = 0;
  const endAngle = 2 * Math.PI;
  ctx.imageSmoothingEnabled = true;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(x, y, radius, startAngle, endAngle);
  ctx.stroke();
};

export const plotPoints = (canvas, points) => {
  points.forEach((point) => {
    plotCircle(canvas, point, 1.5);
  });
};

export const plotEnclosingCircle = (canvas, points) => {
  if (points.length === 0) return;
  let minCircle = createWelZelCircle(points);
  if (minCircle != null) {
    const { center, radius } = minCircle;
    plotCircle(canvas, center, Math.sqrt(radius));
  }
};

export function randomInt(min, max) {
  const range = max - min + 1;
  const randomNum = Math.floor(Math.random() * range) + min;
  const sign = Math.random() < 0.5 ? -1 : 1;
  return randomNum * sign;
}
