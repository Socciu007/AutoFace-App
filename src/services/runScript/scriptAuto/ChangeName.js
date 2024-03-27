import { firstName, lastName } from 'full-name-generator';
const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};
export const changeName = (script, account) => {
  const accountStr = `{
        uid: ${JSON.stringify(account.uid)},
        password:${JSON.stringify(account.password)},
        recoveryEmail:${JSON.stringify(account.recoveryEmail)},
        recoveryPassword:${JSON.stringify(account.recoveryPassword)},
        cookies:${JSON.stringify(account.cookies)},
        token:${JSON.stringify(account.token)},
        twoFA:${JSON.stringify(account.twoFA)}
    }`;

  const scriptStr = `{
        changeName: ${JSON.stringify(script.changeName)},
        nameList: ${JSON.stringify(script.nameList)},
        firstName: ${JSON.stringify(script.firstName)},
        midleName: ${JSON.stringify(script.midleName)},
        surName: ${JSON.stringify(script.surName)},
        }`;

  let name;
  if (script.changeName == 'fullName') {
    if (script.nameList.length) {
      const nameList = script.nameList.filter((e) => e.trim().length);
      const rdName = nameList[getRandomInt(nameList.length)];
      if (rdName && rdName.length) {
        const strName = rdName.toString().split(' ');
        if (strName.length > 2) {
          name = {
            firstName: strName[0],
            midleName: strName[1],
            lastName: strName.filter((e, index) => index > 1).join(' '),
          };
        } else if (strName.length == 2) {
          name = {
            firstName: strName[0],
            midleName: '',
            lastName: strName[1],
          };
        } else {
          name = {
            firstName: '',
            midleName: '',
            lastName: strName[0],
          };
        }
      }
    }
  } else if (script.changeName == 'unFullName') {
    if (script.surName.length || script.firstName.length || script.midleName.length)
      name = {
        firstName: script.firstName.length ? script.firstName[getRandomInt(script.firstName.length)] : '',
        midleName: script.midleName.length ? script.midleName[getRandomInt(script.midleName.length)] : '',
        lastName: script.surName.length ? script.surName[getRandomInt(script.surName.length)] : '',
      };
  } else {
    const rd = Math.floor(Math.random() * 10);
    let gender = 0;
    if (rd < 5) gender = 1;
    name = {
      firstName: firstName('US', gender),
      midleName: '',
      lastName: lastName('US', gender),
    };
  }
  if (!name) {
    return `{
        logger("Debug|Change name|Name is null");
    }`;
  }

  return `{

    const clearText = async (page,selector) =>{
        await page.focus(selector);
        await page.keyboard.down('Control');
        await page.keyboard.press('A');
        await page.keyboard.up('Control');
        await page.keyboard.press('Backspace');
        await delay(500);
    }
      try {
        const script = ${scriptStr};
        const name = ${JSON.stringify(name)};
        const account = ${accountStr};


        if (
            !account.password ||
            account.password.length == 0 ||
            account.password == ""
          ) {
            logger("Debug|Change password|Account without password");
            return false;
          }

        const checkPageIsLive = checkIsLive(page);
        if (!checkPageIsLive) {
          logger("Page null!");
          return false;
        }
    
        await page.goto("https://mbasic.facebook.com/settings/account", {
          waitUntil: "networkidle2",
          timeout: 60000,
        });
        await delay(2000);
        const elLinks = await getElements(page, "a");
       
        if (elLinks && elLinks.length) {
          for (let i = 0; i < elLinks.length; i++) {
            const href = await elLinks[i].evaluate((element) => element.href);
            if (href && href.toString().includes("settings/account?name")) {
              await elLinks[i].click();
              await delay(7000);
              break;
            }
          }
        }
        if (!page.url().includes("settings/account?name")) {
          await page.goto(
            "https://mbasic.facebook.com/settings/account?name",
            {
              waitUntil: "networkidle2",
              timeout: 60000,
            }
          );
          await delay(2000);
        }
        
        const elFirstName =  await getElement(page, '[name="primary_first_name"]');
        const elMiddleName = await getElement(page, '[name="primary_middle_name"]');
        const elLastName = await getElement(page, '[name="primary_last_name"]');
        if (elFirstName && elMiddleName && elLastName) {
            if(name.firstName && name.firstName.length){
                await clearText(page,'[name="primary_first_name"]');
                await elFirstName.type(name.firstName, { delay: 100 });
                await delay(getRandomIntBetween(1000, 2000));
            }
            if(name.midleName && name.midleName.length){
                await clearText(page,'[name="primary_middle_name"]');
                await elMiddleName.type(name.midleName, { delay: 100 });
                await delay(getRandomIntBetween(1000, 2000));
            }
         if(name.lastName && name.lastName.length){
            await clearText(page,'[name="primary_last_name"]');
            await elLastName.type(name.lastName, { delay: 100 });
            await delay(getRandomIntBetween(1000, 2000));
         }

          const btnSubmit = await getElement(page, '[name="save"]');
          if (btnSubmit) {
            await btnSubmit.click();
            await delay(getRandomIntBetween(2000, 4000));
            const inputPass = await getElement(page, '[name="save_password"]');

            if(inputPass){
                await inputPass.type(account.password, { delay: 100 });
                await delay(1000);
                const btnSave = await getElement(page, '[name="save"]');
                if (btnSave) {
                    await btnSave.click();
                    await delay(getRandomIntBetween(5000, 7000));
                }
            }

            let fullName = name.firstName + " " + name.midleName + " " + name.lastName;
            fullName = fullName.trim().replaceAll("  ","");
            logger("${account.id}", "Update name:" + fullName);
           
          } else {
            logger("Debug|Change name|Change name Fail");
          }
        }
      } catch (e) {
          logger(e);
        logger("Debug|Change name|Change name Fail");
      }
    }`;
};
