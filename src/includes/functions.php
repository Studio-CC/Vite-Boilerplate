<?php


function loadStyles() {

   // Get css bundle hashed names from manifest.json to include into html

   // production
   if (file_exists('./manifest.json')) {
      $c = file_get_contents('./manifest.json');
      $c = json_decode($c, true);
      echo '<link rel="stylesheet" type="text/css" href="' . $c['src/scripts/css/main.scss']['file'] . '">';
      unset($c);
   } else { // development
      echo '<link rel="stylesheet" type="text/css" href="src/scripts/css/main.scss">
   ';
   }

} // loadStyles


function loadScripts() {

   // Get js bundle hashed names from manifest.json to include into html

   // production
   if (file_exists('./manifest.json')) {
      $c = file_get_contents('./manifest.json');
      $c = json_decode($c, true);
      echo '
   <script type="module" crossorigin="" src="' . $c['src/scripts/js/main.js']['file'] . '"></script>
   ';
      unset($c);
   } else { // development
      echo '
<script type="module" src="/@vite/client"></script><!-- required for live reload -->
<script type="module" crossorigin="" src="src/scripts/js/main.js"></script>
      ';
   }

} // loadScripts()


function sanitizeOutput($notice) {

   return function($buffer) use ($notice) {
      $search = array('/\>[^\S ]+/s', '/[^\S ]+\</s', '/(\s)+/s', '/<!--(.|\s)*?-->/');
      $replace = array('>', '<', '\\1', '');
      $buffer = preg_replace($search, $replace, $buffer);

   return '<!-- 

   ' . $notice . '

-->
' . $buffer;
   };

}

function sanitizeMarkup($enabled, $notice) {
   if ($enabled) ob_start(sanitizeOutput($notice));
}


function getFile($a, $type, $b = null) {

   $inputPath = '';
   $folder = '';

   if (!$b) {
      $name = $a;
   } else {
      $folder = $a;
      $name = $b;
   }

   if ($folder) {
      $inputPath = "{$folder}" . DIRECTORY_SEPARATOR . "{$name}.php";
   } else {
      $inputPath = "{$name}.php";
   }

   // Get the directory of the current script
   $scriptDirectory = __DIR__;

   // Construct the absolute path
   $filepath = '';

   if ($type === 'includes') {
      $filepath = $scriptDirectory . DIRECTORY_SEPARATOR . $inputPath;
   } else {
      // Remove the "includes" folder from the script directory
      $scriptDirectory = substr($scriptDirectory, 0, strrpos($scriptDirectory, DIRECTORY_SEPARATOR . 'includes'));
      $filepath = $scriptDirectory . DIRECTORY_SEPARATOR . $type . DIRECTORY_SEPARATOR . $inputPath;
   }

   if (file_exists($filepath)) {
      require($filepath);
   } else {
      echo 'File does not exist';
   }

} // getFile()


function includes($a, $b = null) {

   getFile($a, 'includes', $b);

} // includes()


function partials($a, $b = null) {

   getFile($a, 'partials', $b);

} // partials()
