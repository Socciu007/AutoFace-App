export const chnagePassword = (script, account) => {
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
  
      const elLinks = await getElements(page, "a");
  
      if (elLinks && elLinks.length) {
        for (let i = 0; i < elLinks.length; i++) {
          const href = await elLinks[i].evaluate((element) => element.href);
          if (href && href.toString().includes("security_login/password")) {
            await elLinks[i].click();
            await delay(7000);
          }
        }
      }
      if (!page.url().includes("security_login/password")) {
        await page.goto(
          "https://mbasic.facebook.com/settings/security_login/password",
          {
            waitUntil: "networkidle2",
            timeout: 60000,
          }
        );
      }
  
      const elOldPass = await getElement(page, '[name="password_old"]', 15);
      const elNewPass = await getElement(page, '[name="password_new"]');
      const elConfirm = await getElement(page, '[name="password_confirm"]');
      if (elOldPass && elNewPass && elConfirm) {
        await elOldPass.type(account.password, { delay: 100 });
        await delay(getRandomIntBetween(1000, 2000));
        await elNewPass.type(script.newPassword, { delay: 100 });
        await delay(getRandomIntBetween(1000, 2000));
        await elConfirm.type(script.newPassword, { delay: 100 });
        await delay(getRandomIntBetween(1000, 2000));
        const btnSubmit = await getElement(page, '[type="submit"]');
        if (btnSubmit) {
          await btnSubmit.click();
          await delay(getRandomIntBetween(30000, 50000));
        } else {
          logger("Debug|Change password|Change password Fail");
        }
      }
    } catch (e) {
      logger("Debug|Change password|Change password Fail");
    }
  }`;
};
