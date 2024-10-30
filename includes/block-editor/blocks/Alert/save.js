/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
// import { useBlockProps } from '@wordpress/block-editor';
import { useBlockProps,
	AlignmentControl,
	RichText,
	InspectorControls,
	PanelColorSettings,
	MediaUpload
	} from '@wordpress/block-editor';
import { useMemo } from '@wordpress/element';

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
		AlertBoxImageUrl, AlertBoxText, AlertBoxColor, AlertBoxBorderColor, AlertBoxTextColor, AlertBoxIconSize, AlertBoxTextSize, AlertBoxIconColor, AlertBoxIconType, AlertBoxIconSpacing, AlertBoxLayoutOptions, AlertBoxLayoutAttribute, AlertBoxClassicAlignment, AlertBoxSimpleAlignment, AlertBoxBorderStyle, AlertBoxBorderWidth, AlertBoxBorderRadius, AlertBoxWidgetWidth, AlertIconBackgroundColor, AlertIconBackgroundBorderRadius, AlertBoxTextFontFamily, AlertBoxTextFontWeight, AlertBoxTextStyle, AlertBoxTextDecoration, AlertBoxTextLineHeight, AlertBoxWidth, AlertBoxWidgetAlignment, AlertBoxTextAlignment, enableImage, imageSize, AlertBoxMediaSpacing, EnableAlertBoxText, EnableAlertBoxHeading, AlertboxHeadingText, AlertBoxHeadingColor, AlertBoxHeadingSize, AlertBoxHeadingFontFam, AlertBoxHeadingFontWeight, AlertHeadingSpacing, AlertBoxShadow, AlertBoxImageBorderRadius, AlertBoxPaddingCont, alertBoxEnableButton, AlrtBoxButtonText, AlertBoxButtonLink, AlertBoxButtonAlignment, alertBoxButtonfontSize, AlertBoxButtonFontFamily, AlertBoxButtonFontWeight, AlertBoxButtonTextColot, AlertBoxButtonbackgroundColor, AlertBoxButtonPadding, AlertBoxButtonMargin, AlertBoxButtonBorder, AlertBoxButtonBorderRadius

	} = attributes

	const WidgetContainerStyling = {
		justifyContent: AlertBoxWidgetAlignment
	}
	const ParentContainerStyling = {
		backgroundColor: AlertBoxColor,
		borderColor: AlertBoxBorderColor,
		flexDirection: AlertBoxLayoutAttribute,
		alignItems: AlertBoxClassicAlignment,
		justifyContent: AlertBoxSimpleAlignment,
		borderStyle: AlertBoxBorderStyle,
		borderWidth: AlertBoxBorderWidth + 'px',
		borderRadius: AlertBoxBorderRadius + 'px',
		boxShadow: AlertBoxShadow
		? `${AlertBoxShadow.x}px ${AlertBoxShadow.y}px ${AlertBoxShadow.blur}px ${AlertBoxShadow.spread}px ${AlertBoxShadow.color} ${AlertBoxShadow.position}`
		: 'none',
		paddingTop: AlertBoxPaddingCont && AlertBoxPaddingCont.top,
        paddingRight: AlertBoxPaddingCont && AlertBoxPaddingCont.right,
        paddingBottom: AlertBoxPaddingCont && AlertBoxPaddingCont.bottom,
        paddingLeft: AlertBoxPaddingCont && AlertBoxPaddingCont.left,
	}
	const anotherextraStyle ={
		// flexDirection: AlertBoxLayoutAttribute,
		// alignItems: AlertBoxClassicAlignment,
	}

	const AlertIconStyling = {
		fontSize: AlertBoxIconSize + 'rem',
		color: AlertBoxIconColor,
		backgroundColor: AlertIconBackgroundColor,
		borderRadius: AlertIconBackgroundBorderRadius,
		padding: '0.2em'
	}

	const AlertTextStyling = {
		display: 'block',
		fontSize: AlertBoxTextSize + 'rem',
		color: AlertBoxTextColor,
		paddingLeft: AlertBoxIconSpacing + 'em',
		wordWrap: 'break-word',
		lineHeight: AlertBoxTextLineHeight +"px"
	}

	const SubWidgetStyling = {
		width: AlertBoxWidth + '%'
	}
	const headingStyles = {
		fontSize: AlertBoxHeadingSize+"rem",
		color: AlertBoxHeadingColor,
		fontFamily: AlertBoxHeadingFontFam,
		fontWeight: AlertBoxHeadingFontWeight,
		marginBottom: AlertHeadingSpacing+"px"
	}	
	const mediaContainer = {
		marginBottom: AlertBoxMediaSpacing
	}
	const ALertImageStyles ={
		width: imageSize + '%',
		borderRadius: AlertBoxImageBorderRadius + 'px'
	}
	const textContainerStyle = {
		paddingLeft: AlertBoxIconSpacing + 'em',
		textAlign: AlertBoxTextAlignment
	}
	//if not Simple
	const ClassictextContainerStyle = {
		// paddingLeft: AlertBoxIconSpacing + 'em',
		textAlign: AlertBoxTextAlignment
	}
	const ButtonStyles = {
		fontSize: alertBoxButtonfontSize + 'rem',
		fontFamily: AlertBoxButtonFontFamily,
		fontWeight: AlertBoxButtonFontWeight,
		color: AlertBoxButtonTextColot,
		backgroundColor: AlertBoxButtonbackgroundColor,
		paddingTop: AlertBoxButtonPadding && AlertBoxButtonPadding.top,
        paddingRight: AlertBoxButtonPadding && AlertBoxButtonPadding.right,
        paddingBottom: AlertBoxButtonPadding && AlertBoxButtonPadding.bottom,
        paddingLeft: AlertBoxButtonPadding && AlertBoxButtonPadding.left,
		borderColor: AlertBoxButtonBorder && AlertBoxButtonBorder.color,
        borderStyle: AlertBoxButtonBorder && AlertBoxButtonBorder.style,
        borderWidth: AlertBoxButtonBorder && AlertBoxButtonBorder.width,
		borderRadius: AlertBoxButtonBorderRadius + 'px'
	}
	const buttonContStyle = {
		justifyContent: AlertBoxButtonAlignment,
		marginTop: AlertBoxButtonMargin && AlertBoxButtonMargin.top,
		marginRight: AlertBoxButtonMargin && AlertBoxButtonMargin.right,
		marginBottom: AlertBoxButtonMargin && AlertBoxButtonMargin.bottom,
		marginLeft: AlertBoxButtonMargin && AlertBoxButtonMargin.left,
	}
	var link = AlertBoxButtonLink

	var sup = "parent.open('" + link + "')"

	return (
		<div { ...useBlockProps.save() }  style={WidgetContainerStyling} className={'k2-ib-widget-container'}>
			<div style={SubWidgetStyling}>

				<div style={ParentContainerStyling} className={'k2-ib-container'}>
						<div style={mediaContainer}>
							{ enableImage == true ?
								<div className={"k2-ib-box"}>
									<img src={AlertBoxImageUrl} className="K2-image-Block" style={ALertImageStyles} />
							
								</div>
								:<div className={"k2-ib-box"}>
									<i style={AlertIconStyling} className={AlertBoxIconType}></i>
									
								</div>
							}
						</div>
					<div className='k2-ib-text-image-area' style={anotherextraStyle}>
						<div className='' style={AlertBoxLayoutOptions   === 'Simple' ? textContainerStyle : ClassictextContainerStyle} >
							{
								EnableAlertBoxHeading == true ?
									<RichText.Content 
										tagName="h3"
										value = {AlertboxHeadingText}
										style = {headingStyles}
									/>
								:null
								}
								{
								EnableAlertBoxText == true ?
									<RichText.Content
										tagName="p" // The tag here is the element output and editable in the admin
										value={ AlertBoxText } // Any existing content, either from the database or an attribute default
										className = {'k2-ib-box'}
										style = {AlertTextStyling}
									/>
								:null
							}
						</div>
						{
							alertBoxEnableButton == true ?
								<div className='k2-ib-button-container' style={buttonContStyle}>
									<button style={ButtonStyles} onClick={sup}>
										<RichText.Content
											value = {AlrtBoxButtonText}
											tagName='span'
										/>
									</button>

								</div>
							:null
						}
					</div>
				</div>
			</div>

		</div>

	);
}
