//  Import CSS.
import './editor.scss';
import './style.scss';
import ReactDOM from 'react-dom';
import { baseurl } from '../Global_url';
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
	ToggleControl,
    ColorPicker,
    ColorPalette,
	SelectControl,
    Card,
    CardBody,
    CardHeader,
    Flex, FlexBlock, FlexItem,
    Button, ButtonGroup,
    CustomSelectControl
 } from '@wordpress/components';


import { useState } from '@wordpress/element';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlignCenter, faAlignLeft, faAlignRight, faHeading, faStar, faPlusCircle , faColumns} from '@fortawesome/free-solid-svg-icons';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks

const singleColIcon = (
    <svg width="120" height="60" viewBox="0 0 120 60"  xmlns="http://www.w3.org/2000/svg">
        <rect width="120" height="60" rx="4" fill="#E4E4E4"/>
    </svg>

);

const twoColIcon = (
    <svg width="80" height="40" viewBox="0 0 80 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="80" height="40" rx="4" fill="#E4E4E4"/>
        <line x1="39.25" y1="40" x2="39.25" y2="-9.87292e-10" stroke="white" stroke-width="1.5"/>
    </svg>
)
const threeColIcon = (
    <svg width="80" height="40" viewBox="0 0 80 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="80" height="40" rx="4" fill="#E4E4E4"/>
        <line x1="25.25" y1="40" x2="25.25" y2="-9.87292e-10" stroke="white" stroke-width="1.5"/>
        <line x1="52.25" y1="40" x2="52.25" y2="-9.87292e-10" stroke="white" stroke-width="1.5"/>
    </svg>

)
const fourColIcon = (
    <svg width="80" height="40" viewBox="0 0 80 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="80" height="40" rx="4" fill="#E4E4E4"/>
        <line x1="19.25" y1="40" x2="19.25" y2="-9.87292e-10" stroke="white" stroke-width="1.5"/>
        <line x1="39.25" y1="40" x2="39.25" y2="-9.87292e-10" stroke="white" stroke-width="1.5"/>
        <line x1="59.25" y1="40" x2="59.25" y2="-9.87292e-10" stroke="white" stroke-width="1.5"/>
    </svg>

)
const fiveColIcon = (
    <svg width="80" height="40" viewBox="0 0 80 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="80" height="40" rx="4" fill="#E4E4E4"/>
        <line x1="15.25" y1="40" x2="15.25" y2="-9.87292e-10" stroke="white" stroke-width="1.5"/>
        <line x1="31.25" y1="40" x2="31.25" y2="-9.87292e-10" stroke="white" stroke-width="1.5"/>
        <line x1="47.25" y1="40" x2="47.25" y2="-9.87292e-10" stroke="white" stroke-width="1.5"/>
        <line x1="63.25" y1="40" x2="63.25" y2="-9.87292e-10" stroke="white" stroke-width="1.5"/>
    </svg>

)
const sixColIcon = (
    <svg width="80" height="40" viewBox="0 0 80 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="80" height="40" rx="4" fill="#E4E4E4"/>
        <line x1="12.25" y1="40" x2="12.25" y2="-9.87292e-10" stroke="white" stroke-width="1.5"/>
        <line x1="25.75" y1="40" x2="25.75" y2="-9.87292e-10" stroke="white" stroke-width="1.5"/>
        <line x1="39.25" y1="40" x2="39.25" y2="-9.87292e-10" stroke="white" stroke-width="1.5"/>
        <line x1="52.75" y1="40" x2="52.75" y2="-9.87292e-10" stroke="white" stroke-width="1.5"/>
        <line x1="66.25" y1="40" x2="66.25" y2="-9.87292e-10" stroke="white" stroke-width="1.5"/>
    </svg>

)

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
registerBlockType( 'k2/dynamic-columns', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Dynamic Columns' ), // Block title.
	icon: {
		src: <FontAwesomeIcon icon={faColumns} />,
		background: '#fff',
		foreground:'#28b879',
		}, // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'k2-blocks', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'Dynamic' ),
		__( 'Columns' ),
        __( 'K2' )
	],
    supports:{
        reusable: false,
		html: false,
		align: ["wide","full"],
    },
    attributes: {
        K2numberOfCols : {
            type : 'number',
            default : 2
        },
        K2ColBgColor: {
            type : 'string',
        },
        K2ColdivId:{
            type:'string'
        },
        K2ColAlignment:{
            type:"string",
            default:'center'
        },
        k2ColPadding:{
            type: 'object',
            default:{top: '8px', right: "8px", bottom: "8px", left: "8px"}
        },
        k2ColMarginBottom:{
            type : 'number',
            default : 0
        },
        k2ColMarginTop:{
            type : 'number',
            default : 0
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
        const {K2numberOfCols, K2ColBgColor, K2ColdivId, K2ColAlignment, k2ColPadding, k2ColMarginBottom, k2ColMarginTop} = attributes;
        const [blockCount, setBlockCount] = useState(3);

		const onChangeK2numberOfCols = (newK2numberOfCols) => {
			setAttributes({K2numberOfCols: newK2numberOfCols})
		}

        const onChangeK2ColBgColor = (NewBgColor) => {
            setAttributes({K2ColBgColor:NewBgColor})
        }

        const onChangeK2ColdivId = (K2ColdivId) => {
            setAttributes({K2ColdivId:K2ColdivId})
        }
        const onChangek2ColPadding = (NewPadding) => {
            setAttributes({k2ColPadding:NewPadding})
        }
        const onChangek2ColMarginBottom = (NewMargin) => {
            setAttributes({k2ColMarginBottom:NewMargin})
        }
        const onChangek2ColMarginTop = (newTop)=> {
            setAttributes({k2ColMarginTop:newTop})
        }

        const colorOptions = [
            { name: 'blue', color: '#00f' },
            { name: 'black', color: '#000' },
            { name: 'Purple', color: '#2C2A4A' },
            { name: 'Light Purple', color: '#4F518C' },
        ]

        const onChangeK2ColAlignment = (newVal) => {
            setAttributes({K2ColAlignment:newVal})
        }

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

        const k2ColStyles = {
            background: K2ColBgColor,
            paddingTop: k2ColPadding.top,
			paddingRight: k2ColPadding.right,
			paddingBottom: k2ColPadding.bottom,
			paddingLeft: k2ColPadding.left,
            marginTop: k2ColMarginTop+'rem',
			marginBottom: k2ColMarginBottom+'rem',
        }

        const K2SingleColStyle = {
           justifyContent: K2ColAlignment,
        }
            const singleColContainer = document.querySelector('.k2-dynamic-columns .block-editor-inner-blocks .block-editor-block-list__layout');
            // console.log(singleColContainer);
            if (singleColContainer) {
                Object.assign(singleColContainer.style, K2SingleColStyle);
              }
            // singleColContainer.style.backgroundColor = '#f0f0f0';
          return (
            <div {...useBlockProps({
				className : `has-${ K2numberOfCols }-columns k2-dynamic-columns`,
			})}  id={K2ColdivId} style={k2ColStyles}>
                

              <InspectorControls>
                <PanelBody title={__("Block Id")} initialOpen={false}>
                    <TextControl 
                        value={K2ColdivId}
                        onChange={onChangeK2ColdivId}

                    />
                </PanelBody>
                <PanelBody>
                    <CardHeader>No of Columns</CardHeader>
                    <ButtonGroup className='K2-col-icon-cont'>
                        <FlexItem>
                            <Button icon={singleColIcon} onClick = {() => onChangeK2numberOfCols(1)}></Button>
                            <Button icon ={twoColIcon} onClick =  {() => onChangeK2numberOfCols(2)}></Button>
                        </FlexItem>
                        <FlexItem>
                            <Button icon ={threeColIcon} onClick =  {() => onChangeK2numberOfCols(3)}></Button>
                            <Button icon ={fourColIcon} onClick =  {() => onChangeK2numberOfCols(4)}></Button>
                        </FlexItem>
                        <FlexItem>
                            <Button icon ={fiveColIcon} onClick =  {() => onChangeK2numberOfCols(5)}></Button>
                            <Button icon ={sixColIcon} onClick =  {() => onChangeK2numberOfCols(6)}></Button>
                        </FlexItem>
                    </ButtonGroup>
                </PanelBody>
                <PanelRow>
                    <div style={{paddingBottom: '2%'}}>
                        <label><strong>Alignment</strong></label>
                    </div>
                    <div id = {'AlignmentIconsParent'} className={'k2-ib-inspector-control-alignment'} onClick={onChangeAlignmentIconChange}>

                        <div className={'k2-ib-inspector-control-alignment-single'}  onClick={() => onChangeK2ColAlignment('flex-start')}>
                            <span className="fa fa-align-left k2-ib-alignment-icon-style" ></span>
                        </div>
                        <div className={'k2-ib-inspector-control-alignment-single'} onClick={() => onChangeK2ColAlignment('center')}>
                            <span className="fa fa-align-center k2-ib-alignment-icon-style k2-ib-active"></span>
                        </div>
                        <div className={'k2-ib-inspector-control-alignment-single'} onClick={() => onChangeK2ColAlignment('flex-end')}>
                            <span className="fa fa-align-right k2-ib-alignment-icon-style"></span>
                        </div>
                    </div>

                </PanelRow>
                <PanelBody title={__("Background")} initialOpen={false}>
                        <Card>
                            <CardBody>
                                <PanelRow>
                                    <label>BACKGROUND COLOR</label>
                                    <div className="k2-ib-popup">
                                        <span style={{backgroundColor: K2ColBgColor}} className={ 'k2-ib-dot' } onClick={ myFunction }>
                                        </span>
                                        <span className="k2-ib-popup-text" hidden={ true }>

                                        <div>
                                            <ColorPalette
                                                colors= {colorOptions}
                                                value={ K2ColBgColor }
                                                onChange={ onChangeK2ColBgColor }
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
                                    value={k2ColPadding}
                                    onChange={onChangek2ColPadding}
                                />
                        </CardBody>
                    </Card>
                    <Card>
                        <CardHeader>Margin</CardHeader>
                        <CardBody>
                            <RangeControl 
                                label="Margin Top"
                                value={k2ColMarginTop}
                                onChange={onChangek2ColMarginTop}
                            />
                            <RangeControl
                                    label="Margin Bottom"
                                    value={k2ColMarginBottom}
                                    onChange={onChangek2ColMarginBottom}
                                />
                        </CardBody>
                    </Card>
                </PanelBody>
              </InspectorControls>
              <InnerBlocks 
                        allowedBlocks={ ['k2/single-column'] }
                        orientation="horizontal"
                        template = { [
                            ['k2/single-column'],
                            ['k2/single-column'],
                            ['k2/single-column'],
                        ]}
                    />
                  
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
            K2numberOfCols, K2ColBgColor, K2ColdivId, K2ColAlignment, k2ColPadding, k2ColMarginBottom, k2ColMarginTop
		} = attributes;

        const k2ColStyles = {
            background: K2ColBgColor,
            paddingTop: k2ColPadding.top,
			paddingRight: k2ColPadding.right,
			paddingBottom: k2ColPadding.bottom,
			paddingLeft: k2ColPadding.left,
            marginTop: k2ColMarginTop+'rem',
			marginBottom: k2ColMarginBottom+'rem',
            justifyContent: K2ColAlignment,
        }

        return (
			<div {...useBlockProps.save({
				className : `has-${ K2numberOfCols }-columns k2-dynamic-columns`,
			})}  id={K2ColdivId} style={k2ColStyles} >
                <InnerBlocks.Content />
            </div>
        );
    }
} );