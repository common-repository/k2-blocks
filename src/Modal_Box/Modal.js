import './style.scss';
import './editor.scss';
import {GLOBAL_FONTS} from '../Global_Fonts';
import { InnerBlocks } from '@wordpress/block-editor';
import { GLOBAL_ICONS} from '../Global_Icons'
import { useMemo } from '@wordpress/element';
import ColorPopup from '../components/ColorPopup';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks

const {
	InspectorControls,
	RichText,
	MediaUpload
} = wp.editor;

// const {
// 	PanelBody,
// 	SelectControl,
// 	ColorPicker,
// 	TextControl,
// 	RangeControl,
// 	PanelRow,
// 	Card,
// 	Flex ,
// 	FlexItem,
//     CardBody,
//     CardHeader,
// 	ToggleControl,
// 	Button, ButtonGroup,

// } = wp.components;
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlignCenter, faAlignLeft, faAlignRight, faHeading, faStar, faPlusCircle } from '@fortawesome/free-solid-svg-icons';

const modalBlockIcon =  (
    <svg width={800} height={800} viewBox="0 0 800 800">
      <image
        width={800}
        height={800}
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAyAAAAMgCAYAAADbcAZoAAAABGdBTUEAALGPC/xhBQAAACBjSFJN AAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAAABmJLR0QA/wD/AP+gvaeTAAAA CXBIWXMAAC4jAAAuIwF4pT92AAAnfElEQVR42u3df5BlZ13n8c/tnoRAJCF2CAlEWFLsqmtZtaWC 6Fq15arrj9USF1CU0pjZiKJZ0OgQRMAIJBGGCLuFurVWze5ay66I4C8sKYVVATGACLJRlEVERYVN RiHKr2S6z/5xepJOZ2Yyfe493+eee1+vqq6e9Nw+85zuzjn33c95zp11XRcAAIAKG60HAAAArA8B AgAAlBEgAABAGQECAACUESAAAEAZAQIAAJQRIAAAQBkBAgAAlBEgAABAGQECAACUESAAAEAZAQIA AJQRIAAAQBkBAgAAlBEgAABAGQECAACUESAAAEAZAQIAAJQRIAAAQBkBAgAAlBEgAABAGQECAACU ESAAAEAZAQIAAJQRIAAAQBkBAgAAlBEgAABAGQECAACUESAAAEAZAQIAAJQRIAAAQBkBAgAAlBEg AABAGQECAACUESAAAEAZAQIAAJQRIAAAQBkBAgAAlBEgAABAGQECAACUESAAAEAZAQIAAJQRIAAA QBkBAgAAlBEgAABAGQECAACUESAAAEAZAQIAAJQRIAAAQBkBAgAAlBEgAABAGQECAACUESAAAEAZ AQIAAJQRIAAAQBkBAgAAlBEgAABAGQECAACUESAAAEAZAQIAAJQRIAAAQBkBAgAAlBEgAABAGQEC AACUESAAAEAZAQIAAJQRIAAAQBkBAgAAlBEgAABAGQECAACUESAAAEAZAQIAAJQRIAAAQBkBAgAA lBEgAABAGQECAACUESAAAEAZAQIAAJQRIAAAQBkBAgAAlBEgAABAGQECAACUESAAAEAZAQIAAJQR IAAAQBkBAgAAlBEgAABAGQECAACUESAAAEAZAQIAAJQRIAAAQBkBAgAAlBEgAABAGQECAACUESAA AEAZAQIAAJQRIAAAQBkBAgAAlBEgAABAGQECAACUESAAAEAZAQIAAJQRIAAAQBkBAgAAlBEgAABA GQECAACUESAAAEAZAQIAAJQRIAAAQBkBAgAAlBEgAABAGQECAACUESAAAEAZAQIAAJQRIAAAQBkB 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 39h6TAAsJwECwELsRsiRJG9tPRYAltes67rWYwAAANaEGRAAAKCMAAEAAMoIEAAAoIwAAQAAyggQ AACgjAABAADKCBAAAKCMAAEAAMoIEAAAoIwAAQAAyggQAACgjAABAADKCBAAAKCMAAEAAMoIEAAA oIwAAQAAyggQAACgjAABAADKCBAAAKCMAAEAAMoIEAAAoIwAAQAAyggQAACgjAABAADKCBAAAKCM AAEAAMoIEAAAoIwAAQAAyggQAACgjAABAADKCBAAAKCMAAEAAMoIEAAAoIwAAQAAyggQAACgjAAB AADKCBAAAKCMAAEAAMoIEAAAoIwAAQAAyggQAACgjAABAADKCBAAAKCMAAEAAMoIEAAAoIwAAQAA yggQAACgjAABAADKCBAAAKCMAAEAAMoIEAAAoIwAAQAAyggQAACgjAABAADKCBAAAKCMAAEAAMoI EAAAoIwAAQAAyggQAACgjAABAADKCBAAAKCMAAEAAMoIEAAAoIwAAQAAyggQAACgjAABAADKCBAA AKCMAAEAAMoIEAAAoIwAAQAAyggQAACgjAABAADKCBAAAKCMAAEAAMoIEAAAoIwAAQAAyggQAACg jAABAADKCBAAAKCMAAEAAMoIEAAAoIwAAQAAyggQAACgjAABAADKCBAAAKCMAAEAAMoIEAAAoIwA AQAAyggQAACgjAABAADKCBAAAKCMAAEAAMoIEAAAoIwAAQAAyggQAACgjAABAADKCBAAAKCMAAEA AMoIEAAAoIwAAQAAyggQAACgjAABAADKCBAAAKCMAAEAAMoIEAAAoIwAAQAAyggQAACgjAABAADK CBAAAKCMAAEAAMoIEAAAoIwAAQAAyggQAACgjAABAADKCBAAAKCMAAEAAMoIEAAAoIwAAQAAyggQ AACgjAABAADKCBAAAKCMAAEAAMoIEAAAoIwAAQAAyggQAACgjAABAADKCBAAAKCMAAEAAMoIEAAA oIwAAQAAyggQAACgjAABAADKCBAAAKCMAAEAAMoIEAAAoIwAAQAAyggQAACgjAABAADKCBAAAKCM AAEAAMoIEAAAoIwAAQAAyggQAACgjAABAADKCBAAAKCMAAEAAMoIEAAAoIwAAQAAyggQAACgjAAB AADKCBAAAKCMAAEAAMoIEAAAoIwAAQAAyggQAACgjAABAADKCBAAAKCMAAEAAMoIEAAAoIwAAQAA yggQAACgjAABAADKCBAAAKCMAAEAAMoIEAAAoIwAAQAAyggQAACgjAABAADKCBAAAKCMAAEAAMoI EAAAoIwAAQAAyggQAACgjAABAADKCBAAAKCMAAEAAMoIEAAAoIwAAQAAyggQAACgjAABAADKCBAA AKCMAAEAAMoIEAAAoIwAAQAAyggQAACgjAABAADKCBAAAKCMAAEAAMoIEAAAoIwAAQAAyggQAACg jAABAADKCBAAAKCMAAEAAMoIEAAAoIwAAQAAyggQAACgjAABAADK/H/bHD8ZnRj6HgAAACV0RVh0 ZGF0ZTpjcmVhdGUAMjAyMC0wNS0xNlQxODo1Mzo1MiswMzowMHaH3BYAAAAldEVYdGRhdGU6bW9k aWZ5ADIwMjAtMDUtMTZUMTg6NTM6NTIrMDM6MDAH2mSqAAAAAElFTkSuQmCC"
      />
    </svg>
  );
