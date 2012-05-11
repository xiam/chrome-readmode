var cleaned = false;

function removeAttr(el, attrs) {
  for (var i = 0; i < attrs.length; i++) {
    el.removeAttribute(attrs[i]);
  };
};

function readerDisable() {
  if (cleaned) {
    location.reload();
  };
};

function readerEnable() {
  if (cleaned == false) {

    cleaned = true;

    document.body.className = 'reader';

    var scripts = document.querySelectorAll('script');
    var styles  = document.querySelectorAll('style');
    var links   = document.querySelectorAll('link[rel=stylesheet]');
    var iframes = document.querySelectorAll('iframe');

    for (var i = scripts.length - 1; i > -1; i--) {
      var el = scripts[i];
      el.parentNode.removeChild(el);
    };
    
    for (var i = styles.length - 1; i > -1; i--) {
      var el = styles[i];
      el.parentNode.removeChild(el);
    };
    
    for (var i = links.length - 1; i > -1; i--) {
      var el = links[i];
      el.parentNode.removeChild(el);
    };
    
    for (var i = iframes.length - 1; i > -1; i--) {
      iframes[i].parentNode.removeChild(iframes[i]);
    };
    
    var all     = document.querySelectorAll('*');
    
    removeAttr(document.body, [ 'color', 'bgcolor', 'text', 'link', 'vlink', 'alink' ]);

    for (var i = all.length - 1; i > -1; i--) {
      var el = all[i];
      removeAttr(el, [ 'face', 'size', 'color', 'background', 'border', 'bgcolor', 'width', 'height', 'style' ]);
    };

  };
};

chrome.extension.onRequest.addListener(function(req, from) {
  if (req == 'reader-disable') {
    readerDisable();  
  } else if (req == 'reader-enable') {
    readerEnable();
  };
});
