'use strict';
const {dialogflow, SimpleResponse, BasicCard, Button, Image} = require('actions-on-google');
const functions = require('firebase-functions');
const app = dialogflow({debug: true});
const Utils = require('./src/utils');
const Layouts = require('./src/layouts');
const Weapons = require('./src/weapons');
const Enemies = require('./src/enemies');
const ItemDescriptions = require('./src/itemDescriptions');
const Battle = require('./src/battle');
const descriptions = require('./src/descriptions');
const {google} = require('googleapis');

const host = 'https://rogue-iivpmj.web.app/';
var audiourl = host + 'Rogue0.opus';


// const Reprompts = require('./src/reprompts')
// const Texts = require('./src/texts')
// const app = dialogflow({debug: true});

// const {WebhookClient} = require('dialogflow-fulfillment');
// const fbc = 3;
// const repc = 1;
// const valmis = '100K.ogg';

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

// app.intent('Default Welcome Intent', (conv) => {
//     //Muuttujia
//     conv.data.weapon = ['Old dagger','W','D','10','B','3',''];
//     conv.data.armour = '';
//     conv.data.name = '';
//     conv.data.state = ['','','',0];
//     conv.data.fallbackCount = 0;
//     conv.data.depth = 1;
//     conv.data.level = 1;
//     conv.data.int = 3;
//     conv.data.str = 3;
//     conv.data.dex = 3;
//     conv.data.vig = 3;
//     conv.data.lck = 3;
//     conv.data.attributes = [3,3,3,3,3];
//     conv.data.node = 0;
//     conv.data.visited = [];
//     conv.data.layout = [];
//     conv.data.enemies =
//     conv.data.chests = [];
//     conv.data.enemy = [];
//     conv.data.foundWeapon = [];
//
//     // if (conv.surface.capabilities.has('actions.capability.WEB_BROWSER')) {
//     // }
//     // if (conv.user.verification === 'VERIFIED' && conv.user.last.seen && conv.user.storage.day > 0 && conv.user.storage.day < 5) {
//     //   }
//     txt = 'Welcome adventurer! I am the Rogue Master! You are about to embark on a perilous journey into an ever changing mythical dungeon.' +
//     'No one really knows what lies in the depths of this dungeon, but the lowest layer is rumoured to hold the chalice of life, ' +
//     ' an ancient artifact of a long lost civilization holding power over life and death themselves. '+
//     'During your adventure you will encounter foul enemies, vicious traps and of course treasures of immesurable value. '+
//     'Before you embark on your perilous journey, let´s see who you really are starting with your name. What is it?';
//     const ssml = Utils.speak(txt);
//     conv.ask(new SimpleResponse({speech: ssml, text: ' '}));
//     if (conv.screen) {
//       conv.ask(new BasicCard({
//       text: txt,
//       title: 'Rogue Master',
//       image: new Image({
//         url: host + 'logo.jpg',
//         alt: 'Rogue'
//       }),
//       display: 'CROPPED'
//     }));
//   }
// });

app.intent('Default Welcome Intent', (conv) => {
  conv.data.state = ['','','',0];
  conv.data.depth = 1;
  conv.data.level = 1;
  conv.data.int = 3;
  conv.data.str = 3;
  conv.data.dex = 3;
  conv.data.vig = 3;
  conv.data.lck = 3;
  conv.data.node = 0;
  conv.data.visited = [];
  conv.data.layout = [];
  conv.data.enemies =
  conv.data.chests = [];
  conv.data.enemy = [];
  conv.data.foundWeapon = [];
  conv.data.fallbackCount = 0;
  audiourl = host + 'Rogue0.opus';
  var txt = 'Welcome adventurer! Are you the new Rogue Master? You are about to embark on a perilous journey into an ever changing mythical dungeon.' +
       'No one really knows what lies in the depths of this dungeon, but the lowest layer is rumoured to hold the chalice of life, ' +
       ' an ancient artifact of a long lost civilization holding power over life and death themselves. '+
       'During your adventure you will encounter foul enemies, vicious traps and of course treasures of immesurable value. '+
       'Before you embark on your perilous journey, let´s see who you really are starting with your name. What is it?';
  const ssml = Utils.playSimple(audiourl,txt);
  conv.ask(ssml);
});



