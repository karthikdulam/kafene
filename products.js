$(document).ready(() => {
  var status = JSON.parse(window.localStorage.getItem("loginStatus")) || false;
  if (status == true) {
    var tableData = [];
    $.get(
      `https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/products`,
      (data) => {
        $(`#count`).text(data.length);
        tableData = data;
        tableData.map((item) => {
          rowMaking(item);
        });
      }
    );
    function rowMaking(data) {
      let date = data.expiryDate.split("-");
      $(`#tableBody`).append(
        $("<tr>").append(
          $("<td>").attr("class", "dimColor").text(data.id),
          $("<td>").text(data.medicineName),
          $("<td>").attr("class", "dimColor").text(data.medicineBrand),
          $("<td>").text(`${date[0]} ${date[1]}, ${date[2]}`),
          $("<td>").attr("class", "dimColor").text(data.unitPrice),
          $("<td>").attr("class", "dimColor").text(data.stock)
        )
      );
    }
    $(`#lowStock`).change(() => {
      if ($("#lowStock").prop("checked") == true) {
        $(`#tableBody`).html("");
        $(`#count`).text(tableData.length);
        tableData.map((item) => {
          rowMaking(item);
        });
      } else {
        var lowStockRemoved = tableData.filter((item) => item.stock >= 100);
        console.log(lowStockRemoved);
        $(`#tableBody`).html("");
        $(`#count`).text(lowStockRemoved.length);
        lowStockRemoved.map((item) => {
          rowMaking(item);
        });
      }
    });
    $(`#Expired`).change(() => {
      if ($("#Expired").prop("checked") == true) {
        $(`#tableBody`).html("");
        $(`#count`).text(tableData.length);
        tableData.map((item) => {
          rowMaking(item);
        });
      } else {
        $(`#tableBody`).html("");

        var expiredItems = [];
        let today = new Date();
        today.setHours(0, 0, 0, 0);
        for (let i = 0; i < tableData.length; i++) {
          const ed = tableData[i].expiryDate;
          var varDate = new Date(ed); //dd-mm-YYYY
          if (varDate < today) {
            expiredItems.push(tableData[i]);
          }
        }
        var getCheckedRows = tableData.filter(function (el) {
          return !expiredItems.includes(el);
        });
        console.log(getCheckedRows);
        $(`#count`).text(getCheckedRows.length);
        getCheckedRows.map((item) => {
          rowMaking(item);
        });
      }
    });
    $(`#logout`).click(() => {
      localStorage.setItem("loginStatus", false);
      $(`#logout`).attr("href", "./index.html");
    });
  } else {
    window.location.replace("./index.html");
  }
});
