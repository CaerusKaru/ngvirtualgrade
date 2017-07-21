#!/bin/bash

cd public_html
find . -type d -exec chmod a+rx {} \;
chmod -R a+r .
cd ..
rsync -rp --delete --quiet public_html $SSH_USER@$HOST:$PROD_PATH
