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
        k2_select_filter_for_quiz, k2_total_courses_quiz, SelectedK2CourseForQuiz, k2_total_lessons_quiz,
        SelectedK2LessonForQuiz, NumberOfQuizs, K2ldmainContPaddingQuizs, K2ldmainContMarginQuizs, K2ldmainContBorderQuizs,
        K2ldmainContBorderRadiusQuizs, K2ldmainContBackgroundQuizs, K2ldHeadingSizeQuizs, K2ldheadingFontFamQuizs,
        K2ldheadingFontWeightQuizs, K2ldheadingColorQuizs, K2ldCountSizeQuizs, K2ldCountFontFamQuizs,
        K2ldCountFontWeightQuizs, K2ldCountColorQuizs, k2ldImageQuizs, k2ldImageWidthQuizs, K2ldImageBackgroundQuizs,
        K2ldImageContBorderRadiusQuizs, K2LDImageAlignmentQuizs
    } = attributes;


    var mainCardContainerStyle ={
        paddingTop: K2ldmainContPaddingQuizs.top,
		paddingRight: K2ldmainContPaddingQuizs.right,
		paddingBottom: K2ldmainContPaddingQuizs.bottom,
		paddingLeft: K2ldmainContPaddingQuizs.left,
        marginTop: K2ldmainContMarginQuizs.top,
		marginRight: K2ldmainContMarginQuizs.right,
		marginBottom: K2ldmainContMarginQuizs.bottom,
		marginLeft: K2ldmainContMarginQuizs.left,
        borderColor: K2ldmainContBorderQuizs.color,
        borderStyle: K2ldmainContBorderQuizs.style,
        borderWidth: K2ldmainContBorderQuizs.width,
        borderTopLeftRadius: K2ldmainContBorderRadiusQuizs.top,
		borderTopRightRadius: K2ldmainContBorderRadiusQuizs.right,
		borderBottomRightRadius: K2ldmainContBorderRadiusQuizs.bottom,
		borderBottomLeftRadius: K2ldmainContBorderRadiusQuizs.left,
        background: K2ldmainContBackgroundQuizs

    }
    var ldtotalCourseStyle = {
        fontSize: K2ldHeadingSizeQuizs,
        fontFamily: K2ldheadingFontFamQuizs,
        fontWeight: K2ldheadingFontWeightQuizs,
        color: K2ldheadingColorQuizs
    }
    var ldCountStyle = {
        fontSize: K2ldCountSizeQuizs,
        fontFamily: K2ldCountFontFamQuizs,
        fontWeight: K2ldCountFontWeightQuizs,
        color: K2ldCountColorQuizs
    }

    var K2imgstyles= {
        width: k2ldImageWidthQuizs+'%'
    }

    var ImageContStyles = {
        backgroundColor: K2ldImageBackgroundQuizs,
        borderTopLeftRadius: K2ldImageContBorderRadiusQuizs.top,
		borderTopRightRadius: K2ldImageContBorderRadiusQuizs.right,
		borderBottomRightRadius: K2ldImageContBorderRadiusQuizs.bottom,
		borderBottomLeftRadius: K2ldImageContBorderRadiusQuizs.left,
        justifyContent:K2LDImageAlignmentQuizs

    }

	return (
		<div {...useBlockProps.save()}>
			<div className="k2_ld_total_course_parent_container_save" style={mainCardContainerStyle}>
                <div className="k2_ld_total_course_left">
                    <h4 style={ldtotalCourseStyle}>Total Topics</h4>
                    <h3 style={ldCountStyle}>
                        {NumberOfQuizs && Object.keys(NumberOfQuizs).length}
                    </h3>
                    
                </div>
                <div className="k2_ld_total_course_right">
                    <div className="k2_ld_total_course_image_container" style={ImageContStyles}>
                        <img src={k2ldImageQuizs} style={K2imgstyles} />
                    </div>
                </div>
            </div>
		</div>
	);
}
