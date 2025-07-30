
# 🛠️ Project Set Up Instructions
> **Note** it is recommended to [check for packges updates](#checking-for-package-updates)
> 
Quick start:
```bash
npm install
npm start
```
Finish:
```bash
npm run build
npm run deploy
```
## Table of Contents

1. [Structure](#structure)
2. [Checking for Package Updates](#checking-for-package-updates)
3. [Important Scripts](#important-scripts)
4. [Author](#author)

----------

## Structure
```
📁 src
├── 📁 images             # Image assets
├── 📁 scripts            # JavaScript files
├── 📁 styles             # CSS stylesheets
└── 📁 templates          # HTML templates
📄 .editorconfig
📄 .eslintrc.json
📄 .prettierrc.json
📄 package.json
📄 README.md
📄 webpack.common.js
📄 webpack.dev.js
📄 webpack.pro.js
📄 .gitignore
📄 babel.config.js
```

------

## Checking for Package Updates

### 2.1 Checking for Updates
### ⚠️ Note

> ESLint and Airbnb dependencies are locked for compatibility, update carefully only if Airbnb updates too.

- To start your project, first **make sure that the dependencies are up to date.** So, run: `ncu` to see any available updates for your patches.
  
  - To see if there are any updates for ESLint, run: `ncu eslint`
  
  - To see any updates for any package except for the one starting with 'eslint', run: `ncu '/^(?!eslint).*$/'`


### 2.2 Applying Updates

- After checking the packages for updates, you can **update everything**, by running: `ncu -u`
> **📜 Note**
> you can update all packages except for eslint ones by running: `ncu -u '/^(?!eslint).*$/'`

> **🚨 Critical Reminder**  
> before updating eslint, make sure that Airbnb supports the newer versions, through this link [Airbnb's ESLint config](https://github.com/airbnb/javascript).

### 2.3 Installing the Updates

- Use npm install during development and updates.
  
- Use npm ci only when you want to install exact versions from package-lock.json — perfect for CI pipelines or clean environments.

------

## Important Scripts

- Run `npm run start` to start a dev server.
  
- Run `npm run lint` to check linting issues

- Run `npm run lint:fix` to fix issues
  > **🚨 Critical Reminder**  Regarding `npm run lint:fix`:
  >
  > - Before using `npm run lint:fix`, review the changes it may apply. It can unintentionally break code, ensure you have a backup.

---------

## Author

**Thomas Ashraf Ghali** – Full Stack Web Developer  

Passionate about building scalable web applications and writing clean, maintainable code.

[GitHub](https://github.com/ThomasGhali)
