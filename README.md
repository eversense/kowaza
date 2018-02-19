# kowaza

kowaza is Google App Script code for Slack App.

Hope this app will help you when you wanna extend Slack without server.

## Use Case

When you wanna share some tips on Slack and get feedback.

1. post tips at 8 am
2. get feedback from your teammates
3. report the evaluation for tips you share

## Setups
### 1. Create SpreadSheet
You can copy the SpreadSheet below
https://docs.google.com/spreadsheets/d/1_OJlIpmWTjKlkePT5qB9HKapAH1Dpr2ucjvNyNQxC90/edit#gid=0

### 2. Copy GAS
Copy Scripts under `src` Directory

![copy GAS](https://github.com/eversense/kowaza/blob/add_images_for_readme/assets_for_readme/copy%20gas.png?raw=true "copy GAS")

### 3. Publish GAS as Web App 
1. select menu for publish as web app

![select menu for publish as web app](https://github.com/eversense/kowaza/blob/add_images_for_readme/assets_for_readme/publish%20as%20web%20app.png?raw=true "select menu for publish as web app")

2. set version and limitation

![set version and limitation](https://github.com/eversense/kowaza/blob/add_images_for_readme/assets_for_readme/publish.png?raw=true "set version and limitation")

3. get url for the web app

![get url for the web app](https://github.com/eversense/kowaza/blob/add_images_for_readme/assets_for_readme/get%20spreadsheet%20url.png?raw=true "get url for the web app")




### 4. Set up Slack App
1. access [slack app url ](https://api.slack.com/apps)

2. create new App

![create new App](https://github.com/eversense/kowaza/blob/add_images_for_readme/assets_for_readme/create%20slack%20app.png?raw=true "create new App")

3. set up incoming webhook

![set up incoming webhook](https://github.com/eversense/kowaza/blob/add_images_for_readme/assets_for_readme/setup%20incoming%20webhook.png?raw=true "set up incoming webhook")

4. set up interactive components
 Enter GAS url you got above

![set up interactive components](https://github.com/eversense/kowaza/blob/add_images_for_readme/assets_for_readme/setup_spreadsheet_url.png?raw=true "set up interactive components")


### 5. Modify GAS
1. fill incoming webhook url at `YOUR WEBHOOK URL` on `constants.gs`

### 6. Schedule Script Execution
1. schedule notify and report function

![schedule notify and report function](https://github.com/eversense/kowaza/blob/add_images_for_readme/assets_for_readme/set%20up%20schedule.png "schedule notify and report function")
