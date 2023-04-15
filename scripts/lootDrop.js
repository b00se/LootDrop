const logName= "lootDrop";
let combatId;

Hooks.on("combatStart", async (combat, updateData) => {
  lootLog("combat", combat);
  combatId = combat.id
});

Hooks.on("deleteCombat", async (combat, options, userId) => {
  lootLog("deleting combat", combat)
  if (combatId !== null && combatId === combat.id) {
    combatants = combat.combatants
    combatants.contents.every(async (combatant) => {
      lootLog("got combatant", combatant)
      if (combatant.isNPC && combatant.defeated) {
        let token = canvas.tokens.get(combatant.tokenId)
        // populate loot
        console.log("Rolling loot")
        await game.itempiles.API.rollItemTable("Merchant: General", {
            timesToRoll: "1d4+1",
            targetActor: token.actor,
            removeExistingActorItems: false
        })
        // make token lootable
        await game.itempiles.API.turnTokensIntoItemPiles(token)
      }
    })
  }
})

Hooks.on("deleteCombatant", async (combatant, options, userId) => {
  lootLog("about to delete combatant", combatant)
})

  
  function lootLog(message, data) {
    if (data) {
      console.log(`${logName} | ${message}`, data)
    } else {
      console.log(`${logName} | ${message}`)
    }
  }