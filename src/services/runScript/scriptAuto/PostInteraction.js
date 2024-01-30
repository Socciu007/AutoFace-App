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
      url === 'https://m.facebook.com/story.php/?id='+id+'&story_fbid='+fbid ||
      url.includes('https://m.facebook.com/profile.php/')
    ) {
      logger('URL is correct');
    } else {
      logger('Redirect to homepage profile');
      await page.goto('https://m.facebook.com/story.php/?id='+id+'&story_fbid='+fbid, {
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
      let likeSelector = '#screen-root > div > div > div> div > div:nth-child(1) > div >button > span';
      let likeBtns = await getElements(page, likeSelector, 10);
      if (!likeBtns) {
        likeSelector = '#screen-root > div > div > div > div:nth-child(1) > div > button > span:nth-child(1)';
        likeBtns = await getElements(page, likeSelector, 10);
        if (!likeBtns) {
          logger('Không tìm thấy nút like');
          return false;
        }
      }
      await scrollSmoothIfNotExistOnScreen(page, likeSelector);
      await delay(5000);
      let isClick = false;
      if (likeBtns.length > 0) {
        for (let i = 0; i < likeBtns.length; i++) {
          // check selector in screen
          let selector = await page.evaluate((el) => {
            if (!el) return false;
            if (el.innerHTML.includes('󰍸')) {
              const rect = el.getBoundingClientRect();
              return (
                rect.width > 0 &&
                rect.height > 0 &&
                rect.top >= 50 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight - 50 || document.documentElement.clientHeight - 50) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
              );
            } else {
              return false;
            }
          }, likeBtns[i]);
          if (!selector) {
            continue;
          }
          await delay(1000);
          await likeBtns[i].evaluate((b) => b.click());
          await delay(randomDelay);
          isClick = true;
          break;
        }
      }
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
      let shareSelector = '#screen-root > div > div > div> div > div:nth-child(3) > div >button';
      let shareBtns = await getElements(page, shareSelector, 10);
      if (!shareBtns) {
        shareSelector = '#screen-root > div > div > div > div:nth-child(3) > div >button > span';
        shareBtns = await getElements(page, shareSelector, 10);
        if (!shareBtns) {
          logger('Không tìm thấy nút share');
          return false;
        }
      }
      await scrollSmoothIfNotExistOnScreen(page, shareSelector);
      await delay(5000);
      let isClick = false;
      if (shareBtns.length > 0) {
        for (let i = 0; i < shareBtns.length * 2; i++) {
          // check selector in screen
          let selector = await page.evaluate((el) => {
            if (!el) return false;
            if (el.innerHTML.includes('󰍺 ')) {
              const rect = el.getBoundingClientRect();
              return (
                rect.width > 0 &&
                rect.height > 0 &&
                rect.top >= 50 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight - 50 || document.documentElement.clientHeight - 50) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
              );
            } else {
              return false;
            }
          }, shareBtns[i]);
  
          if (!selector) continue;
          await shareBtns[i].evaluate((b) => b.click());
          await delay(3000);
          const shareOptionBtn = await findBtn(page, '󱤱');
          if (!shareOptionBtn) continue;
          await delay(1000);
          await clickElement(shareOptionBtn);
          await delay(3000);
          // click post
          const postSelector = '#screen-root > div > div:nth-child(2) > div > div:nth-child(3) > div > button';
          const postBtn = await getElement(page, postSelector, 10);
          if (!postBtn) continue;
          await delay(1000);
          await clickElement(postBtn);
          await delay(randomDelay);
          logger('Đã share xong');
          isClick = true;
          break;
        }
      }
      return isClick;
    } catch (error) {
      logger(error);
      return false;
    }
  };
  const randomComment = async (page, PostInteract) => {
    let randomDelay = getRandomIntBetween(3 * 1000, 5 * 1000);
    let commentSelector = '#screen-root > div > div > div > div:nth-child(2) > div > button > span';
    let commentBtns = await getElements(page, commentSelector, 10);
    if (!commentBtns) {
      commentSelector = '#screen-root > div > div > div > div > div:nth-child(2) > div > button > span';
      commentBtns = await getElements(page, commentSelector, 10);
      if (!commentBtns) {
        logger('Không tìm thấy nút comment');
        return false;
      }
    }
    await scrollSmoothIfNotExistOnScreen(page, commentSelector);
    await delay(5000);
    let isClick = false;
    if (commentBtns.length > 0) {
      for (let i = 0; i < commentBtns.length * 2; i++) {
        // check selector in screen
        let selector = await page.evaluate((el) => {
          if (!el) return false;
          if (el.innerHTML.includes('󰍹')) {
            const rect = el.getBoundingClientRect();
            return (
              rect.width > 0 &&
              rect.height > 0 &&
              rect.top >= 50 &&
              rect.left >= 0 &&
              rect.bottom <= (window.innerHeight - 50 || document.documentElement.clientHeight - 50) &&
              rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
          } else {
            return false;
          }
        }, commentBtns[i]);
        if (!selector) continue;
        await commentBtns[i].evaluate((b) => b.click());
        await delay(randomDelay);
        // find comment area
        const commentAreaSelector = 'textarea[type="text"]';
        const commentArea = await getElement(page, commentAreaSelector, 10);
        if (!commentArea) continue;
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
        if (!postBtn) continue;
        await delay(1000);
        await clickElement(postBtn);
        await delay(randomDelay);
        isClick = true;
        break;
      }
    }
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

    let randomPost =
      getRandomIntBetween(post.postStart, post.postEnd) > post.lineCount
        ? post.lineCount
        : getRandomIntBetween(post.postStart, post.postEnd);
    logger('randomPost ' + randomPost);
    let randomViewTime = getRandomIntBetween(post.viewTimeStart * 1000, post.viewTimeEnd * 1000);
    await delay(2000);
    let countPost = 0;
    let arrLink = [];
    let numLikes = getRandomIntBetween(post.likeStart, post.likeEnd);
    logger('Cần like', numLikes, 'bài');
    let numShares = getRandomIntBetween(post.shareStart, post.shareEnd);
    logger('Cần share', numShares, 'bài');
    let numComments = getRandomIntBetween(post.commentStart, post.commentEnd);
    logger('Cần comment', numComments, 'bài');
    while (randomViewTime > 0 && countPost <= randomPost && post.lineCount > 0) {
      const randomLink = getRandomIntBetween(0, post.lineCount);
      if (arrLink.includes(randomLink)) {
        return 0;
      }
      arrLink.push(randomLink);
      const [id, fbid] = post.UID[randomLink].split('|');
      await page.goto('https://m.facebook.com/story.php/?id='+id+'&story_fbid='+fbid);
      const startTime = Date.now();
      const shouldLike = getRandomInt(3) == 0;
      logger('shouldLike', shouldLike);
      if (post.isLiked == true && shouldLike == true) {
        try {
          await returnProfilePage(page, id, fbid);
          const result = await randomLike(page);
          if (result) {
            countPost++;
            numLikes--;
            logger('Số bài cần like còn lại ', numLikes, ' bài');
          } else {
            logger('Like không thành công');
          }

          if (numLikes <= 0 || countPost > randomPost) {
            logger('Da like du');
            post.isLiked = false;
          }
          await delay(getRandomIntBetween(2, 5) * 1000);
        } catch (error) {
          logger(error);
        }
      }
      await delay(getRandomIntBetween(4, 8) * 1000);
      const shouldShare = getRandomInt(3) == 0;
      logger('shouldShare', shouldShare);
      if (post.isShare == true && shouldShare == true) {
        try {
          await returnProfilePage(page, id, fbid);
          const result = await randomShare(page);
          if (result) {
            countPost++;
            numShares--;
            logger('Số bài cần share còn lại ', numShares, ' bài');
          } else {
            logger('Share không thành công');
          }
          if (numShares <= 0 || countPost > randomPost) {
            logger('Da share du');
            post.isShare == false;
          }
          await delay(getRandomIntBetween(3, 5) * 1000);
        } catch (error) {
          logger(error);
        }
      }
      await delay(getRandomIntBetween(4, 8) * 1000);
      const shouldComment = getRandomInt(3) == 0;
      logger('shouldComment', shouldComment);
      if (post.isComment == true && post.isText == true && shouldComment == true) {
        if (!post.text.length) {
          logger('Không thể comment với nội dung rỗng!');
          return 0;
        }
        try {
          await returnProfilePage(page, id, fbid);
          const result = await randomComment(page, post);
          if (result) {
            countPost++;
            numComments--;
            logger('Số bài comment còn lại ', numComments, ' bài');
          } else {
            logger('Comment không thành công');
          }
          if (numComments <= 0 || countPost > randomPost) {
            logger('Da comment du');
            post.isComment = false;
          }
          await delay(getRandomIntBetween(3, 5) * 1000);
        } catch (error) {
          logger(error);
        }
      }

      const endTime = Date.now();
      post.lineCount--;
      randomViewTime -= endTime - startTime;
      let randomDelay = getRandomIntBetween(post.delayTimeStart * 1000, post.delayTimeEnd * 1000);
      await delay(randomDelay);
      logger('randomViewTime ' + randomViewTime);
      logger('Timing running ' + (endTime - startTime));
      logger('countPost ' + countPost);
    }
  } catch (error) {
    logger(error);
  }
    `;
};
