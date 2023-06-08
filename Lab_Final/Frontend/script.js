$(() => {
  // These functions will be called when DOM is loaded
  console.log("DOM is loaded");
  getData();
});

const getData = () => {
  console.log("getData called");
  //get data from the api
  $.ajax({
    url: "http://127.0.0.1:4000/voucher",
    method: "GET",
    success: (response) => {
      $("#table-loader").addClass("d-none");
      for (let i = 0; i < response.length; i++) {
        let row = `<tr>
        <td><strong>${i + 1}</strong></td>
            <td>${response[i].title}</td>
            <td>${response[i].amount}</td>
            <td>${response[i].isFixed}</td>
            <td>${response[i].maxAmount}</td>
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

const handleDeleteBtnClick = (id) => {
  console.log("Delete button clicked", id);
  $.ajax({
    url: `http://127.0.0.1:4000/voucher/${id}`,
    method: "DELETE",
    success: (response) => {
      //remove the row from the table
      console.log("success", response);
      $(`#del-${id}`).parent().parent().remove();
    },
  });
};
