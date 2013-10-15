
/* jquery */
$(document).ready(function(){

/*************************************************************************
DEFINE GLOBAL EASING
*************************************************************************/

jQuery.extend (jQuery.easing,{
  easeOutBounce: function (x, t, b, c, d) {
  	if ((t/=d) < (1/2.75)) {
  		return c*(7.5625*t*t) + b;
  	} else if (t < (2/2.75)) {
  		return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
  	} else if (t < (2.5/2.75)) {
  		return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
  	} else {
  		return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
  	}
  }
});

/*************************************************************************
HOME BACKGROUND PARALLAX SCROLL - scrollorama has poor bg img support
*************************************************************************/

// cache the window object
$window = $(window);

$('div[data-type="background"]').each(function(){
  var $bgobj = $(this); // assigning the object
  $(window).scroll(function() {
    var yPos = -($window.scrollTop() / $bgobj.data('speed'));
    // put together our final background position
    var coords = '50% '+ yPos + 'px';
    // move the background
    $bgobj.css({ backgroundPosition: coords });
  });
});

/*************************************************************************
SMOOTH SCROLL TO ANCHORS
*************************************************************************/

$(function() {
  $('#subnav a').bind('click',function(event){
	  var $anchor = $(this);
	  $('html, body').stop().animate({
			scrollTop: $($anchor.attr('href')).offset().top
	  }, 400);
	  event.preventDefault();
  });
});

/*************************************************************************
SUPERSCROLLORAMA PLUGIN - parallax - initialized below with Waypoints
*************************************************************************/

// initialize the plugin
var scrollorama = $.scrollorama({
  blocks:'.parallax',
  enablePin:false
});

/*************************************************************************
WAYPOINTS PLUGIN
*************************************************************************/

// set defaults
$.fn.waypoint.defaults = {
  context: window,
  continuous: true,
  enabled: true,
  horizontal: false,
  offset: 0,
  triggerOnce: true
}

// hero graphic on /product/
$('.product-hero').waypoint(function() {
  scrollorama.animate('.shot',{ delay: -200, duration: 600, property:'top', start:0, end:-90 });
}, { offset: '25%' });

// iPhone on /product/
$('.iphone').waypoint(function() {
  scrollorama.animate('.iphone-app',{ delay: 0, duration: 800, property:'top', start:0, end:-70 });
}, { offset: '100%' });

// server locations on /product/
$('.datacenters').waypoint(function() {
	$('.pin.one'  ).delay(0).animate({   opacity: 1, top: "+=200px" }, 700, 'easeOutBounce');
	$('.pin.two'  ).delay(100).animate({ opacity: 1, top: "+=200px" }, 700, 'easeOutBounce');
	$('.pin.three').delay(200).animate({ opacity: 1, top: "+=200px" }, 700, 'easeOutBounce');
	$('.pin.four' ).delay(300).animate({ opacity: 1, top: "+=200px" }, 700, 'easeOutBounce');
	$('.pin.five' ).delay(400).animate({ opacity: 1, top: "+=200px" }, 700, 'easeOutBounce');
	$('.pin.six'  ).delay(500).animate({ opacity: 1, top: "+=200px" }, 700, 'easeOutBounce');
}, { offset: '50%' });

// hq pin on /about/
$('.slideshow-hq').waypoint(function() {
	$('.appfog-pin').delay(0).animate({ opacity: 1, top: "+=150px" }, 700, 'easeOutBounce');
}, { offset: '25%' });

/*************************************************************************
CURSOR BLINK ANIMATION - /product/ page
*************************************************************************/

var blink = function(){
	$('.blink').toggle();
};
setInterval(blink, 800);

/*************************************************************************
JUMPSTARTS & ADD-ONS TOGGLE - /product/ page
*************************************************************************/

/* toggle buttons */
$(function() {
  $("#toggle-jumpstarts").click(function(){
    $('#view-addons').hide();
    $('#view-jumpstarts').show();
    $('#toggle-jumpstarts').addClass("selected");
    $('#toggle-addons').removeClass("selected");
  });
  $("#toggle-addons").click(function(){
    $('#view-addons').show();
    $('#view-jumpstarts').hide();
    $('#toggle-jumpstarts').removeClass("selected");
    $('#toggle-addons').addClass("selected");
  });
});

/* subnav toggle */
$(function() {
  $("#subnav-toggle-jumpstarts").click(function(){
    $('#view-addons').hide();
    $('#view-jumpstarts').show();
    $('#toggle-jumpstarts').addClass("selected");
    $('#toggle-addons').removeClass("selected");
  });
  $("#subnav-toggle-addons").click(function(){
    $('#view-addons').show();
    $('#view-jumpstarts').hide();
    $('#toggle-jumpstarts').removeClass("selected");
    $('#toggle-addons').addClass("selected");
  });
});

/* end jquery */
});


/*************************************************************************
JOBSCORE CAREERS - /about/ page
Uses json to pull data from jobscore.com
*************************************************************************/

$(function() {
  if ( $("#careers-table").length ) {
    var dataSrc = "http://www.jobscore.com/jobs/appfog/feed.json?callback=?";

    $.getJSON(dataSrc, function(data) {
      var jobs = data.jobs;

      $.each(jobs, function(index, job) {
        $("<tr>",{
          "class": index%2 === 0 ? "odd" : ""
        }).appendTo("#careers-table");

        $("<td>", {
          html: "<strong>" + job.title + "</strong>"
        }).appendTo("#careers-table tr:last");

        $("<td>", {
          text: job.job_type
        }).appendTo("#careers-tables tr:last");

        $("<td>", {
          text: job.location
        }).appendTo("#careers-table tr:last");

        $("<td>", {
          text: job.department
        }).appendTo("#careers-table tr:last");

        $("<td>", {
          html: "<a href='" + job.apply_url + "'>APPLY <i class='icon-right-circled'></i></a>"
        }).appendTo("#careers-table tr:last");
      });
    });
  }
});


/*************************************************************************
ACCORDION - /pricing/ page
Show/hide an element when controller is clicked

*************************************************************************/
$(function() {
  $('.accordion-ctrl').click(function() {
    var target = $(this).attr('data-accordion-target');
    var control = this;
    $(target).slideToggle('fast', function(){
      var cur_html = $(control).html();
      var alt_html = $(control).attr('data-accordion-alt-html');
      $(control).html(alt_html).attr('data-accordion-alt-html', cur_html);
    });
    return false;
  });
});







