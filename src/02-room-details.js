/*
  Do not change the lines below. If you'd like to run code from this file, you may use the `exampleDinosaurData` and `exampleRoomData` variables below to gain access to each data set. This data is pulled from the relevant files in the `data/` directory.

  You may use this data to test your functions. You may assume the shape of the data remains the same but that the values may change.
*/
const exampleDinosaurData = require("../data/dinosaurs");
const exampleRoomData = require("../data/rooms");
// Do not change the lines above.

/**
 * getRoomByDinosaurName()
 * ---------------------
 * Return the name of the room where the given dinosaur can be found. If the dinosaur does not exist in the `dinosaurs` list or cannot be found in any room, return an error message that says so.
 *
 * @param {Object[]} dinosaurs - An array of dinosaur objects. See the `data/dinosaurs.js` file for an example of the input.
 * @param {Object[]} rooms - An array of room objects. See the `data/rooms.js` file for an example of the input.
 * @param {string} dinosaurName - The name of the dinosaur.
 * @returns {string} The name of the room where the dinosaur can be found. Alternatively, an error message.
 *
 * EXAMPLE:
 *  getRoomByDinosaurName(dinosaurs, rooms, "Tyrannosaurus");
 *  //> "Roberts Room"
 *
 * EXAMPLE:
 *  getRoomByDinosaurName(dinosaurs, rooms, "Pterodactyl");
 *  //> "Dinosaur with name 'Pterodactyl' cannot be found."
 */
function getRoomByDinosaurName( dinosaurs, rooms, dinosaurName ) {

  // Declaring and Initializing variables to use within this function
  let dinosaurID = "";

  // using this forInLoop to check thru the dinosaurs object array to find the dinosaurId of the dinosaurName.
  // once we have found it we will assign the dinosaurId value into a variable which we will use later.
  // we will also update a boolean variable 'found' and set its value to true. We will also be using this later.
  for ( let index in dinosaurs ){
    if ( dinosaurs[index].name === dinosaurName )
      dinosaurID = dinosaurs[index].dinosaurId;
  } // ends forInLoop
  
  // this ifStatement will trigger when the dinosaurName is not found in the dinosaurs array of objects.
  if ( !dinosaurID ){
    return `Dinosaur with name '${dinosaurName}' cannot be found.`;
  }else{
    
    for ( let index in rooms ){
      if( rooms[index].dinosaurs.includes( dinosaurID ) )
        return rooms[index].name;     
    } // ends forInLoop

    return `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`

  } // end of Else

} // ends getRoomByDinosaurName()


/**
 * getConnectedRoomNamesById()
 * ---------------------
 * Returns an array of strings, where each string is the name of a room connected to the given room. 
 * If a room ID cannot be found, an error message is returned.
 *
 * @param {Object[]} rooms - An array of room objects. See the `data/rooms.js` file for an example of the input.
 * @param {string} id - A unique room identifier.
 * @returns {string|string[]} An array of room names, or an error message.
 *
 * EXAMPLE:
 *  getConnectedRoomNamesById(rooms, "aIA6tevTne");
 *  //> ["Ticket Center"]
 *
 * EXAMPLE:
 *  getConnectedRoomNamesById(rooms, "A6QaYdyKra");
 *  //> [
      "Entrance Room",
      "Coat Check Room",
      "Ellis Family Hall",
      "Kit Hopkins Education Wing"
    ]
 */
function getConnectedRoomNamesById(rooms, id) {

  // using two different arrays to compare them to each other the deeper I go into the function.
  let roomNames = [];
  let roomNameUpdated = [];
  let found = false;

  for ( let index in rooms ){
    if ( rooms[index].roomId == id ){
      found = true;
      // We will be using this innerForInLoop to fill the roomNames array with their proper names and not iDs
      for ( let roomIndex in rooms[index].connectsTo ){
        roomNames.push(rooms[index].connectsTo[roomIndex]);
      } // ends innerForInLoop
    } // ends if Statement
  } // ends outterForInLoop

  // This ifStatement checks to see if the id param is even in the rooms Array of Objects.
  if( !found )
    return `Room with ID of '${id}' could not be found.`
  
  // come back to this code and use includes. Maybe the code will be shorter and wont make use of the ifStatement in line 121
  for ( let index in roomNames ){
    for ( let roomIndex in rooms ){
      if ( roomNames[index] === rooms[roomIndex].roomId )
        roomNameUpdated.push(rooms[roomIndex].name);
    } // ends the innerForInLoop
  } // ends the outerForInLoop

  // This ifElse checks to see if the length of the roomNames is the same as the roomNameUpdated. 
  // If it is not, it means it did not find a room-id meaning it was incorrect.
  // Hence we update the return statement according to the instructions. 
  if ( roomNames.length === roomNameUpdated.length )
    roomNames = roomNameUpdated;
  else
    return `Room with ID of 'incorrect-id' could not be found.`;
  
  // console.log( roomNames );
  return roomNames;

} // ends getConnectedRoomNamesById()

module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
