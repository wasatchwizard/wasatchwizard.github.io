
// main.js


function addOnLoadEvent(func)
{
	var oldonload = window.onload;
	if (typeof (window.onload) != "function") {
		window.onload = func;
	}
	else {
		window.onload = function ()
		{
			if (oldonload) {
				oldonload();
			}
			func();
		}
	}
}

$(function () {
  var includes = $('[data-include]')
  $.each(includes, function () {
    var file = 'views/' + $(this).data('include') + '.html'
    $(this).load(file)
  })
})
