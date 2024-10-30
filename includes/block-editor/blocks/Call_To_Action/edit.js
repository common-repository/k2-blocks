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
import { useMemo ,Fragment} from '@wordpress/element';

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
	CheckboxControl,
	ColorPicker,
	GradientPicker ,
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

	const FontWeightAvaibles= [
		{ label: 'normal'},
		{ label: '100'},
		{ label: '200'},
		{ label: '300'},
		{ label: '400'},
		{ label: '500'},
		{ label: '600'},
	]
	const colors = [
		{ name: 'red', color: '#f00' },
		{ name: 'white', color: '#fff' },
		{ name: 'blue', color: '#00f' },
	];
	const ToolBarColors = [
		{ color: '#32897A' },
		{  color: '#1995AD' },
		{  color: '#011A27' },
		{  color: '#F69454' },
	];
	const CTAIMAGE = {
		backgroundImage: 'url("' +attributes.CTA_Image + '")'
	}


	const BoxedContainerStyling = {
		justifyContent: attributes.CTAAlignment
	}

	const ClassicParentContainer = {
		flexDirection: attributes.CTAClassicPosition,
		minHeight: attributes.CTAClassicBoxHeight + 'rem',
		width: attributes.CTABoxWidth + 'rem'
	}

	const ClassicImageContainerStyling = {
		flexBasis: attributes.CTAClassicImageContainerWidth + '%',
		boxShadow: attributes.CallToActionOverlayColor,
		backgroundImage: 'url("' +attributes.CTA_Image + '")',
		minHeight: attributes.CTACoverContainerHeight + 'rem',
		borderTopLeftRadius: attributes.CTABoxBorderRadius.top,
		borderTopRightRadius: attributes.CTABoxBorderRadius.right,
		borderBottomRightRadius:attributes.CTABoxBorderRadius.bottom,
		borderBottomLeftRadius:attributes.CTABoxBorderRadius.left,
	}
	const ClassicBgGradientImageContainerStyling = {
		flexBasis: attributes.CTAClassicImageContainerWidth + '%',
		backgroundImage: attributes.K2CTApricingBgGradient+', url("' +attributes.CTA_Image + '")', 
		minHeight: attributes.CTACoverContainerHeight + 'rem',
		borderTopLeftRadius: attributes.CTABoxBorderRadius.top,
		borderTopRightRadius: attributes.CTABoxBorderRadius.right,
		borderBottomRightRadius:attributes.CTABoxBorderRadius.bottom,
		borderBottomLeftRadius:attributes.CTABoxBorderRadius.left,
	}
	const CoverParentStyling = {
		boxShadow: attributes.CallToActionOverlayColor,
		backgroundImage: 'url("' +attributes.CTA_Image + '")',
		minHeight: attributes.CTACoverContainerHeight + 'rem',
		width: attributes.CTABoxWidth + 'rem',
		borderTopLeftRadius: attributes.CTABoxBorderRadius.top,
		borderTopRightRadius: attributes.CTABoxBorderRadius.right,
		borderBottomRightRadius:attributes.CTABoxBorderRadius.bottom,
		borderBottomLeftRadius:attributes.CTABoxBorderRadius.left,

	}
	const CoverBGgradientParentStyling = {
		backgroundImage: attributes.K2CTApricingBgGradient+', url("' +attributes.CTA_Image + '")', 
		minHeight: attributes.CTACoverContainerHeight + 'rem',
		width: attributes.CTABoxWidth + 'rem',
		borderTopLeftRadius: attributes.CTABoxBorderRadius.top,
		borderTopRightRadius: attributes.CTABoxBorderRadius.right,
		borderBottomRightRadius:attributes.CTABoxBorderRadius.bottom,
		borderBottomLeftRadius:attributes.CTABoxBorderRadius.left,

	}

	const CTATextAlignment = {
		textAlign: attributes.CTAInnerContainerPlacement
	}

	const CTAHeadingStyling = {
		color: attributes.CTAHeadingColor,
		fontSize: attributes.CTAHeadingFontSize + 'em',
		fontFamily: attributes.CTAHeadingFontFamily,
		fontWeight: attributes.CTAHeadingFontWeight,
		fontStyle: attributes.CTAHeadingTextStyle,
		textDecoration: attributes.CTAHeadingTextDecoration
	}

	const CTAParagraphStyling = {
		color: attributes.CTAParagraphColor,
		fontSize: attributes.CTAParagraphyFontSize + 'em',
		fontFamily: attributes.CTAParagraphFontFamily,
		fontWeight: attributes.CTAParagraphFontWeight,
		fontStyle: attributes.CTAParagraphTextStyle,
		textDecoration: attributes.CTAParagraphTextDecoration
	}

	const CTAButtonStyling = {
		fontSize: attributes.CTAButtonFontSize + 'em',
		fontFamily: attributes.CTAButtonFontFamily,
		fontWeight: attributes.CTAButtonFontWeight,
		fontStyle: attributes.CTAButtonTextStyle,
		textDecoration: attributes.CTAButtonTextDecoration,
		borderColor: attributes.CTAButtonBorderColor,
		borderRadius: attributes.CTAButtonBorderRadius,
		borderStyle: attributes.CTAButtonBorderStyle,
		borderWidth: attributes.CTAButtonBorderWidth,
		backgroundColor: attributes.CTAButtonColor,
		color: attributes.CTAButtonTextColor
	}

	function onChangeisCTABGgradientEnable(newVal){
		setAttributes({
			isCTABGgradientEnable:newVal
		})
	}
	const onChangeK2CTApricingBgGradient = (val) => {
		setAttributes({K2CTApricingBgGradient:val})
	}
	function onChangeCTAButtonColor(Newcolor) {
		setAttributes({
			CTAButtonColor: Newcolor

		})
	}

	function onChangeCTAButtonTextColor(NewColor) {
		setAttributes({
			CTAButtonTextColor: NewColor

		})
	}

	function onChangeCTAInnerContainerPlacement(NewPlacement) {
		setAttributes({
			CTAInnerContainerPlacement: NewPlacement
		})
	}
	function onChangeCTAParagraph(NewText) {
		setAttributes({
			CTAParagraphText: NewText
		})
	}
	function onChangeCTAHeading(NewHeadingText) {
		setAttributes({
			CTAHeadingText: NewHeadingText
		})
	}

	function onChangeLayoutSelection(NewLayout) {
		setAttributes({
			LayoutDesign: NewLayout
		})

		if (NewLayout === 'Cover'){

		}else if (NewLayout === 'Classic'){
			setAttributes({
				CTAHeadingColor: 'rgba(14,18,85,1)',
				CTAParagraphColor: 'rgba(14,18,85,1)'

			})
		}
	}

	function onChangeCTAImageSelection(NewImage) {
		setAttributes({
			CTA_Image: NewImage.url
		})
	}

	function onChangeCTAButtonText(NewText) {
		setAttributes({
			CTAButtonText: NewText
		})
	}

	function onChangeCTAOverlayColor(NewColor) {
		setAttributes({
			CTAOverlayColorRed: NewColor['rgb'].r,

			CTAOverlayColorGreen: NewColor['rgb'].g,

			CTAOverlayColorBlue: NewColor['rgb'].b,

			CTAOverlayColorAlpha: NewColor['rgb'].a,



			InspectorControlCallToActionOverlayColor: 'rgba('+NewColor.rgb.r+','+NewColor.rgb.g+','+NewColor.rgb.b+','+NewColor.rgb.a+')',
			CallToActionOverlayColor: 'inset 0 0 0 100vh rgba(' +
				NewColor['rgb'].r + ',' +
				NewColor['rgb'].g + ',' +
				NewColor['rgb'].b + ',' +
				NewColor['rgb'].a + ')'

	})

	}

	function onChangeCTAOverlayEnableDisable(NewSetting) {
		setAttributes({
			CTAOverlayEnableDisable: NewSetting
		})
		if(NewSetting === true){
			setAttributes({
				CallToActionOverlayColor: 'inset 0 0 0 100vh ' + attributes.InspectorControlCallToActionOverlayColor
			})
		} else if(NewSetting === false) {
			setAttributes({
				CallToActionOverlayColor: ''
			})
		}
	}

	function onChangeCTAClassicPosition(NewPosition) {
		console.log(NewPosition)
		if (NewPosition === 'Right'){
			setAttributes({
				CTAClassicPosition: 'row-reverse',
			})
		} else 	if (NewPosition === 'Left'){
			setAttributes({
				CTAClassicPosition: 'row',
			})
		}

		setAttributes({

			InspectorControlClassicOptionDisplay: NewPosition,
			CTAClassicImageContainerWidth: 50
		})

	}



	function onChangeCTACoverContainerHeight(NewHeight) {
		setAttributes({
			CTACoverContainerHeight: NewHeight
		})
	}

	function onChnageCTAClassicBoxHeight(Newheight) {
		setAttributes({
			CTAClassicBoxHeight: Newheight
		})
	}
	function onChangeCTABoxBorderRadius(newRadius){
		setAttributes({
			CTABoxBorderRadius:newRadius
		})
	}
	function onChangeCTAAllignment(NewAlignment) {
		setAttributes({
			CTAAlignment: NewAlignment
		})
	}

	function onChangeCTABoxWidth(NewWidth) {
		setAttributes({
			CTABoxWidth: NewWidth
		})
	}

	function onChangeCTAisHeadingEnabled(NewValue) {
		setAttributes({
			CTAisHeadingEnabled: NewValue
		})
	}
	function onChangeCTAisParagraphyEnabled(NewValue) {
		setAttributes({
			CTAisParagraphyEnabled: NewValue
		})
	}
	function onChangeCTAisButtonEnabled(Newoption) {
		setAttributes({
			CTAisButtonEnabled: Newoption
		})
	}

	function onChangeCTAHeadingColor(NewColor) {
		setAttributes({
			CTAHeadingColor: NewColor

		})
	}
	function onChangeCTAParagraphColor(NewColor) {
		setAttributes({
			CTAParagraphColor:NewColor

		})
	}

	function onChageCTAHeadingFontSize(NewFontSize) {
		setAttributes({
			CTAHeadingFontSize: NewFontSize
		})
	}

	function onChangeCTAParagraphyFontSize(NewFontSize) {
		setAttributes({
			CTAParagraphyFontSize: NewFontSize
		})
	}

	function onChangeCTAButtonFontSize(NewfontSize) {
		setAttributes({
			CTAButtonFontSize: NewfontSize
		})
	}

	function onChangeCTAHeadingFontWeight(NewWeight) {
		setAttributes({
			CTAHeadingFontWeight: NewWeight
		})
	}

	function onChangeCTAHeadingFontStyle(NewStyle) {
		setAttributes({
			CTAHeadingTextStyle: NewStyle
		})
	}

	function onChangeCTAHeadingFontDecoration(NewDecoration) {
		setAttributes({
			CTAHeadingTextDecoration: NewDecoration
		})
	}


	function onChangeCTAParagraphFontWeight(NewWeight) {
		setAttributes({
			CTAParagraphFontWeight: NewWeight
		})
	}

	function onChangeCTAParagraphFontStyle(NewStyle) {
		setAttributes({
			CTAParagraphTextStyle: NewStyle
		})
	}

	function onChangeCTAParagraphFontDecoration(NewDecoration) {
		setAttributes({
			CTAParagraphTextDecoration: NewDecoration
		})
	}


	function onChangeCTAButtonFontWeight(NewWeight) {
		setAttributes({
			CTAButtonFontWeight: NewWeight
		})
	}

	function onChangeCTAButtonFontStyle(NewStyle) {
		setAttributes({
			CTAButtonTextStyle: NewStyle
		})
	}

	function onChangeCTAButtonFontDecoration(NewDecoration) {
		setAttributes({
			CTAButtonTextDecoration: NewDecoration
		})
	}

	function onChangeCTAHeadingFontFamily(NewFont) {
		setAttributes({
			CTAHeadingFontFamily: NewFont
		})
	}


	function onChangeCTAParagraphyontFamily(NewFont) {
		setAttributes({
			CTAParagraphFontFamily: NewFont
		})
	}


	function onChangeCTAButtonFontFamily(NewFont) {
		setAttributes({
			CTAButtonFontFamily: NewFont
		})
	}

	function onChangeCTABorderColor(NewColor) {
		setAttributes({
			CTAButtonBorderColor: NewColor

		})
	}


	function onChangeCTABorderWidth(NewWidth) {
		setAttributes({
			CTAButtonBorderWidth: NewWidth
		})
	}

	function onChangeCTABorderRadius(NewRadius) {
		setAttributes({
			CTAButtonBorderRadius: NewRadius
		})
	}

	function onChangeCTABorderStyle(NewStyle) {
		setAttributes({
			CTAButtonBorderStyle: NewStyle
		})
	}

	function onChangeCTAButtonLink(NewLink) {
		setAttributes({
			CTAButtonlink: NewLink
		})
	}

	function onChangeCTAButtonLinkNewTab(NewTab) {
		setAttributes({
			CTAButtonLinkOpenNewTab: NewTab
		})
	}

	function onChangeAlignmentIconChange(value) {

		if (value.target.tagName === 'SPAN'){
			var MainDiv = document.getElementById("k2-cta-inspector-control-cta-align");
			var Spans = MainDiv.getElementsByTagName('div');
			for (var i = 0; i < Spans.length; i++) {
				if (Spans[i].getElementsByTagName('span')[0].className.includes('k2-cta-active')){
					Spans[i].getElementsByTagName('span')[0].className = Spans[i].getElementsByTagName('span')[0].className.replace('k2-cta-active','')
				}
			}
			console.log(value.target.tagName)
			value.target.className = value.target.className + ' k2-cta-active'

		}

	}

	function onChangeTextAlignmentIconChange(value) {

		if (value.target.tagName === 'SPAN'){
			var MainDiv = document.getElementById("k2-cta-inspector-control-text-align");
			var Spans = MainDiv.getElementsByTagName('div');
			for (var i = 0; i < Spans.length; i++) {
				if (Spans[i].getElementsByTagName('span')[0].className.includes('k2-cta-active')){
					Spans[i].getElementsByTagName('span')[0].className = Spans[i].getElementsByTagName('span')[0].className.replace('k2-cta-active','')
				}
			}
			console.log(value.target.tagName)
			value.target.className = value.target.className + ' k2-cta-active'

		}

	}
	const onSelectTabChange = ( tabName ) => {
		console.log( 'Selecting tab', tabName );
	};
	return (
		[
			<InspectorControls>
				<PanelBody title={'Layout Settings'}>
					<Card>
						<CardHeader>Skin</CardHeader>
						<CardBody>
							<SelectControl
								value={ attributes.LayoutDesign }
								options={
									[
										{ label: 'Classic', value: 'Classic' },
										{ label: 'Cover', value: 'Cover' }
									]
								}
								onChange={ onChangeLayoutSelection}
							/>
						</CardBody>
					</Card>
					<Card>
						<CardBody>
							{
								(attributes.LayoutDesign == 'Classic')
									?
											<SelectControl
												label="Text Position"
												value={ attributes.InspectorControlClassicOptionDisplay }
												options={
													[
														{ label: 'Left', value: 'Left' },
														{ label: 'Right', value: 'Right' }
													]
												}
												onChange={ onChangeCTAClassicPosition}
											/>
									:
									null
							}
						</CardBody>
					</Card>
					<Card>
					<CardBody>
					<PanelRow>

						<div style={{paddingBottom: '2%'}}>
							<label><strong>Position</strong></label>
						</div>
						<div id = 'k2-cta-inspector-control-cta-align' className={'k2-cta-inspector-control-classic-position'} onClick={onChangeAlignmentIconChange}>

							<div className={'k2-cta-inspector-control-classic-position-single'}  onClick={() => onChangeCTAAllignment('flex-start')}>
								<span className="fa fa-align-left k2-cta-alignment-icon" ></span>
							</div>
							<div className={'k2-cta-inspector-control-classic-position-single'} onClick={() => onChangeCTAAllignment('center')}>
								<span className="fa fa-align-center k2-cta-alignment-icon k2-cta-active"></span>
							</div>
							<div className={'k2-cta-inspector-control-classic-position-single'} onClick={() => onChangeCTAAllignment('flex-end')}>
								<span className="fa fa-align-right k2-cta-alignment-icon"></span>
							</div>
						</div>

					</PanelRow>

					<PanelRow>

						<div style={{paddingBottom: '2%'}}>
							<label><strong>Text Align</strong></label>
						</div>
						<div id ="k2-cta-inspector-control-text-align" className={'k2-cta-inspector-control-classic-position'} onClick={onChangeTextAlignmentIconChange}>

							<div className={'k2-cta-inspector-control-classic-position-single'}  onClick={() => onChangeCTAInnerContainerPlacement('left')}>
								<span className="fa fa-align-left k2-cta-alignment-icon" ></span>
							</div>
							<div className={'k2-cta-inspector-control-classic-position-single'} onClick={() => onChangeCTAInnerContainerPlacement('center')}>
								<span className="fa fa-align-center k2-cta-alignment-icon k2-cta-active"></span>
							</div>
							<div className={'k2-cta-inspector-control-classic-position-single'} onClick={() => onChangeCTAInnerContainerPlacement('right')}>
								<span className="fa fa-align-right k2-cta-alignment-icon"></span>
							</div>
						</div>

					</PanelRow>
					</CardBody>
					</Card>

				</PanelBody>

				<PanelBody title={'Box'}>
				<Card>
					{
						(attributes.LayoutDesign == 'Classic')?
							<CardBody>


								<RangeControl
									label={<strong> Box Height </strong>}
									value={ attributes.CTAClassicBoxHeight }
									onChange={ onChnageCTAClassicBoxHeight }
									min={ 0 }
									max={ 100 }
									step ={1}
								/>
								<RangeControl
									label={<strong> Image Height </strong>}
									value={ attributes.CTACoverContainerHeight }
									onChange={ onChangeCTACoverContainerHeight }
									min={ 0 }
									max={ 100 }
									step ={1}
								/>
							</CardBody>

							:
							<CardBody>
								<RangeControl
									label={<strong> Box Height </strong>}
									value={ attributes.CTACoverContainerHeight }
									onChange={ onChangeCTACoverContainerHeight }
									min={ 0 }
									max={ 100 }
									step ={1}
								/>
							</CardBody>
					
					}
					
					<CardBody>
						<RangeControl
							label={<strong> Box Width </strong>}
							value={ attributes.CTABoxWidth }
							onChange={ onChangeCTABoxWidth }
							min={ 10 }
							max={ 100 }
							step ={1}
						/>
					</CardBody>
					<CardHeader>Border Radius</CardHeader>
					<CardBody>
							<BoxControl 
								value={attributes.CTABoxBorderRadius}
								onChange={onChangeCTABoxBorderRadius}
							/>
					</CardBody>
					</Card>
				</PanelBody>


				<PanelBody title={'Background Image'}>
					<Card>
						<CardBody>
							<MediaUpload
								onSelect = {onChangeCTAImageSelection}
								type = {'images'}
								value = {attributes.CTA_Image}
								render={ ({open}) => {
									return <div style={CTAIMAGE} className={'k2-cta-image-select-control'}>
											<i className="fa fa-plus-circle" onClick={open}></i>
									</div>;
								}}
								>
							</MediaUpload>
						</CardBody>
					</Card>
				</PanelBody>

				<PanelBody title={'Overlay'}>
						<Card>
							<CardBody>
								<PanelRow>
									<p>
										Overlay
									</p>
									<ToggleControl
										checked = {attributes.CTAOverlayEnableDisable}
										onChange = {onChangeCTAOverlayEnableDisable}
									/>

								</PanelRow>
								{
									(attributes.CTAOverlayEnableDisable === true)?
										<TabPanel
											className="Cta-Background-Setting-tab-panel"
											activeClass="active-tab"
											onSelect={onSelectTabChange}
											tabs={ [
												{
													name: 'BGColor',
													title: 'Color',
													className: 'tab-one',
												},
												{
													name: 'BGGradient',
													title: 'Gradient',
													className: 'tab-two',
												},
											] }                 
												
										>
											{(tab) => 
												<Card >
												
														{ tab.title == 'Color' ?
															
															<ColorPicker
																width={200}
       															height={200}
																value={ attributes.CallToActionOverlayColor }
																onChangeComplete={ onChangeCTAOverlayColor }
															/>
															: 
															<div>
																<ToggleControl 
																	label="Enable gradient"
																	checked ={attributes.isCTABGgradientEnable}
																	onChange={onChangeisCTABGgradientEnable}

																/>
																{
																	attributes.isCTABGgradientEnable == true ?
																		<GradientPicker 
																			value = {attributes.K2CTApricingBgGradient}
																			onChange={onChangeK2CTApricingBgGradient}
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
																		:null
																}
																
															</div>
														}
												
												</Card>
											}
										</TabPanel>
									:null
								}
							</CardBody>
						</Card>
						
				</PanelBody>
				<PanelBody title={'Heading'}>
					<Card>
						<CardBody>
							<PanelRow>
								<p>
									Heading
								</p>

								<ToggleControl
									checked = {attributes.CTAisHeadingEnabled}
									onChange = {onChangeCTAisHeadingEnabled}
								/>
							</PanelRow>
							{
								(attributes.CTAisHeadingEnabled === true)?<Fragment>

									<ColorPopup 
										label={"Color"}
										value={{ value:attributes.CTAHeadingColor}}
										onChange = {onChangeCTAHeadingColor}
										PropertyName={"backgroundColor"}
									/>

									<RangeControl
										label={<strong> Font Size </strong>}
										value={ attributes.CTAHeadingFontSize }
										onChange={ onChageCTAHeadingFontSize }
										min={ 0 }
										max={ 15 }
										step ={0.1}
									/>

									<PanelRow>
										<SelectControl
											label="Font Family"
											value={ attributes.CTAHeadingFontFamily }
											options={ GLOBAL_FONTS }
											onChange={ onChangeCTAHeadingFontFamily}
										/>

									</PanelRow>

									<PanelRow>
										<SelectControl
											label="Weight"
											value={ attributes.CTAHeadingFontWeight }
											options={ FontWeightAvaibles }
											onChange={ onChangeCTAHeadingFontWeight}
										/>
									</PanelRow>

									<SelectControl
										label="Style"
										value={ attributes.CTAHeadingTextStyle }
										options={
											[
												{ label: 'Normal', value: 'Normal' },
												{ label: 'oblique', value: 'oblique' },
												{ label: 'italic', value: 'italic' },
											]
										}
										onChange={ onChangeCTAHeadingFontStyle}
									/>

									<SelectControl
										label="Decoration"
										value={ attributes.CTAHeadingTextDecoration }
										options={
											[
												{ label: 'None', value: 'None' },
												{ label: 'underline', value: 'underline' },
												{ label: 'overline', value: 'overline' },
												{ label: 'line-through', value: 'line-through' },
											]
										}
										onChange={ onChangeCTAHeadingFontDecoration}
									/>

								</Fragment>:null
							}
						</CardBody>
					</Card>
				</PanelBody>
				<PanelBody title={'Paragraph'}>
					<Card>
						<CardBody>
							<PanelRow>
								<p>
									Paragraph
								</p>
								<ToggleControl
									checked = {attributes.CTAisParagraphyEnabled}
									onChange = {onChangeCTAisParagraphyEnabled}
								/>
							</PanelRow>
							{
								(attributes.CTAisParagraphyEnabled === true)?<Fragment>

									<ColorPopup 
										label={"Color"}
										value={{ value:attributes.CTAParagraphColor}}
										onChange = {onChangeCTAParagraphColor}
										PropertyName={"backgroundColor"}
									/>

									<RangeControl
										label={<strong> Font Size </strong>}
										value={ attributes.CTAParagraphyFontSize }
										onChange={ onChangeCTAParagraphyFontSize }
										min={ 0 }
										max={ 15 }
										step ={0.1}
									/>

									<PanelRow>
										<SelectControl
											label="Font Family"
											value={ attributes.CTAParagraphFontFamily }
											options={ GLOBAL_FONTS }
											onChange={ onChangeCTAParagraphyontFamily}
										/>

									</PanelRow>

									<PanelRow>
										<SelectControl
											label="Weight"
											value={ attributes.CTAParagraphFontWeight }
											options={ FontWeightAvaibles }
											onChange={ onChangeCTAParagraphFontWeight}
										/>
									</PanelRow>

									<SelectControl
										label="Style"
										value={ attributes.CTAParagraphTextStyle }
										options={
											[
												{ label: 'Normal', value: 'Normal' },
												{ label: 'oblique', value: 'oblique' },
												{ label: 'italic', value: 'italic' },
											]
										}
										onChange={ onChangeCTAParagraphFontStyle}
									/>

									<SelectControl
										label="Decoration"
										value={ attributes.CTAParagraphTextDecoration }
										options={
											[
												{ label: 'None', value: 'None' },
												{ label: 'underline', value: 'underline' },
												{ label: 'overline', value: 'overline' },
												{ label: 'line-through', value: 'line-through' },
											]
										}
										onChange={ onChangeCTAParagraphFontDecoration}
									/>


								</Fragment>:null
							}
						</CardBody>
					</Card>
				</PanelBody>
				<PanelBody title={'Button'}>
					<Card>
						<CardBody>
							<PanelRow>
								<p>
									Button
								</p>
								<ToggleControl
									checked = {attributes.CTAisButtonEnabled}
									onChange = {onChangeCTAisButtonEnabled}
								/>

							</PanelRow>
								{
									(attributes.CTAisButtonEnabled === true)?<Fragment>
										<TextControl
											label="Button Text"
											value={ attributes.CTAButtonText }
											onChange={ onChangeCTAButtonText}
										/>

										<TextControl
											label="Url"
											help="link Format: https://www.google.com/"
											value={ attributes.CTAButtonlink }
											onChange={ onChangeCTAButtonLink}
										/>
										<CheckboxControl
											label="Open in New Tab"
											checked={ attributes.CTAButtonLinkOpenNewTab}
											onChange={ onChangeCTAButtonLinkNewTab }
										/>
										<ColorPopup 
											label={"Text Color"}
											value={{ value:attributes.CTAButtonTextColor}}
											onChange = {onChangeCTAButtonTextColor}
											PropertyName={"backgroundColor"}
										/>
										<ColorPopup 
											label={"Background Color"}
											value={{ value:attributes.CTAButtonColor}}
											onChange = {onChangeCTAButtonColor}
											PropertyName={"backgroundColor"}
										/>


										<RangeControl
											label={<strong> Font Size </strong>}
											value={ attributes.CTAButtonFontSize }
											onChange={ onChangeCTAButtonFontSize }
											min={ 0 }
											max={ 15 }
											step ={0.1}
										/>

										<PanelRow>
											<SelectControl
												label="Font Family"
												value={ attributes.CTAButtonFontFamily }
												options={ GLOBAL_FONTS }
												onChange={ onChangeCTAButtonFontFamily}
											/>

										</PanelRow>

										<PanelRow>
											<SelectControl
												label="Weight"
												value={ attributes.CTAButtonFontWeight }
												options={ FontWeightAvaibles }
												onChange={ onChangeCTAButtonFontWeight}
											/>
										</PanelRow>

										<SelectControl
											label="Style"
											value={ attributes.CTAButtonTextStyle }
											options={
												[
													{ label: 'Normal', value: 'Normal' },
													{ label: 'oblique', value: 'oblique' },
													{ label: 'italic', value: 'italic' },
												]
											}
											onChange={ onChangeCTAButtonFontStyle}
										/>

										<SelectControl
											label="Decoration"
											value={ attributes.CTAButtonTextDecoration }
											options={
												[
													{ label: 'None', value: 'None' },
													{ label: 'underline', value: 'underline' },
													{ label: 'overline', value: 'overline' },
													{ label: 'line-through', value: 'line-through' },
												]
											}
											onChange={ onChangeCTAButtonFontDecoration}
										/>
											<SelectControl
												label="Border Type"
												value={ attributes.CTAButtonBorderStyle }
												options={
													[
														{ label: 'None', value: 'None' },
														{ label: 'Solid', value: 'Solid' },
														{ label: 'Double', value: 'Double' },
														{ label: 'Dotted', value: 'Dotted' },
														{ label: 'Dashed', value: 'Dashed' },
														{ label: 'groove', value: 'groove' }
													]
												}
												onChange={ onChangeCTABorderStyle}
											/>

											{
												(attributes.CTAButtonBorderStyle === 'None')?null:
													<Fragment>

														{/* <PanelRow>
															<p><strong>Border Color</strong></p>
															<div className="k2-cta-popup">
																	<span style={{backgroundColor: attributes.CTAButtonBorderColor}} className={ 'k2-cta-dot' } onClick={ myFunction }>
																	</span>
																						<span className="k2-cta-popup-text" hidden={ true }>

																					<div>
																						<ColorPicker
																							color={ attributes.CTAButtonBorderColor }
																							onChangeComplete={ onChangeCTABorderColor }
																						/>
																						<TextControl
																							onChange={ ( value ) => {
																								setAttributes( { CTAButtonBorderColor: value } )
																							} }
																							value={ attributes.CTAButtonBorderColor}
																						/>
																					</div>

																	</span>
															</div>
														</PanelRow> */}
														<ColorPopup 
															label={"Border Color"}
															value={{ value:attributes.CTAButtonBorderColor}}
															onChange = {onChangeCTABorderColor}
															PropertyName={"backgroundColor"}
														/>


														<RangeControl
															label={<strong>Border Width</strong>}
															value={ attributes.CTAButtonBorderWidth }
															onChange={ onChangeCTABorderWidth }
															min={ 0 }
															max={ 50 }
															step ={1}
														/>


														<RangeControl
															label={<strong>Border Radius</strong>}
															value={ attributes.CTAButtonBorderRadius }
															onChange={ onChangeCTABorderRadius }
															min={ 0 }
															max={ 50 }
															step ={1}
														/>
													</Fragment>
											}

										</Fragment>
										:null
								}
						</CardBody>
					</Card>
				</PanelBody>
			</InspectorControls>,
			<div>
				{
					(attributes.LayoutDesign == 'Classic')?
						<div  style={BoxedContainerStyling} className={'k2-cta-boxed-container'}>

							<div style={ClassicParentContainer} className={'k2-cta-classic-parent-container'}>
								<div style={CTATextAlignment} className={'k2-cta-classic-text-container'}>
									{
										(attributes.CTAisHeadingEnabled === true)?
										<RichText
										tagName="h1" // The tag here is the element output and editable in the admin
										value={ attributes.CTAHeadingText } // Any existing content, either from the database or an attribute default
										style={CTAHeadingStyling}
										className = {'k2-cta-classic-heading-style'}
										formattingControls={ [ 'bold', 'italic', 'link',] } // Allow the content to be made bold or italic, but do not allow other formatting options
										onChange={ onChangeCTAHeading } // Store updated content as a block attribute
										placeholder={ __( 'K2 Call To Action' ) } // Display this text before any content has been added by the user
										/>
										: null
									}

									{
										( attributes.CTAisParagraphyEnabled === true ) ?
											<RichText
												tagName="p" // The tag here is the element output and editable in the admin
												value={ attributes.CTAParagraphText } // Any existing content, either from the database or an attribute default
												style={CTAParagraphStyling}
												className={ 'k2-cta-classic-paragraph-heading' }
												formattingControls={ ['bold', 'italic', 'link',] } // Allow the content to be made bold or italic, but do not allow other formatting options
												onChange={ onChangeCTAParagraph } // Store updated content as a block attribute
												placeholder={ __( 'Having years of experience running summer courses, we have observed young students beginning the programme with much trepidation and anxiety, but leaving Oxford having had one of the most enriching and memorable experiences of their lives.' ) } // Display this text before any content has been added by the user
											/>
											: null
									}

									{
										( attributes.CTAisButtonEnabled === true ) ?

											<button style={CTAButtonStyling} className={ 'k2-cta-classic-button-styling' }>
												{ attributes.CTAButtonText }
											</button>
											: null
									}
								</div>
								<div style={attributes.isCTABGgradientEnable == true ? ClassicBgGradientImageContainerStyling : ClassicImageContainerStyling} className={'k2-cta-classic-image-container'}>
								
								</div>
							</div>
						</div>

						: <div  style={BoxedContainerStyling} className={'k2-cta-boxed-container'}>

							<div style={ attributes.isCTABGgradientEnable == true ? CoverBGgradientParentStyling : CoverParentStyling } className={'k2-cta-cover-parent-container'}>

								<div style={CTATextAlignment} className={'k2-cta-cover-text-container'}>
									{
										( attributes.CTAisHeadingEnabled === true ) ?
											<RichText
												tagName="h1" // The tag here is the element output and editable in the admin
												value={ attributes.CTAHeadingText } // Any existing content, either from the database or an attribute default
												style={CTAHeadingStyling}
												className={ 'k2-cta-cover-heading-style' }
												formattingControls={ ['bold', 'italic', 'link',] } // Allow the content to be made bold or italic, but do not allow other formatting options
												onChange={ onChangeCTAHeading } // Store updated content as a block attribute
												placeholder={ __( 'K2 Call To Action' ) } // Display this text before any content has been added by the user
											/>
											: null
									}

									{
										( attributes.CTAisParagraphyEnabled === true ) ?
									<RichText
										tagName="p" // The tag here is the element output and editable in the admin
										value={ attributes.CTAParagraphText } // Any existing content, either from the database or an attribute default
										style={CTAParagraphStyling}
										className = {'k2-cta-cover-paragraph-heading'}
										formattingControls={ [ 'bold', 'italic', 'link',] } // Allow the content to be made bold or italic, but do not allow other formatting options
										onChange={ onChangeCTAParagraph } // Store updated content as a block attribute
										placeholder={ __( 'Having years of experience running summer courses, we have observed young students beginning the programme with much trepidation and anxiety, but leaving Oxford having had one of the most enriching and memorable experiences of their lives.' ) } // Display this text before any content has been added by the user
									/>
										: null
									}


									{
										( attributes.CTAisButtonEnabled === true ) ?
											<button style={CTAButtonStyling} className={ 'k2-cta-cover-button-styling' }>
												{ attributes.CTAButtonText }
											</button>
											: null
									}
								</div>
							</div>

						</div>
				}
			</div>
		]
	);
}
