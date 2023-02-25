import loader from '@assemblyscript/loader';

export function decodeCharArray( test, buffer ) {
	let mytext = '';
	for ( let i = test; buffer[ i ]; i++ ) {
		mytext += String.fromCharCode( buffer[ i ] );
	}
	return mytext;
}

export async function getModule() {
	return loader
		.instantiate(
			fetch(
				'http://localhost:8888/wp-content/plugins/wp-wasm-block/build/hello.wasm'
			),
			{}
		)
		.then( ( module ) => module );
}
