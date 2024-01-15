export const cancelFriend = (setting) => {
  const strSetting = `
    {
      UID: ${JSON.stringify(setting.UID)},
      delayTimeEnd: ${setting.delayTimeEnd},
      delayTimeStart: ${setting.delayTimeStart},
      numberFriendStart: ${setting.numberFriendStart},
      numberFriendEnd: ${setting.numberFriendEnd},
      optionCancelFriend: ${JSON.stringify(setting.optionCancelFriend)},
      optionUnfriend:${JSON.stringify(setting.optionUnfriend)},
      requestsStart: ${setting.requestsStart},
      requestsEnd: ${setting.requestsEnd},
    }`;
  console.log(strSetting);
  return `
  const unfriendByUID = async (page, cancelObj) => {
    let randomIndex = getRandomInt(cancelObj.UID.length);
    let randomUID = cancelObj.UID[randomIndex];
    let randomDelay = getRandomIntBetween(cancelObj.delayTimeStart * 1000, cancelObj.delayTimeEnd * 1000);
    await page.goto('https://m.facebook.com/profile.php/?id='+randomUID);
    await delay(randomDelay);
    const friendSelector = '#screen-root > div > div:nth-child(2) > div:nth-child(5) > div:nth-child(3) > div.m';
    const friendBtn = await getElement(page, friendSelector, 10);
    if (!friendBtn) return false;
    await clickElement(friendBtn);
    await delay(randomDelay);
    const unfriendSelector =
      '#screen-root > div.dialog-screen > div > div > div > div > div > div.m.bg-s3 > div:nth-child(4) > div';
    const unfriendBtn = await getElement(page, unfriendSelector, 10);
    if (!unfriendBtn) return false;
    await clickElement(unfriendBtn);
    await delay(randomDelay);
    const confirmSelector =
      '#screen-root > div.m.bg-s1.dialog-screen > div.m.dialog-vscroller > div > div > div.m.nb > div > div:nth-child(4)';
    const confirmBtn = await getElement(page, confirmSelector, 10);
    if (!confirmBtn) return false;
    await clickElement(confirmBtn);
    return true;
  };
  
  const unfriendByRandom = async (page, cancelObj) => {
    try {
      let randomDelay = getRandomIntBetween(cancelObj.delayTimeStart * 1000, cancelObj.delayTimeEnd * 1000);
      // click more
      const moreSelector = '#screen-root > div > div > div > div.m.bg-s3 > div > div > div > div > span';
      const moreBtns = await getElements(page, moreSelector, 10);
      if (moreBtns.length < 1) return false;
      // scroll before click more button
      let temp = getRandomIntBetween(3, 7);
      logger(temp);
      while (temp > 0) {
        await scrollByWheel(page, getRandomIntBetween(200, 300));
        await delay(1000);
        temp--;
      }
      // get more button on screen
      for (let i = 0; i < moreBtns.length; i++) {
        let randomIndex = getRandomInt(moreBtns.length);
        const moreId = await page.evaluate((el) => {
          return el.parentNode.parentNode.parentNode.parentNode.getAttribute('data-action-id');
        }, moreBtns[randomIndex]);
        const moreSelector = 'div[data-action-id="'+moreId+'"]';
        const moreBtn = await getElement(page, moreSelector, 10);
        if (!moreBtn) continue;
        const isOnScreen = await checkExistElementOnScreen(page, moreSelector);
        if (isOnScreen == 0) {
          await delay(1000);
          await clickElement(moreBtn);
          break;
        }
      }
      // click unfriend
      const unfriendSelector =
        '#screen-root > div.dialog-screen > div > div > div > div > div > div.m.bg-s3 > div:nth-child(6)';
      const unfriendBtn = await getElement(page, unfriendSelector, 10);
      if (!unfriendBtn) return false;
      await delay(2000);
      await clickElement(unfriendBtn);
      await delay(randomDelay);
      const confirmBtn = await getElement(
        page,
        '#screen-root > div.m.bg-s1.dialog-screen > div.m > div > div > div.m.nb > div > div:nth-child(4)',
        10,
      );
      if (!confirmBtn) {
        await page.goto('https://m.facebook.com/friends/?target_pivot_link=friends');
        return false;
      }
      await clickElement(confirmBtn);
      await delay(1000);
      return true;
    } catch (error) {
      logger(error);
      return false;
    }
  };
  const cancelFriendOnRequest = async (page, cancelObj) => {
    try {
      let randomDelay = getRandomIntBetween(cancelObj.delayTimeStart * 1000, cancelObj.delayTimeEnd * 1000);
      // click delete
      const deleteSelector = '#screen-root > div > div:nth-child(2) > div.m.bg-s48 > div:nth-child(6)';
      const deleteBtns = await getElements(page, deleteSelector, 10);
      if (deleteBtns.length < 1) return false;
      let randomIndex = getRandomInt(deleteBtns.length);
      const deleteId = await page.evaluate((el) => {
        return el.getAttribute('data-action-id');
      }, deleteBtns[randomIndex]);
      const deleteBtn = await getElement(page, 'div[data-action-id="'+deleteId+'"]', 10);
      if (!deleteBtn) return false;
      await scrollSmoothIfNotExistOnScreen(page, 'div[data-action-id="'+deleteId+'"]');
      await delay(randomDelay);
      await clickElement(deleteBtn);
      return true;
    } catch (error) {
      logger(error);
      return false;
    }
  };
  try {
    const cancelFriendObject = ${strSetting}
    //Check obj start < end ? random(start,end) : random(end,start)
    let cancelObj = await checkObject(cancelFriendObject);
    // check page is live reutrn -1, return 1, return 0
    const isLive = await checkIsLive(page);
    logger('Tình trạng trang web:' + isLive);
    if (!isLive) {
      return -1;
    }
    await returnHomePage(page);
    // check is login: get cookie return -1, return 1, return 0
    // const isLoggedIn = await checkLogin(page);
    // logger("Tình trạng đăng nhập:" + isLoggedIn);
    // if (!isLoggedIn) {
    //   return -1;
    // }

    let numCancel = getRandomIntBetween(cancelObj.requestsStart, cancelObj.requestsEnd);
    let randomDelay = getRandomIntBetween(cancelObj.delayTimeStart * 1000, cancelObj.delayTimeEnd * 1000);
    const friendRequestSelector = '#screen-root > div > div:nth-child(1) > div:nth-child(4) > div:nth-child(2)';
    const friendRequestBtn = await getElement(page, friendRequestSelector, 10);
    if (!friendRequestBtn) return false;
    await clickElement(friendRequestBtn);
    await delay(randomDelay);
    if (cancelObj.optionCancelFriend == 'cancelRequest') {
      let count = 0;
      // click see all request
      const seeAllSelector = '#screen-root > div > div:nth-child(2) > div:nth-child(5) > div:nth-child(2)';
      const seeAllBtn = await getElement(page, seeAllSelector, 3);
      if (!seeAllBtn) return false;
      await clickElement(seeAllBtn);
      await delay(randomDelay);
      for (let i = 0; i < numCancel * 2; i++) {
        try {
          await delay(randomDelay);
          const rs = await cancelFriendOnRequest(page, cancelObj);
          if (rs) {
            count++;
            logger('Đã hủy kết bạn với' + count + 'người');
          } else {
            logger('Hủy kết bạn không thành công');
          }
          if (count == numCancel) break;
          await delay(5000);
        } catch (error) {
          logger(error);
        }
      }
    }
    if (cancelObj.optionCancelFriend == 'unfriend') {
      let count = 0;
      let numCancel = getRandomIntBetween(cancelObj.numberFriendStart, cancelObj.numberFriendEnd);
      logger('Cần hủy kết bạn với' + numCancel + 'người');
      await delay(randomDelay);
      if (cancelObj.optionUnfriend == 'random') {
        // click your friend
        const yourFriendSelector = '#screen-root > div > div:nth-child(2) > div:nth-child(4) > div > div:nth-child(2)';
        const yourFriendBtn = await getElement(page, yourFriendSelector, 10);
        if (!yourFriendBtn) return false;
        await clickElement(yourFriendBtn);
        await delay(3000);
        for (let i = 0; i < numCancel * 2; i++) {
          try {
            await delay(randomDelay);
            const rs = await unfriendByRandom(page, cancelObj);
            if (rs) {
              count++;
              logger('Đã hủy kết bạn với' + count + 'người');
            } else {
              logger('Hủy kết bạn không thành công');
            }
            if (count == numCancel) break;
            await delay(5000);
          } catch (error) {
            logger(error);
          }
        }
      }
      if (cancelObj.optionUnfriend == 'UID') {
        for (let i = 0; i < numCancel * 2; i++) {
          try {
            await delay(randomDelay);
            const rs = await unfriendByUID(page, cancelObj);
            if (rs) {
              count++;
              logger('Đã hủy kết bạn với' + count + 'người');
            } else {
              logger('Hủy kết bạn không thành công');
            }
            if (count == numCancel) break;
            await returnHomePage(page);
            await delay(5000);
          } catch (error) {
            logger(error);
          }
        }
      }
    }
  } catch (err) {
    logger(err);
  }
  `;
};
