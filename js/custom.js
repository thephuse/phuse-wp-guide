function adjustTop(){
  var headerHeight = jQuery('.navbar-fixed-top').height();
  jQuery('.columns').css('padding-top', headerHeight + 'px');
}

$(function () {

  adjustTop();

  // open sidebar item if child item is active
  var currentLocation = $(location).attr('href');
  var currentSlug = currentLocation.substring(currentLocation.indexOf('/docs'), currentLocation.length);
  var navItem = $('.Nav .Nav li');
  for(var $i = 0; $i < navItem.length; $i++){
    var navLink = $(navItem[$i]).children('a').attr('href');
    var navSlug = navLink.substring(navLink.indexOf('/docs'), navLink.length);
    if(navSlug === currentSlug) {
      $(navItem[$i]).addClass('Nav__item--active');
      $(navItem[$i]).parents('.parent-list').addClass('Nav__item--open');
    }
  }

  $(window).on('resize', function(){
    adjustTop();
  });

  $('.Nav li').has('.Nav').addClass('parent-list');
  
  $('.Nav .has-children > a').click(function (e) {
    e.preventDefault();
    var $this = $(this);
    var parent = $this.parent();
    var subNavCollapse = $('#sub-nav-collapse');

    if (subNavCollapse.hasClass('nav-expanded')) return;

    parent.siblings().find('ul').slideUp();
    $this.next().slideToggle();
    parent.parent().find('.Nav__item--open').not(parent).removeClass('Nav__item--open');
    if (parent.hasClass('Nav__item--open')) parent.removeClass('Nav__item--open')
    else parent.addClass('Nav__item--open');
  });


  // Bootstrap Table Class
  $('table').addClass('table');

  // Responsive menu spinner
  $('#menu-spinner-button').click(function () {
    $('#sub-nav-collapse').slideToggle();
  });

  // Catch browser resize
  $(window).resize(function () {
    // Remove transition inline style on large screens
    if ($(window).width() >= 768)
      $('#sub-nav-collapse').removeAttr('style');
  });
});

//Fix GitHub Ribbon overlapping Scrollbar
var t = $('#github-ribbon');
var a = $('article');
if (t[0] && a[0] && a[0].scrollHeight > $('.right-column').height()) t[0].style.right = '16px';

//Toggle Code Block Visibility
function toggleCodeBlocks() {
  var t = localStorage.getItem("toggleCodeStats")
  t = (t + 1) % 3;
  localStorage.setItem("toggleCodeStats", t);
  var a = $('.content-page article');
  var c = a.children().filter('pre');
  var d = $('.right-column');
  if (d.hasClass('float-view')) {
    d.removeClass('float-view');
    $('#toggleCodeBlockBtn')[0].innerHTML = "Hide Code Blocks";
  } else {
    if (c.hasClass('hidden')) {
      d.addClass('float-view');
      c.removeClass('hidden');
      $('#toggleCodeBlockBtn')[0].innerHTML = "Show Code Blocks Inline";
    } else {
      c.addClass('hidden');
      $('#toggleCodeBlockBtn')[0].innerHTML = "Show Code Blocks";
    }
  }
}

if (localStorage.getItem("toggleCodeStats") >= 0) {
  var t = localStorage.getItem("toggleCodeStats");
  if (t == 1) {
    toggleCodeBlocks();
    localStorage.setItem("toggleCodeStats", 1);
  }
  if (t == 2) {
    toggleCodeBlocks();
    toggleCodeBlocks();
    localStorage.setItem("toggleCodeStats", 2);
  }
} else {
  localStorage.setItem("toggleCodeStats", 0);
}

$('.expand-all-nav').click(function(e) {
  toggleAllExpand(e);
});

function toggleAllExpand(e) {
  var navList = $('.sub-nav-collapse');
  var toggledClass = 'nav-expanded';

  e.preventDefault();
  if (!navList.hasClass(toggledClass)) {
    navList.addClass(toggledClass);
    e.target.innerHTML = 'Collapse All';
  }
  else {
    navList.removeClass(toggledClass);
    e.target.innerHTML = 'Expand All';
  }
}

$('.gif-toggle').click(function(e) {
  toggleGifs(e, false);
});

toggleGifs(null, true);

function toggleGifs(e, onLoad) {
  var toggleButton = $('.gif-toggle');
  var cookieName = "gifCookie";
  var gifCookie = isCookieSet(cookieName);
  var body = $('body');

  if (e) e.preventDefault();
  if (onLoad == true) {
    if (gifCookie == true) {
      body.addClass('hide-gifs');
      toggleButton.html('Gif ON');
    }
  }
  else {
    if (gifCookie == false) {
      body.addClass('hide-gifs');
      toggleButton.html('Gif ON');
      setCookie(cookieName);
    }
    else {
      body.removeClass('hide-gifs');
      toggleButton.html('Gif OFF');
      removeCookie(cookieName);
    }
  }
}

function setCookie(name) {
  document.cookie = name + "=true; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/;";
}

function removeCookie(name) {
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/;";
}

function isCookieSet(name) {
  var re = new RegExp('[; ]'+name+'=([^\\s;]*)');
  var sMatch = (' '+document.cookie).match(re);

  if (name && sMatch) return true;
  return false;
} 

$('.logout').click(function() {
  clearAuthCookie($(this).data('cookie'));
});

function clearAuthCookie(names) {
  for (var key in names) {
     document.cookie = names[key] + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }
  document.location.reload(true);
}

$('a').each(function() {
   var a = new RegExp('/' + window.location.host + '/');
   if (!a.test(this.href)) {
     this.setAttribute('target', '_blank');
   }
});

// Add data attribute from TH

var headers = document.getElementsByTagName('th');
var rows = document.getElementsByTagName('tr');

function stripTags(str) {
  return str.replace(/(<([^>]+)>)/ig,"").trim();
}

Array.prototype.forEach.call(rows, function(row) {
  var cells = row.getElementsByTagName('td');
  for (var i = 0; i < cells.length; i++) {
    cells[i].setAttribute('data-name', stripTags(headers[i].innerHTML));
  }
});