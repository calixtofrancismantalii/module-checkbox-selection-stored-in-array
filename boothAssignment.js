// When the DOM (HTML structure) is ready
// document.addEventListener("DOMContentLoaded");
$(document).ready(function () {
  // First, we can create references to DOM elements on page start,
  // which we'll reuse instead of looking them up every time we perform a search.
  // As a convention, I like variables holding DOM elements to start with $,
  // so that I know what I'm dealing with in the blink of an eye 👀
  let $input = document.getElementById("myInput");
  let $table = document.getElementById("myTable");
  // Only select the <tr>s inside the <tbody> (double $ -> multiple elements)
  let $$tr = $table.querySelectorAll("tbody tr");

  // Add the normalized name as a property to each tr, so that you don't have
  // to compute that every time when performing a search
  for (var i = 0; i < $$tr.length; i++) {
    $$tr[i].normalizedValue = normalizeStr(
      $$tr[i].querySelector("td").innerText
    );
  }
  // When typing or pasting text, perform a search
  $input.addEventListener("input", performSearch);

  //   function performSearch() {
  //     var filter = normalizeStr(this.value);
  //     for (var i = 0; i < $$tr.length; i++) {
  //       var isMatch = $$tr[i].normalizedValue.includes(filter);
  //       // Toggle a 'visible' class
  //       $$tr[i].classList[isMatch ? "add" : "remove"]("visible");
  //     }
  //   }

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

    var showNoResultsMessage = resultCount === 0 && filter.length > 0;
    // $noResults.classList[showNoResultsMessage ? "add" : "remove"]("visible");
  }

  // Creating a reusable function will allow us to make
  // changes to it only in one place 👍
  function normalizeStr(str) {
    return str.toUpperCase().trim();
  }
});

function myfun(e) {
  //   const chkbx = document.getElementsByName("chkbx[]");

  $("input:checkbox").change(function () {
    let isChecked = $("input:checkbox:checked")
      .map(function () {
        return this.value;
      })
      .toArray();

    // isChecked = isChecked.toString();

    // // if string contains ',', then run this function
    // while (isChecked.indexOf(",") > -1) {
    //   //then replace the commas
    //   isChecked = isChecked.replace(",", " ");
    // }

    // $("#view").text(isChecked);

    let table = "<tr>",
      perrow = 1,
      cells = 0;

    isChecked.forEach((value) => {
      table += `<td>${value}</td>`;
      cells++;
      if (cells % perrow == 0 && cells != isChecked.length) {
        table += "</tr style='border: solid 1px black'><tr>";
      }
    });
    table += "</tr>";
    document.getElementById("selectedData").innerHTML = table;
  });
}
