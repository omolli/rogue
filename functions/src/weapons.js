const weapons = {
  getWpn(depth,lvl,wpn,bugger){
    //Weapons according to tiers (appearing in certain depths).
    //Type W=weapon,S=staff,B=bow,L=legendary
    //Name - type(and req type) - dmg type - base dmg - dmg bonus -level requirement - upgrade -(ability - skill)?
    const tier1 = [
      ['shortsword','WD','D','30','D','3',''],
      ['sabre','WD','D','35','C','5',''],
      ['longsword','WDS','D','40','C','3',''], //SD ja DC
      ['claymore','WDS','S','45','C','5',''],//SD ja CD
      ['mace','WS','S','30','C','3',''],
      ['hand axe','WS','S','35','D','3',''],
      ['broad axe','WS','S','40','C','3',''],
      ['staff of fire','SI','I','45','C','3',''],
      ['staff of lightning','SI','I','45','C','3',''],
      ['wooden staff','SI','I','30','D','3',''],
      ['short bow','BD','D','30','D','5',''],
      ['long bow','BD','D','40','C','7',''],
      ['composite bow','BDS','S','40','C','7','']
    ];
    const tier2 = [
      ['katana','WD','D','50','B','12',''],
      ['gladius','WD','D','50','B','10',''],
      ['battle axe','WS','S','60','B','10',''],
      ['warhammer','WS','S','60','B','14',''],
      ['ivory staff','SI','I','45','A','12',''],
      ['staff of storms','SI','I','55','B','10',''],
      ['staff of inferno','SI','I','55','B','10','']
    ];
    const tier3 = [
      ['Viper`s Sting','WD','D','70','A','20',''],
      ['Tyrant´s Fist','WS','S','75','A','20',''],
      ['Staff of the Dead','SI','I','70','A','20','']
    ];
    const wupgrades = [['quality','enchanted','fiery','blessed'],['mastercraft','arcane','infernal','divine']];
    var n = 0;
    var tier = depth;
    const chance = lvl * 12;
    var rn = getRnd(100);
    var up = -1;
    var dbg = '';
    var upgrade = '';
    const phys_inc = 1.5;
    const mag_inc = 1.6;
    //If the luck favours (increases with every lvl) the player gets a weapon from greater tier.
    if (chance / 3 > rn) {
      tier += 1;
    } else if (chance > rn) {
      up = 0;
      //If we are on greater depths, can get better upgrades usually for lower tier weapons
      if (depth > 1) {
        rn = getRnd(100);
        if (rn > 94) {
          up = 1;
        }
        else if (rn > 60) {
          tier -= 1;
          up = 1;
        }
      }
    }
    if (up !== -1) {
      rn = getRnd(5);
      switch (rn) {
        case 0:
          upgrade = wupgrades[up][1];
          break;
        case 1:
          upgrade = wupgrades[up][2];
          break;
        case 2:
          upgrade = wupgrades[up][3];
          break;
        default:
          upgrade = wupgrades[up][0];
      }
    }
    if (tier > 3) {
      tier = 3;
    }
    dbg = 'before randomizer we have tier ' + tier + ' and upgrade ' + upgrade;
    if (wpn === 'random') {
      var res = [];
      var poolsize = 0;
      switch (tier) {
        case 1:
          poolsize = tier1.length;
          n = Math.floor(Math.random() * poolsize);
          res = tier1[n];
          break;
        case 2:
          poolsize = tier2.length;
          n = Math.floor(Math.random() * poolsize);
          res = tier2[n];
          break;
        case 3:
          poolsize = tier3.length;
          n = Math.floor(Math.random() * poolsize);
          res = tier3[n];
          break;
        default:
          res = ['Old dagger','W','D','10','B','3',''];
        }
        dbg += '. After selection we got ' + res[0];
        //hox debug
        if (bugger){
            return dbg;
        }
        if (upgrade) {
          res[6] = upgrade;
          switch (upgrade) {
            case 'quality':
              res[3] = Math.floor(res[3] * phys_inc);
              break;
            case 'mastercraft':
              res[3] = Math.floor(res[3] * phys_inc * phys_inc);
              res[4] = A;
              break;
            case 'enchanted':
              res[3] = Math.floor(res[3] * mag_inc);
              //Oikeesti dual niinku nää kaikki
              res[2] = 'I';
              res[4] = C;
              break;
            case 'arcane':
              res[3] = Math.floor(res[3] * mag_inc * mag_inc);
              res[2] = 'I';
              res[4] = A;
              break;
            case 'fiery':
              res[3] = Math.floor(res[3] * mag_inc);
              res[2] = 'I';
              res[4] = C;
              break;
            case 'infernal':
              res[3] = Math.floor(res[3] * mag_inc * mag_inc);
              res[2] = 'I';
              res[4] = A;
              break;
            case 'blessed':
              res[3] = Math.floor(res[3] * mag_inc);
              res[2] = 'I';
              res[4] = C;
              break;
            case 'divine':
              res[3] = Math.floor(res[3] * mag_inc * mag_inc);
              res[2] = 'I';
              res[4] = A;
              break;
            default:
              res[3] = Math.floor(res[3] * phys_inc);
          }
        }
            return res;
      } else {
        //does not work, need a function to get the correct weapon, now returns undefined
        switch (depth) {
          // case 1:
          //   n = tier1.indexOf(wpn)
          //   return tier1[n];
          // case 2:
          //   n = tier2.indexOf(wpn)
          //   return tier2[n];
          // case 3:
          //   n = tier3.indexOf(wpn)
          //   return tier3[n];
          default:
            return ['Old dagger','D','10','B','3'];
      }
    }
    function getRnd(max){
      return Math.floor(Math.random() * max);
    }
  },
  //Get a random number for searching an array 0 <= n < array.length
  getRnd(max) {
    return Math.floor(Math.random() * max);
  }
}
module.exports = weapons
