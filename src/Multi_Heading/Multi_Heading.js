import './editor.scss';
import './style.scss';
import {GLOBAL_FONTS} from '../Global_Fonts';
import { GLOBAL_FONTS_WEIGHTS } from '../Global_Font_Weights';
import { useMemo, Fragment} from '@wordpress/element';
import ColorPopup from '../components/ColorPopup';
import { useBlockProps,
	AlignmentControl,
	RichText,
	InspectorControls,
	PanelColorSettings,
	MediaUpload
	} from '@wordpress/block-editor';

    import { Spinner,
        PanelBody ,
        PanelRow,
        TextControl,
        __experimentalNumberControl as NumberControl,
        __experimentalBorderBoxControl as BorderBoxControl,
        __experimentalBoxControl as BoxControl,
        CheckboxControl,
        RangeControl,   
        ToggleControl,
        ColorPicker,
        ColorPalette,
        SelectControl,
        Card,
        CardBody,
        CardHeader,
        __experimentalHeading as Heading,
        Flex, FlexBlock, FlexItem,
        TabPanel,
        GradientPicker,
     } from '@wordpress/components';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
import { useState, useEffect } from '@wordpress/element';
const MultiHeadingIcon = (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4.27085 4.53623H27.7133V9.01623H4.27085V4.53623ZM1.85059 2.11597V11.4358H30.134V2.11597H1.85059ZM1.85059 25.716H19.638V28.1348H1.85059V25.716ZM1.85059 20.1487H30.134V22.5693H1.85059V20.1487ZM1.85059 14.5828H30.134V17.0027H1.85059V14.5828Z" fill="url(#paint0_linear_940_1603)"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M25.843 12.1014C26.0866 12.2024 26.2948 12.3734 26.4412 12.5926C26.5876 12.8119 26.6658 13.0697 26.6657 13.3334V24.0001C26.6657 24.3537 26.5252 24.6928 26.2752 24.9429C26.0251 25.1929 25.686 25.3334 25.3324 25.3334C24.9787 25.3334 24.6396 25.1929 24.3895 24.9429C24.1395 24.6928 23.999 24.3537 23.999 24.0001V16.5521L23.6084 16.9427C23.4854 17.0701 23.3382 17.1717 23.1756 17.2416C23.0129 17.3114 22.8379 17.3482 22.6609 17.3497C22.4839 17.3513 22.3083 17.3176 22.1444 17.2505C21.9806 17.1835 21.8317 17.0845 21.7065 16.9593C21.5813 16.8341 21.4823 16.6852 21.4153 16.5214C21.3482 16.3575 21.3145 16.1819 21.316 16.0049C21.3176 15.8278 21.3543 15.6529 21.4242 15.4902C21.4941 15.3275 21.5957 15.1804 21.723 15.0574L24.3897 12.3907C24.5761 12.2042 24.8138 12.0771 25.0725 12.0256C25.3312 11.9741 25.5993 12.0005 25.843 12.1014ZM5.33236 6.66675C5.68598 6.66675 6.02512 6.80722 6.27517 7.05727C6.52521 7.30732 6.66569 7.64646 6.66569 8.00008V24.0001C6.66569 24.3537 6.52521 24.6928 6.27517 24.9429C6.02512 25.1929 5.68598 25.3334 5.33236 25.3334C4.97873 25.3334 4.6396 25.1929 4.38955 24.9429C4.1395 24.6928 3.99902 24.3537 3.99902 24.0001V8.00008C3.99902 7.64646 4.1395 7.30732 4.38955 7.05727C4.6396 6.80722 4.97873 6.66675 5.33236 6.66675ZM15.999 6.66675C16.3526 6.66675 16.6918 6.80722 16.9418 7.05727C17.1919 7.30732 17.3324 7.64646 17.3324 8.00008V24.0001C17.3324 24.3537 17.1919 24.6928 16.9418 24.9429C16.6918 25.1929 16.3526 25.3334 15.999 25.3334C15.6454 25.3334 15.3063 25.1929 15.0562 24.9429C14.8062 24.6928 14.6657 24.3537 14.6657 24.0001V8.00008C14.6657 7.64646 14.8062 7.30732 15.0562 7.05727C15.3063 6.80722 15.6454 6.66675 15.999 6.66675Z" fill="#40CAA2"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M13.3327 24.0001C13.3327 23.6465 13.4732 23.3073 13.7232 23.0573C13.9733 22.8072 14.3124 22.6667 14.666 22.6667H17.3327C17.6863 22.6667 18.0254 22.8072 18.2755 23.0573C18.5255 23.3073 18.666 23.6465 18.666 24.0001C18.666 24.3537 18.5255 24.6928 18.2755 24.9429C18.0254 25.1929 17.6863 25.3334 17.3327 25.3334H14.666C14.3124 25.3334 13.9733 25.1929 13.7232 24.9429C13.4732 24.6928 13.3327 24.3537 13.3327 24.0001ZM2.66602 24.0001C2.66602 23.6465 2.80649 23.3073 3.05654 23.0573C3.30659 22.8072 3.64573 22.6667 3.99935 22.6667H6.66602C7.01964 22.6667 7.35878 22.8072 7.60882 23.0573C7.85887 23.3073 7.99935 23.6465 7.99935 24.0001C7.99935 24.3537 7.85887 24.6928 7.60882 24.9429C7.35878 25.1929 7.01964 25.3334 6.66602 25.3334H3.99935C3.64573 25.3334 3.30659 25.1929 3.05654 24.9429C2.80649 24.6928 2.66602 24.3537 2.66602 24.0001ZM3.99935 16.0001C3.99935 15.6465 4.13982 15.3073 4.38987 15.0573C4.63992 14.8072 4.97906 14.6667 5.33268 14.6667H15.9993C16.353 14.6667 16.6921 14.8072 16.9422 15.0573C17.1922 15.3073 17.3327 15.6465 17.3327 16.0001C17.3327 16.3537 17.1922 16.6928 16.9422 16.9429C16.6921 17.1929 16.353 17.3334 15.9993 17.3334H5.33268C4.97906 17.3334 4.63992 17.1929 4.38987 16.9429C4.13982 16.6928 3.99935 16.3537 3.99935 16.0001ZM2.66602 8.00008C2.66602 7.64646 2.80649 7.30732 3.05654 7.05727C3.30659 6.80722 3.64573 6.66675 3.99935 6.66675H6.66602C7.01964 6.66675 7.35878 6.80722 7.60882 7.05727C7.85887 7.30732 7.99935 7.64646 7.99935 8.00008C7.99935 8.3537 7.85887 8.69284 7.60882 8.94289C7.35878 9.19294 7.01964 9.33341 6.66602 9.33341H3.99935C3.64573 9.33341 3.30659 9.19294 3.05654 8.94289C2.80649 8.69284 2.66602 8.3537 2.66602 8.00008ZM13.3327 8.00008C13.3327 7.64646 13.4732 7.30732 13.7232 7.05727C13.9733 6.80722 14.3124 6.66675 14.666 6.66675H17.3327C17.6863 6.66675 18.0254 6.80722 18.2755 7.05727C18.5255 7.30732 18.666 7.64646 18.666 8.00008C18.666 8.3537 18.5255 8.69284 18.2755 8.94289C18.0254 9.19294 17.6863 9.33341 17.3327 9.33341H14.666C14.3124 9.33341 13.9733 9.19294 13.7232 8.94289C13.4732 8.69284 13.3327 8.3537 13.3327 8.00008Z" fill="#40CAA2"/>
        <defs>
        <linearGradient id="paint0_linear_940_1603" x1="15.4266" y1="-1.00629" x2="24.1093" y2="40.4177" gradientUnits="userSpaceOnUse">
        <stop stop-color="#7BDCB5" stop-opacity="0"/>
        <stop offset="1" stop-color="#1D92DD" stop-opacity="0.83"/>
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
registerBlockType( 'k2/multi-heading-block', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Multi Heading' ), // Block title.
	icon: {
		src: MultiHeadingIcon,
	}, // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'k2-blocks', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'Heading' ),
		__( 'Color' ),
		__( 'K2' ),
		__( 'block' ),
	],
    supports: {
        spacing: {
            margin: true,  // Enable margin UI control.
            padding: true, // Enable padding UI control.
            blockGap: true,  // Enables block spacing UI control.
        },
        anchor: true
    },
	attributes: {
        K2Headingone:{
            type: "string",
            default:"K2"
        },
        K2HeadingoneColor:{
            type: "string",
            default :"#EFC832"
        },
        K2HeadingBgColor:{
            type: "string"
        },
        K2HeadingoneSize:{
            type:"number",
            default: 44
        },
        K2HeadingoneGradient:{
            type:"string",
            default: "linear-gradient(45deg, rgb(15, 32, 39) 0%, rgb(29, 146, 221) 0%, rgb(123, 220, 181) 100%)"
        },
        K2HeadingOnePadding:{
            type:"object",
            default: {top: '0px', right: "6px", bottom: "0px", left: "0px"}
        },
        K2HeadingOneMargin:{
            type:"object",
            default:{top: '0px', right: "0px", bottom: "0px", left: "0px"}
        },
        K2HeadingOneBorder:{
            type:"object",
            default: {color: "#0FAE96", style: "solid", width: "0px"}
        },
        K2HeadingOneBorderRadius:{
            type:"object",
            default: {top: '0px', right: "0px", bottom: "0px", left: "0px"}
        },
        K2HeadingOneColoractiveTab:{
            type:'string'
        },
        K2enableHeadingtwo:{
            type:"boolean",
            default: false
        },
        K2Headingtwo:{
            type: "string",
            default:"Heading"
        },
        K2HeadingtwoBgColor:{
            type: "string"
        },
        K2HeadingtwoColor:{
            type: "string",
            default :"#162A4F"
        },
        K2HeadingtwoSize:{
            type:"number",
            default: 44
        },
        K2HeadingtwoPadding:{
            type:"object",
            default: {top: '0px', right: "6px", bottom: "0px", left: "0px"}
        },
        K2HeadingtwoMargin:{
            type:"object",
            default:{top: '0px', right: "0px", bottom: "0px", left: "0px"}
        },
        K2HeadingtwoBorder:{
            type:"object",
            default: {color: "#0FAE96", style: "solid", width: "0px"}
        },
        K2HeadingtwoBorderRadius:{
            type:"object",
            default: {top: '0px', right: "0px", bottom: "0px", left: "0px"}
        },
        K2HeadingtwoGradient:{
            type:"string",
            default: "linear-gradient(45deg, rgb(15, 32, 39) 0%, rgb(29, 146, 221) 0%, rgb(123, 220, 181) 100%)"
        },
        K2HeadingtwoColoractiveTab:{
            type:'string',
            default:'TextColor'
        },
        enableHeadingthree:{
            type: "boolean",
            default:false
        },
        K2Headingthree:{
            type: "string",
            default:"Block"
        },
        K2HeadingthreeColor:{
            type: "string",
            default :"#EFC832"
        },
        K2HeadingthreeBgColor:{
            type: "string"
        },
        K2HeadingthreeSize:{
            type:"number",
            default: 44
        },
        K2HeadingthreePadding:{
            type:"object",
            default: {top: '0px', right: "0px", bottom: "0px", left: "0px"}
        },
        K2HeadingthreeMargin:{
            type:"object",
            default:{top: '0px', right: "0px", bottom: "0px", left: "0px"}
        },
        K2HeadingthreeBorder:{
            type:"object",
            default: {color: "#0FAE96", style: "solid", width: "0px"}
        },
        K2HeadingthreeBorderRadius:{
            type:"object",
            default: {top: '0px', right: "0px", bottom: "0px", left: "0px"}
        },
        K2HeadingthreeColoractiveTab:{
            type:'string'
        },
        K2HeadingthreeGradient:{
            type:"string",
            default: "linear-gradient(45deg, rgb(15, 32, 39) 0%, rgb(29, 146, 221) 0%, rgb(123, 220, 181) 100%)"
        },
       
        startFromNewLineTwo:{
            type:"boolean",
            default: false
        },
        startFromNewLineThree:{
            type:"boolean",
            default: false
        },
        K2headingAlignment:{
            type:"string",
            default:"center"
        },
        K2headingoneFontFam:{
            type:"string"
        },
        K2headingoneFontWeight:{
            type:"string"
        },
        K2headingtwoFontFam:{
            type:"string"
        },
        K2headingtwoFontWeight:{
            type:"string"
        },
        K2headingthreeFontFam:{
            type:"string"
        },
        K2headingthreeFontWeight:{
            type:"string"
        },
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
	edit: ( {attributes,setAttributes, isSelected} ) => {
		const {K2headingoneFontWeight,K2headingtwoFontWeight,K2headingthreeFontWeight, K2headingoneFontFam,K2headingtwoFontFam, K2headingthreeFontFam, K2headingAlignment,K2Headingone, K2HeadingoneColor,K2HeadingoneSize, K2Headingtwo , K2HeadingtwoColor ,K2HeadingtwoSize, enableHeadingthree, K2Headingthree, K2HeadingthreeColor, K2HeadingthreeSize, startFromNewLineTwo, startFromNewLineThree, K2HeadingBgColor, K2HeadingOnePadding,K2HeadingtwoBgColor, K2HeadingtwoPadding, K2HeadingthreeBgColor, K2HeadingthreePadding,
        
            K2enableHeadingtwo, K2HeadingOneMargin,K2HeadingtwoMargin, K2HeadingthreeMargin, K2HeadingOneBorder, K2HeadingtwoBorder , K2HeadingthreeBorder, K2HeadingOneBorderRadius, K2HeadingtwoBorderRadius, K2HeadingthreeBorderRadius, K2HeadingoneGradient , K2HeadingOneColoractiveTab, K2HeadingtwoGradient, K2HeadingtwoColoractiveTab, K2HeadingthreeColoractiveTab, K2HeadingthreeGradient} = attributes;

        const onChangestartFromNewLineTwo = (newVal) => {
            setAttributes({startFromNewLineTwo:newVal})
        }
        const onChangestartFromNewLineThree = (newVal) => {
            setAttributes({startFromNewLineThree:newVal})
        }
        const onChangeK2Headingone = (newText) => {
            setAttributes({K2Headingone:newText})
        }

        const onChangeK2Headingtwo = (newText) => {
            setAttributes({K2Headingtwo:newText})
        }
        const onChangeenableHeadingthree = (newval) => {
            setAttributes({enableHeadingthree : newval })
        }
        
        const onChangeK2Headingthree = (newtext) => {
            setAttributes({K2Headingthree : newtext })
        }
        const onChangeK2headingoneFontFam = (newVal) => {
            setAttributes({K2headingoneFontFam:newVal})
        }
        const onChangeK2headingoneFontWeight = (NewWeight) => {
            setAttributes({K2headingoneFontWeight:NewWeight})
        }
        const onChangeK2HeadingBgColor = (newColor) => {
            setAttributes({K2HeadingBgColor:newColor})
        }
        const onChangeK2HeadingOnePadding = (newPadding) => {
            setAttributes({K2HeadingOnePadding:newPadding})
        }
        const onChangeK2HeadingOneMargin = (newMargin) =>{
            setAttributes({K2HeadingOneMargin:newMargin})
        }
        const onChangeK2HeadingOneBorder = (newBorderVal) => {
            setAttributes({K2HeadingOneBorder:newBorderVal})
        }
        const onChangeK2HeadingOneBorderRadius = (newBorderRadius) => {
            setAttributes({K2HeadingOneBorderRadius: newBorderRadius})
        }
        const onSelectK2HeadingOneColoractiveTab = ( tabName ) => {
            console.log( 'Selecting tab', tabName );
            setAttributes({ K2HeadingOneColoractiveTab: tabName });
        };
        const onChangeK2HeadingoneGradient = ( newVal) =>{
            setAttributes({K2HeadingoneGradient:newVal})
        }

        const headingoneStyle = useMemo(
            () => ({
                color: K2HeadingoneColor,
                fontSize:K2HeadingoneSize +"px",
                fontFamily: K2headingoneFontFam,
                fontWeight: K2headingoneFontWeight,
                background: K2HeadingBgColor,
                paddingTop: K2HeadingOnePadding.top,
                paddingRight: K2HeadingOnePadding.right,
                paddingBottom: K2HeadingOnePadding.bottom,
                paddingLeft: K2HeadingOnePadding.left,
                marginTop: K2HeadingOneMargin.top,
                marginRight: K2HeadingOneMargin.right,
                marginBottom: K2HeadingOneMargin.bottom,
                marginLeft: K2HeadingOneMargin.left,
                borderColor: K2HeadingOneBorder.color,
                borderStyle: K2HeadingOneBorder.style,
                borderWidth: K2HeadingOneBorder.width,
                borderTopLeftRadius: K2HeadingOneBorderRadius.top,
                borderTopRightRadius: K2HeadingOneBorderRadius.right,
                borderBottomRightRadius: K2HeadingOneBorderRadius.bottom,
                borderBottomLeftRadius: K2HeadingOneBorderRadius.left,
            }),
            [
                K2HeadingoneColor,
                K2HeadingoneSize ,
                K2headingoneFontFam,
                K2headingoneFontWeight,
                K2HeadingBgColor,
                K2HeadingOnePadding,
                K2HeadingOneMargin,
                K2HeadingOneBorder,
                K2HeadingOneBorderRadius
            ]
        );
       
      
        const headingoneGradStyle = useMemo(
            () => ({
                backgroundImage: K2HeadingoneGradient,
                fontSize:K2HeadingoneSize +"px",
                fontFamily: K2headingoneFontFam,
                fontWeight: K2headingoneFontWeight,
                paddingTop: K2HeadingOnePadding.top,
                paddingRight: K2HeadingOnePadding.right,
                paddingBottom: K2HeadingOnePadding.bottom,
                paddingLeft: K2HeadingOnePadding.left,
                marginTop: K2HeadingOneMargin.top,
                marginRight: K2HeadingOneMargin.right,
                marginBottom: K2HeadingOneMargin.bottom,
                marginLeft: K2HeadingOneMargin.left,
                borderColor: K2HeadingOneBorder.color,
                borderStyle: K2HeadingOneBorder.style,
                borderWidth: K2HeadingOneBorder.width,
                borderTopLeftRadius: K2HeadingOneBorderRadius.top,
                borderTopRightRadius: K2HeadingOneBorderRadius.right,
                borderBottomRightRadius: K2HeadingOneBorderRadius.bottom,
                borderBottomLeftRadius: K2HeadingOneBorderRadius.left,
            }),
            [
                K2HeadingoneGradient,
                K2HeadingoneSize ,
                K2headingoneFontFam,
                K2headingoneFontWeight,
                K2HeadingBgColor,
                K2HeadingOnePadding,
                K2HeadingOneMargin,
                K2HeadingOneBorder,
                K2HeadingOneBorderRadius
            ]
        );

        const headingoneBubbleStyle = useMemo(
            () => ({
                background: K2HeadingBgColor,
                fontSize:K2HeadingoneSize +"px",
                fontFamily: K2headingoneFontFam,
                fontWeight: K2headingoneFontWeight,
                paddingTop: K2HeadingOnePadding.top,
                paddingRight: K2HeadingOnePadding.right,
                paddingBottom: K2HeadingOnePadding.bottom,
                paddingLeft: K2HeadingOnePadding.left,
                marginTop: K2HeadingOneMargin.top,
                marginRight: K2HeadingOneMargin.right,
                marginBottom: K2HeadingOneMargin.bottom,
                marginLeft: K2HeadingOneMargin.left,
                borderColor: K2HeadingOneBorder.color,
                borderStyle: K2HeadingOneBorder.style,
                borderWidth: K2HeadingOneBorder.width,
                borderTopLeftRadius: K2HeadingOneBorderRadius.top,
                borderTopRightRadius: K2HeadingOneBorderRadius.right,
                borderBottomRightRadius: K2HeadingOneBorderRadius.bottom,
                borderBottomLeftRadius: K2HeadingOneBorderRadius.left,
            }),
            [
                K2HeadingBgColor,
                K2HeadingoneSize ,
                K2headingoneFontFam,
                K2headingoneFontWeight,
                K2HeadingBgColor,
                K2HeadingOnePadding,
                K2HeadingOneMargin,
                K2HeadingOneBorder,
                K2HeadingOneBorderRadius
            ]
        );
     
        const onChangeK2HeadingoneColor = (newColor) => {
            setAttributes({K2HeadingoneColor:newColor})
        }
        const onChangeK2HeadingoneSize = (newSize) => {
            setAttributes({K2HeadingoneSize:newSize})
        }

        const onChangeK2enableHeadingtwo = (NewVal) => {
            setAttributes({K2enableHeadingtwo:NewVal})
        }
        const onChangeK2HeadingtwoColor = (newColor) => {
            setAttributes({K2HeadingtwoColor:newColor})
        }
        const onChangeK2HeadingtwoSize = (newSize) => {
            setAttributes({K2HeadingtwoSize:newSize})
        }
        const headingStyle = useMemo(
            () => ({
                textAlign:K2headingAlignment
            }),
            [K2headingAlignment]
        );
      
        const onChangeK2headingtwoFontFam = (newVal) => {
            setAttributes({K2headingtwoFontFam:newVal})
        }
        const onChangeK2headingtwoFontWeight = (NewWeight) => {
            setAttributes({K2headingtwoFontWeight:NewWeight})
        }
         const onChangeK2HeadingtwoBgColor = (newColor) => {
            setAttributes({K2HeadingtwoBgColor:newColor})
        }
        const onChangeK2HeadingtwoPadding = (newPadding) => {
            setAttributes({K2HeadingtwoPadding:newPadding})
        }
        const onChangeK2HeadingtwoMargin = (newMargin) =>{
            setAttributes({K2HeadingtwoMargin:newMargin})
        }
        const onChangeK2HeadingtwoBorder = (newBorderVal) => {
            setAttributes({K2HeadingtwoBorder:newBorderVal})
        }
        const onChangeK2HeadingtwoBorderRadius = (newBorderRadius) => {
            setAttributes({K2HeadingtwoBorderRadius: newBorderRadius})
        }
        const onSelectK2HeadingtwoColoractiveTab = ( tabName ) => {
            console.log( 'Selecting tab', tabName );
            setAttributes({ K2HeadingtwoColoractiveTab: tabName });
        };
        const onChangeK2HeadingtwoGradient = ( newVal) =>{
            setAttributes({K2HeadingtwoGradient:newVal})
        }
        const headingtwoStyle = useMemo(
            () => ({
                color : K2HeadingtwoColor,
                fontSize:K2HeadingtwoSize +"px",
                fontFamily: K2headingtwoFontFam,
                fontWeight: K2headingtwoFontWeight,
                background: K2HeadingtwoBgColor,
                paddingTop: K2HeadingtwoPadding.top,
                paddingRight: K2HeadingtwoPadding.right,
                paddingBottom: K2HeadingtwoPadding.bottom,
                paddingLeft: K2HeadingtwoPadding.left,
                marginTop: K2HeadingtwoMargin.top,
                marginRight: K2HeadingtwoMargin.right,
                marginBottom: K2HeadingtwoMargin.bottom,
                marginLeft: K2HeadingtwoMargin.left,
                borderColor: K2HeadingtwoBorder.color,
                borderStyle: K2HeadingtwoBorder.style,
                borderWidth: K2HeadingtwoBorder.width,
                borderTopLeftRadius: K2HeadingtwoBorderRadius.top,
                borderTopRightRadius: K2HeadingtwoBorderRadius.right,
                borderBottomRightRadius: K2HeadingtwoBorderRadius.bottom,
                borderBottomLeftRadius: K2HeadingtwoBorderRadius.left,
            }),
            [
                K2HeadingtwoColor,
                K2HeadingtwoBgColor,
                K2HeadingtwoSize ,
                K2headingtwoFontFam,
                K2headingtwoFontWeight,
                K2HeadingtwoPadding,
                K2HeadingtwoMargin,
                K2HeadingtwoBorder,
                K2HeadingtwoBorderRadius
            ]
        );
       
        const headingtwoGradStyle = useMemo(
            () => ({
                backgroundImage: K2HeadingtwoGradient,
                fontSize:K2HeadingtwoSize +"px",
                fontFamily: K2headingtwoFontFam,
                fontWeight: K2headingtwoFontWeight,
                paddingTop: K2HeadingtwoPadding.top,
                paddingRight: K2HeadingtwoPadding.right,
                paddingBottom: K2HeadingtwoPadding.bottom,
                paddingLeft: K2HeadingtwoPadding.left,
                marginTop: K2HeadingtwoMargin.top,
                marginRight: K2HeadingtwoMargin.right,
                marginBottom: K2HeadingtwoMargin.bottom,
                marginLeft: K2HeadingtwoMargin.left,
                borderColor: K2HeadingtwoBorder.color,
                borderStyle: K2HeadingtwoBorder.style,
                borderWidth: K2HeadingtwoBorder.width,
                borderTopLeftRadius: K2HeadingtwoBorderRadius.top,
                borderTopRightRadius: K2HeadingtwoBorderRadius.right,
                borderBottomRightRadius: K2HeadingtwoBorderRadius.bottom,
                borderBottomLeftRadius: K2HeadingtwoBorderRadius.left,
            }),
            [
                K2HeadingtwoGradient,
                K2HeadingtwoBgColor,
                K2HeadingtwoSize ,
                K2headingtwoFontFam,
                K2headingtwoFontWeight,
                K2HeadingtwoPadding,
                K2HeadingtwoMargin,
                K2HeadingtwoBorder,
                K2HeadingtwoBorderRadius
            ]
        );
     
        const headingtwoBubbleStyle = useMemo(
            () => ({
                background: K2HeadingtwoBgColor,
                fontSize:K2HeadingtwoSize +"px",
                fontFamily: K2headingtwoFontFam,
                fontWeight: K2headingtwoFontWeight,
                paddingTop: K2HeadingtwoPadding.top,
                paddingRight: K2HeadingtwoPadding.right,
                paddingBottom: K2HeadingtwoPadding.bottom,
                paddingLeft: K2HeadingtwoPadding.left,
                marginTop: K2HeadingtwoMargin.top,
                marginRight: K2HeadingtwoMargin.right,
                marginBottom: K2HeadingtwoMargin.bottom,
                marginLeft: K2HeadingtwoMargin.left,
                borderColor: K2HeadingtwoBorder.color,
                borderStyle: K2HeadingtwoBorder.style,
                borderWidth: K2HeadingtwoBorder.width,
                borderTopLeftRadius: K2HeadingtwoBorderRadius.top,
                borderTopRightRadius: K2HeadingtwoBorderRadius.right,
                borderBottomRightRadius: K2HeadingtwoBorderRadius.bottom,
                borderBottomLeftRadius: K2HeadingtwoBorderRadius.left,
            }),
            [
                K2HeadingtwoBgColor,
                K2HeadingtwoSize ,
                K2headingtwoFontFam,
                K2headingtwoFontWeight,
                K2HeadingtwoPadding,
                K2HeadingtwoMargin,
                K2HeadingtwoBorder,
                K2HeadingtwoBorderRadius
            ]
        );
       
        const onChangeK2HeadingthreeColor = (newColor) => {
            setAttributes({K2HeadingthreeColor:newColor})
        }
        const onChangeK2HeadingthreeSize = (newSize) => {
            setAttributes({K2HeadingthreeSize:newSize})
        }
        const onChangeK2headingthreeFontFam = (newVal) => {
            setAttributes({K2headingthreeFontFam:newVal})
        }
        const onChangeK2headingthreeFontWeight = (NewWeight) => {
            setAttributes({K2headingthreeFontWeight:NewWeight})
        }
        const onChangeK2HeadingthreeBgColor= (newColor) => {
            setAttributes({K2HeadingthreeBgColor:newColor})
        }
        const onChangeK2HeadingthreePadding= (newPadding) => {
            setAttributes({K2HeadingthreePadding:newPadding})
        }
        const onChangeK2HeadingthreeMargin = (newMargin) =>{
            setAttributes({K2HeadingthreeMargin:newMargin})
        }
        const onChangeK2HeadingthreeBorder = (newBorderVal) => {
            setAttributes({K2HeadingthreeBorder:newBorderVal})
        }
        const onChangeK2HeadingthreeBorderRadius = (newBorderRadius) => {
            setAttributes({K2HeadingthreeBorderRadius: newBorderRadius})
        }
        const onSelectK2HeadingthreeColoractiveTab = ( tabName ) => {
            console.log( 'Selecting tab', tabName );
            setAttributes({ K2HeadingthreeColoractiveTab: tabName });
        };
        const onChangeK2HeadingthreeGradient = ( newVal) =>{
            setAttributes({K2HeadingthreeGradient:newVal})
        }
        const headingthreeStyle = useMemo(
            () => ({
                color : K2HeadingthreeColor,
                fontSize:K2HeadingthreeSize +"px",
                fontFamily:K2headingthreeFontFam,
                fontWeight: K2headingthreeFontWeight,
                background: K2HeadingthreeBgColor,
                paddingTop: K2HeadingthreePadding.top,
                paddingRight: K2HeadingthreePadding.right,
                paddingBottom: K2HeadingthreePadding.bottom,
                paddingLeft: K2HeadingthreePadding.left,
                marginTop: K2HeadingthreeMargin.top,
                marginRight: K2HeadingthreeMargin.right,
                marginBottom: K2HeadingthreeMargin.bottom,
                marginLeft: K2HeadingthreeMargin.left,
                borderColor: K2HeadingthreeBorder.color,
                borderStyle: K2HeadingthreeBorder.style,
                borderWidth: K2HeadingthreeBorder.width,
                borderTopLeftRadius: K2HeadingthreeBorderRadius.top,
                borderTopRightRadius: K2HeadingthreeBorderRadius.right,
                borderBottomRightRadius: K2HeadingthreeBorderRadius.bottom,
                borderBottomLeftRadius: K2HeadingthreeBorderRadius.left,
            }),
            [
                K2HeadingthreeColor,
                K2HeadingthreeSize,
                K2HeadingthreeBgColor,
                K2headingthreeFontFam ,
                K2headingthreeFontWeight,
                K2HeadingthreePadding,
                K2HeadingthreeMargin,
                K2HeadingthreeBorder,
                K2HeadingthreeBorderRadius
            ]
        );
       
        const headingthreeGradStyle = useMemo(
            () => ({
                backgroundImage: K2HeadingthreeGradient,
                fontSize:K2HeadingthreeSize +"px",
                fontFamily:K2headingthreeFontFam,
                fontWeight: K2headingthreeFontWeight,
                paddingTop: K2HeadingthreePadding.top,
                paddingRight: K2HeadingthreePadding.right,
                paddingBottom: K2HeadingthreePadding.bottom,
                paddingLeft: K2HeadingthreePadding.left,
                marginTop: K2HeadingthreeMargin.top,
                marginRight: K2HeadingthreeMargin.right,
                marginBottom: K2HeadingthreeMargin.bottom,
                marginLeft: K2HeadingthreeMargin.left,
                borderColor: K2HeadingthreeBorder.color,
                borderStyle: K2HeadingthreeBorder.style,
                borderWidth: K2HeadingthreeBorder.width,
                borderTopLeftRadius: K2HeadingthreeBorderRadius.top,
                borderTopRightRadius: K2HeadingthreeBorderRadius.right,
                borderBottomRightRadius: K2HeadingthreeBorderRadius.bottom,
                borderBottomLeftRadius: K2HeadingthreeBorderRadius.left,
            }),
            [
                K2HeadingthreeGradient,
                K2HeadingthreeSize,
                K2headingthreeFontFam ,
                K2headingthreeFontWeight,
                K2HeadingthreePadding,
                K2HeadingthreeMargin,
                K2HeadingthreeBorder,
                K2HeadingthreeBorderRadius
            ]
        );
       
        const headingthreeBubbleStyle = useMemo(
            () => ({
                background: K2HeadingthreeBgColor,
                fontSize:K2HeadingthreeSize +"px",
                fontFamily:K2headingthreeFontFam,
                fontWeight: K2headingthreeFontWeight,
                paddingTop: K2HeadingthreePadding.top,
                paddingRight: K2HeadingthreePadding.right,
                paddingBottom: K2HeadingthreePadding.bottom,
                paddingLeft: K2HeadingthreePadding.left,
                marginTop: K2HeadingthreeMargin.top,
                marginRight: K2HeadingthreeMargin.right,
                marginBottom: K2HeadingthreeMargin.bottom,
                marginLeft: K2HeadingthreeMargin.left,
                borderColor: K2HeadingthreeBorder.color,
                borderStyle: K2HeadingthreeBorder.style,
                borderWidth: K2HeadingthreeBorder.width,
                borderTopLeftRadius: K2HeadingthreeBorderRadius.top,
                borderTopRightRadius: K2HeadingthreeBorderRadius.right,
                borderBottomRightRadius: K2HeadingthreeBorderRadius.bottom,
                borderBottomLeftRadius: K2HeadingthreeBorderRadius.left,
            }),
            [
                K2HeadingthreeBgColor,
                K2HeadingthreeSize,
                K2headingthreeFontFam ,
                K2headingthreeFontWeight,
                K2HeadingthreePadding,
                K2HeadingthreeMargin,
                K2HeadingthreeBorder,
                K2HeadingthreeBorderRadius
            ]
        );
     
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
		return (
			<div {...useBlockProps()}>
                <h1 className='K2-heading-container' style={headingStyle} >
                   <RichText
                            tagName='span'
                            value={K2Headingone}
                            onChange={onChangeK2Headingone}
                            className={`${K2HeadingOneColoractiveTab === 'TextGradient' && 'Text-gradient-class'} ${K2HeadingOneColoractiveTab === 'BubbleWrite' && 'bubble-text'}`}
                            style={{
                                ...(K2HeadingOneColoractiveTab === 'TextColor' && headingoneStyle),
                                ...(K2HeadingOneColoractiveTab === 'TextGradient' && headingoneGradStyle),
                                ...(K2HeadingOneColoractiveTab === 'BubbleWrite' && headingoneBubbleStyle)
                                }}
                            formattingControls={['bold', 'italic', 'strikethrough', 'link', 'unlink']}

                        />
                        {
                            startFromNewLineTwo ==true ?
                            <br/>
                            :null
                        }
                        {
                            K2enableHeadingtwo == true ?
                            <RichText
                                    tagName='span'
                                    value={K2Headingtwo}
                                    onChange={onChangeK2Headingtwo}
                                    className={`${K2HeadingtwoColoractiveTab === 'TextGradient' && 'Text-gradient-class'} ${K2HeadingtwoColoractiveTab === 'BubbleWrite' && 'bubble-text'}`}
                                    style={{
                                        ...(K2HeadingtwoColoractiveTab === 'TextColor' && headingtwoStyle),
                                        ...(K2HeadingtwoColoractiveTab === 'TextGradient' && headingtwoGradStyle),
                                        ...(K2HeadingtwoColoractiveTab === 'BubbleWrite' && headingtwoBubbleStyle)
                                        }}
                                    formattingControls={['bold', 'italic', 'strikethrough', 'link', 'unlink']}

                                />
                                :null
                    }

                    {
                            startFromNewLineThree ==true ?
                            <br/>
                            :null
                        }
                    {
                        enableHeadingthree == true ? 
                        <RichText
                            tagName='span'
                            value={K2Headingthree}
                            onChange={onChangeK2Headingthree}
                            className={`${K2HeadingthreeColoractiveTab === 'TextGradient' && 'Text-gradient-class'} ${K2HeadingthreeColoractiveTab === 'BubbleWrite' && 'bubble-text'}`}
                            style={{
                                ...(K2HeadingthreeColoractiveTab === 'TextColor' && headingthreeStyle),
                                ...(K2HeadingthreeColoractiveTab === 'TextGradient' && headingthreeGradStyle),
                                ...(K2HeadingthreeColoractiveTab === 'BubbleWrite' && headingthreeBubbleStyle)
                                }}
                            formattingControls={['bold', 'italic', 'strikethrough', 'link', 'unlink']}

                        />
                        :null
                    }
                </h1>
                <InspectorControls>
                    <PanelBody title={__("Heading Texts")} initialOpen={false} >
                        <Card>
                            <CardBody>
                                <PanelRow>
                                        <div style={{paddingBottom: '2%'}}>
                                            <label><strong>Heading Alignment</strong></label>
                                        </div>
                                        <div id = {'AlignmentIconsParent'} className={'k2-ib-inspector-control-alignment'} onClick={onChangeAlignmentIconChange}>
                                            <div className={'k2-ib-inspector-control-alignment-single'}  onClick={() => {setAttributes({K2headingAlignment:'left'})}}>
                                                <span className="fa fa-align-left k2-ib-alignment-icon-style" ></span>
                                            </div>
                                            <div className={'k2-ib-inspector-control-alignment-single'} onClick={() =>  {setAttributes({K2headingAlignment:'center'})}}>
                                                <span className="fa fa-align-center k2-ib-alignment-icon-style k2-ib-active"></span>
                                            </div>
                                            <div className={'k2-ib-inspector-control-alignment-single'} onClick={() =>  {setAttributes({K2headingAlignment:'right'})}}>
                                                <span className="fa fa-align-right k2-ib-alignment-icon-style"></span>
                                            </div>
                                        </div>
                                </PanelRow>
                            </CardBody>
                        </Card>
                        <Card>
                            <CardHeader>
                                Enter your First Text here
                            </CardHeader>
                            <CardBody>
                                <TextControl 
                                    value={K2Headingone}
                                    onChange = {onChangeK2Headingone}

                                />
                                <Flex>
                                    <BoxControl
                                        label="Padding"
                                        value={K2HeadingOnePadding}
                                        onChange={onChangeK2HeadingOnePadding}
                                    />
                                </Flex>
                                <Flex>
                                    <BoxControl
                                        label="Margin"
                                        value={K2HeadingOneMargin}
                                        onChange={onChangeK2HeadingOneMargin}
                                    />
                                </Flex>
                                <Flex>
                                    <BorderBoxControl 
                                            label="Borders"
                                            onChange={onChangeK2HeadingOneBorder}
                                            value={K2HeadingOneBorder}
                                            colors = {colorOptions}
                                            
                                        />
                                </Flex>
                                <Flex>
                                    <BoxControl 
                                            label="border radius"
                                            value={K2HeadingOneBorderRadius}
                                            onChange={onChangeK2HeadingOneBorderRadius}
                                        />
                                </Flex>
                            </CardBody>
                        </Card>
                        <Card>
                            <Flex>
                                <FlexItem>
                                    <CardHeader>
                                        Enable Second Heading
                                    </CardHeader>
                                </FlexItem>
                                <FlexItem>
                                    <ToggleControl 
                                        checked ={K2enableHeadingtwo}
                                        onChange={onChangeK2enableHeadingtwo}

                                    />
                                </FlexItem>
                            </Flex>
                            {
                                K2enableHeadingtwo == true ?
                                <Fragment>
                                    <CardHeader>
                                        Enter your Second Text Here
                                    </CardHeader>
                                    <CardBody>
                                        <TextControl 
                                            value={K2Headingtwo}
                                            onChange = {onChangeK2Headingtwo}

                                        />
                                        <Flex>
                                            <BoxControl
                                                label="Padding"
                                                value={K2HeadingtwoPadding}
                                                onChange={onChangeK2HeadingtwoPadding}
                                            />
                                        </Flex>
                                        <Flex>
                                            <BoxControl
                                                label="Margin"
                                                value={K2HeadingtwoMargin}
                                                onChange={onChangeK2HeadingtwoMargin}
                                            />
                                        </Flex>
                                        <Flex>
                                            <BorderBoxControl 
                                                    label="Borders"
                                                    onChange={onChangeK2HeadingtwoBorder}
                                                    value={K2HeadingtwoBorder}
                                                    colors = {colorOptions}
                                                    
                                                />
                                        </Flex>
                                        <Flex>
                                            <BoxControl 
                                                    label="border radius"
                                                    value={K2HeadingtwoBorderRadius}
                                                    onChange={onChangeK2HeadingtwoBorderRadius}
                                                />
                                        </Flex>
                                        <Flex>
                                            <FlexItem>
                                            <h5 style={{margin:"0"}}>Start the text on New Line ?</h5>
                                            </FlexItem>
                                            <FlexItem>
                                                <CheckboxControl
                                                    checked={startFromNewLineTwo}
                                                    onChange={onChangestartFromNewLineTwo}
                                                />
                                            </FlexItem>
                                        </Flex>

                                    </CardBody>
                                </Fragment>
                                :null
                            }
                        </Card>
                        <Card>
                            <Flex>
                                <FlexItem>
                                    <CardHeader>
                                        Enable third Heading
                                    </CardHeader>
                                </FlexItem>
                                <FlexItem>
                                    <ToggleControl 
                                        checked ={enableHeadingthree}
                                        onChange={onChangeenableHeadingthree}

                                    />
                                </FlexItem>
                            </Flex>
                            {
                                enableHeadingthree == true ? 
                                <Fragment>
                                    <CardHeader>Enter your Third Text Here</CardHeader>
                                    <CardBody>
                                        <TextControl 
                                            value={K2Headingthree}
                                            onChange = {onChangeK2Headingthree}

                                        />
                                        <Flex>
                                            <FlexItem>
                                            <h5 style={{margin:"0"}}>Start the text on New Line ?</h5>
                                            </FlexItem>
                                            <FlexItem>
                                                <CheckboxControl
                                                    checked={startFromNewLineThree}
                                                    onChange={onChangestartFromNewLineThree}
                                                />
                                            </FlexItem>
                                        </Flex>
                                        <Flex>
                                            <BoxControl
                                                label="Padding"
                                                value={K2HeadingthreePadding}
                                                onChange={onChangeK2HeadingthreePadding}
                                            />
                                        </Flex>
                                        <Flex>
                                            <BoxControl
                                                label="Margin"
                                                value={K2HeadingthreeMargin}
                                                onChange={onChangeK2HeadingthreeMargin}
                                            />
                                        </Flex>
                                        <Flex>
                                            <BorderBoxControl 
                                                    label="Borders"
                                                    onChange={onChangeK2HeadingthreeBorder}
                                                    value={K2HeadingthreeBorder}
                                                    colors = {colorOptions}
                                                    
                                                />
                                        </Flex>
                                        <Flex>
                                            <BoxControl 
                                                    label="border radius"
                                                    value={K2HeadingthreeBorderRadius}
                                                    onChange={onChangeK2HeadingthreeBorderRadius}
                                                />
                                        </Flex>
                                    </CardBody>
                                </Fragment>
                                :null
                            }
                            
                        </Card>
                    </PanelBody>
                    <PanelBody title={__("Heading Size")} initialOpen={false}>
                            <Card>
                                <CardHeader>Heading One Size</CardHeader>
                                <CardBody>
                                    <RangeControl 
                                        value={K2HeadingoneSize}
                                        onChange = {onChangeK2HeadingoneSize}

                                    />
                                <Flex>
                                    <FlexItem>
                                        <SelectControl
                                            label="Font Family"
                                            value={K2headingoneFontFam}
                                            options={ GLOBAL_FONTS }
                                            onChange={onChangeK2headingoneFontFam}

                                        />
                                    </FlexItem>
                                    <FlexItem>
                                        <SelectControl
                                            label="Font Weight"
                                            value={K2headingoneFontWeight}
                                            options={ GLOBAL_FONTS_WEIGHTS }
                                            onChange={onChangeK2headingoneFontWeight}

                                        />
                                    </FlexItem>
                                </Flex>
                                </CardBody>
                            </Card>
                            {
                                K2enableHeadingtwo == true ?
                            <Card>
                                <CardHeader>Heading two Size</CardHeader>
                                <CardBody>
                                    <RangeControl 
                                        value={K2HeadingtwoSize}
                                        onChange = {onChangeK2HeadingtwoSize}

                                    />
                                    <Flex>
                                        <FlexItem>
                                            <SelectControl
                                                label="Font Family"
                                                value={K2headingtwoFontFam}
                                                options={ GLOBAL_FONTS }
                                                onChange={onChangeK2headingtwoFontFam}

                                            />
                                        </FlexItem>
                                        <FlexItem>
                                            <SelectControl
                                                label="Font Weight"
                                                value={K2headingtwoFontWeight}
                                                options={ GLOBAL_FONTS_WEIGHTS }
                                                onChange={onChangeK2headingtwoFontWeight}

                                            />
                                        </FlexItem>
                                    </Flex>
                                </CardBody>
                            </Card>
                            :null 
                            }
                            {
                                enableHeadingthree == true ? 
                                <Card>
                                    <CardHeader>Heading three Size</CardHeader>
                                    <CardBody>
                                        <RangeControl 
                                            value={K2HeadingthreeSize}
                                            onChange = {onChangeK2HeadingthreeSize}

                                        />
                                         <Flex>
                                            <FlexItem>
                                                <SelectControl
                                                    label="Font Family"
                                                    value={K2headingthreeFontFam}
                                                    options={ GLOBAL_FONTS }
                                                    onChange={onChangeK2headingthreeFontFam}

                                                />
                                            </FlexItem>
                                            <FlexItem>
                                                <SelectControl
                                                    label="Font Weight"
                                                    value={K2headingthreeFontWeight}
                                                    options={ GLOBAL_FONTS_WEIGHTS }
                                                    onChange={onChangeK2headingthreeFontWeight}

                                                />
                                            </FlexItem>
                                        </Flex>
                                    </CardBody>
                                </Card>
                                :null
                            }
                            
                    </PanelBody>
                    <PanelBody title={__("Heading Color")} initialOpen={true}>
                        <Card>
                            <CardHeader>
                                Heading One Color
                            </CardHeader>
                            <TabPanel
                                    className="premium-imamge-Background-Setting-tab-panel"
                                    activeClass="active-tab"
                                    onSelect={onSelectK2HeadingOneColoractiveTab}
                                    initialTabName={K2HeadingOneColoractiveTab}
                                    tabs={ [
                                        {
                                            name: 'TextColor',
                                            title: 'Color',
                                            className: 'tab-one',
                                        },
                                        {
                                            name: 'TextGradient',
                                            title: 'Gradient',
                                            className: 'tab-two',
                                        },
                                        {
                                            name: 'BubbleWrite',
                                            title: 'Bubble',
                                            className: 'tab-three',
                                        },
                                    ] }                 
                                
                                >
                                {(tabName) => 
                                        <Card style={{padding:"12px"}}>
                                        
                                                { tabName.name == 'TextColor' && (
                                                    <CardBody>
                                                        <ColorPopup 
                                                            label={"Text color"}
                                                            value={{ value:K2HeadingoneColor}}
                                                            onChange = {onChangeK2HeadingoneColor}
                                                            PropertyName={"backgroundColor"}
                                                        />
                                                            <ColorPopup 
                                                                label={"Background color"}
                                                                value={{ value:K2HeadingBgColor}}
                                                                onChange = {onChangeK2HeadingBgColor}
                                                                PropertyName={"backgroundColor"}
                                                        />
                                                    </CardBody>
                                                )}
                                                { tabName.name === 'TextGradient' &&( 
                                                    <Fragment>
                                                        <GradientPicker 
                                                            value = {K2HeadingoneGradient}
                                                            onChange={onChangeK2HeadingoneGradient}
                                                            gradients={ [
                                                                {
                                                                    name: 'JShine',
                                                                    gradient:
                                                                        'linear-gradient(135deg,#12c2e9 0%,#c471ed 50%,#f64f59 100%)',
                                                                    slug: 'jshine',
                                                                },
                                                                {
                                                                    name: 'Moonlit Asteroid',
                                                                    gradient:
                                                                        'linear-gradient(135deg,#0F2027 0%, #203A43 0%, #2c5364 100%)',
                                                                    slug: 'moonlit-asteroid',
                                                                },
                                                                {
                                                                    name: 'Rastafarie',
                                                                    gradient:
                                                                        'linear-gradient(135deg,#1E9600 0%, #FFF200 0%, #FF0000 100%)',
                                                                    slug: 'rastafari',
                                                                },
                                                                {
                                                                    name: 'K2-Gradient',
                                                                    gradient:
                                                                        'linear-gradient(45deg, rgb(15, 32, 39) 0%, rgb(29, 146, 221) 0%, rgb(123, 220, 181) 100%)',
                                                                    slug: 'k2gradient',
                                                                },
                                                            ] }
                                                        />
                                                    </Fragment>
                                                )}
                                                { tabName.name === 'BubbleWrite' &&( 
                                                    <Fragment>
                                                            <ColorPopup 
                                                                label={"Background color"}
                                                                value={{ value:K2HeadingBgColor}}
                                                                onChange = {onChangeK2HeadingBgColor}
                                                                PropertyName={"backgroundColor"}
                                                        />
                                                    </Fragment>
                                                )}
                                        
                                        </Card>
                                    }
                            </TabPanel>
                        </Card>
                        {
                            K2enableHeadingtwo == true ?
                                <Card>
                                    <CardHeader>
                                        Heading two Color
                                    </CardHeader>
                                    <TabPanel
                                            className="premium-imamge-Background-Setting-tab-panel"
                                            activeClass="active-tab"
                                            onSelect={onSelectK2HeadingtwoColoractiveTab}
                                            initialTabName={K2HeadingtwoColoractiveTab}
                                            tabs={ [
                                                {
                                                    name: 'TextColor',
                                                    title: 'Color',
                                                    className: 'tab-one',
                                                },
                                                {
                                                    name: 'TextGradient',
                                                    title: 'Gradient',
                                                    className: 'tab-two',
                                                },
                                                {
                                                    name: 'BubbleWrite',
                                                    title: 'Bubble',
                                                    className: 'tab-three',
                                                },
                                            ] }                 
                                        
                                        >
                                        {(tabName) => 
                                                <Card style={{padding:"12px"}}>
                                                
                                                        { tabName.name == 'TextColor' && ( 
                                                            <CardBody>
                                                                <ColorPopup
                                                                    label={"Text color"}
                                                                    value={{ value:K2HeadingtwoColor}}
                                                                    onChange = {onChangeK2HeadingtwoColor}
                                                                    PropertyName={"backgroundColor"}
                                                                />
                                                                <ColorPopup
                                                                    label={"Text color"}
                                                                    value={{ value:K2HeadingtwoBgColor}}
                                                                    onChange = {onChangeK2HeadingtwoBgColor}
                                                                    PropertyName={"backgroundColor"}
                                                                />

                                                            </CardBody>
                                                        )}
                                                        { tabName.name === 'TextGradient' && (
                                                            <Fragment>
                                                                <GradientPicker 
                                                                    value = {K2HeadingtwoGradient}
                                                                    onChange={onChangeK2HeadingtwoGradient}
                                                                    gradients={ [
                                                                        {
                                                                            name: 'JShine',
                                                                            gradient:
                                                                                'linear-gradient(135deg,#12c2e9 0%,#c471ed 50%,#f64f59 100%)',
                                                                            slug: 'jshine',
                                                                        },
                                                                        {
                                                                            name: 'Moonlit Asteroid',
                                                                            gradient:
                                                                                'linear-gradient(135deg,#0F2027 0%, #203A43 0%, #2c5364 100%)',
                                                                            slug: 'moonlit-asteroid',
                                                                        },
                                                                        {
                                                                            name: 'Rastafarie',
                                                                            gradient:
                                                                                'linear-gradient(135deg,#1E9600 0%, #FFF200 0%, #FF0000 100%)',
                                                                            slug: 'rastafari',
                                                                        },
                                                                        {
                                                                            name: 'K2-Gradient',
                                                                            gradient:
                                                                                'linear-gradient(45deg, rgb(15, 32, 39) 0%, rgb(29, 146, 221) 0%, rgb(123, 220, 181) 100%)',
                                                                            slug: 'k2gradient',
                                                                        },
                                                                    ] }
                                                                />
                                                            </Fragment>
                                                        )}
                                                        { tabName.name === 'BubbleWrite' &&( 
                                                            <ColorPopup
                                                                label={"Background color"}
                                                                value={{ value:K2HeadingtwoBgColor}}
                                                                onChange = {onChangeK2HeadingtwoBgColor}
                                                                PropertyName={"backgroundColor"}
                                                            />
                                                            
                                                        )}

                                                
                                                </Card>
                                            }
                                    </TabPanel>
                                </Card>
                                :null
                        }
                        {
                            enableHeadingthree == true ? 
                            <Card>
                                <CardHeader>
                                    Heading three Color
                                </CardHeader>
                                <TabPanel
                                        className="premium-imamge-Background-Setting-tab-panel"
                                        activeClass="active-tab"
                                        onSelect={onSelectK2HeadingthreeColoractiveTab}
                                        initialTabName={K2HeadingthreeColoractiveTab}
                                        tabs={ [
                                            {
                                                name: 'TextColor',
                                                title: 'Color',
                                                className: 'tab-one',
                                            },
                                            {
                                                name: 'TextGradient',
                                                title: 'Gradient',
                                                className: 'tab-two',
                                            },
                                            {
                                                name: 'BubbleWrite',
                                                title: 'Bubble',
                                                className: 'tab-three',
                                            },
                                        ] }                 
                                    
                                    >
                                    {(tabName) => 
                                            <Card style={{padding:"12px"}}>
                                            
                                                { tabName.name == 'TextColor' && ( 
                                                        <CardBody>
                                                            <ColorPopup
                                                                label={"Tesxt color"}
                                                                value={{ value:K2HeadingthreeColor}}
                                                                onChange = {onChangeK2HeadingthreeColor}
                                                                PropertyName={"backgroundColor"}
                                                            />
                                                            <ColorPopup
                                                                label={"Background color"}
                                                                value={{ value:K2HeadingthreeBgColor}}
                                                                onChange = {onChangeK2HeadingthreeBgColor}
                                                                PropertyName={"backgroundColor"}
                                                            />
                                                        </CardBody>
                                                )}
                                                { tabName.name === 'TextGradient' && (
                                                        <Fragment>
                                                        <GradientPicker 
                                                                value = {K2HeadingthreeGradient}
                                                                onChange={onChangeK2HeadingthreeGradient}
                                                                gradients={ [
                                                                    {
                                                                        name: 'JShine',
                                                                        gradient:
                                                                            'linear-gradient(135deg,#12c2e9 0%,#c471ed 50%,#f64f59 100%)',
                                                                        slug: 'jshine',
                                                                    },
                                                                    {
                                                                        name: 'Moonlit Asteroid',
                                                                        gradient:
                                                                            'linear-gradient(135deg,#0F2027 0%, #203A43 0%, #2c5364 100%)',
                                                                        slug: 'moonlit-asteroid',
                                                                    },
                                                                    {
                                                                        name: 'Rastafarie',
                                                                        gradient:
                                                                            'linear-gradient(135deg,#1E9600 0%, #FFF200 0%, #FF0000 100%)',
                                                                        slug: 'rastafari',
                                                                    },
                                                                    {
                                                                        name: 'K2-Gradient',
                                                                        gradient:
                                                                            'linear-gradient(45deg, rgb(15, 32, 39) 0%, rgb(29, 146, 221) 0%, rgb(123, 220, 181) 100%)',
                                                                        slug: 'k2gradient',
                                                                    },
                                                                ] }
                                                            />
                                                        </Fragment>
                                                    )}
                                                    { tabName.name === 'BubbleWrite' &&( 
                                                        <ColorPopup
                                                                label={"Background color"}
                                                                value={{ value:K2HeadingthreeBgColor}}
                                                                onChange = {onChangeK2HeadingthreeBgColor}
                                                                PropertyName={"backgroundColor"}
                                                            />
                                                        
                                                    )}
                                            
                                            </Card>
                                        }
                                </TabPanel>
                            </Card>
                            :null
                        }
                        
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
        const {K2headingoneFontWeight,K2headingtwoFontWeight,K2headingthreeFontWeight, K2headingoneFontFam,K2headingtwoFontFam, K2headingthreeFontFam, K2headingAlignment,K2Headingone, K2HeadingoneColor,K2HeadingoneSize, K2Headingtwo , K2HeadingtwoColor ,K2HeadingtwoSize, enableHeadingthree, K2Headingthree, K2HeadingthreeColor, K2HeadingthreeSize, startFromNewLineTwo, startFromNewLineThree, K2HeadingBgColor, K2HeadingOnePadding,K2HeadingtwoBgColor, K2HeadingtwoPadding, K2HeadingthreeBgColor, K2HeadingthreePadding,
        
            K2enableHeadingtwo , K2HeadingOneMargin,K2HeadingtwoMargin, K2HeadingthreeMargin, K2HeadingOneBorder, K2HeadingtwoBorder , K2HeadingthreeBorder, K2HeadingOneBorderRadius, K2HeadingtwoBorderRadius, K2HeadingthreeBorderRadius, K2HeadingoneGradient , K2HeadingOneColoractiveTab, K2HeadingtwoGradient, K2HeadingtwoColoractiveTab, K2HeadingthreeColoractiveTab, K2HeadingthreeGradient} = attributes;

        const headingoneStyle = {
            color: K2HeadingoneColor,
            fontSize:K2HeadingoneSize +"px",
            fontFamily: K2headingoneFontFam,
            fontWeight: K2headingoneFontWeight,
            background: K2HeadingBgColor,
            paddingTop: K2HeadingOnePadding.top,
            paddingRight: K2HeadingOnePadding.right,
            paddingBottom: K2HeadingOnePadding.bottom,
            paddingLeft: K2HeadingOnePadding.left,
            marginTop: K2HeadingOneMargin.top,
            marginRight: K2HeadingOneMargin.right,
            marginBottom: K2HeadingOneMargin.bottom,
            marginLeft: K2HeadingOneMargin.left,
            borderColor: K2HeadingOneBorder.color,
            borderStyle: K2HeadingOneBorder.style,
            borderWidth: K2HeadingOneBorder.width,
            borderTopLeftRadius: K2HeadingOneBorderRadius.top,
            borderTopRightRadius: K2HeadingOneBorderRadius.right,
            borderBottomRightRadius: K2HeadingOneBorderRadius.bottom,
            borderBottomLeftRadius: K2HeadingOneBorderRadius.left,
        }
        const headingoneGradStyle = {
            backgroundImage: K2HeadingoneGradient,
            fontSize:K2HeadingoneSize +"px",
            fontFamily: K2headingoneFontFam,
            fontWeight: K2headingoneFontWeight,
            paddingTop: K2HeadingOnePadding.top,
			paddingRight: K2HeadingOnePadding.right,
			paddingBottom: K2HeadingOnePadding.bottom,
			paddingLeft: K2HeadingOnePadding.left,
            marginTop: K2HeadingOneMargin.top,
			marginRight: K2HeadingOneMargin.right,
			marginBottom: K2HeadingOneMargin.bottom,
			marginLeft: K2HeadingOneMargin.left,
            borderColor: K2HeadingOneBorder.color,
            borderStyle: K2HeadingOneBorder.style,
            borderWidth: K2HeadingOneBorder.width,
            borderTopLeftRadius: K2HeadingOneBorderRadius.top,
            borderTopRightRadius: K2HeadingOneBorderRadius.right,
            borderBottomRightRadius: K2HeadingOneBorderRadius.bottom,
            borderBottomLeftRadius: K2HeadingOneBorderRadius.left,
        }
        const headingoneBubbleStyle = {
            background: K2HeadingBgColor,
            fontSize:K2HeadingoneSize +"px",
            fontFamily: K2headingoneFontFam,
            fontWeight: K2headingoneFontWeight,
            paddingTop: K2HeadingOnePadding.top,
			paddingRight: K2HeadingOnePadding.right,
			paddingBottom: K2HeadingOnePadding.bottom,
			paddingLeft: K2HeadingOnePadding.left,
            marginTop: K2HeadingOneMargin.top,
			marginRight: K2HeadingOneMargin.right,
			marginBottom: K2HeadingOneMargin.bottom,
			marginLeft: K2HeadingOneMargin.left,
            borderColor: K2HeadingOneBorder.color,
            borderStyle: K2HeadingOneBorder.style,
            borderWidth: K2HeadingOneBorder.width,
            borderTopLeftRadius: K2HeadingOneBorderRadius.top,
            borderTopRightRadius: K2HeadingOneBorderRadius.right,
            borderBottomRightRadius: K2HeadingOneBorderRadius.bottom,
            borderBottomLeftRadius: K2HeadingOneBorderRadius.left,
        }
        const headingtwoStyle = {
            color : K2HeadingtwoColor,
            fontSize:K2HeadingtwoSize +"px",
            fontFamily: K2headingtwoFontFam,
            fontWeight: K2headingtwoFontWeight,
            background: K2HeadingtwoBgColor,
            paddingTop: K2HeadingtwoPadding.top,
			paddingRight: K2HeadingtwoPadding.right,
			paddingBottom: K2HeadingtwoPadding.bottom,
			paddingLeft: K2HeadingtwoPadding.left,
            marginTop: K2HeadingtwoMargin.top,
			marginRight: K2HeadingtwoMargin.right,
			marginBottom: K2HeadingtwoMargin.bottom,
			marginLeft: K2HeadingtwoMargin.left,
            borderColor: K2HeadingtwoBorder.color,
            borderStyle: K2HeadingtwoBorder.style,
            borderWidth: K2HeadingtwoBorder.width,
            borderTopLeftRadius: K2HeadingtwoBorderRadius.top,
            borderTopRightRadius: K2HeadingtwoBorderRadius.right,
            borderBottomRightRadius: K2HeadingtwoBorderRadius.bottom,
            borderBottomLeftRadius: K2HeadingtwoBorderRadius.left,
        }
        const headingtwoGradStyle = {
            backgroundImage: K2HeadingtwoGradient,
            fontSize:K2HeadingtwoSize +"px",
            fontFamily: K2headingtwoFontFam,
            fontWeight: K2headingtwoFontWeight,
            paddingTop: K2HeadingtwoPadding.top,
			paddingRight: K2HeadingtwoPadding.right,
			paddingBottom: K2HeadingtwoPadding.bottom,
			paddingLeft: K2HeadingtwoPadding.left,
            marginTop: K2HeadingtwoMargin.top,
			marginRight: K2HeadingtwoMargin.right,
			marginBottom: K2HeadingtwoMargin.bottom,
			marginLeft: K2HeadingtwoMargin.left,
            borderColor: K2HeadingtwoBorder.color,
            borderStyle: K2HeadingtwoBorder.style,
            borderWidth: K2HeadingtwoBorder.width,
            borderTopLeftRadius: K2HeadingtwoBorderRadius.top,
            borderTopRightRadius: K2HeadingtwoBorderRadius.right,
            borderBottomRightRadius: K2HeadingtwoBorderRadius.bottom,
            borderBottomLeftRadius: K2HeadingtwoBorderRadius.left,
        }
        const headingtwoBubbleStyle = {
            background: K2HeadingtwoBgColor,
            fontSize:K2HeadingtwoSize +"px",
            fontFamily: K2headingtwoFontFam,
            fontWeight: K2headingtwoFontWeight,
            paddingTop: K2HeadingtwoPadding.top,
			paddingRight: K2HeadingtwoPadding.right,
			paddingBottom: K2HeadingtwoPadding.bottom,
			paddingLeft: K2HeadingtwoPadding.left,
            marginTop: K2HeadingtwoMargin.top,
			marginRight: K2HeadingtwoMargin.right,
			marginBottom: K2HeadingtwoMargin.bottom,
			marginLeft: K2HeadingtwoMargin.left,
            borderColor: K2HeadingtwoBorder.color,
            borderStyle: K2HeadingtwoBorder.style,
            borderWidth: K2HeadingtwoBorder.width,
            borderTopLeftRadius: K2HeadingtwoBorderRadius.top,
            borderTopRightRadius: K2HeadingtwoBorderRadius.right,
            borderBottomRightRadius: K2HeadingtwoBorderRadius.bottom,
            borderBottomLeftRadius: K2HeadingtwoBorderRadius.left,
        }
        const headingthreeStyle = {
            color : K2HeadingthreeColor,
            fontSize:K2HeadingthreeSize +"px",
            fontFamily:K2headingthreeFontFam,
            fontWeight: K2headingthreeFontWeight,
            background: K2HeadingthreeBgColor,
            paddingTop: K2HeadingthreePadding.top,
			paddingRight: K2HeadingthreePadding.right,
			paddingBottom: K2HeadingthreePadding.bottom,
			paddingLeft: K2HeadingthreePadding.left,
            marginTop: K2HeadingthreeMargin.top,
			marginRight: K2HeadingthreeMargin.right,
			marginBottom: K2HeadingthreeMargin.bottom,
			marginLeft: K2HeadingthreeMargin.left,
            borderColor: K2HeadingthreeBorder.color,
            borderStyle: K2HeadingthreeBorder.style,
            borderWidth: K2HeadingthreeBorder.width,
            borderTopLeftRadius: K2HeadingthreeBorderRadius.top,
            borderTopRightRadius: K2HeadingthreeBorderRadius.right,
            borderBottomRightRadius: K2HeadingthreeBorderRadius.bottom,
            borderBottomLeftRadius: K2HeadingthreeBorderRadius.left,
        }
        const headingthreeGradStyle = {
            backgroundImage: K2HeadingthreeGradient,
            fontSize:K2HeadingthreeSize +"px",
            fontFamily:K2headingthreeFontFam,
            fontWeight: K2headingthreeFontWeight,
            paddingTop: K2HeadingthreePadding.top,
			paddingRight: K2HeadingthreePadding.right,
			paddingBottom: K2HeadingthreePadding.bottom,
			paddingLeft: K2HeadingthreePadding.left,
            marginTop: K2HeadingthreeMargin.top,
			marginRight: K2HeadingthreeMargin.right,
			marginBottom: K2HeadingthreeMargin.bottom,
			marginLeft: K2HeadingthreeMargin.left,
            borderColor: K2HeadingthreeBorder.color,
            borderStyle: K2HeadingthreeBorder.style,
            borderWidth: K2HeadingthreeBorder.width,
            borderTopLeftRadius: K2HeadingthreeBorderRadius.top,
            borderTopRightRadius: K2HeadingthreeBorderRadius.right,
            borderBottomRightRadius: K2HeadingthreeBorderRadius.bottom,
            borderBottomLeftRadius: K2HeadingthreeBorderRadius.left,
        }
        const headingthreeBubbleStyle = {
            background: K2HeadingthreeBgColor,
            fontSize:K2HeadingthreeSize +"px",
            fontFamily:K2headingthreeFontFam,
            fontWeight: K2headingthreeFontWeight,
            paddingTop: K2HeadingthreePadding.top,
			paddingRight: K2HeadingthreePadding.right,
			paddingBottom: K2HeadingthreePadding.bottom,
			paddingLeft: K2HeadingthreePadding.left,
            marginTop: K2HeadingthreeMargin.top,
			marginRight: K2HeadingthreeMargin.right,
			marginBottom: K2HeadingthreeMargin.bottom,
			marginLeft: K2HeadingthreeMargin.left,
            borderColor: K2HeadingthreeBorder.color,
            borderStyle: K2HeadingthreeBorder.style,
            borderWidth: K2HeadingthreeBorder.width,
            borderTopLeftRadius: K2HeadingthreeBorderRadius.top,
            borderTopRightRadius: K2HeadingthreeBorderRadius.right,
            borderBottomRightRadius: K2HeadingthreeBorderRadius.bottom,
            borderBottomLeftRadius: K2HeadingthreeBorderRadius.left,
        }
        const headingStyle = {
            textAlign:K2headingAlignment
        }
       
		return (
			<div {...useBlockProps.save()}>
                <h1 className='K2-heading-container' style={headingStyle}>
                    <span className={`${K2HeadingOneColoractiveTab === 'TextGradient' && 'Text-gradient-class'} ${K2HeadingOneColoractiveTab === 'BubbleWrite' && 'bubble-text'}`}
                            style={{
                                ...(K2HeadingOneColoractiveTab === 'TextColor' && headingoneStyle),
                                ...(K2HeadingOneColoractiveTab === 'TextGradient' && headingoneGradStyle),
                                ...(K2HeadingOneColoractiveTab === 'BubbleWrite' && headingoneBubbleStyle)
                                }} ><RichText.Content value={K2Headingone} /></span>
                    {startFromNewLineTwo === true ? <br /> : null}
                    {
                            K2enableHeadingtwo == true ?
                    <span  className={`${K2HeadingtwoColoractiveTab === 'TextGradient' && 'Text-gradient-class'} ${K2HeadingtwoColoractiveTab === 'BubbleWrite' && 'bubble-text'}`}
                            style={{
                                ...(K2HeadingtwoColoractiveTab === 'TextColor' && headingtwoStyle),
                                ...(K2HeadingtwoColoractiveTab === 'TextGradient' && headingtwoGradStyle),
                                ...(K2HeadingtwoColoractiveTab === 'BubbleWrite' && headingtwoBubbleStyle)
                                }} ><RichText.Content value={K2Headingtwo} /></span>
                    :null
                    }
                    {startFromNewLineThree === true ? <br /> : null}
                    {
                        enableHeadingthree === true ? 
                        
                        <span   className={`${K2HeadingthreeColoractiveTab === 'TextGradient' && 'Text-gradient-class'} ${K2HeadingthreeColoractiveTab === 'BubbleWrite' && 'bubble-text'}`}
                            style={{
                                ...(K2HeadingthreeColoractiveTab === 'TextColor' && headingthreeStyle),
                                ...(K2HeadingthreeColoractiveTab === 'TextGradient' && headingthreeGradStyle),
                                ...(K2HeadingthreeColoractiveTab === 'BubbleWrite' && headingthreeBubbleStyle)
                                }} ><RichText.Content value={K2Headingthree} /></span>
                       
                        :null
                    }
                    
                </h1>
            </div>
		);
	},
} );
