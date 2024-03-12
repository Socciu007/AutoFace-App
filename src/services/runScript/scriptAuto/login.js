export const loginFacebook = (script, account) => {
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
        typeLogin: ${JSON.stringify(script.typeLogin)},
        delayTimeStart: ${script.delayTimeStart},
        delayTimeEnd: ${script.delayTimeEnd}
      }`;

  return `{
  try {
    const script = ${scriptStr};
    const account = ${accountStr};
    const rdTime = getRandomIntBetween(script.delayTimeStart, script.delayTimeEnd) * 1000;
    const checkPageIsLive = checkIsLive(page);
    if (!checkPageIsLive) {
      logger("Page null!");
      return false;
    }
    await returnHomePage(page);
    await delay(2000);
    let loginDone = false;
    let errLogin = "";
    const checkpoint956 = async () => {
      await page.goto("https://mbasic.facebook.com/", {
        waitUntil: "networkidle2",
        timeout: 60000,
      });
      await delay(3000);
      let isClickStart = false;
      const elStarts = await getElements(page, "a", 20);
      if (elStarts && elStarts.length) {
        for (let i = 0; i < elStarts.length; i++) {
          const href = await elStarts[i].evaluate((element) => element.href);
          if (
            href &&
            href.includes("checkpoint") &&
            href.includes("956") &&
            !href.includes("help")
          ) {
            await elStarts[i].click();
            isClickStart = true;
            break;
          }
        }
        if (isClickStart) {
          await delay(7000);
          let isClickNext = false;
          const elNexts = await getElements(page, "a", 20);
          for (let i = 0; i < elNexts.length; i++) {
            const href = await elNexts[i].evaluate((element) => element.href);
            if (
              href &&
              href.includes("checkpoint") &&
              href.includes("956") &&
              !href.includes("help")
            ) {
              await elNexts[i].click();
              isClickNext = true;
              break;
            }
          }
  
          if (isClickNext) {
            await delay(5000);
            const btnNext = await getElement(page, '[type="submit"]', 15);
            if (btnNext) {
              await btnNext.click();
              await delay(5000);
              const btnGetCode = await getElement(page, '[type="submit"]', 15);
              if (btnGetCode) {
                await btnGetCode.click();
                await delay(5000);
                const inputCodeMail = await getElement(page, '[name="code"]', 15);
                if (inputCodeMail) {
                  await delay(15000);
                  let codeMail = await getCodeMail(
                    account.recoveryEmail,
                    account.recoveryPassword
                  );
  
                  if (!codeMail || codeMail.length !== 8) {
                    for (let i = 0; i < 5; i++) {
                      await delay(10000);
                      codeMail = await getCodeMail(
                        account.recoveryEmail,
                        account.recoveryPassword
                      );
                      if (codeMail && codeMail.length == 8) {
                        break;
                      }
                    }
                  }
                  if (codeMail && codeMail.length == 8) {
                    await inputCodeMail.type(codeMail, { delay: 100 });
                    await delay(1000);
                    const submitCodeMails = await getElements(
                      page,
                      '[type="submit"]',
                      5
                    );
                    if (submitCodeMails.length) {
                      await submitCodeMails[submitCodeMails.length - 1].click();
                      await delay(5000);
                      for (let i = 0; i < 3; i++) {
                        const btnConfirm = await getElement(page, "a > span", 10);
                        if (btnConfirm) {
                          await btnConfirm.click();
                          await delay(7000);
                        }
                      }
                      await returnHomePage(page);
                      await delay(3000);
                    }
                  }
                }
              }
            }
          }
        }
      }
    };
  
    let { isLogin, error } = await checkLogin(page);
    if (!isLogin && error == "Checkpoint" && page.url().includes("956")) {
      if (
        !account.recoveryEmail ||
        !account.recoveryPassword ||
        account.recoveryEmail.length == 0 ||
        account.recoveryPassword.length == 0
      ) {
        logger("Debug||Account checkpoint");
        return { isLogin: false, error: "Account checkpoint" };
      }
      await checkpoint956();
    } else if (!isLogin) {
      if (script.typeLogin == "cookies") {
        if (
          account.cookies &&
          account.cookies.length &&
          account.cookies.includes("c_user")
        ) {
          const cookies = [];
          account.cookies.split(";").forEach((acc) => {
            if (
              acc.split("=")[0] &&
              acc.split("=")[0].length &&
              acc.split("=")[1] &&
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
          const client = await page.target().createCDPSession();
          await client.send("Network.clearBrowserCookies");
          await client.send("Network.clearBrowserCache");
          await page.setCookie(...cookies);
          await delay(3000);
          await returnHomePage(page);
          await delay(3000);
        } else {
          logger("Debug||Invalid cookies");
          return { isLogin: false, error: "Invalid cookies" };
        }
      } else if (
        account.uid &&
        account.uid.length &&
        account.password &&
        account.password.length
      ) {
        await returnHomePage(page);
        await delay(2000);
        let email = await getElementEmail(page, 15);
        let password = await getElementPassword(page);
        if (!email && !password) {
          const btnTryAnothers = await getElements(page, '[role="button"]', 5);
          if (btnTryAnothers && btnTryAnothers.length > 2) {
            await btnTryAnothers[btnTryAnothers.length - 3].click();
            await delay(5000);
            const inputPass = await getElement(page, "input");
            if (inputPass) {
              await inputPass.type(account.password, { delay: 100 });
              await delay(1000);
              const btnLogins = await getElements(page, '[role="button"]');
              if (btnLogins && btnLogins.length > 2) {
                await btnLogins[btnLogins.length - 2].click();
                await delay(5000);
              }
            }
          }
        } else if (email && password) {
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
  
          const btnLogin = await getElement(
            page,
            '[data-bloks-name="bk.components.ViewTransformsExtension"]',
            2
          );
          const btnLoginNew = await getElement(page, '[name="login"]', 2);
  
          if (btnLogin) {
            try {
              await btnLogin.click();
              await delay(2000);
            } catch (e) {}
          }
  
          if (btnLoginNew) {
            try {
              await btnLoginNew.click();
              await delay(2000);
            } catch (e) {}
          }
  
          await page.keyboard.press("Enter");
          await delay(10000);
  
          const urlLogin = page.url();
  
          if (urlLogin.includes("https://m.facebook.com/error")) {
            await returnHomePage(page);
          }
          const login = await checkLogin(page);
          if (!login.isLogin) {
            const inputCode = await getElement(page, '[id="approvals_code"]', 20);
            if (inputCode) {
              let code;
              for (let j = 0; j < 5; j++) {
                code = await toOTPCode(account.twoFA, j % 2 == 0 ? proxy : null);
                if (code && code.length) {
                  break;
                } else await delay(2000);
              }
  
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
              if (page.url() == "https://m.facebook.com/login/#") {
                const btnTryAnothers = await getElements(page, '[role="button"]');
                if (btnTryAnothers && btnTryAnothers.length == 2) {
                  await btnTryAnothers[1].click();
                  await delay(5000);
                  const btn2Fa = await getElements(page, '[role="button"]');
                  if (btn2Fa && btn2Fa.length > 2) {
                    await btn2Fa[2].click();
                    await delay(2000);
                    await btn2Fa[btn2Fa.length - 1].click();
                    await delay(5000);
  
                    const inputCode = await getElement(page, '[type="number"]');
                    if (inputCode) {
                      let code;
                      for (let j = 0; j < 5; j++) {
                        code = await toOTPCode(
                          account.twoFA,
                          j % 2 == 0 ? proxy : null
                        );
                        logger("Code " + code);
                        if (code && code.length) {
                          break;
                        } else await delay(2000);
                      }
  
                      if (code && code.length) {
                        await inputCode.type(code);
                        const btnContinues = await getElement(
                          page,
                          '[role="button"]'
                        );
                        if (btnContinues && btnContinues.length > 2) {
                          await btnContinues[btnContinues.length - 2].click();
                          await delay(5000);
                        }
                      }
                    }
                  }
                }
              }
              const allText = await getAllText(page);
              if (!allText.includes(account.recoveryEmail.split("@")[1])) {
                const confirmButton = await getElement(
                  page,
                  '[id="checkpointSecondaryButton-actual-button"]',
                  5
                );
                if (confirmButton) {
                  await confirmButton.click();
                  const radioEmailbtn = await getElement(
                    page,
                    '[data-sigil="touchable"]',
                    5
                  );
                  if (radioEmailbtn) {
                    await radioEmailbtn.click();
  
                    const continueBtn = await getElement(
                      page,
                      '[id="checkpointSubmitButton-actual-button"]',
                      5
                    );
                    if (continueBtn) {
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
                  await delay(15000);
                  let codeMail = await getCodeMail(
                    account.recoveryEmail,
                    account.recoveryPassword
                  );
  
                  if (!codeMail || codeMail.length !== 8) {
                    for (let i = 0; i < 5; i++) {
                      await delay(10000);
                      codeMail = await getCodeMail(
                        account.recoveryEmail,
                        account.recoveryPassword
                      );
                      if (codeMail && codeMail.length == 8) {
                        break;
                      }
                    }
                  }
  
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
      } else {
        logger("Debug||Login fail");
        return { isLogin: false, error: "Login fail" };
      }
  
      const result = await checkLogin(page);
      loginDone = result.isLogin;
      errLogin = result.error;
  
      if(loginDone){
        if (account.cookies) {
          logger("Delete Cookie|" + account.cookies);
        }
        await page.goto('https://m.facebook.com/', {
    waitUntil: 'networkidle2',
    timeout: 60000,
  });
        if(rdTime > 0) await delay(rdTime);

        for(let i=0 ;i < 4;i++){
          let elNext = await getElement(page,'[id="nux-nav-button"]', 5);
              if(elNext){
                  await elNext.click();
                  await delay(7000);
              }
              else break;
          }

        return true;
      } 
      else if (!loginDone && errLogin == "Checkpoint" && page.url().includes("956")) {
        if (
          !account.recoveryEmail ||
          !account.recoveryPassword ||
          account.recoveryEmail.length == 0 ||
          account.recoveryPassword.length == 0
        ) {
          logger("Debug||Account checkpoint");
          return { isLogin: false, error: "Account checkpoint" };
        }
        await checkpoint956();
        const { isLogin, error } = await checkLogin(page);
        if (!isLogin) {
          logger("Debug||"+ error);
          return { isLogin, error };
        }
        if (account.cookies) {
          logger("Delete Cookie|" + account.cookies);
        }
        await page.goto('https://m.facebook.com/', {
    waitUntil: 'networkidle2',
    timeout: 60000,
  });
        if(rdTime > 0) await delay(rdTime);

        for(let i=0 ;i < 4;i++){
          let elNext = await getElement(page,'[id="nux-nav-button"]', 5);
              if(elNext){
                  await elNext.click();
                  await delay(7000);
              }
              else break;
          }
      } 
    }
  } catch (err) {
    logger(err);
    return false;
  }}
  `;
};
