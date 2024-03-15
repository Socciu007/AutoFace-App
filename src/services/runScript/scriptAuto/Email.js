export const changeEmail = (script, account) => {
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
        if (!script.emailList || !script.emailList.length) {
          logger("Debug|Email|Change email Fail");
        }
  
        await page.goto("https://mbasic.facebook.com/settings/email/add", {
          waitUntil: "networkidle2",
          timeout: 60000,
        });
        await delay(2000);
  
        const inputEmail = await getElement(page, '[name="email"]');
  
        if (inputEmail) {
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
