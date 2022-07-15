#!/bin/bash

find posts -type f -name '*.md' | while read file; do
  d=$(awk -v FS="date: " 'NF>1{print $2}' $file)
  # echo $d
  # echo $file
  newFileName=$(echo $file | sed -n "s/^\(.*\)\/\(.*\)\/.*/\1\/$d-\2.md/p")
  echo $newFileName
  mv $file $newFileName
done
