# EcstaticFrontEnd

## React Native Setup

- If you don't have React Native installed [click here](https://facebook.github.io/react-native/docs/getting-started). Make sure you are following the React Native CLI Quickstart!
- For `ios` setup, navigate to `EcstaticFrontEnd/ios` and run `pod install`. Make sure that you have Cocoapods installed (`brew install cocoapods`)
- For Android setup, you will need to add a debug key file.
  - Within your `EcstaticFrontEnd/android/app` folder, run `keytool -genkey -v -keystore debug.keystore -storepass android -alias androiddebugkey -keypass android -keyalg RSA -keysize 2048 -validity 10000` and answer the questions however you want.
- Once the React Native CLI is installed, run the project using `react-native run-ios` or `react-native run-android`
- If running the app for the first time, make sure to take the uuid of the give away created from running the `seeds.exs` file in the ecstatic backend repo and enter it while registering in the app

## Running Ecstatic Back End with Phoenix

Phoenix is the server which feeds the app data.
To start your Phoenix server:

- Clone the repo with `git clone https://github.com/mtanca/ecstatic_back_end.git`
- Navigate into the backend with `cd ../path/to/ecstatic_back_end`
- Install dependencies with `mix deps.get`
- Create and migrate your database with `mix ecto.setup`
- Install Node.js dependencies with `cd assets && npm install`
- Start Phoenix endpoint with `mix phx.server`. The server will be listening on port 400
