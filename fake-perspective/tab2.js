class Shape {
  constructor() {
    this.vert = [];
    this.edge = {};
  }
  addVert(x, y, z) {
    this.vert.push(createVector(x, y, z));
    this.edge[this.vert.length - 1] = [];
  }
  addEdge(v1, v2) {
    if (max(v1, v2) >= this.vert.length) {
      console.log("vertex dont exist");
      return;
    }
    this.edge[v1].push(v2);
    this.edge[v2].push(v1);
  }
  getVertN() {
    return this.vert.length;
  }
  getVert(i) {
    if (i > this.vert.length) {
      console.log("vertex dont exist");
      return;
    }
    return this.vert[i];
  }
  getEdge(v, i) {
    if (v > this.vert.length) {
      console.log("vertex dont exist");
      return;
    }
    return this.edge.v[i];
  }
  getEdges() {
    let edges = [];
    for (let i = 0; i < this.vert.length; i++) {
      let vt = this.vert[i];
      for (let j = 0; j < this.edge[i].length; j++) {
        if (this.edge[i][j] > i) {
          let ut = this.vert[this.edge[i][j]];
          edges.push([vt, ut]);
          // console.log(i + " " + this.edge[i][j]);
        }
      }
    }
    return edges;
  }
  rotateOnY(a) {
    let _v = createVector(0, 0);
    for (let i = 0; i < this.vert.length; i++) {
      _v.x = this.vert[i].x;
      _v.y = this.vert[i].z;
      _v.rotate(a);
      this.vert[i].x = _v.x;
      this.vert[i].z = _v.y;
    }
  }
    rotateOnX(a) {
    let _v = createVector(0, 0);
    for (let i = 0; i < this.vert.length; i++) {
      _v.x = this.vert[i].y;
      _v.y = this.vert[i].z;
      _v.rotate(a);
      this.vert[i].y = _v.x;
      this.vert[i].z = _v.y;
    }
  }
}
