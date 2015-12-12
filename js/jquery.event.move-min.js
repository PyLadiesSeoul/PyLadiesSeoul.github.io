// jquery.event.move
//
// 1.3.1
//
// Stephen Band
//
// Triggers 'movestart', 'move' and 'moveend' events after
// mousemoves following a mousedown cross a distance threshold,
// similar to the native 'dragstart', 'drag' and 'dragend' events.
// Move events are throttled to animation frames. Move event objects
// have the properties:
//
// pageX:
// pageY:   Page coordinates of pointer.
// startX:
// startY:  Page coordinates of pointer at movestart.
// distX:
// distY:  Distance the pointer has moved since movestart.
// deltaX:
// deltaY:  Distance the finger has moved since last event.
// velocityX:
// velocityY:  Average velocity over last few events.
!function(a){"function"==typeof define&&define.amd?// AMD. Register as an anonymous module.
define(["jquery"],a):// Browser globals
a(jQuery)}(function(a,b){// Constructors
function c(a){function b(){d?(c(),M(b),e=!0,d=!1):e=!1}var c=a,d=!1,e=!1;this.kick=function(){d=!0,e||b()},this.end=function(a){var b=c;a&&(// If the timer is not running, simply call the end callback.
e?(c=d?function(){b(),a()}:a,d=!0):a())}}// Functions
function d(){return!0}function e(){return!1}function f(a){a.preventDefault()}function g(a){// Don't prevent interaction with form elements.
N[a.target.tagName.toLowerCase()]||a.preventDefault()}function h(a){// Ignore mousedowns on any button other than the left (or primary)
// mouse button, or when a modifier key is pressed.
return 1===a.which&&!a.ctrlKey&&!a.altKey}function i(a,b){var c,d;if(a.identifiedTouch)return a.identifiedTouch(b);for(// touchList.identifiedTouch() does not exist in
// webkit yet… we must do the search ourselves...
c=-1,d=a.length;++c<d;)if(a[c].identifier===b)return a[c]}function j(a,b){var c=i(a.changedTouches,b.identifier);// This isn't the touch you're looking for.
if(c&&(c.pageX!==b.pageX||c.pageY!==b.pageY))return c}// Handlers that decide when the first movestart is triggered
function k(a){var b;h(a)&&(b={target:a.target,startX:a.pageX,startY:a.pageY,timeStamp:a.timeStamp},J(document,O.move,l,b),J(document,O.cancel,m,b))}function l(a){var b=a.data;s(a,b,a,n)}function m(){n()}function n(){K(document,O.move,l),K(document,O.cancel,m)}function o(a){var b,c;// Don't get in the way of interaction with form elements.
N[a.target.tagName.toLowerCase()]||(b=a.changedTouches[0],// iOS live updates the touch objects whereas Android gives us copies.
// That means we can't trust the touchstart object to stay the same,
// so we must copy the data. This object acts as a template for
// movestart, move and moveend event objects.
c={target:b.target,startX:b.pageX,startY:b.pageY,timeStamp:a.timeStamp,identifier:b.identifier},// Use the touch identifier as a namespace, so that we can later
// remove handlers pertaining only to this touch.
J(document,P.move+"."+b.identifier,p,c),J(document,P.cancel+"."+b.identifier,q,c))}function p(a){var b=a.data,c=j(a,b);c&&s(a,b,c,r)}function q(a){var b=a.data,c=i(a.changedTouches,b.identifier);c&&r(b.identifier)}function r(a){K(document,"."+a,p),K(document,"."+a,q)}// Logic for deciding when to trigger a movestart.
function s(a,b,c,d){var e=c.pageX-b.startX,f=c.pageY-b.startY;// Do nothing if the threshold has not been crossed.
I*I>e*e+f*f||v(a,b,c,e,f,d)}function t(){// this._handled should return false once, and after return true.
return this._handled=d,!1}function u(a){a._handled()}function v(a,b,c,d,e,f){{var g,h;b.target}g=a.targetTouches,h=a.timeStamp-b.timeStamp,// Create a movestart object with some special properties that
// are passed only to the movestart handlers.
b.type="movestart",b.distX=d,b.distY=e,b.deltaX=d,b.deltaY=e,b.pageX=c.pageX,b.pageY=c.pageY,b.velocityX=d/h,b.velocityY=e/h,b.targetTouches=g,b.finger=g?g.length:1,// The _handled method is fired to tell the default movestart
// handler that one of the move events is bound.
b._handled=t,// Pass the touchmove event so it can be prevented if or when
// movestart is handled.
b._preventTouchmoveDefault=function(){a.preventDefault()},// Trigger the movestart event.
L(b.target,b),// Unbind handlers that tracked the touch or mouse up till now.
f(b.identifier)}// Handlers that control what happens following a movestart
function w(a){var b=a.data.event,c=a.data.timer;C(b,a,a.timeStamp,c)}function x(a){var b=a.data.event,c=a.data.timer;y(),D(b,c,function(){// Unbind the click suppressor, waiting until after mouseup
// has been handled.
setTimeout(function(){K(b.target,"click",e)},0)})}function y(){K(document,O.move,w),K(document,O.end,x)}function z(a){var b=a.data.event,c=a.data.timer,d=j(a,b);d&&(// Stop the interface from gesturing
a.preventDefault(),b.targetTouches=a.targetTouches,C(b,d,a.timeStamp,c))}function A(a){var b=a.data.event,c=a.data.timer,d=i(a.changedTouches,b.identifier);// This isn't the touch you're looking for.
d&&(B(b),D(b,c))}function B(a){K(document,"."+a.identifier,z),K(document,"."+a.identifier,A)}// Logic for triggering move and moveend events
function C(a,b,c,d){var e=c-a.timeStamp;a.type="move",a.distX=b.pageX-a.startX,a.distY=b.pageY-a.startY,a.deltaX=b.pageX-a.pageX,a.deltaY=b.pageY-a.pageY,// Average the velocity of the last few events using a decay
// curve to even out spurious jumps in values.
a.velocityX=.3*a.velocityX+.7*a.deltaX/e,a.velocityY=.3*a.velocityY+.7*a.deltaY/e,a.pageX=b.pageX,a.pageY=b.pageY,d.kick()}function D(a,b,c){b.end(function(){return a.type="moveend",L(a.target,a),c&&c()})}// jQuery special event definition
function E(){// Don't bind to the DOM. For speed.
// Stop the node from being dragged
//add(this, 'dragstart.move drag.move', preventDefault);
// Prevent text selection and touch interface scrolling
//add(this, 'mousedown.move', preventIgnoreTags);
// Tell movestart default handler that we've handled this
return J(this,"movestart.move",u),!0}function F(){// Don't bind to the DOM. For speed.
return K(this,"dragstart drag",f),K(this,"mousedown touchstart",g),K(this,"movestart",u),!0}function G(a){// We're not interested in preventing defaults for handlers that
// come from internal move or moveend bindings
"move"!==a.namespace&&"moveend"!==a.namespace&&(// Stop the node from being dragged
J(this,"dragstart."+a.guid+" drag."+a.guid,f,b,a.selector),// Prevent text selection and touch interface scrolling
J(this,"mousedown."+a.guid,g,b,a.selector))}function H(a){"move"!==a.namespace&&"moveend"!==a.namespace&&(K(this,"dragstart."+a.guid+" drag."+a.guid),K(this,"mousedown."+a.guid))}var// Number of pixels a pressed pointer travels before movestart
// event is fired.
I=6,J=a.event.add,K=a.event.remove,// Just sugar, so we can have arguments in the same order as
// add and remove.
L=function(b,c,d){a.event.trigger(c,d,b)},// Shim for requestAnimationFrame, falling back to timer. See:
// see http://paulirish.com/2011/requestanimationframe-for-smart-animating/
M=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(a){return window.setTimeout(function(){a()},25)}}(),N={textarea:!0,input:!0,select:!0,button:!0},O={move:"mousemove",cancel:"mouseup dragstart",end:"mouseup"},P={move:"touchmove",cancel:"touchend",end:"touchend"};a.event.special.movestart={setup:E,teardown:F,add:G,remove:H,_default:function(a){var d,f;// If no move events were bound to any ancestors of this
// target, high tail it out of here.
a._handled()&&(d={target:a.target,startX:a.startX,startY:a.startY,pageX:a.pageX,pageY:a.pageY,distX:a.distX,distY:a.distY,deltaX:a.deltaX,deltaY:a.deltaY,velocityX:a.velocityX,velocityY:a.velocityY,timeStamp:a.timeStamp,identifier:a.identifier,targetTouches:a.targetTouches,finger:a.finger},f={event:d,timer:new c(function(){L(a.target,d)})},a.identifier===b?(// We're dealing with a mouse
// Stop clicks from propagating during a move
J(a.target,"click",e),J(document,O.move,w,f),J(document,O.end,x,f)):(// We're dealing with a touch. Stop touchmove doing
// anything defaulty.
a._preventTouchmoveDefault(),J(document,P.move+"."+a.identifier,z,f),J(document,P.end+"."+a.identifier,A,f)))}},a.event.special.move={setup:function(){// Bind a noop to movestart. Why? It's the movestart
// setup that decides whether other move events are fired.
J(this,"movestart.move",a.noop)},teardown:function(){K(this,"movestart.move",a.noop)}},a.event.special.moveend={setup:function(){// Bind a noop to movestart. Why? It's the movestart
// setup that decides whether other move events are fired.
J(this,"movestart.moveend",a.noop)},teardown:function(){K(this,"movestart.moveend",a.noop)}},J(document,"mousedown.move",k),J(document,"touchstart.move",o),// Make jQuery copy touch event properties over to the jQuery event
// object, if they are not already listed. But only do the ones we
// really need. IE7/8 do not have Array#indexOf(), but nor do they
// have touch events, so let's assume we can ignore them.
"function"==typeof Array.prototype.indexOf&&!function(a){for(var b=["changedTouches","targetTouches"],c=b.length;c--;)-1===a.event.props.indexOf(b[c])&&a.event.props.push(b[c])}(a)});