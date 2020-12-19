$(document).ready(() => {
  var status = JSON.parse(window.localStorage.getItem("loginStatus")) || false;
  if (status == true) {
    var tableData = [];
    $.get(
      `https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users`,
      (data) => {
        tableData = data;
        tableData.map((item, pos) => {
          rowMaking(item, pos);
        });
      }
    );

    function rowMaking(data, pos) {
      let date = data.dob.split("-");
      $(`#tableBody`).append(
        $("<tr>").append(
          $("<td>").attr("class", "dimColor").text(data.id),
          $("<td>").html(`<img src="${data.profilePic}" alt="${pos}"/>`),
          $("<td>").attr("class", "dimColor").text(`${data.fullName}`),
          $("<td>").text(`${date[0]} ${date[1]}, ${date[2]}`),
          $("<td>").attr("class", "dimColor").text(data.gender),
          $("<td>")
            .attr("class", "dimColor")
            .text(`${data.currentCity}, ${data.currentCountry}`)
        )
      );
    }
    $(`#reset`).click(() => {
      $(`#search-box`).value = "";
      tableData.map((item, pos) => {
        rowMaking(item, pos);
      });
    });

    $(`form`).submit((e) => {
      var search = document.getElementById("search-box").value;

      e.preventDefault();
      if (search.length < 2) {
        alert("Please enter atleast 2 characters");
        tableData.map((item, pos) => {
          rowMaking(item, pos);
        });
      } else {
        $(`#tableBody`).html("");
        for (var i = 0; i < tableData.length; ++i) {
          //objects copy references so cloning is done instead of assigning
          var tdataString = JSON.stringify(tableData[i]);
          var tdata = JSON.parse(tdataString);
          for (let key in tdata) {
            if (
              tdata[key]
                .toString()
                .toLowerCase()
                .indexOf(search.toLowerCase()) > -1
            ) {
              rowMaking(tableData[i], i);
              break;
            }
          }
        }
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
