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
	
	const CTAIMAGE = {
		backgroundImage: 'url("' +attributes.CTA_Image + '")'
	}


	const BoxedContainerStyling = {
		justifyContent: attributes.CTAAlignment
	}

	const ClassicParentContainer = {
		flexDirection: attributes.CTAClassicPosition,
		minHeight: attributes.CTAClassicBoxHeight + 'rem',
		width: attributes.CTABoxWidth + 'rem'
	}

	const ClassicImageContainerStyling = {
		flexBasis: attributes.CTAClassicImageContainerWidth + '%',
		boxShadow: attributes.CallToActionOverlayColor,
		backgroundImage: 'url("' +attributes.CTA_Image + '")',
		minHeight: attributes.CTACoverContainerHeight + 'rem',
		borderTopLeftRadius: attributes.CTABoxBorderRadius.top,
		borderTopRightRadius: attributes.CTABoxBorderRadius.right,
		borderBottomRightRadius:attributes.CTABoxBorderRadius.bottom,
		borderBottomLeftRadius:attributes.CTABoxBorderRadius.left,
	}
	const ClassicBgGradientImageContainerStyling = {
		flexBasis: attributes.CTAClassicImageContainerWidth + '%',
		backgroundImage: attributes.K2CTApricingBgGradient+', url("' +attributes.CTA_Image + '")', 
		minHeight: attributes.CTACoverContainerHeight + 'rem',
		borderTopLeftRadius: attributes.CTABoxBorderRadius.top,
		borderTopRightRadius: attributes.CTABoxBorderRadius.right,
		borderBottomRightRadius:attributes.CTABoxBorderRadius.bottom,
		borderBottomLeftRadius:attributes.CTABoxBorderRadius.left,
	}
	const CoverParentStyling = {
		boxShadow: attributes.CallToActionOverlayColor,
		backgroundImage: 'url("' +attributes.CTA_Image + '")',
		minHeight: attributes.CTACoverContainerHeight + 'rem',
		width: attributes.CTABoxWidth + 'rem',
		borderTopLeftRadius: attributes.CTABoxBorderRadius.top,
		borderTopRightRadius: attributes.CTABoxBorderRadius.right,
		borderBottomRightRadius:attributes.CTABoxBorderRadius.bottom,
		borderBottomLeftRadius:attributes.CTABoxBorderRadius.left,

	}
	const CoverBGgradientParentStyling = {
		backgroundImage: attributes.K2CTApricingBgGradient+', url("' +attributes.CTA_Image + '")', 
		minHeight: attributes.CTACoverContainerHeight + 'rem',
		width: attributes.CTABoxWidth + 'rem',
		borderTopLeftRadius: attributes.CTABoxBorderRadius.top,
		borderTopRightRadius: attributes.CTABoxBorderRadius.right,
		borderBottomRightRadius:attributes.CTABoxBorderRadius.bottom,
		borderBottomLeftRadius:attributes.CTABoxBorderRadius.left,

	}

	const CTATextAlignment = {
		textAlign: attributes.CTAInnerContainerPlacement
	}

	const CTAHeadingStyling = {
		color: attributes.CTAHeadingColor,
		fontSize: attributes.CTAHeadingFontSize + 'em',
		fontFamily: attributes.CTAHeadingFontFamily,
		fontWeight: attributes.CTAHeadingFontWeight,
		fontStyle: attributes.CTAHeadingTextStyle,
		textDecoration: attributes.CTAHeadingTextDecoration
	}

	const CTAParagraphStyling = {
		color: attributes.CTAParagraphColor,
		fontSize: attributes.CTAParagraphyFontSize + 'em',
		fontFamily: attributes.CTAParagraphFontFamily,
		fontWeight: attributes.CTAParagraphFontWeight,
		fontStyle: attributes.CTAParagraphTextStyle,
		textDecoration: attributes.CTAParagraphTextDecoration
	}

	const CTAButtonStyling = {
		fontSize: attributes.CTAButtonFontSize + 'em',
		fontFamily: attributes.CTAButtonFontFamily,
		fontWeight: attributes.CTAButtonFontWeight,
		fontStyle: attributes.CTAButtonTextStyle,
		textDecoration: attributes.CTAButtonTextDecoration,
		borderColor: attributes.CTAButtonBorderColor,
		borderRadius: attributes.CTAButtonBorderRadius,
		borderStyle: attributes.CTAButtonBorderStyle,
		borderWidth: attributes.CTAButtonBorderWidth,
		backgroundColor: attributes.CTAButtonColor,
		color: attributes.CTAButtonTextColor
	}

	return (
		<div>
			{
				(attributes.LayoutDesign == 'Classic')?
					<div  style={BoxedContainerStyling} className={'k2-cta-boxed-container'}>

						<div style={ClassicParentContainer} className={'k2-cta-classic-parent-container'}>
							<div style={CTATextAlignment} className={'k2-cta-classic-text-container'}>
								{
									(attributes.CTAisHeadingEnabled === true)?
										<RichText.Content
											tagName="h1" // The tag here is the element output and editable in the admin
											value={ attributes.CTAHeadingText } // Any existing content, either from the database or an attribute default
											style={CTAHeadingStyling}
											className = {'k2-cta-classic-heading-style'}
										/>
										: null
								}

								{
									( attributes.CTAisParagraphyEnabled === true ) ?
										<RichText.Content
											tagName="p" // The tag here is the element output and editable in the admin
											value={ attributes.CTAParagraphText } // Any existing content, either from the database or an attribute default
											style={CTAParagraphStyling}
											className={ 'k2-cta-classic-paragraph-heading' }
										/>
										: null
								}

								{
									( attributes.CTAisButtonEnabled === true ) ?
										(attributes.CTAButtonLinkOpenNewTab === false)?
										<button onclick={'window.location.href = "' + attributes.CTAButtonlink + '"'} style={CTAButtonStyling} className={ 'ClassicButtonStyling' }>
											{ attributes.CTAButtonText }
										</button>:
										<button
											onclick={"window.open('"+ attributes.CTAButtonlink + "','_blank')"}
											style={ CTAButtonStyling } className={ 'k2-cta-classic-button-styling' }>
											{ attributes.CTAButtonText }
										</button>
										: null
								}
							</div>
							<div style={attributes.isCTABGgradientEnable == true ? ClassicBgGradientImageContainerStyling : ClassicImageContainerStyling} className={'k2-cta-classic-image-container'}>

							</div>
						</div>
					</div>

					: <div  style={BoxedContainerStyling} className={'k2-cta-boxed-container'}>

						<div style={ attributes.isCTABGgradientEnable == true ? CoverBGgradientParentStyling : CoverParentStyling } className={'k2-cta-cover-parent-container'}>

							<div style={CTATextAlignment} className={'k2-cta-cover-text-container'}>
								{
									( attributes.CTAisHeadingEnabled === true ) ?
										<RichText.Content
											tagName="h1" // The tag here is the element output and editable in the admin
											value={ attributes.CTAHeadingText } // Any existing content, either from the database or an attribute default
											style={CTAHeadingStyling}
											className={ 'k2-cta-cover-heading-style' }
										/>
										: null
								}

								{
									( attributes.CTAisParagraphyEnabled === true ) ?
										<RichText.Content
											tagName="p" // The tag here is the element output and editable in the admin
											value={ attributes.CTAParagraphText } // Any existing content, either from the database or an attribute default
											style={CTAParagraphStyling}
											className = {'k2-cta-cover-paragraph-heading'}
										/>
										: null
								}


								{
									( attributes.CTAisButtonEnabled === true ) ?
										(attributes.CTAButtonLinkOpenNewTab === false)?
											<button onclick={'window.location.href = "' + attributes.CTAButtonlink + '"'} style={CTAButtonStyling} className={ 'ClassicButtonStyling' }>
												{ attributes.CTAButtonText }
											</button>:
											<button
												onclick={"window.open(' + " + attributes.CTAButtonlink + "',_blank')"}
												style={ CTAButtonStyling } className={ 'k2-cta-cover-button-styling' }>
												{ attributes.CTAButtonText }
											</button>
										: null
								}
							</div>
						</div>

					</div>
			}
		</div>

	);
}
