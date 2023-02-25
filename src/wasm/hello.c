#include <emscripten.h>
#include <stdio.h>

EMSCRIPTEN_KEEPALIVE
int hello() {
    printf("Hello World\n");
    return 0;
}

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
