export const watchVideo = (setting) => {
  const strSetting = `
      {
        videoStart: ${setting.videoStart},
        videoEnd: ${setting.videoEnd},
        delayTimeStart: ${setting.delayTimeStart},
        delayTimeEnd: ${setting.delayTimeEnd},
        isLike: ${setting.isLike},
        likeStart: ${setting.likeStart},
        likeEnd: ${setting.likeEnd},
        isShare: ${setting.isShare},
        shareStart: ${setting.shareStart},
        shareEnd: ${setting.shareEnd},
        isComment: ${setting.isComment},
        option: ${JSON.stringify(setting.option)},
        text:${JSON.stringify(setting.text)},
        photos:${JSON.stringify(setting.photos)},
        photoStart: ${setting.photoStart},
        photoEnd: ${setting.photoEnd},
        commentStart: ${setting.commentStart},
        commentEnd: ${setting.commentEnd},
       
      }`;
  console.log(strSetting);
  return `
  const uploadImg = async (page, watchVideoObj) => {
    try {
      if (watchVideoObj.photos.length > 0) {
        const upload = await findBtn(
          page,
          "󰘋",
          "div.fl.ac > div.native-text > span.f3"
        );
        if (upload) {
          const [fileChooser] = await Promise.all([
            page.waitForFileChooser(),
            await clickElement(upload),
          ]);
          await delay(3000);
          // Accept multiple files
          await fileChooser.accept([
            watchVideoObj.photos[getRandomInt(watchVideoObj.photos.length)],
          ]);
          await delay(getRandomIntBetween(3000, 5000));
          const element = await checkExistElement(
            page,
            "div.m > div.native-text",
            3
          );
          if (element === 1) {
            const uploadBtn = await page.$("div.m > div.native-text");
            await clickElement(uploadBtn);
            await delay(10000);
            logger("Done upload img");
          }
          //cmt text
          if (watchVideoObj.text.length > 0) {
            const elementText = await checkExistElement(
              page,
              "textarea.textbox.multi-line-floating-textbox",
              3
            );
            if (elementText === 1) {
              const commentBtn = await page.$(
                "textarea.textbox.multi-line-floating-textbox"
              );
  
              await delay(getRandomIntBetween(3000, 5000));
              await commentBtn.type(
                watchVideoObj.text[getRandomInt(watchVideoObj.text.length)],
                { delay: 200 }
              );
              await delay(getRandomIntBetween(3000, 5000));
            }
          }
          //send commnent
          const elementSend = await checkExistElement(
            page,
            "button.textbox-submit-button",
            3
          );
          if (elementSend === 1) {
            const sendBtn = await page.$("button.textbox-submit-button");
            await clickElement(sendBtn);
            await delay(getRandomIntBetween(3000, 5000));
            logger("Done comment post");
          }
        } else {
          return false;
        }
      } else {
        logger("So anh random khong hop le");
        return false;
      }
      return true;
    } catch (error) {
      logger(error);
      return false;
    }
  };
  
  const clickElementRandom = async (page, element, index, urlPage) => {
    try {
      //check page live
      const isLive = await checkIsLive(page);
      if (isLive) {
        await delay(getRandomIntBetween(3000, 5000));
        const selectors = await page.$$(element);
  
        if (selectors.length > 0) {
          const x = index ? index : getRandomInt(selectors.length);
          await scrollSmoothIfNotExistOnScreens(selectors[x]);
          await delay(getRandomIntBetween(3000, 5000));
          await selectors[x].evaluate((b) => b.click());
          return true;
        } else {
          await delay(getRandomIntBetween(3000, 5000));
          const isNavigate = await navigateToUrl(page, urlPage);
          if (isNavigate) return true;
          return false;
        }
      } else {
        return false;
      }
    } catch (error) {
      logger(error.message);
      return false;
    }
  };
  
  const navigateToUrl = async (page, link) => {
    try {
      const url = await page.url();
      if (!url.includes(link)) {
        await page.goto(link, {
          waitUntil: 'networkidle2',
        });
        return true;
      } else {
        logger('cant navigate');
        return false;
      }
    } catch (error) {
      logger('Error navigating to URL:'+error.message);
      return false;
    }
  };
  
  const checkExistElementOnScreens = async (JSSelector) => {
    try {
      const isElementVisible = await JSSelector.evaluate((el) => {
        const { top, left, bottom, right } = el.getBoundingClientRect();
        return (
          top >= 0 &&
          left >= 0 &&
          bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
          right <= (window.innerWidth || document.documentElement.clientWidth)
        );
      });
      return isElementVisible;
    } catch (error) {
      logger(error.message);
      return false;
    }
  };
  
  const checkUrlPage = async (page, urlText) => {
    try {
      await delay(getRandomIntBetween(5000, 10000));
      const url = page.url();
      if (url.includes(urlText)) return true;
      return false;
    } catch (error) {
      logger(error.message);
      return false;
    }
  };
  
  const scrollSmoothIfNotExistOnScreens = async (JSSelector) => {
    try {
      const isExistElementOnScreen = await checkExistElementOnScreens(JSSelector);
      if (!isExistElementOnScreen) {
        await JSSelector.evaluate((el) => {
          el.scrollIntoView({
            behavior: 'smooth',
            inline: 'nearest',
            block: 'center',
          });
        });
        return true;
      }
      return true;
    } catch (error) {
      logger(error.message);
      return false;
    }
  };
  
  const findBtn = async (page, content, selector) => {
    try {
      const buttons = await getElements(page, selector);
      for (let i = 0; i < buttons.length; i++) {
        const btn = await page.evaluate((el) => {
          return el.innerHTML;
        }, buttons[i]);
        if (btn.includes(content)) {
          return buttons[i];
        }
      }
    } catch (err) {
      logger(err);
    }
  };
  const watchVideoObj = ${strSetting}
  try {
    //check page live
    const isLive = await checkIsLive(page);
    if (isLive) {
      await returnHomePage(page);
      await delay(getRandomIntBetween(3000, 5000));
      const isLogin = await checkLogin(page, "https://m.facebook.com/");
      if (isLogin) {
        let countVideo = 0;
        let countLike = 0;
        let countShare = 0;
        let countComment = 0;

        const numsVideo =
          watchVideoObj.videoStart < watchVideoObj.videoEnd
            ? getRandomIntBetween(
                watchVideoObj.videoStart,
                watchVideoObj.videoEnd
              )
            : getRandomIntBetween(
                watchVideoObj.videoEnd,
                watchVideoObj.videoStart
              );
        const numsLike =
          watchVideoObj.likeStart < watchVideoObj.likeEnd
            ? getRandomIntBetween(
                watchVideoObj.likeStart,
                watchVideoObj.likeEnd
              )
            : getRandomIntBetween(
                watchVideoObj.likeEnd,
                watchVideoObj.likeStart
              );
        const numsShare =
          watchVideoObj.shareStart < watchVideoObj.shareEnd
            ? getRandomIntBetween(
                watchVideoObj.shareStart,
                watchVideoObj.shareEnd
              )
            : getRandomIntBetween(
                watchVideoObj.shareEnd,
                watchVideoObj.shareStart
              );
        const numsComment =
          watchVideoObj.commentStart < watchVideoObj.commentEnd
            ? getRandomIntBetween(
                watchVideoObj.commentStart,
                watchVideoObj.commentEnd
              )
            : getRandomIntBetween(
                watchVideoObj.commentEnd,
                watchVideoObj.commentStart
              );
        //navigate video page
        await delay(getRandomIntBetween(3000, 5000));
        await clickElementRandom(
          page,
          'div[data-comp-id="6"]',
          0,
          "https://www.facebook.com/watch/"
        );

        while (
          countVideo < numsVideo &&
          countLike < numsVideo &&
          countShare < numsVideo &&
          countComment < numsVideo
        ) {
          const currentTime = new Date();
          let scrollTime = new Date();
          while (scrollTime - currentTime < getRandomIntBetween(15000, 20000)) {
            await scrollByWheel(page, getRandomIntBetween(200, 500));
            await delay(getRandomIntBetween(3000, 5000));
            scrollTime = new Date();
          }

          const playElement = await page.$$(
            "div.m > div.inline-video-container"
          );
          await delay(getRandomIntBetween(3000, 5000));
          const index = getRandomIntBetween(3, playElement.length);
          await clickElement(playElement[index]);
          await delay(getRandomIntBetween(3000, 5000));

          const isWatchPage = await checkUrlPage(page, "m.facebook.com/watch/");
          if (isWatchPage) {
            await clickElement(playElement[index]);
            await clickElement(playElement[index]);
            logger("Click");
          }

          const timeViewVideo =
            watchVideoObj.delayTimeStart < watchVideoObj.delayTimeEnd
              ? getRandomIntBetween(
                  watchVideoObj.delayTimeStart * 1000,
                  watchVideoObj.delayTimeEnd * 1000
                )
              : getRandomIntBetween(
                  watchVideoObj.delayTimeEnd * 1000,
                  watchVideoObj.delayTimeStart * 1000
                );
          await delay(timeViewVideo);

          //like video
          if (watchVideoObj.isLike) {
            if (countLike <= numsLike && getRandomIntBetween(0, 2) == 1) {
              await delay(getRandomIntBetween(3000, 5000));
              const button = await findBtn(page, "󰍸", "button.native-text");
              await scrollSmoothIfNotExistOnScreen(button);
              await delay(getRandomIntBetween(3000, 5000));
              await button.evaluate(b => b.click());
              countLike++;
              logger("like complete");
            }
          }
          //comment video
          if (watchVideoObj.isComment) {
            if (countComment < numsComment && watchVideoObj.option === "all") {
              if (getRandomIntBetween(0, 2) == 1) {
                const button = await findBtn(
                  page,
                  "󰍹",
                  'span[style="color:#ffffff;"]'
                );
                await scrollSmoothIfNotExistOnScreen(button);
                await delay(getRandomIntBetween(3000, 5000));
                await clickElement(button);
                await uploadImg(page, watchVideoObj);
                //return page
                await delay(getRandomIntBetween(3000, 5000));
                const returnBtn = await findBtn(
                  page,
                  "󰟙",
                  "div.m > div.fl.ac > div.native-text > span.f3"
                );
                await delay(getRandomIntBetween(3000, 5000));
                await clickElement(returnBtn);
                countComment++;
              }
            } else if (
              countComment < numsComment &&
              watchVideoObj.option === "text"
            ) {
              if (
                getRandomIntBetween(0, 2) == 1 &&
                watchVideoObj.text.length > 0
              ) {
                const button = await findBtn(
                  page,
                  "󰍹",
                  'span[style="color:#ffffff;"]'
                );
                await scrollSmoothIfNotExistOnScreen(button);
                await delay(getRandomIntBetween(3000, 5000));
                await clickElement(button);
                await delay(getRandomIntBetween(3000, 5000));
                await page.type(
                  "div.m.mentions-text > textarea.internal-input.input-box.native-input",
                  watchVideoObj.text[getRandomInt(watchVideoObj.text.length)],
                  { delay: 200 }
                );
                await delay(getRandomIntBetween(3000, 5000));
                const sendBtn = await findBtn(
                  page,
                  "󱛅",
                  "div.m > div.fl.ac > div.native-text > span.f3"
                );
                await delay(getRandomIntBetween(3000, 5000));
                await clickElement(sendBtn);
                logger("comment complete");
                //return page
                await delay(getRandomIntBetween(3000, 5000));
                const returnBtn = await findBtn(
                  page,
                  "󰟙",
                  "div.m > div.fl.ac > div.native-text > span.f3"
                );
                await delay(getRandomIntBetween(3000, 5000));
                await clickElement(returnBtn);
                countComment++;
              }
            }
          }
          //share video
          if (watchVideoObj.isShare) {
            if (countShare <= numsShare && getRandomIntBetween(0, 2) == 1) {
              const shareBtn = await findBtn(
                page,
                "󰍺",
                'span[style="color:#ffffff;"]'
              );
              await delay(getRandomIntBetween(3000, 5000));
              await clickElement(shareBtn);
              await delay(getRandomIntBetween(3000, 5000));
              const typeShareBtn = await findBtn(
                page,
                "󱘣",
                "div.m > div.fl.ac > div.native-text > span.f3"
              );
              await delay(getRandomIntBetween(3000, 5000));
              await clickElement(typeShareBtn);
              await delay(getRandomIntBetween(3000, 5000));
              const isCheckClickPost = await checkExistElement(
                page,
                "div.m > div.fl.ar.am > button.native-text.rtl > span.f2",
                3
              );
              if (isCheckClickPost === 1) {
                const postBtn = await page.$(
                  "div.m > div.fl.ar.am > button.native-text.rtl > span.f2"
                );
                await clickElement(postBtn);
                logger("share complete");
              } else {
                const postBtn = await page.$(
                  "div.fl.ac.am > button.native-text > span.f2"
                );
                await clickElement(postBtn);
                logger("share complete");
              }
              countShare++;
            }
          }
          //return watch page
          await delay(getRandomIntBetween(3000, 5000));
          await clickElementRandom(
            page,
            "div.m > div.fl.ac > div.native-text > span.f3"
          );
          await delay(getRandomIntBetween(3000, 5000));
          countVideo++;
        }
        logger("Complete view video");
      } else {
        logger("You need log in");
        return;
      }
    }
  } catch (error) {
    logger(error.message);
    return false;
  }
    `;
};
