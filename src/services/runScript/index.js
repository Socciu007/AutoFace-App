import { storageSettings } from '../../common/const.config';
import { createPost } from './scriptAuto/CreatePost';
import { dbGetLocally, getBrowserData, runProfile } from '../../sender';
import { deletePost } from './scriptAuto/DeletePost';
import { postInteract } from './scriptAuto/PostInteraction';
import { viewNoti } from './scriptAuto/ViewNoti';
import { newFeed } from './scriptAuto/NewsFeed';
export const runScript = async (profileSelected, scriptDesign) => {
  window.electron.ipcRenderer.on('ipc-logger', (...params) => {
    console.log(params[0]);
  });

  const settings = await dbGetLocally(storageSettings);

  for (let i = 0; i < profileSelected.length; i++) {
    let arrfunction = [];
    const nodes = scriptDesign.design.nodes;
    const edges = scriptDesign.design.edges.filter((edge) => {
      const check = nodes.find((node) => node.id == edge.target);
      if (check) return true;
      return false;
    });

    const scripts = scriptDesign.script;

    if (edges && edges.length) {
      let node = nodes.find((node) => node.id == edges[0].target);
      while (node) {
        const script = scripts.find((e) => e.id == node.id);
        arrfunction.push(script);
        const edge = edges.find((e) => e.source == node.id);
        if (edge) {
          node = nodes.find((node) => node.id == edge.target);
        } else {
          node = null;
        }
      }
    }
    const browserData = await getBrowserData(profileSelected[i].id);
    if (browserData && browserData.data) {
      const strCode = `
   
    let browser;
    const logger = (...params) => {
      event.reply("ipc-logger", ...params);
    };
    
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  
    const getRandomIntBetween = (min, max) => {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min) + min);
    };

    const getRandomInt = (max) => {
      return Math.floor(Math.random() * max);
    };

    const checkObject = async (obj) => {
      for (const key in obj) {
        if (key.includes('Start') || key.includes('End')) {
          const startKey = key;
          const endKey = key.replace('Start', 'End');
    
          const startValue = obj[startKey];
          const endValue = obj[endKey];
    
          if (endValue < startValue) {
            // Swap values if end is less than start
            obj[startKey] = endValue;
            obj[endKey] = startValue;
          }
        }
      }
    
      return obj;
    };

    const checkExistElementOnScreen = async (page, JSpath) => {
      try {
        const element = await page.$eval(JSpath, (el) => {
          if (el.getBoundingClientRect().top <= 0) {
            return -1;
          } else if (el.getBoundingClientRect().top + el.getBoundingClientRect().height > window.innerHeight) {
            return 1;
          } else {
            return 0;
          }
        });
        return element;
      } catch (error) {
        return error;
      }
    };

    const scrollByWheel = async (page,scrollAmount) => {
      return new Promise(async (resolve) => {
        try {
          setTimeout(() => {
            resolve(true);
          }, 1000);
          await page.mouse.wheel({ deltaY: scrollAmount });
        } catch (err) {
          console.log(err);
        }
        resolve(true);
      });
    };

    const checkExistElement = async (page, JSpath, timeWait_Second) => {
      let flag = true;
      try {
        const tickCount = Date.now();
        const element = await page.$$(JSpath);
        while (element.length === 0) {
          if (Date.now() - tickCount > timeWait_Second * 1000) {
            flag = false;
            break;
          }
    
          if (checkIsLive(page) == false) {
            return -2;
          }
          await delay(1000);
        }
      } catch (error) {
        flag = false;
      }
    
      return flag ? 1 : 0;
    };

    const checkLogin = async (page) => {
      // Retrieve cookies
      const cookies = await page.cookies();
    
      // Check for login status based on cookies or other indicators
      const isLoggedIn = cookies.some((cookie) => cookie.name === 'c_user');
      return isLoggedIn;
    };

    const clickElement = (element) => {
      return new Promise(async (resolve) => {
        try {
          setTimeout(() => {
            resolve(true);
          }, 1000);
          await element.click();
        } catch (err) {
          logger(err);
        }
        resolve(true);
      });
    };

    const returnHomePage = async (page) => {
      const url = await page.url();
      if (url === 'https://m.facebook.com/' || url.includes('https://m.facebook.com/home.php')) {
        logger('URL is correct');
      } else {
        logger('Redirect to homepage');
        await page.goto('https://m.facebook.com/', {
          waitUntil: 'networkidle2',
        });
      }
    };

    const checkIsLive = async (page) => {
      try {
        if (page && !page.isClosed()) {
          return true;
        }
        return false;
      } catch (error) {
        return false;
      }
    };

    const scrollSmoothIfNotExistOnScreen = async (page, JSpath) => {
      try {
        if ((await checkExistElementOnScreen(page, JSpath)) !== 0) {
          await page.evaluate((JSpath) => {
            document.querySelector(JSpath).scrollIntoView({ behavior: 'smooth', block: 'center' });
          }, JSpath);
        }
        return 1;
      } catch (error) {
        return 0;
      }
    };
    
    const getElementByID = async  (
      page,
      id,
      loop = 10,
      visible = false
    ) => {
      let element;
      for (let i = 0; i < loop; i++) {
        try {
          element = await page.$('[id="' + id + '"]', { timeout: 1000, visible });
        } catch (error) {
          element = null;
        }
        if (element) return element;
        await delay(1000);
      }
    };
    
     const waitForNavigation = async (page, timeout = 60000) => {
      try {
        return await page.waitForNavigation({
          waitUntil: "networkidle0",
          timeout,
        });
      } catch (error) {
        return null;
      }
    };
     const waitForNavigation2 = async  (page, timeout = 60000) =>{
      try {
        return await page.waitForNavigation({
          waitUntil: "networkidle2",
          timeout,
        });
      } catch (error) {
        return null;
      }
    };
     const getAllText = async  (page) =>{
      try {
        const text = await page.$eval("*", (el) => el.innerText);
        return text;
      } catch (err) {
        return "";
      }
    };
    
     const getText = async (page, element) => {
      try {
        const text = await page.evaluate((el) => el.innerText, element);
        return text;
      } catch (err) {
        return "";
      }
    };
    
     const getElementByName = async (page, name, loop = 10) => {
      let element;
      for (let i = 0; i < loop; i++) {
        try {
          element = await page.$('[name="' + name + '"]', { timeout: 1000 });
        } catch (error) {
          element = null;
        }
        if (element) return element;
        await delay(1000);
      }
    };
    
     const getElement = async (page, selector, loop = 10) => {
      let element;
      for (let i = 0; i < loop; i++) {
        try {
          element = await page.$(selector, { timeout: 1000 });
        } catch (error) {
          element = null;
        }
        if (element) return element;
        await delay(1000);
      }
    };
    
     const getElements = async (page, selector, loop = 10) => {
      let elements;
      for (let i = 0; i < loop; i++) {
        try {
          elements = await page.$$(selector, { timeout: 1000 });
        } catch (error) {
          elements = null;
        }
        if (elements && elements.length) return elements;
        await delay(1000);
      }
    };
    
     const getElementByClass = async (page, name, loop = 10) => {
      let element;
      for (let i = 0; i < loop; i++) {
        try {
          element = await page.$('[class="' + name + '"]', { timeout: 1000 });
        } catch (error) {
          element = null;
        }
        if (element) return element;
        await delay(1500);
      }
    };
  
    const getElementEmail = async (page) => {
      for (let i = 0; i < 60; i++) {
        logger("GET Email");
        let email;
        email = await getElementByID(page, "m_login_email", 1);
        if (email) return email;
        else {
          email = await getElementByID(page, "email", 1);
          if (email) {
            return email;
          } else {
            email = await getElementByName(page, "email", 1);
            if (email) return email;
            else{
              email = await getElement(page, '[type="email"]', 1);
              if (email) return email;
            }
          }
        }
        await delay(500);
      }
      return null;
    };
  
    const getElementPassword = async (page) => {
      try {
        let password;
        password = await getElement(page, '[type="password"]');
        if (!password) password = await getElementByID(page, "pass");
        return password;
      } catch (err) {
        return null;
      }
    };
  
    const getInputText = async function (page, element) {
      try {
        return await page.evaluate((x) => x.value, element);
      } catch (err) {
        return "";
      }
    };
    try {
     browser = await puppeteer.launch({
              executablePath: "${browserData.executablePath}",
              devtools: false,
              dumpio: true,
              headless: false,
              defaultViewport: null,
              args: [
                "--user-data-dir=${browserData.pathProfile}",
                "--hidemyacc-data=${browserData.data}",
                "--disable-encryption",
                "--donut-pie=undefined",
                "--proxy-bypass-list=https://static.xx.fbcdn.net",
                "--flag-switches-begin",
                "--flag-switches-end",
                "--window-size=360,640"
              ]
            });
  
            const page = await browser.newPage();
            await page.setBypassCSP(true);
            await page.setCacheEnabled(false);
            const session = await page.target().createCDPSession();
            await session.send("Page.enable");
            await session.send("Page.setWebLifecycleState", { state: "active" });
            
            ${getAllFunc(arrfunction)}
           
          } catch (error) {
              logger(error);
            } finally {
              if(browser){
                  await browser.close();
              }
              
             
            }
            
            return true;
      `;

      const result = await runProfile(strCode);
      console.log(result);
    } else {
      return false;
    }
  }
};

