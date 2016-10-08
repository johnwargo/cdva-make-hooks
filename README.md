Cordova Hooks (cdva-hooks)
==========================
Automates the creation of a Cordova project's hooks folders; for information about Cordova hooks, see [http://cordova.apache.org/docs/en/dev/guide/appdev/hooks/index.html#Hooks%20Guide](http://cordova.apache.org/docs/en/dev/guide/appdev/hooks/index.html#Hooks%20Guide).

To install the module, open a terminal window and execute the following command:

	npm install -g cdva-hooks 

The module expects to be executed from a Cordova project folder (although it doesn't check to see if it's in a Cordova project folder) and accepts the following command-line switches:

+ `-all`: Create all hooks folders

+ `-l`: List all hooks options

Usage:

To display this modules's help file, issue the `cdva-hooks` command without any parameters:

	cdva-hooks

To create all of the Cordova hooks folders, use the following:

    cdva-hooks -all
	
To list the available Cordova hooks options use the following:

    cdva-hooks -l

To create folders for specific hooks, specify one or more hooks on the command-line. 

    cdva-hooks hook_list

So, for example, to create the platform_add and prepare hooks folders, use the following:

    cdva-hooks platform_add prepare
	
Since both of those have before and after options, the command will create the following folders:

	before_platform_add
	after_platform_add
	before_prepare
	after_prepare

Note: The Windows Phone-only hook, `pre_package`, does not have a before or after option, so it will only create one folder.

Revision History
----------------
July 26, 2015 - Fixed serious issues with the readme file - it listed cdvahook instead of cdva-hooks everywhere. Noticed as part of this that the node command used to invoke this didn't align with the module name, so I (sorry) changed it. Originally, the command was invoked using cdvahook, but because the module name is different, I changed it to match the module name.  


* * *
By [John M. Wargo](http://www.johnwargo.com) - if you like and/or use this module, why not pick up [one of my books](http://www.johnwargobooks.com)?