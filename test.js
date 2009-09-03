// $Id$

(function($) {

/**
 * Provide a Drupal-specific wrapper for the QUnit JavaScript test framework.
 */
Drupal.tests = Drupal.tests || {};

Drupal.behaviors.runTests = {
  attach: function(context, settings) {
    var index;
    for (index in Drupal.tests) {
      var testCase = Drupal.tests[index];
      var info = testCase.getInfo();
      module(info.group, testCase);
      test(info.name, testCase.test);
    }
  }
};

Drupal.tests.helloWorld = {
  getInfo: function() {
    return {
      name: 'Hello, world',
      description: 'basic test',
      group: 'To be removed',
    };
  },
  test: function() {
    expect(1);
    ok(true, 'pass');
  }
}

})(jQuery);
