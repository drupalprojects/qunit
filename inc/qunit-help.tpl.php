<?php
/**
 * @file Template file for help page rendered /admin/help/qunit
 *
 * @see template_preprocess_qunit_help().
 * Some preprocessed and otherwise available variables:
 * - screenshot_img: The <img /> output to provide a screenshot.
 * - copy: an array of translated texts to be printed
 *   - overview_and_admin_use:
 *   - permissions:
 *   - including_tests:
 *   - example:
 *   - writing_tests:
 *   - drupal_7:
 */
?>

<h2><?php print t('Overview and Admin Use');?></h2>

<p><?php print $copy['overview_and_admin_use'];?></p>

<?php print $screenshot_img; ?>

<h2><?php print t('Tests Development and Deployment'); ?></h2>

<h3><?php print t('Permissions'); ?></h3>

<p><?php print $copy['permissions'];?></p>

<h3><?php print t('Including Tests'); ?></h3>

<p><?php print $copy['including_tests'];?></p>

<h4><?php print t('Example "mymodule"'); ?></h4>
<p><?php print $copy['example'];?></p>

<h5><?php print t('In your module source'); ?></h5>
<pre>
  <code class="php-example">
  /**
   * @file mymodule.module
   */

  /**
   * Implemenation of hook_qunit_test_alter().
   */
  function mymodule_qunit_test_alter(&amp;$data) {
    //add your custom tests
    drupal_add_js(drupal_get_path('module', 'mymodule') .'/inc/mymodule_bunch_o_tests.js');
  //$data['test_markup'][] = theme('mymodule_qunit_test_markup'); //optional
  //$data['additions'][] = theme('mymodule_additional_output'); //optional
  }
  </code>
</pre>

<h5><?php print t('In your Javascript source'); ?></h5>
<pre>
  <code class="javascript-example">
  /**
   * @file mymodule_bunch_o_tests.js
   */

  Drupal.tests.testMyModuleFirstTest = {
    getInfo: function() {
      return {
        name: 'isArray',
        description: 'Test the YourHelpers.isArray() JavaScript function for properly Array/Object detection.',
        group: 'MyCompany'
      };
    },
    test: function() { //any tests you want, here:
      equal(YourHelpers.isArray([]), true, 'expecting [] to be verified as an YourHelpers.isArray as an Array.');
      equal(YourHelpers.isArray({}), false, 'expecting {} to be verified by YourHelpers.isArray as an Object.');
    }
  };

  Drupal.tests.testMyModuleSecondTest = {
    //...
  };
  </code>
</pre>

<h3><?php print t('Writing Qunit Tests'); ?></h3>

<p><?php print $copy['writing_tests'];?></p>

<h3><?php print t('Drupal 7'); ?></h3>

<p><?php print $copy['drupal_7'];?></p>

