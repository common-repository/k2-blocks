

//  Import CSS.
import './editor.scss';
import './style.scss';
import { GLOBAL_FONTS } from '../Global_Fonts';
import { GLOBAL_ICONS} from '../Global_Icons'
import { uniqueId } from 'lodash'; 
import { useMemo } from '@wordpress/element';
import ColorPopup from '../components/ColorPopup';


const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType,
	// For attribute sources
} = wp.blocks;

import { useBlockProps,
	RichText,
	InspectorControls,
	} from '@wordpress/block-editor';

const {
	PanelBody,
	RangeControl,
	SelectControl,
	CheckboxControl,
	PanelRow,
	TextControl,
	Card,
    CardBody,
    CardHeader,
	ToggleControl,
    Flex, FlexBlock, FlexItem,
	__experimentalBoxControl,
} = wp.components;







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
var buttonBlockIcon=(
	<svg width={800} height={800} viewBox="0 0 800 800">
      <image
        x={161}
        y={343}
        width={477}
        height={111}
        xlinkHref="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAAd0AAABvCAMAAACeluqWAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAY1BMVEU2yGo2yGo2yGo2yGo2yGo2yGo2yGo2yGo2yGo2yGo2yGo2yGo2yGo2yGo2yGo2yGo2yGo2yGo2yGo2yGo2yGo2yGo2yGo2yGo2yGo2yGo2yGo2yGo2yGo2yGo2yGo2yGoAAAAcFDiVAAAAH3RSTlMABlam3/nz11VR21IDiVTj5Ftcq6zg+PLZB4qTlFP6t2bvfgAAAAFiS0dEILNrPYAAAAAJcEhZcwAALiMAAC4jAXilP3YAAAAHdElNRQfkBwYBERMA73gBAAABnUlEQVR42u3Wa07CABBF4amA1toWCsUHKu5/l1I0rIDJJCfnW8FNzp8bsWgeVuvNjxgen1ZtEzfPXfUg3Vn38t+2H6qnKMHQX+sal2lY4o7VK5RkvByqbfUIJdk1MVVvUJp9HKonKM0cx+oJSnOM1+oJSrOJ6gVKZF0y65JZl8y6ZNYlsy6ZdcmsS2ZdMuuSWZfMumTWJbMumXXJrEtmXTLrklmXzLpk1iWzLpl1yaxLZl0y65JZl8y6ZNYlsy6ZdcmsS2ZdMuuSWZfMumTWJbMumXXJrEtmXTLrklmXzLpk1iWzLpl1yaxLZl0y65JZl8y6ZNYlsy6ZdcmsS2ZdMuuSWZfMumTWJbMumXXJrEtmXTLrklmXzLpk1iWzLpl1yaxLZl0y65JZl8y6ZNYlsy6ZdcmsS2ZdMuuSWZfMumTWJbMumXXJrEtmXTLrksVb9QKl2cR79QSlOcaheoLSzDFVT1CafTTb6g1KsvuIaKtHKEkbF6fqFUpxWuJG/1m9Qwm++vjz3VVP0Z11Y9w007w+Vw/SnZzX89Rcu/4CtlcBl9E+D6EAAAAASUVORK5CYII="
      />
      <path fill="#fff" stroke="#040404" d="M322 390h156v17H322z" />
    </svg>
)
const generateButtonID = () => 'gradient-button-S-' + uniqueId();


