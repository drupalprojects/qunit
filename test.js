// $Id$

(function($) {

/**
 * Provide a Drupal-specific wrapper for the QUnit JavaScript test framework.
 */
Drupal.tests = Drupal.tests || {};
Drupal.dependencies = Drupal.dependencies || [];

Drupal.behaviors.runTests = {
  attach: function(context, settings) {
    var index;
    var loaded = 0;
    // Note: never register a dependency on drupal.js, it is loaded
    // automatically anyway and will send this into an infinite loop.
    for (index in Drupal.dependencies) {
      $.getScript(Drupal.dependencies[index](settings), function() {
        loaded++;
        if (loaded == Drupal.dependencies.length) {
          console.log('All loaded');
        }
      });
    }
    for (index in Drupal.tests) {
      var testCase = Drupal.tests[index];
      var info = testCase.getInfo();
      module(info.group, testCase);
      test(info.name, testCase.test);
    }
  }
};

})(jQuery);
