const excelFile = document.getElementById("excel-file");

excelFile.addEventListener("change", (event) => {
  var reader = new FileReader();

  reader.readAsArrayBuffer(event.target.files[0]);

  reader.onload = function (event) {
    var data = new Uint8Array(reader.result);

    var workBook = XLSX.read(data, { type: "array" });

    // sheet
    var sheetName = workBook.SheetNames; // name
    var sheetData = XLSX.utils.sheet_to_json(workBook.Sheets[sheetName[0]], {
      header: 1,
    }); // data

    var textGroups = ""; // card groups descriptions

    // cards
    var cardGroups = "";
    var currentGroupIndex = -1;

    for (var row = 0; row < sheetData.length; row++) {
      // if seires exists
      if (sheetData[row][0]) {
        var seiresName = sheetData[row][0].replace(" ", "-");

        row++;

        for (var col = 0; col < sheetData[row].length; col++) {
          // if card group exists
          if (sheetData[row][col]) {
            currentGroupIndex += 1; // index of group

            // card group
            var groupStatus = currentGroupIndex == 0 ? "active" : "unknown";
            var cardGroup = `<div class='card-group' data-index='${currentGroupIndex}' data-status='${groupStatus}'>`; // card group

            var textGroup = `<div class='text-group ${seiresName}' text-index='${currentGroupIndex}' data-status='${groupStatus}'>`; // card group

            for (var groupDataIndex = 0; groupDataIndex < 8; groupDataIndex++) {
              var cardType = groupDataIndex < 4 ? "big-card" : "little-card",
                cardLink = sheetData[row + groupDataIndex + 1][col + 1];
              var card = `<div class='card ${cardType}' style='background-image: url(${cardLink})'></div>`; // card

              cardGroup += card; // adding card => card group

              var text = sheetData[row + groupDataIndex + 1][col + 2];
              if (text) {
                var textTag = `<p class='text'>${text}</p>`; // card

                textGroup += textTag; // adding text => text group
              }
            }

            cardGroup += "</div>"; // completing tag
            cardGroups += cardGroup; // adding card group => card groups

            textGroup += "</div>"; // completing tag
            textGroups += textGroup; // adding text group => text groups
          }
        }
      }
    }

    document.getElementById("card-groups").innerHTML = cardGroups;
    document.getElementById("text-content").innerHTML = textGroups;
    console.log(textGroups);
    groups = document.getElementsByClassName("card-group").length;
  };
});
