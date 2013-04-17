/**
 * Polyfill (shim) for Event#stopImmediatePropagation, which is missing on the Android 2 browser.
 *
 * @overview
 * @author Matthew Caruana Galizia <m@m.cg>
 * @license MIT
 * @copyright Copyright (c) 2012, Matthew Caruana Galizia
 * @version 0.2.0
 * @preserve
 */

/*jslint browser:true*/

if (!Event.prototype.stopImmediatePropagation) {
	(function() {
		'use strict';
		var addEventListener = Node.prototype.addEventListener, removeEventListener = Node.prototype.removeEventListener;

		Node.prototype.addEventListener = function(type, callback, capture) {
			addEventListener.call(this, type, callback.hijackedCallback || (callback.hijackedCallback = function(event) {
				if (!event.immediatePropagationStopped) {
					callback(event);
				}
			}), capture);
		};

		Node.prototype.removeEventListener = function(type, callback, capture) {
			removeEventListener.call(this, type, callback.hijackedCallback || callback, capture);
		};
	}());

	Event.prototype.stopImmediatePropagation = function() {
		'use strict';
		this.immediatePropagationStopped = true;
		this.stopPropagation();
	};
}