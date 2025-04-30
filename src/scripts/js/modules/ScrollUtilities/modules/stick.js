import { getSettings } from './utils/utils.js';


// Aliases

const w = window;
const d = document;
let ww = w.innerWidth;

w.addEventListener('resize', () => ww = w.innerWidth)


//


export const Stick = (moduleData) => {


   // Selector(s)

   const stickElements = d.querySelectorAll('[data-stick]')


   //


   const settings = getSettings()


   //


   stickElements.forEach(el => {

      const elOffset = parseFloat(el.getAttribute('data-offset')) || 0;

      const elTriggerPoint = el.getAttribute('data-trigger-point') || 1;

      const disableAtBreak = el.hasAttribute('data-disable-at-break') ? true : false;

      const elStickDistance = parseFloat(el.getAttribute('data-stick-distance')) || 1;


      //


      let offsetCompensation = 0;


      //


      if (elOffset !== NaN) {


         if (!disableAtBreak || disableAtBreak && ww >= settings.breakpoint) {

            const start = (elOffset + (moduleData.vps * (1 - elTriggerPoint)))
            const stickDistance = moduleData.vps * elStickDistance;
            const scrollDistance = moduleData.movementValue;

            if (scrollDistance < start) {

               offsetCompensation = 0;
               el.style.transform = 'translate(0,0)';

            }

            if (scrollDistance >= start && scrollDistance < (start + stickDistance)) {

               const stickFormula = scrollDistance - start;

               el.style.transform = moduleData.horzActive ? 'translateX(' + stickFormula + 'px)' : 'translateY(' + stickFormula + 'px)';

               offsetCompensation = stickFormula;


            }

            if (scrollDistance >= (start + stickDistance)) {

               offsetCompensation = (start + stickDistance)

            }


         } else {


            // disableAtBreak is true, so reset < breakpoint

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


}; // Stick()