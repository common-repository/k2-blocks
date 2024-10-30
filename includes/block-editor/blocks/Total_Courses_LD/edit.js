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

    const { k2LdCoursedata, k2LdfilterType,courseMaindivID ,
        K2ldmainContPadding, K2ldmainContMargin, K2ldmainContBorder,K2ldmainContBorderRadius,
        K2ldmainContBackground, K2ldHeadingSize,K2ldheadingFontFam, K2ldheadingFontWeight,
        K2ldCountSize, K2ldCountFontFam, K2ldCountFontWeight, K2ldheadingColor, K2ldCountColor,
        k2ldImage, k2ldImageWidth, K2ldImageBackground, K2ldImageContBorderRadius, K2LDgroupList, SelectedK2groupList,
        K2LDImageAlignment } = attributes;

    const k2LdcourseFilteroptions = [
        {label: 'All', value: 'all'},
        {label: 'Users', value: 'users'},
        {label: 'Groups', value: 'groups'},
    ]

    const onChangek2LdfilterType = (NewVal) => {
        setAttributes({k2LdfilterType:NewVal})
    }

    const updateSelectedK2groupList = (value) =>{
		setAttributes({SelectedK2groupList: value})
		console.log("helloo selected",SelectedK2groupList);
	}

    useEffect(() => {
        if (k2LdfilterType){
            if(k2LdfilterType == 'users'){
                var path = "/wp/v1/k2learndash?post_type=sfwd-courses&k2Ldfilter="+k2LdfilterType;
            }
            else if(k2LdfilterType == 'groups'){
                var path = "/wp/v1/k2learndash?post_type=sfwd-courses&k2Ldfilter="+SelectedK2groupList
                console.log("else if staeemrtett",SelectedK2groupList)
            }
            else if(k2LdfilterType == 'all'){
                var path = "/wp/v1/k2learndash?post_type=sfwd-courses&k2Ldfilter="+k2LdfilterType
                console.log("else if 2 staeemrtett",k2LdfilterType)
            }
            else{
                return;
            }
            wp.apiFetch({
                path: path
            }).then((k2learndash) => {
                    setAttributes({
                        k2LdCoursedata: k2learndash
                    });
                    console.log("Final Output:",k2LdCoursedata)
            })
            .catch((error) => {
                console.error('Error fetching k2LdCoursedata:', error);
            });

        }
			
	}, [k2LdfilterType, SelectedK2groupList]);

    useEffect(() => {
		if (!K2LDgroupList) {
		  wp.apiFetch({
			path: '/wp/v1/groups/k2learndash'
		  })
			.then((posstType) => {
			  setAttributes({
				K2LDgroupList: posstType
			  });
              console.log("Grupops: ",K2LDgroupList);
			})
			.catch((error) => {
			  console.error('Error fetching K2LDgroupList:', error);
			});
		}
	  },[]);
      console.log("Groups: ",K2LDgroupList);
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

    var ldtotalCourseStyle = {
        fontSize: K2ldHeadingSize,
        fontFamily: K2ldheadingFontFam,
        fontWeight: K2ldheadingFontWeight,
        color: K2ldheadingColor
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
    var ldCountStyle = {
        fontSize: K2ldCountSize,
        fontFamily: K2ldCountFontFam,
        fontWeight: K2ldCountFontWeight,
        color: K2ldCountColor
    }

    var onChangek2ldImage = (newImg) => {
        setAttributes({k2ldImage:newImg.url})
    }

    var onChangek2ldImageWidth = (NewVal) => {
        setAttributes({k2ldImageWidth:NewVal})
    }

    var K2imgstyles= {
        width: k2ldImageWidth+'%'
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
    var ImageContStyles = {
        backgroundColor: K2ldImageBackground,
        borderTopLeftRadius: K2ldImageContBorderRadius.top,
		borderTopRightRadius: K2ldImageContBorderRadius.right,
		borderBottomRightRadius: K2ldImageContBorderRadius.bottom,
		borderBottomLeftRadius: K2ldImageContBorderRadius.left,
        justifyContent:K2LDImageAlignment

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
    // useEffect(() => {
    //     onChangeID(); // Call the onChangeID function when the component mounts
    // }, []); // Empty dependency array ensures this effect runs only once, similar to componentDidMount

    // function onChangeID() {
    //     setAttributes({
    //         courseMaindivID: 'k2-LD-total-course-' + generate()
    //     });
    // }
    return(
        <div {...useBlockProps()}>
            <div className="k2_ld_total_course_parent_container" style={mainCardContainerStyle}>
                <div className="k2_ld_total_course_left">
                    <h4 style={ldtotalCourseStyle}>Total Courses</h4>
                    <h3 style={ldCountStyle}>
                        {k2LdCoursedata ?
                            k2LdCoursedata.length
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
            <InspectorControls>
                <PanelBody title={__("Course Filers")} initialOpen={true} >
                    <Card>
                        <CardHeader>
                            <label>Select Filter</label>
                        </CardHeader>
                        <CardBody>
                            <SelectControl 
                                value={k2LdfilterType}
                                options={ k2LdcourseFilteroptions }
                                onChange={onChangek2LdfilterType}
                            />
                            {k2LdfilterType == 'groups' ?
                                <SelectControl 
                                    label="Select Course"
                                    value={ SelectedK2groupList }
                                    onChange={updateSelectedK2groupList}
                                    options={[
                                        { label: 'Select Group', value: '0' }, // Default option
                                        ...(K2LDgroupList &&
                                            K2LDgroupList.map((index) => ({
                                            label: index.post_title,
                                            value: index.ID,
                                        })))
                                    ]}

                                />
                                : null
                            }
                        </CardBody>
                    </Card>
                
                </PanelBody>
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
            
            </InspectorControls>
        </div>
    );

}

export default edit;
