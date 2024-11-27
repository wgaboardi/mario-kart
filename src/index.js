const player1 = {
  NOME : "Mario",
  VELOCIDADE:  4,
  MANOBRABILIDADE: 3,
  PODER: 3,
  PONTOS: 0
}

const player2 = {
  NOME : "Luigi",
  VELOCIDADE:  3,
  MANOBRABILIDADE: 4,
  PODER: 4,
  PONTOS: 0
}

const player3 = {
  NOME : "Yoshi",
  VELOCIDADE:  2,
  MANOBRABILIDADE: 4,
  PODER: 3,
  PONTOS: 0
}

const player4 = {
  NOME : "Donkey Kong",
  VELOCIDADE:  2,
  MANOBRABILIDADE: 2,
  PODER: 5,
  PONTOS: 0
}

const player5 = {
  NOME : "Bowser",
  VELOCIDADE:  5,
  MANOBRABILIDADE: 2,
  PODER: 5,
  PONTOS: 0
}

const player6 = {
  NOME : "Peach",
  VELOCIDADE:  3,
  MANOBRABILIDADE: 4,
  PODER: 2,
  PONTOS: 0
}

const runners = [player1, player2, player3, player4, player5, player6]
const categories = ["RETA", "CURVA", "CONFRONTO"]
async function rollDice() {
  return Math.floor(Math.random()*6) + 1; // roll dice   
}

async function rollCategory() {
  return categories[Math.floor(Math.random()*categories.length)]; // roll category
}

async function Accum(player, op) {
   switch (op) {
      case "add": player.PONTOS += 1; console.log(`${player.NOME} marcou 1 ponto!\n`);break;
      case "sub": player.PONTOS -= 1 && player.PONTOS>0; console.log(`${player.NOME} perdeu 1 ponto!\n`);break;
   }
}

async function LogRun (category, runner, dice, strength) {
  console.log(`${runner.NOME} rolou um 🎲 de ${category} ${dice} + ${strength} = ${dice+strength}`)
}
async function movePlayer(runner1, runner2) {
   let category = await rollCategory();
   console.log(`Categoria: ${category}:\n`)
   diceResult1 = await rollDice()
   diceResult2 = await rollDice()
   switch (category) {
      case "RETA": 
        LogRun('VELOCIDADE', runner1, diceResult1, runner1.VELOCIDADE)
        LogRun('VELOCIDADE', runner2, diceResult2, runner2.VELOCIDADE)
        if (runner1.VELOCIDADE+diceResult1 > runner2.VELOCIDADE+diceResult2)
          Accum(runner1, "add")
       else 
          Accum(runner2, "add")
       break;
     case "CURVA":
       LogRun('MANOBRABILIDADE', runner1, diceResult1, runner1.MANOBRABILIDADE)
       LogRun('MANOBRABILIDADE', runner2, diceResult2, runner2.MANOBRABILIDADE)
       if (runner1.MANOBRABILIDADE+diceResult1 > runner2.MANOBRABILIDADE+diceResult2)
           Accum(runner1, "add")
        else 
           Accum(runner2, "add")
        break;
      case "CONFRONTO": // alt move + alt+shift copia
        LogRun('PODER', runner1, diceResult1, runner1.PODER)
        LogRun('PODER', runner2, diceResult2, runner2.PODER)
        if (runner1.PODER+diceResult1 > runner2.PODER+diceResult2)
          Accum(runner2, "sub")
        else 
          Accum(runner1, "sub")
        break;
   }
   console.log("===============================")
}

async function playRaceEngine(runner1, runner2) {
   for (let round=1; round<6 ; round++) {
    console.log(`🚗 Rodada ${round}:\n`)
    await movePlayer(runner1, runner2)
    
   }
   console.log("Resultado final:")
   console.log(`${runner1.NOME} teve ${runner1.PONTOS} ponto(s)!`)
   console.log(`${runner2.NOME} teve ${runner2.PONTOS} ponto(s)!\n`)
   if (runner1.PONTOS > runner2.PONTOS) {
    console.log(`🏆 ${runner1.NOME} ganhou a corrida!\n`)
  } else if (runner1.PONTOS < runner2.PONTOS) {
    console.log(`🏆 ${runner2.NOME} ganhou a corrida!\n`)
  } else {
    console.log(`A corrida terminou em Empate!\n`)
  }
}

(async function main() {
  runner1=""
  runner2=""
  while (runner1==runner2) {
    dice = await rollDice();
    runner1=runners[dice-1];
    dice = await rollDice();
    runner2=runners[dice-1];
  }  
  console.log(`🏁 Corrida entre ${runner1.NOME} e ${runner2.NOME} começando...\n`) // windows+. -> icons
  await playRaceEngine(runner1, runner2)
})() // auto-invoked function