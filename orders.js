$(document).ready(() => {
  var status = JSON.parse(window.localStorage.getItem("loginStatus")) || false;
  if (status == true) {
    // fetch orders data
    var orderData;
    fetch("https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/orders")
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        orderData = data;
        createTableRow(orderData);
      })
      .catch((err) => console.error(err));

    // Filters-options
    var filteredData = [];
    function filterOptions() {
      for (var i = 0; i < 4; i++) {
        let checkStatus = document.getElementById(`check-${i}`);
        if (checkStatus.checked === true) {
          filteredData[i] = checkStatus.name;
        }
      }
      getCheckedItems(orderData, filteredData);
      filteredData = [];
    }

    $(".check-boxes").on("change", function () {
      filterOptions();
    });

    function getCheckedItems(orderData, filteredData) {
      let data = orderData;
      var getCheckedRows = data.filter(function (store) {
        return filteredData.indexOf(store.orderStatus) > -1;
      });
      createTableRow(getCheckedRows);
      getCheckedRows = [];
    }
    // filterOptions();

    // dynamically creating table rows

    function createTableRow(data) {
      $("#tableBody").html("");
      for (let i = 0; i < data.length; i++) {
        let date = data[i].orderDate.split("-");
        $(`#tableBody`).append(
          $("<tr>").append(
            $("<td>").attr("class", "dimColor").text(data[i].id),
            $("<td>").text(data[i].customerName),
            $("<td>").html(`${date[0]} ${date[1]}, ${date[2]}<br />
        <span class="dimColor">${data[i].orderTime}</span>`),
            $("<td>").attr("class", "dimColor").text(`$${data[i].amount}`),
            $("<td>").attr("class", "dimColor").text(data[i].orderStatus)
          )
        );
      }
      $(`#count`).text(data.length);
    }
    $(`#logout`).click(() => {
      localStorage.setItem("loginStatus", false);
      $(`#logout`).attr("href", "./index.html");
    });
  } else {
    window.location.replace("./index.html");
  }
});
