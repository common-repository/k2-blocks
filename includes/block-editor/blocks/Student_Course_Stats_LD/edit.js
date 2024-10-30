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
import { generate } from 'short-uuid';

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
    CheckboxControl,
	Card,
	CardBody,
    CardFooter ,
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

import { useSelect } from '@wordpress/data';
import {withSelect} from '@wordpress/data';
import { RawHTML, useState, useEffect } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';

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

function edit({ attributes, setAttributes, props }) {

    const { k2LdCoursedata, k2LdfilterType,
        K2ldmainContPadding, K2ldmainContMargin, K2ldmainContBorder,K2ldmainContBorderRadius,
        K2ldmainContBackground, K2ldHeadingSize,K2ldheadingFontFam, K2ldheadingFontWeight,
        K2ldCountSize, K2ldCountFontFam, K2ldCountFontWeight, K2ldheadingColor, K2ldCountColor,
        k2ldImage, k2ldImageWidth, K2ldImageBackground, K2ldImageContBorderRadius,
        K2LDImageAlignment,
        K2ldmainContPaddingInProgress,K2ldmainContMarginInProgress,
        K2ldmainContBorderInProgress, K2ldmainContBorderRadiusInProgress,
        K2ldmainContBackgroundInProgress, K2ldHeadingSizeInProgress,
        K2ldheadingFontFamInProgress, K2ldheadingFontWeightInProgress,
        K2ldheadingColorInProgress,
        K2ldCountSizeInProgress, K2ldCountFontFamInProgress,
        K2ldCountFontWeightInProgress, K2ldCountColorInProgress,
        k2ldImageInProgress, k2ldImageWidthInProgress,
        K2ldImageBackgroundInProgress, K2ldImageContBorderRadiusInProgress,
        K2LDImageAlignmentInProgress,
        K2ldmainContPaddingCompleted,K2ldmainContMarginCompleted,
        K2ldmainContBorderCompleted, K2ldmainContBorderRadiusCompleted,
        K2ldmainContBackgroundCompleted, K2ldHeadingSizeCompleted,
        K2ldheadingFontFamCompleted, K2ldheadingFontWeightCompleted,
        K2ldheadingColorCompleted,
        K2ldCountSizeCompleted, K2ldCountFontFamCompleted,
        K2ldCountFontWeightCompleted, K2ldCountColorCompleted,
        k2ldImageCompleted, k2ldImageWidthCompleted,
        K2ldImageBackgroundCompleted, K2ldImageContBorderRadiusCompleted,
        K2LDImageAlignmentCompleted,
        k2ldCourseStatDirection,
        k2ldCourseCardColwidth
    
    } = attributes;



    useEffect(() => {
        if (k2LdfilterType){
            
            var path = "/wp/v1/inprogress/k2learndash?stat=in-progress";
            wp.apiFetch({
                path: path
            }).then((k2learndash) => {
                    setAttributes({
                        k2LdCoursedata: k2learndash
                    });
                    console.log("Inprogoress COurses count:",k2LdCoursedata)
            })
            .catch((error) => {
                console.error('Error fetching k2LdCoursedata:', error);
            });

        }
			
	}, [k2LdfilterType]);

    var onChangek2ldCourseStatDirection = (newVal) => {
        setAttributes({k2ldCourseStatDirection:newVal})
    }
    var onChangek2ldCourseCardColwidth = (val) =>{
        setAttributes({k2ldCourseCardColwidth:val})
    }
    let MainContainerStyle = {
        flexDirection: k2ldCourseStatDirection
    }


    var onChangeK2ldmainContPadding = (NewPad) => {
        setAttributes({K2ldmainContPadding:NewPad})
    }
    var onChangeK2ldmainContMargin = (NewMar) => {
        setAttributes({K2ldmainContMargin:NewMar})
    }
    var onChangeK2ldmainContBorder = (Newborder) => {
        setAttributes({K2ldmainContBorder:Newborder})
    }
    var onChangeK2ldmainContBorderRadius = (NewVal) => {
        setAttributes({K2ldmainContBorderRadius:NewVal});
    }
    var onChangeK2ldmainContBackground = (NewVal) => {
        setAttributes({K2ldmainContBackground:NewVal})
    }

    var onChangeK2ldmainContPaddingInProgress = (NewPad) => {
        setAttributes({K2ldmainContPaddingInProgress:NewPad})
    }
    var onChangeK2ldmainContMarginInProgress = (NewMar) => {
        setAttributes({K2ldmainContMarginInProgress:NewMar})
    }
    var onChangeK2ldmainContBorderInProgress = (Newborder) => {
        setAttributes({K2ldmainContBorderInProgress:Newborder})
    }
    var onChangeK2ldmainContBorderRadiusInProgress = (NewVal) => {
        setAttributes({K2ldmainContBorderRadiusInProgress:NewVal});
    }
    var onChangeK2ldmainContBackgroundInProgress = (NewVal) => {
        setAttributes({K2ldmainContBackgroundInProgress:NewVal})
    }

    var onChangeK2ldmainContPaddingCompleted = (NewPad) => {
        setAttributes({K2ldmainContPaddingCompleted:NewPad})
    }
    var onChangeK2ldmainContMarginCompleted = (NewMar) => {
        setAttributes({K2ldmainContMarginCompleted:NewMar})
    }
    var onChangeK2ldmainContBorderCompleted = (Newborder) => {
        setAttributes({K2ldmainContBorderCompleted:Newborder})
    }
    var onChangeK2ldmainContBorderRadiusCompleted = (NewVal) => {
        setAttributes({K2ldmainContBorderRadiusCompleted:NewVal});
    }
    var onChangeK2ldmainContBackgroundCompleted = (NewVal) => {
        setAttributes({K2ldmainContBackgroundCompleted:NewVal})
    }


    const colorOptions = [
		{ name: 'blue', color: '#00f' },
		{ name: 'black', color: '#000' },
		{ name: 'Purple', color: '#2C2A4A' },
		{ name: 'Light Purple', color: '#4F518C' },
	]
    var mainCardContainerStyle ={
        paddingTop: K2ldmainContPadding.top,
		paddingRight: K2ldmainContPadding.right,
		paddingBottom: K2ldmainContPadding.bottom,
		paddingLeft: K2ldmainContPadding.left,
        marginTop: K2ldmainContMargin.top,
		marginRight: K2ldmainContMargin.right,
		marginBottom: K2ldmainContMargin.bottom,
		marginLeft: K2ldmainContMargin.left,
        borderColor: K2ldmainContBorder.color,
        borderStyle: K2ldmainContBorder.style,
        borderWidth: K2ldmainContBorder.width,
        borderTopLeftRadius: K2ldmainContBorderRadius.top,
		borderTopRightRadius: K2ldmainContBorderRadius.right,
		borderBottomRightRadius: K2ldmainContBorderRadius.bottom,
		borderBottomLeftRadius: K2ldmainContBorderRadius.left,
        background: K2ldmainContBackground

    }

    if(k2ldCourseStatDirection === 'column'){
        mainCardContainerStyle.width=`${k2ldCourseCardColwidth}%`
    }

    var mainCardContainerStyleInProgress ={
        paddingTop: K2ldmainContPaddingInProgress.top,
		paddingRight: K2ldmainContPaddingInProgress.right,
		paddingBottom: K2ldmainContPaddingInProgress.bottom,
		paddingLeft: K2ldmainContPaddingInProgress.left,
        marginTop: K2ldmainContMarginInProgress.top,
		marginRight: K2ldmainContMarginInProgress.right,
		marginBottom: K2ldmainContMarginInProgress.bottom,
		marginLeft: K2ldmainContMarginInProgress.left,
        borderColor: K2ldmainContBorderInProgress.color,
        borderStyle: K2ldmainContBorderInProgress.style,
        borderWidth: K2ldmainContBorderInProgress.width,
        borderTopLeftRadius: K2ldmainContBorderRadiusInProgress.top,
		borderTopRightRadius: K2ldmainContBorderRadiusInProgress.right,
		borderBottomRightRadius: K2ldmainContBorderRadiusInProgress.bottom,
		borderBottomLeftRadius: K2ldmainContBorderRadiusInProgress.left,
        background: K2ldmainContBackgroundInProgress

    }
    if(k2ldCourseStatDirection === 'column'){
        mainCardContainerStyleInProgress.width=`${k2ldCourseCardColwidth}%`
    }

    var mainCardContainerStyleCompleted ={
        paddingTop: K2ldmainContPaddingCompleted.top,
		paddingRight: K2ldmainContPaddingCompleted.right,
		paddingBottom: K2ldmainContPaddingCompleted.bottom,
		paddingLeft: K2ldmainContPaddingCompleted.left,
        marginTop: K2ldmainContMarginCompleted.top,
		marginRight: K2ldmainContMarginCompleted.right,
		marginBottom: K2ldmainContMarginCompleted.bottom,
		marginLeft: K2ldmainContMarginCompleted.left,
        borderColor: K2ldmainContBorderCompleted.color,
        borderStyle: K2ldmainContBorderCompleted.style,
        borderWidth: K2ldmainContBorderCompleted.width,
        borderTopLeftRadius: K2ldmainContBorderRadiusCompleted.top,
		borderTopRightRadius: K2ldmainContBorderRadiusCompleted.right,
		borderBottomRightRadius: K2ldmainContBorderRadiusCompleted.bottom,
		borderBottomLeftRadius: K2ldmainContBorderRadiusCompleted.left,
        background: K2ldmainContBackgroundCompleted

    }
    if(k2ldCourseStatDirection === 'column'){
        mainCardContainerStyleCompleted.width=`${k2ldCourseCardColwidth}%`
    }

    var onChangeK2ldHeadingSize = (newVal) => {
        setAttributes({K2ldHeadingSize:newVal})
    }
    var onChangeK2ldheadingFontFam = (newVal) => {
        setAttributes({K2ldheadingFontFam:newVal})
    }

    var onChaneK2ldheadingFontWeight = (NewVal) => {
        setAttributes({K2ldheadingFontWeight: NewVal})
    }

    var onChangeK2ldheadingColor = (NewVal) => {
        setAttributes({K2ldheadingColor: NewVal})
    }

    var onChangeK2ldHeadingSizeInProgress = (newVal) => {
        setAttributes({K2ldHeadingSizeInProgress:newVal})
    }
    var onChangeK2ldheadingFontFamInProgress = (newVal) => {
        setAttributes({K2ldheadingFontFamInProgress:newVal})
    }

    var onChaneK2ldheadingFontWeightInProgress = (NewVal) => {
        setAttributes({K2ldheadingFontWeightInProgress: NewVal})
    }

    var onChangeK2ldheadingColorInProgress = (NewVal) => {
        setAttributes({K2ldheadingColorInProgress: NewVal})
    }

    var onChangeK2ldHeadingSizeCompleted = (newVal) => {
        setAttributes({K2ldHeadingSizeCompleted:newVal})
    }
    var onChangeK2ldheadingFontFamCompleted = (newVal) => {
        setAttributes({K2ldheadingFontFamCompleted:newVal})
    }

    var onChaneK2ldheadingFontWeightCompleted = (NewVal) => {
        setAttributes({K2ldheadingFontWeightCompleted: NewVal})
    }

    var onChangeK2ldheadingColorCompleted = (NewVal) => {
        setAttributes({K2ldheadingColorCompleted: NewVal})
    }

    var ldtotalCourseStyle = {
        fontSize: K2ldHeadingSize,
        fontFamily: K2ldheadingFontFam,
        fontWeight: K2ldheadingFontWeight,
        color: K2ldheadingColor
    }
    var ldtotalCourseStyleInProgress = {
        fontSize: K2ldHeadingSizeInProgress,
        fontFamily: K2ldheadingFontFamInProgress,
        fontWeight: K2ldheadingFontWeightInProgress,
        color: K2ldheadingColorInProgress
    }

    var ldtotalCourseStyleCompleted = {
        fontSize: K2ldHeadingSizeCompleted,
        fontFamily: K2ldheadingFontFamCompleted,
        fontWeight: K2ldheadingFontWeightCompleted,
        color: K2ldheadingColorCompleted
    }

    var onChangeK2ldCountSize = (newVal) => {
        setAttributes({K2ldCountSize:newVal})
    }
    var onChangeK2ldCountFontFam = (newVal) => {
        setAttributes({K2ldCountFontFam:newVal})
    }

    var onChaneK2ldCountFontWeight = (NewVal) => {
        setAttributes({K2ldCountFontWeight: NewVal})
    }
    var onChangeK2ldCountColor = (newVal) =>{
        setAttributes({K2ldCountColor:newVal});
    }

    var onChangeK2ldCountSizeInProgress = (newVal) => {
        setAttributes({K2ldCountSizeInProgress:newVal})
    }
    var onChangeK2ldCountFontFamInProgress = (newVal) => {
        setAttributes({K2ldCountFontFamInProgress:newVal})
    }

    var onChaneK2ldCountFontWeightInProgress = (NewVal) => {
        setAttributes({K2ldCountFontWeightInProgress: NewVal})
    }
    var onChangeK2ldCountColorInProgress = (newVal) =>{
        setAttributes({K2ldCountColorInProgress:newVal});
    }

    var onChangeK2ldCountSizeCompleted = (newVal) => {
        setAttributes({K2ldCountSizeCompleted:newVal})
    }
    var onChangeK2ldCountFontFamCompleted = (newVal) => {
        setAttributes({K2ldCountFontFamCompleted:newVal})
    }

    var onChaneK2ldCountFontWeightCompleted = (NewVal) => {
        setAttributes({K2ldCountFontWeightCompleted: NewVal})
    }
    var onChangeK2ldCountColorCompleted = (newVal) =>{
        setAttributes({K2ldCountColorCompleted:newVal});
    }

    var ldCountStyle = {
        fontSize: K2ldCountSize,
        fontFamily: K2ldCountFontFam,
        fontWeight: K2ldCountFontWeight,
        color: K2ldCountColor
    }

    var ldCountStyleInProgress = {
        fontSize: K2ldCountSizeInProgress,
        fontFamily: K2ldCountFontFamInProgress,
        fontWeight: K2ldCountFontWeightInProgress,
        color: K2ldCountColorInProgress
    }

    var ldCountStyleCompleted = {
        fontSize: K2ldCountSizeCompleted,
        fontFamily: K2ldCountFontFamCompleted,
        fontWeight: K2ldCountFontWeightCompleted,
        color: K2ldCountColorCompleted
    }

    var onChangek2ldImage = (newImg) => {
        setAttributes({k2ldImage:newImg.url})
    }

    var onChangek2ldImageWidth = (NewVal) => {
        setAttributes({k2ldImageWidth:NewVal})
    }

    var onChangek2ldImageInProgress = (newImg) => {
        setAttributes({k2ldImageInProgress:newImg.url})
    }

    var onChangek2ldImageWidthInProgress = (NewVal) => {
        setAttributes({k2ldImageWidthInProgress:NewVal})
    }
    
    var onChangek2ldImageCompleted = (newImg) => {
        setAttributes({k2ldImageCompleted:newImg.url})
    }

    var onChangek2ldImageWidthCompleted = (NewVal) => {
        setAttributes({k2ldImageWidthCompleted:NewVal})
    }


    var K2imgstyles= {
        width: k2ldImageWidth+'%'
    }
    var K2imgstylesInProgress= {
        width: k2ldImageWidthInProgress+'%'
    }
    var K2imgstylesCompleted= {
        width: k2ldImageWidthCompleted+'%'
    }

    var onChangeK2ldImageBackground = (NewVal) => {
        setAttributes({K2ldImageBackground:NewVal})
    }

    var onChangeK2ldImageContBorderRadius = (NewVal) => {
        setAttributes({K2ldImageContBorderRadius:NewVal})
    }
    const onChangeK2LDImageAlignment = (NewAllignment) => {
		setAttributes({
            K2LDImageAlignment: NewAllignment
			})
		
	}
    var onChangeK2ldImageBackgroundInProgress = (NewVal) => {
        setAttributes({K2ldImageBackgroundInProgress:NewVal})
    }

    var onChangeK2ldImageContBorderRadiusInProgress = (NewVal) => {
        setAttributes({K2ldImageContBorderRadiusInProgress:NewVal})
    }
    const onChangeK2LDImageAlignmentInProgress = (NewAllignment) => {
		setAttributes({
            K2LDImageAlignmentInProgress: NewAllignment
			})
		
	}

    var onChangeK2ldImageBackgroundCompleted = (NewVal) => {
        setAttributes({K2ldImageBackgroundCompleted:NewVal})
    }

    var onChangeK2ldImageContBorderRadiusCompleted = (NewVal) => {
        setAttributes({K2ldImageContBorderRadiusCompleted:NewVal})
    }
    const onChangeK2LDImageAlignmentCompleted = (NewAllignment) => {
		setAttributes({
            K2LDImageAlignmentCompleted: NewAllignment
			})
		
	}


    var ImageContStyles = {
        backgroundColor: K2ldImageBackground,
        borderTopLeftRadius: K2ldImageContBorderRadius.top,
		borderTopRightRadius: K2ldImageContBorderRadius.right,
		borderBottomRightRadius: K2ldImageContBorderRadius.bottom,
		borderBottomLeftRadius: K2ldImageContBorderRadius.left,
        justifyContent:K2LDImageAlignment

    }
    var ImageContStylesInProgress = {
        backgroundColor: K2ldImageBackgroundInProgress,
        borderTopLeftRadius: K2ldImageContBorderRadiusInProgress.top,
		borderTopRightRadius: K2ldImageContBorderRadiusInProgress.right,
		borderBottomRightRadius: K2ldImageContBorderRadiusInProgress.bottom,
		borderBottomLeftRadius: K2ldImageContBorderRadiusInProgress.left,
        justifyContent:K2LDImageAlignmentInProgress

    }

    var ImageContStylesCompleted = {
        backgroundColor: K2ldImageBackgroundCompleted,
        borderTopLeftRadius: K2ldImageContBorderRadiusCompleted.top,
		borderTopRightRadius: K2ldImageContBorderRadiusCompleted.right,
		borderBottomRightRadius: K2ldImageContBorderRadiusCompleted.bottom,
		borderBottomLeftRadius: K2ldImageContBorderRadiusCompleted.left,
        justifyContent:K2LDImageAlignmentCompleted

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
 
    return(
        <div {...useBlockProps({className: 'Student_course_stats_LD_main'})} style={MainContainerStyle}>
            <div className="k2_ld_total_course_parent_container" style={mainCardContainerStyle}>
                <div className="k2_ld_total_course_left">
                    <h4 style={ldtotalCourseStyle}>Not Started</h4>
                    <h3 style={ldCountStyle}>
                        {k2LdCoursedata ?
                              k2LdCoursedata.filter(item => item.status.status === "not_started").length
                        : 0
                        }
                    </h3>
                </div>
                <div className="k2_ld_total_course_right">
                    <div className="k2_ld_total_course_image_container" style={ImageContStyles}>
                        <img src={k2ldImage} style={K2imgstyles} />
                    </div>
                </div>
            </div>
            <div className="k2_ld_total_course_parent_container" style={mainCardContainerStyleInProgress}>
                <div className="k2_ld_total_course_left">
                    <h4 style={ldtotalCourseStyleInProgress}>In-Progress</h4>
                    <h3 style={ldCountStyleInProgress}>
                        {k2LdCoursedata ?
                              k2LdCoursedata.filter(item => item.status.status === "in_progress").length
                        : 0
                        }
                    </h3>
                </div>
                <div className="k2_ld_total_course_right">
                    <div className="k2_ld_total_course_image_container" style={ImageContStylesInProgress}>
                        <img src={k2ldImageInProgress} style={K2imgstylesInProgress} />
                    </div>
                </div>
            </div>
            <div className="k2_ld_total_course_parent_container" style={mainCardContainerStyleCompleted}>
                <div className="k2_ld_total_course_left">
                    <h4 style={ldtotalCourseStyleCompleted}>Completed</h4>
                    <h3 style={ldCountStyleCompleted}>
                        {k2LdCoursedata ?
                              k2LdCoursedata.filter(item => item.status.status === "completed").length
                        : 0
                        }
                    </h3>
                </div>
                <div className="k2_ld_total_course_right">
                    <div className="k2_ld_total_course_image_container" style={ImageContStylesCompleted}>
                        <img src={k2ldImageCompleted} style={K2imgstylesCompleted} />
                    </div>
                </div>
            </div>
            <InspectorControls>
                <Card>
                    <CardHeader>Cards Alignment</CardHeader>
                    <CardBody>
                        <SelectControl
                            value={k2ldCourseStatDirection}
                            onChange={onChangek2ldCourseStatDirection}
                            options={[
                                { label: 'Row', value: 'row' },
                                { label: 'Column', value: 'column' },
                            ]}
                            />
                        {
                            k2ldCourseStatDirection == 'column' ? 
                            <RangeControl
                                label='Width'
                                value={k2ldCourseCardColwidth}
                                onChange={onChangek2ldCourseCardColwidth}
                            />
                            :null
                        }
                    </CardBody>
                </Card>
                <PanelBody title={__("Not Started Card")}>
                    <PanelBody title={__("Spacing Options")} initialOpen={false}>
                        <Card>
                            <CardHeader>
                                <BoxControl
                                    label="Padding"
                                    value={K2ldmainContPadding}
                                    onChange={onChangeK2ldmainContPadding}
                                />
                            </CardHeader>
                            <CardBody>
                            <BoxControl
                                    label="Margin"
                                    value={K2ldmainContMargin}
                                    onChange={onChangeK2ldmainContMargin}
                                />
                            </CardBody>
                            <CardFooter>
                                <BorderBoxControl 
                                    label="Borders"
                                    onChange={onChangeK2ldmainContBorder}
                                    value={K2ldmainContBorder}
                                    colors = {colorOptions}
                                    
                                />
                            </CardFooter>
                            <CardHeader>
                                <BoxControl 
                                    label="border radius"
                                    value={K2ldmainContBorderRadius}
                                    onChange={onChangeK2ldmainContBorderRadius}
                                />
                            </CardHeader>
                        </Card>
                    </PanelBody>
                    <PanelBody title={__("Background Color")} initialOpen={false} >
                        <Card>
                            <CardBody>
                                <ColorPopup 
                                    label={"Background Color"}
                                    value={{ value: K2ldmainContBackground}}
                                    onChange = {onChangeK2ldmainContBackground}
                                    PropertyName={"backgroundColor"}
                                />
                            </CardBody>
                        </Card>
                    </PanelBody>
                    <PanelBody title={__("Text Size and Style")} initialOpen={false}>
                        <Card>
                            <CardHeader>Heading size</CardHeader>
                            <CardBody>
                                <RangeControl 
                                    value={K2ldHeadingSize}
                                    onChange = {onChangeK2ldHeadingSize}

                                />
                                <Flex>
                                    <FlexItem>
                                        <SelectControl
                                            label="Font Family"
                                            value={K2ldheadingFontFam}
                                            options={ GLOBAL_FONTS }
                                            onChange={onChangeK2ldheadingFontFam}

                                        />
                                    </FlexItem>
                                    <FlexItem>
                                        <SelectControl
                                            label="Font Weight"
                                            value={K2ldheadingFontWeight}
                                            options={ GLOBAL_FONTS_WEIGHTS }
                                            onChange={onChaneK2ldheadingFontWeight}

                                        />
                                    </FlexItem>
                                </Flex>
                            </CardBody>
                            <CardBody>
                                <ColorPopup 
                                    label={"Text color"}
                                    value={{ value:K2ldheadingColor}}
                                    onChange = {onChangeK2ldheadingColor}
                                    PropertyName={"backgroundColor"}
                                />
                            </CardBody>
                        </Card>
                        <Card>
                            <CardHeader>Count size</CardHeader>
                            <CardBody>
                                <RangeControl 
                                    value={K2ldCountSize}
                                    onChange = {onChangeK2ldCountSize}

                                />
                                <Flex>
                                    <FlexItem>
                                        <SelectControl
                                            label="Font Family"
                                            value={K2ldCountFontFam}
                                            options={ GLOBAL_FONTS }
                                            onChange={onChangeK2ldCountFontFam}

                                        />
                                    </FlexItem>
                                    <FlexItem>
                                        <SelectControl
                                            label="Font Weight"
                                            value={K2ldCountFontWeight}
                                            options={ GLOBAL_FONTS_WEIGHTS }
                                            onChange={onChaneK2ldCountFontWeight}

                                        />
                                    </FlexItem>
                                </Flex>
                            </CardBody>
                            <CardBody>
                                <ColorPopup 
                                    label={"Text color"}
                                    value={{ value:K2ldCountColor}}
                                    onChange = {onChangeK2ldCountColor}
                                    PropertyName={"backgroundColor"}
                                />
                                </CardBody>
                        </Card>
                    </PanelBody>
                    <PanelBody title={__("Image Settings")} initialOpen={false}>
                            <Card>
                                <CardBody>
                                    <MediaUpload
                                        accept = "image/*"
                                        allowedTypes={ [ 'image' ] }
                                        value={k2ldImage}
                                        onSelect={ onChangek2ldImage }
                                        render={ ({open}) => {
                                            return <div style={{backgroundImage: 'url("' + k2ldImage + '")'}} className={'k2-AB-image-select-control'}>
                                                {/* <FontAwesomeIcon className='K2-testimonial-imageUpload-icon-Block' icon={faPlusCircle} onClick={open}/> */}
                                                <i className="fa fa-plus-circle" onClick={open}></i>
                                            </div>;
                                        }}
                                    />
                                </CardBody>
                            </Card>
                            <Card>
                                <CardBody>
                                    <RangeControl
                                        label="width"
                                        value={k2ldImageWidth}
                                        onChange={onChangek2ldImageWidth}
                                    />
                                </CardBody>
                                <CardBody>
                                    <ColorPopup 
                                        label={"Image Background Color"}
                                        value={{ value:K2ldImageBackground}}
                                        onChange = {onChangeK2ldImageBackground}
                                        PropertyName={"backgroundColor"}
                                    />
                                    <PanelRow>

                                        <div style={{paddingBottom: '2%'}}>
                                            <label><strong>Alignment</strong></label>
                                        </div>
                                        <div id = {'AlignmentIconsParent'} className={'k2-ib-inspector-control-alignment'} onClick={onChangeAlignmentIconChange}>

                                            <div className={'k2-ib-inspector-control-alignment-single'}  onClick={() => onChangeK2LDImageAlignment('flex-start')}>
                                                <span className="fa fa-align-left k2-ib-alignment-icon-style" ></span>
                                            </div>
                                            <div className={'k2-ib-inspector-control-alignment-single'} onClick={() => onChangeK2LDImageAlignment('center')}>
                                                <span className="fa fa-align-center k2-ib-alignment-icon-style k2-ib-active"></span>
                                            </div>
                                            <div className={'k2-ib-inspector-control-alignment-single'} onClick={() => onChangeK2LDImageAlignment('flex-end')}>
                                                <span className="fa fa-align-right k2-ib-alignment-icon-style"></span>
                                            </div>
                                        </div>

                                    </PanelRow>
                                </CardBody>
                                <CardBody>
                                    <BoxControl 
                                        label="border radius"
                                        value={K2ldImageContBorderRadius}
                                        onChange={onChangeK2ldImageContBorderRadius}
                                    />
                                </CardBody>
                            </Card>
                    </PanelBody>
                </PanelBody>
                <PanelBody title={__("In Progress Card")} >
                    <PanelBody title={__("Spacing Options")} initialOpen={false}>
                        <Card>
                            <CardHeader>
                                <BoxControl
                                    label="Padding"
                                    value={K2ldmainContPaddingInProgress}
                                    onChange={onChangeK2ldmainContPaddingInProgress}
                                />
                            </CardHeader>
                            <CardBody>
                            <BoxControl
                                    label="Margin"
                                    value={K2ldmainContMarginInProgress}
                                    onChange={onChangeK2ldmainContMarginInProgress}
                                />
                            </CardBody>
                            <CardFooter>
                                <BorderBoxControl 
                                    label="Borders"
                                    onChange={onChangeK2ldmainContBorderInProgress}
                                    value={K2ldmainContBorderInProgress}
                                    colors = {colorOptions}
                                    
                                />
                            </CardFooter>
                            <CardHeader>
                                <BoxControl 
                                    label="border radius"
                                    value={K2ldmainContBorderRadiusInProgress}
                                    onChange={onChangeK2ldmainContBorderRadiusInProgress}
                                />
                            </CardHeader>
                        </Card>
                    </PanelBody>
                    <PanelBody title={__("Background Color")} initialOpen={false} >
                        <Card>
                            <CardBody>
                                <ColorPopup 
                                    label={"Background Color"}
                                    value={{ value: K2ldmainContBackgroundInProgress}}
                                    onChange = {onChangeK2ldmainContBackgroundInProgress}
                                    PropertyName={"backgroundColor"}
                                />
                            </CardBody>
                        </Card>
                    </PanelBody>
                    <PanelBody title={__("Text Size and Style")} initialOpen={false}>
                        <Card>
                            <CardHeader>Heading size</CardHeader>
                            <CardBody>
                                <RangeControl 
                                    value={K2ldHeadingSizeInProgress}
                                    onChange = {onChangeK2ldHeadingSizeInProgress}

                                />
                                <Flex>
                                    <FlexItem>
                                        <SelectControl
                                            label="Font Family"
                                            value={K2ldheadingFontFamInProgress}
                                            options={ GLOBAL_FONTS }
                                            onChange={onChangeK2ldheadingFontFamInProgress}

                                        />
                                    </FlexItem>
                                    <FlexItem>
                                        <SelectControl
                                            label="Font Weight"
                                            value={K2ldheadingFontWeightInProgress}
                                            options={ GLOBAL_FONTS_WEIGHTS }
                                            onChange={onChaneK2ldheadingFontWeightInProgress}

                                        />
                                    </FlexItem>
                                </Flex>
                            </CardBody>
                            <CardBody>
                                <ColorPopup 
                                    label={"Text color"}
                                    value={{ value:K2ldheadingColorInProgress}}
                                    onChange = {onChangeK2ldheadingColorInProgress}
                                    PropertyName={"backgroundColor"}
                                />
                            </CardBody>
                        </Card>
                        <Card>
                            <CardHeader>Count size</CardHeader>
                            <CardBody>
                                <RangeControl 
                                    value={K2ldCountSizeInProgress}
                                    onChange = {onChangeK2ldCountSizeInProgress}

                                />
                                <Flex>
                                    <FlexItem>
                                        <SelectControl
                                            label="Font Family"
                                            value={K2ldCountFontFamInProgress}
                                            options={ GLOBAL_FONTS }
                                            onChange={onChangeK2ldCountFontFamInProgress}

                                        />
                                    </FlexItem>
                                    <FlexItem>
                                        <SelectControl
                                            label="Font Weight"
                                            value={K2ldCountFontWeightInProgress}
                                            options={ GLOBAL_FONTS_WEIGHTS }
                                            onChange={onChaneK2ldCountFontWeightInProgress}

                                        />
                                    </FlexItem>
                                </Flex>
                            </CardBody>
                            <CardBody>
                                <ColorPopup 
                                    label={"Text color"}
                                    value={{ value:K2ldCountColorInProgress}}
                                    onChange = {onChangeK2ldCountColorInProgress}
                                    PropertyName={"backgroundColor"}
                                />
                                </CardBody>
                        </Card>
                    </PanelBody>
                    <PanelBody title={__("Image Settings")} initialOpen={false}>
                            <Card>
                                <CardBody>
                                    <MediaUpload
                                        accept = "image/*"
                                        allowedTypes={ [ 'image' ] }
                                        value={k2ldImageInProgress}
                                        onSelect={ onChangek2ldImageInProgress }
                                        render={ ({open}) => {
                                            return <div style={{backgroundImage: 'url("' + k2ldImageInProgress + '")'}} className={'k2-AB-image-select-control'}>
                                                {/* <FontAwesomeIcon className='K2-testimonial-imageUpload-icon-Block' icon={faPlusCircle} onClick={open}/> */}
                                                <i className="fa fa-plus-circle" onClick={open}></i>
                                            </div>;
                                        }}
                                    />
                                </CardBody>
                            </Card>
                            <Card>
                                <CardBody>
                                    <RangeControl
                                        label="width"
                                        value={k2ldImageWidthInProgress}
                                        onChange={onChangek2ldImageWidthInProgress}
                                    />
                                </CardBody>
                                <CardBody>
                                    <ColorPopup 
                                        label={"Image Background Color"}
                                        value={{ value:K2ldImageBackgroundInProgress}}
                                        onChange = {onChangeK2ldImageBackgroundInProgress}
                                        PropertyName={"backgroundColor"}
                                    />
                                    <PanelRow>

                                        <div style={{paddingBottom: '2%'}}>
                                            <label><strong>Alignment</strong></label>
                                        </div>
                                        <div id = {'AlignmentIconsParent'} className={'k2-ib-inspector-control-alignment'} onClick={onChangeAlignmentIconChange}>

                                            <div className={'k2-ib-inspector-control-alignment-single'}  onClick={() => onChangeK2LDImageAlignmentInProgress('flex-start')}>
                                                <span className="fa fa-align-left k2-ib-alignment-icon-style" ></span>
                                            </div>
                                            <div className={'k2-ib-inspector-control-alignment-single'} onClick={() => onChangeK2LDImageAlignmentInProgress('center')}>
                                                <span className="fa fa-align-center k2-ib-alignment-icon-style k2-ib-active"></span>
                                            </div>
                                            <div className={'k2-ib-inspector-control-alignment-single'} onClick={() => onChangeK2LDImageAlignmentInProgress('flex-end')}>
                                                <span className="fa fa-align-right k2-ib-alignment-icon-style"></span>
                                            </div>
                                        </div>

                                    </PanelRow>
                                </CardBody>
                                <CardBody>
                                    <BoxControl 
                                        label="border radius"
                                        value={K2ldImageContBorderRadiusInProgress}
                                        onChange={onChangeK2ldImageContBorderRadiusInProgress}
                                    />
                                </CardBody>
                            </Card>
                    </PanelBody>
                </PanelBody>
                <PanelBody title={__("Completed Card")} >
                    <PanelBody title={__("Spacing Options")} initialOpen={false}>
                        <Card>
                            <CardHeader>
                                <BoxControl
                                    label="Padding"
                                    value={K2ldmainContPaddingCompleted}
                                    onChange={onChangeK2ldmainContPaddingCompleted}
                                />
                            </CardHeader>
                            <CardBody>
                            <BoxControl
                                    label="Margin"
                                    value={K2ldmainContMarginCompleted}
                                    onChange={onChangeK2ldmainContMarginCompleted}
                                />
                            </CardBody>
                            <CardFooter>
                                <BorderBoxControl 
                                    label="Borders"
                                    onChange={onChangeK2ldmainContBorderCompleted}
                                    value={K2ldmainContBorderCompleted}
                                    colors = {colorOptions}
                                    
                                />
                            </CardFooter>
                            <CardHeader>
                                <BoxControl 
                                    label="border radius"
                                    value={K2ldmainContBorderRadiusCompleted}
                                    onChange={onChangeK2ldmainContBorderRadiusCompleted}
                                />
                            </CardHeader>
                        </Card>
                    </PanelBody>
                    <PanelBody title={__("Background Color")} initialOpen={false} >
                        <Card>
                            <CardBody>
                                <ColorPopup 
                                    label={"Background Color"}
                                    value={{ value: K2ldmainContBackgroundCompleted}}
                                    onChange = {onChangeK2ldmainContBackgroundCompleted}
                                    PropertyName={"backgroundColor"}
                                />
                            </CardBody>
                        </Card>
                    </PanelBody>
                    <PanelBody title={__("Text Size and Style")} initialOpen={false}>
                        <Card>
                            <CardHeader>Heading size</CardHeader>
                            <CardBody>
                                <RangeControl 
                                    value={K2ldHeadingSizeCompleted}
                                    onChange = {onChangeK2ldHeadingSizeCompleted}

                                />
                                <Flex>
                                    <FlexItem>
                                        <SelectControl
                                            label="Font Family"
                                            value={K2ldheadingFontFamCompleted}
                                            options={ GLOBAL_FONTS }
                                            onChange={onChangeK2ldheadingFontFamCompleted}

                                        />
                                    </FlexItem>
                                    <FlexItem>
                                        <SelectControl
                                            label="Font Weight"
                                            value={K2ldheadingFontWeightCompleted}
                                            options={ GLOBAL_FONTS_WEIGHTS }
                                            onChange={onChaneK2ldheadingFontWeightCompleted}

                                        />
                                    </FlexItem>
                                </Flex>
                            </CardBody>
                            <CardBody>
                                <ColorPopup 
                                    label={"Text color"}
                                    value={{ value:K2ldheadingColorCompleted}}
                                    onChange = {onChangeK2ldheadingColorCompleted}
                                    PropertyName={"backgroundColor"}
                                />
                            </CardBody>
                        </Card>
                        <Card>
                            <CardHeader>Count size</CardHeader>
                            <CardBody>
                                <RangeControl 
                                    value={K2ldCountSizeCompleted}
                                    onChange = {onChangeK2ldCountSizeCompleted}

                                />
                                <Flex>
                                    <FlexItem>
                                        <SelectControl
                                            label="Font Family"
                                            value={K2ldCountFontFamCompleted}
                                            options={ GLOBAL_FONTS }
                                            onChange={onChangeK2ldCountFontFamCompleted}

                                        />
                                    </FlexItem>
                                    <FlexItem>
                                        <SelectControl
                                            label="Font Weight"
                                            value={K2ldCountFontWeightCompleted}
                                            options={ GLOBAL_FONTS_WEIGHTS }
                                            onChange={onChaneK2ldCountFontWeightCompleted}

                                        />
                                    </FlexItem>
                                </Flex>
                            </CardBody>
                            <CardBody>
                                <ColorPopup 
                                    label={"Text color"}
                                    value={{ value:K2ldCountColorCompleted}}
                                    onChange = {onChangeK2ldCountColorCompleted}
                                    PropertyName={"backgroundColor"}
                                />
                                </CardBody>
                        </Card>
                    </PanelBody>
                    <PanelBody title={__("Image Settings")} initialOpen={false}>
                            <Card>
                                <CardBody>
                                    <MediaUpload
                                        accept = "image/*"
                                        allowedTypes={ [ 'image' ] }
                                        value={k2ldImageCompleted}
                                        onSelect={ onChangek2ldImageCompleted }
                                        render={ ({open}) => {
                                            return <div style={{backgroundImage: 'url("' + k2ldImageCompleted + '")'}} className={'k2-AB-image-select-control'}>
                                                {/* <FontAwesomeIcon className='K2-testimonial-imageUpload-icon-Block' icon={faPlusCircle} onClick={open}/> */}
                                                <i className="fa fa-plus-circle" onClick={open}></i>
                                            </div>;
                                        }}
                                    />
                                </CardBody>
                            </Card>
                            <Card>
                                <CardBody>
                                    <RangeControl
                                        label="width"
                                        value={k2ldImageWidthCompleted}
                                        onChange={onChangek2ldImageWidthCompleted}
                                    />
                                </CardBody>
                                <CardBody>
                                    <ColorPopup 
                                        label={"Image Background Color"}
                                        value={{ value:K2ldImageBackgroundCompleted}}
                                        onChange = {onChangeK2ldImageBackgroundCompleted}
                                        PropertyName={"backgroundColor"}
                                    />
                                    <PanelRow>

                                        <div style={{paddingBottom: '2%'}}>
                                            <label><strong>Alignment</strong></label>
                                        </div>
                                        <div id = {'AlignmentIconsParent'} className={'k2-ib-inspector-control-alignment'} onClick={onChangeAlignmentIconChange}>

                                            <div className={'k2-ib-inspector-control-alignment-single'}  onClick={() => onChangeK2LDImageAlignmentCompleted('flex-start')}>
                                                <span className="fa fa-align-left k2-ib-alignment-icon-style" ></span>
                                            </div>
                                            <div className={'k2-ib-inspector-control-alignment-single'} onClick={() => onChangeK2LDImageAlignmentCompleted('center')}>
                                                <span className="fa fa-align-center k2-ib-alignment-icon-style k2-ib-active"></span>
                                            </div>
                                            <div className={'k2-ib-inspector-control-alignment-single'} onClick={() => onChangeK2LDImageAlignmentCompleted('flex-end')}>
                                                <span className="fa fa-align-right k2-ib-alignment-icon-style"></span>
                                            </div>
                                        </div>

                                    </PanelRow>
                                </CardBody>
                                <CardBody>
                                    <BoxControl 
                                        label="border radius"
                                        value={K2ldImageContBorderRadiusCompleted}
                                        onChange={onChangeK2ldImageContBorderRadiusCompleted}
                                    />
                                </CardBody>
                            </Card>
                    </PanelBody>
                </PanelBody>

            </InspectorControls>
        </div>
    );

}

export default edit;
