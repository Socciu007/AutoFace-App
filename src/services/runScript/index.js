import { storageSettings } from '../../common/const.config';
import { createPost } from './scriptAuto/CreatePost';
import { dbGetLocally, getBrowserData, getInformation, getProxy, getWindowsize, runProfile } from '../../sender';
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
import { getInfor } from './scriptAuto/GetInfo';
import { removeProfile } from '../../redux/debugSlice';
import { changePassword } from './scriptAuto/ChangePass';
import { DeletePhone } from './scriptAuto/DeletePhone';
import { changeName } from './scriptAuto/ChangeName';
import { changeEmail } from './scriptAuto/Email';
import { changeAvatar } from './scriptAuto/ChangeAvatar';
import { changeCover } from './scriptAuto/ChangeCover';
import { twoFA } from './scriptAuto/TwoFA';
import { trustedDevices } from './scriptAuto/TrustedDevices';
import { changeInformation } from './scriptAuto/ChangeInfor';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

let emails = [];

const splitToChunks = (array, length, thread) => {
  const size = (length / thread) | 0;
  let results = [];
  for (let i = 0; i < array.length; i += size) {
    results.push(array.slice(i, i + size));
  }
  if (results.length > thread) {
    let index = 0;
    for (let i = thread; i < results.length; i++) {
      for (let j = 0; j < results[i].length; j++) {
        if (results[index]) {
          results[index].push(results[i][j]);
        } else {
          results[0].push(results[i][j]);
        }
        index++;
      }
    }

    results = results.slice(0, thread);
  }
  return results;
};

const getPosition = async (index) => {
  let x, y;
  const browserWidth = 450;
  const { width } = await getWindowsize();
  let maxBrowserRow = (width / browserWidth) | 0;
  const indexBrowser = index % maxBrowserRow;
  const indexNewBrowser = index % (maxBrowserRow * 2);
  x = indexBrowser * 450;
  if (indexBrowser < maxBrowserRow && indexNewBrowser < maxBrowserRow) {
    y = 0;
  } else {
    y = 460;
  }

  return `${x},${y}`;
};

export const runScript = async (profileSelected, scriptDesign, dispatch, isRunApp = false) => {
  let newProfileSelected = profileSelected.map((profile) => {
    return { ...profile, script: scriptDesign.id, status: 'waiting' };
  });
  dispatch(updateProfiles(newProfileSelected));
  const settings = await dbGetLocally(storageSettings);
  let thread = 1;
  if (!isNaN(settings.countProfile)) {
    thread = settings.countProfile;
  }
  const lengthThread = thread <= profileSelected.length ? thread : profileSelected.length;

  const results = splitToChunks(profileSelected, profileSelected.length, lengthThread);
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
      if (script) arrfunction.push(script);
      const edge = edges.find((e) => e.source == node.id);
      if (edge) {
        node = nodes.find((node) => node.id == edge.target);
      } else {
        node = null;
      }
    }
  }

  console.log(arrfunction);

  const isfuncEmail = arrfunction.find((e) => e.type == 'email');
  if (isfuncEmail) {
    emails = [];
  }

  if (isRunApp) {
    await Promise.map(
      results,
      async (result, index) => {
        for (let j = 0; j < result.length; j++) {
          try {
            const profile = result[j];
            const resultRun = await runCode(
              profile,
              profileSelected,
              index,
              dispatch,
              arrfunction,
              settings,
              j,
              scriptDesign,
              isRunApp,
            );
            if (resultRun && resultRun.toString().includes('ERR_CONNECTION')) {
              dispatch(
                updateProfile({
                  ...profile,
                  script: scriptDesign.id,
                  status: 'Proxy Error',
                }),
              );
            } else {
              dispatch(
                updateProfile({
                  ...profile,
                  script: scriptDesign.id,
                  status: 'ready',
                }),
              );
            }
          } catch (err) {
            dispatch(
              updateProfile({
                ...profile,
                script: scriptDesign.id,
                status: i == settings.countLoop - 1 ? 'ready' : 'waiting',
              }),
            );
          }
        }
      },
      { concurrency: results.length },
    );
  } else {
    for (let i = 0; i < settings.countLoop; i++) {
      await Promise.map(
        results,
        async (result, index) => {
          for (let j = 0; j < result.length; j++) {
            try {
              const profile = result[j];
              const resultRun = await runCode(
                profile,
                profileSelected,
                index,
                dispatch,
                arrfunction,
                settings,
                j,
                scriptDesign,
                isRunApp,
              );
              if (resultRun && resultRun.toString().includes('ERR_CONNECTION')) {
                dispatch(
                  updateProfile({
                    ...profile,
                    script: scriptDesign.id,
                    status: i == settings.countLoop - 1 ? 'Proxy Error' : 'waiting',
                  }),
                );
              } else {
                dispatch(
                  updateProfile({
                    ...profile,
                    script: scriptDesign.id,
                    status: i == settings.countLoop - 1 ? 'ready' : 'waiting',
                  }),
                );
              }
            } catch (err) {
              dispatch(
                updateProfile({
                  ...profile,
                  script: scriptDesign.id,
                  status: i == settings.countLoop - 1 ? 'ready' : 'waiting',
                }),
              );
            }
          }
        },
        { concurrency: results.length },
      );
    }
  }

  return;
};

