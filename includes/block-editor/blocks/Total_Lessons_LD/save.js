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
        k2_total_courses,SelectedK2Course, NumberOfLessons,K2ldmainContPaddingLessons, 
        K2ldmainContMarginLessons, K2ldmainContBorderLessons, K2ldmainContBorderRadiusLessons,
        K2ldmainContBackgroundLessons, K2ldHeadingSizeLessons, K2ldheadingFontFamLessons, K2ldheadingFontWeightLessons,
        K2ldheadingColorLessons, K2ldCountSizeLessons, K2ldCountFontFamLessons, K2ldCountFontWeightLessons,
        K2ldCountColorLessons, k2ldImageLessons, k2ldImageWidthLessons, K2ldImageBackgroundLessons, K2ldImageContBorderRadiusLessons,
        K2LDImageAlignmentLessons
    } = attributes;


    var mainCardContainerStyle ={
        paddingTop: K2ldmainContPaddingLessons.top,
		paddingRight: K2ldmainContPaddingLessons.right,
		paddingBottom: K2ldmainContPaddingLessons.bottom,
		paddingLeft: K2ldmainContPaddingLessons.left,
        marginTop: K2ldmainContMarginLessons.top,
		marginRight: K2ldmainContMarginLessons.right,
		marginBottom: K2ldmainContMarginLessons.bottom,
		marginLeft: K2ldmainContMarginLessons.left,
        borderColor: K2ldmainContBorderLessons.color,
        borderStyle: K2ldmainContBorderLessons.style,
        borderWidth: K2ldmainContBorderLessons.width,
        borderTopLeftRadius: K2ldmainContBorderRadiusLessons.top,
		borderTopRightRadius: K2ldmainContBorderRadiusLessons.right,
		borderBottomRightRadius: K2ldmainContBorderRadiusLessons.bottom,
		borderBottomLeftRadius: K2ldmainContBorderRadiusLessons.left,
        background: K2ldmainContBackgroundLessons

    }

    var ldtotalCourseStyle = {
        fontSize: K2ldHeadingSizeLessons,
        fontFamily: K2ldheadingFontFamLessons,
        fontWeight: K2ldheadingFontWeightLessons,
        color: K2ldheadingColorLessons
    }

    var ldCountStyle = {
        fontSize: K2ldCountSizeLessons,
        fontFamily: K2ldCountFontFamLessons,
        fontWeight: K2ldCountFontWeightLessons,
        color: K2ldCountColorLessons
    }

    var ImageContStyles = {
        backgroundColor: K2ldImageBackgroundLessons,
        borderTopLeftRadius: K2ldImageContBorderRadiusLessons.top,
		borderTopRightRadius: K2ldImageContBorderRadiusLessons.right,
		borderBottomRightRadius: K2ldImageContBorderRadiusLessons.bottom,
		borderBottomLeftRadius: K2ldImageContBorderRadiusLessons.left,
        justifyContent:K2LDImageAlignmentLessons

    }
    var K2imgstyles= {
        width: k2ldImageWidthLessons+'%'
    }

	return (
		<div {...useBlockProps.save()}>
			<div className="k2_ld_total_course_parent_container_save" style={mainCardContainerStyle}>
                <div className="k2_ld_total_course_left">
                    <h4 style={ldtotalCourseStyle}>Total Lessons</h4>
                    <h3 style={ldCountStyle}>
                        {NumberOfLessons && Object.keys(NumberOfLessons).length}
                    </h3>
                    
                </div>
                <div className="k2_ld_total_course_right">
                    <div className="k2_ld_total_course_image_container" style={ImageContStyles}>
                        <img src={k2ldImageLessons} style={K2imgstyles} />
                    </div>
                </div>
            </div>
		</div>
	);
}