const ButtonIcon = (
	<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
		<mask id="mask0_1008_135" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="32" height="32">
		<path d="M0 9.34601e-05H31.9999V32H0V9.34601e-05Z" fill="white"/>
		</mask>
		<g mask="url(#mask0_1008_135)">
		<path d="M24.7187 22.8125H7.28123C3.5188 22.8125 0.46875 19.7624 0.46875 16C0.46875 12.2376 3.5188 9.18754 7.28123 9.18754H24.7187C28.4811 9.18754 31.5312 12.2376 31.5312 16C31.5312 19.7624 28.4811 22.8125 24.7187 22.8125Z" fill="#148D9D"/>
		<path d="M31.5312 16C31.5312 17.8813 30.7687 19.5844 29.5362 20.8175C28.3031 22.05 26.6 22.8125 24.7187 22.8125H22.8438C24.725 22.8125 26.4281 22.05 27.6612 20.8175C28.8937 19.5844 29.6562 17.8813 29.6562 16C29.6562 12.2375 26.6062 9.18754 22.8438 9.18754H24.7187C28.4812 9.18754 31.5312 12.2375 31.5312 16Z" fill="#148D9D"/>
		<path d="M24.7187 20.9375H7.28124C4.55437 20.9375 2.34375 18.7269 2.34375 16C2.34375 13.2731 4.55437 11.0625 7.28124 11.0625H24.7187C27.4456 11.0625 29.6562 13.2731 29.6562 16C29.6562 18.7269 27.4456 20.9375 24.7187 20.9375Z" fill="#40CAA2"/>
		</g>
	</svg>

);
const TimedIcon = (
	<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
		<g clip-path="url(#clip0_1008_177)">
		<path d="M27.3137 4.68625C24.2917 1.66431 20.2738 0 16 0C11.7262 0 7.70831 1.66431 4.68625 4.68625C1.66431 7.70831 0 11.7262 0 16C0 20.2738 1.66431 24.2917 4.68625 27.3137C7.70831 30.3357 11.7262 32 16 32C20.2738 32 24.2917 30.3357 27.3137 27.3137C30.3357 24.2917 32 20.2738 32 16C32 11.7262 30.3357 7.70831 27.3137 4.68625ZM26.6508 26.6508C23.8059 29.4958 20.0234 31.0625 16 31.0625C11.9766 31.0625 8.19413 29.4958 5.34919 26.6508C2.50425 23.8059 0.9375 20.0234 0.9375 16C0.9375 11.9766 2.50425 8.19413 5.34919 5.34919C8.19413 2.50425 11.9766 0.9375 16 0.9375C20.0234 0.9375 23.8059 2.50425 26.6508 5.34919C29.4958 8.19413 31.0625 11.9766 31.0625 16C31.0625 20.0234 29.4958 23.8059 26.6508 26.6508Z" fill="url(#paint0_linear_1008_177)"/>
		<path d="M15.9997 5.01001C15.8754 5.01001 15.7562 5.0594 15.6682 5.1473C15.5803 5.23521 15.531 5.35444 15.531 5.47876V7.48276C15.5309 7.60708 15.5803 7.72631 15.6682 7.81423C15.7561 7.90214 15.8754 7.95153 15.9997 7.95154C16.124 7.95155 16.2432 7.90217 16.3311 7.81427C16.4191 7.72637 16.4684 7.60714 16.4685 7.48282V5.47876C16.4685 5.35444 16.4191 5.23521 16.3312 5.1473C16.2433 5.0594 16.124 5.01001 15.9997 5.01001ZM15.9997 24.0483C15.8754 24.0483 15.7562 24.0977 15.6682 24.1856C15.5803 24.2735 15.531 24.3927 15.531 24.5171V26.5211C15.531 26.6454 15.5803 26.7646 15.6682 26.8525C15.7562 26.9404 15.8754 26.9898 15.9997 26.9898C16.124 26.9898 16.2433 26.9404 16.3312 26.8525C16.4191 26.7646 16.4685 26.6454 16.4685 26.5211V24.5171C16.4685 24.3927 16.4191 24.2735 16.3312 24.1856C16.2433 24.0977 16.124 24.0483 15.9997 24.0483ZM26.5209 15.5312H24.5169C24.3926 15.5312 24.2733 15.5806 24.1854 15.6685C24.0975 15.7564 24.0481 15.8756 24.0481 15.9999C24.0481 16.1243 24.0975 16.2435 24.1854 16.3314C24.2733 16.4193 24.3926 16.4687 24.5169 16.4687H26.5209C26.6452 16.4687 26.7644 16.4193 26.8523 16.3314C26.9403 16.2435 26.9896 16.1243 26.9896 15.9999C26.9896 15.8756 26.9403 15.7564 26.8523 15.6685C26.7644 15.5806 26.6452 15.5312 26.5209 15.5312ZM7.48252 15.5312H5.47852C5.3542 15.5312 5.23497 15.5806 5.14706 15.6685C5.05915 15.7564 5.00977 15.8756 5.00977 15.9999C5.00977 16.1243 5.05915 16.2435 5.14706 16.3314C5.23497 16.4193 5.3542 16.4687 5.47852 16.4687H7.48252C7.60684 16.4687 7.72606 16.4193 7.81397 16.3314C7.90188 16.2435 7.95127 16.1243 7.95127 15.9999C7.95127 15.8756 7.90188 15.7564 7.81397 15.6685C7.72606 15.5806 7.60684 15.5312 7.48252 15.5312ZM7.99027 10.8344L7.12252 10.3334C7.01491 10.2723 6.88747 10.2561 6.76802 10.2886C6.64856 10.321 6.54678 10.3994 6.48489 10.5066C6.42299 10.6138 6.40602 10.7411 6.43765 10.8608C6.46929 10.9804 6.54698 11.0827 6.65377 11.1453L7.52152 11.6463C7.57482 11.6771 7.63367 11.6971 7.6947 11.7051C7.75573 11.7132 7.81775 11.7091 7.87721 11.6932C7.93667 11.6772 7.99241 11.6498 8.04124 11.6123C8.09008 11.5748 8.13105 11.5281 8.16183 11.4748C8.22398 11.3671 8.24083 11.2392 8.20866 11.1191C8.17648 10.999 8.09792 10.8966 7.99027 10.8344ZM25.3456 20.8546L24.4779 20.3536C24.3703 20.2924 24.2428 20.2763 24.1234 20.3087C24.0039 20.3411 23.9022 20.4195 23.8403 20.5267C23.7784 20.6339 23.7614 20.7612 23.793 20.8809C23.8247 21.0005 23.9024 21.1028 24.0091 21.1654L24.8769 21.6664C24.9302 21.6972 24.989 21.7172 25.0501 21.7253C25.1111 21.7333 25.1731 21.7292 25.2326 21.7133C25.292 21.6974 25.3478 21.6699 25.3966 21.6324C25.4455 21.5949 25.4864 21.5482 25.5172 21.4949C25.5794 21.3872 25.5962 21.2593 25.564 21.1392C25.5319 21.0191 25.4533 20.9167 25.3456 20.8546ZM21.4946 6.48245C21.387 6.42029 21.259 6.40345 21.139 6.43562C21.0189 6.46779 20.9165 6.54635 20.8543 6.65401L20.3533 7.52176C20.2921 7.62936 20.276 7.7568 20.3084 7.87626C20.3409 7.99572 20.4192 8.0975 20.5264 8.15939C20.6336 8.22128 20.761 8.23826 20.8806 8.20662C21.0003 8.17498 21.1026 8.09729 21.1652 7.99051L21.6662 7.12276C21.7284 7.0151 21.7452 6.88715 21.713 6.76707C21.6809 6.64699 21.6023 6.54461 21.4946 6.48245ZM11.4745 23.8378C11.4212 23.807 11.3624 23.7871 11.3013 23.779C11.2403 23.771 11.1783 23.775 11.1188 23.791C11.0594 23.8069 11.0036 23.8344 10.9548 23.8719C10.906 23.9093 10.865 23.9561 10.8342 24.0094L10.3332 24.8771C10.272 24.9847 10.2559 25.1122 10.2883 25.2316C10.3208 25.3511 10.3991 25.4529 10.5063 25.5148C10.6135 25.5767 10.7408 25.5936 10.8605 25.562C10.9802 25.5304 11.0825 25.4527 11.1451 25.3459L11.6461 24.4781C11.7082 24.3705 11.7251 24.2425 11.6929 24.1224C11.6607 24.0024 11.5822 23.9 11.4745 23.8378ZM25.5173 10.5049C25.4551 10.3973 25.3527 10.3187 25.2326 10.2866C25.1126 10.2544 24.9846 10.2712 24.877 10.3334L24.0092 10.8344C23.9024 10.897 23.8247 10.9993 23.7931 11.119C23.7615 11.2386 23.7784 11.366 23.8403 11.4731C23.9022 11.5803 24.004 11.6587 24.1235 11.6911C24.2429 11.7236 24.3703 11.7074 24.478 11.6463L25.3457 11.1453C25.4534 11.0831 25.5319 10.9807 25.5641 10.8606C25.5963 10.7406 25.5794 10.6126 25.5173 10.5049ZM8.16183 20.5251C8.13106 20.4718 8.09009 20.4251 8.04125 20.3876C7.99242 20.3501 7.93668 20.3226 7.87722 20.3067C7.81775 20.2908 7.75573 20.2867 7.6947 20.2947C7.63367 20.3028 7.57482 20.3228 7.52152 20.3536L6.65377 20.8546C6.54698 20.9172 6.46929 21.0195 6.43765 21.1391C6.40602 21.2588 6.42299 21.3861 6.48489 21.4933C6.54678 21.6005 6.64856 21.6789 6.76802 21.7113C6.88747 21.7438 7.01491 21.7276 7.12252 21.6664L7.99027 21.1654C8.09792 21.1033 8.17648 21.0009 8.20866 20.8808C8.24083 20.7607 8.22398 20.6328 8.16183 20.5251ZM11.6461 7.52176L11.1451 6.65401C11.0825 6.54722 10.9802 6.46954 10.8605 6.4379C10.7408 6.40626 10.6135 6.42324 10.5063 6.48513C10.3991 6.54702 10.3208 6.6488 10.2883 6.76826C10.2559 6.88772 10.272 7.01515 10.3332 7.12276L10.8342 7.99051C10.865 8.04384 10.9059 8.09058 10.9548 8.12806C11.0036 8.16555 11.0593 8.19304 11.1188 8.20897C11.1783 8.22491 11.2403 8.22897 11.3013 8.22092C11.3624 8.21287 11.4212 8.19287 11.4745 8.16207C11.5822 8.09991 11.6607 7.99753 11.6929 7.87745C11.7251 7.75737 11.7082 7.62942 11.6461 7.52176ZM21.6662 24.8771L21.1652 24.0094C21.1026 23.9026 21.0003 23.8249 20.8806 23.7933C20.761 23.7616 20.6336 23.7786 20.5264 23.8405C20.4192 23.9024 20.3409 24.0042 20.3084 24.1236C20.276 24.2431 20.2921 24.3705 20.3533 24.4781L20.8543 25.3459C20.8851 25.3992 20.9261 25.446 20.9749 25.4834C21.0237 25.5209 21.0795 25.5484 21.1389 25.5644C21.1984 25.5803 21.2604 25.5843 21.3215 25.5763C21.3825 25.5682 21.4413 25.5482 21.4946 25.5174C21.6023 25.4553 21.6809 25.3529 21.713 25.2328C21.7452 25.1127 21.7284 24.9848 21.6662 24.8771ZM22.9761 14.9266C22.9668 14.8658 22.9455 14.8074 22.9136 14.7547C22.8817 14.7021 22.8397 14.6562 22.7901 14.6198C22.7404 14.5834 22.6841 14.5572 22.6243 14.5425C22.5645 14.5279 22.5024 14.5252 22.4415 14.5346L17.3057 15.3248C17.0606 14.8526 16.5674 14.5292 15.9998 14.5292C15.765 14.5292 15.543 14.5848 15.3458 14.6831L10.3191 9.65645C10.2312 9.56855 10.112 9.51917 9.9877 9.51917C9.86339 9.51917 9.74417 9.56855 9.65627 9.65645C9.56837 9.74435 9.51899 9.86357 9.51899 9.98788C9.51899 10.1122 9.56837 10.2314 9.65627 10.3193L14.683 15.346C14.5815 15.5491 14.5288 15.773 14.529 15.9999C14.529 16.8109 15.1888 17.4707 15.9998 17.4707C16.725 17.4707 17.329 16.9429 17.4486 16.2513L22.5841 15.4613C22.707 15.4423 22.8173 15.3754 22.8908 15.2751C22.9643 15.1748 22.995 15.0495 22.9761 14.9266ZM15.9997 16.5332C15.7056 16.5332 15.4665 16.2939 15.4665 15.9999C15.4665 15.7059 15.7057 15.4667 15.9997 15.4667C16.2937 15.4667 16.533 15.7059 16.533 15.9999C16.533 16.2939 16.2938 16.5332 15.9997 16.5332Z" fill="url(#paint1_linear_1008_177)"/>
		<path d="M24.4215 6.10892C21.9428 3.99417 18.7789 2.89574 15.5123 3.01686C12.2275 3.1383 9.13757 4.48611 6.81182 6.81186C4.48607 9.13761 3.13826 12.2275 3.01682 15.5124C2.89601 18.7788 3.99413 21.9429 6.10888 24.4215C6.15286 24.4732 6.20755 24.5147 6.26917 24.5431C6.33078 24.5715 6.39784 24.5862 6.46569 24.586C6.55522 24.586 6.64286 24.5603 6.71825 24.512C6.79364 24.4637 6.85362 24.3949 6.8911 24.3136C6.92859 24.2323 6.94201 24.1419 6.92977 24.0532C6.91754 23.9646 6.88016 23.8812 6.82207 23.8131C4.86026 21.5136 3.84151 18.578 3.95363 15.547C4.06632 12.4994 5.31682 9.63267 7.47469 7.47473C9.63257 5.3168 12.4994 4.06636 15.5469 3.95367C18.5782 3.84161 21.5136 4.8603 23.8131 6.82211C23.9078 6.90145 24.0301 6.94017 24.1532 6.92984C24.2763 6.91951 24.3904 6.86098 24.4706 6.76696C24.5508 6.67295 24.5907 6.55107 24.5815 6.42783C24.5723 6.3046 24.5148 6.18998 24.4215 6.10892ZM25.8909 7.57836C25.8099 7.48508 25.6953 7.42759 25.572 7.41839C25.4488 7.40919 25.3269 7.44903 25.2329 7.52923C25.1389 7.60944 25.0804 7.72352 25.07 7.84667C25.0597 7.96981 25.0984 8.09205 25.1778 8.1868C27.1396 10.4863 28.1583 13.4219 28.0462 16.4529C27.9335 19.5005 26.683 22.3672 24.5251 24.5252C22.3673 26.6831 19.5004 27.9335 16.4529 28.0462C13.4221 28.1584 10.4863 27.1397 8.18676 25.1778C8.09201 25.0985 7.96977 25.0597 7.84663 25.0701C7.72348 25.0804 7.6094 25.1389 7.52919 25.2329C7.44899 25.327 7.40915 25.4488 7.41835 25.5721C7.42755 25.6953 7.48504 25.8099 7.57832 25.891C9.93375 27.9005 12.9079 28.992 16.0008 28.992C16.1627 28.992 16.3251 28.989 16.4876 28.983C19.7724 28.8616 22.8623 27.5138 25.1881 25.188C27.5138 22.8623 28.8616 19.7724 28.9831 16.4875C29.1038 13.2212 28.0057 10.0571 25.8909 7.57836Z" fill="url(#paint2_linear_1008_177)"/>
		</g>
		<defs>
		<linearGradient id="paint0_linear_1008_177" x1="15.36" y1="-3.84" x2="26.88" y2="46.72" gradientUnits="userSpaceOnUse">
		<stop stop-color="#7BDCB5"/>
		<stop offset="1" stop-color="#1D92DD" stop-opacity="0"/>
		</linearGradient>
		<linearGradient id="paint1_linear_1008_177" x1="15.5601" y1="2.37243" x2="23.4728" y2="37.1005" gradientUnits="userSpaceOnUse">
		<stop stop-color="#7BDCB5"/>
		<stop offset="1" stop-color="#1D92DD" stop-opacity="0"/>
		</linearGradient>
		<linearGradient id="paint2_linear_1008_177" x1="15.4803" y1="-0.110295" x2="24.8346" y2="40.9448" gradientUnits="userSpaceOnUse">
		<stop stop-color="#7BDCB5"/>
		<stop offset="1" stop-color="#1D92DD" stop-opacity="0"/>
		</linearGradient>
		<clipPath id="clip0_1008_177">
		<rect width="32" height="32" fill="white"/>
		</clipPath>
		</defs>
	</svg>

);
const ImageIcon = (
	<svg width="32" height="30" viewBox="0 0 32 30" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M8.33272 23.3958C6.19817 23.3958 4.29949 22.029 3.60997 19.9943L3.56335 19.841C3.40072 19.3022 3.33259 18.849 3.33259 18.3956V9.30459L0.0978847 20.1022C-0.318126 21.6904 0.629898 23.3369 2.2205 23.7756L22.8385 29.2973C23.0893 29.3626 23.3474 29.3957 23.6065 29.3959C24.9345 29.3959 26.1479 28.5146 26.488 27.2157L27.6892 23.3958H8.33272ZM11.9996 9.3954C13.4704 9.3954 14.6661 8.19931 14.6661 6.72859C14.6661 5.25786 13.4704 4.06177 11.9996 4.06177C10.5288 4.06177 9.33275 5.25792 9.33275 6.72859C9.33275 8.19925 10.5288 9.3954 11.9996 9.3954Z" fill="url(#paint0_linear_1010_183)"/>
		<path d="M28.6669 0.0616455H8.66634C6.82917 0.0616455 5.33301 1.55781 5.33301 3.39523V18.0621C5.33301 19.8996 6.82917 21.3957 8.66634 21.3957H28.6669C30.5043 21.3957 32.0004 19.8996 32.0004 18.0621V3.39523C32.0004 1.55781 30.5043 0.0616455 28.6669 0.0616455ZM8.66634 2.72846H28.6669C29.035 2.72846 29.3336 3.0271 29.3336 3.39523V12.8608L25.1216 7.94591C24.6748 7.42196 24.0281 7.14189 23.3335 7.12607C22.6428 7.12995 21.9948 7.43658 21.5522 7.96735L16.5999 13.9114L14.9866 12.302C14.0747 11.3901 12.5906 11.3901 11.6799 12.302L7.99983 15.9808V3.39517C7.99983 3.02703 8.29846 2.72846 8.66634 2.72846Z" fill="url(#paint1_linear_1010_183)"/>
		<defs>
		<linearGradient id="paint0_linear_1010_183" x1="13.2908" y1="1.02167" x2="21.703" y2="41.374" gradientUnits="userSpaceOnUse">
		<stop stop-color="#7BDCB5"/>
		<stop offset="1" stop-color="#1D92DD" stop-opacity="0"/>
		</linearGradient>
		<linearGradient id="paint1_linear_1010_183" x1="18.1334" y1="-2.49844" x2="24.3887" y2="31.8191" gradientUnits="userSpaceOnUse">
		<stop stop-color="#7BDCB5"/>
		<stop offset="1" stop-color="#1D92DD" stop-opacity="0"/>
		</linearGradient>
		</defs>
	</svg>

)


//   const MY_TEMPLATE = [
// 	[ 'core/heading', { placeholder: 'This is a Modal popup' } ],
//     [ 'core/paragraph', { placeholder: 'Add your blocks here' } ],
// ];
/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */

registerBlockType( 'k2/modal-block', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: 'Modal box',
	icon: {
		src: modalBlockIcon,
	},
	category: 'k2-blocks',
	attributes: {
		type : {
			type: 'string',
			default: 'button'
		},
		popupDelay: {
			type: 'number',
			default: 3
		},
		buttonColor: {
			type: 'string',
			default: '#43cea2'
		},
		EnableButtonText:{
			type:'boolean',
			default:true
		},
		buttonText: {
			type: 'string',
			default: 'Open Sesame'
		},
		buttonTextSize: {
			type: 'string',
			default: 1
		},
		ModalButtonTextWeight:{
			type:'string'
		},
		buttonWidth: {
			type: 'number',
			default: 2
		},
		buttonHeight: {
			type: 'number',
			default: 1
		},
		buttonRadius:{
			type:'number',
			default:0
		},
		closeButtonPosition: {
			type: 'Object',
			default:{
				top:0,
				right:0,
				text:'topright'
			}
		},
		textColor:{
			type:'string',
			default:'white'
		},
		textFontFamily:{
			type:'string',
			default:''
		},
		ModalBoxIconType:{
			type: 'string',
			default: 'fa fa-rocket'
		},
		modalIconPosition:{
			type:'string',
			default:'row'
		},
		modalIconTextGap:{
			type:'number',
			default:1
		},
		K2modalImage:{
			type:"string",
			default:"http://k2blocks.com/wp-content/uploads/2023/07/Rectangle-90.png"
		},
		K2modalImageWidth:{
			type:'number'
		},
		K2modalImageHeight:{
			type:'number'
		},
		K2modalImagePosition:{
			type:'string',
			default:'center'
		},
		K2modalImageBorderRadius:{
			type:'object',
			default:{top: '8px', right: "8px", bottom: "8px", left: "8px"}
		},
		K2modalImageIconEnable:{
			type:'boolean',
			default:true
		},
		K2ModalBoxAlignment:{
			type:'string'
		}

	},

	edit: function(props) {


		function onChangeAlertIconActive(value) {

			if (value.target.tagName === 'SPAN') {

				var MainDiv = document.getElementById( "k2-CB-icon-list-wrapper-id" );
				var Spans = MainDiv.getElementsByTagName( 'span' );
				for (var i = 0; i < Spans.length; i++) {
					if (Spans[i].className.includes( 'k2-CB-active' )) {
						Spans[i].className = Spans[i].className.replace( 'k2-CB-active', '' )
					}
				}
				props.setAttributes( {
					ModalBoxIconType: value.target.className
				} )
				console.log( value.target.className )
				value.target.className = value.target.className + ' k2-CB-active'
			}
		}
		function onCloseButtonPositionChange(value){
			if(value=='topright'){
				props.setAttributes({
					closeButtonPosition:{top:0,right:0,text:value}
				})
			}
			else if(value == 'topleft'){
				props.setAttributes({
					closeButtonPosition:{top:0,right:'auto',text:value}
				})
			}
			else if(value == 'bottomright'){
				props.setAttributes({
					closeButtonPosition:{top:'90%',right:0,text:value}
				})
			}
			else if(value == 'bottomleft'){
				props.setAttributes({
					closeButtonPosition:{top:'90%',right:'auto',text:value}
				})
			}
			console.log(props.attributes.closeButtonPosition)
		}
		const FontWeightAvaibles= [
			{ label: 'normal'},
			{ label: '100'},
			{ label: '200'},
			{ label: '300'},
			{ label: '400'},
			{ label: '500'},
			{ label: '600'},
		]
		//helper for alignment icons
		function onChangeAlignmentIconChange(value) {

			if (value.target.tagName === 'SPAN'){
				var ParentDiv = value.target.parentNode
				var MainDiv = ParentDiv.parentNode
				var Spans = MainDiv.getElementsByTagName('div');
				for (var i = 0; i < Spans.length; i++) {
					if (Spans[i].getElementsByTagName('span')[0].className.includes('k2-CB-active')){
						Spans[i].getElementsByTagName('span')[0].className = Spans[i].getElementsByTagName('span')[0].className.replace('k2-CB-active','')
					}
				}
				value.target.className = value.target.className + ' k2-CB-active'

			}

		}
		function onChangeK2modalImageIconEnable(NewVal){
			props.setAttributes({K2modalImageIconEnable:NewVal})
		}
		function onChangeEnableButtonText(newBool){
			props.setAttributes({EnableButtonText:newBool})
		}
		function onChangeModalButtonTextWeight(NewVal){
			props.setAttributes({ModalButtonTextWeight:NewVal})
		}
		function onChangemodalIconPosition( newVal){
			props.setAttributes({modalIconPosition: newVal})
		}
		function onChangemodalIconTextGap( newVal){
			props.setAttributes({modalIconTextGap: newVal})
		}
		function onChangebuttonRadius(NewRadius){
			props.setAttributes({buttonRadius:NewRadius})
		}
		function onChangeK2modalImage(NewImage){
			props.setAttributes({K2modalImage:NewImage.url})
		}
		function onChangeK2modalImageWidth(NewVal){
			props.setAttributes({K2modalImageWidth:NewVal})
		}
		function onChangeK2modalImageHeight(NewHeight){
			props.setAttributes({K2modalImageHeight:NewHeight})
		}
		function onChangeK2modalImageBorderRadius(NewRadius){
			props.setAttributes({K2modalImageBorderRadius:NewRadius})
		}
		function onChangeK2modalImagePosition(NewPos){
			props.setAttributes({K2modalImagePosition:NewPos})
		}
		var controls = (
			<PanelBody title={"Button styling"}>
				<ColorPopup 
						label={"Background Color"}
						value={{ value:props.attributes.buttonColor}}
						onChange = {(value)=>{props.setAttributes({buttonColor:value})}}
						PropertyName={"backgroundColor"}
				/>


				<RangeControl
					label= "Button width"
					value={ props.attributes.buttonWidth }
					onChange={ (value)=>{props.setAttributes({buttonWidth:value})} }
					min={ 0.1 }
					max={ 10 }
					step ={0.1}
				/>
				<RangeControl
					label= "Button Height"
					value={ props.attributes.buttonHeight }
					onChange={ (value)=>{props.setAttributes({buttonHeight:value})} }
					min={ 0.1 }
					max={ 10 }
					step ={0.1}
				/>
				<RangeControl
					label= "Button Radius"
					value={ props.attributes.buttonRadius }
					onChange={onChangebuttonRadius}
					min={ 0.1 }
					max={ 10 }
					step ={0.1}
				/>
				
			</PanelBody>
		);
		
			function onChangetextColor (newColor){
				props.setAttributes({textColor: newColor})
			}
			const buttonStyle = useMemo(
				() => ({
					backgroundColor: props.attributes.buttonColor,
					padding : props.attributes.buttonHeight+"em "+props.attributes.buttonWidth+"em",
					fontSize: props.attributes.buttonTextSize+"em",
					fontFamily:props.attributes.textFontFamily,
					fontWeight: props.attributes.ModalButtonTextWeight,
					color: props.attributes.textColor,
					flexDirection: props.attributes.modalIconPosition,
					gap: props.attributes.modalIconTextGap+'rem',
					borderRadius:props.attributes.buttonRadius+'rem'
				}),
				[
					props.attributes.buttonColor,
					props.attributes.buttonHeight ,
					props.attributes.buttonWidth,
					props.attributes.buttonTextSize,
					props.attributes.textFontFamily,
					props.attributes.ModalButtonTextWeight,
					props.attributes.modalIconPosition,
					props.attributes.modalIconTextGap,
					props.attributes.buttonRadius,
					props.attributes.textColor,
				]
			);
			const closeButtonStyle = useMemo(
				() => ({
					top:props.attributes.closeButtonPosition.top,
					right:props.attributes.closeButtonPosition.right
				}),
				[
					props.attributes.closeButtonPosition.top,
					props.attributes.closeButtonPosition.right,
				]
			);
	
			const imageStyle = useMemo(
				() => ({
					width: props.attributes.K2modalImageWidth+'%',
					height: props.attributes.K2modalImageHeight+'rem',
					borderTopLeftRadius:  props.attributes.K2modalImageBorderRadius.top,
					borderTopRightRadius:  props.attributes.K2modalImageBorderRadius.right,
					borderBottomRightRadius:  props.attributes.K2modalImageBorderRadius.bottom,
					borderBottomLeftRadius:  props.attributes.K2modalImageBorderRadius.left,
					objectPosition: props.attributes.K2modalImagePosition
				}),
				[
					props.attributes.K2modalImageWidth,
					props.attributes.K2modalImageHeight ,
					props.attributes.K2modalImageBorderRadius.top,
					props.attributes.K2modalImageBorderRadius.right,
					props.attributes.K2modalImageBorderRadius.bottom,
					props.attributes.K2modalImageBorderRadius.left,
					props.attributes.modalIconPosition,
					props.attributes.modalIconTextGap,
					props.attributes.K2modalImagePosition
				]
			);
			const ModalBoxAlignmentStyles = useMemo(
				() => ({
					alignItems:props.attributes.K2ModalBoxAlignment,
				}),
				[
					props.attributes.K2ModalBoxAlignment,
				]
			);
		
			return ([
				<InspectorControls>
					<PanelBody>
						<SelectControl
							label="Modal Box Type"
							value={props.attributes.type}
							options={[
								{ label: 'Button', value: 'button' },
								{ label: 'Timed', value: 'time'},
								{label: 'Image', value:'image'}
							]}
							onChange={(value)=>{props.setAttributes({type:value})}}
						/>

						<SelectControl
							label="'Close' button position"
							value={props.attributes.closeButtonPosition.text}
							options={[
								{ label: 'Top Right', value: 'topright' },
								{ label: 'Top Left', value: 'topleft'}
							]}
							onChange={onCloseButtonPositionChange}
						/>
						<PanelRow>
							<div style={{paddingBottom: '2%'}}>
								<label><strong>Alignment</strong></label>
							</div>
							<div id = {'AlignmentIconsParent'} className={'k2-CB-inspector-control-alignment'} onClick={onChangeAlignmentIconChange}>

								<div className={'k2-CB-inspector-control-alignment-single'}  onClick={() => {props.setAttributes({K2ModalBoxAlignment:'flex-start'})}}>
									<span className="fa fa-align-left k2-CB-alignment-icon-style" ></span>
								</div>
								<div className={'k2-CB-inspector-control-alignment-single'} onClick={() => {props.setAttributes({K2ModalBoxAlignment:'center'})}}>
									<span className="fa fa-align-center k2-CB-alignment-icon-style k2-CB-active"></span>
								</div>
								<div className={'k2-CB-inspector-control-alignment-single'} onClick={() => {props.setAttributes({K2ModalBoxAlignment:'flex-end'})}}>
									<span className="fa fa-align-right k2-CB-alignment-icon-style"></span>
								</div>
							</div>
						</PanelRow>

					</PanelBody>
						{
							props.attributes.type == 'image' ?
								<div>
								<PanelBody title={__("Image")}>
									<Card>
										<CardBody>
											<MediaUpload
												accept = "image/*"
												allowedTypes={ [ 'image' ] }
												value={props.attributes.K2modalImage}
												onSelect={ onChangeK2modalImage }
												render={ ({open}) => {
													return <div style={{backgroundImage: 'url("' + props.attributes.K2modalImage + '")'}} className={'K2-testimonial-imageUpload-Block'}>
														<FontAwesomeIcon className='K2-testimonial-imageUpload-icon-Block' icon={faPlusCircle} onClick={open}/>
													</div>;
												}}
											/>
										</CardBody>
									</Card>
									<Card>
										<CardBody>
											<RangeControl
												label="width"
												value={props.attributes.K2modalImageWidth}
												onChange={onChangeK2modalImageWidth}
											/>
											<RangeControl 
												label="height"
												value={props.attributes.K2modalImageHeight}
												onChange={onChangeK2modalImageHeight}
											/>
											<BoxControl
												label="Border radius"
												value={props.attributes.K2modalImageBorderRadius}
												onChange={onChangeK2modalImageBorderRadius}
											/>
											<SelectControl
												label="Image position"
												value={props.attributes.K2modalImagePosition}
												options={[
													{ label: 'Center', value: 'center' },
													{ label: 'Top', value: 'top'},
													{ label: 'Bottom', value: 'bottom'}
												]}
												onChange={onChangeK2modalImagePosition}
											/>
										</CardBody>
									</Card>
								</PanelBody>
									
								</div>
							:null
						}
						{
							props.attributes.type == 'button' ?
								<div>
								<PanelRow>
									<ToggleControl 
										label={'Enable Icon'}
										checked={props.attributes.K2modalImageIconEnable}
										onChange ={onChangeK2modalImageIconEnable}
									/>
								</PanelRow>
								
								{
									props.attributes.K2modalImageIconEnable == true ?
									<PanelBody title={'Button Icon'}>
								
											<CardBody>
												<div className={'k2-CB-icon-list-wrapper'}>
														<CardHeader>Select Icon</CardHeader>
													<div id='k2-CB-icon-list-wrapper-id' className={'k2-CB-icon-list-sub-wrapper'}  onClickCapture={onChangeAlertIconActive}>
														{GLOBAL_ICONS.map((value, index) => {
															return <span className={'fa '+value}></span>
														})}
													</div>
												</div>
												
											</CardBody>
											<CardHeader>Icon Position</CardHeader>
											<CardBody>
												<SelectControl 
													options={[
														{label:'Before text', value:'row'},
														{label:'After text', value:'row-reverse'}
													]}
													onChange={onChangemodalIconPosition}
													value={props.attributes.modalIconPosition}

												/>
											</CardBody>
											<CardHeader>Icon Spacing</CardHeader>
											<CardBody>
												<RangeControl 
													value={props.attributes.modalIconTextGap}
													onChange={onChangemodalIconTextGap}
													step={0.5}
												/>
											</CardBody>		
									</PanelBody>
									:null

								}
								
								<PanelBody  title={'Button Text'}>
										<Card>
											<CardBody>
												<Flex>
													<ToggleControl 
														label="Enable Text"
														checked={props.attributes.EnableButtonText}
														onChange={onChangeEnableButtonText}
													/>
												</Flex>
												{
													props.attributes.EnableButtonText == true ?
													<div>
														<TextControl
																label={<strong>Text</strong>}
																onChange={(value)=>{props.setAttributes({buttonText:value})}}
																value = {props.attributes.buttonText}
														/>
														<ColorPopup 
																label={"Text Color"}
																value={{ value:props.attributes.textColor}}
																onChange = {onChangetextColor}
																PropertyName={"backgroundColor"}
														/>
														<RangeControl
															label= "Font size"
															value={ props.attributes.buttonTextSize }
															onChange={ (value)=>{props.setAttributes({buttonTextSize:value})} }
															min={ 0.1 }
															max={ 10 }
															step ={0.1}
														/>
														<Flex>
															<FlexItem>
																<SelectControl
																			label="Font Family"
																			value={props.attributes.textFontFamily}
																			options={GLOBAL_FONTS}
																			onChange={(value)=>{props.setAttributes({textFontFamily:value})}}
																/>
															</FlexItem>
															<FlexItem>
																<SelectControl
																	label="Weight"
																	value={ props.attributes.ModalButtonTextWeight}
																	options={ FontWeightAvaibles }
																	onChange={ onChangeModalButtonTextWeight}
																/>
															</FlexItem>
														</Flex>
													</div>

													: null
												}
											</CardBody>
										</Card>
								</PanelBody>
								{controls}
								</div>
							:null
						}
						{
							props.attributes.type == 'time' ?
								<PanelBody>

										<RangeControl
													label= "Popup delay (secs)"
													value={ props.attributes.popupDelay }
													onChange={ (value)=>{props.setAttributes({popupDelay:value})} }
													min={ 1 }
													max={ 10 }
													step ={1}
												/>
								</PanelBody>
							:null

						}
				</InspectorControls>

				,
				<div className={'k2-modal-container'} style={ModalBoxAlignmentStyles}>
					{(props.attributes.type == 'button') &&
						<button className={'k2-modal-button'} style = {buttonStyle}>
							{
								props.attributes.K2modalImageIconEnable == true ?
								<i className={props.attributes.ModalBoxIconType}></i>
								:null
							}
							
							{
								props.attributes.EnableButtonText == true ?
									<RichText 
										onChange={(value)=>{props.setAttributes({buttonText:value})}}
										value = {props.attributes.buttonText}
										tagName='span'
									/>
							:null
							}	
						</button>
					}
					{
						(props.attributes.type == 'image') &&
						<img src={props.attributes.K2modalImage} className='k2-modal-image' style={imageStyle} />
					}
					<div className="k2-modal-backend">
						<div className="k2-modal-content-backend">
							<InnerBlocks renderAppender={ () => (<InnerBlocks.ButtonBlockAppender/>) }/>
						</div>
						<div className="k2-modal-close" style={closeButtonStyle}>&times;</div>
					</div>
				</div>
			])
		}
	,
	save: function(props) {
		var buttonStyle = {
			backgroundColor: props.attributes.buttonColor,
			padding : props.attributes.buttonHeight+"em "+props.attributes.buttonWidth+"em",
			fontSize: props.attributes.buttonTextSize+"em",
			fontFamily:props.attributes.textFontFamily,
			fontWeight: props.attributes.ModalButtonTextWeight,
			color: props.attributes.textColor,
			flexDirection: props.attributes.modalIconPosition,
			gap: props.attributes.modalIconTextGap+'rem',
			borderRadius:props.attributes.buttonRadius+'rem'

		}
		var closeButtonStyle = {
			top:props.attributes.closeButtonPosition.top,
			right:props.attributes.closeButtonPosition.right
		}
		var imageStyle = {
			width: props.attributes.K2modalImageWidth+'%',
			height: props.attributes.K2modalImageHeight+'rem',
			borderTopLeftRadius:  props.attributes.K2modalImageBorderRadius.top,
			borderTopRightRadius:  props.attributes.K2modalImageBorderRadius.right,
			borderBottomRightRadius:  props.attributes.K2modalImageBorderRadius.bottom,
			borderBottomLeftRadius:  props.attributes.K2modalImageBorderRadius.left,
			objectPosition: props.attributes.K2modalImagePosition
		}
		var ModalBoxAlignmentStyles = {
			alignItems: props.attributes.K2ModalBoxAlignment
		}
		return (
		<div className={'k2-modal-container'} style={ModalBoxAlignmentStyles} data-type={props.attributes.type} data-time={props.attributes.popupDelay*1000}>
			{
				(props.attributes.type == 'button') &&
				<button className={'k2-modal-button'} style = {buttonStyle}>
				{
					props.attributes.K2modalImageIconEnable == true ?
						<i className={props.attributes.ModalBoxIconType}></i>
					:null
				}
				{
					props.attributes.EnableButtonText == true ?
						<RichText.Content tagName='span' value={props.attributes.buttonText} />
					:null
				}
				</button>
			}
			{
				(props.attributes.type == 'image') &&
				<img src={props.attributes.K2modalImage} className='k2-modal-image' style={imageStyle} />
			}
			<div className="k2-modal k2-modal-fade-in">
				<div className="k2-modal-content">
					<InnerBlocks.Content />
					<div className="k2-modal-close" style={closeButtonStyle}>&times;</div>
				</div>
			</div>
		</div>
	  );
	},
})
