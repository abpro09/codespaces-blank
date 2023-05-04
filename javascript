<?php
/*
Plugin Name: My SEO Plugin
Plugin URI: https://example.com/my-seo-plugin
Description: A basic SEO plugin for WordPress.
Version: 1.0
Author: Your Name
Author URI: https://example.com
*/

// Hook into WordPress to add the SEO meta box
add_action('add_meta_boxes', 'my_seo_plugin_add_meta_box');

// Function to add the SEO meta box to post editor screen
function my_seo_plugin_add_meta_box() {  
    add_meta_box(
    'my-seo-plugin-meta-box',
    'SEO Settings',
    'my_seo_plugin_render_meta_box',
    'post',
    'side',
    'high'
  );
}

// Function to render the SEO meta box content
function my_seo_plugin_render_meta_box($post) {
  // Get the current SEO values for the post
  $seo_title = get_post_meta($post->ID, 'my_seo_plugin_title', true);
  $seo_description = get_post_meta($post->ID, 'my_seo_plugin_description', true);
  $seo_keywords = get_post_meta($post->ID, 'my_seo_plugin_keywords', true);

  // Output the HTML for the meta box
  ?>
  <label for="seo-title">SEO Title:</label>
  <input type="text" id="seo-title" name="seo_title" value="<?php echo esc_attr($seo_title); ?>" />

  <label for="seo-description">SEO Description:</label>
  <textarea id="seo-description" name="seo_description"><?php echo esc_textarea($seo_description); ?></textarea>

  <label for="seo-keywords">SEO Keywords:</label>
  <input type="text" id="seo-keywords" name="seo_keywords" value="<?php echo esc_attr($seo_keywords); ?>" />
  <?php
}

// Hook into WordPress to save the SEO meta box data
add_action('save_post', 'my_seo_plugin_save_meta_box');

// Function to save the SEO meta box data
function my_seo_plugin_save_meta_box($post_id) {
  // Verify the nonce
  $nonce = isset($_POST['my_seo_plugin_meta_box_nonce']) ? $_POST['my_seo_plugin_meta_box_nonce'] : '';
  if (!wp_verify_nonce($nonce, 'my_seo_plugin_meta_box')) {
    return;
  }

  // Check if the current user has permission to edit the post
  if (!current_user_can('edit_post', $post_id)) {
    return;
  }

  // Save the SEO meta box values
  if (isset($_POST['seo_title'])) {
    update_post_meta($post_id, 'my_seo_plugin_title', sanitize_text_field($_POST['seo_title']));
  }
  if (isset($_POST['seo_description'])) {
    update_post_meta($post_id, 'my_seo_plugin_description', sanitize_textarea_field($_POST['seo_description']));
  }
  if (isset($_POST['seo_keywords'])) {
    update_post_meta($post_id, 'my_seo_plugin_keywords', sanitize_text_field($_POST['seo_keywords']));
  }
}
