<?php


function get_courses_frontend() {
    if (isset($_POST['CourseFilter'])) {
        $courseFilter = $_POST['CourseFilter'];
    }
    if(  $courseFilter == 'users'){
        $courses = learndash_user_get_enrolled_courses(get_current_user_id());
        wp_send_json( $courses );
    }
}

add_action('wp_ajax_get_courses_frontend', 'get_courses_frontend');
add_action('wp_ajax_nopriv_get_courses_frontend', 'get_courses_frontend');


function get_student_stat_course() {
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
	
		wp_send_json($posts_data);
	} else {
		// Handle potential query errors (optional)
		wp_send_json(array());  // Or return an empty array or a custom error message
	}
}
add_action('wp_ajax_get_student_stat_course', 'get_student_stat_course');
add_action('wp_ajax_nopriv_get_student_stat_course', 'get_student_stat_course');

function get_course_grid_front(){

	if (isset($_POST['CourseFilter'])) {
        $selected_filter_type = $_POST['CourseFilter'];
    }

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
			if($selected_filter_type == 'users'){

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
					'user_id' => $current_user_id,
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

	return wp_send_json($courses);
	
}
add_action('wp_ajax_get_course_grid_front', 'get_course_grid_front');
add_action('wp_ajax_nopriv_get_course_grid_front', 'get_course_grid_front');



function get_assignment_stat_front(){

	if (isset($_POST['CourseId'])) {
        $CourseId = $_POST['CourseId'];
    }

	$course_assignments = learndash_get_course_assignments($CourseId);

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

	return wp_send_json($assignments);
	
}
add_action('wp_ajax_get_assignment_stat_front', 'get_assignment_stat_front');
add_action('wp_ajax_nopriv_get_assignment_stat_front', 'get_assignment_stat_front');


function get_certificates_generated_front(){

	if (isset($_POST['courseId'])) {
        $course_id = $_POST['courseId'];
    }

	$meta_key = 'course_completed_' . $course_id;

	$users_with_completion = get_users( array(
		'meta_key'     => $meta_key,
	) );

	$completed_users_count = count( $users_with_completion );
    return wp_send_json($completed_users_count);
}

add_action('wp_ajax_get_certificates_generated_front', 'get_certificates_generated_front');
add_action('wp_ajax_nopriv_get_certificates_generated_front', 'get_certificates_generated_front');