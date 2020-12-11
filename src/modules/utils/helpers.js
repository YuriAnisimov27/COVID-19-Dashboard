/**
 * @param {String} el
 * @param {String} classNames
 * @param  {...array} dataAttr
 */

export default function create(el, classNames, ...dataAttr) {
  let element = null;
  try {
    element = document.createElement(el);
  } catch (error) {
    throw new Error('Unable to create HTML element', error);
  }

  if (classNames) {
    element.classList.add(...classNames.split(' '));
  }

  if (dataAttr.length) {
    dataAttr.forEach(([attrName, attrValue]) => {
      if (attrValue === '') {
        element.setAttribute(attrName, '');
      } else {
        element.setAttribute(attrName, attrValue);
      }
    });
  }

  return element;
}

/**
 * @param {String} className (Search & remove element if it exists)
 */
export function removeElement(className) {
  const element = window.document.querySelector(className);
  if (element) element.remove();
}

/**
 * @param {String} Name (getter)
 * @param {Any} Value (setter)
 */
export function storage(key, data = null) {
  if (!data) {
    return JSON.parse(localStorage.getItem(key));
  }
  localStorage.setItem(key, JSON.stringify(data));
  return undefined;
}
