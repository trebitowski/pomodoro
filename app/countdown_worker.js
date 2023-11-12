let previousTime = performance.now();

self.onmessage = (event) => {
  if (event.data === "create") {
    create();
  } else if (event.data === "clear") {
    clear();
  } else if (event.data === "update") {
    previousTime = performance.now();
  }
};

function create() {
  clearInterval();

  const intervalId = setInterval(() => {
    const now = performance.now();
    self.postMessage(now - previousTime);
    previousTime = now;
  }, 500);

  self.intervalId = intervalId;
}

function clear() {
  if (self.intervalId) {
    clearInterval(self.intervalId);
    self.intervalId === null;
  }
}
