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

    upload|up [options] [object]         Upload either an extention or theme. eg. upload theme -e MyTheme.zip
    mcognosinit|mci [options] [file]     Start a new fresh mCognos configuration in this mCognos folder.
    mcognosupdate|mcu [options] [file]   Update all files with your mCognos configuration
    export|exp [options]                 Export Palettes
    import|imp [options] [file]          Import Objects
    defaultpalettes|dp [options] [file]  Convert public palettes export to default palettes file
    deletepalette|rmp [options] [id]     Delete Palette(s)

### upload

Usage: upload|up [options][object]

Upload either an extention or theme or visualisation. eg. upload theme -e MyTheme.zip

#### Options:

    -w --url [url] URL of cognos server
    -u --user [user] Cognos Username
    -p --password [password] Cognos Password
    -n --namespace [namespace] Cognos Namespace, when ommitted the default namespace is used
    -e, --extname <extname> The name of the extension or theme file. Mandatory.
    -c, --config [config] A .json configuration file. Any command-line parameter will override settings in this config file. The default is Settings.json.
    -h, --help output usage information

### export

Usage: export|exp [options]

Export Palettes

#### Options:

    -w --url [url] URL of cognos server
    -u --user [user] Cognos Username
    -p --password [password] Cognos Password
    -n --namespace [namespace] Cognos Namespace, when ommitted the default namespace is used
    -c, --config [config] A .json configuration file. Any command-line parameter will override settings in this config file. The default is Settings.json.
    -h, --help output usage information

### Import

Usage: import|imp [options][file]

Import Objects

#### Options:

    -w --url [url] URL of cognos server
    -u --user [user] Cognos Username
    -p --password [password] Cognos Password
    -n --namespace [namespace] Cognos Namespace, when ommitted the default namespace is used
    -c, --config [config] A .json configuration file. Any command-line parameter will override settings in this config file. The default is Settings.json.
    -h, --help output usage information

### delete

Usage: deletepalette|rmp [options][id]

Delete Palette(s)

Options:
-a, --all Delete all public palettes
-s, --silent Ask no questions
-w --url [url] URL of cognos server
-u --user [user] Cognos Username
-p --password [password] Cognos Password
-n --namespace [namespace] Cognos Namespace, when ommitted the default namespace is used
-c, --config [config] A .json configuration file. Any command-line parameter will override settings in this config file. The default is Settings.json.

### cognos mcognosinit

Start a new fresh mCognos configuration in this mCognos folder.

    mcognosinit|mci [options] [file]

#### Options:

    -c, --customize Customize mCognos for your own purpose
    -s, --silent Ask no questions
    -h, --help output usage information

### cognos mcognosinit

Update all files with your mCognos configuration

    mcognosupdate|mcu [options] [file]

#### Options:

    -c, --customize  Customize mCognos for your own purpose
    -s, --silent     Ask no questions
    -h, --help       output usage information
