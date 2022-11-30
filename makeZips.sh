#!/usr/bin/env bash

# Create CW_UnlinkShared_$VERSION.zip
VERSION=$(grep "^Version:" CW_UnlinkShared.js | sed -e 's/Version: //' | sed -e 's/\r//')
zip -r CW_UnlinkShared_$VERSION.zip CW_UnlinkShared.js script-icons/UnlinkShared.png

# Create CW_DeleteAnimOnVisLayers_$VERSION.zip
VERSION=$(grep "^Version:" CW_DeleteAnimOnVisLayers.js | sed -e 's/Version: //' | sed -e 's/\r//')
zip -r CW_DeleteAnimOnVisLayers_$VERSION.zip CW_DeleteAnimOnVisLayers.js script-icons/DeleteAnimOnVisLayers.png

