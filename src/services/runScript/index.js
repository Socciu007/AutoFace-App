import { storageSettings } from '../../common/const.config';
import { createPost } from './scriptAuto/CreatePost';
import { dbGetLocally, getBrowserData, getInformation, getProxy, runProfile } from '../../sender';
import { deletePost } from './scriptAuto/DeletePost';
import { loginFacebook } from './scriptAuto/login';
import { postInteract } from './scriptAuto/PostInteraction';
import { viewNoti } from './scriptAuto/ViewNoti';
import { newFeed } from './scriptAuto/NewsFeed';
import { cancelFriend } from './scriptAuto/CancelFriend';
import { watchStory } from './scriptAuto/WatchStory';
import { addFriend } from './scriptAuto/AddFriend';
import { watchVideo } from './scriptAuto/WatchVideo';
import Promise from 'bluebird';
import { createPostGroup } from './scriptAuto/CreatePostGroup';
import { boostLikeComment } from './scriptAuto/BoostLikeComment';
import { boostFollower } from './scriptAuto/BoostFollower';
import { boostView } from './scriptAuto/BoostView';
import { inviteGroup } from './scriptAuto/inviteGroup';
import { joinGroup } from './scriptAuto/joinGroup';
import { leftGroup } from './scriptAuto/leaveGroup';
import { updateProfile, updateProfiles } from '../../redux/profileSlice';
window.electron.ipcRenderer.on('ipc-logger', (...params) => {
  console.log(params[0]);
});

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const splitToChunks = (array, size) => {
  const results = [];
  for (let i = 0; i < array.length; i += size) {
    results.push(array.slice(i, i + size));
  }
  return results;
};

