#!/bin/bash

cd $TRAVIS_BUILD_DIR/public_html
find . -type d -exec chmod a+rx {} \;
chmod -R a+r .
cd ..
rsync -r --delete --quiet public_html $USER@$HOST:$DEV_PATH
