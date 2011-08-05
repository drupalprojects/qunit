(function($) {

/**
 * Provide a Drupal-specific wrapper for the QUnit JavaScript test framework.
 */
Drupal.tests = Drupal.tests || {};
Drupal.browser = Drupal.browser || {};
Drupal.browser.lock = Drupal.browser.lock || false;

Drupal.behaviors.toggleIframe = {
  attach: function(context, settings) {
    $('#qunit-test-iframe', context).before('<input id="qunit-iframe-toggle" type="button" value="' + Drupal.t('Show/hide test frame') + '" />');
    $('#qunit-iframe-toggle').click(function() {
      $('#qunit-test-iframe').toggleClass('visible');
      return false;
    });
  }
};

Drupal.behaviors.runTests = {
  attach: function(context, settings) {
    var index;
    var loaded = 0;
    for (index in Drupal.tests) {
      Drupal.tests[index].run();
    }
  }
};

Drupal.Test = function() {
  this.run = function() {
    module(this.getInfo().group, this);
    test(this.getInfo().name, this.test);
  }
}

/**
 * Stub class for unit tests.
 */
Drupal.UnitTest = function() {
}
Drupal.UnitTest.prototype = Drupal.Test;

/**
 * Stub class for web tests.
 */
Drupal.WebTest = function() {
  this.Browser = new Drupal.Browser();
}
Drupal.WebTest.prototype = Drupal.Test;

/**
 * Reusable Drupal iframe browser class.
 */
Drupal.Browser = function() {
  var iframe = $('#qunit-test-iframe').get(0);
  iframe = (iframe.contentWindow || iframe.contentDocument);
  if (iframe.document) {
    iframe = iframe.document;
  }
  this.testFrame = iframe.body;
  this.init = function(classname, fn) {
    this.Lock.acquire(function() {
      result = $.post(Drupal.settings.basePath + '?q=qunit/ajax/' + classname + '/setUp', {'token': Drupal.settings.formToken}, function(data) {
        document.cookie = 'simpletest_db_prefix=' + data.dbPrefix;
        fn();
      });
    });
  };
  this.get = function(dest, fn) {
    $('#qunit-test-iframe').attr('src', Drupal.settings.basePath + '?q=' + dest);
    $('#qunit-test-iframe').load(function() {
      this.parent$ = $;
      $ = jQuery = $(this).get(0).contentWindow.jQuery;
      fn();
    });
  };
  this.exit = function(classname, fn) {
    document.cookie = 'simpletest_db_prefix=';
    if (Drupal.browser.parent$ !== undefined) {
      $ = jQuery = Drupal.browser.parent$;
      Drupal.browser.parent$ = undefined;
    }
    $.post(Drupal.settings.basePath + '?q=qunit/ajax/' + classname + '/tearDown', {'token': Drupal.settings.formToken}, function(data) {
      fn();
    });
    this.Lock.release();
  };
};

/**
 * Reusable Drupal Lock class.
 */
Drupal.Lock = function(waitTime) {
  this.locked = false;
  this.waitTime = waitTime || 1000;
  this.acquire = function(fn) {
    if (this.locked == false) {
      this.locked = true;
      if (fn) {
        fn();
      }
    }
    setTimeout(function() {
      this.acquire(fn);
    }, this.waitTime);
  };
  this.release = function(fn) {
    this.locked = false;
    fn();
  };
}

})(jQuery);
