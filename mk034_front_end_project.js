function colorCheck(rowIndex, columnIndex) {
  return $("tr").eq(rowIndex).find("td").eq(columnIndex).find("button").css("background-color")
}

function bottomCheck(columnIndex) {
  for (var iRow = 6; iRow > -1; iRow--) {
    if (colorCheck(iRow, columnIndex) === "rgb(128, 128, 128)") {
      return iRow;
    }
  }
}

function colorChange(rowIndex, columnIndex, playerColor) {
  return $("tr").eq(rowIndex).find("td").eq(columnIndex).find("button").css("background-color", playerColor);
}

function colorMatchCheck(c1, c2, c3, c4) {
  return (c1 === c2 && c1 === c3 && c1 === c4 && c1 !== "rgb(128, 128, 128)" && c1 !== undefined);
}

function winCheck() {
  for (var iRow = 0; iRow < 7; iRow++) {
    for (var iCol = 0; iCol < 7; iCol++) {
      if (iRow+3 < 7 && iCol+3 < 7) {
        if (colorMatchCheck(colorCheck(iRow, iCol), colorCheck(iRow+1, iCol+1), colorCheck(iRow+2, iCol+2), colorCheck(iRow+3, iCol+3))) {
          return true;
        }
      }
      if (iRow-3 > -1 && iCol+3 < 7) {
        if (colorMatchCheck(colorCheck(iRow, iCol), colorCheck(iRow-1, iCol+1), colorCheck(iRow-2, iCol+2), colorCheck(iRow-3, iCol+3))) {
          return true;
        }
      }
      if (iRow+3 < 7) {
        if (colorMatchCheck(colorCheck(iRow, iCol), colorCheck(iRow+1, iCol), colorCheck(iRow+2, iCol), colorCheck(iRow+3, iCol))) {
          return true;
        }
      }
      if (iCol+3 < 7) {
        if (colorMatchCheck(colorCheck(iRow, iCol), colorCheck(iRow, iCol+1), colorCheck(iRow, iCol+2), colorCheck(iRow, iCol+3))) {
          return true;
        }
      }
    }
  }
}

var player1 = prompt("Player One: Enter Your Name, you will be Blue");
var player1Color = 'rgb(86, 151, 255)';

var player2 = prompt("Player Two: Enter Your Name, you will be Red");
var player2Color = 'rgb(237, 45, 73)';

$('h3').text(player1 + ": it is your turn, please pick a column to drop your blue chip.");

var currentPlayer = 1;
var currentName = player1;
var currentColor = player1Color;

$('button').on('click', function () {

  var columnIndex = $(this).closest("td").index();

  colorChange(bottomCheck(columnIndex), columnIndex, currentColor);

  if (winCheck()) {
    $('h1').text(currentName + " has won! Refresh your browser to play again!").css("fontSize", "50px");
    $('h2').fadeOut('fast');
    $('h3').fadeOut('fast');
    $('table').fadeTo("slow" , 0.1);
    return;
  }

  currentPlayer = currentPlayer * -1 ;
  if (currentPlayer === 1) {
    currentName = player1;
    $('h3').text(currentName + ": it is your turn, please pick a column to drop your blue chip.");
    currentColor = player1Color;
  }
  else {
    currentName = player2
    $('h3').text(currentName+": it is your turn, please pick a column to drop your red chip.");
    currentColor = player2Color;
  }
})
