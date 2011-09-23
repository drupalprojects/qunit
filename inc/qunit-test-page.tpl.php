<?php
/**
 * @file Provide as basic a page structure as possible for use with qunit.
 *
 * @see template_preprocess_qunit_test().
 * Some preprocessed and otherwise available variables:
 * - qunit_test_markup: QUnit test mark-up if even provided by any module
 * before hand.
 * - qunit_title: the Title of this test suite.
 * - qunit_additions: line-separated raw HTML output, provided by any given
 * module.
 * - additions: the array of additional raw HTML output provided by each module
 * used to build $qunit_additions.
 */
?>
<h1 id="qunit-header"><?php print $qunit_title; ?></h1>
<h2 id="qunit-banner"></h2>
<div id="qunit-testrunner-toolbar"></div>
<h2 id="qunit-userAgent"></h2>
<ol id="qunit-tests"></ol><!--//#qunit-tests-->
<div id="qunit-fixture"><?php
  print $qunit_test_markup;
?></div><!--//#qunit-fixture-->

<!--raw additions from other modules-->
<?php print $qunit_additions; ?>
<!--//end raw additions-->
