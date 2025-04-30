
// Globalize / Export Settings
let settingsOutput;

export const globalizeSettings = (settingsInput) => {
   settingsOutput = settingsInput;
};

export const getSettings = () => settingsOutput;


// underscore.js Throttler
// https://underscorejs.org/docs/modules/throttle.html
var now = Date.now || function () { return (new Date).getTime() };
export const Throttle = (func, wait, options) => {
   var timeout, context, args, result;
   var previous = 0;
   if (!options) options = {};

   var later = function () {
      previous = options.leading === false ? 0 : now();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
   };

   var throttled = function () {
      var _now = now();
      if (!previous && options.leading === false) previous = _now;
      var remaining = wait - (_now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
         if (timeout) {
            clearTimeout(timeout);
            timeout = null;
         }
         previous = _now;
         result = func.apply(context, args);
         if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
         timeout = setTimeout(later, remaining);
      }
      return result;
   };

   throttled.cancel = function () {
      clearTimeout(timeout);
      previous = 0;
      timeout = context = args = null;
   };

   return throttled;
}
