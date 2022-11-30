/*
-------------------------------------------------------------------------------
Name: CW_DeleteAnimOnVisLayers.js

Description:	Delete keyframes on visible layers; keep things where they are at the first frame of the panel.

Usage:	 Select panels then launch the script.      
        
Author: Chadwick Whitehead bashed this together using bits from scripts by Lori Sponagle, Corey Barnes and Karl Olson.

Created: 2022/11/20

Version: 0.1.0

Website: chadwickw.com
-------------------------------------------------------------------------------
*/
function DeleteAnimOnVisLayers() {
	const SM = new SelectionManager();
	const panelIds = SM.getPanelSelection();
	if (panelIds.length <= 0) return;

	const LM = new LayerManager();
	const MM = new MotionManager();

	// Open Undo scope
	scene.beginUndoRedoAccum("Delete Animation on Visible Layers");

	for (const panelId of panelIds) {
		for (let layer = LM.numberOfLayers(panelId) - 1; layer >= 0; --layer) {
			if (LM.layerVisibility(panelId, layer)) {
				SM.setCurrentPanel(panelId);
				Action.perform("onActionGoToFirstFrame()");
				MM.setLayerAnimated(panelId, layer, false);
			}
		}
	}
	// Close Undo scope
	scene.endUndoRedoAccum();
}
