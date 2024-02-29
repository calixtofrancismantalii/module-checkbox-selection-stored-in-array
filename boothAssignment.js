$(document).ready(function () {
  // select2 placeholder
  $("#multiple").select2({
    placeholder: "Select Booth Number",
    allowClear: true,
  });

  //when input search is clicked
  $("#inputSearch").click(function () {
    $("#exhibitorsTable tbody tr").addClass("visible");
    $("#exhibitorsTable").height("400px");
  });

  // clear input search exhibitor and close dropdown menu
  $("#multiple").on("select2:open", function (e) {
    $("#inputSearch").val("");
    $("#exhibitorsTable tbody tr").removeClass("visible");
    $("#exhibitorsTable").height("0px");
  });

  //global variables
  let $input = document.getElementById("inputSearch");
  let $table = document.getElementById("exhibitorsTable");
  let $$tr = $table.querySelectorAll("tbody tr");
  let selectedExhibitors = $("#selectedExhibitors");
  let selectedOptions = [];

  //normalized string on the table row match to search input
  for (var i = 0; i < $$tr.length; i++) {
    $$tr[i].normalizedValue = normalizeStr(
      $$tr[i].querySelector("td").innerText
    );
  }

  // When typing or pasting text, perform a search function
  $input.addEventListener("input", performSearch);

  //input search exhibitor function
  function performSearch() {
    var filter = normalizeStr(this.value),
      resultCount = 0;
    for (var i = 0; i < $$tr.length; i++) {
      var isMatch =
        filter.length > 0 && $$tr[i].normalizedValue.includes(filter);
      if (isMatch) {
        resultCount++;
      }
      $$tr[i].classList[isMatch ? "add" : "remove"]("visible");
    }
  }
  //normalized input string match to table row
  function normalizeStr(str) {
    return str.toUpperCase().trim();
  }

  //checked or unchecked result menu
  $(".checkbox").change(function () {
    const value = $(this).val();
    if ($(this).prop("checked")) {
      selectedOptions.push(value);
    } else {
      const index = selectedOptions.indexOf(value);
      if (index !== -1) {
        selectedOptions.splice(index, 1);
      }
    }
    updateTable();
  });

  //update selected exhbitor table
  function updateTable() {
    selectedExhibitors.empty();
    $.each(selectedOptions, function (index, option) {
      const newRow = $("<tr>");
      const cell = $("<td>").text(option).appendTo(newRow);
      const lbl = $(
        "<label style='font-size: 12px; cursor:pointer; display: inline-block; margin-left:5px'>"
      ).appendTo(cell);
      lbl.html('<i class="fa-solid fa-xmark"></i>');
      cell.click(function () {
        const index = selectedOptions.indexOf(option);
        if (index !== -1) {
          selectedOptions.splice(index, 1);
          $('.checkbox[value="' + option + '"]').prop("checked", false);
          updateTable();
        }
      });
      newRow.appendTo(selectedExhibitors);
    });
  }

  //form submission
  $("form").submit(function (e) {
    const selectedBoothNumber = $("#multiple").select2("data");
    e.preventDefault();
    if (selectedOptions.length === 0 || selectedBoothNumber.length === 0) {
      alert("Please fillup fields");
    } else {
      alert(
        "Sucessfully submitted \n\n" +
          "# of selected exhibitor: " +
          selectedOptions.length +
          "\n" +
          "# of selected booth number: " +
          selectedBoothNumber.length
      );
    }
  });
});
