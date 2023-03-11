class bibShortcutInterceptor {
	
	constructor(){
		window.addEventListener("keyup", (_event) =>{
			this.shortcutHandler(_event);
		}, false);
	}
	
	shortcutHandler(e){
		if (e.ctrlKey && e.shiftKey && e.code === 'KeyB') {
			this.copyBibToClipboard();
		}
		if (e.ctrlKey && e.shiftKey && e.code === 'KeyV') {
			this.copyCitationToClipboard();
		}
	}
	getItems(){
		return Zotero.getActiveZoteroPane().getSelectedItems();
	}
	copyBibToClipboard(){
		//copied out of /chrome/content/zotero/fileInterface.js -> this.copyItemsToClipboard
		/**
		 * Copies HTML and text citations or bibliography entries for passed items in given style
		 *
		 * Does not check that items are actual references (and not notes or attachments)
		 *
		 * @param {Zotero.Item[]} items
		 * @param {String} style - Style id string (e.g., 'http://www.zotero.org/styles/apa')
		 * @param {String} locale - Locale (e.g., 'en-US')
		 * @param {Boolean} [asHTML=false] - Use HTML source for plain-text data
		 * @param {Boolean} [asCitations=false] - Copy citation cluster instead of bibliography
		 */
		
		//cslEngine = style.getCiteProc('en-US', 'html');
		//Zotero_File_Interface.copyItemsToClipboard(items, io.style, locale, false, io.mode === "citations");
		var items = this.getItems();
		
		Zotero_File_Interface.copyItemsToClipboard(items, 'http://www.zotero.org/styles/apa', 'en-US');
	}
	copyCitationToClipboard(){
		var items = this.getItems();
		Zotero_File_Interface.copyItemsToClipboard(items, 'http://www.zotero.org/styles/apa', 'en-US', false, true);
	}
}


var ShortcutTester = Zotero.ShortcutTester

if(typeof ShortcutTester == "undefined"){
	ShortcutTester = new bibShortcutInterceptor();
}
