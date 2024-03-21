export const changeInformation = (script, account) => {
  const scriptStr = `{
                isBio: ${script.isBio},
                typeBio:${JSON.stringify(script.typeBio)},
                bio:${JSON.stringify(script.bio)},
                isWork: ${script.isWork},
                work:${JSON.stringify(script.work)},
                isHighSchool: ${script.isHighSchool},
                highSchool:${JSON.stringify(script.highSchool)},
                isColege: ${script.isColege},
                colege:${JSON.stringify(script.colege)},
                isCity: ${script.isCity},
                city:${JSON.stringify(script.city)},
                isHometown: ${script.isHometown},
                hometown:${JSON.stringify(script.hometown)},
                isRelationship: ${script.isRelationship},
                relationship:${JSON.stringify(script.relationship)},
                isGender: ${script.isGender},
                gender:${JSON.stringify(script.gender)},
                isBirthday: ${script.isBirthday},
                birthday:${JSON.stringify(script.birthday)},
                isNickname: ${script.isNickname},
                nickname:${JSON.stringify(script.nickname)},
            }`;
  const accountStr = `{
                uid: ${JSON.stringify(account.uid)},
                password:${JSON.stringify(account.password)},
                recoveryEmail:${JSON.stringify(account.recoveryEmail)},
                recoveryPassword:${JSON.stringify(account.recoveryPassword)},
                cookies:${JSON.stringify(account.cookies)},
                token:${JSON.stringify(account.token)},
                twoFA:${JSON.stringify(account.twoFA)}
            }`;

  return `{
    try {
      const clearText = async (page, selector) => {
        await page.focus(selector);
        await page.keyboard.down("Control");
        await page.keyboard.press("A");
        await page.keyboard.up("Control");
        await page.keyboard.press("Backspace");
        await delay(500);
      };
  
      const clickElementByHref = async (page, link) => {
        try {
          let isClick = false;
          const links = await getElements(page, "a");
          if (links && links.length) {
            for (let i = 0; i < links.length; i++) {
              const href = await links[i].evaluate((element) => element.href);
              if (href && href.toString().includes(link)) {
                await scrollSmoothElementInfo(page, links[i]);
                await delay(1000);
                await links[i].click();
                await delay(7000);
                isClick = true;
                break;
              }
            }
          }
          return isClick;
        } catch (e) {
          logger(e);
          return false;
        }
      };
  
      const profilePage = async (page) => {
        if (
          page.url().includes("https://mbasic.facebook.com/profile.php") &&
          page.url().includes("v=info")
        ) {
          return;
        }
        if (page.url() !== "https://mbasic.facebook.com/profile.php") {
          await page.goto("https://mbasic.facebook.com/profile.php", {
            waitUntil: "networkidle2",
            timeout: 60000,
          });
          await delay(2000);
        }
  
        const isClick = await clickElementByHref(page, "v=info");
        if (!isClick) {
          await page.goto("https://mbasic.facebook.com/profile.php?v=info", {
            waitUntil: "networkidle2",
            timeout: 60000,
          });
          await delay(2000);
        }
      };
  
      const script = ${scriptStr};
      const account = ${accountStr};
      const checkPageIsLive = checkIsLive(page);
      if (!checkPageIsLive) {
        logger("Page null!");
        return false;
      }
  
      if (script.isBio && script.bio && script.bio.length) {
        await profilePage(page);
        let bio = script.bio[getRandomIntBetween(0, script.bio.length)];
        if (bio.length > 101) {
          bio = bio.substring(0, 100);
        }
        await clickElementByHref(page, "intro/bio/");
  
        const input = await getElement(page, '[name="bio"]', 7);
        if (input) {
          await clearText(page, '[name="bio"]');
          await input.type(bio, { delay: 10 });
          await delay(1000);
          const submit = await getElement(page, '[id="root"] [type="submit"]');
          if (submit) {
            await submit.click();
            await delay(5000);
          }
        }
      }
  
      if (script.isWork && script.work && script.work.length) {
        await profilePage(page);
        let work = script.work[getRandomIntBetween(0, script.work.length)];
        await clickElementByHref(page, "eduwork/add");
        const input = await getElement(page, '[id="root"] [name="query"]', 7);
        if (input) {
          await clearText(page, '[id="root"] [name="query"]');
          await input.type(work, { delay: 10 });
          await delay(1000);
          const submit = await getElement(page, '[id="root"] [type="submit"]');
          if (submit) {
            await submit.click();
            await delay(7000);
            await clickElementByHref(page, "create/exp/work/");
            const submit1 = await getElement(
              page,
              '[id="root"] [type="submit"]',
              3
            );
            if (submit1) {
              await submit1.click();
              await delay(7000);
            }
          }
        }
      }
  
      if (script.isHighSchool && script.highSchool && script.highSchool.length) {
        await profilePage(page);
        let highSchool =
          script.highSchool[getRandomIntBetween(0, script.highSchool.length)];
        const isClick = await clickElementByHref(page, "eduwork/add?type=10&");
        if (!isClick) {
          await page.goto(
            "https://mbasic.facebook.com/editprofile/eduwork/add?type=10",
            {
              waitUntil: "networkidle2",
              timeout: 60000,
            }
          );
          await delay(2000);
        }
        const input = await getElement(page, '[id="root"] [name="query"]', 7);
        if (input) {
          await clearText(page, '[id="root"] [name="query"]');
          await input.type(highSchool, { delay: 10 });
          await delay(1000);
          const submit = await getElement(page, '[id="root"] [type="submit"]');
          if (submit) {
            await submit.click();
            await delay(7000);
            await clickElementByHref(page, "create/exp/edu");
            const submit1 = await getElement(
              page,
              '[id="root"] [type="submit"]',
              3
            );
            if (submit1) {
              await submit1.click();
              await delay(7000);
            }
          }
        }
      }
  
      if (script.isColege && script.colege && script.colege.length) {
        await profilePage(page);
        let colege = script.colege[getRandomIntBetween(0, script.colege.length)];
  
        const isClick = await clickElementByHref(page, "eduwork/add?type=1&");
        if (!isClick) {
          await page.goto(
            "https://mbasic.facebook.com/editprofile/eduwork/add?type=1",
            {
              waitUntil: "networkidle2",
              timeout: 60000,
            }
          );
          await delay(2000);
        }
  
        const input = await getElement(page, '[id="root"] [name="query"]', 7);
        if (input) {
          await clearText(page, '[id="root"] [name="query"]');
          await input.type(colege, { delay: 10 });
          await delay(1000);
          const submit = await getElement(page, '[id="root"] [type="submit"]');
          if (submit) {
            await submit.click();
            await delay(7000);
            await clickElementByHref(page, "create/exp/edu");
            const submit1 = await getElement(
              page,
              '[id="root"] [type="submit"]',
              3
            );
            if (submit1) {
              await submit1.click();
              await delay(7000);
            }
          }
        }
      }
  
      if (script.isCity && script.city && script.city.length) {
        await profilePage(page);
        let city = script.city[getRandomIntBetween(0, script.city.length)];
  
        const isClick = await clickElementByHref(
          page,
          "type=basic&edit=current_city"
        );
        if (!isClick) {
          await page.goto(
            "https://mbasic.facebook.com/editprofile?type=basic&edit=current_city",
            {
              waitUntil: "networkidle2",
              timeout: 60000,
            }
          );
          await delay(2000);
        }
  
        const input = await getElement(page, '[name="current_city[]"]', 7);
        if (input) {
          await clearText(page, '[name="current_city[]"]');
          await input.type(city, { delay: 10 });
          await delay(1000);
          const submit = await getElement(page, '[name="save"]');
          if (submit) {
            await submit.click();
            await delay(7000);
            const submit1 = await getElement(page, '[name="save"]');
            if (submit1) {
              await submit1.click();
              await delay(7000);
            }
          }
        }
      }
  
      if (script.isHometown && script.hometown && script.hometown.length) {
        await profilePage(page);
        let hometown = script.hometown[getRandomIntBetween(0, script.hometown.length)];
  
        const isClick = await clickElementByHref(
          page,
          "type=basic&edit=hometown"
        );
        if (!isClick) {
          await page.goto(
            "https://mbasic.facebook.com/editprofile?type=basic&edit=hometown",
            {
              waitUntil: "networkidle2",
              timeout: 60000,
            }
          );
          await delay(2000);
        }
  
        const input = await getElement(page, '[name="hometown[]"]', 7);
        if (input) {
          await clearText(page, '[name="hometown[]"]');
          await input.type(hometown, { delay: 10 });
          await delay(1000);
          const submit = await getElement(page, '[name="save"]');
          if (submit) {
            await submit.click();
            await delay(7000);
            const submit1 = await getElement(page, '[name="save"]');
            if (submit1) {
              await submit1.click();
              await delay(7000);
            }
          }
        }
      }
  
      if (script.isRelationship) {
        await profilePage(page);
        const isClick = await clickElementByHref(
          page,
          "type=basic&edit=relationship"
        );
        if (!isClick) {
          await page.goto(
            "https://mbasic.facebook.com/editprofile?type=basic&edit=relationship",
            {
              waitUntil: "networkidle2",
              timeout: 60000,
            }
          );
          await delay(2000);
        }
  
        let url = "type=basic&edit=relationship&action=";
  
        switch (script.relationship) {
          case "random":
            const rd = getRandomIntBetween(1, 11);
            url += rd.toString();
            break;
          case "single":
            url += "1";
            break;
          case "couple":
            url += "2";
            break;
          case "engaged":
            url += "5";
            break;
          case "married":
            url += "4";
            break;
          case "civilUnion":
            url += "10";
            break;
          case "partnership":
            url += "11";
            break;
          case "openRelationship":
            url += "3";
            break;
          case "complicated":
            url += "6";
            break;
          case "separated":
            url += "8";
            break;
          case "divorced":
            url += "9";
            break;
          case "windowed":
            url += "7";
            break;
          default:
            url += "1";
        }
  
        const click = await clickElementByHref(page, url);
        if (!click) {
          await page.goto("https://mbasic.facebook.com/editprofile?" + url, {
            waitUntil: "networkidle2",
            timeout: 60000,
          });
          await delay(2000);
        }
  
        const submit = await getElement(page, '[name="save"]');
        if (submit) {
          await submit.click();
          await delay(7000);
        }
      }
  
      if (script.isGender) {
        await profilePage(page);
        const isClick = await clickElementByHref(page, "type=basic&edit=gender");
        if (!isClick) {
          await page.goto(
            "https://mbasic.facebook.com/editprofile?type=basic&edit=gender",
            {
              waitUntil: "networkidle2",
              timeout: 60000,
            }
          );
          await delay(2000);
        }
  
        let radioBtn;
  
        switch (script.gender) {
          case "random":
            const rd = getRandomIntBetween(0, 10);
            if (rd < 5) {
              radioBtn = await getElement(page, '[type="radio"][value="2"]');
            } else {
              radioBtn = await getElement(page, '[type="radio"][value="1"]');
            }
            break;
          case "male":
            radioBtn = await getElement(page, '[type="radio"][value="2"]');
            break;
          case "female":
            radioBtn = await getElement(page, '[type="radio"][value="1"]');
            break;
          default:
            radioBtn = await getElement(page, '[type="radio"][value="1"]');
        }
  
        if (radioBtn) {
          await radioBtn.click();
          await delay(1000);
        }
        const submit = await getElement(page, '[name="save"]');
        if (submit) {
          await submit.click();
          await delay(7000);
        }
      }
  
      if (script.isNickname && script.nickname && script.nickname.length) {
        await profilePage(page);
        let nickname = script.nickname[getRandomIntBetween(0, script.nickname.length)];
  
        const isClick = await clickElementByHref(
          page,
          "/profile/edit/info/nicknames"
        );
        if (!isClick) {
          await page.goto(
            "https://mbasic.facebook.com/profile/edit/info/nicknames",
            {
              waitUntil: "networkidle2",
              timeout: 60000,
            }
          );
          await delay(2000);
        }
  
        const input = await getElement(page, '[name="text"]', 7);
        if (input) {
          await clearText(page, '[name="text"]');
          await input.type(nickname, { delay: 10 });
          await delay(1000);
          const submit = await getElement(page, '[name="save"]');
          if (submit) {
            await submit.click();
            await delay(7000);
            const submit1 = await getElement(page, '[name="save"]');
            if (submit1) {
              await submit1.click();
              await delay(7000);
            }
          }
        }
      }
  
      if (script.isBirthday) {
        
        await profilePage(page);
        const isClick = await clickElementByHref(
          page,
          "type=basic&edit=birthday"
        );
        if (!isClick) {
          await page.goto(
            "https://mbasic.facebook.com/editprofile?type=basic&edit=birthday",
            {
              waitUntil: "networkidle2",
              timeout: 60000,
            }
          );
          await delay(2000);
        }
        let day = '1';
        let month = '2';
        let year = '2000';
        switch (script.birthday.type) {
          case "random":
            const date18 = new Date(
              new Date().setFullYear(new Date().getFullYear() - 18)
            );
            const date35 = new Date(
              new Date().setFullYear(new Date().getFullYear() - 35)
            );
            const rdDate = new Date(
              date18.getTime() +
                Math.random() * (date35.getTime() - date18.getTime())
            );
            const strDate = moment(rdDate, 'YYYY/MM/DD');
            day = strDate.format('D');
            month = strDate.format('M');
            year  = strDate.format('YYYY');
            break;
          case "specific":
            if(script.birthday.day && script.birthday.day.length){
                logger(script.birthday.day  .length);
                day = script.birthday.day[getRandomIntBetween(0, script.birthday.day.length)];
                logger(day);
            }
            if(script.birthday.month && script.birthday.month.length){
                logger(script.birthday.month.length);
                month = script.birthday.month[getRandomIntBetween(0, script.birthday.month.length)];
                logger(month);
            }
            if(script.birthday.year && script.birthday.year.length){
                logger(script.birthday.year.length);
                year = script.birthday.year[getRandomIntBetween(0, script.birthday.year.length)];
                logger(year);
            }
            break;
        }

return;
        const elDay = await getElement(page,'[id="day"]');
        if(elDay){
            await elDay.click();
            await delay(1000);
            const options = await getElements(page,'[id="day"] option');
            if(options && options.length){
                for(let i=0;i<options.length; i++){
                    const text = await options[i].evaluate((element) => element.value);
                    if(text.toString().includes(day.toString()))
                    {
                        await page.select('[id="day"]', text);
                        await delay(1000);
                        break;
                    }
                }
            }
        }

        const elMonth = await getElement(page,'[id="month"]');
        if(elMonth){
            await elMonth.click();
            await delay(1000);
            const options = await getElements(page,'[id="month"] option');
            if(options && options.length){
                for(let i=0;i<options.length; i++){
                    const text = await options[i].evaluate((element) => element.value);
                    if(text.toString().includes(month.toString()))
                    {
                        await page.select('[id="month"]', text);
                        await delay(1000);
                        break;
                       
                    }
                }
            }
        }

        const elYear = await getElement(page,'[id="year"]');
        if(elYear){
            await elYear.click();
            await delay(1000);
            const options = await getElements(page,'[id="year"] option');
            if(options && options.length){
                for(let i=0;i<options.length; i++){
                    const text = await options[i].evaluate((element) => element.value);
                    if(text.toString().includes(year.toString()))
                    {
                        await page.select('[id="year"]', text);
                        await delay(1000);
                        break;
                    }
                }
            }
        }

        const submit = await getElement(page, '[name="save"]');
          if (submit) {
            await submit.click();
            await delay(7000);
            const checkbox = await getElement(page,'[name="birthday_confirmation"]');
            if(checkbox){
                await checkbox.click();
                await delay(1000);
            }
            const submit1 = await getElement(page, '[name="save"]');
            if (submit1) {
              await submit1.click();
              await delay(7000);
            }
          }
      }
    } catch (e) {
      logger(e);
      logger("Debug|Infor|Change infomation Fail");
    }
  }`;
};
