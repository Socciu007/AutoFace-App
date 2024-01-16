export const watchStory = (setting) => {
  const strSetting = `
    {
      numsStoryStart: ${setting.numsStoryStart},
      numsStoryEnd: ${setting.numberStoryEnd},
      timeViewStoryStart: ${setting.delayTimeStart},
      timeViewStoryEnd: ${setting.delayTimeEnd},
      isReact: ${JSON.stringify(setting.isReact)},
      isComment:${JSON.stringify(setting.isComment)},
      isLike: false,
      isLove: false,
      isWow: false,
      isHaha: false,
      isCare: false,
      isSad: false,
      isAngry: false,
      text: ${JSON.stringify(setting.text)}

    }`;
  console.log(strSetting);
  return `
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
      logger('Error navigating to URL:'+error.message);
    }
  };
  const goToNotificationDetail = async (page) => {
    try {
      //check page live
      const isLive = await checkIsLive(page);
      if (isLive) {
        await delay(getRandomIntBetween(3000, 5000));
        const storySelectors = await page.$$('div.m.hscroller.no-hscroller > div.m.bg-s3 > div.m > div.m.bg-s3');
        const notiSelectors1 = await page.$$('div.m > div.m > div.m > div.native-text > span.f2');
  
        if (storySelectors.length > 0) {
          const index = getRandomInt(storySelectors.length);
          await scrollSmoothIfNotExistOnScreens(storySelectors[index]);
          await delay(getRandomIntBetween(3000, 5000));
          await storySelectors[index].evaluate((b) => b.click());
          return true;
        } else if (notiSelectors1.length > 0) {
          const index = getRandomInt(notiSelectors1.length);
          await scrollSmoothIfNotExistOnScreens(notiSelectors1[index]);
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
        } else if (urlPage) {
          await delay(getRandomIntBetween(3000, 5000));
          const isNavigate = await navigateToUrl(page, urlPage);
          return isNavigate;
        }
        return false;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  };
  const watchStoryObj = ${strSetting};
  try {
    //check page live
    const isLive = await checkIsLive(page);
    if (isLive) {
      await returnHomePage(page);
      await delay(getRandomIntBetween(3000, 5000));
   
      let countStory = 0;
      const numsStory =
        watchStoryObj.numsStoryStart < watchStoryObj.numsStoryEnd
          ? getRandomIntBetween(watchStoryObj.numsStoryStart, watchStoryObj.numsStoryEnd)
          : getRandomIntBetween(watchStoryObj.numsStoryEnd, watchStoryObj.numsStoryStart);
      while (countStory < numsStory) {
        await delay(getRandomIntBetween(10000, 15000));
        await goToNotificationDetail(page);
        const isPlayBtn = await checkExistElementOnScreens('div.inline-video-icon.play');
        if (isPlayBtn) {
          await clickElementRandom(page, 'div.inline-video-icon.play', 0);
        } else {
          logger('Play button is not exist');
        }
        const timeViewStory =
          watchStoryObj.timeViewStoryStart < watchStoryObj.timeViewStoryEnd
            ? getRandomIntBetween(watchStoryObj.timeViewStoryStart * 1000, watchStoryObj.timeViewStoryEnd * 1000)
            : getRandomIntBetween(watchStoryObj.timeViewStoryEnd * 1000, watchStoryObj.timeViewStoryStart * 1000);
        await delay(timeViewStory);
        logger('Time view story', timeViewStory);
        //click react random
        if (watchStoryObj.isReact > 0 && watchStoryObj.text.length > 0) {
          await delay(getRandomIntBetween(3000, 5000));
          const isClickReact = await clickElementRandom(page, 'div.m.hscroller.no-hscroller > div.m > img.img.contain');
          if (isClickReact) {
            logger('Da like');
          } else {
            logger('Like button is not exist');
          }
          await delay(getRandomIntBetween(3000, 5000));
          const isClickComment = await clickElementRandom(
            page,
            'div.m.hscroller.no-hscroller > div.m.nb > div.m.bg-s1 > div.m > div.native-text',
            0,
          );
          await delay(5000);
          if (isClickComment) {
            const indexText = getRandomInt(watchStoryObj.text.length);
            const inputClick = await page.$('textarea.textbox.multi-line-floating-textbox');
            const isCheckInput = await checkExistElementOnScreens(inputClick);
            if (isCheckInput) {
              await page.type('textarea.textbox.multi-line-floating-textbox', watchStoryObj.text[indexText],{delay:200});
              const clickCmt = await page.$('button.textbox-submit-button');
              if (clickCmt) {
                await clickElement(clickCmt);
                logger('Da comment');
              }
            }
          } else {
            logger('Comment button is not exist');
          }
        } else if (watchStoryObj.isReact > 0) {
          await delay(getRandomIntBetween(3000, 5000));
          // "love", "like", "haha", "Care", "Wow", "Sad", "Angry"
          const isClick = await clickElementRandom(page, 'div.m.hscroller.no-hscroller > div.m > img.img.contain');
          if (!isClick) {
            //return home
            await delay(getRandomIntBetween(3000, 5000));
            await clickElementRandom(page, 'div.m > div.m > div.native-text > span.f2', 2, 'https://m.facebook.com/');
            countStory++;
            return;
          }
          logger('Da like');
        } else if (watchStoryObj.text.length > 0) {
          const isClickComment = await clickElementRandom(
            page,
            'div.m.hscroller.no-hscroller > div.m.nb > div.m.bg-s1 > div.m > div.native-text',
            0,
          );
          if (isClickComment) {
            const indexText = getRandomInt(watchStoryObj.text.length.length);
            const inputClick = await page.$('textarea.textbox.multi-line-floating-textbox');
            const isCheckInput = await checkExistElementOnScreens(inputClick);
            if (isCheckInput) {
              await page.type('textarea.textbox.multi-line-floating-textbox', watchStoryObj.text[indexText]);
              const clickCmt = await page.$('button.textbox-submit-button');
              if (clickCmt) {
                await clickElement(clickCmt);
                logger('Da comment');
              }
            }
          } else {
            logger('Comment button is not exist');
          }
        }
        //return home
        await delay(getRandomIntBetween(3000, 5000));
        const button = await findBtn(page, '󰤳', 'div.m > div.m > div.native-text > span.f2');
        if (button) {
          await button.evaluate((b) => b.click());
        } else {
          await clickElementRandom(page, 'div.m > div.m > div.native-text > span.f2', 2, 'https://m.facebook.com/');
        }
        countStory++;
      }
      
    }
  } catch (error) {
    logger(error.message);
    return false;
  }
  `;
};