app.intent('Help', (conv) => {
    conv.data.fallbackCount = 0;
    const txt = `You can move to other rooms with command “go“ accompanied with the direction, like “go north“ or “go down“. ` +
    `If there are enemies present, this commands lets you try to sneak past them. You can also use “go back“ or “retreat“ in such situation. ` +
    `You can attack an enemy with the command “attack“ or specifying how to attack, like “attack with sword“ ` +
    //`To review your inventory use command “inventory“. At the beginning you have limited space and equipment but you will ` +
    //` most probably find upgrades along the way. ` +
    `“Explore command“ let's you explore an empty room for hidden traps and treasures. ` +
    ` With “inspect“ command you can examine different points of interests, such as chests or monuments. ` +
    `Chests can be opened with “open“ command and traps disarmed with “disarm“ command ` +
    //`You can review your character status with “status“ command and find explanation about the stats and different attributes within ` +
    //`status with “attributes“ command. You can at anytime refer to this help with “help“ command.  ` +
    ` Say ready to continue `;
    const ssml = Utils.speak(txt);
    if (conv.data.state[0] === 'e_stats2') {
      conv.contexts.set('starter',1,{});
    }
    conv.ask(new SimpleResponse({speech: ssml, text: txt}));
});

app.intent('Helper', (conv) => {
  const eve = conv.data.state[0];
  const resp = conv.data.state[1]
  const ctx = conv.data.state[2]
  conv.contexts.set(ctx,1,{});
  if (eve === 'e_explore') {
    return conv.followup(eve, {
          direction: conv.data.state[2]
        });
  } else if (eve === 'e_action') {
    return conv.followup('e_action', {
          action: resp
        });
  } else {
      conv.contexts.set('starter',1,{});
      return conv.followup('e_adventurestart', {
        response: 'ready'
      });
    }
});

app.intent('Name', (conv,{'given-name': name}) => {
    conv.data.fallbackCount = 0;
    conv.data.state = ['e_name',name,'name',0];
    const txt = `Hello ${name}! Is this the name you will choose?`;
    const ssml = Utils.playSimple(audiourl,txt);
    conv.data.name = name;
    conv.ask(new SimpleResponse({speech: ssml, text: txt}));
});

app.intent('NameConfirmation', (conv,{binary}) => {
    conv.data.fallbackCount = 0;
    conv.data.state = ['e_nameconf',binary,'nameconf',0];
    var txt = "Wonderful! Now as is known throughout this kingdom the potency of the character is determined mainly by" +
    " three attributes: strength, dexterity and intelligence. The strength affects the ability to handle heavy weapons and armour," +
    " while dexterity has an impact on the ability to deal with lighter armour and weaponry and finally intelligence allows person to" +
    " draw arcane arts from the corners of one's mind. You will be equipped according to one these aspects. Now, which of " +
    " these attributes do you align yourself with. Strength, dexterity or intelligence?";
    if (binary === 'yes') {
      conv.contexts.set('stats1',1,{});
    } else {
      conv.contexts.set('name',1,{});
      txt = "Okay, let's try this again, what is the name you prefer?";
    }
    const ssml = Utils.playSimple(audiourl,txt);
    conv.ask(ssml);
});

app.intent('Stats1', (conv,{attributes}) => {
    conv.data.fallbackCount = 0;
    conv.data.state = ['e_stats1',attributes,'stats1',0];
    var addtxt = '';
    if (attributes === 'intelligence') {
      addtxt = 'A smart one eh?';
      conv.data.int += 2;
    } else if (attributes === 'strength'){
      addtxt = 'Your presence is indeed hulking.';
      conv.data.str += 2;
    } else {
      addtxt = 'You look nimble enough.';
      conv.data.dex += 2;
    }
    const txt = addtxt + " In addition to these three attributes, there are two other affecting the traits of your character, " +
    " luck and vigor, the first increasing your odds in many types of encounters and latter making you more resilient. " +
    " Feeling lucky or headstrong? Do you align yourself rather with luck or vigor?";
    const ssml = Utils.playSimple(audiourl,txt);
    conv.ask(ssml);
});

