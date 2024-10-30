jQuery(document).ready(function( $ ) {
    var CourseFilter = $('.k2_ld_total_course_parent_container_save').data('coursefilter');
    var CourseidValue = $('.k2_ld_total_course_parent_container_save').attr('id');
    if(CourseFilter == 'users'){
        $.ajax({
            url: myUserIdScriptData.ajaxUrl,
            method: 'POST',
            data: {
                action: 'get_courses_frontend', // Action to trigger in WordPress
                CourseFilter: CourseFilter
            },
            success: function(response) {
                // Parse the response and update state
                console.log(response);
                var totalCourses = response.length; // Assuming response is an array
                $('#'+CourseidValue+' .k2_ld_total_course_left h3').text(totalCourses);
            },
            error: function(xhr, status, error) {
                console.error('Error fetching user data:', error);
            }
        });
    }

})