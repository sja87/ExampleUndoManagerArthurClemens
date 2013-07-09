function CrazyThings () { }

CrazyThings.prototype.myUndoManager = new UndoManager();

CrazyThings.prototype.doIt = function() {
		
	$('<div>', { 
	    id: 'firstDiv',
		style: 'width:200px;height:200px;background-color:#FFFF66;',
		class: 'ui-widget-content',
		text: 'Drag Me'
	}).appendTo('#container');
	
	$( "#firstDiv" ).draggable({
		stop: this.stopDrag(this, $( "#firstDiv" )),
		cursor: "move"
	});
	
	$('<div>', { 
	    id: 'secondDiv',
		style: 'width:200px;height:200px;background-color:cyan;',
		class: 'ui-widget-content',
		text: 'Drag Me'
	}).appendTo('#container');
	
	$( "#secondDiv" ).draggable({
		stop: this.stopDrag(this, $( "#secondDiv" )),
		cursor: "move"
	});
	
}


CrazyThings.prototype.stopDrag = function(myScope, element) {

	return function(e, ui){
		
		var offsetLeft = ui.offset.left - ui.position.left;
		var offsetTop = ui.offset.top - ui.position.top;

		myScope.myUndoManager.register(
			this, myScope.setNewPosition, [ui.originalPosition.left + offsetLeft, ui.originalPosition.top + offsetTop, element], 'Drag Undo',
			this, myScope.setNewPosition, [ui.position.left + offsetLeft, ui.position.top + offsetTop, element], 'Drag Redo'
		);
		
    }
}

CrazyThings.prototype.callUndo = function() {
	this.myUndoManager.undo();
}

CrazyThings.prototype.callRedo = function() {
	this.myUndoManager.redo();
}

CrazyThings.prototype.setNewPosition = function(left,top, element) {

	element.offset({ top: top, left: left });
	
}