function Player() {
    var hp;
    var id;
    var money;
    this.init = function(_id) {
        hp = 100;
        id = _id;
        money = 0;
    }
    this.increaseMoney = function(amount) {
        money += amount;
    }
    this.getMoney = function() {
        return money;
    }
}

function Minion() {
    var hp;
    var cost;
    var dmg;
    var range;
    var owner_id;
    this.init = function(_hp, _cost, _dmg, _range, _owner_id) {
        hp = _hp;
        cost = _cost;
        dmg = _dmg;
        range = _range;
        owner_id = _owner_id;
    }
    this.attack = function(minion) {
        minion.hp -= dmg;
    }
    this.GetDirection = function() {
        if (owner_id == 1) {
            return "right"
        } else {
            return "left"
        }
    }
    this.isDead = function() {
        return hp <= 0;
    }
    this.getRange = function() {
        return range;
    }
}

function Fighter(_owner_id) {
    return Minion.init(10, 5, 2, 1, _owner_id)
}

function Archer(_owner_id) {
    return Minion.init(5, 7, 3, 2, _owner_id)
}

function World(){
    var grid = [];
    var glength = 10;
    var p1 = new Player();
    var p2 = new Player();
    var startTime;
    var logicTime;
    this.init = function() {
        p1.init();
        p2.init();
        startTime = (new Date).getTime();
        logicTime = 0;
        for (var i = 0; i < 10; ++i ) {
            grid.push()
        }
    }

    this.getCurrentLogicTime = function() {
        return (new Date).getTime() - startTime
    }

    this.updateToCurrentLogicTime = function() {
        this.updateToLogicTime(this.getCurrentLogicTime())
    }

    // this.moveGrid = function() {
    //     for (var i = 0; i < glength; ++i) {
    //         if (!grid[i]) {
    //             continue
    //         }
    //         grid[i].
    //     }
    // }

    this.updateToLogicTime = function(newLogicTime) {
        newLogic = Math.floor((newLogicTime) / 1000);

        while (dt > 0) {
            p1.increaseMoney(1)
            p2.increaseMoney(1)
            //this.moveGrid()
            dt --;
            logicTime = newLogicTime;
        }
    }

    this.GetPlayerMoney = function() {
        return p1.getMoney()
    }
}

var world = new World()

stepper = function() {
    world.updateToCurrentLogicTime();
    console.log(world.GetPlayerMoney());
}

window.setInterval(stepper, 1000 / 60)
