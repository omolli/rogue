const utils = {

  playAudio(srcurl, startPoint, endPoint){
    return `<speak><par><media><audio src="${srcurl}" clipBegin="${startPoint}s" clipEnd="${endPoint}s">txt</audio></media></par></speak>`
  },
  playSimple(srcurl,txt){
    return `<speak><par>
      <media xml:id="song" end="txt.end+2s" fadeOutDur="1.5s"><audio src="${srcurl}"></audio></media>
      <media xml:id="txt" begin="1s"><speak><break time="1s" />${txt}</speak></media>
      </par></speak>`
  },
  playSimpleMax(srcurl,txt){
    return `<speak>
      <par><media xml:id="song" end="100s" fadeOutDur="5s"><audio src="${srcurl}">txt</audio></media></par>
      <par><media xml:id="txt" begin="song.begin+0.5s"><speak>${txt}</speak></media></par>
      </speak>`
  },
  playTest(srcurl){
    return `<speak><media><audio src="${srcurl}" /></media></speak>`
  },
  speak(content){
    return `<speak>${content}</speak>`
},
  //do we need? instead of speak?
  playMulti(content){
    return `<speak><par>${content}</par><prosody volume ="silent">a</prosody></speak>`
  },

  appender(str,chr){
    if (str.indexOf(chr) === -1) {
      return str += chr;
    } else {
      return str;
    }
  },
  //Get a random number including min and max.
  getRndInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  },
  routeOptions(arr) {
    var direction = '';
    var txt = 'There is a path to ';
    for (var i=0; i < arr.length; i++){
      direction = arr[i][1];
      switch (direction) {
        case 'N':
          txt += 'the north';
          break;
        case 'S':
          txt += 'the south';
          break;
        case 'E':
          txt += 'the east';
          break;
        case 'W':
          txt += 'the west';
          break;
        default:
          txt += 'somewhere else';
      }
      if (i === arr.length-1) {
        txt += '.';
      } else if (i === arr.length-2){
        txt += ' and to ';
      } else {
        txt += ', to ';
      }
    }
    return txt;
  },
  routeCheck(arr) {
    var neighbours = '';
    var directions = '';
    var i;
    var e = '';
    for (i=0; i < arr.length; i++){
      e = arr[i];
      neighbours = neighbours + e[0];
      directions += e[1];
    }
    return [neighbours,directions];
  },
  fillLvl(nrn,dbg) {
    // this are inversed because they are taken out of the array
    nrm = Math.ceil(nrn/2);
    nrt = Math.floor(nrn/3);
    const stairs = Math.floor(Math.random() * (nrn - nrm )) + nrm;
    var dbugger = '';
    var i;
    var enemies = [];
    var treasures = [];
    for (i = 1; i < nrn; i++) {
      enemies.push(i);
      treasures.push(i);
    }
    dbugger = 'Size of the arrays: ' & treasures.length + ' and nrn ' + nrn;

    var rnd = 0;
    var arrsize = 0;
    for (i=0; i<nrm;i++) {
      arrsize = enemies.length;
      rnd = Math.floor(Math.random() * arrsize);
      dbugger += '. Received random ' + rnd;
      enemies.splice(rnd,1);
    }
    dbugger += ' Aand size of enemies ' + enemies.length;
    for (i=0; i<nrm;i++) {
      arrsize = treasures.length;
      rnd = Math.floor(Math.random() * arrsize);
      treasures.splice(rnd,1);
    }
    var res = [enemies,treasures,[stairs]];
    dbugger += ' res formed ' + res.length;
    if (res.length > 0 && res[0]){
      dbugger += ' res[0] ' + res[0].length + ' .';
    }
    if (dbg) {
      return dbugger;
    }
    return [enemies,treasures,[stairs]];
  },
  weaponComparator(w1,w2,atr){
    //Tee tälle tiedonhaulle oma funktio!! tarvii kuitenkin, joku switchi vaikka tohon attribuutti checkiin
    var new_txt = '';
    var new_bonus = '';
    var new_atr = '';
    var old_bonus = '';
    var old_atr = '';
    var reqfail = false;
    switch (w1[4]) {
      case 'A':
        new_bonus = 'superb';
        break;
      case 'B':
        new_bonus = 'good';
        break;
      case 'C':
        new_bonus = 'moderate';
        break;
      case 'D':
        new_bonus = 'slight';
        break;
      default:
        new_bonus = 'occult';
        break;
    }
    switch (w2[4]) {
      case 'A':
        old_bonus = 'superb';
        break;
      case 'B':
        old_bonus = 'good';
        break;
      case 'C':
        old_bonus = 'moderate';
        break;
      case 'D':
        new_bonus = 'slight';
        break;
      default:
        new_bonus = 'occult';
        break;
    }
    switch (w1[2]) {
      case 'D':
      new_atr = 'dexterity';
      if (w1[5] > atr[1]) {
        reqfail = true;
      }
        break;
      case 'I':
      new_atr = 'intelligence';
      if (w1[5] > atr[2]) {
        reqfail = true;
      }
        break;
      case 'S':
      new_atr = 'strength';
      if (w1[5] > atr[0]) {
        reqfail = true;
      }
        break;
      default:
        break;
    }
    switch (w2[2]) {
      case 'D':
      old_atr = 'dexterity';
        break;
      case 'I':
      old_atr = 'intelligence';
        break;
      case 'S':
      old_atr = 'strength';
        break;
      default:
        break;
    }
    if (reqfail) {
      new_txt = 'Alas, you do not posess the required ' + new_atr + ' to wield this weapon.';
    } else {
      new_txt = 'This weapons has a base damage of ' + w1[3] + ' and it gains a ' + new_bonus + ' damage bonus based on your ' + new_atr +
      '. Your old weapon has a base damage of ' + w2[3] + ' and it gains a ' + old_bonus + ' damage bonus based on your ' + old_atr +
      ' . Will you switch weapons?';
    }
    return new_txt
  },
  selector(choices,response) {
    switch (response) {
      case 'one':
        return choices[0];
      case 'two':
        return choices[1];
      case 'three':
        if (choices.length > 2) {
          return choices[2];
        } else {
          return 'notresponse';
        }
      default:
        return 'notresponse';
    }
  },
  pusher(str) {
    var choices = [];
    var url = '';
    if (str.length < 1) {
      return ['XXX',['do','part','long']]
    }
    if (str.indexOf('A') === -1) {
      choices.push('do');
      url += '1';
    }
    if (str.indexOf('B') === -1) {
      choices.push('part');
      url += '2';
    }
    if (str.indexOf('C') === -1) {
      choices.push('long');
      url += '3';
    }
    if (str.indexOf('D') === -1) {
      choices.push('pigeon');
      url += '4'
      }
    if (str.indexOf('E') === -1) {
      choices.push('pond');
      url += '5';
      }
      return [url,choices];
    },
    tipsy(eve) {
      if (eve === '3D_1event' || eve === '3D_2event' || eve === '3D_3event' || eve === '5A_1event') {
        return false;
      } else {
        return true;
      }
    }
}


module.exports = utils
