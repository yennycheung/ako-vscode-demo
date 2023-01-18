import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { Cache } from "../utils/cache";

// http://localhost:7071/api/attractions
const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  context.log('Retrieving all attractions');

  const attractionId = context.bindingData.id;
  
  const attractions: any[] = Cache.get('attractions') || [];

  const attraction = attractions.find(c => c.id === attractionId);

  if (!attraction) {
    context.res = {
      status: 404,
      body: `Attraction with id ${attractionId} not found`
    };
    return;
  }

  context.res = {
    // status: 200, /* Defaults to 200 */
    body: attraction,
    headers: {
      'Content-Type': 'application/json'
    }
  };
};

export default httpTrigger;