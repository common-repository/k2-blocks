/**
 * BLOCK: Call to Action
 *
 * Registering a basic Call_To_Action with Gutenberg.
 * Simple Call_To_Action , renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './editor.scss';
import './style.scss';
import { GLOBAL_FONTS } from '../Global_Fonts';
import ColorPopup from '../components/ColorPopup';
import { useMemo, Fragment} from '@wordpress/element';
const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType,
	// For attribute sources
} = wp.blocks;

const {
	RichText,
	InspectorControls,
	MediaUpload
} = wp.editor;

import {
	PanelBody,
	PanelRow,
	TextControl,
	RangeControl,
	ToggleControl,
	SelectControl,
	ColorPicker,
	ColorPalette,
	CheckboxControl,
	Card,
    CardBody,
    CardHeader,
	__experimentalBoxControl as BoxControl,	
	TabPanel,
	GradientPicker,
    } from '@wordpress/components';

const calltoactionIcon = (
    <svg width={800} height={800} viewBox="0 0 800 800">
      <image
        width={800}
        height={800}
        xlinkHref="data:image/png;base64,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 RU5ErkJggg=="
      />
    </svg>
  );
/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new Call_To_Action  provided a unique name and an object defining its
 * behavior. Once registered, Call_To_Action  is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          Call_To_Action , if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'k2/call-to-action-block', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-Progress_Bar_Block.
	title: __( 'Call To Action' ), // Block title.
	icon: {src: calltoactionIcon},
	category: 'k2-blocks', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	attributes: {
		LayoutDesign: {
			type: 'string',
			default: 'Cover'
		},
		CTA_Image: {
			type: 'string',
			default: 'http://k2blocks.com/wp-content/uploads/2023/06/Rectangle-1713.png'
		},
		CTAHeadingText: {
			type: 'string',
			default: 'Classic Call To Action'
		},
		CTAParagraphText: {
			type: 'string',
			default: 'Hello, I’m a classic Call to Action block with a heading, paragraph, button, and an image. You can edit all these elements in any way you want to.'
		},
		CTAButtonText: {
			type: 'string',
			default: 'Read More'
		},
		CTAOverlayColorRed: {
			type: 'number',
			default: 180
		},
		CTAOverlayColorGreen: {
			type: 'number',
			default: 55
		},
		CTAOverlayColorBlue: {
			type: 'number',
			default: 87
		},
		CTAOverlayColorAlpha: {
			type: 'number',
			default: 0.6
		},
		CTAOverlayEnableDisable: {
			type: 'boolean',
			default: true
		},
		CTAClassicPosition: {
			type: 'string',
			default: 'row'
		},
		CTACoverContainerHeight: {
			type: 'number',
			default: 35
		},
		CTAClassicBoxHeight: {
			type: 'number',
			default: 35
		},
		CTABoxBorderRadius:{
			type:"object",
			default: {top: '0px', right: "0px", bottom: "0px", left: "0px"}
		},
		CTAAlignment: {
			type: 'string',
			default: 'center'
		},
		CTABoxWidth: {
			type: 'number',
			default: 80
		},
		InspectorControlClassicOptionDisplay:{
			type: 'string',
			default: 'Left'
		},
		CTAisHeadingEnabled: {
			type: 'boolean',
			default: true
		},
		CTAisParagraphyEnabled: {
			type: 'boolean',
			default: true
		},
		CTAisButtonEnabled: {
			type: 'boolean',
			default: true
		},
		CTAInnerContainerPlacement: {
			type: 'string',
			default: 'center'
		},
		CTAHeadingColor: {
			type: 'string',
			default: 'white'
		},
		CTAParagraphColor: {
			type: 'string',
			default: 'white'
		},
		CTAHeadingFontSize: {
			type: 'number',
			default: 2
		},
		CTAParagraphyFontSize: {
			type: 'number',
			default: 1.4
		},
		CTAButtonFontSize: {
			type: 'number',
			default: 1.4
		},
		CTAHeadingFontFamily: {
			type: 'string',
			default: 'Helvatica'
		},
		CTAParagraphFontFamily: {
			type: 'string',
			default: 'Helvatica'
		},
		CTAButtonFontFamily: {
			type: 'string',
			default: 'Helvatica'
		},
		CTAButtonFontWeight: {
			type: 'string',
			default: 'normal'
		},
		CTAButtonTextStyle: {
			type: 'number',
			default: 'normal'
		},
		CTAButtonTextDecoration: {
			type: 'string',
			default: 'None'
		},

		CTAHeadingFontWeight: {
			type: 'string',
			default: '600'
		},
		CTAHeadingTextStyle: {
			type: 'number',
			default: 'normal'
		},
		CTAHeadingTextDecoration: {
			type: 'string',
			default: 'None'
		},


		CTAParagraphFontWeight: {
			type: 'string',
			default: '300'
		},
		CTAParagraphTextStyle: {
			type: 'number',
			default: 'normal'
		},
		CTAParagraphTextDecoration: {
			type: 'string',
			default: 'None'
		},

		CTAButtonBorderStyle: {
			type: 'string',
			default: 'None'
		},
		CTAButtonBorderWidth: {
			type: 'number',
			default: 3
		},
		CTAButtonBorderRadius: {
			type: 'number',
			default: 3
		},
		CTAButtonBorderColor: {
			type: 'string',
			default: '#ffffff'
		},
		CTAButtonColor: {
			type: 'string',
			default: '#3d8c97'
		},
		CTAButtonTextColor: {
			type: 'string',
			default: 'white'
		},
		CTAButtonlink: {
			type: 'string',
			default: ''
		},
		CTAButtonLinkOpenNewTab: {
			type: 'boolean',
			default: false
		},

		CallToActionOverlayColor: {
			type: 'string',
			default: 'inset 0 0 0 100vh rgba(68,68,68,0.4)'
		},
		InspectorControlCallToActionOverlayColor: {
			type: 'string',
			default: 'rgba(68,68,68,0.4)'
		},
		isCTABGgradientEnable: {
			type:'boolean',
			default:false
		},
		K2CTApricingBgGradient:{
			type:'string',
			default: 'linear-gradient(45deg, rgb(15, 32, 39) 0%, rgb(29, 146, 221) 0%, rgb(123, 220, 181) 100%)'
		   },
	},

	/**
	 * The edit function describes the structure of your Progress_Bar_Block in the context of the editor.
	 * This represents what the editor will render when the Progress_Bar_Block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Component.
	 */
	edit ({attributes, setAttributes}) {
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

		return ( [
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
		] )
	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Frontend HTML.
	 */
	save ({attributes, setAttributes}) {


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



		return <div>
			{
				(attributes.LayoutDesign == 'Classic')?
					<div  style={BoxedContainerStyling} className={'k2-cta-boxed-container'}>

						<div style={ClassicParentContainer} className={'k2-cta-classic-parent-container'}>
							<div style={CTATextAlignment} className={'k2-cta-classic-text-container'}>
								{
									(attributes.CTAisHeadingEnabled === true)?
										<RichText.Content
											tagName="h1" // The tag here is the element output and editable in the admin
											value={ attributes.CTAHeadingText } // Any existing content, either from the database or an attribute default
											style={CTAHeadingStyling}
											className = {'k2-cta-classic-heading-style'}
										/>
										: null
								}

								{
									( attributes.CTAisParagraphyEnabled === true ) ?
										<RichText.Content
											tagName="p" // The tag here is the element output and editable in the admin
											value={ attributes.CTAParagraphText } // Any existing content, either from the database or an attribute default
											style={CTAParagraphStyling}
											className={ 'k2-cta-classic-paragraph-heading' }
										/>
										: null
								}

								{
									( attributes.CTAisButtonEnabled === true ) ?
										(attributes.CTAButtonLinkOpenNewTab === false)?
										<button onclick={'window.location.href = "' + attributes.CTAButtonlink + '"'} style={CTAButtonStyling} className={ 'ClassicButtonStyling' }>
											{ attributes.CTAButtonText }
										</button>:
										<button
											onclick={"window.open('"+ attributes.CTAButtonlink + "','_blank')"}
											style={ CTAButtonStyling } className={ 'k2-cta-classic-button-styling' }>
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
										<RichText.Content
											tagName="h1" // The tag here is the element output and editable in the admin
											value={ attributes.CTAHeadingText } // Any existing content, either from the database or an attribute default
											style={CTAHeadingStyling}
											className={ 'k2-cta-cover-heading-style' }
										/>
										: null
								}

								{
									( attributes.CTAisParagraphyEnabled === true ) ?
										<RichText.Content
											tagName="p" // The tag here is the element output and editable in the admin
											value={ attributes.CTAParagraphText } // Any existing content, either from the database or an attribute default
											style={CTAParagraphStyling}
											className = {'k2-cta-cover-paragraph-heading'}
										/>
										: null
								}


								{
									( attributes.CTAisButtonEnabled === true ) ?
										(attributes.CTAButtonLinkOpenNewTab === false)?
											<button onclick={'window.location.href = "' + attributes.CTAButtonlink + '"'} style={CTAButtonStyling} className={ 'ClassicButtonStyling' }>
												{ attributes.CTAButtonText }
											</button>:
											<button
												onclick={"window.open(' + " + attributes.CTAButtonlink + "',_blank')"}
												style={ CTAButtonStyling } className={ 'k2-cta-cover-button-styling' }>
												{ attributes.CTAButtonText }
											</button>
										: null
								}
							</div>
						</div>

					</div>
			}
		</div>



	},


} );
