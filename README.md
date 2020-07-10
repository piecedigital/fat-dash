# fat-dash - dashboard for FPS Aim Trainer

Track your own progess in FPS Aim Trainer. Analyze your challenges, scenarios and time periods by importing csv files which are created by the game for each challenge.

![image](https://user-images.githubusercontent.com/45684225/55286990-75a47e80-53a3-11e9-82ff-bca02dba8cf3.png)

## Getting started

1. Click on the upload icon on the top left.
2. Select all challenge files created from the game. E.g. `<Your steam lib folder>\steamapps\common\FPSAimTrainer\FPSAimTrainer\stats`
3. Crunch some numbers.

## Widgets

### Challenge History

See your most recent challenges and compare measures like score with the scenario average. Challenges can be filtered by date and scenario - just click on the filter icon to the right of the table header name. Choose and switch between a measure to display for all challenges.

### Time Line

Track your progress on some measure over a period of time. Filter by scenario and measure by clicking somewhere on the widget header bar. See Graph Controls for further details.

### Graph controls

- Drag vertically/horizontally on the graph to get a slice of the graph.
- Drag to zoom in and double-click to return to the original graph. Alternative: Zoom and Autoscale buttons at the top right of widget.
- Drag the graph corners to zoom along one axis
- Double-click x or y axis to autoscale on a single axis
- Hover over a graph point to get its coordinates
- Hold <kbd>shift</kbd> + Left Mouse to move around in the graph. Alternatives: Drag an axis or press the pan-button at the top right of the graph

## Scenario groups

You can create your own scenario groups containing multiple freely chosen scenarios. These scenario groups provide  average-based progress tracking of all contained scenarios in one simple graph and can be selected like a plain scenario in the Time Line widget.

E.g. you could take all scenarios from the routines in the AIMER7 guide [Link](https://www.dropbox.com/s/vaba3potfhf9jy1/KovaaK%20aim%20workout%20routines.pdf?dl=0). Track, how well you have performed for all scenarios over time and gauge if your ready for harder stuff. More example groups:

- reflex flick scenarios
- tracking scenarios
- scenarios with "1wall target XY"
- scenarios with weapon XY
- all played(!) scenarios to get overall game progress in one nutty graph (could take one more sec to finish :-P)
- ... only limited by your creativity ...

### Create group
from Time Line Chart:
![create scenario group alt1](https://user-images.githubusercontent.com/45684225/56912399-79fdad80-6aaf-11e9-9122-cd9d53706a9a.png)

Alternatively under settings:
![settings](https://user-images.githubusercontent.com/45684225/56912510-af0a0000-6aaf-11e9-94a5-e1ace560b19c.png)
![create_group2](https://user-images.githubusercontent.com/45684225/56912528-b6310e00-6aaf-11e9-9dc3-2bf9177f6088.png)

### Show graph for created group
Simply select one of the groups in the Time Line chart scenario select.
![image](https://user-images.githubusercontent.com/45684225/56913216-5dfb0b80-6ab1-11e9-8f2a-0839edc052d9.png)

### Import/Export scenario groups as file
Under settings you can import or export scenario groups from/to a file to create a backup or share them.

![import-export](https://user-images.githubusercontent.com/45684225/56913344-aca8a580-6ab1-11e9-941c-2fb1bddcedb4.png)

> IMPORTANT - yeah, really - : All settings are stored in the browser, so you don't have to reimport them as you do with the csv files. However, if your browser session (cookies,etc.) is cleared up in some way, scenario groups may be deleted after tab/browser close  and are lost! Things that clear up are: "clear history" setting in browser, surfing in private mode, cleaner extensions, etc... . Make sure to not use above for the site "https://fat-dash.github.io". You also can go safe and just make a regular backup with these buttons.

## Upload settings

In the game under Game Options, you can set the Statistics Export mode. Recommended value:
![image](https://user-images.githubusercontent.com/45684225/58378813-956ab400-7f9a-11e9-94b7-cf2c71d08b41.png)

To get rid of aborted challenges, **per default** all challenges with a zero value score are filtered out as its suitable in almost all situations. If you want to change that, there is an upload option:

![image](https://user-images.githubusercontent.com/45684225/58378788-28efb500-7f9a-11e9-9065-37977d109348.png)

> Aborted csv files do not contribute to the play count of a scenario per default, as they are completely ignored.

## Optimizations

Currently, imported csv files are not saved (yet) - after closing the tab, next time files are to be reimported. Simple solution: Keep the tab open, if you want to import more files. Most likely file import speed is limited by your disk performance. Saving all challenge files on a SSD partition can really benefit import time. Also, reimporting files should happend much faster second time due to disk cache.

## Compatibility

### Browser

Just use an up-to-date browser. Tested with

- Firefox 63 - should work with any decent version 55+ or even older
- Chromium 73 - should work with any half decent Chrome version
- Don't get your hands dirty with IE 😉. Also I am not sure concerning Safari browser.

### csv-files support

- starting at Game Version 1.0.2
- only challenges (not tested with free-to-play sessions)


## Links

[Reddit](https://www.reddit.com/r/FPSAimTrainer/comments/axoicy/introduction_progress_tracker_dashboard_app_for/?utm_source=share&utm_medium=web2x)

## Disclaimer

This is a community project (not from the official author).

## Build Electron

Tested with Node version 10.15.0

- Install dependencies with `npm install`
- Install `electron-packager` with `npm install -g electron-packager`
- Run the app with the npm script `npm start`
- Build the project for windows with `npm run build`
