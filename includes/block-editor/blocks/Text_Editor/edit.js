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
export default function edit({attributes, setAttributes, isSelected}) {

    const {
        EditorFontSize,
        EditorFontFamily,
        EditorTextColor,
        EditorTextAlignment,
        EditorFontWeight,
        EditorTextTransform,
        EditorLineHeight,
        EditorLetterSpacing,
        EditorTextDecoration,
        EditorTextStyle,
        EditorContent,
        EditorPadding,
        EditorMargin,
        EditorTopMargin,
        EditorRightMargin,
        EditorBottomMargin,
        EditorLeftMargin,
        EditorTopBorder,
        EditorRightBorder,
        EditorBottomBorder,
        EditorLeftBorder,
        EditorBorderStyle,
        EditorBorderColor,
        EditorBackgroundColor,
        EditorWidgetWidth

    } = attributes;


    const BorderStylesAvailable = [
        { label: 'None', value: 'none'},
        { label: 'Hidden', value: 'hidden'},
        { label: 'Solid', value: 'solid'},
        { label: 'Dashed', value: 'dashed'},
        { label: 'Dotted', value: 'dotted'},
        { label: 'Double', value: 'double'},
        { label: 'Groove', value: 'groove'},
        { label: 'Ridge', value: 'ridge'},
        { label: 'Inset', value: 'inset'},
        { label: 'Outset', value: 'outset'},
    ]
    const TextTransformAvailable =[
        { label: 'Uppercase', value: 'uppercase'},
        { label: 'Lowercase', value: 'lowercase'},
        { label: 'Capitalize', value: 'capitalize'},
        { label: 'None', value: 'none'},
    ]
    const TextStylesAvailable = [
        { label : 'Normal', value: 'normal' },
        { label : 'Oblique', value: 'oblique'},
        { label : 'Italic', value: 'italic' },
    ]
    const TextDecorAvailable = [
        { label : 'None', value: 'none' },
        { label : 'Underline', value: 'underline'},
        { label : 'Line Through', value: 'line-through' },
        { label : 'Overline', value: 'overline' },
    ]
    const TextEditorStyling = useMemo(
        () => ({
            fontSize: EditorFontSize + 'rem',
            fontFamily: EditorFontFamily,
            color: EditorTextColor,
            fontWeight: EditorFontWeight,
            textTransform: EditorTextTransform,
            textAlign: EditorTextAlignment,
            fontStyle: EditorTextStyle,
            textDecoration: EditorTextDecoration,
            lineHeight: EditorLineHeight + 'em',
            letterSpacing: EditorLetterSpacing + 'px',
        }),
        [
            EditorFontSize,
            EditorFontFamily,
            EditorTextColor,
            EditorFontWeight,
            EditorTextTransform,
            EditorTextAlignment,
            EditorTextStyle,
            EditorTextDecoration,
            EditorLineHeight,
            EditorLetterSpacing
        ]
    );
    const EditorPaddingAndBorderSettings = useMemo(
        () => ({
            paddingTop: EditorPadding.top,
            paddingRight: EditorPadding.right,
            paddingBottom: EditorPadding.bottom,
            paddingLeft: EditorPadding.left,
            borderTopWidth: EditorTopBorder + 'px',
            borderRightWidth: EditorRightBorder + 'px',
            borderBottomWidth: EditorBottomBorder + 'px',
            borderLeftWidth: EditorLeftBorder + 'px' ,
            borderStyle: EditorBorderStyle,
            borderColor: EditorBorderColor,
            backgroundColor: EditorBackgroundColor,
        }),
        [
            EditorPadding.top,
            EditorPadding.right,
            EditorPadding.bottom,
            EditorPadding.left,
            EditorTopBorder,
            EditorRightBorder,
            EditorBottomBorder,
            EditorLeftBorder,
            EditorBorderStyle,
            EditorBorderColor,
            EditorBackgroundColor,
        ]
    );
    const EditorMarginSettings = useMemo(
        () => ({
            marginTop: EditorMargin.top,
            marginRight: EditorMargin.right,
            marginBottom: EditorMargin.bottom,
            marginLeft: EditorMargin.left,
            width: EditorWidgetWidth + '%',
        }),
        [
            EditorMargin.top,
            EditorMargin.right,
            EditorMargin.bottom,
            EditorMargin.left,
            EditorWidgetWidth,
        ]
    );

    function onChangeEditorPadding(NewPadding){
        setAttributes({EditorPadding:NewPadding})
        console.log("button padding", EditorPadding)
    }
    function onChangeEditorMargin(NewMargin){
        setAttributes({EditorMargin:NewMargin})
        console.log("button Margin", EditorMargin)
    }
    function onChangeEditorFontSize(newSize) {
        setAttributes({
            EditorFontSize: newSize
        })
    }
    function onChangeEditorFontWeight(NewWeight) {
        setAttributes({
            EditorFontWeight: NewWeight
        })
    }
    function onChangeEditorTextTransform(value) {
        setAttributes({
            EditorTextTransform: value
        })
    }
    function onChangeEditorTextStyle(newStyle) {
        setAttributes({
            EditorTextStyle: newStyle
        })
    }
    function onChangeEditorTextDecoration(newDecor) {
        setAttributes({
            EditorTextDecoration: newDecor
        })
    }

    function  onChangeEditorLineHeight(newHeight){
        setAttributes({
            EditorLineHeight: newHeight
        })
    }
    function onChangeEditorLetterSpacing(newSpacing){
        setAttributes({
            EditorLetterSpacing: newSpacing
        })
    }
    function onChangeEditorTextColor(value){
        setAttributes( {
            EditorTextColor:value });
    }

    function onChangeTextAlignmentIconChange(value) {
        if (value.target.tagName === 'SPAN'){
            var MainDiv = document.getElementById("k2-te-inspector-control-text-align");
            var Spans = MainDiv.getElementsByTagName('div');
            for (var i = 0; i < Spans.length; i++) {
                if (Spans[i].getElementsByTagName('span')[0].className.includes('k2-te-active')){
                    Spans[i].getElementsByTagName('span')[0].className = Spans[i].getElementsByTagName('span')[0].className.replace('k2-te-active','')
                }
            }
            console.log(value.target.tagName)
            value.target.className = value.target.className + ' k2-te-active'
        }
    }

    function onChangeEditorTextAlignment(NewPlacement) {
        setAttributes({
            EditorTextAlignment: NewPlacement
        })
    }
    function onChangeEditorTopBorder(value) {
        setAttributes({EditorTopBorder:value})
    }
    function onChangeEditorRightBorder(value) {
        setAttributes({EditorRightBorder:value})
    }
    function onChangeEditorBottomBorder(value) {
        setAttributes({EditorBottomBorder:value})
    }
    function onChangeEditorLeftBorder(value) {
        setAttributes({EditorLeftBorder:value})
    }
    function onChangeEditorBorderColor(value){
        setAttributes( {
            EditorBorderColor:value
        });
    }
    function onChangeEditorBorderStyle(newBorderStyle){
        setAttributes({
            EditorBorderStyle: newBorderStyle
        })
    }
    function onChangeEditorBackgroundColor(value){
        setAttributes({
            EditorBackgroundColor:value
        });
    }

    function onChangeEditorWidgetWidth(newWidth){
        setAttributes({
            EditorWidgetWidth: newWidth
        })
    }
    function onChangeTeContent(newText){
        setAttributes({
            EditorContent: newText
        })
    }
	return (
        [   <div>
                <InspectorControls>
                    <PanelBody >
                        <PanelRow>
                            <div style={{paddingBottom: '2%'}}>
                                <label><strong>Text Align</strong></label>
                            </div>
                            <div id ="k2-te-inspector-control-text-align" className={'k2-te-inspector-control-classic-position'} onClick={onChangeTextAlignmentIconChange}>

                                <div className={'k2-te-inspector-control-classic-position-single'}  onClick={() => onChangeEditorTextAlignment('left')}>
                                    <span className="fa fa-align-left k2-te-alignment-icon k2-te-active" ></span>
                                </div>
                                <div className={'k2-te-inspector-control-classic-position-single'} onClick={() => onChangeEditorTextAlignment('center')}>
                                    <span className="fa fa-align-center k2-te-alignment-icon "></span>
                                </div>
                                <div className={'k2-te-inspector-control-classic-position-single'} onClick={() => onChangeEditorTextAlignment('right')}>
                                    <span className="fa fa-align-right k2-te-alignment-icon"></span>
                                </div>
                            </div>
                        </PanelRow>
                    </PanelBody>
                    <PanelBody>
                        <RangeControl
                            label={<strong> Widget Width <small>  (%)</small></strong>}
                            value={ EditorWidgetWidth }
                            onChange={ onChangeEditorWidgetWidth }
                            min={ 0 }
                            max={ 100 }
                            step ={ 1 }
                        />
                    </PanelBody>
                    <PanelBody title={'Typography'}>

                        <RangeControl
                            label={<strong> Font Size <small>  (rem) </small></strong>}
                            value={ EditorFontSize }
                            onChange={ onChangeEditorFontSize }
                            min={ 1 }
                            max={ 10 }
                            step ={0.1}
                        />
                        <SelectControl
                            label={<strong>Font Family</strong>}
                            value={EditorFontFamily}
                            options={GLOBAL_FONTS}
                            onChange={(value)=>{setAttributes({EditorFontFamily:value})}}
                        />
                        <SelectControl
                            label={<strong>Font Weight</strong>}
                            value={ EditorFontWeight }
                            options={ GLOBAL_FONTS_WEIGHTS }
                            onChange={ onChangeEditorFontWeight}
                        />
                        <SelectControl
                            label={<strong>Text Transform</strong>}
                            value={ EditorTextTransform }
                            options={ TextTransformAvailable }
                            onChange={ onChangeEditorTextTransform }
                        />
                        <SelectControl
                            label={<strong>Style</strong>}
                            value={ EditorTextStyle }
                            options={ TextStylesAvailable }
                            onChange={ onChangeEditorTextStyle }
                        />
                        <SelectControl
                            label={<strong>Text Decoration</strong>}
                            value={ EditorTextDecoration }
                            options={ TextDecorAvailable }
                            onChange={ onChangeEditorTextDecoration }
                        />
                        <RangeControl
                            label={<strong>Line Height <small>  (em)</small></strong>}
                            value={ EditorLineHeight }
                            onChange={ onChangeEditorLineHeight }
                            min={ 0 }
                            max={ 50 }
                            step ={0.1}
                        />
                        <RangeControl
                            label={<strong>Letter Spacing</strong>}
                            value={ EditorLetterSpacing }
                            onChange={ onChangeEditorLetterSpacing }
                            min={ 0 }
                            max={ 50 }
                            step ={0.1}
                        />
                        <ColorPopup 
                                    label={"Text color"}
                                    value={{ value:EditorTextColor}}
                                    onChange = {onChangeEditorTextColor}
                                    PropertyName={"backgroundColor"}
                            />
                        <ColorPopup 
                                    label={"Background color"}
                                    value={{ value:EditorBackgroundColor}}
                                    onChange = {onChangeEditorBackgroundColor}
                                    PropertyName={"backgroundColor"}
                            />

                    </PanelBody>
                    <PanelBody title={'Styles'}>
                        <__experimentalBoxControl 
                            label='Padding'
                            value={EditorPadding}
                            onChange={onChangeEditorPadding}

                        />
                        <__experimentalBoxControl 
                            label='Margin'
                            value={EditorMargin}
                            onChange={onChangeEditorMargin}

                        />
                        {
                            EditorBorderStyle != 'none' ?
                            <Fragment>
                            <label>Border</label>
                                <Flex>
                                    <FlexItem>
                                        <NumberControl 
                                            label={'Top'}
                                            value={EditorTopBorder}
                                            onChange={onChangeEditorTopBorder}
                                            min={0}
                                        />
                                    </FlexItem>
                                    <FlexItem>
                                        <NumberControl 
                                            label={'Right'}
                                            value={EditorRightBorder}
                                            onChange={onChangeEditorRightBorder}
                                            min={0}
                                        />
                                    </FlexItem>
                                    <FlexItem>
                                        <NumberControl 
                                            label={'Bottom'}
                                            value={EditorBottomBorder}
                                            onChange={onChangeEditorBottomBorder}
                                            min={0}
                                        />
                                    </FlexItem>
                                    <FlexItem>
                                        <NumberControl 
                                            label={'Left'}
                                            value={EditorLeftBorder}
                                            onChange={onChangeEditorLeftBorder}
                                            min={0}
                                        />
                                    </FlexItem>
                                </Flex>
                                <ColorPopup 
                                    label={"Border color"}
                                    value={{ value:EditorBorderColor}}
                                    onChange = {onChangeEditorBorderColor}
                                    PropertyName={"backgroundColor"}
                                />

                            </Fragment>

                            :null
                        }
                        
                    

                    </PanelBody>
                </InspectorControls>
			</div>,
			<div id={'k2-te-wrapper'} >
				<div id={'k2-te-parent'} style={EditorMarginSettings}>
					<div id={'k2-te-sub-parent'} style={EditorPaddingAndBorderSettings}>
						<RichText
							tagName="p"
							style = {TextEditorStyling}
							value={ EditorContent }
							className={"k2-te-paragraph"}
							formattingControls={['bold', 'italic', 'strikethrough', 'link', 'unlink']}
							onChange={ onChangeTeContent }
							placeholder={ ( 'Write some text here...' ) }
						/>
					</div>
				</div>
			</div>
		]
	);
}
