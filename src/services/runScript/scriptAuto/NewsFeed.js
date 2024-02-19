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
  
  const randomLike = async (page, newsfeed, likeBtns, temp) => {
    try {
      let randomDelay = getRandomIntBetween(newsfeed.delayTimeStart * 1000, newsfeed.delayTimeEnd * 1000);
      if (likeBtns.length > 0) {
          const randomIndex = getRandomIntBetween(temp, likeBtns.length);
          logger(randomIndex)
          await scrollSmoothIfElementNotExistOnScreen(likeBtns[randomIndex]);
          await delay(1000);
          await clickElement(likeBtns[randomIndex])
          temp = randomIndex;
          await delay(randomDelay);
      }
      return {
        isClick: true,
        newIndex: temp
      };
    } catch (error) {
      logger(error);
      return false;
    }
  };
  const randomShare = async (page, newsfeed, shareBtns, temp) => {
    try {
      let randomDelay = getRandomIntBetween(newsfeed.delayTimeStart * 1000, newsfeed.delayTimeEnd * 1000);
      if (shareBtns.length > 0) {
        const randomIndex = getRandomIntBetween(temp, shareBtns.length);
        logger(randomIndex);
        await scrollSmoothIfElementNotExistOnScreen(shareBtns[randomIndex]);
        await delay(1000);
        await clickElement(shareBtns[randomIndex])
        temp = randomIndex;
        await delay(randomDelay);
          // choose share option
        const buttons = await getElements(page, '[class="native-text"]');
        for (let i = 0; i < buttons.length; i++) {
          const btn = await page.evaluate((el) => {
            return el.innerHTML;
          }, buttons[i]);
  
         if (btn.includes("󱤱")) {
            await clickElement(buttons[i]);
            break;
          }
        }
          await delay(1000);
          logger('Đã chọn option 1');
          // click post
          const postSelector = '#screen-root > div > div > div > div > div > div > button';
          const postBtn = await getElement(page, postSelector, 10);
          if (!postBtn) return {
            isClick: false,
            newIndex: temp
          };
          await delay(1000);
          await clickElement(postBtn);
          await delay(randomDelay);
          logger('Đã share xong');
      }
      return {
        isClick: true,
        newIndex: temp
      };
    } catch (error) {
      logger(error);
      return false;
    }
  };
  const randomComment = async (page, newsfeed, commentBtns, temp) => {
    let randomDelay = getRandomIntBetween(newsfeed.delayTimeStart * 1000, newsfeed.delayTimeEnd * 1000);
    let isClick = false;
    if (commentBtns.length > 0) {
      const randomIndex = getRandomIntBetween(temp, commentBtns.length);
      logger(randomIndex);
      await scrollSmoothIfElementNotExistOnScreen(commentBtns[randomIndex]);
      await delay(1000);
      await clickElement(commentBtns[randomIndex]);
      temp = randomIndex;
        await delay(2000);
        // find comment area
        const commentAreaSelector = 'textarea[type="text"]';
        const commentArea = await getElement(page, commentAreaSelector, 10);
        if (!commentArea) return {
          isClick: isClick,
          newIndex: temp
        };
        await delay(1000);
        await clickElement(commentArea);
        logger('Đã chọn vùng comment');
        // comment
        let content = newsfeed.commentStrs;
        let randomString = content[getRandomInt(content.length)];
        await delay(2000);
        await page.keyboard.type(randomString, { delay: 100 });
        await delay(2000);
        const postSelector = 'div[aria-label="SEND"]';
        const postBtn = await getElement(page, postSelector, 10);
        if (!postBtn) return {
          isClick: isClick,
          newIndex: temp
        };;
        await delay(2000);
        await clickElement(postBtn);
        await delay(randomDelay);
        // return home
        const returnSelector = '#screen-root > div > div > div > div > div.m.bg-s3 > div:nth-child(1)';
        const returnBtn = await getElement(page, returnSelector, 10);
        if (!returnBtn) return {
          isClick: isClick,
          newIndex: temp
        };
        await delay(2000);
        await clickElement(returnBtn);
        isClick = true;
        await delay(3000);
    }

     return {
      isClick: isClick,
      newIndex: temp
    };
  };
  const findBtn = async (page, content) => {
    try {
      let arr = [];
      const buttons = await getElements(page, '[class="native-text"]');
      for (let i = 0; i < buttons.length; i++) {
        const btn = await page.evaluate((el) => {
          return el.innerHTML;
        }, buttons[i]);
  
        if (btn.includes(content)) {
          arr.push( buttons[i]);
        }
      }
      return arr;
    } catch (err) {
      logger(err);
    }
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
    if (news.randomLike == true && loopLike == 0) {
      let count = 0;
      const homeSelector1 =
      "#screen-root > div > div:nth-child(1) > div:nth-child(4) > div:nth-child(1)";
      if( await checkExistElementOnScreen(page,homeSelector1) != 0) {
        await page.goto("https://m.facebook.com/");
      }
      await delay(3000);
      let numLikes = getRandomIntBetween(news.likeStart, news.likeEnd);
      logger('Cần like ' + numLikes + ' bài');
      let temp = 2;
      for (let i = 0; i < numLikes * 2; i++) {
        try {
          await returnHomePage(page);
          await delay(2000);
          const likeBtns = await findBtn(page, "󰍸");
          if (!likeBtns) {
            logger("Không có nút like!");
            break;
          };
          logger("có " + likeBtns.length + " nút like")
          const objLike = await randomLike(page, news, likeBtns,temp);
          if (objLike.isClick) {
            count++;
            logger('Đã like được '+ count + ' bài');
          } else {
            logger('Like không thành công');
          }
          if (count == numLikes) {
            logger('Xong like !');
            loopLike++;
            break;
          }
          temp = objLike.newIndex
          await delay(randomDelay);
        } catch (error) {
          logger(error);
        }
      }
    }

    if (news.randomShare == true && loopShare == 0) {
      let count = 0;
      let numShares = getRandomIntBetween(news.shareStart, news.shareEnd);
      logger('Cần share ' + numShares + ' bài');
      const homeSelector2 =
      "#screen-root > div > div:nth-child(1) > div:nth-child(4) > div:nth-child(1)";
      if( await checkExistElementOnScreen(page,homeSelector2) != 0) {
        await page.goto("https://m.facebook.com/");
      }
      await delay(3000);
      let temp = 2;
      logger("???");
      for (let i = 0; i < numShares * 2; i++) {
        try {
          const shareBtns = await findBtn(page, "󰍺");
          if (!shareBtns) {
            logger("Không có nút share!");
            break;
          };
          logger("có " + shareBtns.length + " nút share")
          await returnHomePage(page);
          const result = await randomShare(page, news, shareBtns, temp);
          if (result.isClick) {
            count++;
            logger('Đã share được ' + count + ' bài');
          } else {
            logger('Share không thành công');
          }
          if (count == numShares) {
            logger('Xong share!');
            loopShare++;
            break;
          }
          temp = result.newIndex;
          await delay(randomDelay);
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
      const homeSelector1 =
      "#screen-root > div > div:nth-child(1) > div:nth-child(4) > div:nth-child(1)";
      if( await checkExistElementOnScreen(page,homeSelector1) != 0) {
        await page.goto("https://m.facebook.com/");
      }
      await delay(3000);
      const numComments = getRandomIntBetween(news.commentStart, news.commentEnd);
      logger('Cần comment '+  numComments + ' bài');
      let count = 0;
      let temp = 1;
      for (let i = 0; i < numComments * 2; i++) {
        try {
          
          await returnHomePage(page);
          const commentBtns = await findBtn(page, "󰍹");
          if (!commentBtns) {
            logger("Không có nút comment!");
            return false;
          };
          logger("có " + commentBtns.length + " nút comment");
          
          const result = await randomComment(page, news, commentBtns, temp);
          await delay(randomDelay);
          if (result.isClick) {
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
          temp = result.newIndex;
          await delay(randomDelay);
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
