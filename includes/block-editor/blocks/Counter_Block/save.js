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
		counterLayout,
        widgetSize,
        paddingTop,
        backgroundColor,
        haloColor,
        titleFontColor,
        numberFontColor,
        titleFontFamily,
        numberFontFamily,
        numberFontSize,
        titleFontSize,
        counterShapeClass,
        number,
        type,
        title,
        date,
        prefix,
        postfix
	} = attributes;

	var styling = {
		backgroundColor: (counterShapeClass == '')?'transparent':backgroundColor,
		width: widgetSize+"px",
		height: widgetSize+"px",
		boxShadow: (counterShapeClass != 'k2-cw-halo')?'none':"0 0 25px "+haloColor
	}
	var advanceStytling = {
		backgroundColor: (counterShapeClass == ' ')?'transparent':backgroundColor,
		boxShadow: (counterShapeClass != 'k2-cw-halo')?'none':"0 0 25px "+haloColor
	}
	var AdvancenumberStyling = {
		color: numberFontColor,
		fontFamily: numberFontFamily,
		fontSize: numberFontSize + 'em',
		margin: '16px 1px 1px -37px'
		}

	var titleStyling = {
		color: titleFontColor,
		fontFamily: titleFontFamily,
		fontSize: titleFontSize + 'em',
	}
	var adtitleStyling = {
		color: titleFontColor,
		fontFamily: titleFontFamily,
		fontSize: titleFontSize + 'em',
		textAlign:"left",
		marginTop:"0px",
		marginLeft:"10px"
	}
	var numberStyling = {
		color: numberFontColor,
		fontFamily: numberFontFamily,
		fontSize: numberFontSize + 'em',
	}

	var contentStyling = {
		paddingTop: paddingTop+'px'
	}
	return (
		<div className="k2-cw-parent">
				{
					counterLayout == 'advance' ?
					<div className="k2-cw-container" style={{width:'190px'}} data-done={0}>
						<div className="k2-cw-content k2-contentadvance-flex" style={contentStyling}>
							<div className={"k2-cw-advance-background"+"  "+counterShapeClass} style={advanceStytling}></div>
							<div className="k2-cw-number" style={AdvancenumberStyling}>
								<span className="k2-cw-prefix">{prefix}</span>
								<span className="k2-cw-span-number">{number}</span>
								<span className="k2-cw-postfix">{postfix}</span>
							</div>		
						</div>
						<p className="k2-cw-title" style={adtitleStyling }> {title} </p>	
					</div>
					:
					<div className={"k2-cw-container"+" "+counterShapeClass} style={styling} data-done={0}>
						<div className="k2-cw-content" style={contentStyling}>
							<div className="k2-cw-number" style={numberStyling}>
								<span className="k2-cw-prefix">{prefix}</span>
								<span className="k2-cw-span-number">{number}</span>
								<span className="k2-cw-postfix">{postfix}</span>
							</div>
							<p className="k2-cw-title" style={titleStyling}> {title} </p>
						</div>
					</div>
				}
				
			</div>

	);
}
