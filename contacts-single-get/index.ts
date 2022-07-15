import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { Cache } from "../utils/cache";

// http://localhost:7071/api/contacts
const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  context.log('Retrieving all contacts');

  const contactId = context.bindingData.id;
  
  const contacts: any[] = Cache.get('contacts') || [];

  const contact = contacts.find(c => c.id === contactId);

  if (!contact) {
    context.res = {
      status: 404,
      body: `Contact with id ${contactId} not found`
    };
    return;
  }

  context.res = {
    // status: 200, /* Defaults to 200 */
    body: contact,
    headers: {
      'Content-Type': 'application/json'
    }
  };
};

export default httpTrigger;