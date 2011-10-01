/**
 * Provide a Drupal-specific wrapper for the QUnit JavaScript test framework.
 */

Drupal.tests = Drupal.tests || {};

Drupal.behaviors.runTests = function(context) {
  var index,
      loaded = 0,
      testNotRun = true;

  //loop through implemented tests
  for (index in Drupal.tests) {
    var testCase = Drupal.tests[index],
      info = testCase.getInfo();

    //the actual magic running tests
    var execute = function () {
      testNotRun = false;
      module(info.group, testCase);
      test(info.name, testCase.test);
    }

    //run the appropriate tests
    if ('qunitset' in Drupal.settings) {
      if ($.inArray(info.group, Drupal.settings.qunitset) != -1) {
        execute();
      }
    }
    else { //run all tests
      execute();
    }
  }

  //notify the user that their tests weren't found.
  if (testNotRun && 'qunitset' in Drupal.settings) {
    var error = Drupal.t('Tests for, "%test" not found!\n',
        { '%test' :  Drupal.settings.qunitset });
    $('div.qunit-drupal-messages').append(error);
  }
}
