# A* Example

This application demonstrates how to use the A* algorithm to find the best path within a graph (a matrix in this example). The agent (A) walks the map vertically cleaning all the dirt spots (s) that it finds. If its fuel level goes too low (below 30) then it uses the A* to find the nearest fuel station (R). After refueling it returns to the original spot and continues its linear map cleansing. If at any moment the garbage capacity reaches 0 then the agent uses A* again to find the nearest garbage can to dispose of the garbage.

The application consists of:

* **main.js**: Initializes the Environment and Agent objects. It defines the simulation loop that ends either when the agent visits all spots or when it run out of fuel
* **environment.js**: manages two HTML canvas -- one for placing fixed elements such as fuel stations (R), garbage can (L), walls and dirt (s).
* **agent.js**: has a map of the environment but does not know about the dirt (s) locations. For each iteration, acts on the environment current state.



