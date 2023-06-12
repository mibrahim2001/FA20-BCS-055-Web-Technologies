$(document).ready(function () {
  console.log("Hi from menu.js");
  $(".shorthand-text").on("contextmenu", function (event) {
    console.log("right-clicked");
    event.preventDefault();

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

  // Event listener for the "Update" button
  $("#updateOption").click(function () {
    var serverId = $("#customMenu").data("serverId");
    $.ajax({
      url: `/server/${serverId}`,
      method: "GET",
      success: function (data) {
        // Open the modal
        $("#updateModal").modal("show");

        // Populate the form
        $("#update-server-name-input").val(data.name);
        $("#update-select").val(data.type);

        $("#updateForm").submit(function (event) {
          event.preventDefault();
          var url = "/server/" + serverId;
          $.ajax({
            url: url,
            type: "PUT",
            data: $("#updateForm").serialize(),
            success: function (data) {
              console.log(data);
              window.location.href = "/channels";
            },
            error: function (error) {
              console.log("Error updating server:", error);
            },
          });
        });
      },
      error: function (error) {
        console.log("Error retrieving server data:", error);
      },
    });
  });

  // Hide the menu when clicked anywhere on the page
  $(document).click(function () {
    console.log("clicked anywhere on the page");
    $("#customMenu").hide();
    $("#logoutMenu").hide();
  });

  $("#settingIcon").on("contextmenu", function (event) {
    console.log("right-clicked");
    event.preventDefault();

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
