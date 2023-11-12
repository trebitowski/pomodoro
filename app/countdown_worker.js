self.onmessage = (event) => {
  if (event.data === "create") {
    create();
  } else if (event.data === "clear") {
    clear();
  } else if (event.data === "update") {
    self.previousTime = performance.now();
  }
};

function create() {
  clearInterval();
  self.previousTime = performance.now();
  const intervalId = setInterval(() => {
    console.log("tick");
    const now = performance.now();
    self.postMessage(now - self.previousTime);
    self.previousTime = now;
  }, 500);

  self.intervalId = intervalId;
}

function clear() {
  if (self.intervalId) {
    clearInterval(self.intervalId);
    self.intervalId === null;
  }
}
