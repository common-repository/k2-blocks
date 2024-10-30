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
    CheckboxControl,
	Card,
	CardBody,
    CardFooter ,
	CardHeader,
	TabPanel,
	Flex, FlexBlock, FlexItem,
    ColorPicker,
    DateTimePicker,
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

function edit({ attributes, setAttributes }) {

    const {
        k2_total_courses,SelectedK2Course, NumberOfLessons,K2ldmainContPaddingLessons, 
        K2ldmainContMarginLessons, K2ldmainContBorderLessons, K2ldmainContBorderRadiusLessons,
        K2ldmainContBackgroundLessons, K2ldHeadingSizeLessons, K2ldheadingFontFamLessons, K2ldheadingFontWeightLessons,
        K2ldheadingColorLessons, K2ldCountSizeLessons, K2ldCountFontFamLessons, K2ldCountFontWeightLessons,
        K2ldCountColorLessons, k2ldImageLessons, k2ldImageWidthLessons, K2ldImageBackgroundLessons, K2ldImageContBorderRadiusLessons,
        K2LDImageAlignmentLessons
    } = attributes;

    useEffect(() => {
		// if (!k2_total_courses) {
		wp.apiFetch({
			path: '/wp/v1/courses/k2learndash'
	    })
        .then((posstType) => {
            setAttributes({
            k2_total_courses: posstType
            });
        })
        .catch((error) => {
            console.error('Error fetching k2_total_courses:', error);
        });
		// }
	},[]);

    console.log("Courses: ",k2_total_courses);

    const updateSelectedK2Course = (newVal) =>{
		setAttributes({SelectedK2Course: newVal})
	}

    useEffect(() => {
		if (SelectedK2Course) {
            var path = "/wp/v1/lessons/k2learndash?selectedCourse="+SelectedK2Course
            console.log(path);
            wp.apiFetch({
                path: "/wp/v1/lessons/k2learndash?selectedCourse="+SelectedK2Course
            })
            .then((posstType) => {
                setAttributes({
                NumberOfLessons: posstType
                });
            })
            .catch((error) => {
                console.error('Error fetching NumberOfLessons:', error);
            });
		}
	},[SelectedK2Course]);
    console.log("lessonss: ",NumberOfLessons);

    var onChangeK2ldmainContPaddingLessons = (NewPad) => {
        setAttributes({K2ldmainContPaddingLessons:NewPad})
    }
    var onChangeK2ldmainContMarginLessons = (NewMar) => {
        setAttributes({K2ldmainContMarginLessons:NewMar})
    }
    var onChangeK2ldmainContBorderLessons = (Newborder) => {
        setAttributes({K2ldmainContBorderLessons:Newborder})
    }
    var onChangeK2ldmainContBorderRadiusLessons = (NewVal) => {
        setAttributes({K2ldmainContBorderRadiusLessons:NewVal});
    }
    var onChangeK2ldmainContBackgroundLessons = (NewVal) => {
        setAttributes({K2ldmainContBackgroundLessons:NewVal})
    }
    var mainCardContainerStyle ={
        paddingTop: K2ldmainContPaddingLessons.top,
		paddingRight: K2ldmainContPaddingLessons.right,
		paddingBottom: K2ldmainContPaddingLessons.bottom,
		paddingLeft: K2ldmainContPaddingLessons.left,
        marginTop: K2ldmainContMarginLessons.top,
		marginRight: K2ldmainContMarginLessons.right,
		marginBottom: K2ldmainContMarginLessons.bottom,
		marginLeft: K2ldmainContMarginLessons.left,
        borderColor: K2ldmainContBorderLessons.color,
        borderStyle: K2ldmainContBorderLessons.style,
        borderWidth: K2ldmainContBorderLessons.width,
        borderTopLeftRadius: K2ldmainContBorderRadiusLessons.top,
		borderTopRightRadius: K2ldmainContBorderRadiusLessons.right,
		borderBottomRightRadius: K2ldmainContBorderRadiusLessons.bottom,
		borderBottomLeftRadius: K2ldmainContBorderRadiusLessons.left,
        background: K2ldmainContBackgroundLessons

    }

    var onChangeK2ldHeadingSizeLessons = (newVal) => {
        setAttributes({K2ldHeadingSizeLessons:newVal})
    }
    var onChangeK2ldheadingFontFamLessons = (newVal) => {
        setAttributes({K2ldheadingFontFamLessons:newVal})
    }

    var onChaneK2ldheadingFontWeightLessons = (NewVal) => {
        setAttributes({K2ldheadingFontWeightLessons: NewVal})
    }

    var onChangeK2ldheadingColorLessons = (NewVal) => {
        setAttributes({K2ldheadingColorLessons: NewVal})
    }

    var ldtotalCourseStyle = {
        fontSize: K2ldHeadingSizeLessons,
        fontFamily: K2ldheadingFontFamLessons,
        fontWeight: K2ldheadingFontWeightLessons,
        color: K2ldheadingColorLessons
    }

    var onChangeK2ldCountSizeLessons = (newVal) => {
        setAttributes({K2ldCountSizeLessons:newVal})
    }
    var onChangeK2ldCountFontFamLessons = (newVal) => {
        setAttributes({K2ldCountFontFamLessons:newVal})
    }

    var onChaneK2ldCountFontWeightLessons = (NewVal) => {
        setAttributes({K2ldCountFontWeightLessons: NewVal})
    }
    var onChangeK2ldCountColorLessons = (newVal) =>{
        setAttributes({K2ldCountColorLessons:newVal});
    }

    var ldCountStyle = {
        fontSize: K2ldCountSizeLessons,
        fontFamily: K2ldCountFontFamLessons,
        fontWeight: K2ldCountFontWeightLessons,
        color: K2ldCountColorLessons
    }

    var onChangek2ldImageLessons = (newImg) => {
        setAttributes({k2ldImageLessons:newImg.url})
    }

    var onChangek2ldImageWidthLessons = (NewVal) => {
        setAttributes({k2ldImageWidthLessons:NewVal})
    }

    var K2imgstyles= {
        width: k2ldImageWidthLessons+'%'
    }

    var onChangeK2ldImageBackgroundLessons = (NewVal) => {
        setAttributes({K2ldImageBackgroundLessons:NewVal})
    }

    var onChangeK2ldImageContBorderRadiusLessons = (NewVal) => {
        setAttributes({K2ldImageContBorderRadiusLessons:NewVal})
    }
    const onChangeK2LDImageAlignmentLessons = (NewAllignment) => {
		setAttributes({
            K2LDImageAlignmentLessons: NewAllignment
			})
		
	}

    var ImageContStyles = {
        backgroundColor: K2ldImageBackgroundLessons,
        borderTopLeftRadius: K2ldImageContBorderRadiusLessons.top,
		borderTopRightRadius: K2ldImageContBorderRadiusLessons.right,
		borderBottomRightRadius: K2ldImageContBorderRadiusLessons.bottom,
		borderBottomLeftRadius: K2ldImageContBorderRadiusLessons.left,
        justifyContent:K2LDImageAlignmentLessons

    }
    const colorOptions = [
		{ name: 'blue', color: '#00f' },
		{ name: 'black', color: '#000' },
		{ name: 'Purple', color: '#2C2A4A' },
		{ name: 'Light Purple', color: '#4F518C' },
	]
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
        <div {...useBlockProps()}>
            <div className="k2_ld_total_course_parent_container" style={mainCardContainerStyle}>
                <div className="k2_ld_total_course_left">
                    <h4 style={ldtotalCourseStyle}>Total Lessons</h4>
                    <h3 style={ldCountStyle}>
                        {NumberOfLessons ?
                            Object.keys(NumberOfLessons).length
                            :
                            0
                        }
                    </h3>
                </div>
                <div className="k2_ld_total_course_right">
                    <div className="k2_ld_total_course_image_container" style={ImageContStyles}>
                        <img src={k2ldImageLessons} style={K2imgstyles} />
                    </div>
                </div>
            </div>
            <InspectorControls>
                <PanelBody title={__("Lesson Filters")} initialOpen={true} >
                    <Card>
                        <CardHeader>
                            <label>Select Filter</label>
                        </CardHeader>
                        <CardBody>
                            {k2_total_courses &&
                                <SelectControl 
                                    label="Select Course"
                                    value={ SelectedK2Course }
                                    onChange={updateSelectedK2Course}
                                    options={[
                                        { label: 'All', value: '0' }, // Default option
                                        ...(k2_total_courses &&
                                        k2_total_courses.map((index) => ({
                                            label: index.title,
                                            value: index.id,
                                        })))
                                    ]}

                                />
                            }
                        </CardBody>
                    </Card>
                </PanelBody>
                <PanelBody title={__("Spacing Options")} initialOpen={false}>
                    <Card>
                        <CardHeader>
                            <BoxControl
                                label="Padding"
                                value={K2ldmainContPaddingLessons}
                                onChange={onChangeK2ldmainContPaddingLessons}
                            />
                        </CardHeader>
                        <CardBody>
                        <BoxControl
                                label="Margin"
                                value={K2ldmainContMarginLessons}
                                onChange={onChangeK2ldmainContMarginLessons}
                            />
                        </CardBody>
                        <CardFooter>
                            <BorderBoxControl 
                                label="Borders"
                                onChange={onChangeK2ldmainContBorderLessons}
                                value={K2ldmainContBorderLessons}
                                colors = {colorOptions}
                                
                            />
                        </CardFooter>
                        <CardHeader>
                            <BoxControl 
                                label="border radius"
                                value={K2ldmainContBorderRadiusLessons}
                                onChange={onChangeK2ldmainContBorderRadiusLessons}
                            />
                        </CardHeader>
                    </Card>
                </PanelBody>
                <PanelBody title={__("Background Color")} initialOpen={false} >
                    <Card>
                        <CardBody>
                            <ColorPopup 
                                label={"Background Color"}
                                value={{ value: K2ldmainContBackgroundLessons}}
                                onChange = {onChangeK2ldmainContBackgroundLessons}
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
                                value={K2ldHeadingSizeLessons}
                                onChange = {onChangeK2ldHeadingSizeLessons}

                            />
                            <Flex>
                                <FlexItem>
                                    <SelectControl
                                        label="Font Family"
                                        value={K2ldheadingFontFamLessons}
                                        options={ GLOBAL_FONTS }
                                        onChange={onChangeK2ldheadingFontFamLessons}

                                    />
                                </FlexItem>
                                <FlexItem>
                                    <SelectControl
                                        label="Font Weight"
                                        value={K2ldheadingFontWeightLessons}
                                        options={ GLOBAL_FONTS_WEIGHTS }
                                        onChange={onChaneK2ldheadingFontWeightLessons}

                                    />
                                </FlexItem>
                            </Flex>
                        </CardBody>
                        <CardBody>
                            <ColorPopup 
                                label={"Text color"}
                                value={{ value:K2ldheadingColorLessons}}
                                onChange = {onChangeK2ldheadingColorLessons}
                                PropertyName={"backgroundColor"}
                            />
                        </CardBody>
                    </Card>
                    <Card>
                        <CardHeader>Count size</CardHeader>
                        <CardBody>
                            <RangeControl 
                                value={K2ldCountSizeLessons}
                                onChange = {onChangeK2ldCountSizeLessons}

                            />
                            <Flex>
                                <FlexItem>
                                    <SelectControl
                                        label="Font Family"
                                        value={K2ldCountFontFamLessons}
                                        options={ GLOBAL_FONTS }
                                        onChange={onChangeK2ldCountFontFamLessons}

                                    />
                                </FlexItem>
                                <FlexItem>
                                    <SelectControl
                                        label="Font Weight"
                                        value={K2ldCountFontWeightLessons}
                                        options={ GLOBAL_FONTS_WEIGHTS }
                                        onChange={onChaneK2ldCountFontWeightLessons}

                                    />
                                </FlexItem>
                            </Flex>
                        </CardBody>
                        <CardBody>
                            <ColorPopup 
                                label={"Text color"}
                                value={{ value:K2ldCountColorLessons}}
                                onChange = {onChangeK2ldCountColorLessons}
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
									value={k2ldImageLessons}
									onSelect={ onChangek2ldImageLessons }
									render={ ({open}) => {
										return <div style={{backgroundImage: 'url("' + k2ldImageLessons + '")'}} className={'k2-AB-image-select-control'}>
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
									value={k2ldImageWidthLessons}
									onChange={onChangek2ldImageWidthLessons}
								/>
							</CardBody>
                            <CardBody>
                                <ColorPopup 
                                    label={"Image Background Color"}
                                    value={{ value:K2ldImageBackgroundLessons}}
                                    onChange = {onChangeK2ldImageBackgroundLessons}
                                    PropertyName={"backgroundColor"}
                                />
                                <PanelRow>

                                    <div style={{paddingBottom: '2%'}}>
                                        <label><strong>Alignment</strong></label>
                                    </div>
                                    <div id = {'AlignmentIconsParent'} className={'k2-ib-inspector-control-alignment'} onClick={onChangeAlignmentIconChange}>

                                        <div className={'k2-ib-inspector-control-alignment-single'}  onClick={() => onChangeK2LDImageAlignmentLessons('flex-start')}>
                                            <span className="fa fa-align-left k2-ib-alignment-icon-style" ></span>
                                        </div>
                                        <div className={'k2-ib-inspector-control-alignment-single'} onClick={() => onChangeK2LDImageAlignmentLessons('center')}>
                                            <span className="fa fa-align-center k2-ib-alignment-icon-style k2-ib-active"></span>
                                        </div>
                                        <div className={'k2-ib-inspector-control-alignment-single'} onClick={() => onChangeK2LDImageAlignmentLessons('flex-end')}>
                                            <span className="fa fa-align-right k2-ib-alignment-icon-style"></span>
                                        </div>
                                    </div>

                                </PanelRow>
                            </CardBody>
                            <CardBody>
                                <BoxControl 
                                    label="border radius"
                                    value={K2ldImageContBorderRadiusLessons}
                                    onChange={onChangeK2ldImageContBorderRadiusLessons}
                                />
                            </CardBody>
						</Card>
				</PanelBody>
            
            </InspectorControls>
        </div>
    );

}

export default edit;
