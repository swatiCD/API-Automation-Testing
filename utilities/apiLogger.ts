import { APIRequestContext, APIResponse } from '@playwright/test';
//import { resolve } from 'node:dns';

/*GET METHOD*/
export async function getRequest(
    request :APIRequestContext,
    url : string,
    headers ?:object 
):Promise<APIResponse> {

 /*Above funstion Returns: A Playwright APIResponse object.*/
  
  /*1. Send the GET request*/
  const response = await request.get(url,headers);

  /*2. Log request  details */
  console.log(`GET ${response.url()}`);
  if(headers){
    console.log(`HEADERS:`);
    console.log(headers);
  }

   /*3. Log response  details */
   console.log("------------- RESPONSE (GET)-------------------");
   console.log(`STATUS ${response.status()} ${response.statusText()}`);
   console.log("HEADERS:= ")
   console.log(response.headers());

   
  /*4. Log response body*/
  /* Checks the Content-Type header.
     If JSON → parses with response.json().
     Otherwise → prints raw text. */

    const contentType = response.headers()['content-type'];
    if(contentType && contentType.toLowerCase().includes('Application/json')){
      const responseBody=  await response.json();
      console.log("BODY");
      console.log(JSON.stringify(responseBody, null, 2));
     
    }
    else{
        const responseBody = await response.text();
        console.log('BODY');
        console.log(JSON.stringify(responseBody, null, 2));
    }

   return response;
}

/*POST  METHOD*/

export async function postRequestWithBody(
    request :APIRequestContext,
    url : string,
    body? :object,
    headers ?:object 
):Promise<APIResponse> {

 /*Above funstion Returns: A Playwright APIResponse object.*/
  
  /*1. Send the POST request*/
  const response = await request.post(url,{data : body});

  /*2. Log request  details */
  console.log(`POST ${response.url()}`);
  if(body){
    console.log(`REQUEST BODY:`);
    console.log(body);
  }

   /*3. Log response  details */
   console.log("--------------------RESPONSE POST------------------------")
   console.log(`STATUS ${response.status()} ${response.statusText()}`);
   console.log("HEADERS:= ")
   console.log(response.headers());

   
  /*4. Log response body*/
  /* Checks the Content-Type header.
     If JSON → parses with response.json().
     Otherwise → prints raw text. */

    const contentType = response.headers()['content-type'];
    if(contentType && contentType.includes('Application/json')){
    //   const responseBody=  await response.json();
    //   console.log("BODY");
    //   console.log(responseBody);
     const responseBody = await response.json();
       console.log("Body:", JSON.stringify(responseBody, null, 2));
      
    }
    else{
    //     const responseBody = await response.text();
    //     console.log('BODY');
    //    console.log(responseBody);
        const responseBody = await response.json();
       console.log("Body:", JSON.stringify(responseBody, null, 2));
    }

   return response;
}


/*DELETE  METHOD*/

export async function deleteRequest(
    request :APIRequestContext,
    url : string,
    headers ?:object 
):Promise<APIResponse> {

 /*Above funstion Returns: A Playwright APIResponse object.*/
  
  /*1. Send the POST request*/
  const response = await request.delete(url,headers);

  /*2. Log request  details */
  console.log("-------------------------REQUSET DELETE-------------------------");
  console.log(`DELETE ${response.url()}`);
  

   /*3. Log response  details */
   console.log("--------------------RESPONSE DELETE ------------------------")
   console.log(`STATUS ${response.status()} ${response.statusText()}`);
   console.log("HEADERS:= ")
   console.log(response.headers());
   console.log("**********DELETE SUCCESSFUL********");

   return response;
}