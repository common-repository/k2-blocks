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
	const {
		AlertBoxImageUrl, AlertBoxText, AlertBoxColor, AlertBoxBorderColor, AlertBoxTextColor, AlertBoxIconSize, AlertBoxTextSize, AlertBoxIconColor, AlertBoxIconType, AlertBoxIconSpacing, AlertBoxLayoutOptions, AlertBoxLayoutAttribute, AlertBoxClassicAlignment, AlertBoxSimpleAlignment, AlertBoxBorderStyle, AlertBoxBorderWidth, AlertBoxBorderRadius, AlertBoxWidgetWidth, AlertIconBackgroundColor, AlertIconBackgroundBorderRadius, AlertBoxTextFontFamily, AlertBoxTextFontWeight, AlertBoxTextStyle, AlertBoxTextDecoration, AlertBoxTextLineHeight, AlertBoxWidth, AlertBoxWidgetAlignment, AlertBoxTextAlignment, enableImage, imageSize, AlertBoxMediaSpacing, EnableAlertBoxText, EnableAlertBoxHeading, AlertboxHeadingText, AlertBoxHeadingColor, AlertBoxHeadingSize, AlertBoxHeadingFontFam, AlertBoxHeadingFontWeight, AlertHeadingSpacing, AlertBoxShadow, AlertBoxImageBorderRadius, AlertBoxPaddingCont, alertBoxEnableButton, AlrtBoxButtonText, AlertBoxButtonLink, AlertBoxButtonAlignment, alertBoxButtonfontSize, AlertBoxButtonFontFamily, AlertBoxButtonFontWeight, AlertBoxButtonTextColot, AlertBoxButtonbackgroundColor, AlertBoxButtonPadding, AlertBoxButtonMargin, AlertBoxButtonBorder, AlertBoxButtonBorderRadius

	} = attributes

		const onSelectTabChange = ( tabName ) => {
            console.log( 'Selecting tab', tabName );
        };
		const onSelectAlertBoxImageUrl = (image) => {
			setAttributes({AlertBoxImageUrl: image.url})
		}
		const ToolBarColors = [
			{ color: '#32897A' },
			{  color: '#1995AD' },
			{  color: '#011A27' },
			{  color: '#F69454' },
		];
		const FontWeightAvaibles= [
			{ label: 'normal'},
			{ label: '100'},
			{ label: '200'},
			{ label: '300'},
			{ label: '400'},
			{ label: '500'},
			{ label: '600'},
		]

		// const WidgetContainerStyling = {
		// 	justifyContent: AlertBoxWidgetAlignment
		// }

		const WidgetContainerStyling = useMemo(
			() => ({
				justifyContent: AlertBoxWidgetAlignment
			}),
			[AlertBoxWidgetAlignment]
		);
		
		const colorOptions = [
            { name: 'blue', color: '#00f' },
            { name: 'black', color: '#000' },
            { name: 'Purple', color: '#2C2A4A' },
            { name: 'Light Purple', color: '#4F518C' },
        ]
		
		const ParentContainerStyling = {
			backgroundColor: AlertBoxColor,
			borderColor: AlertBoxBorderColor,
			flexDirection: AlertBoxLayoutAttribute,
			alignItems: AlertBoxClassicAlignment,
			justifyContent: AlertBoxSimpleAlignment,
			borderStyle: AlertBoxBorderStyle,
			borderWidth: AlertBoxBorderWidth + 'px',
			borderRadius: AlertBoxBorderRadius + 'px',
			boxShadow: AlertBoxShadow
			  ? `${AlertBoxShadow.x}px ${AlertBoxShadow.y}px ${AlertBoxShadow.blur}px ${AlertBoxShadow.spread}px ${AlertBoxShadow.color} ${AlertBoxShadow.position}`
			  : 'none',
			paddingTop: AlertBoxPaddingCont && AlertBoxPaddingCont.top,
			paddingRight: AlertBoxPaddingCont && AlertBoxPaddingCont.right,
			paddingBottom: AlertBoxPaddingCont && AlertBoxPaddingCont.bottom,
			paddingLeft: AlertBoxPaddingCont && AlertBoxPaddingCont.left,
		}

		const anotherextraStyle ={
			// flexDirection: AlertBoxLayoutAttribute,
			// alignItems: AlertBoxClassicAlignment,
		}
		// const AlertIconStyling = {
		// 	fontSize: AlertBoxIconSize + 'rem',
		// 	color: AlertBoxIconColor,
		// 	backgroundColor: AlertIconBackgroundColor,
		// 	borderRadius: AlertIconBackgroundBorderRadius,
		// 	padding: '0.2em'
		// }
		// const ALertImageStyles ={
		// 	width: imageSize + '%',
		// 	borderRadius: AlertBoxImageBorderRadius + 'px'
		// }
		// const AlertTextStyling = {
		// 	display: 'block',
		// 	fontSize: AlertBoxTextSize + 'rem',
		// 	color: AlertBoxTextColor,
		// 	fontFamily: AlertBoxTextFontFamily,
		// 	fontWeight: AlertBoxTextFontWeight,
		// 	fontStyle: AlertBoxTextStyle,
		// 	textDecoration: AlertBoxTextDecoration,
		// 	wordWrap: 'break-word',
		// 	lineHeight: AlertBoxTextLineHeight +"px"
		// }
		// const textContainerStyle = {
		// 	paddingLeft: AlertBoxIconSpacing + 'em',
		// 	textAlign: AlertBoxTextAlignment
		// }
		const AlertIconStyling = useMemo(
			() => ({
			  fontSize: AlertBoxIconSize + 'rem',
			  color: AlertBoxIconColor,
			  backgroundColor: AlertIconBackgroundColor,
			  borderRadius: AlertIconBackgroundBorderRadius,
			  padding: '0.2em',
			}),
			[
			  AlertBoxIconSize,
			  AlertBoxIconColor,
			  AlertIconBackgroundColor,
			  AlertIconBackgroundBorderRadius,
			]
		  );
	
		const ALertImageStyles = useMemo(
		() => ({
			width: imageSize + '%',
			borderRadius: AlertBoxImageBorderRadius + 'px',
		}),
		[imageSize, AlertBoxImageBorderRadius]
		);
	
		const AlertTextStyling = useMemo(
		() => ({
			display: 'block',
			fontSize: AlertBoxTextSize + 'rem',
			color: AlertBoxTextColor,
			fontFamily: AlertBoxTextFontFamily,
			fontWeight: AlertBoxTextFontWeight,
			fontStyle: AlertBoxTextStyle,
			textDecoration: AlertBoxTextDecoration,
			wordWrap: 'break-word',
			lineHeight: AlertBoxTextLineHeight + 'px',
		}),
		[
			AlertBoxTextSize,
			AlertBoxTextColor,
			AlertBoxTextFontFamily,
			AlertBoxTextFontWeight,
			AlertBoxTextStyle,
			AlertBoxTextDecoration,
			AlertBoxTextLineHeight,
		]
		);
	
		const textContainerStyle = useMemo(
		() => ({
			paddingLeft: AlertBoxIconSpacing + 'em',
			textAlign: AlertBoxTextAlignment,
		}),
		[AlertBoxIconSpacing, AlertBoxTextAlignment]
		);
		//if not Simple
		const ClassictextContainerStyle = useMemo(
			() => ({
			// paddingLeft: AlertBoxIconSpacing + 'em',
			textAlign: AlertBoxTextAlignment
		}),
		[AlertBoxTextAlignment]
		);
		// const SubWidgetStyling = {
		// 	width: AlertBoxWidth + '%'
		// }
		const SubWidgetStyling = useMemo(
			() => ({
				width: AlertBoxWidth + '%'
			}),
			[AlertBoxWidth]
		);

		function onChangeAlertBoxImageBorderRadius (NewRadius){
			setAttributes({AlertBoxImageBorderRadius:NewRadius})
		}

		function onChangeAlertBoxShadow(newVal){
			setAttributes({AlertBoxShadow:newVal})
		}
		function onChangeAlertBoxPaddingCont(newPadding){
			setAttributes({AlertBoxPaddingCont:newPadding})
		}

		function onAlertBoxTextChange(NewText){
			setAttributes({
				AlertBoxText: NewText
			})
		}

		function onChangeAlertBoxColor(NewColor) {
			setAttributes({
				AlertBoxColor: NewColor

			})
		}

		function onChangeAlertBoxBorderColor(NewColor) {
			setAttributes({
				AlertBoxBorderColor: NewColor

			})
		}

		function OnChangeAlertBoxTextColor(NewColor) {
			setAttributes({
				AlertBoxTextColor: NewColor
			})
		}

		function onChangeIconSize(NewSize) {
			setAttributes({
				AlertBoxIconSize: NewSize
			})
		}
		function onChangeImageSize(newSize) {
			setAttributes({
				imageSize: newSize
			})
		}
		function onChangeTextSize(NewSize) {
			setAttributes({
				AlertBoxTextSize: NewSize
			})
		}

		function onChangeIconColor(NewColor) {
			setAttributes({
				AlertBoxIconColor:NewColor

			})
		}


		function onChangeAlertBoxIconSpacing(NewSpacing) {
			setAttributes({
				AlertBoxIconSpacing: NewSpacing
			})
		}

		function onChangeAlertBoxLayout(NewLayout) {
			setAttributes({
				AlertBoxLayoutOptions: NewLayout
			})
			if (NewLayout === 'Classic'){
				setAttributes({
					AlertBoxLayoutAttribute: 'column',
					AlertBoxIconSpacing: 0+'em'
				})
			}else if (NewLayout === 'Simple'){
				setAttributes({
					AlertBoxLayoutAttribute: 'row',
					AlertBoxIconSpacing: 0.5+'em',
					AlertBoxClassicAlignment: 'center',
				})
			}
		}

		function onChangeAlertBoxClassicAlignment(NewAllignment) {
			if ( AlertBoxLayoutOptions === 'Classic'){
				setAttributes({
					AlertBoxClassicAlignment: NewAllignment
				})
			}else if (AlertBoxLayoutOptions === 'Simple'){
				setAttributes({
					AlertBoxSimpleAlignment: NewAllignment
				})
			}
		}

		function onChangeAlertBoxWidgetAlignment(NewAlignment){
			setAttributes({
				AlertBoxWidgetAlignment: NewAlignment
			})
		}
		function onChangeAlertBoxTextAlignment(NewAlignment) {
			setAttributes({AlertBoxTextAlignment:NewAlignment})
		}
		function onChangeAlertBoxBorderStyle(NewStyle) {
			setAttributes({
				AlertBoxBorderStyle: NewStyle
			})
		}
		function onChangeAlertBoxBorderWidth(NewWidth) {
			setAttributes({
				AlertBoxBorderWidth: NewWidth
			})
		}
		function onChangeAlertBoxBorderRadius(NewRadius) {
			setAttributes({
				AlertBoxBorderRadius: NewRadius
			})
		}

		function onChangeSubWidgetWidth(NewWidth) {
			setAttributes({
				AlertBoxWidgetWidth: NewWidth
			})
		}

		function onChangeAlertIconBackgroundColor(NewColor) {
			setAttributes({
				AlertIconBackgroundColor: NewColor
			})
		}

		function onChangeAlertIconBackgroundBorderRadius(NewRadius) {
			setAttributes({
				AlertIconBackgroundBorderRadius:NewRadius
			})
		}


		function onChangeAlertIconActive(value) {
			if (value.target.tagName === 'SPAN') {

				console.log( value.target.tagName )
				var MainDiv = document.getElementById( "k2-ib-icon-list-wrapper-id" );
				var Spans = MainDiv.getElementsByTagName( 'span' );
				for (var i = 0; i < Spans.length; i++) {
					if (Spans[i].className.includes( 'k2-ib-active' )) {
						Spans[i].className = Spans[i].className.replace( 'k2-ib-active', '' )
					}
				}
				setAttributes( {
					AlertBoxIconType: value.target.className
				} )
				console.log( value.target.className )
				value.target.className = value.target.className + ' k2-ib-active'
			}
		}


		function onChangeAlertBoxTextFontFamily(NewFamily) {
			setAttributes({
				AlertBoxTextFontFamily: NewFamily
			})
		}

		function onChangeAlertBoxTextFontWeight(NewWeight) {
			setAttributes({
				AlertBoxTextFontWeight: NewWeight
			})
		}

		function onChangeAlertBoxTextFontStyle(NewStyle) {
			setAttributes({
				AlertBoxTextStyle: NewStyle
			})
		}

		function onChangeAlertBoxTextFontDecoration(NewDecoration) {
			setAttributes({
				AlertBoxTextDecoration: NewDecoration
			})
		}

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
		// const imageupload = {
		// 	backgroundImage: 'url("' + AlertBoxImageUrl + '")'
		// }
		const imageupload = useMemo(
			() => ({
				backgroundImage: 'url("' + AlertBoxImageUrl + '")'
		}),
		[AlertBoxImageUrl]
		);
		const onChangeenableImage = (value) => {
			setAttributes({enableImage:value})
		}
		function onChangeAlertBoxWidth(NewWidth) {
			setAttributes({
				AlertBoxWidth: NewWidth
			})
		}
		function onChangeEnableAlertBoxText(value) {
			setAttributes({
				EnableAlertBoxText : value
			})
		}
		function onChangeEnableAlertBoxHeading(value) {
			setAttributes({
				EnableAlertBoxHeading: value
			})
		}
		function onChangeAlertboxHeadingText(newText) {
			setAttributes({AlertboxHeadingText:newText})
		}
		function onChangeAlertBoxHeadingColor (newColor) {
			setAttributes({
				AlertBoxHeadingColor:newColor
			})
		}
		function onChangeAlertBoxHeadingSize (newSize) {
			setAttributes({
				AlertBoxHeadingSize:newSize
			})
		}
		function onChangeAlertBoxHeadingFontFam (newFam) {
			setAttributes({AlertBoxHeadingFontFam:newFam})
		}
		function onChangeAlertBoxHeadingFontWeight (NewWeight) {
			setAttributes({AlertBoxHeadingFontWeight:NewWeight})
		}
		function onChangeAlertHeadingSpacing (newValue) {
			setAttributes({AlertHeadingSpacing:newValue})
		}
		function onChangeAlertBoxMediaSpacing (newSpacing) {
			setAttributes({AlertBoxMediaSpacing: newSpacing})
		}
		const mediaContainer = useMemo(
			() => ({
				marginBottom: AlertBoxMediaSpacing
		}),
		[AlertBoxMediaSpacing]
		);
		// const mediaContainer = {
		// 	marginBottom: AlertBoxMediaSpacing
		// }
		function onChangeAlertBoxTextLineHeight( newLineheight) {
			setAttributes({AlertBoxTextLineHeight: newLineheight})
		}
		// const headingStyles = {
		// 	fontSize: AlertBoxHeadingSize+"rem",
		// 	color: AlertBoxHeadingColor,
		// 	fontFamily: AlertBoxHeadingFontFam,
		// 	fontWeight: AlertBoxHeadingFontWeight,
		// 	marginBottom: AlertHeadingSpacing+"px",
		// 	marginTop:'0px'
		// }	
		const headingStyles = useMemo(
			() => ({
				fontSize: AlertBoxHeadingSize+"rem",
				color: AlertBoxHeadingColor,
				fontFamily: AlertBoxHeadingFontFam,
				fontWeight: AlertBoxHeadingFontWeight,
				marginBottom: AlertHeadingSpacing+"px",
				marginTop:'0px'
		}),
		[AlertBoxHeadingSize, AlertBoxHeadingColor, AlertBoxHeadingFontFam,
			AlertBoxHeadingFontWeight,  AlertHeadingSpacing]
		);
		
		function onChangealertBoxEnableButton(NewVal){
			setAttributes({alertBoxEnableButton:NewVal})
		}
		function onChangeAlrtBoxButtonText(NewText){
			setAttributes({AlrtBoxButtonText:NewText})
		}
		function onChangeAlertBoxButtonLink(NewLink){
			setAttributes({AlertBoxButtonLink:NewLink})
		}
		function onChangeAlertBoxButtonAlignment(NewPos){
			setAttributes({AlertBoxButtonAlignment:NewPos})
		}
		function onChangealertBoxButtonfontSize(newSize){
			setAttributes({alertBoxButtonfontSize:newSize})
		}
		function onChangeAlertBoxButtonFontFamily(newFam){
			setAttributes({AlertBoxButtonFontFamily:newFam})
		}
		function onChangeAlertBoxButtonFontWeight(NewWeight){
			setAttributes({AlertBoxButtonFontWeight:NewWeight})
		}
		function onChangeAlertBoxButtonTextColot(Newcolor){
			setAttributes({AlertBoxButtonTextColot:Newcolor})
		}
		
		function onChangeAlertBoxButtonbackgroundColor(Newcolor){
			setAttributes({AlertBoxButtonbackgroundColor:Newcolor})
		}
		function onChangeAlertBoxButtonPadding(NewPad){
			setAttributes({AlertBoxButtonPadding:NewPad})
		}
		function onChangeAlertBoxButtonMargin(NewMar){
			setAttributes({AlertBoxButtonMargin:NewMar})
		}
		function onChangeAlertBoxButtonBorder(NewBorderButton){
			setAttributes({AlertBoxButtonBorder:NewBorderButton})
		}
		function onChangeAlertBoxButtonBorderRadius(NewButtonRadius){
			setAttributes({AlertBoxButtonBorderRadius:NewButtonRadius})
		}

		const ButtonStyles = {
			fontSize: alertBoxButtonfontSize + 'rem',
			fontFamily: AlertBoxButtonFontFamily,
			fontWeight: AlertBoxButtonFontWeight,
			color: AlertBoxButtonTextColot,
			backgroundColor: AlertBoxButtonbackgroundColor,
			paddingTop: AlertBoxButtonPadding && AlertBoxButtonPadding.top,
			paddingRight: AlertBoxButtonPadding && AlertBoxButtonPadding.right,
			paddingBottom: AlertBoxButtonPadding && AlertBoxButtonPadding.bottom,
			paddingLeft: AlertBoxButtonPadding && AlertBoxButtonPadding.left,
			borderColor: AlertBoxButtonBorder && AlertBoxButtonBorder.color,
			borderStyle: AlertBoxButtonBorder && AlertBoxButtonBorder.style,
			borderWidth:  AlertBoxButtonBorder && AlertBoxButtonBorder.width,
			borderRadius: AlertBoxButtonBorderRadius + 'px'
		}

		// const buttonContStyle = {
		// 	justifyContent: AlertBoxButtonAlignment,
		// 	marginTop: AlertBoxButtonMargin.top,
		// 	marginRight: AlertBoxButtonMargin.right,
		// 	marginBottom: AlertBoxButtonMargin.bottom,
		// 	marginLeft: AlertBoxButtonMargin.left,
		// }

		const buttonContStyle = {
				justifyContent: AlertBoxButtonAlignment,
				marginTop: AlertBoxButtonMargin && AlertBoxButtonMargin.top,
				marginRight: AlertBoxButtonMargin && AlertBoxButtonMargin.right,
				marginBottom: AlertBoxButtonMargin && AlertBoxButtonMargin.bottom,
				marginLeft: AlertBoxButtonMargin && AlertBoxButtonMargin.left,
		}
		const blockProps = useBlockProps({
			style: WidgetContainerStyling,
			className: 'k2-ib-widget-container',
		});

	return (
		[

			<InspectorControls>

				<PanelBody> 
					<TabPanel
						className="infobox-icon-image-tab"
						activeClass="active-tab"
						onSelect={onSelectTabChange}
						tabs={ [
							{
								name: 'icon',
								title: 'icon',
								className: 'tab-two',
							},
							{
								name: 'image',
								title: 'image',
								className: 'tab-one',
							},
							
						] }                 
					>
					  {(tab) => 
							<Card style={{padding:"12px"}}>
								{ tab.title == 'icon' ?
									<div className={'k2-ib-icon-list-wrapper'}>
										<div>
											<div>
												<label><strong>Select Icon</strong></label>
											</div>
											<div id='k2-ib-icon-list-wrapper-id' className={'k2-ib-icon-list-sub-wrapper'}  onClickCapture={onChangeAlertIconActive}>
												{GLOBAL_ICONS.map((value, index) => {
													return <span className={'fas '+value}></span>
												})}
											</div>
										</div>												
									</div>
									:
									<div>
										<ToggleControl 
											label="Enable Image"
											checked={enableImage}
											onChange = {onChangeenableImage}
											
										/>
										{
											enableImage == true ?
											<MediaUpload 
												accept = "image/*"
												allowedTypes={ [ 'image' ] }
												value = {AlertBoxImageUrl}
												onSelect = {onSelectAlertBoxImageUrl}
												render={ ({open}) => {
													return <div style={imageupload}  className={'k2-cta-image-select-control'}>
														<i className="fa fa-plus-circle" onClick={open}></i>
													</div>;
												}}
											/>
											:null
										}
										
									</div>
								}
							</Card>
					  
					  
					  
					  }
					</TabPanel>
					<SelectControl
						label="Layout"
						value={ AlertBoxLayoutOptions }
						options={
							[
								{ label: 'Classic', value: 'Classic' },
								{ label: 'Simple', value: 'Simple' }
							]
						}
						onChange={ onChangeAlertBoxLayout}
					/>

					<RangeControl
						label={<strong>Widget Width</strong>}
						value={ AlertBoxWidth }
						onChange={ onChangeAlertBoxWidth }
						min={ 1 }
						max={ 100 }
						step ={1}
					/>

					{
						enableImage == false ?
						<div>
							<RangeControl
								label={<strong>Icon Size</strong>}
								value={ AlertBoxIconSize }
								onChange={ onChangeIconSize }
								min={ 0.2 }
								max={ 15 }
								step ={0.1}
							/>
							<RangeControl
								label={<strong>Icon Radius</strong>}
								value={ AlertIconBackgroundBorderRadius }
								onChange={ onChangeAlertIconBackgroundBorderRadius }
								min={ 0 }
								max={ 50 }
								step ={1}
							/>
						</div>
						: <div>
							<RangeControl 
									label={<strong>Image Size</strong>}
									value={imageSize}
									onChange={onChangeImageSize}
									min={ 0.2 }
									max={ 100 }
									step ={0.1}
								/>
							<RangeControl 
								label={"Image Border Radius"}
								value={AlertBoxImageBorderRadius}
								onChange={onChangeAlertBoxImageBorderRadius}
							/>

						</div> 
						
							
					}
					<RangeControl 
						label="Spacing"
						value={AlertBoxMediaSpacing}
						onChange= {onChangeAlertBoxMediaSpacing}
					/>


					{
						(AlertBoxLayoutOptions === 'Simple')?
							<div>
								<RangeControl
									label={<strong>Icon Spacing</strong>}
									value={ AlertBoxIconSpacing }
									onChange={ onChangeAlertBoxIconSpacing }
									min={ 0.0 }
									max={ 10 }
									step ={0.1}
								/>
							</div>
							:null
					}

					<PanelRow>

						<div style={{paddingBottom: '2%'}}>
							<label><strong>Alignment</strong></label>
						</div>
						<div id = {'AlignmentIconsParent'} className={'k2-ib-inspector-control-alignment'} onClick={onChangeAlignmentIconChange}>

							<div className={'k2-ib-inspector-control-alignment-single'}  onClick={() => onChangeAlertBoxClassicAlignment('flex-start')}>
								<span className="fa fa-align-left k2-ib-alignment-icon-style" ></span>
							</div>
							<div className={'k2-ib-inspector-control-alignment-single'} onClick={() => onChangeAlertBoxClassicAlignment('center')}>
								<span className="fa fa-align-center k2-ib-alignment-icon-style k2-ib-active"></span>
							</div>
							<div className={'k2-ib-inspector-control-alignment-single'} onClick={() => onChangeAlertBoxClassicAlignment('flex-end')}>
								<span className="fa fa-align-right k2-ib-alignment-icon-style"></span>
							</div>
						</div>

					</PanelRow>


					<PanelRow>

						<div style={{paddingBottom: '2%'}}>
							<label><strong>Position</strong></label>
						</div>
						<div id = {'AlignmentIconsParent'} className={'k2-ib-inspector-control-alignment'} onClick={onChangeAlignmentIconChange}>

							<div className={'k2-ib-inspector-control-alignment-single'}  onClick={() => onChangeAlertBoxWidgetAlignment('flex-start')}>
								<span className="fa fa-align-left k2-ib-alignment-icon-style" ></span>
							</div>
							<div className={'k2-ib-inspector-control-alignment-single'} onClick={() => onChangeAlertBoxWidgetAlignment('center')}>
								<span className="fa fa-align-center k2-ib-alignment-icon-style k2-ib-active"></span>
							</div>
							<div className={'k2-ib-inspector-control-alignment-single'} onClick={() => onChangeAlertBoxWidgetAlignment('flex-end')}>
								<span className="fa fa-align-right k2-ib-alignment-icon-style"></span>
							</div>
						</div>

					</PanelRow>
					<PanelRow>

								<div style={{paddingBottom: '2%'}}>
									<label><strong>Desktop Text Alignment</strong></label>
								</div>
								<div id = {'AlignmentIconsParent'} className={'k2-ib-inspector-control-alignment'} onClick={onChangeAlignmentIconChange}>

									<div className={'k2-ib-inspector-control-alignment-single'}  onClick={() => onChangeAlertBoxTextAlignment('left')}>
										<span className="fa fa-align-left k2-ib-alignment-icon-style" ></span>
									</div>
									<div className={'k2-ib-inspector-control-alignment-single'} onClick={() => onChangeAlertBoxTextAlignment('center')}>
										<span className="fa fa-align-center k2-ib-alignment-icon-style k2-ib-active"></span>
									</div>
									<div className={'k2-ib-inspector-control-alignment-single'} onClick={() => onChangeAlertBoxTextAlignment('right')}>
										<span className="fa fa-align-right k2-ib-alignment-icon-style"></span>
									</div>
								</div>

					</PanelRow>
					<PanelRow>
						<BoxControl 
							label={'Padding'}
							value={AlertBoxPaddingCont}
							onChange={onChangeAlertBoxPaddingCont}
						/>
					</PanelRow>
					

				</PanelBody>
				{
					enableImage == false ?
					<PanelBody title={'Icon Colors'}>

						<ColorPopup 
								label={"Icon Color"}
								value={{ value: AlertBoxIconColor}}
								onChange = {onChangeIconColor}
								PropertyName={"background"}
							/>
						<ColorPopup 
							label={"Icon Background Color"}
							value={{ value: AlertIconBackgroundColor}}
							onChange = {onChangeAlertIconBackgroundColor}
							PropertyName={"background"}
						/>

					</PanelBody>
					:null
				}
				<PanelBody title={__("Text")} initialOpen={false}>
					<Card>
						<CardBody>
							<Flex>
								<ToggleControl 
									label="Enable Heading"
									checked={EnableAlertBoxHeading}
									onChange={onChangeEnableAlertBoxHeading}
								/>
							</Flex>
							{
								EnableAlertBoxHeading == true ?
								<div>
									
									<ColorPopup 
										label={"Text Color"}
										value={{ value: AlertBoxHeadingColor}}
										onChange = {onChangeAlertBoxHeadingColor}
										PropertyName={"background"}
									/>
									<RangeControl
										label={<strong>Heading Size</strong>}
										value={ AlertBoxHeadingSize }
										onChange={ onChangeAlertBoxHeadingSize }
										min={ 0.2 }
										max={ 5 }
										step ={0.1}
									/>
									<Flex>
										<FlexItem>
											<SelectControl
												label="Font Family"
												value={ AlertBoxHeadingFontFam }
												options={ GLOBAL_FONTS }
												onChange={ onChangeAlertBoxHeadingFontFam}
											/>
										</FlexItem>
										<FlexItem>
											<SelectControl
												label="Weight"
												value={ AlertBoxHeadingFontWeight }
												options={ FontWeightAvaibles }
												onChange={ onChangeAlertBoxHeadingFontWeight}
											/>
										</FlexItem>
									</Flex>
									<FlexItem>
										<RangeControl 
											label="Spacing"
											value={AlertHeadingSpacing}
											onChange={onChangeAlertHeadingSpacing}
										/>
									</FlexItem>
								</div>

								: null
							}
						</CardBody>
					</Card>
					<Card>
						<CardBody>
						<Flex>
							<FlexItem>
								<ToggleControl 
									label="Enable Text"
									checked={EnableAlertBoxText}
									onChange = {onChangeEnableAlertBoxText}

								/>
							</FlexItem>
						</Flex>
							<div>
							{
								EnableAlertBoxText == true ?
								<div>
									<ColorPopup 
										label={"Text Color"}
										value={{ value: AlertBoxTextColor}}
										onChange = {OnChangeAlertBoxTextColor}
										PropertyName={"background"}
									/>
									<RangeControl
										label={<strong>Text Size</strong>}
										value={ AlertBoxTextSize }
										onChange={ onChangeTextSize }
										min={ 0.2 }
										max={ 5 }
										step ={0.1}
									/>
									<Flex>
										<FlexItem>
											<SelectControl
												label="Font Family"
												value={ AlertBoxTextFontFamily }
												options={ GLOBAL_FONTS }
												onChange={ onChangeAlertBoxTextFontFamily}
											/>
										</FlexItem>
										<FlexItem>
											<SelectControl
												label="Weight"
												value={ AlertBoxTextFontWeight }
												options={ FontWeightAvaibles }
												onChange={ onChangeAlertBoxTextFontWeight}
											/>
										</FlexItem>
									</Flex>
									<Flex>
										<FlexItem>
											<SelectControl
												label="Style"
												value={ AlertBoxTextStyle }
												options={
													[
														{ label: 'Normal', value: 'Normal' },
														{ label: 'oblique', value: 'oblique' },
														{ label: 'italic', value: 'italic' },
													]
												}
												onChange={ onChangeAlertBoxTextFontStyle}
											/>
										</FlexItem>
										<FlexItem>
											<SelectControl
												label="Decoration"
												value={ AlertBoxTextDecoration }
												options={
													[
														{ label: 'None', value: 'None' },
														{ label: 'underline', value: 'underline' },
														{ label: 'overline', value: 'overline' },
														{ label: 'line-through', value: 'line-through' },
													]
												}
												onChange={ onChangeAlertBoxTextFontDecoration}
											/>
										</FlexItem>
									</Flex>
									<FlexItem>
										<RangeControl 
											label="Line Height"
											value={AlertBoxTextLineHeight}
											onChange={onChangeAlertBoxTextLineHeight}
										/>
									</FlexItem>
								</div>
								:null
							}
							</div>
						</CardBody>
					</Card>
				</PanelBody>
				<PanelBody title={'Border'}>
					<SelectControl
						label="Border Type"
						value={ AlertBoxBorderStyle }
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
						onChange={ onChangeAlertBoxBorderStyle}
					/>

					{
						(AlertBoxBorderStyle === 'None')?null:
							<div>
								<ColorPopup 
										label={"Border Color"}
										value={{ value: AlertBoxBorderColor}}
										onChange = {onChangeAlertBoxBorderColor}
										PropertyName={"background"}
								/>


								<RangeControl
									label={<strong>Border Width</strong>}
									value={ AlertBoxBorderWidth }
									onChange={ onChangeAlertBoxBorderWidth }
									min={ 0 }
									max={ 50 }
									step ={1}
								/>


								<RangeControl
									label={<strong>Border Radius</strong>}
									value={ AlertBoxBorderRadius }
									onChange={ onChangeAlertBoxBorderRadius }
									min={ 0 }
									max={ 50 }
									step ={1}
								/>
							</div>
					}
						<Card>
							<CardHeader>
								Box Shadow
							</CardHeader>
							<CardBody style={{paddig:'10px'}}>
								<ColorPalette 
									label={'Box Shadow Color'}
									value={AlertBoxShadow.color}
									onChange={(value) => onChangeAlertBoxShadow({ ...AlertBoxShadow, color: value })}
								/>
								<FlexBlock style={{marginTop:'20px'}}>
									<Flex style={{alignItems: 'normal'}}>
										<NumberControl 
											label={'X'}
											value={AlertBoxShadow.x}
											onChange={(value) => onChangeAlertBoxShadow({ ...AlertBoxShadow, x: value })}
										/>
										<NumberControl 
											label={'Y'}
											value={AlertBoxShadow.y}
											onChange={(value) => onChangeAlertBoxShadow({ ...AlertBoxShadow, y: value })}
										/>
										<NumberControl 
											label={'Blur'}
											value={AlertBoxShadow.blur}
											onChange={(value) => onChangeAlertBoxShadow({ ...AlertBoxShadow, blur: value })}
										/>
										<NumberControl 
											label={'Spread'}
											value={AlertBoxShadow.spread}
											onChange={(value) => onChangeAlertBoxShadow({ ...AlertBoxShadow, spread: value })}
										/>
									</Flex>
								</FlexBlock>
								<SelectControl 
									label={'Position'}
									options={[
										{value:"", label:"default"},
										{value:"inset", label: "inset"}
									]}
									value={AlertBoxShadow.position}
									onChange={(value) => onChangeAlertBoxShadow({ ...AlertBoxShadow, position: value })}

								/>
							</CardBody>
						</Card>

				</PanelBody>
				<PanelBody title={'Button'}>
					<ToggleControl 
						label={'Enable Button'}
						checked={alertBoxEnableButton}
						onChange={onChangealertBoxEnableButton}
					/>
					{
						alertBoxEnableButton == true ?
							<Card>
								<CardHeader>Button Link</CardHeader>
								<CardBody>
									<TextControl 
										value={AlertBoxButtonLink}
										onChange ={onChangeAlertBoxButtonLink}
									/>
								</CardBody>
								<CardHeader>Alignment</CardHeader>
								<CardBody>
									<div id = {'AlignmentIconsParent'} className={'k2-ib-inspector-control-alignment'} onClick={onChangeAlignmentIconChange}>
										<div className={'k2-ib-inspector-control-alignment-single'}  onClick={() => onChangeAlertBoxButtonAlignment('flex-start')}>
											<span className="fa fa-align-left k2-ib-alignment-icon-style" ></span>
										</div>
										<div className={'k2-ib-inspector-control-alignment-single'} onClick={() => onChangeAlertBoxButtonAlignment('center')}>
											<span className="fa fa-align-center k2-ib-alignment-icon-style k2-ib-active"></span>
										</div>
										<div className={'k2-ib-inspector-control-alignment-single'} onClick={() => onChangeAlertBoxButtonAlignment('flex-end')}>
											<span className="fa fa-align-right k2-ib-alignment-icon-style"></span>
										</div>
									</div>
								</CardBody>
								<CardHeader>Text</CardHeader>
								<CardBody>
									<RangeControl
										label="Font Size"
										value={alertBoxButtonfontSize}
										onChange={onChangealertBoxButtonfontSize}
										step={0.1}
									/>
									<Flex>
										<FlexItem>
											<SelectControl
												label="Font Family"
												value={AlertBoxButtonFontFamily}
												options={ GLOBAL_FONTS }
												onChange={onChangeAlertBoxButtonFontFamily}

											/>
										</FlexItem>
										<FlexItem>
											<SelectControl
												label="Font Weight"
												value={AlertBoxButtonFontWeight}
												options={ GLOBAL_FONTS_WEIGHTS }
												onChange={onChangeAlertBoxButtonFontWeight}

											/>
										</FlexItem>
									</Flex>
								</CardBody>
								<CardHeader>Color</CardHeader>
								<CardBody>
									<ColorPopup 
											label={"Text Color"}
											value={{ value: AlertBoxButtonTextColot}}
											onChange = {onChangeAlertBoxButtonTextColot}
											PropertyName={"background"}
									/>
									<ColorPopup 
											label={"Background Color"}
											value={{ value: AlertBoxButtonbackgroundColor}}
											onChange = {onChangeAlertBoxButtonbackgroundColor}
											PropertyName={"background"}
									/>
								</CardBody>
								<CardHeader>Border</CardHeader>
								<CardBody>
									<BorderBoxControl
										label="Borders"
										onChange={onChangeAlertBoxButtonBorder}
										value={AlertBoxButtonBorder}
										colors = {colorOptions}

									/>
									<RangeControl 
										label={'Border radius'}
										value={AlertBoxButtonBorderRadius}
										onChange={onChangeAlertBoxButtonBorderRadius}
									/>
								</CardBody>
								<CardHeader>Spacing</CardHeader>
								<CardBody>
									<BoxControl 
										label={'Padding'}
										value={AlertBoxButtonPadding}
										onChange={onChangeAlertBoxButtonPadding}
									/>
									<BoxControl 
										label={'Margin'}
										value={AlertBoxButtonMargin}
										onChange={onChangeAlertBoxButtonMargin}
									/>
								</CardBody>

							</Card>
						:null
					}
				</PanelBody>
				<PanelBody title={'Background'}>
					<ColorPopup 
						label={"Fill Color"}
						value={{ value: AlertBoxColor}}
						onChange = {onChangeAlertBoxColor}
						PropertyName={"background"}
					/>
				</PanelBody>

			</InspectorControls>,

			<div {...blockProps} style={WidgetContainerStyling} >

				<div style={SubWidgetStyling}>

					<div style={ParentContainerStyling} className={'k2-ib-container'}>
						<div style={mediaContainer}>
							{ enableImage == true ?
								<div className={"k2-ib-box"}>
									<img src={AlertBoxImageUrl} className="K2-image-Block" style={ALertImageStyles} />
							
								</div>
								:<div className={"k2-ib-box"}>
									<i style={AlertIconStyling} className={AlertBoxIconType}></i>
									
								</div>
							}
						</div>
						<div className='k2-ib-text-image-area' style={anotherextraStyle}>
							<div className='k2-ib-text-container' style={AlertBoxLayoutOptions   === 'Simple' ? textContainerStyle : ClassictextContainerStyle} >
								{
									EnableAlertBoxHeading == true ?
									<RichText 
										tagName="h3"
										value={AlertboxHeadingText}
										onChange={onChangeAlertboxHeadingText}
										style={headingStyles}

									/>
									: null
								}
								
								{
									EnableAlertBoxText == true ?
									<RichText
										tagName="p" // The tag here is the element output and editable in the admin
										value={ AlertBoxText } // Any existing content, either from the database or an attribute default
										className = {'k2-ib-box'}
										style = {AlertTextStyling}
										formattingControls={ [ 'bold', 'italic', 'link', 'text-color', 'text-highlight'] } // Allow the content to be made bold or italic, but do not allow other formatting options
										onChange={ onAlertBoxTextChange } // Store updated content as a block attribute
										placeholder={ __( 'This is Magik Alert Block' ) } // Display this text before any content has been added by the user
									/>
									:null

								}
							</div>
							{
							alertBoxEnableButton == true ?
							<div className='k2-ib-button-container' style={buttonContStyle}>
								<button style={ButtonStyles}>
									<RichText 
										onChange={onChangeAlrtBoxButtonText}
										value = {AlrtBoxButtonText}
										tagName='span'
										placeholder={_("View More...")}
									/>
								</button>

							</div>
						:null
						}
						</div>
						
						
						
					</div>
				</div>


			</div>
		]
	);
}
