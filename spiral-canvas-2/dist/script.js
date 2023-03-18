const wrap = document.querySelector('.spiral-wrap'),
      canvasOffS = document.createElement('canvas'),
      ctx = canvasOffS.getContext('2d'),
      inputsWrap = document.querySelector('.inputs-wrap'),
      segmentRadiusI = inputsWrap.querySelector('.segment-radius'),
      numberOfRingsI = inputsWrap.querySelector('.number-of-rings'),
      spaceBetweenRingsI = inputsWrap.querySelector('.space-between-rings'),
      spaceBetweenClustersI = inputsWrap.querySelector('.space-between-clusters'),
      numberOfClustersI = inputsWrap.querySelector('.number-of-clusters'),
      startRadiusI = inputsWrap.querySelector('.starting-radius'),
      minimumSegI = inputsWrap.querySelector('.number-of-segments'),
      segRepetitionI = inputsWrap.querySelector('.segment-repetition'),
      offsetSegmentsByIterI = inputsWrap.querySelector('.offset-by-iter'),
      offsetSegmentsByRandomI = inputsWrap.querySelector('.offset-by-random'),
      falloffI = inputsWrap.querySelector('.falloff'),
      animateI = inputsWrap.querySelector('.inputAnimate'),
      canvasSizeMult = 4,

      segmentsCountHTML = document.querySelector('.segments-count span'),
      ringsCountHTML = document.querySelector('.rings-count span');

let stats = new Stats();
document.body.appendChild( stats.domElement );

canvasOffS.width = window.innerWidth * canvasSizeMult;
canvasOffS.height = window.innerHeight * canvasSizeMult;

const randomIntFromInterval = (min, max, round = false) => {
  if (round) {
    return Math.floor(Math.random() * (max - min) + min);
  } else {
    return +(Math.random() * (max - min) + min).toFixed(3);
  }
}

const map = (value, minA, maxA, minB, maxB) => {
  let val = (1 - (value - minA) / (maxA - minA)) * minB + (value - minA) / (maxA - minA) * maxB;
  if (val <= minB) return minB;
  if (val >= maxB) return maxB;
  return val;
}

let clusterCanvasArr = [];
const createClusterCanvas = (i, canvas) => {
  const clusterCanvasOnScreen = document.createElement('canvas');
  clusterCanvasOnScreen.width = window.innerWidth;
  clusterCanvasOnScreen.height = window.innerHeight;
  clusterCanvasOnScreen.classList = `clusterCanvas clusterCanvas--${i}`;

  const clusterCanvasOffScreen = document.createElement('canvas');
  const ctxClOff = clusterCanvasOffScreen.getContext('2d');
  clusterCanvasOffScreen.width = window.innerWidth * canvasSizeMult;
  clusterCanvasOffScreen.height = window.innerHeight * canvasSizeMult;
  ctxClOff.clearRect(0,0,clusterCanvasOffScreen.width, clusterCanvasOffScreen.height);
  ctxClOff.save();
  ctxClOff.translate(clusterCanvasOffScreen.width/2, clusterCanvasOffScreen.height/2);
  ctxClOff.drawImage(canvas,
                   -clusterCanvasOffScreen.width/2,
                   -clusterCanvasOffScreen.height/2,
                   clusterCanvasOffScreen.width,
                   clusterCanvasOffScreen.height);
  ctxClOff.restore();

  wrap.appendChild(clusterCanvasOnScreen);
  clusterCanvasArr.push([clusterCanvasOnScreen, clusterCanvasOffScreen])
}

const removeClusterCanvas = () => {
  clusterCanvasArr = [];
  wrap.querySelectorAll('.clusterCanvas').forEach(clusterC => {
    wrap.removeChild(clusterC);
  })
}

