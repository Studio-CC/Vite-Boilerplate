import { getSettings } from './utils/utils.js';


// Aliases

const w = window;
const d = document;
let ww = w.innerWidth;

w.addEventListener('resize', () => ww = w.innerWidth)


//


export const Fade = (moduleData) => {


   // Selector(s)

   const fadeElements = d.querySelectorAll('[data-fade-in], [data-fade-out]')


   //


   const settings = getSettings()


   //


   fadeElements.forEach(el => {


      const elOffset = parseFloat(el.getAttribute('data-offset')) || 0;

      const fadeType = el.hasAttribute('data-fade-in') ? 'in' : 'out';

      const elTriggerPoint = parseFloat(el.getAttribute('data-trigger-point')) || 0.5;

      const elFadeDistance = parseFloat(el.getAttribute('data-fade-distance')) || 0.2;

      const disableAtBreak = el.hasAttribute('data-disable-at-break') ? true : false;


      //


      if (elOffset !== NaN) {

         if (!disableAtBreak || disableAtBreak && ww >= settings.breakpoint) {


            // get position of element in viewport factoring in elTriggerPoint
            const elPosition = (elOffset + (moduleData.vps - (moduleData.vps * elTriggerPoint))) - moduleData.movementValue;

            // get position adjusted by trigger point ( it will be zero, when element reaches trigger point )
            const elRelativePosition = elPosition - moduleData.vps;

            // normalize the value between 0 and 1
            const clampedNormalizedPosition = Math.min(Math.max(-(elRelativePosition / moduleData.vps), 0), 1) / elFadeDistance;

            // convert to opacity
            const opacity = Math.min(Math.max(clampedNormalizedPosition, 0), 1)


            el.style.opacity = fadeType == 'in' ? opacity : 1 - opacity;


         } else {

            // disableAtBreak is true, so reset < breakpoint

            el.style.opacity = 1;

         }


      } // (elOffset !== NaN)


      //


      el.setAttribute(

         'data-offset',

         moduleData.horzActive ?
            (el.getBoundingClientRect().left + moduleData.movementValue) :
            (el.getBoundingClientRect().top + moduleData.movementValue)

      )


   })


}; // Fade()