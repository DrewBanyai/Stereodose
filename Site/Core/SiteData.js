class SiteData {
    static getSubstanceMap() { return { 0: "WEED",  1: "ECSTACY", 2: "LSD", 3: "MUSHROOMS", 4: "ALCOHOL" }; }
    
    static getSubstanceMoods(substanceID) {
        switch (substanceID) {
            case 0:     return { 0: "CHILL", 1: "GROOVIN", 2: "THUG LIFE", 3: "RASTA", 4: "CAMPFIRE" };
            case 1:     return { 0: "DANCE", 1: "FLOORED", 2: "ROLLING BALLS", 3: "RATCHET" };
            case 2:     return { 0: "CALM", 1: "TRIPPY", 2: "FUBAR", 3: "ROCKSTAR" };
            case 3:     return { 0: "MATRIX", 1: "SHAMAN", 2: "SPACE", };
            case 4:     return { 0: "WINE & CHEESE", 1: "DEPRESSED", };
            default:    console.warn("Attempted to get moods of invalid substance ID:", substanceID); return {};
        }
    }

    static GetMaxTrackCountPerPlaylist() { return 12; }
}