const getAllFunc = (arrfunction) => {
  let funcStr = '';
  arrfunction.forEach((e) => {
    funcStr += convertToFunc(e);
  });
  return funcStr;
};

const convertToFunc = (script) => {
  switch (script.type) {
    case 'newsFeed':
      return `{
        ${newFeed(script)}
      }`;
    case 'createPost':
      return `{
        ${createPost(script)}
      }`;
    case 'viewNoti':
      return `{
        ${viewNoti(script)}
      }`;
    case 'replyMsg':
      return `{
        ${replyMsg(script)}
      }`;
    case 'sendMsg':
      return `{
        ${sendMsg(script)}
      }`;
    case 'deletePost':
      return `{
        ${deletePost(script)}
      }`;
    case 'postInteract':
      return `{
        ${postInteract(script)}
      }`;
    default:
      return `logger("Can't find func");`;
  }
};

const replyMsg = (setting) => {
  // let replyMsgObj = {
  //   numsFriendStart: 2,
  //   numsFriendEnd: 5,
  //   waitTimeStart: 10,
  //   waitTimeEnd: 15,
  //   message: ["Hello", "Hi"],
  // };
  console.log(setting);
  const strSetting = `{
    numsFriendStart: ${setting.numberFriendStart},
    numsFriendEnd: ${setting.numberFriendEnd},
    waitTimeStart: ${setting.delayTimeStart},
    waitTimeEnd: ${setting.delayTimeEnd},
    message: ${JSON.stringify(setting.text)},
  }`;
  return `
    const accessPageByHref = async (page, namePage, href, indexHref) => {
      if (href.length > 0) {
        const hrefPage = href.filter(e => e.includes(namePage));
        if (hrefPage.length > 0) {
          const index = indexHref ? indexHref : getRandomInt(hrefPage.length);
          const selector =
          '[href="' +
          hrefPage[index].replace("https://mbasic.facebook.com", "") +
          '"]';
          const clickBtn = await getElement(page, selector);
  
          if (clickBtn) {
            await scrollSmoothIfNotExistOnScreen(page, selector);
            await clickBtn.click();
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      } else {
        return false;
      }
    };

    const replyMsg = async (page, msgs) => {
      // select msg to send and send msg
      if (msgs.length < 3) {
        for (const msg of msgs) {
          const inputMsgSelector = "table > tbody > tr > td > textarea";
          const checkExistInputMsg = await checkExistElement(
            page,
            inputMsgSelector,
            3
          );
          if (checkExistInputMsg != 1) {
            logger("no element exists to enter message");
            return 0;
          }
          await page.type(inputMsgSelector, msg);
          await delay(getRandomIntBetween(3000, 5000));
    
          const sendMsgSelector = 'table > tbody > tr > td > input[value="Send"]';
          const checkExistSendMsg = await checkExistElement(
            page,
            sendMsgSelector,
            3
          );
          if (checkExistSendMsg != 1) {
            logger("no element exists to send message");
            return 0;
          }
          await clickElement(page, sendMsgSelector);
    
          //random wait time to send next messages
          await delay(getRandomIntBetween(15000, 30000));
        }
        return 1;
      } else {
        let countMsg = 0;
        while (countMsg < getRandomIntBetween(1, 3)) {
          //random wait time to send next messages
          await delay(getRandomIntBetween(15000, 30000));
    
          const msgRandom = msgs[getRandomInt(msgs.length)];
          const inputMsgSelector = "table > tbody > tr > td > textarea";
          const checkExistInputMsg = await checkExistElement(
            page,
            inputMsgSelector,
            3
          );
          if (checkExistInputMsg != 1) {
            logger("no element exists to enter message");
            return 0;
          }
          await page.type(inputMsgSelector, msgRandom);
          await delay(getRandomIntBetween(3000, 5000));
          const sendMsgSelector = 'table > tbody > tr > td > input[value="Send"]';
          const checkExistSendMsg = await checkExistElement(
            page,
            sendMsgSelector,
            3
          );
          if (checkExistSendMsg != 1) {
            logger("no element exists to send message");
            return 0;
          }
          await scrollSmoothIfNotExistOnScreen(page, sendMsgSelector);
          await clickElement(page, sendMsgSelector);
          await delay(getRandomIntBetween(3000, 5000));
          countMsg++;
        }
        return 1;
      }
    };
    
    const replyMsgObj = ${strSetting}
    try {
      // check page is live reutrn -1, return 1, return 0
      const isLive = await checkIsLive(page);
      if (!isLive) {
        return -1;
      }
      // check cookie xem login
      const isCookie = await checkLogin(page);
      if (!isCookie) {
        logger("You not log in facebook");
        return;
      }
  
      // check auth fb
      let url = await page.url();
      if (url.includes("mbasic.facebook.com/checkpoint")) {
        logger("Account facebook not is auth");
        return;
      }
  
      let countFriend = 0;
      const numsFriend =
        replyMsgObj.numsFriendStart < replyMsgObj.numsFriendEnd
          ? getRandomIntBetween(
              replyMsgObj.numsFriendStart,
              replyMsgObj.numsFriendEnd
            )
          : getRandomIntBetween(
              replyMsgObj.numsFriendEnd,
              replyMsgObj.numsFriendStart
            );
  
      while (countFriend < numsFriend) {
        // wait time before read noti
        const waitTime =
          replyMsgObj.waitTimeStart < replyMsgObj.waitTimeEnd
            ? getRandomIntBetween(
                replyMsgObj.waitTimeStart * 1000,
                replyMsgObj.waitTimeEnd * 1000
              )
            : getRandomIntBetween(
                replyMsgObj.waitTimeEnd * 1000,
                replyMsgObj.waitTimeStart * 1000
              );
        await delay(waitTime);
  
        // tim nut message và click sang trang mesage to reply
        let hrefs = await page.$$eval("a", links => links.map(a => a.href));
        const isAccessMessage = await accessPageByHref(page, "/messages", hrefs);
  
        if (isAccessMessage) {
          await delay(getRandomIntBetween(3000, 5000));
          // check sang trang chat ?
          // url = await page.url();
          // if (!url.includes("/messages")) {
          //   logger("Messages page has not been loaded");
          //   await returnHomePage(page);
          //   await replyMessage(page);
          // }
        } else {
          logger("Error access to messages page");
          return;
        }
  
        // chon ban be de gui tin nhan
        hrefs = await page.$$eval("a", links => links.map(a => a.href));
        const isAccessFriendToReply = await accessPageByHref(
          page,
          "/messages/read",
          hrefs
        );
        if (isAccessFriendToReply) {
          await delay(getRandomIntBetween(3000, 5000));
          const actionReply = await replyMsg(page, replyMsgObj.message);
          if (actionReply == 1) {
            await delay(getRandomIntBetween(3000, 5000));
            await returnHomePage(page);
            countFriend++;
            logger("Count friend send msg", countFriend + 1);
          } else if (actionReply == 0) {
            await delay(getRandomIntBetween(3000, 5000));
            await returnHomePage(page);
            countFriend;
            logger("Count friend send msg", countFriend + 1);
          }
        }
      }
    } catch (error) {
      logger(error.message);
    }
  `;
};

