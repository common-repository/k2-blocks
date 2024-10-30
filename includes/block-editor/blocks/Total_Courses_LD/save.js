/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
// import { useBlockProps } from '@wordpress/block-editor';
import { useBlockProps	} from '@wordpress/block-editor';
/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {Element} Element to render.
 */
export default function save({attributes, props}) {
	const {
		k2LdCoursedata, k2LdfilterType, courseMaindivID,
        K2ldmainContPadding, K2ldmainContMargin, K2ldmainContBorder,K2ldmainContBorderRadius,
        K2ldmainContBackground, K2ldHeadingSize,K2ldheadingFontFam, K2ldheadingFontWeight,
        K2ldCountSize, K2ldCountFontFam, K2ldCountFontWeight, K2ldheadingColor, K2ldCountColor,
        k2ldImage, k2ldImageWidth, K2ldImageBackground, K2ldImageContBorderRadius, K2LDgroupList, SelectedK2groupList,
        K2LDImageAlignment
    } = attributes;

	var mainCardContainerStyle ={
        paddingTop: K2ldmainContPadding.top,
		paddingRight: K2ldmainContPadding.right,
		paddingBottom: K2ldmainContPadding.bottom,
		paddingLeft: K2ldmainContPadding.left,
        marginTop: K2ldmainContMargin.top,
		marginRight: K2ldmainContMargin.right,
		marginBottom: K2ldmainContMargin.bottom,
		marginLeft: K2ldmainContMargin.left,
        borderColor: K2ldmainContBorder.color,
        borderStyle: K2ldmainContBorder.style,
        borderWidth: K2ldmainContBorder.width,
        borderTopLeftRadius: K2ldmainContBorderRadius.top,
		borderTopRightRadius: K2ldmainContBorderRadius.right,
		borderBottomRightRadius: K2ldmainContBorderRadius.bottom,
		borderBottomLeftRadius: K2ldmainContBorderRadius.left,
        background: K2ldmainContBackground

    }
	var ldtotalCourseStyle = {
        fontSize: K2ldHeadingSize,
        fontFamily: K2ldheadingFontFam,
        fontWeight: K2ldheadingFontWeight,
        color: K2ldheadingColor
    }
	var ldCountStyle = {
        fontSize: K2ldCountSize,
        fontFamily: K2ldCountFontFam,
        fontWeight: K2ldCountFontWeight,
        color: K2ldCountColor
    }
	var K2imgstyles= {
        width: k2ldImageWidth+'%'
    }
	var ImageContStyles = {
        backgroundColor: K2ldImageBackground,
        borderTopLeftRadius: K2ldImageContBorderRadius.top,
		borderTopRightRadius: K2ldImageContBorderRadius.right,
		borderBottomRightRadius: K2ldImageContBorderRadius.bottom,
		borderBottomLeftRadius: K2ldImageContBorderRadius.left,
        justifyContent:K2LDImageAlignment

    }

	return (
		<div {...useBlockProps.save()}>
			<div className="k2_ld_total_course_parent_container_save" data-courseFilter={k2LdfilterType} style={mainCardContainerStyle}>
                <div className="k2_ld_total_course_left">
                    <h4 style={ldtotalCourseStyle}>Total Courses</h4>
                    <h3 style={ldCountStyle}>
                        {k2LdCoursedata &&
                            k2LdCoursedata.length
                        }
                    </h3>
                    
                </div>
                <div className="k2_ld_total_course_right">
                    <div className="k2_ld_total_course_image_container" style={ImageContStyles}>
                        <img src={k2ldImage} style={K2imgstyles} />
                    </div>
                </div>
            </div>
		</div>
	);
}
