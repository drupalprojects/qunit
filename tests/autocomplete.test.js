// $Id$

/**
 * @file
 * Tests for collapsible fieldsets.
 */

(function($) {

Drupal.tests.Autocomplete = function() {
};

Drupal.tests.Autocomplete.prototype = new Drupal.WebTest;

Drupal.tests.Autocomplete.prototype.getInfo = function() {
  return {
    'name': 'User autocomplete',
    'description': 'Tests to make sure autocomplete works properly.',
    'group': 'System'
  };
};

Drupal.tests.Autocomplete.prototype.setup = function() {
  // Give the database 5 minutes to set up, then give up.
  // This takes about 1 minute for me, but slower computers might have more trouble.
  // Also gives a very reasonable amount of time to debug the script.
  stop(600000);
  var self = this;
  this.Browser.init('AutocompleteTestCase', function() {
    self.Browser.get('qunit/test', function(child$) {
      self.child$ = child$;
      start();
    });
  });
};

Drupal.tests.Autocomplete.prototype.test = function() {
  var $ = this.child$;
  equals($('#edit-name').length, 1);
  /* @TODO. This test right now is just a Proof of Concept for the iframe locking mechanism. */
};


Drupal.tests.Autocomplete.prototype.teardown = function() {
  this.Browser.exit('AutocompleteTestCase');
};

})(jQuery);
