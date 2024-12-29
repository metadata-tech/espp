$(document).ready(function () {
  // Function to check for XSS attacks
  //   function sanitizeInput(input) {
  //     // Regular expression to match potential XSS attack patterns
  //     var regex = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
  //     return input.replace(regex, ""); // Remove potential XSS attacks
  //   }

  function sanitizeInput(input) {
    // Regular expression to match potential XSS attack patterns
    var xssRegex = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
    // Remove potential XSS attacks
    input = input.replace(xssRegex, "");

    // Regular expression to match potential JS Injection patterns in attributes
    var jsInjectionRegex = /on\w+ ?=/gi;
    // Remove potential JavaScript injection in attributes
    input = input.replace(jsInjectionRegex, "");

    return input;
  }

  // Monitor all input fields for changes
  $("input, textarea").on("input", function () {
    var inputValue = $(this).val();
    var sanitizedValue = sanitizeInput(inputValue);
    // Update input value with sanitized value
    $(this).val(sanitizedValue);
  });
});
