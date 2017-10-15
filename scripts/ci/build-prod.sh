#!/bin/bash

rsync -rp --delete --quiet dist $SSH_USER@$HOST:$PROD_PATH/frontend/. || exit 29
rsync -rp --delete --quiet package.json $SSH_USER@$HOST:$PROD_PATH/frontend/. || exit 29
rsync -rp --delete --quiet package-lock.json $SSH_USER@$HOST:$PROD_PATH/frontend/. || exit 29
