
"use strict";


//


// Global Aliases

const d = document;
const de = d.documentElement;
const w = window;
const b = d.body;


//


const isProduction = b.getAttribute('data-production') == 'true' ? true : false;


//


// Handheld Detection

function isHandheld() {
   return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

b.setAttribute('data-mobile', isHandheld());


//


// Get Mouse Position ( mouse.x / mouse.y )

let mouse = { x: 0, y: 0 };

d.addEventListener('mousemove', (e) => {

   mouse.x = e.clientX;
   mouse.y = e.clientY;

})


//


w.addEventListener('DOMContentLoaded', () => {


   // DOM Ready



   //


   w.addEventListener('load', () => {


      // All Resources Loaded



      //


   }) // window.load


}) // DOM Ready
