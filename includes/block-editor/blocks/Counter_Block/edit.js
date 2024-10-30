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
		counterLayout,
        widgetSize,
        paddingTop,
        backgroundColor,
        haloColor,
        titleFontColor,
        numberFontColor,
        titleFontFamily,
        numberFontFamily,
        numberFontSize,
        titleFontSize,
        counterShapeClass,
        number,
        type,
        title,
        date,
        prefix,
        postfix
	} = attributes;

    function onChangeCounterLayout(layout){
        setAttributes({
            counterLayout : layout
        })
    }


    function onBackgroundColorChange(value){
        setAttributes( {
            backgroundColor:value}
        );
    }

    function onChangeNumberColor(value){
        setAttributes( {
            numberFontColor:value}
        );
    }


    function onChangetitleFontColor(value){
        setAttributes( {
            titleFontColor:value}
        );
    }

    function onNumberChange(value){
        setAttributes({
            number: value
        })
    }

    function onTypeChange(value){
        setAttributes({
            type: value
        })
    }

    function onDateChange(newDateTime){
        var datetime = newDateTime.split('T');
        var date = datetime[0].split('-');
        console.log(date)
        var day=parseInt(date[2])
        var month= parseInt(date[1])-1
        var year=parseInt(date[0])
        setAttributes({
            date:{
                day:day,
                month:month,
                year:year
            }
        })
        var targetDate = new Date(year,month,day,0,0,0,0);
        var variable1 = new Date(); //todays date
        var days_;
        console.log(targetDate.toLocaleString())
        if(targetDate-variable1 >= 0) {
            //display zero
            days_ = 0;

        }
        else{
            var delta = Math.abs((targetDate-variable1)/1000);
            // calculate (and subtract) whole days
            days_ = Math.floor(delta / 86400);
        }

        setAttributes({
            number:days_
        })
    }

    function onTitleChange(value){
        setAttributes({
            title:value
        })
    }
    const styling = useMemo(
        () => ({
            backgroundColor: (counterShapeClass == '')?'transparent':backgroundColor,
            width: widgetSize+"px",
            height: widgetSize+"px",
            boxShadow: (counterShapeClass != 'k2-cw-halo')?'none':"0 0 25px "+haloColor
        }),
        [
            backgroundColor,
            widgetSize ,
            counterShapeClass,
            haloColor,
        ]
    );
    const advanceStytling = useMemo(
        () => ({
            backgroundColor: (counterShapeClass == '')?'transparent':backgroundColor,
            boxShadow: (counterShapeClass != 'k2-cw-halo')?'none':"0 0 25px "+haloColor
        }),
        [
            counterShapeClass,
            backgroundColor ,
            counterShapeClass,
            haloColor,
        ]
    );

    const titleStyling = useMemo(
        () => ({
            color: titleFontColor,
            fontFamily: titleFontFamily,
            fontSize: titleFontSize + 'em',
        }),
        [
            titleFontColor,
            titleFontFamily ,
            titleFontSize,
        ]
    );


    const adtitleStyling = useMemo(
        () => ({
            color: titleFontColor,
            fontFamily: titleFontFamily,
            fontSize: titleFontSize + 'em',
            textAlign:"left",
            marginTop:"0px",
            marginLeft:"10px",
            marginBottom: "0px"
        }),
        [
            titleFontColor,
            titleFontFamily ,
            titleFontSize,
        ]
    );

    const numberStyling = useMemo(
        () => ({
            color: numberFontColor,
            fontFamily: numberFontFamily,
            fontSize: numberFontSize + 'em',
        }),
        [
            numberFontColor,
            numberFontFamily ,
            numberFontSize,
        ]
    );

    const AdvancenumberStyling = useMemo(
        () => ({
            color: numberFontColor,
            fontFamily: numberFontFamily,
            fontSize: numberFontSize + 'em',
            margin:'16px 1px 1px -37px',
            width:'90%'
        }),
        [
            numberFontColor,
            numberFontFamily ,
            numberFontSize,
        ]
    );

    const contentStyling = useMemo(
        () => ({
            paddingTop: paddingTop+'px'
        }),
        [
            paddingTop,
        ]
    );
    

    var contentControls = (
        <TextControl
                    label={<strong>Number</strong>}
                    onChange={onNumberChange}
                    value = {number}
        />
    );
    if (type === 'days'){
        contentControls = (

        <div>
                <label>Date</label>
                <DateTimePicker
                    currentDate = {new Date(date.year,date.month,date.day,0,0,0,0)}
                    onChange={onDateChange}
                />
            </div>
        );
    }

    var colorControls = (
        <ColorPopup 
                label={"Background Color"}
                value={{ value:backgroundColor}}
                onChange = {onBackgroundColorChange}
                PropertyName={"backgroundColor"}
        />



    );
    if(counterShapeClass===''){
        colorControls = null;
    }
    if(counterShapeClass==='k2-cw-halo'){
        colorControls = (

        <div>
                <ColorPopup 
                        label={"Background Color"}
                        value={{ value:backgroundColor}}
                        onChange = {onBackgroundColorChange}
                        PropertyName={"backgroundColor"}
                />
                <ColorPopup 
                        label={"Halo Color"}
                        value={{ value:haloColor}}
                        onChange = { ( value ) => {setAttributes( {haloColor:value} ); console.log(haloColor)} }
                        PropertyName={"backgroundColor"}
                />

        </div>


        )
    }


	return (
        [   <InspectorControls>
            <div>
                <p>Counts up to a certain Number or Days since a date</p>
            </div>
            <PanelBody title={"Counter Layout"}>
                <SelectControl 
                    label={"Change layout"}							
                    options={[
                        { label: "Classic", value: "classic" },
                        { label: "Advance", value: "advance" },
                    ]}
                    value={counterLayout}
                    onChange={onChangeCounterLayout}
                
                />
            </PanelBody>
            <PanelBody title={"Content"}>
                <RangeControl
                    label= "Widget Size"
                    value={ widgetSize }
                    onChange={ (value)=>{setAttributes({widgetSize:value})} }
                    min={ 150 }
                    max={ 1000 }
                    step ={1}
                />
                <RangeControl
                    label= "Content Alignment"
                    value={ paddingTop }
                    onChange={ (value)=>{setAttributes({paddingTop:value})} }
                    min={ 0 }
                    max={ Math.floor(widgetSize/4) }
                    step ={1}
                />
                <SelectControl
                    label="Type"
                    value={type}
                    options={[
                        { label: 'Number', value: 'number' },
                        { label: 'Days since Date', value: 'days' },
                    ]}
                    onChange={onTypeChange}
                />
                <div>
                {contentControls}
                <TextControl
                    label={<strong>Title</strong>}
                    onChange={onTitleChange}
                    value = {title}
                />
                <TextControl
                        label={<strong>Prefix</strong>}
                        onChange={(value)=>{setAttributes({prefix:value})}}
                        value = {prefix}
                />
                <TextControl
                            label={<strong>PostFix</strong>}
                            onChange={(value)=>{setAttributes({postfix:value})}}
                            value = {postfix}
                />
        </div>
            </PanelBody>
            <PanelBody title={"Styling and color"}>

                <SelectControl
                            label="Background Shape"
                            value={counterShapeClass}
                            options={[
                                {label: 'None', value: ''},
                                { label: 'Square', value: 'k2-cw-square' },
                                { label: 'Round', value: 'k2-cw-round' },
                                {label: 'Halo', value: 'k2-cw-halo'}
                            ]}
                            onChange={(value)=>{setAttributes({counterShapeClass:value})}}
                />

                {colorControls}
                <ColorPopup 
                        label={"Number Color"}
                        value={{ value:numberFontColor}}
                        onChange = {onChangeNumberColor}
                        PropertyName={"backgroundColor"}
                />
                


                <SelectControl
                            label="Number Font"
                            value={numberFontFamily}
                            options={GLOBAL_FONTS}
                            onChange={(value)=>{setAttributes({numberFontFamily:value})}}
                />

                <RangeControl
                    label= "Number Font Size"
                    value={ numberFontSize }
                    onChange={ (value)=>{setAttributes({numberFontSize:value})} }
                    min={ 1 }
                    max={ 8 }
                    step ={0.1}
                />

                <ColorPopup 
                        label={"Title Color"}
                        value={{ value:titleFontColor}}
                        onChange = {onChangetitleFontColor}
                        PropertyName={"backgroundColor"}
                />
                

                <SelectControl
                            label="Title Font"
                            value={titleFontFamily}
                            options={GLOBAL_FONTS}
                            onChange={(value)=>{setAttributes({titleFontFamily:value})}}
                />
                <RangeControl
                    label= "Title Font Size"
                    value={ titleFontSize }
                    onChange={ (value)=>{setAttributes({titleFontSize:value})} }
                    min={ 1 }
                    max={ 8 }
                    step ={0.1}
                />


            </PanelBody>
        </InspectorControls>
        ,
        <div className="k2-cw-parent">
            {
                counterLayout == 'advance' ?
                <div className="k2-cw-container" style={{width:'190px'}}>
                    <div className="k2-cw-content k2-contentadvance-flex" style={contentStyling}>
                        <div className={"k2-cw-advance-background"+"  "+counterShapeClass} style={advanceStytling}></div>
                        <div className="k2-cw-number" style={AdvancenumberStyling}>
                            <span className="k2-cw-prefix">{prefix}</span>
                            <span className="k2-cw-span-number">{number}</span>
                            <span className="k2-cw-postfix">{postfix}</span>
                        </div>		
                    </div>
                    <p className="k2-cw-title" style={adtitleStyling }> {title} </p>	
                </div>
                :
                <div className={"k2-cw-container"+"	 "+counterShapeClass} style={styling}>
                    <div className="k2-cw-content" style={contentStyling}>
                        <div className="k2-cw-number" style={numberStyling}>
                            <span className="k2-cw-prefix">{prefix}</span>
                            <span className="k2-cw-span-number">{number}</span>
                            <span className="k2-cw-postfix">{postfix}</span>
                        </div>
                        <p className="k2-cw-title" style={titleStyling}> {title} </p>

                    </div>
                </div>
            }
            
        </div>
		]
	);
}
