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
  
  const randomShare = async (page, newsfeed) => {
    try {
      let randomDelay = getRandomIntBetween(newsfeed.delayTimeStart * 1000, newsfeed.delayTimeEnd * 1000);
      await delay(getRandomIntBetween(1000,3000));
      // choose share option
      const buttons = await getElements(page, '[class="native-text"]');
        for (let i = 0; i < buttons.length; i++) {
          const btn = await page.evaluate((el) => {
            return el.innerHTML;
          }, buttons[i]);
  
         if (btn.includes("󱤱")){
            await clickElement(buttons[i]);
            break;
          }
        }
        await delay(1000);
        logger('Đã chọn option 1');
        // click post
        const postSelector = '#screen-root > div > div > div > div > div > div > button';
        const postBtn = await getElement(page, postSelector, 10);
        if (!postBtn) return false;
        await delay(1000);
        await clickElement(postBtn);
        await delay(randomDelay);
        logger('Đã share xong');
        return true;
    } catch (error) {
     logger("Debug" + "|" + "NewsFeed" + "|" + "Sharing failed!");
     return false;
    }
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
  const isLive = checkIsLive(page);
  logger('Tình trạng trang web: '+ isLive);
  if (!isLive) {
    logger("Debug" + "|" + "NewsFeed" + "|" + "Page is dead!");
    return -1;
  }

  let randomDelay = getRandomIntBetween(newsfeed.delayTimeStart * 1000, newsfeed.delayTimeEnd * 1000);
  let scrollTime = getRandomIntBetween(newsfeed.scrollTimeStart * 1000, newsfeed.scrollTimeEnd * 1000);
  logger("scroll time " + scrollTime);
  let numLikes = getRandomIntBetween(news.likeStart, news.likeEnd);
  let numShares = getRandomIntBetween(news.shareStart, news.shareEnd);
  let numComments = getRandomIntBetween(news.commentStart, news.commentEnd);
    let like = 0;
  let share = 0; 
  let comment = 0;
  while (scrollTime > 0) {
    try{
    let startTime = Date.now();
     await returnHomePage(page);
    await delay(2000);
    const rs = await scrollSmooth(page, getRandomIntBetween(1, 5));
    if(rs == -2) {
      break;
    }
    await delay(2000);
    let rd = getRandomIntBetween(0, 100);
    logger(rd);
    if (news.randomLike == true && rd <= 34 && like < numLikes) {
        logger('Cần like ' + numLikes + ' bài');
        try {
          let likeBtns = await findBtn(page, "󰍸");
          if (!likeBtns || likeBtns.length == 0) {
            likeBtns = await findBtn(page, "󰤥");
            if(!likeBtns || likeBtns.length == 0){
            logger("Debug" + "|" + "NewsFeed" + "|" + "Can not find any like buttons");
            numLikes = 0;
            }
          };
          for (let i = 0; i < likeBtns.length - 1; i++) {
            const onScreen = await checkExistElementOnScreen1(page, likeBtns[i]);
            if (onScreen == 0) {
              const rd = getRandomIntBetween(0, 100);
              if (rd < 50) {
                await delay(randomDelay);
                    await page.evaluate((el) => {
                  el.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
                }, likeBtns[i]);
                await delay(2000);
                await clickElement(likeBtns[i]);
                await delay(2000);
                like++;
                if (like == numLikes) {
                  logger("Xong like!");
                  break;
                }
                logger("Like thành công " + like + " bài");
                break;
              } else {
                logger("Xem bài viết thành công");
                break;
              }
            }
            if (like == numLikes) {
              logger("Xong like!");
              break;
            }
          }
        } catch (error) {
         logger(error);
        }
      
    } else if (news.randomShare == true && rd <= 68 && share < numShares) {
      logger('Cần share ' + numShares + ' bài');
        try {
          let shareBtns = await findBtn(page, "󰍺");
          if (!shareBtns || shareBtns.length == 0) {
            shareBtns = await findBtn(page, "󰤧");
             if (!shareBtns || shareBtns.length == 0) {
              logger("Debug" + "|" + "NewsFeed" + "|" + "Can not find any share buttons");
              numShares = 0;
             }
          };
          for (let i = 0; i < shareBtns.length; i++) {
          const onScreen = await checkExistElementOnScreen1(page, shareBtns[i]);
          if (onScreen == 0) {
            const rd = getRandomIntBetween(0, 100);
            if (rd < 50) {
              await delay(randomDelay);
              await page.evaluate((el) => {
                 el.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
              }, shareBtns[i]);
              await delay(1000);
              await shareBtns[i].click();
              await delay(2000);
              const isShare = await randomShare(page, news);
              if (isShare) {
                  share++;
                  if (share == numShares) {
                    logger("Xong shares!");
                    break;
                  }
                  logger("Share thành công " + share + " bài");
                  break;
              } else {
                  logger("Share không thành công");
                  break;
              }
            } else {
              logger("Xem bài viết thành công");
              break;
            }
            if (share == numShares) {
              logger("Xong shares!");
              break;
            }
          }
        }
        } catch (error) {
          logger(error);
        }
    } else if (news.randomComment == true && comment < numComments && rd < 100) {
      if (!news.commentStrs.length) {
        logger("Debug" + "|" + "NewsFeed" + "|" + "Cannot comment with empty content!");
        numComments = 0;
      }
      logger('Cần comment '+  numComments + ' bài');
        try {
          let commentBtns = await findBtn(page, "󰍹");
          if (!commentBtns || commentBtns.length == 0) {
            commentBtns = await findBtn(page, "󰤦");
             if (!commentBtns || commentBtns.length == 0) {
              logger("Debug" + "|" + "NewsFeed" + "|" + "Can not find any comment buttons");
              numComments = 0;
             }
          };
          for (let i = 0; i < commentBtns.length; i++) {
            const onScreen = await checkExistElementOnScreen1(page, commentBtns[i]);
            if (onScreen == 0) {
              const rd = getRandomIntBetween(0, 100);
              if (rd < 50) {
                await delay(randomDelay);
                await commentBtns[i].click();
                await delay(2000);
               // find comment area
                const commentAreaSelector = 'textarea[type="text"]';
                const commentArea = await getElement(page, commentAreaSelector, 10);
                if (!commentArea) break;
                await delay(1000);
                await clickElement(commentArea);
                logger('Đã chọn vùng comment');
                // comment
                let content = newsfeed.commentStrs;
                let randomString = content[getRandomInt(content.length)];
                await delay(2000);
                await page.keyboard.type(randomString, { delay: 100 });
                await delay(2000);
                const postBtn = await findBtn(page, "󱛅");
                if (!postBtn || postBtn.length == 0) break;
                await delay(2000);
                await clickElement(postBtn[0]);
                await delay(randomDelay);
                // return home
                const returnSelector = '#screen-root > div > div > div > div > div.m.bg-s3 > div:nth-child(1)';
                const returnBtn = await getElement(page, returnSelector, 10);
                if (!returnBtn) break;
                await delay(2000);
                await clickElement(returnBtn);
                comment++;
                 if (comment == numComments) {
                  logger("Xong comment!");
                 }
                logger("Comment thành công " + comment + " bài");
                break;
              } else {
                logger("Xem bài viết thành công");
                await delay(2000);
                break;
              }
            }
            if (comment == numComments) {
              logger("Xong comment!");
              break;
            }
          }
        } catch (error) {
          logger(error);
        }
      
     
    } else {
      try {
        if (Math.random() < 0.3) {
          await delay(randomDelay);
        }
      } catch (error) {
        logger(error);
      }
    }
    let endTime = Date.now();
    scrollTime -= endTime - startTime;
  } catch(e){
    scrollTime = 0;
    break;
  }
  }
} catch (err) {
  logger(err);
}
    `;
};
