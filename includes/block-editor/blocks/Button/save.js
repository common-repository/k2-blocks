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

import ColorPopup from '../Components/ColorPopup';

import {
	PanelBody ,
	PanelRow,
	TextControl,
	__experimentalNumberControl as NumberControl,
	__experimentalBorderBoxControl as BorderBoxControl,
	__experimentalBoxControl as BoxControl,
	RangeControl,
	ToggleControl,
	ColorPalette,
	SelectControl,
	Card,
	CardBody,
	CardHeader,
	TabPanel,
	Flex, FlexBlock, FlexItem,
	} from '@wordpress/components';


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
		AnimatedButtonWidth,
		AnimatedButtonBorderRadius,
		AnimatedButtonText,
		AnimatedButtonLink,
		AnimatedLetterSpacing,
		ButtonColor,
		TextColor,
		ButtonIconEnable,
		AlertBoxIconType,
		textFontFamily,
		textAlignment,
		ButtonIconPosition,
		ButtonIconTextGap,
		ButtonisHovered,
		HoveredBackground,
		HoveredTextColor,
		K2btnHoverEffects,
		K2ButtonPadding,
		BlockBackgroundShadow,
		ButtonFontSize,
		buttonID
	} = attributes;


	const AnimatedButtonStyling = {
		width: AnimatedButtonWidth + 'rem',
		borderRadius: AnimatedButtonBorderRadius + 'rem',
		// border: AnimatedButtonBorder + 'rem',
		// borderColor: 'black',
		letterSpacing: AnimatedLetterSpacing + 'rem',
		backgroundColor: ButtonColor, fontSize: ButtonFontSize+"em",
		color: TextColor,
		fontFamily: textFontFamily,
		flexDirection: ButtonIconPosition,
		gap: ButtonIconTextGap+'rem',
		boxShadow: BlockBackgroundShadow == true ?"0 0 10px " + ButtonColor :'none',
		paddingTop: K2ButtonPadding.top,
		paddingRight: K2ButtonPadding.right,
		paddingBottom: K2ButtonPadding.bottom,
		paddingLeft: K2ButtonPadding.left,


	}
	const HoveredAnimatedButtonStyle = {
		background: HoveredBackground,
		width: AnimatedButtonWidth + 'rem',
		borderRadius: AnimatedButtonBorderRadius + 'rem',
		// border: AnimatedButtonBorder + 'rem',
		// borderColor: 'black',
		letterSpacing: AnimatedLetterSpacing + 'rem',
		fontSize: ButtonFontSize+"em",
		color: HoveredTextColor,
		fontFamily: textFontFamily,
		flexDirection: ButtonIconPosition,
		gap: ButtonIconTextGap+'rem',
		boxShadow: BlockBackgroundShadow == true ?"0 0 10px " + ButtonColor :'none',
		paddingTop: K2ButtonPadding.top,
		paddingRight: K2ButtonPadding.right,
		paddingBottom: K2ButtonPadding.bottom,
		paddingLeft: K2ButtonPadding.left,

	}

	const stringyHover = JSON.stringify(HoveredAnimatedButtonStyle);

	var parentStyle = {
		justifyContent: textAlignment,
		display:'flex'
	
	};
	var link = AnimatedButtonLink

	var sup = "parent.open('" + link + "')"

	const SaveblockProps = useBlockProps.save({ className: 'Outer', style: parentStyle });
	return (
		<div {...SaveblockProps}  onClick={sup} >
			<button 
				style={AnimatedButtonStyling}
				className="gradient-button"
				id={buttonID}
				data-custom={stringyHover}
				data-hoverop = {K2btnHoverEffects}
			>
				{
					ButtonIconEnable == true ?
						<i className={AlertBoxIconType}></i>
					:null
				}
				<RichText.Content 
					value={AnimatedButtonText}
					tagName='span'
				/>
				
			</button>
		</div>


	);
}
