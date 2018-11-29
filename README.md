# Spree On Vue

> Rails is slow. Spree is slower. The main purpose of this repository is to give a Spree front-end that is _snappier_ and provides a more modern approach to solve the common problems found in e-commerce space. We are enthusiastic about this project and will continue supporting this project. :)

This project was bootstrapped with [Vue Cli](https://cli.vuejs.org/). You can tweak any build related configuration by following this package.

## Introduction

Spree-on-vue provides a complete front end for [Spree](https://github.com/spree/spree) built entirely on [VueJS](https://vuejs.org/). It works with [spree_ams](https://github.com/vinsol/spree_ams) gem which is written using `ActiveModelSerializers` and is a faster and a better alternative to the core spree api.

The purpose of this repository is to continue to evolve spree, making it faster and easier to use.

### Stack

1. VueJs.
2. Element (UI Library for vue).
2. Vuex and related packages.
3. Vue-router.
4. axios to make API requests.
5. Webpack for deployment.

For a comprehensive list, see `package.json`.

### Features Implemented

1. User session management.
2. Product listing.
4. Product filtering by taxons.
5. Product search.
6. Cart.
7. Single page Checkout steps.
8. Order listing for logged in users.
9. Address listing for logged in users.
9. Route handling.
10. Using local storage to maintain orders and session information in browser.

### Setup

This application is under initial development currently. It uses a spree API server as its data source to run the Frontend. To set up the project:

#### Clone this repository
```sh
git clone https://github.com/vinsol-spree-contrib/spree-on-vue
cd spree-on-vue
```

#### Install Node and npm
There are already a lot of resources on how to install node and npm for your operating system. Install Node and npm and come back to follow. This project is tested on node version 5.3.0 and higher.

#### Install project dependencies
> This will install everything you'll need to run this application.
``` sh
npm install
```

#### Run the FE server
> This runs a local server on http://localhost:8080.
```sh
npm run serve
```

#### Start your spree project server
Finally, run your Spree project on port 3000. This will serve as the api to run the frontend.

**Add `spree_ams` to your `Gemfile`.**
``` sh
cd <path-to-your-rails-spree-project>
```
``` ruby
gem 'spree_ams', github: 'vinsol-spree-contrib/spree_ams', branch: 'spree_on_vue'
```

**Run your rails server.**
```sh
bundle exec rails server -p 3000
open http://localhost:3000
```

### Demo
https://enigmatic-inlet-91726.herokuapp.com/ Visit this link to run the backend server deployed on heroku.

http://spree-on-vue.s3-website-ap-southeast-1.amazonaws.com/#/ Open this link to view demo.

**Example Credentials:**
- Email: spree-on-vue@example.com
- Password: spree-vinsol

### Upcoming Features
We are heavily working on the below features. Our constant focus is on to improve the code quality, making the separation of concerns between components.

### Where are the test cases?

This repository is still very young and adding new features is our top priority. We'll begin writing test cases once we have build most of the spree core functionality.

### Contributing
We encourage you to contribute to this project. Please use GitHub issue tracker to raise pull requests, feature requests and report issues. For any security related issues, please email us directly.


### License
Spree on Vue is released under the [MIT License](http://www.opensource.org/licenses/MIT).


### Author
Saiyam Gambhir
