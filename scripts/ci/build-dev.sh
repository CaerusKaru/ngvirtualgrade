#!/bin/bash

rsync -rp --delete --quiet dist $SSH_USER@$HOST:$DEV_PATH/server/. || exit 29
rsync -rp --delete --quiet package.json $SSH_USER@$HOST:$DEV_PATH/server/. || exit 29
rsync -rp --delete --quiet package-lock.json $SSH_USER@$HOST:$DEV_PATH/server/. || exit 29
