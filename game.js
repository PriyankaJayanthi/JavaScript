
// To Create the map 
const container = document.querySelector('#container');

function createBoxes() {
  for (let i = 0; i < tileMap01.width; i++) {
    const row = container.appendChild(document.createElement('div'));
    for (let j = 0; j < tileMap01.height; j++) {
      const square = document.createElement('div');
      square.textContent =  tileMap01.mapGrid[j][i];
      square.setAttribute("id", ("X" + j.toString() + "Y" +i.toString()))
      square.setAttribute("class", "Map" + tileMap01.mapGrid[j][i])
      square.setAttribute("x", j)
      square.setAttribute("y", i)
      row.appendChild(square);
    }
  }
}
createBoxes();
// To prevent Key
window.addEventListener("keydown", function(e) {
  if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1){
      e.preventDefault();
  }
}, false);

// To call function based on key press
window.addEventListener('keyup', (e)  => {
  switch(e.key) 
  {
    case 'ArrowLeft':
      moveblock("L");
      break; 

    case 'ArrowRight':
      moveblock("R");
      break; 

    case 'ArrowUp':
      moveblock("U");
      break; 

    case 'ArrowDown':
      moveblock("D");
      break; 
  }
});

// To move blocks 
function moveblock(move)
{
  var current_cell = document.getElementById(playerpos);
  var posby;
  var posbx;
  var posx = parseInt(current_cell.getAttribute("x"));
  var posy = parseInt(current_cell.getAttribute("y"));
  switch (move)
  {
    case "L":
      posy = posy - 1;
      posby = posy - 2;
      break;
    case "R":
      posy = posy + 1;
      posby = posy + 2;
      break;
    case "U":
      posx = posx - 1;
      posbx = posx - 2;
      break;
    case "D":
      posx = posx + 1;
      posbx = posx + 2;
      break;
  };
  move_cordinates = "X" + posx.toString() + "Y" + posy.toString();
  var new_cell = document.getElementById(move_cordinates);
  // To make sure player does not go out of wall 
  if (!((new_cell.textContent.includes("W")) || (new_cell.textContent.includes("G"))))
  {
    if (new_cell.textContent.includes("B")) 
    {
      playerpos = move_cordinates;
      current_cell.className = "map";
      current_cell.innerHTML = " ";
      new_cell.className = "mapp"
      new_cell.innerHTML = "P";
      posbx = posbx + 2;
      move_cordinates = "X" + posbx.toString() + "Y" + posby.toString();
      var new_cell = document.getElementById(move_cordinates);
      new_cell.className = "mapb"
      new_cell.innerHTML = "R";
    }else {
      playerpos = move_cordinates;
      current_cell.className = "map";
      current_cell.innerHTML = " ";
      new_cell.className = "mapp"
      new_cell.innerHTML = "P";
    };
  };
  // to handle moving of the Block
}