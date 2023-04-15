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
      if (combatant && combatant.isNpc && combatant.resource <= 0) {
        lootLog("got combatant", combatant)
        let actor = game.actors.get(combatant.actorId)
        let token = canvas.tokens.get(combatant.tokenId)
        // populate loot
        console.log("Rolling loot")
        await game.itempiles.API.rollItemTable("Merchant: General", {
            timesToRoll: "1d4+1",
            targetActor: actor,
            removeExistingActorItems: false
        })
        // make token lootable
        await game.itempiles.API.turnTokensIntoItemPiles(token)
      }
    })
  }
})

Hooks.on("preDeleteCombatant", async (combatant, options, userId) => {
  lootLog("about to delete combatant", combatant)
})

// cc3HIOnfmxXLkxmh
// cc3HIOnfmxXLkxmh

// Hooks.on("updateCombat", async (combat, changed, options, userId) => {
//   lootLog("we get signal", combat.scene)
//   lootLog("changed: ", changed)
//   lootLog("options: ", options)
//   lootLog("userId: ", userId)
//   lootLog("combat.scene", combat.scene)
//   lootLog("active sceneId", game.scenes.active.id)
//   if (combat.scene.id === game.scenes.active.id) {
//       const combatants = combat.combatants;
//       const allHostileDefeated = combatants.every((combatant) => {
//         const actor = combatant.actor;
//         lootLog("mans: ", actor)
//         if (actor && actor.type === "npc" && actor.system.attributes.hp.value > 0) {
//           return false;
//         }
//         return true;
//       });
//       if (allHostileDefeated) {
//         combatants.every((combatant) => {
//           lootLog(`combat ended`)
//           let token = canvas.token.get(combatant.tokenId)
//           lootLog("token: ", token)
//         })
//       }
//     }
//   });
  
  function lootLog(message, data) {
    if (data) {
      console.log(`${logName} | ${message}`, data)
    } else {
      console.log(`${logName} | ${message}`)
    }
  }