<?php 

http_response_code(404);

require_once( 'includes/functions.php' ); 


$metaTitle = '404 | Page Not Found';
$metaDescription = '404 | Page Not Found';

$currentPage = pathinfo(__FILE__, PATHINFO_FILENAME);

includes( 'global-header' );

?>

   <div style="display:flex;align-items:center;justify-content:center;height:100vh;background:#e0e6fa;font-size:18px;font-family:Arial;text-align:center;">

      <p>⚠️<br><br><strong>404 Error</strong><br>Page Not Found</p>

   </div>

<?php includes( 'site-footer' ); ?>