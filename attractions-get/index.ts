import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { secretApiKey } from "../constants/secret";
import { Cache } from "../utils/cache";

// http://localhost:7071/api/attractions
const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  context.log('Retrieving all attractions');

  const total = req.query.total || 5;

  // const secret = req.query.secretApiKey;

  // if (secretApiKey !== secret) {
  //   context.res = {
  //     status: 401
  //   };
  //   return;
  // }
  
  const attractions: any[] = Cache.get('attractions') || [];

  const topMarrakechAttractions = [
    {
      "name": "Medina Souks",
      "description": "The narrow alleyways are a kaleidoscope of colors, scents, and sounds and are bound to be the sightseeing highlight of your trip.",
    },
    {
      "name": "Djemaa El Fna",
      "description": "The Djemaa El Fna (assembly place of the nobodies) is a vibrant hub of bric-a-brac stalls, musicians, storytellers, fortune-tellers, and snake charmers.",
    },
    {
      "name": "Koutoubia Mosque",
      "description": "The Koutoubia Mosque is Marrakesh's most famous landmark with its striking, 70-meter-tall minaret visible for miles in every direction.",
    },
    {
      "name": "Majorelle Gardens",
      "description": "Originally from the town of Nancy in France, Majorelle came to Marrakesh for health reasons and became well known for his paintings of local Moroccan life.",
    },
    {
      "name": "Medersa Ben Youssef",
      "description": "The sumptuously decorated Medersa of Ben Youssef is one of the finest examples of Saadian era artistry in Morocco.",
    },
  ];

  for (let i = attractions.length; i < total; i++) {
    const attraction = {
      id: i+1, 
      name: topMarrakechAttractions[i].name,
      description: topMarrakechAttractions[i].description,
    }
    attractions.push(attraction);
  }

  // for (let i = contacts.length; i < total; i++) {
  //   const contact = {
  //     id: i + 1,
  //     firstName: faker.name.firstName(),
  //     lastName: faker.name.lastName(),
  //     email: faker.internet.email(),
  //     phone: faker.phone.phoneNumber(),
  //     address: {
  //       street: faker.address.streetAddress(),
  //       city: faker.address.city(),
  //       state: faker.address.state(),
  //       zip: faker.address.zipCode()
  //     }
  //   };
    
  //   contacts.push(contact);
  // }
  Cache.set(`attractions`, attractions);

  context.res = {
    // status: 200, /* Defaults to 200 */
    body: attractions,
    headers: {
      'Content-Type': 'application/json'
    }
  };
};

export default httpTrigger;