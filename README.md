# Gulpfile.js
Generic gulpfile for web projects

## Installation ##
First you need to have [NodeJS](https://nodejs.org/en/download/) installed.
Then download the package.json file of this repository and put it at the root of your project or merge it with your own.

After that open a terminal inside your project root folder and :

    [sudo] npm install npm -g
    npm install

It will download and install gulp and all needed gulp plugins and dependencies.

## Usage ##

*Currently this gulpfile only minifies and version javascript files*

There is seven tasks currently defined in this gulpfile :

 - build-js-dev
*Minifies and versions project javascript files, also appends a sourcemap at the end of each files*

 - build-js
*Same as above but no sourcemap is generated*

 - clean-js
*Removes any previously built javascript file, you actually define the files to be removed with the property `clean` of the array containing the files list*

 - build-dev
*clean-js + build-js-dev*

 - build
*clean-js + build-js*

 - default
*Launches the `build` task when you run the gulp command without arguments*

 - watch-dev
*Watches files for changes and launches the `build-dev` task once a monitored file has changed*

 - watch
Same as above but launches the `build` task instead

All you need is to open a terminal in your projet root directory and enter the following command

    gulp watch-dev
    or
    gulp watch

This will run respectively the task build-dev or build each time one of your files changes.

## Files definition ##
At the begining of the gulpfile, right after modules require instructions is the following constant `jsAssets`, this is where you define the JavaScript files to process.

It's an object with three properties containing strings or arrays of strings, with paths or glob patterns as accepted by the [`src`](https://github.com/gulpjs/gulp/blob/master/docs/API.md#gulpsrcglobs-options) and [`dest`](https://github.com/gulpjs/gulp/blob/master/docs/API.md#gulpdestpath-options) methods of gulp.

`src` property defines the JavaScript files to be processed by the tasks
`clean` property defines the JavaScript files to be removed by the `clean`
`dest` property defines directory in which will go the files once processed

### Example ###
    const jsAssets = {
        src: [
            'public/js/**/*.js',
            '!public/js/**/*.min.js'
        ],
        clean: [
            'public/js/build/**/*.min.js'
        ],
        dest: 'public/build/js/'
    };

Processes all the files located under the directory `public/js/any-directory/any-filename.js` except the files in `public/js/any-directory/any-filename.min.js`, this to avoid infinite loop by processing newly created files.

Will put processed files in the directory `public/build/js/` and delete the files matching this pattern `public/js/build/any-directory/any-filename.min.js`

### Future tasks ###
I plan to add more task like Less/Sass compilation, babel compilation, concatenation etc
Will need to refactor soon so it doesn't get too messy !

In the meantime, feel free to [add you own](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md).

#### Licence ####
[MIT](https://opensource.org/licenses/MIT)
