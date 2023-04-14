const moduleName= "lootDrop";

Hooks.on("combatStart", async (combat, updateData) => {
  log("combat", combat);
});

Hooks.on("updateCombat", async (combat, changed, options, userId) => {
  log("we get signal")  
  if (combat.data.scene === game.scenes.active.id) {
      const combatants = combat.combatants;
      log("mans:", combatants)
      const allHostileDefeated = combatants.every((combatant) => {
        const actor = combatant.actor;
        if (actor && actor.data.type === "npc" && actor.data.data.attributes.hp.value > 0) {
          return false;
        }
        return true;
      });
      if (allHostileDefeated) {
        combatants.every((combatant) => {
          log(`combat ended`)
          let token = canvas.token.get(combatant.tokenId)
          log("token: ", token)
        })
      }
    }
  });
  
  function log(message, data) {
    if (data) {
      console.log(`${moduleName} | ${message}`, data)
    } else {
      console.log(`${moduleName} | ${message}`)
    }
  }