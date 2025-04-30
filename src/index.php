<?php 

require_once( 'includes/functions.php' ); 

$metaTitle = 'Boilerplate';
$metaDescription = '';

$currentPage = pathinfo(__FILE__, PATHINFO_FILENAME);

includes( 'global-header' );

?>



<?php 

   partials( 'grid', 'grid-demo' );
   partials( 'grid', 'grid-overlay' );

?>

<?php includes( 'global-footer' ); ?>