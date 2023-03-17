function binarySearch(list, value) {
  console.log('list:', list.length);
  let start = 0;
  let end = list.length - 1;
  let tempIndex = null;

  while (start <= end) {
    let midIndex = parseInt((start + end) / 2);
    let midValue = list[midIndex].bottom;
    if (midValue === value) {
      return midIndex + 1;
    } else if (midValue < value) {
      start = midIndex + 1;
    } else if (midValue > value) {
      if (tempIndex === null || tempIndex > midIndex) {
        tempIndex = midIndex;
      }
      end = end - 1;
    }
  }
  return tempIndex;
}

function getStartIndex(scrollTop, positions) {
  return binarySearch(positions, scrollTop);
}

function doSomeParallelCalculation(data) {
  // do some calculation
  return [];
}

self.addEventListener('message', function (e) {
  console.log('e.data', e.data);
  const data = JSON.parse(e.data);
  const result = getStartIndex(data.scrollTop, data.positions);
  self.postMessage(result);
}, false);