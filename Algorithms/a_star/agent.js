/***** this A-star implementation expects the world array to be square: it must have equal height and width. *****/

class Agent {
    constructor(worldSize) {
        this.worldSize = worldSize * worldSize;

        // define the largest world array terrain tile number that your game characters will be allowed to walk on. 
        // In our example, only the grass tile (tile number zero) is walkable, but in a real game you could assign the first few dozen tiles as 
        // ground or street and the rest as walls, so change this to whatever sprite number you require.
        var maxWalkableTileNum = 0;
    }

    act(state) {
        // TODO
    }

    findPath(pathStart, pathEnd) {
        // storing flattened references to commonly used Math.* functions (for optimization). 
        var abs = Math.abs;
        var max = Math.max;
        var pow = Math.pow;
        var sqrt = Math.sqrt;

        // heuristic
        var distanceFunction = ManhattanDistance;
        var findNeighbours = DiagonalNeighbours

        /* 
            linear movement - no diagonals - just cardinal directions (NSEW)
        */
        function ManhattanDistance(Point, Goal) {
            return abs(Point.x - Goal.x) + abs(Point.y - Goal.y);
        }

        /* 
            returns every available North East, South East, South West or North West cell - no squeezing through "cracks" between two diagonals
        */
        function DiagonalNeighbours(myN, myS, myE, myW, N, S, E, W, result) {
            if (myN) {
                if (myE && canWalkHere(E, N))
                    result.push({ x: E, y: N });

                if (myW && canWalkHere(W, N))
                    result.push({ x: W, y: N });
            }
            if (myS) {
                if (myE && canWalkHere(E, S))
                    result.push({ x: E, y: S });

                if (myW && canWalkHere(W, S))
                    result.push({ x: W, y: S });
            }
        }

        /*
            returns every available North, South, East or West cell that is empty (no diagonals)
        */
        function Neighbours(x, y) {
            var N = y - 1,
                S = y + 1,
                E = x + 1,
                W = x - 1,
                myN = N > -1 && canWalkHere(x, N),
                myS = S < worldHeight && canWalkHere(x, S),
                myE = E < worldWidth && canWalkHere(E, y),
                myW = W > -1 && canWalkHere(W, y),
                result = [];

            if (myN)
                result.push({ x: x, y: N });

            if (myE)
                result.push({ x: E, y: y });

            if (myS)
                result.push({ x: x, y: S });

            if (myW)
                result.push({ x: W, y: y });

            findNeighbours(myN, myS, myE, myW, N, S, E, W, result);

            return result;
        }

        /* 
            return boolean that indicates if the agent can walk to a specific coordinate
        */
        function canWalkHere(x, y) {
            return ((world[x] != null) && (world[x][y] != null) && (world[x][y] <= this.maxWalkableTileNum));
        };

        /* 
            Node is a temporary object that is used to store costs and shortcut array indexes during processing.

            The A-star algorithm is going to create lists of these Nodes as required, and will fill them with costs that 
            are added up by traversing all the routes we check along the way. These node objects will form a linked 
            list because each holds a reference to its parent node. They also hold the x and y position, 
            the distances from the start and end points, as well as a array index used to speed up calculations.
        */
        function Node(Parent, Point) {
            var newNode = {
                // pointer to another Node object
                Parent: Parent,

                // array index of this Node in the world linear array
                value: Point.x + (Point.y * worldWidth),

                // the location coordinates of this Node
                x: Point.x,
                y: Point.y,

                // the distanceFunction cost to get TO this Node from the START
                f: 0,

                // the distanceFunction cost to get from this Node to the GOAL
                g: 0
            };

            return newNode;
        }

        /* 
            A-star algorithm
            
            We fill a couple of linked lists with Node objects that contain the world map data value and room to store distances along the way.

            We try to first search routes that appear to be most likely to lead towards the goal. We keep putting Nodes into each of the arrays depending on 
            the cost (distance) to get there. When the open list is empty, we know that the path with the lowest cost is in the result array, ready for final output.

            Starting with the initial node, which is the starting point we passed to the findPath function, we use a list or queue of nodes that still need to be considered.
            This is the 'Open' array. The 'Closed' list (which contains nodes we’ve already checked) is used to make the search more efficient.

            Along the way, we take the distance already traveled into account; the Node’s 'g' property is the cost from the starting point and the 'f' property 
            is 'g' plus the heuristic cost estimate from here to the destination.

            The lower f a node has, the higher its priority. Each step, the one with the lowest f value is removed from the queue, the f and g values of its neighbors are updated, 
            and these neighbors are added to the list, ready to be traversed.

            We continue until a goal node has a lower f value than any node in the queue (or until the queue is empty).

        */
        function calculatePath() {
            // create Nodes from the Start and End coordinates (parameters)
            var mypathStart = Node(null, { x: pathStart[0], y: pathStart[1] });
            var mypathEnd = Node(null, { x: pathEnd[0], y: pathEnd[1] });

            // create an array that will contain all world cells
            var AStar = new Array(this.worldSize);

            // list of currently open Nodes
            var Open = [mypathStart];

            // list of closed Nodes
            var Closed = [];

            // list of the final output array
            var result = [];

            // reference to a Node (that is nearby)
            var myNeighbours;

            // reference to a Node (that we are considering now)
            var myNode;

            // reference to a Node (that starts a path in question)
            var myPath;

            // temp integer variables used in the calculations
            var length, max, min, i, j;

            // iterate through the open list until none are left
            while (length = Open.length) {
                max = this.worldSize;
                min = -1;

                for (i = 0; i < length; i++) {
                    if (Open[i].f < max) {
                        max = Open[i].f;
                        min = i;
                    }
                }

                // grab the next node and remove it from Open array
                myNode = Open.splice(min, 1)[0];

                // is it the destination node?
                if (myNode.value === mypathEnd.value) {
                    myPath = Closed[Closed.push(myNode) - 1];

                    do {
                        result.push([myPath.x, myPath.y]);
                    }
                    while (myPath = myPath.Parent);

                    // clear the working arrays
                    AStar = Closed = Open = [];

                    // we want to return start to finish
                    result.reverse();
                }
                else // not the destination
                {
                    // find which nearby nodes are walkable
                    myNeighbours = Neighbours(myNode.x, myNode.y);

                    // test each one that hasn't been tried already
                    for (i = 0, j = myNeighbours.length; i < j; i++) {
                        myPath = Node(myNode, myNeighbours[i]);

                        if (!AStar[myPath.value]) {
                            // estimated cost of this particular route so far
                            myPath.g = myNode.g + distanceFunction(myNeighbours[i], myNode);

                            // estimated cost of entire guessed route to the destination
                            myPath.f = myPath.g + distanceFunction(myNeighbours[i], mypathEnd);

                            // remember this new path for testing above
                            Open.push(myPath);

                            // mark this node in the world graph as visited
                            AStar[myPath.value] = true;
                        }
                    }

                    // remember this route as having no more untested options
                    Closed.push(myNode);
                }
            } // keep iterating until until the Open list is empty

            return result;
        }

        // actually calculate the a-star path! this returns an array of coordinates // that is empty if no path is possible
	    return calculatePath();
    }
}