#!/bin/bash

echo "Starting build"

npm install --omit=dev

pushd client
npm install
npm run build
popd

echo "Build complete"