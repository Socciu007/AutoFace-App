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
  try {
    const account = ${accountStr};
  
    const checkPageIsLive = await checkIsLive(page);
    if (!checkPageIsLive) {
      logger("Page null!");
      return false;
    }
    await returnHomePage(page);
    await delay(2000);
    const { isLogin } = await checkLogin(page);
    if (!isLogin) {
      if (account.cookies && account.cookies.length) {
        const cookies = [];
        account.cookies.split(";").forEach((acc) => {
          if (
            acc.split("=")[0] &&
            acc.split("=")[0].length &&
            acc.split("=")[1] &&
            acc.split("=")[0] !== "m_page_voice" &&
            acc.split("=")[0] !== "locale" &&
            acc.split("=")[0] !== "useragent" &&
            acc.split("=")[0] !== "_uafec"
          ) {
            cookies.push({
              name: acc.split("=")[0].trim(),
              value: acc.split("=")[1],
              domain: ".facebook.com",
              expires:
                acc.split("=")[0].trim() == "presence"
                  ? -1
                  : moment().add(180, "days").unix(),
            });
          }
        });
        logger(cookies);
        const client = await page.target().createCDPSession();
        await client.send("Network.clearBrowserCookies");
        await client.send("Network.clearBrowserCache");
        await page.setCookie(...cookies);
        await delay(3000);
        await page.goto("https://m.facebook.com/", {
          waitUntil: "networkidle2",
          timeout: 60000,
        });
        await delay(3000);
        const { isLogin, error } = await checkLogin(page);
        if (!isLogin) {
          return { isLogin, error };
        }
      } else if (
        (account.twoFA && account.twoFA.length > 5) ||
        (account.uid &&
          account.uid.length &&
          account.password &&
          account.password.length)
      ) {
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
          if (emailText == "") {
            await email.type(account.account, { delay: 100 });
            await delay(1000);
          }
          if (passwordText == "") {
            await password.type(account.password, { delay: 100 });
            await delay(1000);
          }

          const btnLogin = await getElement(page, '[name="login"]', 5);

          if(btnLogin){
            await btnLogin.click();
            await delay(2000);
          }

          await page.keyboard.press("Enter");
          await delay(10000);
          const login = await checkLogin(page);
          if (!login.isLogin) {
            const inputCode = await getElement(page, '[id="approvals_code"]', 20);
            if (inputCode) {
              const code = await toOTPCode(account.twoFA, proxy);
              await delay(2000);
              if (code && code.length) {
                await inputCode.type(code, { delay: 100 });
                await delay(1000);
                await page.keyboard.press("Enter");
                const buttonCheckpoint = await getElement(
                  page,
                  '[id="checkpointSubmitButton"]',
                  30
                );
                if (buttonCheckpoint) {
                  await buttonCheckpoint.click();
                  await delay(10000);
                } else {
                  return { isLogin: false, error: "Login Fail" };
                }
              } else {
                return { isLogin: false, error: "Dont get 2FA code" };
              }
            } else {

              const allText = await getAllText(page);

              if(!allText.includes(account.recoveryEmail.split("@")[1]))
              {
                const confirmButton = await getElement(page,'[id="checkpointSecondaryButton-actual-button"]', 5);
                if(confirmButton){
                  await confirmButton.click();

                  const radioEmailbtn = await getElement(page,'[data-sigil="touchable"]', 5);
                  if(radioEmailbtn){
                    await radioEmailbtn.click();

                    const continueBtn = await getElement(page,'[id="checkpointSubmitButton-actual-button"]', 5);
                    if(continueBtn){
                      await continueBtn.click();
                    }

                  }

                }

              }
              const confirmButton = await getElement(
                page,
                '[id="checkpointSubmitButton-actual-button"]',
                25
              );
              if (confirmButton) {
                await delay(1000);
                await confirmButton.click();
                const inputCodeMail = await getElement(
                  page,
                  '[name="captcha_response"]',
                  30
                );
                if (inputCodeMail) {
                  const codeMail = await getCodeMail(
                    account.recoveryEmail,
                    account.recoveryPassword
                  );
  
                  if (codeMail && codeMail.length == 8) {
                    await inputCodeMail.type(codeMail, { delay: 100 });
                    await delay(1000);
                    const submitCodeMail = await getElement(
                      page,
                      '[id="checkpointSubmitButton-actual-button"]',
                      5
                    );
                    if (submitCodeMail) {
                      await submitCodeMail.click();
                      await delay(5000);
                    } else {
                      return { isLogin: false, error: "Login Fail" };
                    }
                  } else {
                    return {
                      isLogin: false,
                      error: "Get code from Email fail!",
                    };
                  }
                } else {
                  return {
                    isLogin: false,
                    error: "Dont find confirm email button",
                  };
                }
              } else {
                return {
                  isLogin: false,
                  error: "Dont find confirm email button",
                };
              }
             
            }
          }
        } else {
          return { isLogin: false, error: "Dont find email or password element" };
        }
  
        const { isLogin, error } = await checkLogin(page);
        if (!isLogin) {
          return { isLogin, error };
        }
      } else return { isLogin: false, error: "2FA and Cookies not found!" };
    }
  } catch (err) {
    logger(err);
    return false;
  }
  `;
};
