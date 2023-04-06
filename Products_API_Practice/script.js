$(() => {
  // These functions will be called when DOM is loaded
  getData();
});

const getData = () => {
  console.log("getData called");
  //get data from the api
  $.ajax({
    url: "https://usman-fake-api.herokuapp.com/api/products",
    method: "GET",
    success: (response) => {
      $("#table-loader").addClass("d-none");
      for (let i = 0; i < response.length; i++) {
        let row = `<tr>
        <td><strong>${i + 1}</strong></td>
            <td>${response[i].name}</td>
            <td>${response[i].price}</td>
            <td>
            <button type="button" id="edit-${
              response[i]._id
            }" class="btn btn-primary control-btn">Edit</button>
            <button type="button" id="del-${
              response[i]._id
            }" class="btn btn-danger control-btn">Delete</button>
            </td>
            </tr>`;
        $("#table-body").append(row);
        $(`#edit-${response[i]._id}`).on("click", () => {
          handleEditBtnClick(response[i]._id);
        });

        $(`#del-${response[i]._id}`).on("click", () => {
          handleDeleteBtnClick(response[i]._id);
        });
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

const handleEditBtnClick = (id) => {
  console.log("Edit button clicked", id);
  $("#edit-modal").modal("toggle");
};

const handleDeleteBtnClick = (id) => {
  console.log("Delete button clicked", id);
  $.ajax({
    url: `https://usman-fake-api.herokuapp.com/api/products/${id}`,
    method: "DELETE",
    success: (response) => {
      //remove the row from the table
      console.log("success", response);
      $(`#del-${id}`).parent().parent().remove();
    },
  });
};
