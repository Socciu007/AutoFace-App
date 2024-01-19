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
  console.log(strSetting);
  return `
  const tagFriendsRandomly = async (page, numberFriendTag) => {
    try {
      let count = 0;
      let selector = "div.m.bg-s3[data-action-id]";
      // Kiểm tra danh sách bạn bè
      const listFriend = await getElements(page, selector, 3);
      if (listFriend.length < 1) {
        selector = "div.m.bg-s4[data-action-id]";
        listFriend = await getElements(page, selector, 3);
        if (listFriend.length < 1){
          logger('Khong co ban be de tag');
          return false;
        } 
      }
      let temp = [];
      while (count < numberFriendTag) {
          console.log("list friend length " + listFriend.length);
          // Chọn một bạn bè ngẫu nhiên từ danh sách và click vào
          let randomFriend = getRandomIntBetween(0, listFriend.length);
          let index = temp.indexOf(randomFriend);
          if (index !== -1) {
            temp.push(randomFriend);
          } else {
            continue;
          }
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
        await delay(5000);
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
      if (numberFriendTag > 0) {
        const tagBtn = await findBtn(page, '󱤇');
        if (!(await isElementVisible(page, tagBtn))) {
          await tagBtn.evaluate((el) => {
            el.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
          });
          await delay(2000);
        }
        await clickElement(tagBtn);
        await delay(2000);
        if (CreatePost.typeTag === 'UIDList') {
          // Tag UID
          logger('Khong the tag bang UID list');
          // await tagFriendsByUIDList(page, CreatePost);
        } else {
          // tag random
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
          await delay(6000);
          return true;
        } else {
          logger("Can't find done tag");
          return false;
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
  
      if (CreatePost.photos.length > 0 && numberPhoto > 0) {
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
            await delay(8000);
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
          await delay(5000);
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

  try {
    const object = ${strSetting}
    //Check obj start < end ? random(start,end) : random(end,start)
    let CreatePost = await checkObject(object);
    // check page is live reutrn -1, return 1, return 0
    const checkPageIsLive = await checkIsLive(page);
    if (!checkPageIsLive) return -1;
    await returnHomePage(page);
    await delay(2000);
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
            return 0;
          }
          await delay(5000);
          // TAG
          if (CreatePost.isTag) {
            await tagFriend(page, CreatePost);
          } else {
            logger('Khong tag ban be');
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
        const PostBtn = await getElement(page, '#screen-root > div > div:nth-child(2) > div:nth-child(2) > div:nth-child(3) > div > div > span');
        if ((await checkExistElementOnScreen(page, '#screen-root > div > div:nth-child(2) > div:nth-child(2) > div:nth-child(3) > div > div > span')) !== 0) {
          await PostBtn.evaluate((el) => {
            el.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
          });
          await delay(2000);
        }
        if (PostBtn) {
          await clickElement(PostBtn);
          console.log('Da click post');
          await delay(5000);
        } else {
          console.log('Button choose image is empty');
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
