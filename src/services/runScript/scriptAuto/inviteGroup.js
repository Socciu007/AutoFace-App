export const inviteGroup = (setting) => {
  const strSetting = `
      {
        groupFriendsStart: ${setting.groupFriendsStart},
        groupFriendsEnd: ${setting.groupFriendsEnd},
        delayTimeStart: ${setting.delayTimeStart},
        delayTimeEnd: ${setting.delayTimeEnd},
        option:  ${JSON.stringify(setting.option)},
        text: ${JSON.stringify(setting.text)}
      }`;
  console.log(strSetting);
  return `
const inviteGroupBySuggest = async (page, inviteGroupObject) => {
  try {
    let numFriends = getRandomIntBetween(
      inviteGroupObject.groupFriendsStart,
      inviteGroupObject.groupFriendsEnd
    );
    let randomDelay = getRandomIntBetween(
      inviteGroupObject.delayTimeStart * 1000,
      inviteGroupObject.delayTimeEnd * 1000
    );
    logger("Cần mời " + numFriends + " người vào nhóm");
    const inviteBtn = await findBtn(page, '󱤃');
    if (!inviteBtn) {
      logger("Không có nút invite!");
      return false
    };
    await delay(1000);
    await clickElement(inviteBtn);
    await delay(randomDelay);
    let count = 0;
    let isInvite = false;
    for (let i = 0; i < numFriends * 2; i++) {
      // scroll before click
      let temp = getRandomIntBetween(2, 4);
      logger("số lần scroll " + temp);
      while (temp > 0) {
        await scrollByWheel(page, getRandomIntBetween(200, 250));
        await delay(1000);
        temp--;
      }
      let invite =
        "#screen-root > div > div:nth-child(2) > div > div:nth-child(3) > div.m";
      let inviteButtons = await getElements(page, invite, 10);
      if (!inviteButtons) continue;
      let arr = [];
      let newIndex = -1;
      for (let i = 1; i < inviteButtons.length; i++) {
        if (newIndex > i) continue;
        inviteButtons = await getElements(page, invite, 10);
        const inviteId = await page.evaluate((el) => {
          return el.getAttribute("data-action-id");
        }, inviteButtons[i]);
        if (!inviteId) continue;
        // click group on the screen
        const invSelector = 'div[data-action-id="' + inviteId + '"]';
        const inviteButton = await getElement(page, invSelector, 10);
        if (!inviteButton) continue;
        const isOnScreen = await checkExistElementOnScreen(page, invSelector);
        if (isOnScreen == 0) {
          if (arr.length == 3) {
            newIndex = i;
            break;
          }
          arr.push(inviteButtons[i]);
          logger("push to array");
        }
      }
      if (arr.length == 0) return false;
      let randomIndex = getRandomInt(arr.length);
      await delay(1000);
      await clickElement(arr[randomIndex]);
      count++;
      logger("Mời thành công " + count + " người");
      await delay(randomDelay);
      if (count == numFriends) {
        isInvite = true;
        break;
      }
    }
    return isInvite;
  } catch (error) {
    logger(error);
    return false;
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
 const inviteGroupObj = ${strSetting};

  //Check obj start < end ? random(start,end) : random(end,start)
  let inviteGroupObject = await checkObject(inviteGroupObj);
  // check page is live return -1, return 1, return 0
  const isLive = await checkIsLive(page);
  logger("Tình trạng trang web: " + isLive);
  if (!isLive) {
    return -1;
  }
  await returnHomePage(page);
  await delay(2000);
  if (inviteGroupObject.option == "suggestions") {
    let count = 0;
    let UIDList = inviteGroupObject.text;
    for (let i = 0; i < UIDList.length; i++) {
      try {
        let UID = UIDList[i];
        await page.goto('https://m.facebook.com/groups/' + UID );
        const rs = await inviteGroupBySuggest(page, inviteGroupObject);
        if (rs) {
          count++;
          logger("Đã mời bạn bè vào " + count + " nhóm");
        } else {
          logger("Mời không thành công");
        }
        if (count == UIDList.length) break;
        await delay(3000);
      } catch (error) {
        logger(error);
      }
    }
  }
  `;
};
