/*
  Do not change the line below. If you'd like to run code from this file, you may use the `exampleDinosaurData` variable below to gain access to tickets data. This data is pulled from the `data/dinosaurs.js` file.

  You may use this data to test your functions. You may assume the shape of the data remains the same but that the values may change.

  Keep in mind that your functions must still have and use a parameter for accepting all dinosaurs.
*/
const exampleDinosaurData = require("../data/dinosaurs");
// Do not change the line above.

/**
 * getLongestDinosaur()
 * ---------------------
 * Returns an object with the longest dinosaur from the list. Converts from meters to feet.
 *
 * NOTE: To convert from meters to feet, multiply the meters by `3.281`.
 *
 * @param {Object[]} dinosaurs - An array of dinosaur objects. See the `data/dinosaurs.js` file for an example of the input.
 * @returns {Object} An object where the key is the name of the dinosaur and the value is the height of the dinosaur in feet.
 *
 * EXAMPLE:
 *  getLongestDinosaur(dinosaurs);
 *  //> { Brachiosaurus: 98.43 }
 */
function getLongestDinosaur( dinosaurs ) {

  // creating a new Dinosaur object with custom keys and values
  let dinoObj = {};

  // checking to see if the dinosaurs [] has anything inside
  if ( dinosaurs.length <= 0 ){

    return dinoObj;

  }else{
    
    // creating variables to test for the longest dino
    let longestDinoName = dinosaurs[0].name;
    let longestDinoLength = dinosaurs[0].lengthInMeters * 3.28;

    // We use bracket notation to assign the name of the first Dinosaur as the name of the key the we
    dinoObj[ `${longestDinoName}` ] = longestDinoLength;

    for ( let i = 1; i < dinosaurs.length ; i++ ){ 

      if ( longestDinoLength < ( dinosaurs[i].lengthInMeters * 3.28 ) ){
        
        // deleting the previous keyName otherwise it will stay inside the dinoObj
        delete dinoObj[`${longestDinoName}`];
  
        // lets update the variables
        longestDinoName = dinosaurs[i].name;
        longestDinoLength = dinosaurs[i].lengthInMeters * 3.28;
  
        // change the values of the key and value
        dinoObj[ `${longestDinoName}` ] = longestDinoLength;

      } // ends the inner-ifElse Statement
  
    } // ends forLoop

  } // ends the outer-ifElse Statement

  // console.log( dinoObj );

  return dinoObj;

} // ends getLongestDinosaur()

/**
 * getDinosaurDescription()
 * ---------------------
 * Returns a formatted description of a dinosaur. If the dinosaur cannot be found, returns an error message.
 *
 * NOTE: Carefully view the test output and example below to see how the returned string should be formatted.
 *
 * NOTE: The `\n` represents a new line in text.
 *
 * @param {Object[]} dinosaurs - An array of dinosaur objects. See the `data/dinosaurs.js` file for an example of the input.
 * @param {string} id - The unique identifier for the dinosaur.
 * @returns {string} A detailed description of the dinosaur.
 *
 * EXAMPLE:
 *  getDinosaurDescription(dinosaurs, "U9vuZmgKwUr");
 *  //> "Xenoceratops (ZEE-no-SEH-ruh-tops)\nXenoceratops had horns and a bony frill with elaborate ornamentation of projections, knobs, and spikes. It lived in the Early Cretaceous period, over 77.5 million years ago."
 *
 *  getDinosaurDescription(dinosaurs, "incorrect-id");
 *  //> "A dinosaur with an ID of 'incorrect-id' cannot be found."
 */
