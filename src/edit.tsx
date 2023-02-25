import loader from '@assemblyscript/loader';
import { useBlockProps } from '@wordpress/block-editor';
import type { BlockEditProps } from '@wordpress/blocks';
import { Button, TextControl } from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

import { TextDef } from './types';

function decodeCharArray( test, buffer ) {
	let mytext = '';
	for ( let i = test; buffer[ i ]; i++ ) {
		mytext += String.fromCharCode( buffer[ i ] );
	}
	return mytext;
}

export function loadModule() {}

/**
 * The edit function describes the structure of your block in the context of the editor.
 *
 * @param props
 * @param props.attributes    - the block attributes
 * @param props.setAttributes - the setState function
 *
 */
export default function Edit( {
	attributes,
	setAttributes,
}: BlockEditProps< TextDef > ): JSX.Element {
	let api = null;
	const [ message, setMessage ] = useState( 'no message' );
	const [ value, setValue ] = useState( attributes.num );

	useEffect( () => {
		async function getModule() {
			return loader
				.instantiate(
					fetch(
						'http://localhost:8888/wp-content/plugins/wasm-block/build/hello.wasm'
					),
					{}
				)
				.then( ( module ) => {
					console.log( 'wasm module loaded' );

					const msg = decodeCharArray(
						module.exports.hello(),
						new Uint8Array( module.exports.memory.buffer )
					);
					setMessage( msg + attributes.message );
					return module.exports.fib;
				} );
		}

		api = getModule();
	}, [] );

	return (
		<div { ...useBlockProps() }>
			<TextControl
				label={ __( 'Message', 'boilerplate' ) }
				value={ message }
				onChange={ ( val ) =>
					setAttributes( { message: val.toString() } )
				}
			/>

			<TextControl label="input-fibonacci" value={ value } />

			<Button
				text={ 'Apply fibonacci' }
				variant="secondary"
				onClick={ () => setValue( api( value ) ) }
			/>
		</div>
	);
}
