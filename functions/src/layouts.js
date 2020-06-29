const layouts = {
  getLayout(){
    //The neighbour nodes and their direction, index identifies the number of "self" hox 0 node is the first one
    const lvl = [
      ['1E','2W'],
      ['0W','3N','4E'],
      ['0E','5N'],
      ['1S','7N'],
      ['1W'],
      ['2S','6E'],
      ['5W','8N'],
      ['3S','8W'],
      ['7S','8E'],
      ['8S','10E','11N'],
      ['9W','12N'],
      ['9S','12E','13N'],
      ['10S','11W'],
      ['11S','14E'],
      ['13W']
    ];

    return lvl;
  }

}
module.exports = layouts
