/**
 * @preserve Polyfill (shim) for Event#stopImmediatePropagation, which is missing on the Android 2 browser.
 *
 * @author Matthew Caruana Galizia <mattcg@gmail.com>
 * @license MIT License
 */

/*jslint browser:true*/

if (!Event.prototype.stopImmediatePropagation) {
	(function() {
		'use strict';
		var addEventListener = Node.prototype.addEventListener, removeEventListener = Node.prototype.removeEventListener;

		Node.prototype.addEventListener = function(type, callback, capture) {
			if (type === 'click') {
				addEventListener.call(this, type, callback.hijackedCallback || (callback.hijackedCallback = function(event) {
					if (!event.immediatePropagationStopped) {
						callback(event);
					}
				}), capture);
			} else {
				addEventListener.call(this, type, callback, capture);
			}
		};

		Node.prototype.removeEventListener = function(type, callback, capture) {
			if (type === 'click') {
				removeEventListener.call(this, type, callback.hijackedCallback || callback, capture);
			} else {
				removeEventListener.call(this, type, callback, capture);
			}
		};
	}());

	Event.prototype.stopImmediatePropagation = function() {
		'use strict';
		this.immediatePropagationStopped = true;
		this.stopPropagation();
	};
}