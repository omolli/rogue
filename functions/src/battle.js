const battle = {
  simple(atr,wpn,enemy){
    var txt = '';
    //Something like txt, player hp, monster hp
    const p_dmg = Number(wpn[3]);
    const m_dmg = Number(enemy[3]);
    var p_hp = 0;
    var m_hp = Number(enemy[2]);
    var losthp = 0;
    atr.forEach(element =>p_hp += element*6);
    p_hp += atr[3]*6;
    if (!p_dmg || !m_dmg || !m_hp) {
      txt = 'Something went wrong and no numbers ' + wpn[3] + ' and ' + enemy[2] + ' and ' + enemy[3];
      return [txt,-1,-1];
    }
    m_hp -= p_dmg;
     if (p_dmg >= m_hp) {
      //flavour tekstiä myöhemmin
      txt = 'You strike the ' + enemy[0] + ' dealing ' + p_dmg + ' damage and the creature falls dead in to the ground.';
    } else {
      p_hp -= m_dmg
      txt = 'You strike the ' + enemy[0] + ' dealing ' + p_dmg + ' damage but the creature retaliates dealing ' +  m_dmg +
      '. You have ' + p_hp + ' left. The monster has ' + m_hp + ' hp left.';
    }
    return [txt,p_hp,m_hp];
  }
}
module.exports = battle
