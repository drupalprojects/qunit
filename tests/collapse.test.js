// $Id$

/**
 * @file
 * Tests for collapsible fieldsets.
 */

(function($) {

Drupal.tests.collapse = {
  getInfo: function() {
    return {
      'name': 'Collapsible fieldsets',
      'description': 'Tests collapsible fieldsets to make sure they collapse and uncollapse correctly.',
      'group': 'System'
    };
  },
  setup: function() {
    // Give the database 5 minutes to set up, then give up.
    // This takes about 1 minute for me, but slower computers might have more trouble.
    // Also gives a very reasonable amount of time to debug the script.
    stop(600000);
    Drupal.browser.init('CollapseTestCase', function() {
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
    var collapseDelay = 1000;

    // The first fieldset should be visible initially, but we should be able to
    // toggle it by clicking on the legend.
    ok($('#1').find('div.fieldset-wrapper').is(':visible'), Drupal.t('First fieldset is initially visible.'));
    ok($('#1').hasClass('collapsible'), Drupal.t('First fieldset has the "collapsible" class.'));
    ok(!$('#1').hasClass('collapsed'), Drupal.t('First fieldset does not have the "collapsed" class.'));
    // Trigger the collapse behavior by simulating a click.
    $('#1').find('legend a').click();
    stop();
    setTimeout(function() {
      ok($('#1').find('div.fieldset-wrapper').is(':hidden'), Drupal.t('First fieldset is not visible after being toggled.'));
      ok($('#1').hasClass('collapsible'), Drupal.t('First fieldset has the "collapsible" class after being toggled.'));
      ok($('#1').hasClass('collapsed'), Drupal.t('First fieldset has the "collapsed" class after being toggled.'));

      // Trigger the collapse behavior again by simulating a click.
      $('#1').find('legend a').click();
      setTimeout(function() {
        ok($('#1').find('div.fieldset-wrapper').is(':visible'), Drupal.t('First fieldset is visible after being toggled again.'));
        ok($('#1').hasClass('collapsible'), Drupal.t('First fieldset has the "collapsible" class after being toggled again.'));
        ok(!$('#1').hasClass('collapsed'), Drupal.t('First fieldset does not have the "collapsed" class after being toggled again.'));
        start();
      }, collapseDelay);
    }, collapseDelay);

    // The second fieldset should not do anything as it is not collapsible.
    ok($('#2').find('div.fieldset-wrapper').is(':visible'), Drupal.t('Second fieldset is initially visible.'));
    ok(!$('#2').hasClass('collapsible'), Drupal.t('Second fieldset does not have the "collapsible" class.'));
    ok(!$('#2').hasClass('collapsed'), Drupal.t('Second fieldset does not have the "collapsed" class.'));
    // After toggling, nothing should happen.
    $('#2').find('legend a').click();
    stop();
    setTimeout(function() {
      ok($('#2').find('div.fieldset-wrapper').is(':visible'), Drupal.t('Second fieldset is still visible after toggling.'));
      ok(!$('#2').hasClass('collapsible'), Drupal.t('Second fieldset still does not have the "collapsible" class after toggling.'));
      ok(!$('#2').hasClass('collapsed'), Drupal.t('Second fieldset still does not have the "collapsed" class after toggling.'));
      start();
    }, collapseDelay);

    // The third fieldset should be initially hidden, but we should be able to
    // toggle it by clicking on the legend.
    ok($('#3').find('div.fieldset-wrapper').is(':hidden'), Drupal.t('Third fieldset is not initially visible.'));
    ok($('#3').hasClass('collapsible'), Drupal.t('Third fieldset has the "collapsible" class.'));
    ok($('#3').hasClass('collapsed'), Drupal.t('Third fieldset has the "collapsed" class.'));
    // Trigger the collapse behavior by simulating a click.
    $('#3').find('legend a').click();
    stop();
    setTimeout(function() {
      ok($('#3').find('div.fieldset-wrapper').is(':visible'), Drupal.t('Third fieldset is visible after being toggled.'));
      ok($('#3').hasClass('collapsible'), Drupal.t('Third fieldset has the "collapsible" class after being toggled.'));
      ok(!$('#3').hasClass('collapsed'), Drupal.t('Third fieldset does not have the "collapsed" class after being toggled.'));
      $('#3').find('legend a').click();
      setTimeout(function() {
        // Trigger the collapse behavior again by simulating a click.
        ok($('#3').find('div.fieldset-wrapper').is(':hidden'), Drupal.t('Third fieldset is not visible after being toggled again.'));
        ok($('#3').hasClass('collapsible'), Drupal.t('Third fieldset has the "collapsible" class after being toggled again.'));
        ok($('#3').hasClass('collapsed'), Drupal.t('Third fieldset has the "collapsed" class after being toggled again.'));
        start();
      }, collapseDelay);
    }, collapseDelay);
  }
};

})(jQuery);
