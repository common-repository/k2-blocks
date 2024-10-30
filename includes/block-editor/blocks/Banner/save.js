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
	const CoverTextContainer = {
		boxShadow: attributes.AnimatedBannerAnimationOverlayColor
	}

	const BoxedContainer = {
		justifyContent: attributes.AnimatedBannerAllignment
	}

	const CoverParentContainer = {
		width: attributes.AnimatedBannerWidth + 'rem',
		height: attributes.AnimatedBannerHeight+ 'rem'
	}

	const CoverParentImage = {
		backgroundImage: 'url("' +attributes.AnimatedBannerBackgroundImage + '")'
	}

	const HeadingStyle = {
		fontSize: attributes.AnimatedBannerHeadingTextFontSize + "em",
		fontWeight: attributes.AnimatedBannerHeadingTextWeight,
		fontFamily: attributes.AnimatedBannerHeadingTextFontFamily
	}


	const ParagraphStyle = {
		fontSize: attributes.AnimatedBannerParagraphTextFontSize + "em",
		fontWeight: attributes.AnimatedBannerParagraphTextWeight,
		fontFamily: attributes.AnimatedBannerParagraphTextFontFamily
	}

	return (
		<div style={BoxedContainer} className={'k2-AB-boxed-container'}>
			<div style = {CoverParentContainer} className={'K2-AB-cover-parent-container-wrapper'}>
				<div style={CoverParentImage} className={'k2-AB-cover-parent-container'}>
					<div style={CoverTextContainer} className={'k2-AB-cover-text-container'}>
						<RichText.Content
							tagName="div" // The tag here is the element output and editable in the admin
							value={ attributes.AnimatedBannerHeadingText } // Any existing content, either from the database or an attribute default
							style = {HeadingStyle}
							className={ 'k2-AB-cover-heading-style' }
						/>

						<RichText.Content
							tagName="div" // The tag here is the element output and editable in the admin
							style={ParagraphStyle}
							value={ attributes.AnimatedBannerParagraphText } // Any existing content, either from the database or an attribute default
							className = {'k2-AB-cover-paragraph-heading'}
						/>
					</div>
				</div>
			</div>

		</div>

	);
}
