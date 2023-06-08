$(document).ready(function () {
  console.log("Hi from menu.js");
  $(".shorthand-text").on("contextmenu", function (event) {
    console.log("right-clicked");
    event.preventDefault(); // Pr   event default right-click behavior

    var menu = $("#customMenu");
    menu.css({
      display: "block",
      left: event.pageX,
      top: event.pageY,
    });

    menu.data("serverId", $(this).attr("id"));
  });

  // Attach event listeners to the menu options
  $("#deleteOption").click(function () {
    var serverId = $("#customMenu").data("serverId");
    if (serverId) {
      $.ajax({
        url: "/server/" + serverId,
        type: "DELETE",
        success: function () {
          $("#" + serverId).remove();
        },
        error: function () {
          alert("Failed to delete the server");
        },
      });
    }
  });

  $("#updateOption").click(function () {
    // Handle update functionality
    alert("Update option clicked");
  });

  // Hide the menu when clicked anywhere on the page
  $(document).click(function () {
    console.log("clicked anywhere on the page");
    $("#customMenu").hide();
    $("#logoutMenu").hide();
  });

  $("#settingIcon").on("contextmenu", function (event) {
    console.log("right-clicked");
    event.preventDefault(); // Pr   event default right-click behavior

    var menu = $("#logoutMenu");
    menu.css({
      display: "block",
      left: event.pageX,
      top: event.pageY - 50,
    });
  });

  $("#logoutOption").click(function () {
    console.log("logout option clicked");
    $.ajax({
      url: "/logout",
      type: "POST",
      success: function (res) {
        window.location.href = "/login";
      },
      error: function () {
        alert("Failed to logout");
      },
    });
  });
});
