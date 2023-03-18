window.onload = function () {
  var colors = {
    lapisBlue: "#c5c3c3",
    mistBlue: "#000",
  };
  var space = new CanvasSpace("vs", colors.mistBlue).display("#pt");
  var form = new Form(space);

  var gapSize = space.size.$subtract(20).divide(25);
  var field = [];

  var mouse = new Point({
    x: 0,
    y: 0,
  });

  for (var x = 0; x < 25; x++) {
    for (var y = 0; y < 25; y++) {
      field.push(
        new Vector({
          x: gapSize.x * x + gapSize.x,
          y: gapSize.y * y + gapSize.y,
          z: 0,
        })
      );
    }
  }

  space.add({
    animate: function (time, fps, context) {
      for (var i = 0; i < field.length; i++) {
        var shiftedTime = i * 4 + time;
        var timeFactor = ((shiftedTime / 3000) % Math.PI) * 2;

        var sinValue = Math.sin(field[i].y + timeFactor);
        var cosValue = Math.cos(field[i].x + timeFactor);

        var direction = new Vector(sinValue, cosValue).normalize();
        form.stroke(colors.lapisBlue, 1, "round");
        form.line(new Line(field[i]).to(direction.$multiply(Math.abs(sinValue + cosValue) * 5)).relative());
      }
    },
    onMouseAction(type, x, y, e) {
      mouse.set(x, y);
    },
  });

  space.bindMouse();
  space.play();
};