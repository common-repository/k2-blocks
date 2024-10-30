jQuery(document).ready(function( $ ) {
    $.ajax({
        url: myUserIdScriptData.ajaxUrl,
        method: 'POST',
        data: {
            action: 'get_student_stat_course', // Action to trigger in WordPress
        },
        success: function(response) {
            // Parse the response and update state
            console.log("FrontEnd",response);
            var notStarted = response.filter(item => item.status.status === "not_started").length;
            console.log("not staerred",notStarted);
            $('#student_stat_not_started').text(notStarted);

            var Inprogress = response.filter(item => item.status.status === "in_progress").length;
            console.log("Inprogress",Inprogress);
            $('#student_stat_in_progress').text(Inprogress);

            var completed = response.filter(item => item.status.status === "completed").length;
            console.log("completed",completed);
            $('#student_stat_completed').text(completed);
            
          
        },
        error: function(xhr, status, error) {
            console.error('Error fetching user data:', error);
        }
    });
})