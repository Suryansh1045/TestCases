const { expect } = require('chai');
const { By, Key, until ,edgeDriver} = require('../mocha.config');

// describe("Intial Claims Test Cases using Chrome Browser", function () {
//   console.log("first test cases is getting executed");
//   it("TestCase 1: Valid Form Data using Chrome Browser", async function () {
//     await validFormData(chromeDriver,"Test","DBQ01","chadDBQTest01@chadcollins.com", 3653249292,94041);
//   });     
  
//   it("TestCase 2: Invalid Phone Number using Chrome Browser",async function(){
//     await InvalidPhoneNumber(chromeDriver,"Test","DBQ02","chadDBQTest02@chadcollins.com", 1010101010,96041)
//   })
  

//   it("TestCase 3: Invalid Phone Number using Chrome Browser",async function(){
//     await InvalidPhoneNumber(chromeDriver,"Test","DBQ03","chadDBQTest03@chadcollins.com", 3452342344,96041)
//   })

//   it("TestCase 4: Non Digits Phone Number using Chrome Browser",async function(){
//     await InvalidPhoneNumber(chromeDriver,"Test","DBQ04","chadDBQTest04@chadcollins.com", "asdasddasd",96041)
//   })

//   it("TestCase 5: Special Characters using Chrome Browser",async function(){
//     await InvalidPhoneNumber(chromeDriver,"Test","DBQ05","chadDBQTest05@chadcollins.com", 345-345-3455,96041)
//   })

//   it("TestCase 6: Special Characters using Chrome Browser",async function(){
//     await InvalidPhoneNumber(chromeDriver,"Test","DBQ06","chadDBQTest06@chadcollins.com","123123123#",96041)
//   })

//   it("TestCase 7: valid Phone Number using Chrome Browser",async function(){
//     await validFormData(chromeDriver,"Test","DBQ07","chadDBQTest07@chadcollins.com",2403753633,96041)
//   })

//   it("TestCase 8: valid Phone Number using Chrome Browser",async function(){
//     await validFormData(chromeDriver,"Test","DBQ08","chadDBQTest08@chadcollins.com",2403985633,96041)
//   })

//   it("TestCase 9: Already registered number Phone Number using Chrome Browser",async function(){
//     await InvalidPhoneNumber(chromeDriver,"Test","DBQ09","chadDBQTest09@chadcollins.com", 8645823654,96041,true)
//   })

//   it("TestCase 10: Invalid Zip Code using Chrome Browser",async function(){
//     await InvalidZip(chromeDriver,"Test","DBQ10","chadDBQTest10@chadcollins.com",5158451155 ,940)
//   })

//   it("TestCase 11: Invalid Zip Code using Chrome Browser",async function(){
//     await InvalidZip(chromeDriver,"Test","DBQ11","chadDBQTest11@chadcollins.com",5158451155 ,"940@1")
//   })

//   it("TestCase 12: Valid Zip Code using Chrome Browser",async function(){
//     await validFormData(chromeDriver,"Test","DBQ12","chadDBQTest12@chadcollins.com",5158451155 ,94041)
//   })
 
// });

describe("Intial Claims Test Cases using Edge Browser",function(){

  it("TestCase 1: Valid Form Data using Edge Browser", async function () {
    await validFormData(edgeDriver,"Test","DBQ01","chadDBQTest01@chadcollins.com", 3653249292,94041);
  });
  
  it("TestCase 2: Invalid Phone Number using Edge Browser",async function(){
    await InvalidPhoneNumber(edgeDriver,"Test","DBQ02","chadDBQTest02@chadcollins.com", 1010101010,96041)
  })
  
  it("TestCase 3: Invalid Phone Number using Edge Browser",async function(){
    await InvalidPhoneNumber(edgeDriver,"Test","DBQ03","chadDBQTest03@chadcollins.com", 3452342344,96041)
  })

  it("TestCase 4: Non Digits Phone Number using Edge Browser",async function(){
    await InvalidPhoneNumber(edgeDriver,"Test","DBQ04","chadDBQTest04@chadcollins.com", "asdasddasd",96041)
  })

  it("TestCase 5: Special Characters using Edge Browser",async function(){
    await InvalidPhoneNumber(edgeDriver,"Test","DBQ05","chadDBQTest05@chadcollins.com", 345-345-3455,96041)
  })

  it("TestCase 6: Special Characters using Edge Browser",async function(){
    await InvalidPhoneNumber(edgeDriver,"Test","DBQ06","chadDBQTest06@chadcollins.com","123123123#",96041)
  })

  it("TestCase 7: valid Phone Number using Edge Browser",async function(){
    await validFormData(edgeDriver,"Test","DBQ07","chadDBQTest07@chadcollins.com",2403753633,96041)
  })

  it("TestCase 8: valid Phone Number using Edge Browser",async function(){    
    await validFormData(edgeDriver,"Test","DBQ08","chadDBQTest08@chadcollins.com",2403985633,96041)
  })

  it("TestCase 9: Already registered number Phone Number using Edge Browser",async function(){
    await InvalidPhoneNumber(edgeDriver,"Test","DBQ09","chadDBQTest09@chadcollins.com", 8645823654,96041,true)
  })

  it("TestCase 10: Invalid Zip Code using Edge Browser",async function(){
    await InvalidZip(edgeDriver,"Test","DBQ10","chadDBQTest10@chadcollins.com",5158451155 ,940)
  })

  it("TestCase 11: Invalid Zip Code using Edge Browser",async function(){
    await InvalidZip(edgeDriver,"Test","DBQ11","chadDBQTest11@chadcollins.com",5158451155 ,"940@1")
  })

  it("TestCase 12: Valid Zip Code using Edge Browser",async function(){
    await validFormData(edgeDriver,"Test","DBQ12","chadDBQTest12@chadcollins.com",5158451155 ,94041)
  })
});

