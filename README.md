Cordova Hooks (cdva-hooks)
========================
Automates the creation of a Cordova project's hooks folders. To install the module, open a terminal window and execute the following command:

	npm install -g cdvahook 

The module expects to be executed from a Cordova project folder (although it doesn't check and accepts the following command-line switches:

+ `-all`: Create all hooks folders

+ `-l`: List all hooks options

Usage:

To display this modules's help file, issue the `cdvahook` command without any parameters:

	cdvahook

To create all of the Cordova hooks folders, use the following:

    cdvahook -all
	
To list the available Cordova hooks options use the following:

    cdvahook -l

To create folders for specific hooks, specify one or more hooks on the command-line. 

    cdvahook hook_list

Example:

    cdvahook platform_add prepare
	
This will create hooks folders for the 'platform_add' and 'prepare commands'. Since both of those have before and after options, the command will create the following folders:

	before_platform_add
	after_platform_add
	before_prepare
	after_prepare

The Windows Phone-only hook, `pre_package`, does not have a before or after option, so it will only create one folder.

* * *
By [John M. Wargo](http://www.johnwargo.com) - if you like and/or use this module, why not pick up [one of my books](http://www.johnwargobooks.com)?