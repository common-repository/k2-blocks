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
	
	const ProgressBarParentContainer = {
		justifyContent: attributes.ProgressBarAllignment
	}

	const ProgressBarSubParentContainerStyling = {
		width: attributes.ProgressBarWidth + 'rem'
	}
	const ProgressBarOutsideContainerStyling = {
		backgroundColor: attributes.ProgressBarBackGroundColor,
		height: attributes.progressBarHeight + "em",
		borderRadius: attributes.ProgressBarBorderRadius + 'px',

	}

	const ProgressBarInsideAnimationStyling = {
		width: attributes.progressBarPercentage + "%",
		backgroundColor: attributes.progressBarColor,
		borderRadius: attributes.ProgressBarBorderRadius + 'px',

	}

	const ProgressBarInsideAnimationSpanStyling = {
		animationPlayState: attributes.AnimationState,
		opacity: attributes.ProgressBarOpacity
	}

	const BarOutlineStyling = {
		borderColor: attributes.progressBorderColor,
		height: attributes.progressBarHeight + 'em'
	}

	const TextStyling = {
		fontSize: attributes.TextFontSize + 'px',
		color: attributes.titleColor,
		align: 'left',
		fontFamily: attributes.TextFontFamily,
		fontWeight: attributes.TextFontWeight,
		fontStyle: attributes.ProgressBarTextStyle,
		textDecoration: attributes.ProgressBarTextDecoration,
		wordWrap: 'break-word'
	}

	return (
		<div style={ProgressBarParentContainer} className={'k2-pb-parent-container'}>
			<div style={ProgressBarSubParentContainerStyling} className={'k2-pb-sub-parent-container '}>

				{
					(attributes.ProgressBarTextDisplay === false)?null:
						<div>
									<span style={ TextStyling}>
										{attributes.title}
										{
											(attributes.ShowPercentage == false) ?
												''
												: <span style={{float: 'right'}}> {attributes.progressBarPercentage} % </span>
										}

									</span>
						</div>
				}


				<div style={ProgressBarOutsideContainerStyling} className="k2-pb-outside-container ">
					<div className="k2-pb-inside-container " style={ProgressBarInsideAnimationStyling}>
						<span style={ProgressBarInsideAnimationSpanStyling}></span>
					</div>
				</div>

			</div>
		</div>


	);
}
