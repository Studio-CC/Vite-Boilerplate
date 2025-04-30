

   <!-- Grid Overlay -->

   <script>
      
      window.addEventListener('keypress', function(e) { 
         const gridOverlay = document.getElementById('grid-overlay');
         e.key === 'g' ? gridOverlay.classList.contains('show') ? gridOverlay.classList.remove('show') : gridOverlay.classList.add('show') : '';
      });

   </script>   

   <style>

      #grid-overlay { display: none; position: fixed; top: 0; left: 0; height: 100vh; min-height: 100%; width: 100vw; z-index: 99999999; pointer-events: none }
      #grid-overlay .container { height: 100%; min-height: 100%; background: rgba(0,255,255,0.1) }
      #grid-overlay.show { display: block }
      
   </style>

   <div id="grid-overlay" class="wrapper">
      <div class="container">
         <div class="row">
            <div class="col-1"><div style="height: 100%;background: cyan;opacity: 0.2;"></div></div>
            <div class="col-1"><div style="height: 100%;background: cyan;opacity: 0.2;"></div></div>
            <div class="col-1"><div style="height: 100%;background: cyan;opacity: 0.2;"></div></div>
            <div class="col-1"><div style="height: 100%;background: cyan;opacity: 0.2;"></div></div>
            <div class="col-1"><div style="height: 100%;background: cyan;opacity: 0.2;"></div></div>
            <div class="col-1"><div style="height: 100%;background: cyan;opacity: 0.2;"></div></div>
            <div class="col-1"><div style="height: 100%;background: cyan;opacity: 0.2;"></div></div>
            <div class="col-1"><div style="height: 100%;background: cyan;opacity: 0.2;"></div></div>
            <div class="col-1"><div style="height: 100%;background: cyan;opacity: 0.2;"></div></div>
            <div class="col-1"><div style="height: 100%;background: cyan;opacity: 0.2;"></div></div>
            <div class="col-1"><div style="height: 100%;background: cyan;opacity: 0.2;"></div></div>
            <div class="col-1"><div style="height: 100%;background: cyan;opacity: 0.2;"></div></div>
         </div>
      </div>
   </div>

   <!-- // Grid Overlay -->
