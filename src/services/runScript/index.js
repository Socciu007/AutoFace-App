import { storageSettings } from '../../common/const.config';
import { getDB } from '../socket';
import Promise from 'bluebird';

const delay = async (time) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};

export const runScript = async (profileSelected, scriptDesign) => {
  console.log(profileSelected);
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

    console.log(arrfunction);
    console.log('Run profile ' + profileSelected[i].profile);
    for (let j = 0; j < arrfunction.length; j++) {
      await convertToFunc(arrfunction[j]);
    }
  }
};

const convertToFunc = (script) => {
  switch (script.typeNode) {
    case 'newsFeed':
      return newFeed(script);
    case 'createPost':
      return createPost(script);
  }
};

const newFeed = async (setting) => {
  console.log(setting);
  console.log('NEWFEED');
  await delay(3000);
};

const createPost = async (setting) => {
  console.log('CREATE POST');
  console.log('postStart ' + setting.postStart);
  await delay(4000);
};
