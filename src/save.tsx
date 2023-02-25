/* adds the frontend styles to bundle */
import './style/style.scss';

import { useBlockProps } from '@wordpress/block-editor';
import type { BlockSaveProps } from '@wordpress/blocks';
import { useEffect, useState } from '@wordpress/element';

import { TextDef } from './types';

const imports = {
	env: {
		memory: new WebAssembly.Memory( { initial: 1 } ),
		STACKTOP: 0,
	},
};

/**
 * The save function defines the way in which the different attributes should be combined into the final markup, which is then serialized into post_content.
 *
 * @param    props
 * @param    props.attributes - the block attributes
 * @function Object() { [native code] }
 */
function Save( { attributes }: BlockSaveProps< TextDef > ): JSX.Element {

	let module;

	WebAssembly.instantiateStreaming( fetch( 'hello.wasm' ), imports ).then(
		( wasmModule ) => {
			module = wasmModule;
		}
	);

	const blockProps = useBlockProps.save( {
		className: 'block-wasm',
	} );

	return (
		<div { ...blockProps }>
			{ ' ' }
			{ attributes.message } { module?.instance.exports._hello }
		</div>
	);
}

export default Save;
