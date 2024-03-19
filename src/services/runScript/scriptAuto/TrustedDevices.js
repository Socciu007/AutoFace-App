export const trustedDevices = (script, account) => {
  const scriptStr = `{
            isDelete: ${script.isDelete}
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
    
        const listPhone = [];
    
        const elLinks = await getElements(page, "a");
    
        if (elLinks && elLinks.length) {
          for (let i = 0; i < elLinks.length; i++) {
            const href = await elLinks[i].evaluate((element) => element.href);
            if (href && href.toString().includes("settings/security_login/sessions")) {
              listPhone.push(elLinks[i]);
            }
          }
        }

        if (listPhone.length > 0) {
          await listPhone[0].click();
          await delay(5000);
          const links = await getElements(page, "a");

          for (let i = 0; i < links.length; i++) {
            const href = await links[i].evaluate((element) => element.href);
            if (href && href.toString().includes("log_out_all")) {
                await links[i].click();
                await delay(5000);
                break;
            }
          }
          const logoutLinks = await getElements(page, "a");

          for (let i = 0; i < logoutLinks.length; i++) {
            const href = await logoutLinks[i].evaluate((element) => element.href);
            if (href && href.toString().includes("log_out_all")) {
                await logoutLinks[i].click();
                await delay(5000);
                break;
            }
          }
        } else {
          logger("Debug|Trusted devices|Account without devices");
        }
      } catch (e) {
        logger(e);
        logger("Debug|Trusted devices|Logout devices Fail");
      }
    }
    `;
};
