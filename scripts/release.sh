#!/bin/bash

while [[ "$#" > 0 ]]; do case $1 in
  -r|--release) release="$2"; shift;;
  -b|--branch) branch="$2"; shift;;
  *) echo "Unknown parameter passed: $1"; exit 1;;
esac; shift; done

# Default as minor, the argument major, minor or patch:
if [ -z "$release" ]; then
    release="1.0.0";
    # release="patch";
fi

# Default release branch is main
if [ -z "$branch" ] ; then
    branch="main";
fi;


echo "Branch is $branch"
echo "Release as $release"

# Tag prefix
prefix="v"

git pull origin $branch
echo "Current pull origin $branch."

# Generate version number and tag
standard-version -r $release --tag-prefix $prefix --infile CHANGELOG.md

git push --follow-tags origin $branch && npm publish

echo "Release finished."
