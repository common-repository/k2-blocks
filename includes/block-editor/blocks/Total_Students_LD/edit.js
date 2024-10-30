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
        k2_total_courses_student,SelectedK2CourseForStudent, SelectedK2LessonForStudents, NumberOfLessons,NumberOfStudents,K2ldmainContPaddingStudents, 
        K2ldmainContMarginStudents, K2ldmainContBorderStudents, K2ldmainContBorderRadiusStudents,
        K2ldmainContBackgroundStudents, K2ldHeadingSizeStudents, K2ldheadingFontFamStudents, K2ldheadingFontWeightStudents,
        K2ldheadingColorStudents, K2ldCountSizeStudents, K2ldCountFontFamStudents, K2ldCountFontWeightStudents,
        K2ldCountColorStudents, k2ldImageStudents, k2ldImageWidthStudents, K2ldImageBackgroundStudents, K2ldImageContBorderRadiusStudents,
        K2LDImageAlignmentStudents
    } = attributes;

    useEffect(() => {
		// if (!k2_total_courses_students) {
		wp.apiFetch({
			path: '/wp/v1/courses/k2learndash'
	    })
        .then((posstType) => {
            setAttributes({
            k2_total_courses_student: posstType
            });
        })
        .catch((error) => {
            console.error('Error fetching k2_total_courses_students:', error);
        });
		// }
	},[]);

    console.log("Courses: ",k2_total_courses_student);

    const updateSelectedK2CourseForStudent = (newVal) =>{
		setAttributes({SelectedK2CourseForStudent: newVal})
	}

    const updateSelectedK2LessonForStudents = (newVal) =>{
		setAttributes({SelectedK2LessonForStudents: newVal})
	}

    useEffect(() => {
		if (SelectedK2CourseForStudent) {
            var path = "/wp/v1/students/k2learndash?selectedCourse="+SelectedK2CourseForStudent
            console.log(path);
            wp.apiFetch({
                path: "/wp/v1/students/k2learndash?selectedCourse="+SelectedK2CourseForStudent
            })
            .then((posstType) => {
                setAttributes({
                NumberOfStudents: posstType
                });
            })
            .catch((error) => {
                console.error('Error fetching NumberOfLessons:', error);
            });
		}
	},[SelectedK2CourseForStudent]);
    console.log("Students: ",NumberOfStudents);

    var onChangeK2ldmainContPaddingStudents = (NewPad) => {
        setAttributes({K2ldmainContPaddingStudents:NewPad})
    }
    var onChangeK2ldmainContMarginStudents = (NewMar) => {
        setAttributes({K2ldmainContMarginStudents:NewMar})
    }
    var onChangeK2ldmainContBorderStudents = (Newborder) => {
        setAttributes({K2ldmainContBorderStudents:Newborder})
    }
    var onChangeK2ldmainContBorderRadiusStudents = (NewVal) => {
        setAttributes({K2ldmainContBorderRadiusStudents:NewVal});
    }
    var onChangeK2ldmainContBackgroundStudents = (NewVal) => {
        setAttributes({K2ldmainContBackgroundStudents:NewVal})
    }
    var mainCardContainerStyle ={
        paddingTop: K2ldmainContPaddingStudents.top,
		paddingRight: K2ldmainContPaddingStudents.right,
		paddingBottom: K2ldmainContPaddingStudents.bottom,
		paddingLeft: K2ldmainContPaddingStudents.left,
        marginTop: K2ldmainContMarginStudents.top,
		marginRight: K2ldmainContMarginStudents.right,
		marginBottom: K2ldmainContMarginStudents.bottom,
		marginLeft: K2ldmainContMarginStudents.left,
        borderColor: K2ldmainContBorderStudents.color,
        borderStyle: K2ldmainContBorderStudents.style,
        borderWidth: K2ldmainContBorderStudents.width,
        borderTopLeftRadius: K2ldmainContBorderRadiusStudents.top,
		borderTopRightRadius: K2ldmainContBorderRadiusStudents.right,
		borderBottomRightRadius: K2ldmainContBorderRadiusStudents.bottom,
		borderBottomLeftRadius: K2ldmainContBorderRadiusStudents.left,
        background: K2ldmainContBackgroundStudents

    }

    var onChangeK2ldHeadingSizeStudents = (newVal) => {
        setAttributes({K2ldHeadingSizeStudents:newVal})
    }
    var onChangeK2ldheadingFontFamStudents = (newVal) => {
        setAttributes({K2ldheadingFontFamStudents:newVal})
    }

    var onChaneK2ldheadingFontWeightStudents = (NewVal) => {
        setAttributes({K2ldheadingFontWeightStudents: NewVal})
    }

    var onChangeK2ldheadingColorStudents = (NewVal) => {
        setAttributes({K2ldheadingColorStudents: NewVal})
    }

    var ldtotalCourseStyle = {
        fontSize: K2ldHeadingSizeStudents,
        fontFamily: K2ldheadingFontFamStudents,
        fontWeight: K2ldheadingFontWeightStudents,
        color: K2ldheadingColorStudents
    }

    var onChangeK2ldCountSizeStudents = (newVal) => {
        setAttributes({K2ldCountSizeStudents:newVal})
    }
    var onChangeK2ldCountFontFamStudents = (newVal) => {
        setAttributes({K2ldCountFontFamStudents:newVal})
    }

    var onChaneK2ldCountFontWeightStudents = (NewVal) => {
        setAttributes({K2ldCountFontWeightStudents: NewVal})
    }
    var onChangeK2ldCountColorStudents = (newVal) =>{
        setAttributes({K2ldCountColorStudents:newVal});
    }

    var ldCountStyle = {
        fontSize: K2ldCountSizeStudents,
        fontFamily: K2ldCountFontFamStudents,
        fontWeight: K2ldCountFontWeightStudents,
        color: K2ldCountColorStudents
    }

    var onChangek2ldImageStudents = (newImg) => {
        setAttributes({k2ldImageStudents:newImg.url})
    }

    var onChangek2ldImageWidthStudents = (NewVal) => {
        setAttributes({k2ldImageWidthStudents:NewVal})
    }

    var K2imgstyles= {
        width: k2ldImageWidthStudents+'%'
    }

    var onChangeK2ldImageBackgroundStudents = (NewVal) => {
        setAttributes({K2ldImageBackgroundStudents:NewVal})
    }

    var onChangeK2ldImageContBorderRadiusStudents = (NewVal) => {
        setAttributes({K2ldImageContBorderRadiusStudents:NewVal})
    }
    const onChangeK2LDImageAlignmentStudents = (NewAllignment) => {
		setAttributes({
            K2LDImageAlignmentStudents: NewAllignment
			})
		
	}

    var ImageContStyles = {
        backgroundColor: K2ldImageBackgroundStudents,
        borderTopLeftRadius: K2ldImageContBorderRadiusStudents.top,
		borderTopRightRadius: K2ldImageContBorderRadiusStudents.right,
		borderBottomRightRadius: K2ldImageContBorderRadiusStudents.bottom,
		borderBottomLeftRadius: K2ldImageContBorderRadiusStudents.left,
        justifyContent:K2LDImageAlignmentStudents

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
                    <h4 style={ldtotalCourseStyle}>Total Students</h4>
                    <h3 style={ldCountStyle}>
                        {NumberOfStudents ?
                            Object.keys(NumberOfStudents).length
                            :
                            0
                        }
                    </h3>
                </div>
                <div className="k2_ld_total_course_right">
                    <div className="k2_ld_total_course_image_container" style={ImageContStyles}>
                        <img src={k2ldImageStudents} style={K2imgstyles} />
                    </div>
                </div>
            </div>
            <InspectorControls>
                <PanelBody title={__("Students Filters")} initialOpen={true} >
                    <Card>
                        <CardHeader>
                            <label>Select Filter</label>
                        </CardHeader>
                        <CardBody>
                            {k2_total_courses_student &&
                                <SelectControl 
                                    label="Select Course"
                                    value={ SelectedK2CourseForStudent }
                                    onChange={updateSelectedK2CourseForStudent}
                                    options={[
                                        { label: 'All', value: '0' }, // Default option
                                        ...(k2_total_courses_student &&
                                        k2_total_courses_student.map((index) => ({
                                            label: index.title,
                                            value: index.id,
                                        })))
                                    ]}

                                />
                            }
                            {NumberOfLessons &&
                                <SelectControl 
                                    label="Select Lesson"
                                    value={ SelectedK2LessonForStudents }
                                    onChange={updateSelectedK2LessonForStudents}
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
                                value={K2ldmainContPaddingStudents}
                                onChange={onChangeK2ldmainContPaddingStudents}
                            />
                        </CardHeader>
                        <CardBody>
                        <BoxControl
                                label="Margin"
                                value={K2ldmainContMarginStudents}
                                onChange={onChangeK2ldmainContMarginStudents}
                            />
                        </CardBody>
                        <CardFooter>
                            <BorderBoxControl 
                                label="Borders"
                                onChange={onChangeK2ldmainContBorderStudents}
                                value={K2ldmainContBorderStudents}
                                colors = {colorOptions}
                                
                            />
                        </CardFooter>
                        <CardHeader>
                            <BoxControl 
                                label="border radius"
                                value={K2ldmainContBorderRadiusStudents}
                                onChange={onChangeK2ldmainContBorderRadiusStudents}
                            />
                        </CardHeader>
                    </Card>
                </PanelBody>
                <PanelBody title={__("Background Color")} initialOpen={false} >
                    <Card>
                        <CardBody>
                            <ColorPopup 
                                label={"Background Color"}
                                value={{ value: K2ldmainContBackgroundStudents}}
                                onChange = {onChangeK2ldmainContBackgroundStudents}
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
                                value={K2ldHeadingSizeStudents}
                                onChange = {onChangeK2ldHeadingSizeStudents}

                            />
                            <Flex>
                                <FlexItem>
                                    <SelectControl
                                        label="Font Family"
                                        value={K2ldheadingFontFamStudents}
                                        options={ GLOBAL_FONTS }
                                        onChange={onChangeK2ldheadingFontFamStudents}

                                    />
                                </FlexItem>
                                <FlexItem>
                                    <SelectControl
                                        label="Font Weight"
                                        value={K2ldheadingFontWeightStudents}
                                        options={ GLOBAL_FONTS_WEIGHTS }
                                        onChange={onChaneK2ldheadingFontWeightStudents}

                                    />
                                </FlexItem>
                            </Flex>
                        </CardBody>
                        <CardBody>
                            <ColorPopup 
                                label={"Text color"}
                                value={{ value:K2ldheadingColorStudents}}
                                onChange = {onChangeK2ldheadingColorStudents}
                                PropertyName={"backgroundColor"}
                            />
                        </CardBody>
                    </Card>
                    <Card>
                        <CardHeader>Count size</CardHeader>
                        <CardBody>
                            <RangeControl 
                                value={K2ldCountSizeStudents}
                                onChange = {onChangeK2ldCountSizeStudents}

                            />
                            <Flex>
                                <FlexItem>
                                    <SelectControl
                                        label="Font Family"
                                        value={K2ldCountFontFamStudents}
                                        options={ GLOBAL_FONTS }
                                        onChange={onChangeK2ldCountFontFamStudents}

                                    />
                                </FlexItem>
                                <FlexItem>
                                    <SelectControl
                                        label="Font Weight"
                                        value={K2ldCountFontWeightStudents}
                                        options={ GLOBAL_FONTS_WEIGHTS }
                                        onChange={onChaneK2ldCountFontWeightStudents}

                                    />
                                </FlexItem>
                            </Flex>
                        </CardBody>
                        <CardBody>
                            <ColorPopup 
                                label={"Text color"}
                                value={{ value:K2ldCountColorStudents}}
                                onChange = {onChangeK2ldCountColorStudents}
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
									value={k2ldImageStudents}
									onSelect={ onChangek2ldImageStudents }
									render={ ({open}) => {
										return <div style={{backgroundImage: 'url("' + k2ldImageStudents + '")'}} className={'k2-AB-image-select-control'}>
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
									value={k2ldImageWidthStudents}
									onChange={onChangek2ldImageWidthStudents}
								/>
							</CardBody>
                            <CardBody>
                                <ColorPopup 
                                    label={"Image Background Color"}
                                    value={{ value:K2ldImageBackgroundStudents}}
                                    onChange = {onChangeK2ldImageBackgroundStudents}
                                    PropertyName={"backgroundColor"}
                                />
                                <PanelRow>

                                    <div style={{paddingBottom: '2%'}}>
                                        <label><strong>Alignment</strong></label>
                                    </div>
                                    <div id = {'AlignmentIconsParent'} className={'k2-ib-inspector-control-alignment'} onClick={onChangeAlignmentIconChange}>

                                        <div className={'k2-ib-inspector-control-alignment-single'}  onClick={() => onChangeK2LDImageAlignmentStudents('flex-start')}>
                                            <span className="fa fa-align-left k2-ib-alignment-icon-style" ></span>
                                        </div>
                                        <div className={'k2-ib-inspector-control-alignment-single'} onClick={() => onChangeK2LDImageAlignmentStudents('center')}>
                                            <span className="fa fa-align-center k2-ib-alignment-icon-style k2-ib-active"></span>
                                        </div>
                                        <div className={'k2-ib-inspector-control-alignment-single'} onClick={() => onChangeK2LDImageAlignmentStudents('flex-end')}>
                                            <span className="fa fa-align-right k2-ib-alignment-icon-style"></span>
                                        </div>
                                    </div>

                                </PanelRow>
                            </CardBody>
                            <CardBody>
                                <BoxControl 
                                    label="border radius"
                                    value={K2ldImageContBorderRadiusStudents}
                                    onChange={onChangeK2ldImageContBorderRadiusStudents}
                                />
                            </CardBody>
						</Card>
				</PanelBody>
            
            </InspectorControls>
        </div>
    );

}

export default edit;
