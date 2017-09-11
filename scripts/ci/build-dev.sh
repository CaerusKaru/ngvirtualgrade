#!/bin/bash

cd $TRAVIS_BUILD_DIR/public_html || exit 25
find . -type d -exec chmod g+rwx {} \; || exit 26
#chmod -R a+r . || exit 27
cd .. || exit 28
rsync -rp --delete --quiet dist $SSH_USER@$HOST:$DEV_PATH/server/. || exit 29
rsync -rp --delete --quiet dist-server $SSH_USER@$HOST:$DEV_PATH/server/. || exit 29
rsync -rp --delete --quiet package.json $SSH_USER@$HOST:$DEV_PATH/server/. || exit 29
rsync -rp --delete --quiet package-lock.json $SSH_USER@$HOST:$DEV_PATH/server/. || exit 29
rsync -rp --delete --quiet server.js $SSH_USER@$HOST:$DEV_PATH/server/. || exit 29
