import { getSettings } from './utils/utils.js';


// Aliases

const w = window;
const d = document;
let ww = w.innerWidth;

w.addEventListener('resize', () => ww = w.innerWidth)


//


export const Scale = (moduleData) => {


   // Selector(s)

   const scaleElements = d.querySelectorAll('[data-scale-up], [data-scale-down]')


   //


   const settings = getSettings()


   //


   scaleElements.forEach(el => {

      const elOffset = parseFloat(el.getAttribute('data-offset'))

      const elDimension = moduleData.horzActive ? el.offsetWidth : el.offsetHeight;

      const elOffsetPoint = parseFloat(el.getAttribute('data-offset-point')) || 0.5;

      const elScaleStrength = parseFloat(el.getAttribute('data-scale-strength')) || 0.5;

      const disableAtBreak = el.hasAttribute('data-disable-at-break') ? true : false;

      const scaleDir = el.hasAttribute('data-scale-up') ? 'up' : 'down';


      //


      let scalingFormula, scalePreValue, scaleValue, offsetCompensation;


      //


      if (elOffset !== NaN) {

         if (!disableAtBreak || disableAtBreak && ww >= settings.breakpoint) {


            // Calculate Translate Value

            scalingFormula =
               (((moduleData.movementValue + (elDimension / 2)) + (moduleData.vps * (1 - (elOffsetPoint)))) / elOffset) * elScaleStrength;

            scalePreValue = scaleDir == 'down' ? (
               (1 + elScaleStrength) - scalingFormula) :  // down
               (1 - elScaleStrength) + scalingFormula;    // up

            scaleValue = ((scalePreValue >= 0) ? scalePreValue : 0) // prevent inversion


            // Apply Scaling

            el.style.transform = 'scale(' + scaleValue + ')';


         } else {

            // disableAtBreak is true, so reset < breakpoint

            scaleValue = 0;
            offsetCompensation = 0;
            el.style.transform = 'scale(1)';

         }


      } // (elOffset !== NaN)


      //


      let scalingOffsetFormula = (elDimension - (elDimension * (scaleValue - 1)))

      offsetCompensation = (elDimension - (scalingOffsetFormula / 2))


      el.setAttribute(

         'data-offset',

         moduleData.horzActive ?
            (el.getBoundingClientRect().left + moduleData.movementValue + offsetCompensation) :
            (el.getBoundingClientRect().top + moduleData.movementValue + offsetCompensation)

      )


   })


}; // Scale()