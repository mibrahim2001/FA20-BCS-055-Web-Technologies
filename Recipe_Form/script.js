$(() => {
  // These functions will be called when DOM is loaded
  getData();
});

const getData = () => {
  console.log("getData called");
  //get data from the api
  $.ajax({
    url: "https://usman-fake-api.herokuapp.com/api/recipes",
    method: "GET",
    success: (response) => {
      $("#table-loader").addClass("d-none");
      for (let i = 0; i < response.length; i++) {
        let row = `<tr>
        <td><strong>${i + 1}</strong></td>
            <td>${response[i].title}</td>
            <td>${response[i].body}</td>
            <td>
            <button type="button" id="edit-${
              response[i].id
            }" class="btn btn-primary">Edit</button>
            <button type="button" id="del-${
              response[i].id
            }" class="btn btn-danger">Delete</button>
            </td>
            </tr>`;
        $("#table-body").append(row);
      }
    },
    error: (error) => {
      console.log(error);
    },
  });
};

const removeHide = () => {
  $("#table-loader").addClass("d-none");
};
