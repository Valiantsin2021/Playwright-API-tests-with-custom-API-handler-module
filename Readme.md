# JS API automation tests using Playwright <a href="https://playwright.dev/" target="blank"><img align="center" src="https://playwright.dev/img/playwright-logo.svg" alt="Playwright" height="40" width="40" /></a> 

## Author

- [@Valiantsin2021](https://www.github.com/Valiantsin2021) [![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

## Repository Overview

This repository provides an example of the API automated tests with custom API Handler fixture and Logger. Includes:

### 1. Static code checks, linting and formatting

### 2. API tests boilerplate of the application https://airportgap.com/api/airports with the Playwright

### 3. Custom API Handler module with fixture to leverage the API calls with additional logger to stdout

### 4. Allure reporter with history

[Allure report](https://valiantsin2021.github.io/Playwright-API-tests-with-custom-API-handler-module/)

### 5. Github Actions setup to run tests in Docker container


## Setup

1. Clone this repository or unzip the downloaded file.
2. Install dependencies with `npm install`.
3. Run tests using the following commands:
   
   - `npm run test` to run the test file.
   - `npm run posttest` to create an Allure report.
   - `npm run clean` to clean the previous reports
4. Run tests with a docker container:

   - `docker build -t test-image:latest -f Dockerfile_playwright_official_java .`
   - `docker run -i --rm --name test -v ${pwd}:/app/ -w /app test-image:latest npm t`

## 🔗 Links

[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://valiantsin2021.github.io/Portfolio/)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/valiantsin-lutchanka/)
