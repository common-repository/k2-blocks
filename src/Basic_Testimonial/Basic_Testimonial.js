//  Import CSS.
import './editor.scss';
import './style.scss';
import {GLOBAL_FONTS} from '../Global_Fonts';
import { GLOBAL_FONTS_WEIGHTS } from '../Global_Font_Weights';
import { useMemo } from '@wordpress/element';
import ColorPopup from '../components/ColorPopup';
import { useBlockProps,
	RichText,
	InspectorControls,
    MediaUpload
	} from '@wordpress/block-editor';

import {
	PanelBody ,
	PanelRow,
    __experimentalBorderBoxControl as BorderBoxControl,
    __experimentalBoxControl as BoxControl,
	RangeControl,
    Card,CardBody,
    CardHeader,
    SelectControl,
    Flex, FlexBlock, FlexItem,
 } from '@wordpress/components';


 import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlignCenter, faAlignLeft, faAlignRight, faHeading, faStar, faPlusCircle } from '@fortawesome/free-solid-svg-icons';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const basicTestimonialicon = (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.49983 -1.27991L8.59183 -0.495907C8.40516 -0.25324 8.18116 0.120093 7.91983 0.624093C7.65849 1.10943 7.43449 1.65076 7.24783 2.24809C7.06116 2.82676 6.97716 3.38676 6.99583 3.92809C7.1265 3.89076 7.22916 3.87209 7.30383 3.87209C7.39716 3.85343 7.49049 3.84409 7.58383 3.84409C8.08783 3.84409 8.53583 3.99343 8.92783 4.29209C9.31983 4.57209 9.51583 5.03876 9.51583 5.69209C9.51583 6.25209 9.32916 6.74676 8.95583 7.17609C8.60116 7.58676 8.11583 7.79209 7.49983 7.79209C6.64116 7.81076 5.99716 7.54009 5.56783 6.98009C5.13849 6.40143 4.92383 5.69209 4.92383 4.85209C4.92383 4.25476 5.01716 3.62009 5.20383 2.94809C5.39049 2.27609 5.67049 1.58543 6.04383 0.876093C6.43583 0.148093 6.92116 -0.570574 7.49983 -1.27991ZM13.0998 -1.27991L14.1918 -0.495907C14.0052 -0.25324 13.7812 0.120093 13.5198 0.624093C13.2585 1.10943 13.0345 1.65076 12.8478 2.24809C12.6612 2.82676 12.5772 3.38676 12.5958 3.92809C12.7265 3.89076 12.8292 3.87209 12.9038 3.87209C12.9972 3.85343 13.0905 3.84409 13.1838 3.84409C13.6878 3.84409 14.1358 3.99343 14.5278 4.29209C14.9198 4.57209 15.1158 5.03876 15.1158 5.69209C15.1158 6.25209 14.9292 6.74676 14.5558 7.17609C14.2012 7.58676 13.7158 7.79209 13.0998 7.79209C12.2412 7.81076 11.5972 7.54009 11.1678 6.98009C10.7385 6.40143 10.5238 5.69209 10.5238 4.85209C10.5238 4.25476 10.6172 3.62009 10.8038 2.94809C10.9905 2.27609 11.2705 1.58543 11.6438 0.876093C12.0358 0.148093 12.5212 -0.570574 13.0998 -1.27991Z" fill="url(#paint0_linear_960_125)"/>
        <path d="M20.8917 4.86646H20.1041C19.7589 4.86646 19.4791 5.14627 19.4791 5.49146C19.4791 5.83664 19.7589 6.11646 20.1041 6.11646H20.8917C26.3276 6.11646 30.75 10.5389 30.75 15.9748C30.75 20.6143 27.4595 24.6718 22.9258 25.6226C22.7854 25.652 22.6594 25.7289 22.5689 25.8403C22.4785 25.9517 22.4291 26.0908 22.4291 26.2343V29.8658L18.5795 26.0161C18.4623 25.8989 18.3033 25.8331 18.1376 25.8331H11.1083C5.67244 25.8331 1.25 21.4106 1.25 15.9748C1.25 14.2995 1.67769 12.6451 2.48688 11.1905C2.65475 10.8889 2.54619 10.5083 2.24456 10.3405C1.94287 10.1726 1.56231 10.2812 1.39456 10.5828C0.482188 12.2228 0 14.0873 0 15.9748C0 22.1 4.98313 27.0831 11.1083 27.0831H17.8787L22.6122 31.8166C22.6996 31.904 22.811 31.9635 22.9322 31.9876C23.0534 32.0118 23.1791 31.9994 23.2933 31.952C23.4075 31.9047 23.5051 31.8246 23.5738 31.7219C23.6425 31.6191 23.6791 31.4982 23.6791 31.3746V26.7296C25.9406 26.1436 27.9854 24.8396 29.4796 23.0206C31.1049 21.0421 32 18.5398 32 15.9748C32 9.84964 27.0169 4.86652 20.8917 4.86646Z" fill="url(#paint1_linear_960_125)"/>
        <path d="M23.6915 11.0933H8.30859C7.96341 11.0933 7.68359 11.3731 7.68359 11.7183C7.68359 12.0634 7.96341 12.3433 8.30859 12.3433H23.6915C24.0367 12.3433 24.3165 12.0634 24.3165 11.7183C24.3165 11.3731 24.0367 11.0933 23.6915 11.0933ZM23.6915 14.4266H8.30859C7.96341 14.4266 7.68359 14.7064 7.68359 15.0516C7.68359 15.3968 7.96341 15.6766 8.30859 15.6766H23.6915C24.0367 15.6766 24.3165 15.3968 24.3165 15.0516C24.3165 14.7064 24.0367 14.4266 23.6915 14.4266ZM23.6915 17.7599H8.30859C7.96341 17.7599 7.68359 18.0398 7.68359 18.3849C7.68359 18.73 7.96341 19.0099 8.30859 19.0099H23.6915C24.0367 19.0099 24.3165 18.73 24.3165 18.3849C24.3165 18.0398 24.0367 17.7599 23.6915 17.7599ZM23.6915 21.0933H15.492C15.1468 21.0933 14.867 21.3731 14.867 21.7183C14.867 22.0634 15.1468 22.3433 15.492 22.3433H23.6915C24.0367 22.3433 24.3165 22.0634 24.3165 21.7183C24.3165 21.3731 24.0367 21.0933 23.6915 21.0933Z" fill="url(#paint2_linear_960_125)"/>
        <defs>
        <linearGradient id="paint0_linear_960_125" x1="9.81599" y1="-2.36866" x2="12.7537" y2="12.1149" gradientUnits="userSpaceOnUse">
        <stop stop-color="#7BDCB5"/>
        <stop offset="1" stop-color="#1D92DD" stop-opacity="0"/>
        </linearGradient>
        <linearGradient id="paint1_linear_960_125" x1="15.36" y1="1.61047" x2="23.7589" y2="45.0839" gradientUnits="userSpaceOnUse">
        <stop stop-color="#7BDCB5"/>
        <stop offset="1" stop-color="#1D92DD" stop-opacity="0"/>
        </linearGradient>
        <linearGradient id="paint2_linear_960_125" x1="15.6674" y1="9.74326" x2="18.4821" y2="28.0073" gradientUnits="userSpaceOnUse">
        <stop stop-color="#7BDCB5"/>
        <stop offset="1" stop-color="#1D92DD" stop-opacity="0"/>
        </linearGradient>
        </defs>
    </svg>

);
/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'k2/basic-testimonial', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Basic Testimonial' ), // Block title.
	icon: {
		src: basicTestimonialicon
		}, // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'k2-blocks', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'basic' ),
		__( 'Testimonial' ),
        __( 'K2' )
	],
    supports:{
        spacing: {
            margin: true,  // Enable margin UI control.
            padding: true, // Enable padding UI control.
            blockGap: true,  // Enables block spacing UI control.
        }
    },
	attributes: {
        k2BTtestimonials:{
            type: "string",
            default:"— Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type"
        },
        k2BTauthorName:{
            type:"string",
            default:"Zoe Mantis"
        },
        k2BTauthorImage:{
            type:"string",
            default:"https://k2blocks.com/wp-content/uploads/2023/01/pexels-vazhnik-7562313.png"
        },
        K2BTauthorImageWidth:{
            type:"number",
            default:55
        },
        AuthorImageAlignment:{
            type: "stirng",
            default: 'flex-start'
        },
        K2BTtextColor: {
            type:"string",
            default:"#fff"
        },
        k2BTtextfontSize: {
            type:"number"
        },
        K2BTtextFontFamily:{
            type:"string",

        },
        K2BTtextFontAlignment:{
            type:"string",

        },
        K2BTtextLineHeight:{
            type:"number",
            default:1.5
        },
        K2BTquoteColor:{
            type:"string",
            default:"#2C2A4A"
        },
        K2BtquoteFontFam:{
            type:"string"
        },
        K2BTtextFontWeight:{
            type:"string"
        },
        k2BTauthornameColor:{
            type:"string",
            default:"#fff"
        },
        k2BTauthorNameFontSize:{
            type:"number"
        },
        k2BTauthorNameFontFamily:{
            type:"string"
        },
        k2BTauthorNameFontWeight:{
            type:"string"
        },
        K2BTtestimonialBackground:{
            type:"string",
            default:"#148D9D"
        },
        K2BTtestimonialBorder:{
            type:"object",
            default: {color: "#0FAE96", style: "solid", width: "1px"}
        },
        K2BTtestimonialBorderRadius:{
            type:"object",
            default: {top: '8px', right: "8px", bottom: "8px", left: "8px"}
        },
        K2BTauthorNameAlignment:{
            type:"string"
        },
        K2BTwidth:{
            type:"numebr",
            default:50
        },
        K2BTposition:{
            type:"string",
            default:"center"
        },
        K2BTBottomSpacing:{
            type:"number",
            default: 15
        }
	},
	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Component.
	 */
	edit: ( {attributes,setAttributes} ) => {
        const {
            k2BTtestimonials,
            k2BTauthorName,
            k2BTauthorImage,
            K2BTauthorImageWidth,
            AuthorImageAlignment,
            K2BTtextColor,
            k2BTtextfontSize,
            K2BTtextFontWeight,
            K2BTtextFontFamily,
            K2BTtextLineHeight,
            k2BTauthornameColor,
            k2BTauthorNameFontSize,
            k2BTauthorNameFontFamily,
            k2BTauthorNameFontWeight,
            K2BTtestimonialBackground,
            K2BTtestimonialBorder,
            K2BTtestimonialBorderRadius,
            K2BTquoteColor,
            K2BtquoteFontFam,
            K2BTtextFontAlignment,
            K2BTauthorNameAlignment,
            K2BTwidth,
            K2BTposition,
            K2BTBottomSpacing
		} = attributes;
        const onChangeK2BTwidth = (newVal) => {
            setAttributes({K2BTwidth:newVal});
        }
        const onChangeK2BTposition = (newPos) => {
            setAttributes({K2BTposition:newPos})
        }
        const BTPos = useMemo(
			() => ({
				display:"flex",
                justifyContent: K2BTposition
            }),
			[
                K2BTposition,
			]
		);
        const colorOptions = [
            { name: 'blue', color: '#00f' },
            { name: 'black', color: '#000' },
            { name: 'Purple', color: '#2C2A4A' },
            { name: 'Light Purple', color: '#4F518C' },
        ]
        const onChangeK2BTBottomSpacing = (NewSpacing) => {
            setAttributes({K2BTBottomSpacing:NewSpacing});
        }
        const onChangeK2BTtextLineHeight = (newLine) => {
            setAttributes({K2BTtextLineHeight:newLine})
        }
        const textstyle = useMemo(
			() => ({
				color: K2BTtextColor,
                fontSize: k2BTtextfontSize+"rem",
                fontFamily: K2BTtextFontFamily,
                fontWeight: K2BTtextFontWeight,
                textAlign: K2BTtextFontAlignment,
                marginBottom: K2BTBottomSpacing+"px",
                lineHeight: K2BTtextLineHeight+'rem'
            }),
			[
                K2BTtextColor,
                k2BTtextfontSize,
                K2BTtextFontFamily,
                K2BTtextFontWeight,
                K2BTtextFontAlignment,
                K2BTBottomSpacing,
                K2BTtextLineHeight
			]
		);
       
        const onChangeK2BTtestimonialBorderRadius = (newBorderRadius) => {
            setAttributes({K2BTtestimonialBorderRadius:newBorderRadius})
            console.log(K2BTtestimonialBorderRadius);
        }
        const CardStyles = useMemo(
			() => ({
				background : K2BTtestimonialBackground,
                borderColor: K2BTtestimonialBorder.color,
                borderStyle: K2BTtestimonialBorder.style,
                borderWidth: K2BTtestimonialBorder.width,
                borderTopLeftRadius: K2BTtestimonialBorderRadius.top,
                borderTopRightRadius: K2BTtestimonialBorderRadius.right,
                borderBottomRightRadius: K2BTtestimonialBorderRadius.bottom,
                borderBottomLeftRadius: K2BTtestimonialBorderRadius.left,
                width: K2BTwidth+"%"
            }),
			[
                K2BTtestimonialBackground,
                K2BTtestimonialBorder.color,
                K2BTtestimonialBorder.style,
                K2BTtestimonialBorder.width,
                K2BTtestimonialBorderRadius.top,
                K2BTtestimonialBorderRadius.right,
                K2BTtestimonialBorderRadius.bottom,
                K2BTtestimonialBorderRadius.left,
                K2BTwidth
			]
		);
        const onChangeK2BTtextFontAlignment = (NewAllignment) => {
			setAttributes({
                    K2BTtextFontAlignment: NewAllignment
				})
			
		}
        const onChangeK2BTauthorNameAlignment = (NewAllignment) => {
			setAttributes({
                K2BTauthorNameAlignment: NewAllignment
				})
			
		}

        const onChangek2BTtestimonials = (newText) => {
            setAttributes({k2BTtestimonials:newText})
        }
        const onChangek2BTauthorName = (newAuthor) => {
            setAttributes({k2BTauthorName:newAuthor})
        }
        const onChangek2BTauthorImage = (newImage) => {
            setAttributes({k2BTauthorImage:newImage.url})
        }
        const onChangeK2BTauthorImageWidth = (newWidth) => {
            setAttributes({K2BTauthorImageWidth:newWidth})
        }
        const onChangeAuthorImageAlignment = (NewAllignment) => {
			setAttributes({
                    AuthorImageAlignment: NewAllignment
				})
			
		}
        const AuthorimageAlignment = useMemo(
			() => ({
                justifyContent: AuthorImageAlignment
            }),
			[
                AuthorImageAlignment,
			]
		);
        const authorImageStyle = useMemo(
			() => ({
                width: K2BTauthorImageWidth+"px",
            }),
			[
                K2BTauthorImageWidth,
			]
		);
        const onChangeK2BTtextColor = (newColor) => {
            setAttributes({K2BTtextColor:newColor})
        }
        const onChangek2BTtextfontSize = (newSize) => {
            setAttributes({k2BTtextfontSize: newSize})
        }
        const onChangeK2BTtextFontFamily = (newFam) => {
            setAttributes({K2BTtextFontFamily:newFam})
        }
        const onChangeK2BTtextFontWeight = (Nweight) => {
            setAttributes({K2BTtextFontWeight:Nweight})
        }
        const onChangek2BTauthornameColor =(newColor) => {
            setAttributes({k2BTauthornameColor:newColor})
        }
        const onChangek2BTauthorNameFontSize = (newSize) => {
            setAttributes({k2BTauthorNameFontSize: newSize})
        }
        const onChangek2BTauthorNameFontFamily = (AuthorFam) => {
            setAttributes({k2BTauthorNameFontFamily:AuthorFam})
        }
        const onChangek2BTauthorNameFontWeight = (authorWeight) => {
            setAttributes({k2BTauthorNameFontWeight:authorWeight})
        }
        const authorNameStyle = useMemo(
			() => ({
                color:k2BTauthornameColor,
                fontSize: k2BTauthorNameFontSize+"rem",
                fontFamily: k2BTauthorNameFontFamily,
                fontWeight: k2BTauthorNameFontWeight,
                textAlign:K2BTauthorNameAlignment
            }),
			[
                k2BTauthornameColor,
                k2BTauthorNameFontSize,
                k2BTauthorNameFontFamily,
                k2BTauthorNameFontWeight,
                K2BTauthorNameAlignment
			]
		);
        const onChangeK2BTtestimonialBackground = (bgColor) => {
            setAttributes({K2BTtestimonialBackground:bgColor})
        }
        const onChangeK2BTtestimonialBorder = (newValue) => {
            setAttributes({K2BTtestimonialBorder:newValue})
        }
      
        const onChangeK2BTquoteColor = (newQcolor) => {
            setAttributes({K2BTquoteColor: newQcolor})
        }
    
        const onChangeK2BtquoteFontFam = (newFam) => {
            setAttributes({K2BtquoteFontFam:newFam})
        }
        const QuoteStyle = useMemo(
			() => ({
                color: K2BTquoteColor,
                fontFamily: K2BtquoteFontFam,
            }),
			[
                K2BTquoteColor,
                K2BtquoteFontFam
			]
		);
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
            <div {...useBlockProps()} style={BTPos}>
                <div className='k2-bt-parent-container' style={CardStyles}>
                    <div className='k2-bt-top-section' style={AuthorimageAlignment}>
                        <div className='k2-bt-image-container'>
                            <img src={k2BTauthorImage} className="k2-bt-author-image" style={authorImageStyle} />
                            <div className="k2-bt-quotation-mark-container" style={QuoteStyle} >“</div>
                              
                        </div>
                        
                    </div>
                    <div className='k2-bt-testimonial-section'>
                        <RichText
                            tagName='p'
                            value={k2BTtestimonials}
                            onChange={onChangek2BTtestimonials}
                            style={textstyle}

                        />
                    </div>
                    <hr/>
                    <div className='k2-bt-authorName'>
                        <RichText
                            tagName='p'
                            value={k2BTauthorName}
                            onChange={onChangek2BTauthorName}
                            style={authorNameStyle}
                        />
                    </div>
                </div>
                <InspectorControls>
                <PanelBody title={__("Testimonial Settings")} initialOpen={false}>
                        <Card>
                            <CardBody>
                            <RangeControl
                                    label="width"
                                    value={K2BTwidth}
                                    onChange={onChangeK2BTwidth}
                                />
                                <PanelRow>

                                    <div style={{paddingBottom: '2%'}}>
                                        <label><strong>Widget Alignment</strong></label>
                                    </div>
                                    <div id = {'AlignmentIconsParent'} className={'k2-ib-inspector-control-alignment'} onClick={onChangeAlignmentIconChange}>

                                        <div className={'k2-ib-inspector-control-alignment-single'}  onClick={() => onChangeK2BTposition('flex-start')}>
                                            <span className="fa fa-align-left k2-ib-alignment-icon-style" ></span>
                                        </div>
                                        <div className={'k2-ib-inspector-control-alignment-single'} onClick={() => onChangeK2BTposition('center')}>
                                            <span className="fa fa-align-center k2-ib-alignment-icon-style k2-ib-active"></span>
                                        </div>
                                        <div className={'k2-ib-inspector-control-alignment-single'} onClick={() => onChangeK2BTposition('flex-end')}>
                                            <span className="fa fa-align-right k2-ib-alignment-icon-style"></span>
                                        </div>
                                    </div>

                                </PanelRow>
                            </CardBody>
                        </Card>
                   </PanelBody>
                   <PanelBody title={__("Image")}>
                        <Card>
                            <CardBody>
                                <MediaUpload
                                    accept = "image/*"
                                    allowedTypes={ [ 'image' ] }
                                    value={k2BTauthorImage}
                                    onSelect={ onChangek2BTauthorImage }
                                    render={ ({open}) => {
                                        return <div style={{backgroundImage: 'url("' + k2BTauthorImage + '")'}} className={'k2-AB-image-select-control'}>
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
                                    value={K2BTauthorImageWidth}
                                    onChange={onChangeK2BTauthorImageWidth}
                                />
                                <PanelRow>

                                    <div style={{paddingBottom: '2%'}}>
                                        <label><strong>Alignment</strong></label>
                                    </div>
                                    <div id = {'AlignmentIconsParent'} className={'k2-ib-inspector-control-alignment'} onClick={onChangeAlignmentIconChange}>

                                        <div className={'k2-ib-inspector-control-alignment-single'}  onClick={() => onChangeAuthorImageAlignment('flex-start')}>
                                            <span className="fa fa-align-left k2-ib-alignment-icon-style" ></span>
                                        </div>
                                        <div className={'k2-ib-inspector-control-alignment-single'} onClick={() => onChangeAuthorImageAlignment('center')}>
                                            <span className="fa fa-align-center k2-ib-alignment-icon-style k2-ib-active"></span>
                                        </div>
                                        <div className={'k2-ib-inspector-control-alignment-single'} onClick={() => onChangeAuthorImageAlignment('flex-end')}>
                                            <span className="fa fa-align-right k2-ib-alignment-icon-style"></span>
                                        </div>
                                    </div>

                                </PanelRow>
                            </CardBody>
                        </Card>
                   </PanelBody>
                   <PanelBody title={__("Quote")}>
                        <Card>
                            <CardBody>
                                <ColorPopup 
                                    label={"Color"}
                                    value={{ value: K2BTquoteColor}}
                                    onChange = {onChangeK2BTquoteColor}
                                    PropertyName={"backgroundColor"}
                                />
                                <SelectControl
                                    label="Font Family"
                                    value={  K2BtquoteFontFam }
                                    options={ GLOBAL_FONTS }
                                    onChange={ onChangeK2BtquoteFontFam}
                                />
                            </CardBody>
                        </Card>
                   </PanelBody>
                   <PanelBody title={__("Text")} initialOpen={false}>
                    <CardHeader>Content</CardHeader>
                        <Card>
                            <CardBody>
                                <ColorPopup 
                                    label={"Text Color"}
                                    value={{ value: K2BTtextColor}}
                                    onChange = {onChangeK2BTtextColor}
                                    PropertyName={"backgroundColor"}
                                />
                                <RangeControl
                                    label="Font Size"
                                    value={k2BTtextfontSize}
                                    onChange={onChangek2BTtextfontSize}
                                    step={0.1}
                                />
                                <Flex>
                                    <FlexItem>
                                        <SelectControl
                                            label="Font Family"
                                            value={K2BTtextFontFamily}
                                            options={ GLOBAL_FONTS }
                                            onChange={onChangeK2BTtextFontFamily}

                                        />
                                    </FlexItem>
                                    <FlexItem>
                                        <SelectControl
                                            label="Font Weight"
                                            value={K2BTtextFontWeight}
                                            options={ GLOBAL_FONTS_WEIGHTS }
                                            onChange={onChangeK2BTtextFontWeight}

                                        />
                                    </FlexItem>
                                </Flex>
                                <RangeControl 
                                    label="Line Height"
                                    value={K2BTtextLineHeight}
                                    onChange={onChangeK2BTtextLineHeight}
                                    step={0.1}
                                />
                                <PanelRow>

                                    <div style={{paddingBottom: '2%'}}>
                                        <label><strong>Text Alignment</strong></label>
                                    </div>
                                    <div id = {'AlignmentIconsParent'} className={'k2-ib-inspector-control-alignment'} onClick={onChangeAlignmentIconChange}>

                                        <div className={'k2-ib-inspector-control-alignment-single'}  onClick={() => onChangeK2BTtextFontAlignment('left')}>
                                            <span className="fa fa-align-left k2-ib-alignment-icon-style" ></span>
                                        </div>
                                        <div className={'k2-ib-inspector-control-alignment-single'} onClick={() => onChangeK2BTtextFontAlignment('center')}>
                                            <span className="fa fa-align-center k2-ib-alignment-icon-style k2-ib-active"></span>
                                        </div>
                                        <div className={'k2-ib-inspector-control-alignment-single'} onClick={() => onChangeK2BTtextFontAlignment('right')}>
                                            <span className="fa fa-align-right k2-ib-alignment-icon-style"></span>
                                        </div>
                                    </div>

                                </PanelRow>
                                <RangeControl
                                    label="Bottom Spacing"
                                    value={K2BTBottomSpacing}
                                    onChange={onChangeK2BTBottomSpacing}
                                    step={1}
                                />
                            </CardBody>
                        </Card>
                        <CardHeader>Author Name</CardHeader>
                        <Card>
                            <CardBody>
                                <ColorPopup 
                                    label={"Text Color"}
                                    value={{ value: k2BTauthornameColor}}
                                    onChange = {onChangek2BTauthornameColor}
                                    PropertyName={"backgroundColor"}
                                />
                                <RangeControl
                                    label="Font Size"
                                    value={k2BTauthorNameFontSize}
                                    onChange={onChangek2BTauthorNameFontSize}
                                    step={0.1}
                                />
                                <Flex>
                                    <FlexItem>
                                        <SelectControl
                                            label="Font Family"
                                            value={k2BTauthorNameFontFamily}
                                            options={ GLOBAL_FONTS }
                                            onChange={onChangek2BTauthorNameFontFamily}

                                        />
                                    </FlexItem>
                                    <FlexItem>
                                        <SelectControl
                                            label="Font Weight"
                                            value={k2BTauthorNameFontWeight}
                                            options={ GLOBAL_FONTS_WEIGHTS }
                                            onChange={onChangek2BTauthorNameFontWeight}

                                        />
                                    </FlexItem>
                                </Flex>
                                <PanelRow>

                                    <div style={{paddingBottom: '2%'}}>
                                        <label><strong>Text Alignment</strong></label>
                                    </div>
                                    <div id = {'AlignmentIconsParent'} className={'k2-ib-inspector-control-alignment'} onClick={onChangeAlignmentIconChange}>

                                        <div className={'k2-ib-inspector-control-alignment-single'}  onClick={() => onChangeK2BTauthorNameAlignment('left')}>
                                            <span className="fa fa-align-left k2-ib-alignment-icon-style" ></span>
                                        </div>
                                        <div className={'k2-ib-inspector-control-alignment-single'} onClick={() => onChangeK2BTauthorNameAlignment('center')}>
                                            <span className="fa fa-align-center k2-ib-alignment-icon-style k2-ib-active"></span>
                                        </div>
                                        <div className={'k2-ib-inspector-control-alignment-single'} onClick={() => onChangeK2BTauthorNameAlignment('right')}>
                                            <span className="fa fa-align-right k2-ib-alignment-icon-style"></span>
                                        </div>
                                    </div>

                                    </PanelRow>
                            </CardBody>
                        </Card>
                   </PanelBody>
                   <PanelBody title={__("Background")} initialOpen={false}>
                        <Card>
                            <CardBody>
                                <ColorPopup 
                                    label={"Background Color"}
                                    value={{ value: K2BTtestimonialBackground}}
                                    onChange = {onChangeK2BTtestimonialBackground}
                                    PropertyName={"backgroundColor"}
                                />
                                <BorderBoxControl
                                    label="Borders"
                                    onChange={onChangeK2BTtestimonialBorder}
                                    value={K2BTtestimonialBorder}
                                    colors = {colorOptions}

                                />

                                <BoxControl
                                    label="Border radius"
                                    value={K2BTtestimonialBorderRadius}
                                    onChange={onChangeK2BTtestimonialBorderRadius}
                                />
                            </CardBody>
                        </Card>
                   </PanelBody>
                </InspectorControls>
            </div>
        );
    },
    /**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Frontend HTML.
	 */
	save: ( { attributes } ) => {
        const {
            k2BTtestimonials,
            k2BTauthorName,
            k2BTauthorImage,
            K2BTauthorImageWidth,
            K2BTtextColor,
            K2BTtextLineHeight ,
            k2BTtextfontSize,
            K2BTtextFontWeight,
            K2BTtextFontFamily,
            k2BTauthornameColor,
            k2BTauthorNameFontSize,
            k2BTauthorNameFontFamily,
            k2BTauthorNameFontWeight,
            K2BTtestimonialBackground,
            K2BTtestimonialBorder,
            K2BTtestimonialBorderRadius,
            K2BTquoteColor,
            K2BtquoteFontFam,
            AuthorImageAlignment,
            K2BTtextFontAlignment,
            K2BTauthorNameAlignment,
            K2BTwidth,
            K2BTposition,
            K2BTBottomSpacing
		} = attributes;

        const CardStyles = {
            background : K2BTtestimonialBackground,
            borderColor: K2BTtestimonialBorder.color,
            borderStyle: K2BTtestimonialBorder.style,
            borderWidth: K2BTtestimonialBorder.width,
            borderTopLeftRadius: K2BTtestimonialBorderRadius.top,
            borderTopRightRadius: K2BTtestimonialBorderRadius.right,
            borderBottomRightRadius: K2BTtestimonialBorderRadius.bottom,
            borderBottomLeftRadius: K2BTtestimonialBorderRadius.left,
            width: K2BTwidth+"%"
        }
        const BTPos = {
            display:"flex",
            justifyContent:K2BTposition
        }
        const authorImageStyle = {
            width: K2BTauthorImageWidth+"px"
        }
        const textstyle = {
            color: K2BTtextColor,
            fontSize: k2BTtextfontSize+"rem",
            fontFamily: K2BTtextFontFamily,
            fontWeight: K2BTtextFontWeight,
            textAlign:K2BTtextFontAlignment,
            marginBottom: K2BTBottomSpacing+"px",
            lineHeight: K2BTtextLineHeight+'rem'
        }
        const authorNameStyle = {
            color:k2BTauthornameColor,
            fontSize: k2BTauthorNameFontSize+"rem",
            fontFamily: k2BTauthorNameFontFamily,
            fontWeight: k2BTauthorNameFontWeight,
            textAlign: K2BTauthorNameAlignment
        }
        const QuoteStyle = {
            color: K2BTquoteColor,
            fontFamily: K2BtquoteFontFam,
        }
        const AuthorimageAlignment = {
            justifyContent: AuthorImageAlignment
        }
        return (
			<div {...useBlockProps.save()} style={BTPos}>
				<div className='k2-bt-parent-container' style={CardStyles}>
                    <div className='k2-bt-top-section' style={AuthorimageAlignment}>
                        <div className='k2-bt-image-container'>
                                <img src={k2BTauthorImage} className="k2-bt-author-image" style={authorImageStyle} />
                                <div className="k2-bt-quotation-mark-container" style={QuoteStyle} >“</div>
                                
                        </div>
                    </div>
                    <div className='k2-bt-testimonial-section'>
                        <RichText.Content
                            tagName='p'
                            value={k2BTtestimonials}
                            style={textstyle}
                        />
                    </div>
                    <hr/>
                    <div className='k2-bt-authorName'>
                        <RichText.Content
                            tagName='p'
                            value={k2BTauthorName}
                            style={authorNameStyle}
                        />
                    </div>
                </div>
			</div>
		);
    },

} );
