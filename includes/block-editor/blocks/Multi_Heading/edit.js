/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

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
import { useMemo, Fragment } from '@wordpress/element';

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

    GradientPicker,
	Flex, FlexBlock, FlexItem,
	} from '@wordpress/components';


import { GLOBAL_FONTS } from '../Global/GLOBAL_FONTS';
import { GLOBAL_FONTS_WEIGHTS } from '../Global/Global_Font_Weights';
import { GLOBAL_ICONS } from '../Global/Global_Icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlignCenter, faAlignLeft, faAlignRight, faHeading, faStar, faPlusCircle } from '@fortawesome/free-solid-svg-icons';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function edit({attributes, setAttributes, isSelected}) {

	const {K2headingoneFontWeight,K2headingtwoFontWeight,K2headingthreeFontWeight, K2headingoneFontFam,K2headingtwoFontFam, K2headingthreeFontFam, K2headingAlignment,K2Headingone, K2HeadingoneColor,K2HeadingoneSize, K2Headingtwo , K2HeadingtwoColor ,K2HeadingtwoSize, enableHeadingthree, K2Headingthree, K2HeadingthreeColor, K2HeadingthreeSize, startFromNewLineTwo, startFromNewLineThree, K2HeadingBgColor, K2HeadingOnePadding,K2HeadingtwoBgColor, K2HeadingtwoPadding, K2HeadingthreeBgColor, K2HeadingthreePadding,
        
		K2enableHeadingtwo, K2HeadingOneMargin,K2HeadingtwoMargin, K2HeadingthreeMargin, K2HeadingOneBorder, K2HeadingtwoBorder , K2HeadingthreeBorder, K2HeadingOneBorderRadius, K2HeadingtwoBorderRadius, K2HeadingthreeBorderRadius, K2HeadingoneGradient , K2HeadingOneColoractiveTab, K2HeadingtwoGradient, K2HeadingtwoColoractiveTab, K2HeadingthreeColoractiveTab, K2HeadingthreeGradient} = attributes;

	const onChangestartFromNewLineTwo = (newVal) => {
		setAttributes({startFromNewLineTwo:newVal})
	}
	const onChangestartFromNewLineThree = (newVal) => {
		setAttributes({startFromNewLineThree:newVal})
	}
	const onChangeK2Headingone = (newText) => {
		setAttributes({K2Headingone:newText})
	}

	const onChangeK2Headingtwo = (newText) => {
		setAttributes({K2Headingtwo:newText})
	}
	const onChangeenableHeadingthree = (newval) => {
		setAttributes({enableHeadingthree : newval })
	}
	
	const onChangeK2Headingthree = (newtext) => {
		setAttributes({K2Headingthree : newtext })
	}
	const onChangeK2headingoneFontFam = (newVal) => {
		setAttributes({K2headingoneFontFam:newVal})
	}
	const onChangeK2headingoneFontWeight = (NewWeight) => {
		setAttributes({K2headingoneFontWeight:NewWeight})
	}
	const onChangeK2HeadingBgColor = (newColor) => {
		setAttributes({K2HeadingBgColor:newColor})
	}
	const onChangeK2HeadingOnePadding = (newPadding) => {
		setAttributes({K2HeadingOnePadding:newPadding})
	}
	const onChangeK2HeadingOneMargin = (newMargin) =>{
		setAttributes({K2HeadingOneMargin:newMargin})
	}
	const onChangeK2HeadingOneBorder = (newBorderVal) => {
		setAttributes({K2HeadingOneBorder:newBorderVal})
	}
	const onChangeK2HeadingOneBorderRadius = (newBorderRadius) => {
		setAttributes({K2HeadingOneBorderRadius: newBorderRadius})
	}
	const onSelectK2HeadingOneColoractiveTab = ( tabName ) => {
		console.log( 'Selecting tab', tabName );
		setAttributes({ K2HeadingOneColoractiveTab: tabName });
	};
	const onChangeK2HeadingoneGradient = ( newVal) =>{
		setAttributes({K2HeadingoneGradient:newVal})
	}

	const headingoneStyle = useMemo(
		() => ({
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
		}),
		[
			K2HeadingoneColor,
			K2HeadingoneSize ,
			K2headingoneFontFam,
			K2headingoneFontWeight,
			K2HeadingBgColor,
			K2HeadingOnePadding,
			K2HeadingOneMargin,
			K2HeadingOneBorder,
			K2HeadingOneBorderRadius
		]
	);
   
  
	const headingoneGradStyle = useMemo(
		() => ({
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
		}),
		[
			K2HeadingoneGradient,
			K2HeadingoneSize ,
			K2headingoneFontFam,
			K2headingoneFontWeight,
			K2HeadingBgColor,
			K2HeadingOnePadding,
			K2HeadingOneMargin,
			K2HeadingOneBorder,
			K2HeadingOneBorderRadius
		]
	);

	const headingoneBubbleStyle = useMemo(
		() => ({
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
		}),
		[
			K2HeadingBgColor,
			K2HeadingoneSize ,
			K2headingoneFontFam,
			K2headingoneFontWeight,
			K2HeadingBgColor,
			K2HeadingOnePadding,
			K2HeadingOneMargin,
			K2HeadingOneBorder,
			K2HeadingOneBorderRadius
		]
	);
 
	const onChangeK2HeadingoneColor = (newColor) => {
		setAttributes({K2HeadingoneColor:newColor})
	}
	const onChangeK2HeadingoneSize = (newSize) => {
		setAttributes({K2HeadingoneSize:newSize})
	}

	const onChangeK2enableHeadingtwo = (NewVal) => {
		setAttributes({K2enableHeadingtwo:NewVal})
	}
	const onChangeK2HeadingtwoColor = (newColor) => {
		setAttributes({K2HeadingtwoColor:newColor})
	}
	const onChangeK2HeadingtwoSize = (newSize) => {
		setAttributes({K2HeadingtwoSize:newSize})
	}
	const headingStyle = useMemo(
		() => ({
			textAlign:K2headingAlignment
		}),
		[K2headingAlignment]
	);
  
	const onChangeK2headingtwoFontFam = (newVal) => {
		setAttributes({K2headingtwoFontFam:newVal})
	}
	const onChangeK2headingtwoFontWeight = (NewWeight) => {
		setAttributes({K2headingtwoFontWeight:NewWeight})
	}
	 const onChangeK2HeadingtwoBgColor = (newColor) => {
		setAttributes({K2HeadingtwoBgColor:newColor})
	}
	const onChangeK2HeadingtwoPadding = (newPadding) => {
		setAttributes({K2HeadingtwoPadding:newPadding})
	}
	const onChangeK2HeadingtwoMargin = (newMargin) =>{
		setAttributes({K2HeadingtwoMargin:newMargin})
	}
	const onChangeK2HeadingtwoBorder = (newBorderVal) => {
		setAttributes({K2HeadingtwoBorder:newBorderVal})
	}
	const onChangeK2HeadingtwoBorderRadius = (newBorderRadius) => {
		setAttributes({K2HeadingtwoBorderRadius: newBorderRadius})
	}
	const onSelectK2HeadingtwoColoractiveTab = ( tabName ) => {
		console.log( 'Selecting tab', tabName );
		setAttributes({ K2HeadingtwoColoractiveTab: tabName });
	};
	const onChangeK2HeadingtwoGradient = ( newVal) =>{
		setAttributes({K2HeadingtwoGradient:newVal})
	}
	const headingtwoStyle = useMemo(
		() => ({
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
		}),
		[
			K2HeadingtwoColor,
			K2HeadingtwoBgColor,
			K2HeadingtwoSize ,
			K2headingtwoFontFam,
			K2headingtwoFontWeight,
			K2HeadingtwoPadding,
			K2HeadingtwoMargin,
			K2HeadingtwoBorder,
			K2HeadingtwoBorderRadius
		]
	);
   
	const headingtwoGradStyle = useMemo(
		() => ({
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
		}),
		[
			K2HeadingtwoGradient,
			K2HeadingtwoBgColor,
			K2HeadingtwoSize ,
			K2headingtwoFontFam,
			K2headingtwoFontWeight,
			K2HeadingtwoPadding,
			K2HeadingtwoMargin,
			K2HeadingtwoBorder,
			K2HeadingtwoBorderRadius
		]
	);
 
	const headingtwoBubbleStyle = useMemo(
		() => ({
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
		}),
		[
			K2HeadingtwoBgColor,
			K2HeadingtwoSize ,
			K2headingtwoFontFam,
			K2headingtwoFontWeight,
			K2HeadingtwoPadding,
			K2HeadingtwoMargin,
			K2HeadingtwoBorder,
			K2HeadingtwoBorderRadius
		]
	);
   
	const onChangeK2HeadingthreeColor = (newColor) => {
		setAttributes({K2HeadingthreeColor:newColor})
	}
	const onChangeK2HeadingthreeSize = (newSize) => {
		setAttributes({K2HeadingthreeSize:newSize})
	}
	const onChangeK2headingthreeFontFam = (newVal) => {
		setAttributes({K2headingthreeFontFam:newVal})
	}
	const onChangeK2headingthreeFontWeight = (NewWeight) => {
		setAttributes({K2headingthreeFontWeight:NewWeight})
	}
	const onChangeK2HeadingthreeBgColor= (newColor) => {
		setAttributes({K2HeadingthreeBgColor:newColor})
	}
	const onChangeK2HeadingthreePadding= (newPadding) => {
		setAttributes({K2HeadingthreePadding:newPadding})
	}
	const onChangeK2HeadingthreeMargin = (newMargin) =>{
		setAttributes({K2HeadingthreeMargin:newMargin})
	}
	const onChangeK2HeadingthreeBorder = (newBorderVal) => {
		setAttributes({K2HeadingthreeBorder:newBorderVal})
	}
	const onChangeK2HeadingthreeBorderRadius = (newBorderRadius) => {
		setAttributes({K2HeadingthreeBorderRadius: newBorderRadius})
	}
	const onSelectK2HeadingthreeColoractiveTab = ( tabName ) => {
		console.log( 'Selecting tab', tabName );
		setAttributes({ K2HeadingthreeColoractiveTab: tabName });
	};
	const onChangeK2HeadingthreeGradient = ( newVal) =>{
		setAttributes({K2HeadingthreeGradient:newVal})
	}
	const headingthreeStyle = useMemo(
		() => ({
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
		}),
		[
			K2HeadingthreeColor,
			K2HeadingthreeSize,
			K2HeadingthreeBgColor,
			K2headingthreeFontFam ,
			K2headingthreeFontWeight,
			K2HeadingthreePadding,
			K2HeadingthreeMargin,
			K2HeadingthreeBorder,
			K2HeadingthreeBorderRadius
		]
	);
   
	const headingthreeGradStyle = useMemo(
		() => ({
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
		}),
		[
			K2HeadingthreeGradient,
			K2HeadingthreeSize,
			K2headingthreeFontFam ,
			K2headingthreeFontWeight,
			K2HeadingthreePadding,
			K2HeadingthreeMargin,
			K2HeadingthreeBorder,
			K2HeadingthreeBorderRadius
		]
	);
   
	const headingthreeBubbleStyle = useMemo(
		() => ({
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
		}),
		[
			K2HeadingthreeBgColor,
			K2HeadingthreeSize,
			K2headingthreeFontFam ,
			K2headingthreeFontWeight,
			K2HeadingthreePadding,
			K2HeadingthreeMargin,
			K2HeadingthreeBorder,
			K2HeadingthreeBorderRadius
		]
	);
 
	const colorOptions = [
		{ name: 'blue', color: '#00f' },
		{ name: 'black', color: '#000' },
		{ name: 'Purple', color: '#2C2A4A' },
		{ name: 'Light Purple', color: '#4F518C' },
	]
   
	function onChangeAlignmentIconChange(value) {

		if (value.target.tagName === 'SPAN'){
			var ParentDiv = value.target.parentNode
			var MainDiv = ParentDiv.parentNode
			var Spans = MainDiv.getElementsByTagName('div');
			for (var i = 0; i < Spans.length; i++) {
				if (Spans[i].getElementsByTagName('span')[0].className.includes('k2-ib-active')){
					Spans[i].getElementsByTagName('span')[0].className = Spans[i].getElementsByTagName('span')[0].className.replace('k2-ib-active','')
				}
			}
			value.target.className = value.target.className + ' k2-ib-active'

		}

	}
	return (
		<div {...useBlockProps()}>
                <h1 className='K2-heading-container' style={headingStyle} >
                   <RichText
                            tagName='span'
                            value={K2Headingone}
                            onChange={onChangeK2Headingone}
                            className={`${K2HeadingOneColoractiveTab === 'TextGradient' && 'Text-gradient-class'} ${K2HeadingOneColoractiveTab === 'BubbleWrite' && 'bubble-text'}`}
                            style={{
                                ...(K2HeadingOneColoractiveTab === 'TextColor' && headingoneStyle),
                                ...(K2HeadingOneColoractiveTab === 'TextGradient' && headingoneGradStyle),
                                ...(K2HeadingOneColoractiveTab === 'BubbleWrite' && headingoneBubbleStyle)
                                }}
                            formattingControls={['bold', 'italic', 'strikethrough', 'link', 'unlink']}

                        />
                        {
                            startFromNewLineTwo ==true ?
                            <br/>
                            :null
                        }
                        {
                            K2enableHeadingtwo == true ?
                            <RichText
                                    tagName='span'
                                    value={K2Headingtwo}
                                    onChange={onChangeK2Headingtwo}
                                    className={`${K2HeadingtwoColoractiveTab === 'TextGradient' && 'Text-gradient-class'} ${K2HeadingtwoColoractiveTab === 'BubbleWrite' && 'bubble-text'}`}
                                    style={{
                                        ...(K2HeadingtwoColoractiveTab === 'TextColor' && headingtwoStyle),
                                        ...(K2HeadingtwoColoractiveTab === 'TextGradient' && headingtwoGradStyle),
                                        ...(K2HeadingtwoColoractiveTab === 'BubbleWrite' && headingtwoBubbleStyle)
                                        }}
                                    formattingControls={['bold', 'italic', 'strikethrough', 'link', 'unlink']}

                                />
                                :null
                    }

                    {
                            startFromNewLineThree ==true ?
                            <br/>
                            :null
                        }
                    {
                        enableHeadingthree == true ? 
                        <RichText
                            tagName='span'
                            value={K2Headingthree}
                            onChange={onChangeK2Headingthree}
                            className={`${K2HeadingthreeColoractiveTab === 'TextGradient' && 'Text-gradient-class'} ${K2HeadingthreeColoractiveTab === 'BubbleWrite' && 'bubble-text'}`}
                            style={{
                                ...(K2HeadingthreeColoractiveTab === 'TextColor' && headingthreeStyle),
                                ...(K2HeadingthreeColoractiveTab === 'TextGradient' && headingthreeGradStyle),
                                ...(K2HeadingthreeColoractiveTab === 'BubbleWrite' && headingthreeBubbleStyle)
                                }}
                            formattingControls={['bold', 'italic', 'strikethrough', 'link', 'unlink']}

                        />
                        :null
                    }
                </h1>
                <InspectorControls>
                    <PanelBody title={__("Heading Texts")} initialOpen={false} >
                        <Card>
                            <CardBody>
                                <PanelRow>
                                        <div style={{paddingBottom: '2%'}}>
                                            <label><strong>Heading Alignment</strong></label>
                                        </div>
                                        <div id = {'AlignmentIconsParent'} className={'k2-ib-inspector-control-alignment'} onClick={onChangeAlignmentIconChange}>
                                            <div className={'k2-ib-inspector-control-alignment-single'}  onClick={() => {setAttributes({K2headingAlignment:'left'})}}>
                                                <span className="fa fa-align-left k2-ib-alignment-icon-style" ></span>
                                            </div>
                                            <div className={'k2-ib-inspector-control-alignment-single'} onClick={() =>  {setAttributes({K2headingAlignment:'center'})}}>
                                                <span className="fa fa-align-center k2-ib-alignment-icon-style k2-ib-active"></span>
                                            </div>
                                            <div className={'k2-ib-inspector-control-alignment-single'} onClick={() =>  {setAttributes({K2headingAlignment:'right'})}}>
                                                <span className="fa fa-align-right k2-ib-alignment-icon-style"></span>
                                            </div>
                                        </div>
                                </PanelRow>
                            </CardBody>
                        </Card>
                        <Card>
                            <CardHeader>
                                Enter your First Text here
                            </CardHeader>
                            <CardBody>
                                <TextControl 
                                    value={K2Headingone}
                                    onChange = {onChangeK2Headingone}

                                />
                                <Flex>
                                    <BoxControl
                                        label="Padding"
                                        value={K2HeadingOnePadding}
                                        onChange={onChangeK2HeadingOnePadding}
                                    />
                                </Flex>
                                <Flex>
                                    <BoxControl
                                        label="Margin"
                                        value={K2HeadingOneMargin}
                                        onChange={onChangeK2HeadingOneMargin}
                                    />
                                </Flex>
                                <Flex>
                                    <BorderBoxControl 
                                            label="Borders"
                                            onChange={onChangeK2HeadingOneBorder}
                                            value={K2HeadingOneBorder}
                                            colors = {colorOptions}
                                            
                                        />
                                </Flex>
                                <Flex>
                                    <BoxControl 
                                            label="border radius"
                                            value={K2HeadingOneBorderRadius}
                                            onChange={onChangeK2HeadingOneBorderRadius}
                                        />
                                </Flex>
                            </CardBody>
                        </Card>
                        <Card>
                            <Flex>
                                <FlexItem>
                                    <CardHeader>
                                        Enable Second Heading
                                    </CardHeader>
                                </FlexItem>
                                <FlexItem>
                                    <ToggleControl 
                                        checked ={K2enableHeadingtwo}
                                        onChange={onChangeK2enableHeadingtwo}

                                    />
                                </FlexItem>
                            </Flex>
                            {
                                K2enableHeadingtwo == true ?
                                <Fragment>
                                    <CardHeader>
                                        Enter your Second Text Here
                                    </CardHeader>
                                    <CardBody>
                                        <TextControl 
                                            value={K2Headingtwo}
                                            onChange = {onChangeK2Headingtwo}

                                        />
                                        <Flex>
                                            <BoxControl
                                                label="Padding"
                                                value={K2HeadingtwoPadding}
                                                onChange={onChangeK2HeadingtwoPadding}
                                            />
                                        </Flex>
                                        <Flex>
                                            <BoxControl
                                                label="Margin"
                                                value={K2HeadingtwoMargin}
                                                onChange={onChangeK2HeadingtwoMargin}
                                            />
                                        </Flex>
                                        <Flex>
                                            <BorderBoxControl 
                                                    label="Borders"
                                                    onChange={onChangeK2HeadingtwoBorder}
                                                    value={K2HeadingtwoBorder}
                                                    colors = {colorOptions}
                                                    
                                                />
                                        </Flex>
                                        <Flex>
                                            <BoxControl 
                                                    label="border radius"
                                                    value={K2HeadingtwoBorderRadius}
                                                    onChange={onChangeK2HeadingtwoBorderRadius}
                                                />
                                        </Flex>
                                        <Flex>
                                            <FlexItem>
                                            <h5 style={{margin:"0"}}>Start the text on New Line ?</h5>
                                            </FlexItem>
                                            <FlexItem>
                                                <CheckboxControl
                                                    checked={startFromNewLineTwo}
                                                    onChange={onChangestartFromNewLineTwo}
                                                />
                                            </FlexItem>
                                        </Flex>

                                    </CardBody>
                                </Fragment>
                                :null
                            }
                        </Card>
                        <Card>
                            <Flex>
                                <FlexItem>
                                    <CardHeader>
                                        Enable third Heading
                                    </CardHeader>
                                </FlexItem>
                                <FlexItem>
                                    <ToggleControl 
                                        checked ={enableHeadingthree}
                                        onChange={onChangeenableHeadingthree}

                                    />
                                </FlexItem>
                            </Flex>
                            {
                                enableHeadingthree == true ? 
                                <Fragment>
                                    <CardHeader>Enter your Third Text Here</CardHeader>
                                    <CardBody>
                                        <TextControl 
                                            value={K2Headingthree}
                                            onChange = {onChangeK2Headingthree}

                                        />
                                        <Flex>
                                            <FlexItem>
                                            <h5 style={{margin:"0"}}>Start the text on New Line ?</h5>
                                            </FlexItem>
                                            <FlexItem>
                                                <CheckboxControl
                                                    checked={startFromNewLineThree}
                                                    onChange={onChangestartFromNewLineThree}
                                                />
                                            </FlexItem>
                                        </Flex>
                                        <Flex>
                                            <BoxControl
                                                label="Padding"
                                                value={K2HeadingthreePadding}
                                                onChange={onChangeK2HeadingthreePadding}
                                            />
                                        </Flex>
                                        <Flex>
                                            <BoxControl
                                                label="Margin"
                                                value={K2HeadingthreeMargin}
                                                onChange={onChangeK2HeadingthreeMargin}
                                            />
                                        </Flex>
                                        <Flex>
                                            <BorderBoxControl 
                                                    label="Borders"
                                                    onChange={onChangeK2HeadingthreeBorder}
                                                    value={K2HeadingthreeBorder}
                                                    colors = {colorOptions}
                                                    
                                                />
                                        </Flex>
                                        <Flex>
                                            <BoxControl 
                                                    label="border radius"
                                                    value={K2HeadingthreeBorderRadius}
                                                    onChange={onChangeK2HeadingthreeBorderRadius}
                                                />
                                        </Flex>
                                    </CardBody>
                                </Fragment>
                                :null
                            }
                            
                        </Card>
                    </PanelBody>
                    <PanelBody title={__("Heading Size")} initialOpen={false}>
                            <Card>
                                <CardHeader>Heading One Size</CardHeader>
                                <CardBody>
                                    <RangeControl 
                                        value={K2HeadingoneSize}
                                        onChange = {onChangeK2HeadingoneSize}

                                    />
                                <Flex>
                                    <FlexItem>
                                        <SelectControl
                                            label="Font Family"
                                            value={K2headingoneFontFam}
                                            options={ GLOBAL_FONTS }
                                            onChange={onChangeK2headingoneFontFam}

                                        />
                                    </FlexItem>
                                    <FlexItem>
                                        <SelectControl
                                            label="Font Weight"
                                            value={K2headingoneFontWeight}
                                            options={ GLOBAL_FONTS_WEIGHTS }
                                            onChange={onChangeK2headingoneFontWeight}

                                        />
                                    </FlexItem>
                                </Flex>
                                </CardBody>
                            </Card>
                            {
                                K2enableHeadingtwo == true ?
                            <Card>
                                <CardHeader>Heading two Size</CardHeader>
                                <CardBody>
                                    <RangeControl 
                                        value={K2HeadingtwoSize}
                                        onChange = {onChangeK2HeadingtwoSize}

                                    />
                                    <Flex>
                                        <FlexItem>
                                            <SelectControl
                                                label="Font Family"
                                                value={K2headingtwoFontFam}
                                                options={ GLOBAL_FONTS }
                                                onChange={onChangeK2headingtwoFontFam}

                                            />
                                        </FlexItem>
                                        <FlexItem>
                                            <SelectControl
                                                label="Font Weight"
                                                value={K2headingtwoFontWeight}
                                                options={ GLOBAL_FONTS_WEIGHTS }
                                                onChange={onChangeK2headingtwoFontWeight}

                                            />
                                        </FlexItem>
                                    </Flex>
                                </CardBody>
                            </Card>
                            :null 
                            }
                            {
                                enableHeadingthree == true ? 
                                <Card>
                                    <CardHeader>Heading three Size</CardHeader>
                                    <CardBody>
                                        <RangeControl 
                                            value={K2HeadingthreeSize}
                                            onChange = {onChangeK2HeadingthreeSize}

                                        />
                                         <Flex>
                                            <FlexItem>
                                                <SelectControl
                                                    label="Font Family"
                                                    value={K2headingthreeFontFam}
                                                    options={ GLOBAL_FONTS }
                                                    onChange={onChangeK2headingthreeFontFam}

                                                />
                                            </FlexItem>
                                            <FlexItem>
                                                <SelectControl
                                                    label="Font Weight"
                                                    value={K2headingthreeFontWeight}
                                                    options={ GLOBAL_FONTS_WEIGHTS }
                                                    onChange={onChangeK2headingthreeFontWeight}

                                                />
                                            </FlexItem>
                                        </Flex>
                                    </CardBody>
                                </Card>
                                :null
                            }
                            
                    </PanelBody>
                    <PanelBody title={__("Heading Color")} initialOpen={true}>
                        <Card>
                            <CardHeader>
                                Heading One Color
                            </CardHeader>
                            <TabPanel
                                    className="premium-imamge-Background-Setting-tab-panel"
                                    activeClass="active-tab"
                                    onSelect={onSelectK2HeadingOneColoractiveTab}
                                    initialTabName={K2HeadingOneColoractiveTab}
                                    tabs={ [
                                        {
                                            name: 'TextColor',
                                            title: 'Color',
                                            className: 'tab-one',
                                        },
                                        {
                                            name: 'TextGradient',
                                            title: 'Gradient',
                                            className: 'tab-two',
                                        },
                                        {
                                            name: 'BubbleWrite',
                                            title: 'Bubble',
                                            className: 'tab-three',
                                        },
                                    ] }                 
                                
                                >
                                {(tabName) => 
                                        <Card style={{padding:"12px"}}>
                                        
                                                { tabName.name == 'TextColor' && (
                                                    <CardBody>
                                                        <ColorPopup 
                                                            label={"Text color"}
                                                            value={{ value:K2HeadingoneColor}}
                                                            onChange = {onChangeK2HeadingoneColor}
                                                            PropertyName={"backgroundColor"}
                                                        />
                                                            <ColorPopup 
                                                                label={"Background color"}
                                                                value={{ value:K2HeadingBgColor}}
                                                                onChange = {onChangeK2HeadingBgColor}
                                                                PropertyName={"backgroundColor"}
                                                        />
                                                    </CardBody>
                                                )}
                                                { tabName.name === 'TextGradient' &&( 
                                                    <Fragment>
                                                        <GradientPicker 
                                                            value = {K2HeadingoneGradient}
                                                            onChange={onChangeK2HeadingoneGradient}
                                                            gradients={ [
                                                                {
                                                                    name: 'JShine',
                                                                    gradient:
                                                                        'linear-gradient(135deg,#12c2e9 0%,#c471ed 50%,#f64f59 100%)',
                                                                    slug: 'jshine',
                                                                },
                                                                {
                                                                    name: 'Moonlit Asteroid',
                                                                    gradient:
                                                                        'linear-gradient(135deg,#0F2027 0%, #203A43 0%, #2c5364 100%)',
                                                                    slug: 'moonlit-asteroid',
                                                                },
                                                                {
                                                                    name: 'Rastafarie',
                                                                    gradient:
                                                                        'linear-gradient(135deg,#1E9600 0%, #FFF200 0%, #FF0000 100%)',
                                                                    slug: 'rastafari',
                                                                },
                                                                {
                                                                    name: 'K2-Gradient',
                                                                    gradient:
                                                                        'linear-gradient(45deg, rgb(15, 32, 39) 0%, rgb(29, 146, 221) 0%, rgb(123, 220, 181) 100%)',
                                                                    slug: 'k2gradient',
                                                                },
                                                            ] }
                                                        />
                                                    </Fragment>
                                                )}
                                                { tabName.name === 'BubbleWrite' &&( 
                                                    <Fragment>
                                                            <ColorPopup 
                                                                label={"Background color"}
                                                                value={{ value:K2HeadingBgColor}}
                                                                onChange = {onChangeK2HeadingBgColor}
                                                                PropertyName={"backgroundColor"}
                                                        />
                                                    </Fragment>
                                                )}
                                        
                                        </Card>
                                    }
                            </TabPanel>
                        </Card>
                        {
                            K2enableHeadingtwo == true ?
                                <Card>
                                    <CardHeader>
                                        Heading two Color
                                    </CardHeader>
                                    <TabPanel
                                            className="premium-imamge-Background-Setting-tab-panel"
                                            activeClass="active-tab"
                                            onSelect={onSelectK2HeadingtwoColoractiveTab}
                                            initialTabName={K2HeadingtwoColoractiveTab}
                                            tabs={ [
                                                {
                                                    name: 'TextColor',
                                                    title: 'Color',
                                                    className: 'tab-one',
                                                },
                                                {
                                                    name: 'TextGradient',
                                                    title: 'Gradient',
                                                    className: 'tab-two',
                                                },
                                                {
                                                    name: 'BubbleWrite',
                                                    title: 'Bubble',
                                                    className: 'tab-three',
                                                },
                                            ] }                 
                                        
                                        >
                                        {(tabName) => 
                                                <Card style={{padding:"12px"}}>
                                                
                                                        { tabName.name == 'TextColor' && ( 
                                                            <CardBody>
                                                                <ColorPopup
                                                                    label={"Text color"}
                                                                    value={{ value:K2HeadingtwoColor}}
                                                                    onChange = {onChangeK2HeadingtwoColor}
                                                                    PropertyName={"backgroundColor"}
                                                                />
                                                                <ColorPopup
                                                                    label={"Text color"}
                                                                    value={{ value:K2HeadingtwoBgColor}}
                                                                    onChange = {onChangeK2HeadingtwoBgColor}
                                                                    PropertyName={"backgroundColor"}
                                                                />

                                                            </CardBody>
                                                        )}
                                                        { tabName.name === 'TextGradient' && (
                                                            <Fragment>
                                                                <GradientPicker 
                                                                    value = {K2HeadingtwoGradient}
                                                                    onChange={onChangeK2HeadingtwoGradient}
                                                                    gradients={ [
                                                                        {
                                                                            name: 'JShine',
                                                                            gradient:
                                                                                'linear-gradient(135deg,#12c2e9 0%,#c471ed 50%,#f64f59 100%)',
                                                                            slug: 'jshine',
                                                                        },
                                                                        {
                                                                            name: 'Moonlit Asteroid',
                                                                            gradient:
                                                                                'linear-gradient(135deg,#0F2027 0%, #203A43 0%, #2c5364 100%)',
                                                                            slug: 'moonlit-asteroid',
                                                                        },
                                                                        {
                                                                            name: 'Rastafarie',
                                                                            gradient:
                                                                                'linear-gradient(135deg,#1E9600 0%, #FFF200 0%, #FF0000 100%)',
                                                                            slug: 'rastafari',
                                                                        },
                                                                        {
                                                                            name: 'K2-Gradient',
                                                                            gradient:
                                                                                'linear-gradient(45deg, rgb(15, 32, 39) 0%, rgb(29, 146, 221) 0%, rgb(123, 220, 181) 100%)',
                                                                            slug: 'k2gradient',
                                                                        },
                                                                    ] }
                                                                />
                                                            </Fragment>
                                                        )}
                                                        { tabName.name === 'BubbleWrite' &&( 
                                                            <ColorPopup
                                                                label={"Background color"}
                                                                value={{ value:K2HeadingtwoBgColor}}
                                                                onChange = {onChangeK2HeadingtwoBgColor}
                                                                PropertyName={"backgroundColor"}
                                                            />
                                                            
                                                        )}

                                                
                                                </Card>
                                            }
                                    </TabPanel>
                                </Card>
                                :null
                        }
                        {
                            enableHeadingthree == true ? 
                            <Card>
                                <CardHeader>
                                    Heading three Color
                                </CardHeader>
                                <TabPanel
                                        className="premium-imamge-Background-Setting-tab-panel"
                                        activeClass="active-tab"
                                        onSelect={onSelectK2HeadingthreeColoractiveTab}
                                        initialTabName={K2HeadingthreeColoractiveTab}
                                        tabs={ [
                                            {
                                                name: 'TextColor',
                                                title: 'Color',
                                                className: 'tab-one',
                                            },
                                            {
                                                name: 'TextGradient',
                                                title: 'Gradient',
                                                className: 'tab-two',
                                            },
                                            {
                                                name: 'BubbleWrite',
                                                title: 'Bubble',
                                                className: 'tab-three',
                                            },
                                        ] }                 
                                    
                                    >
                                    {(tabName) => 
                                            <Card style={{padding:"12px"}}>
                                            
                                                { tabName.name == 'TextColor' && ( 
                                                        <CardBody>
                                                            <ColorPopup
                                                                label={"Tesxt color"}
                                                                value={{ value:K2HeadingthreeColor}}
                                                                onChange = {onChangeK2HeadingthreeColor}
                                                                PropertyName={"backgroundColor"}
                                                            />
                                                            <ColorPopup
                                                                label={"Background color"}
                                                                value={{ value:K2HeadingthreeBgColor}}
                                                                onChange = {onChangeK2HeadingthreeBgColor}
                                                                PropertyName={"backgroundColor"}
                                                            />
                                                        </CardBody>
                                                )}
                                                { tabName.name === 'TextGradient' && (
                                                        <Fragment>
                                                        <GradientPicker 
                                                                value = {K2HeadingthreeGradient}
                                                                onChange={onChangeK2HeadingthreeGradient}
                                                                gradients={ [
                                                                    {
                                                                        name: 'JShine',
                                                                        gradient:
                                                                            'linear-gradient(135deg,#12c2e9 0%,#c471ed 50%,#f64f59 100%)',
                                                                        slug: 'jshine',
                                                                    },
                                                                    {
                                                                        name: 'Moonlit Asteroid',
                                                                        gradient:
                                                                            'linear-gradient(135deg,#0F2027 0%, #203A43 0%, #2c5364 100%)',
                                                                        slug: 'moonlit-asteroid',
                                                                    },
                                                                    {
                                                                        name: 'Rastafarie',
                                                                        gradient:
                                                                            'linear-gradient(135deg,#1E9600 0%, #FFF200 0%, #FF0000 100%)',
                                                                        slug: 'rastafari',
                                                                    },
                                                                    {
                                                                        name: 'K2-Gradient',
                                                                        gradient:
                                                                            'linear-gradient(45deg, rgb(15, 32, 39) 0%, rgb(29, 146, 221) 0%, rgb(123, 220, 181) 100%)',
                                                                        slug: 'k2gradient',
                                                                    },
                                                                ] }
                                                            />
                                                        </Fragment>
                                                    )}
                                                    { tabName.name === 'BubbleWrite' &&( 
                                                        <ColorPopup
                                                                label={"Background color"}
                                                                value={{ value:K2HeadingthreeBgColor}}
                                                                onChange = {onChangeK2HeadingthreeBgColor}
                                                                PropertyName={"backgroundColor"}
                                                            />
                                                        
                                                    )}
                                            
                                            </Card>
                                        }
                                </TabPanel>
                            </Card>
                            :null
                        }
                        
                    </PanelBody>
                </InspectorControls>
			</div>
	);
}
