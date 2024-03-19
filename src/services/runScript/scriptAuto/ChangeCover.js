export const changeCover = (script, account) => {
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
      folder: ${JSON.stringify(script.folder)},
      isDelete: ${script.isDelete},
      isSkip: ${script.isSkip}
      }`;

  return `{
    const findBtn = async (page, content) => {
      try {
        let arr = [];
        const buttons = await getElements(page, '[class="native-text"]');
        for (let i = 0; i < buttons.length; i++) {
          const btn = await page.evaluate((el) => {
            return el.innerHTML;
          }, buttons[i]);
  
          if (btn.includes(content)) {
            arr.push(buttons[i]);
          }
        }
        return arr;
      } catch (err) {
        logger(err);
      }
    };
  
    try {
      const script = ${scriptStr};
      const account = ${accountStr};
  
      const checkPageIsLive = checkIsLive(page);
      if (!checkPageIsLive) {
        logger("Page null!");
        return false;
      }
  
      if (script.isDelete) {
        await page.goto("https://m.facebook.com/profile.php", {
          waitUntil: "networkidle2",
          timeout: 60000,
        });
  
        const btnImage = await findBtn(page, "󱘄");
  
        if (btnImage && btnImage.length > 1) {
          await btnImage[0].click();
  
          await delay(2000);
          const btnSee = await findBtn(page, "󱙯");
          if (btnSee.length) {
            await btnSee[0].click();
            await delay(7000);
            let btnMore = await findBtn(page, "󰤀");
            if (!btnMore.length) {
              await delay(2000);
              btnMore = await findBtn(page, "󰈴");
            }
  
            if (btnMore.length) {
              await btnMore[0].click();
              await delay(2000);
  
              const btnDelete = await findBtn(page, "󰘝");
  
              if (btnDelete.length) {
                await btnDelete[0].click();
                await delay(2000);
  
                const btnYes = await getElements(
                  page,
                  'button[data-focusable="true"]'
                );
  
                if (btnYes.length > 2) {
                  await btnYes[btnYes.length - 2].click();
                  await delay(5000);
                }
              }
            }
          }
        }
      }
  
      await page.goto("https://mbasic.facebook.com/profile.php", {
        waitUntil: "networkidle2",
        timeout: 60000,
      });
      await delay(200000000);
  
      const btnAdd = await getElement(page, '[id="profile_cover_photo"]', 3);
      if (btnAdd) {
        await btnAdd.click();
        await delay(5000);
      } else if (!script.isSkip) {
        const links = await getElements(page, "a");
        if (links && links.length) {
          for (let i = 0; i < links.length; i++) {
            const href = await links[i].evaluate((element) => element.href);
            if (href && href.toString().includes("cover_photo")) {
              await links[i].click();
              await delay(5000);
              break;
            }
          }
        }
      } else {
        logger("The account already has an cover");
        return;
      }
  
      const links = await getElements(page, "a");
      if (links && links.length) {
        for (let i = 0; i < links.length; i++) {
          const href = await links[i].evaluate((element) => element.href);
          if (href && href.toString().includes("photos/upload")) {
            await links[i].click();
            await delay(5000);
            break;
          }
        }
  
        const btnUpload = await getElement(page, '[type="file"]');
  
        if (btnUpload) {
          const images = getAllFileFromFolder(script.folder);
  
          if (images && images.length) {
            const arrImg = [];
            const image = images[getRandomInt(images.length)];
            arrImg.push(image);
            const [fileChooser] = await Promise.all([
              page.waitForFileChooser(),
              await btnUpload.click(),
            ]);
            await fileChooser.accept(arrImg);
            await delay(5000);
  
            const submit = await getElement(page, '[type="submit"]');
            if (submit) {
              await submit.click();
              await delay(10000);
            }
          } else {
            logger("Debug|Avatar|Folder is emty");
          }
        }
      }
    } catch (e) {
      logger(e);
      logger("Debug|Change cover|Change cover Fail");
    }
  }
    `;
};
