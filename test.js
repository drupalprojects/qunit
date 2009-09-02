// $Id$

(function ($) {

/**
 * Provide a Drupal-specific wrapper for the QUnit JavaScript test framework.
 */
Drupal.tests = Drupal.tests || {};

Drupal.behaviors.runTests = {
  attach: function(context, settings) {
    var index;
    for (index in Drupal.tests) {
      var test = Drupal.tests[index];
      var info = test.getInfo();
      var title = Drupal.t('@name <div class="description">(@description)</div>', {'@name': info.name, '@description': info.description});
      module(info.group, test);
      test(title, test.test);
    }
  }
};

})();
