
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
      if(tileMap01.mapGrid[j][i] == "W") {
        square.classList.add(Tiles.Wall);
      }            
      else if(tileMap01.mapGrid[j][i] == "G") {
        square.classList.add(Tiles.Goal);
      }    
      else if(tileMap01.mapGrid[j][i] == "P") {
        square.classList.add(Entities.Character);
        playerpos = ("X" + j.toString() + "Y" +i.toString())
      }       
      else if(tileMap01.mapGrid[j][i] == "B") {
        square.classList.add(Entities.Block);
      } 
      else{
        square.classList.add(Tiles.Space);
      }             
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
  var player_current_pos = document.getElementById(playerpos);
  var playerposx = parseInt(player_current_pos.getAttribute("x"));
  var playerposy = parseInt(player_current_pos.getAttribute("y"));
  var posx = 0;
  var posy = 0;
  switch (move)
  {
    case "L":
      posy = posy - 1;
      break;
    case "R":
      posy = posy + 1;
      break;
    case "U":
      posx = posx - 1;
      break;
    case "D":
      posx = posx + 1;
      break;
  };
  // to store current position 
  var current_cell_cordinates = "X" + (playerposx).toString() + "Y" + (playerposy).toString();
  var current_cell = document.getElementById(current_cell_cordinates);

  // to store next move coordinates 
  var next_cell_cordinates = "X" + (playerposx + posx).toString() + "Y" + (playerposy  + posy).toString();
  var next_cell = document.getElementById(next_cell_cordinates);

  // to future current position 
  var future_cell_cordinates = "X" + (playerposx + (posx * 2)).toString() + "Y" + (playerposy + (posy * 2)).toString();
  var future_cell= document.getElementById(future_cell_cordinates);

  // if next cell is wall return 
  if ((next_cell.classList.contains(Tiles.Wall))) 
  {
    return;
  } 
  // if next cell is block 
  if ((next_cell.classList.contains(Entities.Block))) 
  {
    if ((future_cell.classList.contains(Tiles.Wall)) || (future_cell.classList.contains(Entities.Block))) 
    {
      return;
    } 
    next_cell.classList.remove(Entities.Block);
    future_cell.classList.add(Entities.Block);
    future_cell.innerHTML = "B";
    if (future_cell.classList.contains(Tiles.Goal)) 
    {
      future_cell.classList.add(Entities.BlockDone);
    }
  } 
  // To handle if next cell is Goal
  if (current_cell.classList.contains(Tiles.Goal))
  {
    current_cell.classList.remove(Entities.Character);
    current_cell.innerHTML = "G";
    next_cell.classList.add(Entities.Character); 
    next_cell.innerHTML = "P";
    if ((!(current_cell.classList.contains(Entities.Block))) && ((current_cell.classList.contains(Tiles.Goal)) && (current_cell.classList.contains(Entities.BlockDone))))
    {
      current_cell.classList.remove(Entities.BlockDone);
    }
  }
  else
  {
  current_cell.classList.remove(Entities.Character);
  current_cell.classList.add(Tiles.Space);
  current_cell.innerHTML = " ";
  next_cell.classList.add(Entities.Character); 
  next_cell.innerHTML = "P";
  }
  playerpos = next_cell_cordinates;
  // check if game won!!
  var totalgoals = document.getElementsByClassName(Tiles.Goal);
  var totalgoalsdone = document.getElementsByClassName(Entities.BlockDone);
  if (totalgoals.length == totalgoalsdone.length)
  {
  var result = document.getElementById('result');
  result.textContent = 'Game Won!!';
  }
}