// $Id$

/**
 * @file
 * Tests for collapsible fieldsets.
 */

(function($) {

Drupal.tests.autocomplete = {
  getInfo: function() {
    return {
      'name': 'User autocomplete',
      'description': 'Tests to make sure autocomplete works properly.',
      'group': 'System'
    };
  },
  setup: function() {
    // Give the database 5 minutes to set up, then give up.
    // This takes about 1 minute for me, but slower computers might have more trouble.
    // Also gives a very reasonable amount of time to debug the script.
    stop(600000);
    Drupal.browser.init('AutocompleteTestCase', function() {
      Drupal.browser.get('qunit/test', function() {
        $ = Drupal.browser.$;
        start();
      });
    });
  },
  teardown: function() {
    Drupal.browser.exit('CollapseTestCase', function() {
      $ = Drupal.browser.parent$;
    });
  },
  test: function() {
    equals($('#edit-name').length, 1);
    /* @TODO. This test right now is just a Proof of Concept for the iframe locking mechanism. */
  }
};

})(jQuery);
