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
      var testCase = Drupal.tests[index];
      var info = testCase.getInfo();
      module(info.group, testCase);
      test(info.name, testCase.test);
    }
  }
};

Drupal.testFrameGet = function () {
  var iframe = $('#qunit-test-iframe').get(0);
  iframe = (iframe.contentWindow || iframe.contentDocument);
  if (iframe.document) {
    iframe = iframe.document;
  }
  return iframe.body;
};

Drupal.browser.init = function(classname, fn) {
  Drupal.browser.acquireLock(function() {
    result = $.post(Drupal.settings.basePath + '?q=qunit/ajax/' + classname + '/setUp', {'token': Drupal.settings.formToken}, function(data) {
      document.cookie = 'simpletest_db_prefix=' + data.dbPrefix;
      fn();
    });
  });
};

Drupal.browser.get = function(dest, fn) {
  $('#qunit-test-iframe').attr('src', Drupal.settings.basePath + '?q=' + dest);
  $('#qunit-test-iframe').load(function() {
    Drupal.browser.parent$ = $;
    Drupal.browser.$ = $(this).get(0).contentWindow.jQuery;
    fn();
  });
}

Drupal.browser.exit = function(classname, fn) {
  document.cookie = 'simpletest_db_prefix=';
  if (Drupal.browser.parent$ !== undefined) {
    $ = jQuery = Drupal.browser.parent$;
    Drupal.browser.parent$ = undefined;
  }
  $.post(Drupal.settings.basePath + '?q=qunit/ajax/' + classname + '/tearDown', {'token': Drupal.settings.formToken}, function(data) {
    fn();
  });
  Drupal.browser.releaseLock();
};

Drupal.browser.acquireLock = function(fn) {
  if (Drupal.browser.lock == false) {
    Drupal.browser.lock = true;
    if (fn) {
      fn();
    }
  }
  setTimeout(Drupal.browser.acquireLock, 1000);
}

Drupal.browser.releaseLock = function(fn) {
  Drupal.browser.lock = false;
}

})(jQuery);
