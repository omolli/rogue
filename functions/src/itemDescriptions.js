const itemDescriptions = {
  upDescription(u,wpn){
    const vowels = 'aeiou';
    var a = 'a';
    if (vowels.indexOf(wpn.charAt(0)) !== -1) {
      a = 'an';
    }
    switch (u) {
      case 'none':
        return a + ' ' + wpn + '.';
      case 'sharp':
        return 'an exceptionally sharp ' + wpn + '.';
      case 'quality':
        return a + ' ' + wpn + ' of utmost quality.';
      case 'enchanted':
        return 'an enchanted ' + wpn + '.';
      case 'fiery':
        return 'a flaming ' + wpn + '.';
      case 'blessed':
        return 'a blessed ' + wpn + '.';
      case 'arcane':
        return  'An arcane ' + wpn + ' of unknown origin.';
      case 'divine':
        return 'a divine ' + wpn + ' blessed by the gods themselves.';
      case 'infernal':
        return 'An infernal ' + wpn + ' with an ever raging flame.';
      // case 'enchanted':
      //   return 'an enchanted ' + wpn + '. It deals a moderate amount of magic damage.';
      // case 'fiery':
      //   return 'a flaming ' + wpn '. It deals moderate fire damage.';
      // case 'blessed':
      //   return 'a blessed ' + wpn '. It deals moderate lightning damage';
      // case 'arcane':
      //   return  'An arcane ' + wpn + ' of unknown origin. It deals a great amount of magic damage';
      // case 'divine':
      //   return a + ' ' + wpn ' blessed by the gods themselves. It deals a great amount of lightning damage';
      default:
        return 'A mysterious ' + wpn;
    }

  },
  wpnDescription(w) {
    const wpn = w.toLowerCase();
    switch (wpn) {
      case 'shortsword':
        return 'It is  a simple yet effective weapon.'
      case 'mace':
        return 'A blunt weapon with a heavy head. It is a typical weapon for a zealot.'
      case 'staff':
        return 'A basic staff of a wizard.'
      case 'katana':
        return 'An eastern sword with a curved blade. Known for its deadly cuts.'
      case 'battle axe':
        return 'A heavy two-bladed weapon. It uses a combination of cutting and crushing the enemy.'
      case 'staff of lightning':
        return 'A staff imbued with the power of lightning.'
      case 'viper`s sting':
        return 'A legendary spear with a poisoned tip. According to the legends once you feel it it´s too late.'
      case 'tyrant´s fist':
        return 'A legendary warhammer of an imposing size. It is said to bind everyone to its will.'
      case 'staff of the dead':
        return 'Staff of a legendary necromancer. It is said to hold forbidden powers.'
      default:
        return 'A very mysterious weapon.'

    }
  }

}
module.exports = itemDescriptions
