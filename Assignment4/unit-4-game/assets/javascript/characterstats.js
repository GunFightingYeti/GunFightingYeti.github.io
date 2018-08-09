        //Character Stat arrays
        var attackArray = [10, 15, 20, 25, 30];
        var healthArray = [125, 150, 175, 200, 225];
        var powerArray = [5, 6, 7, 8, 9];

        //Stat randomizer
        //Attack
        var attack = $(".attack");
        attackval = attackArray[Math.floor(Math.random() * attackArray.length)];
        console.log("Attack: " + attackval)
        attack.html(attackval)

        //Health
        var health = $(".health");
        healthval = healthArray[Math.floor(Math.random() * healthArray.length)];
        console.log("Health: " + healthval)
        health.html(healthval)

        //Power
        var power = $("");
        powerval = powerArray[Math.floor(Math.random() * powerArray.length)];
        console.log("Power: " + powerval)
        power.html(powerval)