const runCode = async (
  profile,
  profileSelected,
  index,
  dispatch,
  arrfunction,
  settings,
  indexThread,
  scriptDesign,
  isRunApp,
) => {
  const funcLogin = arrfunction.find((e) => e.type == 'login');
  await delay(settings.delayThread && settings.delayThread > 0 ? index * settings.delayThread * 1000 : 1000);
  try {
    let proxyStr = '';
    let proxy;
    let proxyConvert;
    const indexProfile = profileSelected.findIndex((e) => e.id == profile.id);
    if (settings.assignProxy) {
      if (settings.proxies.length) {
        proxy = settings.proxies[indexProfile % settings.proxies.length];
      } else {
        proxy = profile.proxy;
      }
    } else {
      proxy = profile.proxy;
    }

    if (proxy.host && proxy.host.length) {
      proxyConvert = await getProxy(proxy, isRunApp ? 99999999 : (settings.maxTime + 10) * 1000, profile.id);
      console.log('proxyConvert: ' + JSON.stringify(proxyConvert));
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
      if (indexThread == 0) {
        if (cpu > settings.maxCpu) {
          console.log('MAX CPU');
          return;
        }
        if (mem > settings.maxRam) {
          console.log('MAX RAM');
          return;
        }
      }
      while (cpu > settings.maxCpu || mem > settings.maxRam) {
        console.log('Max RAM or CPU');
        await delay(10000);
        const infor = await getInformation();
        cpu = infor.cpu;
        mem = infor.mem;
      }
      let browserData = await getBrowserData(profile.id, proxyConvert);
      for (let i = 0; i < 5; i++) {
        if (browserData && browserData.data) {
          break;
        } else {
          await delay(1000);
          browserData = await getBrowserData(profile.id, proxyConvert);
        }
      }
      if (browserData && browserData.data) {
        dispatch(updateProfile({ ...profile, script: scriptDesign.id, status: 'running' }));
        dispatch(removeProfile(profile));
        const positionBrowser = await getPosition(index);
        const strCode = `

let browser;
let proxy;
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


const checkExistElementOnScreen1 = async (page, element) => {
  try {
    return await page.evaluate((el) => {
      if (el.getBoundingClientRect().top <= 0) {
        return -1;
      } else if (el.getBoundingClientRect().top + el.getBoundingClientRect().height > window.innerHeight) {
        return 1;
      } else {
        return 0;
      }
    }, element);
  } catch (error) {
    return error;
  }
  };

const checkLogin = async (page, url) => {

try {
  const cookies = await page.cookies(url ? url : page.url());
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

const closePage = async (page) => {
return new Promise(async (resolve) => {
  try {
    setTimeout(() => {
      resolve(true);
    }, 2000);
    await page.close();
    await delay(1000);
  } catch (err) {
    logger(err);
  }
  resolve(true);
});
};

const returnHomePage = async (page) => {
await delay(1000);
const url = await page.url();
if (url === 'https://m.facebook.com/' || url.includes('https://m.facebook.com/home.php')) {
  logger('URL is correct');
} else {
  logger('Redirect to homepage');
  await page.goto('https://m.facebook.com/', {
    waitUntil: 'networkidle2',
    timeout: 60000,
  });
  await delay(2000);
}
};

const checkIsLive = (page) => {
try {
  if (page && page.isClosed() == false) {
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
        await page.evaluate(async (JSpath) => {
          const getRandomIntBetween = (min, max) => {
            return Math.floor(Math.random() * (max - min + 1)) + min;
          };
          const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
          const smoothScrollByStep = (targetPosition, duration) => {
            const startPosition = window.scrollY;
            const distance = targetPosition - startPosition;
            let startTime = null;
    
            const ease = (t, b, c, d) => {
              t /= d / 2;
              if (t < 1) return (c / 2) * t * t + b;
              t--;
              return (-c / 2) * (t * (t - 2) - 1) + b;
            };
    
            const animation = (currentTime) => {
              if (startTime === null) startTime = currentTime;
              const timeElapsed = currentTime - startTime;
              const run = ease(timeElapsed, startPosition, distance, duration);
              window.scrollTo(0, run);
              if (timeElapsed < duration) requestAnimationFrame(animation);
            };
    
            requestAnimationFrame(animation);
          };
    
          const isInViewport = (elem) => {
            const bounding = elem.getBoundingClientRect();
            return (
              bounding.top >= 0 &&
              bounding.left >= 0 &&
              bounding.bottom <=
                (window.innerHeight || document.documentElement.clientHeight) &&
              bounding.right <=
                (window.innerWidth || document.documentElement.clientWidth)
            );
          };
    
          const element = document.querySelector(JSpath);
          if (element && !isInViewport(element)) {
            const elementRect = element.getBoundingClientRect();
            const viewportHeight =
              window.innerHeight || document.documentElement.clientHeight;
            const targetPosition =
              window.scrollY +
              elementRect.top -
              (elementRect.top > viewportHeight ? viewportHeight : 0);
    
            let currentPosition = window.scrollY;
            while (
              Math.abs(currentPosition - targetPosition) > 0 &&
              !isInViewport(element)
            ) {
              const stepSize =
                getRandomIntBetween(200, 600) *
                (currentPosition > targetPosition ? -1 : 1);
              const durationPerStep = getRandomIntBetween(500, 2000);
              const nextPosition = currentPosition + stepSize;
    
              smoothScrollByStep(nextPosition, durationPerStep);
              await delay(getRandomIntBetween(1000,2000));
              if(Math.random() < 0.3){
                await delay(getRandomIntBetween(3000,5000));
              }
              currentPosition = window.scrollY;
            }
          }
        }, JSpath);
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    };
    
     const scrollSmoothIfElementNotExistOnScreen = async (page, element) => {
      try {
        await page.evaluate(async (element) => {
          const getRandomIntBetween = (min, max) => {
            return Math.floor(Math.random() * (max - min + 1)) + min;
          };
          const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
          const smoothScrollByStep = (targetPosition, duration) => {
            const startPosition = window.scrollY;
            const distance = targetPosition - startPosition;
            let startTime = null;
    
            const ease = (t, b, c, d) => {
              t /= d / 2;
              if (t < 1) return (c / 2) * t * t + b;
              t--;
              return (-c / 2) * (t * (t - 2) - 1) + b;
            };
    
            const animation = (currentTime) => {
              if (startTime === null) startTime = currentTime;
              const timeElapsed = currentTime - startTime;
              const run = ease(timeElapsed, startPosition, distance, duration);
              window.scrollTo(0, run);
              if (timeElapsed < duration) requestAnimationFrame(animation);
            };
    
            requestAnimationFrame(animation);
          };
    
          const isInViewport = (elem) => {
            const bounding = elem.getBoundingClientRect();
            return (
              bounding.top >= 100 &&
              bounding.left >= 0 &&
              bounding.bottom <=
                (window.innerHeight || document.documentElement.clientHeight) &&
              bounding.right <=
                (window.innerWidth || document.documentElement.clientWidth)
            );
          };
          if (element && !isInViewport(element)) {
            const elementRect = element.getBoundingClientRect();
            const viewportHeight =
              window.innerHeight || document.documentElement.clientHeight;
            const targetPosition =
              window.scrollY +
              elementRect.top -
              (elementRect.top > viewportHeight ? viewportHeight : 0);
    
            let currentPosition = window.scrollY;
            while (
              Math.abs(currentPosition - targetPosition) > 0 &&
              !isInViewport(element)
            ) {
              const stepSize =
                getRandomIntBetween(200, 600) *
                (currentPosition > targetPosition ? -1 : 1);
              const durationPerStep = getRandomIntBetween(1000, 2000);
              const nextPosition = currentPosition + stepSize;
    
              smoothScrollByStep(nextPosition, durationPerStep);
              await delay(getRandomIntBetween(1000,2000));
              if(Math.random() < 0.3){
                await delay(getRandomIntBetween(3000,5000));
              }
              currentPosition = window.scrollY;
            }
          }
        }, element);
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    };

    const scrollSmoothElementInfo = async (page, element) => {
      try {
        await page.evaluate(async (element) => {
          const getRandomIntBetween = (min, max) => {
            return Math.floor(Math.random() * (max - min + 1)) + min;
          };
          const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
          const smoothScrollByStep = (targetPosition, duration) => {
            const startPosition = window.scrollY;
            const distance = targetPosition - startPosition;
            let startTime = null;
    
            const ease = (t, b, c, d) => {
              t /= d / 2;
              if (t < 1) return (c / 2) * t * t + b;
              t--;
              return (-c / 2) * (t * (t - 2) - 1) + b;
            };
    
            const animation = (currentTime) => {
              if (startTime === null) startTime = currentTime;
              const timeElapsed = currentTime - startTime;
              const run = ease(timeElapsed, startPosition, distance, duration);
              window.scrollTo(0, run);
              if (timeElapsed < duration) requestAnimationFrame(animation);
            };
    
            requestAnimationFrame(animation);
          };
    
          const isInViewport = (elem) => {
            const bounding = elem.getBoundingClientRect();
            return (
              bounding.top >= 0 &&
              bounding.left >= 0 &&
              bounding.bottom <=
                (window.innerHeight || document.documentElement.clientHeight) &&
              bounding.right <=
                (window.innerWidth || document.documentElement.clientWidth)
            );
          };
          if (element && !isInViewport(element)) {
            const elementRect = element.getBoundingClientRect();
            const viewportHeight =
              window.innerHeight || document.documentElement.clientHeight;
            const targetPosition =
              window.scrollY +
              elementRect.top -
              (elementRect.top > viewportHeight ? viewportHeight : 0);
    
            let currentPosition = window.scrollY;
            while (
              Math.abs(currentPosition - targetPosition) > 0 &&
              !isInViewport(element)
            ) {
              const stepSize =
                getRandomIntBetween(200, 600) *
                (currentPosition > targetPosition ? -1 : 1);
              const durationPerStep = getRandomIntBetween(1000, 2000);
              const nextPosition = currentPosition + stepSize;
    
              smoothScrollByStep(nextPosition, durationPerStep);
              await delay(getRandomIntBetween(1000,2000));
              currentPosition = window.scrollY;
            }
          }
        }, element);
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    };

    const scrollSmooth = async (page, randomScrollTime) => {
      try {
        while(randomScrollTime > 0){
        const isLive = checkIsLive(page);
          if (!isLive) {
            return -2;
          }
        await page.evaluate(() => {
            const getRandomIntBetween = (min, max) => {
              return Math.floor(Math.random() * (max - min + 1)) + min;
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
              const durationPerStep = getRandomIntBetween(700, 1000);
              const nextPosition = Math.max(
                currentPosition + scrollAmount,
                targetPosition
              );
              smoothScrollByStep(nextPosition, durationPerStep);
            }
          });
          await delay(getRandomIntBetween(2000, 5000));
          randomScrollTime--;
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

const getElementsByXPath = async (page, xpath, loop = 10) => {
  let element;
  for (let i = 0; i < loop; i++) {
    try {
      element = await page.$x(xpath, { timeout: 1000 });
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

const getElementEmail = async (page, round = 30) => {
for (let i = 0; i < round; i++) {
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

    ${
      !isRunApp
        ? ` setTimeout(async () => {
    if(browser){
      await browser.close();
  }
    resolve('Timeout');
  }, ${settings.maxTime} * 1000);`
        : ''
    }

  setTimeout(async () => {
    if(!browser || !browser.isConnected()){
      logger('open browser fail!');
      resolve('Cant open browser');
  }
  },5000);
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
      "--window-size=360,760",
      "--force-device-scale-factor=0.8",
      "--window-position=${positionBrowser}"
    ]
  });

  const pages = await browser.pages();
  if(!pages.length){
    logger('Page snap error!')
    resolve('Cant open browser');
  }

  if(pages.length > 1){
    for(let i=1;i<pages.length;i++){
    logger('Close page ' + i);
    await closePage(pages[i]);
  }
  }

  let page = await pages[0];
  
  await page.setBypassCSP(true);
  await page.setCacheEnabled(false);
  const session = await page.target().createCDPSession();
  await session.send("Page.enable");
  await session.send("Page.setWebLifecycleState", { state: "active" });
  await page.bringToFront();
  await delay(1000);
  let interval;
  proxy = ${
    proxyConvert && proxyConvert.host
      ? `{
    host:${JSON.stringify(proxyConvert.host)},
    port:${proxyConvert.port}
  };`
      : 'null'
  }

  interval = setInterval(async()=>{
    const checkPage = checkIsLive(page);
     if (!checkPage){
     if(interval)
     clearInterval(interval);
      logger("Debug||Page is close")
     resolve('Page is close');
 }
},2000);

  await delay(2000);
  await page.goto('https://m.facebook.com/', {
    waitUntil: 'networkidle2',
    timeout: 30000,
  });


  ${
    isRunApp
      ? 'await delay(99999999);'
      : `
    ${
      funcLogin
        ? ``
        : `
    await returnHomePage(page);
    const { isLogin } = await checkLogin(page);
    if(!isLogin){
      logger("Debug||Not logged into Facebook yet");
      resolve('Not login!');
      if(browser){
        await browser.close();
      }
      return;
    }
    ${getInfor(profile)}
    `
    }
  
    ${getAllFunc(arrfunction, profile)}
    `
  }

  

} catch (error) {
  logger(error)
  ${
    proxyConvert && proxyConvert.host
      ? `
    if(error && proxy && error.toString().includes('ERR_CONNECTION')){
      resolve('ERR_CONNECTION');
    }
    `
      : ``
  }
  
  } finally {
    if(browser){
        await browser.close();
    }
  }
  resolve('Done');
});
`;
        let result;
        for (let i = 0; i < 5; i++) {
          result = await runProfile(strCode, profile.id);
          console.log(result);
          if (result !== 'Cant open browser') {
            break;
          }
        }
        return result;
      } else {
        console.log(`Can't get data Profile!`);
      }
    } else {
      console.log('Connect proxy Fail!');
      return;
    }
  } catch (err) {
    console.log(err);
  }
};

