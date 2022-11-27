
/*
-------------------------------------------------------------------------------
Name:	CW_UnlinkShared.js

Description: Unlink shared drawings in the selected panels.

Usage: Select panels then launch the script.      
        
Author: Chadwick Whitehead bashed this together using bits from scripts by Lori Sponagle, Corey Barnes and Karl Olson.

Created: 2022/11/22

Version: 0.1.0

Website: chadwickw.com
-------------------------------------------------------------------------------
*/
function UnlinkedShared() 
{
    var SM = new SelectionManager;
    var panels = SM.getPanelSelection();
    if (panels.length <= 0) return;

    var LM = new LayerManager;

    // Open Undo scope
    scene.beginUndoRedoAccum("Unlinked Shared Drawings");

    for (var p = 0; p < panels.length; ++p) {
        var panel = panels[p];
        SM.setCurrentPanel(panel);
        for (var i = LM.numberOfLayers(panel) - 1; i >= 0; --i) {
            var layerName = LM.layerName(panel, i);
            var ind = i;
            var selectedLayer = new Array(0);
            selectedLayer[0] = {
                layerIndex: ind,
                name: layerName,
                panelId: panel,
            };
            SM.setLayerSelection(selectedLayer);
            Action.perform("onActionUnlinkFromSharedDrawing()");
        }
    }
    // Close Undo scope
    scene.endUndoRedoAccum();

}