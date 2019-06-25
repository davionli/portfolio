// JS for interactive keyboard fun...
var $key = function (key) { return (document.querySelector("kbd[data-key='" + key + "'], kbd[data-alt='" + key + "']")); };
var codeToElement = {
    'CapsLock': $key('caps'),
    'Space': $key('space'),
    'Backslash': document.getElementById('backslash'),
    'Quote': document.getElementById('quote'),
    'ShiftLeft': $key('lshift'),
    'ShiftRight': $key('rshift'),
    'ControlLeft': $key('lctrl'),
    'ControlRight': $key('rctrl'),
    'AltLeft': $key('lalt'),
    'AltRight': $key('ralt'),
    'MetaLeft': $key('lwin'),
    'MetaRight': $key('rwin'),
};
window.addEventListener('keydown', function (e) {
    console.log(e);
    var el = codeToElement[e.code] || $key(e.key.toLowerCase());
    if (el) {
        el.classList.add('pressed');
        e.preventDefault();
    }
});
window.addEventListener('keyup', function (e) {
    var el = codeToElement[e.code] || $key(e.key.toLowerCase());
    if (el) {
        el.classList.remove('pressed');
        e.preventDefault();
    }
});
