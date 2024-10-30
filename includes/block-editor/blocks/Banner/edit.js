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

	const BoxedContainer = useMemo(
		() => ({
			justifyContent: attributes.AnimatedBannerAllignment
		}),
		[
		  attributes.AnimatedBannerAllignment,
		]
	);

	const CoverParentContainer = useMemo(
		() => ({
			width: attributes.AnimatedBannerWidth + 'rem',
			height: attributes.AnimatedBannerHeight+ 'rem'
		}),
		[
		  attributes.AnimatedBannerWidth,
		  attributes.AnimatedBannerHeight
		]
	);
	const CoverTextContainer = useMemo(
		() => ({
			boxShadow: attributes.AnimatedBannerAnimationOverlayColor
		}),
		[
		  attributes.AnimatedBannerAnimationOverlayColor,
		]
	);
	const CoverParentImage = useMemo(
		() => ({
			backgroundImage: 'url("' +attributes.AnimatedBannerBackgroundImage + '")'
		}),
		[
		  attributes.AnimatedBannerBackgroundImage,
		]
	);

	const HeadingStyle = useMemo(
		() => ({
			fontSize: attributes.AnimatedBannerHeadingTextFontSize + "em",
			fontWeight: attributes.AnimatedBannerHeadingTextWeight,
			fontFamily: attributes.AnimatedBannerHeadingTextFontFamily
		}),
		[
		  attributes.AnimatedBannerHeadingTextFontSize,
		  attributes.AnimatedBannerHeadingTextWeight,
		  attributes.AnimatedBannerHeadingTextFontFamily
		]
	);
	
	const ParagraphStyle = useMemo(
		() => ({
			fontSize: attributes.AnimatedBannerParagraphTextFontSize + "em",
			fontWeight: attributes.AnimatedBannerParagraphTextWeight,
			fontFamily: attributes.AnimatedBannerParagraphTextFontFamily
		}),
		[
		  attributes.AnimatedBannerParagraphTextFontSize,
		  attributes.AnimatedBannerParagraphTextWeight,
		  attributes.AnimatedBannerParagraphTextFontFamily
		]
	);
	const AB_BG_IMAGE = useMemo(
		() => ({
			backgroundImage: 'url("' +attributes.AnimatedBannerBackgroundImage + '")'
		}),
		[
		  attributes.AnimatedBannerBackgroundImage,
		]
	);

	function onChangeAnimatedBannerWidth(NewWidth)  {
		setAttributes({
			AnimatedBannerWidth: NewWidth
		})
	}

	function onChangeAnimatedBannerHeight(NewHeight)  {
		setAttributes({
			AnimatedBannerHeight: NewHeight
		})
	}


	function onChangeAnimatedBannerAllignment(Newalignemnt)  {
		setAttributes({
			AnimatedBannerAllignment: Newalignemnt
		})
	}


	function onChangeAnimatedBannerBackgroundImage(NewImage)  {
		setAttributes({
			AnimatedBannerBackgroundImage: NewImage.url
		})
	}


	// Animated Banner Text Attributes
	function onChangeAnimatedBannerTextHorizontalAlignment(NewHAllignment)  {
		setAttributes({
			AnimatedBannerTextHorizontalAlignment: NewHAllignment
		})
	}


	function onChangeAnimatedBannerTextVerticalAlignment(NewVAllignment)  {
		setAttributes({
			AnimatedBannerTextVerticalAlignment: NewVAllignment
		})
	}


	function onChangeAnimatedBannerHeadingTextFontSize(NewFontSize)  {
		setAttributes({
			AnimatedBannerHeadingTextFontSize: NewFontSize
		})
	}


	function onChangeAnimatedBannerHeadingTextFontFamily(NewHeadingTextFont)  {
		setAttributes({
			AnimatedBannerHeadingTextFontFamily: NewHeadingTextFont
		})
	}


	function onChangeAnimatedBannerHeadingTextWeight(NewHeadingWeight)  {
		setAttributes({
			AnimatedBannerHeadingTextWeight: NewHeadingWeight
		})
	}


	function onChangeAnimatedBannerParagraphTextFontSize(NewFontSize)  {
		setAttributes({
			AnimatedBannerParagraphTextFontSize: NewFontSize
		})
	}


	function onChangeAnimatedBannerParagraphTextFontFamily(NewFontFamily)  {
		setAttributes({
			AnimatedBannerParagraphTextFontFamily: NewFontFamily
		})
	}


	function onChangeAnimatedBannerParagraphTextWeight(NewWeight)  {
		setAttributes({
			AnimatedBannerParagraphTextWeight: NewWeight
		})
	}


	// Animated Banner Animation Attributes

	function onChangeAnimatedBannerAnimationOverlayColor(NewOverlay)  {
		setAttributes({
			InspectorControlAnimatedBannerOverlayColor: NewOverlay,
			AnimatedBannerAnimationOverlayColor: 'inset 0 0 0 100vh '+ NewOverlay

		})
	}


	function onChangeAnimatedBannerAnimationStyle(NewStyle) {
		setAttributes({
			AnimatedBannerAnimationStyle: NewStyle
		})

		if (NewStyle === "Translate"){

		} else (NewStyle === "Sliding")
		{

		}
	}


	function onChangeAnimatedBannerAnimationOpacity(NewOpacity) {
		setAttributes({
			AnimatedBannerAnimationOpacity: NewOpacity
		})
	}



	function onChangeAnimatedBannerHeading(NewText) {
		setAttributes({
			AnimatedBannerHeadingText: NewText
		})
	}

	function onChangeAnimatedBannerParagraphText(NewText) {
		setAttributes({
			AnimatedBannerParagraphText: NewText
		})
	}


	function onChangeAlignmentIconChange(value) {

		if (value.target.tagName === 'SPAN'){
			var MainDiv = document.getElementById("k2-AB-inspector-control-classic-position");
			var Spans = MainDiv.getElementsByTagName('div');
			for (var i = 0; i < Spans.length; i++) {
				if (Spans[i].getElementsByTagName('span')[0].className.includes('k2-AB-active')){
					Spans[i].getElementsByTagName('span')[0].className = Spans[i].getElementsByTagName('span')[0].className.replace('k2-AB-active','')
				}
			}
			console.log(value.target.tagName)
			value.target.className = value.target.className + ' k2-AB-active '

		}

	}
	return (
		[

			<InspectorControls>

				<PanelBody>

					{/*<SelectControl*/}
					{/*	label="Animation Style"*/}
					{/*	value={ attributes.AnimatedBannerAnimationStyle }*/}
					{/*	options={*/}
					{/*		[*/}
					{/*			{ label: 'Translate', value: 'Translate' },*/}
					{/*			{ label: 'Sliding', value: 'Sliding' }*/}
					{/*		]*/}
					{/*	}*/}
					{/*	onChange={ onChangeAnimatedBannerAnimationStyle}*/}
					{/*/>*/}

					<RangeControl
						label={<strong> Banner Width </strong>}
						value={ attributes.AnimatedBannerWidth }
						onChange={ onChangeAnimatedBannerWidth }
						min={ 0 }
						max={ 100 }
						step ={1}
					/>
					<RangeControl
						label={<strong> Banner Height </strong>}
						value={ attributes.AnimatedBannerHeight }
						onChange={ onChangeAnimatedBannerHeight }
						min={ 0 }
						max={ 100 }
						step ={1}
					/>

					<PanelRow>

						<div style={{paddingBottom: '2%'}}>
							<label><strong>Banner Alignment</strong></label>
						</div>
						<div id ="k2-AB-inspector-control-classic-position" className={'k2-AB-inspector-control-classic-position'} onClick={onChangeAlignmentIconChange}>

							<div className={'k2-AB-inspector-control-classic-position-single'}  onClick={() => onChangeAnimatedBannerAllignment('flex-start')}>
								<span className="fa fa-align-left k2-AB-alignment-icon" ></span>
							</div>
							<div className={'k2-AB-inspector-control-classic-position-single'} onClick={() => onChangeAnimatedBannerAllignment('center')}>
								<span className="fa fa-align-center k2-AB-alignment-icon k2-AB-active"></span>
							</div>
							<div className={'k2-AB-inspector-control-classic-position-single'} onClick={() => onChangeAnimatedBannerAllignment('flex-end')}>
								<span className="fa fa-align-right k2-AB-alignment-icon"></span>
							</div>
						</div>

				</PanelRow>

				</PanelBody>

				<PanelBody title={"Animation Overlay"}>
					<ColorPopup 
						label={"Fill Color"}
						value={{ value: attributes.AnimatedBannerAnimationOverlayColor}}
						onChange = {onChangeAnimatedBannerAnimationOverlayColor}
						PropertyName={"boxShadow"}
					/>

					{/*<RangeControl*/}
					{/*	label={<strong> Opacity </strong>}*/}
					{/*	value={ attributes.AnimatedBannerAnimationOpacity }*/}
					{/*	onChange={ onChangeAnimatedBannerAnimationOpacity }*/}
					{/*	min={ 0 }*/}
					{/*	max={ 1 }*/}
					{/*	step ={0.1}*/}
					{/*/>*/}

				</PanelBody>

				<PanelBody title={'Background Image'}>
					<MediaUpload
						onSelect = {onChangeAnimatedBannerBackgroundImage}
						type = {'images'}
						value = {attributes.AnimatedBannerBackgroundImage}
						render={ ({open}) => {
							return <div style={AB_BG_IMAGE} className={'k2-AB-image-select-control'}>
								<i className="fa fa-plus-circle" onClick={open}></i>
							</div>;
						}}
					>
					</MediaUpload>


				</PanelBody>



				<PanelBody title={"Heading Font Styles"}>

					<RangeControl
						label={<strong> Font Size </strong>}
						value={ attributes.AnimatedBannerHeadingTextFontSize }
						onChange={ onChangeAnimatedBannerHeadingTextFontSize }
						min={ 0 }
						max={ 10 }
						step ={0.1}
					/>

					<PanelRow>
						<SelectControl
							label="Font Family"
							value={ attributes.AnimatedBannerHeadingTextFontFamily }
							options={ GLOBAL_FONTS }
							onChange={ onChangeAnimatedBannerHeadingTextFontFamily}
						/>
					</PanelRow>

					<PanelRow>
						<SelectControl
							label="Weight"
							value={ attributes.AnimatedBannerHeadingTextWeight }
							options={ GLOBAL_FONTS_WEIGHTS }
							onChange={ onChangeAnimatedBannerHeadingTextWeight}
						/>
					</PanelRow>
				</PanelBody>



			<PanelBody title={"Paragraph Font Styles"}>

				<RangeControl
					label={<strong> Font Size </strong>}
					value={ attributes.AnimatedBannerParagraphTextFontSize }
					onChange={ onChangeAnimatedBannerParagraphTextFontSize }
					min={ 0 }
					max={ 15 }
					step ={0.1}
				/>

				<PanelRow>
					<SelectControl
						label="Font Family"
						value={ attributes.AnimatedBannerParagraphTextFontFamily }
						options={ GLOBAL_FONTS }
						onChange={ onChangeAnimatedBannerParagraphTextFontFamily}
					/>
				</PanelRow>

				<PanelRow>
					<SelectControl
						label="Weight"
						value={ attributes.AnimatedBannerParagraphTextWeight }
						options={ GLOBAL_FONTS_WEIGHTS }
						onChange={ onChangeAnimatedBannerParagraphTextWeight}
					/>
				</PanelRow>
			</PanelBody>

			</InspectorControls>,
			<div style={BoxedContainer} className={'k2-AB-boxed-container'}>
				<div style = {CoverParentContainer} className={'K2-AB-cover-parent-container-wrapper'}>
					<div style={CoverParentImage} className={'k2-AB-cover-parent-container'}>
						<div style={CoverTextContainer} className={'k2-AB-cover-text-container'}>
							<RichText
								tagName="div" // The tag here is the element output and editable in the admin
								value={ attributes.AnimatedBannerHeadingText } // Any existing content, either from the database or an attribute default
								style = {HeadingStyle}
								className={ 'k2-AB-cover-heading-style' }
								formattingControls={ ['bold', 'italic', 'link',] } // Allow the content to be made bold or italic, but do not allow other formatting options
								onChange={ onChangeAnimatedBannerHeading } // Store updated content as a block attribute
								placeholder={ __( 'Animated Banner' ) } // Display this text before any content has been added by the user
							/>

							<RichText
								tagName="div" // The tag here is the element output and editable in the admin
								value={ attributes.AnimatedBannerParagraphText } // Any existing content, either from the database or an attribute default
								style={ParagraphStyle}
								className = {'k2-AB-cover-paragraph-heading'}
								formattingControls={ [ 'bold', 'italic', 'link',] } // Allow the content to be made bold or italic, but do not allow other formatting options
								onChange={ onChangeAnimatedBannerParagraphText } // Store updated content as a block attribute
								placeholder={ __( 'Hover on this banner for animation' ) } // Display this text before any content has been added by the user
							/>
						</div>
					</div>
				</div>
			</div>
		]
	);
}
