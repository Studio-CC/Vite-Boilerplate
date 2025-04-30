<?php

/*
 * @license
 * All Rights Reserved.
 * Unauthorized copying, distribution, or use of this code, via any medium, is strictly prohibited.
 * © Anderson Moss Ltd 2025 | All Rights Reserved
 */


// Sitewide / Fallback Meta
$fallbackMetaTitle = 'Fallback Meta Title';
$fallbackMetaDescription = 'Fallback Meta Description';


// Get page Specific Meta
global $metaTitle;
global $metaDescription;


// Set Initial Meta
$pageTitle = $metaTitle ? $metaTitle : $fallbackMetaTitle;
$pageDescription = $metaDescription ? $metaDescription : $fallbackMetaDescription;


// Get Current URL
$protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? "https://" : "http://";
$host = filter_var($_SERVER['HTTP_HOST'], FILTER_VALIDATE_DOMAIN, FILTER_FLAG_HOSTNAME) ?: $_SERVER['SERVER_NAME'];
$pageUrl = $protocol . $host . $_SERVER['REQUEST_URI'];


// Sanitize Markup ( Minify Source & Append Notice )
$sanitize = true;
$notice = ' Copyright © ' . date("Y") . ' | All Rights Reserved';

sanitizeMarkup( $sanitize, $notice );

?>
<!DOCTYPE html>
<html lang="en">

<head>
   <?php /*
   
   https://github.com/h5bp/html5-boilerplate 

   https://ahrefs.com/blog/open-graph-meta-tags/#which-open-graph-tags-to-use
   *Use thumbnail with a 1.91:1 ratio and minimum recommended dimensions of 1200x630 for optimal clarity across all devices.
   
   */ ?>
   
   <meta charset="utf-8">
   <meta name="viewport" content="width=device-width, initial-scale=1">

   <title><?php echo $pageTitle; ?></title>
   <meta name="description" content="<?php echo $pageDescription; ?>">

   <meta property="og:title" content="<?php echo $pageTitle; ?>">
   <meta property="og:type" content="Website">
   <meta property="og:url" content="<?php echo $pageUrl; ?>">
   <meta property="og:image" content="./ico/thumbnail.jpg">
   <meta property="og:image:alt" content="<?php echo $pageTitle; ?>">
   
   <meta name="google" content="notranslate">

   <link rel="icon" href="./ico/favicon.ico" sizes="any">
   <link rel="icon" href="./ico/icon.svg" type="image/svg+xml">
   <link rel="apple-touch-icon" href="./ico/icon.png">

   <link rel="manifest" href="./ico/site.webmanifest">
   <meta name="theme-color" content="#ffffff">

   <?php loadStyles(); ?>

</head>

<body data-production="<?php if (file_exists('./manifest.json')) { echo 'true'; } else { echo 'false'; } ?>">

<?php partials( 'structure', 'header' ); ?>

<div id="page">
   