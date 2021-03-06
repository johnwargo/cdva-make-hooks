# Cordova Hooks (cdva-hooks)

Automates the creation of a Apache Cordova project's hooks folders. With hooks folders, any executable code placed in the folder is executed at specific points in the Cordova project lifecycle. Developers create separate folders for each event they want to augment with their custom code, and the Cordova CLI automatically takes care of the process. The Cordova hooks folders are placed in a Cordova project folder called `hooks`. For details on the Cordova hooks approach, see [http://cordova.apache.org/docs/en/dev/guide/appdev/hooks/index.html](http://cordova.apache.org/docs/en/dev/guide/appdev/hooks/index.html). 

**Note**: *Unfortunately, the hooks folder approach was deprecated [http://cordova.apache.org/docs/en/dev/guide/appdev/hooks/index.html#via-hooks-directory-deprecated](http://cordova.apache.org/docs/en/dev/guide/appdev/hooks/index.html#via-hooks-directory-deprecated), but apparently it still works until they remove it completely.*  

## Installation

To install the module, open a terminal window and execute the following command:

	npm install -g cdva-hooks 

## Usage

Execute the module by executing the `cdva-hooks` command at a command-line. The module expects to be executed from a Cordova project folder (although it doesn't check to see if it's in a Cordova project folder) and accepts the following command-line switches:

+ `-all`: Create all hooks folders

+ `-l`: List all hooks options

**Examples:**

To display this modules's help file, issue the `cdva-hooks` command without any parameters:

	cdva-hooks

To create all of the Cordova `hooks` folders, use the following:

    cdva-hooks -all
	
To list the available Cordova hooks options use the following:

    cdva-hooks -l

To create folders for specific hooks, specify one or more hooks on the command-line. 

    cdva-hooks hook_list

So, for example, to create the `platform_add` and `prepare` hooks folders, use the following:

    cdva-hooks platform_add prepare
	
Since both of those have before and after options, the command will create the following folders:

	before_platform_add
	after_platform_add
	before_prepare
	after_prepare

## Revision History

October 8, 2016 - Changed the code that processes command-line arguments. Updated the hooks folder list, removing some and adding others.

July 26, 2015 - Fixed serious issues with the readme file - it listed cdvahook instead of cdva-hooks everywhere. Noticed as part of this that the node command used to invoke this didn't align with the module name, so I (sorry) changed it. Originally, the command was invoked using cdvahook, but because the module name is different, I changed it to match the module name.  

***

You can find information on many different topics on my [personal blog](http://www.johnwargo.com). Learn about all of my publications at [John Wargo Books](http://www.johnwargobooks.com).

If you find this code useful and feel like thanking me for providing it, please consider <a href="https://www.buymeacoffee.com/johnwargo" target="_blank">Buying Me a Coffee</a>, or making a purchase from [my Amazon Wish List](https://amzn.com/w/1WI6AAUKPT5P9).
            
