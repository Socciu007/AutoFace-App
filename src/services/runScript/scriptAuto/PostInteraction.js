export const postInteract = (setting) => {
  const strSetting = `{
      UID: ${JSON.stringify(setting.UID)},
      viewTimeStart: ${setting.viewTimeStart},
      viewTimeEnd: ${setting.viewTimeEnd},
      delayTimeStart: ${setting.delayTimeStart},
      delayTimeEnd: ${setting.delayTimeEnd},
      postStart: ${setting.postStart},
      postEnd: ${setting.postEnd},
      isLiked: ${setting.isLiked},
      likeStart: ${setting.likeStart},
      likeEnd: ${setting.likeEnd},
      isShare: ${setting.isShare},
      shareStart: ${setting.shareStart},
      shareEnd: ${setting.shareEnd},
      isComment: ${setting.isComment},
      isText: ${setting.isText},
      commentStart: ${setting.commentStart},
      commentEnd: ${setting.commentEnd},
      text: ${JSON.stringify(setting.text)},
      lineCount: ${setting.lineCount},
    }`;
  console.log(setting);
  return `
  const findBtn = async (page, content) => {
    try {
      const buttons = await getElements(page, '[class="native-text"]');
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
  const randomLike = async (page) => {
    try {
      let randomDelay = getRandomIntBetween(3 * 1000, 5 * 1000);
      let likeBtns = await findBtn(page, '󱍸');
      if (!likeBtns) {
        logger('Không tìm thấy nút like');
        return false;
      }
      await scrollSmoothIfElementNotExistOnScreen(page, likeBtns);
      await delay(5000);
      let isClick = false;
      await likeBtns[i].evaluate((b) => b.click());
      await delay(randomDelay);
      isClick = true;
      return isClick;
    } catch (error) {
      logger(error);
      return false;
    }
  };
  const randomShare = async (page) => {
    try {
      logger('start share');
      let randomDelay = getRandomIntBetween(3 * 1000, 5 * 1000);
      let shareBtns = await findBtn(page, '󰍺 ');
      if (!shareBtns) {
        logger('Không tìm thấy nút share');
        return false;
      }
      await scrollSmoothIfElementNotExistOnScreen(page, shareBtns);
      await delay(5000);
      let isClick = false;
      await clickElement(shareBtns);
      await delay(3000);
      const shareOptionBtn = await findBtn(page, '󱤱');
      if (!shareOptionBtn) isClick = false;
      await delay(1000);
      await clickElement(shareOptionBtn);
      await delay(3000);
      // click post
      const postSelector = '#screen-root > div > div:nth-child(2) > div > div:nth-child(3) > div > button';
      const postBtn = await getElement(page, postSelector, 10);
      if (!postBtn) isClick = false;
      await delay(1000);
      await clickElement(postBtn);
      await delay(randomDelay);
      logger('Đã share xong');
      isClick = true;
      return isClick;
    } catch (error) {
      logger(error);
      return false;
    }
  };
  const randomComment = async (page, PostInteract) => {
    let randomDelay = getRandomIntBetween(3 * 1000, 5 * 1000);
  
    let commentBtns = await findBtn(page, '󰍹 ');
    if (!commentBtns) {
      logger('Không tìm thấy nút comment');
      return false;
    }
  
    await scrollSmoothIfElementNotExistOnScreen(page, commentBtns);
    await delay(5000);
  
    let isClick = false;
    await commentBtns[i].evaluate((b) => b.click());
    await delay(randomDelay);
    // find comment area
    const commentAreaSelector = 'textarea[type="text"]';
    const commentArea = await getElement(page, commentAreaSelector, 10);
    if (!commentArea) isClick = false;
    await delay(1000);
    await clickElement(commentArea);
    logger('Đã chọn vùng comment');
    // comment
    let content = PostInteract.text;
    logger('content ' + content);
    let randomString = content[getRandomIntBetween(1, content.length)];
    logger('randomString ' + randomString);
    await delay(1000);
    await page.keyboard.type(randomString, { delay: 100 });
    await delay(1000);
    const postBtn = await findBtn(page, '󱛅');
    if (!postBtn) isClick = false;
    await delay(1000);
    await clickElement(postBtn);
    await delay(randomDelay);
    isClick = true;
    return isClick;
  };
  
  
  const PostInteract = ${strSetting}
  try {
    //Check obj start < end ? random(start,end) : random(end,start)
    let post = await checkObject(PostInteract);
    // check page is live reutrn -1, return 1, return 0
    const isLive = await checkIsLive(page);
    logger('Tình trạng trang web:', isLive);
    if (!isLive) return -1;
    // check is login: get cookie return -1, return 1, return 0
    const isLoggedIn = await checkLogin(page);
    logger('Tình trạng đăng nhập:', isLoggedIn);
    if (!isLoggedIn) return -1;
    let randomPost =
      getRandomIntBetween(post.postStart, post.postEnd) > post.UID.length
        ? post.UID.length
        : getRandomIntBetween(post.postStart, post.postEnd);
    logger('randomPost ' + randomPost);
    let randomViewTime = getRandomIntBetween(post.viewTimeStart * 1000, post.viewTimeEnd * 1000);
    await delay(2000);
    let arrLink = [];
    let numLikes = getRandomIntBetween(post.likeStart, post.likeEnd);
    logger('Cần like', numLikes, 'bài');
    let numShares = getRandomIntBetween(post.shareStart, post.shareEnd);
    logger('Cần share', numShares, 'bài');
    let numComments = getRandomIntBetween(post.commentStart, post.commentEnd);
    logger('Cần comment', numComments, 'bài');
    while (randomViewTime > 0 && randomPost > 0 && post.UID.length > 0) {
      let randomLink = getRandomIntBetween(0, post.UID.length);
      logger('randomLink', randomLink);
      logger('arrLink', arrLink);
      logger('arrLink.length', arrLink.length);
      if (arrLink.length === randomPost) break;
      if (arrLink.includes(randomLink)) {
        logger('Đã hiển thị bài trước đó');
        continue;
      }
      arrLink.push(randomLink);
      const [id, fbid] = post.UID[randomLink].split('|');
      await page.goto('https://m.facebook.com/story.php/?id='+id+'&story_fbid='+fbid);
      await delay(2000);
      randomPost--;

      if (
        (await checkExistElementOnScreen(
          page,
          '#screen-root > div > div:nth-child(2) > div> div:nth-child(4) > div > div > div > div > span',
        )) == 0
      ) {
        logger('Bài đăng không tồn tại ');
        continue;
      }

      const startTime = Date.now();

      const shouldLike = getRandomInt(3) == 0;
      logger('shouldLike', shouldLike);
      if (post.isLiked == true && shouldLike == true && numLikes > 0) {
        try {
          await returnProfilePage(page, id, fbid);
          const result = await randomLike(page);
          if (result) {
            numLikes--;
            logger('Số bài cần like còn lại ', numLikes, ' bài');
          } else {
            logger('Like không thành công');
          }
          if (numLikes <= 0) {
            logger('Da like du');
            numLikes = 0;
          }
          await delay(getRandomIntBetween(2, 5) * 1000);
        } catch (error) {
          logger(error);
        }
      }
      await delay(getRandomIntBetween(4, 8) * 1000);

      const shouldShare = getRandomInt(3) == 0;
      logger('shouldShare', shouldShare);
      if (post.isShare == true && shouldShare == true && numShares > 0) {
        try {
          await returnProfilePage(page, id, fbid);
          const result = await randomShare(page);
          if (result) {
            numShares--;
            logger('Số bài cần share còn lại ', numShares, ' bài');
          } else {
            logger('Share không thành công');
          }
          if (numShares <= 0) {
            logger('Da share du');
            numShares = 0;
          }
          await delay(getRandomIntBetween(3, 5) * 1000);
        } catch (error) {
          logger(error);
        }
      }
      await delay(getRandomIntBetween(4, 8) * 1000);

      const shouldComment = getRandomInt(3) == 0;
      logger('shouldComment', shouldComment);
      if (post.isComment == true && post.isText == true && shouldComment == true && numComments > 0) {
        if (!post.text.length) {
          logger('Không thể comment với nội dung rỗng!');
          return 0;
        }
        try {
          await returnProfilePage(page, id, fbid);
          const result = await randomComment(page, post);
          if (result) {
            numComments--;
            logger('Số bài comment còn lại ', numComments, ' bài');
          } else {
            logger('Comment không thành công');
          }
          if (numComments <= 0) {
            logger('Da comment du');
            numComments = 0;
          }
          await delay(getRandomIntBetween(3, 5) * 1000);
        } catch (error) {
          logger(error);
        }
      }

      const endTime = Date.now();
      randomViewTime = randomViewTime - (endTime - startTime);
      let randomDelay = getRandomIntBetween(post.delayTimeStart * 1000, post.delayTimeEnd * 1000);
      await delay(randomDelay);
      logger('randomViewTime ' + randomViewTime);
      logger('Timing running ' + (endTime - startTime));
      logger('Số post còn lại ' + randomPost);
    }
  } catch (error) {
    logger(error);
  }
    `;
};
