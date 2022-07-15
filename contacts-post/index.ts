import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { Cache } from "../utils/cache";

// http://localhost:7071/api/contacts
const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  context.log('Adding a new contact');

  const { body } = req;

  if (!body) {
    context.res = {
      status: 400,
      body: 'Please pass a contact in the request body'
    };
    return;
  }

  const { firstName, lastName, email, phone, address } = body;
  if (!firstName || !lastName || !email) {
    context.res = {
      status: 400,
      body: 'Please pass a firstName, lastName, and email in the body'
    };
    return;
  }

  const contacts: any[] = Cache.get('contacts') || [];
  
  const newContact = {
    id: contacts.length + 1,
    firstName,
    lastName,
    email,
    phone,
    address
  };

  contacts.push(newContact);

  Cache.set(`contacts`, contacts);
  
  context.res = {
    status: 201,
    body: newContact,
    headers: {
      'Content-Type': 'application/json'
    }
  };
};

export default httpTrigger;