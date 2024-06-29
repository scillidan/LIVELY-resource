Math.radians = function(degrees) {
    return degrees * Math.PI / 180;
};

var Maze = function(args) {
    if (args === undefined) var args = {};
    var _self = this;
    this.levels = args.levels || 15;
    this.wallSize = args.wallSize || 3;
    this.walls = [];
    this.separation = args.separation || 25;
    this.halfSeparation = this.separation / 2;
    this.rotation = 30;
    this.totalHurdles = args.totalHurdles || 1;
    this.rotate = args.rotate || true;
    this.hurdles = args.hurdles || true;
    var _angle = Math.random() * 360;
    this.setup = function() {
        this.walls = [];
        this.halfSeparation = this.separation / 2;
        var radius = this.separation;
        for (var i = 1; i <= this.levels; i++) {
            var _slice = 360 / i;
            var _rand = Math.ceil(Math.random() * i);
            this.walls.push(new Wall({
                angle: _angle,
                radius: radius,
                index: this.levels - i
            }));
            _angle = (_slice * _rand) + Math.random() * _slice;
            radius += this.separation;
        }
    }

    var canvas, context;
    var center = {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2
    };
    //
    function init() {
        canvas = document.createElement("canvas");
        document.body.appendChild(canvas);
        context = canvas.getContext("2d");
        setSize();
        window.addEventListener("resize", setSize, false);
        _self.setup();
    }

    function setSize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        center = {
            x: canvas.width / 2,
            y: canvas.height / 2
        };
    }

    function animate() {
        requestAnimationFrame(animate);
        _self.render();
    }

    this.render = function() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.strokeStyle = "black";
        // context.lineCap = "round";
        context.lineWidth = this.wallSize;
        context.save();
        context.translate(center.x, center.y);
        for (var i = 0; i < this.walls.length; i++) {
            this.walls[i].draw();
        }
        context.restore();
    }

    var Wall = function(args) {
        this.start = Math.radians(args.angle);
        this.radius = args.radius || 10;
        this.stop = Math.radians(args.angle + (356 - args.index));
        this.rotation = Math.random();
        this.velocity = Math.random() * 0.0008 - 0.0004;
        this.barriers = [];
        this.draw = function() {
            context.beginPath();
            if (_self.rotate) {
                this.rotation = this.rotation + this.velocity;
                context.rotate(this.rotation);
            }
            context.arc(0, 0, this.radius, this.start, this.stop, false);
            context.stroke();
            context.closePath();

            if(_self.hurdles) {
                for (i = 0; i < this.barriers.length; i++) {
                    this.barriers[i].draw();
                }
            }
        }
        this.getPos = function(a, b, _radius) {
            return {
                x: Math.cos(a) * _radius,
                y: Math.sin(b) * _radius
            };
        }
        this.setHurdles = function() {
            var _slice = Math.radians(360 / _self.totalHurdles);
            var _angle = this.start + _slice;
            var random = Math.floor(Math.random() * _self.totalHurdles);
            for (var i = 0; i < _self.totalHurdles; i++) {
                if (i == random) {
                    var _from = this.getPos(_angle, _angle, this.radius - _self.halfSeparation);
                    var _to = this.getPos(_angle, _angle, this.radius + _self.separation);
                } else {
                    var _from = this.getPos(_angle, _angle, this.radius - _self.halfSeparation);
                    var _to = this.getPos(_angle, _angle, this.radius + _self.halfSeparation);
                }
                this.barriers.push(new Hurdle(_from, _to, _angle));
                _angle += _slice;
            }
        }
        this.setHurdles();
        return this;
    }
    var Hurdle = function(_from, _to, _angle) {
        this.angle = _angle;
        this.x0 = _from.x;
        this.y0 = _from.y;
        this.x = _to.x;
        this.y = _to.y;
        this.draw = function(color) {
            context.beginPath();
            context.moveTo(this.x0, this.y0);
            context.lineTo(this.x, this.y);
            context.stroke();
            context.closePath();
        }
        return this;
    }
    init();
    animate();
    return this;
}

var _maze = new Maze();


var gui = new dat.GUI();
gui.add(_maze, 'rotate');
gui.add(_maze, 'hurdles');
gui.add(_maze, 'totalHurdles', 1, 5).step(1).onChange(_maze.setup.bind(_maze));
gui.add(_maze, 'levels', 4, 15).step(1).onChange(_maze.setup.bind(_maze));
gui.add(_maze, 'wallSize', 2, 20).step(1).onChange(_maze.setup.bind(_maze));
gui.add(_maze, 'separation', 20, 40).step(1).onChange(_maze.setup.bind(_maze));