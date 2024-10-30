<?php
/**
 * Plugin Name:       K2Blocks - Creative Gutenberg Blocks
 * Plugin URI:        https://k2blocks.com/
 * Description:       Blocks for the gutenberg editor.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           2.0.1
 * Author:            PookiDevs
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       k2-blocks
 *
 * @package           k2
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}
require_once __DIR__ . '/includes/AjaxCalls/BlocksCallbackFront.php';
/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */

class K2_Blocks_Plugin {
    
    public function __construct() {
        // add_action('init', array($this, 'register_blocks'));
		add_action( 'init', array($this, 'k2blocks_block_assets'));
        add_action('admin_enqueue_scripts', array($this, 'enqueue_welcome_page_styles'));
        add_action('admin_menu', array($this, 'k2_blocks_welcome_page'));
        add_action('wp_enqueue_scripts', array($this, 'k2_blocks_register_custom_scripts'));
		add_action( 'wp_enqueue_scripts',array($this, 'enqueue_k2_font_awesome' ));
		add_action( 'admin_enqueue_scripts',array($this, 'enqueue_k2_font_awesome' ));
		add_action('wp_ajax_save_license_key', array($this, 'save_license_key'));
		add_action( 'wp_enqueue_scripts', array($this, 'k2_chart_js'));
		add_action('init', array($this, 'k2_blocks_register_pattern_category'));
		add_action('init', array($this, 'k2_blocks_wp_block_patterns'));
		// add_action('admin_init', array($this, 'k2_blocks_redirect_after_activation'));
    }

	public function k2_blocks_register_pattern_category() {
		register_block_pattern_category(
			'k2-propanel-dashboard',
			array(
				'label' => __( 'K2 ProPanel Dashboard', 'k2-blocks' ) 
			)
		);
	}

