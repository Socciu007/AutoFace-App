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
  const uploadImg = async (page, CreatePost) => {
    try {
      const numberPhoto =
        getRandomIntBetween(CreatePost.photoStart, CreatePost.photoEnd) > CreatePost.photos.length
          ? CreatePost.photos.length
          : getRandomIntBetween(CreatePost.photoStart, CreatePost.photoEnd);
      if (numberPhoto < 3 && numberPhoto > 0 && CreatePost.photos.length > 0) {
        const upload = await findBtn(page, '󰘋', '');
        if (upload) {
          CreatePost.photos.length = numberPhoto;
          if (upload) {
            const [fileChooser] = await Promise.all([page.waitForFileChooser(), await clickElement(upload)]);
            await delay(3000);
            // Accept multiple files
            await fileChooser.accept(CreatePost.photos);
            await delay(6000);
          } else {
            return false;
          }
        } else {
          logger("Can't find click photo btn");
          return false;
        }
      } else {
        logger('So anh random khong hop le');
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
      await delay(getRandomIntBetween(3000, 5000));
      const isLogin = await checkLogin(page);
      // if (isLogin) {
      let countVideo = 0;
      let countLike = 0;
      let countShare = 0;
      let countComment = 0;

      const numsVideo =
        watchVideoObj.videoStart < watchVideoObj.videoEnd
          ? getRandomIntBetween(watchVideoObj.videoStart, watchVideoObj.videoEnd)
          : getRandomIntBetween(watchVideoObj.videoEnd, watchVideoObj.videoStart);
      const numsLike =
        watchVideoObj.likeStart < watchVideoObj.likeEnd
          ? getRandomIntBetween(watchVideoObj.likeStart, watchVideoObj.likeEnd)
          : getRandomIntBetween(watchVideoObj.likeEnd, watchVideoObj.likeStart);
      const numsShare =
        watchVideoObj.shareStart < watchVideoObj.shareEnd
          ? getRandomIntBetween(watchVideoObj.shareStart, watchVideoObj.shareEnd)
          : getRandomIntBetween(watchVideoObj.shareEnd, watchVideoObj.shareStart);
      const numsComment =
        watchVideoObj.commentStart < watchVideoObj.commentEnd
          ? getRandomIntBetween(watchVideoObj.commentStart, watchVideoObj.commentEnd)
          : getRandomIntBetween(watchVideoObj.commentEnd, watchVideoObj.commentStart);
      //navigate video page
      await delay(getRandomIntBetween(3000, 5000));
      await clickElementRandom(page, 'div[data-comp-id="6"]', 0, 'https://www.facebook.com/watch/');

      while (countVideo < numsVideo && countLike < numsVideo && countShare < numsVideo && countComment < numsVideo) {
        await delay(getRandomIntBetween(3000, 5000));
        const currentTime = new Date();
        let scrollTime = new Date();
        while (scrollTime - currentTime < getRandomIntBetween(15000, 20000)) {
          await page.mouse.wheel({ deltaY: getRandomIntBetween(300, 800) });
          await delay(getRandomIntBetween(3000, 5000));
          scrollTime = new Date();
        }

        const playElement = await page.$$('div.m > div.inline-video-container');
        const index = getRandomIntBetween(3, playElement.length);
        await clickElementRandom(page, 'div.m > div.inline-video-container', index);

        const timeViewVideo =
          watchVideoObj.delayTimeStart < watchVideoObj.delayTimeEnd
            ? getRandomIntBetween(watchVideoObj.delayTimeStart * 1000, watchVideoObj.delayTimeEnd * 1000)
            : getRandomIntBetween(watchVideoObj.delayTimeEnd * 1000, watchVideoObj.delayTimeStart * 1000);
        await delay(timeViewVideo);

        const isWatchPage = await checkUrlPage(page, 'm.facebook.com/watch/');
        if (isWatchPage) {
          await delay(getRandomIntBetween(3000, 5000));
          const likeBtn = await findBtn(page, '󰍸', 'div.fl.ac.am > button.native-text > span');
          await likeBtn.evaluate((b) => b.click());
          //div.fl.ac.am > button.native-text > span
          countVideo++;
        } else {
          //like video
          if (watchVideoObj.isLike) {
            if (countLike <= numsLike && getRandomIntBetween(0, 2) == 1) {
              await delay(getRandomIntBetween(3000, 5000));
              const button = await findBtn(page, '󰍸', 'button.native-text');
              await scrollSmoothIfNotExistOnScreens(button);
              await delay(getRandomIntBetween(3000, 5000));
              await button.evaluate((b) => b.click());
              countLike++;
              logger('like complete');
            }
          }
          //comment video
          if (watchVideoObj.isComment) {
            if (countComment <= numsComment && watchVideoObj.text.length > 0) {
              if (getRandomIntBetween(0, 2) == 1) {
                const button = await findBtn(page, '󰍹', 'span[style="color:#ffffff;"]');
                await scrollSmoothIfNotExistOnScreens(button);
                await delay(getRandomIntBetween(3000, 5000));
                await button.evaluate((b) => b.click());
                await delay(getRandomIntBetween(3000, 5000));
                await page.type(
                  'div.m.mentions-text > textarea.internal-input.input-box.native-input',
                  watchVideoObj.text[getRandomInt(watchVideoObj.text.length)],
                );
                await delay(getRandomIntBetween(3000, 5000));
                const sendBtn = await findBtn(page, '󱛅', 'div.m > div.fl.ac > div.native-text > span.f3');
                await delay(getRandomIntBetween(3000, 5000));
                await sendBtn.evaluate((b) => b.click());
                logger('comment complete');
                //return page
                await delay(getRandomIntBetween(3000, 5000));
                const returnBtn = await findBtn(page, '󰟙', 'div.m > div.fl.ac > div.native-text > span.f3');
                await delay(getRandomIntBetween(3000, 5000));
                await returnBtn.evaluate((b) => b.click());
                countComment++;
                logger('return page');
              }
            } else if (countComment <= numsComment && watchVideoObj.photos.length > 0) {
              await uploadImg(page, watchVideoObj);
              await delay(getRandomIntBetween(3000, 5000));
              await clickElement('div.m.nb > div.m.bg-s17 > div.m > div.native-text');
              await delay(getRandomIntBetween(15000, 30000));
              await clickElement('button.textbox-submit-button');
              logger('comment complete');
              //return page
              await delay(getRandomIntBetween(3000, 5000));
              const returnBtn = await findBtn(page, '󰟙', 'div.m > div.fl.ac > div.native-text > span.f3');
              await delay(getRandomIntBetween(3000, 5000));
              await returnBtn.evaluate((b) => b.click());
              countComment++;
              logger('return page');
            }
          }
          //share video
          if (watchVideoObj.isShare) {
            if (countShare <= numsShare && getRandomIntBetween(0, 2) == 1) {
              const button = await findBtn(page, '󰍺', 'span[style="color:#ffffff;"]');
              await delay(getRandomIntBetween(3000, 5000));
              await button.evaluate((b) => b.click());
              await delay(getRandomIntBetween(3000, 5000));
              const shareBtn = await findBtn(page, '󱘣', 'div.m > div.fl.ac > div.native-text > span.f3');
              await delay(getRandomIntBetween(3000, 5000));
              await shareBtn.evaluate((b) => b.click());
              await delay(getRandomIntBetween(3000, 5000));
              const isCheckClick = await checkExistElementOnScreens(
                'div.m > div.fl.ar.am > button.native-text.rtl > span.f2',
              );
              if (isCheckClick) {
                await clickElementRandom(page, 'div.m > div.fl.ar.am > button.native-text.rtl > span.f2');
              } else {
                await clickElementRandom(page, 'div.fl.ac.am > button.native-text > span.f2');
              }
            }
          }
          //return watch page
          await delay(getRandomIntBetween(3000, 5000));
          await clickElementRandom(page, 'div.m > div.fl.ac > div.native-text > span.f3');
          await delay(getRandomIntBetween(3000, 5000));
          countVideo++;
        }
      }
      // } else {
      //   logger("You need log in");
      //   return;
      // }
    }
  } catch (error) {
    logger(error.message);
    return false;
  }
    `;
};
