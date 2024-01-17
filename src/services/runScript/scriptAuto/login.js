export const loginFacebook = (account) => {
  const accountStr = `{
          uid: ${JSON.stringify(account.uid)},
          password:${JSON.stringify(account.password)},
          recoveryEmail:${JSON.stringify(account.recoveryEmail)},
          recoveryPassword:${JSON.stringify(account.recoveryPassword)},
          cookies:${JSON.stringify(account.cookies)},
          token:${JSON.stringify(account.token)},
          twoFA:${JSON.stringify(account.twoFA)}
      }`;

  return `
      try{
          const account = ${accountStr}
          const checkPageIsLive = await checkIsLive(page);
      if (!checkPageIsLive){
          logger("Page null!");
          return false;
      }
      await returnHomePage(page);
      await delay(2000);
      const { isLogin, error } = await checkLogin(page);
      if (!isLogin) {
          logger(account.twoFA);
          if (account.twoFA && account.twoFA.length) {
            await returnHomePage(page);
            const email = await getElementEmail(page);
            const password = await getElementPassword(page);
            if (email && password) {
              await email.type(account.uid, { delay: 100 });
              await delay(1000);
              await password.type(account.password, { delay: 100 });
              await delay(1000);
              const emailText = await getInputText(page, email);
              const passwordText = await getInputText(page, password);
              if (emailText == '') {
                await email.type(account.account, { delay: 100 });
                await delay(1000);
              }
              if (passwordText == '') {
                await password.type(account.password, { delay: 100 });
                await delay(1000);
              }
              await page.keyboard.press('Enter');
              await delay(3000);
              const inputCode = await getElement(page, '[id="approvals_code"]', 60);
              if (inputCode) {
                const code = await toOTPCode(account.twoFA, proxy);
                if (code && code.length) {
                  await inputCode.type(code, { delay: 100 });
                  await delay(1000);
                  await page.keyboard.press('Enter');
                  const buttonCheckpoint = await getElement(page, '[id="checkpointSubmitButton"]', 40);
                  if(buttonCheckpoint){
                      await buttonCheckpoint.click();
                      await delay(10000);
                  }
                  else{
                      return { isLogin: false, error: 'Login Fail' };
                  }
                  
                } else {
                  return { isLogin: false, error: 'Dont get 2FA code' };
                }
              } else {
                return { isLogin: false, error: 'Dont find 2FA code element' };
              }
            } else {
              return { isLogin: false, error: 'Dont find email or password element' };
            }
      
            const { isLogin, error } = await checkLogin(page);
            if (!isLogin) {
              return { isLogin, error };
            }
          } else if (account.cookies && account.cookies.length) {
            const cookies = [];
            account.cookies.split(';').forEach((acc) => {
              if (acc.split('=')[0] && acc.split('=')[0].length && acc.split('=')[1]) {
                cookies.push({
                  name: acc.split('=')[0].trim(),
                  value: acc.split('=')[1],
                  domain: '.facebook.com',
                  expires: acc.split('=')[0].trim() == 'presence' ? -1 : moment().add(180, 'days').unix(),
                });
              }
            });
            logger(cookies);
            const client = await page.target().createCDPSession();
            await client.send('Network.clearBrowserCookies');
            await client.send('Network.clearBrowserCache');
            await page.setCookie(...cookies);
            await delay(3000);
            await page.goto('https://m.facebook.com/', {
              waitUntil: 'networkidle2',
              timeout: 60000,
            });
            await delay(3000);
            const { isLogin, error } = await checkLogin(page);
            if (!isLogin) {
              return { isLogin, error };
            }
          } else return { isLogin: false, error: '2FA and Cookies not found!' };
        }
      } catch (err) {
        logger(err);
        return false;
      }
      `;
};