export const runScript = async (profileSelected, scriptDesign, dispatch) => {
  // set all profiles selected to waiting status
  let newProfileSelected = profileSelected.map((profile) => {
    profile.script = scriptDesign.id;
    profile.status = 'waiting';
    return profile;
  });
  dispatch(updateProfiles(newProfileSelected));
  // ------

  const settings = await dbGetLocally(storageSettings);
  let thread = 1;
  if (!isNaN(settings.countProfile)) {
    thread = settings.countProfile;
  }
  const lengthThread = thread <= profileSelected.length ? thread : profileSelected.length;

  const results = splitToChunks(profileSelected, lengthThread);

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

  for (let i = 0; i < settings.countLoop; i++) {
    for (let j = 0; j < results.length; j++) {
      await new Promise.map(
        results[j],
        async (profile, index) => {
          // set profiledSelected running status
          dispatch(updateProfile({ ...profile, status: 'running' }));
          // --------------
          await delay(settings.delayThread && settings.delayThread > 0 ? index * settings.delayThread * 1000 : 1000);
          let proxyStr = '';
          let proxy;
          let proxyConvert;
          if (settings.assignProxy) {
            if (settings.proxies.length) {
              const indexProfile = index + j * results.length;
              proxy = settings.proxies[indexProfile % settings.proxies.length];
            } else {
              proxy = profile.proxy;
            }
          } else {
            proxy = profile.proxy;
            if (settings.proxies.length && (!proxy.host || !proxy.host.length)) {
              const indexProfile = index + j * results.length;
              proxy = settings.proxies[indexProfile % settings.proxies.length];
            }
          }

          if (proxy.host && proxy.host.length) {
            proxyConvert = await getProxy(proxy, profile.id);
            if (proxyConvert && proxyConvert.host && proxyConvert.port) {
              proxyStr = `"--proxy-server=${proxyConvert.mode}://${proxyConvert.host}:${proxyConvert.port}",`;
            } else {
              proxyStr = null;
            }
          }
          if (proxyStr || proxyStr == '') {
            let cpu, mem;
            const infor = await getInformation();
            cpu = infor.cpu;
            mem = infor.mem;

            while (cpu > settings.maxCpu || mem > settings.maxRam) {
              await delay(5000);
              const infor = await getInformation();
              cpu = infor.cpu;
              mem = infor.mem;
            }
            const browserData = await getBrowserData(profile.id);
            if (browserData && browserData.data) {
              const strCode = `

    let browser;
    const logger = (...params) => {
      event.reply("ipc-logger",[${profile.uid},...params]);
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

    const checkLogin = async (page, url) => {

      try {
        const cookies = await page.cookies(url ? url : page.url());
        logger(cookies)
        if (cookies) {
          const c_user = cookies.find((e) => e.name == "c_user");
          const checkpoint = cookies.find((e) => e.name == "checkpoint");
          if (checkpoint || page.url().includes("checkpoint")) {
            return { isLogin:false, error:"Checkpoint" };
          } else if (c_user) {
            return { isLogin:true, error:null };
          } else {
            return { isLogin:false, error:null };
          }
        }
      } catch (err) {
        return { isLogin:false, error:null };
      }
    };

    const clickElement = (element) => {
      return new Promise(async (resolve) => {
        try {
          setTimeout(() => {
            resolve(true);
          }, 3000);
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
          timeout: 60000,
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
        logger(error);
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

    const toOTPCode = async (code, proxy)=>{
        const res = await apiAxiosWithProxy('https://2fa.live/tok/'+code,proxy);
        if(res && res.token){
          return res.token;
        }
        return false;
    }
  
    const getInputText = async function (page, element) {
      try {
        return await page.evaluate((x) => x.value, element);
      } catch (err) {
        return "";
      }
    };
 

      return new Promise(async (resolve) => {
        try {
      
        setTimeout(async () => {
          if(browser){
            await browser.close();
        }
          resolve('Time out');
        }, ${settings.maxTime} * 1000);
       

        browser = await puppeteer.launch({
          executablePath: "${browserData.executablePath}",
          devtools: false,
          dumpio: true,
          headless: false,
          defaultViewport: null,
          ignoreDefaultArgs: ${settings.muteAudio ? `["--mute-audio"]` : `""`},
          args: [
            "--user-data-dir=${browserData.pathProfile}",
            ${proxyStr && proxyStr.length ? proxyStr : ''}
            ${settings.showImage ? `"--blink-settings=imagesEnabled=false",` : ''}
            "--hidemyacc-data=${browserData.data}",
            "--disable-encryption",
            "--restore-last-session",
            "--donut-pie=undefined",
            "--proxy-bypass-list=https://static.xx.fbcdn.net",
            "--flag-switches-begin",
            "--flag-switches-end",
            "--window-size=360,640"
          ]
        });

        const pages = await browser.pages();
        for(let i=1;i<pages.length;i++){
          logger('Close page ' + i);
          await pages[i].close();
        }
        let page = pages[0];
        await page.setBypassCSP(true);
        await page.setCacheEnabled(false);
        const session = await page.target().createCDPSession();
        await session.send("Page.enable");
        await session.send("Page.setWebLifecycleState", { state: "active" });
        let interval;
        const proxy = ${
          proxyConvert && proxyConvert.host
            ? `{
          host:${JSON.stringify(proxyConvert.host)},
          port:${proxyConvert.port}
        };`
            : 'null'
        } 

        interval = setInterval(async()=>{
          const checkPage = await checkIsLive(page);
           if (!checkPage){
           if(interval)
           clearInterval(interval);
           resolve('Page is close');
       }
     },2000);

        {${loginFacebook(profile)}}
        ${getAllFunc(arrfunction)}
       
      } catch (error) {
          logger(error);
        } finally {
          if(browser){
              await browser.close();
          }
        }
        resolve('Done');
      });

     
      `;

              const result = await runProfile(strCode, profile.id);
              console.log(result);
            } else {
              console.log('Open Profile Fail!');
            }
          } else {
            console.log('Connect proxy Fail!');
          }
          dispatch(updateProfile({ ...profile, status: 'ready' }));
        },
        { concurrency: lengthThread },
      );
    }
  }
  return;
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
    case 'cancelFriend':
      return `{
        ${cancelFriend(script)}
      }`;
    case 'watchStory':
      return `{
          ${watchStory(script)}
        }`;
    case 'addFriend':
      return `{
          ${addFriend(script)}
        }`;
    case 'watchVideo':
      return `{
          ${watchVideo(script)}
        }`;
    case 'createPostGroup':
      return `{
          ${createPostGroup(script)}
        }`;
    case 'inviteGroup':
      return `{
              ${inviteGroup(script)}
            }`;
    case 'joinGroup':
      return `{
          ${joinGroup(script)}
        }`;
    case 'leftGroup':
      return `{
          ${leftGroup(script)}
        }`;

    case 'likeComment':
      return `{
                  ${boostLikeComment(script)}
                }`;
    case 'follower':
      return `{
                  ${boostFollower(script)}
                }`;
    case 'viewVideo':
      return `{
                  ${boostView(script)}
                }`;

    default:
      return `logger("Can't find func");`;
  }
};
