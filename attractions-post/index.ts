import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { Cache } from "../utils/cache";

// http://localhost:7071/api/attractions
const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  context.log('Adding a new attraction');

  const { body } = req;

  if (!body) {
    context.res = {
      status: 400,
      body: 'Please pass an attraction in the request body'
    };
    return;
  }

  const { name, description } = body;
  if (!name || !description ) {
    context.res = {
      status: 400,
      body: 'Please pass a name and description in the body'
    };
    return;
  }

  const attractions: any[] = Cache.get('attractions') || [];
  
  const newAttraction = {
    id: attractions.length + 1,
    name,
    description,
  };

  attractions.push(newAttraction);

  Cache.set(`attractions`, attractions);
  
  context.res = {
    status: 201,
    body: newAttraction,
    headers: {
      'Content-Type': 'application/json'
    }
  };
};

export default httpTrigger;