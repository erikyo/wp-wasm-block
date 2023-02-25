import { decodeCharArray, getModule } from './wasmLoader';

export let api: any | null = null;

onload = () => {
	if ( ! api )
		getModule()
			.then( ( Module ) => {
				api = Module.exports;

				const msg = decodeCharArray(
					api.hello(),
					new Uint8Array( api.memory.buffer )
				);
				document.querySelectorAll( '.block-wasm' ).forEach( ( el ) => {
					el.value = msg;
				} );
			} )
			.catch( ( err ) => console.log( err ) );

	document.querySelectorAll( '.block-wasm input.button' ).forEach( ( el ) => {
		el.onclick = () => {
			const input = el.previousSibling;
			input.value = parseInt(api.fib( input.value ), 10);
		};
	} );
};
