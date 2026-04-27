document.addEventListener("DOMContentLoaded", function () {

  // MONTH
  let selectOption = document.getElementById("month");

  let months = [
    "January","February","March","April",
    "May","June","July","August",
    "September","October","November","December"
  ];

  let monthDefault = document.createElement("option");
  monthDefault.text = "Select Month";
  monthDefault.disabled = true;
  monthDefault.selected = true;
  selectOption.appendChild(monthDefault);

  for (let i = 0; i < months.length; i++) {
    let option = document.createElement("option");
    option.value = months[i];
    option.text = months[i];
    selectOption.appendChild(option);
  }


  // DAY
  let daySelect = document.getElementById("day");

  let dayDefault = document.createElement("option");
  dayDefault.text = "Select Day";
  dayDefault.disabled = true;
  dayDefault.selected = true;
  daySelect.appendChild(dayDefault);

  for (let i = 1; i <= 31; i++) {
    let option = document.createElement("option");
    option.value = i;
    option.text = i;
    daySelect.appendChild(option);
  }

  let year = document.getElementById("year")

  let defaultYear = document.createElement("option");
  defaultYear.text = "year";
  defaultYear.disabled = true;
  defaultYear.selected = true;
  year.appendChild(defaultYear);

  let currentYear = new Date().getFullYear();

  for(let y = currentYear;y >= 1900 ;y-- ){
    let option = document.createElement("option")
    option.value = y;
    option.text = y;
    year.appendChild(option);
  }
  

});


console.log("ma cahal")