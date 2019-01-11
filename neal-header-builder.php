<?php
/**
 * Neal Extension Custom fonts.
 *
 * @package neal-extension
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( 'Neal_Header_Builder' ) ) :

	/**
	 * The Main demo importer class.
	 */
	class Neal_Header_Builder {

		/**
		 * Setup class.
		 *
		 * @since 1.0
		 *
		 * @var array
		 */

		public function __construct() {


			add_action( 'admin_menu', array( $this, 'register_menu' ) );

			add_action( 'admin_enqueue_scripts', array( $this, 'scripts' ) );

			add_action( 'rest_api_init', array( $this, 'init_rest_route' ) );
		}

		/**
		 * Load scripts
		 */
		public function scripts( $hook ) {
			if ( 'appearance_page_hyulin-header-builder' != $hook ) {
				return;
			}

	        // script
	        wp_register_script( 'header-builder-script', NEAL_EXT_URL . 'inc/header-builder/header-builder/dist/bundle.js', array(
					'jquery',
					'jquery-ui-resizable',
			), '', true );
	        wp_enqueue_script( 'header-builder-script' );
		}

		/**
		 * Register menu
		 *
		 * @link https://codex.wordpress.org/Plugin_API/Action_Reference/admin_menu
		 */
		public function register_menu() {

			add_theme_page(
				esc_html__( 'Header Builder', 'neal' ),
				esc_html__( 'Header Builder', 'neal' ),
				'edit_theme_options',
				'hyulin-header-builder',
				array( $this, 'custom_fonts' )
			);
		}

		/**
		 * Custom fonts frontend page
		 */
		public function custom_fonts() {
			$wp_upload_dir = wp_upload_dir();
			if ( ! isset( $_GET['edit'] ) ) {
				return false;
			}

		?>
			<div class="wrap" id="app-header-builder">
			</div>
		<?php
		}

		function init_rest_route() {
			register_rest_route( 'header-builder', '/elements', array(
			    'methods' => 'GET',
			    'callback' => array( $this, 'fetch_elements_func' )
			) );

			register_rest_route( 'header-builder', '/panel-elements', array(
			    'methods' => 'GET',
			    'callback' => array( $this, 'fetch_panel_elements_func' )
			) );

			register_rest_route( 'header-builder', '/save-elements', array(
			    'methods' => 'POST',
			    'callback' => array( $this, 'save_elements_func' )
			) );
		}

		function fetch_elements_func( $data ) {
			$elements = [
				[ 'id' => '83923f03-bf45-1c30-c66e-826b4d9a386e', 'name' => 'logo', 'title' => 'Logo', 'attrs' => [
					'max-height' => 40,
					'width'	=> 100,
					'url'	=> 'test.com/logo.img'
				] ],
				[ 'id' => '43923f03-bf45-1c30-c66e-826b4d9a386b', 'name' => 'menu', 'title' => 'Menu' ],
				[ 'id' => '13923f03-bf45-1c30-c66e-826b4d9a386q', 'name' => 'icon', 'title' => 'Icon' ]
			];

			$columns = [
				[ 'id' => '34923f03-bf45-1c30-c66e-826b4d9a386t', 'elements' => [ '83923f03-bf45-1c30-c66e-826b4d9a386e' ] ],
				[ 'id' => '85523f03-bf45-1c30-c66e-826b4d9a386f', 'elements' => [ '43923f03-bf45-1c30-c66e-826b4d9a386b' ] ],
				[ 'id' => '53023f03-bf45-1c30-c66e-826b4d9a386j', 'elements' => [ '13923f03-bf45-1c30-c66e-826b4d9a386q' ] ],
				[ 'id' => '42323f03-bf45-1c30-c66e-826b4d9a386e', 'elements' => [] ],
				[ 'id' => '11423f03-bf45-1c30-c66e-826b4d9a386o', 'elements' => [] ],
				[ 'id' => '74323f03-bf45-1c30-c66e-826b4d9a386t', 'elements' => [] ],
			];

			$rows = [
				[ 'id' => '54103f03-bf45-1c30-c66e-826b4d9a386p', 'device' => 'desktop', 'columns' => [ 
					'34923f03-bf45-1c30-c66e-826b4d9a386t',
					'85523f03-bf45-1c30-c66e-826b4d9a386f',
					'53023f03-bf45-1c30-c66e-826b4d9a386j' ] 
				],
				[ 'id' => '45723f03-bf45-1c30-c66e-826b4d9a386v', 'device' => 'desktop', 'columns' => [
					'42323f03-bf45-1c30-c66e-826b4d9a386e', 
					'11423f03-bf45-1c30-c66e-826b4d9a386o',
					'74323f03-bf45-1c30-c66e-826b4d9a386t' ] 
				],
				[ 'id' => '79345f03-bf45-1c30-c66e-826b4d9a386a', 'device' => 'mobile', 'columns' => [] ]
			];

			$data = [ 'elements' => $elements, 'columns' => $columns, 'rows' => $rows ];

			$element = get_option( 'header-builder-elements' );

			return new WP_REST_Response( $element, 200 );
		}

		function save_elements_func( $request ) {
			$elements = $request->get_param( 'elements' );
			update_option( 'header-builder-elements', $elements );

			return true;
		}

		function fetch_panel_elements_func( $data ) {
			$elements = array(
				[ 'name' => 'logo', 'title' => 'Logo', 'description' => 'Element description to here', 'icon' => 'https://cdn2.iconfinder.com/data/icons/pittogrammi/142/32-512.png',
					'attrs' => [
							[ 'title' => 'General', 'name' => 'general', 'elements' => [
									[ 'element' => 'text', 'label' => 'Max-Height', 'type' => 'text', 'name' => 'max-height', 'value' => 80 ],
									[ 'element' => 'text', 'label' => 'Width', 'type' => 'text',  'name' => 'width', 'value' => 200 ],
									[ 'element' => 'text', 'label' => 'Logo URL', 'type' => 'text', 'name' => 'url', 'value' => '/' ]
								] 
							],
							[ 'title' => 'Styling', 'name' => 'styling', 'elements' => [
									[ 'element' => 'text', 'label' => 'Background-Color', 'type' => 'text', 'name' => 'bg-color', 'value' => '#fff' ],
								]
							]
						]
				],
				[ 'name' => 'menu', 'title' => 'Menu', 'description' => 'Element description to here', 'icon' => 'https://cdn2.iconfinder.com/data/icons/pittogrammi/142/32-512.png', 'attrs' => [
					[ 'element' => 'dropdown', 'label' => 'Select Menu', 'name' => 'menu', 'value' => '', 'options' => [ 
							[ 'title' => 'Main Menu', 'value' => 'main-menu' ],
							[ 'title' => 'Primary Menu', 'value' => 'primary-menu' ],
							[ 'title' => 'Footer Menu', 'value' => 'footer-menu' ],
							[ 'title' => 'Widget Menu', 'value' => 'widget-menu' ]
						]
					]
				] ],
				[ 'name' => 'text', 'title' => 'Text', 'description' => 'Element description to here', 'icon' => 'https://cdn2.iconfinder.com/data/icons/pittogrammi/142/32-512.png' ],
				[ 'name' => 'image', 'title' => 'Image', 'description' => 'Element description to here', 'icon' => 'https://cdn2.iconfinder.com/data/icons/pittogrammi/142/32-512.png' ],
				[ 'name' => 'search-icon', 'title' => 'Search Icon', 'description' => 'Element description to here', 'icon' => 'https://cdn2.iconfinder.com/data/icons/pittogrammi/142/32-512.png' ],
				[ 'name' => 'shop-icon', 'title' => 'Shop Icon', 'description' => 'Element description to here', 'icon' => 'https://cdn2.iconfinder.com/data/icons/pittogrammi/142/32-512.png' ],
				[ 'name' => 'menu-icon', 'title' => 'Menu Icon', 'description' => 'Element description to here', 'icon' => 'https://cdn2.iconfinder.com/data/icons/pittogrammi/142/32-512.png' ],
				[ 'name' => 'social-icons', 'title' => 'Social Icons', 'description' => 'Element description to here', 'icon' => 'https://cdn2.iconfinder.com/data/icons/pittogrammi/142/32-512.png' ],
			);

			$element = get_option( 'header-builder-panel-elements' );

			return new WP_REST_Response( $element, 200 );
		}

		public function custom_fonts_upload() {

			if ( isset( $_POST['neal-cf-submit'] ) ) {
				$fonts = array();

				if ( isset( $_FILES['font_file'] ) ) {
					$files = $_FILES['font_file'];
					$errors = array();

					$upload_dir = wp_upload_dir();
					$dir = path_join( $upload_dir['basedir'], 'custom-fonts' );

					wp_mkdir_p( $dir );

					$upload_overrides = array( 'ttf', 'otf', 'woff' );

					foreach ( $files['name'] as $key => $value ) {
						if ( $files['name'][ $key ] ) {
						    $file = array(
						      'name'     => $files['name'][ $key ],
						      'type'     => $files['type'][ $key ],
						      'tmp_name' => $files['tmp_name'][ $key ],
						      'error'    => $files['error'][ $key ],
						      'size'     => $files['size'][ $key ]
						    );

						   	$file_expl = explode( '.', $file['name'] );
						    $file_ext = strtolower( end( $file_expl ) );


					    	if ( in_array( $file_ext, $upload_overrides ) === false ) {
					        	$errors[] = esc_html__( 'Extension not allowed, please choose a ttf, otf, woff files.', 'neal' );
					      	}

					      	if ( $file['size'] > 4097152 ) {
					        	$errors[] = esc_html__( 'File size must be exactly 4 MB', 'neal' );
					     	}

					      	if ( empty( $errors ) == true ) {
					      		$movefile = @move_uploaded_file( $file['tmp_name'], $dir . '/' . $file['name'] );
					      		echo '<div class="notice notice-success is-dismissible">';
									echo '<p>' . esc_html__( 'Font successfully uploaded', 'neal' ) . '</p>';
								echo '</div>';
					      	} else {
					      		if ( isset( $errors[0] ) ) {
						      		echo '<div class="notice notice-warning is-dismissible">';
										echo '<p>' . $errors[0] . '</p>';
									echo '</div>';
								} 

								if ( isset( $errors[1] ) ) {
									echo '<div class="notice notice-warning is-dismissible">';
										echo '<p>' . $errors[1] . '</p>';
									echo '</div>';
								}
					      	}
					  	}
					}

				}

	
				if ( isset( $_POST['neal-cf-names'] ) ) {
					$font_names = $_POST['neal-cf-names'];
					$font_urls 	= $_POST['neal-cf-urls'];

					foreach ( $font_names as $key => $value ) {
						$font = trim( $font_names[ $key ] );
						if ( ! empty( $font ) ) {
							$fonts[] = array(
								'name'	=> wp_filter_nohtml_kses( $font_names[ $key ] ),
								'url'	=> wp_filter_nohtml_kses( $font_urls[ $key ] )
							);
						}
					}
				}

				update_option( 'neal-custom-fonts', $fonts );


			}

			if ( isset( $_POST['neal-cf-delete'] ) ) {
				$file_delete = explode( ',', $_POST['neal-cf-delete'] );
				$upload_dir = wp_upload_dir();
				$dir = path_join( $upload_dir['basedir'], 'custom-fonts' );

				foreach ( $file_delete as $file ) {
					if ( $file_delete ) {
						$file = basename( $file );
						@unlink( $dir . '/' . $file );
					}
				}
			}
		}

	} //end Neal_Custom_Fonts class

endif;

return new Neal_Header_Builder;