// file containing ubiquitous data for Ballotbot
module.exports = {
    prefix: "!",
    ownerId: "193427298958049280",
    ownerMention: "<@193427298958049280>",
    nominationId: "723249250288271401",
    nominationMention: "<@&723249250288271401>",
    hallMention: "<#713262577131585546>",
    scores: "733759232184287382",
    chat: "723243910423380069",
    uniqueness: 0.35,
    rarity: 0.3,
    difficulty: 0.15,
    personal: 0.2,
    footer: {
        text: "© Sap#5703",
        image: "https://i.imgur.com/wbFToRX.png"
    },
    space(amt) {
        let whitespace = "";

        let i;
        for (i = 0; i < amt; i++) {
            whitespace += "\u00A0";
        }

        return whitespace;
    },
    checkInput(val1, val2, val3, val4) {
        // if scores are not numbers or are out of bounds
        if (!Number.isInteger(parseInt(val1)) || !Number.isInteger(parseInt(val2)) || !Number.isInteger(parseInt(val3)) || !Number.isInteger(parseInt(val4))
            || val1 < 0 || val1 > 5 || val2 < 0 || val2 > 5 || val3 < 0 || val3 > 5 || val4 < 0 || val4 > 5) {
                return false;
        }

        return true;
    }
}