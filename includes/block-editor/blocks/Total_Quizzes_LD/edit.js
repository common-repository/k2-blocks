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
        k2_select_filter_for_quiz, k2_total_courses_quiz, k2_total_group_quiz, SelectedK2CourseForQuiz, k2_total_lessons_quiz,
        SelectedK2LessonForQuiz, SelectedK2GroupForQuiz, NumberOfQuizs ,K2ldmainContPaddingQuizs, K2ldmainContMarginQuizs, K2ldmainContBorderQuizs,
        K2ldmainContBorderRadiusQuizs, K2ldmainContBackgroundQuizs, K2ldHeadingSizeQuizs, K2ldheadingFontFamQuizs,
        K2ldheadingFontWeightQuizs, K2ldheadingColorQuizs, K2ldCountSizeQuizs, K2ldCountFontFamQuizs,
        K2ldCountFontWeightQuizs, K2ldCountColorQuizs, k2ldImageQuizs, k2ldImageWidthQuizs, K2ldImageBackgroundQuizs,
        K2ldImageContBorderRadiusQuizs, K2LDImageAlignmentQuizs
        
    } = attributes;

    var onChangek2_select_filter_for_quiz = (Val) =>{
        setAttributes({k2_select_filter_for_quiz:Val})
    }

    const updateSelectedK2CourseForQuiz = (newVal) =>{
		setAttributes({SelectedK2CourseForQuiz: newVal})
	}


    useEffect(() => {
        // if (!k2_total_courses) {
        wp.apiFetch({
            path: '/wp/v1/courses/k2learndash'
        })
        .then((posstType) => {
            setAttributes({
                k2_total_courses_quiz: posstType
            });
            console.log("Course: ",k2_total_courses_quiz);
        })
        .catch((error) => {
            console.error('Error fetching k2_total_courses_quiz:', error);
        });
        // }
    },[]);

    useEffect(() => {
        // if (!k2_total_courses) {
        wp.apiFetch({
            path: '/wp/v1/totalLessons/k2learndash'
        })
        .then((posstType) => {
            setAttributes({
                k2_total_lessons_quiz: posstType
            });
            console.log("lessons: ",k2_total_lessons_quiz);
        })
        .catch((error) => {
            console.error('Error fetching k2_total_lessons_quiz:', error);
        });
        // }
    },[]);

    useEffect(() => {
		if (!k2_total_group_quiz) {
		  wp.apiFetch({
			path: '/wp/v1/groups/k2learndash'
		  })
			.then((posstType) => {
			  setAttributes({
				k2_total_group_quiz: posstType
			  });
              console.log("Grupops: ",k2_total_group_quiz);
			})
			.catch((error) => {
			  console.error('Error fetching k2_total_group_quiz:', error);
			});
		}
	  },[]);


    useEffect(() => {
		if (k2_select_filter_for_quiz == 'course' ) {
            console.log("/wp/v1/totalquiz/k2learndash?selectedCourse="+SelectedK2CourseForQuiz+"&filter=course")
            var path = "/wp/v1/totalquiz/k2learndash?selectedCourse="+SelectedK2CourseForQuiz+"&filter=course";
        }
        else if(k2_select_filter_for_quiz == 'lesson'){
            console.log("/wp/v1/totalquiz/k2learndash?selectedLesson="+SelectedK2LessonForQuiz+"&filter=lesson")
            var path = "/wp/v1/totalquiz/k2learndash?selectedLesson="+SelectedK2LessonForQuiz+"&filter=lesson";
        }
        else if(k2_select_filter_for_quiz == 'group'){
            console.log("/wp/v1/totalquiz/k2learndash?selectedGroup="+SelectedK2GroupForQuiz+"&filter=group")
            var path = "/wp/v1/totalquiz/k2learndash?selectedGroup="+SelectedK2GroupForQuiz+"&filter=group";
        }
        else{
            var path = "/wp/v1/totalquiz/k2learndash?selectedGroup="+SelectedK2GroupForQuiz+"&filter=0";
        }
        wp.apiFetch({
            path: path
        })
        .then((posstType) => {
            setAttributes({
            NumberOfQuizs: posstType
            });
        })
        .catch((error) => {
            console.error('Error fetching NumberOfQuizs:', error);
        });
	},[SelectedK2CourseForQuiz, SelectedK2LessonForQuiz,SelectedK2GroupForQuiz, k2_select_filter_for_quiz]);
    console.log("totalquiz: ",NumberOfQuizs);



    const updateSelectedK2LessonForQuiz = (val) => {
        setAttributes({SelectedK2LessonForQuiz:val})
    }

    const updateSelectedK2GroupForQuiz = (val) => {
        setAttributes({SelectedK2GroupForQuiz:val})
    }

    var onChangeK2ldmainContPaddingQuizs = (NewPad) => {
        setAttributes({K2ldmainContPaddingQuizs:NewPad})
    }
    var onChangeK2ldmainContMarginQuizs = (NewMar) => {
        setAttributes({K2ldmainContMarginQuizs:NewMar})
    }
    var onChangeK2ldmainContBorderQuizs = (Newborder) => {
        setAttributes({K2ldmainContBorderQuizs:Newborder})
    }
    var onChangeK2ldmainContBorderRadiusQuizs = (NewVal) => {
        setAttributes({K2ldmainContBorderRadiusQuizs:NewVal});
    }
    var onChangeK2ldmainContBackgroundQuizs = (NewVal) => {
        setAttributes({K2ldmainContBackgroundQuizs:NewVal})
    }
    var mainCardContainerStyle ={
        paddingTop: K2ldmainContPaddingQuizs.top,
		paddingRight: K2ldmainContPaddingQuizs.right,
		paddingBottom: K2ldmainContPaddingQuizs.bottom,
		paddingLeft: K2ldmainContPaddingQuizs.left,
        marginTop: K2ldmainContMarginQuizs.top,
		marginRight: K2ldmainContMarginQuizs.right,
		marginBottom: K2ldmainContMarginQuizs.bottom,
		marginLeft: K2ldmainContMarginQuizs.left,
        borderColor: K2ldmainContBorderQuizs.color,
        borderStyle: K2ldmainContBorderQuizs.style,
        borderWidth: K2ldmainContBorderQuizs.width,
        borderTopLeftRadius: K2ldmainContBorderRadiusQuizs.top,
		borderTopRightRadius: K2ldmainContBorderRadiusQuizs.right,
		borderBottomRightRadius: K2ldmainContBorderRadiusQuizs.bottom,
		borderBottomLeftRadius: K2ldmainContBorderRadiusQuizs.left,
        background: K2ldmainContBackgroundQuizs

    }

    var onChangeK2ldHeadingSizeQuizs = (newVal) => {
        setAttributes({K2ldHeadingSizeQuizs:newVal})
    }
    var onChangeK2ldheadingFontFamQuizs = (newVal) => {
        setAttributes({K2ldheadingFontFamQuizs:newVal})
    }

    var onChaneK2ldheadingFontWeightQuizs = (NewVal) => {
        setAttributes({K2ldheadingFontWeightQuizs: NewVal})
    }

    var onChangeK2ldheadingColorQuizs = (NewVal) => {
        setAttributes({K2ldheadingColorQuizs: NewVal})
    }

    var ldtotalCourseStyle = {
        fontSize: K2ldHeadingSizeQuizs,
        fontFamily: K2ldheadingFontFamQuizs,
        fontWeight: K2ldheadingFontWeightQuizs,
        color: K2ldheadingColorQuizs
    }

    var onChangeK2ldCountSizeQuizs = (newVal) => {
        setAttributes({K2ldCountSizeQuizs:newVal})
    }
    var onChangeK2ldCountFontFamQuizs = (newVal) => {
        setAttributes({K2ldCountFontFamQuizs:newVal})
    }

    var onChaneK2ldCountFontWeightQuizs = (NewVal) => {
        setAttributes({K2ldCountFontWeightQuizs: NewVal})
    }
    var onChangeK2ldCountColorQuizs = (newVal) =>{
        setAttributes({K2ldCountColorQuizs:newVal});
    }

    var ldCountStyle = {
        fontSize: K2ldCountSizeQuizs,
        fontFamily: K2ldCountFontFamQuizs,
        fontWeight: K2ldCountFontWeightQuizs,
        color: K2ldCountColorQuizs
    }

    var onChangek2ldImageQuizs = (newImg) => {
        setAttributes({k2ldImageQuizs:newImg.url})
    }

    var onChangek2ldImageWidthQuizs = (NewVal) => {
        setAttributes({k2ldImageWidthQuizs:NewVal})
    }

    var K2imgstyles= {
        width: k2ldImageWidthQuizs+'%'
    }

    var onChangeK2ldImageBackgroundQuizs = (NewVal) => {
        setAttributes({K2ldImageBackgroundQuizs:NewVal})
    }

    var onChangeK2ldImageContBorderRadiusQuizs = (NewVal) => {
        setAttributes({K2ldImageContBorderRadiusQuizs:NewVal})
    }
    const onChangeK2LDImageAlignmentQuizs = (NewAllignment) => {
		setAttributes({
            K2LDImageAlignmentQuizs: NewAllignment
			})
		
	}

    var ImageContStyles = {
        backgroundColor: K2ldImageBackgroundQuizs,
        borderTopLeftRadius: K2ldImageContBorderRadiusQuizs.top,
		borderTopRightRadius: K2ldImageContBorderRadiusQuizs.right,
		borderBottomRightRadius: K2ldImageContBorderRadiusQuizs.bottom,
		borderBottomLeftRadius: K2ldImageContBorderRadiusQuizs.left,
        justifyContent:K2LDImageAlignmentQuizs

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
                    <h4 style={ldtotalCourseStyle}>Total Quizzes</h4>
                    <h3 style={ldCountStyle}>
                        {NumberOfQuizs ?
                            Object.keys(NumberOfQuizs).length
                            :
                            0
                        }
                    </h3>
                </div>
                <div className="k2_ld_total_course_right">
                    <div className="k2_ld_total_course_image_container" style={ImageContStyles}>
                        <img src={k2ldImageQuizs} style={K2imgstyles} />
                    </div>
                </div>
            </div>
            <InspectorControls>
                <PanelBody title={__("Select Filter For Quiz")} initialOpen={true} >
                    <Card>
                        <CardHeader>
                            <label>Select Filter</label>
                        </CardHeader>
                        <CardBody>
                            <SelectControl 
                                label="Select Filter"
                                value={k2_select_filter_for_quiz}
                                onChange={onChangek2_select_filter_for_quiz}
                                options={[
                                    {label:'All', value:'0'},
                                    {label:'Course', value:'course'},
                                    {label:'Lesson', value:'lesson'},
                                    {label:'Groups', value:'group'}
                                ]}
                            />

                            {k2_select_filter_for_quiz == 'course' && k2_total_courses_quiz &&
                                <SelectControl 
                                    label="Select Course"
                                    value={ SelectedK2CourseForQuiz }
                                    onChange={updateSelectedK2CourseForQuiz}
                                    options={[
                                        { label: 'Select Course', value: '0', hidden:true }, // Default option
                                        ...(k2_total_courses_quiz &&
                                        k2_total_courses_quiz.map((index) => ({
                                            label: index.title,
                                            value: index.id,
                                        })))
                                    ]}
                                />
                            }
                            {k2_select_filter_for_quiz == 'lesson' && k2_total_lessons_quiz &&
                                <SelectControl 
                                    label="Select Lesson"
                                    value={ SelectedK2LessonForQuiz }
                                    onChange={updateSelectedK2LessonForQuiz}
                                    options={[
                                        { label: 'Select Lesson', value: '0', hidden:true }, // Default option
                                        ...(k2_total_lessons_quiz &&
                                        k2_total_lessons_quiz.map((index) => ({
                                            label: index.post_title,
                                            value: index.ID,
                                        })))
                                    ]}

                                />
                            }
                            {k2_select_filter_for_quiz == 'group' && k2_total_group_quiz &&
                                <SelectControl 
                                    label="Select Group"
                                    value={ SelectedK2GroupForQuiz }
                                    onChange={updateSelectedK2GroupForQuiz}
                                    options={[
                                        { label: 'Select Group', value: '0', hidden:true }, // Default option
                                        ...(k2_total_group_quiz &&
                                        k2_total_group_quiz.map((index) => ({
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
                                value={K2ldmainContPaddingQuizs}
                                onChange={onChangeK2ldmainContPaddingQuizs}
                            />
                        </CardHeader>
                        <CardBody>
                        <BoxControl
                                label="Margin"
                                value={K2ldmainContMarginQuizs}
                                onChange={onChangeK2ldmainContMarginQuizs}
                            />
                        </CardBody>
                        <CardFooter>
                            <BorderBoxControl 
                                label="Borders"
                                onChange={onChangeK2ldmainContBorderQuizs}
                                value={K2ldmainContBorderQuizs}
                                colors = {colorOptions}
                                
                            />
                        </CardFooter>
                        <CardHeader>
                            <BoxControl 
                                label="border radius"
                                value={K2ldmainContBorderRadiusQuizs}
                                onChange={onChangeK2ldmainContBorderRadiusQuizs}
                            />
                        </CardHeader>
                    </Card>
                </PanelBody>
                <PanelBody title={__("Background Color")} initialOpen={false} >
                    <Card>
                        <CardBody>
                            <ColorPopup 
                                label={"Background Color"}
                                value={{ value: K2ldmainContBackgroundQuizs}}
                                onChange = {onChangeK2ldmainContBackgroundQuizs}
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
                                value={K2ldHeadingSizeQuizs}
                                onChange = {onChangeK2ldHeadingSizeQuizs}

                            />
                            <Flex>
                                <FlexItem>
                                    <SelectControl
                                        label="Font Family"
                                        value={K2ldheadingFontFamQuizs}
                                        options={ GLOBAL_FONTS }
                                        onChange={onChangeK2ldheadingFontFamQuizs}

                                    />
                                </FlexItem>
                                <FlexItem>
                                    <SelectControl
                                        label="Font Weight"
                                        value={K2ldheadingFontWeightQuizs}
                                        options={ GLOBAL_FONTS_WEIGHTS }
                                        onChange={onChaneK2ldheadingFontWeightQuizs}

                                    />
                                </FlexItem>
                            </Flex>
                        </CardBody>
                        <CardBody>
                            <ColorPopup 
                                label={"Text color"}
                                value={{ value:K2ldheadingColorQuizs}}
                                onChange = {onChangeK2ldheadingColorQuizs}
                                PropertyName={"backgroundColor"}
                            />
                        </CardBody>
                    </Card>
                    <Card>
                        <CardHeader>Count size</CardHeader>
                        <CardBody>
                            <RangeControl 
                                value={K2ldCountSizeQuizs}
                                onChange = {onChangeK2ldCountSizeQuizs}

                            />
                            <Flex>
                                <FlexItem>
                                    <SelectControl
                                        label="Font Family"
                                        value={K2ldCountFontFamQuizs}
                                        options={ GLOBAL_FONTS }
                                        onChange={onChangeK2ldCountFontFamQuizs}

                                    />
                                </FlexItem>
                                <FlexItem>
                                    <SelectControl
                                        label="Font Weight"
                                        value={K2ldCountFontWeightQuizs}
                                        options={ GLOBAL_FONTS_WEIGHTS }
                                        onChange={onChaneK2ldCountFontWeightQuizs}

                                    />
                                </FlexItem>
                            </Flex>
                        </CardBody>
                        <CardBody>
                            <ColorPopup 
                                label={"Text color"}
                                value={{ value:K2ldCountColorQuizs}}
                                onChange = {onChangeK2ldCountColorQuizs}
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
									value={k2ldImageQuizs}
									onSelect={ onChangek2ldImageQuizs }
									render={ ({open}) => {
										return <div style={{backgroundImage: 'url("' + k2ldImageQuizs + '")'}} className={'k2-AB-image-select-control'}>
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
									value={k2ldImageWidthQuizs}
									onChange={onChangek2ldImageWidthQuizs}
								/>
							</CardBody>
                            <CardBody>
                                <ColorPopup 
                                    label={"Image Background Color"}
                                    value={{ value:K2ldImageBackgroundQuizs}}
                                    onChange = {onChangeK2ldImageBackgroundQuizs}
                                    PropertyName={"backgroundColor"}
                                />
                                <PanelRow>

                                    <div style={{paddingBottom: '2%'}}>
                                        <label><strong>Alignment</strong></label>
                                    </div>
                                    <div id = {'AlignmentIconsParent'} className={'k2-ib-inspector-control-alignment'} onClick={onChangeAlignmentIconChange}>

                                        <div className={'k2-ib-inspector-control-alignment-single'}  onClick={() => onChangeK2LDImageAlignmentQuizs('flex-start')}>
                                            <span className="fa fa-align-left k2-ib-alignment-icon-style" ></span>
                                        </div>
                                        <div className={'k2-ib-inspector-control-alignment-single'} onClick={() => onChangeK2LDImageAlignmentQuizs('center')}>
                                            <span className="fa fa-align-center k2-ib-alignment-icon-style k2-ib-active"></span>
                                        </div>
                                        <div className={'k2-ib-inspector-control-alignment-single'} onClick={() => onChangeK2LDImageAlignmentQuizs('flex-end')}>
                                            <span className="fa fa-align-right k2-ib-alignment-icon-style"></span>
                                        </div>
                                    </div>

                                </PanelRow>
                            </CardBody>
                            <CardBody>
                                <BoxControl 
                                    label="border radius"
                                    value={K2ldImageContBorderRadiusQuizs}
                                    onChange={onChangeK2ldImageContBorderRadiusQuizs}
                                />
                            </CardBody>
						</Card>
				</PanelBody>
            
            </InspectorControls>
        </div>
    );

}

export default edit;
