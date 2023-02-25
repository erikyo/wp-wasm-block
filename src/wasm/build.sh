#!/bin/bash

set -e

cd wasm

# COMPILE WASM
echo "======="
echo ""
echo "wasm"
echo ""
echo "======="
(
  time emcc -O3 -s WASM=1 \
    hello.c \
    -o hello.js
)


echo "================================================================================"
echo "=====                                                                      ====="
echo "=====                        Successfully completed                        ====="
echo "=====                                                                      ====="
echo "================================================================================"
