/**
 * It takes a buffer and a starting position and returns a string of characters from the buffer until
 * it reaches a null character
 *
 * @param test   - The index of the first character in the buffer.
 * @param buffer - the buffer to read from
 * @return A string of characters.
 */
export function decodeCharArray( test, buffer ) {
	let mytext = '';
	for ( let i = test; buffer[ i ]; i++ ) {
		mytext += String.fromCharCode( buffer[ i ] );
	}
	return mytext;
}

/**
 * It fetches the wasm file, instantiates it, and returns the module
 *
 * @return A promise that resolves to a module.
 */
export async function instantiateModule() {
	const importObject = {
		imports: { imported_func: ( arg ) => console.log( arg ) },
	};

	return WebAssembly.compileStreaming(
		fetch( '/wp-content/plugins/wp-wasm-block/src/wasm/hello.wasm' )
	).then( ( module ) => WebAssembly.instantiate( module, importObject ) );
}
