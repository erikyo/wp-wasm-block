#include <emscripten.h>
#include <stdio.h>

/**
 * It returns a the hello world in WordPress style.
 * 
 * @return A pointer to a string .
 */
EMSCRIPTEN_KEEPALIVE
char* hello() {
   return "Howdy, Wordpress!";
}

/**
 * It returns the nth Fibonacci number
 * 
 * @param n the number to calculate the fibonacci of
 * 
 * @return The nth fibonacci number.
 */
EMSCRIPTEN_KEEPALIVE
int fib(int n) {
	if(n <= 0){
		return 0;
	}
	int i, t, a = 0, b = 1;
	for (i = 1; i < n; i++) {
		t = a + b;
		a = b;
		b = t;
	}
	return b;
}
