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
      logger('Error navigating to URL:' + error.message);
    }
  };
  
  const getPostID = async (page, browser, boostObj) => {
    try {
      const numsLike = getRandomIntBetween(boostObj.likeStart, boostObj.likeEnd);
      const numsShare = getRandomIntBetween(
        boostObj.shareToFeedStart,
        boostObj.shareToFeedEnd
      );
      let countLike = 0;
      let countShare = 0;
      for (let i = 0; i < boostObj.postID.length; i++) {
        const url = 'https://mbasic.facebook.com/'+boostObj.postID[i];
        await navigateToUrl(page, url);
        await delay(getRandomIntBetween(3000, 5000));
        await viewPost(page, browser, boostObj);
        await delay(getRandomIntBetween(3000, 5000));
        await likePost(page, countLike, numsLike, boostObj);
        await delay(getRandomIntBetween(3000, 5000));
        await commentPost(page, boostObj);
        await delay(getRandomIntBetween(3000, 5000));
        await sharePost(page, countShare, numsShare, boostObj);
        await delay(getRandomIntBetween(3000, 5000));
      }
    } catch (error) {
      logger(error.message);
    }
  };
  
  const viewPost = async (page, browser, boostObj) => {
    try {
      // Luu lai index hien tai cua tab
      const pages = await browser.pages();
      const timeViewPost = getRandomIntBetween(
        boostObj.viewTimeStart * 1000,
        boostObj.viewTimeEnd * 1000
      );
      let hrefs = await page.$$eval("a", links => links.map(a => a.href));
      await delay(getRandomIntBetween(3000, 5000));
      const isPlay = await clickByHref(page, "/video_redirect", hrefs, 0);
      if (isPlay) {
        await delay(timeViewPost);
        logger("Done view post");
        await (await browser.pages())[pages.length].close();
      } else {
        await delay(timeViewPost);
        logger("Done view post");
      }
    } catch (error) {
      logger(error.message);
    }
  };
  
  const likePost = async (page, countLike, numsLike, boostObj) => {
    try {
      if (countLike <= numsLike && boostObj.isLike) {
        let hrefs = await page.$$eval("a", links => links.map(a => a.href));
        await delay(getRandomIntBetween(3000, 5000));
        const isLike = await clickByHref(page, "/a/like", hrefs, 0);
        await delay(getRandomIntBetween(5000, 7000));
        if (isLike) {
          logger("Done like post");
          countLike++;
        } else {
          logger("Liked post");
        }
      } else {
        logger("Liked enough posts");
      }
    } catch (error) {
      logger(error.message);
    }
  };
  
  const clickByHref = async (page, namePage, href, indexHref) => {
    if (href.length > 0) {
      const hrefPage = href.filter(e => e.includes(namePage));
      if (hrefPage.length > 0) {
        const index =
          indexHref !== undefined ? indexHref : getRandomInt(hrefPage.length);
        const selector = '[href="'+hrefPage[index].replace("https://mbasic.facebook.com", "")+'"]';
        const likeBtn = await page.$(selector);
        if (likeBtn) {
          await scrollSmoothIfNotExistOnScreen(page, selector);
          await clickElement(likeBtn);
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } else {
      return false;
    }
  };
  
  const commentPost = async (page, boostObj) => {
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
      const numberTagFriend = getRandomIntBetween(
        boostObj.tagFriendStart,
        boostObj.tagFriendEnd
      );
      if (numberTagFriend > 0) {
        await tagFriendComment(page, boostObj, numberTagFriend);
      } else if (boostObj.isComment && boostObj.file.length > 0) {
        await commentImgOrText(page, boostObj);
      } else if (boostObj.isComment && boostObj.textComment.length > 0) {
        const element = await checkExistElement(page, "input#composerInput", 3);
        if (element === 1) {
          await scrollSmoothIfNotExistOnScreen(page, "input#composerInput");
          const commentBtn = await page.$("input#composerInput");
          await delay(getRandomIntBetween(3000, 5000));
          await commentBtn.type(
            boostObj.textComment[getRandomInt(boostObj.textComment.length)],
            { delay: 200 }
          );
          await delay(getRandomIntBetween(3000, 5000));
          const sendElement = await checkExistElement(
            page,
            'input[value="Comment"]',
            3
          );
          if (sendElement === 1) {
            const sendBtn = await page.$('input[value="Comment"]');
            await clickElement(sendBtn);
            await delay(getRandomIntBetween(3000, 5000));
            logger("Done comment post");
          }
        }
      } else {
        logger("No comment content");
      }
    } catch (error) {
      logger(error.message);
    }
  };
  
  const tagFriendComment = async (page, boostObj, numberTagFriend) => {
    try {
      const hrefs = await page.$$eval("a", links => links.map(a => a.href));
      await delay(getRandomIntBetween(3000, 5000));
      const isComment = await clickByHref(page, "/mbasic/comment", hrefs, 0);
      await delay(getRandomIntBetween(5000, 7000));
      if (isComment) {
        let countTagFriend = 0;
        while (boostObj.isTag && countTagFriend <= numberTagFriend) {
          const checkTag = await checkExistElement(
            page,
            'input[name="view_mention"]',
            3
          );
          await delay(getRandomIntBetween(3000, 5000));
          if (checkTag === 1) {
            const tagBtn = await page.$('input[name="view_mention"]');
            await delay(getRandomIntBetween(3000, 5000));
            await clickElement(tagBtn);
            await delay(getRandomIntBetween(3000, 5000));
          }
          if (countTagFriend > 14) {
            const moreBtn = await page.$('input[value="Show more"]');
            await delay(getRandomIntBetween(3000, 5000));
            await clickElement(moreBtn);
            await delay(getRandomIntBetween(3000, 5000));
          }
          const listTag = await page.$$(
            'input[aria-labelledby="m_check_list_aria_label"]'
          );
          await delay(getRandomIntBetween(3000, 5000));
          await clickElement(
            listTag[getRandomIntBetween(countTagFriend, listTag.length)]
          );
          await delay(getRandomIntBetween(3000, 5000));
          const clickDone = await checkExistElement(
            page,
            'input[value="Done"]',
            3
          );
          if (clickDone === 1) {
            const doneBtn = await page.$('input[value="Done"]');
            await delay(getRandomIntBetween(3000, 5000));
            await clickElement(doneBtn);
            await delay(getRandomIntBetween(3000, 5000));
          }
          countTagFriend++;
        }
        logger("Done tag friend");
        if (boostObj.isComment && boostObj.file.length > 0) {
          const chooserImageBtn = await page.$('input[type="file"]');
          await delay(getRandomIntBetween(3000, 5000));
          const [fileChooser] = await Promise.all([
            page.waitForFileChooser(),
            await clickElement(chooserImageBtn),
          ]);
          await delay(getRandomIntBetween(3000, 5000));
          // Accept multiple files
          await fileChooser.accept([
            boostObj.file[getRandomInt(boostObj.file.length)],
          ]);
          await delay(getRandomIntBetween(3000, 5000));
          logger("Done upload img");
        }
  
        if (boostObj.isComment && boostObj.textComment.length > 0) {
          const elementText = await checkExistElement(
            page,
            'textarea[name="comment_text"]',
            3
          );
          if (elementText === 1) {
            const commentBtn = await page.$('textarea[name="comment_text"]');
            await delay(getRandomIntBetween(3000, 5000));
            await commentBtn.type(
              boostObj.textComment[getRandomInt(boostObj.textComment.length)],
              { delay: 200 }
            );
            await delay(getRandomIntBetween(3000, 5000));
          }
        }
        //send commnent
        const sendElement = await checkExistElement(
          page,
          'input[value="Comment"]',
          3
        );
        if (sendElement === 1) {
          const sendBtn = await page.$('input[value="Comment"]');
          await clickElement(sendBtn);
          await delay(getRandomIntBetween(3000, 5000));
          logger("Done comment post");
        }
      }
    } catch (error) {
      logger(error.message);
    }
  };
  
  const sharePost = async (page, countShare, numsShare) => {
    try {
      if (countShare <= numsShare) {
        let hrefs = await page.$$eval("a", links => links.map(a => a.href));
        await delay(getRandomIntBetween(3000, 5000));
        const isShare = await clickByHref(page, "c_src=share", hrefs, 0);
        await delay(getRandomIntBetween(5000, 7000));
        if (isShare) {
          const checkShare = await checkExistElement(
            page,
            'input[value="Share"]',
            3
          );
          if (checkShare === 1) {
            const shareBtn = await page.$('input[value="Share"]');
            await delay(getRandomIntBetween(3000, 5000));
            await clickElement(shareBtn);
            await delay(getRandomIntBetween(3000, 5000));
          }
          logger("Done share post");
          countShare++;
        }
      } else {
        logger("shared enough posts");
      }
    } catch (error) {
      logger(error.message);
    }
  };
  
  const commentImgOrText = async (page, boostObj) => {
    try {
      if (boostObj.file.length > 0) {
        const uploadElement = await checkExistElement(
          page,
          'input[value="Attach a Photo"]',
          3
        );
        if (uploadElement === 1) {
          const uploadBtn = await page.$('input[value="Attach a Photo"]');
          await clickElement(uploadBtn);
          await delay(getRandomIntBetween(3000, 5000));
          const chooserImageBtn = await page.$('input[type="file"]');
          const [fileChooser] = await Promise.all([
            page.waitForFileChooser(),
            await clickElement(chooserImageBtn),
          ]);
          await delay(getRandomIntBetween(3000, 5000));
          // Accept multiple files
          await fileChooser.accept([
            boostObj.file[getRandomInt(boostObj.file.length)],
          ]);
          await delay(getRandomIntBetween(3000, 5000));
          logger("Done upload img");
  
          //cmt text
          if (boostObj.textComment.length > 0) {
            const elementText = await checkExistElement(
              page,
              'textarea[name="comment_text"]',
              3
            );
            if (elementText === 1) {
              const commentBtn = await page.$('textarea[name="comment_text"]');
              await delay(getRandomIntBetween(3000, 5000));
              await commentBtn.type(
                boostObj.textComment[getRandomInt(boostObj.textComment.length)],
                { delay: 200 }
              );
              await delay(getRandomIntBetween(3000, 5000));
            }
          }
          //send commnent
          const sendElement = await checkExistElement(
            page,
            'input[value="Comment"]',
            3
          );
          if (sendElement === 1) {
            const sendBtn = await page.$('input[value="Comment"]');
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
            await getPostID(page, browser, boostObj);
          }
        }
      }
    } catch (error) {
      logger(error.message);
    }
      `;
};
