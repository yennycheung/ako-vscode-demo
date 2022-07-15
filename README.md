# Azure Functions - HTTP Trigger Samples

A sample Azure Functions - API project to retrieve and create contacts.

## Installation

In order to run this project, please follow the steps below:

- Use a compatible Node.js version (Node.js 14 or 16)
- Install the Azure Functions Core Tools

```bash
brew tap azure/functions
brew install azure-functions-core-tools@4
# if upgrading on a machine that has 2.x or 3.x installed:
brew link --overwrite azure-functions-core-tools@4
```

- Clone this repository: `git clone https://github.com/estruyf/azurefunctions-contacts-sample`
- Install the dependencies: `npm i`
- Run the sample: `npm start`

> Note: more information can be found on the [Azure Functions Core Tools documentation](https://docs.microsoft.com/en-us/azure/azure-functions/functions-run-local?tabs=v4%2Cmacos%2Ccsharp%2Cportal%2Cbash).

## Running the project

Once you completed the above steps, you can run the projects as follows:

1. `npm start`: Runs the sample
2. Press `f5`: This starts a debugging session in VS Code. Now you are able to set breakpoints and step through the code once you call the API.

## Available APIs for you to test

- `GET http://localhost:7071/api/contacts`: returns a list of contacts
- `POST http://localhost:7071/api/contacts`: creates a new contact
- `GET http://localhost:7071/api/contacts/{id}`: returns a contact by id

### POST contact example

The body of the POST example show have the following structure:

```json
{
  "firstName": "Elmira",
  "lastName": "Labadie",
  "email": "Felicia4@hotmail.com",
  "phone": "242-797-5156 x6780",
  "address": {
    "street": "510 Heaney Drive",
    "city": "North Valentinaborough",
    "state": "Wyoming",
    "zip": "32522-3610"
  }
}
```

> **Important**: the `firstName`, `lastName`, `email` fields are required.