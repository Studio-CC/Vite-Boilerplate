import { getSettings } from './utils/utils.js';


/*

// Usage:

data-translate-[ up|down|left|right ]  -- Translate Direction
data-translate-strength="2"            -- Strength of the translate effect

data-origin-point="0.9"                -- Point at which the element is in its original position, 
                                          relative to the viewport, as a fraction of viewport 
                                          height ( 1 = full viewport height ) 

*/


// Aliases

const w = window;
const d = document;
let ww = w.innerWidth;

w.addEventListener('resize', () => ww = w.innerWidth)


//


export const Translate = (moduleData) => {


   // Selector(s)

   const translateElements = d.querySelectorAll('[data-translate-up], [data-translate-down], [data-translate-left], [data-translate-right]')


   //


   const settings = getSettings()


   //


   translateElements.forEach(el => {

      const elOffset = parseFloat(el.getAttribute('data-offset')) || 0;

      const elOriginPoint = parseFloat(el.getAttribute('data-origin-point')) || 0.5;

      const elTranslateStrength = parseFloat(el.getAttribute('data-translate-strength')) || 0.5;

      const disableAtBreak = el.hasAttribute('data-disable-at-break') ? true : false;

      const elHeight = el.offsetHeight;


      //


      let translateValue, offsetCompensation;


      //


      if (elOffset !== NaN) {

         if (!disableAtBreak || disableAtBreak && ww >= settings.breakpoint) {


            // Calculate Translate Value

            translateValue = (elTranslateStrength * (moduleData.movementValue + (moduleData.vps * (elOriginPoint) - elHeight / 2))) - (elOffset * elTranslateStrength)


            //


            if (el.hasAttribute('data-translate-left')) {

               el.style.transform = 'translateX(' + -translateValue + 'px)';

               offsetCompensation = moduleData.horzActive ? -translateValue : 0;

            }

            if (el.hasAttribute('data-translate-right')) {

               el.style.transform = 'translateX(' + translateValue + 'px)';

               offsetCompensation = moduleData.horzActive ? translateValue : 0;

            }

            if (el.hasAttribute('data-translate-up')) {

               el.style.transform = 'translateY(' + -translateValue + 'px)';

               offsetCompensation = moduleData.horzActive ? 0 : -translateValue;

            }

            if (el.hasAttribute('data-translate-down')) {

               el.style.transform = 'translateY(' + translateValue + 'px)';

               offsetCompensation = moduleData.horzActive ? 0 : translateValue;

            }


         } else {

            // disableAtBreak is true, so reset < breakpoint

            translateValue = 0;
            offsetCompensation = 0;
            el.style.transform = 'translate(0,0)';

         }


      } // (elOffset !== NaN)


      //


      el.setAttribute(

         'data-offset',

         moduleData.horzActive ?
            (el.getBoundingClientRect().left + moduleData.movementValue - offsetCompensation) :
            (el.getBoundingClientRect().top + moduleData.movementValue - offsetCompensation)

      )


   })


}; // Translate()