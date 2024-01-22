export const viewNoti = (setting) => {
  const strSetting = `{
      notificationStart: ${setting.notificationStart},
      notificationEnd: ${setting.notificationEnd},
      delayTimeStart: ${setting.delayTimeStart},
      delayTimeEnd: ${setting.delayTimeEnd},
      option: ${JSON.stringify(setting.option)},
    }`;
  console.log(setting);
  return `
  const scrollSmoothIfNotExistOnScreens = async (JSSelector) => {
    try {
      const isExistElementOnScreen = await checkExistElementOnScreens(JSSelector);
      if (!isExistElementOnScreen) {
        await JSSelector.evaluate((el) => {
          el.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'nearest',
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
  const checkUrlPage = async (page, urlText) => {
    try {
      const url = page.url();
      if (url.includes(urlText)) return true;
      return false;
    } catch (error) {
      logger(error.message);
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
  const navigateToUrl = async (page, link) => {
    try {
      const url = await page.url();
      if (!url.includes(link)) {
        await page.goto(link, {
          waitUntil: 'networkidle2',
        });
      } else {
        logger('cant navigate');
      }
    } catch (error) {
      logger('Error navigating to URL:'+ error.message);
    }
  };

  const returnPages = async (page, browser, lengthPage) => {
    try {
      const pages = await browser.pages();
      const isHaveUrlGroup = await checkUrlPage(page, "m.facebook.com/groups");
      const isHaveUrlStory = await checkUrlPage(page, "m.facebook.com/story");
      const isHaveUrlPost = await checkUrlPage(page, "/posts");
      if (pages.length > lengthPage) {
        await pages[pages.length].close();
        await delay(getRandomIntBetween(3000, 5000));
      } else if (isHaveUrlGroup || isHaveUrlStory || isHaveUrlPost) {
        const JSSelector = await page.$(
          "div.m > div.m > div.fl.ac > div.native-text > span.f3"
        );
        const isExist = await checkExistElementOnScreens(JSSelector);
        if (isExist) {
          await delay(getRandomIntBetween(3000, 5000));
          await JSSelector.evaluate(b => b.click());
        } else {
          await delay(getRandomIntBetween(3000, 5000));
          await navigateToUrl(page, "https://m.facebook.com/notifications/");
        }
        logger("return prev page");
        return true;
      } else {
        const JSSelectors = await page.$$(
          "div.m > div.m > div.native-text > span.f2"
        );
        const isExist = await checkExistElementOnScreens(JSSelectors[2]);
        if (isExist) {
          await delay(getRandomIntBetween(3000, 5000));
          await JSSelectors[2].evaluate(b => b.click());
        } else {
          await delay(getRandomIntBetween(3000, 5000));
          await navigateToUrl(page, "https://m.facebook.com/notifications/");
        }
        logger("return prev page");
        return true;
      }
    } catch (error) {
      logger(error.message);
      return false;
    }
  };
  
  const goToNotificationDetail = async (page) => {
    try {
      //check page live
      const isLive = await checkIsLive(page);
      if (isLive) {
        await delay(getRandomIntBetween(3000, 5000));
        const notiSelectors = await page.$$('div.m > div.m > div.m > img.rounded.gray-border');
        const notiSelectors1 = await page.$$('div.m > div.m > div.m > div.native-text > span.f2');
  
        if (notiSelectors.length > 0) {
          const index = getRandomInt(notiSelectors.length);
          await scrollSmoothIfNotExistOnScreens(notiSelectors[index]);
          await delay(getRandomIntBetween(3000, 5000));
          await notiSelectors[index].evaluate((b) => b.click());
          logger("Da doc thong bao");
          return true;
        } else if (notiSelectors1.length > 0) {
          const index = getRandomInt(notiSelectors1.length);
          await scrollSmoothIfNotExistOnScreens(notiSelectors1[index]);
          await delay(getRandomIntBetween(3000, 5000));
          await notiSelectors1[index].evaluate((b) => b.click());
          logger("Da doc thong bao");
          return true;
        } else {
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
  const clickElementRandom = async (page, element, index, urlPage) => {
    try {
      //check page live
      const isLive = await checkIsLive(page);
      if (isLive) {
        await delay(getRandomIntBetween(3000, 5000));
        const selectors = await page.$$(element);
  
        if (selectors.length > 0) {
          const x = index !== undefined ? index : getRandomInt(selectors.length);
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
  const notiObj = ${strSetting}
  try {
    //check page live
    const isLive = await checkIsLive(page);
    if (isLive) {
      await returnHomePage(page);
      await delay(getRandomIntBetween(3000, 5000));
      const isLogin = await checkLogin(page);
      if (isLogin) {
        let notiCount = 0;
        const numsNoti =
          notiObj.notificationStart < notiObj.notificationEnd
            ? getRandomIntBetween(
                notiObj.notificationStart,
                notiObj.notificationEnd
              )
            : getRandomIntBetween(
                notiObj.notificationEnd,
                notiObj.notificationStart
              );
              const isGoToNoti = await clickElementRandom(
                page,
                'div[data-comp-id="7"]',
                0,
                "https://m.facebook.com/notifications/"
              );
        while (notiCount < numsNoti) {
          // wait time before read noti
          const waitTime =
            notiObj.delayTimeStart < notiObj.delayTimeEnd
              ? getRandomIntBetween(
                  notiObj.delayTimeStart * 1000,
                  notiObj.delayTimeEnd * 1000
                )
              : getRandomIntBetween(
                  notiObj.delayTimeEnd * 1000,
                  notiObj.delayTimeStart * 1000
                );
          await delay(waitTime);

          if (isGoToNoti) {
            const pages = await browser.pages();
            const lengthPage = pages.length;
            logger(lengthPage)
            await delay(getRandomIntBetween(3000, 5000));
            await goToNotificationDetail(page);
            await delay(getRandomIntBetween(10000, 15000));
            // if (notiObj.option === "randomly") {
            // }
            await returnPages(page, browser, lengthPage);
            await delay(getRandomIntBetween(3000, 5000));
            // const isNavigateHome = await clickElementRandom(
            //   page,
            //   'div[data-comp-id="3"]',
            //   0,
            //   "https://m.facebook.com/"
            // );
            // if (!isNavigateHome) {
            //   await navigateToUrl(page, "https://m.facebook.com/");
            // }
            // await delay(getRandomIntBetween(3000, 5000));
          }

          notiCount++;
        }
      } else {
        logger("You need log in");
      }
    }
  } catch (error) {
    logger(error.message);
  }
    `;
};
