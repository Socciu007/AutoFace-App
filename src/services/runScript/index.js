import { APP_ID } from '../../common/const.api';
import { storageSettings } from '../../common/const.config';
import { apiStartProfiles } from '../api_helper';
import { exec, getDB } from '../socket';

export const runScript = async (profileSelected, scriptDesign) => {
  let settings;
  const settingStr = await getDB(storageSettings);
  if (settingStr) {
    settings = JSON.parse(settingStr);
  }

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

    console.log(arrfunction);

    const res = await apiStartProfiles(
      profileSelected[i].id,
      JSON.stringify({ params: '--hide-crash-restore-bubble --disable-notifications --window-size=250,800' }),
    );

    const code = `const puppeteer = require("puppeteer-core");
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
 const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};
 const getRandomIntBetween = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
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

 const clickElement = async  (page, selector) => {
  await page.$eval(selector, (e) => e.click());
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
 const checkExistElementOnScreen = async (page, JSpath) => {
  try {
    const element = await page.$eval(JSpath, (el) => {
      if (el.getBoundingClientRect().top <= 0) {
        return -1;
      } else if (
        el.getBoundingClientRect().top + el.getBoundingClientRect().height >
        window.innerHeight
      ) {
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
 const checkExistElement = async (
  page,
  JSpath,
  timeWait_Second
) =>{
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

const checkObject = async (obj) => {
  for (const key in obj) {
    if (key.includes("Start") || key.includes("End")) {
      const startKey = key;
      const endKey = key.replace("Start", "End");

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
}
const checkLogin = async (page) => {
  // Retrieve cookies
  const cookies = await page.cookies();

  // Check for login status based on cookies or other indicators
  const isLoggedIn = cookies.some((cookie) => cookie.name === "c_user");
  return isLoggedIn;
}


 const clearText = async (page) => {
  // Thực hiện chuỗi hành động
  try {
    await delay(2000);
    await page.keyboard.down("Control"); // Giữ phím Shift xuống
    console.log("presscontrol");
    await delay(1000);
    await page.keyboard.press("KeyA"); // Gửi phím ArrowUp
    console.log("pressA");
    await delay(1000);
    await page.keyboard.press("Delete"); // Gửi phím Delete
    console.log("pressDelete");
    await delay(1000);
    await page.keyboard.up("Control"); // Nhả phím Shift
    await delay(2000);
    return 1;
  } catch (error) {
    return error;
  }
};
 const returnHomePage = async (page) => {
  const url = await page.url();
  if (
    url === "https://mbasic.facebook.com/" ||
    url.includes("https://mbasic.facebook.com/home.php?")
  ) {
    console.log("URL is correct");
  } else {
    console.log("Redirect to homepage");
    await page.goto("https://mbasic.facebook.com/home.php", {
      waitUntil: "networkidle2",
    });
  }
};
 const executeScript = async (page, script) => {
  try {
    // Kiểm tra xem trình duyệt có còn sống hay không
    if (!checkIsLive()) {
      return -2;
    }

    // Thực thi đoạn mã JavaScript trên trang web
    const result = await page.evaluate(script);

    // Trả về kết quả
    return result;
  } catch (error) {
    // Xử lý lỗi và xuất thông báo lỗi
    return error;
  }
};
 const getSizeChrome = async (page) => {
  try {
    // Thực thi đoạn mã JavaScript để lấy kích thước của trình duyệt
    const sizeText = await page.evaluate(() => {
      return window.innerHeight + "|" + window.innerWidth;
    });
    // Chuyển đổi kết quả thành Point
    const sizeArray = sizeText.split("|");
    const result = { x: parseInt(sizeArray[1]), y: parseInt(sizeArray[0]) };
    return result;
  } catch (error) {
    return error;
  }
};
 const scrollSmoothIfNotExistOnScreen = async (page, JSpath) => {
  try {
    if ((await checkExistElementOnScreen(page, JSpath)) !== 0) {
      await page.evaluate((JSpath) => {
        document
          .querySelector(JSpath)
          .scrollIntoView({ behavior: "smooth", block: "center" });
      }, JSpath);
    }
    return 1;
  } catch (error) {
    return 0;
  }
};
 const scrollSmooth = async (page, JSpath) => {
  if (!checkIsLive()) {
    return -2;
  }
  try {
    await page.evaluate((JSpath) => {
      document
        .querySelector(JSpath)
        .scrollIntoView({ behavior: "smooth", block: "center" });
    }, JSpath);

    return 1;
  } catch (error) {
    return 0;
  }
};

 

const browser = await puppeteer.connect({
  browserWSEndpoint: "${res.data.data.wsUrl}",
  defaultViewport: null,
});
const key = randomstring.generate({ length: 6 });

if (!global.appws["${APP_ID}"].browsers) {
  global.appws["${APP_ID}"].browsers = {};
}
global.appws["${APP_ID}"].browsers[key] = browser;

try {
  const page = await browser.newPage();
  await page.goto("https://mbasic.facebook.com");
  await delay(10000);
  ${getAllFunc(arrfunction)}
} catch (error) {
  console.log(error);
} finally {
  await browser.close();
  delete global.appws["${APP_ID}"].browsers[key];
}

return true;
`;

    console.log(code);

    if (res && res.success) {
      const data = { key: '1111' };
      await exec(code, data);
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
      return newFeed(script);
    case 'createPost':
      return createPost(script);
    case 'viewNoti':
      return viewNoti(script);
    case 'replyMsg':
      return replyMsg(script);
    case 'sendMsg':
      return sendMsg(script);
    default:
      return `console.log("Can't find func");`;
  }
};

