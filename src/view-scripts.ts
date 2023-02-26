import { decodeCharArray, instantiateModule } from './wasmLoader';

export let api: any | null = null;

/* When the page is loaded fetch the wasm module. */
onload = () => {
	if ( ! api )
		instantiateModule()
			.then( ( Module ) => {
				/* store the exported functions into an object */
				api = Module.exports;

				/* Convert the array buffer into chars */
				const msg = decodeCharArray(
					api.hello(),
					new Uint8Array( api.memory.buffer )
				);

				/* set the inner text of the p with the value provided with the wasm hello function  */
				document
					.querySelectorAll( '.block-wasm p' )
					.forEach( ( el ) => {
						el.innerHTML = msg;
					} );
			} )
			.catch( ( err ) => console.log( err ) );

	/* On click get the value of the input and for each one... */
	document.querySelectorAll( '.block-wasm input.button' ).forEach( ( el ) => {
		/* ...set the value of the input to the value of the fibonacci function. */
		el.onclick = () => {
			const input = el.previousSibling;
			input.value = parseInt( api.fib( input.value ), 10 );
		};
	} );
};
