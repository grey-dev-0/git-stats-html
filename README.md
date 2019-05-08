# Git Stats HTML exporter

This is a replacement for [IonicaBizau/git-stats-html](https://github.com/IonicaBizau/git-stats-html) that works on the newer versions of NodeJS and, compatible with the original output of [IonicaBizau/git-stats](https://github.com/IonicaBizau/git-stats) and, it has an extra feature of showing how many commits have been done on a specific day in a tooltip when hovering.

## Installation

You can install this app **as root user on UNIX** via:
```bash
# npm install -g git-stats-html2
```

Optionally you can install `pageres-cli` to render the HTML file into an image file.
```bash
# npm install -g pageres-cli
```

Installation goes the same way on Windows.

## Usage

You can create an HTML file including your git history card using the following command:
```bash
$ git-stats --raw -s '2018-01-01' -u '2019-01-01' | git-stats-html filename.htm
```

The `-s` and `-u` flags are optional and they mean `since` and `until` respectively so, you can set them to any date you'd like, feel free to check the rest of the documentation regarding `git-stats` [here](https://github.com/IonicaBizau/git-stats)

**PS:** `filename.htm` is also optional set it to any filename you'd like but, it has to end with `.htm` or `.html` of course, if you don't set it the app will generate the file with the name `git-stats.htm` by default.

## Exporting as Image

If you have installed `pageres-cli` you can create the image file out of the generated HTML like this:
```bash
$ pageres git-stats.htm 2048x400 --selector='#container'
```

You can replace `git-stats.htm` with the filename you chose when you generated the HTML, and `2048` can be replaced with the desired width of the exported image in pixels, so that it fits the commits history if you exported a large date range.

## Contributions <small>and notes</small>

 Feel free to build upon this tool but, please don't hammer me with bad code design comments because, I come from a php background and, I don't do node and, this tool is sort of my first touch with node, I made this tool because I was in need of its original counterpart to monitor my git commits performance, which suddenly stopped working due to NodeJS having a breaking update, and the developer who originally created the `git-stats` apps haven't resolved the issue for so long that I couldn't wait.
 
 All the credit still goes to the original creator [Johnny B.](https://github.com/IonicaBizau) so, no hard feelings because, we all have our schedules and private projects so, providing the open source community a new tool or a fix isn't always available, even for the developers who work on open source projects.
 
 For any questions or queries please send me an email to [mo7y.66@gmail.com](mailto:mo7y.66@gmail.com) and, for issues, ideas and, suggestions Github's issue tracker is always open. Cheers.