const getAllFunc = (arrfunction, profile) => {
  let funcStr = '';
  arrfunction.forEach((e) => {
    funcStr += convertToFunc(e, profile);
  });
  return funcStr;
};

const convertToFunc = (script, profile) => {
  switch (script.type) {
    case 'login':
      return `${loginFacebook(script, profile)}
      ${getInfor(profile)}
      `;
    case 'newsFeed':
      return `{
        ${newFeed(script)}
      }`;
    case 'password':
      return `{
        ${changePassword(script, profile)}
      }`;

    case 'name':
      return `{
          ${changeName(script, profile)}
        }`;
    case 'twoFA':
      return `{
          ${twoFA(script, profile)}
        }`;
    case 'trustedDevices':
      return `{
          ${trustedDevices(script, profile)}
        }`;
    case 'avatar':
      return `{
          ${changeAvatar(script, profile)}
        }`;

    case 'cover':
      return `{
              ${changeCover(script, profile)}
            }`;

    case 'information':
      return `{
              ${changeInformation(script, profile)}
            }`;

    case 'email':
      return `{
          ${changeEmail(script, profile, emails)}
        }`;
    case 'deletePhone':
      return `{
          ${DeletePhone(script, profile)}
        }`;
    case 'createPost':
      return `{
        ${createPost(script)}
      }`;
    case 'viewNoti':
      return `{
        ${viewNoti(script)}
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