const newFeed = (setting) => {
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
  let randomScrollTime = getRandomIntBetween(
    newsfeed.scrollTimeStart * 1000,
    newsfeed.scrollTimeEnd * 1000
  );
  try {
    while (randomScrollTime > 0) {
      let scrollAmount = getRandomIntBetween(100, 200);
      let randomDelay = getRandomIntBetween(
        newsfeed.delayTimeStart * 1000,
        newsfeed.delayTimeEnd * 1000
      );
      await page.mouse.wheel({ deltaY: scrollAmount });
      let hrefs = await page.$$eval("a", (links) => links.map((a) => a.href));
      if (hrefs.length > 0) {
        hrefs = hrefs.filter((e) => e.includes("/stories.php?aftercursor"));
        for (let i = 0; i < hrefs.length; i++) {
          let seeMoreSelector =
            '[href="' +
            hrefs[i].replace("https://mbasic.facebook.com", "") +
            '"]';
          let isExist = await checkExistElementOnScreen(page, seeMoreSelector);
          if (isExist == 0) {
            const seeMoreBtn = await getElement(page, seeMoreSelector);
            if (seeMoreBtn) {
              await delay(1000);
              await seeMoreBtn.click();
              continue;
            }
          }
        }
      }
      await delay(randomDelay);
      randomScrollTime = randomScrollTime - randomDelay;
    }
  } catch (error) {
    console.log(error);
  }
};
const findReactBtn = async (page) => {
  try {
    let hrefs = await page.$$eval("a", (links) => links.map((a) => a.href));
    if (hrefs.length > 0) {
      hrefs = hrefs.filter((e) => e.includes("/reactions/picker/"));
      let isClick = false;
      for (let i = 0; i < hrefs.length; i++) {
        let reactSelector =
          '[href="' +
          hrefs[i].replace("https://mbasic.facebook.com", "") +
          '"]';
        let isExist = await checkExistElementOnScreen(page, reactSelector);
        if (isExist == 0) {
          const reactBtn = await getElement(page, reactSelector);
          if (reactBtn) {
            await reactBtn.click();
            isClick = true;
            break;
          }
        }
      }
      return isClick;
    }
    return false;
  } catch (error) {
    console.log(error);
  }
};
const clickLike = async (page) => {
  try {
    const unlikeSelector =
      "#root > table > tbody > tr > td > ul > li:nth-child(1) > table > tbody > tr > td > a > div > table > tbody > tr > td:nth-child(3) > span";
    await delay(2000);
    const check = await checkExistElement(page, unlikeSelector, 5);
    if (check == 1) {
      console.log("Đã like từ trước");
      return false;
    }
    const selectorLike =
      "#root > table > tbody > tr > td > ul > li:nth-child(1)";
    const likeBtn = await getElement(page, selectorLike, 10);
    if (likeBtn) {
      await scrollSmoothIfNotExistOnScreen(page, selectorLike);
      await delay(1000);
      await likeBtn.click();
      await delay(1000);
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
};
const randomLikePost = async (page, newsfeed) => {
  try {
    const isClick = await findReactBtn(page);
    if (isClick) {
      let randomDelay = getRandomIntBetween(
        newsfeed.delayTimeStart,
        newsfeed.delayTimeEnd
      );
      await delay(randomDelay);
      const result = await clickLike(page);
      return result;
    }
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};
const findShareBtn = async (page) => {
  try {
    let hrefs = await page.$$eval("a", (links) => links.map((a) => a.href));
    if (hrefs.length > 0) {
      hrefs = hrefs.filter((e) => e.includes("/composer/mbasic/"));
      let isClick = false;
      for (let i = 0; i < hrefs.length; i++) {
        let shareSelector =
          '[href="' +
          hrefs[i].replace("https://mbasic.facebook.com", "") +
          '"]';
        let isExist = await checkExistElementOnScreen(page, shareSelector);
        if (isExist == 0) {
          const shareBtn = await getElement(page, shareSelector);
          if (shareBtn) {
            await shareBtn.click();
            isClick = true;
            break;
          }
        }
      }
      return isClick;
    }
    return false;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const clickShare = async (page) => {
  try {
    const selectorShare = 'input[name="view_post"]';
    const shareBtn = await getElement(page, selectorShare, 10);
    if (shareBtn) {
      await scrollSmoothIfNotExistOnScreen(page, selectorShare);
      await shareBtn.click();
      console.log("Clicked share button");
      await delay(2000);
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
};
const share = async (page, newsfeed) => {
  try {
    const isShare = await findShareBtn(page);
    if (isShare) {
      let randomDelay = getRandomIntBetween(
        newsfeed.delayTimeStart,
        newsfeed.delayTimeEnd
      );
      await delay(randomDelay);
      const result = await clickShare(page);
      return result;
    }
    return false;
  } catch (error) {
    throw error;
  }
};
const comment = async (page, newsfeed) => {
  try {
    const isClick = await findCommentBtn(page);
    if (isClick) {
      let randomDelay = getRandomIntBetween(
        newsfeed.delayTimeStart,
        newsfeed.delayTimeEnd
      );
      await delay(randomDelay);
      console.log("Đang tìm vùng comment");
      const isClickComment = await clickComment(page, newsfeed.commentStrs);
      if (isClickComment) {
        let randomDelay1 = getRandomIntBetween(
          newsfeed.delayTimeStart,
          newsfeed.delayTimeEnd
        );
        await delay(randomDelay1);
        const result = await clickPostComment(page);
        return result;
      }
    }
    return false;
  } catch (error) {
    throw error;
  }
};
const findCommentBtn = async (page) => {
  try {
    let hrefs = await page.$$eval("a", (links) => links.map((a) => a.href));
    if (hrefs.length > 0) {
      hrefs = hrefs.filter((e) => e.includes("/story.php?story_fbid"));
      let isClick = false;
      for (let i = 0; i < hrefs.length; i++) {
        let commentSelector =
          '[href="' +
          hrefs[i].replace("https://mbasic.facebook.com", "") +
          '"]';
        let isExist = await checkExistElementOnScreen(page, commentSelector);
        if (isExist == 0) {
          const commentBtn = await getElement(page, commentSelector);
          if (commentBtn) {
            await scrollSmoothIfNotExistOnScreen(page, commentSelector);
            await delay(1000);
            await commentBtn.click();
            isClick = true;
            break;
          }
        }
      }
      return isClick;
    }
    return false;
  } catch (error) {
    console.log(error);
  }
};
const clickComment = async (page, content) => {
  try {
    let isClick = false;
    const commentArea = 'textarea[name="comment_text"]';
    await delay(3000);
    const checkCommentArea = await checkExistElement(page, commentArea, 5);
    if (checkCommentArea != 1) {
      return isClick;
    }
    await scrollSmoothIfNotExistOnScreen(page, commentArea);
    await delay(2000);
    const textarea = await getElement(page, commentArea, 10);
    await delay(1000);
    await textarea.click();
    await delay(2000);
    if (content.length > 0) {
      const randomIndex = getRandomInt(content.length);
      const text = content[randomIndex];
      await page.keyboard.type(text);
      console.log("đã nhập xong");
      await delay(2000);
    }
    isClick = true;
    return isClick;
  } catch (error) {
    console.log(error);
  }
};
const clickPostComment = async (page) => {
  try {
    const postSelector = "tbody > tr > td.m > div > input";
    const postBtn = await getElement(page, postSelector, 10);
    if (postBtn) {
      await scrollSmoothIfNotExistOnScreen(page, postSelector);
      await delay(1000);
      await postBtn.click();
      await delay(2000);
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
};

    const newsfeed = ${strSetting};
  //Check obj start < end ? random(start,end) : random(end,start)
  let news = await checkObject(newsfeed);
  // check page is live reutrn -1, return 1, return 0
  const isLive = await checkIsLive(page);
  console.log("Tình trạng trang web:", isLive);
  if (!isLive) {
    return -1;
  }
  // check is login: get cookie return -1, return 1, return 0
  // const isLoggedIn1 = await checkLogin(page);
  // console.log("Tình trạng đăng nhập:", isLoggedIn);
  // if (!isLoggedIn1) {
  //   return -1;
  // }
  if (news.randomLike == true) {
    let count = 0;
    let numLikes = getRandomIntBetween(news.likeStart, news.likeEnd);
    console.log("Cần like", numLikes, "bài");
    for (let i = 0; i < numLikes * 2; i++) {
      try {
        await returnHomePage(page);
        await scroll(page, news);
        const isLike = await randomLikePost(page, news);
        if (isLike) {
          count++;
          console.log("Đã like được", count, "bài");
        } else {
          console.log("Like không thành công");
        }
        if (count == numLikes) break;
        await delay(5000);
      } catch (error) {
        console.log(error);
      }
    }
  }

  if (news.randomShare == true) {
    let count = 0;
    let numShares = getRandomIntBetween(news.shareStart, news.shareEnd);
    console.log("Cần share", numShares, "bài");
    for (let i = 0; i < numShares * 2; i++) {
      try {
        await returnHomePage(page);
        await scroll(page, news);
        const result = await share(page, news);
        if (result) {
          count++;
          console.log("Đã share được", count, " bài");
        } else {
          console.log("K tim thay nut share");
        }
        if (count == numShares) break;
        await delay(5000);
      } catch (error) {
        console.log(error);
      }
    }
  }

  if (news.randomComment == true) {
    if (!news.commentStrs.length) {
      console.log("Không thể comment với nội dung rỗng!");
      return false;
    }
    const numComments = getRandomIntBetween(news.commentStart, news.commentEnd);
    console.log("Cần comment", numComments, "bài");
    let count = 0;
    for (let i = 0; i < numComments * 2; i++) {
      try {
        await returnHomePage(page);
        await scroll(page, news);
        const result = await comment(page, news);
        if (result) {
          count++;
          console.log("Đã comment được", count, "bài");
        } else {
          console.log("Comment không thành công");
        }
        if (count == numComments) break;
        await delay(3000);
      } catch (error) {
        console.log(error);
      }
    }
  }
  `;
};

const createPost = (setting) => {
  const strSetting = `
  {
    UID: ${JSON.stringify(setting.UID)},
    delayTimeEnd: ${setting.delayTimeEnd},
    delayTimeStart: ${setting.delayTimeStart},
    isTag:${setting.isTag},
    numberFriendTagEnd: ${setting.numberFriendTagEnd},
    numberFriendTagStart: ${setting.numberFriendTagStart},
    option: ${JSON.stringify(setting.option)},
    photoEnd: ${setting.photoEnd},
    photoStart: ${setting.photoStart},
    photos:${JSON.stringify(setting.photos)},
    postEnd: ${setting.postEnd},
    postStart: ${setting.postStart},
    text: ${JSON.stringify(setting.text)},
    typeTag: ${JSON.stringify(setting.typeTag)},
  }`;
  return `
 const uploadImg = async (page, CreatePost) => {
  try {
    const numberPhoto =
      getRandomIntBetween(CreatePost.photoStart, CreatePost.photoEnd) > CreatePost.photos.length
        ? CreatePost.photos.length
        : getRandomIntBetween(CreatePost.photoStart, CreatePost.photoEnd);
    if (numberPhoto < 3 && numberPhoto > 0 && CreatePost.photos != '') {
      if ((await checkExistElementOnScreen(page, 'input[name="view_photo"]')) == 0) {
        const clickPhotoBtn = await page.$('input[name="view_photo"]');
        await clickPhotoBtn.click();
        await delay(3000);
        const select = await getElements(page, '#root > table > tbody > tr > td > form > div.z > div > input');
        let i = 0;

        while (i < numberPhoto) {
          if (
            (await checkExistElementOnScreen(page, '#root > table > tbody > tr > td > form > div.z > div > input')) == 0
          ) {
            const [fileChooser] = await Promise.all([page.waitForFileChooser(), select[i].click()]);
            await fileChooser.accept([CreatePost.photos[i]]); // file path
            await delay(3000);
            console.log('Choose file done');
            i++;
          } else {
            console.log("Can't find input to upload ");
            return false;
          }
        }
        const uploadPhoto = await page.$('input[name="add_photo_done"]');
        await uploadPhoto.click();
        await delay(3000);
        if ((await checkExistElementOnScreen(page, '#main-message > h1 > span')) == 0) {
          console.log("Can't push img");
          return false;
        }
      } else {
        console.log("Can't find click photo btn");
        return false;
      }
    } else {
      console.log('So anh random khong hop le');
      return false;
    }
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const tagFriend = async (page, CreatePost) => {
  // TAG
  try {
    const numberFriendTag = getRandomIntBetween(CreatePost.numberFriendTagStart, CreatePost.numberFriendTagEnd);

    if (numberFriendTag > 0) {
      const tagBtn = await page.$('input[name="view_withtag"]');
      if ((await checkExistElementOnScreen(page, 'input[name="view_withtag"]')) == 0) {
        await tagBtn.click();
        await delay(2000);
        if (CreatePost.typeTag == 'UIDList') {
          await tagFriendsByUIDList(page, CreatePost);
        } else {
          await tagFriendsRandomly(page, numberFriendTag);
        }

        // Click "Done" button
        if ((await scrollSmoothIfNotExistOnScreen(page, 'input[name="done"]')) === 1) {
          await page.click('input[name="done"]');
          await delay(2000);
          return true;
        } else {
          console.log("Can't find done tag");
          return false;
        }
      }
    } else {
      console.log('Khong tag friend');
    }
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const tagFriendsByUIDList = async (page, CreatePost) => {
  try {
    if (CreatePost.UID !== '') {
      for (const uid of CreatePost.UID) {
        let found = false;
        while (!found) {
          const valuesFriend = await getFriendValues(page);

          // Check if valuesFriend is defined and not an empty array
          if (valuesFriend && valuesFriend.length > 0) {
            if (valuesFriend.includes(uid)) {
              if ((await checkExistElementOnScreen(page, 'input[name="friend_ids[]"][value="' + uid + '"]')) == 0) {
                const friendToClick = await page.$('input[name="friend_ids[]"][value="' + uid + '"]');
                await friendToClick.click();
                await delay(2000);
                found = true;
              }
            } else {
              if ((await checkExistElementOnScreen(page, 'input[name="show_more"]')) == 0) {
                await page.click('input[name="show_more"]');
                await delay(3000);
              } else {
                // If showMore is not present, break the loop
                break;
              }
            }
          } else {
            // Handle the case when valuesFriend is undefined or an empty array
            console.log('Error: valuesFriend is undefined or empty');
            break;
          }
        }
      }
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
  }
};

const getFriendValues = async (page) => {
  try {
    const valuesFriend = await page.evaluate(() => {
      const checkboxes = Array.from(document.querySelectorAll('input[name="friend_ids[]"]'));
      return checkboxes.map((checkbox) => checkbox.value);
    });

    return valuesFriend;
  } catch (err) {
    console.log(err);
  }
};

const tagFriendsRandomly = async (page, numberFriendTag) => {
  try {
    let count = 0;

    while (count < numberFriendTag) {
      // Kiểm tra sự tồn tại của nút "show more"
      const showMoreButtonExists = (await checkExistElementOnScreen(page, 'input[name="show_more"]')) == 0;

      if (showMoreButtonExists) {
        // Click vào nút "show more" nếu nó tồn tại
        await page.click('input[name="show_more"]');
        await delay(2000);
      } else {
        // Nếu không có nút "show more", thoát khỏi vòng lặp
        break;
      }

      // Kiểm tra danh sách bạn bè
      const listFriend = await getElements(page, 'input[name="friend_ids[]"]', 3);

      if (listFriend.length > 0) {
        // Chọn một bạn bè ngẫu nhiên từ danh sách và click vào
        const randomFriend = getRandomIntBetween(0, listFriend.length - 1);
        await listFriend[randomFriend].click();
        await delay(2000);
        count++;
      } else {
        // Nếu danh sách bạn bè rỗng, thoát khỏi vòng lặp
        break;
      }
    }
  } catch (err) {
    console.log(err);
  }
};

  const objCreatePost = ${strSetting};
    let CreatePost = await checkObject(objCreatePost);
    // check page is live reutrn -1, return 1, return 0
  // const isLive1 = await checkIsLive(page);
  // console.log("Tình trạng trang web:", isLive);
  // if (!isLive1) {
  //   return -1;
  // }
  // check is login: get cookie return -1, return 1, return 0
  // const isLoggedIn = await checkLogin(page);
  // console.log("Tình trạng đăng nhập:", isLoggedIn);
  // if (!isLoggedIn) {
  //   return -1;
  // }

    let count = 0;
    const numberOfPost = getRandomIntBetween(CreatePost.postStart, CreatePost.postEnd);
    while (count < numberOfPost) {
      await returnHomePage(page);
      const CreatePostBtn = await page.$('input[name="view_overview"]');
      if ((await checkExistElementOnScreen(page, 'input[name="view_overview"]')) == 0) {
        await CreatePostBtn.click();
        await delay(2000);
        const InputTextContent = await page.$('textarea[name="xc_message"]');
        if ((await checkExistElementOnScreen(page, 'textarea[name="xc_message"]')) == 0) {
          await InputTextContent.click();

          if (CreatePost.text.length > 0) {
            const randomTextIndex = getRandomIntBetween(0, CreatePost.text.length - 1);
            await page.keyboard.type(CreatePost.text[randomTextIndex]);
            console.log('Hoan tat nhap content');
            await delay(2000);
          } else {
            console.log('Text is empty');
            continue;
          }
        } else {
          console.log("Can't input content");
          return 0;
        }

        if (CreatePost.option === 'photoOrVideo') {
          const uploadImgResult = await uploadImg(page, CreatePost);
          if (uploadImgResult) {
            console.log('Upload image successful');
          } else {
            console.log("Can't upload image");
          }
          // TAG
          if (CreatePost.isTag) {
            await tagFriend(page, CreatePost);
          }
        }
        // Click Post content
        if ((await checkExistElementOnScreen(page, 'input[name="view_post"]')) == 0) {
          const PostBtn = await page.$('input[name="view_post"]');
          await PostBtn.click();
          await delay(1000);
        } else {
          console.log("can't find post button");
          break;
        }
      } else {
        console.log("Can't post status");
        break;
      }

      // After post reload page by click home
      const checkHomeBtn = await checkExistElementOnScreen(page, '#header > table > tbody > tr > td > a');
      if (checkHomeBtn == 0) {
        await page.click('#header > table > tbody > tr > td.m > a');
        await delay(getRandomIntBetween(CreatePost.delayTimeStart, CreatePost.delayTimeEnd) * 1000);
      }
      count++;
      console.log('Creat post done');
    }
    
  `;
};

const viewNoti = (setting) => {
  const strSetting = `{
    numsNotiStart: ${setting.notificationStart},
    numsNotiEnd: ${setting.notificationEnd},
    waitTimeStart: ${setting.delayTimeStart},
    waitTimeEnd: ${setting.delayTimeEnd},
    viewOptions: ${JSON.stringify(setting.option)},
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
    const objNoti = ${strSetting}
    // check page is live reutrn -1, return 1, return 0
    const isLive2 = await checkIsLive(page);
    if (!isLive2) {
      return -1;
    }

    // check cookie xem login chua
    const isCookie = await checkLogin(page);
    if (!isCookie) {
      console.log("You not log in facebook");
      return;
    }

    // check auth fb
    let url = await page.url();
    if (url.includes("mbasic.facebook.com/checkpoint")) {
      console.log("Account facebook not is auth");
      return;
    }

    let countNoti = 0;
    const numsNoti =
      objNoti.numsNotiStart < objNoti.numsNotiEnd
        ? getRandomIntBetween(objNoti.numsNotiStart, objNoti.numsNotiEnd)
        : getRandomIntBetween(objNoti.numsNotiEnd, objNoti.numsNotiStart);

    while (countNoti < numsNoti) {
      // wait time before read noti
      const waitTime =
        objNoti.waitTimeStart < objNoti.waitTimeEnd
          ? getRandomIntBetween(
              objNoti.waitTimeStart * 1000,
              objNoti.waitTimeEnd * 1000
            )
          : getRandomIntBetween(
              objNoti.waitTimeEnd * 1000,
              objNoti.waitTimeStart * 1000
            );
      await delay(waitTime);
      // tim nut thong bao và click sang trang thong bao
      let hrefs = await page.$$eval("a", links => links.map(a => a.href));
      const isAccessNoti = await accessPageByHref(
        page,
        "/notifications",
        hrefs
        );
      if (isAccessNoti) {
        await delay(getRandomIntBetween(3000, 5000));
        // check sang trang notification ?
        // url = await page.url();
        // if (!url.includes("/notifications")) {
        //   console.log("Notification page has not been loaded");
        //   return;
        // }
      } else {
        console.log("Error access to notification page");
        return;
      }

      //chon che do xem notification
      if (objNoti.viewOptions === "randomFriend") {
        hrefs = await page.$$eval("a", links => links.map(a => a.href));
        const isAccessDetailsNoti = await accessPageByHref(
          page,
          "/a/notifications",
          hrefs
        );
        if (isAccessDetailsNoti) {
          await delay(getRandomIntBetween(7000, 15000));
          if (countNoti + 1 < numsNoti) {
            await returnHomePage(page);
          }
        }
      } else {
        hrefs = await page.$$eval("a", links => links.map(a => a.href));
        const isAccessDetailsNoti = await accessPageByHref(
          page,
          "/a/notifications",
          hrefs,
          countNoti
        );

        if (isAccessDetailsNoti) {
          await delay(getRandomIntBetween(7000, 15000));
          if (countNoti + 1 < numsNoti) {
            await returnHomePage(page);
          }
        }
      }

      console.log("so thong bao da doc", countNoti + 1);
      countNoti++;
    }
  ;
  `;
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
            console.log("no element exists to enter message");
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
            console.log("no element exists to send message");
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
            console.log("no element exists to enter message");
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
            console.log("no element exists to send message");
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
        console.log("You not log in facebook");
        return;
      }
  
      // check auth fb
      let url = await page.url();
      if (url.includes("mbasic.facebook.com/checkpoint")) {
        console.log("Account facebook not is auth");
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
          //   console.log("Messages page has not been loaded");
          //   await returnHomePage(page);
          //   await replyMessage(page);
          // }
        } else {
          console.log("Error access to messages page");
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
            console.log("Count friend send msg", countFriend + 1);
          } else if (actionReply == 0) {
            await delay(getRandomIntBetween(3000, 5000));
            await returnHomePage(page);
            countFriend;
            console.log("Count friend send msg", countFriend + 1);
          }
        }
      }
    } catch (error) {
      console.log(error.message);
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
        console.log("no element exists to enter message");
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
        console.log("no element exists to send message");
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
        console.log("no element exists to enter message");
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
        console.log("no element exists to send message");
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
        console.log("You not log in facebook");
        return;
      }
  
      // check auth fb
      let url = await page.url();
      if (url.includes("mbasic.facebook.com/checkpoint")) {
        console.log("Account facebook not is auth");
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
            console.log("Error access to chat page");
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
            console.log("Error access to friendToSend page");
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
            console.log("No link to access to profile page");
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
            console.log("No link to access to friend page");
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
                console.log("No access to message page");
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
                console.log("No access to message page");
                return;
              }
            }
          } else {
            console.log(
              "You do not have any friends yet. Please add more friends"
            );
            return;
          }
        } else {
          return;
        }
  
        await delay(getRandomIntBetween(3000, 5000));
        console.log("Count friend send msg", countFriend + 1);
        countFriend++;
      }
    } catch (error) {
      console.log(error.message);
    }
  `;
};
