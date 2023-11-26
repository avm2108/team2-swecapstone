#!/bin/bash
echo "First arg: $1"
echo "Second arg: $2"
cp="cp android/app/build/outputs/bundle/release/app-release.aab ~/Desktop/$(date +%d_%m_%Y_%H_%M)_scooper_$1_$2.aab"

eval "$cp"
