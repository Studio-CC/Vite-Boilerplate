import { globalizeSettings, Throttle } from './modules/utils/utils.js';
import { Detect } from './modules/detect.js';
import { Translate } from './modules/translate.js';
import { Scale } from './modules/scale.js';
import { Stick } from './modules/stick.js';
import { Fade } from './modules/Fade.js';


"use strict";


// Defaults

let defaults = {

   enabled: true,
   container: null,

   horizontalScroll: false,

   smoothScroll: true,
   breakSmoothScroll: true,
   smoothScrollDampening: 0.8,

   breakpoint: 769,
   normalizedSpeed: 0.8,

   customScrollbars: true,
   trackColor: '#eee',
   thumbColor: '#bbb',

   scrollTriggerDuration: 1000,
   scrollTriggerEasing: 'cubic-bezier(0.860, 0.000, 0.070, 1.000)',

   // scrollListener: onScroll,
   // tweenListener: onTween,

} // Defaults


const ScrollUtilitiies = (options) => {


   // Assign settings

   const settings = { ...defaults, ...options };

   if (!settings.enabled) return;

   globalizeSettings(settings) // Give modules access to settings


   // Aliases

   const w = window;
   const d = document;
   const de = d.documentElement;
   const dh = d.head;
   const b = d.body;


   // Global Vars

   let onScroll, onTween;

   let ww = w.innerWidth;
   let wh = w.innerHeight;
   let ratio = (ww / wh)

   let pww = ww;
   let pwh = wh;

   let scrollValue = 1;
   let tweenValue = 0;
   let movementValue = 1;

   let isResizing = false;

   let smoothActive =
      (settings.smoothScroll && !settings.breakSmoothScroll) ||
      (settings.smoothScroll && settings.breakSmoothScroll && ww >= settings.breakpoint)

   let horzActive =
      (settings.horizontalScroll && ww >= settings.breakpoint)


   // Give modules viewport size (x/y) 
   // depending on horzActive 
   let vps = horzActive ? ww : wh;

   let utils, utilsId, utilsWrapper, utilsContainer, hDummy, wDummy;

   let nativeScrollbarWidth;

   let enableTranslate = true;


   // Update Vars

   w.addEventListener('resize', function () {

      ww = w.innerWidth;
      wh = w.innerHeight;
      ratio = (ww / wh)

      horzActive = (settings.horizontalScroll && ww >= settings.breakpoint)

      vps = horzActive ? ww : wh;

      smoothActive =
         (settings.smoothScroll && !settings.breakSmoothScroll) ||
         (settings.smoothScroll && settings.breakSmoothScroll && ww >= settings.breakpoint)

   })


   // Build DOM

   function buildDOM() {


      // Create utilsWrapper & utilsContainer

      utilsWrapper = d.createElement('div')
      utilsWrapper.id = 'utils-wrapper';

      utilsContainer = d.createElement('div')
      utilsContainer.id = 'utils-container';


      // Check if container is specified and exists

      if (settings.container && d.querySelector(settings.container)) {

         // A parent container is specified and exists
         // so append utilsWrapper & utilsContainer and create
         // then nest all elements that are within the parent

         utils = d.querySelector(settings.container)

         while (utils.firstChild) {
            utilsContainer.appendChild(utils.firstChild)
         }

         utils.appendChild(utilsWrapper)
         utilsWrapper.appendChild(utilsContainer)

      } else {


         // A paarent container is not specified,
         // so create one, and nest all elements 
         // that are within the body, and append
         // the created parent container

         utils = d.createElement('div')
         utils.id = 'utils';

         while (b.firstChild) {
            utils.appendChild(utilsWrapper)
            utilsWrapper.appendChild(utilsContainer)
            utilsContainer.appendChild(b.firstChild)
         }

         b.appendChild(utils)

      }


      //


      utilsId = '#' + utils.id; // Append the ID to the variable for usage later


      //


      if (settings.customScrollbars) {

         const styleSheet = document.createElement("style");

         styleSheet.innerHTML = `:root {--thumbColor: ${settings.thumbColor};--trackColor: ${settings.trackColor};}* {scrollbar-color: var(--thumbColor) var(--trackColor);scrollbar-width: thin;}`;

         dh.appendChild(styleSheet);

      }

      // Get Native Scrollbar Width

      de.style.overflow = 'scroll';
      nativeScrollbarWidth = w.innerHeight - de.clientHeight;
      de.style.overflow = 'unset';


      //


      // Set Styles

      b.style.overflow = 'hidden';


      // Create Dummies

      hDummy = document.createElement('div')
      hDummy.style.position = 'absolute';
      hDummy.style.width = '1px';
      utils.appendChild(hDummy)

      wDummy = document.createElement('div')
      wDummy.style.position = 'absolute';
      wDummy.style.height = '1px';
      utilsWrapper.appendChild(wDummy)


      //


      updateDOM()
      updateDummies()


   } // buildDOM()


   //


   function updateDOM() {

      utils.style.cssText = `
         position: relative;
         height: 100vh;
         width: 100vw;
      `;

      utilsWrapper.style.cssText = `
         position: fixed;
         height: 100vh;
      `;


      //


      if (!horzActive) {


         utils.style.width = '100vw';
         utils.style.overflow = 'hidden scroll';

         utilsWrapper.style.width = 'calc( 100vw - ' + nativeScrollbarWidth + 'px)';
         utilsWrapper.style.overflow = 'hidden';

         utilsContainer.style.cssText = `
            width: calc( 100vw - ` + nativeScrollbarWidth + `px);
            overflow: hidden;
         `;

         b.setAttribute('data-horizontal', 'false')


      } else {


         utils.style.width = 'calc( 100vw + ' + nativeScrollbarWidth + 'px);';
         utils.style.overflow = 'hidden';

         utilsWrapper.style.width = '100vw';
         utilsWrapper.style.overflow = 'scroll hidden';

         utilsContainer.style.cssText = `
         position: fixed;
         width: auto;
         overflow: visible hidden;
         height: calc( 100vh - ` + nativeScrollbarWidth + `px);
         `;

         b.setAttribute('data-horizontal', 'true')


      }

   } // updateDOM()


   function updateDummies() {

      // Set Dummies

      setTimeout(function () {

         if (horzActive) {

            wDummy.style.width = utilsContainer.scrollWidth + 'px';
            hDummy.style.height = utilsContainer.scrollWidth / ratio + 'px';

         } else {

            wDummy.style.width = 'unset';
            hDummy.style.height = utilsContainer.scrollHeight + 'px';

         }

      }, 25)

   } // updateDummies()


   function resizeDetection() {

      // A debounced resize detection helps keep the scroll
      // position updated when the page is being resized

      w.addEventListener("resize", function () {

         isResizing = true;

      })

      w.addEventListener("resize", resizeDetectionDebounce(function () {

         isResizing = false;

      }, 25))

   } // resizeDetection()


   function resizeDetectionDebounce(f, d) {

      let timer;

      return function () {
         clearTimeout(timer)
         timer = setTimeout(f, d)
      };

   } // resizeDetectionDebounce()


   function scrollHandler() {

      let previousTouchY = 0;

      function normalizeDelta(delta, deltaMode) {

         if (deltaMode === 1) { // Delta in lines
            delta *= 40; // Approximate pixels per line
         } else if (deltaMode === 2) { // Delta in pages
            delta *= window.innerHeight;
         }

         const scrollSpeed = settings.normalizedSpeed; // Adjust this factor to control scroll speed
         delta *= scrollSpeed;

         return delta;

      }

      function scrollFunc(e) {

         e.preventDefault() // Prevent default behavior

         let deltaY;

         if (e.type === 'wheel') {

            deltaY = normalizeDelta(e.deltaY, e.deltaMode)

         } else if (e.type === 'touchmove') {

            if (previousTouchY !== undefined) {
               deltaY = previousTouchY - e.touches[0].clientY; // Invert direction
               deltaY = normalizeDelta(deltaY * 3, 0) // DeltaMode 0 for pixels
            }

            previousTouchY = e.touches[0].clientY;

         } else {

            return;

         }

         utils.scrollTop += deltaY;

         initScrollAction()

      } // scrollFunc()


      utils.addEventListener('wheel', scrollFunc, { passive: false })
      utils.addEventListener('touchstart', e => {
         previousTouchY = e.touches[0].clientY;
      }, { passive: false })
      utils.addEventListener('touchmove', scrollFunc, { passive: false })

      if (smoothActive) {

         utils.addEventListener('scroll', Throttle(initScrollAction, 30, { leading: true, trailing: true }))

      } else {

         utils.addEventListener('scroll', initScrollAction)

      }


      function initScrollAction() {

         if (horzActive) {

            utilsWrapper.scrollTo(utils.scrollTop * ratio, 0);
            scrollValue = utilsWrapper.scrollLeft;

         } else {

            scrollValue = utils.scrollTop;

         }

      } // initScrollAction()

   } // scrollHandler()


   function scrollAction() {


      if (smoothActive && !isResizing) {

         if (Math.abs(scrollValue - tweenValue) > 0.001) {

            movementValue = tweenValue += (settings.smoothScrollDampening / 10) * (scrollValue - tweenValue);

            onTween(scrollValue - tweenValue);

         }

      }

      if (!smoothActive) movementValue = scrollValue;


      if (isResizing) tweenValue = scrollValue;


      let transformAxis = horzActive ? 'X' : 'Y';

      if (enableTranslate) utilsContainer.style.transform = 'translate' + transformAxis + '(-' + movementValue + 'px)';

      onScroll(movementValue);

      // Call requestAnimationFrame to schedule the next frame
      w.requestAnimationFrame(scrollAction);


   } // scrollAction()


   function linkXYScroll() {

      const linkedY = utils;
      const linkedX = utilsWrapper;

      let linked = [];

      linked.push(linkedY, linkedX)

      let otv, ntv, olv, nlv;

      linked.forEach(function (el) {

         el.addEventListener('scroll', function (e) {

            if (settings.horizontalScroll && ww >= settings.breakpoint) {

               ntv = el.scrollTop;
               nlv = el.scrollLeft;

               if (otv !== ntv) {

                  if (el == utils) {

                     let scrollYRatio = el.scrollTop * ratio;

                     linkedX.scrollTo(scrollYRatio, otv)

                  }

               } else if (olv !== nlv) {

                  if (el !== utils) {

                     let scrollXRatio = el.scrollLeft / ratio;
                     linkedY.scrollTo(olv, scrollXRatio)

                  }

               }

               otv = ntv;
               olv = nlv;

            }

         })

      })

   } // linkXYScroll()


   function onResizeUpdates() {

      // Due to the DOM rebuild when horizontalScroll is enabled 
      // traversal detection and scroll position syncing are required

      let syncTimer;

      let logPosition = true;
      let loggedPosition;

      w.addEventListener('resize', function () {

         // On Resize:

         // Sync the onScroll
         onScroll(movementValue) // Normal sync for modules

         // Check horizontalScroll and breakpoint traversal
         // and update the utilities containers
         if (settings.horizontalScroll) {


            // Start syncing scroll in anticipation of breakpoint traversal
            // Log last movementValue (prior to resize event)
            if (logPosition == true) {
               loggedPosition = movementValue;
               logPosition = false;
            }


            // Detect breakpoint traversal and update utilities containers
            if
               ((pww < settings.breakpoint && ww >= settings.breakpoint) ||
               (pww >= settings.breakpoint && ww <= settings.breakpoint)) {

               updateDOM()

            }

         }


         // Update the dummies
         updateDummies()


         // Run a delayed update function to compare pww & ww and detect traversal
         // and then sync the scroll position x vs y

         if (settings.horizontalScroll) {

            clearTimeout(syncTimer)
            syncTimer = setTimeout(function () {

               let traversalDirection;
               let isTraversing = false;
               let newMovementValue;

               if (pww < settings.breakpoint && ww >= settings.breakpoint) traversalDirection = 'up';
               if (pww >= settings.breakpoint && ww <= settings.breakpoint) traversalDirection = 'down';

               if (traversalDirection == 'up') {

                  utils.scrollTop = (wh * (loggedPosition / pwh)) // Sync Scroll Position
                  newMovementValue = (wh * (loggedPosition / pwh)) * ratio; // Sync Modules value

                  isTraversing = true;

               }

               if (traversalDirection == 'down') {

                  utils.scrollTop = (wh * (loggedPosition / pww)) // Sync Scroll Position         
                  newMovementValue = (wh * (loggedPosition / pww)) // Sync Modules value

                  isTraversing = true;

               }

               setTimeout(function () {

                  if (isTraversing) {

                     onScroll(newMovementValue) // Sync Modules

                     resetLog()

                  }

               }, 10)


               function resetLog() {

                  pwh = wh; // Update previous window height
                  pww = ww; // Update previous window width

                  loggedPosition = null; // Reset Logged Position
                  logPosition = true;

               }

            }, 10)

         } // Sync Scroll position if (settings.horizontalScroll)

      })

   } // onResizeUpdates()


   //


   onScroll = (movementValue) => {


      // Modules

      const moduleData = {
         movementValue: movementValue || 0,
         vps: vps,
         horzActive: horzActive
      }

      Detect(moduleData)
      Translate(moduleData)
      Scale(moduleData)
      Stick(moduleData)
      Fade(moduleData)


      //


      // Pass movementValue ( / scroll distance ) to scrollListener

      if (settings.scrollListener) settings.scrollListener(movementValue)


      // Pass tweenValue to tweenListener

      if (!smoothActive && settings.tweenListener) settings.tweenListener(0)


      // Assign scrolled attribute when scrolled

      b.setAttribute('data-scrolled', movementValue >= 100 ? 'true' : 'false')


   } // onScroll()


   //


   onTween = (tweenAmount) => {

      if (settings.tweenListener) settings.tweenListener(tweenAmount)

   } // onTween()


   //


   function handleScrollTriggers() {


      let isScrolling = false;


      //


      b.addEventListener('click', (e) => {


         if (e.target && e.target.hasAttribute('data-scroll-trigger')) {


            if (isScrolling) {

               return;

            } else {

               isScrolling = true;

            }


            //


            let currentPosition = tweenValue;
            enableTranslate = false;
            smoothActive = false;


            //


            utilsContainer.style.transition = '1s 0s ease';


            //


            const target = e.target.getAttribute('data-scroll-target');


            //


            let targetElement;

            if (d.getElementById(target) == null) {

               return;

            } else {

               targetElement = d.getElementById(target);

            }

            if (!target || target == null || target == '' || targetElement.length == 0) return;


            //


            let targetOffset;

            if (!settings.horizontalScroll || ww < settings.breakpoint) {

               targetOffset = targetElement.getBoundingClientRect().top + tweenValue;

            } else {

               targetOffset = targetElement.getBoundingClientRect().left + tweenValue;

            }


            //


            animateOnScroll(currentPosition, targetOffset, (settings.scrollTriggerDuration - 15))


            //


            if (!settings.horizontalScroll || ww < settings.breakpoint) {

               utilsContainer.style.transform = 'translateY(' + -targetOffset + 'px)';

            } else {

               utilsContainer.style.transform = 'translateX(' + -targetOffset + 'px)';

            }


            //


            setTimeout(() => {


               if (!settings.horizontalScroll || ww < settings.breakpoint) {

                  utils.scrollTo(0, targetOffset);

               } else {

                  utilsWrapper.scrollTo(0, targetOffset);

               }


            }, 10)


            //


            setTimeout(() => {

               setTimeout(() => {

                  tweenValue = targetOffset;
                  scrollValue = targetOffset;
                  movementValue = targetOffset;

                  utilsContainer.style.transition = 'unset';

               }, 0)


               //


               enableTranslate = true;
               smoothActive = true;


               //


               isScrolling = false;


            }, (settings.scrollTriggerDuration + 10))


            //


            function animateOnScroll(start, end, duration) {


               const startTime = performance.now();


               function update() {

                  const currentTime = performance.now();
                  const elapsed = currentTime - startTime;
                  const progress = Math.min(elapsed / duration, 1);
                  const currentValue = start + (end - start) * progress;


                  //


                  onScroll(currentValue);


                  //


                  if (progress < 1) requestAnimationFrame(update);


               } // update()


               requestAnimationFrame(update);


            } // animateOnSCroll()


         } // if e.target


      });


   } // handleScrollTriggers()


   //


   function initUtilities() {

      buildDOM()
      onResizeUpdates()
      scrollHandler()
      scrollAction()
      linkXYScroll()
      resizeDetection()
      handleScrollTriggers()


      //


      w.addEventListener('resize', updateDummies)


      //


      // Trigger onScroll on load ( and update if scroll pos is cached )

      onScroll((horzActive ? utils.scrollTop * ratio : utils.scrollTop))


      //


   } // initUtilities()


   //


   initUtilities()


   //


   function reset(horizontal) {


      settings.horizontalScroll = horizontal;
      horzActive = (settings.horizontalScroll && ww >= settings.breakpoint)
      vps = horzActive ? ww : wh;

      updateDOM()
      updateDummies()

      //

      enableTranslate = false;

      if (!settings.horizontalScroll || ww < settings.breakpoint) {

         utils.scrollTo(0, 0);

      } else {

         utilsWrapper.scrollTo(0, 0);

      }

      movementValue = 0;
      scrollValue = 0;
      tweenValue = 0;

      setTimeout(() => enableTranslate = true), 0;


   } // reset()


   function update() {

      updateDummies()
      onResizeUpdates()
      updateDOM()

   } // update()


   function init() {

      initUtilities()

   } // init()


   //


   return {
      reset,
      update,
      init,
   }


}; // ScrollUtilitiies

export default ScrollUtilitiies;