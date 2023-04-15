const logName= "lootDrop";

Hooks.on("combatStart", async (combat, updateData) => {
  lootLog("combat", combat);
});

Hooks.on("updateCombat", async (combat, changed, options, userId) => {
  lootLog("we get signal", combat.scene)
  lootLog("changed: ", changed)
  lootLog("options: ", options)
  lootLog("userId: ", userId)
  lootLog("combat.scene", combat.scene)
  lootLog("active sceneId", game.scenes.active.id)
  if (combat.scene === game.scenes.active.id) {
      const combatants = combat.combatants;
      const allHostileDefeated = combatants.every((combatant) => {
        const actor = combatant.actor;
        lootLog("mans: ", actor)
        if (actor && actor.type === "npc" && actor.system.attributes.hp.value > 0) {
          return false;
        }
        return true;
      });
      if (allHostileDefeated) {
        combatants.every((combatant) => {
          lootLog(`combat ended`)
          let token = canvas.token.get(combatant.tokenId)
          lootLog("token: ", token)
        })
      }
    }
  });
  
  function lootLog(message, data) {
    if (data) {
      console.log(`${logName} | ${message}`, data)
    } else {
      console.log(`${logName} | ${message}`)
    }
  }