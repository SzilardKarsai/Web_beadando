let i = 0;
let counting = false;

onmessage = function(event) {
  if (event.data === "start" && !counting) {
    counting = true;
    count();
  }
};

function count() {
  if (counting) {
    i++;
    postMessage(i);
    setTimeout(count, 1000);
  }
}