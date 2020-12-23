/**
 * @param {Function} fn
 * @param {Number} wait delay
 * @return {Function} return fn with delay wait
 */
export default function debounce(fn, wait) {
  let timeout;
  return function optimization(...args) {
    const later = () => {
      clearTimeout(timeout);
      fn.apply(this, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
