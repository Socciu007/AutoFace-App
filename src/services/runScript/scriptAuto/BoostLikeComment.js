export const boostLikeComment = (setting) => {
  const strSetting = `{
    viewTimeStart: ${setting.viewTimeStart},
    viewTimeEnd: ${setting.viewTimeEnd},
    delayTimeStart: ${setting.delayTimeStart},
    delayTimeEnd: ${setting.delayTimeEnd},
    isLike: ${setting.isLike},
    likeStart: ${setting.likeStart},
    likeEnd: ${setting.likeEnd},
    isShare: ${setting.isShare},
    shareToFeedStart: ${setting.shareToFeedStart},
    shareToFeedEnd: ${setting.shareToFeedEnd},
    postQuantityStart: ${setting.postQuantityStart},
    postQuantityEnd: ${setting.postQuantityEnd},
    postID: ${JSON.stringify(setting.postID)},
    isComment: ${setting.isComment},
    commentStart: ${setting.commentStart},
    commentEnd: ${setting.commentEnd},
    photoVideoQuantityStart: ${setting.photoVideoQuantityStart},
    photoVideoQuantityEnd: ${setting.photoVideoQuantityEnd},
    file: ${JSON.stringify(setting.file)},
    isTag: ${setting.isTag},
    tagFriendStart: ${setting.tagFriendStart},
    tagFriendEnd: ${setting.tagFriendEnd},
    textComment: ${JSON.stringify(setting.textComment)},
  }`;
  console.log('strSetting', strSetting);
  return `
  
  const getPostID = async (page, boostObj) => {
    try {
      const numsLike = getRandomIntBetween(boostObj.likeStart, boostObj.likeEnd);
      const numsShare = getRandomIntBetween(
        boostObj.shareToFeedStart,
        boostObj.shareToFeedEnd
      );
      const numsComment = getRandomIntBetween(
        boostObj.commentStart,
        boostObj.commentEnd
      );
      const numsTag = getRandomIntBetween(
        boostObj.tagFriendStart,
        boostObj.tagFriendEnd
      );
      const numsPostPerID = getRandomIntBetween(
        boostObj.postQuantityStart,
        boostObj.postQuantityEnd
      );
      let countLike = 0;
      let countShare = 0;
      let countComment = 0;
      let arrID = [];
      for (let i = 0; i < boostObj.postID.length; i++) {
        const [id, fbid] = boostObj.postID[i].split("|");
        const isDuplicate = await checkDuplicate(arrID, id, numsPostPerID);
        const findID = await arrID.find(ID => ID == id);
      if (!findID) {
        countLike = 0;
        countShare = 0;
        countComment = 0;
      }
        if (!isDuplicate) {
          const urlPost = 'https://m.facebook.com/story.php/?id='+id+'&story_fbid='+fbid;
          await navigateToUrl(page, urlPost);
          await delay(getRandomIntBetween(3000, 5000));
          await viewPost(page, boostObj, urlPost);
          await delay(getRandomIntBetween(3000, 5000));
          countLike = await likePost(page, boostObj, countLike, numsLike);
          console.log("count", countLike);
          await delay(getRandomIntBetween(3000, 5000));
          countComment = await commentPost(
            page,
            boostObj,
            countComment,
            numsComment,
            numsTag
          );
          await delay(getRandomIntBetween(3000, 5000));
          countShare = await sharePost(page, boostObj, countShare, numsShare);
          console.log("countShare", countShare);
          await delay(getRandomIntBetween(3000, 5000));
          arrID.push(id);
        } else {
          countComment = 0;
          countLike = 0;
          countShare = 0;
          console.log("Exceeds posts per uid, go to new uid");
          continue;
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

const viewPost = async (page, boostObj, urlPost) => {
  try {
    const timeViewPost = getRandomIntBetween(
      boostObj.viewTimeStart * 1000,
      boostObj.viewTimeEnd * 1000
    );
    const element = await checkExistElement(
      page,
      "div.m > div.m > div.m.dtf",
      3
    );
    if (element === 1) {
      const elementBtn = await page.$("div.m > div.m > div.m.dtf");
      await delay(getRandomIntBetween(3000, 5000));
      await clickElement(elementBtn);
      await delay(getRandomIntBetween(3000, 5000));
      await delay(timeViewPost);
      await navigateToUrl(page, urlPost);
      logger("Done view post");
    } else {
      await delay(timeViewPost);
      logger("Done view post");
    }
  } catch (error) {
    logger(error.message);
  }
};

const likePost = async (page, boostObj, countLike, numsLike) => {
  try {
    if (boostObj.isLike && countLike !== undefined && countLike <= numsLike) {
      const likeBtn = await findBtn(
        page,
        "󰍸",
        "div.fl.ac.am > button.native-text > span"
      );
      if (likeBtn) {
        await clickElement(likeBtn);
        logger("Done like post");
        return ++countLike;
      } else {
        logger("Liked post");
        return countLike;
      }
    } else {
      logger("Liked enough posts");
    }
  } catch (error) {
    logger(error.message);
  }
};

const commentPost = async (
  page,
  boostObj,
  countComment,
  numsComment,
  numsTag
) => {
  try {
    let countTag = 0;
    if (
      boostObj.isComment &&
      boostObj.file.length > 0 &&
      countComment !== undefined &&
      countComment <= numsComment
    ) {
      await uploadImg(page, boostObj);
      return ++countComment;
    } else if (
      boostObj.isComment &&
      boostObj.textComment.length > 0 &&
      countComment !== undefined &&
      countComment <= numsComment
    ) {
      const element = await checkExistElement(
        page,
        "textarea.internal-input.input-box.native-input",
        3
      );
      if (element === 1) {
        while (countTag < numsTag) {
          const randomLetter = await getRandomLetter();
          const tag = '@'+randomLetter
          await page.type(
            "textarea.internal-input.input-box.native-input",
            tag
          );
          await delay(getRandomIntBetween(3000, 5000));
          const listTag1 = await page.$$(
            "div.mentions-suggestion-row native-text"
          );
          const listTag = await page.$$('div[data-testid="tag_name"]');
          await delay(getRandomIntBetween(3000, 5000));
          if (listTag.length > 0) {
            const elementTag = await listTag[getRandomInt(listTag.length)];
            await scrollSmoothIfNotExistOnScreens(elementTag);
            await delay(getRandomIntBetween(3000, 5000));
            await clickElement(elementTag);
            await delay(getRandomIntBetween(3000, 5000));
          } else if (listTag1.length) {
            const elementTag = await listTag1[getRandomInt(listTag1.length)];
            await scrollSmoothIfNotExistOnScreens(elementTag);
            await delay(getRandomIntBetween(3000, 5000));
            await clickElement(elementTag);
            await delay(getRandomIntBetween(3000, 5000));
          }
          logger("Done tag friend");
          countTag++;
        }
        const commentBtn = await page.$(
          "textarea.internal-input.input-box.native-input"
        );
        await delay(getRandomIntBetween(3000, 5000));
        await commentBtn.type(
          boostObj.textComment[getRandomInt(boostObj.textComment.length)],
          { delay: 200 }
        );
        await delay(getRandomIntBetween(3000, 5000));
        const sendBtn = await findBtn(
          page,
          "󱛅",
          "div.fl.ac > div.native-text > span.f3"
        );
        if (sendBtn) {
          await clickElement(sendBtn);
          await delay(getRandomIntBetween(3000, 5000));
          logger("Done comment post");
          return ++countComment;
        }
      }
    } else {
      logger("No comment content or enough comment");
    }
  } catch (error) {
    logger(error.message);
  }
};

const sharePost = async (page, boostObj, countShare, numsShare) => {
  try {
    if (
      boostObj.isShare &&
      countShare !== undefined &&
      countShare <= numsShare
    ) {
      const shareBtn = await findBtn(
        page,
        "󰍺",
        "div.fl.ac.am > button.native-text > span"
      );
      await delay(getRandomIntBetween(3000, 5000));
      if (shareBtn) {
        await shareBtn.evaluate((b) => b.click());
        //click type of share
        await delay(getRandomIntBetween(3000, 5000));
        const typeShareBtn = await findBtn(
          page,
          "󱤱",
          "div.m > div.fl.ac > div.native-text"
        );
        await delay(getRandomIntBetween(3000, 5000));
        await clickElement(typeShareBtn);
        await delay(getRandomIntBetween(3000, 5000));
        //click share post
        const isCheckClick = await checkExistElement(
          page,
          "div.m > div.fl.ar.am > button.native-text.rtl > span.f2",
          3
        );
        await delay(getRandomIntBetween(3000, 5000));
        if (isCheckClick === 1) {
          const postBtn = await page.$(
            "div.m > div.fl.ar.am > button.native-text.rtl > span.f2"
          );
          await delay(getRandomIntBetween(3000, 5000));
          await clickElement(postBtn);
          await delay(getRandomIntBetween(3000, 5000));
          logger("Done share post");
        } else {
          const postBtn = await page.$(
            "div.fl.ac.am > button.native-text > span.f2"
          );
          await delay(getRandomIntBetween(3000, 5000));
          await clickElement(postBtn);
          await delay(getRandomIntBetween(3000, 5000));
          logger("Done share post");
        }
        return ++countShare;
      }
    } else {
      logger("shared enough posts");
    }
  } catch (error) {
    logger(error.message);
  }
};

const findBtn = async (page, content, selector) => {
  try {
    const buttons = await getElements(page, selector);
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
  }
};

const uploadImg = async (page, boostObj) => {
  try {
    const numberPhoto =
      getRandomIntBetween(
        boostObj.photoVideoQuantityStart,
        boostObj.photoVideoQuantityEnd
      ) > boostObj.file.length
        ? boostObj.file.length
        : getRandomIntBetween(
            boostObj.photoVideoQuantityStart,
            boostObj.photoVideoQuantityEnd
          );
    if (numberPhoto > 0 && boostObj.file.length > 0) {
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
          boostObj.file[getRandomInt(boostObj.file.length)],
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
        if (boostObj.textComment.length > 0) {
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
              boostObj.textComment[getRandomInt(boostObj.textComment.length)],
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

const checkDuplicate = async (arrID, ID, numsPostPerID) => {
  // Đếm số lần xuất hiện của ID
  const idCount = {};

  for (let i = 0; i < arrID.length; i++) {
    const currentID = arrID[i];
    // Tang số lần xuất hiện
    idCount[currentID] = (idCount[currentID] || 0) + 1;

    // Neu vuot qua so bai post
    if (idCount[currentID] > numsPostPerID && currentID === ID) {
      return true;
    }
  }

  // Neu chua vuot qua
  return false;
};

const getRandomLetter = async () => {
  const alphabet = "abcdeghklmnopstuvy";
  const randomIndex = Math.floor(Math.random() * alphabet.length);
  return alphabet[randomIndex];
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
    let boostObj = ${strSetting}
    try {
      const isLive = await checkIsLive(page);
      if (isLive) {
        await returnHomePage(page);
        await delay(getRandomIntBetween(3000, 5000));
        const login = await checkLogin(page, "https://m.facebook.com/");
        if (login.isLogin) {
          boostObj = await checkObject(boostObj);
          if (boostObj.postID.length > 0) {
            await getPostID(page, boostObj);
          }
        }
      }
    } catch (error) {
      logger(error.message);
    }
      `;
};
