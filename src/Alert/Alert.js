/**
 * BLOCK: progressbar
 *
 * Registering a basic Progress_Bar_Block with Gutenberg.
 * Simple Progress_Bar_Block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './editor.scss';
import './style.scss';
import { GLOBAL_FONTS } from '../Global_Fonts';
import { GLOBAL_ICONS} from '../Global_Icons';
import { GLOBAL_FONTS_WEIGHTS } from '../Global_Font_Weights';
import { useMemo } from '@wordpress/element';
import ColorPopup from '../components/ColorPopup';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType,
	// For attribute sources
} = wp.blocks;
const {
	RichText,
	InspectorControls,
	MediaUpload
} = wp.editor;

// const {
// 	PanelBody,
// 	RangeControl,
// 	SelectControl,
// 	Panel,
// 	PanelRow,
// 	ColorPicker,
// 	ColorPalette, 
// 	TextControl,
// 	TabPanel,
// 	Card,
//     CardBody,
//     CardHeader,
//     Flex, FlexBlock, FlexItem,
// 	ToggleControl,
// 	__experimentalNumberControl as NumberControl,
// } = wp.components;
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

const alertBoxIcon = (
    <svg width={800} height={800} viewBox="0 0 800 800">
      <image
        width={800}
        height={800}
        xlinkHref="data:image/png;base64,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 AElFTkSuQmCC"
      />
    </svg>
);

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new Progress_Bar_Block provided a unique name and an object defining its
 * behavior. Once registered, the Progress_Bar_Block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The Progress_Bar_Block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'k2/alert-block', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-Progress_Bar_Block.
	title: __( 'Info Box' ), // Block title.
	icon: {src:alertBoxIcon},
	category: 'k2-blocks', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'Alert blocks' ),
		__( 'Magik Blocks' ),
	],
	attributes: {
		AlertBoxImageUrl:{
			type:"string",
			default:""
		},
		AlertBoxText: {
			type: 'string',
			default: 'Hello, I am an info box with an icon and text. '
		},
		AlertBoxColor: {
			type: 'string',
			default: '#C4DADC'
		},
		AlertBoxBorderColor: {
			type: 'string',
			default: 'green'
		},
		AlertBoxTextColor: {
			type: 'string',
			default: '#ffffff'
		},
		AlertBoxIconSize: {
			type: 'number',
			default: 3
		},
		AlertBoxTextSize: {
			type: 'number',
			default: 2
		},
		AlertBoxIconColor: {
			type: 'string',
			default: '#1995AD'
		},
		AlertBoxIconType:{
			type: 'string',
			default: 'fa fa-rocket'
		},
		AlertBoxIconSpacing:{
			type: 'number',
			default: 0
		},
		AlertBoxLayoutOptions:{
			type: 'string',
			default: 'Classic'
		},
		AlertBoxLayoutAttribute:{
			type: 'string',
			default: 'column'
		},
		AlertBoxClassicAlignment: {
			type: 'string',
			default: 'center'
		},
		AlertBoxSimpleAlignment: {
			type: 'string',
			default: 'center'
		},
		AlertBoxBorderStyle: {
			type: 'string',
			default: 'None'
		},
		AlertBoxBorderWidth: {
			type: 'number',
			default: 2
		},
		AlertBoxBorderRadius: {
			type: 'number',
			default: 16
		},
		AlertBoxWidgetWidth: {
			type: 'number',
			default: 60
		},
		AlertIconBackgroundColor: {
			type: 'string',
			default: 'white'
		},
		AlertIconBackgroundBorderRadius: {
			type:'number',
			default: 10
		},
		AlertBoxTextFontFamily: {
			type: 'string',
			default: 'Gill Sans'
		},
		AlertBoxTextFontWeight: {
			type: 'string',
			default: 'normal'
		},
		AlertBoxTextStyle: {
			type: 'number',
			default: 'normal'
		},
		AlertBoxTextDecoration: {
			type: 'string',
			default: 'None'
		},
		AlertBoxTextLineHeight:{
			type:"number",
			default: 22
		},
		AlertBoxWidth: {
			type: 'number',
			default: 50
		},
		AlertBoxWidgetAlignment: {
			type: 'string',
			default: 'center'
		},
		AlertBoxTextAlignment:{
			type:"string",
			default:"center"
		},
		enableImage: {
			type:"boolean",
			default: false
		},
		imageSize: {
			type:"numeber",
			default: 100
		},
		AlertBoxMediaSpacing: {
			type: "number"
		},
		EnableAlertBoxText: {
			type: "boolean",
			default:false
		},
		EnableAlertBoxHeading: {
			type: "boolean",
			default: true
		},
		AlertboxHeadingText:{
			type:"string",
			default:"Info Box Heading"
		},
		AlertBoxHeadingColor:{
			type:"string",
			default:"#000"
		},
		AlertBoxHeadingSize:{
			type:"number",
			default: 2
		},
		AlertBoxHeadingFontFam:{
			tyep: "string"
		},
		AlertBoxHeadingFontWeight:{
			type: "string"
		},
		AlertHeadingSpacing: {
			type:"number"
		},
		AlertBoxShadow:{
			type: "object",
			default: { x:"1", y:"1", blur:"3", spread:"4", color: "#0FAE96", position: "default"}
		},
		AlertBoxImageBorderRadius:{
			type:"number",
			default:10
		},
		AlertBoxPaddingCont:{
			type:"object",
			default: {top: '8px', right: "8px", bottom: "8px", left: "8px"}
		},
		alertBoxEnableButton:{
			type:'boolean',
			default:false
		},
		AlrtBoxButtonText:{
			type:"string",
		},
		AlertBoxButtonLink:{
			type:"string",
			default:"https://k2blocks.com/"
		},
		AlertBoxButtonAlignment:{
			type:"string",
			default:"center"
		},
		alertBoxButtonfontSize:{
			type:"number",
			default:1.4
		},
		AlertBoxButtonFontFamily:{
			type:"string"
		},
		AlertBoxButtonFontWeight:{
			type:"string",
			default:"600"
		},
		AlertBoxButtonTextColot:{
			type:"string",
			default:"#FFFFFF"
		},
		AlertBoxButtonbackgroundColor:{
			type:"string",
			default:"#3D6AFF"
		},
		AlertBoxButtonPadding:{
			type:"object",
			default: {top: '10px', right: "20px", bottom: "10px", left: "20px"}
		},
		AlertBoxButtonMargin:{
			type:"object",
			default: {top: '20px', right: "0px", bottom: "0px", left: "0px"}
		},
		AlertBoxButtonBorder:{
            type:"object",
            default: {color: "#3D6AFF", style: "solid", width: "1px"}
        },
		AlertBoxButtonBorderRadius:{
			type:"number",
			default:8
		}
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

		const {Content} = attributes

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
		// 	justifyContent: attributes.AlertBoxWidgetAlignment
		// }

		const WidgetContainerStyling = useMemo(
			() => ({
				justifyContent: attributes.AlertBoxWidgetAlignment
			}),
			[attributes.AlertBoxWidgetAlignment]
		);
		
		const colorOptions = [
            { name: 'blue', color: '#00f' },
            { name: 'black', color: '#000' },
            { name: 'Purple', color: '#2C2A4A' },
            { name: 'Light Purple', color: '#4F518C' },
        ]
		const ParentContainerStyling = useMemo(
			() => ({
			  backgroundColor: attributes.AlertBoxColor,
			  borderColor: attributes.AlertBoxBorderColor,
			  flexDirection: attributes.AlertBoxLayoutAttribute,
			  alignItems: attributes.AlertBoxClassicAlignment,
			  justifyContent: attributes.AlertBoxSimpleAlignment,
			  borderStyle: attributes.AlertBoxBorderStyle,
			  borderWidth: attributes.AlertBoxBorderWidth + 'px',
			  borderRadius: attributes.AlertBoxBorderRadius + 'px',
			  boxShadow: `${attributes.AlertBoxShadow.x}px ${attributes.AlertBoxShadow.y}px ${attributes.AlertBoxShadow.blur}px ${attributes.AlertBoxShadow.spread}px ${attributes.AlertBoxShadow.color} ${attributes.AlertBoxShadow.position}`,
			  paddingTop: attributes.AlertBoxPaddingCont.top,
			  paddingRight: attributes.AlertBoxPaddingCont.right,
			  paddingBottom: attributes.AlertBoxPaddingCont.bottom,
			  paddingLeft: attributes.AlertBoxPaddingCont.left,
			}),
			[
			  attributes.AlertBoxColor,
			  attributes.AlertBoxBorderColor,
			  attributes.AlertBoxLayoutAttribute,
			  attributes.AlertBoxClassicAlignment,
			  attributes.AlertBoxSimpleAlignment,
			  attributes.AlertBoxBorderStyle,
			  attributes.AlertBoxBorderWidth,
			  attributes.AlertBoxBorderRadius,
			  attributes.AlertBoxShadow,
			  attributes.AlertBoxPaddingCont,
			]
		  );
		
		// const ParentContainerStyling = {
		// 	backgroundColor: attributes.AlertBoxColor,
		// 	borderColor: attributes.AlertBoxBorderColor,
		// 	flexDirection: attributes.AlertBoxLayoutAttribute,
		// 	alignItems: attributes.AlertBoxClassicAlignment,
		// 	justifyContent: attributes.AlertBoxSimpleAlignment,
		// 	borderStyle: attributes.AlertBoxBorderStyle,
		// 	borderWidth: attributes.AlertBoxBorderWidth + 'px',
		// 	borderRadius: attributes.AlertBoxBorderRadius + 'px',
		// 	boxShadow: `${attributes.AlertBoxShadow.x}px ${attributes.AlertBoxShadow.y}px ${attributes.AlertBoxShadow.blur}px ${attributes.AlertBoxShadow.spread}px ${attributes.AlertBoxShadow.color} ${attributes.AlertBoxShadow.position}`,
		// 	paddingTop: attributes.AlertBoxPaddingCont.top,
		// 	paddingRight: attributes.AlertBoxPaddingCont.right,
		// 	paddingBottom: attributes.AlertBoxPaddingCont.bottom,
		// 	paddingLeft: attributes.AlertBoxPaddingCont.left

		// }
		const anotherextraStyle ={
			// flexDirection: attributes.AlertBoxLayoutAttribute,
			// alignItems: attributes.AlertBoxClassicAlignment,
		}
		// const AlertIconStyling = {
		// 	fontSize: attributes.AlertBoxIconSize + 'rem',
		// 	color: attributes.AlertBoxIconColor,
		// 	backgroundColor: attributes.AlertIconBackgroundColor,
		// 	borderRadius: attributes.AlertIconBackgroundBorderRadius,
		// 	padding: '0.2em'
		// }
		// const ALertImageStyles ={
		// 	width: attributes.imageSize + '%',
		// 	borderRadius: attributes.AlertBoxImageBorderRadius + 'px'
		// }
		// const AlertTextStyling = {
		// 	display: 'block',
		// 	fontSize: attributes.AlertBoxTextSize + 'rem',
		// 	color: attributes.AlertBoxTextColor,
		// 	fontFamily: attributes.AlertBoxTextFontFamily,
		// 	fontWeight: attributes.AlertBoxTextFontWeight,
		// 	fontStyle: attributes.AlertBoxTextStyle,
		// 	textDecoration: attributes.AlertBoxTextDecoration,
		// 	wordWrap: 'break-word',
		// 	lineHeight: attributes.AlertBoxTextLineHeight +"px"
		// }
		// const textContainerStyle = {
		// 	paddingLeft: attributes.AlertBoxIconSpacing + 'em',
		// 	textAlign: attributes.AlertBoxTextAlignment
		// }
		const AlertIconStyling = useMemo(
			() => ({
			  fontSize: attributes.AlertBoxIconSize + 'rem',
			  color: attributes.AlertBoxIconColor,
			  backgroundColor: attributes.AlertIconBackgroundColor,
			  borderRadius: attributes.AlertIconBackgroundBorderRadius,
			  padding: '0.2em',
			}),
			[
			  attributes.AlertBoxIconSize,
			  attributes.AlertBoxIconColor,
			  attributes.AlertIconBackgroundColor,
			  attributes.AlertIconBackgroundBorderRadius,
			]
		  );
	
		const ALertImageStyles = useMemo(
		() => ({
			width: attributes.imageSize + '%',
			borderRadius: attributes.AlertBoxImageBorderRadius + 'px',
		}),
		[attributes.imageSize, attributes.AlertBoxImageBorderRadius]
		);
	
		const AlertTextStyling = useMemo(
		() => ({
			display: 'block',
			fontSize: attributes.AlertBoxTextSize + 'rem',
			color: attributes.AlertBoxTextColor,
			fontFamily: attributes.AlertBoxTextFontFamily,
			fontWeight: attributes.AlertBoxTextFontWeight,
			fontStyle: attributes.AlertBoxTextStyle,
			textDecoration: attributes.AlertBoxTextDecoration,
			wordWrap: 'break-word',
			lineHeight: attributes.AlertBoxTextLineHeight + 'px',
		}),
		[
			attributes.AlertBoxTextSize,
			attributes.AlertBoxTextColor,
			attributes.AlertBoxTextFontFamily,
			attributes.AlertBoxTextFontWeight,
			attributes.AlertBoxTextStyle,
			attributes.AlertBoxTextDecoration,
			attributes.AlertBoxTextLineHeight,
		]
		);
	
		const textContainerStyle = useMemo(
		() => ({
			paddingLeft: attributes.AlertBoxIconSpacing + 'em',
			textAlign: attributes.AlertBoxTextAlignment,
		}),
		[attributes.AlertBoxIconSpacing, attributes.AlertBoxTextAlignment]
		);
		//if not Simple
		const ClassictextContainerStyle = useMemo(
			() => ({
			// paddingLeft: attributes.AlertBoxIconSpacing + 'em',
			textAlign: attributes.AlertBoxTextAlignment
		}),
		[attributes.AlertBoxTextAlignment]
		);
		// const SubWidgetStyling = {
		// 	width: attributes.AlertBoxWidth + '%'
		// }
		const SubWidgetStyling = useMemo(
			() => ({
				width: attributes.AlertBoxWidth + '%'
			}),
			[attributes.AlertBoxWidth]
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
			if ( attributes.AlertBoxLayoutOptions === 'Classic'){
				setAttributes({
					AlertBoxClassicAlignment: NewAllignment
				})
			}else if (attributes.AlertBoxLayoutOptions === 'Simple'){
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
		// 	backgroundImage: 'url("' + attributes.AlertBoxImageUrl + '")'
		// }
		const imageupload = useMemo(
			() => ({
				backgroundImage: 'url("' + attributes.AlertBoxImageUrl + '")'
		}),
		[attributes.AlertBoxImageUrl]
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
				marginBottom: attributes.AlertBoxMediaSpacing
		}),
		[attributes.AlertBoxMediaSpacing]
		);
		// const mediaContainer = {
		// 	marginBottom: attributes.AlertBoxMediaSpacing
		// }
		function onChangeAlertBoxTextLineHeight( newLineheight) {
			setAttributes({AlertBoxTextLineHeight: newLineheight})
		}
		// const headingStyles = {
		// 	fontSize: attributes.AlertBoxHeadingSize+"rem",
		// 	color: attributes.AlertBoxHeadingColor,
		// 	fontFamily: attributes.AlertBoxHeadingFontFam,
		// 	fontWeight: attributes.AlertBoxHeadingFontWeight,
		// 	marginBottom: attributes.AlertHeadingSpacing+"px",
		// 	marginTop:'0px'
		// }	
		const headingStyles = useMemo(
			() => ({
				fontSize: attributes.AlertBoxHeadingSize+"rem",
				color: attributes.AlertBoxHeadingColor,
				fontFamily: attributes.AlertBoxHeadingFontFam,
				fontWeight: attributes.AlertBoxHeadingFontWeight,
				marginBottom: attributes.AlertHeadingSpacing+"px",
				marginTop:'0px'
		}),
		[attributes.AlertBoxHeadingSize, attributes.AlertBoxHeadingColor, attributes.AlertBoxHeadingFontFam,
			attributes.AlertBoxHeadingFontWeight,  attributes.AlertHeadingSpacing]
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

		// const ButtonStyles = {
		// 	fontSize: attributes.alertBoxButtonfontSize + 'rem',
		// 	fontFamily: attributes.AlertBoxButtonFontFamily,
		// 	fontWeight: attributes.AlertBoxButtonFontWeight,
		// 	color: attributes.AlertBoxButtonTextColot,
		// 	backgroundColor: attributes.AlertBoxButtonbackgroundColor,
		// 	paddingTop: attributes.AlertBoxButtonPadding.top,
		// 	paddingRight: attributes.AlertBoxButtonPadding.right,
		// 	paddingBottom: attributes.AlertBoxButtonPadding.bottom,
		// 	paddingLeft: attributes.AlertBoxButtonPadding.left,
		// 	borderColor:attributes.AlertBoxButtonBorder.color,
		// 	borderStyle:attributes.AlertBoxButtonBorder.style,
		// 	borderWidth: attributes.AlertBoxButtonBorder.width,
		// 	borderRadius: attributes.AlertBoxButtonBorderRadius + 'px'
		// }
		const ButtonStyles = useMemo(
			() => ({
				fontSize: attributes.alertBoxButtonfontSize + 'rem',
				fontFamily: attributes.AlertBoxButtonFontFamily,
				fontWeight: attributes.AlertBoxButtonFontWeight,
				color: attributes.AlertBoxButtonTextColot,
				backgroundColor: attributes.AlertBoxButtonbackgroundColor,
				paddingTop: attributes.AlertBoxButtonPadding.top,
				paddingRight: attributes.AlertBoxButtonPadding.right,
				paddingBottom: attributes.AlertBoxButtonPadding.bottom,
				paddingLeft: attributes.AlertBoxButtonPadding.left,
				borderColor:attributes.AlertBoxButtonBorder.color,
				borderStyle:attributes.AlertBoxButtonBorder.style,
				borderWidth: attributes.AlertBoxButtonBorder.width,
				borderRadius: attributes.AlertBoxButtonBorderRadius + 'px'
		}),
		[attributes.alertBoxButtonfontSize, attributes.AlertBoxButtonFontFamily,  attributes.AlertBoxButtonFontWeight,
			attributes.AlertBoxButtonTextColot,  attributes.AlertBoxButtonTextColot,
			attributes.AlertBoxButtonbackgroundColor,
			attributes.AlertBoxButtonPadding.top,
			attributes.AlertBoxButtonPadding.right,
			attributes.AlertBoxButtonPadding.bottom,
			attributes.AlertBoxButtonPadding.left,
			attributes.AlertBoxButtonBorder.color,
			attributes.AlertBoxButtonBorder.style,
			attributes.AlertBoxButtonBorder.width,
			attributes.AlertBoxButtonBorderRadius
		]
		);
		// const buttonContStyle = {
		// 	justifyContent: attributes.AlertBoxButtonAlignment,
		// 	marginTop: attributes.AlertBoxButtonMargin.top,
		// 	marginRight: attributes.AlertBoxButtonMargin.right,
		// 	marginBottom: attributes.AlertBoxButtonMargin.bottom,
		// 	marginLeft: attributes.AlertBoxButtonMargin.left,
		// }

		const buttonContStyle = useMemo(
			() => ({
				justifyContent: attributes.AlertBoxButtonAlignment,
				marginTop: attributes.AlertBoxButtonMargin.top,
				marginRight: attributes.AlertBoxButtonMargin.right,
				marginBottom: attributes.AlertBoxButtonMargin.bottom,
				marginLeft: attributes.AlertBoxButtonMargin.left,
		}),
		[attributes.AlertBoxButtonAlignment, attributes.AlertBoxButtonMargin.top, attributes.AlertBoxButtonMargin.right,
			attributes.AlertBoxButtonMargin.bottom,  attributes.AlertBoxButtonMargin.left]
		);
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
															return <span className={'fa '+value}></span>
														})}
													</div>
												</div>												
											</div>
											:
											<div>
												<ToggleControl 
													label="Enable Image"
													checked={attributes.enableImage}
													onChange = {onChangeenableImage}
													
												/>
												{
													attributes.enableImage == true ?
													<MediaUpload 
														accept = "image/*"
														allowedTypes={ [ 'image' ] }
														value = {attributes.AlertBoxImageUrl}
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
								value={ attributes.AlertBoxLayoutOptions }
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
								value={ attributes.AlertBoxWidth }
								onChange={ onChangeAlertBoxWidth }
								min={ 1 }
								max={ 100 }
								step ={1}
							/>

							{
								attributes.enableImage == false ?
								<div>
									<RangeControl
										label={<strong>Icon Size</strong>}
										value={ attributes.AlertBoxIconSize }
										onChange={ onChangeIconSize }
										min={ 0.2 }
										max={ 15 }
										step ={0.1}
									/>
									<RangeControl
										label={<strong>Icon Radius</strong>}
										value={ attributes.AlertIconBackgroundBorderRadius }
										onChange={ onChangeAlertIconBackgroundBorderRadius }
										min={ 0 }
										max={ 50 }
										step ={1}
									/>
								</div>
								: <div>
									<RangeControl 
											label={<strong>Image Size</strong>}
											value={attributes.imageSize}
											onChange={onChangeImageSize}
											min={ 0.2 }
											max={ 100 }
											step ={0.1}
										/>
									<RangeControl 
										label={"Image Border Radius"}
										value={attributes.AlertBoxImageBorderRadius}
										onChange={onChangeAlertBoxImageBorderRadius}
									/>

								</div> 
								
									
							}
							<RangeControl 
								label="Spacing"
								value={attributes.AlertBoxMediaSpacing}
								onChange= {onChangeAlertBoxMediaSpacing}
							/>


							{
								(attributes.AlertBoxLayoutOptions === 'Simple')?
									<div>
										<RangeControl
											label={<strong>Icon Spacing</strong>}
											value={ attributes.AlertBoxIconSpacing }
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
									value={attributes.AlertBoxPaddingCont}
									onChange={onChangeAlertBoxPaddingCont}
								/>
							</PanelRow>
							

						</PanelBody>
						{
							attributes.enableImage == false ?
							<PanelBody title={'Icon Colors'}>

								<ColorPopup 
										label={"Icon Color"}
										value={{ value: attributes.AlertBoxIconColor}}
										onChange = {onChangeIconColor}
										PropertyName={"background"}
									/>
								<ColorPopup 
									label={"Icon Background Color"}
									value={{ value: attributes.AlertIconBackgroundColor}}
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
											checked={attributes.EnableAlertBoxHeading}
											onChange={onChangeEnableAlertBoxHeading}
										/>
									</Flex>
									{
										attributes.EnableAlertBoxHeading == true ?
										<div>
											
											<ColorPopup 
												label={"Text Color"}
												value={{ value: attributes.AlertBoxHeadingColor}}
												onChange = {onChangeAlertBoxHeadingColor}
												PropertyName={"background"}
											/>
											<RangeControl
												label={<strong>Heading Size</strong>}
												value={ attributes.AlertBoxHeadingSize }
												onChange={ onChangeAlertBoxHeadingSize }
												min={ 0.2 }
												max={ 5 }
												step ={0.1}
											/>
											<Flex>
												<FlexItem>
													<SelectControl
														label="Font Family"
														value={ attributes.AlertBoxHeadingFontFam }
														options={ GLOBAL_FONTS }
														onChange={ onChangeAlertBoxHeadingFontFam}
													/>
												</FlexItem>
												<FlexItem>
													<SelectControl
														label="Weight"
														value={ attributes.AlertBoxHeadingFontWeight }
														options={ FontWeightAvaibles }
														onChange={ onChangeAlertBoxHeadingFontWeight}
													/>
												</FlexItem>
											</Flex>
											<FlexItem>
												<RangeControl 
													label="Spacing"
													value={attributes.AlertHeadingSpacing}
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
											checked={attributes.EnableAlertBoxText}
											onChange = {onChangeEnableAlertBoxText}

										/>
									</FlexItem>
								</Flex>
									<div>
									{
										attributes.EnableAlertBoxText == true ?
										<div>
											<ColorPopup 
												label={"Text Color"}
												value={{ value: attributes.AlertBoxTextColor}}
												onChange = {OnChangeAlertBoxTextColor}
												PropertyName={"background"}
											/>
											<RangeControl
												label={<strong>Text Size</strong>}
												value={ attributes.AlertBoxTextSize }
												onChange={ onChangeTextSize }
												min={ 0.2 }
												max={ 5 }
												step ={0.1}
											/>
											<Flex>
												<FlexItem>
													<SelectControl
														label="Font Family"
														value={ attributes.AlertBoxTextFontFamily }
														options={ GLOBAL_FONTS }
														onChange={ onChangeAlertBoxTextFontFamily}
													/>
												</FlexItem>
												<FlexItem>
													<SelectControl
														label="Weight"
														value={ attributes.AlertBoxTextFontWeight }
														options={ FontWeightAvaibles }
														onChange={ onChangeAlertBoxTextFontWeight}
													/>
												</FlexItem>
											</Flex>
											<Flex>
												<FlexItem>
													<SelectControl
														label="Style"
														value={ attributes.AlertBoxTextStyle }
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
														value={ attributes.AlertBoxTextDecoration }
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
													value={attributes.AlertBoxTextLineHeight}
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
								value={ attributes.AlertBoxBorderStyle }
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
								(attributes.AlertBoxBorderStyle === 'None')?null:
									<div>
										<ColorPopup 
												label={"Border Color"}
												value={{ value: attributes.AlertBoxBorderColor}}
												onChange = {onChangeAlertBoxBorderColor}
												PropertyName={"background"}
										/>


										<RangeControl
											label={<strong>Border Width</strong>}
											value={ attributes.AlertBoxBorderWidth }
											onChange={ onChangeAlertBoxBorderWidth }
											min={ 0 }
											max={ 50 }
											step ={1}
										/>


										<RangeControl
											label={<strong>Border Radius</strong>}
											value={ attributes.AlertBoxBorderRadius }
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
											value={attributes.AlertBoxShadow.color}
											onChange={(value) => onChangeAlertBoxShadow({ ...attributes.AlertBoxShadow, color: value })}
										/>
										<FlexBlock style={{marginTop:'20px'}}>
											<Flex style={{alignItems: 'normal'}}>
												<NumberControl 
													label={'X'}
													value={attributes.AlertBoxShadow.x}
													onChange={(value) => onChangeAlertBoxShadow({ ...attributes.AlertBoxShadow, x: value })}
												/>
												<NumberControl 
													label={'Y'}
													value={attributes.AlertBoxShadow.y}
													onChange={(value) => onChangeAlertBoxShadow({ ...attributes.AlertBoxShadow, y: value })}
												/>
												<NumberControl 
													label={'Blur'}
													value={attributes.AlertBoxShadow.blur}
													onChange={(value) => onChangeAlertBoxShadow({ ...attributes.AlertBoxShadow, blur: value })}
												/>
												<NumberControl 
													label={'Spread'}
													value={attributes.AlertBoxShadow.spread}
													onChange={(value) => onChangeAlertBoxShadow({ ...attributes.AlertBoxShadow, spread: value })}
												/>
											</Flex>
										</FlexBlock>
										<SelectControl 
											label={'Position'}
											options={[
												{value:"", label:"default"},
												{value:"inset", label: "inset"}
											]}
											value={attributes.AlertBoxShadow.position}
											onChange={(value) => onChangeAlertBoxShadow({ ...attributes.AlertBoxShadow, position: value })}

										/>
									</CardBody>
								</Card>

						</PanelBody>
						<PanelBody title={'Button'}>
							<ToggleControl 
								label={'Enable Button'}
								checked={attributes.alertBoxEnableButton}
								onChange={onChangealertBoxEnableButton}
							/>
							{
								attributes.alertBoxEnableButton == true ?
									<Card>
										<CardHeader>Button Link</CardHeader>
										<CardBody>
											<TextControl 
												value={attributes.AlertBoxButtonLink}
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
												value={attributes.alertBoxButtonfontSize}
												onChange={onChangealertBoxButtonfontSize}
												step={0.1}
											/>
											<Flex>
												<FlexItem>
													<SelectControl
														label="Font Family"
														value={attributes.AlertBoxButtonFontFamily}
														options={ GLOBAL_FONTS }
														onChange={onChangeAlertBoxButtonFontFamily}

													/>
												</FlexItem>
												<FlexItem>
													<SelectControl
														label="Font Weight"
														value={attributes.AlertBoxButtonFontWeight}
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
													value={{ value: attributes.AlertBoxButtonTextColot}}
													onChange = {onChangeAlertBoxButtonTextColot}
													PropertyName={"background"}
											/>
											<ColorPopup 
													label={"Background Color"}
													value={{ value: attributes.AlertBoxButtonbackgroundColor}}
													onChange = {onChangeAlertBoxButtonbackgroundColor}
													PropertyName={"background"}
											/>
										</CardBody>
										<CardHeader>Border</CardHeader>
										<CardBody>
											<BorderBoxControl
												label="Borders"
												onChange={onChangeAlertBoxButtonBorder}
												value={attributes.AlertBoxButtonBorder}
												colors = {colorOptions}

											/>
											<RangeControl 
												label={'Border radius'}
												value={attributes.AlertBoxButtonBorderRadius}
												onChange={onChangeAlertBoxButtonBorderRadius}
											/>
										</CardBody>
										<CardHeader>Spacing</CardHeader>
										<CardBody>
											<BoxControl 
												label={'Padding'}
												value={attributes.AlertBoxButtonPadding}
												onChange={onChangeAlertBoxButtonPadding}
											/>
											<BoxControl 
												label={'Margin'}
												value={attributes.AlertBoxButtonMargin}
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
								value={{ value: attributes.AlertBoxColor}}
								onChange = {onChangeAlertBoxColor}
								PropertyName={"background"}
							/>
						</PanelBody>

					</InspectorControls>,

					<div style={WidgetContainerStyling} className={'k2-ib-widget-container'}>

						<div style={SubWidgetStyling}>

							<div style={ParentContainerStyling} className={'k2-ib-container'}>
								<div style={mediaContainer}>
									{ attributes.enableImage == true ?
										<div className={"k2-ib-box"}>
											<img src={attributes.AlertBoxImageUrl} className="K2-image-Block" style={ALertImageStyles} />
									
										</div>
										:<div className={"k2-ib-box"}>
											<i style={AlertIconStyling} className={attributes.AlertBoxIconType}></i>
											
										</div>
									}
								</div>
								<div className='k2-ib-text-image-area' style={anotherextraStyle}>
									<div className='k2-ib-text-container' style={attributes.AlertBoxLayoutOptions   === 'Simple' ? textContainerStyle : ClassictextContainerStyle} >
										{
											attributes.EnableAlertBoxHeading == true ?
											<RichText 
												tagName="h3"
												value={attributes.AlertboxHeadingText}
												onChange={onChangeAlertboxHeadingText}
												style={headingStyles}

											/>
											: null
										}
										
										{
											attributes.EnableAlertBoxText == true ?
											<RichText
												tagName="p" // The tag here is the element output and editable in the admin
												value={ attributes.AlertBoxText } // Any existing content, either from the database or an attribute default
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
									attributes.alertBoxEnableButton == true ?
									<div className='k2-ib-button-container' style={buttonContStyle}>
										<button style={ButtonStyles}>
											<RichText 
												onChange={onChangeAlrtBoxButtonText}
												value = {attributes.AlrtBoxButtonText}
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
			)


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
	save ({attributes}) {

		const WidgetContainerStyling = {
			justifyContent: attributes.AlertBoxWidgetAlignment
		}
		const ParentContainerStyling = {
			backgroundColor: attributes.AlertBoxColor,
			borderColor: attributes.AlertBoxBorderColor,
			flexDirection: attributes.AlertBoxLayoutAttribute,
			alignItems: attributes.AlertBoxClassicAlignment,
			justifyContent: attributes.AlertBoxSimpleAlignment,
			borderStyle: attributes.AlertBoxBorderStyle,
			borderWidth: attributes.AlertBoxBorderWidth + 'px',
			borderRadius: attributes.AlertBoxBorderRadius + 'px',
			boxShadow: `${attributes.AlertBoxShadow.x}px ${attributes.AlertBoxShadow.y}px ${attributes.AlertBoxShadow.blur}px ${attributes.AlertBoxShadow.spread}px ${attributes.AlertBoxShadow.color} ${attributes.AlertBoxShadow.position}`,
			paddingTop: attributes.AlertBoxPaddingCont.top,
			paddingRight: attributes.AlertBoxPaddingCont.right,
			paddingBottom: attributes.AlertBoxPaddingCont.bottom,
			paddingLeft: attributes.AlertBoxPaddingCont.left
		}
		const anotherextraStyle ={
			// flexDirection: attributes.AlertBoxLayoutAttribute,
			// alignItems: attributes.AlertBoxClassicAlignment,
		}

		const AlertIconStyling = {
			fontSize: attributes.AlertBoxIconSize + 'rem',
			color: attributes.AlertBoxIconColor,
			backgroundColor: attributes.AlertIconBackgroundColor,
			borderRadius: attributes.AlertIconBackgroundBorderRadius,
			padding: '0.2em'
		}

		const AlertTextStyling = {
			display: 'block',
			fontSize: attributes.AlertBoxTextSize + 'rem',
			color: attributes.AlertBoxTextColor,
			paddingLeft: attributes.AlertBoxIconSpacing + 'em',
			wordWrap: 'break-word',
			lineHeight: attributes.AlertBoxTextLineHeight +"px"
		}

		const SubWidgetStyling = {
			width: attributes.AlertBoxWidth + '%'
		}
		const headingStyles = {
			fontSize: attributes.AlertBoxHeadingSize+"rem",
			color: attributes.AlertBoxHeadingColor,
			fontFamily: attributes.AlertBoxHeadingFontFam,
			fontWeight: attributes.AlertBoxHeadingFontWeight,
			marginBottom: attributes.AlertHeadingSpacing+"px"
		}	
		const mediaContainer = {
			marginBottom: attributes.AlertBoxMediaSpacing
		}
		const ALertImageStyles ={
			width: attributes.imageSize + '%',
			borderRadius: attributes.AlertBoxImageBorderRadius + 'px'
		}
		const textContainerStyle = {
			paddingLeft: attributes.AlertBoxIconSpacing + 'em',
			textAlign: attributes.AlertBoxTextAlignment
		}
		//if not Simple
		const ClassictextContainerStyle = {
			// paddingLeft: attributes.AlertBoxIconSpacing + 'em',
			textAlign: attributes.AlertBoxTextAlignment
		}
		const ButtonStyles = {
			fontSize: attributes.alertBoxButtonfontSize + 'rem',
			fontFamily: attributes.AlertBoxButtonFontFamily,
			fontWeight: attributes.AlertBoxButtonFontWeight,
			color: attributes.AlertBoxButtonTextColot,
			backgroundColor: attributes.AlertBoxButtonbackgroundColor,
			paddingTop: attributes.AlertBoxButtonPadding.top,
			paddingRight: attributes.AlertBoxButtonPadding.right,
			paddingBottom: attributes.AlertBoxButtonPadding.bottom,
			paddingLeft: attributes.AlertBoxButtonPadding.left,
			borderColor:attributes.AlertBoxButtonBorder.color,
			borderStyle:attributes.AlertBoxButtonBorder.style,
			borderWidth: attributes.AlertBoxButtonBorder.width,
			borderRadius: attributes.AlertBoxButtonBorderRadius + 'px'
		}
		const buttonContStyle = {
			justifyContent: attributes.AlertBoxButtonAlignment,
			marginTop: attributes.AlertBoxButtonMargin.top,
			marginRight: attributes.AlertBoxButtonMargin.right,
			marginBottom: attributes.AlertBoxButtonMargin.bottom,
			marginLeft: attributes.AlertBoxButtonMargin.left,
		}
		var link = attributes.AlertBoxButtonLink

		var sup = "parent.open('" + link + "')"


		return <div  style={WidgetContainerStyling} className={'k2-ib-widget-container'}>
			<div style={SubWidgetStyling}>

				<div style={ParentContainerStyling} className={'k2-ib-container'}>
						<div style={mediaContainer}>
							{ attributes.enableImage == true ?
								<div className={"k2-ib-box"}>
									<img src={attributes.AlertBoxImageUrl} className="K2-image-Block" style={ALertImageStyles} />
							
								</div>
								:<div className={"k2-ib-box"}>
									<i style={AlertIconStyling} className={attributes.AlertBoxIconType}></i>
									
								</div>
							}
						</div>
					<div className='k2-ib-text-image-area' style={anotherextraStyle}>
						<div className='' style={attributes.AlertBoxLayoutOptions   === 'Simple' ? textContainerStyle : ClassictextContainerStyle} >
							{
								attributes.EnableAlertBoxHeading == true ?
									<RichText.Content 
										tagName="h3"
										value = {attributes.AlertboxHeadingText}
										style = {headingStyles}
									/>
								:null
								}
								{
								attributes.EnableAlertBoxText == true ?
									<RichText.Content
										tagName="p" // The tag here is the element output and editable in the admin
										value={ attributes.AlertBoxText } // Any existing content, either from the database or an attribute default
										className = {'k2-ib-box'}
										style = {AlertTextStyling}
									/>
								:null
							}
						</div>
						{
							attributes.alertBoxEnableButton == true ?
								<div className='k2-ib-button-container' style={buttonContStyle}>
									<button style={ButtonStyles} onClick={sup}>
										<RichText.Content
											value = {attributes.AlrtBoxButtonText}
											tagName='span'
										/>
									</button>

								</div>
							:null
						}
					</div>
				</div>
			</div>

		</div>




	},


} );