var fs = require("fs");
const { logString } = require('./logging');

module.exports = {
    randomIndexSelection: (guildId, arrayId, max) => {

        logString("Random Selection!")
        let serverArrayFileName = "./arrays-" + guildId + ".json";

        let serverArrays = {};
        try {
            serverArrays = require(serverArrayFileName);
        }
        catch { logString("Failed to load serverArrays from file"); }

        // Create a new array if:
        // (a) we don't have one
        // (b) the one we have is empty
        // (c) the max being passed is less than the one we used to generate the current array
        if ((serverArrays[arrayId] == null) ||
            (serverArrays[arrayId].length == 0) ||
            (max < serverArrays[arrayId + "Max"])) {

            logString("Making a new Array! Id:" + arrayId + " max:" + max);
            serverArrays[arrayId] = new Array(max).fill().map((a, i) => a = i).sort(() => Math.random() - 0.5);
            serverArrays[arrayId + "Max"] = max;
        }
        // Expand the current array if the max we're being passed is greater than the one we used to 
        // generate the current array
        // Turning this off for now, I think it's probably better to let the old fics drain before shuffling the new ones in
        // else if (max > serverArrays[arrayId + "Max"]) {
        //     let oldMax = serverArrays[arrayId + "Max"];
        //     let newItemsNeeded = max - oldMax;

        //     logString("Expanding Array! Id:" + arrayId + " oldMax:" + oldMax + " newMax:" + max);

        //     let newItems = new Array(newItemsNeeded).fill().map((a, i) => a = i + oldMax);
        //     serverArrays[arrayId] = [].concat(serverArrays[arrayId], newItems).sort(() => Math.random() - 0.5);
        //     serverArrays[arrayId + "Max"] = max;
        // }

        // Pop an index off the random array
        let value = serverArrays[arrayId].pop();
        logString("Returning index " + value);
        fs.writeFileSync(serverArrayFileName, JSON.stringify(serverArrays), () => { });
        return value;
    }
}
