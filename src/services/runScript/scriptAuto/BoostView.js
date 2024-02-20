export const boostView = (setting) => {
  const strSetting = `{
        viewTimeEnd: ${setting.viewTimeEnd},
        viewTimeStart: ${setting.viewTimeStart},
        videoID: ${JSON.stringify(setting.videoID)},
      }`;
  console.log(setting);
  return `
  const getPostID = async (page, boostObj) => {
    try {
      for (let i = 0; i < boostObj.videoID.length; i++) {
        const [id, fbid] = boostObj.videoID[i].split("|");
        const url = 'https://m.facebook.com/story.php/?id='+id+'&story_fbid='+fbid;
        await navigateToUrl(page, url);
        await delay(getRandomIntBetween(3000, 5000));
        await viewPost(page, boostObj);
        await delay(getRandomIntBetween(3000, 5000));
      }
    } catch (error) {
      logger(error.message);
    }
  };
  
  const viewPost = async (page, boostObj) => {
    try {
      const timeViewPost = getRandomIntBetween(
        boostObj.viewTimeStart * 1000,
        boostObj.viewTimeEnd * 1000
      );
      const element1 = await checkExistElement(
        page,
        "div.inline-video-icon.play.hidden",
        3
      );
      logger(element1);
      if (element1 === 0) {
        const elementBtn = await page.$("div.inline-video-icon.play");
        await delay(3000);
        await scrollSmoothIfNotExistOnScreens(elementBtn);
        await delay(getRandomIntBetween(3000, 5000));
        await clickElement(elementBtn);
        await delay(getRandomIntBetween(3000, 5000));
        await delay(timeViewPost);
        logger("Done view video");
      } else {
        await delay(getRandomIntBetween(3000, 5000));
        const elementBtn = await page.$("div.inline-video-container");
        await delay(3000);
        await scrollSmoothIfNotExistOnScreens(elementBtn);
        await delay(timeViewPost);
        logger("Done view video");
      }
    } catch (error) {
      logger(error.message);
    }
  };
  
  const checkExistElementOnScreens = async JSSelector => {
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
      } else {
        logger("cant navigate");
      }
    } catch (error) {
      logger('Error navigating to URL:', error.message);
    }
  };
  
  const scrollSmoothIfNotExistOnScreens = async JSSelector => {
    try {
      const isExistElementOnScreen = await checkExistElementOnScreens(JSSelector);
      if (!isExistElementOnScreen) {
        await JSSelector.evaluate(el => {
          el.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "nearest",
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
  
    let boostObj = ${strSetting}
    try {
      const isLive = checkIsLive(page);
      if (isLive) {
        await returnHomePage(page);
        await delay(getRandomIntBetween(3000, 5000));
        // const login = await checkLogin(page, "https://m.facebook.com/");
        // if (login.isLogin) {
          boostObj = await checkObject(boostObj);
          if (boostObj.videoID.length > 0) {
            await getPostID(page, boostObj);
          }
        // }
      }
    } catch (error) {
      logger(error.message);
    }
      `;
};
