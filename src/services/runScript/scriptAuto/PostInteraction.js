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
  const returnProfilePage = async (page, id, fbid) => {
    const url = await page.url();
    if (
      url === 'https://m.facebook.com/story.php/?id=' + id + '&story_fbid=' + fbid ||
      url.includes('https://m.facebook.com/profile.php/')
    ) {
      logger('URL is correct');
    } else {
      logger('Redirect to homepage profile');
      await page.goto('https://m.facebook.com/story.php/?id=' + id + '&story_fbid=' + fbid, {
        waitUntil: 'networkidle2',
      });
    }
  };
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
        logger('Debug|Post interaction|' + "Can't find like button.");
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
      let randomDelay = getRandomIntBetween(3 * 1000, 5 * 1000);
      let shareBtns = await findBtn(page, '󰍺 ');
      if (!shareBtns) {
        logger('Debug' + '|' + 'Post interaction' + '|' + "Can't find share button.");
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
      logger('Debug' + '|' + 'Post interaction' + '|' + "Can't find comment button.");
  
      return false;
    }
  
    await scrollSmoothIfElementNotExistOnScreen(page, commentBtns);
    await delay(5000);
  
    let isClick = false;
    await clickElement(commentBtns);
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
    const isLive = checkIsLive(page);
    logger('Tình trạng trang web:', isLive);
    if (!isLive) return -1;
    // check is login: get cookie return -1, return 1, return 0
    const {isLogin} = await checkLogin(page);
    logger('Tình trạng đăng nhập:', isLogin);
    if (!isLogin) return -1;
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

    let arrLike = [];
    let arrComment = [];
    let arrShare = [];

    while (numLikes > 0) {
      const index = getRandomIntBetween(0, randomPost);
      if (arrLike.includes(index)) {
        continue;
      }
      arrLike.push(index);
      numLikes--;
      logger('numLikes', numLikes);
    }
    logger('arrLike', arrLike);

    while (numShares > 0) {
      const index = getRandomIntBetween(0, randomPost);
      if (arrShare.includes(index)) {
        continue;
      }
      arrShare.push(index);
      numShares--;
      logger('numShares', numShares);
    }
    logger('arrShare', arrShare);

    while (numComments > 0) {
      const index = getRandomIntBetween(0, randomPost);
      if (arrComment.includes(index)) {
        continue;
      }
      arrComment.push(index);
      numComments--;
      logger('numcomment', numComments);
    }
    logger('arrComment', arrComment);

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
      await page.goto('https://m.facebook.com/story.php/?id=' + id + '&story_fbid=' + fbid);
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

      if (post.isLiked == true && arrLike.includes(randomLink)) {
        try {
          await returnProfilePage(page, id, fbid);
          const result = await randomLike(page);
          if (result) {
            logger('Đã like bài');
          } else {
            logger('Like không thành công');
          }
          await delay(getRandomIntBetween(2, 5) * 1000);
        } catch (error) {
          logger(error);
        }
      }
      await delay(getRandomIntBetween(4, 8) * 1000);

      if (post.isShare == true && arrShare.includes(randomLink)) {
        try {
          await returnProfilePage(page, id, fbid);
          const result = await randomShare(page);
          if (result) {
            logger('Da share bai');
          } else {
            logger('Share không thành công');
          }
          await delay(getRandomIntBetween(3, 5) * 1000);
        } catch (error) {
          logger(error);
        }
      }
      await delay(getRandomIntBetween(4, 8) * 1000);

      if (post.isComment == true && post.isText == true && arrComment.includes(randomLink)) {
        if (!post.text.length) {
          logger('Debug' + '|' + 'Post interaction' + '|' + "Can't comment with empty text.");

          return 0;
        }
        try {
          await returnProfilePage(page, id, fbid);
          const result = await randomComment(page, post);
          if (result) {
            logger('Da comment');
          } else {
            logger('Comment không thành công');
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
