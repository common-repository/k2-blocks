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

var bannericon = (
	<svg width={800} height={800} viewBox="0 0 800 800" >
      <image
        data-name="Layer 0"
        x={61}
        y={215}
        width={678}
        height={370}
        xlinkHref="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAAqYAAAFyBAMAAADVEgUIAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAGFBMVEUUjZr///81xmw1xmwUjZost3j///8AAABkA86TAAAABHRSTlMAAAC9BkOpqwAAAAFiS0dEBxZhiOsAAAAJcEhZcwAALiMAAC4jAXilP3YAAAAHdElNRQfkBgcUNhNFG+UqAAADUElEQVR42u3aQQ0CQQAEwbOABEACBggBBQQcgH8JKFgelw7HJtUKJvWe5apVnXfDlq23zRrTPqZ9TPuY9jHtY9rHtI9pH9M+pn1M+5j2Me1j2se0j2kf0z6mfUz7mPYx7WPax7SPaR/TPqZ9TPuY9jHtY9rHtI9pH9M+pn1M+5j2Me1j2se0j2kf0z6mfUz7mPYx7WPadzkM2n8zvT007n4axnRlTPuY9jHtY9rHtI9pH9M+pn1M+5j2Me1j2se0j2kf0z6mfUz7mPYx7WPax7SPaR/TPqZ9TPuY9jHtY9rHtI9pH9M+pn1M+5j2Me1j2se0j2kf0z6mfUz7mPYx7WPax7SPaR/TPqZ9TPuY9jHtY9rHtI9pH9M+pn1M+5j2Me1j2se0j2kf0z6mfUz7mPYx7WPax7SPaR/TPqZ9TPuY9jHtY9rHtI9pH9M+pn1M+5j2Me1j2se0j2kf0z6mfUz7mPYx7WPax7SPaR/TPqZ9TPuY9jHtY9rHtI9pH9M+pn1M+5j2Me1j2se0j2kf0z6mfUz7mPYx7WPax7SPaR/TPqZ9TPuY9jHtY9rHtI9pH9M+pn1M+/7Y9Pn+ZS+mTJkyZcqUKVOmTJkyZcqUKVOmTJkyncZ02pj2Me1j2se0j2kf0z6mfUz7mPYx7WPax7SPaR/TPqZ9TPuY9jHtY9rHtI9pH9M+pn1M+5j2Me2byPR/D1JMmTJlypQpU6ZMmTJlypQpU6ZMmTJluq3pNDHtY9rHtI9pH9M+pn1M+5j2Me1j2se0j2kf0z6mfUz7mPYx7WPax7SPaR/TPqZ9TPuY9jHtY9rHtI9pH9M+pn1M+5j2Me1j2se0j2kf0z6mfUz7mPYx7WPax7SPaR/TPqZ9TPuY9jHtY9rHtI9pH9M+pn1M+5j2Me1j2se0j2kf0z6mfUz7mPYx7WPax7SPaR/TPqZ9TPuY9jHtY9rHtI9pH9M+pn1M+5j2Me1j2se075vpuONJq1p2w45bb5s1pn1M+5j2Me1j2se0j2kf0z6mfUz7mPYx7WPax7SPaR/TPqZ9TPuY9jHtY9rHtI9pH9M+pn1M+5j2Me1j2se0j2kf0z6mfUz7mPYx7WPax7SPaR/TPqZ9TPuY9jHtY9rHtO8DZkuWgFoIalwAAAAASUVORK5CYII="
      />
    </svg>
);

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
	icon: bannericon,
	edit: edit,

	/**
	 * @see ./save.js
	 */
	save,
} );