app.intent('Stats2', (conv,{attributes}) => {
    conv.data.fallbackCount = 0;
    conv.data.state = ['e_stats2',attributes,'stats2',0];
    const txt = "Splendid! You are now ready to start your adventure. You can at anytime refer to help to refer to your control options. " +
    " Would you like to go through the commands or start the adventure?";
    if (attributes === 'luck') {
      conv.data.lck += 2;
    } else {
      conv.data.vig += 2;
    }
    const ssml = Utils.playSimple(audiourl,txt);
    conv.ask(ssml);
});

app.intent('AdventureStart', (conv) => {
    conv.data.fallbackCount = 0;
    conv.data.state = ['e_adventurestart','start','starter',0];
    conv.data.attributes = [conv.data.str, conv.data.dex,conv.data.int,conv.data.vig,conv.data.lck];
    var weapon = '';
    if (conv.data.int > 3) {
      conv.data.weapon = ['staff','S','I','15','B','3',''];
      conv.data.armour = 'Wizardy robe';

    } else if (conv.data.str > 3) {
      conv.data.weapon = ['mace','W','S','20','C','3',''];
      conv.data.armour = 'Chainmail';
    } else {
      conv.data.weapon = ['shortsword','W','D','10','B','3',''];
      conv.data.armour = 'Leather armour';
    }
    const txt = "You stand at the entrance of the labyrinth. The dungeon emanates sinister vibes. You are wearing a " + conv.data.armour +
    " and equipped with a " + conv.data.weapon[0] + ". The entrance lies to the north.";
    const ssml = Utils.playSimple(audiourl,txt);
    conv.ask(ssml);
});

app.intent('AdventureAction', (conv, {action,direction}) => {
  var ctx = '';
  if (action === 'attack') {
    ctx = 'attack';
  } else if (action === 'open') {
    ctx = 'open'
  } else if (action === 'inspect') {
    ctx = 'inspect';
  } else if (action === 'disarm'){
    ctx = 'disarm';
  } else if (direction) {
    ctx ='explore';
    conv.contexts.set('explore',1,{});
    return conv.followup('e_explore', {
        direction: direction
      });
  } else {
    ctx='unknown';
  }
  const eve = 'e_' + ctx;
  conv.contexts.set(ctx,1,{});
  return conv.followup(eve, {
    //raw input johki muuttujaan?
      action: ctx
    });
});

