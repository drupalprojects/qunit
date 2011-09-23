<?php

/**
 * @file
 * API documentation for QUnit.
 */

/**
 * Implemenation of hook_qunit_test_alter().
 */
function mymodule_qunit_test_alter(&$test_markup, &$additions) {
  //add your custom tests
  drupal_add_js(drupal_get_path('module', 'mymodule') .'/inc/mymodule.test.js');

  //optional
  $test_markup[] = theme('mymodule_qunit_test_markup');

  //optional
  $additions[] = theme('mymodule_additional_output');
}

