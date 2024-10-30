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
        k2_total_courses_topic,SelectedK2CourseForTopic, SelectedK2LessonForTopic, NumberOfLessons,NumberOfTopics,K2ldmainContPaddingTopics, 
        K2ldmainContMarginTopics, K2ldmainContBorderTopics, K2ldmainContBorderRadiusTopics,
        K2ldmainContBackgroundTopics, K2ldHeadingSizeTopics, K2ldheadingFontFamTopics, K2ldheadingFontWeightTopics,
        K2ldheadingColorTopics, K2ldCountSizeTopics, K2ldCountFontFamTopics, K2ldCountFontWeightTopics,
        K2ldCountColorTopics, k2ldImageTopics, k2ldImageWidthTopics, K2ldImageBackgroundTopics, K2ldImageContBorderRadiusTopics,
        K2LDImageAlignmentTopics
    } = attributes;

    useEffect(() => {
		// if (!k2_total_courses_topic) {
		wp.apiFetch({
			path: '/wp/v1/courses/k2learndash'
	    })
        .then((posstType) => {
            setAttributes({
            k2_total_courses_topic: posstType
            });
        })
        .catch((error) => {
            console.error('Error fetching k2_total_courses_topic:', error);
        });
		// }
	},[]);

    console.log("Courses: ",k2_total_courses_topic);

    const updateSelectedK2CourseForTopic = (newVal) =>{
		setAttributes({SelectedK2CourseForTopic: newVal})
	}

    const updateSelectedK2LessonForTopic = (newVal) =>{
		setAttributes({SelectedK2LessonForTopic: newVal})
	}

    useEffect(() => {
		if (SelectedK2CourseForTopic) {
            var path = "/wp/v1/lessons/k2learndash?selectedCourse="+SelectedK2CourseForTopic
            console.log(path);
            wp.apiFetch({
                path: "/wp/v1/lessons/k2learndash?selectedCourse="+SelectedK2CourseForTopic
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
	},[SelectedK2CourseForTopic]);
    console.log("lessonss: ",NumberOfLessons);

    useEffect(() => {
		if (SelectedK2CourseForTopic && SelectedK2LessonForTopic) {
            var path = "/wp/v1/topics/k2learndash?selectedCourse="+SelectedK2CourseForTopic+"&selectedLesson="+SelectedK2LessonForTopic;
            console.log(path);
            wp.apiFetch({
                path: "/wp/v1/topics/k2learndash?selectedCourse="+SelectedK2CourseForTopic+"&selectedLesson="+SelectedK2LessonForTopic
            })
            .then((posstType) => {
                setAttributes({
                NumberOfTopics: posstType
                });
            })
            .catch((error) => {
                console.error('Error fetching NumberOfTopics:', error);
            });
		}
	},[SelectedK2CourseForTopic, SelectedK2LessonForTopic]);
    console.log("Topics: ",NumberOfTopics);

    var onChangeK2ldmainContPaddingTopics = (NewPad) => {
        setAttributes({K2ldmainContPaddingTopics:NewPad})
    }
    var onChangeK2ldmainContMarginTopics = (NewMar) => {
        setAttributes({K2ldmainContMarginTopics:NewMar})
    }
    var onChangeK2ldmainContBorderTopics = (Newborder) => {
        setAttributes({K2ldmainContBorderTopics:Newborder})
    }
    var onChangeK2ldmainContBorderRadiusTopics = (NewVal) => {
        setAttributes({K2ldmainContBorderRadiusTopics:NewVal});
    }
    var onChangeK2ldmainContBackgroundTopics = (NewVal) => {
        setAttributes({K2ldmainContBackgroundTopics:NewVal})
    }
    var mainCardContainerStyle ={
        paddingTop: K2ldmainContPaddingTopics.top,
		paddingRight: K2ldmainContPaddingTopics.right,
		paddingBottom: K2ldmainContPaddingTopics.bottom,
		paddingLeft: K2ldmainContPaddingTopics.left,
        marginTop: K2ldmainContMarginTopics.top,
		marginRight: K2ldmainContMarginTopics.right,
		marginBottom: K2ldmainContMarginTopics.bottom,
		marginLeft: K2ldmainContMarginTopics.left,
        borderColor: K2ldmainContBorderTopics.color,
        borderStyle: K2ldmainContBorderTopics.style,
        borderWidth: K2ldmainContBorderTopics.width,
        borderTopLeftRadius: K2ldmainContBorderRadiusTopics.top,
		borderTopRightRadius: K2ldmainContBorderRadiusTopics.right,
		borderBottomRightRadius: K2ldmainContBorderRadiusTopics.bottom,
		borderBottomLeftRadius: K2ldmainContBorderRadiusTopics.left,
        background: K2ldmainContBackgroundTopics

    }

    var onChangeK2ldHeadingSizeTopics = (newVal) => {
        setAttributes({K2ldHeadingSizeTopics:newVal})
    }
    var onChangeK2ldheadingFontFamTopics = (newVal) => {
        setAttributes({K2ldheadingFontFamTopics:newVal})
    }

    var onChaneK2ldheadingFontWeightTopics = (NewVal) => {
        setAttributes({K2ldheadingFontWeightTopics: NewVal})
    }

    var onChangeK2ldheadingColorTopics = (NewVal) => {
        setAttributes({K2ldheadingColorTopics: NewVal})
    }

    var ldtotalCourseStyle = {
        fontSize: K2ldHeadingSizeTopics,
        fontFamily: K2ldheadingFontFamTopics,
        fontWeight: K2ldheadingFontWeightTopics,
        color: K2ldheadingColorTopics
    }

    var onChangeK2ldCountSizeTopics = (newVal) => {
        setAttributes({K2ldCountSizeTopics:newVal})
    }
    var onChangeK2ldCountFontFamTopics = (newVal) => {
        setAttributes({K2ldCountFontFamTopics:newVal})
    }

    var onChaneK2ldCountFontWeightTopics = (NewVal) => {
        setAttributes({K2ldCountFontWeightTopics: NewVal})
    }
    var onChangeK2ldCountColorTopics = (newVal) =>{
        setAttributes({K2ldCountColorTopics:newVal});
    }

    var ldCountStyle = {
        fontSize: K2ldCountSizeTopics,
        fontFamily: K2ldCountFontFamTopics,
        fontWeight: K2ldCountFontWeightTopics,
        color: K2ldCountColorTopics
    }

    var onChangek2ldImageTopics = (newImg) => {
        setAttributes({k2ldImageTopics:newImg.url})
    }

    var onChangek2ldImageWidthTopics = (NewVal) => {
        setAttributes({k2ldImageWidthTopics:NewVal})
    }

    var K2imgstyles= {
        width: k2ldImageWidthTopics+'%'
    }

    var onChangeK2ldImageBackgroundTopics = (NewVal) => {
        setAttributes({K2ldImageBackgroundTopics:NewVal})
    }

    var onChangeK2ldImageContBorderRadiusTopics = (NewVal) => {
        setAttributes({K2ldImageContBorderRadiusTopics:NewVal})
    }
    const onChangeK2LDImageAlignmentTopics = (NewAllignment) => {
		setAttributes({
            K2LDImageAlignmentTopics: NewAllignment
			})
		
	}

    var ImageContStyles = {
        backgroundColor: K2ldImageBackgroundTopics,
        borderTopLeftRadius: K2ldImageContBorderRadiusTopics.top,
		borderTopRightRadius: K2ldImageContBorderRadiusTopics.right,
		borderBottomRightRadius: K2ldImageContBorderRadiusTopics.bottom,
		borderBottomLeftRadius: K2ldImageContBorderRadiusTopics.left,
        justifyContent:K2LDImageAlignmentTopics

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
                    <h4 style={ldtotalCourseStyle}>Total Topics</h4>
                    <h3 style={ldCountStyle}>
                        {NumberOfTopics ?
                            Object.keys(NumberOfTopics).length
                            :
                            0
                        }
                    </h3>
                </div>
                <div className="k2_ld_total_course_right">
                    <div className="k2_ld_total_course_image_container" style={ImageContStyles}>
                        <img src={k2ldImageTopics} style={K2imgstyles} />
                    </div>
                </div>
            </div>
            <InspectorControls>
                <PanelBody title={__("Topic Filters")} initialOpen={true} >
                    <Card>
                        <CardHeader>
                            <label>Select Filter</label>
                        </CardHeader>
                        <CardBody>
                            {k2_total_courses_topic &&
                                <SelectControl 
                                    label="Select Course"
                                    value={ SelectedK2CourseForTopic }
                                    onChange={updateSelectedK2CourseForTopic}
                                    options={[
                                        { label: 'Select Course', value: '0' }, // Default option
                                        ...(k2_total_courses_topic &&
                                        k2_total_courses_topic.map((index) => ({
                                            label: index.title,
                                            value: index.id,
                                        })))
                                    ]}

                                />
                            }
                            {NumberOfLessons &&
                                <SelectControl 
                                    label="Select Lesson"
                                    value={ SelectedK2LessonForTopic }
                                    onChange={updateSelectedK2LessonForTopic}
                                    options={[
                                        { label: 'Select Course', value: '0' }, // Default option
                                        ...(NumberOfLessons &&
                                        NumberOfLessons.map((index) => ({
                                            label: index.post_title,
                                            value: index.ID,
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
                                value={K2ldmainContPaddingTopics}
                                onChange={onChangeK2ldmainContPaddingTopics}
                            />
                        </CardHeader>
                        <CardBody>
                        <BoxControl
                                label="Margin"
                                value={K2ldmainContMarginTopics}
                                onChange={onChangeK2ldmainContMarginTopics}
                            />
                        </CardBody>
                        <CardFooter>
                            <BorderBoxControl 
                                label="Borders"
                                onChange={onChangeK2ldmainContBorderTopics}
                                value={K2ldmainContBorderTopics}
                                colors = {colorOptions}
                                
                            />
                        </CardFooter>
                        <CardHeader>
                            <BoxControl 
                                label="border radius"
                                value={K2ldmainContBorderRadiusTopics}
                                onChange={onChangeK2ldmainContBorderRadiusTopics}
                            />
                        </CardHeader>
                    </Card>
                </PanelBody>
                <PanelBody title={__("Background Color")} initialOpen={false} >
                    <Card>
                        <CardBody>
                            <ColorPopup 
                                label={"Background Color"}
                                value={{ value: K2ldmainContBackgroundTopics}}
                                onChange = {onChangeK2ldmainContBackgroundTopics}
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
                                value={K2ldHeadingSizeTopics}
                                onChange = {onChangeK2ldHeadingSizeTopics}

                            />
                            <Flex>
                                <FlexItem>
                                    <SelectControl
                                        label="Font Family"
                                        value={K2ldheadingFontFamTopics}
                                        options={ GLOBAL_FONTS }
                                        onChange={onChangeK2ldheadingFontFamTopics}

                                    />
                                </FlexItem>
                                <FlexItem>
                                    <SelectControl
                                        label="Font Weight"
                                        value={K2ldheadingFontWeightTopics}
                                        options={ GLOBAL_FONTS_WEIGHTS }
                                        onChange={onChaneK2ldheadingFontWeightTopics}

                                    />
                                </FlexItem>
                            </Flex>
                        </CardBody>
                        <CardBody>
                            <ColorPopup 
                                label={"Text color"}
                                value={{ value:K2ldheadingColorTopics}}
                                onChange = {onChangeK2ldheadingColorTopics}
                                PropertyName={"backgroundColor"}
                            />
                        </CardBody>
                    </Card>
                    <Card>
                        <CardHeader>Count size</CardHeader>
                        <CardBody>
                            <RangeControl 
                                value={K2ldCountSizeTopics}
                                onChange = {onChangeK2ldCountSizeTopics}

                            />
                            <Flex>
                                <FlexItem>
                                    <SelectControl
                                        label="Font Family"
                                        value={K2ldCountFontFamTopics}
                                        options={ GLOBAL_FONTS }
                                        onChange={onChangeK2ldCountFontFamTopics}

                                    />
                                </FlexItem>
                                <FlexItem>
                                    <SelectControl
                                        label="Font Weight"
                                        value={K2ldCountFontWeightTopics}
                                        options={ GLOBAL_FONTS_WEIGHTS }
                                        onChange={onChaneK2ldCountFontWeightTopics}

                                    />
                                </FlexItem>
                            </Flex>
                        </CardBody>
                        <CardBody>
                            <ColorPopup 
                                label={"Text color"}
                                value={{ value:K2ldCountColorTopics}}
                                onChange = {onChangeK2ldCountColorTopics}
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
									value={k2ldImageTopics}
									onSelect={ onChangek2ldImageTopics }
									render={ ({open}) => {
										return <div style={{backgroundImage: 'url("' + k2ldImageTopics + '")'}} className={'k2-AB-image-select-control'}>
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
									value={k2ldImageWidthTopics}
									onChange={onChangek2ldImageWidthTopics}
								/>
							</CardBody>
                            <CardBody>
                                <ColorPopup 
                                    label={"Image Background Color"}
                                    value={{ value:K2ldImageBackgroundTopics}}
                                    onChange = {onChangeK2ldImageBackgroundTopics}
                                    PropertyName={"backgroundColor"}
                                />
                                <PanelRow>

                                    <div style={{paddingBottom: '2%'}}>
                                        <label><strong>Alignment</strong></label>
                                    </div>
                                    <div id = {'AlignmentIconsParent'} className={'k2-ib-inspector-control-alignment'} onClick={onChangeAlignmentIconChange}>

                                        <div className={'k2-ib-inspector-control-alignment-single'}  onClick={() => onChangeK2LDImageAlignmentTopics('flex-start')}>
                                            <span className="fa fa-align-left k2-ib-alignment-icon-style" ></span>
                                        </div>
                                        <div className={'k2-ib-inspector-control-alignment-single'} onClick={() => onChangeK2LDImageAlignmentTopics('center')}>
                                            <span className="fa fa-align-center k2-ib-alignment-icon-style k2-ib-active"></span>
                                        </div>
                                        <div className={'k2-ib-inspector-control-alignment-single'} onClick={() => onChangeK2LDImageAlignmentTopics('flex-end')}>
                                            <span className="fa fa-align-right k2-ib-alignment-icon-style"></span>
                                        </div>
                                    </div>

                                </PanelRow>
                            </CardBody>
                            <CardBody>
                                <BoxControl 
                                    label="border radius"
                                    value={K2ldImageContBorderRadiusTopics}
                                    onChange={onChangeK2ldImageContBorderRadiusTopics}
                                />
                            </CardBody>
						</Card>
				</PanelBody>
            
            </InspectorControls>
        </div>
    );

}

export default edit;
