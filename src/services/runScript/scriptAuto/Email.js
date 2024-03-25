export const changeEmail = (script, account, emails) => {
  const scriptStr = `{
            isAdd:${script.isAdd},
            isDelete:${script.isDelete},
            isHide:${script.isHide},
            urlAddMail: ${JSON.stringify(script.urlAddMail)},
            urlDeleteMail: ${JSON.stringify(script.urlDeleteMail)},
            typeEmail: ${JSON.stringify(script.typeEmail)},
            newPassword: ${JSON.stringify(script.newPassword)},
            waitTimeOTP:${script.waitTimeOTP},
            emailList: ${JSON.stringify(script.emailList)}
          }`;
  const accountStr = `{
              uid: ${JSON.stringify(account.uid)},
              password:${JSON.stringify(account.password)},
              recoveryEmail:${JSON.stringify(account.recoveryEmail)},
              recoveryPassword:${JSON.stringify(account.recoveryPassword)},
              cookies:${JSON.stringify(account.cookies)},
              token:${JSON.stringify(account.token)},
              twoFA:${JSON.stringify(account.twoFA)}
          }`;

  let email;
  for (let i = 0; i < script.emailList.length; i++) {
    const check = emails.find((e) => e == script.emailList[i]);
    if (!check) {
      email = script.emailList[i];
      break;
    }
  }
  if (email) {
    emails.push(email);
  }

  return `{
    try {
      const script = ${scriptStr};
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
  
      await page.goto("https://mbasic.facebook.com/settings/", {
        waitUntil: "networkidle2",
        timeout: 60000,
      });
      await delay(2000);
  
      await page.goto("https://mbasic.facebook.com/settings/email", {
        waitUntil: "networkidle2",
        timeout: 60000,
      });
      await delay(2000);
      if (script.isDelete) {
        const listMail = [];
  
        const elLinks = await getElements(page, "a");
  
        if (elLinks && elLinks.length) {
          for (let i = 0; i < elLinks.length; i++) {
            const href = await elLinks[i].evaluate((element) => element.href);
            if (href && href.toString().includes("remove_email")) {
              listMail.push(elLinks[i]);
            }
          }
        }
  
        if (listMail.length > 0) {
          await listMail[0].click();
          await delay(5000);
          const submit = await getElement(page, '[name="save"]');
          if (submit) {
            await submit.click();
            await delay(5000);
          }
        }
      } else if (script.isAdd) {
        const email = ${JSON.stringify(email)}

        if (!email) {
          logger("Debug|Email|Change email Fail");
        }
  
        await page.goto("https://mbasic.facebook.com/settings/email/add", {
          waitUntil: "networkidle2",
          timeout: 60000,
        });
        await delay(2000);
  
        const inputEmail = await getElement(page, '[name="email"]');
  
        if (inputEmail) {
          await inputEmail.type(email.split("|")[0].trim(),{delay:20});
          await delay(1000);
          const save = await getElement(page,'[name="save"]');
          if(save){
            await save.click();
            await delay(7000);
            const nameEmail = email.split("@")[0];
            const links = await getElements(page, "a");
            if (links && links.length) {
              for (let i = 0; i < links.length; i++) {
                const href = await links[i].evaluate((element) => element.href);
                if (href && href.toString().includes("entercode") && href.toString().includes(nameEmail)) {
                  await links[i].click();
                  await delay(7000);
                  break;
                }
              }
            }

            const inputCode = await getElement(page,'[name="code"]');
            if(inputCode){
                if(script.waitTimeOTP > 15){
                    await delay((script.waitTimeOTP - 15)*1000);
                }
                else{
                  await delay(3000);
                }

                let codeMail = await getCodeMail(
                  email.split("|")[0].trim(),
                  email.split("|")[1].trim(),
                );
                logger(codeMail);
                if (!codeMail || !codeMail.length) {
                  for (let i = 0; i < 5; i++) {
                    await delay(10000);
                    codeMail = await getCodeMail(
                      email.split("|")[0].trim(),
                      email.split("|")[1].trim(),
                    );
                    logger(codeMail);
                    if (codeMail && codeMail.length) {
                      break;
                    }
                  }
                }

                if (codeMail && codeMail.length) {
                  await inputCode.type(codeMail,{delay:10});
                  await delay(1000);
                  const submitCode = await getElement(page,'[id="root"] [type="submit"]');
                  if(submitCode){
                    await submitCode.click();
                    await delay(10000);
                  }
                }
            }

          }
        }
      } else if (script.isHide) {
        const elLinks = await getElements(page, "a");
        if (elLinks && elLinks.length) {
          for (let i = 0; i < elLinks.length; i++) {
            const href = await elLinks[i].evaluate((element) => element.href);
            if (href && href.toString().includes("privacyx/selector")) {
              await elLinks[i].click();
              await delay(7000);
              break;
            }
          }
        }
        if (!page.url().includes("/privacyx/selector")) {
          await delay(5000);
        }
        const elHrefs = await getElements(page, "a");
        if (elHrefs && elHrefs.length) {
          for (let i = 0; i < elHrefs.length; i++) {
            const href = await elHrefs[i].evaluate((element) => element.href);
            if (href && href.toString().includes("px=286958161406148")) {
              await elHrefs[i].click();
              await delay(7000);
              break;
            }
          }
        }
      }
    } catch (e) {
      logger(e);
      logger("Debug|Email|Change email Fail");
    }
  }
  
    `;
};
