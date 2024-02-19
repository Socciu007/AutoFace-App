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
  const isButtonAboveScreen = async (page, selector) => {
    const buttonPosition = await page.evaluate(selector => {
        const element = document.querySelector(selector);
        if (!element) {
            return null; // Element not found
        }
        const rect = element.getBoundingClientRect();
        return {
            top: rect.top,
            isVisible: rect.top >= 0 && rect.bottom <= window.innerHeight
        };
    }, selector);

    if (buttonPosition === null) {
        console.log('Button not found.');
        return false;
    } else if (buttonPosition.top < 0) {
        console.log('Button is above the screen.');
        return true;
    } else if (!buttonPosition.isVisible) {
        console.log('Button is in the viewport, but not visible.');
        return false;
    } else {
        console.log('Button is in the viewport and visible.');
        return false;
    }
}
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
      if (!mutualElement) return false;
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
          const isAbove = await isButtonAboveScreen(page, 'div[data-action-id="'+addId+'"]');
          if(isAbove) {
            logger("button nằm ở trên viewport !");
            if (Math.random() <= 0.2) { 
              await scrollSmoothIfNotExistOnScreen(page, 'div[data-action-id="'+addId+'"]');
            } else {
              continue;
            }
          } else {
            await scrollSmoothIfNotExistOnScreen(page, 'div[data-action-id="'+addId+'"]');
          }
          
          await delay(1000);
          await clickElement(addBtn);
          await delay(randomDelay);
          isAddMutual = true;
          break;
        }
        if (addFriendObject.isOnlyAddFriend == false) {
          const isAbove = await isButtonAboveScreen(page, 'div[data-action-id="'+addId+'"]');
          if(isAbove) {
            logger("button nằm ở trên viewport !");
            if (Math.random() <= 0.2) { 
              await scrollSmoothIfNotExistOnScreen(page, 'div[data-action-id="'+addId+'"]');
            } else {
              continue;
            }
          } else {
            await scrollSmoothIfNotExistOnScreen(page, 'div[data-action-id="'+addId+'"]');
          }
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
    let temp = getRandomIntBetween(1, 3);
    logger("số lần scroll " + temp);
    await scrollSmooth(page, temp);
    let addBtns = await getElements(page, addFriendSelector, 5);
    if (!addBtns) return false;
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
        logger("push to array");
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
  const addFriendByAcceptRequest = async (page, addFriendObject, mutualElements) => {
    try {
      let randomDelay = getRandomIntBetween(addFriendObject.delayTimeStart * 1000, addFriendObject.delayTimeEnd * 1000);
      
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
  const scroll = async (page, newsfeed) => {
    let randomScrollTime = getRandomIntBetween(3, 7);
    try {
      let randomDelay = getRandomIntBetween(newsfeed.delayTimeStart * 1000, newsfeed.delayTimeEnd * 1000);
      while (randomScrollTime > 0) {
        await page.evaluate(async () => {
          const getRandomIntBetween = (min, max) => {
            return Math.floor(Math.random() * (max - min + 1)) + min;
          };
          const delay = async (time) => {
            return new Promise((resolve) => setTimeout(resolve, time));
          };
          const smoothScrollByStep = (targetPosition, duration) => {
            const startPosition = window.scrollY;
            const distance = targetPosition - startPosition;
            let startTime = null;
  
            const animation = (currentTime) => {
              if (startTime === null) startTime = currentTime;
              const timeElapsed = currentTime - startTime;
              const run = ease(timeElapsed, startPosition, distance, duration);
              window.scrollTo(0, run);
              if (timeElapsed < duration) requestAnimationFrame(animation);
            };
  
            const ease = (t, b, c, d) => {
              t /= d / 2;
              if (t < 1) return (c / 2) * t * t + b;
              t--;
              return (-c / 2) * (t * (t - 2) - 1) + b;
            };
  
            requestAnimationFrame(animation);
          };
          let scrollAmount = getRandomIntBetween(400, 800);
          const targetPosition = window.scrollY + scrollAmount;
          let currentPosition = window.scrollY;
          if (currentPosition < targetPosition) {
            const durationPerStep = getRandomIntBetween(500, 1000);
            const nextPosition = Math.max(currentPosition + scrollAmount, targetPosition);
            smoothScrollByStep(nextPosition, durationPerStep);
            await delay(getRandomIntBetween(1000, 5000));
            await new Promise((resolve) => setTimeout(resolve, durationPerStep));
            currentPosition = nextPosition;
          }
        });
        randomScrollTime--;
      }
      await delay(randomDelay);
      console.log('Đã scroll xong');
    } catch (error) {
      console.log(error);
    }
  };
  
  const randomComment = async (page, addFriendObject, temp,commentBtns, isActionBefore, loop) => {
    let randomDelay = getRandomIntBetween(
      addFriendObject.delayTimeInteractStart * 1000,
      addFriendObject.delayTimeInteractEnd * 1000,
    );
    const check = await scroll(page, addFriendObject);
      if(check == false && isActionBefore == false && loop == 1 ) {
        return {isEnd: true}
      }
    let isClick = false;
    if( temp == commentBtns.length - 1) {
        logger("end");
        return {isEnd: true}
      }
    isActionBefore = false;
    if (commentBtns.length > 0) {
      for (let i = temp + 1 ; i < commentBtns.length * 2; i++) {
        // check selector in screen
        let selector = await page.evaluate((el) => {
          if (!el) return false;
          if (el.innerHTML.includes('󰍹')) {
            const rect = el.getBoundingClientRect();
            return (
              rect.width > 0 &&
              rect.height > 0 &&
              rect.top >= 0 &&
              rect.left >= 0 &&
              rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
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
        temp = i;
        isActionBefore = true;
        break;
      }
    }
      return {
        isComment: isClick,
        newIndex: temp,
        isEnd: false,
        check: isActionBefore,
        loop: 1
      };
  };
  const randomLike = async (page, addFriendObject, temp, likeBtns, isActionBefore, loop) => {
    try {
      let randomDelay = getRandomIntBetween(
        addFriendObject.delayTimeInteractStart * 1000,
        addFriendObject.delayTimeInteractEnd * 1000,
      );
      await delay(1000);
      const check = await scroll(page, addFriendObject);
      if(check == false && isActionBefore == false && loop == 1 ) {
        return {isEnd: true}
      }
      await delay(1000);
      let isClick = false;
      logger(temp);
      if( temp == likeBtns.length - 1) {
        logger("end");
        return {isEnd: true}
      }
      isActionBefore = false;
      for (let i = temp + 1; i < likeBtns.length; i++) {
          // check selector in screen
          let selector = await page.evaluate((el) => {
            if (el.innerHTML.includes('󰍸')) {
              const rect = el.getBoundingClientRect();
              return (
                rect.width > 0 &&
                rect.height > 0 &&
                rect.top >= 50 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
              );
            }
          }, likeBtns[i]);
          if (!selector) {
            continue;
          }
          await delay(1000);
          await clickElement(likeBtns[i]);
          await delay(randomDelay);
          isClick = true;
          temp = i;
          isActionBefore = true;
          break;
        }
      logger("temp: " + temp);

      return {
        isLike: isClick,
        newIndex: temp,
        isEnd: false,
        check: isActionBefore,
        loop: 1
      };
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
          let temp = -1;
          let loop = 0;
          let isActionBefore = false;
          let likeSelector = '#screen-root > div > div > div> div > div:nth-child(1) > div >button > span';
          let likeBtns = await getElements(page, likeSelector, 10);
          if (!likeBtns) {
            likeSelector = '#screen-root > div > div > div > div:nth-child(1) > div > button > span:nth-child(1)';
            likeBtns = await getElements(page, likeSelector, 10);
            if (!likeBtns){
              logger("Không có nút like!");
              return false
            }; 
          }
         
          for (let i = 0; i < numPosts * 2; i++) {
            try {
              likeBtns = await getElements(page, likeSelector, 10);
              if(likeBtns.length < numPosts) numPosts = likeBtns.length;
              const objLike = await randomLike(page, addFriendObject, temp, likeBtns, isActionBefore, loop);
              isActionBefore = objLike.check;
              loop = objLike.loop;
              if(objLike.isEnd == true) break;
              if (objLike.isLike == true) {
                count++;
                logger('Đã like được ' + count + ' bài');
              } else {
                logger('Like không thành công');
              }
              if (count == numPosts) {
                logger('Xong like !');
                break;
              }
              temp = objLike.newIndex;
              await delay(randomDelay);
            } catch (error) {
              logger(error);
            }
          }
          isReactLike = true;
        } else {
          isReactLike = true;
        }
        if (addFriendObject.isComment == true) {
          let count = 0;
          let temp = -1;
          let loop = 0;
          let isActionBefore = false;
          if (!addFriendObject.comment.length) {
            logger('Không thể comment với nội dung rỗng!');
            return false;
          }
          logger('Cần comment ' + numPosts + ' bài');

          let commentSelector = '#screen-root > div > div > div > div:nth-child(2) > div > button > span';
          let commentBtns = await getElements(page, commentSelector, 10);
          if (!commentBtns) {
            commentSelector = '#screen-root > div > div > div > div > div:nth-child(2) > div > button > span';
            commentBtns = await getElements(page, commentSelector, 10);
          if (!commentBtns){
            logger("Không có nút comment!");
            return false
          }; 
    }
    if (!commentBtns) return false;
          for (let i = 0; i < numPosts * 2; i++) {
            try {
              commentBtns = await getElements(page, commentSelector, 10);
              if(commentBtns.length < numPosts) numPosts = commentBtns.length;
              const objComment = await randomComment(page, addFriendObject, temp, commentBtns, isActionBefore, loop);
              isActionBefore = objComment.check;
              loop = objComment.loop;
              if(objComment.isEnd == true) break;
              if (objComment.isComment == true) {
                count++;
                logger('Đã comment được ' + count + ' bài');
              } else {
                logger('Comment không thành công');
              }
              if (count == numPosts) {
                logger('Xong comment!');
                break;
              }
              temp = objComment.newIndex;
              await delay(randomDelay);
            } catch (error) {
              logger(error);
            }
          }
          isComment = true;
        } else {
          isComment = true;
        }
        if ((isReactLike = false || isComment == false)) {
          return false;
        }
      }
      const rs = await clickAddBtn(page);
      await delay(2000);
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
    let numsAdd = getRandomIntBetween(
      addFriendObject.requestsStart,
      addFriendObject.requestsEnd
    );
    
    let groupSelector =
      "#screen-root > div > div:nth-child(2) > div:nth-child(4) > div.m.bg-s4 > div:nth-child(1)";
    let groupBtn = await getElement(page, groupSelector, 10);
    if (!groupBtn) {
      groupSelector =
        "#screen-root > div > div:nth-child(2) > div:nth-child(4) > div.m.bg-s3 > div:nth-child(1)";
      groupBtn = await getElement(page, groupSelector, 10);
      if (groupBtn) {
        await clickElement(groupBtn);
        logger("Click vào group")
        await delay(randomDelay);
      } else {
        let selectorGroup =
          "#screen-root > div > div:nth-child(2) > div:nth-child(4) > div:nth-child(2)";
        let groupInfor = await getElement(page, selectorGroup, 10);
        if(!groupInfor) { logger("Không tìm thấy group infor"); return false};
        await clickElement(groupInfor);
        await delay(3000);
        const iconSelector = "#screen-root > div > div:nth-child(2) > div:nth-child(3) > div:nth-child(2) > div:nth-child(1) > div > div"
        let icon = await getElement(page, iconSelector, 10);
        if(!icon) {logger("Không tìm thấy group icon"); return false};
        const isPrivate = await page.evaluate((el) => {
          return el.innerHTML.includes('󱚼');
        }, icon);
        if(isPrivate) {logger("Group private ! Không kết bạn..."); return false }
        let numsMemberSelector =
          "#screen-root > div > div:nth-child(2) > div:nth-child(4) > div:nth-child(3) > div";
        let member = await getElement(page, numsMemberSelector, 10);
        await clickElement(member);
      }
    } else {
      await clickElement(groupBtn);
        await delay(randomDelay);
    }
    let count = 0;
    let isAdd = false;
    let index = 11;
    for (let i = 0; i < numsAdd * 2; i++) {
      const mem = '#screen-root > div > div:nth-child(2) > div:nth-child(10)';
      await scrollSmoothIfNotExistOnScreen(page, mem);
      await delay(1000);
      // click member
      const memberSelectors = "#screen-root > div > div:nth-child(2) > div";
      let allMember = await getElements(page, memberSelectors, 10);
      if (!allMember) return false;
      logger("Member length: " + allMember.length );
          // scroll before click
      let temp = getRandomIntBetween(2, 4);
      await scrollSmooth(page,temp)
      let arr = [];
      for (let i = index; i < allMember.length; i++) {
        allMember = await getElements(page, memberSelectors, 1);
        const memberSelector = '#screen-root > div > div:nth-child(2) > div:nth-child(' + i + ')';
        const isOnScreen = await checkExistElementOnScreen(
          page,
          memberSelector
        );
        await delay(1000);
        if (isOnScreen == 0) {
          if (arr.length == 3) {
            index = i;
            logger('Index ' + index)
            break;
          }
          const memberElement = await getElement(page, memberSelector, 1);
          if (!memberElement) continue;
          arr.push(memberElement);
          logger("Push to array");
        }
      }
      if (arr.length == 0) continue;
      let randomIndex = getRandomInt(arr.length);
      await delay(2000);
      await clickElement(arr[randomIndex]);
      await delay(randomDelay);
      const rs = await clickAddBtn(page);
      if (!rs) {
        logger("Không click được nút add");
        await delay(1000);
        await clickReturn(page);
        await delay(2000);
        continue;
      }
      count++;
      logger("Đã kết bạn với " + count + " người");
      if (count == numsAdd) {
        isAdd = true;
        break;
      }
      await delay(1000);
      await clickReturn(page);
      await delay(2000);
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
    await scrollSmoothIfNotExistOnScreen(page, fof);
    await delay(1000);
    await clickElement(fofBtn);
    await delay(randomDelay);
    const rs = await clickAddBtn(page);
    await delay(3000)
    if (!rs) {
       await clickReturn(page);
    await delay(2000);
      return false;
    }
    await clickReturn(page);
    await delay(2000);

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
      let moreIconSelector =  '#screen-root > div > div:nth-child(2) > div:nth-child(5) > div:nth-child(2) > div > div > div > div > span'
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
        const moreIcon = await getElement(page, moreIconSelector, 3);
        if(!moreIcon) {logger("không tìm thấy icon more")
            return false;}
        const isIconMore = await page.evaluate((el) => {
          return el.innerHTML.includes('󰟝');
        },  moreIcon);
        if(!moreIcon) {await clickReturn(page);return false} 
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
    let returnSelector =
      "#screen-root > div > div.m.fixed-container.top > div > div.m.bg-s3 > div:nth-child(1)";
    let returnBtn = await getElement(page, returnSelector);
    await delay(1000);
    if (!returnBtn) {
      returnSelector =
      "#screen-root > div > div.m.fixed-container.top > div > div.m.bg-s4 > div:nth-child(1)";
      returnBtn = await getElement(page, returnSelector);
      if (!returnBtn) {
        await page.goto(
        "https://m.facebook.com/friends/?target_pivot_link=friends"
      );
      }
    }
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
      let temp = getRandomIntBetween(10, 13);
      await scrollSmooth(page,temp)
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
        'img[src="https://static.xx.fbcdn.net/rsrc.php/v3/yi/r/9hZDJWHZ1Do.png"]',
        10
      );
      if (check == 1) {
        return false;
      }
      await delay(5000);
      const isMutualSelector = '#screen-root > div > div:nth-child(2) > div > div:nth-child(4)';
      const mutualElements = await getElements(page, isMutualSelector);
      if (!mutualElements)
      {
          logger("Debug" + "|" + "Add friend by accept request" + "|" + "Add friend failed!");
         return false;
      }
      if(mutualElements.length < numsAdd) {
        numsAdd = mutualElements.length;
      }
      if (addFriendObject.isOnlyAddFriend == true) { 
        let numsMutual = 0;
        for( let i = 0 ; i < mutualElements.length; i++){
        const isMutual = await page.evaluate((el) => {
            return el.childNodes.length;
          }, mutualElements[i]);
          if (isMutual < 1){
            continue;
          } else {
            numsMutual++;
          }
        }
      if(numsMutual == 0) {
        logger("Debug" + "|" + "Add friend by accept request" + "|" + "Do not have mutual friend request!");
        return false;
      }
      if(numsMutual < numsAdd){
         numsAdd = numsMutual;
      }
      }
      logger("numsAdd " + numsAdd);
      for (let i = 0; i < numsAdd * 2; i++) {
        try {
          const isAddFriend = await addFriendByAcceptRequest(page, addFriendObject, mutualElements);
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
      if(UIDList.length < numsAdd) { 
        numsAdd = UIDList.length
      }
      for (let i = 0; i < numsAdd; i++) {
        try {
          await returnHomePage(page);
          let UID = UIDList[getRandomInt(UIDList.length)];
          await page.goto('https://m.facebook.com/profile.php/?id='+UID);
          await delay(randomDelay);

          const isAddFriend = await addFriendByUIDList(page, addFriendObject);
          if (isAddFriend) {
            count++;
            logger('Đã kết bạn với ' + count + ' người bằng UID');
          } else {
            logger('Kết bạn không thành công');
          }
          if (count == numsAdd) break;
           UIDList = UIDList.filter((e) => e !== UID);
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
      for (let i = 0; i < UIDList.length; i++) {
        try {
          let UID = UIDList[i];
          await page.goto('https://m.facebook.com/groups/'+UID);
          await delay(randomDelay);
          const isAddFriend = await addFriendByGroupMember(page, addFriendObject);
          if (isAddFriend) {
            count++;
            logger('Đã kết bạn trong ' + count + ' nhóm bằng group member');
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
      let index = 0;
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
            logger("URL is correct");
          } else {
            await page.goto(
              "https://m.facebook.com/friends/?target_pivot_link=friends",
              {
                waitUntil: "networkidle2",
              }
            );
            logger("Redirect to list friend");
          }
    // scroll before click more button
    let temp = getRandomIntBetween(2, 4);
    logger("số lần scroll " + temp);
    await scrollSmooth(page,temp)
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
        let arr= [];
          for (let i = index; i < friendBtns.length; i++) {
            // choose one random friend
            const friendId = await page.evaluate((el) => {
              return el.getAttribute('data-action-id');
            }, friendBtns[i]);
            if(!friendId) continue;
            // check this friend is on screen
            const check = await checkExistElementOnScreen(page, 'div[data-action-id="'+friendId+'"]');
            if (check == 0) {
              if (arr.length == 3) {
                index = i;
                break;
              }
              const friendBtn = await getElement(page, 'div[data-action-id="'+friendId+'"]', 10);
              if (!friendBtn) continue;
              arr.push(friendBtn);
              logger("push to array");
              await delay(1000);
            }
          }
      if (arr.length < 4) return false;
      let randomIndex = getRandomInt(arr.length);
        await delay(1000);
        await page.evaluate((el) => {
              return el.childNodes[1].click();
            }, arr[randomIndex]);
        await delay(1000);
          const isAddFriend = await addFriendByFriendOfFriend(page, addFriendObject);
          if (isAddFriend) {
            count++;
            await clickReturn(page);
            logger('Đã kết bạn với ' + count + ' người bằng friend of friend');
          } else {
            await clickReturn(page);
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
