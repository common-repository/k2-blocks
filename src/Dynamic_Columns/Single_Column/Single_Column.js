//  Import CSS.
import './editor.scss';
import './style.scss';
import { useBlockProps,
	AlignmentControl,
	RichText,
	InspectorControls,
    BlockControls,
    InnerBlocks,
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
	ToolbarButton,
	RangeControl,
	Button,
	ToggleControl,
    ColorPicker,
    ColorPalette,
	SelectControl,
    Card,
    CardBody,
    CardHeader,
    Flex, FlexBlock, FlexItem,
    Toolbar,
    DropdownMenu
 } from '@wordpress/components';


 import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlignCenter, faAlignLeft, faAlignRight, faHeading, faStar, faPlusCircle , faColumns, faTableColumns} from '@fortawesome/free-solid-svg-icons';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks

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
registerBlockType( 'k2/single-column', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Single Column' ), // Block title.
	icon: {
		src: <FontAwesomeIcon icon={faTableColumns} />,
		background: '#fff',
		foreground:'#28b879',
		}, // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.'
    category: 'k2-blocks',
    keywords: [
		__( 'single' ),
		__( 'Columns' ),
        __( 'K2' )
	],
    parent: [ "k2/dynamic-columns" ],
    supports:{
        reusable: false,
		html: false,
		align: ["wide","full"],
    },
    attributes: {
    //    K2SingleColWidth:{
	// 	type: "number",
	// 	default:30
	//    }
	K2SingleColAnchor:{
		type:"string"
	},
	K2SingleColLinkEnable:{
		type:"boolean",
		default: false
	},
	k2SingleBackground:{
		type:'string',
		
	},
	k2SingleColPadding:{
		type: 'object',
		default:{top: '8px', right: "8px", bottom: "8px", left: "8px"}
	},
	k2SingleColMargin:{
		type: 'object',
		default:{top: '8px', right: "8px", bottom: "8px", left: "8px"}
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
        const {K2SingleColAnchor, K2SingleColLinkEnable, k2SingleColPadding, k2SingleColMargin, k2SingleBackground} = attributes;
		const onChangeK2SingleColAnchor = (neuWal) =>{
			setAttributes({K2SingleColAnchor:neuWal})
		}
		const onChangeK2SingleColLinkEnable = (newVal) => {
			setAttributes({K2SingleColLinkEnable:newVal})
		}
		const onChangek2SingleColPadding = (NewPadding) => {
            setAttributes({k2SingleColPadding:NewPadding})
        }
        const onChangek2SingleColMargin = (NewMargin) => {
            setAttributes({k2SingleColMargin:NewMargin})
        }
		const onChangek2SingleBackground = (newColor) => {
			setAttributes({k2SingleBackground:newColor})
		}
		const SinglColStyle = {
			background: k2SingleBackground,
			paddingTop: k2SingleColPadding.top,
			paddingRight: k2SingleColPadding.right,
			paddingBottom: k2SingleColPadding.bottom,
			paddingLeft: k2SingleColPadding.left,
            marginTop: k2SingleColMargin.top,
			marginRight: k2SingleColMargin.right,
			marginBottom: k2SingleColMargin.bottom,
			marginLeft: k2SingleColMargin.left,
		}
		const colorOptions = [
            { name: 'blue', color: '#00f' },
            { name: 'black', color: '#000' },
            { name: 'Purple', color: '#2C2A4A' },
            { name: 'Light Purple', color: '#4F518C' },
        ]
		function myFunction(value) {
			var oferts = document.querySelectorAll(".k2-ib-popup-text .components-color-picker__inputs-wrapper");
			for (var i=0; i<oferts.length; i++){
				oferts[i].style.display = 'none';
			}
			var ParentDiv = value.target.parentNode
			var PopupDiv = ParentDiv.getElementsByTagName('span')
			if (PopupDiv[1].hidden  === true){
				PopupDiv[1].hidden  = false
			} else if (PopupDiv[1].hidden  === false){
				PopupDiv[1].hidden  = true
			}
		}
		// const singleColStyle = {
		// 	width: K2SingleColWidth+'%'
		// }
		// const childElements = document.querySelectorAll('.singleChildCont');
		// if(childElements){
		// 	childElements.forEach((childElement) => {
		// 		const parentElement = childElement.parentElement;
		// 		Object.assign(parentElement.style, singleColStyle);
		// 		console.log("single", parentElement);
		// 	  });
		// }
	
		// // if(parentElement){
		// // 
		// // }
          return (
            <div {...useBlockProps({
				className : 'singleChildCont'})} style={SinglColStyle}>
				
              <InnerBlocks
			   	orientation="vertical"
			  />
			  {
				K2SingleColLinkEnable == true ?
				<a className='single-col-linkTag' href={K2SingleColAnchor} >	
			 	</a>
				: null
			  }
			 
			  <InspectorControls>
				<PanelBody>
			  		<ToggleControl 
						label='Enable Link'
						checked={K2SingleColLinkEnable}
						onChange={onChangeK2SingleColLinkEnable}
					/>
					{
					K2SingleColLinkEnable == true ?
						<TextControl 
							placeholder='Paste your link'
							value={K2SingleColAnchor}
							onChange={onChangeK2SingleColAnchor}
						/>
						:null
					}
				</PanelBody>
				<PanelBody title={__("Background")} initialOpen={false}>
                        <Card>
                            <CardBody>
                                <PanelRow>
                                    <label>BACKGROUND COLOR</label>
                                    <div className="k2-ib-popup">
                                        <span style={{backgroundColor: k2SingleBackground}} className={ 'k2-ib-dot' } onClick={ myFunction }>
                                        </span>
                                        <span className="k2-ib-popup-text" hidden={ true }>

                                        <div>
                                            <ColorPalette
                                                colors= {colorOptions}
                                                value={ k2SingleBackground }
                                                onChange={ onChangek2SingleBackground }
                                            />
                                        </div>

                                        </span>
                                    </div>
                                </PanelRow>
                            </CardBody>
                        </Card>
                </PanelBody>
				<PanelBody title={__("Spacing")}>
                    <Card>
                        <CardHeader>Padding</CardHeader>
                        <CardBody>
                            <BoxControl
                                    label="Padding"
                                    value={k2SingleColPadding}
                                    onChange={onChangek2SingleColPadding}
                                />
                        </CardBody>
                    </Card>
                    <Card>
                        <CardHeader>Margin</CardHeader>
                        <CardBody>
                            <BoxControl
                                    label="Margin"
                                    value={k2SingleColMargin}
                                    onChange={onChangek2SingleColMargin}
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
            K2SingleColAnchor, K2SingleColLinkEnable, k2SingleColPadding, k2SingleColMargin, k2SingleBackground
		} = attributes;
		const SinglColStyle = {
			paddingTop: k2SingleColPadding.top,
			paddingRight: k2SingleColPadding.right,
			paddingBottom: k2SingleColPadding.bottom,
			paddingLeft: k2SingleColPadding.left,
            marginTop: k2SingleColMargin.top,
			marginRight: k2SingleColMargin.right,
			marginBottom: k2SingleColMargin.bottom,
			marginLeft: k2SingleColMargin.left,
		}

        return (
			<div {...useBlockProps.save({
				className : 'singleChildCont'})} style={SinglColStyle}>
					<InnerBlocks.Content />
				{
					K2SingleColLinkEnable == true ?
					<a className='single-col-linkTag-F' href={K2SingleColAnchor} >	
					</a>
					: null
			  	}
			</div>
        );
    },
} );