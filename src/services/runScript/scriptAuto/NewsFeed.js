export const newFeed = (setting) => {
  const strSetting = `
    {
      scrollTimeStart: ${setting.scrollTimeStart},
      scrollTimeEnd: ${setting.scrollTimeEnd},
      delayTimeStart: ${setting.delayTimeStart},
      delayTimeEnd: ${setting.delayTimeEnd},
      randomLike: ${setting.randomLike},
      likeStart: ${setting.likeStart},
      likeEnd: ${setting.likeEnd},
      randomShare: ${setting.randomShare},
      shareStart: ${setting.shareStart},
      shareEnd: ${setting.shareEnd},
      randomComment: ${setting.randomComment},
      commentStart: ${setting.commentStart},
      commentEnd: ${setting.commentEnd},
      commentStrs: ${JSON.stringify(setting.commentStrs)}
    }`;
  return `
  
  const scroll = async (page, newsfeed) => {
    let randomScrollTime = getRandomIntBetween(4, 7);
    try {
      let randomDelay = getRandomIntBetween(newsfeed.delayTimeStart * 1000, newsfeed.delayTimeEnd * 1000);
      while (randomScrollTime > 0) {
        let scrollAmount = getRandomIntBetween(200, 300);
        await scrollByWheel(page, scrollAmount);
        await delay(randomDelay);
        randomScrollTime--;
      }
    } catch (error) {
      logger(error);
    }
  };
  const randomLike = async (page, newsfeed) => {
    try {
      let randomDelay = getRandomIntBetween(newsfeed.delayTimeStart * 1000, newsfeed.delayTimeEnd * 1000);
      let likeSelector = '#screen-root > div > div > div> div > div:nth-child(1) > div >button > span';
      let likeBtns = await getElements(page, likeSelector, 10);
      if (!likeBtns) {
        likeSelector = '#screen-root > div > div > div > div:nth-child(1) > div > button > span:nth-child(1)';
        likeBtns = await getElements(page, likeSelector, 10);
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
  const randomShare = async (page, newsfeed) => {
    try {
      let randomDelay = getRandomIntBetween(newsfeed.delayTimeStart * 1000, newsfeed.delayTimeEnd * 1000);
      let shareSelector = '#screen-root > div > div > div> div > div:nth-child(3) > div > button > span';
      let shareBtns = await getElements(page, shareSelector, 10);
      if (!shareBtns) {
        shareSelector = '#screen-root > div > div > div > div:nth-child(3) > div >button > span';
        shareBtns = await getElements(page, shareSelector, 10);
      }
      if (!shareBtns) return false;
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
  const randomComment = async (page, newsfeed) => {
    let randomDelay = getRandomIntBetween(newsfeed.delayTimeStart * 1000, newsfeed.delayTimeEnd * 1000);
    let commentSelector = '#screen-root > div > div > div > div:nth-child(2) > div > button > span';
    let commentBtns = await getElements(page, commentSelector, 10);
    if (!commentBtns) {
      commentSelector = '#screen-root > div > div > div > div > div:nth-child(2) > div > button > span';
      commentBtns = await getElements(page, commentSelector, 10);
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
        let content = newsfeed.commentStrs;
        let randomString = content[getRandomInt(content.length)];
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
const newsfeed = ${strSetting};
try {
  //Check obj start < end ? random(start,end) : random(end,start)
  let news = await checkObject(newsfeed);
  // check page is live reutrn -1, return 1, return 0
  const isLive = await checkIsLive(page);
  logger('Tình trạng trang web: '+ isLive);
  if (!isLive) {
    return -1;
  }

  let randomDelay = getRandomIntBetween(newsfeed.delayTimeStart * 1000, newsfeed.delayTimeEnd * 1000);
  let scrollTime = getRandomInt(newsfeed.scrollTimeStart * 1000, newsfeed.scrollTimeEnd * 1000);
  let loopLike = 0;
  let loopComment = 0;
  let loopShare = 0;
  while (scrollTime > 0) {
    let startTime = Date.now();
    await scroll(page, news);
    if (news.randomLike == true && loopLike == 0) {
      let count = 0;
      let numLikes = getRandomIntBetween(news.likeStart, news.likeEnd);
      logger('Cần like ' + numLikes + ' bài');
      for (let i = 0; i < numLikes * 2; i++) {
        try {
          await returnHomePage(page);
          await delay(1000)
          const isLike = await randomLike(page, news);
          if (isLike) {
            count++;
            logger('Đã like được '+ count + ' bài');
          } else {
            logger('Like không thành công');
          }
          if (count == numLikes) {
            logger('Xong like !');
            loopLike++;
            await scroll(page, news);
            break;
          }
          await delay(randomDelay);
          await scroll(page, news);
        } catch (error) {
          logger(error);
        }
      }
    }

    if (news.randomShare == true && loopShare == 0) {
      let count = 0;
      let numShares = getRandomIntBetween(news.shareStart, news.shareEnd);
      logger('Cần share ' + numShares + ' bài');
      for (let i = 0; i < numShares * 2; i++) {
        try {
          await returnHomePage(page);
          const result = await randomShare(page, news);
          if (result) {
            count++;
            logger('Đã share được ' + count + ' bài');
          } else {
            logger('Share không thành công');
          }
          if (count == numShares) {
            logger('Xong share!');
            loopShare++;
            await scroll(page, news);
            break;
          }
          await delay(randomDelay);
          await scroll(page, news);
        } catch (error) {
          logger(error);
        }
      }
    }

    if (news.randomComment == true && loopComment == 0) {
      if (!news.commentStrs.length) {
        logger('Không thể comment với nội dung rỗng!');
        return false;
      }
      const numComments = getRandomIntBetween(news.commentStart, news.commentEnd);
      logger('Cần comment '+  numComments + ' bài');
      let count = 0;
      for (let i = 0; i < numComments * 2; i++) {
        try {
          await returnHomePage(page);
          const result = await randomComment(page, news);
          await delay(randomDelay);
          if (result) {
            count++;
            logger('Đã comment được ' + count + ' bài');
          } else {
            logger('Comment không thành công');
          }
          if (count == numComments) {
            logger('Xong comment!');
            loopComment++;
            break;
          }
          await delay(randomDelay);
          await scroll(page, news);
        } catch (error) {
          logger(error);
        }
      }
      logger('end');
    }
    let endTime = Date.now();
    scrollTime -= endTime - startTime;
  }
} catch (err) {
  logger(err);
}
    `;
};
