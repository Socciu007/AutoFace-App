export const addFriend = (setting) => {
  const strSetting = `
      {
        option: ${JSON.stringify(setting.option)},
        requestsStart: ${setting.requestsStart},
        requestsEnd: ${setting.requestsEnd},
        postStart: ${setting.postStart},
        postEnd: ${setting.postEnd},
        delayTimeStart: ${setting.delayTimeStart},
        delayTimeEnd: ${setting.delayTimeEnd},
        delayTimeInteractStart: ${setting.delayTimeInteractStart},
        delayTimeInteractEnd: ${setting.delayTimeInteractEnd},
        isOnlyAddFriend: ${setting.isOnlyAddFriend},
        isLiked: ${setting.isLiked},
        isInteract: ${setting.isInteract},
        isComment: ${setting.isComment},
        stopTime: ${setting.stopTime},
        comment: ${JSON.stringify(setting.comment)},
        text:${JSON.stringify(setting.text)},
      }`;
  console.log(strSetting);
  return `
  const addFriendBySuggest = async (page, addFriendObject) => {
    try {
      let randomDelay = getRandomIntBetween(addFriendObject.delayTimeStart * 1000, addFriendObject.delayTimeEnd * 1000);
      // check mutual
    let mutualSelector =
      "#screen-root > div > div:nth-child(2) > div> div.m.bg-s3 > div:nth-child(3)";
    let mutualElement = await getElements(page, mutualSelector, 10);
    if (mutualElement.length < 1) {
      mutualSelector =
        "#screen-root > div > div:nth-child(2) > div> div.m.bg-s4 > div:nth-child(3)";
      mutualElement = await getElements(page, mutualSelector, 10);
      if (mutualElement.length < 1) return false;
    }
      let isAddMutual = false;
      for (let i = 0; i < mutualElement.length; i++) {
        let randomIndex = getRandomInt(mutualElement.length);
        // add friend
        const addId = await page.evaluate((el) => {
          return el.parentNode.childNodes[3].getAttribute('data-action-id');
        }, mutualElement[randomIndex]);
        if (!addId) continue;
        const addBtn = await getElement(page, 'div[data-action-id="'+addId+'"]', 10);
        if (!addBtn) continue;
        if (addFriendObject.isOnlyAddFriend == true) {
          const isMutual = await page.evaluate((el) => {
            return el.childNodes.length;
          }, mutualElement[randomIndex]);
          if (isMutual < 2) continue;
          await scrollSmoothIfNotExistOnScreen(page, 'div[data-action-id="'+addId+'"]');
          await delay(1000);
          await clickElement(addBtn);
          await delay(randomDelay);
          isAddMutual = true;
          break;
        }
        if (addFriendObject.isOnlyAddFriend == false) {
          await scrollSmoothIfNotExistOnScreen(page, 'div[data-action-id="'+addId+'"]');
          await delay(1000);
          await clickElement(addBtn);
          await delay(randomDelay);
          isAddMutual = true;
          break;
        }
      }
      return isAddMutual;
    } catch (error) {
      logger(error);
      return false;
    }
  };
  const addFriendByKeyWord = async (page, addFriendObject) => {
  try {
    let randomDelay = getRandomIntBetween(
      addFriendObject.delayTimeStart * 1000,
      addFriendObject.delayTimeEnd * 1000
    );
    const addFriendSelector =
      "#screen-root > div > div:nth-child(2) > div > div.m.bg-s5 > div > div > div:nth-child(2)";
      // scroll before click more button
    let temp = getRandomIntBetween(3, 5);
    logger("số lần scroll " + temp);
    while (temp > 0) {
      await scrollByWheel(page, getRandomIntBetween(200, 300));
      await delay(1000);
      temp--;
    }
    let addBtns = await getElements(page, addFriendSelector, 5);
    if (addBtns.length < 1) return false;
    let isAdd = false;
     let arr = [];
    let newIndex = -1;
    for (let i = 0; i < addBtns.length; i++) {
       if (newIndex > i) continue;
      addBtns = await getElements(page, addFriendSelector, 5);
      let randomIndex = getRandomInt(addBtns.length);
      const addId = await page.evaluate((el) => {
        return el.parentNode.getAttribute("data-action-id");
      }, addBtns[i]);
      if (!addId) continue;
      const addSelector = 'div[data-action-id="' + addId + '"]';
      const addBtn = await getElement(page, addSelector, 10);
      if (!addBtn) continue;
      const isOnScreen = await checkExistElementOnScreen(page, addSelector);
      if (isOnScreen == 0) {
        if (arr.length == 3) {
          newIndex = i;
          break;
        }
        const addBtn = await getElement(page, addSelector, 10);
        if (!addBtn) continue;
        arr.push(addBtns[i]);
        console.log("push to array");
      }
    }
     if (arr.length == 0) return false;
    let randomIndex = getRandomInt(arr.length);
    await delay(1000);
    await clickElement(arr[randomIndex]);
    await delay(randomDelay);
    const rs = await clickAddBtn(page);
    if (!rs) {
      await delay(3000);
      await clickReturn(page);
      logger("click return 1")

      await delay(1000);
      return isAdd;
    }
    await delay(3000);
    await clickReturn(page);
    logger("click return 2")

    await delay(1000);
    isAdd = true;
    return isAdd;
  } catch (error) {
    logger(error);
    return false;
  }
};
  const addFriendByAcceptRequest = async (page, addFriendObject) => {
    try {
      let randomDelay = getRandomIntBetween(addFriendObject.delayTimeStart * 1000, addFriendObject.delayTimeEnd * 1000);
      const isMutualSelector = '#screen-root > div > div:nth-child(2) > div > div:nth-child(4)';
      const mutualElements = await getElements(page, isMutualSelector, 10);
      if (mutualElements.length < 1) return false;
      let isAdd = false;
    let arr = [];
      for (let i = 0; i < mutualElements.length; i++) {
        let randomIndex = getRandomInt(mutualElements.length);
              let index = arr.indexOf(randomIndex);
      if (index == -1) {
        arr.push(randomIndex);
      } else {
        continue;
      }
        let confirmId = await page.evaluate((el) => {
          return el.parentNode.childNodes[4].getAttribute('data-action-id');
        }, mutualElements[randomIndex]);
        if (!confirmId) continue;
        logger(confirmId);
        const confirmSelector = 'div[data-action-id="'+confirmId+'"]';
        const confirmBtn = await getElement(page, confirmSelector, 10);
        if (!confirmBtn) continue;
  
        if (addFriendObject.isOnlyAddFriend == true) {
          const isMutual = await page.evaluate((el) => {
            return el.childNodes.length;
          }, mutualElements[randomIndex]);
          if (isMutual < 1) continue;
          await scrollSmoothIfNotExistOnScreen(page, confirmSelector);
          await delay(1000);
          await clickElement(confirmBtn);
          await delay(randomDelay);
          isAdd = true;
          break;
        }
  
        if (addFriendObject.isOnlyAddFriend == false) {
          await scrollSmoothIfNotExistOnScreen(page, confirmSelector);
          await delay(1000);
          await clickElement(confirmBtn);
          await delay(randomDelay);
          isAdd = true;
          break;
        }
      }
      return isAdd;
    } catch (error) {
      logger(error);
      return false;
    }
  };
  const scroll = async (page, addFriendObject) => {
    let randomScrollTime = getRandomIntBetween(10000, 20000);
    try {
      while (randomScrollTime > 0) {
        let scrollAmount = getRandomIntBetween(300, 400);
        let randomDelay = getRandomIntBetween(
          addFriendObject.delayTimeInteractStart * 1000,
          addFriendObject.delayTimeInteractEnd * 1000,
        );
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
    } catch (error) {
      logger(error);
    }
  };
  const randomComment = async (page, addFriendObject) => {
    let randomDelay = getRandomIntBetween(
      addFriendObject.delayTimeInteractStart * 1000,
      addFriendObject.delayTimeInteractEnd * 1000,
    );
    let commentSelector = '#screen-root > div > div > div > div:nth-child(2) > div > button > span';
    let commentBtns = await getElements(page, commentSelector, 10);
    if (!commentBtns) {
      commentSelector = '#screen-root > div > div > div > div > div:nth-child(2) > div > button > span';
      commentBtns = await getElements(page, commentSelector, 10);
    }
    if (!commentBtns) return false;
  
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
        await delay(2000);
        // find comment area
        const commentAreaSelector = 'textarea[type="text"]';
        const commentArea = await getElement(page, commentAreaSelector, 10);
        if (!commentArea) continue;
        await delay(1000);
        await clickElement(commentArea);
        logger('Đã chọn vùng comment');
        // comment
        let content = addFriendObject.comment;
        let randomString = content[getRandomInt(content.length)];
        await delay(1000);
        await page.keyboard.type(randomString, { delay: 100 });
        await delay(1000);
        const postSelector = 'div[aria-label="SEND"]';
        const postBtn = await getElement(page, postSelector, 10);
        if (!postBtn) continue;
        await delay(1000);
        await clickElement(postBtn);
        await delay(2000);
        // return home
        let returnSelector =
        "#screen-root > div > div > div > div > div.m.bg-s3 > div:nth-child(1)";
        let returnBtn = await getElement(page, returnSelector, 10);
        if (!returnBtn) {
          returnSelector =
            "#screen-root > div > div > div > div > div.m.bg-s4 > div:nth-child(1)";
         returnBtn = await getElement(page, returnSelector, 10);
          if (!returnBtn) continue;
        }
        await delay(1000);
        await clickElement(returnBtn);
        await delay(randomDelay);
        isClick = true;
        break;
      }
    }
    return isClick;
  };
  const randomLike = async (page, addFriendObject) => {
    try {
      let randomDelay = getRandomIntBetween(
        addFriendObject.delayTimeInteractStart * 1000,
        addFriendObject.delayTimeInteractEnd * 1000,
      );
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
  const addFriendByUIDList = async (page, addFriendObject) => {
    try {
      let randomDelay = getRandomIntBetween(addFriendObject.delayTimeStart * 1000, addFriendObject.delayTimeEnd * 1000);
      if (addFriendObject.isInteract == true) {
        let numPosts = getRandomIntBetween(addFriendObject.postStart, addFriendObject.postEnd);
        let isReactLike = false;
        let isComment = false;
        if (addFriendObject.isLiked == true) {
          logger('Cần like ' + numPosts + ' bài');
          let count = 0;
          for (let i = 0; i < numPosts * 2; i++) {
            try {
              await delay(1000)
              await scroll(page, addFriendObject);
               await delay(1000)
              const isLike = await randomLike(page, addFriendObject);
              if (isLike) {
                count++;
                logger('Đã like được ' + count + ' bài');
              } else {
                logger('Like không thành công');
              }
              if (count == numPosts) {
                logger('Xong like !');
                isReactLike = true;
                break;
              }
              await delay(randomDelay);
            } catch (error) {
              logger(error);
            }
          }
        } else {
          isReactLike = true;
        }
        if (addFriendObject.isComment == true) {
          let count = 0;
          if (!addFriendObject.comment.length) {
            logger('Không thể comment với nội dung rỗng!');
            return false;
          }
          logger('Cần comment' + numPosts + 'bài');
          for (let i = 0; i < numPosts * 2; i++) {
            try {
               await delay(1000)
              await scroll(page, addFriendObject);
               await delay(1000)
              const result = await randomComment(page, addFriendObject);
              if (result) {
                count++;
                logger('Đã comment được ' + count + ' bài');
              } else {
                logger('Comment không thành công');
              }
              if (count == numPosts) {
                logger('Xong comment!');
                isComment = true;
                break;
              }
              await delay(randomDelay);
            } catch (error) {
              logger(error);
            }
          }
        } else {
          isComment = true;
        }
        if ((isReactLike = false || isComment == false)) {
          return false;
        }
      }
      const rs = await clickAddBtn(page);
      if (!rs) return false;
      return true;
    } catch (error) {
      logger(error);
      return false;
    }
  };
  const addFriendByGroupMember = async (page, addFriendObject) => {
  try {
    let randomDelay = getRandomIntBetween(
      addFriendObject.delayTimeStart * 1000,
      addFriendObject.delayTimeEnd * 1000
    );
    const groupSelector =
      "#screen-root > div > div:nth-child(2) > div:nth-child(4) > div.m.bg-s4 > div:nth-child(1)";
    const groupBtn = await getElement(page, groupSelector, 10);
    if (!groupBtn) return false;
    await clickElement(groupBtn);
    await delay(randomDelay);
    // click member
    const memberSelectors = "#screen-root > div > div:nth-child(2) > div";
    let allMember = await getElements(page, memberSelectors, 10);
    if (allMember.length < 1) return false;
    // scroll before click more button
    await scroll(page, addFriendObject);
    await delay(1000);
    let temp = getRandomIntBetween(3, 7);
    logger("Số lần scroll " + temp);
    while (temp > 0) {
      await scrollByWheel(page, getRandomIntBetween(200, 300));
      await delay(1000);
      temp--;
    }
    let isAdd = false;
    for (let i = 0; i < allMember.length; i++) {
      allMember = await getElements(page, memberSelectors, 10);
      let randomIndex = getRandomIntBetween(11, allMember.length);
      logger("random index" + randomIndex);
      const memberSelector = '#screen-root > div > div:nth-child(2) > div:nth-child(' + randomIndex + ')';
      const isOnScreen = await checkExistElementOnScreen(page, memberSelector);
      await delay(1000);
      if (isOnScreen == 0) {
        const memberElement = await getElement(page, memberSelector, 10);
        if (!memberElement) return false;
        await delay(2000);
        await clickElement(memberElement);
        await delay(randomDelay);
        const rs = await clickAddBtn(page);
        if (!rs) {
          await delay(1000);
          await clickReturn(page);
          await scrollByWheel(page, getRandomIntBetween(200, 300));
          continue;
        }
        await delay(1000);
        await clickReturn(page);
        isAdd = true;
        break;
      }
    }
    return isAdd;
  } catch (error) {
    logger(error);
    return false;
  }
};
 const addFriendByFriendOfFriend = async (page, addFriendObject) => {
  try {
    let randomDelay = getRandomIntBetween(
      addFriendObject.delayTimeStart * 1000,
      addFriendObject.delayTimeEnd * 1000
    );
    const fofSelector =
      "#screen-root > div > div:nth-child(2) > div:nth-child(7) > div";
    const followerSelector =
      "#screen-root > div > div:nth-child(2) > div:nth-child(4) > div:nth-child(10)";
    const fofElements = await getElements(page, fofSelector, 3);
    const followElement = await getElement(page, followerSelector, 3);
    if (followElement) return false;
    if (fofElements.length < 1) return false;
    let randomIndex = getRandomIntBetween(3, fofElements.length);
    const fof = '#screen-root > div > div:nth-child(2) > div:nth-child(7) > div:nth-child(' + randomIndex +')';
    const fofBtn = await getElement(page, fof, 3);
    if (!fofBtn) return false;
    await scrollByWheel(page, 300);
    await scrollSmoothIfNotExistOnScreen(page, fof);
    await delay(1000);
    await clickElement(fofBtn);
    await delay(randomDelay);
    const rs = await clickAddBtn(page);
    await delay(3000)
    if (!rs) {
      return false;
    }
    return true;
  } catch (error) {
    logger(error);
    return error;
  }
};
  const clickAddBtn = async (page) => {
    try {
      // TH1 nút add nằm ở vị trí đầu tiên
      let addFriendIcon1 =
        '#screen-root > div > div:nth-child(2) > div:nth-child(5) > div:nth-child(3) > div.m > div > div:nth-child(1) > div > div > span';
      let addFriendSelector1 = '#screen-root > div > div:nth-child(2) > div:nth-child(5) > div:nth-child(3) > div.m';
      let addFriendIcon2 =
        '#screen-root > div > div:nth-child(2) > div:nth-child(5) > div:nth-child(1) > div.m > div > div:nth-child(1) > div > div > span';
      let addFriendSelector2 = '#screen-root > div > div:nth-child(2) > div:nth-child(5) > div:nth-child(1) > div.m';
      let moreSelector = '#screen-root > div > div:nth-child(2) > div:nth-child(5) > div:nth-child(2)';
      let addFriendIcon3 =
        '#screen-root > div.m.bg-s1.dialog-screen > div.m.fixed-container.bottom > div > div > div > div > div.m.bg-s3 > div:nth-child(2) > div > div:nth-child(2) > div > div';
      let addFriendSelector3 =
        '#screen-root > div.m.bg-s1.dialog-screen > div.m.fixed-container.bottom > div > div > div > div > div.m.bg-s3 > div:nth-child(2)';
      // check có btn add ở vị trí 1 và hay không
      let isBtnAdd1 = await checkExistElement(page, addFriendIcon1, 5);
      let isBtnAdd2 = await checkExistElement(page, addFriendIcon2, 5);
      if (isBtnAdd1 == 1) {
        logger("1");
        let Added1 = await getElement(page, addFriendIcon1, 2);
        const isAddIcon1 = await page.evaluate((el) => {
          return el.innerHTML.includes('󱤇');
        }, Added1);
        if (!isAddIcon1) return false;
        if (await clickAddFriendButton(page, addFriendSelector1)) {
          logger('Add thành công');
          return true;
        } else {
          return false;
        }
      } else if (isBtnAdd2 == 1) {
        logger("2");
        let Added2 = await getElement(page, addFriendIcon2, 2);
        const isAddIcon2 = await page.evaluate((el) => {
          return el.innerHTML.includes('󱤇');
        }, Added2);
        if (!isAddIcon2) return false;
        if (await clickAddFriendButton(page, addFriendSelector2)) {
          logger('Add thành công');
          return true;
        } else {
          return false;
        }
        
      } else {
        logger("3");
        const moreBtn = await getElement(page, moreSelector, 3);
        if (!moreBtn) return false;
        await clickElement(moreBtn);
        await delay(2000);
        let Added3 = await getElement(page, addFriendIcon3, 2);
        if (!Added3) {
          addFriendIcon3 =
            '#screen-root > div.m.bg-s1.dialog-screen > div.m.fixed-container.bottom > div > div > div > div > div.m.bg-s4 > div:nth-child(2) > div > div:nth-child(2) > div > div';
        }
  
        Added3 = await getElement(page, addFriendIcon3, 2);
        const isAddIcon3 = await page.evaluate((el) => {
          return el.innerHTML.includes('󱤇');
        }, Added3);
        if (isAddIcon3) {
          if (await clickAddFriendButton(page, addFriendSelector3)) {
            logger('Add thành công');
            return true;
          } else {
            await clickReturn(page);
            logger("click return 3")
            return false;
          }
        } else {
          await clickReturn(page);
          logger("click return 4")
          return false;
        }
      }
    } catch (error) {
      logger(error);
      return false;
    }
  };
  const clickAddFriendButton = async (page, selector) => {
    let addFriendBtn = await getElement(page, selector, 3);
    if (addFriendBtn) {
      await scrollSmoothIfNotExistOnScreen(page, selector);
      await delay(1000);
      await clickElement(addFriendBtn);
      return true;
    }
    return false;
  };
  const clickReturn = async (page) => {
  try {
    const returnSelector =
      "#screen-root > div > div.m.fixed-container.top > div > div.m.bg-s3 > div:nth-child(1)";
    const returnBtn = await getElement(page, returnSelector);
    if (!returnBtn)
      await page.goto(
        "https://m.facebook.com/friends/?target_pivot_link=friends"
      );
    await clickElement(returnBtn);
    await delay(1000);
  } catch (error) {
    logger(error);
  }
};

  try {
      const addFriendObj = ${strSetting}
    //Check obj start < end ? random(start,end) : random(end,start)
    await returnHomePage(page);
    let addFriendObject = await checkObject(addFriendObj);
    // check page is live reutrn -1, return 1, return 0
    const isLive = await checkIsLive(page);
    logger('Tình trạng trang web: ' + isLive);
    if (!isLive) {
      return -1;
    }

    let numsAdd = getRandomIntBetween(addFriendObject.requestsStart, addFriendObject.requestsEnd);
    logger('Cần kết bạn với ' + numsAdd + ' người');
    let randomDelay = getRandomIntBetween(addFriendObject.delayTimeStart * 1000, addFriendObject.delayTimeEnd * 1000);
    await delay(randomDelay);
    if (addFriendObject.option == 'suggestions') {
      let count = 0;
      await returnHomePage(page);
      const friendRequestSelector = '#screen-root > div > div:nth-child(1) > div:nth-child(4) > div:nth-child(2)';
      const friendRequestBtn = await getElement(page, friendRequestSelector, 10);
      if (!friendRequestBtn) return false;
      await clickElement(friendRequestBtn);
      await delay(randomDelay);
            // scroll before click
      let temp = getRandomIntBetween(13, 15);
      while (temp > 0) {
        await scrollByWheel(page, getRandomIntBetween(600, 700));
        await delay(1000);
        temp--;
      }
      
      for (let i = 0; i < numsAdd * 2; i++) {
        try {
          await delay(randomDelay);
          const isAddFriend = await addFriendBySuggest(page, addFriendObject);
          if (isAddFriend) {
            count++;
            logger('Đã kết bạn với ' + count + ' người bằng gợi ý');
          } else {
            logger('Kết bạn không thành công');
          }
          if (count == numsAdd) break;
        } catch (error) {
          logger(error);
        }
      }
    }
  
    if (addFriendObject.option == 'keywords') {
      let count = 0;
      await returnHomePage(page);
      // click and search
      const searchSelector =
        '#screen-root > div > div:nth-child(1) > div:nth-child(3) > div > div > div:nth-child(2) > div > div';
      const searchBtn = await getElement(page, searchSelector, 10);
      if (!searchBtn) return false;
      await scrollSmoothIfNotExistOnScreen(page, searchSelector);
      await delay(1000);
      await clickElement(searchBtn);
      await delay(randomDelay);
      // Enter text
      const randomIndex = getRandomInt(addFriendObject.text.length);
      const keyword = addFriendObject.text[randomIndex];
      await page.keyboard.type(keyword, { delay: 100 });
      await delay(1000);
      await page.keyboard.press('Enter');
      await delay(randomDelay);
      // click everyone
      let peopleSelector =
        '#screen-root > div > div:nth-child(2) > div.m.hscroller.no-hscroller > div > div:nth-child(2)';
      let peopleBtn = await getElement(page, peopleSelector, 10);
      if (!peopleBtn) return false;
      await clickElement(peopleBtn);
      await delay(randomDelay);
      for (let i = 0; i < numsAdd * 2; i++) {
        try {
          const isAddFriend = await addFriendByKeyWord(page, addFriendObject);
          if (isAddFriend) {
            count++;
            logger('Đã kết bạn với ' + count + ' người bằng keyword');
          } else {
            logger('Kết bạn không thành công');
          }
          if (count == numsAdd) break;
          await delay(5000);
        } catch (error) {
          logger(error);
        }
      }
    }
  
    if (addFriendObject.option == 'acceptFriendRequests') {
      let count = 0;
      await returnHomePage(page);
      const friendRequestSelector = '#screen-root > div > div:nth-child(1) > div:nth-child(4) > div:nth-child(2)';
      const friendRequestBtn = await getElement(page, friendRequestSelector, 10);
      if (!friendRequestBtn) return false;
      await clickElement(friendRequestBtn);
      await delay(3000);
           await page.goto(
        "https://m.facebook.com/friends/?target_pivot_link=requests"
      );
      await delay(5000);
      const check = await checkExistElement(
        page,
        "#screen-root > div > div:nth-child(2) > div.m.bg-s3 > div > div:nth-child(4)",
        10
      );
      if (check == 1) {
        return false;
      }
      await delay(5000);
      for (let i = 0; i < numsAdd * 2; i++) {
        try {
          const isAddFriend = await addFriendByAcceptRequest(page, addFriendObject);
          if (isAddFriend) {
            count++;
            logger('Đã kết bạn với ' + count + ' người bằng accept request');
          } else {
            logger('Kết bạn không thành công');
          }
          if (count == numsAdd) break;
          await delay(3000);
        } catch (error) {
          logger(error);
        }
      }
    }
  
    if (addFriendObject.option == 'UIDList') {
      let count = 0;
      let UIDList = addFriendObject.text;
      for (let i = 0; i < numsAdd * 2; i++) {
        try {
          await returnHomePage(page);
          let UID = UIDList[getRandomInt(UIDList.length)];
          await page.goto('https://m.facebook.com/profile.php/?id='+UID);
          await delay(randomDelay);
          const isAddFriend = await addFriendByUIDList(page, addFriendObject);
          if (isAddFriend) {
            count++;
            UIDList = UIDList.filter((e) => e !== UID);
            logger('Đã kết bạn với ' + count + ' người bằng UID');
          } else {
            logger('Kết bạn không thành công');
          }
          if (count == numsAdd) break;
          await delay(3000);
        } catch (error) {
          logger(error);
        }
      }
    }
  
    if (addFriendObject.option == 'groupMembers') {
      let count = 0;
      let UIDList = addFriendObject.text;
      await returnHomePage(page);
      for (let i = 0; i < numsAdd * 2; i++) {
        try {
          let UID = UIDList[getRandomInt(UIDList.length)];
          await page.goto('https://m.facebook.com/groups/'+UID);
          await delay(randomDelay);
          const isAddFriend = await addFriendByGroupMember(page, addFriendObject);
          if (isAddFriend) {
            count++;
            logger('Đã kết bạn với ' + count + ' người bằng group member');
          } else {
            logger('Kết bạn không thành công');
          }
          if (count == numsAdd) break;
          await delay(3000);
        } catch (error) {
          logger(error);
        }
      }
    }
  
    if (addFriendObject.option == 'friendOfFriends') {
      let count = 0;
      // check is in homepage
      await returnHomePage(page);
      const friendRequestSelector = '#screen-root > div > div:nth-child(1) > div:nth-child(4) > div:nth-child(2)';
      const friendRequestBtn = await getElement(page, friendRequestSelector, 3);
      if (!friendRequestBtn) return false;
      await clickElement(friendRequestBtn);
      await delay(3000);
      // see your friends
      const yourFriendSelector = '#screen-root > div > div:nth-child(2) > div:nth-child(4) > div > div:nth-child(2)';
      const yourFriendBtn = await getElement(page, yourFriendSelector, 10);
      if (!yourFriendBtn) return false;
      await clickElement(yourFriendBtn);
      await delay(3000);
      await scroll(page, addFriendObject);
      for (let i = 0; i < numsAdd * 2; i++) {
        try {
          const url = await page.url();
          if (
            url ===
              "https://m.facebook.com/friends/?target_pivot_link=friends" ||
            url.includes(
              "https://m.facebook.com/friends/?target_pivot_link=friends"
            )
          ) {
            console.log("URL is correct");
          } else {
            await page.goto(
              "https://m.facebook.com/friends/?target_pivot_link=friends",
              {
                waitUntil: "networkidle2",
              }
            );
            console.log("Redirect to list friend");
          }
          // get all friends
          let friendSelector =
            "#screen-root > div > div:nth-child(2) > div > div.m.bg-s3";
          let friendBtns = await getElements(page, friendSelector, 10);
          if (!friendBtns) {
            friendSelector =
              "#screen-root > div > div:nth-child(2) > div > div.m.bg-s4";
            friendBtns = await getElements(page, friendSelector, 10);
            if (!friendBtns) {
              return false;
            }
          }
          for (let i = 0; i < friendBtns.length; i++) {
            // choose one random friend
            let randomIndex = getRandomInt(friendBtns.length);
            const friendId = await page.evaluate((el) => {
              return el.getAttribute('data-action-id');
            }, friendBtns[randomIndex]);
            // check this friend is on screen
            const check = await checkExistElementOnScreen(page, 'div[data-action-id="'+friendId+'"]');
            if (check == 0) {
              const friendBtn = await getElement(page, 'div[data-action-id="'+friendId+'"]', 10);
              await scrollSmoothIfNotExistOnScreen(page, 'div[data-action-id="'+friendId+'"]');
              await delay(1000);
              await clickElement(friendBtn);
              await delay(3000);
              break;
            }
            // else find until it appear on screen
          }
          const isAddFriend = await addFriendByFriendOfFriend(page, addFriendObject);
          if (isAddFriend) {
            count++;
            logger('Đã kết bạn với ' + count + ' người bằng friend of friend');
          } else {
            logger('Kết bạn không thành công');
          }
          if (count == numsAdd) break;
          await delay(3000);
        } catch (error) {
          logger(error);
        }
      }
    }
  
    if (addFriendObject.option == 'friendOfUID') {
      let count = 0;
      let UIDList = addFriendObject.text;
      for (let i = 0; i < numsAdd * 2; i++) {
        try {
          await returnHomePage(page);
          await delay(randomDelay);
          let UID = UIDList[getRandomInt(UIDList.length)];
          await page.goto('https://m.facebook.com/profile.php/?id='+UID);
          await delay(randomDelay);
          const isAddFriend = await addFriendByFriendOfFriend(page, addFriendObject);
          if (isAddFriend) {
            count++;
            logger('Đã kết bạn với ' + count + ' người bằng friend of UID');
          } else {
            logger('Kết bạn không thành công');
          }
          if (count == numsAdd) break;
          await delay(3000);
        } catch (error) {
          logger(error);
        }
      }
    }
  } catch (err) {
    logger(err);
  }

  
    `;
};
