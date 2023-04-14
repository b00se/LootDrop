const moduleName= "lootDrop"

Hooks.on("updateCombat", async (combat, changed, options, userId) => {
    if (combat.data.scene === game.scenes.active.id) {
      const combatants = combat.combatants;
      const allHostileDefeated = combatants.every((combatant) => {
        const actor = combatant.actor;
        if (actor && actor.data.type === "npc" && actor.data.data.attributes.hp.value > 0) {
          return false;
        }
        return true;
      });
      if (allHostileDefeated) {
        combatants.every((combatant) => {
          console.log(`FOOBAR combat ended`)
          let token = canvas.token.get(combatant.tokenId)
          console.log(`FOOBAR $token`)
        })
      }
    }
  });
  