import { APP_ID } from '../../common/const.api';
import { storageSettings } from '../../common/const.config';
import { apiStartProfiles } from '../api_helper';
import { exec, getDB } from '../socket';
import Promise from 'bluebird';

export const runScript = async (profileSelected, scriptDesign) => {
  let settings;
  const settingStr = await getDB(storageSettings);
  if (settingStr) {
    settings = JSON.parse(settingStr);
  }
  for (let i = 0; i < profileSelected.length; i++) {
    let arrfunction = [];
    const edges = scriptDesign.design.edges;
    const nodes = scriptDesign.design.nodes;
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

    const res = await apiStartProfiles(
      profileSelected[i].id,
      JSON.stringify({ params: '--hide-crash-restore-bubble --disable-notifications --window-size=250,800' }),
    );

    const code = `const puppeteer = require('puppeteer-core')
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const browser = await puppeteer.connect({
      browserWSEndpoint: '${res.data.data.wsUrl}',
      defaultViewport: null
    });
    const key = randomstring.generate({ length: 6 })

    if (!global.appws['${APP_ID}'].browsers) {
      global.appws['${APP_ID}'].browsers = {}
    }
    global.appws['${APP_ID}'].browsers[key] = browser

    try {
      const page = await browser.newPage();
      await page.goto('https://mbasic.facebook.com')
      await delay(10000)
     ${getAllFunc(arrfunction)}
    } catch (error) {
      console.log(error)
    } finally {
      await browser.close()
      delete global.appws['${APP_ID}'].browsers[key]
    }

    return true`;

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
    const newsfeed = ${strSetting};
      let randomScrollTime = 60000;
      try {
        while (randomScrollTime > 0) {
          let scrollAmount = 100;
          let randomDelay = 3000;
          await page.mouse.wheel({ deltaY: scrollAmount });
          await delay(randomDelay);
          randomScrollTime = randomScrollTime - randomDelay;
        }
      } catch (error) {
        console.log(error);
      }
  `;
};

const createPost = async (setting) => {
  return ``;
};
