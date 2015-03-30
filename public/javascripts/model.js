function timeToTicks(t) {
    return Math.floor(t / (1000 / 60))
}

function Player() {
    var hp;
    var id;
    var money;
    this.init = function(_id) {
        hp = 100;
        id = _id;
        money = 0;
    };
    this.getHP = function() {
        return hp;
    };
    this.getHurt = function(dmg) {
        return hp -= dmg;
    };
    this.getSide = function() {
        return id;
    };
    this.canMove = function() {
        return false;
    };
    this.render = function() {
        return "" + hp;
    };
    this.mutateMoney = function(amount) {
        money += amount;
    };
    this.getMoney = function() {
        return money;
    };
}

function Minion() {
    var hp;
    var cost;
    var dmg;
    var range;
    var owner_id;
    var last_action_time;
    this.init = function(_hp, _cost, _dmg, _range, _owner_id) {
        hp = _hp;
        cost = _cost;
        dmg = _dmg;
        range = _range;
        owner_id = _owner_id;
        last_action_time = 0;
    }
    this.getCost = function() {
        return cost;
    }
    this.setLastActionTime = function(t) {
        last_action_time = t;
    }
    this.getSide = function() {
        return owner_id;
    }
    this.getHP = function() {
        return hp;
    }

    this.canMove = function(t) {
        return (timeToSec(t) - timeToSec(last_action_time) >= 1);
    }

    this.getHurt = function(dmg) {
        hp -= dmg;
    }
    this.getRange = function() {
        return range;
    }
    this.getDMG = function() {
        return dmg
    }
    this.getDirection = function() {
        if (owner_id == 1) {
            return "right"
        } else {
            return "left"
        }
    }
    this.render = function() {

    }
    this.isDead = function() {
        return hp <= 0;
    }
    this.getRange = function() {
        return range;
    }
}

function Fighter(_owner_id) {
    m = new Minion()
    m.init(11, 5, 2, 1, _owner_id)
    m.render = function() {
        if (this.getDirection() == "right") {
            return "]"
        } else {
            return "{:"
        }
    }
    return m
}

function Archer(_owner_id) {
    m = new Minion()
    m.init(5, 7, 5, 3, _owner_id)
    m.render = function() {
        if (this.getDirection() == "right") {
            return ">"
        } else {
            return "<"
        }
    }
    return m
}

function World(){
    var grid = [];
    var glength = 20;
    var p1 = new Player();
    var p2 = new Player();
    var startTime;
    var logicTime;
    var err = "";
    this.init = function() {
        p1.init();
        p2.init();
        startTime = (new Date).getTime();
        logicTime = 0;
        grid = [];
        for (var i = 0; i < glength; ++i ) {
            grid.push();
        }
        grid[0] = p1;
        grid[glength-1] = p2;
    }
    this.getCurrentLogicTime = function() {
        return (new Date).getTime() - startTime
    }

    this.updateToCurrentLogicTime = function() {
        this.updateToLogicTime(this.getCurrentLogicTime())
    }

    this.handleAttack = function() {
        for (var i = 0; i < glength; ++i) {
            if (!grid[i]) {
                continue
            }
            if (!grid[i].canMove(logicTime)) {
                continue
            }
            for (var r = 0; r < grid[i].getRange(); ++r) {
                if (grid[i].getDirection() == "right"  && grid[i+1+r] != undefined) {
                    if (!grid[i].canMove(logicTime)) {
                        continue
                    }
                    if (grid[i+1+r].getSide() == grid[i].getSide()) {
                        continue
                    }
                    grid[i+1+r].getHurt(grid[i].getDMG())
                    grid[i].setLastActionTime(logicTime)
                    continue
                }
                if (grid[i].getDirection() == "left"  && grid[i-1-r] != undefined) {
                    if (!grid[i].canMove(logicTime)) {
                        continuen
                    }
                    if (grid[i-1-r].getSide() == grid[i].getSide()) {
                        continue
                    }
                    grid[i-1-r].getHurt(grid[i].getDMG())
                    grid[i].setLastActionTime(logicTime)
                    continue
                }
            }
        }
    }

    this.filterDead = function() {
        for (var i = 0; i < glength; ++i) {
            if (!grid[i]) {
                continue
            }
            if (grid[i].getHP() <= 0) {
                grid[i] = undefined
            }
        }
    }

    this.handleMove = function() {
        var moved = false
        for (var i = 0; i < glength; ++i) {
            if (!grid[i]) {
                continue
            }
            if (!grid[i].getDirection) {
                continue
            }
            if (grid[i].getDirection() == "right" &&  i + 1 < glength && grid[i+1] == undefined) {
                if (!grid[i].canMove(logicTime)) {
                    continue
                }
                grid[i+1] = grid[i]
                grid[i].setLastActionTime(logicTime)
                grid[i] = undefined
                moved = true
                continue
            }
            if (grid[i].getDirection() == "left" &&  i - 1 >= 0 && grid[i-1] == undefined) {
                if (!grid[i].canMove(logicTime)) {
                    continue
                }
                grid[i-1] = grid[i]
                grid[i].setLastActionTime(logicTime)
                grid[i] = undefined
                moved = true
                continue
            }
        }
        return moved
    }

    this.render = function() {
        s = ""
        for (var i = 0; i < glength; ++i ) {
            if (!grid[i]) {
                s += "-"
                continue
            }
            s += grid[i].render();
        }
        document.getElementById("grid").textContent = s;
        document.getElementById("money").textContent = p1.getMoney();
        document.getElementById("msgbox").textContent = err;
    }

    this.updateToLogicTime = function(newLogicTime) {
        while (newLogicTime > logicTime + 1000) {
            logicTime += 1000;
            p1.mutateMoney(1);
            p2.mutateMoney(1);
            this.handleAttack();
            while (this.handleMove()){}
            this.filterDead()
            if (grid[glength-2]) {
                continue
            }
            if (timeToSec(logicTime) % 3 == 0) {
                grid[glength-2] = new Fighter(2);
            }
        }
    }

    this.GetPlayerMoney = function() {
        return p1.getMoney()
    }

    this.updateEvent = function(data) {
        if (grid[1]) {
            return
        }
        var m;
        if (data.type == 1) {
            m = new Fighter(1)
        } else {
            m = new Archer(1)
        }
        if (p1.getMoney() < m.getCost()) {
            err = "not enough money"
            return;
        }
        p1.mutateMoney(-m.getCost());
        grid[1] = m
        err = ""
    }
}

var world = new World()

var worldM = new World()

stepper = function() {
    world.updateToCurrentLogicTime();
    world.render()
}

var button = document.querySelector('#fighter');
button.addEventListener('click', createFighter);

var button = document.querySelector('#archer');
button.addEventListener('click', createArcher);

window.setInterval(stepper, 1000 / 60)