	public function k2_blocks_wp_block_patterns()
	{
		register_block_pattern(
			'k2/k2-admin-dashboard',
			array(
				'title'       => __('Admin Dashboard', 'k2-blocks'),
	
				'description' => _x('Includes a dashboard design so that the admin can get an overview of the LMS', 'Block pattern description', 'page-intro-block'),
	
				'content'     => "<!-- wp:group {\"align\":\"full\",\"style\":{\"spacing\":{\"padding\":{\"right\":\"var:preset|spacing|80\",\"left\":\"var:preset|spacing|80\"}}},\"layout\":{\"type\":\"constrained\"}} -->\r\n<div class=\"wp-block-group alignfull\" style=\"padding-right:var(--wp--preset--spacing--80);padding-left:var(--wp--preset--spacing--80)\"><!-- wp:columns {\"style\":{\"spacing\":{\"padding\":{\"bottom\":\"var:preset|spacing|50\"}}}} -->\r\n<div class=\"wp-block-columns\" style=\"padding-bottom:var(--wp--preset--spacing--50)\"><!-- wp:column {\"verticalAlignment\":\"bottom\"} -->\r\n<div class=\"wp-block-column is-vertically-aligned-bottom\"><!-- wp:heading {\"textAlign\":\"left\"} -->\r\n<h2 class=\"wp-block-heading has-text-align-left\">LMS Overview</h2>\r\n<!-- /wp:heading -->\r\n\r\n<!-- wp:k2/totalcourses {\"k2LdCoursedata\":[243,247,318,483],\"K2ldHeadingSize\":16,\"k2ldImageWidth\":80,\"K2LDgroupList\":[{\"ID\":260,\"post_author\":\"1\",\"post_date\":\"2024-03-26 06:55:35\",\"post_date_gmt\":\"2024-03-26 06:55:35\",\"post_content\":\"\\u003c!\\u002d\\u002d wp:paragraph \\u002d\\u002d\\u003e\\n\\u003cp\\u003etest group course 1 content\\u003c/p\\u003e\\n\\u003c!\\u002d\\u002d /wp:paragraph \\u002d\\u002d\\u003e\",\"post_title\":\"test group course 1\",\"post_excerpt\":\"\",\"post_status\":\"publish\",\"comment_status\":\"closed\",\"ping_status\":\"closed\",\"post_password\":\"\",\"post_name\":\"test-group-course-1\",\"to_ping\":\"\",\"pinged\":\"\",\"post_modified\":\"2024-03-28 10:45:01\",\"post_modified_gmt\":\"2024-03-28 10:45:01\",\"post_content_filtered\":\"\",\"post_parent\":0,\"guid\":\"http://localhost/fastBlocks/?post_type=groups\\u0026#038;p=260\",\"menu_order\":0,\"post_type\":\"groups\",\"post_mime_type\":\"\",\"comment_count\":\"0\",\"filter\":\"raw\"}]} -->\r\n<div class=\"wp-block-k2-totalcourses\"><div class=\"k2_ld_total_course_parent_container_save\" data-coursefilter=\"all\" style=\"padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;margin-top:0px;margin-right:6px;margin-bottom:0px;margin-left:0px;border-color:#0FAE96;border-style:solid;border-width:1px;border-top-left-radius:10px;border-top-right-radius:10px;border-bottom-right-radius:10px;border-bottom-left-radius:10px;background:#fff\"><div class=\"k2_ld_total_course_left\"><h4 style=\"font-size:16px;font-family:Montserrat, san-serif;color:#1D1D1D\">Total Courses</h4><h3 style=\"font-size:26px\">4</h3></div><div class=\"k2_ld_total_course_right\"><div class=\"k2_ld_total_course_image_container\" style=\"background-color:#52BF3F;border-top-left-radius:10px;border-top-right-radius:10px;border-bottom-right-radius:10px;border-bottom-left-radius:10px;justify-content:center\"><img src=\"http://k2blocks.com/wp-content/uploads/2024/05/book-2.png\" style=\"width:80%\"/></div></div></div></div>\r\n<!-- /wp:k2/totalcourses --></div>\r\n<!-- /wp:column -->\r\n\r\n<!-- wp:column {\"verticalAlignment\":\"bottom\"} -->\r\n<div class=\"wp-block-column is-vertically-aligned-bottom\"><!-- wp:k2/totalstudents {\"k2_total_courses_student\":[{\"id\":243,\"title\":\"Test course 1\"},{\"id\":247,\"title\":\"Test Course 2\"},{\"id\":318,\"title\":\"Test Course 3\"},{\"id\":483,\"title\":\"Test course 4\"}],\"SelectedK2CourseForStudent\":\"243\",\"NumberOfStudents\":[\"4\",\"2\",\"6\",\"5\",\"3\"],\"K2ldHeadingSizeStudents\":16,\"k2ldImageWidthStudents\":80} -->\r\n<div class=\"wp-block-k2-totalstudents\"><div class=\"k2_ld_total_course_parent_container_save\" style=\"padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;margin-top:0px;margin-right:6px;margin-bottom:0px;margin-left:0px;border-color:#0FAE96;border-style:solid;border-width:1px;border-top-left-radius:10px;border-top-right-radius:10px;border-bottom-right-radius:10px;border-bottom-left-radius:10px\"><div class=\"k2_ld_total_course_left\"><h4 style=\"font-size:16px;font-family:Montserrat, san-serif;color:#1D1D1D\">Total Students</h4><h3 style=\"font-size:26px\">5</h3></div><div class=\"k2_ld_total_course_right\"><div class=\"k2_ld_total_course_image_container\" style=\"background-color:#A64E9C;border-top-left-radius:10px;border-top-right-radius:10px;border-bottom-right-radius:10px;border-bottom-left-radius:10px;justify-content:center\"><img src=\"http://k2blocks.com/wp-content/uploads/2024/04/graduation.png\" style=\"width:80%\"/></div></div></div></div>\r\n<!-- /wp:k2/totalstudents --></div>\r\n<!-- /wp:column -->\r\n\r\n<!-- wp:column {\"verticalAlignment\":\"bottom\"} -->\r\n<div class=\"wp-block-column is-vertically-aligned-bottom\"><!-- wp:k2/certificatesgenerated {\"k2_total_courses_string\":\"[243,247,318,483]\",\"SelectedK2Course\":\"243\",\"no_of_certificates\":1,\"K2ldHeadingSize\":16,\"k2ldImageWidth\":80} -->\r\n<div class=\"wp-block-k2-certificatesgenerated\"><div class=\"k2_ld_certificate_parent_container_save\" data-courseid=\"243\" style=\"padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;margin-top:0px;margin-right:6px;margin-bottom:0px;margin-left:0px;border-color:#0FAE96;border-style:solid;border-width:1px;border-top-left-radius:10px;border-top-right-radius:10px;border-bottom-right-radius:10px;border-bottom-left-radius:10px;background:#fff\"><div class=\"k2_ld_certificate_left\"><h4 style=\"font-size:16px;font-family:Montserrat, san-serif;color:#1D1D1D\">Total Certificates Generated</h4><h3 style=\"font-size:26px\">1</h3></div><div class=\"k2_ld_certificate_right\"><div class=\"k2_ld_certificate_image_container\" style=\"background-color:#52BF3F;border-top-left-radius:10px;border-top-right-radius:10px;border-bottom-right-radius:10px;border-bottom-left-radius:10px;justify-content:center\"><img src=\"http://k2blocks.com/wp-content/uploads/2024/05/certificate.png\" style=\"width:80%\"/></div></div></div></div>\r\n<!-- /wp:k2/certificatesgenerated --></div>\r\n<!-- /wp:column --></div>\r\n<!-- /wp:columns -->\r\n\r\n<!-- wp:columns {\"style\":{\"spacing\":{\"padding\":{\"bottom\":\"var:preset|spacing|50\"}}}} -->\r\n<div class=\"wp-block-columns\" style=\"padding-bottom:var(--wp--preset--spacing--50)\"><!-- wp:column {\"width\":\"100%\"} -->\r\n<div class=\"wp-block-column\" style=\"flex-basis:100%\"><!-- wp:heading {\"textAlign\":\"left\"} -->\r\n<h2 class=\"wp-block-heading has-text-align-left\">Course Overview</h2>\r\n<!-- /wp:heading -->\r\n\r\n<!-- wp:k2/studentcoursestats {\"k2LdCoursedata\":[{\"id\":243,\"title\":\"Test course 1\",\"status\":{\"lessons\":{\"245\":1,\"298\":0,\"300\":0,\"302\":0,\"304\":0},\"topics\":{\"245\":{\"406\":0,\"411\":0},\"298\":{\"413\":0},\"300\":[],\"302\":[],\"304\":[]},\"completed\":8,\"total\":8,\"last_id\":245,\"status\":\"completed\"}},{\"id\":247,\"title\":\"Test Course 2\",\"status\":{\"lessons\":{\"249\":1,\"306\":1,\"308\":0},\"topics\":{\"249\":[],\"306\":[],\"308\":[]},\"completed\":2,\"total\":3,\"last_id\":306,\"status\":\"in_progress\"}},{\"id\":318,\"title\":\"Test Course 3\",\"status\":{\"lessons\":{\"502\":1,\"534\":0},\"topics\":{\"502\":[],\"534\":[]},\"completed\":2,\"total\":2,\"last_id\":502,\"status\":\"completed\"}},{\"id\":483,\"title\":\"Test course 4\",\"status\":{\"lessons\":[],\"topics\":[],\"completed\":0,\"total\":0,\"last_id\":0,\"status\":\"not_started\"}}],\"k2ldCourseStatDirection\":\"column\",\"k2ldCourseCardColwidth\":100,\"K2ldHeadingSize\":16,\"k2ldImageWidth\":50,\"K2ldHeadingSizeInProgress\":16,\"k2ldImageWidthInProgress\":50,\"K2ldHeadingSizeCompleted\":16,\"k2ldImageWidthCompleted\":50} -->\r\n<div class=\"wp-block-k2-studentcoursestats Student_course_stats_LD_main\" style=\"flex-direction:column\"><div class=\"k2_ld_total_course_parent_container_save\" style=\"padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;margin-top:0px;margin-right:6px;margin-bottom:0px;margin-left:0px;border-color:#0FAE96;border-style:solid;border-width:1px;border-top-left-radius:10px;border-top-right-radius:10px;border-bottom-right-radius:10px;border-bottom-left-radius:10px;background:#fff;width:100%\"><div class=\"k2_ld_total_course_left\"><h4 style=\"font-size:16px;font-family:Montserrat, san-serif;color:#1D1D1D\">Not Started</h4><h3 style=\"font-size:26px\" id=\"student_stat_not_started\">1</h3></div><div class=\"k2_ld_total_course_right\"><div class=\"k2_ld_total_course_image_container\" style=\"background-color:#0F4030;border-top-left-radius:10px;border-top-right-radius:10px;border-bottom-right-radius:10px;border-bottom-left-radius:10px;justify-content:center\"><img src=\"http://k2blocks.com/wp-content/uploads/2024/04/book.png\" style=\"width:50%\"/></div></div></div><div class=\"k2_ld_total_course_parent_container_save\" style=\"padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;margin-top:0px;margin-right:6px;margin-bottom:0px;margin-left:0px;border-color:#0FAE96;border-style:solid;border-width:1px;border-top-left-radius:10px;border-top-right-radius:10px;border-bottom-right-radius:10px;border-bottom-left-radius:10px;background:#fff;width:100%\"><div class=\"k2_ld_total_course_left\"><h4 style=\"font-size:16px;font-family:Montserrat, san-serif;color:#1D1D1D\">In-Progress</h4><h3 style=\"font-size:26px\" id=\"student_stat_in_progress\">1</h3></div><div class=\"k2_ld_total_course_right\"><div class=\"k2_ld_total_course_image_container\" style=\"background-color:#1AA379;border-top-left-radius:10px;border-top-right-radius:10px;border-bottom-right-radius:10px;border-bottom-left-radius:10px;justify-content:center\"><img src=\"http://k2blocks.com/wp-content/uploads/2024/04/open-book.png\" style=\"width:50%\"/></div></div></div><div class=\"k2_ld_total_course_parent_container_save\" style=\"padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;margin-top:0px;margin-right:6px;margin-bottom:0px;margin-left:0px;border-color:#0FAE96;border-style:solid;border-width:1px;border-top-left-radius:10px;border-top-right-radius:10px;border-bottom-right-radius:10px;border-bottom-left-radius:10px;background:#fff;width:100%\"><div class=\"k2_ld_total_course_left\"><h4 style=\"font-size:16px;font-family:Montserrat, san-serif;color:#1D1D1D\">Completed</h4><h3 style=\"font-size:26px\" id=\"student_stat_completed\">2</h3></div><div class=\"k2_ld_total_course_right\"><div class=\"k2_ld_total_course_image_container\" style=\"background-color:#26063C;border-top-left-radius:10px;border-top-right-radius:10px;border-bottom-right-radius:10px;border-bottom-left-radius:10px;justify-content:center\"><img src=\"http://k2blocks.com/wp-content/uploads/2024/04/loading.png\" style=\"width:50%\"/></div></div></div></div>\r\n<!-- /wp:k2/studentcoursestats --></div>\r\n<!-- /wp:column -->\r\n\r\n<!-- wp:column {\"width\":\"100%\"} -->\r\n<div class=\"wp-block-column\" style=\"flex-basis:100%\"><!-- wp:heading {\"textAlign\":\"left\",\"style\":{\"spacing\":{\"margin\":{\"right\":\"1rem\",\"left\":\"1rem\"}}}} -->\r\n<h2 class=\"wp-block-heading has-text-align-left\" style=\"margin-right:1rem;margin-left:1rem\">Daily Enrollments</h2>\r\n<!-- /wp:heading -->\r\n\r\n<!-- wp:k2/dailyenrollments {\"LDChartid\":\"myChart-dUKma8jfie8xFtRB46kH8M\"} -->\r\n<div class=\"wp-block-k2-dailyenrollments\" style=\"display:flex;justify-content:center\"><div class=\"K2-LD-chart-main-parent-container\" style=\"width:700px;height:400px\" data-keys=\"[\&quot;5/4/2024\&quot;,\&quot;5/5/2024\&quot;,\&quot;5/6/2024\&quot;,\&quot;5/7/2024\&quot;,\&quot;5/8/2024\&quot;,\&quot;5/9/2024\&quot;,\&quot;5/10/2024\&quot;]\" data-chartid=\"myChart-dUKma8jfie8xFtRB46kH8M\" data-values=\"[0,0,2,0,0,0,0]\" data-graphcolor=\"rgba(75, 192, 192, 1)\"><canvas role=\"img\" id=\"myChart-dUKma8jfie8xFtRB46kH8M\" width=\"250\" height=\"250\"></canvas></div></div>\r\n<!-- /wp:k2/dailyenrollments --></div>\r\n<!-- /wp:column --></div>\r\n<!-- /wp:columns -->\r\n\r\n<!-- wp:columns -->\r\n<div class=\"wp-block-columns\"><!-- wp:column -->\r\n<div class=\"wp-block-column\"><!-- wp:heading {\"textAlign\":\"left\"} -->\r\n<h2 class=\"wp-block-heading has-text-align-left\">Assignment overview</h2>\r\n<!-- /wp:heading -->\r\n\r\n<!-- wp:k2/assignmentstats {\"k2_total_courses\":[{\"id\":243,\"title\":\"Test course 1\"},{\"id\":247,\"title\":\"Test Course 2\"},{\"id\":318,\"title\":\"Test Course 3\"},{\"id\":483,\"title\":\"Test course 4\"}],\"SelectedK2Course\":\"318\",\"no_of_assignments\":{\"assignment_count\":2,\"approved_count\":1,\"pending_approved_count\":1,\"assignment_meta\":{\"id\":528,\"approval_status\":\"1\"}},\"K2ldHeadingSize\":16,\"k2ldImageWidth\":80,\"K2ldHeadingSizeInProgress\":16,\"k2ldImageWidthInProgress\":80,\"K2ldHeadingSizeCompleted\":16,\"k2ldImageWidthCompleted\":80} -->\r\n<div class=\"wp-block-k2-assignmentstats Student_assignment_stats_LD_main_save\" style=\"flex-direction:row\" data-courseid=\"318\"><div class=\"k2_ld_total_assignment_parent_container_save\" style=\"padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;margin-top:0px;margin-right:6px;margin-bottom:0px;margin-left:0px;border-color:#0FAE96;border-style:solid;border-width:1px;border-top-left-radius:10px;border-top-right-radius:10px;border-bottom-right-radius:10px;border-bottom-left-radius:10px;background:#fff\"><div class=\"k2_ld_total_assignment_left\"><h4 style=\"font-size:16px;font-family:Montserrat, san-serif;color:#1D1D1D\">Total Assignments</h4><h3 style=\"font-size:26px\" id=\"assignment_stat_total\"></h3></div><div class=\"k2_ld_total_assignment_right\"><div class=\"k2_ld_total_assignment_image_container\" style=\"background-color:#0F4030;border-top-left-radius:10px;border-top-right-radius:10px;border-bottom-right-radius:10px;border-bottom-left-radius:10px;justify-content:center\"><img src=\"http://k2blocks.com/wp-content/uploads/2024/04/book.png\" style=\"width:80%\"/></div></div></div><div class=\"k2_ld_total_assignment_parent_container_save\" style=\"padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;margin-top:0px;margin-right:6px;margin-bottom:0px;margin-left:0px;border-color:#0FAE96;border-style:solid;border-width:1px;border-top-left-radius:10px;border-top-right-radius:10px;border-bottom-right-radius:10px;border-bottom-left-radius:10px;background:#fff\"><div class=\"k2_ld_total_assignment_left\"><h4 style=\"font-size:16px;font-family:Montserrat, san-serif;color:#1D1D1D\">Approved Assignments</h4><h3 style=\"font-size:26px\" id=\"assignment_stat_approved\"></h3></div><div class=\"k2_ld_total_assignment_right\"><div class=\"k2_ld_total_assignment_image_container\" style=\"background-color:#1AA379;border-top-left-radius:10px;border-top-right-radius:10px;border-bottom-right-radius:10px;border-bottom-left-radius:10px;justify-content:center\"><img src=\"http://k2blocks.com/wp-content/uploads/2024/04/open-book.png\" style=\"width:80%\"/></div></div></div><div class=\"k2_ld_total_assignment_parent_container_save\" style=\"padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;margin-top:0px;margin-right:6px;margin-bottom:0px;margin-left:0px;border-color:#0FAE96;border-style:solid;border-width:1px;border-top-left-radius:10px;border-top-right-radius:10px;border-bottom-right-radius:10px;border-bottom-left-radius:10px;background:#fff\"><div class=\"k2_ld_total_assignment_left\"><h4 style=\"font-size:16px;font-family:Montserrat, san-serif;color:#1D1D1D\">Pending Assignments</h4><h3 style=\"font-size:26px\" id=\"assignment_stat_pending\"></h3></div><div class=\"k2_ld_total_assignment_right\"><div class=\"k2_ld_total_assignment_image_container\" style=\"background-color:#26063C;border-top-left-radius:10px;border-top-right-radius:10px;border-bottom-right-radius:10px;border-bottom-left-radius:10px;justify-content:center\"><img src=\"http://k2blocks.com/wp-content/uploads/2024/04/loading.png\" style=\"width:80%\"/></div></div></div></div>\r\n<!-- /wp:k2/assignmentstats --></div>\r\n<!-- /wp:column --></div>\r\n<!-- /wp:columns --></div>\r\n<!-- /wp:group -->",
	
				'categories'  => array('k2-propanel-dashboard')
			)
		);
		register_block_pattern(
			'k2/k2-student-dashboard',
			array(
				'title'       => __('Student Dashboard', 'k2-blocks'),
	
				'description' => _x('Includes a dashboard design so that the Students can get an overview of the LMS', 'Block pattern description', 'page-intro-block'),
	
				'content'     => "<!-- wp:group {\"align\":\"full\",\"style\":{\"spacing\":{\"padding\":{\"right\":\"var:preset|spacing|80\",\"left\":\"var:preset|spacing|80\"}}},\"layout\":{\"type\":\"constrained\"}} -->\r\n<div class=\"wp-block-group alignfull\" style=\"padding-right:var(--wp--preset--spacing--80);padding-left:var(--wp--preset--spacing--80)\"><!-- wp:columns {\"style\":{\"spacing\":{\"padding\":{\"bottom\":\"var:preset|spacing|50\"}}}} -->\r\n<div class=\"wp-block-columns\" style=\"padding-bottom:var(--wp--preset--spacing--50)\"><!-- wp:column {\"verticalAlignment\":\"bottom\"} -->\r\n<div class=\"wp-block-column is-vertically-aligned-bottom\"><!-- wp:heading {\"textAlign\":\"left\"} -->\r\n<h2 class=\"wp-block-heading has-text-align-left\">LMS Overview</h2>\r\n<!-- /wp:heading -->\r\n\r\n<!-- wp:k2/totalcourses {\"k2LdCoursedata\":[243,247,318,483],\"K2ldHeadingSize\":16,\"k2ldImageWidth\":80,\"K2LDgroupList\":[{\"ID\":260,\"post_author\":\"1\",\"post_date\":\"2024-03-26 06:55:35\",\"post_date_gmt\":\"2024-03-26 06:55:35\",\"post_content\":\"\\u003c!\\u002d\\u002d wp:paragraph \\u002d\\u002d\\u003e\\n\\u003cp\\u003etest group course 1 content\\u003c/p\\u003e\\n\\u003c!\\u002d\\u002d /wp:paragraph \\u002d\\u002d\\u003e\",\"post_title\":\"test group course 1\",\"post_excerpt\":\"\",\"post_status\":\"publish\",\"comment_status\":\"closed\",\"ping_status\":\"closed\",\"post_password\":\"\",\"post_name\":\"test-group-course-1\",\"to_ping\":\"\",\"pinged\":\"\",\"post_modified\":\"2024-03-28 10:45:01\",\"post_modified_gmt\":\"2024-03-28 10:45:01\",\"post_content_filtered\":\"\",\"post_parent\":0,\"guid\":\"http://localhost/fastBlocks/?post_type=groups\\u0026#038;p=260\",\"menu_order\":0,\"post_type\":\"groups\",\"post_mime_type\":\"\",\"comment_count\":\"0\",\"filter\":\"raw\"}]} -->\r\n<div class=\"wp-block-k2-totalcourses\"><div class=\"k2_ld_total_course_parent_container_save\" data-coursefilter=\"all\" style=\"padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;margin-top:0px;margin-right:6px;margin-bottom:0px;margin-left:0px;border-color:#0FAE96;border-style:solid;border-width:1px;border-top-left-radius:10px;border-top-right-radius:10px;border-bottom-right-radius:10px;border-bottom-left-radius:10px;background:#fff\"><div class=\"k2_ld_total_course_left\"><h4 style=\"font-size:16px;font-family:Montserrat, san-serif;color:#1D1D1D\">Total Courses</h4><h3 style=\"font-size:26px\">4</h3></div><div class=\"k2_ld_total_course_right\"><div class=\"k2_ld_total_course_image_container\" style=\"background-color:#52BF3F;border-top-left-radius:10px;border-top-right-radius:10px;border-bottom-right-radius:10px;border-bottom-left-radius:10px;justify-content:center\"><img src=\"http://k2blocks.com/wp-content/uploads/2024/05/book-2.png\" style=\"width:80%\"/></div></div></div></div>\r\n<!-- /wp:k2/totalcourses --></div>\r\n<!-- /wp:column -->\r\n\r\n<!-- wp:column {\"verticalAlignment\":\"bottom\"} -->\r\n<div class=\"wp-block-column is-vertically-aligned-bottom\"><!-- wp:k2/totallessons {\"k2_total_courses\":[{\"id\":243,\"title\":\"Test course 1\"},{\"id\":247,\"title\":\"Test Course 2\"},{\"id\":318,\"title\":\"Test Course 3\"},{\"id\":483,\"title\":\"Test course 4\"}],\"K2ldHeadingSizeLessons\":16,\"k2ldImageWidthLessons\":80} -->\r\n<div class=\"wp-block-k2-totallessons\"><div class=\"k2_ld_total_course_parent_container_save\" style=\"padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;margin-top:0px;margin-right:6px;margin-bottom:0px;margin-left:0px;border-color:#0FAE96;border-style:solid;border-width:1px;border-top-left-radius:10px;border-top-right-radius:10px;border-bottom-right-radius:10px;border-bottom-left-radius:10px\"><div class=\"k2_ld_total_course_left\"><h4 style=\"font-size:16px;font-family:Montserrat, san-serif;color:#1D1D1D\">Total Lessons</h4><h3 style=\"font-size:26px\"></h3></div><div class=\"k2_ld_total_course_right\"><div class=\"k2_ld_total_course_image_container\" style=\"background-color:#26063C;border-top-left-radius:10px;border-top-right-radius:10px;border-bottom-right-radius:10px;border-bottom-left-radius:10px;justify-content:center\"><img src=\"http://k2blocks.com/wp-content/uploads/2024/05/learning.png\" style=\"width:80%\"/></div></div></div></div>\r\n<!-- /wp:k2/totallessons --></div>\r\n<!-- /wp:column -->\r\n\r\n<!-- wp:column {\"verticalAlignment\":\"bottom\"} -->\r\n<div class=\"wp-block-column is-vertically-aligned-bottom\"><!-- wp:k2/totalquizzes {\"k2_total_courses_quiz\":[{\"id\":243,\"title\":\"Test course 1\"},{\"id\":247,\"title\":\"Test Course 2\"},{\"id\":318,\"title\":\"Test Course 3\"},{\"id\":483,\"title\":\"Test course 4\"}],\"k2_total_lessons_quiz\":[{\"ID\":534,\"post_title\":\"Test course 3 lesson 2\"},{\"ID\":502,\"post_title\":\"test course 3 lesson 1\"},{\"ID\":308,\"post_title\":\"Test course 2 lesson 3\"},{\"ID\":306,\"post_title\":\"Test course 2 lesson 2\"},{\"ID\":304,\"post_title\":\"Test COurse 1 Lesson 5\"},{\"ID\":302,\"post_title\":\"Test COurse 1 Lesson 4\"},{\"ID\":300,\"post_title\":\"Test COurse1 Lesson 3\"},{\"ID\":298,\"post_title\":\"Test COurse 1 Lesson 2\"},{\"ID\":249,\"post_title\":\"Test course 2 lesson 1\"},{\"ID\":245,\"post_title\":\"Test course 1 Lesson 1\"}],\"k2_total_group_quiz\":[{\"ID\":260,\"post_author\":\"1\",\"post_date\":\"2024-03-26 06:55:35\",\"post_date_gmt\":\"2024-03-26 06:55:35\",\"post_content\":\"\\u003c!\\u002d\\u002d wp:paragraph \\u002d\\u002d\\u003e\\n\\u003cp\\u003etest group course 1 content\\u003c/p\\u003e\\n\\u003c!\\u002d\\u002d /wp:paragraph \\u002d\\u002d\\u003e\",\"post_title\":\"test group course 1\",\"post_excerpt\":\"\",\"post_status\":\"publish\",\"comment_status\":\"closed\",\"ping_status\":\"closed\",\"post_password\":\"\",\"post_name\":\"test-group-course-1\",\"to_ping\":\"\",\"pinged\":\"\",\"post_modified\":\"2024-03-28 10:45:01\",\"post_modified_gmt\":\"2024-03-28 10:45:01\",\"post_content_filtered\":\"\",\"post_parent\":0,\"guid\":\"http://localhost/fastBlocks/?post_type=groups\\u0026#038;p=260\",\"menu_order\":0,\"post_type\":\"groups\",\"post_mime_type\":\"\",\"comment_count\":\"0\",\"filter\":\"raw\"}],\"NumberOfQuizs\":[443,105,100],\"K2ldHeadingSizeQuizs\":16,\"k2ldImageWidthQuizs\":80} -->\r\n<div class=\"wp-block-k2-totalquizzes\"><div class=\"k2_ld_total_course_parent_container_save\" style=\"padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;margin-top:0px;margin-right:6px;margin-bottom:0px;margin-left:0px;border-color:#0FAE96;border-style:solid;border-width:1px;border-top-left-radius:10px;border-top-right-radius:10px;border-bottom-right-radius:10px;border-bottom-left-radius:10px\"><div class=\"k2_ld_total_course_left\"><h4 style=\"font-size:16px;font-family:Montserrat, san-serif;color:#1D1D1D\">Total Topics</h4><h3 style=\"font-size:26px\">3</h3></div><div class=\"k2_ld_total_course_right\"><div class=\"k2_ld_total_course_image_container\" style=\"background-color:#3D7AB3;border-top-left-radius:10px;border-top-right-radius:10px;border-bottom-right-radius:10px;border-bottom-left-radius:10px;justify-content:center\"><img src=\"http://k2blocks.com/wp-content/uploads/2024/04/quizz.png\" style=\"width:80%\"/></div></div></div></div>\r\n<!-- /wp:k2/totalquizzes --></div>\r\n<!-- /wp:column --></div>\r\n<!-- /wp:columns -->\r\n\r\n<!-- wp:columns -->\r\n<div class=\"wp-block-columns\"><!-- wp:column -->\r\n<div class=\"wp-block-column\"><!-- wp:heading {\"textAlign\":\"left\"} -->\r\n<h2 class=\"wp-block-heading has-text-align-left\">Course Overview</h2>\r\n<!-- /wp:heading -->\r\n\r\n<!-- wp:k2/studentcoursestats {\"k2LdCoursedata\":[{\"id\":243,\"title\":\"Test course 1\",\"status\":{\"lessons\":{\"245\":1,\"298\":0,\"300\":0,\"302\":0,\"304\":0},\"topics\":{\"245\":{\"406\":0,\"411\":0},\"298\":{\"413\":0},\"300\":[],\"302\":[],\"304\":[]},\"completed\":8,\"total\":8,\"last_id\":245,\"status\":\"completed\"}},{\"id\":247,\"title\":\"Test Course 2\",\"status\":{\"lessons\":{\"249\":1,\"306\":1,\"308\":0},\"topics\":{\"249\":[],\"306\":[],\"308\":[]},\"completed\":2,\"total\":3,\"last_id\":306,\"status\":\"in_progress\"}},{\"id\":318,\"title\":\"Test Course 3\",\"status\":{\"lessons\":{\"502\":1,\"534\":0},\"topics\":{\"502\":[],\"534\":[]},\"completed\":2,\"total\":2,\"last_id\":502,\"status\":\"completed\"}},{\"id\":483,\"title\":\"Test course 4\",\"status\":{\"lessons\":[],\"topics\":[],\"completed\":0,\"total\":0,\"last_id\":0,\"status\":\"not_started\"}}],\"K2ldHeadingSize\":16,\"k2ldImageWidth\":80,\"K2ldHeadingSizeInProgress\":16,\"k2ldImageWidthInProgress\":80,\"K2ldHeadingSizeCompleted\":16,\"k2ldImageWidthCompleted\":80} -->\r\n<div class=\"wp-block-k2-studentcoursestats Student_course_stats_LD_main\" style=\"flex-direction:row\"><div class=\"k2_ld_total_course_parent_container_save\" style=\"padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;margin-top:0px;margin-right:6px;margin-bottom:0px;margin-left:0px;border-color:#0FAE96;border-style:solid;border-width:1px;border-top-left-radius:10px;border-top-right-radius:10px;border-bottom-right-radius:10px;border-bottom-left-radius:10px;background:#fff\"><div class=\"k2_ld_total_course_left\"><h4 style=\"font-size:16px;font-family:Montserrat, san-serif;color:#1D1D1D\">Not Started</h4><h3 style=\"font-size:26px\" id=\"student_stat_not_started\">1</h3></div><div class=\"k2_ld_total_course_right\"><div class=\"k2_ld_total_course_image_container\" style=\"background-color:#0F4030;border-top-left-radius:10px;border-top-right-radius:10px;border-bottom-right-radius:10px;border-bottom-left-radius:10px;justify-content:center\"><img src=\"http://k2blocks.com/wp-content/uploads/2024/04/book.png\" style=\"width:80%\"/></div></div></div><div class=\"k2_ld_total_course_parent_container_save\" style=\"padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;margin-top:0px;margin-right:6px;margin-bottom:0px;margin-left:0px;border-color:#0FAE96;border-style:solid;border-width:1px;border-top-left-radius:10px;border-top-right-radius:10px;border-bottom-right-radius:10px;border-bottom-left-radius:10px;background:#fff\"><div class=\"k2_ld_total_course_left\"><h4 style=\"font-size:16px;font-family:Montserrat, san-serif;color:#1D1D1D\">In-Progress</h4><h3 style=\"font-size:26px\" id=\"student_stat_in_progress\">1</h3></div><div class=\"k2_ld_total_course_right\"><div class=\"k2_ld_total_course_image_container\" style=\"background-color:#1AA379;border-top-left-radius:10px;border-top-right-radius:10px;border-bottom-right-radius:10px;border-bottom-left-radius:10px;justify-content:center\"><img src=\"http://k2blocks.com/wp-content/uploads/2024/04/open-book.png\" style=\"width:80%\"/></div></div></div><div class=\"k2_ld_total_course_parent_container_save\" style=\"padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;margin-top:0px;margin-right:6px;margin-bottom:0px;margin-left:0px;border-color:#0FAE96;border-style:solid;border-width:1px;border-top-left-radius:10px;border-top-right-radius:10px;border-bottom-right-radius:10px;border-bottom-left-radius:10px;background:#fff\"><div class=\"k2_ld_total_course_left\"><h4 style=\"font-size:16px;font-family:Montserrat, san-serif;color:#1D1D1D\">Completed</h4><h3 style=\"font-size:26px\" id=\"student_stat_completed\">2</h3></div><div class=\"k2_ld_total_course_right\"><div class=\"k2_ld_total_course_image_container\" style=\"background-color:#26063C;border-top-left-radius:10px;border-top-right-radius:10px;border-bottom-right-radius:10px;border-bottom-left-radius:10px;justify-content:center\"><img src=\"http://k2blocks.com/wp-content/uploads/2024/04/loading.png\" style=\"width:80%\"/></div></div></div></div>\r\n<!-- /wp:k2/studentcoursestats --></div>\r\n<!-- /wp:column --></div>\r\n<!-- /wp:columns -->\r\n\r\n<!-- wp:columns -->\r\n<div class=\"wp-block-columns\"><!-- wp:column -->\r\n<div class=\"wp-block-column\"><!-- wp:heading {\"textAlign\":\"left\"} -->\r\n<h2 class=\"wp-block-heading has-text-align-left\">Assignment overview</h2>\r\n<!-- /wp:heading -->\r\n\r\n<!-- wp:k2/assignmentstats {\"k2_total_courses\":[{\"id\":243,\"title\":\"Test course 1\"},{\"id\":247,\"title\":\"Test Course 2\"},{\"id\":318,\"title\":\"Test Course 3\"},{\"id\":483,\"title\":\"Test course 4\"}],\"K2ldHeadingSize\":16,\"k2ldImageWidth\":82,\"K2ldHeadingSizeInProgress\":16,\"k2ldImageWidthInProgress\":80,\"K2ldHeadingSizeCompleted\":16,\"k2ldImageWidthCompleted\":80} -->\r\n<div class=\"wp-block-k2-assignmentstats Student_assignment_stats_LD_main_save\" style=\"flex-direction:row\"><div class=\"k2_ld_total_assignment_parent_container_save\" style=\"padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;margin-top:0px;margin-right:6px;margin-bottom:0px;margin-left:0px;border-color:#0FAE96;border-style:solid;border-width:1px;border-top-left-radius:10px;border-top-right-radius:10px;border-bottom-right-radius:10px;border-bottom-left-radius:10px;background:#fff\"><div class=\"k2_ld_total_assignment_left\"><h4 style=\"font-size:16px;font-family:Montserrat, san-serif;color:#1D1D1D\">Total Assignments</h4><h3 style=\"font-size:26px\" id=\"assignment_stat_total\"></h3></div><div class=\"k2_ld_total_assignment_right\"><div class=\"k2_ld_total_assignment_image_container\" style=\"background-color:#0F4030;border-top-left-radius:10px;border-top-right-radius:10px;border-bottom-right-radius:10px;border-bottom-left-radius:10px;justify-content:center\"><img src=\"http://k2blocks.com/wp-content/uploads/2024/04/book.png\" style=\"width:82%\"/></div></div></div><div class=\"k2_ld_total_assignment_parent_container_save\" style=\"padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;margin-top:0px;margin-right:6px;margin-bottom:0px;margin-left:0px;border-color:#0FAE96;border-style:solid;border-width:1px;border-top-left-radius:10px;border-top-right-radius:10px;border-bottom-right-radius:10px;border-bottom-left-radius:10px;background:#fff\"><div class=\"k2_ld_total_assignment_left\"><h4 style=\"font-size:16px;font-family:Montserrat, san-serif;color:#1D1D1D\">Approved Assignments</h4><h3 style=\"font-size:26px\" id=\"assignment_stat_approved\"></h3></div><div class=\"k2_ld_total_assignment_right\"><div class=\"k2_ld_total_assignment_image_container\" style=\"background-color:#1AA379;border-top-left-radius:10px;border-top-right-radius:10px;border-bottom-right-radius:10px;border-bottom-left-radius:10px;justify-content:center\"><img src=\"http://k2blocks.com/wp-content/uploads/2024/04/open-book.png\" style=\"width:80%\"/></div></div></div><div class=\"k2_ld_total_assignment_parent_container_save\" style=\"padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;margin-top:0px;margin-right:6px;margin-bottom:0px;margin-left:0px;border-color:#0FAE96;border-style:solid;border-width:1px;border-top-left-radius:10px;border-top-right-radius:10px;border-bottom-right-radius:10px;border-bottom-left-radius:10px;background:#fff\"><div class=\"k2_ld_total_assignment_left\"><h4 style=\"font-size:16px;font-family:Montserrat, san-serif;color:#1D1D1D\">Pending Assignments</h4><h3 style=\"font-size:26px\" id=\"assignment_stat_pending\"></h3></div><div class=\"k2_ld_total_assignment_right\"><div class=\"k2_ld_total_assignment_image_container\" style=\"background-color:#26063C;border-top-left-radius:10px;border-top-right-radius:10px;border-bottom-right-radius:10px;border-bottom-left-radius:10px;justify-content:center\"><img src=\"http://k2blocks.com/wp-content/uploads/2024/04/loading.png\" style=\"width:80%\"/></div></div></div></div>\r\n<!-- /wp:k2/assignmentstats --></div>\r\n<!-- /wp:column --></div>\r\n<!-- /wp:columns -->\r\n\r\n<!-- wp:columns -->\r\n<div class=\"wp-block-columns\"><!-- wp:column -->\r\n<div class=\"wp-block-column\"><!-- wp:heading {\"textAlign\":\"left\"} -->\r\n<h2 class=\"wp-block-heading has-text-align-left\">Available Courses</h2>\r\n<!-- /wp:heading -->\r\n\r\n<!-- wp:k2/coursegrid {\"k2LdCoursedata\":[{\"ID\":483,\"title\":\"Test course 4\",\"permalink\":\"http://localhost/fastBlocks/courses/test-course-4/\",\"image_url\":\"http://localhost/fastBlocks/wp-content/uploads/2024/04/DSC_1206-1.jpg\",\"course_type\":\"paynow\",\"course_price\":\"500 $\",\"number_of_lessons\":[],\"course_des\":\"But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and...\",\"number_of_students\":[]},{\"ID\":318,\"title\":\"Test Course 3\",\"permalink\":\"http://localhost/fastBlocks/courses/test-course-3/\",\"image_url\":\"http://localhost/fastBlocks/wp-content/uploads/2024/03/Core-Values-2-res.jpg\",\"course_type\":\"free\",\"course_price\":\"\",\"number_of_lessons\":[{\"ID\":502,\"post_author\":\"1\",\"post_date\":\"2024-04-25 12:02:25\",\"post_date_gmt\":\"2024-04-25 12:02:25\",\"post_content\":\"\\u003c!\\u002d\\u002d wp:paragraph \\u002d\\u002d\\u003e\\n\\u003cp\\u003etest course 3 lesson 1 - content test area\\u003c/p\\u003e\\n\\u003c!\\u002d\\u002d /wp:paragraph \\u002d\\u002d\\u003e\",\"post_title\":\"test course 3 lesson 1\",\"post_excerpt\":\"\",\"post_status\":\"publish\",\"comment_status\":\"closed\",\"ping_status\":\"closed\",\"post_password\":\"\",\"post_name\":\"test-course-3-lesson-1\",\"to_ping\":\"\",\"pinged\":\"\",\"post_modified\":\"2024-05-02 07:41:41\",\"post_modified_gmt\":\"2024-05-02 07:41:41\",\"post_content_filtered\":\"\",\"post_parent\":0,\"guid\":\"http://localhost/fastBlocks/?post_type=sfwd-lessons\\u0026#038;p=502\",\"menu_order\":0,\"post_type\":\"sfwd-lessons\",\"post_mime_type\":\"\",\"comment_count\":\"0\",\"filter\":\"raw\"},{\"ID\":534,\"post_author\":\"1\",\"post_date\":\"2024-05-02 07:03:06\",\"post_date_gmt\":\"2024-05-02 07:03:06\",\"post_content\":\"\\u003c!\\u002d\\u002d wp:paragraph \\u002d\\u002d\\u003e\\n\\u003cp\\u003eTest course 3 lesson 2\\u003c/p\\u003e\\n\\u003c!\\u002d\\u002d /wp:paragraph \\u002d\\u002d\\u003e\",\"post_title\":\"Test course 3 lesson 2\",\"post_excerpt\":\"\",\"post_status\":\"publish\",\"comment_status\":\"closed\",\"ping_status\":\"closed\",\"post_password\":\"\",\"post_name\":\"test-course-3-lesson-2\",\"to_ping\":\"\",\"pinged\":\"\",\"post_modified\":\"2024-05-02 07:41:47\",\"post_modified_gmt\":\"2024-05-02 07:41:47\",\"post_content_filtered\":\"\",\"post_parent\":0,\"guid\":\"http://localhost/fastBlocks/?post_type=sfwd-lessons\\u0026#038;p=534\",\"menu_order\":0,\"post_type\":\"sfwd-lessons\",\"post_mime_type\":\"\",\"comment_count\":\"0\",\"filter\":\"raw\"}],\"course_des\":\"But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and...\",\"number_of_students\":[\"3\"]},{\"ID\":247,\"title\":\"Test Course 2\",\"permalink\":\"http://localhost/fastBlocks/courses/test-course-2/\",\"image_url\":\"http://localhost/fastBlocks/wp-content/uploads/2024/03/Core-Values-3-res.jpg\",\"course_type\":\"free\",\"course_price\":\"\",\"number_of_lessons\":[{\"ID\":249,\"post_author\":\"1\",\"post_date\":\"2024-03-26 05:40:11\",\"post_date_gmt\":\"2024-03-26 05:40:11\",\"post_content\":\"\\u003c!\\u002d\\u002d wp:paragraph \\u002d\\u002d\\u003e\\n\\u003cp\\u003eTest course 2 lesson 1 content\\u003c/p\\u003e\\n\\u003c!\\u002d\\u002d /wp:paragraph \\u002d\\u002d\\u003e\",\"post_title\":\"Test course 2 lesson 1\",\"post_excerpt\":\"\",\"post_status\":\"publish\",\"comment_status\":\"closed\",\"ping_status\":\"closed\",\"post_password\":\"\",\"post_name\":\"test-course-2-lesson-1\",\"to_ping\":\"\",\"pinged\":\"\",\"post_modified\":\"2024-05-02 06:53:56\",\"post_modified_gmt\":\"2024-05-02 06:53:56\",\"post_content_filtered\":\"\",\"post_parent\":0,\"guid\":\"http://localhost/fastBlocks/?post_type=sfwd-lessons\\u0026#038;p=249\",\"menu_order\":0,\"post_type\":\"sfwd-lessons\",\"post_mime_type\":\"\",\"comment_count\":\"0\",\"filter\":\"raw\"},{\"ID\":306,\"post_author\":\"1\",\"post_date\":\"2024-03-29 05:55:54\",\"post_date_gmt\":\"2024-03-29 05:55:54\",\"post_content\":\"\",\"post_title\":\"Test course 2 lesson 2\",\"post_excerpt\":\"\",\"post_status\":\"publish\",\"comment_status\":\"closed\",\"ping_status\":\"closed\",\"post_password\":\"\",\"post_name\":\"test-course-2-lesson-2-2\",\"to_ping\":\"\",\"pinged\":\"\",\"post_modified\":\"2024-03-29 05:57:59\",\"post_modified_gmt\":\"2024-03-29 05:57:59\",\"post_content_filtered\":\"\",\"post_parent\":0,\"guid\":\"http://localhost/fastBlocks/?post_type=sfwd-lessons\\u0026#038;p=306\",\"menu_order\":0,\"post_type\":\"sfwd-lessons\",\"post_mime_type\":\"\",\"comment_count\":\"0\",\"filter\":\"raw\"},{\"ID\":308,\"post_author\":\"1\",\"post_date\":\"2024-03-29 05:56:24\",\"post_date_gmt\":\"2024-03-29 05:56:24\",\"post_content\":\"\",\"post_title\":\"Test course 2 lesson 3\",\"post_excerpt\":\"\",\"post_status\":\"publish\",\"comment_status\":\"closed\",\"ping_status\":\"closed\",\"post_password\":\"\",\"post_name\":\"test-course-2-lesson-3\",\"to_ping\":\"\",\"pinged\":\"\",\"post_modified\":\"2024-03-29 05:57:29\",\"post_modified_gmt\":\"2024-03-29 05:57:29\",\"post_content_filtered\":\"\",\"post_parent\":0,\"guid\":\"http://localhost/fastBlocks/?post_type=sfwd-lessons\\u0026#038;p=308\",\"menu_order\":0,\"post_type\":\"sfwd-lessons\",\"post_mime_type\":\"\",\"comment_count\":\"0\",\"filter\":\"raw\"}],\"course_des\":\"But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and...\",\"number_of_students\":[\"2\",\"3\",\"6\"]},{\"ID\":243,\"title\":\"Test course 1\",\"permalink\":\"http://localhost/fastBlocks/courses/test-course-1/\",\"image_url\":\"http://localhost/fastBlocks/wp-content/uploads/2024/03/Core-Values-4-res.jpg\",\"course_type\":\"open\",\"course_price\":\"\",\"number_of_lessons\":[{\"ID\":245,\"post_author\":\"1\",\"post_date\":\"2024-03-26 05:36:18\",\"post_date_gmt\":\"2024-03-26 05:36:18\",\"post_content\":\"\\u003c!\\u002d\\u002d wp:paragraph \\u002d\\u002d\\u003e\\n\\u003cp\\u003eTest course 1 Lesson 1 Content\\u003c/p\\u003e\\n\\u003c!\\u002d\\u002d /wp:paragraph \\u002d\\u002d\\u003e\",\"post_title\":\"Test course 1 Lesson 1\",\"post_excerpt\":\"\",\"post_status\":\"publish\",\"comment_status\":\"closed\",\"ping_status\":\"closed\",\"post_password\":\"\",\"post_name\":\"test-course-1-lesson-1\",\"to_ping\":\"\",\"pinged\":\"\",\"post_modified\":\"2024-03-26 05:38:27\",\"post_modified_gmt\":\"2024-03-26 05:38:27\",\"post_content_filtered\":\"\",\"post_parent\":0,\"guid\":\"http://localhost/fastBlocks/?post_type=sfwd-lessons\\u0026#038;p=245\",\"menu_order\":0,\"post_type\":\"sfwd-lessons\",\"post_mime_type\":\"\",\"comment_count\":\"0\",\"filter\":\"raw\"},{\"ID\":298,\"post_author\":\"1\",\"post_date\":\"2024-03-29 05:50:35\",\"post_date_gmt\":\"2024-03-29 05:50:35\",\"post_content\":\"\",\"post_title\":\"Test COurse 1 Lesson 2\",\"post_excerpt\":\"\",\"post_status\":\"publish\",\"comment_status\":\"closed\",\"ping_status\":\"closed\",\"post_password\":\"\",\"post_name\":\"test-course-1-lesson-2\",\"to_ping\":\"\",\"pinged\":\"\",\"post_modified\":\"2024-03-29 05:50:36\",\"post_modified_gmt\":\"2024-03-29 05:50:36\",\"post_content_filtered\":\"\",\"post_parent\":0,\"guid\":\"http://localhost/fastBlocks/?post_type=sfwd-lessons\\u0026#038;p=298\",\"menu_order\":0,\"post_type\":\"sfwd-lessons\",\"post_mime_type\":\"\",\"comment_count\":\"0\",\"filter\":\"raw\"},{\"ID\":300,\"post_author\":\"1\",\"post_date\":\"2024-03-29 05:51:09\",\"post_date_gmt\":\"2024-03-29 05:51:09\",\"post_content\":\"\",\"post_title\":\"Test COurse1 Lesson 3\",\"post_excerpt\":\"\",\"post_status\":\"publish\",\"comment_status\":\"closed\",\"ping_status\":\"closed\",\"post_password\":\"\",\"post_name\":\"test-course1-lesson-3\",\"to_ping\":\"\",\"pinged\":\"\",\"post_modified\":\"2024-03-29 05:51:11\",\"post_modified_gmt\":\"2024-03-29 05:51:11\",\"post_content_filtered\":\"\",\"post_parent\":0,\"guid\":\"http://localhost/fastBlocks/?post_type=sfwd-lessons\\u0026#038;p=300\",\"menu_order\":0,\"post_type\":\"sfwd-lessons\",\"post_mime_type\":\"\",\"comment_count\":\"0\",\"filter\":\"raw\"},{\"ID\":302,\"post_author\":\"1\",\"post_date\":\"2024-03-29 05:51:36\",\"post_date_gmt\":\"2024-03-29 05:51:36\",\"post_content\":\"\",\"post_title\":\"Test COurse 1 Lesson 4\",\"post_excerpt\":\"\",\"post_status\":\"publish\",\"comment_status\":\"closed\",\"ping_status\":\"closed\",\"post_password\":\"\",\"post_name\":\"test-course-1-lesson-4\",\"to_ping\":\"\",\"pinged\":\"\",\"post_modified\":\"2024-03-29 05:51:39\",\"post_modified_gmt\":\"2024-03-29 05:51:39\",\"post_content_filtered\":\"\",\"post_parent\":0,\"guid\":\"http://localhost/fastBlocks/?post_type=sfwd-lessons\\u0026#038;p=302\",\"menu_order\":0,\"post_type\":\"sfwd-lessons\",\"post_mime_type\":\"\",\"comment_count\":\"0\",\"filter\":\"raw\"},{\"ID\":304,\"post_author\":\"1\",\"post_date\":\"2024-03-29 05:52:11\",\"post_date_gmt\":\"2024-03-29 05:52:11\",\"post_content\":\"\",\"post_title\":\"Test COurse 1 Lesson 5\",\"post_excerpt\":\"\",\"post_status\":\"publish\",\"comment_status\":\"closed\",\"ping_status\":\"closed\",\"post_password\":\"\",\"post_name\":\"test-course-1-lesson-5\",\"to_ping\":\"\",\"pinged\":\"\",\"post_modified\":\"2024-03-29 05:52:12\",\"post_modified_gmt\":\"2024-03-29 05:52:12\",\"post_content_filtered\":\"\",\"post_parent\":0,\"guid\":\"http://localhost/fastBlocks/?post_type=sfwd-lessons\\u0026#038;p=304\",\"menu_order\":0,\"post_type\":\"sfwd-lessons\",\"post_mime_type\":\"\",\"comment_count\":\"0\",\"filter\":\"raw\"}],\"course_des\":\"But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and...\",\"number_of_students\":[]}]} -->\r\n<div class=\"wp-block-k2-coursegrid\"><div class=\"k2_ld_course_grid_parent_container_save\" data-coursefiltertype=\"all\"><div class=\"k2_ld_course_grid_item\" id=\"course_grid_single_483\"><div class=\"k2_ld_course_image\"><img src=\"http://localhost/fastBlocks/wp-content/uploads/2024/04/DSC_1206-1.jpg\" alt=\"Test course 4\" style=\"border-top-left-radius:10px;border-top-right-radius:10px;border-bottom-right-radius:0px;border-bottom-left-radius:0px;width:100%;height:240px\"/><div class=\"k2_ld_course_image_tag\" style=\"font-size:14px;width:55%;top:20px;left:20px;right:auto\">Buy Now</div></div><div class=\"k2_ld_course_description_cont\" style=\"padding-top:20px;padding-right:20px;padding-bottom:20px;padding-left:20px;margin-top:0px;margin-right:0px;margin-bottom:0px;margin-left:0px;border-color:#eaeaea;border-style:solid;border-width:1px;border-top-left-radius:0px;border-top-right-radius:0px;border-bottom-right-radius:10px;border-bottom-left-radius:10px\"><h5 style=\"font-size:undefinedpx\">Test course 4</h5><p class=\"course_excerpt\" style=\"font-size:undefinedpx;font-family:18px;line-height:1.5rem\">But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and...</p><div class=\"k2_ld_lessons_container\"><div class=\"k2_ld_lessons_info\"><svg aria-hidden=\"true\" focusable=\"false\" data-prefix=\"fas\" data-icon=\"book-open\" class=\"svg-inline--fa fa-book-open \" role=\"img\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 576 512\"><path fill=\"currentColor\" d=\"M249.6 471.5c10.8 3.8 22.4-4.1 22.4-15.5V78.6c0-4.2-1.6-8.4-5-11C247.4 52 202.4 32 144 32C93.5 32 46.3 45.3 18.1 56.1C6.8 60.5 0 71.7 0 83.8V454.1c0 11.9 12.8 20.2 24.1 16.5C55.6 460.1 105.5 448 144 448c33.9 0 79 14 105.6 23.5zm76.8 0C353 462 398.1 448 432 448c38.5 0 88.4 12.1 119.9 22.6c11.3 3.8 24.1-4.6 24.1-16.5V83.8c0-12.1-6.8-23.3-18.1-27.6C529.7 45.3 482.5 32 432 32c-58.4 0-103.4 20-123 35.6c-3.3 2.6-5 6.8-5 11V456c0 11.4 11.7 19.3 22.4 15.5z\"></path></svg><p style=\"font-size:undefinedpx\">0 Lessons</p></div><div class=\"k2_ld_student_info\"><svg aria-hidden=\"true\" focusable=\"false\" data-prefix=\"fas\" data-icon=\"book-open-reader\" class=\"svg-inline--fa fa-book-open-reader \" role=\"img\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\"><path fill=\"currentColor\" d=\"M160 96a96 96 0 1 1 192 0A96 96 0 1 1 160 96zm80 152V512l-48.4-24.2c-20.9-10.4-43.5-17-66.8-19.3l-96-9.6C12.5 457.2 0 443.5 0 427V224c0-17.7 14.3-32 32-32H62.3c63.6 0 125.6 19.6 177.7 56zm32 264V248c52.1-36.4 114.1-56 177.7-56H480c17.7 0 32 14.3 32 32V427c0 16.4-12.5 30.2-28.8 31.8l-96 9.6c-23.2 2.3-45.9 8.9-66.8 19.3L272 512z\"></path></svg><p style=\"font-size:undefinedpx\">0 Students</p></div></div><div class=\"k2_ld_course_button_container\"><a href=\"http://localhost/fastBlocks/courses/test-course-4/\">Buy Now</a></div></div></div><div class=\"k2_ld_course_grid_item\" id=\"course_grid_single_318\"><div class=\"k2_ld_course_image\"><img src=\"http://localhost/fastBlocks/wp-content/uploads/2024/03/Core-Values-2-res.jpg\" alt=\"Test Course 3\" style=\"border-top-left-radius:10px;border-top-right-radius:10px;border-bottom-right-radius:0px;border-bottom-left-radius:0px;width:100%;height:240px\"/><div class=\"k2_ld_course_image_tag\" style=\"font-size:14px;width:55%;top:20px;left:20px;right:auto\">Free</div></div><div class=\"k2_ld_course_description_cont\" style=\"padding-top:20px;padding-right:20px;padding-bottom:20px;padding-left:20px;margin-top:0px;margin-right:0px;margin-bottom:0px;margin-left:0px;border-color:#eaeaea;border-style:solid;border-width:1px;border-top-left-radius:0px;border-top-right-radius:0px;border-bottom-right-radius:10px;border-bottom-left-radius:10px\"><h5 style=\"font-size:undefinedpx\">Test Course 3</h5><p class=\"course_excerpt\" style=\"font-size:undefinedpx;font-family:18px;line-height:1.5rem\">But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and...</p><div class=\"k2_ld_lessons_container\"><div class=\"k2_ld_lessons_info\"><svg aria-hidden=\"true\" focusable=\"false\" data-prefix=\"fas\" data-icon=\"book-open\" class=\"svg-inline--fa fa-book-open \" role=\"img\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 576 512\"><path fill=\"currentColor\" d=\"M249.6 471.5c10.8 3.8 22.4-4.1 22.4-15.5V78.6c0-4.2-1.6-8.4-5-11C247.4 52 202.4 32 144 32C93.5 32 46.3 45.3 18.1 56.1C6.8 60.5 0 71.7 0 83.8V454.1c0 11.9 12.8 20.2 24.1 16.5C55.6 460.1 105.5 448 144 448c33.9 0 79 14 105.6 23.5zm76.8 0C353 462 398.1 448 432 448c38.5 0 88.4 12.1 119.9 22.6c11.3 3.8 24.1-4.6 24.1-16.5V83.8c0-12.1-6.8-23.3-18.1-27.6C529.7 45.3 482.5 32 432 32c-58.4 0-103.4 20-123 35.6c-3.3 2.6-5 6.8-5 11V456c0 11.4 11.7 19.3 22.4 15.5z\"></path></svg><p style=\"font-size:undefinedpx\">2 Lessons</p></div><div class=\"k2_ld_student_info\"><svg aria-hidden=\"true\" focusable=\"false\" data-prefix=\"fas\" data-icon=\"book-open-reader\" class=\"svg-inline--fa fa-book-open-reader \" role=\"img\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\"><path fill=\"currentColor\" d=\"M160 96a96 96 0 1 1 192 0A96 96 0 1 1 160 96zm80 152V512l-48.4-24.2c-20.9-10.4-43.5-17-66.8-19.3l-96-9.6C12.5 457.2 0 443.5 0 427V224c0-17.7 14.3-32 32-32H62.3c63.6 0 125.6 19.6 177.7 56zm32 264V248c52.1-36.4 114.1-56 177.7-56H480c17.7 0 32 14.3 32 32V427c0 16.4-12.5 30.2-28.8 31.8l-96 9.6c-23.2 2.3-45.9 8.9-66.8 19.3L272 512z\"></path></svg><p style=\"font-size:undefinedpx\">1 Students</p></div></div><div class=\"k2_ld_course_button_container\"><a href=\"http://localhost/fastBlocks/courses/test-course-3/\">Enroll Today</a></div></div></div><div class=\"k2_ld_course_grid_item\" id=\"course_grid_single_247\"><div class=\"k2_ld_course_image\"><img src=\"http://localhost/fastBlocks/wp-content/uploads/2024/03/Core-Values-3-res.jpg\" alt=\"Test Course 2\" style=\"border-top-left-radius:10px;border-top-right-radius:10px;border-bottom-right-radius:0px;border-bottom-left-radius:0px;width:100%;height:240px\"/><div class=\"k2_ld_course_image_tag\" style=\"font-size:14px;width:55%;top:20px;left:20px;right:auto\">Free</div></div><div class=\"k2_ld_course_description_cont\" style=\"padding-top:20px;padding-right:20px;padding-bottom:20px;padding-left:20px;margin-top:0px;margin-right:0px;margin-bottom:0px;margin-left:0px;border-color:#eaeaea;border-style:solid;border-width:1px;border-top-left-radius:0px;border-top-right-radius:0px;border-bottom-right-radius:10px;border-bottom-left-radius:10px\"><h5 style=\"font-size:undefinedpx\">Test Course 2</h5><p class=\"course_excerpt\" style=\"font-size:undefinedpx;font-family:18px;line-height:1.5rem\">But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and...</p><div class=\"k2_ld_lessons_container\"><div class=\"k2_ld_lessons_info\"><svg aria-hidden=\"true\" focusable=\"false\" data-prefix=\"fas\" data-icon=\"book-open\" class=\"svg-inline--fa fa-book-open \" role=\"img\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 576 512\"><path fill=\"currentColor\" d=\"M249.6 471.5c10.8 3.8 22.4-4.1 22.4-15.5V78.6c0-4.2-1.6-8.4-5-11C247.4 52 202.4 32 144 32C93.5 32 46.3 45.3 18.1 56.1C6.8 60.5 0 71.7 0 83.8V454.1c0 11.9 12.8 20.2 24.1 16.5C55.6 460.1 105.5 448 144 448c33.9 0 79 14 105.6 23.5zm76.8 0C353 462 398.1 448 432 448c38.5 0 88.4 12.1 119.9 22.6c11.3 3.8 24.1-4.6 24.1-16.5V83.8c0-12.1-6.8-23.3-18.1-27.6C529.7 45.3 482.5 32 432 32c-58.4 0-103.4 20-123 35.6c-3.3 2.6-5 6.8-5 11V456c0 11.4 11.7 19.3 22.4 15.5z\"></path></svg><p style=\"font-size:undefinedpx\">3 Lessons</p></div><div class=\"k2_ld_student_info\"><svg aria-hidden=\"true\" focusable=\"false\" data-prefix=\"fas\" data-icon=\"book-open-reader\" class=\"svg-inline--fa fa-book-open-reader \" role=\"img\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\"><path fill=\"currentColor\" d=\"M160 96a96 96 0 1 1 192 0A96 96 0 1 1 160 96zm80 152V512l-48.4-24.2c-20.9-10.4-43.5-17-66.8-19.3l-96-9.6C12.5 457.2 0 443.5 0 427V224c0-17.7 14.3-32 32-32H62.3c63.6 0 125.6 19.6 177.7 56zm32 264V248c52.1-36.4 114.1-56 177.7-56H480c17.7 0 32 14.3 32 32V427c0 16.4-12.5 30.2-28.8 31.8l-96 9.6c-23.2 2.3-45.9 8.9-66.8 19.3L272 512z\"></path></svg><p style=\"font-size:undefinedpx\">3 Students</p></div></div><div class=\"k2_ld_course_button_container\"><a href=\"http://localhost/fastBlocks/courses/test-course-2/\">Enroll Today</a></div></div></div><div class=\"k2_ld_course_grid_item\" id=\"course_grid_single_243\"><div class=\"k2_ld_course_image\"><img src=\"http://localhost/fastBlocks/wp-content/uploads/2024/03/Core-Values-4-res.jpg\" alt=\"Test course 1\" style=\"border-top-left-radius:10px;border-top-right-radius:10px;border-bottom-right-radius:0px;border-bottom-left-radius:0px;width:100%;height:240px\"/><div class=\"k2_ld_course_image_tag\" style=\"font-size:14px;width:55%;top:20px;left:20px;right:auto\">Open</div></div><div class=\"k2_ld_course_description_cont\" style=\"padding-top:20px;padding-right:20px;padding-bottom:20px;padding-left:20px;margin-top:0px;margin-right:0px;margin-bottom:0px;margin-left:0px;border-color:#eaeaea;border-style:solid;border-width:1px;border-top-left-radius:0px;border-top-right-radius:0px;border-bottom-right-radius:10px;border-bottom-left-radius:10px\"><h5 style=\"font-size:undefinedpx\">Test course 1</h5><p class=\"course_excerpt\" style=\"font-size:undefinedpx;font-family:18px;line-height:1.5rem\">But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and...</p><div class=\"k2_ld_lessons_container\"><div class=\"k2_ld_lessons_info\"><svg aria-hidden=\"true\" focusable=\"false\" data-prefix=\"fas\" data-icon=\"book-open\" class=\"svg-inline--fa fa-book-open \" role=\"img\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 576 512\"><path fill=\"currentColor\" d=\"M249.6 471.5c10.8 3.8 22.4-4.1 22.4-15.5V78.6c0-4.2-1.6-8.4-5-11C247.4 52 202.4 32 144 32C93.5 32 46.3 45.3 18.1 56.1C6.8 60.5 0 71.7 0 83.8V454.1c0 11.9 12.8 20.2 24.1 16.5C55.6 460.1 105.5 448 144 448c33.9 0 79 14 105.6 23.5zm76.8 0C353 462 398.1 448 432 448c38.5 0 88.4 12.1 119.9 22.6c11.3 3.8 24.1-4.6 24.1-16.5V83.8c0-12.1-6.8-23.3-18.1-27.6C529.7 45.3 482.5 32 432 32c-58.4 0-103.4 20-123 35.6c-3.3 2.6-5 6.8-5 11V456c0 11.4 11.7 19.3 22.4 15.5z\"></path></svg><p style=\"font-size:undefinedpx\">5 Lessons</p></div><div class=\"k2_ld_student_info\"><svg aria-hidden=\"true\" focusable=\"false\" data-prefix=\"fas\" data-icon=\"book-open-reader\" class=\"svg-inline--fa fa-book-open-reader \" role=\"img\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\"><path fill=\"currentColor\" d=\"M160 96a96 96 0 1 1 192 0A96 96 0 1 1 160 96zm80 152V512l-48.4-24.2c-20.9-10.4-43.5-17-66.8-19.3l-96-9.6C12.5 457.2 0 443.5 0 427V224c0-17.7 14.3-32 32-32H62.3c63.6 0 125.6 19.6 177.7 56zm32 264V248c52.1-36.4 114.1-56 177.7-56H480c17.7 0 32 14.3 32 32V427c0 16.4-12.5 30.2-28.8 31.8l-96 9.6c-23.2 2.3-45.9 8.9-66.8 19.3L272 512z\"></path></svg><p style=\"font-size:undefinedpx\">0 Students</p></div></div><div class=\"k2_ld_course_button_container\"><a href=\"http://localhost/fastBlocks/courses/test-course-1/\">See more</a></div></div></div></div></div>\r\n<!-- /wp:k2/coursegrid --></div>\r\n<!-- /wp:column --></div>\r\n<!-- /wp:columns --></div>\r\n<!-- /wp:group -->",
	
				'categories'  => array('k2-propanel-dashboard')
			)
		);
	}

