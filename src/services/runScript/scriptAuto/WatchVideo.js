export const watchVideo = (setting) => {
  const strSetting = `
      {
        videoStart: ${setting.videoStart},
        videoEnd: ${setting.videoEnd},
        delayTimeStart: ${setting.delayTimeStart},
        delayTimeEnd: ${setting.delayTimeEnd},
        isLike: ${setting.isLiked},
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
  const findBtn = async (page, content, selector) => {
    try {
      const buttons = await page.$$(selector);
      for (let i = 0; i < buttons.length; i++) {
        const btn = await page.evaluate(el => {
          return el.innerHTML;
        }, buttons[i]);
        if (btn.includes(content)) {
          return buttons[i];
        }
      }
    } catch (err) {
      logger(err);
      return false;
    }
  };
  const uploadImg = async (page, watchVideoObj) => {
    try {
      let isHaveComment = false;
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
            isHaveComment = true;
          }
        } else {
          return false;
        }
      } else {
        logger("Runtest: User is not upload success image");
        return;
      }
  
      //cmt text
      if (watchVideoObj.text.length > 0) {
        const elementInput = await checkExistElement(
          page,
          "textarea.textbox.multi-line-floating-textbox",
          3
        );
        const elementInput1 = await checkExistElement(
          page,
          "textarea.internal-input.input-box.native-input",
          3
        );
        if (elementInput == 1) {
          const commentBtn = await page.$(
            "textarea.textbox.multi-line-floating-textbox"
          );
          await delay(getRandomIntBetween(3000, 5000));
          await commentBtn.type(
            watchVideoObj.text[getRandomInt(watchVideoObj.text.length)],
            { delay: 200 }
          );
          await delay(getRandomIntBetween(3000, 5000));
          isHaveComment = true;
        } else if (elementInput1 == 1) {
          const commentBtn1 = await page.$(
            "textarea.internal-input.input-box.native-input"
          );
          await delay(getRandomIntBetween(3000, 5000));
          await commentBtn1.type(
            watchVideoObj.text[getRandomInt(watchVideoObj.text.length)],
            { delay: 200 }
          );
          await delay(getRandomIntBetween(3000, 5000));
          isHaveComment = true;
        }
      }
      //send commnent
      if (isHaveComment) {
        const elementSend = await checkExistElement(
          page,
          "button.textbox-submit-button",
          3
        );
        const sendBtn1 = await findBtn(
          page,
          "󱛅",
          "div.m > div.fl.ac > div.native-text > span.f3"
        );
  
        if (elementSend === 1) {
          const sendBtn = await page.$("button.textbox-submit-button");
          await delay(getRandomIntBetween(3000, 5000));
          await clickElement(sendBtn);
          await delay(getRandomIntBetween(3000, 5000));
          logger("comment complete");
        } else if (sendBtn1) {
          await delay(getRandomIntBetween(3000, 5000));
          await clickElement(sendBtn1);
          logger("comment complete");
        }
      }
      return true;
    } catch (error) {
      logger(error);
      return false;
    }
  };
  
  const clickElementRandom = async (page, element, index, urlPage) => {
    try {
      const selectors = await page.$$(element);
      if (selectors.length > 0) {
        const x = index !== undefined ? index : getRandomInt(selectors.length);
        await scrollSmoothIfNotExistOnScreens(selectors[x]);
        await delay(getRandomIntBetween(3000, 5000));
        await clickElement(selectors[x]);
        return true;
      } else {
        await delay(getRandomIntBetween(3000, 5000));
        const isNavigate = await navigateToUrl(page, urlPage);
        if (isNavigate) return true;
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
          waitUntil: "networkidle2",
        });
        return true;
      } else {
        logger("cant navigate");
        return false;
      }
    } catch (error) {
      logger('Err navigate:' + error.message);
      return false;
    }
  };
  
  const checkExistElementOnScreens0 = async JSSelector => {
    try {
      const isElementVisible = await JSSelector.evaluate(el => {
        const { top, left, bottom, right } = el.getBoundingClientRect();
        return (
          top >= 0 &&
          left >= 0 &&
          bottom <=
            (window.innerHeight || document.documentElement.clientHeight) &&
          right <= (window.innerWidth || document.documentElement.clientWidth)
        );
      });
      return isElementVisible;
    } catch (error) {
      return false;
    }
  };
  
  const goToVideo = async (page, elVideo) => {
    try {
      await scrollSmoothIfElementNotExistOnScreens(page, elVideo);
      await delay(getRandomIntBetween(1000, 3000));
      await clickElement(elVideo);
      await delay(getRandomIntBetween(1000, 3000));
      const isWatchPage = await checkUrlPage(page, "facebook.com/watch/");
      if (isWatchPage) {
        await clickElement(elVideo);
        logger("Click to video");
      }
    } catch (error) {
      logger('Runtest: No access to video');
    }
  };
  
  const scroll = async page => {
    let randomScrollTime = getRandomIntBetween(5, 10);
    try {
      while (randomScrollTime > 0) {
        await page.evaluate(async () => {
          const getRandomIntBetween = (min, max) => {
            return Math.floor(Math.random() * (max - min + 1)) + min;
          };
          const smoothScrollByStep = (targetPosition, duration) => {
            const startPosition = window.scrollY;
            const distance = targetPosition - startPosition;
            let startTime = null;
  
            const animation = currentTime => {
              if (startTime === null) startTime = currentTime;
              const timeElapsed = currentTime - startTime;
              const run = ease(timeElapsed, startPosition, distance, duration);
              window.scrollTo(0, run);
              if (timeElapsed < duration) requestAnimationFrame(animation);
            };
  
            const ease = (t, b, c, d) => {
              t /= d / 2;
              if (t < 1) return (c / 2) * t * t + b;
              t--;
              return (-c / 2) * (t * (t - 2) - 1) + b;
            };
  
            requestAnimationFrame(animation);
          };
          let scrollAmount = getRandomIntBetween(150, 500);
          const targetPosition = window.scrollY + scrollAmount;
          let currentPosition = window.scrollY;
          if (currentPosition < targetPosition) {
            const durationPerStep = getRandomIntBetween(500, 2000);
            const nextPosition = Math.max(
              currentPosition + scrollAmount,
              targetPosition
            );
            smoothScrollByStep(nextPosition, durationPerStep);
            await new Promise(resolve => setTimeout(resolve, durationPerStep));
            currentPosition = nextPosition;
          }
        });
        randomScrollTime--;
      }
      await delay(getRandomIntBetween(1000, 3000));
    } catch (error) {
      logger('Runtest: Error scroll video');
    }
  };
  
  const checkUrlPage = async (page, urlText) => {
    try {
      await delay(getRandomIntBetween(3000, 5000));
      const url = page.url();
      if (url.includes(urlText)) return true;
      return false;
    } catch (error) {
      logger(error.message);
      return false;
    }
  };
  
  const scrollSmoothIfNotExistOnScreens = async JSSelector => {
    try {
      const isExistElementOnScreen = await checkExistElementOnScreens0(JSSelector);
      if (!isExistElementOnScreen) {
        await JSSelector.evaluate(el => {
          el.scrollIntoView({
            behavior: "smooth",
            inline: "nearest",
            block: "center",
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
  
  const scrollSmoothIfElementNotExistOnScreens = async (page, element) => {
    try {
      await page.evaluate(async element => {
        const getRandomIntBetween = (min, max) => {
          return Math.floor(Math.random() * (max - min + 1)) + min;
        };
        const delay = async time => {
          return new Promise(resolve => setTimeout(resolve, time));
        };
        const smoothScrollByStep = async (targetPosition, duration) => {
          const startPosition = window.scrollY;
          const distance = targetPosition - startPosition;
          let startTime = null;
  
          const ease = (t, b, c, d) => {
            t /= d / 2;
            if (t < 1) return (c / 2) * t * t + b;
            t--;
            return (-c / 2) * (t * (t - 2) - 1) + b;
          };
  
          const animation = currentTime => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
          };
  
          requestAnimationFrame(animation);
        };
  
        const isInViewport = elem => {
          const bounding = elem.getBoundingClientRect();
          return (
            bounding.top >= 100 &&
            bounding.left >= 0 &&
            bounding.bottom - bounding.top <=
              (window.innerHeight || document.documentElement.clientHeight) &&
            bounding.right <=
              (window.innerWidth || document.documentElement.clientWidth)
          );
        };
  
        if (element && !isInViewport(element)) {
          const elementRect = element.getBoundingClientRect();
          const viewportHeight =
            window.innerHeight || document.documentElement.clientHeight;
          const targetPosition =
            window.scrollY +
            elementRect.top -
            (elementRect.top > viewportHeight ? viewportHeight : 0);
  
          let currentPosition = window.scrollY;
          while (
            Math.abs(currentPosition - targetPosition) > 0 &&
            !isInViewport(element)
          ) {
            const stepSize =
              getRandomIntBetween(150, 500) *
              (currentPosition > targetPosition ? -1 : 1);
            const durationPerStep = getRandomIntBetween(500, 2000);
            const nextPosition = currentPosition + stepSize;
            await smoothScrollByStep(nextPosition, durationPerStep);
            await delay(getRandomIntBetween(1000, 3000));
            currentPosition = window.scrollY;
          }
  
          await delay(getRandomIntBetween(1000, 3000));
        }
      }, element);
      return true;
    } catch (error) {
      logger(error);
      return false;
    }
  };
  
  let watchVideoObj = ${strSetting}
  try {
    //check page live
    const isLive = await checkIsLive(page);
    if (isLive) {
      await returnHomePage(page);
      await delay(getRandomIntBetween(1000, 3000));

      watchVideoObj = await checkObject(watchVideoObj);
      let countVideo = 0;
      let countLike = 0;
      let countShare = 0;
      let countComment = 0;

      const numsVideo = getRandomIntBetween(
        watchVideoObj.videoStart,
        watchVideoObj.videoEnd
      );
      const numsLike = getRandomIntBetween(
        watchVideoObj.likeStart,
        watchVideoObj.likeEnd
      );
      const numsShare = getRandomIntBetween(
        watchVideoObj.shareStart,
        watchVideoObj.shareEnd
      );
      const numsComment = getRandomIntBetween(
        watchVideoObj.commentStart,
        watchVideoObj.commentEnd
      );
      //navigate video page
      await delay(getRandomIntBetween(1000, 3000));
      await clickElementRandom(
        page,
        'div[data-comp-id="6"]',
        0,
        "https://www.facebook.com/watch/"
      );

      const languageBtn = await findBtn(
        page,
        "English (US)",
        "div.m > div.fl.ac > div.native-text"
      );
      const languageBtn1 = await findBtn(
        page,
        "󰠂",
        "div.m > div.fl.ac > div.native-text"
      );
      const cfLanguageEle1 = await page.$(
        "div.m > div.fl.ac > div.native-text > span.f2"
      );
      const cfLanguageEle = await findBtn(
        page,
        "Confirm languages",
        "div.m > div.fl.ac > div.native-text > span.f2"
      );
      if (languageBtn && cfLanguageEle) {
        await clickElement(languageBtn);
        await delay(getRandomIntBetween(3000, 5000));
        if (cfLanguageEle) {
          await clickElement(cfLanguageEle);
        } else {
          await clickElementRandom(
            page,
            cfLanguageEle1,
            5,
            "https://m.facebook.com/watch/"
          );
        }
      } else if (languageBtn1 && cfLanguageEle) {
        await clickElement(languageBtn1);
        await delay(getRandomIntBetween(3000, 5000));
        if (cfLanguageEle) {
          await clickElement(cfLanguageEle);
        } else {
          await clickElementRandom(
            page,
            cfLanguageEle1,
            5,
            "https://m.facebook.com/watch/"
          );
        }
      }
      await delay(getRandomIntBetween(3000, 5000));
      await scroll(page);
      while (
        countVideo < numsVideo &&
        countLike < numsVideo &&
        countShare < numsVideo &&
        countComment < numsVideo
      ) {
        await scroll(page);
        await delay(getRandomIntBetween(3000, 5000));
        // const playElement = await page.$$(
        //   '[class="spinner animated inline-video-spinner hidden"]'
        // );
        const playVideoElement = await page.$$("div.inline-video-container");
        if (playVideoElement.length > 0) {
          const index = getRandomIntBetween(3, playVideoElement.length);
          await goToVideo(page, playVideoElement[index]);
          const timeViewVideo = getRandomIntBetween(
            watchVideoObj.delayTimeStart * 1000,
            watchVideoObj.delayTimeEnd * 1000
          );
          await delay(timeViewVideo);
          logger("Done view video");

          //like video
          if (watchVideoObj.isLike) {
            try {
              if (countLike <= numsLike && getRandomIntBetween(0, 2) == 1) {
                await delay(getRandomIntBetween(3000, 5000));
                const likeBtn = await findBtn(page, "󰍸", "button.native-text");
                if (likeBtn) {
                  await scrollSmoothIfNotExistOnScreens(likeBtn);
                  await delay(getRandomIntBetween(3000, 5000));
                  await clickElement(likeBtn);
                  countLike++;
                  logger("Done like video");
                } else {
                  logger("Runtest: No can find like button");
                  return;
                }
              }
            } catch (err) {
              logger("Runtest: No can find like button");
              return;
            }
          }
          //comment video
          if (watchVideoObj.isComment) {
            try {
              if (countComment <= numsComment && watchVideoObj.option == "all") {
                if (getRandomIntBetween(0, 2) == 1) {          
                  const button = await findBtn(
                    page,
                    "󰍹",
                    'span[style="color:#ffffff;"]'
                  );
                  await scrollSmoothIfNotExistOnScreens(button);
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
                countComment <= numsComment &&
                watchVideoObj.option == "text"
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
                  await scrollSmoothIfNotExistOnScreens(button);
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
                  logger("Done comment video");
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
            } catch (err) {
              logger("Runtest: No can find comment button");
              return;
            }
          }
          //share video
          if (watchVideoObj.isShare) {
            try {
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
                  logger("Done share video");
                } else {
                  const postBtn = await page.$(
                    "div.fl.ac.am > button.native-text > span.f2"
                  );
                  await clickElement(postBtn);
                  logger("share complete");
                }
                countShare++;
              }
            } catch (err) {
              logger("Runtest: No can find share button");
              return;
            }
          }
          //return watch
          await delay(getRandomIntBetween(3000, 5000));
          await clickElementRandom(
            page,
            "div.m > div.fl.ac > div.native-text > span.f3",
            0
          );
          await delay(getRandomIntBetween(3000, 5000));
          countVideo++;
        }
      }
      logger("Complete watch video");
    }
  } catch (error) {
    logger('Runtest: ' + error.message);
    return;
  }
    `;
};
