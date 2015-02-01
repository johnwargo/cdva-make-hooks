#!/usr/bin/env node

//========================================================================
// make-hooks
//
// A node command for creating the Cordova hooks folders in a project
//
// by John M. Wargo (www.johnwargo.com)
//========================================================================

"use strict";

var colors = require('colors'),
  fs = require('fs'),
  path = require('path');

//*************************************
//some constants
//*************************************
var theStars = "**************";
//Where we want the hooks created
var hooksFolder = 'hooks';
//The array containing the hooks that aren't implemented. Sigh.
var skipHooks = ['after_plugin_uninstall'];
//The supported before/after hooks folders
var theHooks = ['build', 'compile', 'docs', 'emulate', 'platform_add', 'platform_rm', 'platform_ls', 'plugin_add', 'plugin_ls', 'plugin_rm', 'plugin_search', 'plugin_install', 'plugin_uninstall', 'prepare', 'run', 'serve'];
//The supported Windows Phone-only hooks folder(s), 
//this list exists to deal with windows-specific hooks that don't implement 
//after & before versions of this/these hooks. I'm calling them...orphans.
var orphanHooks = ['pre_package'];

var i;
//Used to store the list of all folders that will be created
var folderList = [];

function showHelp() {
  //read the help file
  var raw = fs.readFileSync(path.join(__dirname, 'help.txt')).toString('utf8');
  //write the contents of the help file to the console
  console.log(raw);
}

function checkValue(theArray, theVal) {
  return (theArray.indexOf(theVal) > -1);
}

function makeFolder(folderPath) {
  if (!fs.existsSync(folderPath)) {
    //No? Then create the folder
    console.log('Creating %s', currentFolder);
    fs.mkdirSync(currentFolder);
  } else {
    //Yes? Then skip it.
    console.log('Skipping %s'.yellow, currentFolder);
  }
}

//========================================================================
//Write out what we're running
//========================================================================
console.log("\n%s".green, theStars);
console.log("* Make-Hooks *".green);
console.log("%s\n".green, theStars);

//========================================================================
//Sort out the command line arguments
//========================================================================
var userArgs;
//Is the first item 'node'? then we're testing
if (process.argv[0].toLowerCase() == 'node') {
  //whack the first two items off of the list of arguments
  //This removes the node entry as well as the module name
  //This should only apply during testing
  userArgs = process.argv.slice(2);
} else {
  //whack the first item off of the list of arguments
  //This removes just the module name
  userArgs = process.argv.slice(1);
}

//========================================================================
//Do we have any arguments left?
//========================================================================
if (userArgs.length < 1) {
  //Nothing on the command line, so show the help file
  showHelp();
  process.exit(1);
}

//========================================================================
//Do we have -all on the command line?
//========================================================================
var doAll = checkValue(userArgs, '-all');
var doList = checkValue(userArgs, '-l');

//========================================================================
//Are we just displaying a list of hooks?
//========================================================================
if (doList) {
  //The folder list is just the hooks list plus  the orphan hooks
  folderList = theHooks.concat(orphanHooks);
  console.log('Available hooks:\n\n%s', folderList.sort().join('\n'));
  //and exit
  process.exit(1);
}

//Now we know we're not listing hooks, but actually making folders,
//So process the list of hooks
if (doAll) {
  //Tell the user what we're doing
  console.log('Processing all folders\n');
  //Then use all of the hooks
  for (i = 0; i < theHooks.length; i++) {
    //Get the hook option
    key = theHooks[i];
    folderList.push('before_' + key);
    folderList.push('after_' + key);
  }
  //Now add the orphan hooks to the list  
  folderList = folderList.concat(orphanHooks);
} else {
  //Only processing a subset of the hooks list
  //Tell the user what we're doing
  console.log('Processing command parameters\n');
  //Compare the argument list to the possible Hooks and build the
  //folder list from there.
  for (i = 0; i < userArgs.length; i++) {
    //Get the current argument
    var key = userArgs[i];
    //Is the argument in the hooks list?
    if (checkValue(theHooks, key)) {
      //Then append the folder names to the folder list
      folderList.push('before_' + key);
      folderList.push('after_' + key);
    } else {
      console.log('Skipping invalid hook: %s', key);
    }
  }
  //Do the same thing for the Windows hooks as well
  for (i = 0; i < userArgs.length; i++) {
    //Get the current argument
    var key = userArgs[i];
    //Is the argument in the windows hooks list?
    if (checkValue(orphanHooks, key)) {
      //Then append the folder name to the folder list
      folderList.push(key);
    }
  }
}

//Now make sure all of the skipHook values are removed from the folder list
//Right now there's only one skiphook, so this code could be easier, 
//but I wanted to write this in such a way that I don't have to rewrite
//it when Cordova adds another exception to the list
for (i = 0; i < skipHooks.length; i++) {
  var thePos = folderList.indexOf(skipHooks[i]);
  if (thePos != -1) {
    folderList.splice(thePos, 1);
  }
}

//========================================================================
//Do we have anything in the folder list? It's unlikely that we wouldn't 
//by the time we got here
//========================================================================
if (folderList.length > 0) {
  //Tell the user what we're going to create
  console.log('Folders: %s\n', folderList.sort().join(', '));
  //Get the current folder
  var wrkFolder = process.cwd();
  //First make sure we have a hooks folder
  //Build the full path pointing to the hooks folder
  var currentFolder = path.join(wrkFolder, hooksFolder);
  //create the folder
  makeFolder(currentFolder);
  //loop through the folder list, creating as you go
  for (i = 0; i < folderList.length; i++) {
    //Build the full path to the folder being created
    currentFolder = path.join(wrkFolder, hooksFolder, folderList[i]);
    makeFolder(currentFolder);
  }
} else {
  //No folders to process  
  console.error("\nError: No folders to process\n".red);
}