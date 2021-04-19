#!/bin/bash
shopt -s nullglob
gifs=(../nftimages/*)

for ((i=0; i<${#gifs[@]}; i++)); do
    #do something to each element of array
    ipfs add -q "${gifs[$i]}"
done