const sendMsg = (setting) => {
  console.log(setting);
  const strSetting = `{
    postStart: ${setting.postStart},
    postEnd: ${setting.postEnd},
    delayTimeStart: ${setting.delayTimeStart},
    delayTimeEnd: ${setting.delayTimeEnd},
    text: ${JSON.stringify(setting.text)},
    UID: ${JSON.stringify(setting.UID)},
    option: ${JSON.stringify(setting.option)},
  }`;
  return `
    const accessPageByHref = async (page, namePage, href, indexHref) => {
      if (href.length > 0) {
        const hrefPage = href.filter(e => e.includes(namePage));
        if (hrefPage.length > 0) {
          const index = indexHref ? indexHref : getRandomInt(hrefPage.length);
          const selector =
          '[href="' +
          hrefPage[index].replace("https://mbasic.facebook.com", "") +
          '"]';
          const clickBtn = await getElement(page, selector);
  
          if (clickBtn) {
            await scrollSmoothIfNotExistOnScreen(page, selector);
            await clickBtn.click();
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      } else {
        return false;
      }
    };

    const sendMsg = async (page, msgs) => {
  // select msg to send and send msg
  if (msgs.length < 3) {
    for (const msg of msgs) {
      const inputMsgSelector = "table > tbody > tr > td > textarea";
      const checkExistInputMsg = await checkExistElement(
        page,
        inputMsgSelector,
        3
      );
      if (checkExistInputMsg != 1) {
        logger("no element exists to enter message");
        return 0;
      }
      await page.type(inputMsgSelector, msg);
      await delay(getRandomIntBetween(3000, 5000));

      const sendMsgSelector = 'table > tbody > tr > td > input[value="Send"]';
      const checkExistSendMsg = await checkExistElement(
        page,
        sendMsgSelector,
        3
      );
      if (checkExistSendMsg != 1) {
        logger("no element exists to send message");
        return 0;
      }
      await clickElement(page, sendMsgSelector);

      //random wait time to send next messages
      await delay(getRandomIntBetween(10000, 30000));
    }
    return 1;
  } else {
    let countMsg = 0;
    while (countMsg < getRandomIntBetween(1, 3)) {
      //random wait time to send next messages
      await delay(getRandomIntBetween(15000, 30000));

      const msgRandom = msgs[getRandomInt(msgs.length)];
      const inputMsgSelector = "table > tbody > tr > td > textarea";
      const checkExistInputMsg = await checkExistElement(
        page,
        inputMsgSelector,
        3
      );
      if (checkExistInputMsg != 1) {
        logger("no element exists to enter message");
        return 0;
      }
      await page.type(inputMsgSelector, msgRandom);
      await delay(getRandomIntBetween(3000, 5000));
      const sendMsgSelector = 'table > tbody > tr > td > input[value="Send"]';
      const checkExistSendMsg = await checkExistElement(
        page,
        sendMsgSelector,
        3
      );
      if (checkExistSendMsg != 1) {
        logger("no element exists to send message");
        return 0;
      }
      await scrollSmoothIfNotExistOnScreen(page, sendMsgSelector);
      await clickElement(page, sendMsgSelector);
      await delay(getRandomIntBetween(3000, 5000));
      countMsg++;
    }
    return 1;
  }
};
    
    const sendMsgObj = ${strSetting}
    try {
      // check page is live reutrn -1, return 1, return 0
      const isLive = await checkIsLive(page);
      if (!isLive) {
        return -1;
      }
      // check cookie xem login
      const isCookie = await checkLogin(page);
      if (!isCookie) {
        logger("You not log in facebook");
        return;
      }
  
      // check auth fb
      let url = await page.url();
      if (url.includes("mbasic.facebook.com/checkpoint")) {
        logger("Account facebook not is auth");
        return;
      }
      let countFriend = 0;
      const numsFriend =
        sendMsgObj.postStart < sendMsgObj.postEnd
          ? getRandomIntBetween(sendMsgObj.postStart, sendMsgObj.postEnd)
          : getRandomIntBetween(sendMsgObj.postEnd, sendMsgObj.postStart);
  
      while (countFriend < numsFriend) {
        // wait time before send msg
        const waitTime =
          sendMsgObj.delayTimeStart < sendMsgObj.delayTimeEnd
            ? getRandomIntBetween(
                sendMsgObj.delayTimeStart * 1000,
                sendMsgObj.delayTimeEnd * 1000
              )
            : getRandomIntBetween(
                sendMsgObj.delayTimeEnd * 1000,
                sendMsgObj.delayTimeStart * 1000
              );
        await delay(waitTime);
  
        // check have special friend ?
        if (sendMsgObj.UID.length === 0) {
          // access chat page
          let hrefs = await page.$$eval("a", links => links.map(a => a.href));
          const isAccessChat = await accessPageByHref(page, "/buddylist", hrefs);
          if (isAccessChat) {
            await delay(getRandomIntBetween(3000, 5000));
          } else {
            logger("Error access to chat page");
            return;
          }
  
          //access to friend to send msg
          hrefs = await page.$$eval("a", links => links.map(a => a.href));
          const isAccessFriendToSend = await accessPageByHref(
            page,
            "/messages/read",
            hrefs
          );
          if (isAccessFriendToSend) {
            //send msg
            await delay(getRandomIntBetween(3000, 5000));
            await sendMsg(page, sendMsgObj.text);
            await delay(getRandomIntBetween(5000, 10000));
            await returnHomePage(page);
          } else {
            logger("Error access to friendToSend page");
            return;
          }
        } else if (countFriend < sendMsgObj.UID.length) {
          // access profile page
          const hrefsProfile = await page.$$eval("a", links =>
            links.map(a => a.href)
          );
          if (hrefsProfile.length > 0) {
            const hrefPage = hrefsProfile.filter(
              e =>
                e.includes("/profile") &&
                e.includes("header") &&
                e.includes("home")
            );
            const index = getRandomInt(hrefPage.length);
            const selectorProfilePage = '[href="' +
            hrefPage[index].replace("https://mbasic.facebook.com", "") +
            '"]';
            const clickBtnProfilePage = await getElement(
              page,
              selectorProfilePage
            );
            if (clickBtnProfilePage) {
              await scrollSmoothIfNotExistOnScreen(page, selectorProfilePage);
              await clickBtnProfilePage.click();
            }
            await delay(3000);
          } else {
            logger("No link to access to profile page");
            return;
          }
          // access friend page
          const hrefsFriend = await page.$$eval("a", links =>
            links.map(a => a.href)
          );
          if (hrefsFriend.length > 0) {
            const hrefFriendPage = hrefsFriend.filter(
              e => e.includes("v=friends") && e.includes("/profile")
            );
  
            const index = getRandomInt(hrefFriendPage.length);
            const selectorFriendPage = '[href="' +
            hrefFriendPage[index].replace("https://mbasic.facebook.com", "") +
            '"]';
            const clickBtnFriendPage = await getElement(page, selectorFriendPage);
            if (clickBtnFriendPage) {
              await scrollSmoothIfNotExistOnScreen(page, selectorFriendPage);
              await clickBtnFriendPage.click();
            }
            await delay(3000);
          } else {
            logger("No link to access to friend page");
            return;
          }
  
          //find special friend to send msg
          const hrefsSpecial = await page.$$eval("a", links =>
            links.map(a => a.href)
          );
          if (hrefsSpecial.length > 0) {
            let hrefPage = hrefsSpecial.filter(e =>
              e.includes(sendMsgObj.UID[countFriend])
            );
  
            if (hrefPage.length === 1) {
              //select special friend
              const selectorSpecialFriend = '[href="' +
              hrefPage[0].replace("https://mbasic.facebook.com", "") +
              '"]';
              const findSpecialFriendBtn = await scrollSmoothIfNotExistOnScreen(
                page,
                selectorSpecialFriend
              );
              if (findSpecialFriendBtn === 1) {
                await clickElement(page, selectorSpecialFriend);
                await delay(getRandomIntBetween(3000, 5000));
              }
  
              // access message of special friend page
              const hrefs = await page.$$eval("a", links =>
                links.map(a => a.href)
              );
              const isAccessMsgToSend = await accessPageByHref(
                page,
                "/messages/thread",
                hrefs,
                0
              );
              if (isAccessMsgToSend) {
                // select msg to send and send msg
                await delay(getRandomIntBetween(3000, 5000));
                await sendMsg(page, sendMsgObj.text);
                await delay(getRandomIntBetween(5000, 10000));
                await returnHomePage(page);
                await delay(getRandomIntBetween(3000, 5000));
              } else {
                logger("No access to message page");
                return;
              }
            }
  
            while (hrefPage.length === 0) {
              const moreFriendSelector = "#m_more_friends > a > span";
              const findMoreFriendBtn = await scrollSmoothIfNotExistOnScreen(
                page,
                moreFriendSelector
              );
              if (findMoreFriendBtn == 1) {
                await clickElement(page, moreFriendSelector);
                await delay(getRandomIntBetween(3000, 5000));
              }
  
              const hrefsSpecial = await page.$$eval("a", links =>
                links.map(a => a.href)
              );
              hrefPage = hrefsSpecial.filter(e =>
                e.includes(sendMsgObj.UID[countFriend])
              );
              //select special friend
              const selectorSpecialFriend = '[href="' +
              hrefPage[0].replace("https://mbasic.facebook.com", "") +
              '"]';
              const findSpecialFriendBtn = await scrollSmoothIfNotExistOnScreen(
                page,
                selectorSpecialFriend
              );
              if (findSpecialFriendBtn === 1) {
                await clickElement(page, selectorSpecialFriend);
                await delay(getRandomIntBetween(3000, 5000));
              }
  
              // access message of special friend page
              const hrefs = await page.$$eval("a", links =>
                links.map(a => a.href)
              );
              const isAccessMsgToSend = await accessPageByHref(
                page,
                "/messages/thread",
                hrefs,
                0
              );
              if (isAccessMsgToSend) {
                // select msg to send and send msg
                await delay(getRandomIntBetween(3000, 5000));
                await sendMsg(page, sendMsgObj.text);
                await delay(getRandomIntBetween(5000, 10000));
                await returnHomePage(page);
                await delay(getRandomIntBetween(3000, 5000));
              } else {
                logger("No access to message page");
                return;
              }
            }
          } else {
            logger(
              "You do not have any friends yet. Please add more friends"
            );
            return;
          }
        } else {
          return;
        }
  
        await delay(getRandomIntBetween(3000, 5000));
        logger("Count friend send msg", countFriend + 1);
        countFriend++;
      }
    } catch (error) {
      logger(error.message);
    }
  `;
};
