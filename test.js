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
      test(info.name + '<span style="display: none;">' + info.description + '</span>', testCase.test);
    }

    // After we've finished running all of them, they should be on the page, so
    // send a post request back to Drupal.
    setTimeout(function() {
      $('#tests').find('> li').each(function() {
        data = {};
        data.group = $(this).find('> strong').get(0).innerHTML.match(/(.*) module: <span>/)[1];
        data.name = $(this).find('> strong > span').get(0).innerHTML.match(/(.*)<span style="display: none;">/)[1];
        data.description = $(this).find('> strong > span').get(0).innerHTML.match(/<span style="display: none;">(.*)<\/span>/)[1];
        index = 0;
        $(this).find('> ol > li').each(function() {
          data['assertions[' + index + '][status]'] = $(this).hasClass('pass');
          data['assertions[' + index + '][message]'] = this.innerHTML;
          index++;
        });
        $.post(Drupal.settings.basePath + '?q=simpletest/javascript-callback', data);
      });
    }, 100);
  }
};

})(jQuery);
