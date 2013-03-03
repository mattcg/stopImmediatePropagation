# Polyfill for missing Event#stopImmediatePropagation #

The [stopImmediatePropagation](https://developer.mozilla.org/en-US/docs/DOM/event.stopImmediatePropagation) method can be called on the event object inside a listener to stop other listeners, of the same event type and registered on the same node, being called. Normally, [stopPropagation](https://developer.mozilla.org/en-US/docs/DOM/event.stopPropagation) only stops the event bubbling to parent elements.

The **Android 2** browser has missing support for this wonderful method, so I've extracted this shim from [FastClick](https://github.com/ftlabs/fastclick) and provided a standalone implementation in case anyone needs it.

## License ##

Copyright © 2012 [Matthew Caruana Galizia](http://twitter.com/mcaruanagalizia), licensed under a [Creative Commons Attribution 3.0 Unported (CC BY 3.0)](http://creativecommons.org/licenses/by/3.0/legalcode) license.
