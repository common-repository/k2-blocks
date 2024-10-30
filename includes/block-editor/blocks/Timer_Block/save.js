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
        minutes,
        hours,
        date,
        month,
        year,
        days_,
        hours_,
        minutes_,
        seconds_,
        TimerValueBackgroundColor,
        TimerValueBackGroundShadow,
        TimerValueColor,
        numberFontSize,
        numberFontFamily,
        TimerTextColor,
        textFontFamily,
        textFontSize,
        TimerLayout,
        BlockBackgroundColor,
        BlockBackgroundShadow,
        BlockMinWidth,
        CircleBlockRadium
    } = attributes;

	var timer_str = year+","+month+","+date+","+hours+","+minutes+","+0+","+0;
	const TimerBlockStyling = {
		backgroundColor: BlockBackgroundColor,
		boxShadow: (BlockBackgroundShadow)?"1px 1px 10px #888888":'',
		minWidth: BlockMinWidth + '%',
		borderRadius: '2%'
	}
	const TimerValueContainerStyling = {
		backgroundColor: TimerValueBackgroundColor,
		boxShadow: (TimerValueBackGroundShadow)?"1px 1px 10px #888888":'',
		color: TimerValueColor,
		fontSize: numberFontSize+"em",
		fontFamily: numberFontFamily,
	}

	const TimerTextContainerStyling = {
		color: TimerTextColor,
		fontSize: textFontSize+"em",
		fontFamily: textFontFamily
	}


		return (
			<div className={'k2-tw-parent-container'} data-time={timer_str}>

				<div style={TimerBlockStyling} className={'k2-tw-block-container'} >
						<span style={{display: 'block'}}>
							<div style={TimerValueContainerStyling} className={'k2-tw-value-container tw-digit-days'}>
								{
									(days_ < 10)? '0' + days_ : days_
								}
							</div>
							<div style={TimerTextContainerStyling} className={'k2-tw-text-container'} >
								Days
							</div>
						</span>
				</div>


				<div style={TimerBlockStyling} className={'k2-tw-block-container'}>
						<span style={{display: 'block'}}>
							<div style={TimerValueContainerStyling} className={'k2-tw-value-container tw-digit-hours'}>
								{
									(hours_ < 10)? '0' + hours_ : hours_
								}
							</div>
							<div style={TimerTextContainerStyling} className={'k2-tw-text-container'} >
								Hours
							</div>
						</span>
				</div>


				<div style={TimerBlockStyling} className={'k2-tw-block-container'}>
						<span style={{display: 'block'}}>
							<div style={TimerValueContainerStyling} className={'k2-tw-value-container tw-digit-minutes'}>
								{
									(minutes_ < 10)? '0' + minutes_ : minutes_
								}
							</div>
							<div style={TimerTextContainerStyling} className={'k2-tw-text-container'} >
								Minutes
							</div>
						</span>
				</div>


				<div style={TimerBlockStyling} className={'k2-tw-block-container'}>
						<span style={{display: 'block'}}>
							<div style={TimerValueContainerStyling} className={'k2-tw-value-container tw-digit-seconds'}>
								{
									(seconds_ < 10)? '0' + seconds_ : seconds_
								}
							</div>
							<div style={TimerTextContainerStyling} className={'k2-tw-text-container'} >
								Seconds
							</div>
						</span>
				</div>

			</div>
	  );
}
