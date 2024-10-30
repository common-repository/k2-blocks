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
export default function edit({attributes, setAttributes}) {

	const {
		k2BTtestimonials,
		k2BTauthorName,
		k2BTauthorImage,
		K2BTauthorImageWidth,
		AuthorImageAlignment,
		K2BTtextColor,
		k2BTtextfontSize,
		K2BTtextFontWeight,
		K2BTtextFontFamily,
		K2BTtextLineHeight,
		k2BTauthornameColor,
		k2BTauthorNameFontSize,
		k2BTauthorNameFontFamily,
		k2BTauthorNameFontWeight,
		K2BTtestimonialBackground,
		K2BTtestimonialBorder,
		K2BTtestimonialBorderRadius,
		K2BTquoteColor,
		K2BtquoteFontFam,
		K2BTtextFontAlignment,
		K2BTauthorNameAlignment,
		K2BTwidth,
		K2BTposition,
		K2BTBottomSpacing
	} = attributes;
	const onChangeK2BTwidth = (newVal) => {
		setAttributes({K2BTwidth:newVal});
	}
	const onChangeK2BTposition = (newPos) => {
		setAttributes({K2BTposition:newPos})
	}
	const BTPos = useMemo(
		() => ({
			display:"flex",
			justifyContent: K2BTposition
		}),
		[
			K2BTposition,
		]
	);
	const colorOptions = [
		{ name: 'blue', color: '#00f' },
		{ name: 'black', color: '#000' },
		{ name: 'Purple', color: '#2C2A4A' },
		{ name: 'Light Purple', color: '#4F518C' },
	]
	const onChangeK2BTBottomSpacing = (NewSpacing) => {
		setAttributes({K2BTBottomSpacing:NewSpacing});
	}
	const onChangeK2BTtextLineHeight = (newLine) => {
		setAttributes({K2BTtextLineHeight:newLine})
	}
	const textstyle = useMemo(
		() => ({
			color: K2BTtextColor,
			fontSize: k2BTtextfontSize+"rem",
			fontFamily: K2BTtextFontFamily,
			fontWeight: K2BTtextFontWeight,
			textAlign: K2BTtextFontAlignment,
			marginBottom: K2BTBottomSpacing+"px",
			lineHeight: K2BTtextLineHeight+'rem'
		}),
		[
			K2BTtextColor,
			k2BTtextfontSize,
			K2BTtextFontFamily,
			K2BTtextFontWeight,
			K2BTtextFontAlignment,
			K2BTBottomSpacing,
			K2BTtextLineHeight
		]
	);
   
	const onChangeK2BTtestimonialBorderRadius = (newBorderRadius) => {
		setAttributes({K2BTtestimonialBorderRadius:newBorderRadius})
		console.log(K2BTtestimonialBorderRadius);
	}
	const CardStyles = useMemo(
		() => ({
			background : K2BTtestimonialBackground,
			borderColor: K2BTtestimonialBorder.color,
			borderStyle: K2BTtestimonialBorder.style,
			borderWidth: K2BTtestimonialBorder.width,
			borderTopLeftRadius: K2BTtestimonialBorderRadius.top,
			borderTopRightRadius: K2BTtestimonialBorderRadius.right,
			borderBottomRightRadius: K2BTtestimonialBorderRadius.bottom,
			borderBottomLeftRadius: K2BTtestimonialBorderRadius.left,
			width: K2BTwidth+"%"
		}),
		[
			K2BTtestimonialBackground,
			K2BTtestimonialBorder.color,
			K2BTtestimonialBorder.style,
			K2BTtestimonialBorder.width,
			K2BTtestimonialBorderRadius.top,
			K2BTtestimonialBorderRadius.right,
			K2BTtestimonialBorderRadius.bottom,
			K2BTtestimonialBorderRadius.left,
			K2BTwidth
		]
	);
	const onChangeK2BTtextFontAlignment = (NewAllignment) => {
		setAttributes({
				K2BTtextFontAlignment: NewAllignment
			})
		
	}
	const onChangeK2BTauthorNameAlignment = (NewAllignment) => {
		setAttributes({
			K2BTauthorNameAlignment: NewAllignment
			})
		
	}

	const onChangek2BTtestimonials = (newText) => {
		setAttributes({k2BTtestimonials:newText})
	}
	const onChangek2BTauthorName = (newAuthor) => {
		setAttributes({k2BTauthorName:newAuthor})
	}
	const onChangek2BTauthorImage = (newImage) => {
		setAttributes({k2BTauthorImage:newImage.url})
	}
	const onChangeK2BTauthorImageWidth = (newWidth) => {
		setAttributes({K2BTauthorImageWidth:newWidth})
	}
	const onChangeAuthorImageAlignment = (NewAllignment) => {
		setAttributes({
				AuthorImageAlignment: NewAllignment
			})
		
	}
	const AuthorimageAlignment = useMemo(
		() => ({
			justifyContent: AuthorImageAlignment
		}),
		[
			AuthorImageAlignment,
		]
	);
	const authorImageStyle = useMemo(
		() => ({
			width: K2BTauthorImageWidth+"px",
		}),
		[
			K2BTauthorImageWidth,
		]
	);
	const onChangeK2BTtextColor = (newColor) => {
		setAttributes({K2BTtextColor:newColor})
	}
	const onChangek2BTtextfontSize = (newSize) => {
		setAttributes({k2BTtextfontSize: newSize})
	}
	const onChangeK2BTtextFontFamily = (newFam) => {
		setAttributes({K2BTtextFontFamily:newFam})
	}
	const onChangeK2BTtextFontWeight = (Nweight) => {
		setAttributes({K2BTtextFontWeight:Nweight})
	}
	const onChangek2BTauthornameColor =(newColor) => {
		setAttributes({k2BTauthornameColor:newColor})
	}
	const onChangek2BTauthorNameFontSize = (newSize) => {
		setAttributes({k2BTauthorNameFontSize: newSize})
	}
	const onChangek2BTauthorNameFontFamily = (AuthorFam) => {
		setAttributes({k2BTauthorNameFontFamily:AuthorFam})
	}
	const onChangek2BTauthorNameFontWeight = (authorWeight) => {
		setAttributes({k2BTauthorNameFontWeight:authorWeight})
	}
	const authorNameStyle = useMemo(
		() => ({
			color:k2BTauthornameColor,
			fontSize: k2BTauthorNameFontSize+"rem",
			fontFamily: k2BTauthorNameFontFamily,
			fontWeight: k2BTauthorNameFontWeight,
			textAlign:K2BTauthorNameAlignment
		}),
		[
			k2BTauthornameColor,
			k2BTauthorNameFontSize,
			k2BTauthorNameFontFamily,
			k2BTauthorNameFontWeight,
			K2BTauthorNameAlignment
		]
	);
	const onChangeK2BTtestimonialBackground = (bgColor) => {
		setAttributes({K2BTtestimonialBackground:bgColor})
	}
	const onChangeK2BTtestimonialBorder = (newValue) => {
		setAttributes({K2BTtestimonialBorder:newValue})
	}
  
	const onChangeK2BTquoteColor = (newQcolor) => {
		setAttributes({K2BTquoteColor: newQcolor})
	}

	const onChangeK2BtquoteFontFam = (newFam) => {
		setAttributes({K2BtquoteFontFam:newFam})
	}
	const QuoteStyle = useMemo(
		() => ({
			color: K2BTquoteColor,
			fontFamily: K2BtquoteFontFam,
		}),
		[
			K2BTquoteColor,
			K2BtquoteFontFam
		]
	);
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
		<div {...useBlockProps()} style={BTPos}>
			<div className='k2-bt-parent-container' style={CardStyles}>
				<div className='k2-bt-top-section' style={AuthorimageAlignment}>
					<div className='k2-bt-image-container'>
						<img src={k2BTauthorImage} className="k2-bt-author-image" style={authorImageStyle} />
						<div className="k2-bt-quotation-mark-container" style={QuoteStyle} >“</div>
						
					</div>
					
				</div>
				<div className='k2-bt-testimonial-section'>
					<RichText
						tagName='p'
						value={k2BTtestimonials}
						onChange={onChangek2BTtestimonials}
						style={textstyle}

					/>
				</div>
				<hr/>
				<div className='k2-bt-authorName'>
					<RichText
						tagName='p'
						value={k2BTauthorName}
						onChange={onChangek2BTauthorName}
						style={authorNameStyle}
					/>
				</div>
			</div>
			<InspectorControls>
				<PanelBody title={__("Testimonial Settings")} initialOpen={false}>
						<Card>
							<CardBody>
							<RangeControl
									label="width"
									value={K2BTwidth}
									onChange={onChangeK2BTwidth}
								/>
								<PanelRow>

									<div style={{paddingBottom: '2%'}}>
										<label><strong>Widget Alignment</strong></label>
									</div>
									<div id = {'AlignmentIconsParent'} className={'k2-ib-inspector-control-alignment'} onClick={onChangeAlignmentIconChange}>

										<div className={'k2-ib-inspector-control-alignment-single'}  onClick={() => onChangeK2BTposition('flex-start')}>
											<span className="fa fa-align-left k2-ib-alignment-icon-style" ></span>
										</div>
										<div className={'k2-ib-inspector-control-alignment-single'} onClick={() => onChangeK2BTposition('center')}>
											<span className="fa fa-align-center k2-ib-alignment-icon-style k2-ib-active"></span>
										</div>
										<div className={'k2-ib-inspector-control-alignment-single'} onClick={() => onChangeK2BTposition('flex-end')}>
											<span className="fa fa-align-right k2-ib-alignment-icon-style"></span>
										</div>
									</div>

								</PanelRow>
							</CardBody>
						</Card>
				</PanelBody>
				<PanelBody title={__("Image")}>
						<Card>
							<CardBody>
								<MediaUpload
									accept = "image/*"
									allowedTypes={ [ 'image' ] }
									value={k2BTauthorImage}
									onSelect={ onChangek2BTauthorImage }
									render={ ({open}) => {
										return <div style={{backgroundImage: 'url("' + k2BTauthorImage + '")'}} className={'k2-AB-image-select-control'}>
											{/* <FontAwesomeIcon className='K2-testimonial-imageUpload-icon-Block' icon={faPlusCircle} onClick={open}/> */}
											<i className="fa fa-plus-circle" onClick={open}></i>
										</div>;
									}}
								/>
							</CardBody>
						</Card>
						<Card>
							<CardBody>
								<RangeControl
									label="width"
									value={K2BTauthorImageWidth}
									onChange={onChangeK2BTauthorImageWidth}
								/>
								<PanelRow>

									<div style={{paddingBottom: '2%'}}>
										<label><strong>Alignment</strong></label>
									</div>
									<div id = {'AlignmentIconsParent'} className={'k2-ib-inspector-control-alignment'} onClick={onChangeAlignmentIconChange}>

										<div className={'k2-ib-inspector-control-alignment-single'}  onClick={() => onChangeAuthorImageAlignment('flex-start')}>
											<span className="fa fa-align-left k2-ib-alignment-icon-style" ></span>
										</div>
										<div className={'k2-ib-inspector-control-alignment-single'} onClick={() => onChangeAuthorImageAlignment('center')}>
											<span className="fa fa-align-center k2-ib-alignment-icon-style k2-ib-active"></span>
										</div>
										<div className={'k2-ib-inspector-control-alignment-single'} onClick={() => onChangeAuthorImageAlignment('flex-end')}>
											<span className="fa fa-align-right k2-ib-alignment-icon-style"></span>
										</div>
									</div>

								</PanelRow>
							</CardBody>
						</Card>
				</PanelBody>
				<PanelBody title={__("Quote")}>
						<Card>
							<CardBody>
								<ColorPopup 
									label={"Color"}
									value={{ value: K2BTquoteColor}}
									onChange = {onChangeK2BTquoteColor}
									PropertyName={"backgroundColor"}
								/>
								<SelectControl
									label="Font Family"
									value={  K2BtquoteFontFam }
									options={ GLOBAL_FONTS }
									onChange={ onChangeK2BtquoteFontFam}
								/>
							</CardBody>
						</Card>
				</PanelBody>
				<PanelBody title={__("Text")} initialOpen={false}>
					<CardHeader>Content</CardHeader>
						<Card>
							<CardBody>
								<ColorPopup 
									label={"Text Color"}
									value={{ value: K2BTtextColor}}
									onChange = {onChangeK2BTtextColor}
									PropertyName={"backgroundColor"}
								/>
								<RangeControl
									label="Font Size"
									value={k2BTtextfontSize}
									onChange={onChangek2BTtextfontSize}
									step={0.1}
								/>
								<Flex>
									<FlexItem>
										<SelectControl
											label="Font Family"
											value={K2BTtextFontFamily}
											options={ GLOBAL_FONTS }
											onChange={onChangeK2BTtextFontFamily}

										/>
									</FlexItem>
									<FlexItem>
										<SelectControl
											label="Font Weight"
											value={K2BTtextFontWeight}
											options={ GLOBAL_FONTS_WEIGHTS }
											onChange={onChangeK2BTtextFontWeight}

										/>
									</FlexItem>
								</Flex>
								<RangeControl 
									label="Line Height"
									value={K2BTtextLineHeight}
									onChange={onChangeK2BTtextLineHeight}
									step={0.1}
								/>
								<PanelRow>

									<div style={{paddingBottom: '2%'}}>
										<label><strong>Text Alignment</strong></label>
									</div>
									<div id = {'AlignmentIconsParent'} className={'k2-ib-inspector-control-alignment'} onClick={onChangeAlignmentIconChange}>

										<div className={'k2-ib-inspector-control-alignment-single'}  onClick={() => onChangeK2BTtextFontAlignment('left')}>
											<span className="fa fa-align-left k2-ib-alignment-icon-style" ></span>
										</div>
										<div className={'k2-ib-inspector-control-alignment-single'} onClick={() => onChangeK2BTtextFontAlignment('center')}>
											<span className="fa fa-align-center k2-ib-alignment-icon-style k2-ib-active"></span>
										</div>
										<div className={'k2-ib-inspector-control-alignment-single'} onClick={() => onChangeK2BTtextFontAlignment('right')}>
											<span className="fa fa-align-right k2-ib-alignment-icon-style"></span>
										</div>
									</div>

								</PanelRow>
								<RangeControl
									label="Bottom Spacing"
									value={K2BTBottomSpacing}
									onChange={onChangeK2BTBottomSpacing}
									step={1}
								/>
							</CardBody>
						</Card>
						<CardHeader>Author Name</CardHeader>
						<Card>
							<CardBody>
								<ColorPopup 
									label={"Text Color"}
									value={{ value: k2BTauthornameColor}}
									onChange = {onChangek2BTauthornameColor}
									PropertyName={"backgroundColor"}
								/>
								<RangeControl
									label="Font Size"
									value={k2BTauthorNameFontSize}
									onChange={onChangek2BTauthorNameFontSize}
									step={0.1}
								/>
								<Flex>
									<FlexItem>
										<SelectControl
											label="Font Family"
											value={k2BTauthorNameFontFamily}
											options={ GLOBAL_FONTS }
											onChange={onChangek2BTauthorNameFontFamily}

										/>
									</FlexItem>
									<FlexItem>
										<SelectControl
											label="Font Weight"
											value={k2BTauthorNameFontWeight}
											options={ GLOBAL_FONTS_WEIGHTS }
											onChange={onChangek2BTauthorNameFontWeight}

										/>
									</FlexItem>
								</Flex>
								<PanelRow>

									<div style={{paddingBottom: '2%'}}>
										<label><strong>Text Alignment</strong></label>
									</div>
									<div id = {'AlignmentIconsParent'} className={'k2-ib-inspector-control-alignment'} onClick={onChangeAlignmentIconChange}>

										<div className={'k2-ib-inspector-control-alignment-single'}  onClick={() => onChangeK2BTauthorNameAlignment('left')}>
											<span className="fa fa-align-left k2-ib-alignment-icon-style" ></span>
										</div>
										<div className={'k2-ib-inspector-control-alignment-single'} onClick={() => onChangeK2BTauthorNameAlignment('center')}>
											<span className="fa fa-align-center k2-ib-alignment-icon-style k2-ib-active"></span>
										</div>
										<div className={'k2-ib-inspector-control-alignment-single'} onClick={() => onChangeK2BTauthorNameAlignment('right')}>
											<span className="fa fa-align-right k2-ib-alignment-icon-style"></span>
										</div>
									</div>

									</PanelRow>
							</CardBody>
						</Card>
				</PanelBody>
				<PanelBody title={__("Background")} initialOpen={false}>
						<Card>
							<CardBody>
								<ColorPopup 
									label={"Background Color"}
									value={{ value: K2BTtestimonialBackground}}
									onChange = {onChangeK2BTtestimonialBackground}
									PropertyName={"backgroundColor"}
								/>
								<BorderBoxControl
									label="Borders"
									onChange={onChangeK2BTtestimonialBorder}
									value={K2BTtestimonialBorder}
									colors = {colorOptions}

								/>

								<BoxControl
									label="Border radius"
									value={K2BTtestimonialBorderRadius}
									onChange={onChangeK2BTtestimonialBorderRadius}
								/>
							</CardBody>
						</Card>
				</PanelBody>
			</InspectorControls>
	</div>
	);
}
