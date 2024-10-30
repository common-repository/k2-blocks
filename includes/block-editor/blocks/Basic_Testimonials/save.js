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
		k2BTtestimonials,
		k2BTauthorName,
		k2BTauthorImage,
		K2BTauthorImageWidth,
		K2BTtextColor,
		K2BTtextLineHeight ,
		k2BTtextfontSize,
		K2BTtextFontWeight,
		K2BTtextFontFamily,
		k2BTauthornameColor,
		k2BTauthorNameFontSize,
		k2BTauthorNameFontFamily,
		k2BTauthorNameFontWeight,
		K2BTtestimonialBackground,
		K2BTtestimonialBorder,
		K2BTtestimonialBorderRadius,
		K2BTquoteColor,
		K2BtquoteFontFam,
		AuthorImageAlignment,
		K2BTtextFontAlignment,
		K2BTauthorNameAlignment,
		K2BTwidth,
		K2BTposition,
		K2BTBottomSpacing
	} = attributes;

	const CardStyles = {
		background : K2BTtestimonialBackground,
		borderColor: K2BTtestimonialBorder.color,
		borderStyle: K2BTtestimonialBorder.style,
		borderWidth: K2BTtestimonialBorder.width,
		borderTopLeftRadius: K2BTtestimonialBorderRadius.top,
		borderTopRightRadius: K2BTtestimonialBorderRadius.right,
		borderBottomRightRadius: K2BTtestimonialBorderRadius.bottom,
		borderBottomLeftRadius: K2BTtestimonialBorderRadius.left,
		width: K2BTwidth+"%"
	}
	const BTPos = {
		display:"flex",
		justifyContent:K2BTposition
	}
	const authorImageStyle = {
		width: K2BTauthorImageWidth+"px"
	}
	const textstyle = {
		color: K2BTtextColor,
		fontSize: k2BTtextfontSize+"rem",
		fontFamily: K2BTtextFontFamily,
		fontWeight: K2BTtextFontWeight,
		textAlign:K2BTtextFontAlignment,
		marginBottom: K2BTBottomSpacing+"px",
		lineHeight: K2BTtextLineHeight+'rem'
	}
	const authorNameStyle = {
		color:k2BTauthornameColor,
		fontSize: k2BTauthorNameFontSize+"rem",
		fontFamily: k2BTauthorNameFontFamily,
		fontWeight: k2BTauthorNameFontWeight,
		textAlign: K2BTauthorNameAlignment
	}
	const QuoteStyle = {
		color: K2BTquoteColor,
		fontFamily: K2BtquoteFontFam,
	}
	const AuthorimageAlignment = {
		justifyContent: AuthorImageAlignment
	}
	return (
		<div {...useBlockProps.save()} style={BTPos}>
			<div className='k2-bt-parent-container' style={CardStyles}>
				<div className='k2-bt-top-section' style={AuthorimageAlignment}>
					<div className='k2-bt-image-container'>
							<img src={k2BTauthorImage} className="k2-bt-author-image" style={authorImageStyle} />
							<div className="k2-bt-quotation-mark-container" style={QuoteStyle} >“</div>
							
					</div>
				</div>
				<div className='k2-bt-testimonial-section'>
					<RichText.Content
						tagName='p'
						value={k2BTtestimonials}
						style={textstyle}
					/>
				</div>
				<hr/>
				<div className='k2-bt-authorName'>
					<RichText.Content
						tagName='p'
						value={k2BTauthorName}
						style={authorNameStyle}
					/>
				</div>
			</div>
		</div>

	);
}
