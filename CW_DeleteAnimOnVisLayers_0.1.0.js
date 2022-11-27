
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
function DeleteAnimOnVisLayers()
{
  var SM = new SelectionManager;
  var panels = SM.getPanelSelection();
  if ( panels.length <= 0 ) return;
  
  var LM = new LayerManager;
  var MM= new MotionManager();

  // Open Undo scope
  scene.beginUndoRedoAccum("Delete Animation on Visible Layers");

  for ( var p = 0; p < panels.length; ++ p )
  {
      var panel = panels[p];
       
      for ( var layer =  LM.numberOfLayers( panel ) - 1; layer >= 0; --layer )
      {
         if ( LM.layerVisibility( panel, layer ) == true )
         {
              SM.setCurrentPanel(panel);
              Action.perform("onActionGoToFirstFrame()");
              MM.setLayerAnimated( panel, layer, false);
         }
      }
  }
  // Close Undo scope
  scene.endUndoRedoAccum();

}