/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './style.scss';

/**
 * Internal dependencies
 */
import edit from './edit';
import save from './save';
import metadata from './block.json';
const {name, ...settings} = metadata;

var buttonBlockIcon=(
	<svg width={800} height={800} viewBox="0 0 800 800">
      <image
        x={161}
        y={343}
        width={477}
        height={111}
        xlinkHref="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAAd0AAABvCAMAAACeluqWAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAY1BMVEU2yGo2yGo2yGo2yGo2yGo2yGo2yGo2yGo2yGo2yGo2yGo2yGo2yGo2yGo2yGo2yGo2yGo2yGo2yGo2yGo2yGo2yGo2yGo2yGo2yGo2yGo2yGo2yGo2yGo2yGo2yGo2yGoAAAAcFDiVAAAAH3RSTlMABlam3/nz11VR21IDiVTj5Ftcq6zg+PLZB4qTlFP6t2bvfgAAAAFiS0dEILNrPYAAAAAJcEhZcwAALiMAAC4jAXilP3YAAAAHdElNRQfkBwYBERMA73gBAAABnUlEQVR42u3Wa07CABBF4amA1toWCsUHKu5/l1I0rIDJJCfnW8FNzp8bsWgeVuvNjxgen1ZtEzfPXfUg3Vn38t+2H6qnKMHQX+sal2lY4o7VK5RkvByqbfUIJdk1MVVvUJp9HKonKM0cx+oJSnOM1+oJSrOJ6gVKZF0y65JZl8y6ZNYlsy6ZdcmsS2ZdMuuSWZfMumTWJbMumXXJrEtmXTLrklmXzLpk1iWzLpl1yaxLZl0y65JZl8y6ZNYlsy6ZdcmsS2ZdMuuSWZfMumTWJbMumXXJrEtmXTLrklmXzLpk1iWzLpl1yaxLZl0y65JZl8y6ZNYlsy6ZdcmsS2ZdMuuSWZfMumTWJbMumXXJrEtmXTLrklmXzLpk1iWzLpl1yaxLZl0y65JZl8y6ZNYlsy6ZdcmsS2ZdMuuSWZfMumTWJbMumXXJrEtmXTLrksVb9QKl2cR79QSlOcaheoLSzDFVT1CafTTb6g1KsvuIaKtHKEkbF6fqFUpxWuJG/1m9Qwm++vjz3VVP0Z11Y9w007w+Vw/SnZzX89Rcu/4CtlcBl9E+D6EAAAAASUVORK5CYII="
      />
      <path fill="#fff" stroke="#040404" d="M322 390h156v17H322z" />
    </svg>
)

// const generateButtonID = () => 'gradient-button-S-' + uniqueId();
/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType( metadata.name, {
	/**
	 * @see ./edit.js
	 */
	...settings,
	icon: buttonBlockIcon,
	edit: edit,

	/**
	 * @see ./save.js
	 */
	save,
} );
