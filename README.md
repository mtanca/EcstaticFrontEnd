# EcstaticFrontEnd

## React Native Setup

- If you don't have React Native installed [click here](https://facebook.github.io/react-native/docs/getting-started). Make sure you are following the React Native CLI Quickstart!
- Once the React Native CLI is installed, run the project using `react-native run-ios` or `react-native run-android`

## Running with Phoenix

Phoenix is the server which feeds the app data.
To start your Phoenix server:

- Clone the repo with `git clone https://github.com/mtanca/ecstatic_back_end.git`
- Navigate into the backend with `cd ../path/to/ecstatic_back_end`
- Install dependencies with `mix deps.get`
- Create and migrate your database with `mix ecto.setup`
- Install Node.js dependencies with `cd assets && npm install`
- Start Phoenix endpoint with `mix phx.server`. The server will be listening on port 400
