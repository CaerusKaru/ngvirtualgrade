#!/bin/bash

cd $TRAVIS_BUILD_DIR/public_html || exit 25
find . -type d -exec chmod a+rx {} \; || exit 26
chmod -R a+r . || exit 27
cd .. || exit 28
rsync -rp --delete --quiet public_html $USER@$HOST:$DEV_PATH || exit 29