function getDinosaurDescription(dinosaurs, id) {

  // Declaring and initializing variables to later use inside the functions to work out my personal logic
  let newValuesArray = [];
  let result = "";
  let mya = "";

  // Using ONE for loop to iterate thru the dinosaurs and get the infor needed inside the variables declared above
  for ( let i = 0; i < dinosaurs.length; i++ ){

    newValuesArray.push( dinosaurs[i].dinosaurId );

    if ( dinosaurs[i].dinosaurId === id ){

      // this ifElse Statement checks to see if the mya has more than two values. If it does then assign the value found on index 1 of mya to variable mya
      if ( dinosaurs[i].mya.length > 1 )
        mya = dinosaurs[i].mya[1];
      else
        mya = dinosaurs[i].mya

      // populate the STRING that will be returned
      result = `${dinosaurs[i].name} (${dinosaurs[i].pronunciation})\n${dinosaurs[i].info} It lived in the ${dinosaurs[i].period} period, over ${mya} million years ago.` 
    
    } // ends the ifElse Statement that looks for the ID provided as a paramter and if it finds it, it formats a STRING according to the instructions.

  } // ends forLoop002

  // we populated this array inside the forLoop to check if the dinosaur with that particular id is even there. Will try to find out why this did not work on an ifElse Statement inside the forLoop above.
  if ( !newValuesArray.includes(id) )
    result = `A dinosaur with an ID of '${id}' cannot be found.`

    return result;

} // ends getDinosaurDescription()


/**
 * getDinosaursAliveMya()
 * ---------------------
 * Returns an array of dinosaurs who were alive at the given `mya` (i.e. "millions of years ago") value. 
 * If a `key` is provided, returns the value of that key for each dinosaur alive at that time. Otherwise, returns the ID.
 * If the dinosaur only has a single value for `mya`, allows for the `mya` value to be equal to the given value or one less. 
 * For example, if a dinosaur has a `mya` value of `[29]`, the dinosaur's information will be returned if `29` is entered or `28` is entered.
 * 
 * @param {Object[]} dinosaurs - An array of dinosaur objects. See the `data/dinosaurs.js` file for an example of the input.
 * @param {number} mya - "Millions of years ago."
 * @param {string} key - An optional parameter. If included, for dinosaurs that lived during the `mya` value given, will return the value of the supplied key. Otherwise, returns the ID.
 * @returns {*[]} An array of values, which depend on the key given. The array should only include data of dinosaurs who lived during the given time period.
 *
 * EXAMPLE:
 *  getDinosaursAliveMya(dinosaurs, 150);
 *  //> ["YLtkN9R37", "GGvO1X9Zeh", "BFjjLjea-O", "V53DvdhV2A"]
 *
 *  getDinosaursAliveMya(dinosaurs, 65);
 *  //> ["WHQcpcOj0G"]
 *
 *  getDinosaursAliveMya(dinosaurs, 65, "name");
 *  //> ["Dracorex"]
 *
 *  getDinosaursAliveMya(dinosaurs, 65, "unknown-key");
 *  //> ["WHQcpcOj0G"]
 */
function getDinosaursAliveMya(dinosaurs, mya, key) {

  let resultDinoArrayID = [];

  // Entering a forLoop to get the info we need IF its there.
  for ( let i = 0; i < dinosaurs.length; i++ ){

    // this ifElse statement takes care if its inBetween the range
    if ( dinosaurs[i].mya.length === 2 && dinosaurs[i].mya[0] > mya && dinosaurs[i].mya[1] < mya ){
      // the following ifElse Statement checks to see if the 'key' has been provided and changes the values pushed into the the resultDinoArrayID from regularIDs to the dinosaur 'name'
      if ( key !== undefined )
        resultDinoArrayID.push( dinosaurs[i].name )
      else 
        resultDinoArrayID.push( dinosaurs[i].dinosaurId );
        
    }else if ( dinosaurs[i].mya.includes( mya ) ){
      // uses the Array.includes() to check if the 'mya' is inside the array values
      // the following ifElse Statement checks to see if the 'key' has been provided and changes the values pushed into the the resultDinoArrayID from regularIDs to the dinosaur 'name'
      if( key !== undefined )
        resultDinoArrayID.push( dinosaurs[i].name )
      else 
        resultDinoArrayID.push( dinosaurs[i].dinosaurId );

    }else if ( dinosaurs[i].mya.length === 1 && ( dinosaurs[i].mya - 1 )  === mya ){

      resultDinoArrayID.push( dinosaurs[i].dinosaurId )

    } // ends the ifElse Statement

  } // ends forLoop

  return resultDinoArrayID;

} // ends getDinosaursAliveMya()

module.exports = {
  getLongestDinosaur,
  getDinosaurDescription,
  getDinosaursAliveMya,
};
