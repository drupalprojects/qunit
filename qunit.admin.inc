<?php
/**
 * @file Functions related to QUnit administrative settings.
 */

/**
 * Menu callback; builds and returns the QUnit settings form.
 */
function qunit_admin_settings_form() {
  $form = array();

  //fieldset and explanation
  $form['qunit_lib'] = array(
    '#type' => 'fieldset',
    '#title' => t('QUnit Library Files'),
    '#description' => t("Local or remote path to QUnit's files. Leave blank to
      use remote (upstream) URL. Note: both must be filled in if not left blank."),
    '#collapsable' => FALSE,
  );

  $txt_field = array(
    '#type' => 'textfield',
    '#maxlength' => 260,
  );
  
  //QUnit css field
  $form['qunit_lib']['css_path'] = $txt_field;
  $form['qunit_lib']['css_path']['#title'] = t("QUnit CSS");
  $form['qunit_lib']['css_path']['#default_value'] = variable_get('qunit_lib_css_path',
    NULL);

  //QUnit javascript field
  $form['qunit_lib']['js_path'] = $txt_field;
  $form['qunit_lib']['js_path']['#title'] = t("QUnit Javascript");
  $form['qunit_lib']['js_path']['#default_value'] = variable_get('qunit_lib_js_path',
    NULL);

  return system_settings_form($form);
}

/**
 * Resets QUnit's admin settings form values.
 */
function qunit_admin_settings_form_validate($form, &$form_state) {
  if (empty($form_state['values']['qunit_lib_js_path']) ||
    empty($form_state['values']['qunit_lib_css_path'])) {
    $form_state['values']['op'] = $form_state['values']['reset'];
  }
}

