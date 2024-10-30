/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
// import { useBlockProps } from '@wordpress/block-editor';
import { useBlockProps	} from '@wordpress/block-editor';
import { generate } from 'short-uuid';
/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {Element} Element to render.
 */
export default function save({attributes}) {
	const {
        k2_total_courses_student,SelectedK2CourseForStudent, SelectedK2LessonForStudents, NumberOfLessons,NumberOfStudents,K2ldmainContPaddingStudents, 
        K2ldmainContMarginStudents, K2ldmainContBorderStudents, K2ldmainContBorderRadiusStudents,
        K2ldmainContBackgroundStudents, K2ldHeadingSizeStudents, K2ldheadingFontFamStudents, K2ldheadingFontWeightStudents,
        K2ldheadingColorStudents, K2ldCountSizeStudents, K2ldCountFontFamStudents, K2ldCountFontWeightStudents,
        K2ldCountColorStudents, k2ldImageStudents, k2ldImageWidthStudents, K2ldImageBackgroundStudents, K2ldImageContBorderRadiusStudents,
        K2LDImageAlignmentStudents
    } = attributes;


    var mainCardContainerStyle ={
        paddingTop: K2ldmainContPaddingStudents.top,
		paddingRight: K2ldmainContPaddingStudents.right,
		paddingBottom: K2ldmainContPaddingStudents.bottom,
		paddingLeft: K2ldmainContPaddingStudents.left,
        marginTop: K2ldmainContMarginStudents.top,
		marginRight: K2ldmainContMarginStudents.right,
		marginBottom: K2ldmainContMarginStudents.bottom,
		marginLeft: K2ldmainContMarginStudents.left,
        borderColor: K2ldmainContBorderStudents.color,
        borderStyle: K2ldmainContBorderStudents.style,
        borderWidth: K2ldmainContBorderStudents.width,
        borderTopLeftRadius: K2ldmainContBorderRadiusStudents.top,
		borderTopRightRadius: K2ldmainContBorderRadiusStudents.right,
		borderBottomRightRadius: K2ldmainContBorderRadiusStudents.bottom,
		borderBottomLeftRadius: K2ldmainContBorderRadiusStudents.left,
        background: K2ldmainContBackgroundStudents

    }

    var ldtotalCourseStyle = {
        fontSize: K2ldHeadingSizeStudents,
        fontFamily: K2ldheadingFontFamStudents,
        fontWeight: K2ldheadingFontWeightStudents,
        color: K2ldheadingColorStudents
    }

    var ldCountStyle = {
        fontSize: K2ldCountSizeStudents,
        fontFamily: K2ldCountFontFamStudents,
        fontWeight: K2ldCountFontWeightStudents,
        color: K2ldCountColorStudents
    }

    var ImageContStyles = {
        backgroundColor: K2ldImageBackgroundStudents,
        borderTopLeftRadius: K2ldImageContBorderRadiusStudents.top,
		borderTopRightRadius: K2ldImageContBorderRadiusStudents.right,
		borderBottomRightRadius: K2ldImageContBorderRadiusStudents.bottom,
		borderBottomLeftRadius: K2ldImageContBorderRadiusStudents.left,
        justifyContent:K2LDImageAlignmentStudents

    }
    var K2imgstyles= {
        width: k2ldImageWidthStudents+'%'
    }

	return (
		<div {...useBlockProps.save()}>
			<div className="k2_ld_total_course_parent_container_save" style={mainCardContainerStyle}>
                <div className="k2_ld_total_course_left">
                    <h4 style={ldtotalCourseStyle}>Total Students</h4>
                    <h3 style={ldCountStyle}>
                        {NumberOfStudents && Object.keys(NumberOfStudents).length}
                    </h3>
                    
                </div>
                <div className="k2_ld_total_course_right">
                    <div className="k2_ld_total_course_image_container" style={ImageContStyles}>
                        <img src={k2ldImageStudents} style={K2imgstyles} />
                    </div>
                </div>
            </div>
		</div>
	);
}
