export const changeAvatar = (script, account) => {
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
    isAddFrame: ${script.isAddFrame},
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
        await delay(2000);
  
        const btnImage = await findBtn(page, "󱘄");
  
        if (btnImage && btnImage.length) {
          if (btnImage.length > 1) {
            await btnImage[1].click();
          } else {
            await btnImage[0].click();
          }
  
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
  
      await page.goto("https://m.facebook.com/profile.php", {
        waitUntil: "networkidle2",
        timeout: 60000,
      });
      await delay(2000);
  
      const btnImage = await findBtn(page, "󱘄");
  
      if (btnImage.length) {
        if (btnImage.length > 1) {
          await btnImage[1].click();
        } else {
          await btnImage[0].click();
        }
  
        await delay(2000);
        const btnSee = await findBtn(page, "󱙯");
        if (btnSee.length && script.isSkip) {
          logger("Account da co anh dai dien");
        } else {
          const btnUpload = await findBtn(page, "󱛦");
          if (btnUpload.length) {
            const images = getAllFileFromFolder(script.folder);
            if (images && images.length) {
                const arrImg = [];
              const image = images[getRandomInt(images.length)];
              arrImg.push(image);
              const [fileChooser] = await Promise.all([page.waitForFileChooser(), await btnUpload[0].click()]);
              await fileChooser.accept(arrImg);
              await delay(5000);
            if(script.isAddFrame){
                const btnFrame = await findBtn(page, '󱙋');
                if(btnFrame.length){
                    await btnFrame[0].evaluate(b => b.click());;
                    logger('btnFrame click');
                    await delay(5000);
                    const frames = await getElements(page,'[role="link"]');
                    if(frames && frames.length > 1){
                        const frame = frames[getRandomIntBetween(1, frames.length)]
                        await scrollSmoothIfElementNotExistOnScreen(page, frame);
                        await delay(1000);
                        await frame.click();
                        await delay(5000);
                    }
                }
            }
            const btnUpdate = await getElements(page,'[role="link"] span');
                if(btnUpdate && btnUpdate.length){
                    await btnUpdate[btnUpdate.length - 1].click();
                    await delay(15000);
                }
            } else {
              logger("Debug|Avatar|Folder is emty");
            }
          }
        }
      }
    } catch (e) {
      logger(e);
      logger("Debug|Change avatar|Change avatar Fail");
    }
  }
  `;
};
