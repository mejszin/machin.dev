var gpx_map_id;
var gpx_map_uri;

var gpx_map_sketch = (sketch) => {

    sketch.waypoints = [];
    sketch.datapoints = [];
    sketch.focalpoint = [0, 0];
    sketch.polypointOptions = [];

    sketch.red = sketch.color(255, 0, 0);
    sketch.green = sketch.color(0, 255, 0);

    sketch.id;
    sketch.uri;

    sketch.preload = () => {
        sketch.id = gpx_map_id;
        sketch.uri = gpx_map_uri;
        sketch.loadXML(sketch.uri, xml => {
            console.log(xml);
            let nodes = xml.getChildren('trkpt');
            for (let i = 0; i < nodes.length; i++) {
                // Get values from XML node
                let lat = nodes[i].getNum('lat');
                let lon = nodes[i].getNum('lon');
                let dp = nodes[i].getChildren('ns3:hr')[0].getContent(); // use 'ns3:cad' for cadence
                // Push values to arrays
                sketch.waypoints.push([lat, lon, dp]);
                sketch.datapoints.push(dp);
                // Take average of points for focalpoint
                sketch.focalpoint = sketch.focalpoint.map((p, j) =>
                    (p + sketch.waypoints[i][j]) / (i == nodes.length - 1 ? nodes.length : 1)
                );
                // Add lerp color to polypoint options
                sketch.polypointOptions.push({
                    color: sketch.lerpColor(sketch.green, sketch.red, (i + 1) / nodes.length)
                });
            }
        });
    }

    sketch.setup = () => {
        sketch.noCanvas();
        console.log('div_id=', sketch.id);
        var map = L.map(sketch.id).setView(sketch.focalpoint, 16);
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(map);
        let polylinePoints = sketch.waypoints.map(point => new L.LatLng(...point));
        L.multiOptionsPolyline(polylinePoints, {
            weight: 5, lineCap: 'butt', opacity: 1, smoothFactor: 1,
            multiOptions: {
                options: sketch.polypointOptions,
                optionIdxFn: function (point) {
                    let min = sketch.min(sketch.datapoints);
                    let max = sketch.max(sketch.datapoints);
                    let perc = (point.alt - min) / (max - min);
                    return sketch.int((sketch.waypoints.length - 1) * perc);
                }
            }
        }).addTo(map);
    }
    
}

var renderMap = (id, uri) => {
    // dom_id must be in the format map_basename
    // e.g. map_my_run for my_run.gpx
    gpx_map_id = id;
    gpx_map_uri = uri;
    var gpx_map_p5 = new p5(gpx_map_sketch);
}

// renderMap('map_activity_9450094021');
// renderMap('map_activity_copy');