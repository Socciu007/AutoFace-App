export const changePassword = (script, account) => {
  const accountStr = `{
        id: ${JSON.stringify(account.id)},
        uid: ${JSON.stringify(account.uid)},
        password:${JSON.stringify(account.password)},
        recoveryEmail:${JSON.stringify(account.recoveryEmail)},
        recoveryPassword:${JSON.stringify(account.recoveryPassword)},
        cookies:${JSON.stringify(account.cookies)},
        token:${JSON.stringify(account.token)},
        twoFA:${JSON.stringify(account.twoFA)}
    }`;

  const scriptStr = `{
        newPassword: ${JSON.stringify(script.newPassword)},
        url: ${JSON.stringify(script.url)}
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
  
      await page.goto("https://mbasic.facebook.com/settings/security_login", {
        waitUntil: "networkidle2",
        timeout: 60000,
      });
      await delay(2000);
      const elLinks = await getElements(page, "a");
     
      if (elLinks && elLinks.length) {
        for (let i = 0; i < elLinks.length; i++) {
          const href = await elLinks[i].evaluate((element) => element.href);
          if (href && href.toString().includes("security/password")) {
            await elLinks[i].click();
            await delay(7000);
            break;
          }
        }
      }
      if (!page.url().includes("security/password")) {
        await page.goto(
          "https://mbasic.facebook.com/settings/security/password",
          {
            waitUntil: "networkidle2",
            timeout: 60000,
          }
        );
        await delay(2000);
      }
      
      const elOldPass = await getElement(page, '[name="password_old"]');
      const elNewPass = await getElement(page, '[name="password_new"]');
      const elConfirm = await getElement(page, '[name="password_confirm"]');
      if (elOldPass && elNewPass && elConfirm) {
        await elOldPass.type(account.password, { delay: 100 });
        await delay(getRandomIntBetween(1000, 2000));
        await elNewPass.type(script.newPassword, { delay: 100 });
        await delay(getRandomIntBetween(1000, 2000));
        await elConfirm.type(script.newPassword, { delay: 100 });
        await delay(getRandomIntBetween(1000, 2000));
        const btnSubmit = await getElement(page,'[id="objects_container"] [type="submit"]');
        if (btnSubmit) {
          await btnSubmit.click();
          await delay(getRandomIntBetween(5000, 7000));
            const elOptions = await getElements(page,'[name="session_invalidation_options"]');
            if(elOptions && elOptions.length > 1){
                await elOptions[1].click();
                await delay(1000);
            }
            else if(elOptions){
                await elOptions[0].click();
                await delay(1000);
            }
        
            const submitAction = await getElement(page,'[name="submit_action"]');

            if(submitAction){
                await submitAction.click();
                await delay(getRandomIntBetween(5000, 7000));
                if(!page.url().includes("account/password")){
                    logger("ChangePass|" + account.id + "|" + script.newPassword);
                }
            }

            
        } else {
          logger("Debug|Change password|Change password Fail");
        }
      }
    } catch (e) {
        logger(e);
      logger("Debug|Change password|Change password Fail");
    }
  }`;
};
