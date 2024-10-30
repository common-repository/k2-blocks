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
	MediaUpload,
    InnerBlocks
	} from '@wordpress/block-editor';
import { useMemo , Fragment} from '@wordpress/element';

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
    ColorPicker,
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
        type, popupDelay, buttonColor, EnableButtonText, buttonText, 
        buttonTextSize, ModalButtonTextWeight, buttonWidth, buttonHeight, 
        buttonRadius, closeButtonPosition, textColor, textFontFamily, 
        ModalBoxIconType, modalIconPosition, modalIconTextGap, K2modalImage, 
        K2modalImageWidth, K2modalImageHeight, K2modalImagePosition, 
        K2modalImageBorderRadius, K2modalImageIconEnable, K2ModalBoxAlignment
    } = attributes;
  
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
                ModalBoxIconType: value.target.className
            } )
            console.log( value.target.className )
            value.target.className = value.target.className + ' k2-CB-active'
        }
    }
    function onCloseButtonPositionChange(value){
        if(value=='topright'){
            setAttributes({
                closeButtonPosition:{top:0,right:0,text:value}
            })
        }
        else if(value == 'topleft'){
            setAttributes({
                closeButtonPosition:{top:0,right:'auto',text:value}
            })
        }
        else if(value == 'bottomright'){
            setAttributes({
                closeButtonPosition:{top:'90%',right:0,text:value}
            })
        }
        else if(value == 'bottomleft'){
            setAttributes({
                closeButtonPosition:{top:'90%',right:'auto',text:value}
            })
        }
        console.log(closeButtonPosition)
    }
    const FontWeightAvaibles= [
        { label: 'normal'},
        { label: '100'},
        { label: '200'},
        { label: '300'},
        { label: '400'},
        { label: '500'},
        { label: '600'},
    ]
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
    function onChangeK2modalImageIconEnable(NewVal){
        setAttributes({K2modalImageIconEnable:NewVal})
    }
    function onChangeEnableButtonText(newBool){
        setAttributes({EnableButtonText:newBool})
    }
    function onChangeModalButtonTextWeight(NewVal){
        setAttributes({ModalButtonTextWeight:NewVal})
    }
    function onChangemodalIconPosition( newVal){
        setAttributes({modalIconPosition: newVal})
    }
    function onChangemodalIconTextGap( newVal){
        setAttributes({modalIconTextGap: newVal})
    }
    function onChangebuttonRadius(NewRadius){
        setAttributes({buttonRadius:NewRadius})
    }
    function onChangeK2modalImage(NewImage){
        setAttributes({K2modalImage:NewImage.url})
    }
    function onChangeK2modalImageWidth(NewVal){
        setAttributes({K2modalImageWidth:NewVal})
    }
    function onChangeK2modalImageHeight(NewHeight){
        setAttributes({K2modalImageHeight:NewHeight})
    }
    function onChangeK2modalImageBorderRadius(NewRadius){
        setAttributes({K2modalImageBorderRadius:NewRadius})
    }
    function onChangeK2modalImagePosition(NewPos){
        setAttributes({K2modalImagePosition:NewPos})
    }
    var controls = (
        <PanelBody title={"Button styling"}>
            <ColorPopup 
                    label={"Background Color"}
                    value={{ value:buttonColor}}
                    onChange = {(value)=>{setAttributes({buttonColor:value})}}
                    PropertyName={"backgroundColor"}
            />


            <RangeControl
                label= "Button width"
                value={ buttonWidth }
                onChange={ (value)=>{setAttributes({buttonWidth:value})} }
                min={ 0.1 }
                max={ 10 }
                step ={0.1}
            />
            <RangeControl
                label= "Button Height"
                value={ buttonHeight }
                onChange={ (value)=>{setAttributes({buttonHeight:value})} }
                min={ 0.1 }
                max={ 10 }
                step ={0.1}
            />
            <RangeControl
                label= "Button Radius"
                value={ buttonRadius }
                onChange={onChangebuttonRadius}
                min={ 0.1 }
                max={ 10 }
                step ={0.1}
            />
            
        </PanelBody>
    );
    
        function onChangetextColor (newColor){
            setAttributes({textColor: newColor})
        }
        const buttonStyle = useMemo(
            () => ({
                backgroundColor: buttonColor,
                padding : buttonHeight+"em "+buttonWidth+"em",
                fontSize: buttonTextSize+"em",
                fontFamily:textFontFamily,
                fontWeight: ModalButtonTextWeight,
                color: textColor,
                flexDirection: modalIconPosition,
                gap: modalIconTextGap+'rem',
                borderRadius:buttonRadius+'rem'
            }),
            [
                buttonColor,
                buttonHeight ,
                buttonWidth,
                buttonTextSize,
                textFontFamily,
                ModalButtonTextWeight,
                modalIconPosition,
                modalIconTextGap,
                buttonRadius,
                textColor,
            ]
        );
        const closeButtonStyle = useMemo(
            () => ({
                top:closeButtonPosition.top,
                right:closeButtonPosition.right
            }),
            [
                closeButtonPosition.top,
                closeButtonPosition.right,
            ]
        );

        const imageStyle = useMemo(
            () => ({
                width: K2modalImageWidth+'%',
                height: K2modalImageHeight+'rem',
                borderTopLeftRadius:  K2modalImageBorderRadius.top,
                borderTopRightRadius:  K2modalImageBorderRadius.right,
                borderBottomRightRadius:  K2modalImageBorderRadius.bottom,
                borderBottomLeftRadius:  K2modalImageBorderRadius.left,
                objectPosition: K2modalImagePosition
            }),
            [
                K2modalImageWidth,
                K2modalImageHeight ,
                K2modalImageBorderRadius.top,
                K2modalImageBorderRadius.right,
                K2modalImageBorderRadius.bottom,
                K2modalImageBorderRadius.left,
                modalIconPosition,
                modalIconTextGap,
                K2modalImagePosition
            ]
        );
        const ModalBoxAlignmentStyles = useMemo(
            () => ({
                alignItems:K2ModalBoxAlignment,
            }),
            [
                K2ModalBoxAlignment,
            ]
        );
    
        return ([
            <InspectorControls>
                <PanelBody>
                    <SelectControl
                        label="Modal Box Type"
                        value={type}
                        options={[
                            { label: 'Button', value: 'button' },
                            { label: 'Timed', value: 'time'},
                            {label: 'Image', value:'image'}
                        ]}
                        onChange={(value)=>{setAttributes({type:value})}}
                    />

                    <SelectControl
                        label="'Close' button position"
                        value={closeButtonPosition.text}
                        options={[
                            { label: 'Top Right', value: 'topright' },
                            { label: 'Top Left', value: 'topleft'}
                        ]}
                        onChange={onCloseButtonPositionChange}
                    />
                    <PanelRow>
                        <div style={{paddingBottom: '2%'}}>
                            <label><strong>Alignment</strong></label>
                        </div>
                        <div id = {'AlignmentIconsParent'} className={'k2-CB-inspector-control-alignment'} onClick={onChangeAlignmentIconChange}>

                            <div className={'k2-CB-inspector-control-alignment-single'}  onClick={() => {setAttributes({K2ModalBoxAlignment:'flex-start'})}}>
                                <span className="fa fa-align-left k2-CB-alignment-icon-style" ></span>
                            </div>
                            <div className={'k2-CB-inspector-control-alignment-single'} onClick={() => {setAttributes({K2ModalBoxAlignment:'center'})}}>
                                <span className="fa fa-align-center k2-CB-alignment-icon-style k2-CB-active"></span>
                            </div>
                            <div className={'k2-CB-inspector-control-alignment-single'} onClick={() => {setAttributes({K2ModalBoxAlignment:'flex-end'})}}>
                                <span className="fa fa-align-right k2-CB-alignment-icon-style"></span>
                            </div>
                        </div>
                    </PanelRow>

                </PanelBody>
                    {
                        type == 'image' ?
                            <div>
                            <PanelBody title={__("Image")}>
                                <Card>
                                    <CardBody>
                                        <MediaUpload
                                            accept = "image/*"
                                            allowedTypes={ [ 'image' ] }
                                            value={K2modalImage}
                                            onSelect={ onChangeK2modalImage }
                                            render={ ({open}) => {
                                                return <div style={{backgroundImage: 'url("' + K2modalImage + '")'}} className={'K2-testimonial-imageUpload-Block'}>
                                                    <FontAwesomeIcon className='K2-testimonial-imageUpload-icon-Block' icon={faPlusCircle} onClick={open}/>
                                                </div>;
                                            }}
                                        />
                                    </CardBody>
                                </Card>
                                <Card>
                                    <CardBody>
                                        <RangeControl
                                            label="width"
                                            value={K2modalImageWidth}
                                            onChange={onChangeK2modalImageWidth}
                                        />
                                        <RangeControl 
                                            label="height"
                                            value={K2modalImageHeight}
                                            onChange={onChangeK2modalImageHeight}
                                        />
                                        <BoxControl
                                            label="Border radius"
                                            value={K2modalImageBorderRadius}
                                            onChange={onChangeK2modalImageBorderRadius}
                                        />
                                        <SelectControl
                                            label="Image position"
                                            value={K2modalImagePosition}
                                            options={[
                                                { label: 'Center', value: 'center' },
                                                { label: 'Top', value: 'top'},
                                                { label: 'Bottom', value: 'bottom'}
                                            ]}
                                            onChange={onChangeK2modalImagePosition}
                                        />
                                    </CardBody>
                                </Card>
                            </PanelBody>
                                
                            </div>
                        :null
                    }
                    {
                        type == 'button' ?
                            <div>
                            <PanelRow>
                                <ToggleControl 
                                    label={'Enable Icon'}
                                    checked={K2modalImageIconEnable}
                                    onChange ={onChangeK2modalImageIconEnable}
                                />
                            </PanelRow>
                            
                            {
                                K2modalImageIconEnable == true ?
                                <PanelBody title={'Button Icon'}>
                            
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
                                                onChange={onChangemodalIconPosition}
                                                value={modalIconPosition}

                                            />
                                        </CardBody>
                                        <CardHeader>Icon Spacing</CardHeader>
                                        <CardBody>
                                            <RangeControl 
                                                value={modalIconTextGap}
                                                onChange={onChangemodalIconTextGap}
                                                step={0.5}
                                            />
                                        </CardBody>		
                                </PanelBody>
                                :null

                            }
                            
                            <PanelBody  title={'Button Text'}>
                                    <Card>
                                        <CardBody>
                                            <Flex>
                                                <ToggleControl 
                                                    label="Enable Text"
                                                    checked={EnableButtonText}
                                                    onChange={onChangeEnableButtonText}
                                                />
                                            </Flex>
                                            {
                                                EnableButtonText == true ?
                                                <div>
                                                    <TextControl
                                                            label={<strong>Text</strong>}
                                                            onChange={(value)=>{setAttributes({buttonText:value})}}
                                                            value = {buttonText}
                                                    />
                                                    <ColorPopup 
                                                            label={"Text Color"}
                                                            value={{ value:textColor}}
                                                            onChange = {onChangetextColor}
                                                            PropertyName={"backgroundColor"}
                                                    />
                                                    <RangeControl
                                                        label= "Font size"
                                                        value={ buttonTextSize }
                                                        onChange={ (value)=>{setAttributes({buttonTextSize:value})} }
                                                        min={ 0.1 }
                                                        max={ 10 }
                                                        step ={0.1}
                                                    />
                                                    <Flex>
                                                        <FlexItem>
                                                            <SelectControl
                                                                        label="Font Family"
                                                                        value={textFontFamily}
                                                                        options={GLOBAL_FONTS}
                                                                        onChange={(value)=>{setAttributes({textFontFamily:value})}}
                                                            />
                                                        </FlexItem>
                                                        <FlexItem>
                                                            <SelectControl
                                                                label="Weight"
                                                                value={ ModalButtonTextWeight}
                                                                options={ FontWeightAvaibles }
                                                                onChange={ onChangeModalButtonTextWeight}
                                                            />
                                                        </FlexItem>
                                                    </Flex>
                                                </div>

                                                : null
                                            }
                                        </CardBody>
                                    </Card>
                            </PanelBody>
                            {controls}
                            </div>
                        :null
                    }
                    {
                        type == 'time' ?
                            <PanelBody>

                                    <RangeControl
                                                label= "Popup delay (secs)"
                                                value={ popupDelay }
                                                onChange={ (value)=>{setAttributes({popupDelay:value})} }
                                                min={ 1 }
                                                max={ 10 }
                                                step ={1}
                                            />
                            </PanelBody>
                        :null

                    }
            </InspectorControls>

            ,
            <div className={'k2-modal-container'} style={ModalBoxAlignmentStyles}>
                {(type == 'button') &&
                    <button className={'k2-modal-button'} style = {buttonStyle}>
                        {
                            K2modalImageIconEnable == true ?
                            <i className={ModalBoxIconType}></i>
                            :null
                        }
                        
                        {
                            EnableButtonText == true ?
                                <RichText 
                                    onChange={(value)=>{setAttributes({buttonText:value})}}
                                    value = {buttonText}
                                    tagName='span'
                                />
                        :null
                        }	
                    </button>
                }
                {
                    (type == 'image') &&
                    <img src={K2modalImage} className='k2-modal-image' style={imageStyle} />
                }
                <div className="k2-modal-backend">
                    <div className="k2-modal-content-backend">
                        <InnerBlocks renderAppender={ () => (<InnerBlocks.ButtonBlockAppender/>) }/>
                    </div>
                    <div className="k2-modal-close" style={closeButtonStyle}>&times;</div>
                </div>
            </div>
        ])
}
