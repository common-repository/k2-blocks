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
import { useMemo , Fragment} from '@wordpress/element';

import ColorPopup from '../Components/ColorPopup';

import {
	PanelBody ,
	PanelRow,
	TextControl,
	__experimentalNumberControl as NumberControl,
	__experimentalBorderBoxControl as BorderBoxControl,
	__experimentalBoxControl,
	RangeControl,
	ToggleControl,
	ColorPalette,
	SelectControl,
    CheckboxControl ,
	Card,
	CardBody,
	CardHeader,
	TabPanel,
	Flex, FlexBlock, FlexItem,
	} from '@wordpress/components';

// import { uniqueId } from 'lodash'; 
// import { uniqueId } from '../../../../node_modules/lodash';
import { generate } from 'short-uuid';
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

    const generateButtonID = () => 'gradient-button-S-'+generate();

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

	return (
        [
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
	);
}
