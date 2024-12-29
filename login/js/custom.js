const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

var i = 0;
var txt = 'eSPP';
function typeSysName() {
  if (i < txt.length) {
    document.getElementById("sysname").innerHTML += txt.charAt(i);
    i++;
    setTimeout(typeSysName, 60);
  }
}

function convertFormToJSON(form) {
  return $(form)
    .serializeArray()
    .reduce(function(json, {
      name,
      value
    }) {
      json[name] = value;
      return json;
    }, {});
}

function captcha() {
  const string = "abcdefghijkmnopqrstuvwxyz1234567890";
  var parts = string.split('');
  for (var i = parts.length; i > 0;) {
    var random = parseInt(Math.random() * i);
    var temp = parts[--i];
    parts[i] = parts[random];
    parts[random] = temp;
  }
  return parts.join('');
}

var getUrlParameter = function getUrlParameter(sParam) {
  var sPageURL = window.location.search.substring(1),
    sURLVariables = sPageURL.split('&'),
    sParameterName,
    i;

  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split('=');

    if (sParameterName[0] === sParam) {
      return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
    }
  }
  return false;
};

// Numeric only control handler
jQuery.fn.ForceNumericOnly = function() {
  return this.each(function()
  {
    $(this).keydown(function(e)
    {
      var key = e.charCode || e.keyCode || 0;
      // allow backspace, tab, delete, enter, arrows, numbers and keypad numbers ONLY
      // home, end, period, and numpad decimal
      return (
        key == 8 || 
        key == 9 ||
        key == 13 ||
        key == 46 ||
        key == 110 ||
        key == 190 ||
        (key >= 35 && key <= 40) ||
        (key >= 48 && key <= 57) ||
        (key >= 96 && key <= 105)
      );
    });
  });
};