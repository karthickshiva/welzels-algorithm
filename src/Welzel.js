import Circle from "./Circle";

export function createWelZelCircle(points) {
  let minCircle = null;
  let supportSet = [];
  if (points.length > 1) {
    shuffleArray(points);
    let p = points[0];
    let totalPoints = points.length;
    minCircle = new Circle(p);
    let index = 1;
    supportSet.push(p);
    while (index < totalPoints) {
      let pi = points[index];
      if (!supportSet.some((p) => p === pi) && !minCircle.contains(pi)) {
        let newCircle = updateCircle(supportSet, pi);
        if (newCircle && newCircle.radius > minCircle.radius) {
          minCircle = newCircle;
          index = 0;
          continue;
        }
      }
      index++;
    }
  }
  return minCircle;
}

function updateCircle(supportSet, point) {
  let updatedCircle = null;
  const supportSetSize = supportSet.length;
  switch (supportSetSize) {
    case 1:
      updatedCircle = updateCircleWithOnePoint(supportSet, point);
      break;
    case 2:
      updatedCircle = updateCircleWithTwoPoints(supportSet, point);
      break;
    case 3:
      updatedCircle = updateCircleWithThreePoints(supportSet, point);
      break;
    default:
      break;
  }
  return updatedCircle;
}

function updateCircleWithOnePoint(supportSet, point) {
  supportSet.push(point);
  const p0 = supportSet[0];
  return new Circle(p0, point);
}

function updateCircleWithTwoPoints(supportSet, point) {
  const p0 = supportSet[0];
  const p1 = supportSet[1];
  const circles = new Array(3);
  let minRadius = Infinity;
  let index = -1;
  circles[0] = new Circle(p0, point);
  if (circles[0].contains(p1)) {
    minRadius = circles[0].radius;
    index = 0;
  }
  circles[1] = new Circle(p1, point);
  if (circles[1].radius < minRadius && circles[1].contains(p0)) {
    index = 1;
  }
  let minCircle;
  if (index !== -1) {
    minCircle = circles[index];
    supportSet[1 - index] = point;
  } else {
    minCircle = new Circle(p0, p1, point);
    supportSet.push(point);
  }
  return minCircle;
}

function updateCircleWithThreePoints(supportSet, point) {
  let circles = new Array(6);
  let minRadius = Infinity;
  let index = -1;
  const p0 = supportSet[0];
  const p1 = supportSet[1];
  const p2 = supportSet[2];
  const p3 = point;
  circles[0] = new Circle(p0, p3);
  if (circles[0].contains(p1) && circles[0].contains(p2)) {
    minRadius = circles[0].radius;
    index = 0;
  }

  circles[1] = new Circle(p1, p3);
  if (
    circles[1].radius < minRadius &&
    circles[1].contains(p0) &&
    circles[1].contains(p2)
  ) {
    minRadius = circles[1].radius;
    index = 1;
  }

  circles[2] = new Circle(p2, p3);
  if (
    circles[2].radius < minRadius &&
    circles[2].contains(p0) &&
    circles[2].contains(p1)
  ) {
    minRadius = circles[2].radius;
    index = 2;
  }

  circles[3] = new Circle(p0, p1, p3);
  if (circles[3].radius < minRadius && circles[3].contains(p2)) {
    minRadius = circles[3].radius;
    index = 3;
  }

  circles[4] = new Circle(p0, p2, p3);
  if (circles[4].radius < minRadius && circles[4].contains(p1)) {
    minRadius = circles[4].radius;
    index = 4;
  }

  circles[5] = new Circle(p1, p2, p3);
  if (circles[5].radius < minRadius && circles[5].contains(p0)) {
    minRadius = circles[5].radius;
    index = 5;
  }

  let minCircle = circles[index];

  switch (index) {
    case 0:
      supportSet.slice(0, 2);
      supportSet[1] = point;
      break;
    case 1:
      supportSet.slice(0, 2);
      supportSet[0] = point;
      break;
    case 2:
      const op = supportSet[2];
      supportSet.slice(0, 2);
      supportSet[0] = op;
      supportSet[1] = point;
      break;
    case 3:
      supportSet[2] = point;
      break;
    case 4:
      supportSet[1] = point;
      break;
    case 5:
      supportSet[0] = point;
      break;
    default:
      break;
  }
  return minCircle;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
