import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { faker } from '@faker-js/faker';
import { Cache } from "../utils/cache";

// http://localhost:7071/api/contacts
const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  context.log('Retrieving all contacts');

  const total = req.query.total || 5;

  // const secret = req.query.secretApiKey;

  // if (secretApiKey !== secret) {
  //   context.res = {
  //     status: 401
  //   };
  //   return;
  // }
  
  const contacts: any[] = Cache.get('contacts') || [];

  for (let i = contacts.length; i < total; i++) {
    const contact = {
      id: i + 1,
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      phone: faker.phone.phoneNumber(),
      address: {
        street: faker.address.streetAddress(),
        city: faker.address.city(),
        state: faker.address.state(),
        zip: faker.address.zipCode()
      }
    };
    
    contacts.push(contact);
  }
  
  context.res = {
    // status: 200, /* Defaults to 200 */
    body: contacts,
    headers: {
      'Content-Type': 'application/json'
    }
  };
};

export default httpTrigger;