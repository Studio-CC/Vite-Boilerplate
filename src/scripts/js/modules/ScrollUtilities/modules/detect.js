import { getSettings } from './utils/utils.js';


// Aliases

const w = window;
const d = document;
let ww = w.innerWidth;

w.addEventListener('resize', () => ww = w.innerWidth)


//


export const Detect = (moduleData) => {


   // Selector(s)

   const detectElements = d.querySelectorAll('[data-detect]')


   //


   const settings = getSettings()


   //


   detectElements.forEach(el => {

      const elOffset = parseFloat(el.getAttribute('data-offset'))

      const elDimension = moduleData.horzActive ? el.offsetWidth : el.offsetHeight;

      const elTriggerPoint = el.getAttribute('data-trigger-point') || 0.5;

      const disableAtBreak = el.hasAttribute('data-disable-at-break') ? true : false;


      //


      if (elOffset !== NaN) {

         if (!disableAtBreak || disableAtBreak && ww >= settings.breakpoint) {


            // In View

            if ((moduleData.movementValue + moduleData.vps) >= elOffset && moduleData.movementValue < (elOffset + elDimension)) {

               el.classList.add('in-view')

            } else {

               el.classList.remove('in-view')

            }


            // Triggered ( *first time in view + vps-relative trigger point )

            if ((moduleData.movementValue + (moduleData.vps * (1 - elTriggerPoint))) >= elOffset) {

               el.classList.add('triggered')

            }


         } else {

            // disableAtBreak is true, so reset < breakpoint
            el.classList.remove('in-view')
            el.classList.remove('triggered')

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


}; // Detect()