# cognos-cli

command line tools for IBM Cognos Analytics.

### Install

You need to have nodejs installed. once you have that working, type the following at the prompt:

    npm install -g cognos-cli

### Actions

extension: Uploads extension into cognos.
theme: Uploads theme into cognos.

### Usage

    cognos [options] [command]

#### Options

    -d, --debug                         Shows debug output
    -V, --version                       output the version number
    -h, --help                          output usage information

#### Commands
    upload|up [options] <file>          upload a cognos extention or theme
    mcognosinit|mci [options] [file]    Start a new fresh mCognos configuration in this mCognos folder.
    mcognosupdate|mcu [options] <file>  Update all files with your mCognos configuration


### cognos upload

upload a cognos extention or theme

    upload|up [options] <file>

#### Options:

    -a, --address <address>      The address of the cognos instance.
    -u, --username <username>    The user to authenticate as
    -p, --password <password>    The user's password
    -n, --namespace <namespace>  The cognos namespace, if not the default
    -e, --extname <extname>      The name of the extension or theme. Mandatory.
    -p, --debug                  Produce more output for debugging.
    -c, --config <config>        A .json configuration file. Any command-line parameter will override settings in this config file
    -h, --help                   output usage information

### cognos mcognosinit

Start a new fresh mCognos configuration in this mCognos folder.

    mcognosinit|mci [options] [file]

#### Options:

-c, --customize  Customize mCognos for your own purpose
-s, --silent     Ask no questions
-h, --help       output usage information


### cognos mcognosinit

Update all files with your mCognos configuration

    mcognosupdate|mcu [options] [file]

#### Options:

-c, --customize  Customize mCognos for your own purpose
-s, --silent     Ask no questions
-h, --help       output usage information
