export const postInteract = (setting) => {
  console.log(setting);
  const strSetting = `{
      UID: ${JSON.stringify(setting.UID)},
      viewTimeStart: ${setting.viewTimeStart},
      viewTimeEnd: ${setting.viewTimeEnd},
      delayTimeStart: ${setting.delayTimeStart},
      delayTimeEnd: ${setting.delayTimeEnd},
      postPerUserStart: ${setting.postPerUserStart},
      postPerUserEnd: ${setting.postPerUserEnd},
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
  return `
  const randomLike = async (page) => {
    try {
      let randomDelay = getRandomIntBetween(3 * 1000, 5 * 1000);
      let likeSelector = '#screen-root > div > div > div> div > div:nth-child(1) > div >button > span';
      let likeBtns = await getElements(page, likeSelector, 10);
      if (!likeBtns) {
        likeSelector = '#screen-root > div > div > div > div:nth-child(1) > div > button > span:nth-child(1)';
        likeBtns = await getElements(page, likeSelector, 10);
        if (!likeBtns) return false;
      }
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
        if (!shareBtns) return false;
      }
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
          // choose share option
          const shareOptionSelector =
            '#screen-root > div > div> div > div:nth-child(2) > div > div > div.m.bg-s3> div:nth-child(1)';
          const shareOptionBtn = await getElement(page, shareOptionSelector, 10);
          if (!shareOptionBtn) continue;
          await delay(1000);
          await clickElement(shareOptionBtn);
          await delay(3000);
          logger('Đã chọn option 1');
          // click post
          const postSelector = '#screen-root > div > div > div > div > div > div > button';
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
      if (!commentBtns) return false;
    }
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
        let randomString = content[getRandomIntBetween(1, content.length)];
        await delay(1000);
        await page.keyboard.type(randomString, { delay: 100 });
        await delay(1000);
        const postSelector = 'div[aria-label="SEND"]';
        const postBtn = await getElement(page, postSelector, 10);
        if (!postBtn) continue;
        await delay(1000);
        await clickElement(postBtn);
        await delay(randomDelay);
        // return home
        const returnSelector = '#screen-root > div > div > div > div > div.m.bg-s3 > div:nth-child(1)';
        const returnBtn = await getElement(page, returnSelector, 10);
        if (!returnBtn) continue;
        await delay(1000);
        await clickElement(returnBtn);
        await delay(3000);
        isClick = true;
        break;
      }
    }
    return isClick;
  };
  const scroll = async (page, PostInteract) => {
    let randomScrollTime = getRandomIntBetween(8 * 1000, 12 * 1000);
  
    try {
      while (randomScrollTime > 0) {
        let scrollAmount = getRandomIntBetween(200, 400);
        let randomDelay = getRandomIntBetween(PostInteract.delayTimeStart * 1000, PostInteract.delayTimeEnd * 1000);
        // Lưu lại vị trí cuối cùng trước khi scroll
        const positionBeforeScroll = await page.evaluate(() => window.scrollY);
        await delay(2000);
        await scrollByWheel(page, scrollAmount);
        // Lưu lại vị trí cuối cùng sau khi scroll
        await delay(2000);
        const positionAfterScroll = await page.evaluate(() => window.scrollY);
        await delay(randomDelay);
        randomScrollTime = randomScrollTime - randomDelay;
        // So sánh vị trí cuối cùng trước và sau scroll
        if (positionBeforeScroll === positionAfterScroll) {
          logger('Đã scroll xuống cuối trang.');
          return false;
        } else {
          logger('Còn bài đăng để hiển thị.Tiếp tục scroll');
        }
      }
      logger('Đã scroll xong');
      return true;
    } catch (error) {
      logger(error);
    }
  };
  const returnProfilePage = async (page, id) => {
    const url = await page.url();
    if (url === 'https://m.facebook.com/profile.php/?id='+id || url.includes('https://m.facebook.com/profile.php/')) {
      logger('URL is correct');
    } else {
      logger('Redirect to homepage');
      await page.goto('https://m.facebook.com/profile.php/?id='+id, {
        waitUntil: 'networkidle2',
      });
    }
  };
  const PostInteract = ${strSetting}
  try {
    //Check obj start < end ? random(start,end) : random(end,start)
    let post = await checkObject(PostInteract);
    // check page is live reutrn -1, return 1, return 0
    const isLive = await checkIsLive(page);
    logger('Tình trạng trang web:'+ isLive);
    if (!isLive) return -1;
    await returnHomePage(page);
    await delay(2000);
  
    for (let index = 0; index < post.lineCount; index++) {
      await page.goto('https://m.facebook.com/profile.php/?id='+post.UID[index]);
  
      let randomPostPerUser = getRandomIntBetween(post.postPerUserStart, post.postPerUserEnd);
      logger('randomPostPerUser ' + randomPostPerUser);
      let randomViewTime = getRandomIntBetween(post.viewTimeStart * 1000, post.viewTimeEnd * 1000);
      let countUID = 0;
      await delay(2000);
      let countPost = 1;
      while (randomViewTime > 0 && countPost <= randomPostPerUser) {
        const startTime = Date.now();
  
        let isScroll = await scroll(page, post);
        logger('is scroll ' + isScroll);
        let isBreak = false;
        if (!isScroll) break;
        if (post.isLiked == true) {
          let count = 0;
          let numLikes = getRandomIntBetween(post.likeStart, post.likeEnd);
          logger('Cần like', numLikes, 'bài');
          for (let i = 0; i < numLikes * 2; i++) {
            try {
              await returnProfilePage(page);
              const result = await randomLike(page);
              if (result) {
                countPost++;
                count++;
                logger('Đã like được', count, 'bài');
              } else {
                logger('Like không thành công');
              }
              let isScroll = await scroll(page, post);
              if (!isScroll) {
                isBreak = true;
                break;
              }
              if (count == numLikes || countPost > randomPostPerUser) break;
            } catch (error) {
              logger(error);
            }
          }
          if (isBreak) break;
        }
        await delay(2000);
        if (post.isShare == true) {
          let count = 0;
          let numShares = getRandomIntBetween(post.shareStart, post.shareEnd);
          logger('Cần share', numShares, 'bài');
          for (let i = 0; i < numShares * 2; i++) {
            try {
              await returnProfilePage(page);
  
              const result = await randomShare(page);
              if (result) {
                countPost++;
                count++;
                logger('Đã share được', count, ' bài');
              } else {
                logger('Share không thành công');
              }
              let isScroll = await scroll(page, post);
              if (!isScroll) {
                isBreak = true;
                break;
              }
              if (count == numShares || countPost > randomPostPerUser) break;
            } catch (error) {
              logger(error);
            }
          }
          if (isBreak) break;
        }
        await delay(2000);
        if (post.isComment == true && post.isText == true) {
          if (!post.text.length) {
            logger('Không thể comment với nội dung rỗng!');
            return 0;
          }
          const numComments = getRandomIntBetween(post.commentStart, post.commentEnd);
          logger('Cần comment', numComments, 'bài');
          let count = 0;
          for (let i = 0; i < numComments * 2; i++) {
            try {
              await returnProfilePage(page);
  
              const result = await randomComment(page, post);
              if (result) {
                countPost++;
                count++;
                logger('Đã comment được', count, 'bài');
              } else {
                logger('Comment không thành công');
              }
              let isScroll = await scroll(page, post);
              if (!isScroll) {
                isBreak = true;
                break;
              }
              if (count == numComments || countPost > randomPostPerUser) break;
            } catch (error) {
              logger(error);
            }
          }
        }
        if (isBreak) break;
  
        const endTime = Date.now();
        randomViewTime -= endTime - startTime;
        logger('randomViewTime ' + randomViewTime);
        logger('Timing running ' + (endTime - startTime));
        logger('countPost ' + countPost);
      }
  
      countUID++;
      let randomDelay = getRandomIntBetween(post.delayTimeStart * 1000, post.delayTimeEnd * 1000);
      await delay(randomDelay);
      logger('Scroll het person thu ' + (index + 1));
    }
  } catch (error) {
    logger(error);
  }
    `;
};
