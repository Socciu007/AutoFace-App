export const loginFacebook = (account) => {
  const accountStr = `{
        uid: ${JSON.stringify(account.uid)},
        password:${JSON.stringify(account.password)},
        recoveryEmail:${JSON.stringify(account.recoveryEmail)},
        recoveryPassword:${JSON.stringify(account.recoveryPassword)},
        cookies:${JSON.stringify(account.cookies)},
        token:${JSON.stringify(account.token)},
        code2fa:${JSON.stringify(account.code2fa)}
    }`;

  return `
    try{
        const account = ${accountStr}
        const checkPageIsLive = await checkIsLive(page);
    if (!checkPageIsLive){
        logger("Page null!");
        return false;
    }
    await returnHomePage(page);
    await delay(2000);
    const { isLogin, error } = await checkLogin(page);
   
    if(!isLogin){
        if(account.cookies && account.cookies.length){
        const cookies = [];
        account.cookies.split(";").forEach(acc =>{
            if(acc.split("=")[0] && acc.split("=")[0].length && acc.split("=")[1]){
            cookies.push({
                name: acc.split("=")[0].trim(),
                value:  acc.split("=")[1],
                domain:'.facebook.com',
                expires: acc.split("=")[0].trim()== "presence"?-1:moment().add(180,'days').unix()
            });
            }
        });
        logger(cookies);
        const client = await page.target().createCDPSession();
        await client.send('Network.clearBrowserCookies');
        await client.send('Network.clearBrowserCache');
        await page.setCookie(...cookies);
        await delay(3000);
        await page.goto('https://m.facebook.com/', {
          waitUntil: 'networkidle2',
          timeout: 60000,
        });
        await delay(3000);
        const {isLogin, error} = await checkLogin(page);
        if(isLogin){
           return { isLogin:true, error:null };
        }
        else {
            return { isLogin, error };
        }
    }
    else if(account.code2fa && account.code2fa.length){
        
    }
    else return { isLogin:false, error: '2FA and Cookies not found!' };
    }
    
        
    }catch(err){
        logger(err)
        return false;
    }
    `;
};
