export const twoFA = (script, account) => {
  const scriptStr = `{
              turnOn: ${script.turnOn}
            }`;
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

  return `{
    try {
      const script = ${scriptStr};
  
      const account = ${accountStr};
  
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
  
      await page.goto("https://mbasic.facebook.com/settings/security_login", {
        waitUntil: "networkidle2",
        timeout: 60000,
      });
      await delay(2000);
  
      const elLinks = await getElements(page, "a");
  
      if (elLinks && elLinks.length) {
        for (let i = 0; i < elLinks.length; i++) {
          const href = await elLinks[i].evaluate((element) => element.href);
          if (href && href.toString().includes("2fac/setup")) {
            await elLinks[i].click();
            await delay(5000);
            break;
          }
        }
      }
  
      const inputPass = await getElement(page, '[name="pass"]', 5);
  
      if (inputPass) {
        if (
          !account.password ||
          account.password.length == 0 ||
          account.password == ""
        ) {
          logger("Debug|Change password|Account without password");
          return false;
        }
  
        await inputPass.type(account.password, { delay: 50 });
        await delay(1000);
        const submit = await getElement(page, '[name="save"]');
        if (submit) {
          await submit.click();
          await delay(5000);
        }
      }
  
      const arrTurnOff = [];
      const turnOffLinks = await getElements(page, "a");
  
      if (turnOffLinks && turnOffLinks.length) {
        for (let i = 0; i < turnOffLinks.length; i++) {
          const href = await turnOffLinks[i].evaluate((element) => element.href);
          if (
            href.toString().includes("2fac/setup/turn_off") ||
            href.toString().includes("2fac/setup/method/remove")
          ) {
            arrTurnOff.push(turnOffLinks[i]);
          }
        }
      }
  
      if (arrTurnOff.length) {
        if (!script.turnOn) {
          await arrTurnOff[0].click();
          await delay(5000);
          const btnSubmit = await getElement(
            page,
            '[id="TwoFactButton"] [type="submit"]'
          );
          if (btnSubmit) {
            await btnSubmit.click();
            await delay(5000);
          }
        } else {
          logger("Tài khoản đã có 2FA");
        }
      } else {
        if (!script.turnOn) {
          logger("Tài khoản đã tắt 2FA");
        } else {
          const turnOnLinks = await getElements(page, "a");
          if (turnOnLinks && turnOnLinks.length) {
            for (let i = 0; i < turnOnLinks.length; i++) {
              const href = await turnOnLinks[i].evaluate(
                (element) => element.href
              );
              if (href.toString().includes("2fac/setup/qrcode/generate")) {
                await turnOnLinks[i].click();
                await delay(5000);
              }
            }
          }
  
          const elTwoFA = await getElement(
            page,
            "#root > table > tbody > tr > td > form > div.bl > div > table > tbody > tr > td > div > div.bq > div.br.ba.bs"
          );
  
          if (elTwoFA) {
            let twoFA = await getText(page, elTwoFA);
            twoFA = twoFA.replace(" ", "");
            const submit = await getElement(page, '[name="confirmButton"]');
            if (submit) {
              await submit.click();
              await delay(5000);
              const inputCode = await getElement(
                page,
                '[id="type_code_container"]'
              );
              if (inputCode) {
                let code;
                for (let j = 0; j < 5; j++) {
                  code = await toOTPCode(twoFA, j % 2 == 0 ? proxy : null);
                  if (code && code.length) {
                    break;
                  } else await delay(2000);
                }
                if (code && code.length) {
                  await inputCode.type(code);
                  await delay(1000);
                  const submitCode = await getElement(
                    page,
                    '[id="submit_code_button"]'
                  );
                  if (submitCode) {
                    await submitCode.click();
  
                    await delay(5000);
  
                    const inputPass = await getElement(page, '[name="pass"]', 5);
  
                    if (inputPass) {
                      if (
                        !account.password ||
                        account.password.length == 0 ||
                        account.password == ""
                      ) {
                        logger("Debug|Change password|Account without password");
                        return false;
                      }
  
                      await inputPass.type(account.password, { delay: 50 });
                      await delay(1000);
                      const submit = await getElement(page, '[name="save"]');
                      if (submit) {
                        await submit.click();
                        await delay(5000);
                      }
                    }
                    logger("Change2FA|" + account.id + "|" + twoFA);
                  }
                }
              }
            }
          }
        }
      }
    } catch (e) {
      logger(e);
      logger("Debug|2FA|Change 2FA Fail");
    }
  }
  
      `;
};
