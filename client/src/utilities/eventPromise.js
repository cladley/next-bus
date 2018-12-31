export default function eventPromise(element, eventName) {
  return new Promise((resolve, reject) => {
    element.addEventListener(eventName, event => resolve(event), {
      once: true
    });
  });
}
