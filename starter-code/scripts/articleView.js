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
      // TODO: If the select box was changed to an option that has a value, we need to hide all the articles,
      //       and then show just the ones that match for the author that was selected.
      //       Use an "attribute selector" to find those articles, and fade them in for the reader.
      $('article').hide();
      $('article[data-author="' + $(this).val() +'"]').fadeIn();
    } else {
      // TODO: If the select box was changed to an option that is blank, we should
      //       show all the articles, except the one article we are using as a template.
      $('article').show();
      $('.template').hide();
    }
    $('#category-filter').val('');
  });
};

articleView.handleCategoryFilter = function() {
  // TODO: Just like we do for #author-filter above, we should handle change events on the #category-filter element.
  //       When an option with a value is selected, hide all the articles, then reveal the matches.
  //       When the blank (default) option is selected, show all the articles, except for the template.
  //       Be sure to reset the #author-filter while you are at it!
  $('#category-filter').on('change', function() {
    if ($(this).val()) {
      $('article').hide();
      $('article[data-category="' + $(this).val() +'"]').fadeIn();
    } else {
      $('article').show();
      $('.template').hide();
    }
    $('#author-filter').val('');
  });
};

articleView.handleMainNav = function() {
  // TODO: Add an event handler to .main-nav elements that will power the Tabs feature.
  //       Clicking any .tab element should hide all the .tab-content sections, and then reveal the
  //       single .tab-content section that is associated with the clicked .tab element.
  //       So: You need to dynamically build a selector string with the correct ID, based on the
  //       data available to you on the .tab element that was clicked.
  $('.tab').on('click', function () {
    $('.tab-content').hide();
    var sectionId = $(this).attr('data-content');
    $('section#' + sectionId).show();
  });

  $('.main-nav .tab:first').click(); // Let's now trigger a click on the first .tab element, to set up the page.
};

articleView.setTeasers = function() {
  $('.article-body *:nth-of-type(n+2)').hide(); // Hide elements beyond the first 2 in any article body.

  // TODO: Add an event handler to reveal all the hidden elements,
  //       when the .read-on link is clicked. You can go ahead and hide the
  //       "Read On" link once it has been clicked. Be sure to prevent the default link-click action!
  //       Ideally, we'd attach this as just 1 event handler on the #articles section, and let it
  //       process any .read-on clicks that happen within child nodes.

  // STRETCH GOAl!: change the 'Read On' link to 'Show Less'
  $('#articles').on('click','.read-on', function(event) {
    var $readOn = $(this);
    $readOn.prev('.article-body').children('*:nth-of-type(n+2)').toggle();

    if ($readOn.text().startsWith('R')) {
      $readOn.text('show less ');
    } else {
      $readOn.text('Read on');
    }

    event.preventDefault();
  });
};

// TODO: Call all of the above functions, once we are sure the DOM is ready.
$(document).ready(function() {
  articleView.populateFilters();
  articleView.handleAuthorFilter();
  articleView.handleCategoryFilter();
  articleView.handleMainNav();
  articleView.setTeasers();
});