registerBlockType( 'k2/animated-button', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-Progress_Bar_Block.
	title: __( 'Animated Button' ), // Block title.
	icon: {
		src: buttonBlockIcon
	} ,
	category: 'k2-blocks', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'Button' ),
		__( 'Animated Button' ),
		__( 'Magik Blocks' ),
		__( 'K2 Blocks' ),
	],
	attributes: {
		AnimatedButtonWidth: {
			type: 'number',
			default: 20
		},
		AnimatedButtonBorderRadius: {
			type: 'number',
			default: 10
		},
		// AnimatedButtonBorder: {
		// 	type: 'number',
		// 	default: 10
		// },
		AnimatedButtonText: {
			type: 'string',
			default: 'Animated Button'
		},
		AnimatedButtonLink: {
			type: 'string',
			default: 'https://www.k2blocks.com'
		},
		AnimatedLetterSpacing: {
			type: 'number',
			default: 0
		},

		ButtonColor:{
			type:'string',
			default: '#49119c'
		},
		TextColor:{
			type:'string',
			default: 'white'
		},
		ButtonIconEnable:{
			type:'boolean',
			default:true
		},
		AlertBoxIconType:{
			type: 'string',
			default: 'fa fa-rocket'
		},
		textFontFamily: {
			type: 'string',
			default: '"Gill Sans",Sans-serif'
		},
		textAlignment: {
			type: 'string',
			default: 'center'
		},
		ButtonIconPosition:{
			type:'string',
			default:'row;'
		},
		ButtonIconTextGap:{
			type:'number',
			default:1
		},
		ButtonisHovered: {
			type: 'boolean',
			default: false,
		},
		HoveredBackground:{
			type:'string',
			default:'#148D9D'

		},
		HoveredTextColor:{
			type:'string',
			default:'#ffffff'
		},
		K2btnHoverEffects:{
			type:'string'
		},
		K2ButtonPadding:{
			type:'object',
			default:{top: '8px', right: "8px", bottom: "8px", left: "8px"}
		},
		BlockBackgroundShadow:{
			type:"boolean",
			default:false
		},
		ButtonFontSize:{
			typre:"number",
			default:1.3
		},
		buttonID:{
			type:'string',
			default:''
		}


	},




	edit( { attributes, setAttributes } ) {

		
		const {
			AnimatedButtonWidth,
			AnimatedButtonBorderRadius,
			AnimatedButtonText,
			AnimatedButtonLink,
			AnimatedLetterSpacing,
			ButtonColor,
			TextColor,
			ButtonIconEnable,
			AlertBoxIconType,
			textFontFamily,
			textAlignment,
			ButtonIconPosition,
			ButtonIconTextGap,
			ButtonisHovered,
			HoveredBackground,
			HoveredTextColor,
			K2btnHoverEffects,
			K2ButtonPadding,
			BlockBackgroundShadow,
			ButtonFontSize,
			buttonID

		} = attributes;


		if (!buttonID) {
			// If the buttonID attribute is not set, generate a new ID and update it in the attributes.
			const newButtonID = generateButtonID();
			setAttributes({ buttonID: newButtonID });
			// buttonIDRef.current = newButtonID;
		  }

		function onChangeButtonFontSize(NewSize){
			setAttributes({ButtonFontSize:NewSize})
			console.log("button fonrt", ButtonFontSize)
		}

		function onChangeK2ButtonPadding(NewPadding){
			setAttributes({K2ButtonPadding:NewPadding})
			console.log("button padding", K2ButtonPadding)
		}
		function onChangeK2btnHoverEffects(NewVal){
			setAttributes({
				K2btnHoverEffects:NewVal
			})
			console.log("button hover effect", K2btnHoverEffects)
		}
		function onChangeAnimatedButtonWidth(NewWidth) {
			setAttributes({
				AnimatedButtonWidth: NewWidth
			})
			console.log("button width", AnimatedButtonWidth)
		}
		function onChangeAnimatedButtonBorderRadius(NewBorderRadius) {
			setAttributes({
				AnimatedButtonBorderRadius: NewBorderRadius
			})
			console.log("button radius", AnimatedButtonBorderRadius)
		}
		
		function onChangeButtonColor(value){
			setAttributes( {
				ButtonColor:value});
				console.log("button color", ButtonColor)
		}
	
		function onChangeTextColor(value){
			setAttributes( {
				TextColor:value});
				console.log("button text color", TextColor)
		}

		function onChangeButtonAnimatedText(NewText) {
			setAttributes({
				AnimatedButtonText: NewText
			})
			console.log("button", AnimatedButtonText)
		}


		function onChangeButtonLink(NewLink) {
			setAttributes({
				AnimatedButtonLink: NewLink
			})
			console.log("button link", AnimatedButtonLink)
		}

		//new code
		function onChangeButtonIconEnable(NewVal){
			setAttributes({
				ButtonIconEnable:NewVal
			})
			console.log("button icon enable", ButtonIconEnable)
		}

		function onChangeButtonIconPosition(newVal){
			setAttributes({
				ButtonIconPosition:newVal
			})
			console.log("button icon position", ButtonIconPosition)
		}
		function onChangeButtonIconTextGap(newGap){
			setAttributes({
				ButtonIconTextGap:newGap
			})
			console.log("button icon text gap", ButtonIconTextGap)
		}
		function onChangeHoveredBackground(value){
			setAttributes( {
				HoveredBackground:value});
				console.log("button hover background clor", HoveredBackground)
		}
		function onChangeHoveredTextColor(value){
			setAttributes( {
				HoveredTextColor:value});
				console.log("button hover text clor", HoveredTextColor)
		}
		//new end

		function onChangeButtonLetterSpacing(NewLetterSpacing) {
			setAttributes({
				AnimatedLetterSpacing: NewLetterSpacing
			})
			console.log("button letter spacing", AnimatedLetterSpacing)
		}

		const AnimatedButtonStyling = useMemo(
			() => ({
				width: AnimatedButtonWidth + 'rem',
				borderRadius: AnimatedButtonBorderRadius + 'rem',
				// border: AnimatedButtonBorder + 'rem',
				// borderColor: 'black',
				letterSpacing: AnimatedLetterSpacing + 'rem',
				backgroundColor: ButtonColor, 
				fontSize: ButtonFontSize+"em",
				color: TextColor,
				fontFamily: textFontFamily,
				flexDirection: ButtonIconPosition,
				gap: ButtonIconTextGap+'rem',
				boxShadow: BlockBackgroundShadow == true ? "0 0 10px " + ButtonColor :'none',
				paddingTop: K2ButtonPadding.top,
				paddingRight: K2ButtonPadding.right,
				paddingBottom: K2ButtonPadding.bottom,
				paddingLeft: K2ButtonPadding.left,
            }),
			[
                AnimatedButtonWidth,
                AnimatedButtonBorderRadius ,
                // AnimatedButtonBorder,
                AnimatedLetterSpacing,
                ButtonColor,
				ButtonFontSize,
                TextColor,
				textFontFamily,
				ButtonIconPosition,
				ButtonIconTextGap,
				BlockBackgroundShadow,
				K2ButtonPadding.top,
				K2ButtonPadding.right,
				K2ButtonPadding.bottom,
				K2ButtonPadding.left
			]
		);
       
		const HoveredAnimatedButtonStyle = useMemo(
			() => ({
				width: AnimatedButtonWidth + 'rem',
				borderRadius: AnimatedButtonBorderRadius + 'rem',
				// border: AnimatedButtonBorder + 'rem',
				// borderColor: 'black',
				letterSpacing: AnimatedLetterSpacing + 'rem',
				backgroundColor: HoveredBackground, fontSize: ButtonFontSize+"em",
				color:  HoveredTextColor,
				fontFamily: textFontFamily,
				flexDirection: ButtonIconPosition,
				gap: ButtonIconTextGap+'rem',
				boxShadow: BlockBackgroundShadow == true ?"0 0 10px " + ButtonColor :'none',
				paddingTop: K2ButtonPadding.top,
				paddingRight: K2ButtonPadding.right,
				paddingBottom: K2ButtonPadding.bottom,
				paddingLeft: K2ButtonPadding.left,
            }),
			[
                AnimatedButtonWidth,
                AnimatedButtonBorderRadius ,
                // AnimatedButtonBorder,
                AnimatedLetterSpacing,
                HoveredBackground,
				ButtonFontSize,
                HoveredTextColor,
				textFontFamily,
				ButtonIconPosition,
				ButtonIconTextGap,
				BlockBackgroundShadow,
				K2ButtonPadding.top,
				K2ButtonPadding.right,
				K2ButtonPadding.bottom,
				K2ButtonPadding.left
			]
		);

		const parentStyle = useMemo(
			() => ({
				display:"flex",
                justifyContent: textAlignment
            }),
			[
                textAlignment,
			]
		);
		
		const hoverOptions = [
			{label: 'None' , value: 'none-k2-btn'},
			{label: 'Slide' , value: 'hover_slide-btn'}
		]
		
		// function onChangeAnimatedButtonBorder(NewBorder) {
		// 	setAttributes({
		// 		AnimatedButtonBorder: NewBorder
		// 	})
		// }


		function onChangeAlertIconActive(value) {

			if (value.target.tagName === 'SPAN') {

				var MainDiv = document.getElementById( "k2-CB-icon-list-wrapper-id" );
				var Spans = MainDiv.getElementsByTagName( 'span' );
				for (var i = 0; i < Spans.length; i++) {
					if (Spans[i].className.includes( 'k2-CB-active' )) {
						Spans[i].className = Spans[i].className.replace( 'k2-CB-active', '' )
					}
				}
				setAttributes( {
					AlertBoxIconType: value.target.className
				} )
				console.log( value.target.className )
				value.target.className = value.target.className + ' k2-CB-active'
			}
		}


		//helper for alignment icons
		function onChangeAlignmentIconChange(value) {

			if (value.target.tagName === 'SPAN'){
				var ParentDiv = value.target.parentNode
				var MainDiv = ParentDiv.parentNode
				var Spans = MainDiv.getElementsByTagName('div');
				for (var i = 0; i < Spans.length; i++) {
					if (Spans[i].getElementsByTagName('span')[0].className.includes('k2-CB-active')){
						Spans[i].getElementsByTagName('span')[0].className = Spans[i].getElementsByTagName('span')[0].className.replace('k2-CB-active','')
					}
				}
				value.target.className = value.target.className + ' k2-CB-active'

			}

		}


		function toggleShadow(newVal){
				setAttributes({
					BlockBackgroundShadow: newVal,
				})
				console.log("button shadow", BlockBackgroundShadow)
		}

		return [
			<InspectorControls>
				<Card>
					<CardHeader>Enable Icon</CardHeader>
					<CardBody>
						<ToggleControl 
							label='Click to enable/disable icon'
							checked={ButtonIconEnable}
							onChange={onChangeButtonIconEnable}

						/>
					</CardBody>
				</Card>
				{
					ButtonIconEnable == true ?
					<div>
						<CardBody>
							<div className={'k2-CB-icon-list-wrapper'}>
									<CardHeader>Select Icon</CardHeader>
								<div id='k2-CB-icon-list-wrapper-id' className={'k2-CB-icon-list-sub-wrapper'}  onClickCapture={onChangeAlertIconActive}>
									{GLOBAL_ICONS.map((value, index) => {
										return <span className={'fa '+value}></span>
									})}
								</div>
							</div>
							
						</CardBody>
						<CardHeader>Icon Position</CardHeader>
						<CardBody>
							<SelectControl 
								options={[
									{label:'Before text', value:'row'},
									{label:'After text', value:'row-reverse'}
								]}
								onChange={onChangeButtonIconPosition}
								value={ButtonIconPosition}

							/>
						</CardBody>
						<CardHeader>Icon Spacing</CardHeader>
						<CardBody>
							<RangeControl 
								value={ButtonIconTextGap}
								onChange={onChangeButtonIconTextGap}
								step={0.5}
							/>
						</CardBody>


					</div>
				
					:null
				}

				

				<Card>
					<CardBody>
						<SelectControl
							label="Heading Font"
							value={textFontFamily}
							options={GLOBAL_FONTS}
							onChange={(value)=>{setAttributes({textFontFamily:value})}}
						/>
					</CardBody>
					<CardBody>
						<__experimentalBoxControl 
							label='Padding'
							value={K2ButtonPadding}
							onChange={onChangeK2ButtonPadding}

						/>
					</CardBody>

				</Card>

				<PanelBody title={'Button Customization'} initialOpen={false}>
					<RangeControl
						label={<strong> Button Width </strong>}
						value={ AnimatedButtonWidth }
						onChange={ onChangeAnimatedButtonWidth }
						min={ 13 }
						max={ 100 }
						step ={1}
					/>
					<RangeControl
						label={<strong> Button Border Radius </strong>}
						value={ AnimatedButtonBorderRadius }
						onChange={ onChangeAnimatedButtonBorderRadius }
						min={ 0 }
						max={ 100 }
						step ={.1}
					/>

					<TextControl
						label={<strong> Button Text </strong>}
						onChange={onChangeButtonAnimatedText }
						value={ AnimatedButtonText}
					/>


					<TextControl
						label={<strong> Button Link </strong>}
						onChange={onChangeButtonLink }
						value={ AnimatedButtonLink}
					/>


					<RangeControl
						label={<strong> Letter Spacing </strong>}
						value={ AnimatedLetterSpacing }
						onChange={ onChangeButtonLetterSpacing}
						min={ 0 }
						max={ 10 }
						step ={.1}
					/>
					<RangeControl 
						label={<strong>Font Size</strong>}
						value={ButtonFontSize}
						onChange={onChangeButtonFontSize}
						step={0.1}
					/>
					<PanelRow>
						<div style={{paddingBottom: '2%'}}>
							<label><strong>Alignment</strong></label>
						</div>
						<div id = {'AlignmentIconsParent'} className={'k2-CB-inspector-control-alignment'} onClick={onChangeAlignmentIconChange}>

							<div className={'k2-CB-inspector-control-alignment-single'}  onClick={() => {setAttributes({textAlignment:'flex-start'})}}>
								<span className="fa fa-align-left k2-CB-alignment-icon-style" ></span>
							</div>
							<div className={'k2-CB-inspector-control-alignment-single'} onClick={() => {setAttributes({textAlignment:'center'})}}>
								<span className="fa fa-align-center k2-CB-alignment-icon-style k2-CB-active"></span>
							</div>
							<div className={'k2-CB-inspector-control-alignment-single'} onClick={() => {setAttributes({textAlignment:'flex-end'})}}>
								<span className="fa fa-align-right k2-CB-alignment-icon-style"></span>
							</div>
						</div>
					</PanelRow>
				</PanelBody>
				<PanelBody>
					<ColorPopup 
						label={"Button Color"}
						value={{ value: ButtonColor}}
						onChange = {onChangeButtonColor}
						PropertyName={"backgroundColor"}
					/>
					<ColorPopup 
						label={"Hover Button Color"}
						value={{ value: HoveredBackground}}
						onChange = {onChangeHoveredBackground}
						PropertyName={"backgroundColor"}
					/>
				</PanelBody>
				<PanelBody>
					<Card>
						<CardBody>
							<ColorPopup 
								label={"Text Color"}
								value={{ value: TextColor}}
								onChange = {onChangeTextColor}
								PropertyName={"backgroundColor"}
							/>
							<ColorPopup 
								label={"Hover Text Color"}
								value={{ value: HoveredTextColor}}
								onChange = {onChangeHoveredTextColor}
								PropertyName={"backgroundColor"}
							/>
								<Card style={{marginTop:'12px'}}>
									<CardHeader>Hover Effect</CardHeader>
									<CardBody>
										<SelectControl 	
											options={hoverOptions}
											value={K2btnHoverEffects}
											onChange={onChangeK2btnHoverEffects}
										/>
									</CardBody>
								</Card>
							<CheckboxControl
								label="Enable shadow"
								checked={BlockBackgroundShadow }
								onChange={ toggleShadow }
							/>
						</CardBody>
					</Card>
					
					
				</PanelBody>
			</InspectorControls>
			,


			<div {...useBlockProps({className:"Outer", style: parentStyle })}  >
			<button onMouseEnter={() => setAttributes({ ButtonisHovered: true })}
      				onMouseLeave={() => setAttributes({ ButtonisHovered: false })} 
					style={ButtonisHovered == true ? HoveredAnimatedButtonStyle : AnimatedButtonStyling } 
					className="gradient-button"
					// id={'gradient-button-S-'+ uniqueId()}
					id={buttonID}
					>
				{
					ButtonIconEnable == true ?
					<i className={`${AlertBoxIconType} ${ButtonisHovered ? K2btnHoverEffects : ''}`}></i>
					:null
				}
				<RichText 
					onChange={onChangeButtonAnimatedText}
					value = {attributes.AnimatedButtonText}
					tagName='span'
				/>
			</button>
</div>


			]
	},

	save( { attributes } ) {

		const {
			AnimatedButtonWidth,
			AnimatedButtonBorderRadius,
			AnimatedButtonText,
			AnimatedButtonLink,
			AnimatedLetterSpacing,
			ButtonColor,
			TextColor,
			ButtonIconEnable,
			AlertBoxIconType,
			textFontFamily,
			textAlignment,
			ButtonIconPosition,
			ButtonIconTextGap,
			ButtonisHovered,
			HoveredBackground,
			HoveredTextColor,
			K2btnHoverEffects,
			K2ButtonPadding,
			BlockBackgroundShadow,
			ButtonFontSize,
			buttonID
		} = attributes;


		const AnimatedButtonStyling = {
			width: AnimatedButtonWidth + 'rem',
			borderRadius: AnimatedButtonBorderRadius + 'rem',
			// border: AnimatedButtonBorder + 'rem',
			// borderColor: 'black',
			letterSpacing: AnimatedLetterSpacing + 'rem',
			backgroundColor: ButtonColor, fontSize: ButtonFontSize+"em",
			color: TextColor,
			fontFamily: textFontFamily,
			flexDirection: ButtonIconPosition,
			gap: ButtonIconTextGap+'rem',
			boxShadow: BlockBackgroundShadow == true ?"0 0 10px " + ButtonColor :'none',
			paddingTop: K2ButtonPadding.top,
			paddingRight: K2ButtonPadding.right,
			paddingBottom: K2ButtonPadding.bottom,
			paddingLeft: K2ButtonPadding.left,


		}
		const HoveredAnimatedButtonStyle = {
			background: HoveredBackground,
			width: AnimatedButtonWidth + 'rem',
			borderRadius: AnimatedButtonBorderRadius + 'rem',
			// border: AnimatedButtonBorder + 'rem',
			// borderColor: 'black',
			letterSpacing: AnimatedLetterSpacing + 'rem',
			fontSize: ButtonFontSize+"em",
			color: HoveredTextColor,
			fontFamily: textFontFamily,
			flexDirection: ButtonIconPosition,
			gap: ButtonIconTextGap+'rem',
			boxShadow: BlockBackgroundShadow == true ?"0 0 10px " + ButtonColor :'none',
			paddingTop: K2ButtonPadding.top,
			paddingRight: K2ButtonPadding.right,
			paddingBottom: K2ButtonPadding.bottom,
			paddingLeft: K2ButtonPadding.left,

		}

		const stringyHover = JSON.stringify(HoveredAnimatedButtonStyle);

		var parentStyle = {
			justifyContent: textAlignment,
			display:'flex'
		
		};
		var link = AnimatedButtonLink

		var sup = "parent.open('" + link + "')"

		const SaveblockProps = useBlockProps.save({ className: 'Outer', style: parentStyle });

		return 	<div {...SaveblockProps}  onClick={sup} >
			<button 
				style={AnimatedButtonStyling}
				className="gradient-button"
				// id={'gradient-button-S-'+ uniqueId()}
				id={buttonID}
				data-custom={stringyHover}
				data-hoverop = {K2btnHoverEffects}
			>
				{
					ButtonIconEnable == true ?
						<i className={AlertBoxIconType}></i>
					:null
				}
				<RichText.Content 
					value={AnimatedButtonText}
					tagName='span'
				/>
				
			</button>
		</div>
	}
});
// Hook into the blocks.BlockList filter to update the buttonID attribute
wp.hooks.addFilter('blocks.BlockList', 'k2/classic-button', (settings, name) => {
	if (name !== 'k2/classic-button') {
	  // Generate a new buttonID for any block other than 'your-block-name'
	  return {
		...settings,
		attributes: {
		  ...settings.attributes,
		  buttonID: generateButtonID(),
		},
	  };
	}
  
	// Return the settings for 'your-block-name'
	return settings;
  });