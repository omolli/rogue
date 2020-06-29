const enemies = {
  getEnemy(depth,lvl,node){
    //enemy - lvl - hp - dmg
    const basic = [
      ['archer','0','20','15'],
      ['warrior','0','30','15'],
      ['necromancer','1','20','20'],
      ['captain','2','40','25'],
    ];
    const tier1 = [
      ['rat','1','10','5'],
      ['thief','3','20','8']
    ];
    const tier2 = [
      ['minotaur','20','80','30'],
      ['troll','25','100','30']
    ];
    const tier3 = [
      ['drake','30','200','50'],
      ['golem','30','400','30'],
      ['demon','30','200','40']
    ];
    //encounter lvl -monster lvl- multiplier
    const upgrades = [
      ['goblin','1','5','1'],
      ['skeleton','6','8','1.2'],
      ['orc','10','12','1.5'],
      ['undead','15','16','2'],
      ['elemental','25','20','4'],
      ['demon','30','30','10']
    ];
    var n = 0;
    var tier = depth;
    switch (tier) {
      case 1:
        poolsize = tier1.length;
        n = Math.floor(Math.random() * poolsize);
        return tier1[n];
      case 2:
        poolsize = tier2.length;
        n = Math.floor(Math.random() * poolsize);
        return tier2[n];
      case 3:
        poolsize = tier3.length;
        n = Math.floor(Math.random() * poolsize);
        return tier3[n];
      default:
        poolsize = tier3.length;
        n = Math.floor(Math.random() * poolsize);
        return tier3[n];

    }
  }
}
module.exports = enemies
