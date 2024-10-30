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
import { useMemo } from '@wordpress/element';

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
	Card,
	CardBody,
	CardHeader,
	TabPanel,
	Flex, FlexBlock, FlexItem,
	} from '@wordpress/components';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {Element} Element to render.
 */
export default function save({attributes}) {
	const {
        type, popupDelay, buttonColor, EnableButtonText, buttonText, 
        buttonTextSize, ModalButtonTextWeight, buttonWidth, buttonHeight, 
        buttonRadius, closeButtonPosition, textColor, textFontFamily, 
        ModalBoxIconType, modalIconPosition, modalIconTextGap, K2modalImage, 
        K2modalImageWidth, K2modalImageHeight, K2modalImagePosition, 
        K2modalImageBorderRadius, K2modalImageIconEnable, K2ModalBoxAlignment

    } = attributes;
	var buttonStyle = {
		backgroundColor: buttonColor,
		padding : buttonHeight+"em "+buttonWidth+"em",
		fontSize: buttonTextSize+"em",
		fontFamily:textFontFamily,
		fontWeight: ModalButtonTextWeight,
		color: textColor,
		flexDirection: modalIconPosition,
		gap: modalIconTextGap+'rem',
		borderRadius:buttonRadius+'rem'

	}
	var closeButtonStyle = {
		top:closeButtonPosition.top,
		right:closeButtonPosition.right
	}
	var imageStyle = {
		width: K2modalImageWidth+'%',
		height: K2modalImageHeight+'rem',
		borderTopLeftRadius:  K2modalImageBorderRadius.top,
		borderTopRightRadius:  K2modalImageBorderRadius.right,
		borderBottomRightRadius:  K2modalImageBorderRadius.bottom,
		borderBottomLeftRadius:  K2modalImageBorderRadius.left,
		objectPosition: K2modalImagePosition
	}
	var ModalBoxAlignmentStyles = {
		alignItems: K2ModalBoxAlignment
	}
	return (
		<div className={'k2-modal-container'} style={ModalBoxAlignmentStyles} data-type={type} data-time={popupDelay*1000}>
			{
				(type == 'button') &&
				<button className={'k2-modal-button'} style = {buttonStyle}>
				{
					K2modalImageIconEnable == true ?
						<i className={ModalBoxIconType}></i>
					:null
				}
				{
					EnableButtonText == true ?
						<RichText.Content tagName='span' value={buttonText} />
					:null
				}
				</button>
			}
			{
				(type == 'image') &&
				<img src={K2modalImage} className='k2-modal-image' style={imageStyle} />
			}
			<div className="k2-modal k2-modal-fade-in">
				<div className="k2-modal-content">
					<InnerBlocks.Content />
					<div className="k2-modal-close" style={closeButtonStyle}>&times;</div>
				</div>
			</div>
		</div>
  );
}
