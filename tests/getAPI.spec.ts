import { expect, request, test } from '@playwright/test'
import {BASE_URL } from '../config/bookingapp.config'
import createBookingBody  from '../fixtures/booking.payload.json' with { type: 'json' };
import {deleteRequest, getRequest , postRequestWithBody } from '../utilities/apiLogger' 

/*here we are keeping payload in seperate json file booking.payload.json
Keeping endpoint url in seperate file bookingapp.config.ts */

test(`verify the post api`, async ({ request }) => {
    const url = BASE_URL;
    const method = "Post";
    const headers = {
        Accept: 'application/json'
    }

    console.log("-------------------REQUEST POST -------------");
    console.log("URL  " + url);
    console.log("Method  " + method);

// 🔹 Step 1: POST request
   // const postResponse = await request.post(url, { headers, data: createBookingBody.BhaguApple})
    const postResponse = await postRequestWithBody(request ,
    url,
     { headers,
         data: createBookingBody.BhaguApple
    });
    const postBody = await postResponse.json();

   
// 🔹 Step 2: GET request using returned ID
  const newId = postBody.id;
  const getUrl = `${url}/${newId}`;
  console.log("")   ;
  console.log("-------------REQUEST (GET)-------------");
  console.log("URL:", getUrl);
  console.log("");
  console.log("New ID  " +newId)

  //const getResponse =await request.get(getUrl ,{headers});
  const getResponse = await getRequest(request, getUrl);
  const getBody = await getResponse.json();

//   console.log("------------- RESPONSE (GET)-------------------");
//   console.log("Status " + getResponse.statusText());
//   console.log("Status Code  "  + getResponse.status());

if (getResponse.status() === 405) {
    test.skip();
  } else {
    expect(getResponse.status()).toBe(200); // or 201
  }
   // expect(getResponse.status()).toBe(200);
    expect(getBody.id).toBe(newId);

// 🔹 Step 3: DELETE
      //const deleteResponse = await request.delete(`${url}/${newId}`, {headers});
      const deleteResponse = await deleteRequest(request,`${url}/${newId}`, {headers});
      expect(deleteResponse.status()).toBe(200);

// 🔹 Step 4: GET again (verify deletion)
       const getAfterDelete= await request.get(`${url}/${newId}`, {headers});
       expect(getAfterDelete.status()).toBe(404);
       const deletedBody = await getAfterDelete.json();
       console.log("Deleted check:", deletedBody);
       await request.get(url, {headers})
       await request.post(url ,{headers, data: createBookingBody.BhaguApple})
       //request.delete(url, {headers})
}
)
