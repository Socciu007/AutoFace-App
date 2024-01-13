export const viewNoti = (setting) => {
  const strSetting = `{
      numsNotiStart: ${setting.notificationStart},
      numsNotiEnd: ${setting.notificationEnd},
      waitTimeStart: ${setting.waitTimeStart},
      waitTimeEnd: ${setting.waitTimeEnd},
      viewOptions: ${JSON.stringify(setting.option)},
    }`;
  return `
  const scrollSmoothIfNotExistOnScreen = async (JSSelector) => {
    try {
      const isExistElementOnScreen = await checkExistElementOnScreen(JSSelector);
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
      await delay(getRandomIntBetween(5000, 10000));
      const url = page.url();
      if (url.includes(urlText)) return true;
      return false;
    } catch (error) {
      logger(error.message);
      return false;
    }
  };
  const checkExistElementOnScreen = async (JSSelector) => {
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
  const returnPage = async (browser, page) => {
    try {
      const allPages = await browser.pages();
      const isHaveUrlGroup = await checkUrlPage(page, 'm.facebook.com/groups');
      const isHaveUrlStory = await checkUrlPage(page, 'm.facebook.com/story');
      const isHaveUrlPost = await checkUrlPage(page, '/posts');
      if (allPages.length >= 3) {
        await allPages[2].close();
      } else if (isHaveUrlGroup || isHaveUrlStory || isHaveUrlPost) {
        const JSSelector = await page.$('div.m > div.m > div.fl.ac > div.native-text > span.f3');
        const isExist = await checkExistElementOnScreen(JSSelector);
        if (isExist) {
          await delay(getRandomIntBetween(3000, 5000));
          await JSSelector.evaluate((b) => b.click());
        } else {
          await delay(getRandomIntBetween(3000, 5000));
          await navigateToUrl(page, 'https://m.facebook.com/notifications/');
        }
        logger('click2');
        return true;
      } else {
        const JSSelectors = await page.$$('div.m > div.m > div.native-text > span.f2');
        const isExist = await checkExistElementOnScreen(JSSelectors[2]);
        if (isExist) {
          await delay(getRandomIntBetween(3000, 5000));
          await JSSelectors[2].evaluate((b) => b.click());
        } else {
          await delay(getRandomIntBetween(3000, 5000));
          await navigateToUrl(page, 'https://m.facebook.com/notifications/');
        }
        logger('click2');
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
        // const element0 = await page.$$(
        //   "div.m > div.m > div.m > img.img.contain.rounded.gray-border"
        // );
        const notiSelectors = await page.$$('div.m > div.m > div.m > img.rounded.gray-border');
        const notiSelectors1 = await page.$$('div.m > div.m > div.m > div.native-text > span.f2');
  
        if (notiSelectors.length > 0) {
          const index = getRandomInt(notiSelectors.length);
          await scrollSmoothIfNotExistOnScreen(notiSelectors[index]);
          await delay(getRandomIntBetween(3000, 5000));
          await notiSelectors[index].evaluate((b) => b.click());
          return true;
        } else if (notiSelectors1.length > 0) {
          const index = getRandomInt(notiSelectors1.length);
          await scrollSmoothIfNotExistOnScreen(notiSelectors1[index]);
          await delay(getRandomIntBetween(3000, 5000));
          await notiSelectors1[index].evaluate((b) => b.click());
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
          const x = index ? index : getRandomInt(selectors.length);
          await scrollSmoothIfNotExistOnScreen(selectors[x]);
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
      await delay(getRandomIntBetween(3000, 5000));

      let notiCount = 0;
      const numsNoti =
        notiObj.numsNotiStart < notiObj.numsNotiEnd
          ? getRandomIntBetween(notiObj.numsNotiStart, notiObj.numsNotiEnd)
          : getRandomIntBetween(notiObj.numsNotiEnd, notiObj.numsNotiStart);
      while (notiCount < numsNoti) {
        // wait time before read noti
        const waitTime =
          notiObj.waitTimeStart < notiObj.waitTimeEnd
            ? getRandomIntBetween(notiObj.waitTimeStart * 1000, notiObj.waitTimeEnd * 1000)
            : getRandomIntBetween(notiObj.waitTimeEnd * 1000, notiObj.waitTimeStart * 1000);
        await delay(waitTime);

        const isGoToNoti = await clickElementRandom(
          page,
          'div[data-comp-id="7"]',
          0,
          'https://m.facebook.com/notifications/',
        );
        if (isGoToNoti) {
          await delay(getRandomIntBetween(3000, 5000));
          await goToNotificationDetail(page);
          await delay(getRandomIntBetween(10000, 15000));
          await returnPage(browser, page);
          await delay(getRandomIntBetween(3000, 5000));
          const isNavigateHome = await clickElementRandom(page, 'div[data-comp-id="3"]', 0, 'https://m.facebook.com/');
          if (!isNavigateHome) {
            await navigateToUrl(page, 'https://m.facebook.com/');
          }
          await delay(getRandomIntBetween(3000, 5000));
        }

        notiCount++;
      }
    } else {
      logger('You need log in');
    }
  } catch (error) {
    logger(error.message);
  }
    `;
};
