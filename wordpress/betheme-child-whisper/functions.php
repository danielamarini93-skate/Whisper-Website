<?php
/**
 * Whisper UI Kit — BeTheme child theme.
 *
 * Loads, in this order, after BeTheme's own styles:
 *   1. Geist (Google Fonts, weights 300–600)
 *   2. assets/css/whisper-kit.css      tokens + kit components (wh-* classes, used by the HTML snippets)
 *   3. assets/css/betheme-adapter.css  kit styling for BeTheme / BeBuilder markup (opt-in classes)
 *   4. assets/js/whisper-kit.js        menus, "Get your Whisper" dropdown, accordions (plain JS, deferred)
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'WHISPER_KIT_VERSION', '1.0.0' );

/* Set to false if BeTheme's Theme Options already loads Geist with weights 300–600. */
if ( ! defined( 'WHISPER_KIT_LOAD_GEIST' ) ) {
	define( 'WHISPER_KIT_LOAD_GEIST', true );
}

/* Set to false once pinch-zoom is allowed in BeTheme's own settings (see README › Accessibility). */
if ( ! defined( 'WHISPER_KIT_FIX_VIEWPORT' ) ) {
	define( 'WHISPER_KIT_FIX_VIEWPORT', true );
}

add_action(
	'wp_enqueue_scripts',
	function () {
		$uri  = get_stylesheet_directory_uri();
		$deps = array();

		if ( WHISPER_KIT_LOAD_GEIST ) {
			wp_enqueue_style( 'whisper-geist', 'https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600&display=swap', array(), null );
			$deps[] = 'whisper-geist';
		}

		wp_enqueue_style( 'whisper-kit', $uri . '/assets/css/whisper-kit.css', $deps, WHISPER_KIT_VERSION );
		wp_enqueue_style( 'whisper-betheme-adapter', $uri . '/assets/css/betheme-adapter.css', array( 'whisper-kit' ), WHISPER_KIT_VERSION );
		wp_enqueue_script(
			'whisper-kit',
			$uri . '/assets/js/whisper-kit.js',
			array(),
			WHISPER_KIT_VERSION,
			array(
				'in_footer' => true,
				'strategy'  => 'defer',
			)
		);
	},
	100
);

add_action(
	'wp_head',
	function () {
		echo '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>' . "\n";
	},
	1
);

/**
 * Allow pinch-zoom (WCAG 1.4.4). The live site prints maximum-scale=1, which stops people zooming on phones.
 * This rewrites the viewport meta in the page output. Remove it (set WHISPER_KIT_FIX_VIEWPORT to false)
 * once the same is fixed in BeTheme's settings, or if a caching plugin already buffers the page.
 */
if ( WHISPER_KIT_FIX_VIEWPORT ) {
	add_action(
		'template_redirect',
		function () {
			if ( is_admin() || wp_doing_ajax() || ( defined( 'REST_REQUEST' ) && REST_REQUEST ) ) {
				return;
			}
			ob_start(
				function ( $html ) {
					return preg_replace(
						'/<meta\s+name=("|\')viewport\1\s+content=("|\')[^"\']*\2\s*\/?>/i',
						'<meta name="viewport" content="width=device-width, initial-scale=1">',
						$html,
						1
					);
				}
			);
		},
		0
	);
}
