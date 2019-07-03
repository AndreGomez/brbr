export default centerCoordinates = (points) => {
  let minX, maxX, minY, maxY;

  ((point) => {
    minX = point.latitude;
    maxX = point.latitude;
    minY = point.longitude;
    maxY = point.longitude;
  })(points[0]);

  points.map((point) => {
    minX = Math.min(minX, point.latitude);
    maxX = Math.max(maxX, point.latitude);
    minY = Math.min(minY, point.longitude);
    maxY = Math.max(maxY, point.longitude);
  });

  const midX = (minX + maxX) / 2;
  const midY = (minY + maxY) / 2;
  var deltaX = (maxX - minX);
  var deltaY = (maxY - minY);

  if (deltaX < 2 && deltaY < 2) {
    deltaX = deltaX + 0.01
  }

  for (let index = 0; index < parseInt(deltaX / 2); index++) {
    deltaX = deltaX + 0.01
  }
  for (let index = 0; index < parseInt(deltaY / 2); index++) {
    deltaX = deltaX + 0.01
  }

  return {
    latitude: midX,
    longitude: midY,
    latitudeDelta: deltaX,
    longitudeDelta: deltaY
  };
}