//tabs
$('.tabContent').removeClass('activeTab');
$('#tab1').addClass('activeTab');
$('.tabs a').click(function() {
  $('.tabs a').removeClass('active');
  $(this).addClass('active');
  var currentTab = $(this).attr('href');
  $('.tabContent').removeClass('activeTab');
  $(currentTab).addClass('activeTab');
  return false;
});