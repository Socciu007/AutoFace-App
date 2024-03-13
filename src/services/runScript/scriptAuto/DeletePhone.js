export const DeletePhone = (script) => {
  const scriptStr = `{
          url: ${JSON.stringify(script.url)}
        }`;

  return `{
      try {
        const script = ${scriptStr};
        const checkPageIsLive = checkIsLive(page);
        if (!checkPageIsLive) {
          logger("Page null!");
          return false;
        }
    
        await page.goto("https://mbasic.facebook.com/settings/", {
          waitUntil: "networkidle2",
          timeout: 60000,
        });
        await delay(2000);

       
          await page.goto(
            "https://mbasic.facebook.com/settings/sms",
            {
              waitUntil: "networkidle2",
              timeout: 60000,
            }
          );
          await delay(2000);
        
          const listPhone = [];

        const elLinks = await getElements(page, "a");
     
      if (elLinks && elLinks.length) {
        for (let i = 0; i < elLinks.length; i++) {
          const href = await elLinks[i].evaluate((element) => element.href);
          if (href && href.toString().includes("remove_phone&phone_number")) {
            listPhone.push(elLinks[i]);
          }
        }
      }

      if(listPhone.length > 0){
        await listPhone[0].click();
        await delay(7000);
        const elCheckbox = await getElement(page, '[name="remove_phone_warning_acknwoledged"]');
        if(elCheckbox){
            await elCheckbox.click();
            await delay(1000);
        }

        const submit = await getElement(page, 'input[type="submit"]'); 
        if(submit){
            await submit.click();
            await delay(5000);
        }
      }
      else{
        logger("Debug|Delete phone number|Account without phone number");
      }

      } catch (e) {
          logger(e);
        logger("Debug|Delete phone number|Delete phone number Fail");
      }
    }`;
};
