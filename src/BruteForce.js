import Circle from "./Circle";

export function bruteForce(points) {
  let minimumCircle = new Circle();
  for (let i = 0; i < points.length; i++) {
    let circle = new Circle(points[i]);
    if (
      isAllInsideCircle(circle, points) &&
      circle.radius < minimumCircle.radius
    ) {
      minimumCircle = circle;
      console.log(minimumCircle);
    }
  }

  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      let circle = new Circle(points[i], points[j]);
      if (
        isAllInsideCircle(circle, points) &&
        circle.radius < minimumCircle.radius
      ) {
        minimumCircle = circle;
        console.log(minimumCircle);
      }
    }
  }

  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      for (let k = j + 1; k < points.length; k++) {
        let circle = new Circle(points[i], points[j], points[k]);
        if (
          isAllInsideCircle(circle, points) &&
          circle.radius < minimumCircle.radius
        ) {
          minimumCircle = circle;
          console.log(minimumCircle);
        }
      }
    }
  }

  return minimumCircle;
}

function isAllInsideCircle(circle, points) {
  for (let i = 0; i < points.length; i++) {
    if (!circle.contains(points[i])) return false;
  }
  return true;
}