const validFormData=async(driver,firstname,lastname,email,phoneNumber,zip)=>
{
    try {
        await fillForm(driver,firstname,lastname,email,phoneNumber,zip);
        let textPhoneValidation;
        let textZipValidation;
        try{
            let phonevalidationDiv=await driver.findElement(By.className("number-error-message"));
            let zipvalidationDiv=await driver.findElement(By.className("error-message"));
            textZipValidation=await zipvalidationDiv.getText();
            textPhoneValidation = await phonevalidationDiv.getText();
          }catch(error){}

        if (textPhoneValidation == "Phone number already exists.") {
          console.log("Phone number already exists");
          throw new Error("Test Case failed because the entered phone number already exists")
        } else if (textPhoneValidation == "Please enter a valid phone number") {
          throw new Error("Test Case failed because the entered phone number is invalid")
        } else {
          expect(true).to.be.true;
        }

        if (textZipValidation == "Invalid zip code") {
          throw new Error("Test Case failed because the entered Zip code is invalid")
        } else {
          expect(true).to.be.true;
        }

    } catch (error) {
    console.error("Test failed with error:", error);
    throw error
    }
  
}

const InvalidPhoneNumber=async(driver,firstname,lastname,email,phoneNumber,zip,registeredFlag)=>
  {
        try {
          await fillForm(driver,firstname,lastname,email,phoneNumber,zip);
          let textPhoneValidation;
          let textZipValidation;
          try{
              let phonevalidationDiv=await driver.findElement(By.className("number-error-message"));
              let zipvalidationDiv=await driver.findElement(By.className("error-message"));
              textZipValidation=await zipvalidationDiv.getText();
              textPhoneValidation = await phonevalidationDiv.getText();
            }catch(error){}
          
            if(registeredFlag)
              {
                if (textPhoneValidation == "Phone number already exists.") {
                  expect(true).to.be.true;
                } else if (textPhoneValidation == "Please enter a valid phone number") {
                  throw new Error("Test Case failed because the entered phone number already exists")
                } else {
                  console.log(textPhoneValidation)
                  throw new Error("Test Case failed because the entered phone number is valid")
                }
              }
            else{
                if (textPhoneValidation == "Phone number already exists.") {
                  throw new Error("Test Case failed because the entered phone number already exists")
                } else if (textPhoneValidation == "Please enter a valid phone number") {
                  expect(true).to.be.true;
                } else {
                  throw new Error("Test Case failed because the entered phone number is valid")
                }
              }
          if (textZipValidation == "Invalid zip code") {
            throw new Error("Test Case failed because the entered Zip code is invalid")
          } else {
            expect(true).to.be.true;
          }

      } catch (error) {
      console.error("Test failed with error:", error);
      throw error
      }
  }

  const InvalidZip=async(driver,firstname,lastname,email,phoneNumber,zip)=>
    {
        try {
          await fillForm(driver,firstname,lastname,email,phoneNumber,zip);
          let textPhoneValidation;
          let textZipValidation;
          try{
              let phonevalidationDiv=await driver.findElement(By.className("number-error-message"));
              let zipvalidationDiv=await driver.findElement(By.className("error-message"));
              textZipValidation=await zipvalidationDiv.getText();
              textPhoneValidation = await phonevalidationDiv.getText();
            }catch(error){}

          if (textPhoneValidation == "Phone number already exists.") {
            throw new Error("Test Case failed because the entered phone number already exists")
          } else if (textPhoneValidation == "Please enter a valid phone number") {
            throw new Error("Test Case failed because the entered phone number is invalid")  
          } else {
            expect(true).to.be.true;
          }

          if (textZipValidation == "Invalid zip code") {
            expect(true).to.be.true;
          } else {
            throw new Error("Test Case failed because the entered Zip code is valid")
          }

      } catch (error) {
      console.error("Test failed with error:", error);
      throw error
      }
    }

const fillForm=async(driver,firstname,lastname,email,phoneNumber,zip)=>
  {
        await driver.get("https://test.reemedical.com/");
        await driver.findElement(By.className("quform-field-3_71_1")).click();
        await driver.findElement(By.className("quform-button-next-3_36")).click();
        await driver.sleep(2000);
        await driver.findElement(By.className("quform-field-3_47_1")).click();
        await driver.findElement(By.className("quform-button-next-3_46")).click();
        await driver.sleep(2000);
        await driver.findElement(By.className("quform-field-3_53")).click();
        await driver.findElement(By.xpath("//option[@value='60%']")).click();
        await driver.findElement(By.className("quform-button-next-3_52")).click();
        await driver.sleep(2000);
        await driver.findElement(By.className("quform-field-3_4_2")).sendKeys(firstname)
        await driver.findElement(By.className("quform-field-3_4_4")).sendKeys(lastname)
        await driver.findElement(By.className("quform-field-3_5")).sendKeys(email);
        await driver.findElement(By.className("quform-field-3_7")).sendKeys(phoneNumber);
        await driver.findElement(By.className("quform-field-3_68")).sendKeys(zip);
        await driver.findElement(By.xpath("//div[@class='quform-element quform-element-html quform-element-3_59 quform-cf']//div[@class='quform-spacer']")).click();
        await driver.sleep(3000)
        await driver.findElement(By.className("quform-field-3_21_1")).click();
       
  }