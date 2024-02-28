$(document).ready(function () {
  let $input = document.getElementById("inputSearch");
  let $table = document.getElementById("exhibitorsTable");

  // Only select the <tr>s inside the <tbody> (double $ -> multiple elements)
  let $$tr = $table.querySelectorAll("tbody tr");

  // Add the normalized name as a property to each tr, so that you don't have
  // to compute that every time when performing a search
  for (var i = 0; i < $$tr.length; i++) {
    $$tr[i].normalizedValue = normalizeStr(
      $$tr[i].querySelector("td").innerText
    );
  }

  //when input search is clicked
  $("#inputSearch").click(function () {
    $("#exhibitorsTable tbody tr").addClass("visible");
    $("#exhibitorsTable").height("400px");
  });

  // When typing or pasting text, perform a search function
  $input.addEventListener("input", performSearch);

  //search function
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
  // Creating a reusable function will allow us to make
  // changes to it only in one place
  function normalizeStr(str) {
    return str.toUpperCase().trim();
  }

  const selectedExhibitors = $("#selectedExhibitors");
  let selectedOptions = [];

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

  //update table of selected exhbitor whenever it clicks
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
});
