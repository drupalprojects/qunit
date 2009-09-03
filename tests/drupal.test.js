// $Id$

(function($) {

/**
 * Test the Drupal.checkPlain function.
 */
Drupal.tests.checkPlainTest = {
  getInfo: function() {
    return {
      name: 'Check plain',
      description: 'Tests the Drupal.checkPlain() JavaScript function for properly escaping HTML.',
      group: 'System'
    };
  },
  test: function() {
    expect(9);

    // Test basic strings.
    equals(Drupal.checkPlain('test'), 'test', Drupal.t("Nothing gets replaced that doesn't need to be replaced with their escaped equivalent."));
    equals(Drupal.checkPlain('"test'), '&quot;test', Drupal.t('Quotes are replaced with their escaped equivalent.'));
    equals(Drupal.checkPlain('Test&1'), 'Test&amp;1', Drupal.t('Ampersands are replaced with their escaped equivalent.'));
    equals(Drupal.checkPlain('Test>test'), 'Test&gt;test', Drupal.t('Greater-than signs are replaced with their escaped equivalent.'));
    equals(Drupal.checkPlain('Test<test'), 'Test&lt;test', Drupal.t('Less-than signs are replaced with their escaped equivalent.'));

    // Test other data types.
    equals(Drupal.checkPlain(['ampers&', 'q"ote']), 'ampers&amp;,q&quot;ote', Drupal.t('Arrays that need to have replacements have them done.'));
    equals(Drupal.checkPlain(1), '1', Drupal.t('Integers are left at their equivalent string value.'));

    // Combined tests.
    equals(Drupal.checkPlain('<tagname property="value">Stuff</tagname>'), '&lt;tagname property=&quot;value&quot;&gt;Stuff&lt;/tagname&gt;', Drupal.t('Full HTML tags are replaced with their escaped equivalent.'));
    equals(Drupal.checkPlain('Test "&".'), 'Test &quot;&amp;&quot;.', Drupal.t('A string with both quotes and ampersands replaces those entities with their escaped equivalents.'));
  }
};

})(jQuery);