app.intent('ActionExplore', (conv, {direction}) => {
    conv.data.fallbackCount = 0;
    conv.data.state = ['e_explore',direction,'explore',conv.data.node];
    var neighbouring;
    var neighbours;
    var directions;
    var txt = ''
    var bugger = '';
    //ehkä joku parempi paikka generoida nää? esim adv start
    if (direction === 'down') {
      audiourl = host + 'RogueOminous.opus';
      bugger = ' Audiourl on nyt ' + audiourl;
    }
    if (conv.data.node === 0 && conv.data.firststeps) {
      audiourl = host + 'Rogue2.opus';
      conv.data.firststeps = false;
      conv.data.visited.push(0);
      txt = 'You have entered the first layer of the labyrinth.'
    } else if (conv.data.node === conv.data.stairs && direction === 'down'){
      conv.data.lvl += 1;
      txt = 'You descend into the the ' + conv.data.level + ' of the labyrinth.'
      conv.data.visited = [0];
    } else {
      //Tähän sneaki mahollisuus yms. suora taistelu?
      if (conv.data.enemies.indexOf(conv.data.node) !== -1) {
        txt = 'You cannot escape the fight what will you do?';
      } else {
        neighbouring = Utils.routeCheck(conv.data.layout[conv.data.node]);
        neighbours = neighbouring[0];
        directions = neighbouring[1];
        var theindx = -1;
        switch (direction) {
          case 'north':
          theindx = directions.indexOf('N');
          break;
          case 'south':
          theindx = directions.indexOf('S');
          break;
          case 'east':
          theindx = directions.indexOf('E');
          break;
          case 'west':
          theindx = directions.indexOf('W');
          break;
          default:
          theindx = -1;
        }
        if (theindx !== -1){
          const nextnode = Number(neighbours[theindx])
          conv.data.node = nextnode;
          //Tee appender
          conv.data.visited.push(nextnode);
          txt = 'You head ' + direction + ' and arrive to a room with '
        } else {
          bugger += ' Ja nyt ' + audiourl;
          txt = 'You cannot go ' + direction + ' from here. You are in a room with ';
        }
        if (conv.data.treasures.indexOf(conv.data.node) !== -1) {
          txt += 'big promising treasure chest and '
        }
        if (conv.data.enemies.indexOf(conv.data.node) !== -1) {
          conv.data.enemy = Enemies.getEnemy(conv.data.depth,conv.data.level,conv.data.node);
          txt += ' a ' + conv.data.enemy[0] + ' gleaming ominously.';
        } else {
          txt += 'no enemies in sight.';
        }
      }
    }
    directions = Utils.routeOptions(conv.data.layout[conv.data.node]);
    neighbouring = Utils.routeCheck(conv.data.layout[conv.data.node]);
    txt += directions + ' With a reconstruction ' + neighbouring[0] + 'vs' + neighbouring[1] + ' for node ' + conv.data.node;
    txt += bugger;
    const ssml = Utils.playSimple(audiourl,txt);
    conv.ask(ssml);
});

app.intent('ActionAttack', (conv) => {
    conv.data.fallbackCount = 0;
    conv.data.state = ['e_attack','attack','attack',conv.data.node];
    var txt = '';
    var battlestate;
    if (conv.data.enemy) {
      battlestate = Battle.simple(conv.data.attributes,conv.data.weapon,conv.data.enemy);
      txt = battlestate[0];
      if (battlestate[1] <= 0 && battlestate[2] <= 0) {
          txt += ' Hmmmmmmm.'
      } else if (battlestate[1] <= 0) {
        txt += ' You died at the hands of a vicious ' + conv.data.enemy[0] + '. Goodbye false hero!';
        conv.close(txt);
      } else if (battlestate[2] <= 0){
        txt += ' You will gain xp in the future.'
      }
    } else {
      txt = 'There are no enemies here.';
    }
    // if (conv.data.weapon[2] === 'S') {
    //   txt = 'You hit the training dummy with your ' + conv.data.weapon[0] + ' with an unprecedent force. It stands no chance against your frantic blows.';
    // } else if (conv.data.weapon[2] === 'D') {
    //   txt = 'You attack the training dummy with your ' + conv.data.weapon[0] + ' with elegant motion. It stands no chance against your precise cuts.';
    // } else {
    //   txt = 'You unleash the channeled power of your ' + conv.data.weapon[0] + ' upon the dummy. The dummy stands no chance against your magic.';
    // }
    txt += ' What next?'
    const ssml = Utils.playSimple(audiourl,txt);
    conv.ask(ssml);
});

app.intent('ActionOpen', (conv) => {
    conv.data.fallbackCount = 0;
    conv.data.state = ['e_open','open','open',conv.data.node];
    var txt = '';
    var chance = Utils.getRndInt(1,100);
    txt = 'The chest is empty, what a surprise. You missed by ' + chance + ' percent. '
    const wpn = Weapons.getWpn(conv.data.depth,conv.data.level,'random');
    var c_txt = Utils.weaponComparator(wpn, conv.data.weapon, conv.data.attributes);
    const wdescription = ItemDescriptions.upDescription(wpn[0]);
    txt = 'You open the chest and find ' + wdescription + c_txt;
    if (c_txt.substring(0,4) !== 'Alas'){
      conv.data.foundWeapon = wpn;
      conv.contexts.set('switchweapon',1,{});
    } else {
      txt += ' What next?';
    }
    const ssml = Utils.playSimple(audiourl,txt);
    conv.ask(ssml);
});

