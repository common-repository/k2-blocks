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
	__experimentalBoxControl,
	RangeControl,
	ToggleControl,
	ColorPalette,
	SelectControl,
    CheckboxControl,
	Card,
	CardBody,
	CardHeader,
	TabPanel,
	Flex, FlexBlock, FlexItem,
    ColorPicker,
    DateTimePicker 
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
        minutes,
        hours,
        date,
        month,
        year,
        days_,
        hours_,
        minutes_,
        seconds_,
        TimerValueBackgroundColor,
        TimerValueBackGroundShadow,
        TimerValueColor,
        numberFontSize,
        numberFontFamily,
        TimerTextColor,
        textFontFamily,
        textFontSize,
        TimerLayout,
        BlockBackgroundColor,
        BlockBackgroundShadow,
        BlockMinWidth,
        CircleBlockRadium
    } = attributes;
  
    function calculateDateDifference(year, month, date,hours,minutes){
        var targetDate = new Date(year, month, date,hours,minutes,0,0);
        var variable1 = new Date(); //todays date
        console.log("Todays date: " +variable1.toLocaleString())
        console.log("Set date:"+targetDate.toLocaleString())
        var days_;
        var hours_;
        var minutes_;
        var seconds_;
        if(targetDate-variable1 <= 0) {
            //display zeros
            days_ = 0;
            hours_ = 0;
            minutes_ = 0;
            seconds_ = 0;
        }
        else{
            var delta = Math.abs((targetDate-variable1)/1000);
            // calculate (and subtract) whole days
            days_ = Math.floor(delta / 86400);
            delta -= days_ * 86400;
            // calculate (and subtract) whole hours
            hours_ = Math.floor(delta / 3600) % 24;
            delta -= hours_ * 3600;
            // calculate (and subtract) whole minutes
            minutes_ = Math.floor(delta / 60) % 60;
            delta -= minutes_ * 60;
            // what's left is seconds
            seconds_ = Math.floor(delta % 60);  // in theory the modulus is not required
        }

        console.log("result: "+days_+" "+hours_+" "+minutes_+" "+seconds_)
        setAttributes({
            days_: days_,
            hours_: hours_,
            minutes_ :minutes_,
            seconds_ :seconds_
        })

    }


    function updateDateTime(newDateTime){
        //"2020-12-24T22:45:00"
        var datetime = newDateTime.split('T');
        var date = datetime[0].split('-');
        var time = datetime[1].split(':');
        console.log(date)
        console.log(time)
        setAttributes({
            minutes: parseInt(time[1]),
            hours: parseInt(time[0]),
            date: parseInt(date[2]),
            month: parseInt(date[1])-1,
            year: parseInt(date[0]),
        })
        calculateDateDifference(parseInt(date[0]),parseInt(date[1])-1,parseInt(date[2]),parseInt(time[0]),parseInt(time[1]));
    }

    function onChangeBackgroundColor(value) {
        if(TimerLayout == 'Classic')
            setAttributes(
                {
                    TimerValueBackgroundColor: 'rgba('+value.rgb.r+','+value.rgb.g+','+value.rgb.b+','+value.rgb.a+')',
                }
            )
        else{
            setAttributes(
                {
                    BlockBackgroundColor: 'rgba('+value.rgb.r+','+value.rgb.g+','+value.rgb.b+','+value.rgb.a+')'
                }
            )
        }
    }

    function toggleShadow(){
        if (TimerLayout == 'Classic'){
            setAttributes({
                TimerValueBackGroundShadow:!TimerValueBackGroundShadow,
                BlockBackgroundShadow: false,
            })
        }
        else{
            setAttributes({
                TimerValueBackGroundShadow:false,
                BlockBackgroundShadow: !BlockBackgroundShadow,
            })
        }
    }

    function onChangeTimerValueColor(value) {
        setAttributes({
            TimerValueColor: 'rgba('+value.rgb.r+','+value.rgb.g+','+value.rgb.b+','+value.rgb.a+')'
        })
    }

    function onChangeTimerTextColor(value) {
        setAttributes({
            TimerTextColor: 'rgba('+value.rgb.r+','+value.rgb.g+','+value.rgb.b+','+value.rgb.a+')'
        })
    }

    function onChangeTimerLayout(NewLayout) {
        setAttributes({
            TimerLayout: NewLayout
        })

        if (NewLayout == 'Classic'){
            setAttributes({
                TimerValueBackgroundColor: BlockBackgroundColor,
                TimerValueBackGroundShadow: BlockBackgroundShadow,
                BlockBackgroundColor: 'transparent',
                BlockBackgroundShadow: false,
                BlockMinWidth: 5,
                CircleBlockRadium: 1,
                TimerTextColor: BlockBackgroundColor
            })
        } else if (NewLayout == 'Cover'){
            setAttributes({
                BlockBackgroundColor: TimerValueBackgroundColor,
                BlockBackgroundShadow: TimerValueBackGroundShadow,
                TimerValueBackgroundColor: 'transparent',
                TimerValueBackGroundShadow: false,
                BlockMinWidth: 15,
                CircleBlockRadium: 1,
                TimerTextColor: 'white'

            })
        }
    }
    var fontDefaultColors = [
        { color: '#32897A' },
        {  color: '#1995AD' },
        {  color: '#011A27' },
        {  color: '#F69454' },
    ];

    const TimerBlockStyling = {
        backgroundColor: BlockBackgroundColor,
        boxShadow: (BlockBackgroundShadow)?"1px 1px 10px #888888":'',
        minWidth: BlockMinWidth + '%',
        borderRadius: '2%'
    }
    const TimerValueContainerStyling = {
        backgroundColor: TimerValueBackgroundColor,
        boxShadow: (TimerValueBackGroundShadow)?"1px 1px 10px #888888":'',
        color: TimerValueColor,
        fontSize: numberFontSize+"em",
        fontFamily: numberFontFamily,
    }

    const TimerTextContainerStyling = {
        color: TimerTextColor,
        fontSize: textFontSize+"em",
        fontFamily: textFontFamily
    }

    function myFunction(value) {
        var oferts = document.querySelectorAll(".k2-tw-inspector-popuptext .components-color-picker__inputs-wrapper");
        for (var i=0; i<oferts.length; i++){
            oferts[i].style.display = 'none';
        }
        var ParentDiv = value.target.parentNode
        var PopupDiv = ParentDiv.getElementsByTagName('span')
        if (PopupDiv[1].hidden  === true){
            PopupDiv[1].hidden  = false
        } else if (PopupDiv[1].hidden  === false){
            PopupDiv[1].hidden  = true
        }
    }

    function TempFuntion() {
        console.log('Print')
    }

    return ([
        <InspectorControls>

            <PanelBody title={'Date Time Settings'}>
                    <DateTimePicker
                        currentDate = {new Date(year,month,date,hours,minutes,0,0)}
                        onChange={updateDateTime}
                    />
            </PanelBody>

            <PanelBody title={"Background"}>
                <SelectControl
                            label="Skin"
                            value={TimerLayout}
                            options={[
                                { label: 'Classic', value: 'Classic' },
                                { label: 'Cover', value: 'Cover'}
                            ]}
                            onChange={onChangeTimerLayout}
                />
                <CheckboxControl
                    label="Enable shadow"
                    help="Should the timer have a shadow?"
                    checked={ ( TimerLayout == 'Classic')? TimerValueBackGroundShadow: BlockBackgroundShadow }
                    onChange={ toggleShadow }
                />

                <PanelRow>
                    <p><strong>Timer color</strong></p>
                    <div className="k2-tw-inspector-popup">
                    <span style={{backgroundColor: ( TimerLayout == 'Classic')? TimerValueBackgroundColor : BlockBackgroundColor}} className={ 'k2-tw-inspector-dot' } onClick={ myFunction }>
                    </span>
                        <span className="k2-tw-inspector-popuptext" id="myPopup" hidden={ true } onClick={ TempFuntion }>

                            <ColorPicker
                                color={ ( TimerLayout == 'Classic')? TimerValueBackgroundColor : BlockBackgroundColor }
                                onChangeComplete={onChangeBackgroundColor}
                            />
                            <TextControl
                                onChange={(value)=>{
                                    if(TimerLayout == 'Classic')setAttributes({TimerValueBackgroundColor: value,})
                                    else{setAttributes({BlockBackgroundColor: value})}}
                                }
                                value = {( TimerLayout == 'Classic')? TimerValueBackgroundColor : BlockBackgroundColor}
                            />

                    </span>
                    </div>
                </PanelRow>

            </PanelBody>
            <PanelBody title={"Numbers Styling"}>

                <PanelRow>
                    <p><strong>Numbers color</strong></p>
                    <div className="k2-tw-inspector-popup">
                    <span style={{backgroundColor: TimerValueColor}} className={ 'k2-tw-inspector-dot' } onClick={ myFunction }>
                    </span>
                        <span className="k2-tw-inspector-popuptext" id="myPopup" hidden={ true } onClick={ TempFuntion }>

                        <ColorPicker
                            color={ TimerValueColor }
                            onChangeComplete={ onChangeTimerValueColor }
                        />
                        <TextControl
                            onChange={ ( value ) => {
                                setAttributes( { TimerValueColor: value } )
                            } }
                            value={ TimerValueColor }
                        />

                    </span>
                    </div>
                </PanelRow>


                <RangeControl
                    label= "Number Font Size"
                    value={ numberFontSize }
                    onChange={ (value)=>{setAttributes({numberFontSize:value})} }
                    min={ 1 }
                    max={ 8 }
                    step ={0.1}
                />
                <SelectControl
                    label="Number Font"
                    value={numberFontFamily}
                    options={GLOBAL_FONTS}
                    onChange={(value)=>{setAttributes({numberFontFamily:value})}}
                />
            </PanelBody>

            <PanelBody title={"Text Styling"}>

                <PanelRow>
                    <p><strong>Text color</strong></p>
                    <div className="k2-tw-inspector-popup">
                    <span style={{backgroundColor: TimerTextColor}} className={ 'k2-tw-inspector-dot' } onClick={ myFunction }>
                    </span>
                        <span className="k2-tw-inspector-popuptext" id="myPopup" hidden={ true } onClick={ TempFuntion }>

                        <ColorPicker
                            color={ TimerTextColor }
                            onChangeComplete={onChangeTimerTextColor}
                        />
                        <TextControl
                            onChange={(value)=>{setAttributes({TimerTextColor:value})}}
                            value = {TimerTextColor}
                        />

                    </span>
                    </div>
                </PanelRow>

                <RangeControl
                    label= "Text Font Size"
                    value={ textFontSize }
                    onChange={ (value)=>{setAttributes({textFontSize:value})} }
                    min={ 1 }
                    max={ 8 }
                    step ={0.1}
                />
                <SelectControl
                    label="Text Font"
                    value={textFontFamily}
                    options={GLOBAL_FONTS}
                    onChange={(value)=>{setAttributes({textFontFamily:value})}}
                />
            </PanelBody>
        </InspectorControls>
        ,
        <div className={'k2-tw-parent-container'}>


            <div style={TimerBlockStyling} className={'k2-tw-block-container'}>
                <span style={{display: 'block'}}>
                    <div style={TimerValueContainerStyling} className='k2-tw-value-container'>
                        {
                            (days_ < 10)? '0' + days_ : days_
                        }
                    </div>
                    <div style={TimerTextContainerStyling} className={'k2-tw-text-container'} >
                        Days
                    </div>
                </span>
            </div>


            <div style={TimerBlockStyling} className={'k2-tw-block-container'}>
                <span style={{display: 'block'}}>
                    <div style={TimerValueContainerStyling} className={'k2-tw-value-container'}>
                        {
                            (hours_ < 10)? '0' + hours_ : hours_
                        }
                    </div>
                    <div style={TimerTextContainerStyling} className={'k2-tw-text-container'} >
                        Hours
                    </div>
                </span>
            </div>


            <div style={TimerBlockStyling} className={'k2-tw-block-container'}>
                <span style={{display: 'block'}}>
                    <div style={TimerValueContainerStyling} className={'k2-tw-value-container'}>
                        {
                            (minutes_ < 10)? '0' + minutes_ : minutes_
                        }
                    </div>
                    <div style={TimerTextContainerStyling} className={'k2-tw-text-container'} >
                        Minutes
                    </div>
                </span>
            </div>


            <div style={TimerBlockStyling} className={'k2-tw-block-container'}>
                <span style={{display: 'block'}}>
                    <div style={TimerValueContainerStyling} className={'k2-tw-value-container'}>
                        {
                            (seconds_ < 10)? '0' + seconds_ : seconds_
                        }
                    </div>
                    <div style={TimerTextContainerStyling} className={'k2-tw-text-container'} >
                        Seconds
                    </div>
                </span>
            </div>
        </div>
    ])
}
