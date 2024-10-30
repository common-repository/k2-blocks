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
		k2LdCoursedata,
        K2ldmainContPadding, K2ldmainContMargin, K2ldmainContBorder,K2ldmainContBorderRadius,
        K2ldmainContBackground, K2ldHeadingSize,K2ldheadingFontFam, K2ldheadingFontWeight,
        K2ldCountSize, K2ldCountFontFam, K2ldCountFontWeight, K2ldheadingColor, K2ldCountColor,
        k2ldImage, k2ldImageWidth, K2ldImageBackground, K2ldImageContBorderRadius,
        K2LDImageAlignment,
        K2ldmainContPaddingInProgress,K2ldmainContMarginInProgress,
        K2ldmainContBorderInProgress, K2ldmainContBorderRadiusInProgress,
        K2ldmainContBackgroundInProgress, K2ldHeadingSizeInProgress,
        K2ldheadingFontFamInProgress, K2ldheadingFontWeightInProgress,
        K2ldheadingColorInProgress,
        K2ldCountSizeInProgress, K2ldCountFontFamInProgress,
        K2ldCountFontWeightInProgress, K2ldCountColorInProgress,
        k2ldImageInProgress, k2ldImageWidthInProgress,
        K2ldImageBackgroundInProgress, K2ldImageContBorderRadiusInProgress,
        K2LDImageAlignmentInProgress,
        K2ldmainContPaddingCompleted,K2ldmainContMarginCompleted,
        K2ldmainContBorderCompleted, K2ldmainContBorderRadiusCompleted,
        K2ldmainContBackgroundCompleted, K2ldHeadingSizeCompleted,
        K2ldheadingFontFamCompleted, K2ldheadingFontWeightCompleted,
        K2ldheadingColorCompleted,
        K2ldCountSizeCompleted, K2ldCountFontFamCompleted,
        K2ldCountFontWeightCompleted, K2ldCountColorCompleted,
        k2ldImageCompleted, k2ldImageWidthCompleted,
        K2ldImageBackgroundCompleted, K2ldImageContBorderRadiusCompleted,
        K2LDImageAlignmentCompleted,
        k2ldCourseStatDirection,
        k2ldCourseCardColwidth
    } = attributes;

    let MainContainerStyle = {
        flexDirection: k2ldCourseStatDirection
    }

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

    if(k2ldCourseStatDirection === 'column'){
        mainCardContainerStyle.width=`${k2ldCourseCardColwidth}%`
    }

    var mainCardContainerStyleInProgress ={
        paddingTop: K2ldmainContPaddingInProgress.top,
		paddingRight: K2ldmainContPaddingInProgress.right,
		paddingBottom: K2ldmainContPaddingInProgress.bottom,
		paddingLeft: K2ldmainContPaddingInProgress.left,
        marginTop: K2ldmainContMarginInProgress.top,
		marginRight: K2ldmainContMarginInProgress.right,
		marginBottom: K2ldmainContMarginInProgress.bottom,
		marginLeft: K2ldmainContMarginInProgress.left,
        borderColor: K2ldmainContBorderInProgress.color,
        borderStyle: K2ldmainContBorderInProgress.style,
        borderWidth: K2ldmainContBorderInProgress.width,
        borderTopLeftRadius: K2ldmainContBorderRadiusInProgress.top,
		borderTopRightRadius: K2ldmainContBorderRadiusInProgress.right,
		borderBottomRightRadius: K2ldmainContBorderRadiusInProgress.bottom,
		borderBottomLeftRadius: K2ldmainContBorderRadiusInProgress.left,
        background: K2ldmainContBackgroundInProgress

    }

    if(k2ldCourseStatDirection === 'column'){
        mainCardContainerStyleInProgress.width=`${k2ldCourseCardColwidth}%`
    }

    var mainCardContainerStyleCompleted ={
        paddingTop: K2ldmainContPaddingCompleted.top,
		paddingRight: K2ldmainContPaddingCompleted.right,
		paddingBottom: K2ldmainContPaddingCompleted.bottom,
		paddingLeft: K2ldmainContPaddingCompleted.left,
        marginTop: K2ldmainContMarginCompleted.top,
		marginRight: K2ldmainContMarginCompleted.right,
		marginBottom: K2ldmainContMarginCompleted.bottom,
		marginLeft: K2ldmainContMarginCompleted.left,
        borderColor: K2ldmainContBorderCompleted.color,
        borderStyle: K2ldmainContBorderCompleted.style,
        borderWidth: K2ldmainContBorderCompleted.width,
        borderTopLeftRadius: K2ldmainContBorderRadiusCompleted.top,
		borderTopRightRadius: K2ldmainContBorderRadiusCompleted.right,
		borderBottomRightRadius: K2ldmainContBorderRadiusCompleted.bottom,
		borderBottomLeftRadius: K2ldmainContBorderRadiusCompleted.left,
        background: K2ldmainContBackgroundCompleted

    }

    if(k2ldCourseStatDirection === 'column'){
        mainCardContainerStyleCompleted.width=`${k2ldCourseCardColwidth}%`
    }

	var ldtotalCourseStyle = {
        fontSize: K2ldHeadingSize,
        fontFamily: K2ldheadingFontFam,
        fontWeight: K2ldheadingFontWeight,
        color: K2ldheadingColor
    }

    var ldtotalCourseStyleInProgress = {
        fontSize: K2ldHeadingSizeInProgress,
        fontFamily: K2ldheadingFontFamInProgress,
        fontWeight: K2ldheadingFontWeightInProgress,
        color: K2ldheadingColorInProgress
    }

    var ldtotalCourseStyleCompleted = {
        fontSize: K2ldHeadingSizeCompleted,
        fontFamily: K2ldheadingFontFamCompleted,
        fontWeight: K2ldheadingFontWeightCompleted,
        color: K2ldheadingColorCompleted
    }


	var ldCountStyle = {
        fontSize: K2ldCountSize,
        fontFamily: K2ldCountFontFam,
        fontWeight: K2ldCountFontWeight,
        color: K2ldCountColor
    }

    var ldCountStyleInProgress = {
        fontSize: K2ldCountSizeInProgress,
        fontFamily: K2ldCountFontFamInProgress,
        fontWeight: K2ldCountFontWeightInProgress,
        color: K2ldCountColorInProgress
    }

    var ldCountStyleCompleted = {
        fontSize: K2ldCountSizeCompleted,
        fontFamily: K2ldCountFontFamCompleted,
        fontWeight: K2ldCountFontWeightCompleted,
        color: K2ldCountColorCompleted
    }


	var K2imgstyles= {
        width: k2ldImageWidth+'%'
    }

    var K2imgstylesInProgress= {
        width: k2ldImageWidthInProgress+'%'
    }
    var K2imgstylesCompleted= {
        width: k2ldImageWidthCompleted+'%'
    }


	var ImageContStyles = {
        backgroundColor: K2ldImageBackground,
        borderTopLeftRadius: K2ldImageContBorderRadius.top,
		borderTopRightRadius: K2ldImageContBorderRadius.right,
		borderBottomRightRadius: K2ldImageContBorderRadius.bottom,
		borderBottomLeftRadius: K2ldImageContBorderRadius.left,
        justifyContent:K2LDImageAlignment

    }

    var ImageContStylesInProgress = {
        backgroundColor: K2ldImageBackgroundInProgress,
        borderTopLeftRadius: K2ldImageContBorderRadiusInProgress.top,
		borderTopRightRadius: K2ldImageContBorderRadiusInProgress.right,
		borderBottomRightRadius: K2ldImageContBorderRadiusInProgress.bottom,
		borderBottomLeftRadius: K2ldImageContBorderRadiusInProgress.left,
        justifyContent:K2LDImageAlignmentInProgress

    }

    var ImageContStylesCompleted = {
        backgroundColor: K2ldImageBackgroundCompleted,
        borderTopLeftRadius: K2ldImageContBorderRadiusCompleted.top,
		borderTopRightRadius: K2ldImageContBorderRadiusCompleted.right,
		borderBottomRightRadius: K2ldImageContBorderRadiusCompleted.bottom,
		borderBottomLeftRadius: K2ldImageContBorderRadiusCompleted.left,
        justifyContent:K2LDImageAlignmentCompleted

    }
	return (
		<div {...useBlockProps.save({ className: 'Student_course_stats_LD_main' })} style={MainContainerStyle} >
			<div className="k2_ld_total_course_parent_container_save" style={mainCardContainerStyle} >
                <div className="k2_ld_total_course_left">
                    <h4 style={ldtotalCourseStyle}>Not Started</h4>
                    <h3 style={ldCountStyle} id="student_stat_not_started">
                        {k2LdCoursedata ?
                              k2LdCoursedata.filter(item => item.status.status === "not_started").length
                        : 0
                        }
                    </h3>
                </div>
                <div className="k2_ld_total_course_right">
                    <div className="k2_ld_total_course_image_container" style={ImageContStyles}>
                        <img src={k2ldImage} style={K2imgstyles} />
                    </div>
                </div>
            </div>
            <div className="k2_ld_total_course_parent_container_save" style={mainCardContainerStyleInProgress}>
                <div className="k2_ld_total_course_left">
                    <h4 style={ldtotalCourseStyleInProgress}>In-Progress</h4>
                    <h3 style={ldCountStyleInProgress}  id="student_stat_in_progress">
                        {k2LdCoursedata ?
                              k2LdCoursedata.filter(item => item.status.status === "in_progress").length
                        : 0
                        }
                    </h3>
                </div>
                <div className="k2_ld_total_course_right">
                    <div className="k2_ld_total_course_image_container" style={ImageContStylesInProgress}>
                        <img src={k2ldImageInProgress} style={K2imgstylesInProgress} />
                    </div>
                </div>
            </div>
            <div className="k2_ld_total_course_parent_container_save" style={mainCardContainerStyleCompleted}>
                <div className="k2_ld_total_course_left">
                    <h4 style={ldtotalCourseStyleCompleted}>Completed</h4>
                    <h3 style={ldCountStyleCompleted}  id="student_stat_completed">
                        {k2LdCoursedata ?
                              k2LdCoursedata.filter(item => item.status.status === "completed").length
                        : 0
                        }
                    </h3>
                </div>
                <div className="k2_ld_total_course_right">
                    <div className="k2_ld_total_course_image_container" style={ImageContStylesCompleted}>
                        <img src={k2ldImageCompleted} style={K2imgstylesCompleted} />
                    </div>
                </div>
            </div>
		</div>
	);
}