    // public function register_blocks() {
    //     $blocks = array(
    //         'Alert/',
	// 		'Banner/',
	// 		'Basic_Testimonials/',
	// 		'Call_To_Action/',
	// 		'Multi_Heading/',
	// 		'Progress_Bar_Block/',
	// 		'Text_Editor/',
	// 		'Button/',
	// 		'Counter_Block/',
	// 		'Modal_Box/',
	// 		'Timer_Block/',
	// 		'Total_Courses_LD',
	// 		'Total_Lessons_LD',
	// 		'Total_Topics_LD',
	// 		'Course_grid_LD'
    //     );

    //     foreach ($blocks as $block) {
    //         register_block_type(plugin_dir_path(__FILE__) . 'includes/block-editor/blocks/' . $block);
    //     }
    // }

	public function k2blocks_block_assets() { // phpcs:ignore
		// Register block styles for both frontend + backend.
		wp_register_style(
			'k2blocks-style-css', // Handle.
			plugin_dir_url(__FILE__ ). 'dist/style-all-blocks.css', // Block style CSS.
			is_admin() ? array( 'wp-editor' ) : null, // Dependency to include the CSS after it.
			null // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.style.build.css' ) // Version: File modification time.
	
		);
	
		// Register block editor script for backend.
		wp_register_script(
			'k2blocks-block-js', // Handle.
			plugin_dir_url(__FILE__ ). 'dist/index.js',// Block.build.js: We register the block here. Built with Webpack.
			array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor' ), // Dependencies, defined above.
			null, // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.build.js' ), // Version: filemtime — Gets file modification time.
			true // Enqueue the script in the footer.
	
		);
	
	
		// Register block editor styles for backend.
		wp_register_style(
			'k2blocks-block-editor-css', // Handle.
			plugin_dir_url(__FILE__ ). 'dist/all-blocks.css', // Block editor CSS.
			array( 'wp-edit-blocks' ), // Dependency to include the CSS after it.
			null // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.editor.build.css' ) // Version: File modification time.
		);
	
	
		/**
		 * Register Gutenberg block on server-side.
		 *
		 * Register the block on server-side to ensure that the block
		 * scripts and styles for both frontend and backend are
		 * enqueued when the editor loads.
		 *
		 * @link https://wordpress.org/gutenberg/handbook/blocks/writing-your-first-block-type#enqueuing-block-scripts
		 * @since 1.16.0
		 */
		register_block_type(
			'k2blocks/blocks', array(
				// Enqueue blocks.style.build.css on both frontend & backend.
				'style'         => 'k2blocks-style-css',
				// Enqueue blocks.build.js in the editor only.
				'editor_script' => 'k2blocks-block-js',
				// Enqueue blocks.editor.build.css in the editor only.
				'editor_style'  => 'k2blocks-block-editor-css',
			)
		);
	
	
	}