const calcOffSCanvas = () => {
  removeClusterCanvas();
  const segRadius = +segmentRadiusI.value,
        numberOfRings = +numberOfRingsI.value,
        numberOfClusters = +numberOfClustersI.value,
        minimumSeg = +minimumSegI.value,
        segmentsRepetition = +segRepetitionI.value,
        startRadius = +startRadiusI.value,
        spaceBetweenRings = +spaceBetweenRingsI.value,
        spaceBetweenClusters = +spaceBetweenClustersI.value,
        offsetSegmentsByIter = offsetSegmentsByIterI.checked ? true : false,
        minimumSegmentRadius = +falloffI.value;

  let clusterToPrint = 1,
      spaceBetweenRingsC,
      ringRadiusIncrement = 0,
      startRingsPerCluster = Math.ceil((numberOfRings / numberOfClusters)*.5),
      ringsPerCluster,
      ringsPerClusterInc = 0,
      segmentsCount = 0,
      ringsCount = 0;

  spaceBetweenRings === 0 ? spaceBetweenRingsC = 1 : spaceBetweenRingsC = spaceBetweenRings;

  //Clusters
  for (let cluster = 1; cluster < numberOfClusters + 1; cluster++) {
    const segmentsRepetitionC = segmentsRepetition + cluster - 1,
          steps = minimumSeg + ((cluster - 1) * 10),
          angPortion = +((Math.PI*2) / steps).toFixed(4),
          startingSegmentRadius = Math.floor(segRadius + (cluster-1)*.5);

    if (cluster === 1) {
      ringsPerCluster = startRingsPerCluster;
    } else if (cluster !== numberOfClusters) {
      ringsPerCluster = Math.ceil((numberOfRings - ringsPerClusterInc)/(numberOfClusters-cluster)*.5);
    } else if (cluster === numberOfClusters) {
      ringsPerCluster = numberOfRings-ringsPerClusterInc;
    }
    ringsPerClusterInc += Math.ceil(ringsPerCluster);
    ctx.clearRect(0, 0, canvasOffS.width, canvasOffS.height);

    //Rings
    for (let ring = 1; ring <= ringsPerCluster; ring++) {
      let segmentRadius = startingSegmentRadius;
      const segmentRadiusDecrement = +((segmentRadius-minimumSegmentRadius) / (steps/segmentsRepetitionC)).toFixed(3);
      const positionOffset = (offsetSegmentsByIter ? ring*0.08 : 0) + +((offsetSegmentsByRandomI.checked ? randomIntFromInterval(Math.PI*0.1, Math.PI*0.2, false) : 0) * 0.6).toFixed(3);
      const ringRadius = startRadius+ringRadiusIncrement+spaceBetweenClusters*(cluster-1);
      ringRadiusIncrement += startingSegmentRadius*2+spaceBetweenRingsC;

      //Segments
      for (let segment = 0; segment <= steps; segment++) {
        if (clusterToPrint === cluster) {
          if (segmentRadius <= minimumSegmentRadius) segmentRadius = startingSegmentRadius;
          const opacity = +(map(segmentRadius, 1, startingSegmentRadius, 0, 0.5)).toFixed(3),
                position = +((2*Math.PI*segment/steps)+positionOffset+cluster).toFixed(3),
                x = +((ringRadius) * Math.cos(position)).toFixed(1),
                y = +((ringRadius) * Math.sin(position)).toFixed(1);

          ctx.save();
          ctx.translate(canvasOffS.width*0.5, canvasOffS.height*0.5);
          ctx.rotate((cluster*0.1+0.1));

          if (Math.floor(segmentRadius) === startingSegmentRadius) {
            ctx.beginPath();
            ctx.fillStyle = `rgba(255,255,255,${opacity})`;
            ctx.arc(x, y, segmentRadius, 0, Math.PI * 2);
            ctx.fill();
          }

          if (segment !== steps) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255,255,255,${opacity * 0.5})`;
            ctx.lineWidth = segmentRadius*2;
            ctx.lineCap = 'round';
            ctx.arc(0, 0, ringRadius, position, +(position + angPortion).toFixed(3));
            ctx.stroke();
          }

          ctx.restore();
          if (segmentsRepetitionC != 0) {segmentRadius -= segmentRadiusDecrement};
        }
        segmentsCount += 1;
      }
      ringsCount += 1;
    }

    clusterToPrint += 1;
    createClusterCanvas(cluster, canvasOffS)
  }

  segmentsCountHTML.innerHTML = segmentsCount;
  ringsCountHTML.innerHTML = ringsCount;
}


let rotation = 0, currentAngle = 0, offsetY = 150;
const animateFn = () => {
  stats.begin()
  currentAngle -= rotation;

  clusterCanvasArr.forEach((clusterC, cKey) => {
    const cluster = clusterC[0];
    const ctxCluster = cluster.getContext('2d');
    ctxCluster.clearRect(0,0,cluster.width, cluster.height);
    ctxCluster.save();
    ctxCluster.translate(cluster.width/2, cluster.height/2-offsetY);
    ctxCluster.rotate(currentAngle * ((cKey + 2) * 0.1));
    ctxCluster.drawImage(clusterC[1],
                         -cluster.width*canvasSizeMult*.5,
                         -cluster.height*canvasSizeMult*.5,
                         cluster.width*canvasSizeMult,
                         cluster.height*canvasSizeMult);
    ctxCluster.restore();
  })

  animateI.checked ? rotation = 0.005 : rotation = 0;

  stats.end()
  requestAnimationFrame(animateFn)
}

calcOffSCanvas();
clusterCanvasArr.forEach(cluster => {
  cluster[0].width = window.innerWidth;
  cluster[0].height = window.innerHeight;
})

window.addEventListener('resize', () => {
  canvasOffS.width = window.innerWidth * canvasSizeMult;
  canvasOffS.height = window.innerHeight * canvasSizeMult;
  clusterCanvasArr.forEach(cluster => {
    cluster[0].width = window.innerWidth;
    cluster[0].height = window.innerHeight;
  })
  calcOffSCanvas();
})

const allInputs = document.querySelectorAll('.calcOffS');
allInputs.forEach(input => {
  input.addEventListener('input', () => calcOffSCanvas())
})

animateFn();