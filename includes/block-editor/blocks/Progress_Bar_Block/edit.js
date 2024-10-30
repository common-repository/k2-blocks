/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

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
import { useMemo , Fragment} from '@wordpress/element';

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


import { GLOBAL_FONTS } from '../Global/GLOBAL_FONTS';
import { GLOBAL_FONTS_WEIGHTS } from '../Global/Global_Font_Weights';
import { GLOBAL_ICONS } from '../Global/Global_Icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlignCenter, faAlignLeft, faAlignRight, faHeading, faStar, faPlusCircle } from '@fortawesome/free-solid-svg-icons';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function edit({attributes, setAttributes, isSelected}) {

	const ProgressBarParentContainer = useMemo(
        () => ({
            justifyContent: attributes.ProgressBarAllignment
        }),
        [
            attributes.ProgressBarAllignment
        ]
    );


    const ProgressBarSubParentContainerStyling = useMemo(
        () => ({
            width: attributes.ProgressBarWidth + 'rem'
        }),
        [
            attributes.ProgressBarWidth
        ]
    );
    const ProgressBarOutsideContainerStyling = useMemo(
        () => ({
            backgroundColor: attributes.ProgressBarBackGroundColor,
            height: attributes.progressBarHeight + "em",
            borderRadius: attributes.ProgressBarBorderRadius + 'px',
        }),
        [
            attributes.ProgressBarBackGroundColor,
            attributes.progressBarHeight,
            attributes.ProgressBarBorderRadius

        ]
    );

    const ProgressBarInsideAnimationStyling = useMemo(
        () => ({
            width: attributes.progressBarPercentage + "%",
            backgroundColor: attributes.progressBarColor,
            borderRadius: attributes.ProgressBarBorderRadius + 'px',
        }),
        [
            attributes.progressBarPercentage,
            attributes.progressBarColor,
            attributes.ProgressBarBorderRadius

        ]
    );


    const ProgressBarInsideAnimationSpanStyling = useMemo(
        () => ({
            animationPlayState: attributes.AnimationState,
            opacity: attributes.ProgressBarOpacity
        }),
        [
            attributes.AnimationState,
            attributes.ProgressBarOpacity,
        ]
    );

    const TextStyling = useMemo(
        () => ({
            fontSize: attributes.TextFontSize + 'px',
            color: attributes.titleColor,
            align: 'left',
            fontFamily: attributes.TextFontFamily,
            fontWeight: attributes.TextFontWeight,
            fontStyle: attributes.ProgressBarTextStyle,
            textDecoration: attributes.ProgressBarTextDecoration,
            wordWrap: 'break-word'
        }),
        [
            attributes.TextFontSize,
            attributes.titleColor,
            attributes.TextFontFamily,
            attributes.ProgressBarTextStyle,
            attributes.ProgressBarTextDecoration
        ]
    );
    function onTitleColorChange(NewColor) {

        setAttributes(
            {
                titleColor: NewColor

            }
        )
    }

    function onTitleChange(NewText) {
        setAttributes({
            title: NewText
        })
    }

    function onBarColorChange(NewColor) {

        setAttributes({
            progressBarColor: NewColor


        })
    }

    function onBarHeightChange(NewHeight) {
        setAttributes({
            progressBarHeight: NewHeight
        })
    }

    function OnBarPercentageChange(NewPercentage) {
        setAttributes({
            progressBarPercentage: NewPercentage
        })
    }

    function onGradient1ColorChange(Newcolor) {
        setAttributes({
            ProgressBarGradientColor1: NewColor

        })
    }

    function onShowPercentageToggleChange(NewValue) {
        setAttributes({
            ShowPercentage: NewValue
        })
    }

    function onTextFontSizeChange(NewFont) {
        setAttributes({
            TextFontSize: NewFont
        })
    }

    function onAnimateProgressBar(Animate) {
        setAttributes({
            AnimateProgressBar: Animate,
        })

        if (attributes.AnimationState == 'paused'){
            setAttributes({
                AnimationState: 'running'
            })
        } else {
            setAttributes({
                AnimationState: 'paused'
            })
        }

    }

    function onChangeProgressBarBackgound(NewColor) {
        setAttributes({
            ProgressBarBackGroundColor: NewColor

        })
    }

    function onTextFontChange(NewFont) {
        setAttributes({
            TextFontFamily:  NewFont
        })
    }

    function onFontWeightChange(NewWeight) {
        setAttributes({
            TextFontWeight: NewWeight
        })
    }

    function onChangeProgressBarBorderRadius(NewBorders) {
        setAttributes({
            ProgressBarBorderRadius: NewBorders
        })
    }

    function onChangeProgressBarOpacity(NewValue) {
        setAttributes({
            ProgressBarOpacity: NewValue
        })
    }

    function onChangeProgressBarStripedOrSolid(NewOption) {
        setAttributes({
            ProgressBarStripedOrSolid: NewOption
        })
        if (NewOption === true){
            setAttributes({
                ProgressBarOpacity: 0.5
            })
        } else {
            setAttributes({
                ProgressBarOpacity: 0.0
            })
        }
    }

    function onChangeProgressBarWidth(NewWidth) {
        setAttributes({
            ProgressBarWidth: NewWidth
        })
    }
    function onChangeProgressBarTextStyle(Newstyle) {
        setAttributes({
            ProgressBarTextStyle: Newstyle
        })
    }

    function onChangeProgressBarTextDecoration(NewDecoration) {
        setAttributes({
            ProgressBarTextDecoration: NewDecoration
        })
    }

    function onChangeProgressBarTextDisplay(NewOption) {
        setAttributes({
            ProgressBarTextDisplay:NewOption
        })
    }

    function onChangeProgressBarAllignment(NewAllignment) {
        setAttributes({
            ProgressBarAllignment: NewAllignment
        })
    }

    function onChangeAlignmentIconChange(value) {

        if (value.target.tagName === 'SPAN'){
            var MainDiv = document.getElementById("k2-pb-Alignment-Icons-Id");
            var Spans = MainDiv.getElementsByTagName('div');
            for (var i = 0; i < Spans.length; i++) {
                if (Spans[i].getElementsByTagName('span')[0].className.includes('k2-pb-active')){
                    Spans[i].getElementsByTagName('span')[0].className = Spans[i].getElementsByTagName('span')[0].className.replace('k2-pb-active','')
                }
            }
            console.log(value.target.tagName)
            value.target.className = value.target.className + ' k2-pb-active'

        }

    }
	return (
        [

            <InspectorControls>
                <PanelBody>

                    <RangeControl
                        label={<strong> Progress Bar Width </strong>}
                        value={ attributes.ProgressBarWidth }
                        onChange={ onChangeProgressBarWidth }
                        min={ 5 }
                        max={ 100 }
                        step ={1}
                    />

                    <RangeControl
                        label={<strong> Progress Bar Height </strong>}
                        value={ attributes.progressBarHeight }
                        onChange={ onBarHeightChange }
                        min={ 0 }
                        max={ 10 }
                        step ={0.1}
                    />


                    <RangeControl
                        label={<strong>Progress</strong>}
                        value={ attributes.progressBarPercentage }
                        onChange={ OnBarPercentageChange }
                        min={ 0 }
                        max={ 100 }
                    />

                    <PanelRow>

                        <div style={{paddingBottom: '2%'}}>
                            <label><strong>Alignment</strong></label>
                        </div>
                        <div id = 'k2-pb-Alignment-Icons-Id' className={'k2-pb-inspector-alignment'} onClick={onChangeAlignmentIconChange}>

                            <div className={'k2-pb-inspector-alignment-single'}  onClick={() => onChangeProgressBarAllignment('flex-start')}>
                                <span className="fa fa-align-left k2-pb-alignment-icon" ></span>
                            </div>
                            <div className={'k2-pb-inspector-alignment-single'} onClick={() => onChangeProgressBarAllignment('center')}>
                                <span className="fa fa-align-center k2-pb-alignment-icon active"></span>
                            </div>
                            <div className={'k2-pb-inspector-alignment-single'} onClick={() => onChangeProgressBarAllignment('flex-end')}>
                                <span className="fa fa-align-right k2-pb-alignment-icon"></span>
                            </div>
                        </div>

                    </PanelRow>

                </PanelBody>
                <PanelBody title={"Colors"}>
                    <ColorPopup 
                            label={"Title color"}
                            value={{ value:attributes.titleColor}}
                            onChange = {onTitleColorChange}
                            PropertyName={"backgroundColor"}
                    />
                    <ColorPopup 
                            label={"Progress Bar color"}
                            value={{ value: attributes.progressBarColor}}
                            onChange = {onBarColorChange}
                            PropertyName={"backgroundColor"}
                    />
                </PanelBody>

                <PanelBody title={'Text'}>

                    <PanelRow>
                        <p>
                            Show Text
                        </p>
                        <ToggleControl
                            checked = {attributes.ProgressBarTextDisplay}
                            onChange = {onChangeProgressBarTextDisplay}
                        />
                    </PanelRow>


                    {
                        (attributes.ProgressBarTextDisplay === false)?null:
                            <Fragment>
                                <TextControl
                                    label={<strong>Title</strong>}
                                    onChange={onTitleChange}
                                    value = {attributes.title}
                                />

                                <PanelRow>

                                    <p>
                                        Show Percentage
                                    </p>
                                    <ToggleControl
                                        checked = {attributes.ShowPercentage}
                                        onChange = {onShowPercentageToggleChange}
                                    />

                                </PanelRow>

                                <RangeControl
                                    label={<p> <strong> Font Size </strong> </p>}
                                    value={ attributes.TextFontSize }
                                    onChange={ onTextFontSizeChange }
                                    min={ 0 }
                                    max={ 50 }
                                    step ={1}
                                />

                                <PanelRow>
                                    <SelectControl
                                        label="Font Family"
                                        value={ attributes.TextFontFamily }
                                        options={ GLOBAL_FONTS }
                                        onChange={ onTextFontChange}
                                    />

                                </PanelRow>

                                <PanelRow>
                                    <SelectControl
                                        label="Weight"
                                        value={ attributes.TextFontWeight }
                                        options={ GLOBAL_FONTS_WEIGHTS }
                                        onChange={ onFontWeightChange}
                                    />
                                </PanelRow>

                                <SelectControl
                                    label="Style"
                                    value={ attributes.ProgressBarTextStyle }
                                    options={
                                        [
                                            { label: 'Normal', value: 'Normal' },
                                            { label: 'oblique', value: 'oblique' },
                                            { label: 'italic', value: 'italic' },
                                        ]
                                    }
                                    onChange={ onChangeProgressBarTextStyle}
                                />

                                <SelectControl
                                    label="Decoration"
                                    value={ attributes.ProgressBarTextDecoration }
                                    options={
                                        [
                                            { label: 'None', value: 'None' },
                                            { label: 'underline', value: 'underline' },
                                            { label: 'overline', value: 'overline' },
                                            { label: 'line-through', value: 'line-through' },
                                        ]
                                    }
                                    onChange={ onChangeProgressBarTextDecoration}
                                />
                            </Fragment>
                    }



                </PanelBody>

                <PanelBody title={'Bar'}>

                    <PanelRow>
                        <p>
                            Striped
                        </p>
                        <ToggleControl
                            checked = {attributes.ProgressBarStripedOrSolid}
                            onChange = {onChangeProgressBarStripedOrSolid}
                        />

                    </PanelRow>

                    {
                        (attributes.ProgressBarStripedOrSolid === true)?<Fragment>
                            <PanelRow>
                                <p>
                                    Animation
                                </p>
                                <ToggleControl
                                    checked = {attributes.AnimateProgressBar}
                                    onChange = {onAnimateProgressBar}
                                />

                            </PanelRow>
                            <RangeControl
                                label={<p> <strong> Opacity </strong> </p>}
                                value={ attributes.ProgressBarOpacity }
                                onChange={ onChangeProgressBarOpacity }
                                min={ 0.1 }
                                max={ 1 }
                                step ={0.1}
                            />
                        </Fragment>:null
                    }
                    <RangeControl
                        label={<p> <strong> Border Raduis </strong> </p>}
                        value={ attributes.ProgressBarBorderRadius }
                        onChange={ onChangeProgressBarBorderRadius }
                        min={ 1 }
                        max={ 50 }
                        step ={0.1}
                    />

                </PanelBody>

                <PanelBody title={'Background'}>
                    <ColorPopup 
                            label={"Background color"}
                            value={{ value:attributes.ProgressBarBackGroundColor}}
                            onChange = {onChangeProgressBarBackgound}
                            PropertyName={"backgroundColor"}
                    />

                </PanelBody>



            </InspectorControls>,

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

        ]
	);
}