	public function k2_chart_js() {
		// Enqueue Owl Carousel JS from CDN
		wp_enqueue_script( 'k2_chart-js', 'https://cdn.jsdelivr.net/npm/chart.js', array('jquery'), '2.3.4', true );
	}

    public function enqueue_welcome_page_styles() {
        wp_enqueue_style('welcome-page-styles', plugin_dir_url(__FILE__) . 'css/plugin.css');
    }

	public function enqueue_k2_font_awesome() {
		wp_enqueue_style( 'k2-font-awesome', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css', array(), '6.2.0', 'all' );
	} 

    public function k2_blocks_welcome_page() {
        add_menu_page(
            'K2 Blocks Welcome Page',
            'K2 Blocks',
            'manage_options',
            'k2-blocks-welcome',
            array($this, 'render_plugin_welcome_page'),
            'http://k2blocks.com/wp-content/uploads/2023/10/Group-6.svg'
        );
		if(is_plugin_active( 'K2-blocks-pro/k2-blocks-pro.php' )){
			add_submenu_page(
				'k2-blocks-welcome', // Parent slug
				'Licenses', // Page title
				'Licenses', // Menu title
				'manage_options', // Capability
				'k2-blocks-licenses', // Menu slug for the submenu page
				array($this, 'render_licenses_page') // Callback function to render page content
			);
		}
    }

    public function render_plugin_welcome_page() {
        $K2_version = '2.0.1';
    	?>
		<div class="k2-blocks-dashboad-welcome">
			<div class="k2-blocks-dashboard-nav">
				<div class="k2-header-container">
					<div class="k2-dashboard-header-logo">
						<a href="https://k2blocks.com/">
							<h1>K<span style="color:#40CAAA;">2</span> Blocks <span>(<?php echo $K2_version; ?>)</span>.</h1>
						</a>
					</div>
					<div class="upgrade-to-pro-cont">
						<p>
							<a href="https://k2blocks.com/pricing/" target="_blank" >Unlock Premium Features</a>
						</p>
					</div>
				</div>
			</div>
			<div class="k2-blocks-dashboard-welocme-container">
				<div class="k2-blocks-dashboard-left-container">
					<div class="dashboard-welocme-text">
						<h1>Welcome to K2 Blocks 👋</h1>
						<p>K2 Blocks is a powerful and versatile toolkit designed to supercharge your WordPress website-building experience. With a collection of creative and essential blocks, K2 Blocks empowers you to take your website to new heights, all while working seamlessly with the Gutenberg editor. Whether you're a seasoned web designer or just starting your WordPress journey, K2 Blocks will help you create captivating and feature-rich websites with ease.</p>
					</div>
					<div class="k2-blocks-youtube-video-cont">
						<iframe width="560" height="315" src="https://www.youtube.com/embed/oyT995ZCLsg?si=tHQMCgHio8qpbI5e" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
					</div>
				</div>
				<div class="k2-blocks-dashboard-right-container">
					<div class="k2-blocks-right-main">
						<div class="k2-blocks-right-items">
							<h3>Know more about K2 Blocks</h3>
							<p>Explore the possibilities and streamline your website development process with K2 Blocks today!</p>
							<a class="k2-dashboard-cards-buttons" href="https://k2blocks.com/#feature_section" target="_blank" >More info</a>
						</div>
						<div class="k2-blocks-right-items second-card-k2">
							<h3>Report a bug ?</h3>
							<div>
								<a class="k2-dashboard-cards-buttons revert_buttons-k2" href="https://k2blocks.com/contact-us/" target="_blank" >Contact Us</a>
								<a class="k2-dashboard-cards-buttons" href="https://wordpress.org/support/plugin/k2-blocks/" target="_blank">Create a ticket</a>
							</div>
						</div>
						<div class="k2-blocks-right-items colored_k2-cards btn-anim">
							<div class="last-k2-card-item-rating-child">
								<svg xmlns="http://www.w3.org/2000/svg" width="101" height="41" viewBox="0 0 101 41" fill="none">
									<g clip-path="url(#clip0_1224_74)">
										<path d="M26.2995 25.9687C26.9766 25.3214 26.6032 24.1954 25.6675 24.0612L18.4378 23.033C18.256 23.0076 18.0831 22.9388 17.9336 22.8323C17.7841 22.7258 17.6625 22.5848 17.5792 22.4213L14.3457 16.0045C13.9274 15.1736 12.7184 15.1736 12.2992 16.0045L9.06654 22.4213C8.98317 22.585 8.86148 22.7261 8.71183 22.8326C8.56218 22.9391 8.38901 23.0078 8.20706 23.033L0.978285 24.0612C0.0423512 24.1946 -0.331675 25.3212 0.34622 25.9687L5.57693 30.9635C5.70886 31.0886 5.80786 31.2444 5.86515 31.4169C5.92244 31.5895 5.93625 31.7735 5.90535 31.9527L4.66989 39.0055C4.51046 39.9182 5.48875 40.615 6.32607 40.1839L12.7922 36.8537C12.9565 36.7696 13.1384 36.7258 13.3229 36.7258C13.5074 36.7258 13.6893 36.7696 13.8535 36.8537L20.3197 40.1839C21.157 40.6148 22.1355 39.9182 21.9759 39.0053L20.7404 31.9529C20.7093 31.7737 20.723 31.5896 20.7803 31.4169C20.8376 31.2443 20.9367 31.0885 21.0688 30.9635L26.2995 25.9687Z" fill="#FECA57"/>
										<path d="M13.7988 30.6614C13.83 30.4823 13.8164 30.2982 13.7592 30.1256C13.7021 29.953 13.6032 29.7972 13.4713 29.672L8.23969 24.6772C7.72144 24.1826 7.82049 23.4072 8.31528 23.0108C8.27966 23.0195 8.24403 23.0271 8.20668 23.0321L0.977899 24.0612C0.0419659 24.1946 -0.331191 25.3212 0.345835 25.9678L5.57655 30.9627C5.70852 31.0877 5.80756 31.2435 5.86485 31.416C5.92214 31.5886 5.93592 31.7726 5.90496 31.9518L4.67037 39.0051C4.51008 39.918 5.48836 40.6146 6.32569 40.1836L12.7078 36.8967L13.7988 30.6614ZM8.87284 22.7708L16.1014 21.7417C16.2773 21.7171 16.4451 21.6518 16.5912 21.5509C16.7374 21.4499 16.858 21.3162 16.9433 21.1604L14.346 16.0045C13.9268 15.1736 12.7178 15.1736 12.2995 16.0045L9.06594 22.4213C8.99151 22.567 8.88609 22.6947 8.75707 22.7953C8.79443 22.786 8.83288 22.7767 8.87284 22.7708Z" fill="#F4B537"/>
										<path d="M100.757 25.9687C101.434 25.3214 101.06 24.1954 100.124 24.0612L92.8954 23.033C92.5238 22.9795 92.2021 22.7513 92.0357 22.4213L88.8033 16.0045C88.3849 15.1736 87.1751 15.1736 86.7568 16.0045L83.5232 22.4213C83.4401 22.585 83.3185 22.726 83.169 22.8325C83.0195 22.939 82.8465 23.0078 82.6646 23.033L75.4359 24.0612C74.4991 24.1946 74.1257 25.3212 74.8029 25.9687L80.0336 30.9635C80.1657 31.0885 80.2648 31.2443 80.322 31.4169C80.3793 31.5895 80.393 31.7735 80.3618 31.9527L79.1275 39.0053C78.9672 39.918 79.9463 40.6148 80.7826 40.1836L87.2487 36.8535C87.4132 36.7694 87.5952 36.7255 87.7799 36.7255C87.9646 36.7255 88.1466 36.7694 88.3111 36.8535L94.7764 40.1836C95.6137 40.6146 96.592 39.918 96.4326 39.0051L95.1971 31.9527C95.166 31.7735 95.1797 31.5894 95.237 31.4168C95.2943 31.2443 95.3934 31.0885 95.5255 30.9635L100.757 25.9687Z" fill="#FECA57"/>
										<path d="M88.2566 30.6614C88.2876 30.4822 88.2738 30.2981 88.2165 30.1255C88.1592 29.9529 88.0602 29.7971 87.9282 29.672L82.6974 24.6772C82.1792 24.1826 82.2782 23.4072 82.7722 23.0108C82.7366 23.0196 82.7007 23.0267 82.6644 23.0321L75.4356 24.0612C74.4997 24.1946 74.1255 25.3212 74.8027 25.9678L80.0343 30.9627C80.1661 31.0878 80.265 31.2436 80.3221 31.4162C80.3792 31.5887 80.3928 31.7727 80.3616 31.9518L79.1273 39.0051C78.9676 39.918 79.9461 40.6146 80.7834 40.1836L87.1656 36.8967L88.2566 30.6614ZM83.3295 22.7708L90.5585 21.7417C90.7345 21.7173 90.9023 21.6521 91.0484 21.5511C91.1946 21.4502 91.3151 21.3164 91.4002 21.1604L88.8031 16.0045C88.3847 15.1736 87.1749 15.1736 86.7566 16.0045L83.5239 22.4213C83.4494 22.5673 83.3437 22.695 83.2142 22.7953C83.2524 22.786 83.2898 22.7767 83.3295 22.7708Z" fill="#F4B537"/>
										<path d="M71.534 17.1183C72.6293 16.072 72.0244 14.2503 70.5116 14.0348L58.8223 12.371C58.2218 12.2852 57.7015 11.9162 57.4335 11.3828L52.2061 1.00691C51.529 -0.336286 49.5735 -0.336286 48.8972 1.00691L43.6699 11.3828C43.4008 11.9162 42.8815 12.2855 42.28 12.371L30.5918 14.0348C29.0781 14.2503 28.4741 16.0722 29.5686 17.118L38.0268 25.1937C38.462 25.6094 38.6606 26.2076 38.558 26.7938L36.5606 38.1971C36.3028 39.6734 37.8851 40.7992 39.2383 40.1028L49.693 34.7183C49.9587 34.582 50.253 34.5109 50.5516 34.5109C50.8502 34.5109 51.1445 34.582 51.4102 34.7183L61.8649 40.1028C63.2181 40.7994 64.8007 39.6734 64.5417 38.1971L62.5454 26.7938C62.4427 26.2076 62.6412 25.6094 63.0756 25.1937L71.534 17.1183Z" fill="#FECA57"/>
										<path d="M50.175 11.0806C50.7758 10.9948 51.2949 10.6249 51.5638 10.0921L54.1737 4.91224L52.2061 1.00691C51.529 -0.336286 49.5735 -0.336286 48.8972 1.00691L43.6699 11.3828C43.5194 11.6772 43.2918 11.9252 43.0114 12.1004L50.175 11.0806ZM44.4556 36.9067L46.4519 25.5026C46.5021 25.2129 46.4799 24.9154 46.3874 24.6364C46.2949 24.3574 46.1349 24.1056 45.9217 23.9033L37.4633 15.8268C36.5726 14.9766 36.8067 13.6132 37.7383 13.0177L30.5918 14.0348C29.0781 14.2503 28.4741 16.0722 29.5686 17.118L38.0268 25.1937C38.462 25.6094 38.6606 26.2076 38.558 26.7938L36.5606 38.1971C36.3028 39.6734 37.8843 40.7992 39.2383 40.1028L44.4404 37.4234C44.4201 37.2513 44.4253 37.0772 44.4556 36.9067Z" fill="#F4B537"/>
									</g>
									<defs>
										<clipPath id="clip0_1224_74">
										<rect width="101" height="40.4" fill="white"/>
										</clipPath>
									</defs>
								</svg>
								<h3>Rate us!</h3>
							</div>
							<a class="k2-dashboard-cards-buttons color-white" href="https://wordpress.org/support/plugin/k2-blocks/reviews/" target="_blank">Give feedback</a>
						</div>
					</div>
				</div>
			</div>

		</div>
    	<?php
    }

	public function render_licenses_page() {
		// Display your form here
		?>
		<div class="k2-blocks-pro-section-info-wrap">
			<div class="k2-blocks-dashboad-welcome">
				<div class="k2-blocks-dashboard-nav">
					<div class="k2-header-container">
						<div class="k2-dashboard-header-logo">
							<a href="https://k2blocks.com/">
								<h1>K<span style="color:#40CAAA;">2</span> Blocks.</h1>
							</a>
						</div>
						<div class="upgrade-to-pro-cont">
							<p>
								<a href="https://k2blocks.com/pricing/" target="_blank" >Unlock Premium Features</a>
							</p>
						</div>
					</div>
				</div>
				<div class="k2-blocks-pro-section-info">
					<b>Enter your license key here to activate K2 Blocks Pro and unlock feature updates, and premium support.</b>
					<ol>
						<li><span>Log in to <a href="#" target="_blank">your account</a> to retrieve your license key</span></li>
						<li><span>If you don't have a license key yet, <a href="#" target="_blank">purchase your license now.</a></span></li>
						<li><span>Copy the license key from your account and paste it below.</span></li>
						<li><span>Click on Activate to activate the license.</span></li>
					</ol>
					<label for="k2-blocks-pro-license-key">License Key</label>
					<input id="k2-blocks-pro-license-key" name="k2_blocks_pro_license_key" placeholder="Please enter your license key here" type="text" class="regular-text" value="">
					<input type="hidden" id="k2-blocks-pro-nonce" name="k2_blocks_pro_nonce" value="f50bf47a66">
					<input type="hidden" name="_wp_http_referer" value="/wp-admin/admin.php?page=k2-blocks-pro">
					<input type="hidden" name="action" value="k2_blocks_pro_license_activate">
					<input type="button" name="submit" id="activate-license" class="button button-primary" value="Activate">
					<span style="color:red;" id="license-error"></span>
				</div>
			</div>
		</div>
		<script>
			jQuery(document).ready(function($) {
				var licenseInput = $('#k2-blocks-pro-license-key');
				var activateBtn = $('#activate-license');
				var licenseStatus = $('#license-error');
				
				// Check if license key is already saved
				var savedLicenseKey = '<?php echo get_option('k2_blocks_pro_license_key'); ?>';
				if(savedLicenseKey) {
					licenseInput.val(savedLicenseKey);
					licenseInput.prop('disabled', true); // Disable input if license is already saved
					licenseStatus.text('License activated successfully').css('color', 'green');
				}
	
				activateBtn.on('click', function() {
					var licenseKey = licenseInput.val();
					console.log(licenseKey);
	
					var apiParams = {
						'slm_action': 'slm_check',
						'secret_key': '63859fa6047f71.02765564',
						'license_key': licenseKey,
					};
	
					var apiUrl = 'https://k2blocks.com/';
	
					var requestUrl = apiUrl + '?' + $.param(apiParams);
	
					$.ajax({
						url: requestUrl,
						type: 'GET',
						contentType: 'application/json',
						success: function(data) {
							console.log(data);
							if (data.result === 'success') {
								licenseStatus.text('License activated successfully').css('color', 'green');
								// Save the license key to WordPress database using AJAX
								saveLicenseKeyToDatabase(licenseKey);
							} else {
								licenseStatus.text('License not valid').css('color', 'red');
							}
						},
						error: function(jqXHR, textStatus, errorThrown) {
							console.error('Error:', errorThrown);
							licenseStatus.text('Error occurred while activating license').css('color', 'red');
						}
					});
				});
	
				// Function to save license key to WordPress database
				function saveLicenseKeyToDatabase(licenseKey) {
					var data = {
						action: 'save_license_key',
						license_key: licenseKey
					};
					var ajaxurl = '<?php echo admin_url('admin-ajax.php'); ?>';
					$.post(ajaxurl, data)
						.done(function(response) {
							console.log(response); // Log response for debugging
						})
						.fail(function(jqXHR, textStatus, errorThrown) {
							console.error('Error:', errorThrown);
						});
				}
			});
		</script>
	<?php
	}
	// add_action('wp_ajax_save_license_key', 'save_license_key');
	// add_action('wp_ajax_nopriv_save_license_key', 'save_license_key'); // For non-logged-in users
	public function save_license_key() {
		$license_key = sanitize_text_field($_POST['license_key']);
		// Save the license key to the database using update_option()
		update_option('k2_blocks_pro_license_key', $license_key);
		die(); // Always end with die() after processing AJAX
	}

    public function k2_blocks_register_custom_scripts() {
        if ( has_block( 'k2/timer-block' ) ) {
			wp_enqueue_script(
				'timer_frontend', // Script handle
				plugins_url('includes/block-editor/blocks/Timer_Block/Frontend/TimerFe.js', __FILE__), // Script URL
				array('jquery'), // Dependencies
				true // Enqueue script in the footer
			);
			
		  }
		if ( has_block( 'k2/counter-block' ) ) {
			wp_enqueue_script(
				'counter_frontend', // Script handle
				plugins_url('includes/block-editor/blocks/Counter_Block/Frontend/CounterFe.js', __FILE__), // Script URL
				array('jquery'), // Dependencies
				true // Enqueue script in the footer
			);
		}
		if ( has_block( 'k2/modal-block' ) ) {
			wp_enqueue_script( 'modal_frontend', plugins_url( 'includes/block-editor/blocks/Modal_Box/Frontend/ModalBoxFe.js', __FILE__), array('jquery'),
				true );
		}
		if ( has_block( 'k2/animated-button' ) ) {
			wp_enqueue_script( 'button_frontend', plugins_url( 'includes/block-editor/blocks/Button/Frontend/Button.js', __FILE__), array('jquery'),
				true );
		}
		if ( has_block( 'k2/totalcourses' ) ) {
			wp_enqueue_script( 'total_courses_frontend', plugins_url( 'includes/block-editor/blocks/Total_Courses_LD/Frontend/Total_Courses_LD.js', __FILE__), array('jquery'),
				true );
			wp_localize_script(
				'total_courses_frontend', // Script handle
				'myUserIdScriptData', // JavaScript object name
				array(
					'ajaxUrl' => admin_url( 'admin-ajax.php' ),
					'homeUrl' => home_url( ) // AJAX URL
				)
			);
		}
		if ( has_block( 'k2/assignmentstats' ) ) {
			wp_enqueue_script( 'assingment_stat_frontend', plugins_url( 'includes/block-editor/blocks/Assignment_Stats_LD/Frontend/AssignmentStatLD.js', __FILE__), array('jquery'),
				true );
			wp_localize_script(
				'assingment_stat_frontend', // Script handle
				'K2assignmentScriptData', // JavaScript object name
				array(
					'ajaxUrl' => admin_url( 'admin-ajax.php' ),
					'homeUrl' => home_url( ) // AJAX URL
				)
			);
		}
		if ( has_block( 'k2/studentcoursestats' ) ) {
			wp_enqueue_script( 'studentcoursestats_frontend', plugins_url( 'includes/block-editor/blocks/Student_Course_Stats_LD/Frontend/StudentCourseStatLD.js', __FILE__), array('jquery'),
				true );
			wp_localize_script(
				'studentcoursestats_frontend', // Script handle
				'myUserIdScriptData', // JavaScript object name
				array(
					'ajaxUrl' => admin_url( 'admin-ajax.php' ),
					'homeUrl' => home_url( ) // AJAX URL
				)
			);
		}
		if ( has_block( 'k2/coursegrid' ) ) {
			wp_enqueue_script( 'coursegrid_frontend', plugins_url( 'includes/block-editor/blocks/Course_grid_LD/Frontend/Course_grid_LD.js', __FILE__), array('jquery'),
				true );
			wp_localize_script(
				'coursegrid_frontend', // Script handle
				'course_grid_user_id', // JavaScript object name
				array(
					'ajaxUrl' => admin_url( 'admin-ajax.php' ),
					'homeUrl' => home_url( ) // AJAX URL
				)
			);
		}
		if ( has_block( 'k2/dailyenrollments' ) ) {
			wp_enqueue_script( 'dailyenrollments_frontend', plugins_url( 'includes/block-editor/blocks/Daily_Enrollments_LD/Frontend/Daily_Enrollments_LD.js', __FILE__), array('jquery'),
				true );
		}
		if ( has_block( 'k2/certificatesgenerated' ) ) {
			wp_enqueue_script( 'certificatesgenerated_frontend', plugins_url( 'includes/block-editor/blocks/Certificates_Generated_LD/Frontend/Certificates_Generated_LD.js', __FILE__), array('jquery'),
				true );
			wp_localize_script(
				'certificatesgenerated_frontend', // Script handle
				'certificatesgeneratedScriptData', // JavaScript object name
				array(
					'ajaxUrl' => admin_url( 'admin-ajax.php' ),
					'homeUrl' => home_url( ) // AJAX URL
				)
			);
		}
		wp_enqueue_script( 'wp-api-fetch' );
    }
	// public function k2_blocks_redirect_after_activation() {
	// 	if (is_admin() && isset($_GET['activate']) && $_GET['activate'] === 'true') {
	// 		wp_safe_redirect(admin_url('admin.php?page=k2-blocks-licenses'));
	// 		exit;
	// 	}
	// }
}

$k2_block_plugin = new K2_Blocks_Plugin();


function K2_blocks_category_for_blocks($categories, $post) {
	error_log('Adding K2 block category.'); 
	return array_merge(
		$categories,
		array(
			array(
				'slug'  => 'k2-blocks',
				'title' => __('K2 Blocks', 'k2-blocks'),
			),
			array(
                'slug'  => 'k2-blocks-learndash',
                'title' => __('K2 Blocks for LearnDash', 'k2-blocks'),
            ),
		)
	);
}
add_filter('block_categories_all', 'K2_blocks_category_for_blocks', 10, 2);



function K2_permission_check() {
	// Check if the current user has the "edit_posts" capability
	if (current_user_can('edit_posts')) {
	  return true; // Allow access if user has "edit_posts" capability
	} else {
	  return false; // Deny access otherwise
	}
}


//Block Total Courses Callback start

function k2_ld_courses_rest_route(){
	register_rest_route( 'wp/v1', '/k2learndash', array(
		'methods' => 'GET',
		'callback' => 'get_total_ld_courses',
		'permission_callback' => 'K2_permission_check',
	  ));
}
add_action( 'rest_api_init', 'k2_ld_courses_rest_route');
function get_total_ld_courses( $data ) {
	$post_type = $data->get_param('post_type');
	$k2Ldfilter = $data->get_param('k2Ldfilter');
	if($k2Ldfilter == 'users'){
		$getCurrentUserId =  get_current_user_id();
		// error_log($getCurrentUserId);
		$courses = learndash_user_get_enrolled_courses($getCurrentUserId);
		return $courses;
	}
	elseif($k2Ldfilter == 'all'){
		$query_args = array(
			'post_type'         =>   'sfwd-courses',
			'post_status'       =>   'publish',
			'fields'            =>   'ids',
			'orderby'           =>   'title',
			'order'             =>   'ASC',
			'nopaging'          =>   true    // Turns OFF paging logic to get ALL courses
		);
	 
		$query = new WP_Query( $query_args );
		if ( $query instanceof WP_Query) {
			return $query->posts;
		}
	}	
	else{
		$courses = learndash_get_group_courses_list($k2Ldfilter);
		return $courses;
	}
}

function k2_ld_group_courses_rest_route(){
	register_rest_route( 'wp/v1', '/groups/k2learndash', array(
		'methods' => 'GET',
		'callback' => 'get_total_ld_courses_groups',
		'permission_callback' => 'K2_permission_check',
	  ));
}
add_action( 'rest_api_init', 'k2_ld_group_courses_rest_route');

function get_total_ld_courses_groups(){
	$groups = learndash_get_groups();

	return $groups;
} 
//Block Total Courses Callback end

//Block Total Lessons in courses block start
add_action( 'rest_api_init', 'k2_courses_for_lessons_rest_route');
function k2_courses_for_lessons_rest_route(){
	register_rest_route( 'wp/v1', 'courses/k2learndash', array(
		'methods' => 'GET',
		'callback' => 'get_total_ld_courses_for_lessons',
		'permission_callback' => 'K2_permission_check',
	  ));
}

function get_total_ld_courses_for_lessons( ) {
	$query_args = array(
		'post_type' => 'sfwd-courses',
		'post_status' => 'publish',
		'fields' => 'objects',  // Get full post objects for title and ID access
		'orderby' => 'title',
		'order' => 'ASC',
		'nopaging' => true,     // Retrieve all courses
	);
	
	$query = new WP_Query( $query_args );
	
	if ( $query instanceof WP_Query ) {
		$posts_data = array();  // Initialize an empty array to store results
	
		if ( ! empty( $query->posts ) ) {
			foreach ( $query->posts as $post ) {
				$posts_data[] = array(
					'id' => $post->ID,
					'title' => $post->post_title,
				);
			}
		}
	
		return $posts_data;
	} else {
		// Handle potential query errors (optional)
		return array();  // Or return an empty array or a custom error message
	}
}

//Block Total Lessons in courses block start
add_action( 'rest_api_init', 'k2_courses_for_lessons_api_rest_route');
function k2_courses_for_lessons_api_rest_route(){
	register_rest_route( 'wp/v1', 'lessons/k2learndash', array(
		'methods' => 'GET',
		'callback' => 'get_total_lessons',
		'permission_callback' => 'K2_permission_check',
	  ));
}

function get_total_lessons($data){	
	$SelectedCourse = $data->get_param('selectedCourse');
	if ($SelectedCourse == 0) {
        // Get the count of all lessons in the LMS
        $lessons_count = new WP_Query(array(
            'post_type' => 'sfwd-lessons',
            'posts_per_page' => -1,
            'fields' => 'ids', // Only retrieve post IDs
            'no_found_rows' => true, // Optimize query to skip pagination
        ));
        
        return $lessons_count->posts;
    }
	else{
		$SelectedCourse = $data->get_param('selectedCourse');
		$lessons_count = learndash_get_lesson_list($SelectedCourse);
		return $lessons_count;
	}
}

//Block Total Lessons in courses block end
//Block Total Topics in courses block start
add_action( 'rest_api_init', 'k2_courses_for_topics_api_rest_route');
function k2_courses_for_topics_api_rest_route(){
	register_rest_route( 'wp/v1', 'topics/k2learndash', array(
		'methods' => 'GET',
		'callback' => 'get_total_topics',
		'permission_callback' => 'K2_permission_check',
	  ));
}
function get_total_topics($data){
	$SelectedCourse = $data->get_param('selectedCourse');
	$SelectedLessons = $data->get_param('selectedLesson');

	$topics = learndash_get_topic_list($SelectedLessons, $SelectedCourse);

	return $topics;
}

//Block Total Topics in courses block end
//Block Total students in courses block start
add_action( 'rest_api_init', 'k2_courses_for_students_api_rest_route');
function k2_courses_for_students_api_rest_route(){
	register_rest_route( 'wp/v1', 'students/k2learndash', array(
		'methods' => 'GET',
		'callback' => 'get_total_students',
		'permission_callback' => 'K2_permission_check',
	  ));
}
function get_total_students($data){
	$SelectedCourse = $data->get_param('selectedCourse');

	global $wpdb;

	if($SelectedCourse == 0){
		$courses = get_posts(array(
			'post_type' => 'sfwd-courses',
			'posts_per_page' => -1,
			'fields' => 'ids' // Only retrieve post IDs
		));
		if (empty($courses)) {
			return array(); // Handle no courses scenario
		}
	
		// Get all users except administrators
		$users = get_users(array(
			'fields' => array('ID', 'user_login', 'user_email'),
			'role__not_in' => array('administrator')
		));
	
		if (empty($users)) {
			return array(); // Handle no users scenario
		}
	
		// Initialize the result array
		$course_students = array();
	
		// Loop through each course and get students
		foreach ($courses as $course_id) {
			$studentArr = array();
	
			foreach ($users as $user) {
				if (sfwd_lms_has_access($course_id, $user->ID)) {
					$studentArr[] = array(
						'ID' => $user->ID,
						'username' => $user->user_login,
						'email' => $user->user_email
					);
				}
			}
	
			// Add the students list to the corresponding course in the result array
			$course_students[$course_id] = $studentArr;
		}
	}

	else{
		$users = get_users( array( 'fields' => array( 'ID', 'user_login', 'user_email' ),
		'role__not_in' => array( 'administrator' )
		) );

		if ( empty( $users ) ) {
			return array(); // Handle no users scenario
		}

		$user_list = array();
		foreach ( $users as $user ) {
			$user_list[] = array(
			'ID' => $user->ID,
			'username' => $user->user_login,
			'email' => $user->user_email,
			);
		}

		$studentArr = array();
		foreach ($user_list as $user) {
			if (sfwd_lms_has_access($SelectedCourse, $user['ID'])) {
				$studentArr[] = $user['ID'];
			}
		}
	}
	return $studentArr;
}
//Block Total students in courses block end
//Block Total quiz block start
add_action( 'rest_api_init', 'k2_courses_for_quiz_api_rest_route');
function k2_courses_for_quiz_api_rest_route(){
	register_rest_route( 'wp/v1', 'totalLessons/k2learndash', array(
		'methods' => 'GET',
		'callback' => 'get_total_lessons_for_quiz_block',
		'permission_callback' => 'K2_permission_check',
	  ));
}
function get_total_lessons_for_quiz_block(){
	$args = array(
		'post_type'      => 'sfwd-lessons', // Post type for lessons in LearnDash
		'post_status'    => 'publish', // Retrieve only published lessons
		'posts_per_page' => -1, // Retrieve all lessons
	);
	$lessons = get_posts($args);
	$lessons_array = array();
	if ($lessons) {
		foreach ($lessons as $lesson) {
			$lessons_array[] = array(
				'ID' => $lesson->ID,
				'post_title' => $lesson->post_title
			);
		}
	} else {
		$lessons_array[] = array(
			'ID' => 0,
			'post_title' => 'No lesson found'
		);
	}
	return $lessons_array;
}
add_action( 'rest_api_init', 'k2_courses_for_no_quiz_api_rest_route');
function k2_courses_for_no_quiz_api_rest_route(){
	register_rest_route( 'wp/v1', 'totalquiz/k2learndash', array(
		'methods' => 'GET',
		'callback' => 'get_total_quiz',
		'permission_callback' => 'K2_permission_check',
	  ));
}

function get_total_quiz($data){

	$SelectedCourse = $data->get_param('selectedCourse');
	$SelectedLessons = $data->get_param('selectedLesson');
	$SelectedGroup = $data->get_param('selectedGroup');
	$filter = $data->get_param('filter');

	if ($filter == 'course'){

		$quiz_args = array(
			'post_type' => 'sfwd-quiz', 
			'meta_key' => 'course_id', 
			'meta_value' => $SelectedCourse, 
			'posts_per_page' => -1,
		);

		$no_of_quiz = get_posts($quiz_args);
		return $no_of_quiz;	
	}
	elseif($filter == 'lesson'){
		$no_of_quiz = learndash_get_lesson_quiz_list($SelectedLessons);
		return $no_of_quiz;	
	}
	elseif($filter == 'group'){
		$no_of_quiz = learndash_get_group_course_quiz_ids($SelectedGroup);
		return $no_of_quiz;	
	}
	else{
		$no_of_quiz = new WP_Query(array(
			'post_type' => 'sfwd-quiz',
			'posts_per_page' => -1,
			'fields' => 'ids', // Only retrieve post IDs
			'no_found_rows' => true, // Optimize query to skip pagination calculation
		));
		return $no_of_quiz->posts;
	}
}

//Block Total quiz block end

//Block Student course Stats Block Start
add_action( 'rest_api_init', 'k2_courses_for_Stat_api_rest_route');
function k2_courses_for_Stat_api_rest_route(){
	register_rest_route( 'wp/v1', 'inprogress/k2learndash', array(
		'methods' => 'GET',
		'callback' => 'get_count_Of_inprogress_courses',
		'permission_callback' => 'K2_permission_check',
	  ));
}
function get_count_Of_inprogress_courses(){
	
	$userId = get_current_user_id(); // Get current user ID

	$course_status = array();

	$query_args = array(
		'post_type' => 'sfwd-courses',
		'post_status' => 'publish',
		'fields' => 'objects',  // Get full post objects for title and ID access
		'orderby' => 'title',
		'order' => 'ASC',
		'nopaging' => true,     // Retrieve all courses
	);
	
	$query = new WP_Query( $query_args );
	
	if ( $query instanceof WP_Query ) {
		$posts_data = array();  // Initialize an empty array to store results
	
		if ( ! empty( $query->posts ) ) {
			foreach ( $query->posts as $post ) {
				$courseId = $post->ID; // Get the current course ID
				$courseTitle = $post->post_title;
				$userProgress = learndash_user_get_course_progress($userId, $courseId);
				$posts_data[] = array(
					'id' => $courseId,
					'title' => $courseTitle,
					'status' =>  $userProgress
				);
			}
		}
	
		return $posts_data;
	} else {
		// Handle potential query errors (optional)
		return array();  // Or return an empty array or a custom error message
	}
}

// Block course grid start
add_action( 'rest_api_init', 'k2_courses_grid_api_rest_route');
function k2_courses_grid_api_rest_route(){
	register_rest_route( 'wp/v1', 'k2learndash/coursegrid', array(
		'methods' => 'GET',
		'callback' => 'get_course_grid',
		'permission_callback' => 'K2_permission_check',
	  ));
}

function get_course_grid($data){

	$selected_filter_type = $data->get_param('k2LdCoursefilterType');
	error_log($selected_filter_type );
	$post_type = $data->get_param('post_type');

	// if ($selected_filter_type == 'all'){
		$args = array(
			'post_type'      => 'sfwd-courses',
			'post_status'    => 'publish',
			'posts_per_page' => -1, // Set to -1 to fetch all courses, or specify the number of courses you want to fetch
			// Add any additional parameters here, such as 'orderby', 'order', etc.
		);
		$courses = array(); // Initialize an empty array to store courses

		$query = new WP_Query( $args );

		if ( $query->have_posts() ) {
			while ( $query->have_posts() ) {
				$query->the_post();
				// Get course details
				$course_id = get_the_ID();
				$course_title = get_the_title();
				$course_permalink = get_permalink();
				$course_image_url = get_the_post_thumbnail_url( $course_id, 'full' );
				$course_type = get_post_meta( get_the_ID() , '_ld_price_type', true );
				$course_info = get_post_meta( get_the_ID() , '_sfwd-courses', true );
				$course_price = isset($course_info['sfwd-courses_course_price']) ? $course_info['sfwd-courses_course_price'] : '';
			
				$lessons_count = learndash_get_lesson_list($course_id);
				$course_content = get_the_content();
        		$trimmed_content = wp_trim_words( $course_content, 20, '...' );
				
				$student =learndash_get_course_users_access_from_meta($course_id);
				if($selected_filter_type == 'all'){
					$course_data = array(
						'ID'         => $course_id,
						'title'      => $course_title,
						'permalink'  => $course_permalink,
						'image_url'  => $course_image_url,	
						'course_type' => $course_type,
						'course_price' => $course_price,
						'number_of_lessons' => $lessons_count,
						'course_des' => $trimmed_content,
						'number_of_students' => $student
						// Add more fields as needed
					);
					$courses[] = $course_data;
				}
				else{
					$current_user_id = get_current_user_id();
					$progress_args = apply_filters(
							'learndash_progress_args',
							array(
								'array'     => true,
								'course_id' => $course_id,
								'user_id'   => $current_user_id,
							),
							$course_id,
							$current_user_id
						);
					$progress = learndash_course_progress( $progress_args );
					$user_course_status = learndash_course_status( $course_id, $current_user_id ,  true );

					$course_data = array(
						'ID'         => $course_id,
						'title'      => $course_title,
						'permalink'  => $course_permalink,
						'image_url'  => $course_image_url,	
						'course_type' => $course_type,
						'course_price' => $course_price,
						'number_of_lessons' => $lessons_count,
						'course_des' => $trimmed_content,
						'number_of_students' => $student,
						'completion_percentage' => $progress['percentage'],
						'user_course_status' => $user_course_status
						// Add more fields as needed
					);
					$courses[] = $course_data;
				}
			}
			wp_reset_postdata(); // Restore global post data
		}

	return $courses;
	
}

// Block course assignment start
add_action( 'rest_api_init', 'k2_get_assignment_stat_api_rest_route' );

function k2_get_assignment_stat_api_rest_route() {
    register_rest_route( 'wp/v1', 'k2learndash/assignment', array(
        'methods'             => 'GET',
        'callback'            => 'get_assignment_stat',
        'permission_callback' => 'K2_permission_check',
    ) );
}

function get_assignment_stat($data){

	$courseID = (int) $data->get_param('courseId');
	
	// Get course assignments
	$course_assignments = learndash_get_course_assignments($courseID);

	$total_assignments = $course_assignments->posts;
	$assignemnt_count =  $course_assignments->post_count;
	$assigment_meta = array();

	$count_approved = 0;
	$pending_approved_count = 0;

	foreach ( $total_assignments as $post ) {

		$assignmentId = $post->ID; 

		$approval_status = get_post_meta($assignmentId, 'approval_status', true);

		$assigment_meta=array(
			'id' => $assignmentId,
			'approval_status' => $approval_status
		);

		if ($assigment_meta['approval_status'] == 1) {
			// Increment the counter if approval_status is 1
			$count_approved++;
		}
		if ($assigment_meta['approval_status'] == '') {
			// Increment the counter if approval_status is 1
			$pending_approved_count++;
		}

	}

	$assignments = array(
		'assignment_count' => $assignemnt_count,
		'approved_count' => $count_approved,
		'pending_approved_count' => $pending_approved_count,
		'assignment_meta' => $assigment_meta
	);

	return $assignments;
}

// Block daily enrollments start
add_action( 'rest_api_init', 'k2_daily_enrollment_api_rest_route' );

function k2_daily_enrollment_api_rest_route() {
    register_rest_route( 'wp/v1', 'k2learndash/student', array(
        'methods'             => 'GET',
        'callback'            => 'get_daily_enrollment_stat',
        'permission_callback' => 'K2_permission_check',
    ) );
}

function get_daily_enrollment_stat($data){
	global $wpdb;

	$course_id = (int) $data->get_param('courseId');
	
	if($course_id == 0){
		$query = $wpdb->prepare("
        SELECT `activity_started`, `user_id`, `course_id`
        FROM {$wpdb->prefix}learndash_user_activity
        WHERE `activity_type` = 'course'
		");

		error_log("IF query: " . print_r($query, true));
	}
	else{
		// Prepare the SQL query to retrieve user activity for the specified course
		$query = $wpdb->prepare("
        SELECT `activity_started`, `user_id`, `course_id`
        FROM {$wpdb->prefix}learndash_user_activity
        WHERE `course_id` = %d
        AND `activity_type` = 'course'
		", $course_id);

		error_log("ELse query: " . print_r($query, true));
	}

	// Execute the SQL query
	$results = $wpdb->get_results($query);

	// Initialize an array to store the formatted results
	$enrollments = array();

	// Process query results
	if ($results) {
		foreach ($results as $result) {
			// Format each result as needed (e.g., convert dates, prepare user data)
			$date_formatted = date('n/j/Y', $result->activity_started);
			$enrollments[] = array(
				'activity_started' => $date_formatted,
				'user_id' => $result->user_id,
				'course_id' => $result->course_id
				
			);
		}
	}

	error_log("Enrollments: " . print_r($results, true));
	
    // Return the formatted enrollment data array
    return $enrollments;
}

// Block certificates start
add_action( 'rest_api_init', 'k2_certificates_generated_api_rest_route' );

function k2_certificates_generated_api_rest_route() {
    register_rest_route( 'wp/v1', 'k2learndash/certificates', array(
        'methods'             => 'GET',
        'callback'            => 'get_certificates_generated_stat',
        'permission_callback' => 'K2_permission_check',
    ) );
}

function get_certificates_generated_stat($data){

	$course_id = $data->get_param('courseId');
	$courses_ids = $data->get_param('coursesIds');
	if ($course_id == 'all'){
		
		$php_courses_ids = json_decode($courses_ids);
		$total_completed_users_count = 0;
		foreach($php_courses_ids as $ids){
			$meta_key = 'course_completed_' . $ids;

			$users_with_completion = get_users( array(
				'meta_key'     => $meta_key,
			) );

			$completed_users_count = count( $users_with_completion );
			$total_completed_users_count += $completed_users_count;
		}

		return $total_completed_users_count;
	}
	else{
		$meta_key = 'course_completed_' . $course_id;

		$users_with_completion = get_users( array(
			'meta_key'     => $meta_key,
		) );

		$completed_users_count = count( $users_with_completion );
		return $completed_users_count;
	}
	
}

function k2_blocks_enqueue_google_fonts() {
    // Montserrat font
    wp_enqueue_style( 'montserrat-font', 'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,700;1,800;1,900&display=swap', array(), null );

    // Raleway font
    wp_enqueue_style( 'raleway-font', 'https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap', array(), null );
}
add_action( 'wp_enqueue_scripts', 'k2_blocks_enqueue_google_fonts' );

add_action( 'admin_enqueue_scripts', 'k2_blocks_enqueue_google_fonts' );

if ( ! function_exists( 'kb_fs' ) ) {
    // Create a helper function for easy SDK access.
    function kb_fs() {
        global $kb_fs;

        if ( ! isset( $kb_fs ) ) {
            // Include Freemius SDK.
            require_once dirname(__FILE__) . '/freemius/start.php';

            $kb_fs = fs_dynamic_init( array(
                'id'                  => '15283',
                'slug'                => 'k2-blocks-welcome',
                'type'                => 'plugin',
                'public_key'          => 'pk_346b9faa07eed44f255230ebe253a',
                'is_premium'          => false,
                'has_addons'          => false,
                'has_paid_plans'      => false,
                'menu'                => array(
					'slug'           => 'k2-blocks-welcome',
                    'account'        => false,
                    'support'        => false,
                ),
            ) );
        }

        return $kb_fs;
    }

    // Init Freemius.
    kb_fs();
    // Signal that SDK was initiated.
    do_action( 'kb_fs_loaded' );
}