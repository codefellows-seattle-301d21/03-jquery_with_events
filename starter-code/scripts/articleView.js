'use strict';

// Configure a view object, to hold all our functions for dynamic updates and article-related event handlers.
var articleView = {};

articleView.populateFilters = function() {
  $('article').each(function() {
    var authorName, category, optionTag;
    if (!$(this).hasClass('template')) {
      // REVIEW: We need to take every author name from the page, and make it an option in the Author filter.
      //       To do so, Build an `option` DOM element that we can append to the author select box.
      //       Start by grabbing the author's name from an attribute in `this` article element,
      //       and then use that bit of text to create the option tag (in a variable named `optionTag`),
      //       that we can append to the #author-filter select element.
      authorName = $(this).attr('data-author');
      console.log(authorName);
      optionTag = '<option value="' + authorName + '">' + authorName + '</option>';

      if ($('#author-filter option[value="' + authorName + '"]').length === 0) {
        $('#author-filter').append(optionTag);
      }

      // REVIEW: Similar to the above, but...
      //       Avoid duplicates! We don't want to append the category name if the select
      //       already has this category as an option!
      category = $(this).attr('data-category');
      optionTag = '<option value="' + category + '">' + category + '</option>';
      if ($('#category-filter option[value="' + category + '"]').length === 0) {
        $('#category-filter').append(optionTag);
      }
    }
  });
};

articleView.handleAuthorFilter = function() {
  $('#author-filter').on('change', function() {
    // REVIEW: Inside this function, "this" is the element that triggered the event handler function we're
    //         defining. "$(this)" is using jQuery to select that element, so we can chain jQuery methods
    //         onto it.
    if ($(this).val()) {
      // Done: If the select box was changed to an option that has a value, we need to hide all the articles,
      //       and then show just the ones that match for the author that was selected.
      //       Use an "attribute selector" to find those articles, and fade them in for the reader.
      $('article').filter((ind, art) => $(art).attr('data-author') != $(this).val()).each(
        (ind, art) =>$(art).hide());

      var selectedItem = $('article').filter((ind, art) => $(art).attr('data-author') === $(this).val())[0];
      $(selectedItem).show();
    } else {
      // Done: If the select box was changed to an option that is blank, we should
      //       show all the articles, except the one article we are using as a template.
      $('article').each((ind, art) => $(art).show());
    }
    $('#category-filter').val('');
  });
};

articleView.handleCategoryFilter = function() {
  // Done!!
  $('#category-filter').on('change', function() {
    if ($(this).val()) {
      $('article').filter((ind, art) => $(art).attr('data-category') != $(this).val()).each(
        (ind, art) =>$(art).hide());

      var selectedItem = $('article').filter((ind, art) => $(art).attr('data-category') === $(this).val())[0];
      $(selectedItem).show();
    } else {
      $('article').each((ind, art) => $(art).show());
    }
    $('#author-filter').val('');
  });
};

articleView.handleMainNav = function() {
  // Done


  $('.main-nav .tab:first').click(function() {
    $('#articles').show();
    $('#about').hide();
  });

  $('.main-nav .tab:last').click(function() {
    $('#articles').hide();
    $('#about').show();
  });
   // Let's now trigger a click on the first .tab element, to set up the page.
};

articleView.setTeasers = function() {
  $('.article-body *:nth-of-type(n+2)').hide(); // Hide elements beyond the first 2 in any article body.

  // TODO: Add an event handler to reveal all the hidden elements,
  //       when the .read-on link is clicked. You can go ahead and hide the
  //       "Read On" link once it has been clicked. Be sure to prevent the default link-click action!
  //       Ideally, we'd attach this as just 1 event handler on the #articles section, and let it
  //       process any .read-on clicks that happen within child nodes.

  // STRETCH GOAl!: change the 'Read On' link to 'Show Less'
  $('article').each((ind, art) => $($(art).find('.read-on')).on('click', function(e) {
    e.preventDefault();
    $($(art).find('.article-body *:nth-of-type(n+2)')).show();
    $(this).hide();
  }));
};

// TODO: Call all of the above functions, once we are sure the DOM is ready.
$(document).ready(function() {
  articleView.handleAuthorFilter();
  articleView.handleCategoryFilter();
  articleView.handleMainNav();
  articleView.setTeasers();
})

articleView.populateFilters();
