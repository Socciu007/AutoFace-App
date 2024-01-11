export const createPost = (setting) => {
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
  const tagFriendsRandomly = async (page, numberFriendTag) => {
    try {
      let count = 0;
  
      while (count < numberFriendTag) {
        // Kiểm tra danh sách bạn bè
        const listFriend = await getElements(page, 'div.m.bg-s3[data-action-id]', 3);
        logger('list friend length ' + listFriend.length);
        if (listFriend.length > 0) {
          // Chọn một bạn bè ngẫu nhiên từ danh sách và click vào
          const randomFriend = getRandomIntBetween(0, listFriend.length);
          if (!(await isElementVisible(page, listFriend[randomFriend]))) {
            await listFriend[randomFriend].evaluate((el) => {
              el.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
            });
            await delay(2000);
          }
          await clickElement(listFriend[randomFriend]);
          logger('Clicked friend tag');
          await delay(3000);
          count++;
        } else {
          // Nếu danh sách bạn bè rỗng, thoát khỏi vòng lặp
          logger('Khong co ban be de tag');
          break;
        }
      }
    } catch (err) {
      logger(err);
    }
  };
  const isElementVisible = async (page, element) => {
    try {
      // Evaluate if the element is visible by checking its bounding box
      const isElementVisible = await element.evaluate((el) => {
        const boundingBox = el.getBoundingClientRect();
        return (
          boundingBox.top >= 0 &&
          boundingBox.left >= 0 &&
          boundingBox.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
          boundingBox.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
      });
  
      return isElementVisible;
    } catch (error) {
      return false;
    }
  };
  const tagFriend = async (page, CreatePost) => {
    // TAG
    try {
      const numberFriendTag = getRandomIntBetween(CreatePost.numberFriendTagStart, CreatePost.numberFriendTagEnd);
      logger("numberFriendTag " + numberFriendTag)
      if (numberFriendTag > 0) {
        await scrollSmoothIfNotExistOnScreen(page, 'div[aria-label="Tag friends"]');
        if ((await checkExistElementOnScreen(page, 'div[aria-label="Tag friends"]')) === 0) {
          const tagBtn = await getElement(page, 'div[aria-label="Tag friends"]', 5);
          await delay(1000);
          await clickElement(tagBtn);
          await delay(2000);
          if (CreatePost.typeTag == 'UIDList') {
            logger('Khong the tag bang UID list');
            // await tagFriendsByUIDList(page, CreatePost);
          } else {
            await tagFriendsRandomly(page, numberFriendTag);
          }
  
          // Click "Done" button after tag
          if (
            (await checkExistElementOnScreen(
              page,
              '#screen-root > div > div.m.fixed-container.bottom > div > div.m.bg-s3 > div',
            )) === 0
          ) {
            const doneBtn = await getElement(
              page,
              '#screen-root > div > div.m.fixed-container.bottom > div > div.m.bg-s3 > div',
              5,
            );
            await clickElement(doneBtn);
            await delay(2000);
            return true;
          } else {
            logger("Can't find done tag");
            return false;
          }
        }
      } else {
        logger('Khong tag friend');
      }
      return true;
    } catch (error) {
      logger(error);
      return false;
    }
  };
  const uploadImg = async (page, CreatePost) => {
    try {
      const numberPhoto =
        getRandomIntBetween(CreatePost.photoStart, CreatePost.photoEnd) > CreatePost.photos.length
          ? CreatePost.photos.length
          : getRandomIntBetween(CreatePost.photoStart, CreatePost.photoEnd);
  
      if (numberPhoto < 3 && numberPhoto > 0 && CreatePost.photos.length > 0) {
        if (
          (await checkExistElementOnScreen(
            page,
            '#screen-root > div > div:nth-child(2) > div:nth-child(7) > div:nth-child(1)',
          )) === 0
        ) {
          const select = await getElement(
            page,
            '#screen-root > div > div:nth-child(2) > div:nth-child(7) > div:nth-child(1)',
            5,
          );
          CreatePost.photos.length = numberPhoto;
          if (select) {
            const [fileChooser] = await Promise.all([page.waitForFileChooser(), await clickElement(select)]);
            await delay(3000);
            // Accept multiple files
            await fileChooser.accept(CreatePost.photos);
            await delay(6000);
          } else {
            return false;
          }
        } else {
          logger("Can't find click photo btn");
          return false;
        }
      } else {
        logger('So anh random khong hop le');
        return false;
      }
      return true;
    } catch (error) {
      logger(error);
      return false;
    }
  };
  const inputContent = async (page, CreatePost) => {
    try {
      // Input text
      if (
        (await checkExistElementOnScreen(page, '#screen-root > div > div:nth-child(2) > div:nth-child(5) > div')) === 0
      ) {
        let inputTextSelector = '#screen-root > div > div:nth-child(2) > div:nth-child(5) > div > div';
        const InputTextContent = await getElement(page, inputTextSelector);
  
        if (CreatePost.text.length > 0) {
          const randomTextIndex = getRandomIntBetween(0, CreatePost.text.length);
          logger('randomTextIndex ' + randomTextIndex);
  
          await clickElement(InputTextContent);
  
          logger('Clicked input content');
          await InputTextContent.type(CreatePost.text[randomTextIndex], { delay: 100 });
          logger('Hoan tat nhap content');
          await delay(2000);
          return true;
        } else {
          logger('Text is empty');
          return false;
        }
      } else {
        logger("Can't input content");
        return false;
      }
    } catch (error) {
      logger(error);
      return false;
    }
  };

  try {
    const object = ${strSetting}
    //Check obj start < end ? random(start,end) : random(end,start)
    let CreatePost = await checkObject(object);
    // check page is live reutrn -1, return 1, return 0
    const checkPageIsLive = await checkIsLive(page);
    if (!checkPageIsLive) return -1;
  
    // check is login: get cookie reutrn -1, return 1, return 0
    // const isLogin = await checkLogin(page);
    // if (!isLogin) return -1;
    let count = 0;
    const numberOfPost = getRandomIntBetween(CreatePost.postStart, CreatePost.postEnd);
    logger('can create ' + numberOfPost + 'bai');
    while (count < numberOfPost) {
      await returnHomePage(page);
      if (
        (await checkExistElementOnScreen(
          page,
          '#screen-root > div > div:nth-child(1) > div > div > div:nth-child(3) > div > div:nth-child(2) > div',
        )) == 0
      ) {
        const redictCreatePost = await getElement(
          page,
          '#screen-root > div > div:nth-child(1) > div > div > div:nth-child(3) > div > div:nth-child(2) > div',
        );
        await clickElement(redictCreatePost);
        await delay(1000);
  
        // Text/photo
        if (CreatePost.option === 'text/photo') {
          const inputContentResult = await inputContent(page, CreatePost);
          if (inputContentResult) {
            logger('Done input content');
          } else {
            logger('Khong the nhap content ');
            return 0;
          }
          const uploadImgResult = await uploadImg(page, CreatePost);
          if (uploadImgResult) {
            logger('Upload image successful');
          } else {
            logger("Can't upload image");
          }
          // TAG
          if (CreatePost.isTag) {
            const resultTag = await tagFriend(page, CreatePost);
            logger("resultTag " + resultTag);
            if(resultTag){
              logger("Tag thanh cong");
            }
            else{
              logger("Khong tag ban be thanh cong");
            }
          }
        } else {
          // Using background
          const background = await getElements(
            page,
            '#screen-root > div > div:nth-child(2) > div.m.hscroller.no-hscroller > div > div:nth-child(2)',
            5,
          );
  
          await delay(2000);
          const randomBackground = getRandomIntBetween(1, background.length);
          if ((await checkExistElementOnScreen(page, background[randomBackground])) !== 0) {
            await background[randomBackground].evaluate((el) => {
              el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            });
            await delay(2000);
          }
          await clickElement(background[randomBackground]);
          await delay(2000);
          const inputContentResult = await inputContent(page, CreatePost);
          if (inputContentResult) {
            logger('Done input content');
          } else {
            logger('Khong the nhap content ');
            return 0;
          }
        }
        // Click Post content
        if ((await checkExistElementOnScreen(page, 'button.native-text')) == 0) {
          const PostBtn = await getElements(page, 'button.native-text');
          if (PostBtn.length > 0) {
            await clickElement(PostBtn[PostBtn.length - 1]);
            logger('Da click post');
            await delay(2000);
          } else {
            logger('Button choose image is empty');
            return 0;
          }
        } else {
          logger("Can't find post button");
          return 0;
        }
      } else {
        logger("Can't post status");
        break;
      }
  
      count++;
      logger('Creat post done');
      await delay(getRandomIntBetween(CreatePost.delayTimeStart, CreatePost.delayTimeEnd) * 1000);
    }
    return 1;
  } catch (error) {
    logger(error);
  }
`;
};