app.intent('ActionInspect', (conv) => {
    conv.data.fallbackCount = 0;
    conv.data.state = ['e_inspect','inspect','inspect',conv.data.node];
    const txt ='You find nothing of particular interest in here.';
    const ssml = Utils.playSimple(audiourl,txt);
    conv.ask(ssml);
});

app.intent('ActionDisarm', (conv) => {
    conv.data.fallbackCount = 0;
    conv.data.state = ['e_disarm','disarm','disarm',conv.data.node];
    const txt ='You find nothing of particular interest in here.';
    const ssml = Utils.playSimple(audiourl,txt);
    conv.ask(ssml);
});

app.intent('ActionUnknown', (conv) => {
    conv.data.fallbackCount = 0;
    conv.data.state = ['e_unknown','unknown','unknown',conv.data.node];
    const txt ='You cannot do that! But should you? What next?';
    const ssml = Utils.playSimple(audiourl,txt);
    conv.ask(ssml);
});


app.intent('SwitchWeapon', (conv,{binary}) => {
  //checkaa raw input jos sisätlää switch muttei binary
    conv.data.fallbackCount = 0;
    conv.data.state = ['e_switchweapon',binary,'switchweapon',conv.data.node];
    var txt = ''
    if (binary === 'yes') {
      conv.contexts.set('stats1',1,{});
      conv.data.weapon = conv.data.foundWeapon;
      txt = 'You take the ' + conv.data.weapon[0] + ' with you. '
    } else {
      txt = 'You leave the ' + conv.data.foundWeapon[0] + ' on the ground. '
    }
    const ssml = Utils.playSimple(audiourl,txt);
    conv.ask(ssml);
});

app.intent('Shortcut', (conv) => {
  conv.data.layout = Layouts.getLayout();
  var contentfill = Utils.fillLvl(conv.data.layout.length,false);
  conv.data.enemies = contentfill[0];
  conv.data.treasures = contentfill[1];
  conv.data.stairs = contentfill[2][0];
  conv.data.attributes=[20,20,20,20,20];
  conv.data.firststeps = true;
  conv.data.weapon = ['mace','W','S','20','C','3',''];
  conv.data.armour = 'Chainmail';
  conv.data.name = 'Shorty';
  conv.contexts.set('explore',1,{});
  return conv.followup('e_explore', {
      direction: 'north'
    });
});

app.intent('Debugger', (conv) => {
  conv.data.layout = Layouts.getLayout();
  var contentfill = Utils.fillLvl(conv.data.layout.length,true);
  var wpndbg = Weapons.getWpn(1,1,'random',true);
  var txt = contentfill + wpndbg;
  conv.data.attributes=[20,20,20,20,20];
  conv.data.firststeps = true;
  conv.data.weapon = ['mace','W','S','20','C','3',''];
  conv.data.armour = 'Chainmail';
  conv.data.name = 'Shorty';
  conv.contexts.set('action',1,{});
  conv.contexts.set('name',1,{});
  conv.ask(txt)
});

app.catch((conv, e) => {
  console.error(e);
  conv.close('Oops. Something went wrong: ' + e);
});

app.intent('Default Fallback Intent', (conv) => {
  conv.data.fallbackCount++;
  const eve = conv.data.state[0];
  var ctx = '';
  if (eve) {
    ctx = conv.data.state[2];
  } else {
    ctx = 'name';
  }
  conv.contexts.set(ctx,1,{});
  conv.ask('Uh oh you fell into a fallback. The context is ' + conv.dat.state[2] + ' Try saying that again.');

});


exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);
