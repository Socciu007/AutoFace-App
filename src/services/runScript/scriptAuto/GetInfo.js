export const getInfor = (profile) => {
  if (!profile.nameAccount || !profile.friends) {
    return `{
      try {
        const checkPageIsLive = checkIsLive(page);
        if (!checkPageIsLive) {
          logger("Page null!");
          return false;
        }
    
        await page.goto("https://mbasic.facebook.com/profile.php", {
          waitUntil: "networkidle2",
          timeout: 60000,
        });
    
        const elName = await getElement(page, "span strong");
        if (elName) {
          const name = await getText(page, elName);
          await page.goto("https://mbasic.facebook.com/profile.php?v=friends", {
            waitUntil: "networkidle2",
            timeout: 60000,
          });
    
          if (!page.url().includes("friends")) {
            logger("${profile.id}", "Update name:" + name + "|0");
          }
    
          let textFriends = "";
          const elTexts = await getElements(page, "h3", 2);
          for (let i = 0; i < elTexts.length; i++) {
            const text = await getText(page, elTexts[i]);
            if (text.includes("(")) {
              textFriends = text.split("(")[1]
                ? text.split("(")[1].replace(")", "")
                : "";
              break;
            }
          }
          if (textFriends !== "") {
            logger("${profile.id}", "Update name:" + name + "|" + textFriends);
          } else {
            logger("${profile.id}", "Update name:" + name);
          }
        }
      } catch (e) {
        logger(e);
      }
    }
    `;
  }
  return '';
};
