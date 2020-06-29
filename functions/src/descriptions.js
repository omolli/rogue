const descriptions = {
  enemy(e){
    const enemy = e.toLowerCase();
    switch (enemy) {
      case 'goblin':
        return 'A simple minded goblin. Dangerous in packs.'
      case 'Rat':
        return 'A rather large rat. But who would fear a rodent?'
      default:
        return 'Something horrible. I dont know what it is!'
      }
  },
  getRoom(depth,lvl){
    return 'There is a putrid scent and everything is dim';

  }
}
module.exports = descriptions
