//  Import CSS.
import './editor.scss';
import './style.scss';
import { GLOBAL_FONTS } from '../Global_Fonts';
import { GLOBAL_ICONS} from '../Global_Icons'
import { Fragment, useMemo } from '@wordpress/element';
import ColorPopup from '../components/ColorPopup';
import { GLOBAL_FONTS_WEIGHTS } from '../Global_Font_Weights';


const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType,
	AlignmentToolbar,
	// For attribute sources
} = wp.blocks;
const {
	RichText,
	InspectorControls,
	DimensionControl,
	BlockControls
} = wp.editor;

import {
	PanelBody ,
	PanelRow,
	__experimentalNumberControl as NumberControl,
	SelectControl,
	RangeControl,
	__experimentalBoxControl,
	Flex, FlexBlock, FlexItem,
 } from '@wordpress/components';

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new Progress_Bar_Block provided a unique name and an object defining its
 * behavior. Once registered, the Progress_Bar_Block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The Progress_Bar_Block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */

var texteditorBlockIcon=(
	<svg width={800} height={800} viewBox="0 0 800 800">
		<image
			x={161}
			y={343}
			width={477}
			height={111}
			xlinkHref="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAAd0AAABvCAMAAACeluqWAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAY1BMVEU2yGo2yGo2yGo2yGo2yGo2yGo2yGo2yGo2yGo2yGo2yGo2yGo2yGo2yGo2yGo2yGo2yGo2yGo2yGo2yGo2yGo2yGo2yGo2yGo2yGo2yGo2yGo2yGo2yGo2yGo2yGo2yGoAAAAcFDiVAAAAH3RSTlMABlam3/nz11VR21IDiVTj5Ftcq6zg+PLZB4qTlFP6t2bvfgAAAAFiS0dEILNrPYAAAAAJcEhZcwAALiMAAC4jAXilP3YAAAAHdElNRQfkBwYBERMA73gBAAABnUlEQVR42u3Wa07CABBF4amA1toWCsUHKu5/l1I0rIDJJCfnW8FNzp8bsWgeVuvNjxgen1ZtEzfPXfUg3Vn38t+2H6qnKMHQX+sal2lY4o7VK5RkvByqbfUIJdk1MVVvUJp9HKonKM0cx+oJSnOM1+oJSrOJ6gVKZF0y65JZl8y6ZNYlsy6ZdcmsS2ZdMuuSWZfMumTWJbMumXXJrEtmXTLrklmXzLpk1iWzLpl1yaxLZl0y65JZl8y6ZNYlsy6ZdcmsS2ZdMuuSWZfMumTWJbMumXXJrEtmXTLrklmXzLpk1iWzLpl1yaxLZl0y65JZl8y6ZNYlsy6ZdcmsS2ZdMuuSWZfMumTWJbMumXXJrEtmXTLrklmXzLpk1iWzLpl1yaxLZl0y65JZl8y6ZNYlsy6ZdcmsS2ZdMuuSWZfMumTWJbMumXXJrEtmXTLrksVb9QKl2cR79QSlOcaheoLSzDFVT1CafTTb6g1KsvuIaKtHKEkbF6fqFUpxWuJG/1m9Qwm++vjz3VVP0Z11Y9w007w+Vw/SnZzX89Rcu/4CtlcBl9E+D6EAAAAASUVORK5CYII="
		/>
		<path fill="#fff" stroke="#040404" d="M322 390h156v17H322z" />
	</svg>
)

registerBlockType( 'k2/creative-paragraph', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-Progress_Bar_Block.
	title: __( 'Creative Paragraph' ), // Block title.
	icon: {
		src: texteditorBlockIcon
	} ,
	category: 'k2-blocks', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'Text Editor' ),
		__( 'para' ),
		__( 'paragraph' ),
	],
	attributes: {
		EditorFontSize: {
			type: 'number',
			default: 2
		},
		EditorFontFamily: {
			type: 'string',
			default: 'inherit'
		},
		EditorTextColor: {
			type:'string',
			default: 'black'
		},
		EditorTextAlignment: {
			type: 'string',
			default: 'left'
		},
		EditorFontWeight: {
			type: 'string',
			default: 'normal'
		},
		EditorTextTransform: {
			type: 'string',
			default: 'none'
		},
		EditorLineHeight: {
			type: 'number',
			default: 1.5
		},
		EditorLetterSpacing: {
			type: 'number',
			default: 1
		},
		EditorTextDecoration:{
			type : 'string',
			default: 'none'
		},
		EditorTextStyle: {
			type: 'string',
			default: 'normal'
		},
		EditorContent: {
			type: 'string',
			default: 'Write some text here...'
		},
		EditorPadding:{
			type:'object',
			default:{top: '8px', right: "8px", bottom: "8px", left: "8px"}
		},
		EditorMargin:{
			type:'object',
			default:{top: '8px', right: "8px", bottom: "8px", left: "8px"}
		},
		EditorTopMargin: {
			type: 'number',
			default:0
		},
		EditorRightMargin: {
			type: 'number',
			default:0
		},
		EditorBottomMargin: {
			type: 'number',
			default:0
		},
		EditorLeftMargin: {
			type: 'number',
			default:0
		},
		EditorTopBorder: {
			type: 'number',
			default: 10
		},
		EditorRightBorder: {
			type: 'number',
			default: 10
		},
		EditorBottomBorder: {
			type: 'number',
			default: 10
		},
		EditorLeftBorder: {
			type: 'number',
			default: 10
		},
		EditorBorderStyle: {
			type: 'string',
			default: 'none'
		},
		EditorBorderColor: {
			type: 'string',
			default: 'black'
		},
		EditorBackgroundColor: {
			type: 'string',
			default:'rgb(255, 255, 255)'
		},

		EditorWidgetWidth: {
			type: 'number',
			default:100
		}
	},
	// Editor Mode
	edit( { attributes, setAttributes } ) {
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

		return [
			<div>
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
	},

	// Preview Mode

	save( { attributes } ) {
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
			EditorTopBorder,
			EditorRightBorder,
			EditorBottomBorder,
			EditorLeftBorder,
			EditorBorderStyle,
			EditorBorderColor,
			EditorBackgroundColor,
			EditorWidgetWidth

		} = attributes;

		const TextEditorStyling = {
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
		}
		const EditorPaddingAndBorderSettings ={
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
		}
		const EditorMarginSettings = {
			marginTop: EditorMargin.top,
				marginRight: EditorMargin.right,
				marginBottom: EditorMargin.bottom,
				marginLeft: EditorMargin.left,
				width: EditorWidgetWidth + '%',

		}
		return <div id={'k2-te-wrapper'}>
			<div id={'k2-te-parent'} style={EditorMarginSettings}>
				<div  style={EditorPaddingAndBorderSettings}>
					<RichText.Content 
						tagName="p"
						value={EditorContent }
						style={TextEditorStyling}
						className={"k2-te-paragraph"}
					/>
				</div>
			</div>
		</div>;
	}
});
