/*
-------------------------------------------------------------------------------
Name:	CW_UnlinkShared.js

Description: Unlink shared drawings in the selected panels.

Usage: Select panels then launch the script.      
        
Author: Chadwick Whitehead bashed this together using bits from scripts by Lori Sponagle, Corey Barnes and Karl Olson.

Created: 2022/12/21

Version: 0.2.1

Website: chadwickw.com
-------------------------------------------------------------------------------
*/
function CW_UnlinkShared() {
	const SM = new SelectionManager();
	const panels = SM.getPanelSelection();
	if (panels.length <= 0) return;

	const LM = new LayerManager();

	// Open Undo scope
	scene.beginUndoRedoAccum("Unlinked Shared Drawings");

	for (var p = 0; p < panels.length; p++) {
		const panel = panels[p];
		SM.setCurrentPanel(panel);
		for (var i = LM.numberOfLayers(panel) - 1; i >= 0; i--) {
			const layerName = LM.layerName(panel, i);
			const selectedLayer = new Array(0);
			selectedLayer[0] = {
				layerIndex: i,
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
