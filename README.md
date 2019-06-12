## React native core

### Dev enviroment

* Use **Node** version `12.2.0`
* If you use `nvm`, use **nvm version** `0.34.0`
* **Npm version** `6.9.0`
* For install `node_modules` use `yarn`, **NO `npm`**
* install `node_modules` with command `yarn install`
* Cocoapods are included in the project, **IT'S NOT NECESSARY TO EXECUTE THE COMMAND** `pod install`
* **All changes are documented in the CHANGELOG.md file with the following structure:**
```
  kindOfChange = ['ADD', 'FIX', 'REMOVE', 'UPDATE', 'REDESING'] //for example
  ## [kind_of_change] year-month-day hour:minutes

  Example:
  ## [ADD, FIX] 2019-05-18 9:08
  * Add login
  * Fix login
```
* **Name of the commitments with the following structure.**
```
## year-month-day hour:minutes = The reference that was created in the CHANGELOG.md file before the commit

See file CHANGELOG.md ## year-month-day hour:minutes

Example:
See file CHANGELOG.md ##2019-05-18 9:08
```

* **when you add a new library, remember fix the version installed in the `package.json`**

* For link fonts use `react-native link`

* Happy coding :fire::v: