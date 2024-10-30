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
	
	const {K2headingoneFontWeight,K2headingtwoFontWeight,K2headingthreeFontWeight, K2headingoneFontFam,K2headingtwoFontFam, K2headingthreeFontFam, K2headingAlignment,K2Headingone, K2HeadingoneColor,K2HeadingoneSize, K2Headingtwo , K2HeadingtwoColor ,K2HeadingtwoSize, enableHeadingthree, K2Headingthree, K2HeadingthreeColor, K2HeadingthreeSize, startFromNewLineTwo, startFromNewLineThree, K2HeadingBgColor, K2HeadingOnePadding,K2HeadingtwoBgColor, K2HeadingtwoPadding, K2HeadingthreeBgColor, K2HeadingthreePadding,
        
		K2enableHeadingtwo , K2HeadingOneMargin,K2HeadingtwoMargin, K2HeadingthreeMargin, K2HeadingOneBorder, K2HeadingtwoBorder , K2HeadingthreeBorder, K2HeadingOneBorderRadius, K2HeadingtwoBorderRadius, K2HeadingthreeBorderRadius, K2HeadingoneGradient , K2HeadingOneColoractiveTab, K2HeadingtwoGradient, K2HeadingtwoColoractiveTab, K2HeadingthreeColoractiveTab, K2HeadingthreeGradient} = attributes;

	const headingoneStyle = {
		color: K2HeadingoneColor,
		fontSize:K2HeadingoneSize +"px",
		fontFamily: K2headingoneFontFam,
		fontWeight: K2headingoneFontWeight,
		background: K2HeadingBgColor,
		paddingTop: K2HeadingOnePadding.top,
		paddingRight: K2HeadingOnePadding.right,
		paddingBottom: K2HeadingOnePadding.bottom,
		paddingLeft: K2HeadingOnePadding.left,
		marginTop: K2HeadingOneMargin.top,
		marginRight: K2HeadingOneMargin.right,
		marginBottom: K2HeadingOneMargin.bottom,
		marginLeft: K2HeadingOneMargin.left,
		borderColor: K2HeadingOneBorder.color,
		borderStyle: K2HeadingOneBorder.style,
		borderWidth: K2HeadingOneBorder.width,
		borderTopLeftRadius: K2HeadingOneBorderRadius.top,
		borderTopRightRadius: K2HeadingOneBorderRadius.right,
		borderBottomRightRadius: K2HeadingOneBorderRadius.bottom,
		borderBottomLeftRadius: K2HeadingOneBorderRadius.left,
	}
	const headingoneGradStyle = {
		backgroundImage: K2HeadingoneGradient,
		fontSize:K2HeadingoneSize +"px",
		fontFamily: K2headingoneFontFam,
		fontWeight: K2headingoneFontWeight,
		paddingTop: K2HeadingOnePadding.top,
		paddingRight: K2HeadingOnePadding.right,
		paddingBottom: K2HeadingOnePadding.bottom,
		paddingLeft: K2HeadingOnePadding.left,
		marginTop: K2HeadingOneMargin.top,
		marginRight: K2HeadingOneMargin.right,
		marginBottom: K2HeadingOneMargin.bottom,
		marginLeft: K2HeadingOneMargin.left,
		borderColor: K2HeadingOneBorder.color,
		borderStyle: K2HeadingOneBorder.style,
		borderWidth: K2HeadingOneBorder.width,
		borderTopLeftRadius: K2HeadingOneBorderRadius.top,
		borderTopRightRadius: K2HeadingOneBorderRadius.right,
		borderBottomRightRadius: K2HeadingOneBorderRadius.bottom,
		borderBottomLeftRadius: K2HeadingOneBorderRadius.left,
	}
	const headingoneBubbleStyle = {
		background: K2HeadingBgColor,
		fontSize:K2HeadingoneSize +"px",
		fontFamily: K2headingoneFontFam,
		fontWeight: K2headingoneFontWeight,
		paddingTop: K2HeadingOnePadding.top,
		paddingRight: K2HeadingOnePadding.right,
		paddingBottom: K2HeadingOnePadding.bottom,
		paddingLeft: K2HeadingOnePadding.left,
		marginTop: K2HeadingOneMargin.top,
		marginRight: K2HeadingOneMargin.right,
		marginBottom: K2HeadingOneMargin.bottom,
		marginLeft: K2HeadingOneMargin.left,
		borderColor: K2HeadingOneBorder.color,
		borderStyle: K2HeadingOneBorder.style,
		borderWidth: K2HeadingOneBorder.width,
		borderTopLeftRadius: K2HeadingOneBorderRadius.top,
		borderTopRightRadius: K2HeadingOneBorderRadius.right,
		borderBottomRightRadius: K2HeadingOneBorderRadius.bottom,
		borderBottomLeftRadius: K2HeadingOneBorderRadius.left,
	}
	const headingtwoStyle = {
		color : K2HeadingtwoColor,
		fontSize:K2HeadingtwoSize +"px",
		fontFamily: K2headingtwoFontFam,
		fontWeight: K2headingtwoFontWeight,
		background: K2HeadingtwoBgColor,
		paddingTop: K2HeadingtwoPadding.top,
		paddingRight: K2HeadingtwoPadding.right,
		paddingBottom: K2HeadingtwoPadding.bottom,
		paddingLeft: K2HeadingtwoPadding.left,
		marginTop: K2HeadingtwoMargin.top,
		marginRight: K2HeadingtwoMargin.right,
		marginBottom: K2HeadingtwoMargin.bottom,
		marginLeft: K2HeadingtwoMargin.left,
		borderColor: K2HeadingtwoBorder.color,
		borderStyle: K2HeadingtwoBorder.style,
		borderWidth: K2HeadingtwoBorder.width,
		borderTopLeftRadius: K2HeadingtwoBorderRadius.top,
		borderTopRightRadius: K2HeadingtwoBorderRadius.right,
		borderBottomRightRadius: K2HeadingtwoBorderRadius.bottom,
		borderBottomLeftRadius: K2HeadingtwoBorderRadius.left,
	}
	const headingtwoGradStyle = {
		backgroundImage: K2HeadingtwoGradient,
		fontSize:K2HeadingtwoSize +"px",
		fontFamily: K2headingtwoFontFam,
		fontWeight: K2headingtwoFontWeight,
		paddingTop: K2HeadingtwoPadding.top,
		paddingRight: K2HeadingtwoPadding.right,
		paddingBottom: K2HeadingtwoPadding.bottom,
		paddingLeft: K2HeadingtwoPadding.left,
		marginTop: K2HeadingtwoMargin.top,
		marginRight: K2HeadingtwoMargin.right,
		marginBottom: K2HeadingtwoMargin.bottom,
		marginLeft: K2HeadingtwoMargin.left,
		borderColor: K2HeadingtwoBorder.color,
		borderStyle: K2HeadingtwoBorder.style,
		borderWidth: K2HeadingtwoBorder.width,
		borderTopLeftRadius: K2HeadingtwoBorderRadius.top,
		borderTopRightRadius: K2HeadingtwoBorderRadius.right,
		borderBottomRightRadius: K2HeadingtwoBorderRadius.bottom,
		borderBottomLeftRadius: K2HeadingtwoBorderRadius.left,
	}
	const headingtwoBubbleStyle = {
		background: K2HeadingtwoBgColor,
		fontSize:K2HeadingtwoSize +"px",
		fontFamily: K2headingtwoFontFam,
		fontWeight: K2headingtwoFontWeight,
		paddingTop: K2HeadingtwoPadding.top,
		paddingRight: K2HeadingtwoPadding.right,
		paddingBottom: K2HeadingtwoPadding.bottom,
		paddingLeft: K2HeadingtwoPadding.left,
		marginTop: K2HeadingtwoMargin.top,
		marginRight: K2HeadingtwoMargin.right,
		marginBottom: K2HeadingtwoMargin.bottom,
		marginLeft: K2HeadingtwoMargin.left,
		borderColor: K2HeadingtwoBorder.color,
		borderStyle: K2HeadingtwoBorder.style,
		borderWidth: K2HeadingtwoBorder.width,
		borderTopLeftRadius: K2HeadingtwoBorderRadius.top,
		borderTopRightRadius: K2HeadingtwoBorderRadius.right,
		borderBottomRightRadius: K2HeadingtwoBorderRadius.bottom,
		borderBottomLeftRadius: K2HeadingtwoBorderRadius.left,
	}
	const headingthreeStyle = {
		color : K2HeadingthreeColor,
		fontSize:K2HeadingthreeSize +"px",
		fontFamily:K2headingthreeFontFam,
		fontWeight: K2headingthreeFontWeight,
		background: K2HeadingthreeBgColor,
		paddingTop: K2HeadingthreePadding.top,
		paddingRight: K2HeadingthreePadding.right,
		paddingBottom: K2HeadingthreePadding.bottom,
		paddingLeft: K2HeadingthreePadding.left,
		marginTop: K2HeadingthreeMargin.top,
		marginRight: K2HeadingthreeMargin.right,
		marginBottom: K2HeadingthreeMargin.bottom,
		marginLeft: K2HeadingthreeMargin.left,
		borderColor: K2HeadingthreeBorder.color,
		borderStyle: K2HeadingthreeBorder.style,
		borderWidth: K2HeadingthreeBorder.width,
		borderTopLeftRadius: K2HeadingthreeBorderRadius.top,
		borderTopRightRadius: K2HeadingthreeBorderRadius.right,
		borderBottomRightRadius: K2HeadingthreeBorderRadius.bottom,
		borderBottomLeftRadius: K2HeadingthreeBorderRadius.left,
	}
	const headingthreeGradStyle = {
		backgroundImage: K2HeadingthreeGradient,
		fontSize:K2HeadingthreeSize +"px",
		fontFamily:K2headingthreeFontFam,
		fontWeight: K2headingthreeFontWeight,
		paddingTop: K2HeadingthreePadding.top,
		paddingRight: K2HeadingthreePadding.right,
		paddingBottom: K2HeadingthreePadding.bottom,
		paddingLeft: K2HeadingthreePadding.left,
		marginTop: K2HeadingthreeMargin.top,
		marginRight: K2HeadingthreeMargin.right,
		marginBottom: K2HeadingthreeMargin.bottom,
		marginLeft: K2HeadingthreeMargin.left,
		borderColor: K2HeadingthreeBorder.color,
		borderStyle: K2HeadingthreeBorder.style,
		borderWidth: K2HeadingthreeBorder.width,
		borderTopLeftRadius: K2HeadingthreeBorderRadius.top,
		borderTopRightRadius: K2HeadingthreeBorderRadius.right,
		borderBottomRightRadius: K2HeadingthreeBorderRadius.bottom,
		borderBottomLeftRadius: K2HeadingthreeBorderRadius.left,
	}
	const headingthreeBubbleStyle = {
		background: K2HeadingthreeBgColor,
		fontSize:K2HeadingthreeSize +"px",
		fontFamily:K2headingthreeFontFam,
		fontWeight: K2headingthreeFontWeight,
		paddingTop: K2HeadingthreePadding.top,
		paddingRight: K2HeadingthreePadding.right,
		paddingBottom: K2HeadingthreePadding.bottom,
		paddingLeft: K2HeadingthreePadding.left,
		marginTop: K2HeadingthreeMargin.top,
		marginRight: K2HeadingthreeMargin.right,
		marginBottom: K2HeadingthreeMargin.bottom,
		marginLeft: K2HeadingthreeMargin.left,
		borderColor: K2HeadingthreeBorder.color,
		borderStyle: K2HeadingthreeBorder.style,
		borderWidth: K2HeadingthreeBorder.width,
		borderTopLeftRadius: K2HeadingthreeBorderRadius.top,
		borderTopRightRadius: K2HeadingthreeBorderRadius.right,
		borderBottomRightRadius: K2HeadingthreeBorderRadius.bottom,
		borderBottomLeftRadius: K2HeadingthreeBorderRadius.left,
	}
	const headingStyle = {
		textAlign:K2headingAlignment
	}
   

	return (
		<div {...useBlockProps.save()}>
                <h1 className='K2-heading-container' style={headingStyle}>
                    <span className={`${K2HeadingOneColoractiveTab === 'TextGradient' && 'Text-gradient-class'} ${K2HeadingOneColoractiveTab === 'BubbleWrite' && 'bubble-text'}`}
                            style={{
                                ...(K2HeadingOneColoractiveTab === 'TextColor' && headingoneStyle),
                                ...(K2HeadingOneColoractiveTab === 'TextGradient' && headingoneGradStyle),
                                ...(K2HeadingOneColoractiveTab === 'BubbleWrite' && headingoneBubbleStyle)
                                }} ><RichText.Content value={K2Headingone} /></span>
                    {startFromNewLineTwo === true ? <br /> : null}
                    {
                            K2enableHeadingtwo == true ?
                    <span  className={`${K2HeadingtwoColoractiveTab === 'TextGradient' && 'Text-gradient-class'} ${K2HeadingtwoColoractiveTab === 'BubbleWrite' && 'bubble-text'}`}
                            style={{
                                ...(K2HeadingtwoColoractiveTab === 'TextColor' && headingtwoStyle),
                                ...(K2HeadingtwoColoractiveTab === 'TextGradient' && headingtwoGradStyle),
                                ...(K2HeadingtwoColoractiveTab === 'BubbleWrite' && headingtwoBubbleStyle)
                                }} ><RichText.Content value={K2Headingtwo} /></span>
                    :null
                    }
                    {startFromNewLineThree === true ? <br /> : null}
                    {
                        enableHeadingthree === true ? 
                        
                        <span   className={`${K2HeadingthreeColoractiveTab === 'TextGradient' && 'Text-gradient-class'} ${K2HeadingthreeColoractiveTab === 'BubbleWrite' && 'bubble-text'}`}
                            style={{
                                ...(K2HeadingthreeColoractiveTab === 'TextColor' && headingthreeStyle),
                                ...(K2HeadingthreeColoractiveTab === 'TextGradient' && headingthreeGradStyle),
                                ...(K2HeadingthreeColoractiveTab === 'BubbleWrite' && headingthreeBubbleStyle)
                                }} ><RichText.Content value={K2Headingthree} /></span>
                       
                        :null
                    }
                    
                </h1>
        </div>

	);
}
