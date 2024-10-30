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
		EditorFontSize,
		EditorFontFamily,
		EditorTextColor,
		EditorTextAlignment,
		EditorFontWeight,
		EditorTextTransform,
		EditorLineHeight,
		EditorLetterSpacing,
		EditorTextDecoration,
		EditorTextStyle,
		EditorContent,
		EditorPadding,
		EditorMargin,
		EditorTopBorder,
		EditorRightBorder,
		EditorBottomBorder,
		EditorLeftBorder,
		EditorBorderStyle,
		EditorBorderColor,
		EditorBackgroundColor,
		EditorWidgetWidth

	} = attributes;

	const TextEditorStyling = {
		fontSize: EditorFontSize + 'rem',
		fontFamily: EditorFontFamily,
		color: EditorTextColor,
		fontWeight: EditorFontWeight,
		textTransform: EditorTextTransform,
		textAlign: EditorTextAlignment,
		fontStyle: EditorTextStyle,
		textDecoration: EditorTextDecoration,
		lineHeight: EditorLineHeight + 'em',
		letterSpacing: EditorLetterSpacing + 'px',
	}
	const EditorPaddingAndBorderSettings ={
		paddingTop: EditorPadding.top,
		paddingRight: EditorPadding.right,
		paddingBottom: EditorPadding.bottom,
		paddingLeft: EditorPadding.left,
		borderTopWidth: EditorTopBorder + 'px',
		borderRightWidth: EditorRightBorder + 'px',
		borderBottomWidth: EditorBottomBorder + 'px',
		borderLeftWidth: EditorLeftBorder + 'px' ,
		borderStyle: EditorBorderStyle,
		borderColor: EditorBorderColor,
		backgroundColor: EditorBackgroundColor,
	}
	const EditorMarginSettings = {
		marginTop: EditorMargin.top,
			marginRight: EditorMargin.right,
			marginBottom: EditorMargin.bottom,
			marginLeft: EditorMargin.left,
			width: EditorWidgetWidth + '%',

	}
	return (
		<div id={'k2-te-wrapper'}>
			<div id={'k2-te-parent'} style={EditorMarginSettings}>
				<div  style={EditorPaddingAndBorderSettings}>
					<RichText.Content 
						tagName="p"
						value={EditorContent }
						style={TextEditorStyling}
						className={"k2-te-paragraph"}
					/>
				</div>
			</div>
		</div>


	);
}
