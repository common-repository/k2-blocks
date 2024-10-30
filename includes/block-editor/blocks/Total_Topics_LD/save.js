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
        k2_total_courses_topic,SelectedK2CourseForTopic, NumberOfTopics,K2ldmainContPaddingTopics, 
        K2ldmainContMarginTopics, K2ldmainContBorderTopics, K2ldmainContBorderRadiusTopics,
        K2ldmainContBackgroundTopics, K2ldHeadingSizeTopics, K2ldheadingFontFamTopics, K2ldheadingFontWeightTopics,
        K2ldheadingColorTopics, K2ldCountSizeTopics, K2ldCountFontFamTopics, K2ldCountFontWeightTopics,
        K2ldCountColorTopics, k2ldImageTopics, k2ldImageWidthTopics, K2ldImageBackgroundTopics, K2ldImageContBorderRadiusTopics,
        K2LDImageAlignmentTopics
    } = attributes;


    var mainCardContainerStyle ={
        paddingTop: K2ldmainContPaddingTopics.top,
		paddingRight: K2ldmainContPaddingTopics.right,
		paddingBottom: K2ldmainContPaddingTopics.bottom,
		paddingLeft: K2ldmainContPaddingTopics.left,
        marginTop: K2ldmainContMarginTopics.top,
		marginRight: K2ldmainContMarginTopics.right,
		marginBottom: K2ldmainContMarginTopics.bottom,
		marginLeft: K2ldmainContMarginTopics.left,
        borderColor: K2ldmainContBorderTopics.color,
        borderStyle: K2ldmainContBorderTopics.style,
        borderWidth: K2ldmainContBorderTopics.width,
        borderTopLeftRadius: K2ldmainContBorderRadiusTopics.top,
		borderTopRightRadius: K2ldmainContBorderRadiusTopics.right,
		borderBottomRightRadius: K2ldmainContBorderRadiusTopics.bottom,
		borderBottomLeftRadius: K2ldmainContBorderRadiusTopics.left,
        background: K2ldmainContBackgroundTopics

    }

    var ldtotalCourseStyle = {
        fontSize: K2ldHeadingSizeTopics,
        fontFamily: K2ldheadingFontFamTopics,
        fontWeight: K2ldheadingFontWeightTopics,
        color: K2ldheadingColorTopics
    }

    var ldCountStyle = {
        fontSize: K2ldCountSizeTopics,
        fontFamily: K2ldCountFontFamTopics,
        fontWeight: K2ldCountFontWeightTopics,
        color: K2ldCountColorTopics
    }

    var ImageContStyles = {
        backgroundColor: K2ldImageBackgroundTopics,
        borderTopLeftRadius: K2ldImageContBorderRadiusTopics.top,
		borderTopRightRadius: K2ldImageContBorderRadiusTopics.right,
		borderBottomRightRadius: K2ldImageContBorderRadiusTopics.bottom,
		borderBottomLeftRadius: K2ldImageContBorderRadiusTopics.left,
        justifyContent:K2LDImageAlignmentTopics

    }
    var K2imgstyles= {
        width: k2ldImageWidthTopics+'%'
    }

	return (
		<div {...useBlockProps.save()}>
			<div className="k2_ld_total_course_parent_container_save" style={mainCardContainerStyle}>
                <div className="k2_ld_total_course_left">
                    <h4 style={ldtotalCourseStyle}>Total Topics</h4>
                    <h3 style={ldCountStyle}>
                        {NumberOfTopics && Object.keys(NumberOfTopics).length}
                    </h3>
                    
                </div>
                <div className="k2_ld_total_course_right">
                    <div className="k2_ld_total_course_image_container" style={ImageContStyles}>
                        <img src={k2ldImageTopics} style={K2imgstyles} />
                    </div>
                </div>
            </div>
		</div>
	);
}
