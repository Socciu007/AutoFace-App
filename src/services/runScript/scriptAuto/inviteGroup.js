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
    console.log("Cần mời " + numFriends + " người vào nhóm");
    let inviteSelector =
      "#screen-root > div > div:nth-child(2) > div:nth-child(4) > div.m.bg-s3 > div:nth-child(2)";
    let inviteBtn = await getElement(page, inviteSelector, 10);
    if (!inviteBtn) {
      inviteSelector =
        "#screen-root > div > div:nth-child(2) > div:nth-child(4) > div.m.bg-s4 > div:nth-child(2)";
      inviteBtn = await getElement(page, inviteSelector, 10);
      if (!inviteBtn) return false;
    }
    await delay(1000);
    await clickElement(inviteBtn);
    await delay(randomDelay);
    let count = 0;
    let isInvite = false;
    for (let i = 0; i < numFriends * 2; i++) {
      // scroll before click
      let temp = getRandomIntBetween(2, 4);
      console.log("số lần scroll " + temp);
      while (temp > 0) {
        await scrollByWheel(page, getRandomIntBetween(200, 250));
        await delay(1000);
        temp--;
      }
      let invite =
        "#screen-root > div > div:nth-child(2) > div > div:nth-child(3) > div.m";
      let inviteButtons = await getElements(page, invite, 10);
      if (inviteButtons.length < 1) continue;
      for (let i = 1; i < inviteButtons.length; i++) {
        inviteButtons = await getElements(page, invite, 10);
        let randomIndex = getRandomInt(inviteButtons.length);
        const inviteId = await page.evaluate((el) => {
          return el.getAttribute("data-action-id");
        }, inviteButtons[randomIndex]);
        if (!inviteId) continue;
        // click group on the screen
        const invSelector = 'div[data-action-id="' + inviteId + '"]';
        const inviteButton = await getElement(page, invSelector, 10);
        if (!inviteButton) continue;
        const isOnScreen = await checkExistElementOnScreen(page, invSelector);
        if (isOnScreen == 0) {
          await delay(1000);
          await clickElement(inviteButton);
          count++;
          console.log("Mời thành công " + count + " người");
          await delay(2000);
          break;
        }
      }
      if (count == numFriends) {
        isInvite = true;
        break;
      }
    }
    return isInvite;
  } catch (error) {
    console.log(error);
    return false;
  }
};  

 const inviteGroupObj = ${strSetting};

  //Check obj start < end ? random(start,end) : random(end,start)
  let inviteGroupObject = await checkObject(inviteGroupObj);
  // check page is live return -1, return 1, return 0
  const isLive = await checkIsLive(page);
  console.log("Tình trạng trang web: " + isLive);
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
          console.log("Đã mời bạn bè vào " + count + " nhóm");
        } else {
          console.log("Mời không thành công");
        }
        if (count == UIDList.length) break;
        await delay(3000);
      } catch (error) {
        console.log(error);
      }
    }
  }
  `;
};
